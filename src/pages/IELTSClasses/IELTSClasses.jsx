import { Box, Button, Typography } from "@mui/material";
import React from "react";

// assets
import headerImg from "../../assets/images/ielts-classes-header.svg";
import img1 from "../../assets/images/free-ielts.svg";
import img2 from "../../assets/images/live-online.svg";
import img3 from "../../assets/images/offline-classes.svg";
import { useNavigate } from "react-router-dom";

const IELTSClasses = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center max-md:flex-col gap-7">
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
              IELTS Preparation
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
        <div className="rounded-[2rem] max-md:!w-full shadow-xl p-4 flex flex-col gap-y-3 bg-white flex-1">
          <h3 className="text-2xl font-bold text-[#0C3C82]">
            Speaking Practice
          </h3>
          <p className="text-base">Free for your whole team</p>
          <Button
            variant="contained"
            className="!capitalize !py-2 !px-10 !font-medium !w-fit !rounded-lg"
            sx={{
              backgroundColor: "#0C3C82",
              "&:hover": {
                backgroundColor: "#0C3C82",
              },
            }}
          >
            Book Now
          </Button>
        </div>
      </div>

      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        <div className="p-2 rounded-xl shadow-lg bg-white flex flex-col gap-y-4">
          <div className="rounded-xl overflow-hidden relative">
            <img
              draggable={false}
              src={img1}
              alt=""
              className="w-full aspect-[16/6] object-cover"
            />
            <h3 className="text-2xl font-semibold text-white absolute top-1/2 -translate-y-1/2 left-5">
              Free IELTS Modules
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Life Time Access
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              15 hrs of recorded sessions
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              PDFs of recorded sessions
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              IELTS Strategies
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Assignments
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Self Practise Mock Test
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              IELTS Library
            </p>
          </div>
          <Button
            variant="contained"
            className="!capitalize w-full !rounded-b-xl !rounded-t-md !py-3"
            sx={{
              backgroundColor: "#0C3C82",
              "&:hover": {
                backgroundColor: "#0C3C82",
              },
            }}
            onClick={() => navigate("/modules")}
          >
            Watch
          </Button>
        </div>
        <div className="p-2 rounded-xl shadow-lg bg-white flex flex-col gap-y-4">
          <div className="rounded-xl overflow-hidden relative">
            <img
              draggable={false}
              src={img2}
              alt=""
              className="w-full aspect-[16/6] object-cover"
            />
            <h3 className="text-2xl font-semibold text-white absolute top-1/2 -translate-y-1/2 left-5">
              Live / Online Classes
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              2 months crash course
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              15 hrs of recorded sessions
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              40 hrs of live classes
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Doubt clearing sessions
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Writing evaluation
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Speaking evaluation
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              5 Full length mock test
            </p>
          </div>
          <Button
            variant="contained"
            className="!capitalize w-full !rounded-b-xl !rounded-t-md !py-3"
            sx={{
              backgroundColor: "#0C3C82",
              "&:hover": {
                backgroundColor: "#0C3C82",
              },
            }}
            onClick={() => navigate("/ielts-classes/online-classes")}
          >
            Book Now
          </Button>
        </div>
        <div className="p-2 rounded-xl shadow-lg bg-white flex flex-col gap-y-4">
          <div className="rounded-xl overflow-hidden relative">
            <img
              draggable={false}
              src={img3}
              alt=""
              className="w-full aspect-[16/6] object-cover"
            />
            <h3 className="text-2xl font-semibold text-white absolute top-1/2 -translate-y-1/2 left-5">
              Offline Classes
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              2 Month crash course
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              5 days in a week class
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              In-person teaching
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Doubt clearing sessions
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Notes & assignments
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              Writing & Speaking evaluation
            </p>
            <p className="px-3 py-2 bg-[#0C3C821A] rounded-md shadow-md">
              5 Full length mock test
            </p>
          </div>
          <Button
            variant="contained"
            className="!capitalize w-full !rounded-b-xl !rounded-t-md !py-3"
            sx={{
              backgroundColor: "#0C3C82",
              "&:hover": {
                backgroundColor: "#0C3C82",
              },
            }}
            onClick={() => navigate("/find-institute")}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IELTSClasses;
