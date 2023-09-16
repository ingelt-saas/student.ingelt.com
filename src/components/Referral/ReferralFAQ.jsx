import React from 'react';
import { useState } from 'react';
import { AccordionItem } from '../EducationLoan/LoanPageTwo';

const ReferralFAQ = () => {

    // state
    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        {
            qus: "How many students can I refer?",
            ans: "There is no limit on the number of students you can refer.",
        },
        {
            qus: "Is there any upper limit on the reward money that I can earn?",
            ans: "As soon as the student pays the deposit fee to the university, we will send you an Amazon voucher worth 20,000 within 10 working days.",
        },
        {
            qus: "Should I be enrolled with Leverage Edu to refer a student?",
            ans: "No",
        },
        {
            qus: "How many days will it take for me to get my payment after the student has paid the deposit to a University?",
            ans: "You will get you payment within 7 working days.",
        },
        {
            qus: "What is deposit payment?",
            ans: "When a student receives an admission offer from a university, he / she is required to pay a certain percentage of fee as a deposit.This step ensures that the student has blocked his / her seat in their dream university.",
        },
        {
            qus: "What happens if the student referred by me is rejected by the university?",
            ans: "In this case you will not be eligible for the reward for deposit payment.",
        },
        {
            qus: "How is it possible for a student referred by me to be enrolled with you in advance?",
            ans: "Over 10 lakh prospective students visit InGelt Board websites each month.Your referral may have already registered with us.",
        },
        {
            qus: "What happens if two or more people refer the same student?",
            ans: "Depends on whose referral link was used by the student first.In case Person A sent a referral link to a student on Jan 1. Person B sent a referral link to the same student on Jan 2. If student used Person B's link, then Person B will get the reward payment.",
        },

    ];

    return (
        <div className='mt-10'>
            <h1 className='text-2xl sm:text-3xl text-[#001E43] font-bold mb-4'>FAQ’s</h1>
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
    );
}

export default ReferralFAQ;
