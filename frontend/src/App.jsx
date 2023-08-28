import { useState, useEffect } from "react";
import loginService from "./services/login";
import "./App.css";
import noteService from "./services/notes";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const handleLogoout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteToAdd = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteToAdd).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleNewNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      {user ? (
        (<NoteForm
          addNote={addNote}
          newNote={newNote}
          handleNewNoteChange={handleNewNoteChange}
          handleLogoout={handleLogoout}
        />)()
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      )}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
