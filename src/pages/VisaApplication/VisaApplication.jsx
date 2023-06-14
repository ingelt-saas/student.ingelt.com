import React, { useEffect } from "react";
import { useState } from "react";
import welcomeSVG from "../../assets/images/earth.svg";
import loanSVG from "../../assets/images/visa.svg";
import darkDownSVG from "../../assets/images/darkDown.svg";
import img2 from "../../assets/images/travel.svg";
import img3 from "../../assets/images/aeroplane.svg";

import {
  Box,
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";

import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";

const SelectMenu = ({ options, placeholder, value, handleChange, name }) => {
  return (
    <FormControl fullWidth>
      <Select
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
          },
          fontWeight: 500,
          color: "#001E43",
          textAlign: "left",
          backgroundColor: "white",
          fontSize: "0.9rem",
        }}
        displayEmpty
        value={value || ""}
        onChange={handleChange}
        input={<OutlinedInput />}
        name={name}
        MenuProps={{ sx: { height: "50vh" } }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {Array.isArray(options) &&
          options.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const Page2 = () => {
  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full  sm:m-auto">
      <img src={img3} alt="welcome svg" className="absolute right-32 " />

      <div className="w-full h-20 foo:block ">
        {/* <div className="relative rounded-xl pb-14 shadow-lg bg-white mx-3 ">
          <h1 className="text-3xl font-semibold  text-[#00285A] text-left pb-5 pt-12 px-5 ">
            Visa Application
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
        <div className=" pb-4 ">
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
                Visa Application
              </Typography>
              <Typography
              // sx={{
              //   fontSize: "1.5rem",
              // }}
              >
                Hassel free visa processing and approval
              </Typography>
            </Box>
            <Box sx={{ width: { md: "30%", xs: "100%" } }}>
              <img
                src={welcomeSVG}
                alt="library"
                className="md:relative md:bottom-1  md:left-44 "
              />
            </Box>
          </Box>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 flex max-lg:hidden">
            <img
              src={img2}
              alt="welcome svg"
              className="w-400 h-auto mx-auto my-auto"
            />
          </div>
          <div className="w-1/2">
            <section className=" body-font">
              <div className="container px-5 pb-24 pt-10 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full">
                  <div className=" md:pr-10 md:py-6">
                    <div className="flex relative pb-3">
                      {/* creating line */}
                      <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div class="h-full w-2 bg-[#E5E9EF] pointer-events-none"></div>
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
                          Our experienced visa counselors provide comprehensive
                          guidance tailored to your needs, ensuring a smooth
                          visa application process. Trust our expertise to make
                          your dream of studying abroad a reality.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-3">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-2 bg-[#E5E9EF] pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E9EF] inline-flex items-center justify-center text-white relative z-10">
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
                          Leave the hassle of visa document collection to us.
                          Our dedicated team will assist you in gathering all
                          the necessary documents, ensuring a seamless
                          application process for your study visa.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-3">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-2 bg-[#E5E9EF] pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E9EF] inline-flex items-center justify-center text-white relative z-10">
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
                          Let us take care of your visa file preparation. Our
                          experts will meticulously compile and organize all the
                          required documents, ensuring a smooth and efficient
                          visa application process for your study abroad
                          journey.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-3">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-2 bg-[#E5E9EF] pointer-events-none "></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E9EF] inline-flex items-center justify-center text-white relative z-10">
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
                          File Reviewed
                        </h2>
                        <p className="leading-relaxed">
                          Our team of experienced professionals will review your
                          visa file to ensure accuracy and compliance with all
                          necessary requirements, giving you peace of mind
                          during the application process. Trust us to handle the
                          details and streamline your visa approval.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-3">
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-2 bg-[#E5E9EF] pointer-events-none "></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E9EF] inline-flex items-center justify-center text-white relative z-10">
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
                          Visa Filled
                        </h2>
                        <p className="leading-relaxed">
                          Our team of visa experts will guide you through the
                          process and assist in filling out the visa application
                          with precision and attention to detail, ensuring a
                          smooth and hassle-free experience for your visa
                          submission.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E9EF] inline-flex items-center justify-center text-white relative z-10">
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
                          Visa Approved
                        </h2>
                        <p className="leading-relaxed">
                          Congratulations! Our dedicated team has successfully
                          assisted you in securing visa approval, allowing you
                          to embark on your desired journey with confidence and
                          excitement. Experience seamless travel and explore new
                          opportunities with our visa services
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

const VisaApplication = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  const [data, setData] = useState({
    refusal: "",
    country: "",
    visaType: "",
  });

  const [page, setPage] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   console.log(input1);
  // }, [input1]);

  return (
    <div className="flex">
      {page ? (
        <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
          <div className="w-full h-20 foo:block ">
            {/* <div className="relative rounded-xl pb-14 shadow-lg bg-white mx-3 ">
              <h1 className="text-3xl font-semibold text-[#00285A] text-left pb-5 pt-12 px-5 ">
                Visa Application
              </h1>
              <p className="text-left  px-5 md:w-1/3 ">
                Nulla Lorem mollit cupidatat irure. Laborum magna cillum dolor.{" "}
              </p>
              <img
                src={welcomeSVG}
                alt="welcome svg"
                className="absolute bottom-0 right-3 h-52 w-auto max-md:hidden"
              />
            </div> */}
            <div className=" pb-4 ">
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
                    Visa Application
                  </Typography>
                  <Typography
                  // sx={{
                  //   fontSize: "1.5rem",
                  // }}
                  >
                    Hassel free visa processing and approval
                  </Typography>
                </Box>
                <Box sx={{ width: { md: "30%", xs: "100%" } }}>
                  <img
                    src={welcomeSVG}
                    alt="library"
                    className="relative bottom-1  left-44 "
                  />
                </Box>
              </Box>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 flex max-md:hidden">
                <img
                  src={loanSVG}
                  alt="welcome svg"
                  className="w-400 h-auto mx-auto my-10"
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                <form className="flex flex-col gap-y-5 pt-10 pr-3 mb-10">
                  {/* input1 */}

                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="state" className="font-semibold">
                      Select your Visa type?
                    </label>
                    <div className="shadow-lg rounded-xl overflow-hidden">
                      <SelectMenu
                        name="visaType"
                        placeholder={"Select visa type"}
                        handleChange={handleChange}
                        value={data.visaType}
                        options={["Study Visa"]}
                      >
                        <option value="" disabled>
                          Select Location
                        </option>
                        <option selected>Delhi</option>
                      </SelectMenu>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="state" className="font-semibold">
                      What is your preferred country to study abroad?
                    </label>
                    <div className="shadow-lg rounded-xl overflow-hidden">
                      <SelectMenu
                        placeholder={"Select country"}
                        name={"country"}
                        handleChange={handleChange}
                        value={data.country}
                        options={[
                          "UK",
                          "USA",
                          "New Zealand",
                          "Ireland",
                          "Canada",
                        ]}
                      />
                    </div>
                  </div>

                  {/* input3 */}
                  <div className="inline-block relative ml-1">
                    <p className="mb-2 font-semibold">
                      Is there is any prior visa refusal?
                    </p>
                    <input
                      checked={Boolean(data.refusal === "yes")}
                      onChange={handleChange}
                      type="radio"
                      name="refusal"
                      value="yes"
                      id="yes"
                      className="ml-4"
                    />
                    <label className="cursor-pointer ml-1" htmlFor="yes">
                      Yes
                    </label>

                    <input
                      checked={Boolean(data.refusal === "no")}
                      onChange={handleChange}
                      type="radio"
                      name="refusal"
                      value="no"
                      id="no"
                      className="ml-4"
                    />
                    <label className="cursor-pointer ml-1" htmlFor="no">
                      No
                    </label>
                  </div>

                  {/* submit button */}
                  <div>
                    <button
                      disabled={Boolean(Object.values(data).includes(""))}
                      type="submit"
                      className="bg-[#001E43] disabled:opacity-80 border-2 border-[#001E43] hover:bg-transparent hover:text-[#001E43] w-full text-white font-bold py-3 px-4 rounded-xl duration-300"
                      onClick={(e) => {
                        setPage(false);
                      }}
                    >
                      Continue
                    </button>
                    <p className="text-center text-black mt-3 text-sm">
                      By continuing, you agree to our{" "}
                      <span className="font-medium text-[#001E43] cursor-pointer">
                        Term of services
                      </span>{" "}
                      &{" "}
                      <span className="font-medium text-[#001E43] cursor-pointer">
                        Privacy policy
                      </span>
                    </p>
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

export default VisaApplication;
