import { render, screen } from "@testing-library/react";

import { ManageItemButton } from "./";
import userEvent from "@testing-library/user-event";

describe("ManageItemButton Component", () => {
  it("should be able to render ManageItemButton Component correctly", () => {
    render(<ManageItemButton />);

    const triggerElement = screen.getByTestId("manage-item-dialog-trigger");

    expect(triggerElement).toBeInTheDocument();
  });

  it("should be able to render the dialog when the button is clicked", async () => {
    render(<ManageItemButton />);

    const triggerElement = screen.getByTestId("manage-item-dialog-trigger");

    userEvent.click(triggerElement);

    const dialogElement = await screen.findByTestId(
      "manage-item-dialog-content"
    );

    expect(dialogElement).toBeInTheDocument();
  });
});
