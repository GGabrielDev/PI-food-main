import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../features/recipes/recipeSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    recipes: recipesReducer,
  },
});
