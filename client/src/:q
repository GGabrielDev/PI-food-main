import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import styled from "styled-components";

export const RecipeCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 592px;
  height: 80px;
  background: ${(props) => props.theme.secondaryAlt};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  overflow: hidden;
`;

export const RecipeImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const RecipeTextWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 16px;
  gap: 8px;
  height: 100%;
  width: 100%;
  max-width: 432px;
`;

export const RecipeName = styled.h2`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;

  color: white;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RecipeDiets = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 16px;
  line-height: 22px;

  color: white;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const RecipeDetailsButton = styled(Link)`
  width: 80px;
  height: 80px;
  padding: 0 4px;
  font-size: 72px;

  color: white;
  background: ${(props) => props.theme.primary};
`;

export const RecipeEntry = () => {
  return (
    <RecipeCard>
      <RecipeImage
        src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/processed-food700-350-e6d0f0f.jpg"
        alt="A recipe"
      />
      <RecipeTextWrapper>
        <RecipeName>A recipe name, and a very long one for sure</RecipeName>
        <RecipeDiets>
          Diets: Vegetarian, Vegan, Primal, Whole 30, Keto, Gluten Free, Daily
          Free
        </RecipeDiets>
      </RecipeTextWrapper>
      <RecipeDetailsButton to="/dashbord/details">
        <FaAngleDown />
      </RecipeDetailsButton>
    </RecipeCard>
  );
};
