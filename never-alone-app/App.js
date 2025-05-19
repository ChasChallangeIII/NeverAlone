import { AuthProvider } from "./app/context/AuthContext";
import { ThemeProvider } from "./app/context/ThemeContext";
import { UserProvider } from "./app/context/UserContext";
import { CallUIProvider } from "./app/context/CallUIContext";
import AppNavigation from "./app/navigation/AppNavigation";

export default function App() {
  return (
    <CallUIProvider>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <AppNavigation />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </CallUIProvider>
  );
}
