import { Outlet } from "react-router-dom";

// Sidebar
import Sidebar from "../../components/Common/Sidebar/Sidebar";

const PanelLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen w-full overflow-scroll bg-slate-50 flex flex-col items-center p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default PanelLayout;
