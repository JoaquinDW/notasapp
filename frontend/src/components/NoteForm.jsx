const NoteForm = ({ addNote, newNote, handleNewNoteChange }) => {
  return (
    <div className="container  grid place-items-center">
      <form action="" onSubmit={addNote}>
        <input
          type="text"
          placeholder="Write your note"
          value={newNote}
          onChange={handleNewNoteChange}
          className=" p-4 bg-gray-200 rounded-md m-2"
        />
        <button
          type="submit"
          className="bg-orange-300 p-4 rounded-md hover:scale-105 hover:bg-orange-400 cursor-pointer"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
