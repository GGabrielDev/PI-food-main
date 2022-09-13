import styled from "styled-components";
import { Link } from "react-router-dom";
import titleBg from "../assets/title-bg.jpeg";

export const TitleFrame = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  background: linear-gradient(
      230deg,
      #2c2c24 47.37%,
      #513c28 55.29%,
      rgba(81, 60, 40, 0) 60.89%
    ),
    url(${titleBg});
  background-size: cover;
`;

export const TitleDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  position: relative;

  width: fit-content;
  height: fit-content;
  left: 704px;
  top: 236px;
`;

export const SmallText = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: white;
`;

export const TitleText = styled.h1`
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 74px;
  color: ${(props) => props.theme.primary};
`;

export const TitleButton = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;

  background: ${(props) => props.theme.primaryAlt};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;

  flex: none;
  order: 2;
  flex-grow: 0;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
  line-height: 33px;
  color: white;

  transition: ease 0.5s;

  &:hover {
    background: white;
    color: ${(props) => props.theme.primaryAlt};
    transition: ease 0.5s;
  }
  &:disabled {
    background: ${(props) => props.theme.secondaryAlt};
    color: ${(props) => props.theme.lightGray};
    transition: ease 0.5s;
  }
`;
