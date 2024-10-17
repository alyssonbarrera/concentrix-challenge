import type { PriorityEnum } from "@/enums/priority-enum";

export type Item = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  priority: PriorityEnum;
};

export type MetaData = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type CreateItem = Omit<Item, "id" | "createdAt">;
export type UpdateItem = Partial<CreateItem>;

export type ItemFilters = {
  name?: "asc" | "desc";
  priority?: PriorityEnum;
  createdAt?: "asc" | "desc";
};

export type FetchItemsProps = {
  page: number;
  limit?: number;
  filters?: ItemFilters;
};

export type ItemsProviderState = {
  items: Item[];
  loading: boolean;
  metadata: MetaData;
  addItem: (item: CreateItem) => void;
  removeItem: (id: string) => void;
  getItemById: (id: string) => Item | null;
  fetchItems: (props: FetchItemsProps) => { data: Item[]; metadata: MetaData };
  updateItem: (id: string, item: UpdateItem) => void;
};
