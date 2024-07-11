const cors = require("cors");
const express = require("express");
const songController = require('./controllers/songController.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Tuner"));
app.use('/songs', songController);

app.get("*", (req, res) => res.status(404).send("Page not found"));

module.exports = app;
