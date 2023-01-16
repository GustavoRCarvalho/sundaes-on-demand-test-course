import axios from "axios";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace "null" with ToppingOption
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return <Row>{optionItems}</Row>;
}
