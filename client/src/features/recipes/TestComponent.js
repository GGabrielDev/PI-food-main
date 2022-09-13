import { useDispatch } from "react-redux";
import {
  fillState,
  filterByName,
  selectDetails,
  clearDetails,
} from "./recipeSlice";
import { getRecipesByName, getDetailsByID } from "./recipesAPI";

const TestComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(fillState());
        }}
      >
        Fetch All
      </button>
      <button
        onClick={async () => {
          const recipesByName = await getRecipesByName("Cauliflower");
          console.log(recipesByName.data.length);
          dispatch(filterByName(recipesByName.data));
        }}
      >
        Fetch By Name
      </button>
      <button
        onClick={async () => {
          const details = await getDetailsByID(716268);
          dispatch(selectDetails(details.data));
        }}
      >
        Select Details
      </button>
      <button
        onClick={() => {
          dispatch(clearDetails());
        }}
      >
        Clear Details
      </button>
    </>
  );
};

export default TestComponent;
