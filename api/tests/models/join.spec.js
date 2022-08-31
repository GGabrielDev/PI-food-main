const { Diet, Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

const testRecipe = {
  name: "Test Recipe",
  summary: "A short test summary",
  healthScore: 7.7,
  steps: ["Step 1", "Step 2", "Step 3", "Enjoy"],
};

const dietArray = ["gluten free", "dairy free", "ketogenic", "vegetarian",
									"lacto ovo vegetarian", "vegan", "pescatarian", "paleolithic",
									"primal", "low fodmap", "whole 30"]
