const NoteForm = ({ addNote, newNote, handleNewNoteChange, handleLogoout }) => {
  return (
    <>
      <form action="" onSubmit={addNote}>
        <input
          type="text"
          placeholder="Write your note"
          value={newNote}
          onChange={handleNewNoteChange}
        />
        <button type="submit">Create Note</button>
      </form>
      <div>
        <button onClick={handleLogoout}>Logout</button>
      </div>
    </>
  );
};

export default NoteForm;
