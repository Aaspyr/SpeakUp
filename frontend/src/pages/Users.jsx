import { useState, useEffect } from "react";
import styled from "styled-components";
function Users() {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Load the stored value from localStorage when the component mounts
    const storedValue = localStorage.getItem("inputValue");
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Save the input value to localStorage
    localStorage.setItem("inputValue", newValue);
  };

  return (
    <StyledUserPage>
      <UserInfoContainer>
        <StyledImg src={`./../public/img/main-user.png`} />
        <StyledAboutMe>
          <StyledCard>
            <img src={`./../public/img/icons8-i-48.png`} />
            <h3>I</h3>
          </StyledCard>
          <StyledCard>
            <img src={`./../public/img/icons8-love-48.png`} />
            <h3>like</h3>
          </StyledCard>
          <StyledCard>
            <img src={`./../public/img/icons8-cat-48.png`} />
            <h3>cat</h3>
          </StyledCard>
          <StyledCard>
            <img src={`./../public/img/icons8-ampersand-100.png`} />
            <h3>and</h3>
          </StyledCard>
          <StyledCard>
            <img src={`./../public/img/icons8-puppy-48.png`} />
            <h3>dog</h3>
          </StyledCard>
        </StyledAboutMe>
      </UserInfoContainer>
      <StyledLabel>
        Enter a value:
        <StyledInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </StyledLabel>
    </StyledUserPage>
  );
}

export default Users;

const StyledUserPage = styled.div`
  display: flex;
`;
const StyledAboutMe = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
const StyledCard = styled.div`
  min-height: 12vh;
  width: 100px;
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

  &:hover {
    background-color: var(--color-brand-200);
  }
`;

const StyledInput = styled.textarea`
  width: 500px;
  height: 500px;
  font-size: 30px;
`;
const StyledLabel = styled.label`
  margin-top: 80px;
  display: flex;
  margin-left: 100px;
`;
const StyledImg = styled.img`
  width: 200px;
  padding: 20px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 100px;
`;
