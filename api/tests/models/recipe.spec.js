const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

const testObject1 = {
  name: "test",
};

const testObject2 = {
  ...testObject1,
  summary: "A test description",
};

const testObject = {
  ...testObject2,
  healthScore: 10.1,
  steps: ["Test1", "Test2", "Test3"],
};

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("id", () => {
      it("should declare an id when a recipe is created", async () => {
        const test1 = await Recipe.create(testObject);
        expect(test1.id).to.not.be.undefined;
      });
      it("should increment the id each time a recipe is created", async () => {
        const test1 = await Recipe.create(testObject);
        const test2 = await Recipe.create(testObject);
        const test3 = await Recipe.create(testObject);
        expect(test1.getDataValue("id")).to.be.below(test2.getDataValue("id"));
        expect(test2.getDataValue("id")).to.be.below(test3.getDataValue("id"));
      });
    });
    describe("name", () => {
      it("should throw an error if name is not provided", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Recipe.create({ name: "Milanesa a la napolitana" });
      });
    });
    describe("summary", () => {
      it("should throw an error if description is not provided", (done) => {
        Recipe.create(testObject1)
          .then(() => done(new Error("It requires a valid description")))
          .catch(() => done());
      });
      it("should be declared properly if argument is passed", async () => {
        const test1 = await Recipe.create(testObject2);
        expect(test1.summary).to.exist;
      });
    });
    describe("healthScore", () => {
      it("should be declared properly if argument is passed", async () => {
        const test1 = await Recipe.create(testObject);
        expect(test1.healthScore).to.exist;
      });
    });
    describe("steps", () => {
      it("should be declared properly if argument is passed", async () => {
        const test1 = await Recipe.create(testObject);
        expect(test1.steps).to.exist;
      });
    });
    describe("isLocal", () => {
      it("should be declared proprely if argument is passed", async () => {
        const test1 = await Recipe.create({ ...testObject, isLocal: true });
        expect(test1.isLocal).to.equal(true);
      });
    });
  });
});
