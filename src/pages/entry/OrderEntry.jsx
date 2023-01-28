import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/utils";
import Options from "./Options";

export default function OrderEntry() {
  const { totals } = useSelector((state) => state.orderDetails);
  const grandTotal = formatCurrency(totals.toppings + totals.scoops);

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>{`Grand total: ${grandTotal}`}</h2>
    </div>
  );
}
