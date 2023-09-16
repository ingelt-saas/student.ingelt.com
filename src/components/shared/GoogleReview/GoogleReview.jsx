import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import videojs from 'video.js';
import { getFileType } from '../../Modules/ModuleVideo';


const ReviewItem = ({ url }) => {

    // states
    const [videoSource, setVideoSource] = useState({ src: url, type: 'video/mp4' });
    const videoRef = useRef();

    // set video player
    useEffect(() => {
        if (videoSource && videoRef.current) {
            const player = videojs(videoRef.current, {
                autoplay: false,
                controls: false,
                responsive: true,
                fluid: true,
            });

            // for large device
            player.on('mouseenter', function () {
                player.play();
            });

            player.on('mouseleave', function () {
                player.pause();
            });

            // For mobile click control
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                player.on('click', function () {
                    if (player.paused()) {
                        player.play();
                    } else {
                        player.pause();
                    }
                });
            }

            player.src(videoSource);

            return () => player && player.dispose();
        }
    }, [videoSource]);

    return <div className='flex flex-col rounded-xl overflow-hidden shadow-2xl'>
        <div className='aspect-[9/11] group relative bg-[#0C3C82]'>
            <video data-setup='{"aspectRatio":"9:11"}' id='video-js' ref={videoRef} className="video-js vjs-default-skin" />
            {/* <img draggable={false} src="https://s3-alpha-sig.figma.com/img/1e42/16ef/b0757955d3b7a6cd2b223bc16541bfec?Expires=1695600000&Signature=keYfEKD6Tvlb6HyokRuCUcV79-K97Itxktk2naAXJ8AvWfwt67VVqwv59NsMYv2-TJuBvE99n-bzom8B~PiUY3sHkLm4NJ3mZOaoJwcgeTc~ENjah2Ywbot1E1kUonWHiBqkS-Gt6bxvXQEL3DTFmsW9m2Nb61U8YlN5g0g-5GylEIPxvBOaz3LZwG75A3Yrm7DaHukQqRMTg0RlUBVsY13VzHOvO3B4O3OjkKlYMpLyAXURUq3tY7f17KAECr3ssVKTFA6fH3kjeZJhkytf-2gXepY2YrzU~JipXIUpIkxYkuFgoCqQNoti6FgZeG9DCbWLjRxRP9hVmxt4dgzmVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className='w-full h-full object-cover' /> */}
            <svg
                className='w-16 h-16 group-hover:hidden duration-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
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
    </div>
}


const GoogleReview = () => {

    const data = [
        "https://assets.admitkard.com/videos/Subarna+Chakraborty_P_F_V2.mp4",
        "https://assets.admitkard.com/videos/Rhitankar+Saha+Roy+_P_F_V2.mp4",
        "https://assets.admitkard.com/videos/Tarushi+Gupta+_P_F_V2.mp4",
        "https://assets.admitkard.com/videos/Subarna+Chakraborty_P_F_V2.mp4",
    ];

    return (
        <>
            <div className='flex flex-col gap-10'>
                <h1 className='font-semibold max-sm:text-2xl text-3xl text-[#0C3C82]'>Here form our students</h1>
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {data.map((item, index) => <ReviewItem url={item} key={index} />)}
                </div>
            </div>
        </>
    );
}

export default GoogleReview;
