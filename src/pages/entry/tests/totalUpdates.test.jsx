import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //make sure total starts out at $0.00
  const scoopsTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1, and check subtotal

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsTotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsTotal).toHaveTextContent("6.00");
  await user.type(chocolateInput, "0");
  await user.type(vanillaInput, "0");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesInput);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const mmsInput = await screen.findByRole("checkbox", { name: "M&Ms" });

  await user.click(mmsInput);
  expect(toppingsTotal).toHaveTextContent("3.00");

  await user.click(cherriesInput);
  expect(toppingsTotal).toHaveTextContent("1.50");
  await user.click(mmsInput);
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("5.50");
    await user.click(cherriesInput);
    await user.type(chocolateInput, "0");
  });
  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("1.50");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");
    await user.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesInput);
    await user.type(chocolateInput, "0");
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
