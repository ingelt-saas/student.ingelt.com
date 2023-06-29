import React, { useState } from "react";
import welcomeSVG from "../../assets/images/headingSVG.svg";
import downSVG from "../../assets/images/downArrow.svg";
import ShortlistSVG from "../../assets/images/shortlist.svg";
import { Button, Drawer, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Favorite, FilterAlt, HeartBroken } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import universityApi from "../../api/university";
import UniversityItem from "../../components/University/UniversityItem";
import { toast } from "react-toastify";
import FilterMenu from "../../components/University/FilterMenu";
import ShortlistedUniversities from "../../components/University/ShortlistedUniversities";



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

const ShortlistUniversity = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, rows: 100 });
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [filterData, setFilterData] = useState({ country: '', course: '', areaOfInterest: '', });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['shortlistedUniversities', pagination, filterData],
    queryFn: async () => {
      const res = await universityApi.getAll(
        pagination.page,
        pagination.rows,
        filterData.country,
        (filterData.course === 'All' ? '' : filterData.course),
        filterData.areaOfInterest
      );
      return res.data;
    }
  });

  const sendQuery = async (e) => {
    e.target.disabled = true;
    try {
      await universityApi.sendQuery();
      toast.success('Your query has been sent successfully, our team will contact you shortly');
    } catch (err) {
      console.error(err);
    } finally {
      e.target.disabled = false;
    }
  }

  // shortlist add handler
  const shortlistHandler = async (e, university) => {
    e.target.disabled = true;
    try {
      if (university?.studentShortlists?.length > 0) {
        await universityApi.removeUniversityFromShortlist(university.id);
      } else {
        await universityApi.addUniversityInShortlist(university.id);
      }
      refetch();
    } catch (err) {
      toast.error('Sorry! Something went wrong.');
    } finally {
      e.target.disabled = false;
    }
  }

  // filter handler 
  const filterHandler = (name, value) => {
    setFilterData({ ...filterData, [name]: value });
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full ">
        <div className="w-full h-20 foo:block ">
          <div className="flex gap-x-5 max-md:flex-col max-md:gap-y-5">
            <Box sx={
              {
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                height: "20vh",
                width: { md: "64%", xs: "100%" },
                padding: "0rem 2rem",
                backgroundColor: "white",
                border: "1px solid white",
                borderRadius: "2rem",
                boxShadow: "0px 5px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);"
              }
            }>
              <Box sx={
                {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  padding: "2rem 0rem",
                  width: { md: "50%", xs: "90%" }
                }
              }>
                <div>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: { md: "1.5rem", xs: "1.2rem" },
                      lineHeight: '1.7rem',
                      marginBottom: '0.5rem'
                    }}>University Shortlisting</Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.9rem', md: "1rem" },
                    }}
                  >Choose in-demand course as per your interest
                  </Typography>
                </div>
              </Box>
              <Box sx={
                {
                  width: { md: "60%", xs: "100%" },
                  height: '100%',
                  paddingBottom: '0.5rem',
                }
              }>
                <img src={welcomeSVG}
                  alt="library"
                  className="relative top-5 md:bottom-10 scale-110 ml-auto" />
              </Box>

            </Box>
            <div className="">
              <div style={{ boxShadow: ' 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 36px 0px rgba(0, 0, 0, 0.16)' }} className="bg-white h-full w-full p-5 rounded-2xl flex justify-between flex-col items-center">
                <p className="text-[#00285A] text-lg text-center">Need more help in finding your course?</p>
                <button className="hover:bg-[#00285A] text-lg bg-transparent duration-300 border-2 border-[#00285A] text-[#00285A] hover:text-white py-1 max-md:text-base px-3 w-full rounded-2xl justify-around flex items-center">
                  Talk to expert
                  {/* <RightArrowSVG className={'h-5 w-5'} /> */}
                </button>
                <div className="flex justify-around gap-x-5 w-full max-md:mt-3">
                  <div className="xl:col-span-4">
                    <Button
                      className=""
                      variant="container"
                      sx={{
                        backgroundColor: "#00285A",
                        color: "white",
                        width: { xs: "8rem", md: "11rem" },
                        border: "2px solid #00285A",
                        borderRadius: "15px",
                        py: '5px',
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "#00285A",
                        },
                      }}
                      endIcon={<Favorite />}
                      onClick={() => setLeftDrawer(true)}
                    >
                      Shortlisted
                    </Button>
                  </div>
                  <div className="xl:col-span-4">
                    <Button
                      className=""
                      variant="container"
                      sx={{
                        backgroundColor: "#00285A",
                        color: "white",
                        width: { xs: "8rem", md: "11rem" },
                        border: "2px solid #00285A",
                        borderRadius: "15px",
                        py: '5px',
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "transparent",
                          color: "#00285A",
                        },
                      }}
                      endIcon={<FilterAlt />}
                      onClick={() => setIsOpen(true)}
                    >
                      Filter
                    </Button>
                    {/* <div className="max-xl:hidden">
                <FilterMenu filterHandler={filterHandler} />
              </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-10 grid  gap-x-5 max-md:mt-1 mt-10 max-lg:pb-20">
            {/* <div className="xl:col-span-4">
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
              <div className="max-xl:hidden">
                <FilterMenu filterHandler={filterHandler} />
              </div>
            </div> */}
            <div className="w-full">

              {isLoading && <div className="py-5 flex justify-center">
                <CircularProgress sx={{ '&: svg circle': { stroke: '#00285A' } }} />
              </div>}

              {!isLoading && (Array.isArray(data?.rows) && data?.rows?.length > 0 ?
                <div className="grid w-full max-md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5">
                  {data?.rows?.map(item =>
                    <UniversityItem
                      RightArrowSVG={RightArrowSVG}
                      university={item}
                      shortlistHandler={shortlistHandler}
                      key={item.id}
                    />
                  )}
                </div> :
                <Alert severity="warning" icon={false} className="mx-auto mt-5 w-fit" >No University Found</Alert>
              )}

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
        <div className="bg-white h-full max-xl:rounded-t-3xl rounded-t-2xl rounded-bl-2xl w-full">
          <FilterMenu filterHandler={filterHandler} />
          {/* <div className="relative">
            <img src={ShortlistSVG} alt="Shortlist" className="" />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5 px-5">
              <p className="text-white">
                need more help in finding your dream course?
              </p>
              <button className="bg-[#E7ECF3] w-fit text-[#00285A] font-semibold py-3 px-6 rounded-full flex items-center gap-x-2">
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
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src={downSVG}
                  alt="down arrow"
                  className="h-auto w-6 inline mr-4  "
                />
              </div>
            </div>
          </div> */}
        </div>
      </Drawer>

      {/* shortlisted universities drawer  */}
      <ShortlistedUniversities
        open={leftDrawer}
        close={() => setLeftDrawer(false)}
        shortlistHandler={shortlistHandler}
        RightArrowSVG={RightArrowSVG}
      />

    </>
  );
};

export default ShortlistUniversity;
