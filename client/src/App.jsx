import { Route, Routes } from "react-router-dom";
import { AppFrame } from "./components/GenericComponents";
import DashboardPage from "./pages/DashboardPage";
import TitlePage from "./pages/TitlePage";

const App = () => {
  return (
    <AppFrame>
      <Routes>
        <Route path="/">
          <Route index element={<TitlePage />} />
          <Route path="dashboard" element={<DashboardPage />}></Route>
        </Route>
      </Routes>
    </AppFrame>
  );
};

export default App;
