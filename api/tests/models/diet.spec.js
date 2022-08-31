const { Diet, conn } = require("../../src/db.js");
const { expect } = require("chai");

const testObject = {
  name: "Sample Diet",
};

describe("Diet model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Diet.sync({ force: true }));
    describe("id", () => {
      it("should declare an id when a recipe is created", async () => {
        const test1 = await Diet.create(testObject);
        expect(test1.id).to.not.be.undefined;
      });
      it("should increment the id each time a recipe is created", async () => {
        const test1 = await Diet.create(testObject);
        const test2 = await Diet.create(testObject);
        const test3 = await Diet.create(testObject);
        expect(test1.getDataValue("id")).to.be.below(test2.getDataValue("id"));
        expect(test2.getDataValue("id")).to.be.below(test3.getDataValue("id"));
      });
    });
    describe("name", () => {
      it("should throw an error if name is not provided", (done) => {
        Diet.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", async () => {
        const test1 = await Diet.create(testObject);
        expect(test1.name).to.exist;
      });
    });
  });
});
