import { render, screen, waitFor } from "@testing-library/react";
import { ItemForm } from "./item-form";

import { userEvent } from "@testing-library/user-event";

const onSuccessfulSubmit = vi.fn();

describe("ItemForm Component", () => {
  it("should be able to render the ItemForm component correctly", () => {
    render(<ItemForm onSuccessfulSubmit={onSuccessfulSubmit} />);

    const itemForm = screen.getByTestId("item-form");
    const itemNameInput = screen.getByTestId("item-form-input-name");
    const itemDescriptionTextarea = screen.getByTestId(
      "item-form-textarea-description"
    );
    const itemPriorityRadioGroup = screen.getByTestId(
      "item-form-radio-group-priority"
    );

    expect(itemForm).toBeDefined();
    expect(itemNameInput).toBeDefined();
    expect(itemDescriptionTextarea).toBeDefined();
    expect(itemPriorityRadioGroup).toBeDefined();
  });

  it("should not be able to submit the form when the name and description are empty", async () => {
    render(
      <div>
        <ItemForm onSuccessfulSubmit={onSuccessfulSubmit} />
        <button
          type="submit"
          form="item-form"
          data-testid="item-form-submit-button"
        >
          Submit
        </button>
      </div>
    );

    const submitButton = screen.getByTestId("item-form-submit-button");

    userEvent.click(submitButton);

    const fieldErrorMessageName = await screen.findByTestId(
      "item-form-error-message-name"
    );
    const fieldErrorMessageDescription = await screen.findByTestId(
      "item-form-error-message-description"
    );

    expect(fieldErrorMessageName).toHaveTextContent(
      "Name must have at least 3 characters"
    );
    expect(fieldErrorMessageDescription).toHaveTextContent(
      "Description must have at least 3 characters"
    );
  });

  it("should be able to submit the form when the name and description are filled", async () => {
    render(
      <div>
        <ItemForm onSuccessfulSubmit={onSuccessfulSubmit} />
        <button
          type="submit"
          form="item-form"
          data-testid="item-form-submit-button"
        >
          Submit
        </button>
      </div>
    );

    const submitButton = screen.getByTestId("item-form-submit-button");
    const itemNameInput = screen.getByTestId("item-form-input-name");
    const itemDescriptionTextarea = screen.getByTestId(
      "item-form-textarea-description"
    );

    userEvent.type(itemNameInput, "Item Name");
    userEvent.type(itemDescriptionTextarea, "Item Description");

    userEvent.click(submitButton);

    await waitFor(() => {
      const fieldErrorMessageName = screen.queryByTestId(
        "item-form-error-message-name"
      );
      const fieldErrorMessageDescription = screen.queryByTestId(
        "item-form-error-message-description"
      );

      expect(fieldErrorMessageName).toBeNull();
      expect(fieldErrorMessageDescription).toBeNull();
    });
  });
});
