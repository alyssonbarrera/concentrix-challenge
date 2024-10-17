import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/use-items";

type DeleteItemButtonProps = {
  id: string;
};

export function DeleteItemButton({ id }: DeleteItemButtonProps) {
  const { removeItem } = useItems();

  function handleDeleteItem() {
    removeItem(id);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          variant="destructive"
          data-testid="delete-item-alert-dialog-trigger"
        >
          <Trash2 className="size-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="delete-item-dialog-content">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            Item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={handleDeleteItem}
            data-testid="delete-item-button"
          >
            Delete Item
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
