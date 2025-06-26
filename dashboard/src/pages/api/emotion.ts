import type { VercelRequest, VercelResponse } from '@vercel/node';
import amqp from 'amqplib';

const url  = process.env.RABBIT_URL!;        // amqps://ai:...@host:port//
const caB64= process.env.RABBIT_CA!;         // base64-encoded cert
const caBuf= Buffer.from(caB64, 'base64');

let conn: amqp.Connection | undefined;
let ch:   amqp.Channel     | undefined;

function noHostnameCheck(_hostname: string, _cert: any) {
  return null;                // ⬅️ disable alt-name validation only
}

async function getChannel() {
  if (ch) return ch;

  conn = await amqp.connect(url, {
    ca: [caBuf],             // trust our CA
    servername: '',          // skip SNI, CN mismatch is OK
    checkServerIdentity: noHostnameCheck
    // if you prefer to disable validation entirely, add:
    // rejectUnauthorized: false,
  });

  ch = await conn.createChannel();
  await ch.assertQueue('emotions', { durable: true });
  return ch;
}

export default async function handler(_: VercelRequest, res: VercelResponse) {
  console.log('Polling the queue');
  const channel = await getChannel();
  const msg = await channel.get('emotions', { noAck: false });

  if (!msg) {
    console.log("ℹ️ no message – queue empty");      // <-- LOG
    return res.status(204).end();
  }

  const body = msg.content.toString('utf8');
  channel.ack(msg);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.send(body);
}
