import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => (
  <li onClick={handleClick}>
    {note.content} <strong>{note.important ? 'important' : ''}</strong>
  </li>
)

const Notes = () => {
  const dispatch = useDispatch()
  const { notes, filter } = useSelector(state => state)
  const filtered =
    filter === 'ALL'
      ? notes
      : filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)

  return (
    <ul>
      {filtered.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  )
}
export default Notes
