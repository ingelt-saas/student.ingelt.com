// Modules
import { useEffect } from "react";
import StudentProvider from "./providers/StudentProvider";
import { ProSidebarProvider } from "react-pro-sidebar";

// Routes
import Routes from "./routes/Routes";

const App = () => {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ProSidebarProvider>
      <StudentProvider>
        <Routes />
      </StudentProvider>
    </ProSidebarProvider>
  );
};

export default App;
