import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/utils";
import SummaryForm from "./SummaryForm";

export default function OrderSummary() {
  const { totals, scoops, toppings } = useSelector(
    (state) => state.orderDetails
  );

  const scoopArray = Object.entries(scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
}
