// Modules
import { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

// Routes
import Routes from "./routes/Routes";

const App = () => {

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, []);

  return (
    <div>
      <ProSidebarProvider>
        <Routes />
      </ProSidebarProvider>
    </div>
  );
};

export default App;
