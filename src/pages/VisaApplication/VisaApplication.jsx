import React, { useEffect, useContext } from "react";
import { StudentContext } from "../../contexts";
import { useState } from "react";
import welcomeSVG from "../../assets/images/earth.svg";
import loanSVG from "../../assets/images/visa.svg";
import darkDownSVG from "../../assets/images/darkDown.svg";
import img2 from "../../assets/images/travel.svg";
import img3 from "../../assets/images/aeroplane.svg";
// import { Country, State, City } from "country-state-city";
import query from "../../api/query";
import Countries from "../../components/VisaApplication/Countries";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import pay4999Img from '../../assets/paymentQR/4999.png'
import immigrationImg from '../../assets/images/immigration.png';
import visaApplicationImg from '../../assets/images/visa-application.png';
import visaExperienceImg from '../../assets/images/visa-experience.png';


import {
  Box,
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";

import { FormControl, MenuItem, OutlinedInput, Select, Modal } from "@mui/material";
import Header from "../../components/shared/Header/Header";

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

const Page2 = ({ data }) => {

  const status = () => {
    switch (data?.status) {
      case 'open':
        return 0;
      case 'docCollection':
        return 1;
      case 'filePreparation':
        return 2;
      case 'fileReview':
        return 3;
      case 'visaFilled':
        return 4;
      case 'approved':
        return 5;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full sm:m-auto z-10">
      <img src={img3} alt="welcome svg" className="absolute right-32 -z-10" />
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
        <div className="flex gap-x-5 max-md:flex-col max-md:gap-y-5">
          <Header
            title="Visa Application"
            subTitle="Hassle free visa processing and approval"
            Img={welcomeSVG}
            scale="scale-75"
          />
        </div>
        <div className="flex w-full mt-10">
          <div className="w-1/2 flex flex-col max-lg:hidden">
            {/* <img
              src={img2}
              alt="welcome svg"
              className="w-400 h-auto mx-auto my-auto"
            /> */}
            <Countries />
            {/* <p className="text-3xl text-center font-semibold text-[#00285A] mt-10 max-md:text-xl max-lg:text-xl">
              "InGelt Board is a group of 15+ Registered Immigration Consultant"
            </p> */}
            <ul className="list-disc list-inside mt-5 text-xl gap-y-2 flex flex-col text-gray max-md:text-lg text-center">
              <li>
                Largest group of Registered Immigration Consultants in India{" "}
              </li>
              <li>Over 90% visa approved rate</li>
              <li>1200+ applications processed </li>
            </ul>
          </div>

          <div className="w-2/5 max-md:w-full ">
            <section className=" body-font">
              <div className="container px-5 pb-24 pt-10 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full">
                  <div className=" md:pr-10 md:py-6">
                    <div className="flex relative pb-3">

                      {/* creating line */}
                      <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div class={`h-full w-2 ${status() > 0 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'} pointer-events-none`}></div>
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
                        <h2 className="font-extrabold title-font text-[#00285A] mb-1 tracking-wider">
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
                        <div class={`h-full w-2 ${status() > 1 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'} pointer-events-none`}></div>
                      </div>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${status() >= 1 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'}   inline-flex items-center justify-center text-white relative z-10`}>
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
                        <div class={`h-full w-2 ${status() > 2 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'} pointer-events-none`}></div>
                      </div>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${status() >= 2 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'}   inline-flex items-center justify-center text-white relative z-10`}>
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
                        <div class={`h-full w-2 ${status() > 3 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'} pointer-events-none`}></div>
                      </div>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${status() >= 3 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'}   inline-flex items-center justify-center text-white relative z-10`}>
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
                        <div class={`h-full w-2 ${status() > 4 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'} pointer-events-none`}></div>
                      </div>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${status() >= 4 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'}   inline-flex items-center justify-center text-white relative z-10`}>
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
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${status() >= 5 ? 'bg-[#00285A]' : 'bg-[#E5E9EF]'}   inline-flex items-center justify-center text-white relative z-10`}>
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

  const [visa, setVisa] = useState(null);
  const [country, setCountry] = useState();
  const [refusal, setRefusal] = useState();
  const [page2, setPage2] = useState(false);
  const [openPaymentQr, setOpenPaymentQr] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNo: "",
    visaType: "",
    interestedCountry: "",
    previousRefusal: "",
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
      const res = await query.getvisaQuery(id);
      if (res.data !== null) {
        setPage2(true);
        setVisa(res.data);
      }
    };
    getStates();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      visaType: visa,
      interestedCountry: country,
      previousRefusal: refusal,
    };
    try {
      // console.log(newFormData);
      await query.visaQuery(newFormData);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-10">

      {/* page header start */}
      <div className="flex-col flex sm:flex-row gap-5">
        <div className="w-full md:w-[70%]">
          <Header
            title="Visa Application"
            subTitle="Hassel free visa processing and approval"
            Img={welcomeSVG}
            width="full"
          />
        </div>

        <div className="w-full md:w-[30%]">
          <div style={{ boxShadow: ' 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 36px 0px rgba(0, 0, 0, 0.16)' }} className="bg-white h-full w-full px-5 py-3 rounded-2xl flex justify-between flex-col ">
            <p className="text-[#00285A] font-semibold text-base md:text-sm lg:text-base">Schedule call with Registered Immegration Consultants</p>
            <br />
            <button onClick={() => setOpenPaymentQr(true)} className="hover:bg-[#00285A] hover:text-white text-lg bg-transparent duration-300 border-2 border-[#00285A] text-[#00285A] py-1 max-md:text-base px-3 min-w-[160px] w-5/12 rounded-2xl justify-around flex items-center">
              <p className='font-semibold flex items-center justify-around text-base'>
                <strong className='text-sm md:text-base'>50.00 USD </strong>
                &nbsp; &nbsp;
                <span className="w-6 h-6 border-1 rounded-full flex justify-center items-center bg-[#00285A] text-white"><ChevronRightIcon /></span>
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* page header end */}

      <div className="flex max-md:flex-col gap-5">
        <div className="flex flex-col gap-10 md:w-1/2 md:px-10">
          <div className="w-full">
            <Countries />
          </div>
          {/* if apply visa application */}
          {page2 && <div>
            <h1 className="text-2xl text-center font-bold text-[#001E43]">It looks like your chances of getting a visa approval are high*</h1>
            <p className="text-center text-[#00000099] mt-2">Our visa expert will connect with you shortly</p>
          </div>}
          {!page2 && <h1 className="text-2xl text-center font-bold text-[#001E43]">InGelt Board is a group of Registered Immigration Consultants.</h1>}

          <div className="flex flex-col gap-5 md:px-5">
            <div className="p-2 shadow-xl rounded-lg bg-white flex items-center gap-5">
              <div className="aspect-square w-14 overflow-hidden rounded-md bg-[#D0E2E7] p-1">
                <img src={immigrationImg} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="font-medium">Dedicated Visa Filling Manager</p>
            </div>
            <div className="p-2 shadow-xl rounded-lg bg-white flex items-center gap-5">
              <div className="aspect-square w-14 overflow-hidden rounded-md bg-[#DEB78E] p-1">
                <img src={visaApplicationImg} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="font-medium">99% Visa Approval Rate</p>
            </div>
            <div className="p-2 shadow-xl rounded-lg bg-white flex items-center gap-5">
              <div className="aspect-square w-14 overflow-hidden rounded-md bg-[#E7EBF5] p-1">
                <img src={visaExperienceImg} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="font-medium">Expertise in Refusal Cases</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center md:items-start h-full justify-center pb-10"
          >
            <div className="flex flex-col max-lg:items-start w-full justify-center">
              <div className="inline-block relative mt-5 w-full">
                <label htmlFor="State">
                  What type of visa do you want to apply for?
                </label>
                <select
                  id="State"
                  value={visa}
                  required={true}
                  onChange={(e) => {
                    setVisa(e.target.value);
                  }}
                  className="block appearance-none w-full mt-2 bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-xl leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" selected disabled>
                    Type of Visa
                  </option>
                  <option value="Study Visa">Study Visa</option>
                  <option value="Visitor Visa">Visitor Visa</option>
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Open Work Permit">Open Work Permit</option>
                  <option value="Permanent Residence">Permanent Residence</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-8 text-gray-700">
                  {/* <ArrowDropDown /> */}
                </div>
              </div>
              <div className="inline-block relative mt-5 w-full">
                <label htmlFor="State">
                  In which country you want to apply visa for?
                </label>
                <select
                  id="State"
                  value={country}
                  required={true}
                  onChange={(e) => setCountry(e.target.value)}
                  className="block appearance-none w-full mt-2 bg-white border-none hover:border-gray-500 px-4 py-4 pr-8 rounded-xl shadow-xl leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" selected disabled>
                    Select your city
                  </option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="USA">United States of America</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Ireland">Ireland</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-8 text-gray-700">
                  {/* <ArrowDropDown /> */}
                </div>
              </div>
              <div className="inline-block relative mt-5 ml-2">
                <p className="mb-2">Previous Refusal</p>
                <input
                  type="radio"
                  name="radio"
                  className="hover:cursor-pointer"
                  value={true}
                  onChange={(e) => setRefusal(e.target.value)}
                />
                <label className="ml-1" htmlFor="Yes">
                  Yes
                </label>

                <input
                  type="radio"
                  name="radio"
                  className="ml-4 hover:cursor-pointer"
                  value={false}
                  onChange={(e) => setRefusal(e.target.value)}
                />
                <label className="ml-1" htmlFor="No">
                  No
                </label>
              </div>
              <button
                type="submit"
                disabled={!visa || !country || !refusal}
                className="bg-[#001E43] disabled:bg-gray-400 mt-5 w-full py-2 rounded-lg text-white font-semibold"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* qr code modal */}

      <Modal
        open={openPaymentQr}
        onClose={() => setOpenPaymentQr(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          borderRadius: 6,
          boxShadow: 24,
          p: 4,
        }}>
          <img src={pay4999Img} alt="payment qr" />
        </Box>
      </Modal>

    </div>
  );
};

export default VisaApplication;
