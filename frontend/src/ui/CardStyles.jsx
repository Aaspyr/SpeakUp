import styled from "styled-components";
import Button from "../ui/Button";

exports.CardsRow = styled.ul`
  display: flex;
`;
exports.StyledCard = styled(Button)`
  min-height: 12vh;
  width: 17vh;
  font-size: 0.6em;
  border-radius: var(--border-radius-lg);
  border: 1px solid;
  border-color: var(--color-brand-500);
  padding: 0.1rem 0.1rem;
  align-items: center;
  background-color: var(--color-brand-50);
  color: var(--color-brand-1000);
`;

exports.StyledCardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  grid-column: 1/-1;
`;
exports.StyledCards = styled.div`
  height: 40vh;
  margin: 0rem 1.5rem 0rem 1.5rem;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-brand-50);
  border-radius: var(--border-radius-lg);
`;
