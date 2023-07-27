import { Button } from "@mui/material";
import React from "react";

// assets
import headerImg from "../../assets/images/ielts-classes-header.svg";
import img1 from "../../assets/images/free-ielts.svg";
import img2 from "../../assets/images/live-online.svg";
import img3 from "../../assets/images/offline-classes.svg";
import { Link, useNavigate } from "react-router-dom";

const IELTSClasses = () => {

  const navigate = useNavigate();

  const freeData = [
    "Lifetime access",
    "15 hrs of recorded sessions",
    "PDF of recorded session",
    "IELTS strategies",
    "Assignments",
    "Self practice mock test",
    "IELTS library"
  ];

  const onlineData = [
    "2 Month crash course",
    "15 hrs of recorded sessions",
    "40 hrs of live classes",
    "Doubt clearing sessions",
    "Writing evaluation",
    "Speaking evaluation",
    "5 Full length mock test"
  ];

  const offlineData = [
    "2 Month crash course",
    "5 days in a week class",
    "In-person teaching",
    "Doubt clearing sessions",
    "Notes & assignments",
    "Writing & Speaking evaluation",
    "5 Full length mock test"
  ];


  return (
    <div>
      <div className="flex max-md:flex-col gap-7 max-xl:gap-x-5">
        {/* page header */}

        <div className="rounded-[1.2rem] flex justify-between relative items-center md:w-[65%] bg-white shadow-xl">
          <div className="px-7 flex flex-col gap-y-1 max-md:py-7 max-sm:px-5">
            <p className="font-normal text-black opacity-75">Start Your</p>
            <h1 className="text-2xl font-bold text-[#0C3C82]">IELTS Preparation</h1>
          </div>
          <div className="overflow-hidden pr-3 absolute top-0 right-0 h-full w-auto max-md:hidden">
            <img
              draggable={false}
              src={headerImg}
              alt="library"
              className={`max-h-full max-w-full mix-blend-darken`}
            />
          </div>
        </div>

        {/* speaking practice session */}
        <div className="rounded-[1.2rem] max-md:!w-full shadow-xl p-4 flex flex-col gap-y-3 bg-white flex-1">
          <h3 className="text-2xl font-bold text-[#0C3C82]">
            Speaking Practice
          </h3>
          <p className="text-base">Free for your whole team</p>

          <Link to='/speaking-session'>
            <Button
              variant="contained"
              className="!capitalize !py-2 !px-10 !font-medium !w-fit !rounded-lg"
              sx={{
                backgroundColor: "#0C3C82",
                "&:hover": {
                  backgroundColor: "#0C3C82",
                },
              }}
            >
              Book Now
            </Button>
          </Link>

        </div>

      </div>

      <div className='grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xl:gap-x-10 mt-10'>
        <div className='p-4 rounded-xl shadow-lg bg-white flex flex-col gap-y-4'>
          <div className='rounded-xl overflow-hidden relative'>
            <img draggable={false} src={img1} alt='' className='w-full aspect-[16/6] object-cover' />
            <h3 className='text-2xl font-semibold text-white absolute top-1/2 -translate-y-1/2 left-5'>Free IELTS Modules</h3>
          </div>
          <div className='flex flex-col gap-2'>
            {freeData.map((item, index) =>
              <p key={index} className='px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full block bg-black'></span>
                <span>{item}</span>
              </p>
            )}
          </div>
          <Button
            variant='contained'
            className='!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'
            sx={{
              backgroundColor: '#0C3C82',
              '&:hover': {
                backgroundColor: '#0C3C82'
              }
            }}
            onClick={() => navigate('/modules')}
          >Free</Button>
        </div>
        <div className='p-4 rounded-xl shadow-lg bg-white flex flex-col gap-y-4'>
          <div className='rounded-xl overflow-hidden relative'>
            <img draggable={false} src={img2} alt='' className='w-full aspect-[16/6] object-cover' />
            <h3 className='text-2xl font-semibold text-white absolute top-1/2 -translate-y-1/2 left-5'>Live / Online Classes</h3>
          </div>
          <div className='flex flex-col gap-2'>
            {onlineData.map((item, index) =>
              <p key={index} className='px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full block bg-black'></span>
                <span>{item}</span>
              </p>
            )}
          </div>
          <Button
            variant='contained'
            className='!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'
            sx={{
              backgroundColor: '#0C3C82',
              '&:hover': {
                backgroundColor: '#0C3C82'
              }
            }}
            onClick={() => navigate('/ielts-classes/online-classes')}
          >Book Now</Button>
        </div>
        <div className='p-4 rounded-xl shadow-lg bg-white flex flex-col gap-y-4'>
          <div className='rounded-xl overflow-hidden relative'>
            <img draggable={false} src={img3} alt='' className='w-full aspect-[16/6] object-cover' />
            <h3 className='text-2xl font-semibold text-white absolute top-1/2 -translate-y-1/2 left-5'>Offline Classes</h3>
          </div>
          <div className='flex flex-col gap-2'>
            {offlineData.map((item, index) =>
              <p key={index} className='px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full block bg-black'></span>
                <span>{item}</span>
              </p>
            )}
          </div>
          <Button
            variant='contained'
            className='!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'
            sx={{
              backgroundColor: '#0C3C82',
              '&:hover': {
                backgroundColor: '#0C3C82'
              }
            }}
            onClick={() => navigate('/find-institute')}
          >Book Now</Button>
        </div>
      </div>

    </div>
  );
}

export default IELTSClasses;
