import { getItemsFromStorage } from "@/storage/get-items-from-storage";
import { setItemInStorage } from "@/storage/set-item-in-storage";
import { setItemsInStorage } from "@/storage/set-items-in-storage";
import { createContext, useCallback, useEffect, useState } from "react";
import { v7 as randomUUID } from "uuid";
import type {
  CreateItem,
  FetchItemsProps,
  Item,
  ItemsProviderState,
  UpdateItem,
} from "./types";

function defaultFunction() {
  return null;
}

const defaultMetadata = {
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
};

const initialState: ItemsProviderState = {
  items: [],
  loading: true,
  metadata: defaultMetadata,
  fetchItems: () => ({
    data: [],
    metadata: { totalItems: 0, totalPages: 0, currentPage: 1 },
  }),
  addItem: defaultFunction,
  removeItem: defaultFunction,
  updateItem: defaultFunction,
  getItemById: defaultFunction,
};

type ItemsProviderProps = {
  children: React.ReactNode;
};

export const ItemsProviderContext =
  createContext<ItemsProviderState>(initialState);

export function ItemsProvider({ children }: ItemsProviderProps) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [metadata, setMetadata] = useState(defaultMetadata);

  const getItemById = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id) || null;
    },
    [items]
  );

  const addItem = (data: CreateItem) => {
    const item = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    setItems([...items, item]);
    setItemInStorage(item);
  };

  const removeItem = (id: string) => {
    const itemsWithoutDeletedItem = items.filter((item) => item.id !== id);

    setItems(itemsWithoutDeletedItem);
    setItemsInStorage(itemsWithoutDeletedItem);
  };

  const updateItem = (id: string, updatedItem: UpdateItem) => {
    const currentItem = items.find((item) => item.id === id);

    if (!currentItem) return;

    const newItem = { ...currentItem, ...updatedItem };

    const itemsWithUpdatedItem = items.map((item) =>
      item.id === id ? newItem : item
    );

    setItems(itemsWithUpdatedItem);
    setItemsInStorage(itemsWithUpdatedItem);
  };

  const sortByName = (items: Item[], order: "asc" | "desc") => {
    return items.sort((a, b) => {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  };

  const sortByCreatedAt = (items: Item[], order: "asc" | "desc") => {
    return items.sort((a, b) => {
      return order === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const filterByPriority = (
    items: Item[],
    priority: "low" | "medium" | "high"
  ) => {
    return items.filter((item) => item.priority === priority);
  };

  const fetchItems = (props: FetchItemsProps) => {
    const { page, limit = 10, filters } = props;

    let filteredItems = [...items];

    if (filters?.priority) {
      filteredItems = filterByPriority(filteredItems, filters.priority);
    }

    if (filters?.createdAt) {
      filteredItems = sortByCreatedAt(filteredItems, filters.createdAt);
    }

    if (filters?.name) {
      filteredItems = sortByName(filteredItems, filters.name);
    }

    const metadata = {
      totalItems: filteredItems.length,
      totalPages: Math.ceil(filteredItems.length / limit),
      currentPage: page,
    };

    return {
      data: filteredItems.slice((page - 1) * limit, page * limit),
      metadata,
    };
  };

  useEffect(() => {
    const items = getItemsFromStorage();

    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / 10);

    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      totalItems,
      totalPages,
    }));

    setItems(items);
    setLoading(false);
  }, []);

  const value = {
    items,
    loading,
    metadata,
    addItem,
    removeItem,
    fetchItems,
    updateItem,
    getItemById,
  };

  return (
    <ItemsProviderContext.Provider value={value}>
      {children}
    </ItemsProviderContext.Provider>
  );
}
