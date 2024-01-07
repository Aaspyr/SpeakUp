import styled from "styled-components";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  margin-top: 5px;
  padding: 0rem 1rem;
  height: 6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/speakup-logo-white.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
