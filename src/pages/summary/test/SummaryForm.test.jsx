import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("Checking checkbox enables button and unchecking again disables button", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  const checkboxTerms = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const buttonConfirmOrder = screen.getByRole("button", {
    name: /confirm order/i,
  });

  await user.click(checkboxTerms);
  expect(buttonConfirmOrder).toBeEnabled();

  await user.click(checkboxTerms);
  expect(buttonConfirmOrder).toBeDisabled();
});

test("hover and view a popover terms and conditions", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const nullPopOverTerms = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopOverTerms).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  const popOverTerms = screen.getByText(
    /no ice cream will actually be delivered/i
  );
  expect(popOverTerms).toBeInTheDocument();

  await user.unhover(termsAndConditions);
  expect(popOverTerms).not.toBeInTheDocument();
});
