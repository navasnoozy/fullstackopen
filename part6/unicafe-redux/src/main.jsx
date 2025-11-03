import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import counterReducer, { good, ok, bad, reset } from "./reducers/counterReducer";

const store = configureStore({
  reducer: counterReducer,
  devTools: process.env.NODE_ENV !== "production",
});

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <div>
      <button onClick={() => dispatch(good())}>good</button>
      <button onClick={() => dispatch(ok())}>ok</button>
      <button onClick={() => dispatch(bad())}>bad</button>
      <button onClick={() => dispatch(reset())}>reset stats</button>
      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
