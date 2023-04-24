import { Box, Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Close, KeyboardArrowDown } from "@mui/icons-material";
import { useEffect, useState } from "react";
import assignmentApi from "../../../api/assignment";

const DocumentSVG = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="25" r="25" fill="#0064E1" />
      <path
        d="M16.25 36.25C15.5625 36.25 14.9737 36.0054 14.4837 35.5163C13.9946 35.0263 13.75 34.4375 13.75 33.75V16.25C13.75 15.5625 13.9946 14.9738 14.4837 14.4838C14.9737 13.9946 15.5625 13.75 16.25 13.75H21.5C21.7708 13 22.2242 12.3958 22.86 11.9375C23.495 11.4792 24.2083 11.25 25 11.25C25.7917 11.25 26.5054 11.4792 27.1413 11.9375C27.7763 12.3958 28.2292 13 28.5 13.75H33.75C34.4375 13.75 35.0263 13.9946 35.5163 14.4838C36.0054 14.9738 36.25 15.5625 36.25 16.25V33.75C36.25 34.4375 36.0054 35.0263 35.5163 35.5163C35.0263 36.0054 34.4375 36.25 33.75 36.25H16.25ZM16.25 33.75H33.75V16.25H16.25V33.75ZM18.75 31.25H27.5V28.75H18.75V31.25ZM18.75 26.25H31.25V23.75H18.75V26.25ZM18.75 21.25H31.25V18.75H18.75V21.25ZM25 15.3125C25.2708 15.3125 25.495 15.2238 25.6725 15.0463C25.8492 14.8696 25.9375 14.6458 25.9375 14.375C25.9375 14.1042 25.8492 13.88 25.6725 13.7025C25.495 13.5258 25.2708 13.4375 25 13.4375C24.7292 13.4375 24.5054 13.5258 24.3288 13.7025C24.1513 13.88 24.0625 14.1042 24.0625 14.375C24.0625 14.6458 24.1513 14.8696 24.3288 15.0463C24.5054 15.2238 24.7292 15.3125 25 15.3125ZM16.25 33.75V16.25V33.75Z"
        fill="white"
      />
    </svg>
  );
}

const StatsModal = ({ statsModal, statsModalHandle, assignments }) => {

  const [submissions, setSubmissions] = useState([]);
  const [seeMoreBtn, setSeeMoreBtn] = useState(false);

  useEffect(() => {
    assignmentApi.getAllSubmission()
      .then(res => setSubmissions(Array.isArray(res?.data) ? res?.data : []))
      .catch(err => console.error(err));
  }, []);

  // filter submitted submission
  const submittedSubmissions = submissions.filter(i => i.status === 'submitted');

  // get assignment by submission
  const getAssignment = (assignmentId) => assignments.find(i => i.id === assignmentId);

  return (
    <Modal
      open={statsModal}
      onClose={() => statsModalHandle(false)}
      className='flex justify-center sm:justify-end items-center'
    >
      {/* Stats modal start */}
      <div className="sm:w-[350px] w-full h-[90%] overflow-hidden relative rounded-lg bg-white">
        <button className="absolute top-2 right-3 text-white" onClick={() => statsModalHandle(false)}>
          <Close fontSize="medium" />
        </button>
        <div className="w-full h-full flex flex-col relative">
          <div className="bg-[#4C9BFF] py-3">
            <h5 className="text-center text-white text-2xl font-medium">Assignment Stats</h5>
          </div>
          <div className={`flex ${seeMoreBtn ? 'overflow-y-auto' : 'overflow-y-hidden'} flex-col flex-1 px-2 py-5 gap-y-5`}>
            <div className="px-4 py-3 flex items-center rounded-xl shadow-[2px_2px_2px_rgba(0,_0,_0,_0.15)]"
            >
              <DocumentSVG />
              <div className="flex-1 text-center">
                <h6 className="text-center text-xl font-medium">Total Assignments</h6>
                <span className="text-2xl font-semibold">{assignments?.length}</span>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center rounded-xl shadow-[2px_2px_2px_rgba(0,_0,_0,_0.15)]"
            >
              <DocumentSVG />
              <div className="flex-1 text-center">
                <h6 className="text-center text-xl font-medium">Complete Assignments</h6>
                <span className="text-2xl font-semibold flex justify-center items-center"><small>{submittedSubmissions?.length}</small>/{assignments?.length}</span>
              </div>
            </div>
            <div className="flex-1 border-2 border-[#E4E7EC] rounded-xl pb-12">
              <table className="w-full">
                <thead className="bg-[#0064E11A]">
                  <tr className="border-b border-[#E4E7EC]">
                    <th className="text-center py-4 px-2">Assignment</th>
                    <th className="text-center py-4 px-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedSubmissions.map((submission, index) => (
                    <tr className="border-b text-[#787878] border-[#E4E7EC]">
                      <td className="text-center py-4 px-2 font-semibold">{getAssignment(submission?.assignmentId)?.name}</td>
                      <td className="text-center py-4 px-2 font-semibold">{submission?.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center absolute w-full h-auto bottom-0 left-0 bg-white pt-1 pb-3">
              <button className="flex items-center gap-x-1 border border-[#0064E1] font-semibold rounded-lg px-7 py-1.5 text-[#0064E1] cursor-pointer mx-auto" onClick={() => setSeeMoreBtn(!seeMoreBtn)}>
                See More
                <KeyboardArrowDown fontSize="medium" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Stats modal end */}
    </Modal>
  );
};

export default StatsModal;
