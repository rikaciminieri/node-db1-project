const express = require("express");
const server = express();

const accountsRouter = require("./accounts/accounts-router");

server.use(express.json());

server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.send("<h1>DATABASE PROJECT!!!!</h1>");
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: "Not Found" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: `Uh oh: ${err.message}` });
});

module.exports = server;
