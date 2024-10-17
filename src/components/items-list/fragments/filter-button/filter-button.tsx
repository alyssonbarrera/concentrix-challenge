import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ItemFilters } from "@/contexts/items-context";
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
          <DropdownMenuItem
            key={filter.value}
            className={cn({
              "dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-950 text-zinc-100":
                selectedFilters.name === filter.value,
            })}
            onClick={() =>
              onChangeFilter({
                name:
                  selectedFilters.name === filter.value
                    ? undefined
                    : (filter.value as "asc" | "desc"),
              })
            }
            data-testid={`filter-dropdown-menu-item-${filter.value}`}
          >
            {filter.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {priorityFilters.map((filter) => (
          <DropdownMenuItem
            key={filter.value}
            className={cn({
              "dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-950 text-zinc-100":
                selectedFilters.priority === filter.value,
            })}
            onClick={() =>
              onChangeFilter({
                priority:
                  selectedFilters.priority === filter.value
                    ? undefined
                    : filter.value,
              })
            }
          >
            {filter.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {createdAtFilters.map((filter) => (
          <DropdownMenuItem
            key={filter.value}
            className={cn({
              "dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-950 text-zinc-100":
                selectedFilters.createdAt === filter.value,
            })}
            onClick={() =>
              onChangeFilter({
                createdAt:
                  selectedFilters.createdAt === filter.value
                    ? undefined
                    : (filter.value as "asc" | "desc"),
              })
            }
          >
            {filter.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
