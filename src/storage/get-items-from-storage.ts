export const getItemsFromStorage = () => {
  const items = localStorage.getItem("@concentrix:items");

  if (!items) return [];

  const parsedItems = JSON.parse(items);
  return parsedItems;
};
