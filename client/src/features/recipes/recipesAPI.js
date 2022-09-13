import axios from "axios";

const backendConnection = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 8000,
});

export async function getAllRecipes() {
  const response = await backendConnection.get("/recipes/startup");
  return response;
}

export async function getRecipesByName(name) {
  const response = await backendConnection.get("/recipes", {
    params: { name },
  });
  return response;
}

export async function getDetailsByID(id, isLocal = false) {
  const response = await backendConnection.get(`/recipes/${id}`, {
    params: { isLocal },
  });
  return response;
}

export async function getDiets() {
  const response = await backendConnection.get("/diets");
  return response;
}

export async function postRecipe(
  name,
  summary,
  healthScore = 0,
  steps = [],
  image = "",
  diets = []
) {
  const response = await backendConnection.post("/reipes", {
    data: {
      name,
      summary,
      healthScore,
      steps,
      image,
      diets,
    },
  });
  return response;
}
