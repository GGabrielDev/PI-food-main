const { Recipe, Diet } = require("../db");

const singleApiFormat = (apiObject) => {
  let apiSteps = [];
  let apiDiets = [];

  if (apiObject.analyzedInstructions.length > 0) {
    apiSteps = apiObject.analyzedInstructions[0].steps.map((step) => step.step);
  }

  if (apiObject.vegetarian) apiDiets.push({ name: "vegetarian" });
  if (apiObject.lowFodmap) apiDiets.push({ name: "low fodmap" });

  return Recipe.build(
    {
      id: apiObject.id,
      name: apiObject.title,
      summary: apiObject.summary,
      image: apiObject.image,
      healthScore: apiObject.healthScore,
      steps: apiSteps,
      isLocal: false,
      diets: apiDiets.concat(
        apiObject.diets.map((diet) => {
          return { name: diet };
        })
      ),
    },
    { include: [Diet] }
  );
};

const formatApiToDbArray = (apiArray) => {
  return apiArray.map((element) => singleApiFormat(element));
};

const filterApiResult = (apiArray, term) => {
  return apiArray.filter(
    (object) => object.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
  );
};

module.exports = { formatApiToDbArray, filterApiResult, singleApiFormat };
