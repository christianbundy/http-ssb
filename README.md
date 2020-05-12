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

Database is not persistent, but it could be. You just have to pass all of the
existing messages through SSB-Validate again so that it has the correct state.

## API

**Terrible awful prototype, expect breaking changes.**

### HTTP GET /

Retreive list of all messages.

### HTTP POST /

Publish a message.

## Contributions

All contributions are welcome. :)
