import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ItemFilters } from "@/contexts/items-context/types";
import { PriorityEnum } from "@/enums/priority-enum";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

type FilterButtonProps = {
  selectedFilters: ItemFilters;
  onChangeFilter: (props: ItemFilters) => void;
};

export function FilterButton({
  onChangeFilter,
  selectedFilters,
}: FilterButtonProps) {
  const nameFilters = [
    { value: "asc", label: "Name (A-Z)" },
    { value: "desc", label: "Name (Z-A)" },
  ];

  const priorityFilters = [
    { value: PriorityEnum.LOW, label: "Priority (Low)" },
    { value: PriorityEnum.MEDIUM, label: "Priority (Medium)" },
    { value: PriorityEnum.HIGH, label: "Priority (High)" },
  ];

  const createdAtFilters = [
    { value: "asc", label: "Created (Oldest)" },
    { value: "desc", label: "Created (Newest)" },
  ];

  const toggleFilter = (field: keyof ItemFilters, value: string) => {
    onChangeFilter({
      [field]: selectedFilters[field] === value ? undefined : value,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          data-testid="filter-dropdown-trigger"
        >
          <Filter
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
            data-testid="filter-icon"
          />

          <span className="sr-only">Toggle filter</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        data-testid="filter-dropdown-menu-content"
      >
        <DropdownMenuLabel>Filters</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {nameFilters.map((filter) => (
          <FilterItem
            key={filter.value}
            field="name"
            filter={filter}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
          />
        ))}

        <DropdownMenuSeparator />

        {priorityFilters.map((filter) => (
          <FilterItem
            key={filter.value}
            field="priority"
            filter={filter}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
          />
        ))}

        <DropdownMenuSeparator />

        {createdAtFilters.map((filter) => (
          <FilterItem
            key={filter.value}
            filter={filter}
            field="createdAt"
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type FilterItemProps = {
  filter: { value: string; label: string };
  field: keyof ItemFilters;
  selectedFilters: ItemFilters;
  toggleFilter: (field: keyof ItemFilters, value: string) => void;
};

const FilterItem = ({
  field,
  filter,
  toggleFilter,
  selectedFilters,
}: FilterItemProps) => (
  <DropdownMenuItem
    key={filter.value}
    className={cn({
      "dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-950 text-zinc-100":
        selectedFilters[field] === filter.value,
    })}
  >
    <input
      type="checkbox"
      id={`${field}-${filter.value}`}
      hidden={true}
      checked={selectedFilters[field] === filter.value}
      onChange={() => toggleFilter(field, filter.value)}
      data-testid={`filter-dropdown-menu-item-checkbox-${field}-${filter.value}`}
    />
    <label
      htmlFor={`${field}-${filter.value}`}
      className="cursor-pointer w-full"
    >
      {filter.label}
    </label>
  </DropdownMenuItem>
);
