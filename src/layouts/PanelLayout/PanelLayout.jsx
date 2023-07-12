import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/shared/Sidebar/Sidebar";
import { useEffect, useState } from "react";


const PanelLayout = () => {

  const location = useLocation();

  // Example state and state setter
  const [shouldApplyClasses, setShouldApplyClasses] = useState(true);

  useEffect(() => {
    const pathname = location.pathname;
    const arr = ['/discussion', '/education-loan', '/shortlist-university', '/centralized-library', '/modules'];
    if (arr.includes(pathname)) {
      setShouldApplyClasses(false);
    } else {
      setShouldApplyClasses(true);
    }
  }, [location]);


  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div
        className={`sidebar border-r border-[#DCDEE1] overflow-y-auto no-scrollbar relative`}
      >
        <SideBar />
      </div>
      <div className={`flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 ${shouldApplyClasses ? 'px-2 md:px-5 2xl:px-10 py-6' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default PanelLayout;
