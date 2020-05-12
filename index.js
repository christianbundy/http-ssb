const express = require("express");
const Database = require("better-sqlite3");
const ssbValidate = require("ssb-validate");

const app = express();
const db = new Database(":memory:", { verbose: console.log });

const port = 3000;
const hmacKey = null;

let state = ssbValidate.initial();

db.prepare(
  "CREATE TABLE messages (value TEXT, author TEXT, sequence INTEGER)"
).run();

// JSON support.
app.use(express.json());

// Return all messages.
app.get("/", (req, res) => {
  const rows = db
    .prepare(
      "SELECT author, MAX(sequence) as sequence FROM messages GROUP BY author"
    )
    .all();
  const rowsWithLink = rows.map((row) => {
    row.link = `http://localhost:${port}/author/${encodeURIComponent(
      row.author
    )}`;
    return row;
  });
  res.send(rowsWithLink);
});

app.get("/author/:id", (req, res) => {
  const rows = db
    .prepare("SELECT value FROM messages WHERE author = ?")
    .all(req.params.id);
  res.send(rows.map((row) => JSON.parse(row.value)));
});

// Accept new messages.
app.post("/", function (req, res) {
  console.log(req.body);
  try {
    state = ssbValidate.append(state, hmacKey, req.body);
    const value = JSON.stringify(req.body);
    db.prepare(
      "INSERT INTO messages (value, author, sequence) VALUES (?, ?, ?)"
    ).run(value, req.body.author, req.body.sequence);

    res.send("OK\n");
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send("NO\n");
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
