/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const CategoryTile = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: ${(props) => (props.selected ? "#ebc7fe" : "transparent")};
  display: inline-block;
  cursor: pointer;

  border-radius: var(--border-radius-lg);
  border: 1px solid;
  border-color: var(--color-brand-500);
`;

const CategoryList = styled.div`
  margin-bottom: 20px;
`;

const CategorySelector = ({ cards, setFilteredItems }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = cards
    .map((card) => card.cardsCollection)
    .filter((value, index, self) => self.indexOf(value) === index);

  console.log(categories);
  const fetchCategoryItems = async (category) => {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/cards?cardsCollection=${category}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.data.cards;
    } else {
      console.error("Problem with fetching items from the backend");
      return [];
    }
  };

  const handleCategoryClick = async (category) => {
    const isSelected = selectedCategories.includes(category);
    let newSelectedCategories;

    if (isSelected) {
      newSelectedCategories = selectedCategories.filter(
        (cat) => cat !== category
      );
      setFilteredItems((prevItems) =>
        prevItems.filter((item) => item.cardsCollection !== category)
      );
    } else {
      newSelectedCategories = [...selectedCategories, category];
      const newItems = await fetchCategoryItems(category);
      setFilteredItems((prevItems) => [...prevItems, ...newItems]);
    }

    setSelectedCategories(newSelectedCategories);
  };

  return (
    <div>
      <CategoryList>
        {categories.map((category, index) => (
          <CategoryTile
            key={index}
            onClick={() => handleCategoryClick(category)}
            selected={selectedCategories.includes(category)}
          >
            <div>{category}</div>
          </CategoryTile>
        ))}
      </CategoryList>
    </div>
  );
};

export default CategorySelector;
