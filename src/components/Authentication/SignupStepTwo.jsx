import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TaskAlt } from '@mui/icons-material';
import { toast } from 'react-toastify';
import auth from '../../api/auth';

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
import Cookies from 'js-cookie';

const SignupStepTwo = ({
    img,
    open,
    text,
    formData,
    setFormData,
    handleClose
}) => {
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [error, setError] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');

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


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkEmail = await auth.emailCheck({ email: email.toLowerCase().trim() });
            if (checkEmail.status === 204) {
                setEmailError('Email already exists.');
            } else {
                setEmailError('');
                setFormData({
                    ...formData,
                    email: email,
                    password: password
                });
                const res = await auth.signUp({ ...formData, email: email, password: password });
                Cookies.set('student_auth_token', res?.data?.token, { expires: 7, domain: 'ingelt.com' });
                toast.success('Account created successfully.');
                window.location.href = 'https://student.ingelt.com';
            }
        } catch (err) {
            toast.error('Sorry! Something went wrong.');
        }
    };
    useEffect(() => {
        if ((password && confirmPassword) && (password !== confirmPassword)) {
            setError('Password does not match');
        }
        else {
            setError('');
        }
    }, [password, confirmPassword])

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
                        <div className="lg:flex-[0.4] flex flex-col w-full pr-5">
                            <div className="flex items-center justify-between px-2 pb-5 2xl:pb-10">
                                <div className="flex items-center justify-center">
                                    <div className="xl:p-3 p-2 text-xs w-1 h-1 flex items-center justify-center rounded-full bg-black text-white">
                                        1
                                    </div>
                                    <p className="ml-1">Start</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="xl:p-3 p-2 text-xs w-1 h-1 flex items-center justify-center rounded-full bg-black text-white">
                                        2
                                    </div>
                                    <p className="ml-1 text-black">Fill Detail</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <TaskAlt className="text-gray-400" />
                                    <p className="ml-1 text-gray-400">Dashboard</p>
                                </div>
                            </div>
                            <form onSubmit={onSubmit}
                                className="flex flex-col items-center md:items-start h-full justify-center">
                                <p className="xl:text-3xl text-xl font-bold">
                                    {text}</p>
                                <input type="email" placeholder="Enter Your Email" className="rounded-xl w-full px-4 py-3 shadow-xl mt-5 focus:outline-none"
                                    value={email}
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    } />
                                <input type="password" required placeholder="Enter Your Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$" title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" className="rounded-xl w-full px-4 py-3 shadow-xl mt-5 focus:outline-none"
                                    value={password}
                                    onChange={
                                        (e) => {
                                            setPassword(e.target.value);
                                        }
                                    } />
                                <input type="password" required placeholder="Confirm Your Password" className="rounded-xl w-full px-4 py-3 shadow-xl mt-5 focus:outline-none"
                                    value={confirmPassword}
                                    onChange={
                                        (e) => {
                                            setConfirmPassword(e.target.value);
                                        }
                                    } /> {
                                    error && (
                                        <span className="text-red-500 block text-left pl-2 mt-1 text-xs">
                                            {error}</span>
                                    )
                                }
                                {
                                    emailError && (
                                        <span className="text-red-500 block text-left pl-2 mt-1 text-xs">
                                            {emailError}</span>
                                    )
                                }
                                <div className=" mt-4">
                                    <p className="text-xs text-center">Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
                                </div>
                                <button type="submit"
                                    disabled={
                                        password && password !== confirmPassword
                                    }
                                    className="bg-[#001E43] disabled:bg-gray-400 mt-5 w-full py-2 rounded-lg text-white font-semibold">
                                    Continue
                                </button>
                            </form>
                        </div>
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
    );
};

export default SignupStepTwo;
