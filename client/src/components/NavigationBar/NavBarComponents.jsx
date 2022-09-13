import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  width: 100%;
  height: 124px;
  justify-content: space-between;
  background: linear-gradient(
    162deg,
    #513c28 4.95%,
    rgba(81, 60, 40, 0) 19.08%
  );
  border-radius: 10px 10px 0 0;
`;

export const AppLogo = styled.h1`
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 74px;
  padding: 0 32px;

  color: ${(props) => props.theme.primary};
`;

export const NavLink = styled(Link)`
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

export const NavMenu = styled.ul`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-right: 32px;
  list-style: none;
  text-align: center;
`;

export const NavMenuItem = styled.li`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: fit-content;
  padding: 0 12px;
  font-size: 28px;
  font-weight: 700;
  color: white;
  color: white;
  background: ${(props) => props.theme.primaryAlt};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: ease 0.5s;

  &:hover {
    color: ${(props) => props.theme.primaryAlt};
    background: white;
    transition: ease 0.5s;
  }
`;

export const NavSearch = styled.input`
  width: 292px;
  height: 48px;
  padding: 0 16px;
  background: ${(props) => props.theme.lightGray};
  border: none;
  border-radius: 10px 0 0 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: ${(props) => props.theme.gray};

  &:focus {
    border: none;
  }
`;

export const NavSeachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: fit-content;
  padding: 0 12px;
  font-size: 28px;
  font-weight: 700;
  color: white;
  background: ${(props) => props.theme.primary};
  border: none;
  border-radius: 0 10px 10px 0;
  transition: ease 0.5s;

  &:hover {
    color: ${(props) => props.theme.primary};
    background: white;
    transition: ease 0.5s;
  }
`;

export const NavLine = styled.div`
  position: absolute;
  width: 1024px;
  height: 0px;
  left: 128px;
  top: 123px;

  /* Accent 1 */

  border: 4px solid ${(props) => props.theme.primary};
`;
