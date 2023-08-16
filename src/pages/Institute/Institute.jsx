import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import Notes from "../../components/Institute/Notes";
import Assignments from "../../components/Institute/Assignments";
import welcomeSVG from "../../assets/images/find-institute.png";
import {
  Box,
  CircularProgress,
  FormControl,
  TablePagination,
  Select,
  OutlinedInput,
  MenuItem,
  Typography,
} from "@mui/material";
import TrackPerformance from "../../components/Institute/TrackPerformance";
import MeetingLink from "../../components/Institute/MeetingLink";
import Header from "../../components/shared/Header/Header";

const Institute = () => {
  const [search, setSearch] = useSearchParams();
  const page = search.get("page");
  const [searchQuery, setSearchQuery] = useState("");

  const searchForm = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  return (
    <div>
      {/* <div className="bg-white rounded-lg shadow-xl max-sm:px-2 px-5 py-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-[#0C3C82]">Institute</h1>
          <p className="text-[#00000099]">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
            cillum dolor.{" "}
          </p>
        </div>
      </div> */}
      <div className="pt-3 pb-4 pl-2 flex max-md:flex-col gap-5">
        <Header
          Img={welcomeSVG}
          title={'Institute'}
          subTitle={'Crack IELTS with our Partnered Institutes'}
        />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            width: { md: "64%", xs: "100%" },
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
              width: { md: "50%", xs: "90%" },
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: { md: "1.5rem", xs: "1.2rem" },
                fontWeight: "bold",
              }}
            >
              Institute
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: "1rem" },
              }}
            >
              Crack IELTS with our Partnered Institutes
            </Typography>
          </Box>
          <Box sx={{ width: { md: "30%", xs: "100%" } }}>
            <img
              src={welcomeSVG}
              alt="library"
              className="relative md:bottom-4  md:left-28 "
            />
          </Box>
        </Box> */}
        <div className='flex-1'>
          <MeetingLink />
        </div>
      </div>

      <div className="flex max-md:flex-col-reverse max-md:gap-y-3 justify-between items-center mt-10">
        <div className="flex items-end justify-start">
          <button
            onClick={() => setSearch({ page: "track-performance" })}
            className={`duration-200 transition-none ease-in ${page === "track-performance"
              ? "border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl"
              : "bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm"
              }`}
          >
            Track Performance
          </button>
          <button
            onClick={() => setSearch({ page: "assignments" })}
            className={`duration-200 transition-none ease-in ${page === "assignments" || !page
              ? "border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl"
              : "bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm"
              }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setSearch({ page: "notes" })}
            className={`duration-200 transition-none ease-in ${page === "notes"
              ? "border-1 py-3 px-5 md:px-8 font-semibold text-[#1B3B7D] border-[#ECECEC] bg-white border-b-0 rounded-t-xl"
              : "bg-[#F3F3F3] py-2 px-2 md:px-5 text-sm"
              }`}
          >
            Notes
          </button>

        </div>
        <div className="flex items-end justify-end pt-5 max-md:w-full sm:pt-0 md:pl-16 xl:pl-0">
          {page !== 'track-performance' && <SearchBar handleSubmit={searchForm} />}
        </div>
      </div>

      {page === 'notes' && <Notes searchQuery={searchQuery} />}
      {page === 'track-performance' && <TrackPerformance />}
      {(page !== 'notes' && page !== 'track-performance') && <Assignments searchQuery={searchQuery} />}

    </div>
  );
};

export default Institute;
