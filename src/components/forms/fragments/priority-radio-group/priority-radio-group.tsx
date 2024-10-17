import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PriorityEnum } from "@/enums/priority-enum";
import { cn } from "@/lib/utils";
import type { RadioGroupProps } from "@radix-ui/react-radio-group";
import type { ReactNode } from "react";

type PriorityRadioGroupProps = RadioGroupProps;

export function PriorityRadioGroup(props: PriorityRadioGroupProps) {
  return (
    <RadioGroup
      {...props}
      className={cn("flex gap-4", props.className)}
      data-testid="item-form-radio-group-priority"
    >
      <RadioGroupContent>
        <RadioGroupItem value={PriorityEnum.LOW} id={PriorityEnum.LOW} />
        <Label htmlFor={PriorityEnum.LOW}>Low</Label>
      </RadioGroupContent>
      <RadioGroupContent>
        <RadioGroupItem value={PriorityEnum.MEDIUM} id={PriorityEnum.MEDIUM} />
        <Label htmlFor={PriorityEnum.MEDIUM}>Medium</Label>
      </RadioGroupContent>
      <RadioGroupContent>
        <RadioGroupItem value={PriorityEnum.HIGH} id={PriorityEnum.HIGH} />
        <Label htmlFor={PriorityEnum.HIGH}>High</Label>
      </RadioGroupContent>
    </RadioGroup>
  );
}

function RadioGroupContent({ children }: { children: ReactNode }) {
  return <div className="flex items-center space-x-2">{children}</div>;
}
