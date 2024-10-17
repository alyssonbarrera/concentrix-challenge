import { ItemsProviderContext } from "@/contexts/items-context/items-context";
import { useContext } from "react";

export const useItems = () => {
  const context = useContext(ItemsProviderContext);

  if (context === undefined) {
    throw new Error("useItems must be used within a ItemsProvider");
  }

  return context;
};
