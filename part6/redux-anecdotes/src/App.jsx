import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";
import { setNotification, clearNotification } from "./reducers/notificationReducer";
import Notification from "./components/Notification";

const App = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you created '${content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
