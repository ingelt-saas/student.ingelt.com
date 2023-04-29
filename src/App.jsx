// Modules
import { useEffect } from "react";
import StudentProvider from "./providers/StudentProvider";
import { ProSidebarProvider } from "react-pro-sidebar";

// Routes
import Routes from "./routes/Routes";
import { Worker } from "@react-pdf-viewer/core";

const App = () => {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ProSidebarProvider>
      <StudentProvider>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
          <Routes />
        </Worker>
      </StudentProvider>
    </ProSidebarProvider>
  );
};

export default App;
