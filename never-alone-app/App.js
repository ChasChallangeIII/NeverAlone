import { AuthProvider } from "./app/context/AuthContext";
import { FakeCallProvider } from "./app/context/FakeCallContext";
import { ThemeProvider } from "./app/context/ThemeContext";
import { UserProvider } from "./app/context/UserContext";
import AppNavigation from "./app/navigation/AppNavigation";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AuthProvider>
          <FakeCallProvider>
            <AppNavigation />
          </FakeCallProvider>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
