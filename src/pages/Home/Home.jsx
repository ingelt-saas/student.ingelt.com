import React, { useEffect, useState } from "react";

//assets
import welcomeSVG from "../../assets/images/welcome.svg";
import frameSVG from "../../assets/images/profile_frame.svg";
import meetSVG from "../../assets/images/meeting.svg";
import StudentGraph from "../../components/Home/StudentGraph/StudentGraph";

// MUI
import { Tooltip, Button } from "@mui/material";
import {
  Person2,
  LocationOn,
  LocalPhone,
  Email,
  Female,
  Male,
  Transgender,
  Badge,
  Cake,
  Tv,
  ContentCopy,
  Assessment,
  Quiz,
  GpsFixed,
} from "@mui/icons-material";

// Student Info Block
const StudentInfoBlock = ({ title, text, IconName }) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="bg-black text-white p-2 rounded-full flex justify-center align-center">
        <IconName fontSize="medium" />
      </div>

      <div className="flex-1">
        <p className="text-[#6A6A6A] text-base font-normal">{title}</p>

        <p className="text-black text-base font-semibold break-words">{text}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [gender, setGender] = useState("m");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text) => {
    text = "1234";

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    setGender("m");
  }, [gender]);

  return (
    <div>
      <div className="flex flex-row flex-wrap w-full">
        {/* welcome message */}
        <div className="lg:w-8/12 md:w-7/12 hidden md:block">
          <div className="relative rounded-xl shadow-lg w-11/12 mb-4 h-fit mt-14 mx-2 my-2">
            <img src={welcomeSVG} alt='welcome svg' className="absolute bottom-0 left-0 w-32" />
            <h1 className="text-3xl font-semibold text-right py-5 px-5">Welcome Harshita</h1>
          </div>
        </div>

        {/* meeting link */}
        <div className="lg:w-4/12 md:w-5/12 w-full order-2 md:order-none">
          <div className="border-b-2 border-r-2 rounded-xl border-[#78787840] flex mx-2 my-2">
            <div className="w-4/12">
              <img src={meetSVG} alt='meeting svg' className="w-full h-auto" />
            </div>
            <div className="w-8/12 flex flex-col justify-between py-2">
              <div>
                <h1 className="text-2xl font-semibold">Harshita Rathee</h1>
                <p className="truncate relative pr-6 py-1">https://meet.google.com/abc-defgi-hji
                  <button className="text-black absolute top-1/2 right-2 -translate-y-1/2">
                    <svg className="w-5 h-5" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6663 1.04297H4.16634C3.02051 1.04297 2.08301 1.98047 2.08301 3.1263V17.7096H4.16634V3.1263H16.6663V1.04297ZM19.7913 5.20964H8.33301C7.18717 5.20964 6.24967 6.14714 6.24967 7.29297V21.8763C6.24967 23.0221 7.18717 23.9596 8.33301 23.9596H19.7913C20.9372 23.9596 21.8747 23.0221 21.8747 21.8763V7.29297C21.8747 6.14714 20.9372 5.20964 19.7913 5.20964ZM19.7913 21.8763H8.33301V7.29297H19.7913V21.8763Z" fill="black" />
                    </svg>
                  </button>
                </p>
              </div>
              <a href='' rel='noreferrer' target='_blank' className="px-5 py-2 rounded-lg bg-[#609EEC66] font-semibold w-fit">Join Meeting</a>
            </div>
          </div>
        </div>

        {/* profile details */}
        <div className="lg:w-8/12 md:w-7/12 w-full order-1 md:order-none">
          <div className="border-2 border-[#78787840] shadow-sm rounded-lg flex flex-col lg:flex-row mx-2 my-2">
            <div className="w-4/12 border-r-2 border-[#78787840] px-4 py-5 box-border hidden lg:block">
              <div className="relative w-fit mx-auto">
                <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden p-5">
                  <img src='https://th.bing.com/th/id/OIP.aNCvbHsT65-Zr4xg3wtBeQHaHa?pid=ImgDet&rs=1' alt='profile' className="rounded-full w-full h-full object-cover" />
                </div>
                <img src={frameSVG} alt='profile frame svg' className="" />
              </div>
              <div className="text-center mt-5">
                <h1 className="text-2xl font-semibold">Harshita Rathee</h1>
                <h4 className="text-[#6A6A6A] text-lg font-semibold">IELTS Premium</h4>
                <h4 className="text-[#6A6A6A] text-lg font-semibold">Batch: B1</h4>
              </div>
            </div>
            <div className="bg-[#0064E11A] py-2 px-4 flex lg:hidden justify-between items-center">
              <h1 className="text-2xl font-semibold">Harshita pande</h1>
              <span className="text-[#6A6A6A] text-base font-semibold">Batch: B1</span>
            </div>
            <div className="w-full lg:w-8/12 px-4 py-5 flex items-center">
              <div className="w-full grid grid-cols-2 gap-y-5 gap-x-3 ">
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M11 37.4139C11 31.9079 15.6 27.4444 25 27.4444C34.4 27.4444 39 31.9079 39 37.4139C39 38.2899 38.3609 39 37.5726 39H12.4275C11.6391 39 11 38.2899 11 37.4139Z" stroke="white" strokeWidth="2" />
                    <path d="M30.25 16.25C30.25 19.1495 27.8995 21.5 25 21.5C22.1005 21.5 19.75 19.1495 19.75 16.25C19.75 13.3505 22.1005 11 25 11C27.8995 11 30.25 13.3505 30.25 16.25Z" stroke="white" strokeWidth="2" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">Father's Name</p>
                    <p className="text-black text-base font-semibold break-words">Mukul Rathee</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M25 41.8421C25 41.8421 38 30.4188 38 21.8513C38 14.7537 32.1797 9 25 9C17.8203 9 12 14.7537 12 21.8513C12 30.4188 25 41.8421 25 41.8421Z" stroke="white" strokeWidth="3" />
                    <path d="M29.1533 21.3161C29.1533 23.5833 27.294 25.4213 25.0005 25.4213C22.707 25.4213 20.8478 23.5833 20.8478 21.3161C20.8478 19.0488 22.707 17.2108 25.0005 17.2108C27.294 17.2108 29.1533 19.0488 29.1533 21.3161Z" stroke="white" strokeWidth="3" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">Address</p>
                    <p className="text-black text-base font-semibold break-words">New Delhi</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M38.6744 35.5687C38.6744 35.5687 36.8456 37.345 36.3974 37.8657C35.6673 38.6362 34.8071 39 33.6794 39C33.571 39 33.4553 39 33.3469 38.9929C31.2 38.8573 29.2048 38.0298 27.7085 37.3236C23.617 35.3689 20.0244 32.5939 17.0389 29.0769C14.5739 26.145 12.9258 23.4341 11.8343 20.5236C11.162 18.7473 10.9162 17.3633 11.0246 16.0578C11.0969 15.2232 11.4222 14.5312 12.0222 13.9391L14.4872 11.5065C14.8414 11.1783 15.2173 11 15.586 11C16.0414 11 16.41 11.2711 16.6413 11.4994C16.6486 11.5065 16.6558 11.5136 16.663 11.5208C17.104 11.9274 17.5232 12.3483 17.9642 12.7977C18.1883 13.026 18.4196 13.2543 18.6509 13.4897L20.6244 15.4372C21.3906 16.1934 21.3906 16.8925 20.6244 17.6487C20.4147 17.8555 20.2123 18.0624 20.0027 18.2622C19.3955 18.8757 19.8725 18.4049 19.2436 18.9614C19.2291 18.9756 19.2147 18.9828 19.2074 18.997C18.5858 19.6105 18.7014 20.2098 18.8315 20.6164C18.8388 20.6378 18.846 20.6592 18.8532 20.6806C19.3665 21.9076 20.0893 23.0633 21.1881 24.4401L21.1953 24.4472C23.1905 26.8727 25.294 28.7631 27.6144 30.2113C27.9108 30.3968 28.2144 30.5466 28.5035 30.6893C28.7638 30.8177 29.0096 30.9389 29.2192 31.0674C29.2481 31.0816 29.277 31.103 29.3059 31.1173C29.5517 31.2386 29.783 31.2956 30.0216 31.2956C30.6216 31.2956 30.9975 30.9247 31.1203 30.8034L32.5373 29.4051C32.783 29.1625 33.1734 28.8701 33.6288 28.8701C34.077 28.8701 34.4456 29.1483 34.6697 29.3908C34.677 29.398 34.677 29.398 34.6842 29.4051L38.6672 33.3358C39.4118 34.0634 38.6744 35.5687 38.6744 35.5687Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">Phone</p>
                    <p className="text-black text-base font-semibold break-words">+91 07412270514</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M12.75 16.7757L25 24.7665L38.125 16.7757M14.5 36C12.567 36 11 34.41 11 32.4485V18.5515C11 16.59 12.567 15 14.5 15H35.5C37.433 15 39 16.59 39 18.5515V32.4485C39 34.41 37.433 36 35.5 36H14.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[#6A6A6A] text-base font-normal">Email</p>
                    <p className="text-black text-base font-semibold ">
                      example@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M37 19.0689C37 16.7333 36.2981 14.4479 34.9794 12.4899C33.6608 10.5319 31.7821 8.98531 29.5711 8.0378C27.3601 7.09029 24.9119 6.78253 22.5234 7.15185C20.1349 7.52117 17.9086 8.5517 16.1147 10.1185C14.3207 11.6852 13.0362 13.7209 12.4168 15.9786C11.7973 18.2363 11.8697 20.619 12.6251 22.8378C13.3804 25.0565 14.7863 27.016 16.6723 28.4786C18.5582 29.9412 20.8432 30.844 23.25 31.0775V34.7586H18.25C17.9185 34.7586 17.6005 34.8857 17.3661 35.1121C17.1317 35.3384 17 35.6454 17 35.9655C17 36.2856 17.1317 36.5926 17.3661 36.8189C17.6005 37.0452 17.9185 37.1724 18.25 37.1724H23.25V40.7931C23.25 41.1132 23.3817 41.4202 23.6161 41.6465C23.8505 41.8728 24.1685 42 24.5 42C24.8315 42 25.1495 41.8728 25.3839 41.6465C25.6183 41.4202 25.75 41.1132 25.75 40.7931V37.1724H30.75C31.0815 37.1724 31.3995 37.0452 31.6339 36.8189C31.8683 36.5926 32 36.2856 32 35.9655C32 35.6454 31.8683 35.3384 31.6339 35.1121C31.3995 34.8857 31.0815 34.7586 30.75 34.7586H25.75V31.0775C28.8319 30.7751 31.6882 29.3798 33.7663 27.1616C35.8443 24.9434 36.9965 22.0599 37 19.0689ZM24.5 28.7241C22.5222 28.7241 20.5888 28.1578 18.9443 27.0969C17.2998 26.036 16.0181 24.528 15.2612 22.7638C14.5043 20.9995 14.3063 19.0582 14.6921 17.1852C15.078 15.3123 16.0304 13.5919 17.4289 12.2416C18.8275 10.8913 20.6093 9.97173 22.5491 9.59918C24.4889 9.22663 26.4996 9.41784 28.3268 10.1486C30.1541 10.8794 31.7159 12.1169 32.8147 13.7047C33.9135 15.2925 34.5 17.1593 34.5 19.0689C34.4959 21.6284 33.441 24.0819 31.5665 25.8917C29.692 27.7016 27.1509 28.7201 24.5 28.7241Z" fill="white" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">Gender</p>
                    <p className="text-black text-base font-semibold break-words">Female</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M28.2827 31.208C29.2816 30.5551 30.0544 29.5689 30.4834 28.3998C30.9124 27.2306 30.9739 25.9427 30.6586 24.7325C30.3433 23.5222 29.6685 22.4561 28.7372 21.6966C27.8058 20.9371 26.6689 20.5261 25.5 20.5261C24.3311 20.5261 23.1942 20.9371 22.2628 21.6966C21.3315 22.4561 20.6567 23.5222 20.3414 24.7325C20.0261 25.9427 20.0876 27.2306 20.5166 28.3998C20.9456 29.5689 21.7184 30.5551 22.7173 31.208C20.7816 31.8318 19.0853 33.1114 17.881 34.856C17.7862 34.9918 17.7456 35.1625 17.7679 35.3305C17.7902 35.4985 17.8737 35.6502 18 35.752C18.1044 35.8322 18.2289 35.8768 18.3571 35.88C18.4492 35.8777 18.5395 35.8535 18.6219 35.8092C18.7042 35.765 18.7764 35.7017 18.8333 35.624C19.6096 34.5112 20.6161 33.608 21.7732 32.9859C22.9303 32.3639 24.2063 32.04 25.5 32.04C26.7937 32.04 28.0697 32.3639 29.2268 32.9859C30.3839 33.608 31.3904 34.5112 32.1667 35.624C32.2136 35.6912 32.2723 35.7479 32.3396 35.7907C32.4068 35.8335 32.4813 35.8617 32.5587 35.8736C32.6361 35.8855 32.7149 35.8808 32.7906 35.86C32.8663 35.8391 32.9375 35.8024 33 35.752C33.0625 35.7016 33.1152 35.6384 33.155 35.5661C33.1949 35.4938 33.2211 35.4137 33.2321 35.3305C33.2432 35.2473 33.2389 35.1626 33.2195 35.0812C33.2001 34.9997 33.1659 34.9232 33.119 34.856C31.9147 33.1114 30.2184 31.8318 28.2827 31.208ZM21.3333 26.28C21.3333 25.3939 21.5777 24.5278 22.0355 23.791C22.4934 23.0543 23.1441 22.4801 23.9055 22.141C24.6668 21.8019 25.5046 21.7132 26.3129 21.8861C27.1211 22.0589 27.8636 22.4856 28.4463 23.1122C29.029 23.7387 29.4258 24.537 29.5866 25.406C29.7474 26.275 29.6649 27.1758 29.3495 27.9944C29.0341 28.813 28.5001 29.5127 27.8149 30.005C27.1297 30.4973 26.3241 30.76 25.5 30.76C24.3961 30.7558 23.3386 30.2824 22.5581 29.4432C21.7775 28.6039 21.3373 27.4669 21.3333 26.28ZM36.2143 9H14.7857C14.3121 9 13.8579 9.20229 13.523 9.56236C13.1881 9.92242 13 10.4108 13 10.92V39.08C13 39.5892 13.1881 40.0776 13.523 40.4376C13.8579 40.7977 14.3121 41 14.7857 41H36.2143C36.6879 41 37.1421 40.7977 37.477 40.4376C37.8119 40.0776 38 39.5892 38 39.08V10.92C38 10.4108 37.8119 9.92242 37.477 9.56236C37.1421 9.20229 36.6879 9 36.2143 9ZM36.8095 39.08C36.8095 39.2497 36.7468 39.4125 36.6352 39.5325C36.5236 39.6526 36.3722 39.72 36.2143 39.72H14.7857C14.6278 39.72 14.4764 39.6526 14.3648 39.5325C14.2532 39.4125 14.1905 39.2497 14.1905 39.08V10.92C14.1905 10.7503 14.2532 10.5875 14.3648 10.4675C14.4764 10.3474 14.6278 10.28 14.7857 10.28H36.2143C36.3722 10.28 36.5236 10.3474 36.6352 10.4675C36.7468 10.5875 36.8095 10.7503 36.8095 10.92V39.08ZM20.1429 14.76C20.1429 14.5903 20.2056 14.4275 20.3172 14.3075C20.4288 14.1874 20.5802 14.12 20.7381 14.12H30.2619C30.4198 14.12 30.5712 14.1874 30.6828 14.3075C30.7944 14.4275 30.8571 14.5903 30.8571 14.76C30.8571 14.9297 30.7944 15.0925 30.6828 15.2125C30.5712 15.3326 30.4198 15.4 30.2619 15.4H20.7381C20.5802 15.4 20.4288 15.3326 20.3172 15.2125C20.2056 15.0925 20.1429 14.9297 20.1429 14.76Z" fill="white" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">Student ID</p>
                    <p className="text-black text-base font-semibold break-words">S00999</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M35.1111 20.6375H25.7778V18.6158C27.2815 17.9032 28.15 16.885 28.3833 15.5469C28.8889 12.5944 25.8556 9.55455 25.5056 9.22002C25.3696 9.08101 25.1929 9.00275 25.0089 9.00007C24.825 8.99739 24.6466 9.07047 24.5074 9.20548C23.9041 9.78364 23.3527 10.4267 22.8611 11.1254C21.7463 12.7398 21.2926 14.2088 21.513 15.5178C21.7333 16.8269 22.6537 17.9177 24.2222 18.6304V20.6375H14.8889C13.8585 20.6414 12.8714 21.1023 12.1428 21.9198C11.4142 22.7372 11.0034 23.8449 11 25.0009V26.9354C11.0032 27.7284 11.1457 28.5129 11.4193 29.2442C11.6929 29.9754 12.0922 30.6389 12.5944 31.1969L12.8148 31.4151V38.9638C12.8148 39.5038 13.006 40.0217 13.3464 40.4036C13.6867 40.7855 14.1483 41 14.6296 41H35.3704C35.8517 41 36.3133 40.7855 36.6536 40.4036C36.994 40.0217 37.1852 39.5038 37.1852 38.9638V31.4151L37.4056 31.1969C37.9078 30.6389 38.3071 29.9754 38.5807 29.2442C38.8543 28.5129 38.9968 27.7284 39 26.9354V25.0009C38.9966 23.8449 38.5858 22.7372 37.8572 21.9198C37.1286 21.1023 36.1415 20.6414 35.1111 20.6375ZM23.0426 15.1979C22.8093 13.8452 24.1056 12.0562 24.987 11.0672C25.3009 11.4354 25.5952 11.8239 25.8685 12.2308C26.413 13.0453 27.0222 14.2234 26.8537 15.2269C26.7241 15.9833 26.1019 16.6087 25 17.0887C23.8333 16.6087 23.1722 15.9687 23.0426 15.1979ZM35.6296 38.9638C35.6296 39.0409 35.6023 39.1149 35.5537 39.1694C35.5051 39.224 35.4391 39.2546 35.3704 39.2546H14.6296C14.5609 39.2546 14.4949 39.224 14.4463 39.1694C14.3977 39.1149 14.3704 39.0409 14.3704 38.9638V32.4769C14.9821 32.7409 15.6336 32.8693 16.2889 32.855C17.1536 32.8279 17.999 32.5614 18.7498 32.0793C19.5007 31.5972 20.1337 30.9144 20.5926 30.0915C21.0553 30.9368 21.7033 31.635 22.4749 32.1192C23.2465 32.6035 24.1159 32.8578 25 32.8578C25.8841 32.8578 26.7535 32.6035 27.5251 32.1192C28.2967 31.635 28.9447 30.9368 29.4074 30.0915C29.8663 30.9144 30.4993 31.5972 31.2502 32.0793C32.001 32.5614 32.8464 32.8279 33.7111 32.855H33.8148C34.4353 32.8547 35.0504 32.7265 35.6296 32.4769V38.9638ZM37.4444 26.9354C37.4421 27.4958 37.3413 28.0501 37.1478 28.5668C36.9543 29.0834 36.6718 29.5521 36.3167 29.9461C35.9787 30.3209 35.5779 30.6168 35.1373 30.8166C34.6967 31.0163 34.2252 31.1159 33.75 31.1097C32.8008 31.0832 31.8979 30.6434 31.2326 29.8834C30.5673 29.1233 30.1916 28.1025 30.1852 27.0372C30.1852 26.8057 30.1032 26.5838 29.9574 26.4201C29.8115 26.2564 29.6137 26.1645 29.4074 26.1645C29.2011 26.1645 29.0033 26.2564 28.8574 26.4201C28.7116 26.5838 28.6296 26.8057 28.6296 27.0372C28.6296 28.1173 28.2472 29.1531 27.5665 29.9169C26.8858 30.6806 25.9626 31.1097 25 31.1097C24.0374 31.1097 23.1142 30.6806 22.4335 29.9169C21.7528 29.1531 21.3704 28.1173 21.3704 27.0372C21.3704 26.8057 21.2884 26.5838 21.1426 26.4201C20.9967 26.2564 20.7989 26.1645 20.5926 26.1645C20.3863 26.1645 20.1885 26.2564 20.0426 26.4201C19.8968 26.5838 19.8148 26.8057 19.8148 27.0372C19.8084 28.1025 19.4327 29.1233 18.7674 29.8834C18.1021 30.6434 17.1992 31.0832 16.25 31.1097C15.7748 31.1159 15.3033 31.0163 14.8627 30.8166C14.4221 30.6168 14.0213 30.3209 13.6833 29.9461C13.3282 29.5521 13.0457 29.0834 12.8522 28.5668C12.6587 28.0501 12.5579 27.4958 12.5556 26.9354V25.0009C12.559 24.3078 12.8059 23.6441 13.2427 23.1539C13.6796 22.6638 14.2711 22.3867 14.8889 22.3829H35.1111C35.7289 22.3867 36.3204 22.6638 36.7573 23.1539C37.1941 23.6441 37.441 24.3078 37.4444 25.0009V26.9354Z" fill="white" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">DOB</p>
                    <p className="text-black text-base font-semibold break-words">01-01-1222</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#0064E1" />
                    <path d="M37.8333 13H12.1667C11.8572 13 11.5605 13.1278 11.3417 13.3554C11.1229 13.5829 11 13.8915 11 14.2133V36.0533C11 36.3751 11.1229 36.6837 11.3417 36.9113C11.5605 37.1388 11.8572 37.2667 12.1667 37.2667H37.8333C38.1428 37.2667 38.4395 37.1388 38.6583 36.9113C38.8771 36.6837 39 36.3751 39 36.0533V14.2133C39 13.8915 38.8771 13.5829 38.6583 13.3554C38.4395 13.1278 38.1428 13 37.8333 13ZM36.6667 34.84H34.3333V33.6267H28.5V34.84H13.3333V15.4267H36.6667V34.84ZM23.005 22.3548C23.005 21.8045 23.2152 21.2768 23.5893 20.8877C23.9635 20.4986 24.4709 20.28 25 20.28C26.1083 20.28 26.995 21.2143 26.995 22.3548C26.995 23.5075 26.1083 24.4417 25 24.4417C23.8917 24.4417 23.005 23.5075 23.005 22.3548ZM17.6617 24.2719C17.6617 23.4104 18.3383 22.7067 19.1667 22.7067C19.5658 22.7067 19.9486 22.8716 20.2309 23.1651C20.5131 23.4586 20.6717 23.8568 20.6717 24.2719C20.6717 25.1333 19.995 25.8249 19.1667 25.8249C18.3383 25.8249 17.6617 25.1333 17.6617 24.2719ZM29.3283 24.2719C29.3283 23.8568 29.4869 23.4586 29.7691 23.1651C30.0514 22.8716 30.4342 22.7067 30.8333 22.7067C31.2325 22.7067 31.6153 22.8716 31.8975 23.1651C32.1798 23.4586 32.3383 23.8568 32.3383 24.2719C32.3383 25.1333 31.6617 25.8249 30.8333 25.8249C30.005 25.8249 29.3283 25.1333 29.3283 24.2719ZM34.3333 28.9432V29.9867H15.6667V28.9432C15.6667 27.8027 17.475 26.8684 19.1667 26.8684C19.8083 26.8684 20.4617 27.0019 21.0333 27.2324C21.9083 26.3952 23.4833 25.8249 25 25.8249C26.5167 25.8249 28.0917 26.3952 28.9667 27.2324C29.5383 27.0019 30.1917 26.8684 30.8333 26.8684C32.525 26.8684 34.3333 27.8027 34.3333 28.9432Z" fill="white" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[#6A6A6A] text-base font-normal">Previous Score</p>
                    <p className="text-black text-base font-semibold break-words">NULL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* score */}
        <div className="lg:w-4/12 md:w-5/12 w-full order-4 md:order-none">
          <div className="border-2 border-[#78787840] rounded-md py-6 px-3 mx-2 my-2">
            <h1 className="font-bold text-2xl">Band Score</h1>
            <div className="mt-5 overflow-hidden rounded-md">
              <div className="bg-[#42C977] py-2 px-4 text-lg text-[#f2f2f2] font-bold flex items-center justify-between">
                <h3>Average Band Score</h3>
                <span>6.5</span>
              </div>
              <div className="border-2 border-t-0 border-[#78787840]">
                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                  <h3>Listening</h3>
                  <span>6.5</span>
                </div>
                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                  <h3>Reading</h3>
                  <span>6.5</span>
                </div>
                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                  <h3>Speaking</h3>
                  <span>6.5</span>
                </div>
                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                  <h3>Writing</h3>
                  <span>6.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* student graph */}
        <div className="lg:w-8/12 w-full order-3 md:order-none">
          <div className="border-2 border-[#78787840] rounded-lg md:px-4 py-5 mx-2 my-2">
            <StudentGraph />
          </div>
        </div>
      </div>

      <div className="border w-full rounded-lg mt-10 border-[#78787840]">
        <div className="px-10 py-10">
          <h1 className="text-2xl font-semibold">Mock Test Performance</h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-10">
            <div className="rounded-lg p-2 bg-[#0064E11A]">
              <div className="flex flex-col items-center gap-3 bg-[#fff] rounded-lg py-3">
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#0064E1" />
                  <path d="M41.6667 66.2222V49.5556M50 66.2222V52.3333M58.3333 66.2222V44M63.8889 24.5556H75V80.1111H25V24.5556H36.1111M36.1111 19H63.8889V30.1111H36.1111V19Z" stroke="white" strokeWidth="5" />
                </svg>
                <h1 className="text-[#787878] text-xl font-semibold">Average Score</h1>
                <span className="block text-2xl font-bold">7.5</span>
              </div>
            </div>

            <div className="border border-[#78787840] w-full px-8 py-4 flex justify-between items-center my-1">
              <div className="bg-black p-2 text-white rounded-md mr-12 w-fit flex items-center justify-center">
                <GpsFixed />
              </div>

              <div className="flex justify-around items-center">
                <span className="font-semibold text-xl mr-4">Target Score</span>
                <span className="text-lg font-semibold text-white bg-[#404040] rounded-md px-2 py-1">
                  8.0
                </span>
              </div>
            </div>

            <div className="border border-[#78787840] w-full px-8 py-4 flex justify-between items-center my-1">
              <div className="bg-black p-2 text-white rounded-md mr-12 w-fit flex items-center justify-center">
                <Quiz />
              </div>

              <div className="flex justify-around items-center">
                <span className="font-semibold text-xl mr-4">
                  Tests Attempted
                </span>
                <span className="text-lg font-semibold text-white bg-[#404040] rounded-md px-2 py-1">
                  8
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
