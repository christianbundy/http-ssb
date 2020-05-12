# ssb-http

Hi! An HTTP service that lets you GET and POST messages from Secure Scuttlebutt.

```sh
me="$(ssb whoami | jq .id)"

IFS='
'

ssb createHistoryStream --id "$me" \
| jq -c '.value' \
| while read -r line
  do
    curl --header "Content-Type: application/json" --data "$line" localhost:3000
  done

unset IFS
```

This takes like 2.5 minutes to add all of my messages to the database. It could
probably be faster with some way to add messages in a batch.

Database is not persistent, but it could be. You just have to pass all of the
existing messages through SSB-Validate again so that it has the correct state.

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
