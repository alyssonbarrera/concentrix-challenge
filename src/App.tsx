import { Header } from "@/components/header";
import { ThemeProvider } from "@/contexts/theme-context";
import { ItemsProvider } from "./contexts/items-context/items-context";
import { ItemsList } from "./components/items-list";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="@concentrix:theme">
      <ItemsProvider>
        <Header />
        <ItemsList />
      </ItemsProvider>
    </ThemeProvider>
  );
}

export default App;
