import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { ItemForm } from "../forms";
import { Fragment } from "react/jsx-runtime";

type ManageItemButtonProps = {
  id?: string;
  type?: "create" | "update";
};

export function ManageItemButton({
  id,
  type = "create",
}: ManageItemButtonProps) {
  const dialogTitle = {
    create: "New item",
    update: "Edit item",
  }[type];

  const dialogDescription = {
    create: "Fill in the form below to create a new item.",
    update: "Fill in the form below to edit this item.",
  }[type];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={type === "create" ? "default" : "ghost"}
          data-testid="manage-item-dialog-trigger"
        >
          {type === "create" && (
            <Fragment>
              <span className="sr-only sm:not-sr-only">New item</span>
              <Plus className="size-4" />
            </Fragment>
          )}

          {type === "update" && (
            <Fragment>
              <Edit className="size-4" />
              <span className="sr-only">Edit item</span>
            </Fragment>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        data-testid="manage-item-dialog-content"
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <ItemForm id={id} type={type} />

        <DialogFooter>
          {/* 
            Removido para facilitar a adição de muitos dados
          */}
          {/* <DialogClose asChild>
            <Button type="submit" form="item-form">
              Save changes
            </Button>
          </DialogClose> */}

          <Button type="submit" form="item-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
