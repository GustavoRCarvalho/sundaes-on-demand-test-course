import Alert from "react-bootstrap/Alert";

export default function AlertBanner({
  alertMessage = "An unexpect error ocurred. Please try again later.",
  alertVariant = "danger",
}) {
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}
