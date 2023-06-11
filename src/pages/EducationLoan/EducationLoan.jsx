import React, { useEffect } from "react";
import { useState } from "react";
import welcomeSVG from "../../assets/images/scholar.svg";
import loanSVG from "../../assets/images/loan.svg";
import darkDownSVG from "../../assets/images/darkDown.svg";
import img2 from "../../assets/images/Personal finance-pana.svg";
import {
  Box,
  CircularProgress,
  FormControl,
  TablePagination,
  Select,
  OutlinedInput,
  MenuItem,
  Typography,
} from "@mui/material";


const SelectMenu = ({ options, placeholder, value, handleChange, name }) => {
  return (<FormControl fullWidth>
    <Select
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none !important',
        },
        fontWeight: 500,
        color: '#001E43',
        textAlign: 'left',
        backgroundColor: 'white',
        fontSize: '0.9rem',
      }}
      displayEmpty
      value={value || ''}
      onChange={handleChange}
      input={<OutlinedInput />}
      name={name}
      MenuProps={{ sx: { height: '50vh' } }}
      inputProps={{ 'aria-label': 'Without label' }}
    >
      <MenuItem disabled value="">
        {placeholder}
      </MenuItem>
      {Array.isArray(options) && options.map(item =>
        <MenuItem key={item} value={item}>{item}</MenuItem>
      )}
    </Select>
  </FormControl >
  );
}

