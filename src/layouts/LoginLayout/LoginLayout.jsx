import { useState } from "react";

// Assets
import Logo from "../../assets/images/navlogo.png";
import SideImage from "../../assets/images/rocket copy.webp";
import cloud1 from "../../assets/images/cloud.png"
import cloud2 from "../../assets/images/cloud1.png"
import cloud3 from "../../assets/images/cloud2.png"
import cloud4 from "../../assets/images/cloud3.png"

// Components
import { Menu, MenuItem, Button, TextField, InputAdornment, IconButton, Input, FormControl, InputLabel } from "@mui/material";
import { KeyboardArrowDown, Visibility, VisibilityOff } from "@mui/icons-material";
import authApi from "../../api/auth";
// import Cookies from "js-cookie";

const LoginLayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    const regex =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
    if (!regex.test(email)) {
      setError("Invalid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });

      // Shifted to LocalStorage from Cookies
      localStorage.setItem("student_auth_token", res?.data?.token);

      // Cookies.set("student_auth_token", res?.data?.token, {
      //   expires: 7,
      //   path: "",
      //   domain: ".ingelt.com",
      // });
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen cursor-default overflow-y-hidden">
      <div className="w-1/2 flex flex-col justify-center max-lg:w-full">
        <div className="flex justify-end items-end pt-3">
      <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                zIndex:'10'
              }}
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
              <MenuItem onClick={()=>window.location.assign("https://teacher.ingelt.com")}>
                <span className="text-sm">Teacher</span>
              </MenuItem>

              <MenuItem onClick={()=>window.location.assign("https://teacher.ingelt.com")}>
                <span className="text-sm">Institute</span>
              </MenuItem>
            </Menu>
            </div>
      <div className="h-1/3 flex items-center justify-center px-4">
            <img src={Logo} alt="" className="h-[50%]"/>
          </div>
          <h1 className="text-4xl text-center text-neutral-600">Welcome!</h1>
        <div
          className={`flex flex-col justify-center h-full mt-10 ${
            loading && "opacity-70 pointer-events-none"
          }`}
        >
          
          <div className="max-sm:px-10 max-lg:px-20 w-full">
            <form className="flex flex-col mb-10 items-center w-full" onSubmit={handleLogin}>
              <TextField name="email" type="email" sx={{width:{xs:'100%',md:'60%'},pt:1}} id="standard-basic" label="Email" variant="standard" />
              <FormControl sx={{ m: 2, width:{xs:'100%',md:'60%'},pt:1}} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  className="hover:bg-none"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

              <div className=" flex w-full md:w-[60%] justify-end text-sm px-1">
                <div className="text-neutral-500 duration-100 transition-all ease-in underline cursor-pointer">
                  Forgot Password ?
                </div>
              </div>
              {error && (
                <p className="text-center text-red-500 font-medium text-sm mt-5">
                  {error}
                </p>
              )}
              <button
                disabled={loading}
                className="md:w-1/4 w-full border-2 border-[#0064E1] hover:bg-[#0064E1] mt-8 rounded-full py-2 font-semibold hover:text-[#fff] bg-white text-[#0064E1] text-xl ease-in-out duration-200"
              >
                Log in
              </button>
            </form>
            <div className="flex items-center justify-center text-neutral-700">
              <hr className='w-[25%]'/>
              <p className="text-center px-1">or</p>
              <hr className='w-[25%]'/>
              </div>
              <div className="flex md:flex-row flex-col items-center justify-evenly mt-6 md:px-36">
              <p className="md:pb-0 pb-4">Don't have an account?</p>
              <a href='https://board.ingelt.com/register' rel="noreferrer" className="px-2 py-1 md:px-5 md:py-2 border-2 border-[#0064E1] bg-[#0064E1] hover:bg-white hover:text-[#0064E1] text-white rounded-3xl">
                Sign Up
              </a>
              </div>
              <div className="pb-4">
              <p className="text-center text-sm mt-5"><span className="text-[#0064E1] cursor-pointer">Terms of Use</span> and <span className="text-[#0064E1] cursor-pointer">Privacy Policy</span></p>
              </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col bg-[#92C0F7] max-lg:hidden">
        
        <img src={cloud1} alt="" className="absolute top-5 w-1/5 floating-left"/>
        <img src={cloud2} alt="" className="absolute w-1/4 top-44 right-16 floating-right"/>
        <img src={cloud3} alt="" className="absolute w-1/6 bottom-64 floating-right"/>
        <img src={cloud4} alt="" className="absolute w-1/6 bottom-20 right-20 floating-left"/>
        <img src={SideImage} alt="" className="floating relative"/>
      </div>
    </div>
  );
};

export default LoginLayout;
