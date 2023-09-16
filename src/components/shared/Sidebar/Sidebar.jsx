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
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
  AccommodationSVG,
} from "./SidebarSVG.jsx";
// navbar svg

//assets
import logo from "../../../assets/images/navlogo.png";
import { useContext } from "react";
import { StudentContext } from "../../../contexts.js";
import ProfileImage from "../ProfileImage/ProfileImage.jsx";
import { VscFeedback } from 'react-icons/vsc';
import { AiFillGift } from 'react-icons/ai';

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

  return <PopupState variant="popover" >
    {(popupState) => <>
      <li className="navItem mb-1.5" {...bindTrigger(popupState)}>
        <NavItem to={path} onClick={(e) => e.preventDefault()}>
          <span className="flex items-center">
            {icon}
            <span className="mx-2">{name}</span>
            <span className="flex-1 flex justify-end">
              <ChevronRightIcon />
            </span>
          </span>
        </NavItem>
      </li>
      <Popover
        PaperProps={{ className: '!rounded-xl shadow-2xl bg-white' }}
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
            {Array.isArray(menus) && menus.map((item, index) => item.show && <li key={index} className="navItem mb-1.5">
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
      name: "Accommodation",
      path: "/accommodation",
      icon: <AccommodationSVG />,
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
                  <NestedMenus key={index} {...item} />
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
            <a href="https://g.page/r/CUZZJ7sFom8FEBM/review" target="_blank" rel="noreferrer" className="bg-transparent text-[#7A7C88] justify-start gap-3 flex items-center font-semibold  rounded-md duration-300 px-2 py-2 hover:bg-[#0064E133] hover:text-[#1B3B7D] text-sm">
              <VscFeedback className="!w-6 !h-6" />
              <span>Feedback</span>
            </a>
          </li>
          <li className="navItem mb-1.5">
            <NavItem to="/referral">
              <AiFillGift className="!w-6 !h-6" />
              <span>Refer & Earn</span>
            </NavItem>
          </li>
          <li className="navItem mb-1.5">
            <NavItem to="/settings">
              <SettingSVG />
              <span>Settings</span>
            </NavItem>
          </li>

          {/* bottom popup over */}
          <PopupState variant="popover">
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
                    <p className='flex gap-x-2 font-medium items-center text-sm px-2 text-[#17A26A]' onClick={(e) => e.stopPropagation()}>
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
      element.onclick = () => {
        console.log('Hello')
        setIsOpen(false);
      }
    });

  }, []);

  return (
    <>
      {/* large device sidebar */}
      <div className="lg:w-48 xl:w-56 h-screen max-lg:hidden">
        <SidebarMenus />
      </div>

      {/* mobile device navbar  */}
      <div className="lg:hidden">
        <div className="py-2 px-5 flex items-center justify-between border-b border-[#DCDEE1]">
          <button
            onClick={() => setIsOpen(true)}
            className="text-black outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className='w-6 h-6'
              viewBox="0 0 18 19"
              fill="none"
            >
              <path
                d="M1 10.0736H7C7.55 10.0736 8 9.62307 8 9.07247V1.06383C8 0.513231 7.55 0.0627441 7 0.0627441H1C0.45 0.0627441 0 0.513231 0 1.06383V9.07247C0 9.62307 0.45 10.0736 1 10.0736ZM1 18.0822H7C7.55 18.0822 8 17.6317 8 17.0811V13.0768C8 12.5262 7.55 12.0757 7 12.0757H1C0.45 12.0757 0 12.5262 0 13.0768V17.0811C0 17.6317 0.45 18.0822 1 18.0822ZM11 18.0822H17C17.55 18.0822 18 17.6317 18 17.0811V9.07247C18 8.52188 17.55 8.07139 17 8.07139H11C10.45 8.07139 10 8.52188 10 9.07247V17.0811C10 17.6317 10.45 18.0822 11 18.0822ZM10 1.06383V5.06815C10 5.61874 10.45 6.06923 11 6.06923H17C17.55 6.06923 18 5.61874 18 5.06815V1.06383C18 0.513231 17.55 0.0627441 17 0.0627441H11C10.45 0.0627441 10 0.513231 10 1.06383Z"
                fill="#7A7C88"
              />
            </svg>

          </button>
          <h2 className="text-xl font-semibold md:hidden flex items-center gap-2">
            Hello {student?.name}!
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path d="M0 24.68H24V0.68H0V24.68Z" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width={1}
                  height={1}
                >
                  <use
                    xlinkHref="#image0_2227_1568"
                    transform="scale(0.015625)"
                  />
                </pattern>
                <image
                  id="image0_2227_1568"
                  width={64}
                  height={64}
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
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
