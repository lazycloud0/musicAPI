// importing express
// importing data
// importing helmet
import express from "express";
import music from "./music_data.js";
import helmet from "helmet";

// Calling express functions
const app = express();
app.use(express.json());
// use Helmet
app.use(helmet());

let music_ds = music;

// Create CRUD requests

// GET request test
app.get("/", (req, res) => {
  res.json({ message: "Hello from root path!" });
});

// GET request trivia
app.get("/music", (req, res) => {
  res.status(200).json({ success: true, payload: music_ds });
});

// GET request by ID
app.get("/music/:id", (req, res) => {
  try {
    const reqID = Number(req.params.id);

    function matchID(music_ds) {
      return music_ds.id === reqID;
    }
    const track = music_ds.find(matchID);

    if (!track) {
      res.json({ success: false, payload: { message: "track not found" } });
    } else {
      res.json({ success: true, payload: track });
    }
  } catch (err) {
    res.json({ success: false, payload: { message: "error" } });
  }
});

//POST request
app.post("/music", (req, res) => {
  try {
    // const id = music.length;
    // const artist = req.body.artist
    // const title = req.body.title
    // const album = req.body.album
    // const duration = req.body.duration
    // const year_release = req.body.year_release

    const track = req.body;
    track.id = music_ds.length;
    music.push(track);

    res.status(200).json({ success: true, payload: track });
  } catch (err) {
    res.json({ success: false, payload: { message: "error" } });
  }
});

// PUT request by ID
app.put("/music/:id", (req, res) => {
  try {
    const reqID = Number(req.params.id);

    // function matchID(music) {
    //   return music.id === reqID
    // }
    music_ds[reqID] = req.body;

    res.status(200).json({ success: true, payload: music_ds[reqID] });
  } catch (err) {
    res.json({ success: false, payload: { message: "error" } });
  }
});

// PATCH request by ID
app.patch("/music_ds/:id", (req, res) => {
  const reqID = Number(req.params.id);
  const artist = req.body.artist;
  const title = req.body.title;
  const album = req.body.album;
  const duration = req.body.durationy;
  const year_release = req.body.year_release;

  //create a function that finds the index and compares it to the id selected
  const found = music.findIndex((music_ds) => {
    return music_ds.id === id;
  });

  //create if statements that check whether the the id exists
  if (found) {
    if (artist) {
      music_ds[found].artist = artist;
    }
    if (title) {
      music_ds[found].title = title;
    }
    if (album) {
      music_ds[found].album = album;
    }
    if (duration) {
      music_ds[found].duration = duration;
    }
    if (year_release) {
      music_ds[found].year_release = year_release;
    }
  }
  //return a response for pass and fail
  res.status(200).json({
    success: true,
    payload: music_ds[found],
  });
  res.status(404).json({ success: false, message: "Failed to update" });
});

// DELETE request by ID
app.delete("/music/:id", (req, res) => {
  try {
    const reqID = Number(req.params.id);
    console.log(reqID);
    function matchID(music) {
      return music.id === reqID;
    }
    const track = music.find(matchID);
    console.log(track);
    //music = music.splice(0,reqID) + music.splice(reqID+1, -1)
    //delete music[reqID]
    music[reqID] = {};
    res.status(200).json({ success: true, payload: music });
  } catch (err) {
    res.json({ success: false, payload: { message: "error" } });
  }
});



export default app;
