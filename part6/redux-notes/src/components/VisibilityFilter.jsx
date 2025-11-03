import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div>
      all
      <input type="radio" name="filter" checked={filter === "ALL"} onChange={() => dispatch(setFilter("ALL"))} />
      important
      <input type="radio" name="filter" checked={filter === "IMPORTANT"} onChange={() => dispatch(setFilter("IMPORTANT"))} />
      nonimportant
      <input type="radio" name="filter" checked={filter === "NONIMPORTANT"} onChange={() => dispatch(setFilter("NONIMPORTANT"))} />
    </div>
  );
};
export default VisibilityFilter;
