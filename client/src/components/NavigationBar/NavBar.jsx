import { FaFilter, FaSearch } from "react-icons/fa";
import {
  AppLogo,
  NavBar,
  NavButton,
  NavLine,
  NavLink,
  NavMenu,
  NavMenuItem,
  NavSearch,
  NavSeachButton,
} from "./NavBarComponents";

const NavigationBar = () => {
  return (
    <>
      <NavBar>
        <NavLink to="/dashboard">
          <AppLogo>FOODS APP</AppLogo>
        </NavLink>
        <NavMenu>
          <NavMenuItem>
            <NavButton>
              <FaFilter />
            </NavButton>
          </NavMenuItem>
          <NavMenuItem>
            <NavButton>New Recipe</NavButton>
          </NavMenuItem>
          <NavMenuItem>
            <NavSearch />
            <NavSeachButton>
              <FaSearch />
            </NavSeachButton>
          </NavMenuItem>
        </NavMenu>
      </NavBar>
      <NavLine />
    </>
  );
};

export default NavigationBar;
