import styled from "styled-components";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  padding: 0rem 4rem;
  height: 8rem;
  width: auto;
`;

function HomepageLogo() {
  return (
    <StyledLogo>
      <Img src="/speakup-logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default HomepageLogo;
