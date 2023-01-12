import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", () => {
  render(<Options />);

  //find images
  const scoopImages = screen.getAllByRole("image", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
