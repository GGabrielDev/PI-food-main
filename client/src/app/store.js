import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../features/recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});
