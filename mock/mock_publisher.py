#!/usr/bin/env python3
"""
mock_publisher.py
─────────────────
Publish a fake emotion payload to RabbitMQ every 5 s.
"""

import json, os, time, uuid, random, ssl, pika
import requests

response = requests.get("http://127.0.0.1:4040/api/tunnels")  # GET, no verify needed for HTTP
data = response.json()   # parse JSON straight into a Python dict/list

hostport = data["tunnels"][0]["public_url"][6:]

RABBIT_URL = f"amqps://ai:supersecret@{hostport}"
print(RABBIT_URL)


QUEUE_NAME = "emotions"        # durable queue for emotion docs

params = pika.URLParameters(RABBIT_URL)
params.ssl_options = pika.SSLOptions(ssl._create_unverified_context())

conn = pika.BlockingConnection(params)
ch   = conn.channel()
ch.queue_declare(queue=QUEUE_NAME, durable=True)

LABELS = ["anger", "disgust", "fear", "joy", "neutral", "sadness", "surprise"]

def make_payload():
    # joy dominant, others tiny randoms
    scores = {lbl: random.uniform(0.0, 1.0) for lbl in LABELS}
    return [[{"label": k, "score": v} for k, v in scores.items()]]

while True:
    payload = make_payload()
    ch.basic_publish(
        exchange="",
        routing_key=QUEUE_NAME,
        body=json.dumps(payload).encode(),
        properties=pika.BasicProperties(
            content_type="application/json",
            delivery_mode=2,            # persistent
            correlation_id=str(uuid.uuid4()),
        ),
    )
    print("→ sent", payload[0][:2], "…")
    time.sleep(15)
