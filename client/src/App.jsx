import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Route, Routes } from "react-router-dom";
import { fillState, selectStatus } from "./features/recipes/recipeSlice";
import { AppFrame } from "./components/GenericComponents";
// import TitlePage from "./pages/TitlePage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillState());
  }, []);

  return (
    <AppFrame>
      <DashboardPage />
      {/*
      <Routes>
        <Route path="/">
          <Route index element={<TitlePage />} />
        </Route>
			</Routes>
			*/}
    </AppFrame>
  );
};

export default App;
