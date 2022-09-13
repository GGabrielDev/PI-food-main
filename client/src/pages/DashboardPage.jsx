import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavBar";
import { DashboardFrame } from "../components/GenericComponents";
import { RecipeEntry } from "../components/RecipeEntryComponents";

const DashboardPage = () => {
  return (
    <DashboardFrame>
      <NavigationBar />
      <Outlet />
    </DashboardFrame>
  );
};

export default DashboardPage;
