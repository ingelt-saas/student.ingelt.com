// Modules
import { ProSidebarProvider } from "react-pro-sidebar";

// Routes
import Routes from "./routes/Routes";

const App = () => {
  return (
    <div>
      <ProSidebarProvider>
        <Routes />
      </ProSidebarProvider>
    </div>
  );
};

export default App;
