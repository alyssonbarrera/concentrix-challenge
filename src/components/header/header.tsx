import { ManageItemButton } from "../manage-item-button";
import { ThemeSwitcher } from "../theme-switcher";
import { Separator } from "../ui/separator";

export function Header() {
  return (
    <header className="border-b py-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 xl:px-0">
        <h2 className="text-2xl sm:text-4xl font-extrabold">Concentrix</h2>

        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <Separator orientation="vertical" className="h-10" />
          <ManageItemButton />
        </div>
      </div>
    </header>
  );
}
