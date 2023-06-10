// React Support
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// React Icons
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

// MUI Support
import Drawer from "@mui/material/Drawer";

// Sidebar SVGs
import {
  AssignmentSVG,
  DiscussionSVG,
  HomeSVG,
  LogoutSVG,
  NotesSVG,
  SettingSVG,
  LibrarySVG,
  ModulesSVG,
} from "./SidebarSVG.jsx";
// navbar svg
import img1 from "../../../assets/images/home.svg";
import img2 from "../../../assets/images/modules.svg";
import img3 from "../../../assets/images/university.svg";
import img4 from "../../../assets/images/library.svg";
import img5 from "../../../assets/images/shortlist.svg";
import img6 from "../../../assets/images/loan1.svg";
import img7 from "../../../assets/images/passport.svg";
import img8 from "../../../assets/images/community.svg";

//assets
import logo from "../../../assets/images/navlogo.png";
import { useContext } from "react";
import { StudentContext } from "../../../contexts.js";
import Image from "../Image/Image.jsx";

// Navbar Item Components
const NavItem = ({ to, children, collapseMenu, ...props }) => {
  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-[#1B3B7D33] text-[#1B3B7D]"
            : "bg-transparent text-[#7A7C88]"
        } ${
          collapseMenu ? "justify-center gap-0" : "justify-start gap-3"
        } flex items-center text-base font-semibold  rounded-md duration-300 px-3 py-2 hover:bg-[#0064E133] hover:text-[#1B3B7D]`
      }
    >
      {children}
    </NavLink>
  );
};

