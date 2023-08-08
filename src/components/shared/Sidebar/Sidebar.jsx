// React Support
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// MUI Support
import Drawer from "@mui/material/Drawer";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { IconButton, Popover } from "@mui/material";
import { Close } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import TableViewIcon from '@mui/icons-material/TableView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Sidebar SVGs
import {
  DiscussionSVG,
  HomeSVG,
  LogoutSVG,
  ShortlistSVG,
  SettingSVG,
  LibrarySVG,
  ModulesSVG,
  EducationLoan,
  PassportSVG,
} from "./SidebarSVG.jsx";
// navbar svg

//assets
import logo from "../../../assets/images/navlogo.png";
import { useContext } from "react";
import { StudentContext } from "../../../contexts.js";
import ProfileImage from "../ProfileImage/ProfileImage.jsx";

// Navbar Item Components
const NavItem = ({ to, children, collapseMenu, ...props }) => {
  return (
    <NavLink
      {...props}
      to={to}
      className={({ isActive }) =>
        `${isActive
          ? "bg-[#1B3B7D33] text-[#1B3B7D]"
          : "bg-transparent text-[#7A7C88]"
        } ${collapseMenu ? "justify-center gap-0" : "justify-start gap-3"
        } flex items-center font-semibold  rounded-md duration-300 px-3 py-2 hover:bg-[#0064E133] hover:text-[#1B3B7D] text-sm`
      }
    >
      {children}
    </NavLink>
  );
};

const NestedMenus = ({ menus, path, icon, name }) => {

  return <PopupState>
    {(popupState) => <>
      <li className="navItem mb-1.5" {...bindTrigger(popupState)}>
        <NavItem to={path} onClick={(e) => e.preventDefault()}>
          {icon}
          <span>{name}</span>
          {/* <span className="flex-1 flex justify-end">
            <ChevronRightIcon />
          </span> */}
        </NavItem>
      </li>
      <Popover
        PaperProps={{ className: '!rounded-xl shadow-2xl bg-white ml-5' }}
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <div className='z-[100] bg-white min-w-fit' onClick={popupState.close}>
          <ul className="flex flex-col p-3">
            {Array.isArray(menus) && menus.map(item => item.show && <li key={item.path} className="navItem mb-1.5" {...bindTrigger(popupState)}>
              <NavItem to={item.path}>
                {item.icon}
                <span>{item.name}</span>
              </NavItem>
            </li>)}
          </ul>
        </div>
      </Popover>
    </>}
  </PopupState>;
}

