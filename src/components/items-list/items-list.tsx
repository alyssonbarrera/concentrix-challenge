import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useItems } from "@/hooks/use-items";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Pagination } from "../pagination";
import { FilterButton } from "./fragments/filter-button";
import type { ItemFilters } from "@/contexts/items-context/types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DeleteItemButton } from "../delete-item-button";
import { ManageItemButton } from "../manage-item-button";
import { EmptyList } from "./fragments/empty-list";
import { Reveal } from "../reveal";

dayjs.extend(relativeTime);

export function ItemsList() {
  const { fetchItems, loading } = useItems();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ItemFilters>({
    name: undefined,
    priority: undefined,
    createdAt: "desc",
  });

  const items = fetchItems({ page: currentPage, filters });

  const onChangeFilter = (filter: ItemFilters) => {
    setFilters({ ...filters, ...filter });
    setCurrentPage(1);
  };

  return (
    <section className="max-w-[1200px] mx-auto py-6 px-4 xl:px-0">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Items</h2>

        <FilterButton
          selectedFilters={filters}
          onChangeFilter={onChangeFilter}
        />
      </header>

      {!loading && items.metadata.totalItems === 0 && <EmptyList />}

      {!loading && items.metadata.totalItems > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 row-auto">
          {fetchItems({ page: currentPage, filters }).data.map(
            (item, index) => (
              <Reveal
                key={item.id}
                transition={{
                  delay: 0.1 * index,
                }}
              >
                <Card
                  key={item.id}
                  className="h-full flex flex-col justify-between"
                >
                  <CardHeader className="flex-row justify-between items-center">
                    <CardTitle className="text-xl font-medium">
                      {item.name}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                      {dayjs(item.createdAt).fromNow()}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="flex items-center gap-1.5">
                    <Badge className="uppercase font-bold text-xs">
                      {item.priority}
                    </Badge>

                    <div className="ml-auto space-x-2">
                      <ManageItemButton id={item.id} type="update" />
                      <DeleteItemButton id={item.id} />
                    </div>
                  </CardFooter>
                </Card>
              </Reveal>
            )
          )}
        </div>
      )}

      {!loading && items.metadata.totalItems > 0 && (
        <Pagination
          totalCountOfRegisters={items.metadata.totalItems}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
