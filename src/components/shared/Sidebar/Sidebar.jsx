// React Support
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// React Icons
import {
  IoNewspaperOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";

// MUI Support
import Drawer from "@mui/material/Drawer";

// Sidebar SVGs
import {
  AssignmentSVG,
  DatabaseSVG,
  DiscussionSVG,
  DocumentsSVG,
  HomeSVG,
  LogoutSVG,
  NotesSVG,
  SettingSVG,
} from "./SidebarSVG.jsx";

//assets
import logo from "../../../assets/images/logo.svg";

// Navbar Item Components
const NavItem = ({ to, children, collapseMenu }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-[#0064E133] text-[#0064E1]"
            : "bg-transparent text-[#7A7C88]"
        } ${
          collapseMenu ? "justify-center gap-0" : "justify-start gap-3"
        } flex items-center text-base font-semibold  rounded-md duration-300 px-3 py-2 hover:bg-[#0064E133] hover:text-[#0064E1]`
      }
    >
      {children}
    </NavLink>
  );
};

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(true);

  useEffect(() => {
    const navItems = document.querySelectorAll(".navItem");

    navItems.forEach((ele) => {
      ele.onmouseover = () => setCollapseMenu(false);
      ele.onmouseout = () => setCollapseMenu(true);
    });
  }, []);

  return (
    <>
      {/* Larger device menu */}
      <div
        className={`${
          collapseMenu && "!w-auto"
        }  lg:w-56 xl:w-60 2xl:w-80 hidden lg:flex flex-col h-full justify-between`}
      >
        {/* Button start */}
        {/* <div className="absolute top-2 right-2">
          <button
            onClick={() => setCollapseMenu(!collapseMenu)}
            className="w-9 h-9 rounded-full shadow-xl border-1 border-[#DCDEE1]"
          >
            <span className="w-full h-full relative">
              {collapseMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </span>
          </button>
        </div> */}
        {/* Button end */}

        <div className={`space-y-2 ${collapseMenu ? "mt-6" : "mt-0"}`}>
          <div className="flex items-center justify-center pt-5">
            <img
              src={logo}
              alt="Logo"
              className={`w-auto max-w-full duration-500 h-auto`}
            />
          </div>
          <div className="flex-1 px-2">
            <ul className="pt-2 pb-4 navbar">
              <li className="navItem">
                <NavItem to="/" collapseMenu={collapseMenu}>
                  <HomeSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Home
                  </span>
                </NavItem>
              </li>
              <li className="navItem">
                <NavItem to="/assignments" collapseMenu={collapseMenu}>
                  <AssignmentSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Assignments
                  </span>
                </NavItem>
              </li>
              <li className="navItem">
                <NavItem to="/notes" collapseMenu={collapseMenu}>
                  <NotesSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Notes
                  </span>
                </NavItem>
              </li>
              <li className="navItem">
                <NavItem to="/documents" collapseMenu={collapseMenu}>
                  <DocumentsSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Documents
                  </span>
                </NavItem>
              </li>
              <li className="navItem">
                <NavItem to="/discussions" collapseMenu={collapseMenu}>
                  <DiscussionSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Discussion
                  </span>
                </NavItem>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-2 pb-3">
          <div className="flex-1">
            <ul className="pt-2">
              <li className="navItem">
                <NavItem to="/settings" collapseMenu={collapseMenu}>
                  <SettingSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Setting
                  </span>
                </NavItem>
              </li>
              <li className="navItem">
                <NavItem to="/logout" collapseMenu={collapseMenu}>
                  <LogoutSVG />
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    Log Out
                  </span>
                </NavItem>
              </li>
              <li className="mt-2 navItem">
                <button
                  className={`p-1.5 w-full bg-[#0064E133] ${
                    collapseMenu ? "rounded-md" : "rounded-full"
                  }`}
                >
                  <span className="w-full h-9 block relative">
                    <span
                      className={`h-full grid place-items-center absolute top-0 opacity-0 dark:opacity-100 duration-300 ${
                        collapseMenu ? "invisible" : "left-1/4 -translate-x-1/2"
                      }`}
                    >
                      <IoSunnyOutline className="w-6 h-6 text-[#000000]" />
                    </span>
                    <span
                      className={`h-full grid place-items-center absolute top-0 opacity-100 dark:opacity-0 duration-300 ${
                        collapseMenu ? "invisible" : "right-1/4 translate-x-1/2"
                      }`}
                    >
                      <IoMoonOutline className="w-6 h-6 text-[#000000]" />
                    </span>
                    <span
                      className={`block bg-[#0064E1] h-full duration-300 ${
                        collapseMenu
                          ? "rounded-md"
                          : "rounded-full absolute w-1/2 top-0 left-0 dark:right-0"
                      }`}
                    >
                      <IoSunnyOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-100 dark:opacity-0" />
                      <IoMoonOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-0 dark:opacity-100" />
                    </span>
                  </span>
                </button>
              </li>
              <li className="mt-2 navItem">
                <div
                  className={`flex items-center ${
                    collapseMenu ? "justify-center" : "gap-3 justify-start"
                  }`}
                >
                  <span className="block w-12 h-12 overflow-hidden rounded-full">
                    <img
                      src="https://th.bing.com/th/id/OIP.qhQ600gF84qfOJOgjXFEzwHaFj?pid=ImgDet&rs=1"
                      alt="Teacher"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "w-auto h-auto"
                    } overflow-hidden duration-300`}
                  >
                    <p className="text-base font-semibold leading-none">
                      Sundor Pichai
                    </p>
                    <p className="text-sm text-[#787878] leading-none mt-1 font-semibold">
                      sundor@gmail.com
                    </p>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-10 left-0 z-40 bg-[#222831] text-white w-12 h-10 grid place-items-center shadow-2xl rounded-r-full py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-6 h-6`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
          <div className="w-64 bg-[#fff] h-full flex flex-col justify-between">
            <div className={`space-y-2 ${collapseMenu ? "mt-6" : "mt-0"}`}>
              <div className="flex items-center justify-center pt-5">
                <img
                  src={logo}
                  alt="Logo"
                  className={`w-auto max-w-full duration-500 h-auto`}
                />
              </div>
              <div className="flex-1 px-2">
                <ul className="pt-2 pb-4">
                  <li className="navItem">
                    <NavItem to="/">
                      <HomeSVG />
                      <span className={`duration-300`}>Home</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/database">
                      <DatabaseSVG />
                      <span className={`duration-300`}>Database</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/assignments">
                      <AssignmentSVG />
                      <span className={`duration-300`}>Assignments</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/mocktest">
                      <IoNewspaperOutline className="w-5 h-5" />
                      <span className={`duration-300`}>Mock Test</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/notes">
                      <NotesSVG />
                      <span className={`duration-300`}>Notes</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/documents">
                      <DocumentsSVG />
                      <span className={`duration-300`}>Documents</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/discussion">
                      <DiscussionSVG />
                      <span className={`duration-300`}>Discussion</span>
                    </NavItem>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-2 pb-3">
              <div className="flex-1">
                <ul className="pt-2">
                  <li className="navItem">
                    <NavItem to="/setting">
                      <SettingSVG />
                      <span className={`duration-300`}>Setting</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem to="/logout">
                      <LogoutSVG />
                      <span className={`duration-300`}>Log Out</span>
                    </NavItem>
                  </li>
                  <li className="mt-2">
                    <button
                      className={`p-1.5 w-full bg-[#0064E133] rounded-full`}
                    >
                      <span className="w-full h-9 block relative">
                        <span
                          className={`h-full grid place-items-center absolute top-0 opacity-0 dark:opacity-100 duration-300 left-1/4 -translate-x-1/2`}
                        >
                          <IoSunnyOutline className="w-6 h-6 text-[#000000]" />
                        </span>
                        <span
                          className={`h-full grid place-items-center absolute top-0 opacity-100 dark:opacity-0 duration-300 right-1/4 translate-x-1/2`}
                        >
                          <IoMoonOutline className="w-6 h-6 text-[#000000]" />
                        </span>
                        <span
                          className={`block bg-[#0064E1] h-full duration-300 rounded-full absolute w-1/2 top-0 left-0 dark:right-0`}
                        >
                          <IoSunnyOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-100 dark:opacity-0" />
                          <IoMoonOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-0 dark:opacity-100" />
                        </span>
                      </span>
                    </button>
                  </li>
                  <li className="mt-3">
                    <div className={`flex items-center gap-3 justify-start`}>
                      <span className="block w-12 h-12 overflow-hidden rounded-full">
                        <img
                          src="https://th.bing.com/th/id/OIP.qhQ600gF84qfOJOgjXFEzwHaFj?pid=ImgDet&rs=1"
                          alt="Teacher"
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className={`duration-300`}>
                        <p className="text-base font-semibold leading-none">
                          Sundor Pichai
                        </p>
                        <p className="text-sm text-[#787878] leading-none mt-1 font-semibold">
                          sundor@gmail.com
                        </p>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      {/* Mobile device menu */}
    </>
  );
};

export default SideBar;
