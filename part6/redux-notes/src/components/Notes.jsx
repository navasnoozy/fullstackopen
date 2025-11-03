import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { memo } from "react";

const Note = memo(({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content} <strong>{note.important ? "important" : ""}</strong>
  </li>
));

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const filter = useSelector((state) => state.filter);

  const filtered = filter === "ALL" ? notes : filter === "IMPORTANT" ? notes.filter((note) => note.important) : notes.filter((note) => !note.important);

  return (
    <ul>
      {filtered.map((note) => (
        <Note key={note.id} note={note} handleClick={() => dispatch(toggleImportanceOf(note.id))} />
      ))}
    </ul>
  );
};
export default Notes;
