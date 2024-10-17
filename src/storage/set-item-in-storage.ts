import type { Item } from "@/contexts/items-context/types";
import { getItemsFromStorage } from "./get-items-from-storage";

export const setItemInStorage = (item: Item) => {
  const items = getItemsFromStorage();
  const newItems = [...items, item];

  localStorage.setItem("@concentrix:items", JSON.stringify(newItems));
};
