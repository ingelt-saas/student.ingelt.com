// Modules
import { useEffect } from "react";
import StudentProvider from "./providers/StudentProvider";
import { ProSidebarProvider } from "react-pro-sidebar";
import "react-toastify/dist/ReactToastify.css";
import OTPlessSdk from "otpless-js-sdk";
import { SocketContext, socket } from "./contexts";

// Routes
import Routes from "./routes/Routes";
import { Worker } from "@react-pdf-viewer/core";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const sdkInstance = new OTPlessSdk({
    appId: "123456789",
    enableErrorLogging: true,
  });

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const sdk = sdkInstance.getState();
    console.log(sdk);
  }, [sdkInstance]);

  const client = new QueryClient();

  return (
    <ProSidebarProvider>
      <SocketContext.Provider value={socket}>
        <StudentProvider>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
            {/* <button id="whatsapp-login" className="bg-white" onClick={() => {
            sdkInstance.createGetIntentOnClick({
              redirectionURL: 'http://localhost:3000'
            })
          }}>OTP</button> */}
            <QueryClientProvider client={client} >
              <Routes />
              <ToastContainer
                className="!text-sm"
                bodyClassName="!my-0"
                toastClassName="!min-h-fit !py-3"
              />
            </QueryClientProvider>
          </Worker>
        </StudentProvider>
      </SocketContext.Provider>
    </ProSidebarProvider>
  );
};

export default App;
