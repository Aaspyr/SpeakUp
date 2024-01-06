import styled from "styled-components";

const StyledPhrase = styled.div`
  height: 20vh;
  margin: 0rem 1.5rem 0rem 1.5rem;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-brand-50);
  border-radius: var(--border-radius-lg);
`;

function PhraseContainer() {
  return <StyledPhrase />;
}
export default PhraseContainer;
