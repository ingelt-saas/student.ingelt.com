import { useState } from "react";

// Assets
import Logo from "../../assets/images/logo.svg";
import SideImage from "../../assets/images/login.png";
import GoogleLogo from "../../assets/images/google-logo.png";

// Components
import { Menu, MenuItem, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

const LoginLayout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex h-screen cursor-default">
      <div className="w-1/2 flex flex-col justify-betwee max-lg:w-full">
        <div className="h-[8%] my-3 flex justify-between items-center cursor-pointer">
          <div className="h-full flex items-center px-4">
            <img src={Logo} alt="" className="h-[80%]" />
            <span className="ml-4 font-semibold text-xl">InGelt Board</span>
          </div>

          <div className="h-full flex justify-center items-center px-4 text-sm">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <span className="capitalize text-[#878787] font-semibold flex justify-center items-center">
                <span className="mr-1">Student</span>
                <KeyboardArrowDown fontSize="small" />
              </span>
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <span className="text-sm">Teacher</span>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <span className="text-sm">Institute</span>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className="flex flex-col justify-center h-full">
          <div className="px-32 max-sm:px-10 max-lg:px-20">
            <h1 className="font-bold text-3xl mb-2">InGelt Board Login</h1>

            <p className="font-semibold">Please enter your details.</p>

            <button className="border-2 border-[#404040] text-[#404040] rounded-md px-4 py-1 font-semibold flex items-center justify-center w-full my-9">
              <img className="h-10 mr-2" src={GoogleLogo} alt="" />

              <span>Continue with Google</span>
            </button>

            <div className="text-center">OR</div>

            <form className="flex flex-col my-8">
              <input
                type="email"
                placeholder="Email"
                className="border-b-1 my-2 py-2 outline-none px-1"
              />

              <input
                type="password"
                placeholder="Password"
                className="border-b-1 my-2 py-2 outline-none px-1"
              />

              <div className=" flex justify-between text-sm mt-4 px-1">
                <div className="flex items-center">
                  <input className="cursor-pointer" type="checkbox" />
                  <span className="ml-2 font-semibold">Remember me</span>
                </div>

                <div className="font-semibold underline cursor-pointer">
                  Forgot Password
                </div>
              </div>

              <button className="border-2 border-[#0064E1] bg-[#0064E1] mt-9 rounded py-2 font-semibold text-[#fff] hover:bg-white hover:text-[#0064E1] ease-in-out duration-200">
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-[#cae6fb] max-lg:hidden">
        <img src={SideImage} alt="" />
      </div>
    </div>
  );
};

export default LoginLayout;
