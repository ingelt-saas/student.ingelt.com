import React from 'react';

// assets
import img1 from '../../assets/images/calendar.svg';
import img2 from '../../assets/images/course.svg';
import img3 from '../../assets/images/graduated.svg';
import img4 from '../../assets/images/online-learning (1) 1.svg';
import img5 from '../../assets/images/online-classes.png';
import { Button } from '@mui/material';

const OnlineClasses = () => {
    return (
        <div className='flex max-md:flex-col gap-6'>
            <div className='md:w-8/12'>
                <div className='py-5 px-5 rounded-3xl bg-[#0C3C82] shadow-xl'>
                    <h1 className='text-2xl font-bold text-white'>Live Classes</h1>
                    <p className='text-white mt-3'>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. </p>
                </div>
                <div className='mt-10 flex max-md:flex-col px-5'>
                    <div className='md:w-9/12'>
                        <p className='font-medium'>Your Course</p>
                        <div className='md:border-r border-[#D9D9D9] md:pr-3'>
                            <h2 className='text-2xl font-medium'>Overview</h2>
                            <ul className=' list-disc pl-4 space-y-2 mt-5'>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                            </ul>
                        </div>
                        <div className='mt-7 md:pr-3'>
                            <h2 className='text-2xl font-medium'>What you'll learn</h2>
                            <ul className=' list-disc pl-4 space-y-2 mt-5'>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                                <li>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur </li>
                            </ul>
                        </div>
                    </div>
                    <div className='md:w-3/12 flex max-md:flex-row max-md:flex-wrap flex-col gap-5 md:pl-4 pt-5'>
                        <div className=' flex gap-x-5'>
                            <img src={img1} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>16 Weeks</p>
                                <p className=''>Duration</p>
                            </div>
                        </div>
                        <div className=' flex gap-x-5'>
                            <img src={img2} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>4 Modules</p>
                                <p className=''>Online</p>
                            </div>
                        </div>
                        <div className=' flex gap-x-5'>
                            <img src={img3} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>Diploma</p>
                                <p className=''>Certification</p>
                            </div>
                        </div>
                        <div className=' flex gap-x-5'>
                            <img src={img4} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>32 Lessons</p>
                                <p className=''>Plus toolkit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:w-4/12'>
                <div className='bg-white p-2 rounded-xl shadow-xl flex flex-col gap-y-5'>
                    <div className='rounded-xl overflow-hidden relative'>
                        <img draggable={false} src={img5} alt='' className='w-full aspect-[16/9] object-cover' />
                        <h3 className='text-2xl whitespace-nowrap font-semibold text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>Live/Offline Classes</h3>
                    </div>
                    <div className='text-center'>
                        <p className='text-3xl font-semibold text-[#0C3C82]'>
                            <span className='text-black text-lg'>$</span>
                            100
                        </p>
                        <p>Free for your whole team</p>
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
                    >Book Now</Button>
                </div>
            </div>
        </div>
    );
}

export default OnlineClasses;
