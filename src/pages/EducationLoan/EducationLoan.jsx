import React, { useEffect, useContext } from "react";
import { StudentContext } from "../../contexts";
import { useState } from "react";
import welcomeSVG from "../../assets/images/scholar.svg";
import loanSVG from "../../assets/images/loan.svg";
import darkDownSVG from "../../assets/images/darkDown.svg";
import img2 from "../../assets/images/Personal finance-pana.svg";
import { Country, State, City } from "country-state-city";
import query from "../../api/query";
import BankingPart from "../../components/EducationLoan/BankingPart"
import funding from "../../assets/NewDesign/loan icon/funding.svg";
import sanction from "../../assets/NewDesign/loan icon/quick loan.svg";
import endtoend from "../../assets/NewDesign/loan icon/end to end.svg";
import ROI from "../../assets/NewDesign/loan icon/lowest-price.svg";
import preAdmission from "../../assets/NewDesign/loan icon/pre admission loan.svg";
import country from "../../assets/NewDesign/loan icon/country specific.svg";
import preVisa from "../../assets/NewDesign/loan icon/pre visa.svg";
import score from "../../assets/NewDesign/loan icon/score based.svg"
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
import Header from "../../components/shared/Header/Header";

const Page2 = () => {
  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full  sm:m-auto">
      <div className="w-full h-20 foo:block ">
        <div className="flex gap-x-5 max-md:flex-col max-md:gap-y-5">
          <Header title="Education Loan" subTitle="Optimal solution for overseas education loan" Img={welcomeSVG} scale={"scale-75"} />
        </div>
        <div className="flex w-full">
          <div className="w-1/2 flex max-md:hidden">
            <img
              src={img2}
              alt="welcome svg"
              className="w-400 h-auto mx-auto my-10"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <section className="body-font">
              <div className="container px-5 pb-24 pt-10 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full">
                  <div className=" md:pr-10 md:py-6">
                    <div className="flex relative pb-12">
                      {/* creating line */}
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-2 bg-[#E5E9EF] pointer-events-none"></div>
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
                          Experience personalized counselling sessions with our
                          expert advisors who will guide you through every step
                          of your educational journey, helping you make informed
                          decisions for a successful future.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-12">
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
                          Simplify the document collection process with our
                          streamlined services, ensuring all necessary paperwork
                          is organized and submitted accurately, saving you time
                          and effort.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-12">
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
                          Leave the meticulous file preparation to our experts,
                          who will meticulously organize and compile your
                          documents to meet the requirements, ensuring a smooth
                          application process
                        </p>
                      </div>
                    </div>
                    <div className="flex relative pb-12">
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
                          Applied for Loan
                        </h2>
                        <p className="leading-relaxed">
                          With our help, simplify the loan application process
                          as we walk you through the necessary paperwork and
                          assist you in obtaining funding for your educational
                          endeavours.
                        </p>
                      </div>
                    </div>
                    <div className="flex relative">
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
                          Loan Disbursed
                        </h2>
                        <p className="leading-relaxed">
                          Explore a hassle-free loan disbursement process as we
                          ensure timely and seamless transfer of funds,
                          empowering you to pursue your education without
                          financial limitations
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
  const [states, setStates] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cities, setCities] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [income, setIncome] = useState("");
  const [intake, setIntake] = useState("");
  const [openSignUp, setOpenSignUp] = useState(false);
  const [page2, setPage2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    state: "",
    city: "",
    annualIncome: "",
    preferredIntake: "",
    studentId: "",
  });
  const { student } = useContext(StudentContext);
  const { name, phoneNo, id, email } = student;
  useEffect(() => {
    setFormData({
      ...formData,
      name: name,
      phoneNo: phoneNo,
      studentId: id,
      email: email,
    });
    const getStates = async () => {
      const res = await query.getLoanQuery(id);
      console.log(res, "res");
      if (res.data !== null) {
        setPage2(true);
      }
    };
    getStates();
  }, []);
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFoamData = {
        ...formData,
        state: state.name,
        city: city,
        annualIncome: income,
        preferredIntake: intake,
      };
      // console.log(newFoamData, "formdata");
      await query.loanQuery({ ...newFoamData });
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };
  const getAllStates = async () => {
    await setStates(State.getStatesOfCountry("IN"));
    if (stateCode) {
      await setState(State.getStateByCodeAndCountry(stateCode, "IN"));
      await setCities(City.getCitiesOfState("IN", stateCode));
    }
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(!openSignUp);
  };

  useEffect(() => {
    getAllStates();
  }, [stateCode]);

  const icons = [
    {
      img: funding,
      text: "100% Funding",
    },
    {
      img: sanction,
      text: "Quick Loan Sanction",
    },
    {
      img: endtoend,
      text: "Education Loan Assistance",
    },
    {
      img: ROI,
      text: "Lowest Rate of Interest",
    },
    {
      img: preAdmission,
      text: "Pre Admission Loan",
    },
    {
      img: country,
      text: "Country Specific Loan Counselling",
    },
    {
      img: preVisa,
      text: "Pre Visa Disbursal",
    },
    {
      img: score,
      text: "Score Based Loan Structuring",
    }
  ]


  return (
    <div className="flex ">
      {!page2 ? (
        <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full">
          <div className="w-full h-20 foo:block ">
            <div className="flex gap-x-5 max-md:flex-col max-md:gap-y-5 mb-10">
              <Header title="Education Loan" subTitle="Optimal solution for overseas education loan" Img={welcomeSVG} scale="scale-75" />
            </div>
            <div className="flex max-md:flex-col w-full justify-between items-center">
              <div className="w-1/2 max-md:w-full flex flex-col justify-center items-center">
                {/* <img
                  src={loanSVG}
                  alt="welcome svg"
                  className="w-400 h-auto mx-auto my-10"
                /> */}
                <div className="flex mb-10 flex-wrap gap-x-2 2xl:gap-x-2 xl:gap-x-3 gap-y-3 items-center justify-center w-full max-xl:hidden ">
                  {icons.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center justify-start rounded-xl w-56 px-5 py-3">
                        <img src={item.img} className="w-10 h-10 mr-
                                3" alt="icon" />
                        <p className="font-semibold text-sm ml-3">{item.text}</p>
                      </div>
                    )
                  })}
                </div>
                <BankingPart />
              </div>

              <div className="w-2/5 max-md:w-full max-md:pb-10">
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col items-center md:items-start h-full justify-center"
                >
                  {/* <p className="xl:text-3xl text-xl font-bold">text</p> */}
                  <div className="flex flex-col max-lg:items-start w-full justify-center">
                    <div className="inline-block relative mt-5 w-full">
                      <label htmlFor="State">
                        In which state do you reside?
                        <sup className="text-red-500">*</sup>
                      </label>
                      <select
                        id="State"
                        value={stateCode}
                        required={true}
                        onChange={(e) => {
                          setStateCode(e.target.value);
                        }}
                        className="block appearance-none w-full mt-2 bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-xl leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select your State</option>
                        {states &&
                          states.map((state, index) => (
                            <option key={index} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-8 text-gray-700">
                        {/* <ArrowDropDown /> */}
                      </div>
                    </div>
                    <div className="inline-block relative mt-5 w-full">
                      <label htmlFor="State">
                        What's your current city?
                        <sup className="text-red-500">*</sup>
                      </label>
                      <select
                        id="State"
                        value={city}
                        required={true}
                        onChange={(e) => setCity(e.target.value)}
                        className="block appearance-none w-full mt-2 bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-xl leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select your City</option>
                        {cities &&
                          cities.map((city, index) => (
                            <option key={index} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-8 text-gray-700">
                        {/* <ArrowDropDown /> */}
                      </div>
                    </div>
                    <label className="mt-5" htmlFor="income">
                      Write here your Annual Family Income
                      <sup className="text-red-500">*</sup>
                    </label>
                    <input
                      id="income"
                      type="text"
                      required
                      value={income}
                      placeholder="Family Annual Income"
                      className="rounded-xl w-full px-4 py-3 shadow-xl focus:outline-none"
                      onChange={(e) => setIncome(e.target.value)}
                    />
                    <p className="mt-5">
                      What's your preferred intake?
                      <sup className="text-red-500">*</sup>
                    </p>
                    <div className="flex gap-x-5 mt-2">
                      <div
                        className={`py-3 px-6 cursor-pointer flex items-center justify-center max-lg:px-3 max-lg:border rounded-2xl border-2 border-[#001E43] ${intake === "September 2023"
                          ? "bg-[#001E43] text-white"
                          : "border-2 border-[#001E43]"
                          }`}
                        onClick={() => {
                          setIntake("September 2023");
                        }}
                      >
                        <p className="max-xl:text-xs text-base">Sep 2023</p>
                      </div>
                      <div
                        className={`py-3 px-6 cursor-pointer flex items-center justify-center max-lg:px-3 max-lg:border rounded-2xl border-2 border-[#001E43] ${intake === "January 2024"
                          ? "bg-[#001E43] text-white"
                          : "border-2 border-[#001E43]"
                          }`}
                        onClick={() => {
                          setIntake("January 2024");
                        }}
                      >
                        <p className="max-xl:text-xs text-base">Jan 2024</p>
                      </div>
                      <div
                        className={`py-3 px-6 cursor-pointer flex items-center justify-center max-lg:px-3 max-lg:border rounded-2xl border-2 border-[#001E43] ${intake === "May 2024"
                          ? "bg-[#001E43] text-white"
                          : "border-2 border-[#001E43]"
                          }`}
                        onClick={() => {
                          setIntake("May 2024");
                        }}
                      >
                        <p className="max-xl:text-xs text-base">May 2024</p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!stateCode || !city || !income || !intake}
                      className="bg-[#001E43] disabled:bg-gray-400 mt-5 w-full py-2 rounded-lg text-white font-semibold"
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
