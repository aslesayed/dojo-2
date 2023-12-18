const express = require("express");
const server = express();
const db = require("./database");

// config routes here
server.get("/", (req, res) => {
  res.json("Welcome to pets api");
});

// albums routes
server.get("/albums", async (req, res) => {
  try {
    const [albums] = await db.query("SELECT * FROM albums");
    res.status(200).json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json("erreur serveur...");
  }
});

server.get("/albums/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const [[album]] = await db.query("SELECT * FROM albums WHERE id=?", [id]);

    if (album)
      res.status(200).json(album);
    else
      res.sendStatus(404);

  } catch (error) {
    console.error(error);
    res.status(500).json("erreur serveur...");
  }
})

module.exports = server;
