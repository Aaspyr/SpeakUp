import { useState, useEffect } from "react";

const Fetch = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/cards")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        setPhotos(data.data);
      });
  }, []);
  return console.log(photos.cards);
};
export default Fetch;
