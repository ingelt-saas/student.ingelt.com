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
        </NavItem>
      </li>
      <Popover
        PaperProps={{ className: '!rounded-xl shadow-2xl bg-white ml-4' }}
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
      show: !Boolean(student?.organizationId),
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

          <NestedMenus
            icon={<HomeSVG />}
            path={'/'}
            name={'Preparation'}
          />

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
                PaperProps={{ className: '!rounded-2xl shadow-2xl bg-white' }}
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
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

// const SideBar = () => {
//   const [open, setOpen] = useState(false);
//   const [collapseMenu, setCollapseMenu] = useState(false);

//   // const darkModeHandler = () => {
//   //   if (localStorage.theme) {
//   //     localStorage.removeItem("theme");
//   //     document.documentElement.classList.remove("dark");
//   //   } else {
//   //     localStorage.theme = "dark";
//   //     document.documentElement.classList.add("dark");
//   //   }
//   // };

//   // useEffect(() => {
//   //   const navItems = document.querySelectorAll(".navbar");

//   //   navItems.forEach((ele) => {
//   //     ele.onmouseover = () => setCollapseMenu(false);
//   //     ele.onmouseout = () => setCollapseMenu(true);
//   //   });

//   // }, []);

//   return (
//     <>
//       {/* Larger device menu */}

//       {/* <div
//         className={`${collapseMenu && "max-w-sm"
//           }  lg:w-48 xl:w-56 hidden lg:flex flex-col h-full justify-between`}
//       >
//         <div className={`space-y-2 ${collapseMenu ? "mt-6" : "mt-0"}`}>
//           <div className="flex items-start justify-start pt-5 ">
//             <Link to="/" className="px-3">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className={`w-44 max-w-full duration-500 h-auto py-8`}
//               />
//             </Link>
//           </div>
//           <div className="flex-1 px-2">
//             <ul className="pt-2 pb-4 navbar ">

//               {navItemsArr.map((item, index) => item.show && <li className="navItem mb-2" key={index}>
//                 <NavItem to={item.path} collapseMenu={collapseMenu}>
//                   {item.icon}
//                   {/* <div className="bg-blue-500">
//                       <img src={item.icon} alt="svg" className=" " />
//                     </div> */}
//       <span
//         className={`${collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
//           } overflow-hidden duration-300`}
//       >
//         {item.name}
//       </span>
//     </NavItem >
//               </li >)}

//             </ul >
//           </div >
//         </div >

//   <div className="px-2 pb-3">
//     <div className="flex-1">
//       <ul className="pt-2 navbar">
//         <li className="navItem mb-2">
//           <NavItem to="/settings" collapseMenu={collapseMenu}>
//             <SettingSVG />
//             <span
//               className={`${collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
//                 } overflow-hidden duration-300`}
//             >
//               Settings
//             </span>
//           </NavItem>
//         </li>
//         <li className="navItem mb-2">
//           <NavItem
//             to="/logout"
//             onClick={(e) => {
//               e.preventDefault();
//               logOut();
//             }}
//             collapseMenu={collapseMenu}
//           >
//             <LogoutSVG />
//             <span
//               className={`${collapseMenu ? "max-w-0 max-h-0" : "max-w-xs max-h-10"
//                 } overflow-hidden duration-300`}
//             >
//               Log Out
//             </span>
//           </NavItem>
//         </li>
//         {/* <li className="mt-2 navItem">
//                 <button
//                   onClick={darkModeHandler}
//                   className={`p-1.5 w-full bg-[#1B3B7D33] ${collapseMenu ? "rounded-md" : "rounded-full"
//                     }`}
//                 >
//                   <span className="w-full h-9 block relative">
//                     <span
//                       className={`h-full grid place-items-center absolute top-0 opacity-0 dark:opacity-100 duration-300 ${collapseMenu ? "invisible" : "left-1/4 -translate-x-1/2"
//                         }`}
//                     >
//                       <IoSunnyOutline className="w-6 h-6 text-[#000000]" />
//                     </span>
//                     <span
//                       className={`h-full grid place-items-center absolute top-0 opacity-100 dark:opacity-0 duration-300 ${collapseMenu ? "invisible" : "right-1/4 translate-x-1/2"
//                         }`}
//                     >
//                       <IoMoonOutline className="w-6 h-6 text-[#000000]" />
//                     </span>
//                     <span
//                       className={`block bg-[#1B3B7D] h-full duration-300 ${collapseMenu
//                         ? "rounded-md absolute w-full left-0"
//                         : "rounded-full absolute w-1/2 top-0 !dark:left-0 dark:left-1/2"
//                         }`}
//                     >
//                       <IoSunnyOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-100 dark:opacity-0" />
//                       <IoMoonOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-0 dark:opacity-100" />
//                     </span>
//                   </span>
//                 </button>
//               </li> */}
//         <li className="mt-2 navItem">
//           <span
//             className={`flex items-center ${collapseMenu ? "justify-center" : "gap-3 justify-start"
//               }`}
//           >
//             <span className="block w-12 h-12 overflow-hidden rounded-full">
//               <ProfileImage
//                 src={student?.image}
//                 alt={student?.name}
//                 className="w-full h-full object-cover"
//                 gender={student.gender}
//               />
//             </span>
//             <span
//               className={`${collapseMenu ? "w-0 h-0" : "max-w-xs max-h-10"
//                 } overflow-hidden duration-300`}
//             >
//               <p className="text-base font-semibold leading-none overflow-hidden">
//                 {student.name}
//               </p>
//               <p className="text-sm text-[#787878] leading-none mt-1 font-semibold overflow-hidden">
//                 {student.id}
//               </p>
//             </span>
//           </span>
//         </li>
//       </ul>
//     </div>
//   </div>
//       </div >

