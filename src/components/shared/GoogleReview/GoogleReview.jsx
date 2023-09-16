import { Close } from '@mui/icons-material';
import { CircularProgress, IconButton, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import videojs from 'video.js';
import { getFileType } from '../../Modules/ModuleVideo';

const GoogleReview = () => {

    // states
    const [videoFetching, setVideoFetching] = useState(true);
    const [videoSource, setVideoSource] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const videoRef = useRef();

    // set video player
    useEffect(() => {
        if (videoSource && videoRef.current) {
            const player = videojs(videoRef.current, {
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
            });

            player.src(videoSource);

            return () => player && player.dispose();
        }
    }, [videoSource]);

    // { src: res.data, type: `video/${getFileType(data.file)}` }

    return (
        <>
            <div className='flex flex-col gap-10'>
                <h1 className='font-semibold max-sm:text-2xl text-3xl text-[#0C3C82]'>Here form our students</h1>
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {[...Array(4)].map((item, index) => <div key={index} className='flex flex-col rounded-xl overflow-hidden shadow-2xl'>
                        <div className='aspect-[8/9] relative' onClick={() => setSelectedVideo(true)}>
                            <img draggable={false} src="https://s3-alpha-sig.figma.com/img/1e42/16ef/b0757955d3b7a6cd2b223bc16541bfec?Expires=1695600000&Signature=keYfEKD6Tvlb6HyokRuCUcV79-K97Itxktk2naAXJ8AvWfwt67VVqwv59NsMYv2-TJuBvE99n-bzom8B~PiUY3sHkLm4NJ3mZOaoJwcgeTc~ENjah2Ywbot1E1kUonWHiBqkS-Gt6bxvXQEL3DTFmsW9m2Nb61U8YlN5g0g-5GylEIPxvBOaz3LZwG75A3Yrm7DaHukQqRMTg0RlUBVsY13VzHOvO3B4O3OjkKlYMpLyAXURUq3tY7f17KAECr3ssVKTFA6fH3kjeZJhkytf-2gXepY2YrzU~JipXIUpIkxYkuFgoCqQNoti6FgZeG9DCbWLjRxRP9hVmxt4dgzmVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className='w-full h-full object-cover' />
                            <div className='w-full h-full absolute cursor-pointer top-0 left-0 grid place-items-center'>
                                <svg
                                    className='w-16 h-16'
                                    viewBox="0 0 55 55"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="27.7442" cy="27.044" r="26.9581" fill="white" fillOpacity="0.3" />
                                    <circle cx="27.7447" cy="27.045" r="21.5665" fill="white" fillOpacity="0.3" />
                                    <path
                                        d="M31.5716 20.2898C36.5669 23.4604 39.0659 25.0471 39.0659 27.3966C39.0659 29.7488 36.5669 31.3328 31.5716 34.5034C26.5035 37.7186 23.9721 39.3248 22.0824 38.1445C20.1953 36.9642 20.1953 33.7741 20.1953 27.3966C20.1953 21.0191 20.1953 17.829 22.0824 16.6487C23.9721 15.4684 26.5035 17.0746 31.5716 20.2898Z"
                                        fill="#0C3C82"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='px-4 py-2 text-[#0C3C82] text-sm'>
                                Ingelt board boasts an exceptional team with a strong commitment to their work.
                            </p>
                            <hr className='bg-[#0C3C82] h-[1px]' />
                            <p className='flex justify-between items-center py-2.5 px-4 text-[#0C3C82] text-sm font-medium'>
                                <span>Study Visa</span>
                                <img src='https://logowik.com/content/uploads/images/flag-uk7204.logowik.com.webp' alt='' className='w-5 aspect-square object-cover rounded-full' />
                            </p>
                        </div>
                    </div>)}
                </div>
            </div>

            {/* video modal */}
            <Modal
                open={Boolean(selectedVideo)}
                className='grid place-items-center'
                onClose={() => setSelectedVideo(null)}
            >
                <div className='outline-none aspect-video w-[95%] md:w-[80%] bg-white rounded-lg relative'>
                    <IconButton onClick={() => setSelectedVideo(null)} className='text-[#0C3C82] !absolute !top-2 !right-2'>
                        <Close strokeWidth={5} />
                    </IconButton>
                    {videoFetching && <div className='h-full w-full grid place-items-center'>
                        <CircularProgress color='inherit' className='text-[#0C3C82]' />
                    </div>}
                    {!videoFetching && videoSource && <video data-setup='{"aspectRatio":"16:9"}' id='video-js' ref={videoRef} className="video-js vjs-default-skin" />}
                </div>
            </Modal>
        </>
    );
}

export default GoogleReview;
