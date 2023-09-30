import React, { useEffect, useContext } from "react";
import { StudentContext } from "../../contexts";
import { useState } from "react";
import welcomeSVG from "../../assets/images/scholar.svg";
// import { Country, State, City } from "country-state-city";
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
import landingImg from '../../assets/images/landing-pages/education-load.svg';
import { Button } from "@mui/material";
import settings from "../../api/settings";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoanPageTwo from "../../components/EducationLoan/LoanPageTwo";
import { Link } from "react-router-dom";
import img from '../../assets/images/education-page-two.png';
import loanImg from '../../assets/images/loan.png';
import interestImg from '../../assets/images/interest-rate.png';
import clockImg from '../../assets/images/fast-time.png';

const LandingPage = () => {

  const images = () => {
    let importImages = require.context('../../assets/images/landing-pages/bank', false, /\.(png|jpe?g|svg)$/);
    return importImages.keys().map(importImages);
  }

  // enter click handler
  const unlockEducation = async (e) => {
    e.target.disabled = true;
    try {
      await settings.update({ educationLoanUnlock: true });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      e.target.disabled = false;
    }
  }

  return <div className="w-full min-h-full max-md:px-3 py-10 bg-[#001E43] grid place-items-center">
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-3xl max-sm:text-xl text-center text-white font-semibold">Apply for Education Loan</h1>
        <p className="text-base text-center text-white">15+ Banking Partner</p>
      </div>

      <div className="bg-white rounded-2xl py-5 px-2 flex flex-wrap gap-4 md:max-w-[700px] justify-center">
        {images().map((item, index) => <div key={index} className="w-20 sm:w-24 flex justify-center">
          <img src={item} alt={item} className="" />
        </div>)}
      </div>

      <div className="px-2">
        <img src={landingImg} alt='' className="" />
      </div>

      <div className=' flex flex-col items-center gap-y-4'>
        <p className='text-center text-white'>Enter to apply for study abroad Education Loan</p>
        <Button
          onClick={unlockEducation}
          variant="contained"
          sx={{
            color: '#001E43',
            textTransform: 'capitalize',
            fontWeight: '600',
            backgroundColor: '#fff',
            padding: '0.5rem 2rem',
            '&:hover': {
              backgroundColor: '#f2f2f2',
            }
          }}
        >
          Enter
        </Button>
      </div>
    </div>
  </div>;
}

