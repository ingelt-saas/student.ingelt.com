import React, { useEffect } from "react";
import { useState } from "react";
import welcomeSVG from "../../assets/images/scholar.svg";
import loanSVG from "../../assets/images/loan.svg";
import darkDownSVG from "../../assets/images/darkDown.svg";
import img2 from "../../assets/images/Personal finance-pana.svg";

const Page2 = () => {
  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full  sm:m-auto">
      <div className="w-full h-20 foo:block ">
        <div className="relative rounded-xl pb-14 shadow-lg bg-white mx-3 ">
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
            <section className=" body-font">
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
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [page, setPage] = useState(true);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // useEffect(() => {
  //   console.log(input1);
  // }, [input1]);

  return (
    <div className="flex ">
      {page ? (
        <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
          <div className="w-full h-20 foo:block ">
            <div className="relative rounded-xl pb-14 shadow-lg bg-white mx-3 ">
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
                <form className="flex flex-col gap-y-5 pt-5 pr-3 mb-10">
                  {/* input1 */}
                  <div className="inline-block relative">
                    <label htmlFor="State">Where do you want to study?</label>
                    <select
                      id="State"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      className="block appearance-none w-full bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-2xl leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option disabled selected value="">
                        Select Your State
                      </option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-5 text-gray-700">
                      <img src={darkDownSVG} alt="downarrow" className="" />
                    </div>
                  </div>

                  {/* input2 */}
                  <div className="inline-block relative">
                    <label htmlFor="Zone">Where do you live?</label>
                    <select
                      id="Zone"
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      className="block appearance-none w-full bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-2xl leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option disabled selected value="">
                        Select Your District / Zone
                      </option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-5 text-gray-700">
                      <img src={darkDownSVG} alt="downarrow" className="" />
                    </div>
                  </div>
                  {/* input3 */}
                  <div className="inline-block relative">
                    <label htmlFor="State">
                      What is your family annual income?
                    </label>
                    <select
                      id="State"
                      value={input3}
                      onChange={(e) => setInput3(e.target.value)}
                      className="block appearance-none w-full bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-2xl leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option disabled selected value="">
                        Family Annual Income
                      </option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-5 text-gray-700">
                      <img src={darkDownSVG} alt="downarrow" className="" />
                    </div>
                  </div>
                  {/* input4 */}
                  <div className="inline-block relative">
                    <label className="block">
                      What’s your preferred intake?
                    </label>

                    <ul className="grid w-full gap-6 md:grid-cols-3 mt-2">
                      <li>
                        <input
                          type="radio"
                          id="date1"
                          name="dates"
                          value="Sep 2023"
                          className="sr-only"
                          required
                          onChange={() => handleDateChange("Sep 2023")}
                        />
                        <label
                          htmlFor="date1"
                          className={`radio-label inline-flex items-center justify-between w-full p-4 text-[#001E43]  rounded-lg cursor-pointer ${
                            selectedDate === "Sep 2023"
                              ? "bg-[#001E43] text-white"
                              : "hover:text-white hover:bg-[#001E43]"
                          }`}
                        >
                          <div className="block">
                            <p className="w-full text-lg font-semibold">
                              Sep 2023
                            </p>
                          </div>
                        </label>
                      </li>

                      <li>
                        <input
                          type="radio"
                          id="date2"
                          name="dates"
                          value="Jan 2024"
                          className="sr-only"
                          required
                          onChange={() => handleDateChange("Jan 2024")}
                        />
                        <label
                          htmlFor="date2"
                          className={`radio-label inline-flex items-center justify-between w-full p-4 text-[#001E43]  rounded-lg cursor-pointer dark:text-gray-300 dark:bg-gray-800 dark:hover:text-gray-300 ${
                            selectedDate === "Jan 2024"
                              ? "bg-[#001E43] text-white"
                              : "hover:text-white hover:bg-[#001E43]"
                          }`}
                        >
                          <div className="block">
                            <p className="w-full text-lg font-semibold">
                              Jan 2024
                            </p>
                          </div>
                        </label>
                      </li>

                      <li>
                        <input
                          type="radio"
                          id="date3"
                          name="dates"
                          value="Feb 2024"
                          className="sr-only"
                          required
                          onChange={() => handleDateChange("Feb 2024")}
                        />
                        <label
                          htmlFor="date3"
                          className={`radio-label inline-flex items-center justify-between w-full p-4 text-[#001E43] rounded-lg cursor-pointer dark:text-gray-300 dark:bg-gray-800 dark:hover:text-gray-300 ${
                            selectedDate === "Feb 2024"
                              ? "bg-[#001E43] text-white"
                              : "hover:text-white hover:bg-[#001E43]"
                          }`}
                        >
                          <div className="block">
                            <p className="w-full text-lg font-semibold">
                              Feb 2024
                            </p>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>

                  {/* submit button */}
                  <div>
                    <button
                      type="submit"
                      className="bg-[#001E43]  w-full text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl"
                      onClick={(e) => {
                        setPage(false);
                      }}
                    >
                      Continue
                    </button>
                  </div>
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
