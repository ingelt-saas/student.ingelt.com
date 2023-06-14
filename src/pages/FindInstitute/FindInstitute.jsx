import React, { useContext, useEffect, useState } from "react";

//assets
import findImg from "../../assets/images/find-institute.png";
import { Search } from "@mui/icons-material";
import InstituteItem from "../../components/FindInstitute/InstituteItem";
import instituteApi from "../../api/institute";
import { StudentContext } from "../../contexts";
import { Country, State } from "country-state-city";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";

const FindInstitute = () => {
  //states
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState({
    mode: [],
    search: "",
    location: "",
  });
  const [nearMe, setNearMe] = useState(false);
  const [states, setStates] = useState([]);
  const [appliedInstitutes, setAppliedInstitutes] = useState([]);

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
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await instituteApi.getInstitutes(
          searchQuery.mode.join(","),
          searchQuery.location,
          searchQuery.search
        );
        setInstitutes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    fetchAppliedInstitutes();
  }, [searchQuery]);

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
    const findCountry = Country.getAllCountries().find(
      (i) => i.name === student.country
    );
    if (findCountry) {
      const findStates = State.getStatesOfCountry(findCountry.isoCode);
      setStates(findStates.map((i) => i.name));
    }
  }, [student]);

  // apply handler
  const applyHandler = async (e, org) => {
    e.target.disabled = true;
    try {
      await instituteApi.applyInstitute({ organizationId: org.id });
      toast.success(
        `You have successfully applied to the ${org.name} institute, Our team will contact you within 12hrs.`
      );
      fetchAppliedInstitutes();
    } catch (err) {
      toast.error("Sorry! Something went wrong");
    } finally {
      e.target.disabled = false;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-3 rounded-xl shadow-xl">
        <div className="w-full md:w-fit py-3 ml-5 bg-white">
          <h2 className="text-2xl font-semibold text-[#001E43]">
            Find Institute
          </h2>
          <form
            onSubmit={inputHandler}
            className="mt-3 flex items-center flex-row max-md:w-full md:w-[600px] bg-[#0C3C821A] rounded-md py-2 px-2 "
          >
            <div className="flex-1 relative z-0">
              <input
                className="h-full peer z-20 bg-transparent w-full border-0 focus:outline-none"
                type="search"
                name="search"
                id="search"
              />
              <label
                htmlFor="search"
                id="searchLabel"
                className="absolute opacity-50 duration-200 -z-10 top-1/2 left-0 w-full h-auto -translate-y-1/2 flex gap-x-2 items-center"
              >
                <div className=" flex-1 flex gap-x-2 items-center border-r-2 border-[#00000066] ">
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
                <div className="peer-valid:group:hidden flex-1 flex gap-x-2 items-center">
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
                      <g transform="scale(5.12,5.12)">
                        <path d="M25,1c-8.82031,0 -16,7.17969 -16,16c0,14.11328 14.62891,30.94531 15.25,31.65625c0.19141,0.21875 0.46094,0.34375 0.75,0.34375c0.30859,-0.01953 0.55859,-0.125 0.75,-0.34375c0.62109,-0.72266 15.25,-17.84375 15.25,-31.65625c0,-8.82031 -7.17969,-16 -16,-16zM25,12c3.3125,0 6,2.6875 6,6c0,3.3125 -2.6875,6 -6,6c-3.3125,0 -6,-2.6875 -6,-6c0,-3.3125 2.6875,-6 6,-6z"></path>
                      </g>
                    </g>
                  </svg>
                  <span className="text-lg xs:text-sm text-[#00285A]">
                    Institute Location
                  </span>
                </div>
              </label>
            </div>
            <button className="flex items-center px-2 sm:px-6 sm:gap-x-2 bg-[#0C3C82] text-white text-sm sm:text-base font-medium py-2 rounded-lg">
              <Search fontSize="small" />
              Search
            </button>
          </form>
          <div className="w-full justify-between flex items-start mt-3">
            <div className="flex flex-col gap-y-2 items-start">
              <h5 className="text-xl text-[#00285A] font-medium">Location</h5>
              <div className="md:w-220px w-fit rounded-lg border pr-2 cursor-pointer border-[#0C3C82]">
                <select
                  onChange={(e) => {
                    setNearMe(false);
                    setSearchQuery({
                      ...searchQuery,
                      location: e.target.value,
                    });
                  }}
                  className="text-center  text-[#0C3C82] px-4 py-3 border-0 bg-transparent font-medium outline-none"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option selected>Delhi</option>
                  {states.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              {/* <label
                htmlFor="nearMe"
                className="flex items-center w-fit gap-x-2 cursor-pointer"
              >
                <input
                  onChange={(e) => setNearMe(e.target.checked)}
                  checked={nearMe}
                  type="checkbox"
                  id="nearMe"
                  name="classMode"
                  className="accent-[#0C3C82]"
                />
                Near Me
              </label> */}
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
                  id="hybrid"
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
      </div>
      <div className="mt-10 flex gap-x-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-y-5">
          {!loading &&
            (institutes?.length > 0 ? (
              Array.isArray(institutes) &&
              institutes.map((institute, index) => (
                <InstituteItem
                  key={index}
                  applyHandler={applyHandler}
                  appliedInstitutes={appliedInstitutes}
                  institute={institute}
                />
              ))
            ) : (
              <Alert icon={false} severity="warning" className="w-fit mx-auto">
                No Institute Found
              </Alert>
            ))}
        </div>
        <div className="max-lg:hidden w-1/2">
          <div className="h-[90vh] rounded-lg overflow-hidden">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.9510394728!2d76.76356531486537!3d28.64428735134563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi%2C%20India!5e0!3m2!1sen!2sbd!4v1684835021997!5m2!1sen!2sbd"
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
    </div>
  );
};

export default FindInstitute;
