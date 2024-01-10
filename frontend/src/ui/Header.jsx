import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Row from "./Row";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  background-image: linear-gradient(
    110.1deg,
    rgba(60, 58, 115, 1) 67%,
    rgba(198, 55, 160, 1) 138.2%
  );
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <Row type="horizontal">
        <Link to={"/"}>
          <Logo />
        </Link>

        <MainNav />
      </Row>
    </StyledHeader>
  );
}

export default Header;
