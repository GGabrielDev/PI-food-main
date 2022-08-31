const { Diet, Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

const testRecipe = {
  name: "Test Recipe",
  summary: "A short test summary",
  healthScore: 7.7,
  steps: ["Step 1", "Step 2", "Step 3", "Enjoy"],
};

const dietArray = [
  "gluten free",
  "dairy free",
  "ketogenic",
  "vegetarian",
  "lacto ovo vegetarian",
  "vegan",
  "pescatarian",
  "paleolithic",
  "primal",
  "low fodmap",
  "whole 30",
];

describe("Joined Models", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });
  describe("Validators", () => {
    beforeEach(async () => {
      await conn.sync({ force: true });
    });
    it("should assign a joint diet when passed a Diet instance", async () => {
      const recipe = await Recipe.create(testRecipe);
      const diet = await Diet.create({ name: dietArray[0] });
      await recipe.addDiet([diet]);
      const result = await Recipe.findOne({
        where: { name: testRecipe.name },
        include: Diet,
      });
      expect(result.diets.length).to.equal(1);
    });
    it("should assign a joint recipe when passed a Recipe instance", async () => {
      const recipe = await Recipe.create(testRecipe);
      const diet = await Diet.create({ name: dietArray[0] });
      await diet.addRecipe([recipe]);
      const result = await Diet.findOne({
        where: { name: dietArray[0] },
        include: Recipe,
      });
      expect(result.recipes.length).to.equal(1);
    });
  });
});
