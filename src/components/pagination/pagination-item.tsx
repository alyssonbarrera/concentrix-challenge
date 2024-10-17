import { Button } from "../ui/button";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  onPageChange,
  isCurrent = false,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button size="sm" disabled>
        {number}
      </Button>
    );
  }

  return (
    <Button size="sm" onClick={() => onPageChange(number)}>
      {number}
    </Button>
  );
}
