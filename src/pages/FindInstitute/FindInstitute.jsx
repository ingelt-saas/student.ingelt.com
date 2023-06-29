import React, { useContext, useEffect, useState } from "react";

//assets
import findImg from "../../assets/images/find-institute.png";
import { Favorite, FilterAlt, Search } from "@mui/icons-material";
import InstituteItem from "../../components/FindInstitute/InstituteItem";
import instituteApi from "../../api/institute";
import { StudentContext } from "../../contexts";
import { Country, State } from "country-state-city";
import { Alert, Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Header from "../../components/shared/Header/Header";
import { useQuery } from "@tanstack/react-query";

const FindInstitute = () => {
  //states
  // const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({
    mode: [],
    search: "",
    location: "",
  });
  const [nearMe, setNearMe] = useState(false);
  const [states, setStates] = useState();
  const [appliedInstitutes, setAppliedInstitutes] = useState([]);
  const [embedLink, setEmbedLink] = useState(null);

  // context
  const { student } = useContext(StudentContext);

  const fetchAppliedInstitutes = async () => {
    try {
      const res = await instituteApi.getAppliedInstitutes();
      setAppliedInstitutes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // fetch institutes 
  const { data: institutes = [], isLoading } = useQuery({
    queryKey: ['institutes', searchQuery],
    queryFn: async () => {
      const res = await instituteApi.getInstitutes(
        searchQuery.mode.join(","),
        searchQuery.location,
        searchQuery.search
      );
      return res.data;
    }
  });

  // class mode handler
  const modeHandler = (e) => {
    if (e.target.checked) {
      setSearchQuery({
        ...searchQuery,
        mode: [...searchQuery.mode, e.target.value],
      });
    } else {
      const newModesArr = searchQuery.mode.filter((i) => i !== e.target.value);
      setSearchQuery({ ...searchQuery, mode: newModesArr });
    }
  };

  // search input handler
  const inputHandler = (e) => {
    e.preventDefault();
    setSearchQuery({ ...searchQuery, search: e.target.search.value });
  };

  // set near me location
  useEffect(() => {
    if (nearMe) {
      setSearchQuery({ ...searchQuery, location: student?.state });
    } else {
      setSearchQuery({ ...searchQuery, location: "" });
    }
  }, [nearMe, student]);

  // control input placeholder
  useEffect(() => {
    const input = document.getElementById("search");
    const label = document.getElementById("searchLabel");

    input.onkeyup = (e) => {
      if (e.target.value) {
        label.classList.add("!opacity-0");
      } else {
        label.classList.remove("!opacity-0");
      }
    };
  }, []);

  // fetch cities
  useEffect(() => {
    const getAllStates = async () => {
      await setStates(State.getStatesOfCountry("IN"));
    };
    getAllStates();
  }, []);

  // apply handler
  const applyHandler = async (e, org) => {
    e.target.disabled = true;
    try {
      await instituteApi.applyInstitute({ organizationId: org.id });
      toast.success(`You have successfully applied to the ${org.name} institute, Our team will contact you within 12hrs.`);
      fetchAppliedInstitutes();
    } catch (err) {
      toast.error("Sorry! Something went wrong");
    } finally {
      e.target.disabled = false;
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
      <div className="w-full h-20 foo:block ">
        <div className="flex gap-x-5 max-md:flex-col max-md:gap-y-5">
          <Header title="Find Institutes" subTitle="Choose in-demand course as per your interest" Img={findImg} scale="scale-75" />
          <div className="">
            <div style={{ boxShadow: ' 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 36px 0px rgba(0, 0, 0, 0.16)' }} className="bg-white h-full w-full px-5 pt-3 pb-2 rounded-2xl flex justify-center flex-col items-center">
              <form
                onSubmit={inputHandler}
                className="flex items-center flex-row max-md:w-full md:w-[400px] bg-[#0C3C821A] rounded-xl py-1 px-2 "
              >
                <div className="flex-1 relative z-0 w-full">
                  <input
                    className="h-full z-20 bg-transparent w-full pl-3 border-0 focus:outline-none"
                    type="search"
                    name="search"
                    id="search"
                  />
                  <label
                    htmlFor="search"
                    id="searchLabel"
                    className="absolute opacity-50 duration-200 -z-10 top-1/2 left-3 w-full h-auto -translate-y-1/2 flex gap-x-2 items-center"
                  >
                    <div className=" flex-1 flex gap-x-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0,0,256,256"
                        className="w-5 xs:w-5 h-5 xs:h-5"
                      >
                        <g
                          fill="#00285a"
                          fillRule="nonzero"
                          stroke="none"
                          strokeWidth="1"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          strokeMiterlimit="10"
                          strokeDasharray=""
                          strokeDashoffset="0"
                          fontFamily="none"
                          fontWeight="none"
                          fontSize="none"
                          textAnchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <g transform="scale(10.66667,10.66667)">
                            <path d="M20,8l-3,0.002v-3.384c0,-0.764 -0.424,-1.449 -1.105,-1.789l-3.895,-1.947l-3.894,1.947c-0.682,0.34 -1.106,1.025 -1.106,1.789v3.382h-3c-1.103,0 -2,0.897 -2,2v10c0,1.103 0.897,2 2,2h16c1.103,0 2,-0.897 2,-2v-10c0,-1.103 -0.897,-2 -2,-2zM7,16c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1zM6,13c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1zM12,8c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1zM13,13c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1zM11,17c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1v3h-2zM17,14c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1zM18,17c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1z"></path>
                          </g>
                        </g>
                      </svg>
                      <span className="text-lg xs:text-sm text-[#00285A]">
                        IELTS Institute
                      </span>
                    </div>
                  </label>
                </div>
                <button className="flex items-center px-2 sm:px-6 sm:gap-x-2 bg-[#0C3C82] text-white text-sm sm:text-base font-medium py-2 rounded-lg">
                  <Search fontSize="small" />
                  Search
                </button>
              </form>
              <div className="justify-between max-md:w-full md:w-[400px] flex items-start mt-3">
                <div className="flex flex-col gap-y-1 items-start md:w-[40%]">
                  <h5 className="text-lg text-[#00285A] font-medium">Location</h5>
                  <div className="rounded-lg px-2 border border-[#0C3C82]">
                    <select
                      onChange={(e) => {
                        setNearMe(false);
                        setSearchQuery({
                          ...searchQuery,
                          location: e.target.value,
                        });
                      }}
                      className="text-left w-full cursor-pointer text-[#0C3C82] py-2 border-0 bg-transparent font-medium outline-none"
                    >
                      <option value="" disabled selected>
                        Select Location
                      </option>
                      {states &&
                        states.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                    </select>
                  </div>

                </div>
                <div className="flex flex-col gap-y-1 items-start ml-5">
                  <h5 className="text-lg text-[#00285A] font-medium">
                    Mode Available
                  </h5>
                  <div className="flex max-md:flex-col max-md:gap-y-1 gap-x-2">
                    <label
                      htmlFor="online"
                      className="flex items-center w-fit gap-x-1 cursor-pointer"
                    >
                      <input
                        onChange={modeHandler}
                        checked={Boolean(searchQuery.mode.includes("online"))}
                        value="online"
                        type="checkbox"
                        id="online"
                        name="classMode"
                        className="accent-[#0C3C82]"
                      />
                      Online
                    </label>
                    <label
                      htmlFor="offline"
                      className="flex items-center w-fit gap-x-1 cursor-pointer"
                    >
                      <input
                        onChange={modeHandler}
                        checked={Boolean(searchQuery.mode.includes("offline"))}
                        value="offline"
                        type="checkbox"
                        id="offline"
                        name="classMode"
                        className="accent-[#0C3C82]"
                      />
                      Offline
                    </label>
                    <label
                      htmlFor="hybrid"
                      className="flex items-center w-fit gap-x-1 cursor-pointer"
                    >
                      <input
                        onChange={modeHandler}
                        checked={Boolean(searchQuery.mode.includes("hybrid"))}
                        value="hybrid"
                        type="checkbox"
                        Resourceid="hybrid"
                        name="classMode"
                        className="accent-[#0C3C82]"
                      />
                      Hybrid
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-28 max-md:mt-72 w-full">
        <div className="flex justify-around gap-x-5 w-full max-md:mt-3">
          <div className="w-full lg:w-7/12 flex-col flex gap-y-3">
            {!isLoading && (Array.isArray(institutes) && institutes.length > 0 ?
              <div className="flex flex-col gap-y-3">
                {institutes.map((institute, index) =>
                  <InstituteItem
                    key={index}
                    applyHandler={applyHandler}
                    appliedInstitutes={appliedInstitutes}
                    institute={institute}
                    setEmbedLink={setEmbedLink}
                  />
                )}
              </div>
              :
              <div className="flex w-full justify-center">
                <Alert icon={false} severity="warning" className="w-fit mx-auto">
                  No Institute Found
                </Alert>
              </div>
            )}
          </div>
          <div className="max-lg:hidden w-5/12">
            <div className="h-[90vh] rounded-lg overflow-hidden">
              <iframe
                title="Google Maps"
                src={embedLink || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.589204268871!2d77.3342776!3d28.642071599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb3c72b68a2b%3A0x8c7e7d2ded0363b4!2sInGelt!5e0!3m2!1sen!2sbd!4v1688039609037!5m2!1sen!2sbd`}
                width="100%"
                height="100%"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-between items-center px-3 rounded-xl shadow-xl bg-white">
        <div className="w-full md:w-fit py-3 md:ml-5">
        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                lineHeight: '1.7rem',
                                marginBottom: '0.5rem'
                            }}>Find Institutes</Typography>
          <form
            onSubmit={inputHandler}
            className="mt-3 flex items-center flex-row max-md:w-full md:w-[400px] bg-[#0C3C821A] rounded-md py-2 px-2 "
          >
            <div className="flex-1 relative z-0 w-full">
              <input
                className="h-full z-20 bg-transparent w-full pl-3 border-0 focus:outline-none"
                type="search"
                name="search"
                id="search"
              />
              <label
                htmlFor="search"
                id="searchLabel"
                className="absolute opacity-50 duration-200 -z-10 top-1/2 left-3 w-full h-auto -translate-y-1/2 flex gap-x-2 items-center"
              >
                <div className=" flex-1 flex gap-x-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0,0,256,256"
                    className="w-5 xs:w-5 h-5 xs:h-5"
                  >
                    <g
                      fill="#00285a"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(10.66667,10.66667)">
                        <path d="M20,8l-3,0.002v-3.384c0,-0.764 -0.424,-1.449 -1.105,-1.789l-3.895,-1.947l-3.894,1.947c-0.682,0.34 -1.106,1.025 -1.106,1.789v3.382h-3c-1.103,0 -2,0.897 -2,2v10c0,1.103 0.897,2 2,2h16c1.103,0 2,-0.897 2,-2v-10c0,-1.103 -0.897,-2 -2,-2zM7,16c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1zM6,13c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1zM12,8c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1zM13,13c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1zM11,17c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1v3h-2zM17,14c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1zM18,17c0,0.55 -0.45,1 -1,1c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="text-lg xs:text-sm text-[#00285A]">
                    IELTS Institute
                  </span>
                </div>
              </label>
            </div>
            <button className="flex items-center px-2 sm:px-6 sm:gap-x-2 bg-[#0C3C82] text-white text-sm sm:text-base font-medium py-2 rounded-lg">
              <Search fontSize="small" />
              Search
            </button>
          </form>
          <div className="w-full justify-start flex items-start mt-3">
            <div className="flex flex-col gap-y-2 items-start md:w-[40%]">
              <h5 className="text-xl text-[#00285A] font-medium">Location</h5>
              <div className="rounded-lg px-2 border border-[#0C3C82]">
                <select
                  onChange={(e) => {
                    setNearMe(false);
                    setSearchQuery({
                      ...searchQuery,
                      location: e.target.value,
                    });
                  }}
                  className="text-left w-full cursor-pointer text-[#0C3C82] py-2 border-0 bg-transparent font-medium outline-none"
                >
                  <option value="" disabled selected>
                    Select Location
                    </option>
                    {states &&
                          states.map((state, index) => (
                            <option key={index} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                </select>
              </div>
              
            </div>
            <div className="flex flex-col gap-y-2 items-start ml-5">
              <h5 className="text-xl text-[#00285A] font-medium">
                Mode Available
              </h5>
              <label
                htmlFor="online"
                className="flex items-center w-fit gap-x-2 cursor-pointer"
              >
                <input
                  onChange={modeHandler}
                  checked={Boolean(searchQuery.mode.includes("online"))}
                  value="online"
                  type="checkbox"
                  id="online"
                  name="classMode"
                  className="accent-[#0C3C82]"
                />
                Online
              </label>
              <label
                htmlFor="offline"
                className="flex items-center w-fit gap-x-2 cursor-pointer"
              >
                <input
                  onChange={modeHandler}
                  checked={Boolean(searchQuery.mode.includes("offline"))}
                  value="offline"
                  type="checkbox"
                  id="offline"
                  name="classMode"
                  className="accent-[#0C3C82]"
                />
                Offline
              </label>
              <label
                htmlFor="hybrid"
                className="flex items-center w-fit gap-x-2 cursor-pointer"
              >
                <input
                  onChange={modeHandler}
                  checked={Boolean(searchQuery.mode.includes("hybrid"))}
                  value="hybrid"
                  type="checkbox"
                  Resourceid="hybrid"
                  name="classMode"
                  className="accent-[#0C3C82]"
                />
                Hybrid
              </label>
            </div>
          </div>
        </div>
        <div className="max-md:hidden min-w-[220px] max-h-full">
          <img src={findImg} alt="find Institute" className="w-full h-auto" />
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default FindInstitute;
