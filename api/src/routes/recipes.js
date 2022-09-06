const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const {
  singleApiFormat,
  formatApiToDbArray,
  filterApiResult,
} = require("../helpers/routeHelper");
const { API_KEY } = process.env;

const router = Router();

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
          number: 100,
          addRecipeInformation: true,
          apiKey: API_KEY,
        },
      }
    );
    const apiResults = filterApiResult(
      formatApiToDbArray(apiResponse.data.results),
      name
    );
    return res.status(200).json([...dbResults, ...apiResults]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/startup", async (req, res) => {
  try {
    const dbResults = await Recipe.findAll({
      attributes: ["id", "name", "summary", "image", "isLocal"],
    });
    const apiResponse = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          number: 100,
          addRecipeInformation: true,
          apiKey: API_KEY,
        },
      }
    );
    const apiResults = formatApiToDbArray(apiResponse.data.results);
    console.log([...dbResults, ...apiResults].length);
    return res.status(200).json([...dbResults, ...apiResults]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const { isLocal } = req.query;

  if (!(isLocal === "true" || isLocal === "false"))
    return res
      .status(400)
      .send("The parameter 'isLocal' was not sent in the request query");
  try {
    let result = {};
    if (isLocal === "true") {
      result = await Recipe.findOne({ where: { id: recipeId }, include: Diet });
      if (result === null)
        return res.status(404).send("The given ID doesn't exist");
    }
    if (isLocal === "false") {
      const apiResult = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            apiKey: API_KEY,
          },
        }
      );
      result = singleApiFormat(apiResult.data);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { name, summary, healthScore, steps, image, diets } = req.body;

  if (name === undefined || summary === undefined || diets === undefined)
    return res.status(400).send("The request is missing properties");
  try {
    const result = await Recipe.create(
      {
        name,
        summary,
        healthScore,
        steps,
        image,
        isLocal: true,
        diets,
      },
      {
        include: [Diet],
      }
    );
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
