// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const songData = require("./musicData");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// 1. MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/music", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 2. Mongoose Schema
const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  Singer: String,
  Actor: String,
  Actress: String
});

const Song = mongoose.model("songdetails", songSchema);

// 3. Insert 5 initial songs (run once)
app.get("/insert", async (req, res) => {
  await Song.insertMany(songData);
  res.send("Inserted 5 Songs");
});

// 4. Show all songs + count
app.get("/", async (req, res) => {
  const songs = await Song.find({});
  const count = await Song.countDocuments();
  res.render("index", { songs, count });
});

// 5. Filter by Music Director
app.get("/director/:name", async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.name });
  res.render("index", { songs, count: songs.length });
});

// 6. Filter by Director & Singer
app.get("/director/:dname/singer/:sname", async (req, res) => {
  const songs = await Song.find({
    Music_director: req.params.dname,
    Singer: req.params.sname
  });
  res.render("index", { songs, count: songs.length });
});

// 7. Delete a song
app.get("/delete/:name", async (req, res) => {
  await Song.deleteOne({ Songname: req.params.name });
  res.redirect("/");
});

// 8. Add a new song (Favourite)
app.post("/add", async (req, res) => {
  await Song.create(req.body);
  res.redirect("/");
});

// 9. Filter by Singer & Film
app.get("/film/:film/singer/:singer", async (req, res) => {
  const songs = await Song.find({
    Film: req.params.film,
    Singer: req.params.singer
  });
  res.render("index", { songs, count: songs.length });
});

// 10. Update song: add Actor & Actress
app.get("/update/:name/:actor/:actress", async (req, res) => {
    await Song.updateOne(
      { Songname: req.params.name },
      {$set: {Actor: req.params.actor, Actress: req.params.actress,},}
    );
    res.redirect("/");
  });
  
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
