import React, { useContext, useState } from "react";
import welcomeSVG from "../../assets/images/headingSVG.svg";
import { Button, Drawer, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Favorite, FilterAlt, HeartBroken } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import universityApi from "../../api/university";
import UniversityItem from "../../components/University/UniversityItem";
import { toast } from "react-toastify";
import FilterMenu from "../../components/University/FilterMenu";
import ShortlistedUniversities from "../../components/University/ShortlistedUniversities";
import Header from "../../components/shared/Header/Header";
import { StudentContext } from "../../contexts";

import img1 from '../../assets/images/globe.svg';
import img2 from '../../assets/images/courses.svg';
import img3 from '../../assets/images/universities.svg';
import img4 from '../../assets/images/landing-pages/school.svg';
import img5 from '../../assets/images/landing-pages/bachelors-degree.svg';
import img6 from '../../assets/images/landing-pages/graduation.svg';
import img7 from '../../assets/images/landing-pages/certificate.svg';
import img8 from '../../assets/images/landing-pages/graduate.svg';
import img9 from '../../assets/images/landing-pages/phd.svg';
import settings from "../../api/settings";

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

const LandingPage = () => {

  const data = [
    {
      image: img4,
      content: 'High School \n(11th- 12th)',
    },
    {
      image: img5,
      content: 'UG Diploma/ \nCertificate',
    },
    {
      image: img6,
      content: 'Undergraduate \n(UG)',
    },
    {
      image: img7,
      content: 'PG Diploma/ \nCertificate',
    },
    {
      image: img8,
      content: 'Postgraduate \n(PG)',
    },
    {
      image: img9,
      content: 'Doctor \nPhilosophy',
    },
  ];

  // enter click handler
  const unlockUniversityShortlist = async (e) => {
    e.target.disabled = true;
    try {
      await settings.update({ universityUnlock: true });
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
        <h1 className="text-3xl max-sm:text-xl text-center text-white font-semibold">Apply for University Shortlisting</h1>
        <p className="text-base text-center text-white">Find your dream university with our advanced Course Finder</p>
      </div>
      <div className='flex items-start gap-x-7'>
        <div className="flex flex-col items-center">
          <img src={img3} alt='' className='w-20 aspect-square h-auto' />
          <h3 className="text-2xl max-sm:text-xl text-center text-white font-semibold">750+ <br /> Universities</h3>
        </div>
        <div className="flex flex-col items-center">
          <img src={img2} alt='' className='w-20 aspect-square h-auto' />
          <h3 className="text-2xl max-sm:text-xl text-center text-white font-semibold">50,000+ <br /> Courses</h3>
        </div>
        <div className="flex flex-col items-center">
          <img src={img1} alt='' className='w-20 aspect-square h-auto' />
          <h3 className="text-2xl max-sm:text-xl text-center text-white font-semibold">30+ <br /> Countries</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 max-sm:gap-3 gap-5">
        {data.map((item, index) => <div key={index} className="bg-white flex gap-x-2 rounded-2xl px-2 py-2 items-center">
          <img src={item.image} alt='' className='w-12 max-sm:w-10 h-auto aspect-square' />
          <p className="whitespace-pre-line font-semibold text-[] max-sm:text-sm">{item.content}</p>
        </div>)}
      </div>

      <div className=' flex flex-col items-center gap-y-4'>
        <p className='text-center text-white'>Enter to Shortlist Course / University</p>
        <Button
          onClick={unlockUniversityShortlist}
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

const ShortlistUniversity = () => {

  // states
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, rows: 100 });
  const [leftDrawer, setLeftDrawer] = useState(false);
  const [filterData, setFilterData] = useState({ country: [], course: [], areaOfInterest: [], });

  // context
  const { student } = useContext(StudentContext);

  // fetch universities
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

  // send query
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
      {!student?.universityUnlock && <LandingPage />}

      {student?.universityUnlock && <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full py-10 px-5 max-sm:px-2">
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
      </div>}

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
