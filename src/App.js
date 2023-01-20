import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";

import { Provider } from "react-redux";

import store from "./store/store";

function App() {
  return (
    <Container>
      <Provider store={store}>
        <OrderEntry />
      </Provider>
    </Container>
  );
}

export default App;
