import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { updateItemCount } from "../../store/OrderDetailsSlice";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";

export default function ScoopOption({ name, imagePath }) {
  const dispatch = useDispatch();

  function handleUpdateItem(e) {
    dispatch(
      updateItemCount({
        name: name,
        type: "scoops",
        count: parseInt(e.target.value),
      })
    );
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`https://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      ></img>
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleUpdateItem}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
