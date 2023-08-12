import { useQuery } from "@tanstack/react-query";
import React from "react";
import assignmentApi from "../../api/assignment";
import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Popper,
  TablePagination,
} from "@mui/material";
import { Download, Menu, MoreVert, RemoveRedEye, Upload } from "@mui/icons-material";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

//assets
import assignmentSVG from "../../assets/images/assignment.svg";
import moment from "moment";
import getFile from "../../api/getFile";
import UploadModal from "../shared/UploadModal/UploadModal";

const Assignments = ({ searchQuery }) => {

  const [pagination, setPagination] = useState({ rows: 10, page: 0 });
  const [uploadModal, setUploadModal] = useState(null);

  const { data: assignments, isLoading } = useQuery({
    queryKey: ["assignments", searchQuery, pagination],
    queryFn: async () => {
      const res = await assignmentApi.getAllAssignments(
        pagination.page + 1,
        pagination.rows,
        searchQuery
      );
      return res.data;
    },
  });

  // download handler
  const downloadAssignment = async (key, fileName) => {
    const result = await getFile(key);
    const awsUrl = result.data;
    const res = await fetch(awsUrl);
    const blob = await res.blob();

    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Event Handlers
  const uploadModalHandle = () => {
    setUploadModal(null);
  };

  return (
    <div className="mt-10">
      {isLoading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {!isLoading &&
        (Array.isArray(assignments?.rows) && assignments?.rows?.length > 0 ? (
          <div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 max-sm:px-5">
              {assignments?.rows.map((item) => (
                <div key={item?.id}>
                  {/* for large device */}
                  <div
                    className="hidden sm:flex flex-col items-center justify-center bg-white rounded-xl h-full 2xl:w-[19vw] lg:w-[28vw] shadow-[0px_10px_36px_rgba(0,0,0,0.16),0px_0px_0px_1px_rgba(0,0,0,0.06)] scale-95 hover:scale-100 duration-200 transition-transform hover:cursor-pointer"
                  >
                    <div className="h-[60%] flex flex-col items-center justify-center pb-2 pt-6">
                      <div className="flex">
                        <img src={assignmentSVG} alt="" />
                      </div>
                      <h2 className="font-bold px-4 py-2">{item.name}</h2>
                    </div>
                    <hr className="w-full text-zinc-300" />
                    <div className="flex flex-col items-center justify-between w-full px-4 py-3">
                      <div className="flex justify-between w-full px-2 ">
                        <p className="flex flex-col">
                          <span className="text-base 2xl:text-md font-medium text-[#00285A]">
                            Status
                          </span>
                          <span className="text-[#00000099] text-sm 2xl:text-xs">
                            {item?.submissions?.status === "submitted"
                              ? item?.submissions?.evaluated
                                ? "Evaluated"
                                : "Submitted"
                              : "Not Complete"}
                          </span>
                        </p>
                        <p className="flex flex-col">
                          <span className="text-base 2xl:text-md font-medium text-[#00285A]">
                            Marks
                          </span>
                          <span className="text-[#00000099] text-xs 2xl:text-xs">
                            {item?.submissions?.id
                              ? item?.submissions?.evaluated
                                ? item?.submissions?.scores
                                : ""
                              : "Not Done"}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between w-full mt-3 px-2 ">
                        <p className="flex flex-col">
                          <span className="text-base 2xl:text-md font-medium text-[#00285A]">
                            Upload Date
                          </span>
                          <span className="text-[#00000099] text-sm 2xl:text-xs">
                            {moment(item.createdAt).format("ll")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between my-3 w-full px-5 ">
                      {item?.submissions?.status === "submitted" ? (
                        <Button
                          variant="outlined"
                          className="!text-base 2xl:!text-md"
                          sx={{
                            border: "2px solid #00000099",
                            borderRadius: "7px",
                            textTransform: "capitalize",
                            color: "#00000099",
                            fontWeight: 400,
                            padding: "4px 8px",

                            "&:hover": {
                              border: "2px solid #00000099",
                              backgroundColor: "transparent",
                            },
                          }}
                          endIcon={<RemoveRedEye />}
                          onClick={() => setUploadModal(item)}
                        >
                          View
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          className="!text-base 2xl:!text-md"
                          sx={{
                            border: "2px solid #00000099",
                            borderRadius: "8px",
                            textTransform: "capitalize",
                            color: "#00000099",
                            fontWeight: 400,
                            padding: "4px 8px",
                            "&:hover": {
                              border: "2px solid #00000099",
                              backgroundColor: "transparent",
                            },
                          }}
                          endIcon={<Upload />}
                          onClick={() => setUploadModal(item)}
                        >
                          Upload
                        </Button>
                      )}

                      <Button
                        onClick={() => downloadAssignment(item.file, item.name)}
                        variant="contained"
                        className="!text-base 2xl:!text-md"
                        sx={{
                          border: "2px solid #0C3C82",
                          borderRadius: "7px",
                          textTransform: "capitalize",
                          backgroundColor: "#0C3C82",
                          color: "white",
                          fontWeight: 400,
                          padding: "4px 8px",
                          "&:hover": {
                            border: "2px solid #0C3C82",
                            backgroundColor: "#0C3C82",
                            color: "white",
                          },
                        }}
                        endIcon={<Download />}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  {/* for mobile device */}
                  <div className="flex items-center py-2 px-3 rounded-md sm:hidden shadow-[0px_10px_36px_rgba(0,0,0,0.16),0px_0px_0px_1px_rgba(0,0,0,0.06)]">
                    <div className="flex flex-1 gap-2">
                      <img src={assignmentSVG} alt="" className='w-8 h-auto' />
                      <div>
                        <p className="font-semibold text-[#00285A]">{item.name}</p>
                        <span className="text-[#00000099] text-sm 2xl:text-xs">
                          {item?.submissions?.status === "submitted"
                            ? item?.submissions?.evaluated
                              ? "Evaluated"
                              : "Submitted"
                            : "Not Complete"}
                        </span>
                      </div>
                    </div>
                    <PopupState>
                      {(popupState) => <>
                        <IconButton size="small" {...bindTrigger(popupState)}>
                          <MoreVert fontSize="small" />
                        </IconButton>
                        <Popper
                          {...bindMenu(popupState)}
                          className="!bg-white !rounded-md p-3 shadow-2xl"
                        >
                          <div className='flex flex-col gap-2'>
                            <Button
                              onClick={() => {
                                popupState.close();
                                setUploadModal(item);
                              }}
                              className='!text-[#00285A]' variant="outlined" startIcon={<Upload fontSize="small" />}>Upload</Button>
                            <Button
                              onClick={() => {
                                popupState.close();
                                downloadAssignment(item.file, item.name);
                              }}
                              className='!text-[#00285A]' variant="outlined" startIcon={<Download fontSize="small" />}>Download</Button>
                          </div>
                        </Popper>
                      </>}
                    </PopupState>
                  </div>
                </div>
              ))}
            </div>

            <TablePagination
              component="div"
              color="primary"
              count={assignments?.count}
              rowsPerPageOptions={[10, 25, 50, 100]}
              page={pagination.page}
              rowsPerPage={pagination.rows}
              onPageChange={(_, newPage) =>
                setPagination({ ...pagination, page: newPage })
              }
              onRowsPerPageChange={(e) =>
                setPagination({ ...pagination, rows: e.target.value })
              }
              className="mt-6"
            />
          </div>
        ) : (
          <Alert icon={false} severity="warning" className="mx-auto w-fit">
            No Assignments Found
          </Alert>
        ))}

      {/* Upload modal */}
      {uploadModal && (
        <UploadModal
          uploadModal={Boolean(uploadModal)}
          uploadModalHandle={uploadModalHandle}
          assignment={uploadModal}
        />
      )}

    </div>
  );
};

export default Assignments;