const EducationLoan = () => {

  const [states, setStates] = useState("");
  const [stateCode, setStateCode] = useState("DL");
  const [cities, setCities] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("New Delhi");
  const [income, setIncome] = useState("10 Lakhs");
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
      // console.log(res, "res");
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

  //TODO REMOVE THIS STATE FETCHING.
  const getAllStates = async () => {
    // console.log(State.getStatesOfCountry("IN"));

    await setStates((await query.getAllState()).data);
    if (stateCode) {
      // await setStates(query.getAllState());
      await setState((await query.getAllState()).data);
      await setCities((await query.getCityFromState(stateCode)).data);
    }
  };
  // console.log(cities);
  // useEffect(()=>{
  //   getAllStates();
  //   console.log('all data',state);
  // })


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
    // {
    //   img: preVisa,
    //   text: "Pre Visa Disbursal",
    // },
    // {
    //   img: score,
    //   text: "Score Based Loan Structuring",
    // }
  ]

  return (
    <>
      {!student?.educationLoanUnlock && <LandingPage />}
      {student?.educationLoanUnlock && <div className="sm:py-6 p-2 sm:px-5">

        {/* header start */}
        <div className="flex-col flex sm:flex-row gap-5">
          <div className="w-full sm:w-[70%] rounded-[1.2rem] flex justify-between relative items-center bg-white shadow-xl">
            <div className="px-7 flex flex-col gap-y-1 max-md:py-7 max-sm:px-5 max-md:items-center max-md:w-full">

              <h1 className="text-2xl font-bold text-[#0C3C82]">Education Loan</h1>
              <p className="font-normal text-black opacity-75">Optimal solution for overseas education loan</p>
            </div>
            <div className="overflow-hidden pr-3 max-w-[30%] max-md:hidden">
              <img
                draggable={false}
                src={welcomeSVG}
                alt="library"
                className={`max-h-28 max-w-fit mix-blend-darken`}
              />
            </div>
          </div>

          <div className="w-full sm:w-[30%]">
            <div className="rounded-2xl bg-white shadow-2xl px-5 py-5">
              <h3 className="text-xl my-1 font-semibold text-[#0C3C82]">
                Are you looking for end to end education loan assistance?
              </h3>
              <br />
              <Link to="//wa.me/+919205762929" className="hover:bg-[#00285A] hover:text-white text-lg bg-transparent duration-300 border-2 border-[#00285A] text-[#00285A] py-1 max-md:text-base px-3 md:min-w-[180px] min-w-[150px] md:w-7/12 rounded-2xl justify-around flex items-center">
                <p className='text-lg font-semibold flex items-center justify-around'>
                  <strong className='text-sm md:text-base'> Talk to expert  </strong>
                  &nbsp; &nbsp;
                  <span className="w-6 h-6 border-1 rounded-full flex justify-center items-center bg-[#00285A] text-white"><ChevronRightIcon /></span>
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* header end */}

        {!page2 ? (
          <div className="flex max-md:flex-col gap-5 max-md:gap-10 w-full mt-10">
            <div className="w-3/5 max-md:w-full flex flex-col justify-center items-center">

              <div className='flex flex-col items-center gap-10 w-full'>
                <div className='mx-auto w-[200px]'>
                  <img src={img} alt='' className='w-full h-auto' />
                </div>

                <div className='grid max-sm:grid-cols-1 w-full grid-cols-3 gap-3'>
                  <div className='flex flex-col justify-between gap-1 bg-white max-sm:py-7 p-3 rounded-2xl shadow-lg'>
                    <img src={loanImg} alt="" className='w-auto h-auto mx-auto' />
                    <div className='flex flex-col gap-1 items-center'>
                      <p className='text-normal text-sm max-sm:text-base text-center'>Loan amount upto </p>
                      <h2 className='text-xl max-sm:text-2xl font-bold text-center'>$ 1.5 Crore</h2>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between gap-1 bg-white max-sm:py-7 p-3 rounded-2xl shadow-lg'>
                    <img src={interestImg} alt="" className='w-auto h-auto mx-auto' />
                    <div className='flex flex-col gap-1 items-center'>
                      <p className='text-normal text-sm max-sm:text-base text-center'>Interest rate starting</p>
                      <h2 className='text-xl max-sm:text-2xl font-bold text-center'>9%</h2>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between gap-1 bg-white max-sm:py-7 p-3 rounded-2xl shadow-lg'>
                    <img src={clockImg} alt="" className='w-auto h-auto mx-auto' />
                    <div className='flex flex-col gap-1 items-center'>
                      <p className='text-normal text-sm max-sm:text-base text-center'>Minimum processing time</p>
                      <h2 className='text-xl max-sm:text-2xl font-bold text-center'>7 Days</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid my-8 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {icons.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center justify-start rounded-xl px-2 py-2">
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
                className="flex flex-col items-center md:items-start justify-center"
              >
                {/* <p className="xl:text-3xl text-xl font-bold">text</p> */}
                <div className="flex flex-col max-lg:items-start w-full justify-center">
                  <div className="inline-block relative mt-5 w-full">
                    <label htmlFor="State">
                      Select your state
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
                      {/* <option value="DL">Delhi</option> */}
                      {states &&
                        states.map((state, index) => (

                          <option key={index} value={state.isoCode} selected defaultChecked>
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
                      Select your city
                      <sup className="text-red-500">*</sup>
                    </label>
                    <select
                      id="State"
                      value={city}
                      required={true}
                      onChange={(e) => setCity(e.target.value)}
                      className="block appearance-none w-full mt-2 bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-xl leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {/* <option value="">Select your City</option> */}
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
                    Family Annual Income
                    <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    id="income"
                    type="text"
                    required
                    value={income}
                    placeholder="10 Lakhs"
                    className="rounded-xl w-full px-4 py-3 shadow-xl focus:outline-none"
                    onChange={(e) => setIncome(e.target.value)}
                  />
                  <p className="mt-5">
                    What's your preferred intake?
                    <sup className="text-red-500">*</sup>
                  </p>
                  <div className="flex gap-x-5 mt-2">

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
                    <div
                      className={`py-3 px-6 cursor-pointer flex items-center justify-center max-lg:px-3 max-lg:border rounded-2xl border-2 border-[#001E43] ${intake === "September 2024"
                        ? "bg-[#001E43] text-white"
                        : "border-2 border-[#001E43]"
                        }`}
                      onClick={() => {
                        setIntake("September 2024");
                      }}
                    >
                      <p className="max-xl:text-xs text-base">Sep 2024</p>
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
        ) : <LoanPageTwo />}
      </div>}
    </>
  );
};

export default EducationLoan;
