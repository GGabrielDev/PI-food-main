/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
  summary: "A test description",
  healthScore: 10.1,
  steps: ["Test1", "Test2", "Test3"],
};

const testRecipe = {
  name: "Filete a la napolitana",
  summary: "A test description",
  healthScore: 10.1,
  steps: ["Test1", "Test2", "Test3"],
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", () => {
    it("should get 400 if no name query is provided", () =>
      agent.get("/recipes").expect(400));
    it('should return "The name is missing in the query" as the error message', (done) => {
      agent
        .get("/recipes")
        .expect(400)
        .end(function (err, res) {
          if (err.message === "The name is missing in the query") done();
          done(new Error("The message is incorrect"));
        });
    });
    it("should return 200 and an array of the results of the request", (done) => {
      agent
        .get("/recipes?name=Milanesa")
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) done(new Error(`Something wrong happened: ${err}`));
          expect(res.body).to.be.an("array").and.to.have.lengthOf(1);
        });
    });
    it("should filter the results based on the name provided on the query of the request", (done) => {
      Recipe.create(testRecipe);
      agent
        .get("/recipes?name=Milanesa")
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) done(new Error(`Something wrong happened: ${err}`));
          expect(res.body).to.be.an("array").and.to.have.lengthOf(1);
        });
    });
  });
});