//   {/* mobile navbar  */ }
//   < div className = "lg:hidden" >
//         <div className="py-2 px-5 flex items-center justify-between border-b border-[#DCDEE1]">
//           <button onClick={() => setOpen(true)} className="text-black">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2.5}
//               stroke="currentColor"
//               className={`w-6 h-6`}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//               />
//             </svg>
//           </button>
//           <h2 className="text-xl font-semibold md:hidden">
//             Welcome {student?.name}
//           </h2>
//           <div className="w-10 h-10 overflow-hidden rounded-full border-2">
//             <Link to="/settings">
//               <ProfileImage
//                 src={student?.image}
//                 alt={student?.name}
//                 gender={student?.gender}
//                 className="rounded-full w-full h-full object-cover"
//               />
//             </Link>
//           </div>
//         </div>
//         <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
//           <div
//             className="w-64 bg-[#fff] h-full flex flex-col justify-between rounded-r-2xl"
//             id="mobileNavbar"
//           >
//             <div className={`space-y-2 ${collapseMenu ? "mt-6" : "mt-0"}`}>
//               <div className="flex items-center justify-start pt-5">
//                 <Link to="/">
//                   <img
//                     src={logo}
//                     alt="Logo"
//                     className={`w-44 max-w-full duration-500 h-auto pl-2`}
//                   />
//                 </Link>
//               </div>
//               <div className="flex-1 px-2">
//                 <ul className="pt-2 pb-4">
//                   {navItemsArr.map((item, index) => item.show && <li className="navItem mb-2" key={index}>
//                     <NavItem to={item.path} onClick={() => setOpen(false)}>
//                       {item.icon}
//                       {/* <img src={item.icon} alt="svg" /> */}
//                       <span>{item.name}</span>
//                     </NavItem>
//                   </li>)}

//                   {/* {student?.organizationId && (
//                     <li className="navItem">
//                       <NavItem to="/institute" onClick={() => setOpen(false)}>
//                         <LibrarySVG />
//                         <span className={`duration-300`}>Institute</span>
//                       </NavItem>
//                     </li>
//                   )} */}
//                 </ul>
//               </div>
//             </div>

//             <div className="px-2 pb-3">
//               <div className="flex-1">
//                 <ul className="pt-2">
//                   <li className="navItem">
//                     <NavItem to="/settings" onClick={() => setOpen(false)}>
//                       <SettingSVG />
//                       <span className={`duration-300`}>Settings</span>
//                     </NavItem>
//                   </li>
//                   <li className="navItem">
//                     <NavItem
//                       to="/logout"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setOpen(false);
//                         logOut();
//                       }}
//                     >
//                       <LogoutSVG />
//                       <span className={`duration-300`}>Log Out</span>
//                     </NavItem>
//                   </li>
//                   {/* <li className="mt-2"> */}
//                   {/* <button
//                       onClick={darkModeHandler}
//                       className={`p-1.5 w-full bg-[#1B3B7D33] rounded-full`}
//                     >
//                       <span className="w-full h-9 block relative">
//                         <span
//                           className={`h-full grid place-items-center absolute top-0 opacity-0 dark:opacity-100 duration-300 left-1/4 -translate-x-1/2`}
//                         >
//                           <IoSunnyOutline className="w-6 h-6 text-[#000000]" />
//                         </span>
//                         <span
//                           className={`h-full grid place-items-center absolute top-0 opacity-100 dark:opacity-0 duration-300 right-1/4 translate-x-1/2`}
//                         >
//                           <IoMoonOutline className="w-6 h-6 text-[#000000]" />
//                         </span>
//                         <span
//                           className={`block bg-[#1B3B7D] h-full duration-300 rounded-full absolute w-1/2 top-0 left-0 dark:right-0`}
//                         >
//                           <IoSunnyOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-100 dark:opacity-0" />
//                           <IoMoonOutline className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 opacity-0 dark:opacity-100" />
//                         </span>
//                       </span>
//                     </button> */}
//                   {/* </li> */}
//                   <li className="mt-3">
//                     <span className={`flex items-center gap-3 justify-start`}>
//                       <span className="block w-12 h-12 overflow-hidden rounded-full">
//                         <ProfileImage
//                           src={student?.image}
//                           alt={student?.name}
//                           gender={student?.gender}
//                           className="w-full h-full object-cover"
//                         />
//                       </span>
//                       <span className={`duration-300`}>
//                         <p className="text-base font-semibold leading-none">
//                           {student?.name}
//                         </p>
//                         <p className="text-sm text-[#787878] leading-none mt-1 font-semibold">
//                           {student?.id}
//                         </p>
//                       </span>
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </Drawer>
//       </ > * /}
// {/* Mobile device menu */ }
//     </>
//   );
// };

export default SideBar;
