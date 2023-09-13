import React, { useState } from 'react';
import BankingPart from './BankingPart';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';


const AccordionItem = ({ qus, ans, index, open, setActiveIndex }) => {

    return <Accordion sx={{ '&:before': { height: '0px' } }} className='!border-0 !shadow-none' expanded={open} onChange={() => setActiveIndex(index)}>
        <AccordionSummary>
            <div className='flex justify-between items-center w-full'>
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


    return (
        <div className='w-full gap-10 mt-10 flex flex-col'>
            <div className='flex max-md:flex-col gap-5'>
                <div className='w-1/2'></div>
                <div className='w-1/2'>
                    <div className='w-full bg-white rounded-[1.2rem] shadow-lg py-7 px-7'>
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
            <div className='flex justify-center'>
                <div className='w-full md:max-w-[600px]'>
                    <BankingPart />
                </div>
            </div>
        </div>
    );
}

export default LoanPageTwo;
