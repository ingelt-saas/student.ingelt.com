import { Button } from '@mui/material';
import React, { useState } from 'react';
import { WhatsApp } from '@mui/icons-material';
import { IoShareSocialSharp } from 'react-icons/io5';
import headerImg from '../../assets/images/referral-header..png';
import ReferralFAQ from '../../components/Referral/ReferralFAQ';
import StudentJourney from '../../components/Referral/StudentJourney';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Modal, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';


const Referral = () => {

    const stepData = [
        "Share your unique referral link with your network. Or, you can enter student details via a form on your referral page.",
        "Get a notification once a student enrol with InGelt Board",
        "Track the student journey till he/she gets an admission offer and pays a deposit fee to the university of his/her choice",
        // "Get an Amazon voucher worth ₹500 once the student completes their application to at least one university",
        "Receive the reward payment as soon as the student pays the deposit fee to the university of his/her choice"
    ];

    function copyToClipboard() {
        navigator.clipboard.writeText("https://student.ingelt.com/");
        toast.success('Share link copied to your clipboard');
    }
    const [userDetailForm, setUserDetailForm] = useState(false);
    function handleUserDetailDataSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            
            {/* header start */}
            <div className='flex max-md:flex-col gap-5'>
                <div className={`rounded-[1.2rem] flex justify-between relative items-center max-md:w-full bg-white md:w-[70%] shadow-xl md:aspect-[16/4]`}>
                    <div className="px-7 flex flex-col max-md:items-center max-md:text-center gap-y-1 max-md:py-7 max-sm:px-5 max-md:w-full">
                        <h1 className="text-2xl font-bold text-[#0C3C82]">Earn upto ₹10k per referral</h1>
                        <p className="font-medium text-black opacity-75">Transform the lives of future global citizens by gifting them the InGelt Board experience</p>
                        <p className="font-medium text-[#1E8F3D]">1000+ people have got rewards</p>
                    </div>
                    <div className="overflow-hidden pr-3 max-w-[30%] max-md:hidden">
                        <img
                            draggable={false}
                            src={headerImg}
                            alt="Page Header"
                            className={`max-h-40 max-w-fit mix-blend-darken`}
                            style={{ transform: 'rotateY(180deg)' }}
                        />
                    </div>
                </div>
                <div className={`rounded-[1.2rem] flex flex-col gap-5 justify-between max-md:w-full bg-white md:w-[30%] shadow-xl p-5 max-sm:px-3`}>
                    <h2 className='text-xl font-semibold text-[#0C3C82]'>Share a link to invite or fill the details of your friend</h2>
                    <div className='flex justify-between max-sm:gap-4 gap-5'>
                        {/* <Link to="//wa.me/+919205762929" className=''> */}
                            <Button
                                variant='outlined'
                                className='!font-medium !capitalize !text-sm !rounded-xl !border-[#0C3C82] !text-[#0C3C82] !py-2.5 !flex-[0.5] !border-2'
                                startIcon={<WhatsApp className='!w-5 !h-5' />}
                                onClick={()=>setUserDetailForm(true)}
                            >Whatsapp</Button>
                        {/* </Link> */}
                        <Button
                            onClick={copyToClipboard}
                            variant='outlined'
                            className='!font-medium !capitalize !text-sm !rounded-xl !border-[#0C3C82] !text-[#0C3C82] !py-2.5 !flex-[0.5] !border-2'
                            startIcon={<IoShareSocialSharp strokeWidth={2} className='!w-5 !h-5' />}
                        >Others</Button>
                    </div>
                </div>
            </div>
            {/* header end */}

            <div className='mt-10'>
                {/* step */}
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl sm:text-3xl text-[#001E43] font-bold mb-4'>How does it work</h1>
                    {stepData.map((step, index) => <div key={index} className='flex items-center gap-5'>
                        <span className='text-[#001E43] text-lg font-bold w-16'>Step {index + 1}</span>
                        <div className='px-5 py-3 rounded-md bg-white shadow-md flex-1 relative'>
                            <p className='font-medium text-[#00000099] max-md:text-sm'>{step}</p>
                            <svg className='absolute top-1/2 right-full -translate-y-1/2 w-6 h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M24 0V24L0 10.5L24 0Z" fill="white" />
                            </svg>
                        </div>
                    </div>)}
                </div>
            </div>

            <div className='rounded-[1.2rem] bg-[#FFFAE0] px-4 md:px-7 py-6 md:py-10 my-10 shadow-lg'>
                <h3 className='text-xl font-semibold text-[#00285A] mb-5'>Note</h3>
                <ul className='pl-4 list-disc text-sm sm:text-base sm:ml-4'>
                    <li>If the referred student is already registered with us, he/she will not be considered as a referral.</li>
                    <li>The student's phone number will be used as a unique identifier for processing referrals.</li>
                    <li>We will not be share details regarding student's study preferences or any other academic/personal information.</li>
                </ul>
            </div>

            <StudentJourney />

            {/* faq area */}
            <ReferralFAQ />

            <Modal
                open={userDetailForm}
                onClose={() => {
                    setUserDetailForm(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 350,
                    // height: 350,
                    bgcolor: 'background.paper',
                    borderRadius: 6,
                    boxShadow: 24,
                    p: 4
                }}>
                    <form onSubmit={handleUserDetailDataSubmit}>

                        <div className='font-medium md:text-base lg:text-lg'>
                            Fill the Details
                        </div>
                        <div className='mt-6'>
                            <FormControl size='small' variant="outlined" sx={{margin: '6px 0px'}}>
                                <InputLabel className='!text-sm' htmlFor="outlined-adornment-name">Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-name"
                                    label="Name"
                                    className='!text-sm'
                                    
                                />
                            </FormControl>
                            <FormControl size='small' variant="outlined" sx={{margin: '6px 0px'}}>
                                <InputLabel className='!text-sm' htmlFor="outlined-adornment-phone-number">Phone Number</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-phone-number"
                                    label="Phone number"
                                    className='!text-sm'
                                    
                                />
                            </FormControl>
                            <FormControl size='small' variant="outlined" sx={{margin: '6px 0px'}}>
                                <InputLabel className='!text-sm' htmlFor="outlined-adornment-Email">Email ID</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-Email"
                                    label="Email"
                                    className='!text-sm'
                                    
                                />
                            </FormControl>
                            <FormControl size='small' variant="outlined" sx={{margin: '6px 0px'}}>
                                <InputLabel className='!text-sm' htmlFor="outlined-adornment-preferred-course">Preferred Course</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-preferred-course"
                                    label="preferred-course"
                                    className='!text-sm'
                                    
                                />
                            </FormControl>
                            <FormControl size='small' variant="outlined" sx={{margin: '6px 0px'}}>
                                <InputLabel className='!text-sm' htmlFor="outlined-adornment-preferred-country">Preferred Country</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-preferred-country"
                                    label="preferred-country"
                                    className='!text-sm'
                                />
                            </FormControl>
                        </div>

                        <button type='submit' className="mt-4 hover:bg-[#00285A] hover:text-white text-lg bg-transparent duration-300 border-2 border-[#00285A] text-[#00285A] py-1 max-md:text-base px-5 min-w-fit rounded-2xl justify-around flex items-center">
                            <p className='text-lg font-semibold flex items-center justify-around'>
                                <strong className='text-sm md:text-base'>Submit </strong>
                                &nbsp; &nbsp;
                                <span className="w-6 h-6 border-1 rounded-full flex justify-center items-center bg-[#00285A] text-white"><ChevronRightIcon /></span>
                            </p>
                        </button>
                    </form>

                </Box>
            </Modal>
        </div>
    );
}

export default Referral;
