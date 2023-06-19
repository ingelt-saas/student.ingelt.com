import React, { useState } from "react";
import welcomeSVG from "../../assets/images/headingSVG.svg";
import downSVG from "../../assets/images/downArrow.svg";
import ShortlistSVG from "../../assets/images/shortlist.svg";
import { Button, Drawer, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import universityApi from "../../api/university";
import UniversityItem from "../../components/University/UniversityItem";
import { toast } from "react-toastify";
import FilterMenu from "../../components/University/FilterMenu";



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
  const [pagination, setPagination] = useState({ page: 1, rows: 40 });
  const [filterData, setFilterData] = useState({ country: '', course: '', areaOfInterest: '', });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['shortlistedUniversities', pagination, filterData],
    queryFn: async () => {
      const res = await universityApi.getAll(
        pagination.page,
        pagination.rows,
        filterData.country,
        filterData.course,
        filterData.areaOfInterest
      );
      return res.data;
    }
  });

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

          <div className="pb-10 grid xl:grid-cols-12 gap-x-5 mt-10 max-lg:pb-20">
            <div className="xl:col-span-4">
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
            </div>
            <div className="xl:col-span-8">

              {isLoading && <div className="py-5 flex justify-center">
                <CircularProgress sx={{ '&: svg circle': { stroke: '#00285A' } }} />
              </div>}

              {!isLoading && (Array.isArray(data?.rows) && data?.rows?.length > 0 ?
                <div className="grid max-md:grid-cols-1 grid-cols-2 gap-x-5">
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
        <div className="bg-white h-full rounded-t-full max-w-[300px]">
          <FilterMenu filterHandler={filterHandler} />
          {/* <div className="relative">
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
    </>
  );
};

export default ShortlistUniversity;
