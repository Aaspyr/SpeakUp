import { Outlet } from "react-router-dom";

import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-image: linear-gradient(
    110.1deg,
    rgba(60, 58, 115, 1) 50%,
    rgba(198, 55, 160, 1) 138.2%
  );
  grid-column: 1/-1;
  padding: 4rem 4.8rem 6.4 rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
