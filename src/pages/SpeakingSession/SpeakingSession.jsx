import { CalendarMonth, StarRate, Twitter, WatchLater } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import headerImg from '../../assets/images/speaking-practice-header.png';
import { Link } from 'react-router-dom';
import StripeElements from '../../components/Stripe/StripeElements';
import sessionApi from '../../api/session';
import { toast } from 'react-toastify';

const PaymentModal = ({ open, close }) => {

    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        if (loading) {
            return;
        }
        close();
    }

    // payment success handler
    const successHandler = async (paymentIntent) => {
        setLoading(true);
        try {
            await sessionApi.create({ transactionId: paymentIntent.id, amount: paymentIntent.amount, speaker: 'american' });
            toast.success('You are booking a session');
            handleClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (<Modal open={open} onClose={handleClose} className='grid place-items-center'>
        <div className='sm:min-w-[400px] max-sm:w-[95vw] max-sm:px-2 bg-white rounded-xl shadow-2xl p-5 outline-none'>
            <h2 className='text-xl font-semibold text-center'>Payment For Session Booking</h2>
            <h6 className='text-5xl text-[#00000060] mt-4 font-medium text-center flex items-end justify-center gap-x-2'>
                <span className='text-2xl text-[#00000090]'>&#x20b9;</span>
                999
            </h6>
            <div>
                <StripeElements paymentFor={'session'} successHandler={successHandler} loading={setLoading} />
            </div>
        </div>
    </Modal>);
}


const SpeakingSession = () => {

    const [tab, setTab] = useState(0);
    const [paymentModal, setPaymentModal] = useState(false);

    const data = [
        "🌟Expert in conversational English",
        "🌟Grammar perfecting ",
        "🌟TESOL Certification, 4+ years of teaching experience ",
        "🌟Lived in China, Germany, Slovakia, Poland and currently living in Canada ",
        "🌟I can use Russian or Ukrainian in explaining during the classes",
        "🌟Patient, friendly, supportive and organized"
    ];

    return (
        <div className=''>
            <div className='flex gap-5'>
                <Box sx={
                    {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { md: "65%", xs: "100%" },
                        height: "20vh",
                        padding: "2rem",
                        backgroundColor: "white",
                        border: "1px solid white",
                        borderRadius: "2rem",
                        boxShadow: "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);"
                    }
                }>
                    <Box sx={
                        {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            // padding: '2rem 1rem 2rem 1rem',
                            width: { md: "50%", xs: "90%" }
                        }
                    }>
                        <Typography sx={
                            {
                                color: "rgba(0, 0, 0, 0.6);",
                            }

                        }>Start your</Typography>
                        <Typography sx={
                            {
                                fontWeight: "bold",
                                fontSize: "1.5rem"
                            }
                        }>Speaking Practice</Typography>

                    </Box>
                    <Box
                        sx={{
                            width: { md: "60%", xs: "100%" },
                            display: { xs: 'none', md: 'block' }
                            // padding: '0.3rem'
                        }}
                    >
                        <img
                            src={headerImg}
                            alt="library"
                            className={`relative md:bottom-5 ml-auto`}
                        />
                    </Box>

                </Box>

                <div className='flex-1'>
                    <div className='rounded-2xl bg-white shadow-2xl px-5 py-5'>
                        <h3 className='text-xl font-semibold text-[#0C3C82]'>Check scheduled session</h3>
                        <p className='my-3'>Lorem ipsum dolor set amet</p>
                        <Link to='/speaking-session/check-sessions'>
                            <Button
                                variant='contained'
                                className='!rounded-2xl !py-3 !px-10 text-white !capitalize'
                                sx={{
                                    backgroundColor: '#0C3C82',
                                    '&:hover': {
                                        backgroundColor: '#0C3C82'
                                    }
                                }}
                            >
                                Check Sessions
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex gap-x-5 mt-10'>
                <div className='w-5/12'>
                    <div className='bg-white rounded-xl px-5 py-5 shadow-xl'>
                        <span className='w-8 h-8 grid place-items-center rounded-full bg-[#1D9BF0] bg-opacity-20 text-[#1D9BF0]'>
                            <Twitter fontSize='small' />
                        </span>
                        <h2 className='text-2xl font-semibold my-2'>Join Twitter Space</h2>
                        <p className='text-base font-semibold'>Group discussion for improving English Speaking</p>
                        <div className='my-4'>
                            <span className='text-sm text-[#000000] font-medium opacity-40'>150 Already Booked</span>
                            <div className='mt-2 flex justify-between text-[#0C3C82] text-base font-medium'>
                                <span className='flex items-center gap-x-3'>
                                    <CalendarMonth />
                                    22.10.2023
                                </span>
                                <span className='flex items-center gap-x-3'>
                                    <WatchLater />
                                    1 h, 30 min
                                </span>
                            </div>
                        </div>
                        <ul className='space-y-1 mb-5 pl-3 list-disc text-[#000000] text-base opacity-70'>
                            <li>Lorem ipsum dolor sit amet, consectetur elit consectetur elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur elit consectetur elit</li>
                            <li>Lorem ipsum dolor sit amet, consectetur elit consectetur elit</li>
                        </ul>
                        <Button
                            variant='contained'
                            className='!rounded-2xl !py-3 !px-10 text-white !capitalize'
                            sx={{
                                backgroundColor: '#0C3C82',
                                '&:hover': {
                                    backgroundColor: '#0C3C82'
                                }
                            }}
                        >
                            Join for free
                        </Button>
                    </div>
                </div>

                <div className='w-7/12 bg-white rounded-xl px-5 py-5 shadow-lg'>
                    <div>
                        <div className='flex justify-between mx-auto mb-10 rounded-xl border-2 border-[#001E43] relative overflow-hidden z-10'>
                            <span className={`absolute w-1/2 h-full bg-[#001E43] top-0 ${tab ? 'left-1/2 rounded-l-lg' : 'left-0 rounded-r-lg'} -z-10 duration-200`}></span>
                            <button onClick={() => setTab(0)} className={`w-1/2 ${!tab ? 'text-white' : 'text-[#001E43]'} text-center z-20 font-medium py-2 duration-200`}>Indian Speaker</button>
                            <button onClick={() => setTab(1)} className={`w-1/2 ${tab ? 'text-white' : 'text-[#001E43]'} text-center z-20 font-medium py-2 duration-200`}>American Speaker</button>
                        </div>
                        <div className='mt-5 flex gap-x-5'>
                            <div className='w-4/12'>
                                <img src='https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' alt='' className='w-full object-cover aspect-[16/18] rounded-xl shadow-md' />
                                <h6 className='text-xl font-semibold text-center capitalize mt-3'>Brooklyn Simmons</h6>
                                <p className='text-center uppercase text-sm'>Professional Teacher</p>
                                <Button
                                    variant='contained'
                                    className='!rounded-2xl !py-3 !px-10 text-white !capitalize !mt-5'
                                    sx={{
                                        backgroundColor: '#0C3C82',
                                        '&:hover': {
                                            backgroundColor: '#0C3C82'
                                        }
                                    }}
                                    onClick={() => setPaymentModal(true)}
                                >
                                    Book Session
                                </Button>
                            </div>
                            <div className='w-8/12'>
                                <p className='text-sm font-medium'>✨Certified English Teacher (TESOL) with 5 years of experience✨</p>
                                <h6 className='text-xl font-semibold mt-4'>About Me</h6>
                                <p className='text-base uppercase'>WHY CHOOSE BROOKLYN?</p>
                                {data.map((item, index) => <p key={index} className='text-base'>{item}</p>)}

                                {/* teacher rating */}
                                <div className='mt-6 px-4 py-4 flex justify-between shadow-[0px_0px_14px_0px_#d1d1d1] rounded-xl'>
                                    <p className='flex flex-col items-center'>
                                        <span className='text-base font-medium text-[#FFD026] flex items-center gap-x-1'>
                                            <StarRate fontSize='small' />
                                            5.0
                                        </span>
                                        <span className='text-base font-medium text-[#00000099]'>Rating</span>
                                    </p>
                                    <p className='flex flex-col items-center'>
                                        <span className='text-base font-medium text-[#00000070]'>80</span>
                                        <span className='text-base font-medium text-[#00000099]'>Student</span>
                                    </p>
                                    <p className='flex flex-col items-center'>
                                        <span className='text-base font-medium text-[#00000070]'>100%</span>
                                        <span className='text-base font-medium text-[#00000099]'>Attendance</span>
                                    </p>
                                    <p className='flex flex-col items-center'>
                                        <span className='text-base font-medium text-[#00000070]'>100%</span>
                                        <span className='text-base font-medium text-[#00000099]'>Response</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* payment modal */}
            <PaymentModal open={paymentModal} close={() => setPaymentModal(false)} />
        </div>
    );
}

export default SpeakingSession;
