import { useState } from "react";

// Assets
import Logo from "../../assets/images/navlogo.png";
import SideImage from "../../assets/images/rocket copy.webp";
import cloud1 from "../../assets/images/cloud.png"
import cloud2 from "../../assets/images/cloud1.png"
import cloud3 from "../../assets/images/cloud2.png"
import cloud4 from "../../assets/images/cloud3.png"

// Components
import { Menu, MenuItem, Button, TextField, InputAdornment, IconButton, Input, FormControl, InputLabel, Box, Modal, Typography } from "@mui/material";
import { KeyboardArrowDown, Visibility, VisibilityOff } from "@mui/icons-material";
import authApi from "../../api/auth";
import Cookies from "js-cookie";
import SignUp from "../../components/Authentication/SignUp";

const PasswordResetModal = ({ open, onClose }) => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // reset handler
  const resetHandler = async () => {

    setError('');
    setSuccess('');

    // email check 
    const regex =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
    if (!regex.test(email)) {
      setError('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      await authApi.resetEmail({ email });
      setSuccess('A password reset email has been sent to your email address.');
      setEmail('');
    } catch (err) {
      setError(err.response.data?.message);
    } finally {
      setLoading(false);
    }

  }

  const handleClose = () => {
    setEmail('');
    setError('');
    setLoading(false);
    setSuccess('');
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
          outline: 'none'
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Forgot Password
        </Typography>
        <Typography variant="body2" component="p" mb={2}>
          Please enter your email address to reset your password.
        </Typography>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-center text-sm text-red-500 mt-2 font-medium">{error}</p>}
        {success && <p className="text-center text-sm text-green-500 mt-2 font-medium">{success}</p>}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: '0.7rem 0rem',
              backgroundColor: '#0C3C82',
              '&:hover': {
                backgroundColor: '#0C3C82'
              }
            }}
            disabled={loading}
            onClick={resetHandler}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const LoginLayout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    preferredMode: '',
    state: '',
    city: ''
  });

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

      Cookies.set('student_auth_token', res?.data?.token, { expires: 7, path: '/', domain: '.ingelt.com' })
      // Cookies.set('student_auth_token', res?.data?.token, { expires: 7, path: '/', domain: 'board.ingelt.com' })
      // Shifted to LocalStorage from Cookies
      // localStorage.setItem("student_auth_token", res?.data?.token);
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(!openSignUp);
  }

  return (
    <>
      <div className="flex h-screen cursor-default">
        <div className="w-1/2 flex flex-col gap-y-5 justify-center max-lg:w-full">
          <div className="flex justify-end items-end">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                zIndex: '10'
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
              <MenuItem onClick={() => window.location.assign("https://teacher.ingelt.com")}>
                <span className="text-sm">Teacher</span>
              </MenuItem>

              <MenuItem onClick={() => window.location.assign("https://partner.ingelt.com")}>
                <span className="text-sm">Partner</span>
              </MenuItem>
            </Menu>
          </div>
          <div className="text-center">
            <img src={Logo} alt="" className="w-48 mx-auto h-auto" />
          </div>
          <h1 className="text-4xl text-center text-neutral-600">Welcome!</h1>
          <div className={`flex flex-col justify-center ${loading && "opacity-70 pointer-events-none"}`}>
            <div className="max-sm:px-10 max-lg:px-20 w-full">
              <form className="flex flex-col mb-5 items-center w-full" onSubmit={handleLogin}>
                <TextField name="email" required type="email" sx={{ width: { xs: '100%', md: '60%' }, pt: 1 }} id="standard-basic" label="Email" variant="standard" />
                <FormControl sx={{ m: 2, width: { xs: '100%', md: '60%' }, pt: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
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
                  <div onClick={() => setIsOpen(true)} className="text-neutral-500 duration-100 transition-all ease-in underline cursor-pointer">
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
                <hr className='w-[25%]' />
                <p className="text-center px-1">or</p>
                <hr className='w-[25%]' />
              </div>
              <div className="flex md:flex-row flex-col items-center justify-evenly mt-6 md:px-36">
                <p className="md:pb-0 pb-4">Don't have an account?</p>
                <button onClick={() => setOpenSignUp(true)} className="px-2 py-1 md:px-5 md:py-2 border-2 border-[#0064E1] bg-[#0064E1] hover:bg-white hover:text-[#0064E1] text-white rounded-3xl">
                  Sign Up
                </button>
              </div>
              <div className="">
                <p className="text-center text-sm mt-5"><span className="text-[#0064E1] cursor-pointer">Terms of Use</span> and <span className="text-[#0064E1] cursor-pointer">Privacy Policy</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 overflow-hidden relative bg-[#92C0F7] max-lg:hidden">

          <img src={cloud1} alt="" className="absolute top-5 lg:right-[25rem] xl:right-[27rem] 2xl:right-[30rem] w-1/3 floating-left" />
          <img src={cloud2} alt="" className="absolute w-1/2 top-64 right-16 floating-right" />
          <img src={cloud3} alt="" className="absolute w-1/3 bottom-64 lg:right-[25rem] xl:right-[27rem] 2xl:right-[30rem] floating-right" />
          <img src={cloud4} alt="" className="absolute w-1/3 bottom-20 right-20 floating-left" />
          <img src={SideImage} alt="" className="floating relative" />
        </div>
      </div>
      <PasswordResetModal open={isOpen} onClose={() => setIsOpen(false)} />
      <SignUp open={openSignUp} handleClose={handleOpenSignUp} text={''} formData={formData} setFormData={setFormData} />
    </>
  );
}


export default LoginLayout;
