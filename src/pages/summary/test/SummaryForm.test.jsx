import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);

  const checkboxTerms = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkboxTerms).not.toBeChecked();

  const buttonConfirmOrder = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(buttonConfirmOrder).toBeDisabled();
});

test("Checking checkbox enables button and unchecking again disables button", () => {
  render(<SummaryForm />);

  const checkboxTerms = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const buttonConfirmOrder = screen.getByRole("button", {
    name: /confirm order/i,
  });

  fireEvent.click(checkboxTerms);
  expect(buttonConfirmOrder).toBeEnabled();

  fireEvent.click(checkboxTerms);
  expect(buttonConfirmOrder).toBeDisabled();
});
