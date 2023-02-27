import { Outlet } from "react-router-dom";

// Sidebar
import Sidebar from "../../components/Common/Sidebar/Sidebar";

const PanelLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen w-full overflow-y-auto bg-slate-50 flex flex-col items-center px-5 2xl:px-10 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default PanelLayout;
