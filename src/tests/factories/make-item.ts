import type { Item } from "@/contexts/items-context/types";
import { PriorityEnum } from "@/enums/priority-enum";
import { v7 as randomUUID } from "uuid";

export function makeItem(overrides: Partial<Item> = {}): Item {
  return {
    id: randomUUID(),
    name: "Item 1",
    description: "Description 1",
    priority: PriorityEnum.LOW,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}
