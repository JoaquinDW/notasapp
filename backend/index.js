require("./mongo.js");
require('dotenv').config()


const express = require("express");
const app = express();

const Note = require("./models/Note.js");
const User = require("./models/User.js");

const userExtractor = require("./middlewares/userExtractor.js")
const usersRouter = require("./controllers/users.js");
const loginRouter = require("./controllers/login.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({})
    .populate("users", {
      username: 1,
      name: 1,
    })
    .then((notes) => {
      res.json(notes);
    })
    .catch(() => res.status(500));
});

app.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(400).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/notes/:id", userExtractor, (req, res, next) => {
  const { id } = req.params;
  const note = req.body;
  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    res.json(result);
  });
});

app.delete("/api/notes/:id",userExtractor, (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/notes",userExtractor, async (req, res, next) => {
  const { content, important = false } = req.body;

  //Saca userId de req a traves de middleware
  const { userId } = req;
  const user = await User.findById(userId);

  if (!content) {
    return res.status(400).json({
      error: "content is missing",
    });
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id,
  });

  try {
    const savedNote = await newNote.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    res.json(savedNote);
  } catch (e) {
    next(e);
  }
});

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter)

app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    res.status(400).send({ error: "id used is malformed" });
  } else if(error.name === "JsonWebTokenError"){
    res.status(401).json({
      error: "invalid token"
    })
  }
  else if (error.name === "TokenExpirerError"){
    res.status(401).json({
      error: "token expired"
    })
  }
   else {
    res.status(500).end();
  }
});

app.use((req, res, err) => {
  res.status(404).send({ error: "unknown endpoint" });
});

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
