import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRecipes } from "../features/recipes/recipeSlice";

const RecipesPage = () => {
  const recipes = useSelector(selectRecipes);

  let pages = [];
  const pageSize = 10;

  useEffect(() => {
    for (let i = 0; i < recipes.length; i += pageSize) {
      pages = recipes.slice(i, i + pageSize);
    }
  }, [recipes]);

  return null;
};

export default RecipesPage;
