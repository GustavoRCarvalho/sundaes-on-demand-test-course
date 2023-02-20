import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  //render app
  const { unmount } = render(<App />);

  //add ice cream scoops and toppings
  const inputCholate = await screen.findByRole("spinbutton", {
    name: /Chocolate/i,
  });
  await user.clear(inputCholate);
  await user.type(inputCholate, "1");

  const inputCherries = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  await user.click(inputCherries);

  //find and click order button
  // const orderSubmitButton = screen.getByRole("button", {
  //   name: /order sundae/i,
  // });

  // await user.click(orderSubmitButton);

  // //check summary information based on order
  // const summaryHeading = await screen.findByRole("header", {
  //   name: "Order Summary",
  // });
  // expect(summaryHeading).toBeInTheDocument();

  // const scoopsTotal = await screen.findByRole("header", {
  //   name: "Scoops: $2.00",
  // });
  // expect(scoopsTotal).toBeInTheDocument();

  // const toppingsTotal = await screen.findByRole("header", {
  //   name: "toppings: $1.50",
  // });
  // expect(toppingsTotal).toBeInTheDocument();

  // const grandTotal = await screen.findByRole("header", { name: /total:/i });
  // expect(grandTotal).toHaveTextContent("3.50");

  //accept terms and conditions and click button to confirm order
  // const temsAndConditions = screen.getByRole("checkbox", {
  //   name: /I agree to$/i,
  // });
  // await user.click(temsAndConditions);

  // const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  // await user.click(confirmButton);

  //confirm order number on confirmation page

  //click "new order button on confirmation page"

  //click that scoops and toppings subtotals have been reset

  //do we need to await anithing to avoid test errors/
  unmount();
});
