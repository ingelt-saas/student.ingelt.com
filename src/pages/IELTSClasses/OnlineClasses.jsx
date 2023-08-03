import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// assets
import img1 from "../../assets/images/calendar.svg";
import img2 from "../../assets/images/course.svg";
import img3 from "../../assets/images/graduated.svg";
import img4 from "../../assets/images/online-learning (1) 1.svg";
import img5 from "../../assets/images/online-classes.png";
// import { Button } from "@mui/material";
// import StripeElements from "../../components/Stripe/StripeElements";
import RazorPay from "../../components/RazorPay/RazorPay";
import paymentApi from "../../api/payment";
import { StudentContext } from "../../contexts";

const OnlineClasses = () => {

    const navigate = useNavigate();
    // context 
    const { studentFetch } = useContext(StudentContext);

    const data1 = [
        "Types of Sentences",
        "Formal vs Informal Expressions",
        'Tenses',
        "International Phonetic Alphabet",
        "Modals",
        "Techniques to speak fluently",
        "Listening Drill",
        "Techniques to improve vocabulary",
        "Idioms and Phrases",
        "Homophones",
        "Basics of Writing Skills",
        "Pronunciation Drill"
    ];

    const data2 = [
        "Listening Drill for fluency",
        "Reading Comprehension Tricks",
        "Non - Finite Verbs",
        "Contextual Vocabulary",
        "Article Reading",
        "Voice-Active and Passive",
        "Narration - Direct and Indirect",
        "Determiners",
        "Advance Listening Drill",
        "Advance Writing Techniques",
        "Advance Speaking Techniques",
        "Advance Reading Techniques"
    ];

    const onlineClassesEnrollHandler = async (response) => {
        const paymentId = response.razorpay_payment_id;
        try {
            await paymentApi.paymentSuccess({
                transactionId: paymentId,
                amount: response?.amount || 0,
                invoiceDate: moment(new Date()).format('ll')
            });
            studentFetch();
            navigate('/institute', { replace: true });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='flex max-md:flex-col gap-6'>
            <div className='md:w-8/12'>
                <div className='py-5 px-5 rounded-3xl bg-[#0C3C82] shadow-xl'>
                    <h1 className='text-2xl font-bold text-white'>Live Classes</h1>
                    <p className='text-white mt-3'>IELTS preparation with British Council Certified Expert</p>
                </div>
                <div className='mt-10 flex max-md:flex-col px-5'>
                    <div className='md:w-9/12'>
                        <p className='font-medium'>Your Course</p>
                        <div className='md:border-r border-[#D9D9D9] md:pr-3'>
                            <h2 className='text-2xl font-medium'>Overview</h2>
                            <ul className=' list-disc pl-4 space-y-2 mt-5'>
                                <li>Streamlined classroom procedures improve efficiency and precision</li>
                                <li>IELTS sections tests and practise tests to help you prepare for the IELTS exam</li>
                                <li>In our doubt-clearing sessions, we provide personalised attention</li>
                                <li>Dedicated student success manager</li>
                                <li>Mock tests and study material</li>
                            </ul>
                        </div>
                        <div className='mt-7 md:pr-3'>
                            <h2 className='text-2xl font-medium'>What you'll learn</h2>
                            <div className='mt-5 max-md:text-sm max-lg:flex-col flex items-start gap-y-2 gap-x-5'>
                                <ul className='lg:w-1/2 list-disc pl-4 space-y-2'>
                                    {data1.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                                <ul className='lg:w-1/2 list-disc pl-4 space-y-2'>
                                    {data2.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-3/12 flex max-md:flex-row max-md:flex-wrap flex-col gap-5 md:pl-4 pt-5'>
                        <div className=' flex gap-x-5'>
                            <img src={img1} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>2 Months</p>
                                <p className=''>Duration</p>
                            </div>
                        </div>
                        <div className=' flex gap-x-5'>
                            <img src={img2} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>Doubt</p>
                                <p className=''>Clearing Sessions</p>
                            </div>
                        </div>
                        <div className=' flex gap-x-5'>
                            <img src={img3} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>Certificate</p>
                                <p className=''>of Completion</p>
                            </div>
                        </div>
                        <div className=' flex gap-x-5'>
                            <img src={img4} alt='' className='w-8 h-auto' />
                            <div className='text-[#0C3C82] text-sm'>
                                <p className='font-semibold'>40 Lessons</p>
                                <p className=''>Plus toolkits</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:w-4/12'>
                <div className='bg-white p-2 rounded-xl shadow-xl flex flex-col gap-y-5'>
                    <div className='rounded-xl overflow-hidden relative'>
                        <img draggable={false} src={img5} alt='' className='w-full aspect-[16/9] object-cover' />
                        <h3 className='text-2xl whitespace-nowrap font-semibold text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>Live / Online Classes</h3>
                    </div>
                    <div className='text-center'>
                        <p className='text-3xl font-semibold text-[#0C3C82]'>
                            <span className='text-black text-lg'>₹</span>
                            4999
                        </p>
                        <p>Start your IELTS preparation</p>
                    </div>
                    <RazorPay
                        paymentFor={'classes'}
                        description={''}
                        buttonClass={'!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'}
                        successHandler={onlineClassesEnrollHandler}
                    >Book Your Seat</RazorPay>

                </div>
            </div>
        </div>
    );
}

export default OnlineClasses;
