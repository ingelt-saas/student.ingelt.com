import {
  CalendarMonth,
  StarRate,
  Twitter,
  WatchLater,
} from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import headerImg from "../../assets/images/speaking-practice-header.png";
import { Link } from "react-router-dom";
import StripeElements from "../../components/Stripe/StripeElements";
import sessionApi from "../../api/session";
import { toast } from "react-toastify";

// assets
import img1 from "../../assets/images/high-five-1.svg";
import img2 from "../../assets/images/expertise.svg";
import img3 from "../../assets/images/linguistics.svg";
import img4 from "../../assets/images/rating.svg";
import teacherImg from "../../assets/images/Vishal vats.png";
import indiaFlag from "../../assets/images/india-flag.svg";
import UpcomingEvent from "../../components/Home/UpcomingEvent";

const PaymentModal = ({ open, close }) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (loading) {
      return;
    }
    close();
  };

  // payment success handler
  const successHandler = async (paymentIntent) => {
    setLoading(true);
    try {
      await sessionApi.create({
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount,
        speaker: "american",
      });
      toast.success(
        "You Have Successfully Booked a Session. Kindly Check Your Mail"
      );
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="grid place-items-center"
    >
      <div className="sm:min-w-[400px] max-sm:w-[95vw] max-sm:px-2 bg-white rounded-xl shadow-2xl p-5 outline-none">
        <h2 className="text-xl font-semibold text-center">
          Payment For Session Booking
        </h2>
        <h6 className="text-5xl text-[#00000060] mt-4 font-medium text-center flex items-end justify-center gap-x-2">
          <span className="text-2xl text-[#00000090]">&#x20b9;</span>
          250
        </h6>
        <div>
          <StripeElements
            paymentFor={"session"}
            successHandler={successHandler}
            loading={setLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

const SpeakingSession = () => {
  const [paymentModal, setPaymentModal] = useState(false);

  const data = [
    "🌟More than 10 years of hands on experience",
    "🌟British Council certified trainer",
    "🌟Train the trainer certified trainer",
    "🌟Mentored more than lakhs of aspirants",
  ];

  const data2 = [
    {
      image: img1,
      content: "Warm & \nFriendly",
    },
    {
      image: img2,
      content: "Experienced \nTeacher",
    },
    {
      image: img3,
      content: "Grammar \nExpert",
    },
    {
      image: img4,
      content: "Student \nRating",
    },
  ];

  return (
    <div className="">
      <div className="flex max-md:flex-col gap-5">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { md: "65%", xs: "100%" },
            height: "20vh",
            padding: "2rem",
            backgroundColor: "white",
            border: "1px solid white",
            borderRadius: "2rem",
            boxShadow:
              "0px 10px 36px rgba(0, 0, 0, 0.16), 0px 0px 0px 1px rgba(0, 0, 0, 0.06);",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              // padding: '2rem 1rem 2rem 1rem',
              width: { md: "50%", xs: "90%" },
            }}
          >
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.6);",
              }}
            >
              Start your
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              Speaking Practice
            </Typography>
          </Box>
          <Box
            sx={{
              width: { md: "60%", xs: "100%" },
              display: { xs: "none", md: "block" },
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

        <div className="flex-1">
          <div className="rounded-2xl bg-white shadow-2xl px-5 py-5">
            <h3 className="text-xl font-semibold text-[#0C3C82]">
              My Scheduled Sessions
            </h3>
            <p className="my-3">Checkout Booked Sessions</p>
            <Link to="/speaking-session/check-sessions">
              <Button
                variant="contained"
                className="!rounded-2xl !py-3 !px-10 text-white !capitalize"
                sx={{
                  backgroundColor: "#0C3C82",
                  "&:hover": {
                    backgroundColor: "#0C3C82",
                  },
                }}
              >
                Check Sessions
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex max-md:flex-col gap-5 gap-x-5 mt-10">
        <div className="md:w-4/12 xl:w-5/12">
          <div className="bg-white rounded-xl px-5 py-5 shadow-xl flex flex-col gap-y-3">
            <UpcomingEvent />
          </div>
        </div>

        <div className="md:w-8/12 xl:w-7/12 bg-white rounded-xl px-5 py-5 shadow-lg">
          <div>
            <div className="flex gap-5 max-sm:flex-col">
              <div className="sm:w-4/12">
                <img
                  src={teacherImg}
                  alt=""
                  className="w-full object-cover aspect-[16/18] rounded-xl"
                />
                <h6 className="text-2xl font-semibold text-center capitalize mt-3">
                  Vishal Vats
                </h6>
                <p className="text-center font-medium text-sm flex items-center justify-center gap-2">
                  Native Indian
                  <img src={indiaFlag} alt="" className="w-5" />
                </p>
                <p className="flex justify-between text-base mt-3 font-semibold">
                  <span>Teaches</span>
                  <span className="flex items-center gap-2">
                    English
                    <svg
                      width={18}
                      height={13}
                      viewBox="0 0 18 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={2} height={13} rx={1} fill="#0DE298" />
                      <rect x={4} width={2} height={13} rx={1} fill="#0DE298" />
                      <rect x={8} width={2} height={13} rx={1} fill="#0DE298" />
                      <rect
                        x={12}
                        width={2}
                        height={13}
                        rx={1}
                        fill="#0DE298"
                      />
                      <rect
                        x={16}
                        width={2}
                        height={13}
                        rx={1}
                        fill="#0DE298"
                      />
                    </svg>
                  </span>
                </p>
              </div>
              <div className="sm:w-8/12">
                <h6 className="text-2xl font-normal mt-4">
                  Book your Speaking Session
                </h6>
                <div className="my-3">
                  <h6 className="text-base font-medium">About Me</h6>
                  {data.map((item, index) => (
                    <p key={index} className="text-base">
                      {item}
                    </p>
                  ))}
                </div>
                <div>
                  <h6 className="text-base font-medium">Featured Batch</h6>
                  <div className="flex gap-3 mt-2">
                    {data2.map((item, index) => (
                      <div
                        key={index}
                        className="w-1/4 px-2 gap-2 flex flex-col justify-center"
                      >
                        <img
                          draggable={false}
                          src={item.image}
                          alt=""
                          className="w-12 h-auto aspect-square mx-auto"
                        />
                        <p className="whitespace-pre-line text-sm font-medium text-center">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* teacher rating */}
                {/* <div className='mt-6 px-4 py-4 flex justify-between shadow-[0px_0px_14px_0px_#d1d1d1] rounded-xl'>
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
                                </div> */}
              </div>
            </div>
            <Button
              variant="contained"
              className="!rounded-xl !font-semibold !py-3 !px-10 text-white !capitalize !mt-5 !flex !justify-between !w-full"
              sx={{
                backgroundColor: "#0C3C82",
                "&:hover": {
                  backgroundColor: "#0C3C82",
                },
              }}
              onClick={() => setPaymentModal(true)}
            >
              <span>Book Session</span>
              <span>₹ 250 /-</span>
            </Button>
          </div>
        </div>
      </div>

      {/* payment modal */}
      <PaymentModal open={paymentModal} close={() => setPaymentModal(false)} />
    </div>
  );
};

export default SpeakingSession;
