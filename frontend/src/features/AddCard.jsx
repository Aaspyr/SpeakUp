import styled from "styled-components";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRowVertical from "../ui/FormRowVertical";
import { useState } from "react";
function AddCard() {
  const [name, setName] = useState("");
  const [cardsCollection, setCardCollection] = useState("");
  const [imageCard, setImageCard] = useState("");

  async function addCard() {
    console.warn(name, cardsCollection, imageCard);
    let result = await fetch("http://127.0.0.1:3000/api/v1/cards", {
      method: "POST",
      body: JSON.stringify({ name, cardsCollection, imageCard }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
  }

  return (
    <div>
      <ModalOverlay>
        <Form>
          <FormRowVertical>
            <input
              type="text"
              placeholder="Enter card Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter card category"
              value={cardsCollection}
              onChange={(e) => setCardCollection(e.target.value)}
            />
            <input
              type="file"
              placeholder="Enter card image"
              value={imageCard}
              onChange={(e) => setImageCard(e.target.value)}
            />
            <Button onClick={addCard}>Add Card</Button>
          </FormRowVertical>
        </Form>
      </ModalOverlay>
    </div>
  );
}

export default AddCard;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
