# ssb-http

Hi! An HTTP service that lets you GET and POST messages from Secure Scuttlebutt.

```console
$ ssb createHistoryStream --id $(ssb whoami | jq .id) --limit 1 | jq -c '.value'
{"previous":null,"author":"@+oaWWDs8g73EZFUMfW37R/ULtFEjwKN/DczvdYihjbU=.ed25519","sequence":1,"timestamp":1519858274263,"hash":"sha256","content":{"type":"about","about":"@+oaWWDs8g73EZFUMfW37R/ULtFEjwKN/DczvdYihjbU=.ed25519","image":"&sGjgZqyTLJ6vLTY7uzNWnt6MBJDccIR1szU0/tMPScs=.sha256","name":"christianbundy"},"signature":"0jzOR+Sjft2RyVgbPbIFs6MGnHu7IN2f4+8r+40kXjIhEgdTarvpHQxEkLLrHNil4vttFiD06gycaeEC5FroDw==.sig.ed25519"}
$ curl --header "Content-Type: application/json" --data '{"previous":null,"author":"@+oaWWDs8g73EZFUMfW37R/ULtFEjwKN/DczvdYihjbU=.ed25519","sequence":1,"timestamp":1519858274263,"hash":"sha256","content":{"type":"about","about":"@+oaWWDs8g73EZFUMfW37R/ULtFEjwKN/DczvdYihjbU=.ed25519","image":"&sGjgZqyTLJ6vLTY7uzNWnt6MBJDccIR1szU0/tMPScs=.sha256","name":"christianbundy"},"signature":"0jzOR+Sjft2RyVgbPbIFs6MGnHu7IN2f4+8r+40kXjIhEgdTarvpHQxEkLLrHNil4vttFiD06gycaeEC5FroDw==.sig.ed25519"}' localhost:3000
OK
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

All contributions are welcome. Maybe we should

I can't figure out how to pipe `ssb createHistoryStream` to `curl`.
