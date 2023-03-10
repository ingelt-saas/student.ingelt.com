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
    <div className="grid grid-cols-6 gap-x-5 w-full">
      <div className="col-span-4">
        <div className="">
          <div className="relative rounded-xl mt-10 shadow-lg w-11/12 bg-white">
            <img
              src={welcomeSVG}
              alt="welcome svg"
              className="absolute bottom-0 left-0 w-32"
            />

            <h1 className="text-3xl font-semibold text-right py-5 px-5 ">
              Welcome Priyanshi
            </h1>
          </div>

          <div className="mt-10 border border-[#78787840] shadow-lg rounded-lg py-5 flex bg-white">
            <div className="w-4/12 border-r-2 border-[#78787840] px-4 box-border">
              <div className="relative w-fit mx-auto">
                <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden p-5">
                  <img
                    src="https://th.bing.com/th/id/OIP.aNCvbHsT65-Zr4xg3wtBeQHaHa?pid=ImgDet&rs=1"
                    alt="profile"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>

                <img src={frameSVG} alt="profile frame svg" className="" />
              </div>

              <div className="text-center mt-5 ">
                <h1 className="text-2xl font-semibold">Harshita Rathee</h1>
                <h4 className="text-[#6A6A6A] text-lg font-semibold">
                  IELTS Premium
                </h4>
                <h4 className="text-[#6A6A6A] text-lg font-semibold">
                  Batch: B1
                </h4>
              </div>
            </div>

            <div className="w-8/12 px-4 flex items-center">
              <div className="w-full grid grid-cols-2 gap-y-5 gap-x-3 ">
                <StudentInfoBlock
                  IconName={Person2}
                  title="Father's Name"
                  text="Priyanshu Rathee"
                />

                <StudentInfoBlock
                  IconName={LocationOn}
                  title="Address"
                  text="Delhi"
                />

                <StudentInfoBlock
                  IconName={LocalPhone}
                  title="Phone Number"
                  text="+91 90908 99876"
                />

                <StudentInfoBlock
                  IconName={Email}
                  title="Email"
                  text="priyanshu@ingelt.com"
                />

                <StudentInfoBlock
                  IconName={
                    (gender === "m" && Male) ||
                    (gender === "f" && Female) ||
                    (gender === "o" && Transgender)
                  }
                  title="Gender"
                  text="Male"
                />

                <StudentInfoBlock
                  IconName={Badge}
                  title="Student ID"
                  text="89866242"
                />

                <StudentInfoBlock
                  IconName={Cake}
                  title="Date of Birth"
                  text="12-09-2002"
                />

                <StudentInfoBlock
                  IconName={Tv}
                  title="Previous Score"
                  text="7.9"
                />
              </div>
            </div>
          </div>

          <div className="border border-[#78787840] shadow-lg mt-10 rounded-lg px-4 py-5 bg-white">
            <StudentGraph />
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <div>
          <div className="rounded-xl border border-[#78787840] flex p-2 shadow-lg bg-white">
            <div className="w-4/12">
              <img src={meetSVG} alt="meeting svg" className="w-full h-auto" />
            </div>

            <div className="w-8/12 flex flex-col justify-around py-2">
              <div>
                <h1 className="text-2xl font-semibold">Your Classroom Link</h1>

                <p className="truncate relative pr-6 py-1">
                  {`https://meet.google.com/abc-defgi-hji`}
                  <Tooltip title={isCopied ? "Copied!" : "Copy to Clipboard"}>
                    <button
                      className="text-black absolute top-1/2 right-2 -translate-y-1/2"
                      onClick={handleCopy}
                    >
                      <ContentCopy />
                    </button>
                  </Tooltip>
                </p>
              </div>

              <Button
                variant="contained"
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                Join Meeting
              </Button>
            </div>
          </div>

          <div className="mt-10 border border-[#78787840] shadow-lg rounded-md py-6 px-3 bg-white">
            <h1 className="font-bold text-2xl">Band Score</h1>
            <div className="mt-5 overflow-hidden rounded-md">
              <div className="bg-[#000000] py-2 px-4 text-lg text-[#f2f2f2] font-bold flex items-center justify-between">
                <h3>Overall Bands</h3>
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

          <div className="border border-[#78787840] shadow-lg mt-10 rounded-lg px-4 py-5 bg-white">
            <h1 className="font-semibold text-xl mb-6">
              Mock Test Performance
            </h1>

            <div className="border border-[#78787840] w-full px-8 py-4 flex justify-between items-center my-1">
              <div className="bg-black p-2 text-white rounded-md mr-12 w-fit flex items-center justify-center">
                <Assessment />
              </div>

              <div className="flex justify-around items-center">
                <span className="font-semibold text-xl mr-4">
                  Average Score
                </span>
                <span className="text-lg font-semibold text-white bg-[#404040] rounded-md px-2 py-1">
                  7.5
                </span>
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
