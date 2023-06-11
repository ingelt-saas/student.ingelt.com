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
import { Button, Drawer, Select, FormControl, MenuItem, OutlinedInput, Box, Typography } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { Country } from 'country-state-city';

const RightArrowSVG = ({ className, backgroundColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
        className={backgroundColor}
        fill='currentColor'
        // fill={backgroundColor}
        fillOpacity="0.1"
      />
      <g clipPath="url(#clip0_1460_1759)">
        <path
          d="M11.6882 19.838L16.2319 15.2844L11.6882 10.7308L13.087 9.33203L19.0394 15.2844L13.087 21.2368L11.6882 19.838Z"
          fill="currentColor"
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

const HeartSVG = () => {
  return (
    <svg
      className="w-5"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1467_2485)">
        <path
          d="M9.23404 16.9946L11.7165 18.7486L11.7178 18.7496C11.8436 18.8389 11.9785 18.8791 12.104 18.8791C12.2155 18.8791 12.339 18.8447 12.4482 18.7748L12.4554 18.7702L13.595 18.0616C15.9704 16.5784 18.1359 14.7369 20.0257 12.5975C20.7516 11.7778 21.3257 10.8454 21.7467 9.82631C21.7861 9.72583 21.826 9.62704 21.867 9.53258C22.1653 8.76574 22.3203 7.94834 22.3203 7.10492V7.05823C22.3146 6.2269 22.1581 5.42275 21.8632 4.66669C21.57 3.92087 21.1461 3.25533 20.6127 2.67567C20.0757 2.10661 19.4522 1.65842 18.7645 1.34008C18.0396 1.01662 17.2852 0.850274 16.5025 0.850274C15.7185 0.850274 14.9632 1.01688 14.2455 1.34074C13.6146 1.62544 13.0378 2.03048 12.529 2.53941L12.1015 2.96697L11.6765 2.53687C11.1754 2.02964 10.6002 1.62556 9.96872 1.34081C9.25183 1.01757 8.48992 0.850274 7.70499 0.850274C6.92732 0.850274 6.16636 1.01679 5.44941 1.34013C4.75675 1.65702 4.13306 2.1063 3.59515 2.67586C3.06295 3.25371 2.64479 3.91899 2.35128 4.66741L2.35003 4.67059C2.04399 5.43813 1.8877 6.25769 1.8877 7.10488C1.8877 7.95174 2.04437 8.77113 2.34982 9.53982L2.35034 9.54112C2.82676 10.7482 3.51188 11.8095 4.39306 12.7157L5.13362 13.4792M9.23404 16.9946C9.23373 16.9945 9.23434 16.9949 9.23404 16.9946ZM9.23404 16.9946C7.77562 15.9559 6.3931 14.7746 5.13362 13.4792M5.13362 13.4792C5.13352 13.4792 5.1337 13.4794 5.13362 13.4792Z"
          stroke="currentColor"
          strokeWidth="1.20192"
        />
      </g>
      <defs>
        <clipPath id="clip0_1467_2485">
          <rect
            width="22.8365"
            height="19.2308"
            fill="white"
            transform="translate(0.685547 0.248047)"
          />
        </clipPath>
      </defs>
    </svg>

  );
}

const SelectMenu = ({ options, placeholder, value, handleChange, name }) => {
  return (<>
    <FormControl fullWidth>
      <Select
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #F7EFFF !important',
          },
          fontWeight: 500,
          color: '#001E43',
          textAlign: 'center',
        }}
        displayEmpty
        value={value}
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
  </>);
}

const FilterMenu = () => {

  const [selectedData, setSelectedData] = useState({
    country: '',
    courseLevel: '',
    areaOfStudy: '',
    higherEducation: ''
  });

  const selectHandler = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-white rounded-t-2xl max-xl:hidden">
      <div className="relative">
        <img src={ShortlistSVG} alt="Shortlist" className="" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5 px-5">
          <p className="text-white">
            need more help in finding your dream course?
          </p>
          <button className="bg-[#E7ECF3] group border-2 border-[#E7ECF3] hover:bg-transparent hover:text-[#E7ECF3] duration-300 w-fit text-[#0C3C82] font-semibold py-3 px-6 rounded-full flex items-center gap-x-2">
            Talk to expert
            <RightArrowSVG
              className={'w-6 h-6'}
              backgroundColor={'text-[#0C3C82] group-hover:text-[#E7ECF3]'}
            />
          </button>
        </div>
      </div>
      <div className="h-4/7">
        <SelectMenu
          placeholder={'Country'}
          options={Country.getAllCountries().map(i => i.name)}
          value={selectedData.country}
          handleChange={selectHandler}
          name='country'
        />
        <SelectMenu
          placeholder={'Course Level'}
          options={[]}
          value={selectedData.courseLevel}
          handleChange={selectHandler}
          name='courseLevel'
        />
        <SelectMenu
          placeholder={'Area of study'}
          options={[]}
          value={selectedData.areaOfStudy}
          handleChange={selectHandler}
          name='areaOfStudy'
        />
        <SelectMenu
          placeholder={'Higher education'}
          options={[]}
          value={selectedData.higherEducation}
          handleChange={selectHandler}
          name='higherEducation'
        />

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
        <button className="bg-[#0C3C82] hover:bg-transparent duration-300 border-2 border-[#0C3C82] hover:text-[#0C3C82] text-white font-semibold py-2 px-4 rounded-full gap-x-2 flex items-center">
          Talk to expert
          <RightArrowSVG className={'h-5 w-5'} />
        </button>
        <button className="bg-[#E7ECF3] hover:bg-[#0C3C82] duration-300 text-[#0C3C82] hover:text-[#E7ECF3] font-semibold py-2 px-4 rounded-full flex items-center gap-x-2">
          Shortlist
          <HeartSVG />
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
              <FilterMenu />
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
