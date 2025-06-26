#! /usr/bin/env bash

RABBIT_USER=ai
RABBIT_PASS=supersecret

OUT=$(curl -s http://127.0.0.1:4040/api/tunnels 2>/dev/null || true)
 PUBLIC_URL=$(echo "$OUT" | jq -r '.tunnels[]? | select(.proto=="tcp") | .public_url')
if [[ $PUBLIC_URL == tcp://* ]]; then
  HOSTPORT=${PUBLIC_URL#tcp://} # strip scheme
  export RABBIT_URL="amqps://${RABBIT_USER}:${RABBIT_PASS}@${HOSTPORT}//"
fi

export NODE_EXTRA_CA_CERTS=../relay-service/ssl/server.crt
export NODE_TLS_REJECT_UNAUTHORIZED=0
export RABBIT_CA=$(cat ../relay-services/ssl/server.b64)

npm run dev