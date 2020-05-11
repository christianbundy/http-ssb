const express = require("express");
const Database = require("better-sqlite3");
const ssbValidate = require("ssb-validate");

const app = express();
const db = new Database(":memory:", { verbose: console.log });

const hmacKey = null;
let state = ssbValidate.initial();

db.prepare("CREATE TABLE messages (value TEXT)").run();

// JSON support.
app.use(express.json());

// Return all messages.
app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM messages").all();
  res.send(rows.map((row) => JSON.parse(row.value)));
});

// Accept new messages.
app.post("/", function (req, res) {
  console.log(req.body);
  try {
    state = ssbValidate.append(state, hmacKey, req.body);
    db.prepare("INSERT INTO messages VALUES (?)").run(JSON.stringify(req.body));

    res.send("OK\n");
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send("NO\n");
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