const SideBar = () => {

  const [open, setOpen] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(false);
  const { student, logOut } = useContext(StudentContext);

  const navItemsArr = [

    { name: "Home", path: "/", icon: img1 },
    // { name: "Modules", path: "/module", icon: img2 },
    { name: "Modules", path: "/modules", icon: img2 },
    { name: "Find Institute", path: "/find-institute", icon: img3 },

    { name: "Library", path: "/centralized-library", icon: img4 },

//     { name: "Home", path: "/", icon: <HomeSVG /> },
//     // { name: "Assignments", path: "/assignments", icon: <AssignmentSVG /> },
//     { name: "Library", path: "/centralized-library", icon: <LibrarySVG /> },

    {
      name: "Shortlist University",
      path: "/shortlist-university",
      icon: img5,
    },
    {
      name: "Education Loan",
      path: "/education-loan",
      icon: img6,
    },
    {
      name: "Visa Application",
      path: "/visa-application",
      icon: img7,
    },
    { name: "Community", path: "/discussion", icon: img8 },
    // { name: "Notes", path: "/notes", icon: <NotesSVG /> },
  ];

  // const darkModeHandler = () => {
  //   if (localStorage.theme) {
  //     localStorage.removeItem("theme");
  //     document.documentElement.classList.remove("dark");
  //   } else {
  //     localStorage.theme = "dark";
  //     document.documentElement.classList.add("dark");
  //   }
  // };

  // useEffect(() => {
  //   const navItems = document.querySelectorAll(".navbar");

  //   navItems.forEach((ele) => {
  //     ele.onmouseover = () => setCollapseMenu(false);
  //     ele.onmouseout = () => setCollapseMenu(true);
  //   });

  // }, []);

  return (
    <>
      {/* Larger device menu */}
      <div
        className={`${
          collapseMenu && "max-w-sm"
        }  lg:w-48 xl:w-56 hidden lg:flex flex-col h-full justify-between`}
      >
        <div className={`space-y-2 ${collapseMenu ? "mt-6" : "mt-0"}`}>
          <div className="flex items-start justify-start pt-5 ">
            <Link to="/" className="px-3">
              <img
                src={logo}
                alt="Logo"
                className={`w-44 max-w-full duration-500 h-auto py-8`}
              />
            </Link>
          </div>
          <div className="flex-1 px-2">
            <ul className="pt-2 pb-4 navbar  ">
              {navItemsArr.map((item, index) => (
                <li className="navItem mb-2" key={index}>
                  <NavItem to={item.path} collapseMenu={collapseMenu}>
                    <div className="bg-blue-500">
                      <img src={item.icon} alt="svg" className=" " />
                    </div>
                    <span
                      className={`${
                        collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
                      } overflow-hidden duration-300`}
                    >
                      {item.name}
                    </span>
                  </NavItem>
                </li>
              ))}
              {student?.organizationId &&
                <li className="navItem mb-2">
                  <NavItem to="/institute" collapseMenu={collapseMenu}>
                    <LibrarySVG />
                    <span
                      className={`${collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
                        } overflow-hidden duration-300`}
                    >
                      Institute
                    </span>
                  </NavItem>
                </li>
              }
            </ul>
          </div>
        </div>
        <div className="px-2 pb-3">
          <div className="flex-1">
            <ul className="pt-2 navbar">
              <li className="navItem mb-2">
                <NavItem to="/settings" collapseMenu={collapseMenu}>
                  <SettingSVG />
                  <span
                    className={`${
                      collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
                    } overflow-hidden duration-300`}
                  >
                    Settings
                  </span>
                </NavItem>
              </li>
              <li className="navItem mb-2">
                <NavItem
                  to="/logout"
                  onClick={logOut}
                  collapseMenu={collapseMenu}
                >
                  <LogoutSVG />
                  <span
                    className={`${
                      collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
                    } overflow-hidden duration-300`}
                  >
                    Log Out
                  </span>
                </NavItem>
              </li>
              {/* <li className="mt-2 navItem">
                <button
                  onClick={darkModeHandler}
                  className={`p-1.5 w-full bg-[#1B3B7D33] ${collapseMenu ? "rounded-md" : "rounded-full"
                    }`}
                >
                  <span className="w-full h-9 block relative">
                    <span
                      className={`h-full grid place-items-center absolute top-0 opacity-0 dark:opacity-100 duration-300 ${collapseMenu ? "invisible" : "left-1/4 -translate-x-1/2"
                        }`}
                    >
                      <IoSunnyOutline className="w-6 h-6 text-[#000000]" />
                    </span>
                    <span
                      className={`h-full grid place-items-center absolute top-0 opacity-100 dark:opacity-0 duration-300 ${collapseMenu ? "invisible" : "right-1/4 translate-x-1/2"
                        }`}
                    >
                      <IoMoonOutline className="w-6 h-6 text-[#000000]" />
                    </span>
                    <span
                      className={`block bg-[#1B3B7D] h-full duration-300 ${collapseMenu
                        ? "rounded-md absolute w-full left-0"
                        : "rounded-full absolute w-1/2 top-0 !dark:left-0 dark:left-1/2"
                        }`}
                    >
                      <IoSunnyOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-100 dark:opacity-0" />
                      <IoMoonOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-0 dark:opacity-100" />
                    </span>
                  </span>
                </button>
              </li> */}
              <li className="mt-2 navItem">
                <span
                  className={`flex items-center ${
                    collapseMenu ? "justify-center" : "gap-3 justify-start"
                  }`}
                >
                  <span className="block w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src={student?.image}
                      alt={student?.name}
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span
                    className={`${
                      collapseMenu ? "w-0 h-0" : "max-w-xs max-h-10"
                    } overflow-hidden duration-300`}
                  >
                    <p className="text-base font-semibold leading-none overflow-hidden">
                      {student.name}
                    </p>
                    <p className="text-sm text-[#787878] leading-none mt-1 font-semibold overflow-hidden">
                      {student.id}
                    </p>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* mobile navbar  */}
      <div className="lg:hidden">
        <div className="py-2 px-5 flex items-center justify-between border-b border-[#DCDEE1]">
          <button onClick={() => setOpen(true)} className="text-black">
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
          <h2 className="text-xl font-semibold md:hidden">
            Welcome {student?.name}
          </h2>
          <div className="w-10 h-10 overflow-hidden rounded-full border-2">
            <Link to="/settings">
              <Image
                src={student?.image}
                alt={student?.name}
                className="rounded-full w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
        <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
          <div
            className="w-64 bg-[#fff] h-full flex flex-col justify-between rounded-r-2xl"
            id="mobileNavbar"
          >
            <div className={`space-y-2 ${collapseMenu ? "mt-6" : "mt-0"}`}>
              <div className="flex items-center justify-start pt-5">

                <Link to='/'>

                  <img
                    src={logo}
                    alt="Logo"
                    className={`w-44 max-w-full duration-500 h-auto pl-2`}
                  />
                </Link>
              </div>
              <div className="flex-1 px-2">
                <ul className="pt-2 pb-4">
                  {navItemsArr.map((item, index) => (
                    <li className="navItem mb-2" key={index}>
                      <NavItem to={item.path} onClick={() => setOpen(false)}>
                        <img src={item.icon} alt="svg" />
                        <span>{item.name}</span>
                      </NavItem>
                    </li>
                  ))}
                  {student?.organizationId && <li className="navItem">
                    <NavItem to="/institute" onClick={() => setOpen(false)}>
                      <LibrarySVG />
                      <span className={`duration-300`}>Institute</span>
                    </NavItem>
                  </li>}
                </ul>
              </div>
            </div>

            <div className="px-2 pb-3">
              <div className="flex-1">
                <ul className="pt-2">
                  <li className="navItem">
                    <NavItem to="/settings" onClick={() => setOpen(false)}>
                      <SettingSVG />
                      <span className={`duration-300`}>Settings</span>
                    </NavItem>
                  </li>
                  <li className="navItem">
                    <NavItem
                      to="/logout"
                      onClick={() => {
                        setOpen(false);
                        logOut();
                      }}
                    >
                      <LogoutSVG />
                      <span className={`duration-300`}>Log Out</span>
                    </NavItem>
                  </li>
                  {/* <li className="mt-2"> */}
                  {/* <button
                      onClick={darkModeHandler}
                      className={`p-1.5 w-full bg-[#1B3B7D33] rounded-full`}
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
                          className={`block bg-[#1B3B7D] h-full duration-300 rounded-full absolute w-1/2 top-0 left-0 dark:right-0`}
                        >
                          <IoSunnyOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-100 dark:opacity-0" />
                          <IoMoonOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-0 dark:opacity-100" />
                        </span>
                      </span>
                    </button> */}
                  {/* </li> */}
                  <li className="mt-3">
                    <span className={`flex items-center gap-3 justify-start`}>
                      <span className="block w-12 h-12 overflow-hidden rounded-full">
                        <Image
                          src={student?.image}
                          alt={student?.name}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className={`duration-300`}>
                        <p className="text-base font-semibold leading-none">
                          {student?.name}
                        </p>
                        <p className="text-sm text-[#787878] leading-none mt-1 font-semibold">
                          {student?.id}
                        </p>
                      </span>
                    </span>
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
