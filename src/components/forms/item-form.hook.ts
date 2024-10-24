import type { PriorityEnum } from "@/enums/priority-enum";
import { useItems } from "@/hooks/use-items";
import type { ItemSchema } from "@/validations/schemas/item-schema";
import { useEffect } from "react";
import type { UseFormReset } from "react-hook-form";

type ItemFormHookProps = {
  id?: string;
  type: "create" | "update";
  reset: UseFormReset<{
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
  }>;
  onSuccessfulSubmit: () => void;
};

export function useItemForm({
  id,
  type,
  reset,
  onSuccessfulSubmit,
}: ItemFormHookProps) {
  const { addItem, getItemById, updateItem } = useItems();

  function onSubmit(data: ItemSchema) {
    const itemData = {
      name: data.name,
      description: data.description,
      priority: data.priority as PriorityEnum,
    };

    if (type === "create") {
      addItem(itemData);
    }

    if (id && type === "update") {
      updateItem(id, itemData);
    }

    onSuccessfulSubmit();
  }

  useEffect(() => {
    if (type === "update" && id) {
      const item = getItemById(id);

      if (!item) return;

      reset({
        name: item.name,
        priority: item.priority,
        description: item.description,
      });
    }
  }, [getItemById, id, reset, type]);

  return {
    onSubmit,
  };
}
