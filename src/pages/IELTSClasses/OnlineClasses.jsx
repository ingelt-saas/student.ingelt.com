import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { Button, CircularProgress, Modal, Box} from "@mui/material";
import pay4999Img from '../../assets/paymentQR/4999.png'


const OnlineClasses = () => {

    const navigate = useNavigate();
    const [search] = useSearchParams();
    const [openPaymentQr, setOpenPaymentQr] = useState(false);


    // context 
    const { student } = useContext(StudentContext);

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
            // studentFetch();
            window.location.pathname = '/institute';
            // navigate('', { replace: true });
        } catch (err) {
            console.error(err);
        }
    }

    // create a order
    const createOrder = async (e) => {
        e.target.disabled = true;
        try {
            const res = await paymentApi.createIntent({ paymentFor: 'classes' });
            if (res.data) {
                window.location = res.data.payment_request.longurl;
            }
        } catch (err) {
            console.error(err);
        } finally {
            e.target.disabled = false;
        }
    }

    useEffect(() => {
        if (search.get('payment') === 'success' && search.get('amount')) {
            (async () => {
                try {
                    await paymentApi.paymentSuccess({
                        transactionId: '',
                        amount: search.get('amount'),
                        invoiceDate: moment(new Date()).format('ll')
                    });
                    navigate('/ielts-classes/online-classes', { replace: true });
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [search]);

    if (search.get('payment') && search.get('amount')) {
        return <div className="flex justify-center py-20">
            <CircularProgress sx={{ '& circle': { stroke: '#0C3C82' } }} />
        </div>
    }

    return (
        <div className='flex max-md:flex-col gap-6'>
            <div className='md:w-8/12'>
                <div className='py-5 px-5 max-md:text-center max-md:px-3 rounded-3xl bg-[#0C3C82] shadow-xl'>
                    <h1 className='text-2xl font-bold text-white'>Online IELTS Classes</h1>
                    <p className='text-white mt-3'>IELTS preparation with British Council Certified Expert</p>
                </div>
                <div className="md:hidden max-md:mt-5">
                    <div className='bg-white p-2 rounded-xl shadow-xl flex flex-col gap-y-5'>
                        <div className='rounded-xl overflow-hidden relative'>
                            <img draggable={false} src={img5} alt='' className='w-full aspect-[16/9] object-cover' />
                            <h3 className='text-2xl whitespace-nowrap font-semibold text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>Online IELTS Classes</h3>
                        </div>
                        {/* <div className='text-center'>
                            <p className='text-3xl font-semibold text-[#0C3C82]'>
                                <span className='text-black text-lg'>₹</span>
                                {student?.classFee}
                            </p>
                            <p>Start your IELTS preparation</p>
                        </div> */}
                        <div className='text-center'>
                            <p className='text-xl font-semibold text-[#0C3C82]'>
                                <span className='text-black text-lg'>₹</span>
                                6999 /-
                                <del className='ml-3 text-black text-lg'>₹ 14999 /-</del>
                                
                            </p>
                            <p>Start your IELTS preparation</p>
                        </div>
                        <Button
                            variant='contained'
                            className={'!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'}
                            sx={{
                                backgroundColor: '#0C3C82',
                                '&:hover': {
                                    backgroundColor: '#0C3C82'
                                }
                            }}
                            onClick={createOrder}
                        >Book Your Seat</Button>
                        {/* <RazorPay
                        paymentFor={'classes'}
                        description={''}
                        buttonClass={'!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'}
                        successHandler={onlineClassesEnrollHandler}
                    >Book Your Seat</RazorPay> */}

                    </div>
                </div>
                <div className='mt-10 flex max-md:flex-col-reverse max-md:gap-5 px-5'>
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
                    <div className='md:w-3/12 flex max-md:flex-row max-md:flex-wrap flex-col gap-5 md:pl-4 md:pt-5'>
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
            <div className='md:w-4/12 max-md:hidden'>
                <div className='bg-white p-2 rounded-xl shadow-xl flex flex-col gap-y-5'>
                    <div className='rounded-xl overflow-hidden relative'>
                        <img draggable={false} src={img5} alt='' className='w-full aspect-[16/9] object-cover' />
                        <h3 className='text-2xl whitespace-nowrap font-semibold text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>Online IELTS Classes</h3>
                    </div>
                    <div className='text-center'>
                        <p className='text-3xl font-semibold text-[#0C3C82]'>
                            <span className='text-black text-lg'>₹</span>
                            6999 /-
                            <del className='ml-3 text-black text-lg'>₹ 14999 /-</del>
                            
                        </p>
                        <p>Start your IELTS preparation</p>
                    </div>
                    <Button
                        variant='contained'
                        className={'!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'}
                        sx={{
                            backgroundColor: '#0C3C82',
                            '&:hover': {
                                backgroundColor: '#0C3C82'
                            }
                        }}
                        onClick={()=>setOpenPaymentQr(true)}
                    >Book Your Seat</Button>

                    <Modal
                        open={openPaymentQr}
                        onClose={()=>setOpenPaymentQr(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 350,
                            bgcolor: 'background.paper',
                            borderRadius: 6,
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <img src={pay4999Img} alt="payment qr"/>
                        </Box>
                        </Modal>
                    {/* <RazorPay
                        paymentFor={'classes'}
                        description={''}
                        buttonClass={'!capitalize w-full !rounded-b-xl !rounded-t-md !py-3'}
                        successHandler={onlineClassesEnrollHandler}
                    >Book Your Seat</RazorPay> */}

                </div>
            </div>
        </div >
    );
}

export default OnlineClasses;
