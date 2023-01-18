import axios from "axios";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
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

  return <Row>{error ? <AlertBanner /> : optionItems}</Row>;
}
