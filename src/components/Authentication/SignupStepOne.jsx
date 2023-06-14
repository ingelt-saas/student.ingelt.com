import { Modal } from '@mui/material';
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import queryApi from "../../api/query";
// images
import { TaskAlt } from '@mui/icons-material';

//Education images
import funding from "../../assets/NewDesign/loan icon/funding.svg";
import sanction from "../../assets/NewDesign/loan icon/quick loan.svg";
import endtoend from "../../assets/NewDesign/loan icon/end to end.svg";
import ROI from "../../assets/NewDesign/loan icon/lowest-price.svg";
import preAdmission from "../../assets/NewDesign/loan icon/pre admission loan.svg";
import country from "../../assets/NewDesign/loan icon/country specific.svg";
import preVisa from "../../assets/NewDesign/loan icon/pre visa.svg";
import score from "../../assets/NewDesign/loan icon/score based.svg"
import BankingPart from './BankingPart';


const SignupStepOne = ({ img, open, text, formData, setFormData, handleClose }) => {

    const icons = [
        {
            img: funding,
            text: "100% Funding",
        },
        {
            img: sanction,
            text: "Quick Loan Sanction",
        },
        {
            img: endtoend,
            text: "Education Loan Assistance",
        },
        {
            img: ROI,
            text: "Lowest Rate of Interest",
        },
        {
            img: preAdmission,
            text: "Pre Admission Loan",
        },
        {
            img: country,
            text: "Country Specific Loan Counselling",
        },
        {
            img: preVisa,
            text: "Pre Visa Disbursal",
        },
        {
            img: score,
            text: "Score Based Loan Structuring",
        }
    ]

    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    // console.log({...formData});

    const handleQuery = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            phoneNo: phone
        }
        await setFormData({ ...formData, name: name, phoneNo: phone });
        console.log(formData);
        try {
            if (text === "Free IELTS Classes") {
                await queryApi.ieltsPrepQuery(data);
            } else if (text === "Centralized Community") {
                await queryApi.communityQuery(data);
            } else if (text === "University Shortlisting") {
                await queryApi.universityQuery({ ...formData, ...data });
            } else if (text === "Visa Application") {
                await queryApi.visaQuery({ ...formData, ...data });
            } else if (text === "Find IELTS Institutes") {
                await queryApi.findIELTSQuery({ ...formData, ...data });
            } else if (text === "Education Loan") {
                await queryApi.loanQuery({ ...formData, ...data });
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <div className="flex flex-col md:w-[60vw] lg:w-[70vw] 2xl:w-[60vw] w-[95vw] bg-[#F4F4F4] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6 2xl:p-10">
                    {text === "Education Loan" && (
                        <div className="flex mb-10 flex-wrap gap-x-2 2xl:gap-x-2 xl:gap-x-3 gap-y-3 items-center justify-center w-full max-lg:hidden ">
                            {icons.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center justify-start rounded-xl w-56 px-5 py-3 bg-[#EFEFEF] border-2 border-[rgba(0, 30, 67, 0.3)]">
                                        <img src={item.img} className="w-10 h-10 mr-
                                3" alt="icon" />
                                        <p className="font-semibold text-sm ml-3">{item.text}</p>
                                    </div>
                                )
                            })}
                        </div>

                    )}
                    <div className="flex">
                        {/* Internal Div 1*/}
                        <div className="lg:flex-[0.4] flex flex-col w-full pr-5">
                            {/* Steps */}
                            <div className="flex items-center justify-between px-2 pb-5 2xl:pb-10">
                                <div className="flex items-center justify-center">
                                    <div className="xl:p-3 p-2 text-xs w-1 h-1 flex items-center justify-center rounded-full bg-black text-white">1</div>
                                    <p className="ml-1">Start</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="xl:p-3 p-2 text-xs w-1 h-1 flex items-center justify-center rounded-full bg-gray-400 text-white">2</div>
                                    <p className="ml-1 text-gray-400">Fill Detail</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <TaskAlt className="text-gray-400" />
                                    <p className="ml-1 text-gray-400">Dashboard</p>
                                </div>
                            </div>
                            {/* Form */}
                            <form onSubmit={handleQuery}
                                className="flex flex-col items-center md:items-start h-full justify-center">
                                <p className="xl:text-3xl text-xl font-bold">
                                    {text}</p>
                                <input type="text" required
                                    value={name}
                                    placeholder="Enter Your Full Name"
                                    className="rounded-xl w-full px-4 py-3 shadow-xl mt-5 focus:outline-none"
                                    onChange={
                                        (e) => setName(e.target.value)
                                    } />
                                <PhoneInput inputProps={
                                    {
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true
                                    }
                                }
                                    country={'in'}
                                    value={phone}
                                    placeholder="Phone Number"
                                    onChange={
                                        (phone) => setPhone(phone)
                                    }
                                    containerClass="mt-5"
                                    inputClass="PhoneInput"
                                    inputStyle={
                                        {
                                            width: "100%",
                                            padding: "0.75rem 3.3rem",
                                            borderRadius: "0.75rem",
                                            outline: "none",
                                            border: "none",
                                            boxShadow: "0px 7px 29px rgba(100, 100, 111, 0.2)"
                                        }
                                    } />
                                <button type="submit"
                                    className="bg-[#001E43] mt-5 w-full py-2 rounded-lg text-white font-semibold">
                                    Continue
                                </button>
                            </form>
                            <div className="mt-7">
                                <p className="text-xs text-center">By continuing, you agree to our Term of services & Privacy policy</p>
                            </div>
                        </div>
                        {/* Internal Div 2*/}
                        <div className="flex-[0.6] flex items-center justify-center max-lg:hidden">
                            <img src={img}
                                alt=""
                                className="w-[28rem]" />
                        </div>
                    </div>
                    {text === "Education Loan" && (
                        <BankingPart />
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default SignupStepOne;