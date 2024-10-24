import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type FieldErrorMessageProps = ComponentProps<"span"> & {
  children: ReactNode;
};

export function FieldErrorMessage({
  children,
  ...props
}: FieldErrorMessageProps) {
  return (
    <span
      {...props}
      className={cn(
        "text-xs font-medium text-red-500 dark:text-red-400",
        props.className
      )}
    >
      {children}
    </span>
  );
}
