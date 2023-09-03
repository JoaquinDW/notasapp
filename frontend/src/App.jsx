import { useState, useEffect } from "react";
import loginService from "./services/login";
import "./App.css";
import noteService from "./services/notes";
import LoginForm from "./components/LoginForm";
import registerService from "./services/register";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import RegisterForm from "./components/RegisterForm";

//import { Link } from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  /**
   useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
 */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogoout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setNotes([]);
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
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      if (user) {
        noteService.getAll().then((initialNotes) => {
          setNotes(initialNotes);
        });
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await registerService.create({
        username,
        name,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      setName("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleNewNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl text-center mb-5 ">Notes</h1>
      {user ? (
        <>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            handleNewNoteChange={handleNewNoteChange}
          />
          <Notes notes={notes} noteService={noteService} setNotes={setNotes} />

          <button
            onClick={handleLogoout}
            className="bg-red-500 p-3 rounded-md hover:scale-105 hover:bg-red-600 transition-all delay-75"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex justify-around mt-5 max-w-xl ml-[320px] ">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />

          <RegisterForm
            username={username}
            name={name}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleNameChange={({ target }) => setName(target.value)}
            handleRegister={handleRegister}
          />
        </div>
      )}
    </div>
  );
}

export default App;
