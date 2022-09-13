import styled from "styled-components";

export const DashboardFrame = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  background-color: ${(props) => props.theme.secondary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

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

const DashboardPage = () => {
  return (
    <DashboardFrame>
      <NavBar />
    </DashboardFrame>
  );
};

export default DashboardPage;