const SidebarMenus = () => {
  const { student, logOut } = useContext(StudentContext);

  const navItemsArr = [
    {
      name: "Home",
      path: "/",
      icon: <HomeSVG />,
      show: true,
    },
    {
      name: "IELTS Preparation",
      path: "/ielts-preparation",
      icon: <TableViewIcon className="!w-6 !h-6" />,
      show: true,
      nested: true,
      menus: [
        {
          name: "IELTS Modules",
          path: "/ielts-preparation/modules",
          icon: <ModulesSVG />,
          show: true,
        },
        {
          name: "Online Classes",
          path: "/ielts-classes/online-classes",
          icon: <ModulesSVG />,
          show: !Boolean(student?.organizationId),
        },
        {
          name: "Speaking Session",
          path: "/ielts-preparation/speaking-session",
          icon: <LibrarySVG />,
          show: true,
        },
      ]
    },

    {
      name: "IELTS Classes",
      path: "/ielts-classes",
      icon: <ModulesSVG />,
      // show: !Boolean(student?.organizationId),
      show: false,
    },

    // {
    //   name: "IELTS Library",
    //   path: "/centralized-library",
    //   icon: <LibrarySVG />,
    //   show: true,
    // },
    {
      name: "Course Finder",
      path: "/shortlist-university",
      icon: <ShortlistSVG />,
      show: true,
    },
    {
      name: "Education Loan",
      path: "/education-loan",
      icon: <EducationLoan />,
      show: true,
    },
    {
      name: "Visa Application",
      path: "/visa-application",
      icon: <PassportSVG />,
      show: true,
    },
    {
      name: "Institute",
      path: "/institute",
      icon: <LibrarySVG />,
      show: Boolean(student?.organizationId),
    },
    {
      name: "Community",
      path: "/discussion",
      icon: <DiscussionSVG />,
      show: true,
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-y-5">
      <div className="w-full">
        <div className="text-center mt-[3vh] mb-[4vh]">
          <Link to="/" className="mx-auto">
            <img
              src={logo}
              alt="Logo"
              className={`max-md:w-36 w-44 max-w-full duration-500 mx-auto h-auto`}
            />
          </Link>
        </div>

        <ul className="px-2">

          {navItemsArr.map(
            (item, index) =>
              item.show && (
                item.nested ?
                  <NestedMenus {...item} />
                  : <li className="navItem mb-1.5" key={index}>
                    <NavItem to={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </NavItem>
                  </li>
              )
          )}
        </ul>
      </div>

      <div className="w-full">
        <ul className="px-2">
          <li className="navItem mb-1.5">
            <NavItem to="/settings">
              <SettingSVG />
              <span>Settings</span>
            </NavItem>
          </li>

          {/* bottom popup over */}
          <PopupState>
            {(popupState) => <>
              <li className="mt-2 mb-2 px-1 navItem cursor-pointer py-2 rounded-md duration-300 hover:bg-[#0064E133]" {...bindTrigger(popupState)} >
                <span className={`flex items-center justify-start gap-3`}>
                  <span className="block w-12 h-12 overflow-hidden rounded-full">
                    <ProfileImage
                      src={student?.image}
                      alt={student?.name}
                      className="w-full h-full object-cover"
                      gender={student?.gender}
                    />
                  </span>
                  <span className="flex-1 flex items-center">
                    <span className="overflow-hidden flex-1 flex flex-col">
                      <p className="text-base font-semibold leading-none overflow-hidden">
                        {student?.name}
                      </p>
                      <p className="text-xs text-clip text-[#787878] mt-1 font-semibold overflow-hidden">
                        {student?.id}
                      </p>
                    </span>
                    <span className="text-[#787878]">
                      <UnfoldMoreIcon />
                    </span>
                  </span>
                </span>
              </li>
              <Popover
                PaperProps={{ className: '!rounded-2xl shadow-2xl bg-white ml-5' }}
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}>
                <div className=' z-50 bg-white min-w-[270px] relative'>
                  <IconButton className='!absolute !top-2 !right-2' onClick={popupState.close}>
                    <Close />
                  </IconButton>
                  <div className="cursor-pointer p-4 border-b border-[rgba(0,_0,_0,_0.20)]" >
                    <span className={`flex items-center justify-start gap-3`}>
                      <span className="block w-12 h-12 overflow-hidden rounded-full">
                        <ProfileImage
                          src={student?.image}
                          alt={student?.name}
                          className="w-full h-full object-cover"
                          gender={student?.gender}
                        />
                      </span>
                      <span className="flex-1 flex items-center">
                        <span className="overflow-hidden flex-1 flex flex-col">
                          <p className="text-base font-semibold leading-none overflow-hidden">
                            {student?.name}
                          </p>
                          <p className="text-xs text-clip text-[#787878] mt-1 font-semibold overflow-hidden">
                            {student?.email}
                          </p>
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <p className='flex gap-x-2 font-medium items-center text-sm px-2 text-[#17A26A]'>
                      <span className="w-6 flex justify-center">
                        <FiberManualRecordIcon fontSize="16" />
                      </span>
                      Updated Version
                    </p>
                    <button onClick={logOut} className="flex items-center px-2 py-2 rounded-md text-sm font-medium gap-x-2 text-[#7A7C88] duration-300 hover:bg-[#0064E133]">
                      <span className="w-6 flex justify-center">
                        <LogoutSVG />
                      </span>
                      <span>Log Out</span>
                    </button>
                  </div>
                  {/* <h4 className='text-xl font-semibold'>{session?.title || ''}</h4> */}

                  {/* <div className='mt-4 flex items-start gap-x-3'>
                    <img src={teacherImg} alt='' className='w-14 aspect-square object-cover rounded-full' />
                    <p className='text-sm flex-1'>{session?.desc || ''}</p>
                  </div> */}
                </div>
              </Popover>
            </>}
          </PopupState>

        </ul>
      </div>
    </div>
  );
};

const SideBar = () => {
  // states
  const [isOpen, setIsOpen] = useState(false);

  // student context
  const { student } = useContext(StudentContext);

  useEffect(() => {
    const navItems = document.querySelectorAll("li.navItem");

    navItems.forEach((element) => {
      // console.log(element);
      // element.onclick = () => {
      //   console.log('Hello')
      //   setIsOpen(false);
      // }
    });
  }, []);

  return (
    <>
      {/* large device sidebar */}
      <div className="lg:w-48 xl:w-56 h-screen max-lg:hidden">
        <SidebarMenus />
      </div>

      {/* mobile device navbar  */}
      <div div className="lg:hidden">
        <div className="py-2 px-5 flex items-center justify-between border-b border-[#DCDEE1]">
          <button
            onClick={() => setIsOpen(true)}
            className="text-black outline-none"
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
          <h2 className="text-xl font-semibold md:hidden">
            Welcome {student?.name}
          </h2>
          <div className="w-10 h-10 overflow-hidden rounded-full border-2">
            <Link to="/settings">
              <ProfileImage
                src={student?.image}
                alt={student?.name}
                gender={student?.gender}
                className="rounded-full w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* mobile device drawer */}
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:hidden"
      >
        <div className="w-60 bg-[#fff] h-full rounded-r-2xl">
          <SidebarMenus />
        </div>
      </Drawer>
    </>
  );
};

export default SideBar;
