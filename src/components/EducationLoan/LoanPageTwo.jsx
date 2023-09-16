import React, { useState } from 'react';
import BankingPart from './BankingPart';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import img from '../../assets/images/education-page-two.png';
import loanImg from '../../assets/images/loan.png';
import interestImg from '../../assets/images/interest-rate.png';
import clockImg from '../../assets/images/fast-time.png';


export const AccordionItem = ({ qus, ans, index, open, setActiveIndex }) => {

    return <Accordion sx={{ '&:before': { height: '0px' } }} className='!border-0 !shadow-none' expanded={open} onChange={() => setActiveIndex(index)}>
        <AccordionSummary>
            <div className='flex justify-between gap-3 items-center w-full'>
                <h3 className={`text-[#170F49] duration-200 font-medium text-base ${open && '!text-[#0C3C82]'}`}>{qus}</h3>
                <span className={`text-[#170F49] duration-200 ${open && '!text-[#0C3C82] rotate-90'}`}>
                    <KeyboardArrowRight fontSize='medium' color='inherit' />
                </span>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <p className='text-sm text-[#6F6C90] whitespace-pre-line'>{ans}</p>
        </AccordionDetails>
    </Accordion>
}


const LoanPageTwo = () => {

    // states
    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        {
            qus: "What does an Overseas Education Loan cover?",
            ans: "The Overseas Education Loan mostly covers tuition fees, living and accommodation expenses, cost of books, cost of commuting etc",
        },
        {
            qus: "How much loan can one can get for education overseas?",
            ans: "The maximum loan amount for Overseas Education ranges from 20 lakhs to 1.5 crore. ",
        },
        {
            qus: "What can be the rate of interest?",
            ans: "Overseas Education Loan interest rates vary from 9% to 14% depending on the kind of financial institution. Rate of interest at Nationalised Banks is usually 1% to 2.5% lower than Private banks and NBFCs.",
        },
        {
            qus: "When can we apply for Overseas Education?",
            ans: "You can apply for education loan on receipt of offer letter from the University. However, if you are planning to take an education loan it would be better to enquire about the process and start the required documentation beforehand.",
        },
        {
            qus: "When and how is the loan disbursed?",
            ans: "Education loan disbursement means actual release of funds. The disbursement is done after the loan has been sanctioned. Banks do give their share in many cases before the student receives the visa, whenever student is required to pay a part of tuition fee to the University for release of the final offer letter. Thereafter, once the student receives the visa, banks release the education loan in instalments semester wise. ",
        },
        {
            qus: "Can we try for a loan even if we don’t have property or assets?",
            ans: "Most educational loans are unsecured loans which are good options for students who lack the assets or collaterals essential to obtain a secured loan. Obtaining an unsecured loan rests solely on your creditworthiness.",
        },
        {
            qus: "Which financial institutions offer unsecured loans and how much loan amount can we get through these loans?",
            ans: "Unsecured Loan is offered by nationalised banks, private banks as well as NBFCs. Private Banks and NBFCs offer up to 45 lakhs whereas nationalised banks provide unsecured loans only up to 7.5 lakhs.",
        },
        {
            qus: "What are the benefits of unsecured loans?",
            ans: `•	Non Collateral Loans up to 35 – 45 Lakhs \n
                  •	Loan Sanction available before admissions on the basis of GRE / TOEFL / IELTS Score \n
                  •	Pre Visa Disbursal for USA, Germany & amp; other European Countries \n
                  •	No EMI until graduation instead only small touch payments \n
                  •	Zero Margin money \n
                  •	100 % Education Finance \n
                  •	Weight - age given to Academic Merit and Parents Annual Income \n
                  •	Top up loans available \n
                  •	No pre - payment penalty \n
                  •	Flexible Repayment Options \n
                  •	Fast online, paperless process \n
                  •	Doorstep Service
                  `,
        },
    ];

    function importAll(r) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('../../assets/NewDesign/Bank logos', false, /\.(png|jpe?g|svg)$/));


    return (
        <div className='w-full gap-10 mt-10 flex flex-col'>
            <div className='flex max-md:flex-col gap-5'>
                <div className='md:w-1/2'>
                    <div className='flex flex-col items-center gap-10'>
                        <div className='mx-auto w-[200px]'>
                            <img src={img} alt='' className='w-full h-auto' />
                        </div>
                        <div className='md:w-3/4 max-md:px-5'>
                            <h1 className='text-2xl text-center font-semibold text-[#001E43]'>It looks like your chances of getting a loan are high*</h1>
                            <p className='text-[#00000099] text-center font-normal mt-2'>Our loan expert will connect with you shortly</p>
                        </div>
                        <div className='grid max-sm:grid-cols-1 w-full grid-cols-3 gap-3'>
                            <div className='flex flex-col justify-between gap-1 bg-white max-sm:py-7 p-3 rounded-2xl shadow-lg'>
                                <img src={loanImg} alt="" className='w-auto h-auto mx-auto' />
                                <div className='flex flex-col gap-1 items-center'>
                                    <p className='text-normal text-sm max-sm:text-base text-center'>Loan amount upto </p>
                                    <h2 className='text-xl max-sm:text-2xl font-bold text-center'>$ 1.5 Crore</h2>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between gap-1 bg-white max-sm:py-7 p-3 rounded-2xl shadow-lg'>
                                <img src={interestImg} alt="" className='w-auto h-auto mx-auto' />
                                <div className='flex flex-col gap-1 items-center'>
                                    <p className='text-normal text-sm max-sm:text-base text-center'>Interest rate starting</p>
                                    <h2 className='text-xl max-sm:text-2xl font-bold text-center'>9%</h2>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between gap-1 bg-white max-sm:py-7 p-3 rounded-2xl shadow-lg'>
                                <img src={clockImg} alt="" className='w-auto h-auto mx-auto' />
                                <div className='flex flex-col gap-1 items-center'>
                                    <p className='text-normal text-sm max-sm:text-base text-center'>Minimum processing time</p>
                                    <h2 className='text-xl max-sm:text-2xl font-bold text-center'>7 Days</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className='flex justify-center mt-4'>
                    <div className='w-full'>
                        <div className='text-center mt-8'>
                            <h1 className='text-xl md:text-3xl font-bold mx-auto text-[#001E43] w-fit relative'>Our Banking Partners</h1>
                        </div>
                        <div className='flex flex-wrap'>
                            {/* <BankingPart /> */}
                            {Array.isArray(images) && images.map((image, index) =>
                                <div className={` ${index === 0 ? " sm:hidden " : "  "} w-[calc(100%/4)] sm:w-[calc(100%/5)] my-3 flex justify-center items-center`}>
                                    <img draggable={false} src={image} className='px-2 sm:px-3' alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                </div>
                <div className='md:w-1/2'>
                    <div className='w-full bg-white rounded-[1.2rem] shadow-lg max-sm:px-2 max-sm:py-5 py-7 px-7'>
                        {data.map((item, index) => <AccordionItem
                            key={index}
                            index={index}
                            open={Boolean(activeIndex === index)}
                            setActiveIndex={setActiveIndex}
                            {...item}
                        />
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default LoanPageTwo;
