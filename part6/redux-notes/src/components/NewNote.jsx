import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { useState } from "react";

const NewNote = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value.trim();

    if (!content) {
      setError("Note cannot be empty");
      return;
    }

    if (content.length > 100) {
      setError("Note is too long (max 100 characters)");
      return;
    }

    dispatch(createNote(content));
    event.target.note.value = "";
    setError("");
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" placeholder="Write your note here..." />
        <button type="submit">add</button>
      </form>
      {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
    </div>
  );
};
export default NewNote;
