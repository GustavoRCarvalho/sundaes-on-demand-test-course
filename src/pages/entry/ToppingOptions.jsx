import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { updateItemCount } from "../../store/orderDetailsSlice";
import Form from "react-bootstrap/Form";

export default function ToppingOptions({ name, imagePath }) {
  const dispatch = useDispatch();

  function handleUpdateItem(e) {
    dispatch(
      updateItemCount({
        name: name,
        type: "toppings",
        count: !!e.target.checked,
      })
    );
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleUpdateItem} label={name} />
      </Form.Group>
    </Col>
  );
}
