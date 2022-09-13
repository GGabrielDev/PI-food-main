import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./recipesAPI";

const initialState = {
  recipes: [],
  diets: [],
  details: {},
  status: "idle",
};

export const fillState = createAsyncThunk("recipes/fetchAll", async () => {
  const recipes = await API.getAllRecipes();
  const diets = await API.getDiets();

  return { recipes: recipes.data, diets: diets.data };
});

export const fillRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const recipes = await API.getAllRecipes();

    return recipes.data;
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    filterByName: (state, action) => {
      state.recipes = action.payload;
    },
    selectDetails: (state, action) => {
      state.details = action.payload;
    },
    clearDetails: (state) => {
      state.details = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fillState.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fillState.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.diets = action.payload.diets;
        state.status = "idle";
      })
      .addCase(fillRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fillRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.status = "idle";
      });
  },
});

export const { filterByName, selectDetails, clearDetails } =
  recipesSlice.actions;

export const selectRecipes = (state) => state.recipes.recipes;
export const selectDiets = (state) => state.recipes.diets;
export const selectStatus = (state) => state.recipes.status;

export default recipesSlice.reducer;
