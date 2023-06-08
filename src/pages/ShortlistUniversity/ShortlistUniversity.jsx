import React from "react";
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

const SelectMenue = () => {
  return (
    <div className="max-w-sm bg-white flex flex-col rounded-3xl shadow mt-4 h-2/3 w-11/12">
      <div className="bg-[#0C3C82] border rounded-3xl text-white h-3/7 flex flex-col justify-between">
        <p className="py-4 px-5 w-2/3">
          need more help in finding your dream course?
        </p>
        <div className="flex justify-between h-1/1 flex-wrap">
          <div className="p-4 mt-20">
            <button className="bg-[#E7ECF3] hover:bg-blue-700 text-[#0C3C82] font-semibold py-4 px-6 rounded-full">
              Talk to expert
              <img
                src={rightArrowSVG}
                alt="right arrow"
                className="h-auto w-4 inline "
              />
            </button>
          </div>
          <div className="relative">
            <img
              src={planeSVG}
              alt="airplane"
              className="h-28 w-auto mr-7 mb-10"
            />
          </div>
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
        <div class="relative">
          <select class="block appearance-none w-full bg-white border border-[#F7EFFF] border-6 rounded focus:outline-none p-4 text-center font-semibold sm-w-full">
            <option>Higher education</option>
            <option>Higher education</option>
            <option>Higher education</option>
            <option>Higher education</option>
            <option>Higher education</option>
            {/* <!-- Add state options here --> */}
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
    <div className="max-w-sm p-4 bg-white border-8 flex flex-col rounded-3xl shadow border-[#E2E7EE] mt-4 h-72 s:w-2/2  lg:w-1/2 justify-between mr-4">
      {/* 1st Div */}
      <div className="px-2 ">
        <h6 className="mb-2 text-l text-[#103564] font-bold tracking-tight text-gray-900 dark:text-white">
          Bachelor in Computer Science
        </h6>
      </div>

      {/* 2nd Div */}
      <div className="flex justify-between px-2">
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
      <div className="flex ">
        <div className="w-3/5 pl-3">
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
        <div className="w-2/5 flex pl-3 m-auto ">
          <img src={logo} alt="logo" className="h-8 w-auto p-1 m-auto" />
          <p className="leading-4 m-auto">Apply with Ingelt Board</p>
        </div>
      </div>

      {/* 4th div */}
      <div>
        <img
          src={universitySVG}
          alt="university logo"
          className="h-auto w-11 ml-2 inline mb-1"
        />
        <p className="pl-4 pr-3 text-[#0C3C82] inline">University Of Chicago</p>
      </div>

      {/* 5th div */}
      <div className="flex justify-between px-2 mu-3">
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
  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
      <div className="w-full h-20 foo:block ">
        <div className="relative rounded-xl pb-14 shadow-lg bg-white ">
          <h1 className="text-3xl font-semibold text-left py-5 px-5 ">
            Shortlisting University
          </h1>
          <p className="text-left py-5 px-5 w-1/2 ">
            Nulla Lorem mollit cupidatat irure. Laborum magna cillum dolor.{" "}
          </p>
          <img
            src={welcomeSVG}
            alt="welcome svg"
            className="absolute bottom-0 right-0 w-50"
          />
        </div>
        <div className="flex flex-wrap ">
          <div className="w-full md:w-1/3">
            <SelectMenue />
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap sm:w-2/2 sm:m-auto">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortlistUniversity;
