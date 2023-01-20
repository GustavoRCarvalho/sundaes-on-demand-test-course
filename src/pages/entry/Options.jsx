import axios from "axios";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../utils/constants";
import { formatCurrency } from "../../utils/utils";
import { useSelector } from "react-redux";

export default function Options({ optionType }) {
  const { totals } = useSelector((state) => state.orderDetails);
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

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} Total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{error ? <AlertBanner /> : optionItems}</Row>;
    </>
  );
}
