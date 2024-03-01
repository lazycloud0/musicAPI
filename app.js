// importing express
// importing data
import express from "express";
import music from "./music_data.js"

// Calling express functions 
const app = express();
app.use(express.json());


// Create CRUD requests


// GET request test
app.get("/", (req, res) => {
    res.json({message: "Hello from root path!" })
})

// GET request trivia
app.get("/music", (req, res) => {
    res.status(200).json({success:true, payload: music})
  })

// GET request by ID 
app.get("/music/:id", (req, res) => {
  try {
    const reqID = Number(req.params.id)

    function matchID(music) {
      return music.id === reqID
    }
    const track = music.find(matchID)

    if(!track) {
      res.json({"success": false, "payload": {message: "track not found"}})
    } else {
      res.json({"success":true, "payload": track})
    }
  } catch (err) {
    res.json({"success": false, "payload": {message: "error"}})
  }
})

//POST request 
app.post("/music", (req, res) => {
  try{
    // const id = music.length;
    // const artist = req.body.artist
    // const title = req.body.title
    // const album = req.body.album
    // const duration = req.body.duration
    // const year_release = req.body.year_release
  
    const track = req.body
    track.id = music.length
    music.push(track);
    
    res.status(200).json({success: true, payload: track})

  } catch (err) {
    res.json({"success": false, "payload": {message: "error"}})
  }
  })

// PUT request by ID 
app.put("/music/:id", (req, res) => {
  try{
    const reqID = Number(req.params.id)

    function matchID(music) {
      return music.id === reqID
    }
    music[matchID] = req.body
    
    res.status(200).json({success: true, payload: music[matchID]})

  } catch (err) {
    res.json({"success": false, "payload": {message: "error"}})
  }
  })

  
// PATCH request by ID
app.patch("/questions/:id", (req, res) => {
    const reqID = Number(req.params.id)
    const artist = req.body.artist
    const title = req.body.title
    const album = req.body.album
    const duration = req.body.durationy
    const year_release = req.body.year_release

    //create a function that finds the index and compares it to the id selected
    const found = questions.findIndex((question) => {
      return question.id === id;
    });
  
    //create if statements that check whether the the id exists
    if (found) {
      if (artist) {
        questions[found].artist = artist;
      }
      if (title) {
        questions[found].title = title;
      }
      if (album) {
        questions[found].album = album;
      }
      if (duration) {
        questions[found].duration = duration;
      }
      if (year_release) {
        questions[found].year_release = year_release;
      }

    }
    //return a response for pass and fail
    res.status(200).json({
      success: true,
      payload: questions[found],
    });
    res.status(404).json({ success: false, message: "Failed to update" });
  });



// DELETE request by ID
app.delete("/music/:id", (req, res) => {
  try {
    const reqID = Number(req.params.id)
    console.log(reqID)
    function matchID(music) {
      return music.id === reqID
    }
    const track = music.find(matchID)
    console.log(track)
    //music = music.splice(0,reqID) + music.splice(reqID+1, -1)
    delete music[reqID]
    res.status(200).json({success: true, payload: music})
  } catch (err) {
    res.json({"success": false, "payload": {message: "error"}})
  }
})


export default app