import styled from "styled-components";
import { useEffect, useState } from "react";
//import Button from "../ui/Button";
import CategorySelector from "./CategorySelector/CategorySelection.jsx";

/* eslint-disable react/prop-types */
/*eslint-disable*/
function Dashboard() {
  const [cards, setCards] = useState([]); //item
  const [filteredItems, setFilteredItems] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };
  const handleCardClick = (card) => {
    setSentence((sentence) => [...sentence, card]);
  };

  console.log(sentence);

  //FETCH CARDS

  useEffect(() => {
    async function fetchCards() {
      let url = "http://127.0.0.1:3000/api/v1/cards";

      if (selectedCategories.length > 0) {
        const queryParams = selectedCategories
          .map((cat) => `cardsCollection=${cat}`)
          .join("&");
        url += `?${queryParams}`;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Something went wrong with fetching cards");
        }
        const data = await res.json();
        setCards(data.data.cards);
      } catch (err) {
        console.error(err.message);
        setCards([]);
      }
    }

    fetchCards();
  }, [selectedCategories]);

  const handleSpeakText = useCallback(() => {
    const words = sentence.join(" ").split(" ");
    words.forEach((word, index) => {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.5;
        speechSynthesis.speak(utterance);
      }, index * 1000);
    });
  }, [sentence]);

  return (
    <StyledDashboardLayout>
      <StyledCategories>
        <CategorySelector
          cards={cards}
          onCategoryChange={handleCategoryChange}
          setFilteredItems={setFilteredItems}
        />
      </StyledCategories>
      <StyledPhraseContainer>
        {filteredItems.map((item, index) => (
          <Card card={item} onCardClick={handleCardClick} key={index} />
        ))}
      </StyledPhraseContainer>
      <StyledSentenceContainer>
        <CardsRow sentence={sentence}>
          {sentence.map((cardItem) => (
            <DisplayedCards cardItem={cardItem} />
          ))}
        </CardsRow>
      </StyledSentenceContainer>
      <ClearSentenceButton onClick={() => setSentence([])}>
        Clear Sentence
      </ClearSentenceButton>
    </StyledDashboardLayout>
  );
}

export default Dashboard;

function DisplayedCards({ cardItem }) {
  return (
    <StyledCard>
      <img src={`./../public/img/${cardItem[1]}`} alt={`${cardItem[0]}`} />
      <h3>{cardItem[0]}</h3>
    </StyledCard>
  );
}

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledCategories = styled.div`
  height: 20vh;
  margin: 1.5rem 1.5rem 0rem 1.5rem;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-brand-50);
  border-radius: var(--border-radius-lg);
`;

const StyledPhraseContainer = styled.div`
  margin: 0rem 1.5rem 0rem 1.5rem;
  padding: 0.5rem;
  background-color: var(--color-brand-50);
  border-radius: var(--border-radius-lg);
  min-height: 20vh;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ClearSentenceButton = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.selected ? "#ddd" : "transparent")};
  display: inline-block;
  cursor: pointer;
  width: 150px;
  border-radius: 5px;
`;

const StyledSentenceContainer = styled.div`
  min-height: 20vh;
  margin: 0rem 1.5rem 0rem 1.5rem;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-brand-50);
  border-radius: var(--border-radius-lg);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Card({ card, onCardClick }) {
  return (
    <StyledCard onClick={() => onCardClick([card.name, card.imageCard])}>
      <img src={`./../public/img/${card.imageCard}`} alt={`${card.name}`} />
      <h3>{card.name}</h3>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  min-height: 12vh;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.6em;
  border-radius: var(--border-radius-lg);
  border: 1px solid;
  border-color: var(--color-brand-500);
  padding: 0.1rem 0.1rem;
  background-color: var(--color-brand-50);
  color: var(--color-brand-1000);
  margin: 5px;
`;

const CardsRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
