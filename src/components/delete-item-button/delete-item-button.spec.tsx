import { render, screen, waitFor } from "@testing-library/react";

import { DeleteItemButton } from "./";
import userEvent from "@testing-library/user-event";
import * as useItems from "@/hooks/use-items";

const mockRemoveItem = vi.fn();

vi.spyOn(useItems, "useItems").mockReturnValue({
  addItem: vi.fn(),
  fetchItems: vi.fn(),
  getItemById: vi.fn(),
  items: [],
  loading: false,
  metadata: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  },
  updateItem: vi.fn(),
  removeItem: mockRemoveItem,
});

describe("DeleteItemButton Component", () => {
  it("should be able to render DeleteItemButton Component correctly", () => {
    render(<DeleteItemButton id="1" />);

    const triggerElement = screen.getByTestId(
      "delete-item-alert-dialog-trigger"
    );

    expect(triggerElement).toBeInTheDocument();
  });

  it("should be able to render the dialog when the button is clicked", async () => {
    render(<DeleteItemButton id="1" />);

    const triggerElement = screen.getByTestId(
      "delete-item-alert-dialog-trigger"
    );

    userEvent.click(triggerElement);

    const dialogElement = await screen.findByTestId(
      "delete-item-dialog-content"
    );

    expect(dialogElement).toBeInTheDocument();
  });

  it("should be able to call the removeItem function when the delete button is clicked", async () => {
    render(<DeleteItemButton id="1" />);

    const triggerElement = screen.getByTestId(
      "delete-item-alert-dialog-trigger"
    );

    userEvent.click(triggerElement);

    const deleteButtonElement = await screen.findByTestId("delete-item-button");

    userEvent.click(deleteButtonElement);

    await waitFor(() => {
      expect(mockRemoveItem).toHaveBeenCalled();
      expect(mockRemoveItem).toHaveBeenCalledTimes(1);
      expect(mockRemoveItem).toHaveBeenCalledWith("1");
    });
  });
});
