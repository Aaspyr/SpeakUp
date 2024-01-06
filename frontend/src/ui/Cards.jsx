// import styled from "styled-components";
// import { useEffect, useState } from "react";
// import Button from "./Button";

// /* eslint-disable react/prop-types */
// const StyledCards = styled.div`
//   height: 40vh;
//   margin: 0rem 1.5rem 0rem 1.5rem;
//   padding: 0.5rem 0.5rem;
//   background-color: var(--color-brand-50);
//   border-radius: var(--border-radius-lg);
// `;

// function Cards() {
//   const [cards, setCards] = useState([]);
//   useEffect(function () {
//     async function fetchCards() {
//       try {
//         const res = await fetch("http://127.0.0.1:3000/api/v1/cards");

//         if (!res.ok)
//           throw new Error("Something went wrong with fetching cards");

//         const data = await res.json();
//         setCards(data.data.cards);
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//     fetchCards();
//   }, []);

//   return (
//     <StyledCards>
//       <CardsList cards={cards} />
//     </StyledCards>
//   );
// }

// export default Cards;

// function Card({ card }) {
//   return (
//     <StyledCard>
//       <img src={`./../public/img/${card.imageCard}`} alt={`${card.name}`} />
//       <h3>{card.name}</h3>
//     </StyledCard>
//   );
// }

// function CardsList({ cards }) {
//   return (
//     <StyledCardList>
//       {cards.map((card) => (
//         <Card card={card} key={card.id} />
//       ))}
//     </StyledCardList>
//   );
// }
// const StyledCard = styled(Button)`
//   min-height: 12vh;
//   width: 17vh;
//   font-size: 0.6em;
//   border-radius: var(--border-radius-lg);
//   border: 1px solid;
//   border-color: var(--color-brand-500);
//   padding: 0.1rem 0.1rem;
//   align-items: center;
//   background-color: var(--color-brand-50);
//   color: var(--color-brand-1000);
// `;

// const StyledCardList = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(10, 1fr);
//   gap: 10px;
//   grid-column: 1/-1;
// `;
