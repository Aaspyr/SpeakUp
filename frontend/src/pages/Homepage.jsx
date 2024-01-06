import styled from "styled-components";
import img from "../data/img/landing_page_clean2.png";
import HeaderHomepage from "../ui/HeaderHomepage";
import Sidebar from "../ui/Sidebar";

const StyledBackground = styled.div`
  height: 100%;
  border: 1px solid;
  background-color: var(--color-brand-1000);
`;

const StyledHomepage = styled.div`
  height: calc(100vh - 5rem);
  margin: 2.5rem;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
`;

const StyledHomepageLayout = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main``;

function Homepage() {
  return (
    <StyledBackground>
      <StyledHomepage>
        <HeaderHomepage />
        <StyledHomepageLayout>
          <Sidebar />
          <Main></Main>
        </StyledHomepageLayout>
      </StyledHomepage>
    </StyledBackground>
  );
}

export default Homepage;
