import trashSVG from "../assets/trash.svg";

//import editSVG from "../assets/edit.svg";

const Notes = ({ notes, noteService, setNotes }) => {
  const handleDeleteNote = async (note) => {
    await noteService.deleteNote(note.id);

    const updatedNotes = notes.filter((n) => n.id !== note.id);
    setNotes(updatedNotes);
  };
  return (
    <div className="grid grid-cols-3 ">
      {notes.length ? (
        notes.map((note) => (
          <li key={note.id} className="">
            <div className="bg-orange-300 m-3 p-10 rounded-md flex justify-between">
              <div className="container">
                <span>{note.content}</span>
                {note.important ? "*" : ""}
                <br />

                <small>{new Date(note.date).toLocaleDateString()}</small>
              </div>

              <button
                onClick={() => handleDeleteNote(note)}
                className="text-center  p-2 rounded-md "
              >
                <img
                  src={trashSVG}
                  alt="trash"
                  className="w-7 hover:bg-red-500 rounded-md "
                />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-2xl text-center ">No tienes notas aun!</p>
      )}
    </div>
  );
};

export default Notes;
