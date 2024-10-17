import { render, screen, waitFor } from "@testing-library/react";

import { FilterButton } from "./";
import userEvent from "@testing-library/user-event";

const onChangeFilter = vi.fn();

describe("FilterButton Component", () => {
  it("should be able to render FilterButton Component correctly", () => {
    render(
      <FilterButton onChangeFilter={onChangeFilter} selectedFilters={{}} />
    );

    const triggerElement = screen.getByTestId("filter-dropdown-trigger");

    expect(triggerElement).toBeInTheDocument();
  });

  it("should be able to expand dropdown menu when clicking on dropdown trigger button", async () => {
    render(
      <FilterButton onChangeFilter={onChangeFilter} selectedFilters={{}} />
    );

    const triggerElement = screen.getByTestId("filter-dropdown-trigger");

    userEvent.click(triggerElement);

    const dropdownMenu = await screen.findByTestId(
      "filter-dropdown-menu-content"
    );

    expect(dropdownMenu).toBeInTheDocument();
  });

  it("should be able to select filter option when clicking on dropdown menu item", async () => {
    render(
      <FilterButton onChangeFilter={onChangeFilter} selectedFilters={{}} />
    );

    const triggerElement = screen.getByTestId("filter-dropdown-trigger");

    userEvent.click(triggerElement);

    const dropdownMenu = await screen.findByTestId(
      "filter-dropdown-menu-content"
    );

    expect(dropdownMenu).toBeInTheDocument();

    const dropdownMenuItem = screen.getByTestId(
      "filter-dropdown-menu-item-asc"
    );

    userEvent.click(dropdownMenuItem);

    await waitFor(() => {
      expect(onChangeFilter).toHaveBeenCalled();
      expect(onChangeFilter).toHaveBeenCalledTimes(1);
      expect(onChangeFilter).toHaveBeenCalledWith({ name: "asc" });
    });
  });
});
