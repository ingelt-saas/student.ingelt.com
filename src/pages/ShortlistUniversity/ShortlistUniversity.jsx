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
import Header from "../../components/shared/Header/Header";

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
  const [filterData, setFilterData] = useState({ country: [], course: [], areaOfInterest: [], });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['shortlistedUniversities', pagination, filterData],
    queryFn: async () => {
      const res = await universityApi.getAll(
        pagination.page,
        pagination.rows,
        filterData.country.join(';'),
        filterData.course.join(';'),
        filterData.areaOfInterest.join(';')
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
            <Header title="University Shortlisting" subTitle="Choose in demand universities of your choice" Img={welcomeSVG} />
            <div className="">
              <div style={{ boxShadow: ' 0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 36px 0px rgba(0, 0, 0, 0.16)' }} className="bg-white h-full w-full p-5 rounded-2xl flex justify-between flex-col gap-y-4 items-center">
                <p className="text-[#00285A] text-lg text-center">Need more help in finding your course?</p>
                <button onClick={sendQuery} className="hover:bg-[#00285A] text-lg bg-transparent duration-300 border-2 border-[#00285A] text-[#00285A] hover:text-white py-1 max-md:text-base px-3 w-full rounded-2xl justify-around flex items-center">
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
                <FilterMenu filterHandler={filterHandler} selectedData={filterData} />
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
                      sendQuery={sendQuery}
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
          <FilterMenu filterHandler={filterHandler} selectedData={filterData} />
        </div>
      </Drawer>

      {/* shortlisted universities drawer  */}
      <ShortlistedUniversities
        open={leftDrawer}
        close={() => setLeftDrawer(false)}
        shortlistHandler={shortlistHandler}
        RightArrowSVG={RightArrowSVG}
        sendQuery={sendQuery}
      />

    </>
  );
};

export default ShortlistUniversity;
