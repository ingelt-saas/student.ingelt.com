import React from 'react';
import { AccordionItem } from '../EducationLoan/LoanPageTwo';
import { useState } from 'react';

const VisaFAQ = () => {

    // state
    const [activeIndex, setActiveIndex] = useState(0);

    const data = [
        {
            qus: "What are the different types of visas?",
            ans: `There are many different types of visas, each with its own purpose. Some of the most common types of visas include: \n
                        * Tourist visa: Allows you to travel to a country for tourism purposes.
                        * Business visa: Allows you to travel to a country for business purposes.
                        * Student visa: Allows you to study in a country.
                        * Work visa: Allows you to work in a country.
                        * Transit visa: Allows you to pass through a country without staying there.
                        `,
        },
        {
            qus: "What are the requirements for applying for a visa?",
            ans: `The requirements for applying for a visa vary depending on the type of visa you are applying for and the country you are applying to. However, some common requirements include: \n
                        * A valid passport
                        * A completed visa application form
                        * Proof of travel arrangements
                        * Proof of financial support
                        * Proof of a visa waiver (if applicable)
                    `,
        },
        {
            qus: "How long does it take to get a visa?",
            ans: `The processing time for a visa varies depending on the country you are applying to. However, it can take anywhere from a few weeks to several months.`,
        },
        {
            qus: "What happens if my visa application is denied?",
            ans: `If your visa application is denied, you will not be able to travel to the country you applied to. You may be able to appeal the decision, but the chances of success are slim.`,
        },
        {
            qus: "What should I do if I have questions about the visa application process?",
            ans: `The best way to get answers to your questions about the visa application process is to contact the embassy or consulate of the country you are applying to.`,
        },
        {
            qus: "What are the documents I need to apply for a visa?",
            ans: `The documents you need to apply for a visa will vary depending on the type of visa you are applying for and the country you are applying to. However, some common documents include: \n
                    * A valid passport
                    * A completed visa application form
                    * Proof of travel arrangements (i.e., flight tickets, hotel reservations)
                    * Proof of financial support (i.e., bank statements, employment letter)
                    * Proof of a visa waiver (if applicable)
                    * Other documents, such as a letter of invitation, medical certificate, or police clearance certificate, may also be required.
                    `,
        },
        {
            qus: "How do I book an appointment for a visa interview?",
            ans: `You can book an appointment for a visa interview through the website of the embassy or consulate of the country you are applying to. The process for booking an appointment will vary depending on the country.`,
        },
        {
            qus: "What is the dress code for a visa interview?",
            ans: `The dress code for a visa interview will vary depending on the country. However, it is generally recommended to dress in business attire. This shows that you are taking the interview seriously and that you respect the authority of the consular officer.`,
        },
        {
            qus: "What questions can I expect to be asked during a visa interview?",
            ans: `The questions you will be asked during a visa interview will vary depending on the type of visa you are applying for and the country you are applying to. However, some common questions include: \n
                    * Why do you want to visit this country?
                    * What are your plans for your stay?
                    * How long will you be staying?
                    * Do you have any family or friends in this country?
                    * What is your occupation?
                    * What is your income?
                    * Have you ever been denied a visa?
                    * Have you ever been arrested?
                    `,
        },
        {
            qus: "What happens if I am late for my visa interview?",
            ans: `If you are late for your visa interview, it is possible that your application will be denied. It is important to arrive on time for your interview and to be prepared to answer the questions that will be asked.`,
        },
        {
            qus: "What happens if a visa application is refused?",
            ans: `If your visa application is denied, you will not be able to travel to the country you applied to. You may be able to appeal the decision, but the chances of success are slim. If your visa is denied, you should contact the embassy or consulate of the country you applied to to find out why your application was denied and what you can do next.`,
        }
    ];

    return (
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
    );
}

export default VisaFAQ;
