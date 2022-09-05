/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, Diet, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Cauliflower a la napolitana",
  summary: "A test description",
  healthScore: 10.1,
  steps: ["Test1", "Test2", "Test3"],
  isLocal: true,
};

const diet = {
  name: "gluten free",
};

const testRecipe = {
  name: "Filete a la napolitana",
  summary: "A test description",
  healthScore: 10.1,
  steps: ["Test1", "Test2", "Test3"],
};

describe("Recipe routes", function () {
  this.timeout(24000);
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(async () => {
    await conn.sync({ force: true });
    await Recipe.create({ ...recipe, diets: [diet] }, { include: [Diet] });
  });
  describe("GET /recipes?name=“…”", () => {
    it("should get 400 if no name query is provided", () =>
      agent.get("/recipes").expect(400));
    it('should return "The name is missing in the query" as the error message', (done) => {
      agent
        .get("/recipes")
        .expect(400)
        .end(function (err, res) {
          if (res.text === "The name is missing in the query") {
            done();
          } else {
            done(new Error("The error message is incorrect"));
          }
        });
    });
    it("should return 200 and an array of the results of the request (API included)", (done) => {
      agent
        .get("/recipes?name=Cauliflower")
        .expect(200)
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body).to.be.an("array").and.to.have.lengthOf.above(1);
            done();
          }
        });
    });
    it("should filter the results based on the name provided on the query of the request", (done) => {
      Recipe.create(testRecipe);
      agent
        .get("/recipes?name=Cauliflower%20a%20la%20napolitana")
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body).to.be.an("array").and.to.have.lengthOf(1);
            done();
          }
        });
    });
  });
  describe.only("GET /recipes/{recipeId}", () => {
    it("should get a 404 and \"The given ID doesn't exist\" as an error message if the given ID doesn't belong to any recipe", (done) => {
      agent
        .get("/recipes/999")
        .send({ isLocal: true })
        .expect(404)
        .end(function (err, res) {
          if (res.text === "The given ID doesn't exist") {
            done();
          } else {
            done(new Error("The error message is incorrect"));
          }
        });
    });
    it("should return a 400 and \"The parameter 'isLocal' was not sent in the request body\" as the error message when no isLocal parameter is sent on the request", (done) => {
      agent
        .get("/recipes/1")
        .expect(400)
        .end(function (err, res) {
          if (
            res.text ===
            "The parameter 'isLocal' was not sent in the request body"
          ) {
            done();
          } else {
            done(new Error("The error message is incorrect"));
          }
        });
    });
    it("should return an array of the diets that the recipe has alongside with the rest of the optional info", (done) => {
      agent
        .get("/recipes/1")
        .send({ isLocal: true })
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body.healthScore).to.be.a("number");
            expect(res.body.steps).to.be.an("array");
            expect(res.body.diets).to.be.an("array").and.to.have.lengthOf(1);
            done();
          }
        });
    });
    it("should return a recipe with all the info when the recipe is not local", (done) => {
      agent
        .get("/recipe/10001")
        .send({ isLocal: false })
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body.healthScore).to.be.a("number");
            expect(res.body.steps).to.be.an("array");
            expect(res.body.diets).to.be.an("array").and.to.have.lengthOf(1);
            done();
          }
        });
    });
  });
  describe("POST /recipes", () => {
    it('should get a 400 and "The request is missing properties" as message if any of the required entries is missing', (done) => {
      agent
        .post("/recipes")
        .send({ name: "Test name" })
        .expect(400)
        .end(function (err, res) {
          if (res.text === "The request is missing properties") done();
          done(new Error("Should return an error message."));
        });
    });
    it("should return 200 and a response message if the recipe was successfully created", (done) => {
      agent
        .post("/recipes")
        .send(recipe)
        .expect(200)
        .end(function (res) {
          if (res.text === "The recipe was created successfully") done();
          done(new Error("Should return a response message"));
        });
    });
  });
  describe("GET /diets", () => {
    it("should return a 200 and the diets when requested (needs to create them if they doesn't exist)", (done) => {
      agent
        .get("/diets")
        .expect(200)
        .end(function (err, res) {
          if (err) done(new Error(`Something wrong happened: ${err}`));
          expect(res.body).to.be.an("array");
        });
    });
  });
});
