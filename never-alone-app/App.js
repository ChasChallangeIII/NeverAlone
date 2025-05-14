import { ThemeProvider } from "./app/context/ThemeContext";
import { UserProvider } from "./app/context/UserContext";
import AppNavigation from "./app/navigation/AppNavigation";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </ThemeProvider>
  );
}
