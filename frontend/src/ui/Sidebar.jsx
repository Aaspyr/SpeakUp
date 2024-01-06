import styled from "styled-components";
import Row from "./Row";
import { Link } from "react-router-dom";
const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  background-color: (var --color-brand-1000);
  grid-row: auto/-1;
`;
const Title = styled.h1`
  padding: 10rem 0rem 0rem;
  font-size: 50px;
  color: var(--color-yellow-500);
`;

const SubTitle = styled.h3`
  color: var(--color-yellow-500);
  font-weight: 100;
  font-size: 15px;
  text-align: center;
`;

const StartLink = styled(Link)`
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
  font-weight: 500;
  text-align: center;
  border: none;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-radius-sm);
  width: 20rem;
  padding: 0rem 2rem;
  color: var(--color-brand-50);
  background-color: var(--color-brand-600);
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const RowHomepage = styled(Row)`
  padding: 0rem 2rem;
  align-items: center;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <RowHomepage>
        <Title>SpeakUp</Title>
        <SubTitle>Miejsce, które pomoże Ci przekazać swoje potrzeby</SubTitle>
        <StartLink to="/dashboard">Zacznij teraz</StartLink>
      </RowHomepage>
    </StyledSidebar>
  );
}

export default Sidebar;
