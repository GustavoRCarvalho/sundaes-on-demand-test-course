import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";

const AllTheProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { renderWithContext as render };
