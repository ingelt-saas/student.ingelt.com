import React, { useState } from "react";
import welcomeSVG from "../../assets/images/headingSVG.svg";
import universitySVG from "../../assets/images/unilogo.svg";
import logo from "../../assets/images/logo.png";
import eye from "../../assets/images/eye.svg";
import timeSVG from "../../assets/images/time.svg";
import starSVG from "../../assets/images/star.svg";
import rightArrowSVG from "../../assets/images/rightArrow.svg";
import heartSVG from "../../assets/images/heart.svg";
import planeSVG from "../../assets/images/airplane.svg";
import downSVG from "../../assets/images/downArrow.svg";
import ShortlistSVG from "../../assets/images/shortlist.svg";
import { Button, Drawer } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";
const RightArrowSVG = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      className={className}
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect
        x="0.785645"
        y="0.998047"
        width="28.5714"
        height="28.5714"
        rx="14.2857"
        fill="#0C3C82"
        fillOpacity="0.1"
      />
      <g clipPath="url(#clip0_1460_1759)">
        <path
          d="M11.6882 19.838L16.2319 15.2844L11.6882 10.7308L13.087 9.33203L19.0394 15.2844L13.087 21.2368L11.6882 19.838Z"
          fill="#0C3C82"
        />
      </g>
      <defs>
        <clipPath id="clip0_1460_1759">
          <rect
            width="23.8095"
            height="23.8095"
            fill="white"
            transform="translate(3.1665 3.37891)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const SelectMenue = () => {
  return (
    <div className="bg-white rounded-t-2xl max-xl:hidden">
      <div className="relative">
        <img src={ShortlistSVG} alt="Shortlist" className="" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5 px-5">
          <p className="text-white">
            need more help in finding your dream course?
          </p>
          <button className="bg-[#E7ECF3] w-fit text-[#0C3C82] font-semibold py-3 px-6 rounded-full flex items-center gap-x-2">
            Talk to expert
            <RightArrowSVG />
          </button>
        </div>
      </div>
      <div className="h-4/7">
        <div className="relative">
          <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
            <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
              Country
            </option>
            <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
              Country 1
            </option>
            <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
              Country 2
            </option>
            <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
              Country 3
            </option>
            <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
              Country 4
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <img
              src={downSVG}
              alt="down arrow"
              className="h-auto w-6 inline mr-4"
            />
          </div>
        </div>

        <div className="relative">
          <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
            <option>Course level</option>
            {/* <!-- Add state options here --> */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <img
              src={downSVG}
              alt="down arrow"
              className="h-auto w-6 inline mr-4 "
            />
          </div>
        </div>

        <div className="relative">
          <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
            <option>Area of study</option>
            <option>Area of study</option>
            <option>Area of study</option>
            <option>Area of study</option>
            <option>Area of study</option>
            {/* <!-- Add country options here --> */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <img
              src={downSVG}
              alt="down arrow"
              className="h-auto w-6 inline mr-4 "
            />
          </div>
        </div>
        <div className="relative">
          <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
            <option>Higher education</option>
            <option>Higher education</option>
            <option>Higher education</option>
            <option>Higher education</option>
            <option>Higher education</option>
            {/* <!-- Add state options here --> */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <img
              src={downSVG}
              alt="down arrow"
              className="h-auto w-6 inline mr-4  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="p-4 bg-white border-8 flex flex-col rounded-3xl shadow border-[#E2E7EE] mt-4 h-72 justify-between">
      {/* 1st Div */}
      <div className="">
        <h6 className="mb-2 text-lg !text-[#00285A] font-bold tracking-tight text-gray-900 dark:text-white">
          Bachelor in Computer Science
        </h6>
      </div>

      {/* 2nd Div */}
      <div className="flex justify-between">
        <p className="bg-[#E7ECF3] text-[#0C3C82] py-1 px-4 rounded-full inline-flex items-center font-medium">
          <img src={eye} alt="welcome svg" className="h-auto w-5 mr-1" />
          85,900 USD / year
        </p>
        <p className="bg-[#E7ECF3] text-[#0C3C82] py-1 px-4 rounded-full inline-flex items-center font-medium">
          <img
            src={timeSVG}
            alt="welcome svg"
            className="h-4 w-4 mr-1 my-auto"
          />
          4 years
        </p>
      </div>

      {/* 3rd div */}
      <div className="flex">
        <div className="w-3/5">
          <p className="font-semibold">United States</p>
          <p>
            Global Ranking |
            <img
              src={starSVG}
              alt="welcome svg"
              className="h-auto w-4 inline mb-1"
            />
            10
          </p>
        </div>
        <div className="w-2/5 flex m-auto ">
          <img src={logo} alt="logo" className="h-8 w-auto p-1 m-auto" />
          <p className="leading-4 m-auto">Apply with Ingelt Board</p>
        </div>
      </div>

      {/* 4th div */}
      <div>
        <img
          src={universitySVG}
          alt="university logo"
          className="h-auto w-11 inline mb-1"
        />
        <p className="pl-4 pr-3 text-[#0C3C82] inline">University Of Chicago</p>
      </div>

      {/* 5th div */}
      <div className="flex justify-between mu-3">
        <button className="bg-[#0C3C82] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
          Talk to expert
          <img
            src={rightArrowSVG}
            alt="right arrow"
            className="h-auto w-4 ml-2 inline "
          />
        </button>
        <button className="bg-[#E7ECF3] hover:bg-blue-700 text-[#0C3C82] font-semibold py-2 px-4 rounded-full">
          Shortlist
          <img
            src={heartSVG}
            alt="right arrow"
            className="h-auto w-4 ml-1 inline mb-1"
          />
        </button>
      </div>
    </div>
  );
};

const ShortlistUniversity = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
        <div className="w-full h-20 foo:block ">
          {/* <div className="rounded-xl shadow-lg bg-white flex justify-between items-center">
            <div className="pl-3 max-md:py-8">
              <h1 className="text-3xl text-[#001E43] font-semibold text-left">
                Shortlisting University
              </h1>
              <p className="text-left mt-2 text-[#00000099] font-medium">
                Nulla Lorem mollit cupidatat irure. Laborum magna cillum dolor.{" "}
              </p>
            </div>
            <img
              src={welcomeSVG}
              alt="welcome svg"
              className="-mt-12 max-md:hidden"
            />
          </div> */}
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

          <div className="flex gap-x-5 mt-10 max-xl:flex-col max-lg:pb-20">
            <div className="w-full xl:w-1/3">
              <Button
                className="xl:!hidden"
                variant="container"
                sx={{
                  backgroundColor: "#00285A",
                  color: "white",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#00285A",
                    color: "white",
                  },
                }}
                endIcon={<FilterAlt />}
                onClick={() => setIsOpen(true)}
              >
                Filter
              </Button>
              <SelectMenue />
            </div>
            <div className="w-full xl:w-2/3 sm:w-2/2">
              <div className="grid max-md:grid-cols-1 grid-cols-2 gap-x-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer  */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{
          paper: "!bg-transparent",
        }}
      >
        <div className="bg-white h-full rounded-t-full max-w-[300px]">
          <div className="relative">
            <img src={ShortlistSVG} alt="Shortlist" className="" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5 px-5">
              <p className="text-white">
                need more help in finding your dream course?
              </p>
              <button className="bg-[#E7ECF3] w-fit text-[#0C3C82] font-semibold py-3 px-6 rounded-full flex items-center gap-x-2">
                Talk to expert
                <RightArrowSVG />
              </button>
            </div>
          </div>
          <div className="h-4/7">
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                  Country
                </option>
                <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                  Country 1
                </option>
                <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                  Country 2
                </option>
                <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                  Country 3
                </option>
                <option className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                  Country 4
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={downSVG}
                  alt="down arrow"
                  className="h-auto w-6 inline mr-4"
                />
              </div>
            </div>

            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                <option>Course level</option>
                {/* <!-- Add state options here --> */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={downSVG}
                  alt="down arrow"
                  className="h-auto w-6 inline mr-4 "
                />
              </div>
            </div>

            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                <option>Area of study</option>
                <option>Area of study</option>
                <option>Area of study</option>
                <option>Area of study</option>
                <option>Area of study</option>
                {/* <!-- Add country options here --> */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={downSVG}
                  alt="down arrow"
                  className="h-auto w-6 inline mr-4 "
                />
              </div>
            </div>
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
                <option>Higher education</option>
                <option>Higher education</option>
                <option>Higher education</option>
                <option>Higher education</option>
                <option>Higher education</option>
                {/* <!-- Add state options here --> */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={downSVG}
                  alt="down arrow"
                  className="h-auto w-6 inline mr-4  "
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ShortlistUniversity;
