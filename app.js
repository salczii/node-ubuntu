const express = require("express");
const app = express();
const port = 3000;

const users = [
  {
	  id: 1,
    name: "kacper",
    age: 22,
  },
  {
	  id: 2,
    name: "John",
    age: 33,
  },
];

app.get("/", (req, res) => {
  res.send("hello world!");
});
app.get("/users", (req, res) => {
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  const id = 
});

app.listen(port, () => console.log(`Example app listen on port: ${port}`));
