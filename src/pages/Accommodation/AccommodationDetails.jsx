import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress } from '@mui/material';
import { ArrowBack, LocationOn, ChevronRight, FavoriteBorder, Forum } from '@mui/icons-material';
import AccommodationImages from '../../components/Accommodation/AccommodationImages';
import { BsGear, BsTag } from 'react-icons/bs';
import { VscVerified } from 'react-icons/vsc';
import AccommodationVideos from '../../components/Accommodation/AccommodationVideos';


const AccommodationDetails = ({ accommodations, id }) => {

    // states
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    console.log(data);

    useEffect(() => {
        if (Array.isArray(accommodations) && accommodations.length > 0 && id) {
            const accommodation = accommodations.find(i => i.id === parseInt(id));
            setData(accommodation);
            setLoading(false);
        }
    }, [accommodations, id]);

    if (loading) {
        return <div className='grid place-items-center text-[#0C3C82] h-full'>
            <CircularProgress color='inherit' />
        </div>
    }

    return (
        <div className=''>
            <button onClick={() => window.history.back()} className='text-base text-[#0C3C82] font-medium flex items-center gap-2' ><ArrowBack fontSize='small' /> Back</button>
            <div className='mt-10'>
                {!data && <Alert severity='warning' icon={false} className='!mx-auto !w-fit' >Accommodation Not Found</Alert>}
                {data && <div>
                    <div className='flex gap-5'>
                        <div className='w-8/12 shadow-xl rounded-lg overflow-hidden'>
                            <AccommodationImages images={data?.images} />
                        </div>
                        <div className='w-4/12'>
                            <AccommodationVideos videos={data?.videos} />
                        </div>
                    </div>
                    <div className='mt-10 grid grid-cols-12 gap-5'>
                        <div className='col-span-8'>
                            <span className='text-sm font-medium text-[#0C3C82]'>
                                {data?.location?.country?.long_name} / {data?.location?.district?.long_name} / {data?.location?.locality?.long_name}
                            </span>
                            <h1 className='my-5 text-2xl font-medium'>{data?.name}</h1>
                            <div className='flex items-start gap-2'>
                                <LocationOn fontSize="small" />
                                <p className='text-sm font-medium flex flex-col gap-1'>
                                    <span>{data?.location?.name}</span>
                                    <a href="/" className='text-[#0C3C82]'>View Distance From Universities</a>
                                </p>
                            </div>
                            <div className='flex flex-wrap gap-2 md:gap-3 mt-5'>
                                {Array.isArray(data?.features) && data.features.map((item, index) =>
                                    <button key={index} className='py-2 px-7 rounded-full text-sm font-medium text-[#355A5F] bg-[#85E1ED33]'>{item.name}</button>
                                )}
                                {/* <button className='py-2 px-7 flex-1 rounded-full text-sm font-medium text-[#ffffff] bg-[#0C3C82]'>2 Offers</button>

                                <button className='py-2 px-7 flex-1 rounded-full text-sm font-medium text-[#355A5F] bg-[#85E1ED33]'>Bill Included</button>
                                <button className='py-2 px-7 flex-1 rounded-full text-sm font-medium text-[#355A5F] bg-[#85E1ED33]'>Laundry Facility</button> */}
                            </div>
                        </div>
                        <div className='col-span-4 px-5 py-10 bg-white shadow-xl rounded-lg grid place-items-center'>
                            <div className='w-full'>
                                <span className='text-[#00000099]'>From</span>
                                <p className='text-[#00000099]'>
                                    <strong className='text-2xl font-bold'>$212</strong>/week/person
                                </p>
                                <div className='flex gap-3 mt-7'>
                                    <Button
                                        variant='contained'
                                        className="!bg-[#4CAF50] !text-[#fff] !w-1/2 !py-3 !rounded-full !capitalize !text-sm !font-medium"
                                        endIcon={<ChevronRight fontSize='small' />}
                                    >
                                        Enquire
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        className="!bg-transparent !text-[#0C3C82] !w-1/2 !py-3 !rounded-full !capitalize !text-sm !font-medium !border-[#0C3C82]"
                                        startIcon={<FavoriteBorder fontSize='small' />}
                                    >
                                        Shortlist
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-8'>
                            <div className='mt-5 grid grid-cols-2 gap-5'>
                                <h1 className="col-span-full text-2xl text-[#001E43] font-medium">Room Types</h1>
                                {[...Array(4)].map(item => <div key={item} className='rounded-lg shadow-lg p-3'>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>2 Bed 1 Bath</span>
                                        <span className='text-[#0C3C82]'>$1300 - $1500/month</span>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <div className='px-5 py-6 bg-white shadow-lg rounded-lg flex flex-col gap-4'>
                                <p>From $212/week</p>
                                <p className='flex flex-wrap gap-2 text-sm'>
                                    <span className='flex gap-3 items-center bg-[#0C3C821A] text-[#0C3C82] px-5 py-2 rounded-lg'>
                                        <BsTag className='w-5 h-5' />
                                        Offer 2
                                    </span>
                                    <span className='flex gap-3 items-center px-5 py-2 rounded-lg'>
                                        <VscVerified className='w-5 h-5' />
                                        Verified Property
                                    </span>
                                </p>
                                <p className='flex gap-2 items-center'>
                                    <BsGear />
                                    Free Service
                                </p>
                                <Button
                                    variant='contained'
                                    className="!bg-[#0C3C82] !text-[#fff] !w-full !py-2.5 !rounded-full !capitalize !text-sm !font-medium"
                                    endIcon={<ChevronRight fontSize='small' />}
                                >Book Now</Button>
                            </div>
                            <div className='px-5 py-6 bg-white shadow-lg rounded-lg mt-5 flex gap-4'>
                                <Button
                                    variant='outlined'
                                    className="!bg-transparent !text-[#0C3C82] !w-1/2 !py-3 !rounded-full !capitalize !text-sm !font-medium !border-[#0C3C82]"
                                    startIcon={<FavoriteBorder fontSize='small' />}
                                >
                                    Shortlist
                                </Button>
                                <Button
                                    variant='outlined'
                                    className="!bg-transparent !text-[#0C3C82] !w-1/2 !py-3 !rounded-full !capitalize !text-sm !font-medium !border-[#0C3C82]"
                                    startIcon={<Forum fontSize='small' />}
                                >
                                    Chat
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default AccommodationDetails;
