import { useState } from "react";

//react-pro-sidebar
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

//logo
import logo from "../../../assets/images/logo.svg";

//Icons
import { HiHomeModern } from "react-icons/hi2";
import { MdAssignment } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { IoDocuments } from "react-icons/io5";
import { GiDiscussion } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

//react-router-dom
import { Link } from "react-router-dom";

//Togglebutton
import DarkModeToggle from "react-dark-mode-toggle";

const CustomSidebar = () => {
  const { collapsed } = useProSidebar();
  const [currentTheme, setCurrentTheme] = useState("Light");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      setCurrentTheme("Dark");
    } else {
      setCurrentTheme("Light");
    }
  };

  let navColor = currentTheme === "Light" ? "#fff" : "#33373E";
  const { collapseSidebar } = useProSidebar();

  return (
    <div className={`h-screen flex ${currentTheme === "Dark" ? "dark" : ""}`}>
      <Sidebar backgroundColor={navColor}>
        <Menu>
          <MenuItem
            className=""
            icon={
              <TbLayoutSidebarLeftCollapse className="text-2xl text-gray dark:text-dark-gray" />
            }
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center", width: "5rem" }}
          ></MenuItem>

          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/" />}
            icon={
              <HiHomeModern className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Home
          </MenuItem>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/assignments" />}
            icon={
              <MdAssignment className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Assignments
          </MenuItem>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/notes" />}
            icon={
              <TbNotes className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Notes
          </MenuItem>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/documents" />}
            icon={
              <IoDocuments className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Documents
          </MenuItem>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/discussions" />}
            icon={
              <GiDiscussion className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Discussions
          </MenuItem>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/settings" />}
            icon={
              <IoSettingsSharp className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Settings
          </MenuItem>

          <MenuItem
            className="text-black  dark:text-dark-gray"
            component={<Link to="/logout" />}
            icon={
              <FiLogOut className="text-gray text-2xl dark:text-dark-gray" />
            }
          >
            Logout
          </MenuItem>

          <DarkModeToggle
            onChange={handleChange}
            checked={!isDarkMode}
            size={collapsed ? "60" : "100"}
            className={`${collapsed ? "ml-2" : "ml-5"}`}
          />
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
