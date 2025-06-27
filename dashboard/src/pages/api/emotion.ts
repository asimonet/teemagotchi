import type { VercelRequest, VercelResponse } from '@vercel/node'
import amqp from 'amqplib'

const URL    = process.env.RABBIT_URL!     // amqps://…
const CAB64  = process.env.RABBIT_CA!      // base64-encoded CA
const CABUF  = Buffer.from(CAB64, 'base64')

let conn:    amqp.Connection
let ch:      amqp.Channel
let recvQ:   string

function noHostnameCheck(_hostname: string, _cert: any) {
  return null  // disable alt-name / CN check
}

async function init() {
  if (ch) return

  conn = await amqp.connect(URL, {
    ca:            [CABUF],
    servername:    '',                // skip SNI/CN mismatch
    checkServerIdentity: noHostnameCheck,
  })

  ch = await conn.createChannel()

  // 1️⃣ Assert the existing "emotions" exchange (fanout or topic)
  await ch.assertExchange('emotions', 'fanout', { durable: true })

  // 2️⃣ Create a temporary queue for consuming replies
  const { queue } = await ch.assertQueue('', { exclusive: true })
  recvQ = queue

  // 3️⃣ Bind it to the exchange with no routing key
  await ch.bindQueue(recvQ, 'emotions', '')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await init()

  if (req.method === 'GET') {
    // Pull one message off our bound queue
    const msg = await ch.get(recvQ, { noAck: false })
    if (!msg) return res.status(204).end()

    // Ack & return
    ch.ack(msg)
    const text = msg.content.toString('utf8')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    return res.send(JSON.stringify({ text }))
  }

  if (req.method === 'POST') {
    const { text } = req.body
    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing text' })
    }

    // Publish into the "emotions" exchange
    ch.publish('emotions', '', Buffer.from(text), { persistent: true })
    return res.status(204).end()
  }

  // 405 for anything else
  res.setHeader('Allow', ['GET','POST'])
  return res.status(405).end()
}
