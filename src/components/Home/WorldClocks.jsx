import React from 'react';
import { FmdGood, WatchLater } from '@mui/icons-material';
import { useState } from 'react';
import momentTimeZone from 'moment-timezone';

// assets
import ukImg from '../../assets/images/uk.webp';
import usaImg from '../../assets/images/usa.webp';
import australiaImg from '../../assets/images/australia.webp';
import irelandImg from '../../assets/images/ireland.webp';
import canadaImg from '../../assets/images/canada.webp';
import germanyImg from '../../assets/images/germany.webp';
import { useEffect } from 'react';

const WorldClocks = () => {

    const [worldClocksData, setWorldClocksData] = useState([
        {
            image: ukImg,
            country: 'UK',
            time: momentTimeZone().tz('Europe/London').format('hh:mm:ss A'),
        },
        {
            image: canadaImg,
            country: 'Canada',
            time: momentTimeZone().tz('America/Toronto').format('hh:mm:ss A'),
        },
        {
            image: usaImg,
            country: 'USA',
            time: momentTimeZone().tz('America/New_York').format('hh:mm:ss A'),
        },
        {
            image: australiaImg,
            country: 'Australia',
            time: momentTimeZone().tz('Australia/Sydney').format('hh:mm:ss A'),
        },
        {
            image: irelandImg,
            country: 'Ireland',
            time: momentTimeZone().tz('Europe/Dublin').format('hh:mm:ss A'),
        },
        {
            image: germanyImg,
            country: 'Germany',
            time: momentTimeZone().tz('Europe/Berlin').format('hh:mm:ss A'),
        },
    ]);

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setWorldClocksData([
                {
                    image: ukImg,
                    country: 'UK',
                    time: momentTimeZone().tz('Europe/London').format('hh:mm:ss A'),
                },
                {
                    image: canadaImg,
                    country: 'Canada',
                    time: momentTimeZone().tz('America/Toronto').format('hh:mm:ss A'),
                },
                {
                    image: usaImg,
                    country: 'USA',
                    time: momentTimeZone().tz('America/New_York').format('hh:mm:ss A'),
                },
                {
                    image: australiaImg,
                    country: 'Australia',
                    time: momentTimeZone().tz('Australia/Sydney').format('hh:mm:ss A'),
                },
                {
                    image: irelandImg,
                    country: 'Ireland',
                    time: momentTimeZone().tz('Europe/Dublin').format('hh:mm:ss A'),
                },
                {
                    image: germanyImg,
                    country: 'Germany',
                    time: momentTimeZone().tz('Europe/Berlin').format('hh:mm:ss A'),
                },
            ])
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className='w-full grid grid-cols-2 gap-2'>
            {worldClocksData.map(({ image, country, time }) => <div key={country} className='relative cursor-pointer rounded-xl overflow-hidden shadow-md'>
                <img className='w-full h-auto aspect-[16/8]' alt='' src={image} />
                <div className='absolute top-0 left-0 w-full h-full px-2 bg-[#000] bg-opacity-40 duration-200 opacity-0 hover:opacity-100 flex flex-col justify-center'>
                    <p className='text-[#fff] flex items-center font-semibold gap-x-1'>
                        <FmdGood fontSize='small' />
                        {country}
                    </p>
                    <p className='text-[#fff] flex items-center gap-x-1 font-semibold'>
                        <WatchLater fontSize='small' />
                        {time}
                    </p>
                </div>
            </div>)}
        </div>
    );
}

export default WorldClocks;
