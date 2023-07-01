import React, { useContext, useRef, useState } from "react";
// import { CheckCircle, Done, Close } from "@mui/icons-material";
import { Rating } from "react-simple-star-rating";
// import { UserContext } from "../../contexts/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Thumbs } from 'swiper';
import Image from "../shared/Image/Image";
import { FmdGood, LocationOn, Share, Verified } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify';
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// assets
// import img1 from '../../assets/images/worldwide.svg';
// import img2 from '../../assets/images/demo.svg';
// import img3 from '../../assets/images/phone-contact.svg';
import img4 from '../../assets/images/logo.png';
import phoneSVG from '../../assets/images/phone.svg';
import { Tooltip } from "@mui/material";

const InstituteItem = ({ applyHandler, institute, appliedInstitutes, setEmbedLink }) => {

    // const prevRef = useRef();
    // const nextRef = useRef();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // destructuring institute object
    const {
        id,
        name,
        address,
        verified,
        // tagline,
        fee,
        orgImages,
        modeOfClasses,
        overallRating,
        embedUrl,
        phoneNo
    } = institute;

    // user context
    // const { user } = useContext(UserContext);
    // check if logged student have to applied
    // const applied = user && user?.organizations.find((org) => org.id === id);

    const appliedInstitute = Array.isArray(appliedInstitutes) ? appliedInstitutes.find(i => i.organizationId === id) : false;

    return (
        <div className="px-4 sm:px-4 py-4 rounded-xl mb-6 flex flex-col lg:flex-row gap-x-4 gap-y-6 shadow-xl bg-white">
            <div className="lg:w-4/12 flex items-center">
                <div className="w-full overflow-hidden rounded-lg">
                    {Array.isArray(orgImages) && orgImages.length > 0 && <>
                        <Swiper speed={300}
                            spaceBetween={10}
                            modules={
                                [Autoplay, FreeMode, Thumbs]
                            }
                            // Autoplay={
                            //     {
                            //         delay: 2500,
                            //         disableOnInteraction: false
                            //     }
                            // }
                            thumbs={
                                {
                                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                                }
                            }
                            className="h-48 sm:h-72 lg:h-40"
                        >
                            {
                                orgImages.map(i => <SwiperSlide key={
                                    i.name
                                }>
                                    <div className="h-full w-full">
                                        <Image src={
                                            i.name
                                        }
                                            alt={
                                                i.name
                                            }
                                            className='w-full h-full object-cover' />
                                    </div>
                                </SwiperSlide>)
                            } </Swiper>

                        <Swiper onSwiper={setThumbsSwiper}
                            slidesPerView={5}
                            speed={300}
                            watchSlidesProgress={true}
                            freeMode={true}
                            modules={
                                [Thumbs, FreeMode]
                            }
                            className="h-12 sm:h-16 lg:h-10">
                            {
                                orgImages.map(i => <SwiperSlide key={
                                    i.name
                                }>
                                    <div className="w-full h-full p-1 cursor-pointer">
                                        <Image src={
                                            i.name
                                        }
                                            alt={
                                                i.name
                                            }
                                            className='w-full h-full object-cover rounded-md' />
                                    </div>
                                </SwiperSlide>)
                            } </Swiper> </>
                    }
                </div>
            </div>
            <div className="lg:w-8/12 flex flex-col justify-between gap-y-5">
                <div className="flex justify-between items-start">
                    <p className="flex flex-col">
                        <span className="text-xl max-sm:text-lg flex items-center justify-start gap-x-2 text-[#00285A] font-semibold">
                            {name}
                            {verified && <Verified className="text-[#00285A]" />}
                        </span>
                        <span className="text-sm flex items-center text-[#00285A]">
                            <LocationOn className="!text-base" /> {address}
                        </span>
                    </p>
                    <div className="flex flex-col items-end gap-y-2">
                        <span className="flex items-end gap-x-2">
                            <Rating readonly
                                initialValue={
                                    parseFloat(overallRating)
                                }
                                allowFraction={true}
                                size={20}
                                SVGstyle={
                                    { display: "inline" }
                                } />
                        </span>
                        <button className="cursor-pointer text-[#00285A]"
                            onClick={
                                () => {
                                    navigator.clipboard.writeText("https://board.ingelt.com");
                                    toast.success('Link copied successfully', {
                                        position: "top-left",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light"
                                    });

                                }
                            }>Share<Share fontSize='small' className="ml-2" /></button>
                        {/* <span className="flex items-center gap-x-1 text-[#00000080] text-sm">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 16.5C4.85775 16.5 1.5 13.1422 1.5 9C1.5 4.85775 4.85775 1.5 9 1.5C13.1422 1.5 16.5 4.85775 16.5 9C16.5 13.1422 13.1422 16.5 9 16.5ZM8.25 8.25V12.75H9.75V8.25H8.25ZM8.25 5.25V6.75H9.75V5.25H8.25Z"
                                    fill={`${sponsored ? "#3383E7" : "#7F7F7F"}`}
                                />
                            </svg>
                            Sponsored
                        </span> */} </div>
                </div>
                <div>
                    <div className="flex justify-between items-start">
                        <p className="text-[#00000099] font-semibold max-lg:text-sm">
                            <span className="">Modes Available:-&nbsp;
                            </span>
                            <span className="capitalize text-[#00285A]">
                                {modeOfClasses}
                            </span>
                        </p>
                        <Tooltip title='Click to see location'>
                            <p className="cursor-pointer max-lg:hidden flex gap-x-2 items-center" onClick={() => setEmbedLink(embedUrl)} >
                                <span className="font-semibold text-[#00000099] max-lg:text-sm ">Location</span>
                                <FmdGood className="!text-xl text-[#00285A]" />
                            </p>
                        </Tooltip>
                    </div>
                    <div className="flex justify-between items-start">
                        <p className="text-[#00000099] font-semibold max-lg:text-sm">
                            <span className="">Recent Enquiries:-&nbsp;
                            </span>
                            <span className="capitalize text-[#00285A]">
                                {Math.round(Math.random() * 100)}
                            </span>
                        </p>
                        <Tooltip title={`Contact with ${name}`}>
                            <a href={`tel:${phoneNo}`} rel='noreferrer' className="text-[#00285A] flex gap-x-2 items-center cursor-pointer" >
                                <span className="font-semibold text-[#00000099] max-lg:text-sm ">Call Now</span>
                                <img src={phoneSVG}
                                    alt=''
                                    className='w-5 h-auto'
                                />
                            </a>
                        </Tooltip>
                    </div>
                </div>

                {/* <div className="flex justify-between max-sm:flex-col max-sm:gap-y-3">
                    <div className="flex-1 pr-3 mt-2 flex flex-col max-sm:gap-y-2 justify-between">
                        <div className="flex justify-between items-center">
                            <div className="w-12 h-12 rounded-full border-4 border-[#0064E133] border-dashed grid place-items-center">
                                <img src={img1} alt='' className="w-[80%]" />
                            </div>
                            <svg width="26" height="3" viewBox="0 0 26 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H21" stroke="#0064E1" strokeLinecap="round" strokeDasharray="3 3" />
                            </svg>
                            <div className="w-12 h-12 rounded-full border-4 border-[#0064E133] border-dashed grid place-items-center">
                                <img src={img2} alt='' className="w-[80%]" />
                            </div>
                            <svg width="26" height="3" viewBox="0 0 26 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H21" stroke="#0064E1" strokeLinecap="round" strokeDasharray="3 3" />
                            </svg>
                            <div className="w-12 h-12 rounded-full border-4 border-[#0064E133] border-dashed grid place-items-center">
                                <img src={img3} alt='' className="w-[80%]" />
                            </div>
                        </div>

                    </div>
                </div> */}
                <div className="flex md:justify-between max-md:flex-col max-md:gap-y-3 max-md:items-end items-start mt-2">
                    <div className="flex items-center gap-x-3 justify-center max-md:w-full">
                        <img
                            src={img4}
                            alt=''
                            className="w-10 h-auto" />
                        <h2 className="text-[#0C3C82] text-base font-semibold -mt-1">
                            Offers you free video modules and Resources.
                        </h2>
                    </div>
                    <button disabled={
                        Boolean(appliedInstitute)
                    }
                        className="py-2 px-7 text-white bg-[#0C3C82] rounded-lg font-medium"
                        onClick={
                            (e) => applyHandler(e, { name, id })
                        }>
                        {
                            appliedInstitute ? 'Applied' : 'Apply'
                        }</button>
                </div>
            </div>
            {/* <ToastContainer/> */} </div >
    );
};

export default InstituteItem;
