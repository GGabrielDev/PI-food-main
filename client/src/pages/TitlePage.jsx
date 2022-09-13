import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillState, selectStatus } from "../features/recipes/recipeSlice";
import {
  TitleFrame,
  TitleDetails,
  TitleText,
  TitleButton,
  SmallText,
} from "../components/TitleComponents";
import { Spinner } from "../components/GenericComponents";

const TitlePage = () => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillState());
  }, []);

  return (
    <TitleFrame>
      <TitleDetails>
        <SmallText>Welcome, to the</SmallText>
        <TitleText>FOODS APP</TitleText>
        {status === "loading" ? (
          <Spinner />
        ) : (
          <TitleButton>Start Here</TitleButton>
        )}
      </TitleDetails>
    </TitleFrame>
  );
};

export default TitlePage;
