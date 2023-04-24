import React, { useContext, useEffect, useState } from "react";
import home from "../../api/home";
import { StudentContext } from "../../contexts";

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
      <div className="bg-[#1A74E4] text-white p-2 rounded-full flex justify-center align-center">
        <IconName fontSize="medium" />
      </div>

      <div className="flex-1 overflow-hidden">
        <p className="text-[#6A6A6A] text-base font-normal">{title}</p>
        <p
          className="text-black text-base font-semibold break-words"
          title={text}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const student = useContext(StudentContext);
  const [isCopied, setIsCopied] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [graphData, setGraphData] = useState([]);
  const [bands, setBands] = useState();

  const handleCopy = async (text) => {
    text = meetLink.classroomLink || "";

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const takeToClass = () => {
    window.open(meetLink.classroomLink, "_blank");
  };

  useEffect(() => {
    async function getMeetLink() {
      try {
        const meetLink = await home.getMeetLink(student.batchId);
        const bands = await home.getBands();
        const graphData = await home.getGraphData();

        setMeetLink(meetLink.data);
        setBands(bands.data);
        setGraphData(graphData.data);
      } catch (error) {}
    }

    getMeetLink();
  }, [student]);

  return (
    <div className="flex flex-row flex-wrap gap-y-10 gap-x-5 w-full">
      {/* welcome message */}
      <div className="w-full foo:w-[calc(100%/12*8-10px)] hidden foo:block">
        <div className="relative rounded-xl mt-10 shadow-lg w-11/12 bg-white">
          <img
            src={welcomeSVG}
            alt="welcome svg"
            className="absolute bottom-0 left-0 w-32"
          />

          <h1 className="text-3xl font-semibold text-right py-5 px-5 ">
            Welcome {student?.name}
          </h1>
        </div>
      </div>

      {/* meeting link */}
      <div className="w-full order-2 foo:order-none foo:w-[calc(100%/12*4-10px)]">
        <div className="rounded-xl border border-[#78787840] flex p-2 shadow-lg bg-white">
          <div className="w-4/12">
            <img src={meetSVG} alt="meeting svg" className="w-full h-auto" />
          </div>
          <div className="w-8/12 flex flex-col justify-around py-2">
            <div>
              <h1 className="text-2xl font-semibold">Your Classroom Link</h1>

              <p className="truncate relative pr-6 py-1">
                {meetLink?.classroomLink || "Your teacher hasn't set the link"}
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
              onClick={takeToClass}
              variant="contained"
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                borderRadius: 2,
                width: "100%",
              }}
            >
              Join Class
            </Button>
          </div>
        </div>
      </div>

      {/* profile details */}
      <div className="w-full order-1 foo:order-none foo:w-[calc(100%/12*8-10px)]">
        <div className="border border-[#78787840] shadow-lg rounded-lg py-5 flex bg-white">
          <div className="w-4/12 border-r-2 border-[#78787840] px-4 box-border hidden md:block">
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
              <h1 className="text-2xl font-semibold">{student?.name}</h1>
              <h4 className="text-[#6A6A6A] text-lg font-semibold">
                Batch: B1
              </h4>
            </div>
          </div>

          <div className="w-full md:w-8/12 px-4 flex items-center">
            <div className="w-full grid grid-cols-2 gap-y-5 gap-x-3 ">
              <StudentInfoBlock
                IconName={Person2}
                title="Father's Name"
                text={student?.fathersName}
              />

              <StudentInfoBlock
                IconName={LocationOn}
                title="Address"
                text={`${student?.city}, ${student?.state}, ${student?.country}, pincode - ${student?.pinCode}`}
              />

              <StudentInfoBlock
                IconName={LocalPhone}
                title="Phone Number"
                text={student?.phoneNo}
              />

              <StudentInfoBlock
                IconName={Email}
                title="Email"
                text={student?.email}
              />

              <StudentInfoBlock
                IconName={
                  (!student.gender && Transgender) ||
                  (student?.gender === "Male" && Male) ||
                  (student?.gender === "Female" && Female) ||
                  (student?.gender === "Others" && Transgender)
                }
                title="Gender"
                text={student?.gender}
              />

              <StudentInfoBlock
                IconName={Badge}
                title="Student ID"
                text={student?.id}
              />

              <StudentInfoBlock
                IconName={Cake}
                title="Date of Birth"
                text={student?.dob}
              />

              <StudentInfoBlock
                IconName={Tv}
                title="Previous Score"
                text={student?.previousScore}
              />
            </div>
          </div>
        </div>
      </div>

      {/* score  */}
      <div className="w-full order-4 foo:order-none foo:w-[calc(100%/12*4-10px)]">
        <div className="border border-[#78787840] shadow-lg rounded-md py-6 px-3 bg-white">
          <h1 className="font-bold text-2xl">Your Predicted Bands</h1>
          <div className="mt-5 overflow-hidden rounded-md">
            <div className="bg-[#1A74E4] py-2 px-4 text-lg text-[#f2f2f2] font-bold flex items-center justify-between">
              <h3>Total Bands</h3>
              <span>
                {(
                  (bands?.listeningBands +
                    bands?.writingBands +
                    bands?.speakingBands +
                    bands?.readingBands) /
                  4
                ).toFixed(2) || "Not Enough Data"}
              </span>
            </div>

            <div className="border-2 border-t-0 border-[#78787840]">
              <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                <h3>Listening</h3>
                <span>
                  {bands?.listeningBands.toFixed(2) || "Not Enough Data"}
                </span>
              </div>

              <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                <h3>Reading</h3>
                <span>
                  {bands?.readingBands.toFixed(2) || "Not Enough Data"}
                </span>
              </div>

              <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                <h3>Speaking</h3>
                <span>
                  {bands?.speakingBands.toFixed(2) || "Not Enough Data"}
                </span>
              </div>

              <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                <h3>Writing</h3>
                <span>
                  {bands?.writingBands.toFixed(2) || "Not Enough Data"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* student graph */}
      <div className="w-full order-3 foo:order-none foo:w-[calc(100%/12*8-10px)]">
        <div className="border border-[#78787840] shadow-lg rounded-lg px-4 py-5 bg-white">
          <StudentGraph data={graphData} />
        </div>
      </div>

      {/* mock test Performance */}
      <div className="w-full order-5 foo:order-none foo:w-[calc(100%/12*4-10px)]">
        <div className="border border-[#78787840] shadow-lg rounded-lg px-4 py-5 bg-white">
          <h1 className="font-semibold text-xl mb-6">Mock Test Performance</h1>

          <div className="border border-[#78787840] w-full px-3 lg:px-5 xl:px-8 py-4 flex justify-between items-center my-2">
            <div className="bg-[#1A74E4] p-2 text-white rounded-md mr-8 xl:mr-12 w-fit flex items-center justify-center">
              <Assessment />
            </div>
            <div className="flex justify-around items-center">
              <span className="font-semibold text-xl mr-4">Average Score</span>
              <span className="text-lg font-semibold text-white bg-[#1A74E4] rounded-md px-2 py-1">
                {(
                  (bands?.listeningBands +
                    bands?.writingBands +
                    bands?.speakingBands +
                    bands?.readingBands) /
                  4
                ).toFixed(2) || "Not Enough Data"}
              </span>
            </div>
          </div>

          <div className="border border-[#78787840] w-full px-3 lg:px-5 xl:px-8 py-4 flex justify-between items-center my-2">
            <div className="bg-[#1A74E4] p-2 text-white rounded-md mr-8 xl:mr-12 w-fit flex items-center justify-center">
              <GpsFixed />
            </div>

            <div className="flex justify-around items-center">
              <span className="font-semibold text-xl mr-4">Target Score</span>
              <span className="text-lg font-semibold text-white bg-[#1A74E4] rounded-md px-2 py-1">
                {student?.targetScore}
              </span>
            </div>
          </div>

          <div className="border border-[#78787840] w-full px-3 lg:px-5 xl:px-8 py-4 flex justify-between items-center my-2">
            <div className="bg-[#1A74E4] p-2 text-white rounded-md mr-8 xl:mr-12 w-fit flex items-center justify-center">
              <Quiz />
            </div>

            <div className="flex justify-around items-center">
              <span className="font-semibold text-xl mr-4">
                Tests Attempted
              </span>
              <span className="text-lg font-semibold text-white bg-[#1A74E4] rounded-md px-2 py-1">
                {graphData?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
