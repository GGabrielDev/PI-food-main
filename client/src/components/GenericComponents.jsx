import styled, { keyframes } from "styled-components";

export const AppFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 1280px;
  height: 720px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: -5px 5px 10px 5px rgba(0, 0, 0, 0.5);
`;

const SpinnerKeyframes = keyframes`
	from {
		transform: rotate(0deg);
	} to {
		transform: rotate(360deg);
	}
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #ff5cb9;
  animation: ${SpinnerKeyframes} 1s linear infinite;
  border-radius: 50%;

  transition: ease 0.5s;
`;

export const DashboardFrame = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  background-color: ${(props) => props.theme.secondary};
`;
