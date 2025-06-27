// pages/api/chat.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import amqp from 'amqplib'

const URL    = process.env.RABBIT_URL!     // e.g. amqps://user:pass@host:port/vhost
const CAB64  = process.env.RABBIT_CA!      // base64-encoded CA cert
const CABUF  = Buffer.from(CAB64, 'base64')

let conn: amqp.Connection
let ch:   amqp.Channel

function noHostnameCheck(_hostname: string, _cert: any) {
  return null  // disable CN/alt-name validation
}

async function getChannel() {
  if (ch) return ch

  conn = await amqp.connect(URL, {
    ca:            [CABUF],
    servername:    '',
    checkServerIdentity: noHostnameCheck,
  })

  ch = await conn.createChannel()

  // ensure both queues exist
  await ch.assertQueue('questions', { durable: true })
  await ch.assertQueue('responses', { durable: true })

  return ch
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const channel = await getChannel()

  if (req.method === 'POST') {
    // → publish to "questions"
    const { text } = req.body
    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing text' })
    }

    channel.sendToQueue(
      'questions',
      Buffer.from(text, 'utf8'),
      { persistent: true }
    )
    return res.status(204).end()
  }

  if (req.method === 'GET') {
    // → consume from "responses"
    const msg = await channel.get('responses', { noAck: false })
    if (!msg) {
      return res.status(204).end()
    }

    const body = msg.content.toString('utf8')
    channel.ack(msg)

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    return res.send(JSON.stringify({ text: body }))
  }

  // other methods not allowed
  res.setHeader('Allow', ['GET','POST'])
  return res.status(405).end()
}
