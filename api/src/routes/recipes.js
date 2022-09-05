const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY3 } = process.env;

const router = Router();

const apiToDbFormat = (apiArray, details = false) => {
  return apiArray.map((apiObject) => {
    let apiSteps = [];
    let apiDiets = [];
    let basicRecipe = {
      id: apiObject.id,
      name: apiObject.title,
      summary: apiObject.summary,
      image: apiObject.image,
      isLocal: false,
    };

    if (apiObject.analyzedInstructions.length > 0) {
      apiSteps = apiObject.analyzedInstructions[0].steps.map(
        (step) => step.step
      );
    }

    if (apiObject.vegetarian) apiDiets.push({ name: "vegetarian" });
    if (apiObject.lowFodmap) apiDiets.push({ name: "low fodmap" });

    return Recipe.build(
      {
        ...basicRecipe,
        ...(details
          ? {
              healthScore: apiObject.healthScore,
              steps: apiSteps,
            }
          : {}),
        diets: apiDiets.concat(
          apiObject.diets.map((diet) => {
            return { name: diet };
          })
        ),
      },
      { include: [Diet] }
    );
  });
};

const filterApiResult = (apiArray, term) => {
  return apiArray.filter(
    (object) => object.name.toLowerCase().indexOf(term.toLowerCase()) !== -1
  );
};

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).send("The name is missing in the query");
  try {
    const dbResults = await Recipe.findAll({
      attributes: ["id", "name", "summary", "image", "isLocal"],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    const apiResponse = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          number: 10,
          addRecipeInformation: true,
          apiKey: API_KEY3,
        },
      }
    );
    const apiResults = filterApiResult(
      apiToDbFormat(apiResponse.data.results),
      name
    );
    return res.status(200).json([...dbResults, ...apiResults]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
