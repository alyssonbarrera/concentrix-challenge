import { itemSchema, type ItemSchema } from "@/validations/schemas/item-schema";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { PriorityEnum } from "@/enums/priority-enum";
import { FieldErrorMessage } from "./fragments/field-error-message";
import { PriorityRadioGroup } from "./fragments/priority-radio-group";
import { useItemForm } from "./item-form.hook";

type ItemFormProps = {
  id?: string;
  type?: "create" | "update";
  onSuccessfulSubmit: () => void;
};

export function ItemForm({
  id,
  type = "create",
  onSuccessfulSubmit,
}: ItemFormProps) {
  const { register, control, reset, handleSubmit, formState } =
    useForm<ItemSchema>({
      resolver: zodResolver(itemSchema),
      defaultValues: {
        priority: PriorityEnum.LOW,
      },
    });

  const { onSubmit } = useItemForm({
    id,
    type,
    reset,
    onSuccessfulSubmit,
  });

  return (
    <form
      id="item-form"
      data-testid="item-form"
      className="grid gap-4 py-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          data-testid="item-form-input-name"
          {...register("name")}
        />
        {formState.errors.name && (
          <FieldErrorMessage data-testid="item-form-error-message-name">
            {formState.errors.name.message}
          </FieldErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          data-testid="item-form-textarea-description"
          {...register("description")}
        />
        {formState.errors.description && (
          <FieldErrorMessage data-testid="item-form-error-message-description">
            {formState.errors.description.message}
          </FieldErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority" className="text-right">
          Priority
        </Label>

        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange, ...props } }) => (
            <PriorityRadioGroup
              {...props}
              id="priority"
              value={value}
              defaultValue={value}
              onValueChange={onChange}
              data-testid="item-form-radio-group-priority"
            />
          )}
        />

        {formState.errors.priority && (
          <FieldErrorMessage>
            {formState.errors.priority.message}
          </FieldErrorMessage>
        )}
      </div>
    </form>
  );
}