const Page2 = () => {
  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full  sm:m-auto">
      <div className="w-full h-20 foo:block ">
        <div className="pt-6 pb-5 pl-3">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { md: "65%", xs: "100%" },
              height: "20vh",
              padding: "2rem",
              backgroundColor: "white",
              border: "1px solid white",
              borderRadius: "2rem",
              boxShadow:
                "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: { md: "50%", xs: "90%" },
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  display: { md: "flex", xs: "none" },
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Shortlisting University
              </Typography>
              <Typography
              // sx={{
              //   fontSize: "1.5rem",
              // }}
              >
                Nulla Lorem mollit cupidatat irure.
              </Typography>
            </Box>
            <Box sx={{ width: { md: "45%", xs: "100%" } }}>
              <img
                src={welcomeSVG}
                alt="library"
                className="md:relative md:bottom-7 md:left-10 "
              />
            </Box>
          </Box>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 flex max-lg:hidden">
            <img
              src={img2}
              alt="welcome svg"
              className="w-400 h-auto mx-auto my-10"
            />
          </div>
          <div className="w-1/2">
            <section className="body-font">
              <div className="container px-5 pb-24 pt-10 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full">
                  <div className=" md:pr-10 md:py-6">
                    <div className="flex relative pb-12">
                      {/* creating line */}
                      <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div class="h-full w-1 bg-[#00285A] pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00285A] inline-flex items-center justify-center text-white relative z-10">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-extrabold title-font  text-[#00285A] mb-1 tracking-wider">
                          Counselling
                        </h2>
                        <p className="leading-relaxed">
                          Counselors can help you organize and prepare the
                          required documents for your visa application.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-12">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-[#00285A] pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00285A] inline-flex items-center justify-center text-white relative z-10">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-extrabold title-font  text-[#00285A] mb-1 tracking-wider">
                          Document Collection
                        </h2>
                        <p className="leading-relaxed">
                          Counselors can help you organize and prepare the
                          required documents for your visa application.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-12">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-[#00285A] pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00285A] inline-flex items-center justify-center text-white relative z-10">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="5" r="3"></circle>
                          <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-extrabold title-font  text-[#00285A] mb-1 tracking-wider">
                          File Preparation
                        </h2>
                        <p className="leading-relaxed">
                          Counselors can help you organize and prepare the
                          required documents for your visa application.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-12">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-[#646669] pointer-events-none "></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00285A] inline-flex items-center justify-center text-white relative z-10">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-extrabold title-font  text-[#00285A] mb-1 tracking-wider">
                          Applied for Loan
                        </h2>
                        <p className="leading-relaxed">
                          Counselors can help you organize and prepare the
                          required documents for your visa application.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00285A] inline-flex items-center justify-center text-white relative z-10">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-extrabold title-font  text-[#00285A] mb-1 tracking-wider">
                          Loan Disbursed
                        </h2>
                        <p className="leading-relaxed">
                          Counselors can help you organize and prepare the
                          required documents for your visa application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationLoan = () => {

  const [data, setData] = useState({
    intake: '',
    country: '',
    zone: '',
    familyIncome: '',
  });
  const [page, setPage] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(data).includes('')) {
      return;
    }
  }

  return (
    <div className="flex ">
      {page ? (
        <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
          <div className="w-full h-20 foo:block ">
            {/* <div className="relative rounded-xl pb-14 shadow-lg bg-white mx-3 ">
              <h1 className="text-3xl font-semibold text-left pb-5 pt-12 px-5 ">
                Education Loan
              </h1>
              <p className="text-left  px-5 w-1/3 ">
                Nulla Lorem mollit cupidatat irure. Laborum magna cillum dolor.{" "}
              </p>
              <img
                src={welcomeSVG}
                alt="welcome svg"
                className="absolute bottom-0 right-3 h-52 w-auto"
              />
            </div> */}
            <div className="pt-3 pb-4 pl-3">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  width: { md: "65%", xs: "100%" },
                  height: "20vh",
                  padding: "2rem",
                  backgroundColor: "white",
                  border: "1px solid white",
                  borderRadius: "2rem",
                  boxShadow:
                    "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: { md: "50%", xs: "90%" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      display: { md: "flex", xs: "none" },
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Education Loan
                  </Typography>
                  <Typography
                  // sx={{
                  //   fontSize: "1.5rem",
                  // }}
                  >
                    Nulla Lorem mollit cupidatat irure.
                  </Typography>
                </Box>
                <Box sx={{ width: { md: "30%", xs: "100%" } }}>
                  <img
                    src={welcomeSVG}
                    alt="library"
                    className="md:relative md:bottom-1  md:left-28 "
                  />
                </Box>
              </Box>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 flex max-lg:hidden">
                <img
                  src={loanSVG}
                  alt="welcome svg"
                  className="w-400 h-auto mx-auto my-10"
                />
              </div>
              <div className="w-1/2  max-lg:w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 pt-5 pr-3 mb-10">

                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor="state">Where do you want to study?</label>
                    <div className='shadow-lg rounded-xl overflow-hidden'>
                      <SelectMenu
                        placeholder={'Select country'}
                        name={'country'}
                        handleChange={handleChange}
                        value={data.country}
                        options={['UK', 'USA', 'New Zealand', 'Ireland', 'Canada']}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor="zone">Where do you live?</label>
                    <div className='shadow-lg rounded-xl overflow-hidden'>
                      <SelectMenu
                        placeholder={'Select your district/zone'}
                        name={'zone'}
                        value={data.zone}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor="zone">What is your family annual income?</label>
                    <div className='shadow-lg rounded-xl overflow-hidden'>
                      <SelectMenu
                        placeholder={'Family Annual Income'}
                        name={'familyIncome'}
                        value={data.familyIncome}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-2'>
                    <label>What's your preferred intake?</label>
                    <div className="flex flex-wrap gap-3">
                      {['Sep 2023', 'Jan 2024', 'May 2024'].map(item =>
                        <label htmlFor={item} key={item} className={`${item === data.intake ? 'bg-[#001E43] text-white' : 'bg-transparent text-[#001E43]'} border-2 border-[#001E43] duration-300 rounded-xl px-4 py-2 cursor-pointer`}>
                          <input onChange={handleChange} id={item} value={item} className="sr-only peer" checked={Boolean(data.intake === item)} type="radio" name='intake' />
                          {item}
                        </label>
                      )}
                    </div>
                  </div>

                  {/* submit button */}
                  <div>
                    <button
                      disabled={Boolean(Object.values(data).includes(''))}
                      type="submit"
                      className="bg-[#001E43] disabled:opacity-80 border-2 border-[#001E43] hover:bg-transparent hover:text-[#001E43] w-full text-white font-bold py-3 px-4 rounded-xl duration-300"
                      onClick={(e) => {
                        setPage(false);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                  <p className="text-center text-black text-sm">By continuing, you agree to our <span className="font-medium text-[#001E43] cursor-pointer">Term of services</span> & <span className="font-medium text-[#001E43] cursor-pointer">Privacy policy</span></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Page2 />
      )}
    </div>
  );
};

export default EducationLoan;
