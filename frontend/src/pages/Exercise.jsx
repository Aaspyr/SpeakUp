import { useState } from "react";
import styled from "styled-components";

function Exercise() {
  return (
    <StyledExercise>
      <FlashCards />
    </StyledExercise>
  );
}

const questions = [
  {
    questionId: 7418,
    question: <img src="./../public/img/icons8-broccolini-48.png" />,
    answer: "Broccoli",
  },
  {
    questionId: 4521,
    question: <img src="./../public/img/icons8-bread-48.png" />,
    answer: "Bread",
  },
  {
    questionId: 7397,
    question: <img src="./../public/img/icons8-cheese-48.png" />,
    answer: "Cheese",
  },
  {
    questionId: 7025,
    question: <img src="./../public/img/icons8-carrot-48.png" />,
    answer: "Carrot",
  },
  {
    questionId: 1258,
    question: <img src="./../public/img/icons8-tomato-48.png" />,
    answer: "Tomato",
  },
  {
    questionId: 3758,
    question: <img src="./../public/img/icons8-corn-48.png" />,
    answer: "Corn",
  },
  {
    questionId: 4658,
    question: <img src="./../public/img/icons8-milk-bottle-48.png" />,
    answer: "Milk",
  },
  {
    questionId: 5876,
    question: <img src="./../public/img/icons8-paprika-48.png" />,
    answer: "Paprika",
  },
  {
    questionId: 4352,
    question: <img src="./../public/img/icons8-bread-48.png" />,
    answer: "Chleb",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(questionId) {
    setSelectedId(questionId !== selectedId ? questionId : null);
    console.log(questionId);
  }

  return (
    <StyledRow>
      {questions.map((question) => (
        <StyledFlashcards
          key={question.questionId}
          onClick={() => handleClick(question.questionId)}
          className={question.questionId === selectedId ? "selected" : ""}
        >
          <p>
            {question.questionId === selectedId
              ? question.answer
              : question.question}
          </p>
        </StyledFlashcards>
      ))}
    </StyledRow>
  );
}

const StyledFlashcards = styled.div`
  border: 1px solid #e7e7e7;
  background-color: #f7f7f7;
  border-radius: 7px;
  aspect-ratio: 2 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-200);
  }
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const StyledExercise = styled.div`
  font-family: sans-serif;
  padding: 30px 200px 200px 200px;
`;

export default Exercise;
