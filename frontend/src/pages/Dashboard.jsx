/* eslint-disable react/prop-types */

import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import CategorySelector from "./CategorySelector/CategorySelection.jsx";
import AddCard from "../features/AddCard.jsx";
import {
  HiOutlineBackspace,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi2";

function Dashboard() {
  const [cards, setCards] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShown, setIsShown] = useState(false);

  console.log(filteredItems, "filteredItems");
  console.log(cards, "cards");

  const handleShowAddForm = () => {
    setIsShown((current) => !current);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    const filtered = cards.filter((card) => categories.includes(card.category));
    setFilteredItems(filtered);
  };

  const handleCardClick = (card) => {
    if (!editMode) {
      setSentence((prev) => [...prev, card]);
    }
  };

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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    if (!editMode) {
      setSelectedCards([]);
    }
  };

  const handleCardSelect = (cardId) => {
    setSelectedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleDeleteCards = useCallback(async () => {
    try {
      await Promise.all(
        selectedCards.map((cardId) =>
          fetch(`http://127.0.0.1:3000/api/v1/cards/${cardId}`, {
            method: "DELETE",
          })
        )
      );

      const newCards = cards.filter(
        (card) => !selectedCards.includes(card._id)
      );
      const newFilteredItems = filteredItems.filter(
        (card) => !selectedCards.includes(card._id)
      );

      setCards(newCards);
      setFilteredItems(newFilteredItems);
      setSelectedCards([]);
    } catch (err) {
      console.error("Error deleting cards:", err);
    }
  }, [selectedCards, cards, filteredItems]);

  const handleSpeakText = useCallback(() => {
    const words = sentence.map((card) => card.name);
    words.forEach((word, index) => {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 1;
        utterance.lang = "en";
        speechSynthesis.speak(utterance);
      }, index * 1000);
    });
  }, [sentence]);

  return (
    <StyledContainer>
      <StyledMainContent>
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
              <Card
                card={item}
                onCardClick={handleCardClick}
                isEditMode={editMode}
                isSelected={selectedCards.includes(item._id)}
                onSelect={handleCardSelect}
                key={index}
              />
            ))}
          </StyledPhraseContainer>
          <StyledPhraseContainer>
            {sentence.map((cardItem, index) => (
              <DisplayedCard cardItem={cardItem} key={index} />
            ))}
          </StyledPhraseContainer>
        </StyledDashboardLayout>
        <StyledSidebar>
          <EditContainer>
            <StyledCheckbox
              type="checkbox"
              onChange={toggleEditMode}
              checked={editMode}
            />
            <div>
              <StyledButton onClick={handleShowAddForm}>
                <HiOutlinePlus />
              </StyledButton>
              <div>{isShown ? <AddCard /> : null}</div>
            </div>

            <StyledButton onClick={handleDeleteCards}>
              <HiOutlineTrash />
            </StyledButton>
          </EditContainer>
          <ClearSentenceButton onClick={() => setSentence([])}>
            <HiOutlineBackspace />
          </ClearSentenceButton>
          <ReadSentenceButton onClick={handleSpeakText}>
            <HiOutlineChatBubbleOvalLeftEllipsis />
          </ReadSentenceButton>
        </StyledSidebar>
      </StyledMainContent>
    </StyledContainer>
  );
}

export default Dashboard;

const StyledContainer = styled.div`
  margin-top: 20px;
  margin-right: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledMainContent = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  gap: 1rem;
`;

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const EditContainer = styled.section`
  margin-top: 40%;
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
  background-color: transparent;
  display: inline-block;
  cursor: pointer;
  width: 150px;
  border-radius: 5px;
`;

function Card({ card, onCardClick, isEditMode, isSelected, onSelect }) {
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect(card._id);
  };

  const handleClick = () => {
    if (!isEditMode) {
      onCardClick(card);
    }
  };

  return (
    <StyledCard onClick={handleClick}>
      {isEditMode && (
        <StyledCardCheckbox
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
        />
      )}
      <img
        src={`./../public/img/${card.imageCard.replace(/^.*\\/, "")}`}
        alt={`${card.name}`}
      />
      <h3>{card.name}</h3>
    </StyledCard>
  );
}

function DisplayedCard({ cardItem }) {
  return (
    <StyledCard>
      <img
        src={`./../public/img/${cardItem.imageCard.replace(/^.*\\/, "")}`}
        alt={`${cardItem.name}`}
      />
      <h3>{cardItem.name}</h3>
    </StyledCard>
  );
}

const StyledCardCheckbox = styled.input`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const StyledCard = styled.div`
  min-height: 12vh;
  width: 200px;
  position: relative;
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

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
`;

const ReadSentenceButton = styled.button`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: transparent;
  display: inline-block;
  cursor: pointer;
  width: 150px;
  border-radius: 5px;
`;
