# ssb-http

Hi! An HTTP service that lets you GET and POST messages from Secure Scuttlebutt.

```sh
me="$(ssb whoami | jq .id)"
host="localhost:3000"
ssb createHistoryStream --id "$me" --limit 1024 \
| jq -s \
| jq -c \
| curl --header 'Content-Type: application/json' --data '@-' "$host"
```

This takes like 2.5 minutes to add all of my messages to the database. It could
probably be faster with some way to add messages in a batch.

## API

**Terrible awful prototype, expect breaking changes.**

### HTTP GET /

Retreive latest sequence number from each author.

### HTTP GET /author/:id

Get all messages from each author.

(This is surprisingly fast. Like, 0.307 seconds to get all 17,500 of my messages.)

### HTTP POST /

Publish a message.

## Contributions

All contributions are welcome. :)
