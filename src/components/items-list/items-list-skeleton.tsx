import { Skeleton } from "../ui/skeleton";

export function ItemsListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Skeleton key={index} className="rounded-lg w-full h-[280px]" />
      ))}
    </div>
  );
}
