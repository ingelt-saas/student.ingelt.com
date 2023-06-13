import { useQuery } from "@tanstack/react-query";
import React from "react";
import assignmentApi from "../../api/assignment";
import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { Download, RemoveRedEye, Upload } from "@mui/icons-material";

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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-sm:px-5">
              {assignments?.rows.map((item) => (
                <div
                  className="bg-white flex flex-col p-3 rounded-lg shadow-lg"
                  key={item?.id}
                >
                  <div className="flex-1 pb-3">
                    <img
                      src={assignmentSVG}
                      alt=""
                      className="mx-auto h-20 w-auto"
                    />
                    <h2 className="text-center text-lg 2xl:text-lg text-[#00285A] font-medium">
                      {item.name}
                    </h2>
                  </div>
                  <div className="flex justify-between pt-2 border-[#0000000F] border-t">
                    <div className="flex flex-col gap-y-2">
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
                    <div className="flex flex-col gap-y-2">
                      <p className="flex flex-col">
                        <span className="text-base 2xl:text-md font-medium text-[#00285A]">
                          Upload Date
                        </span>
                        <span className="text-[#00000099] text-sm 2xl:text-xs">
                          {moment(item.createdAt).format("ll")}
                        </span>
                      </p>
                      <p className="flex flex-col">
                        {/* <span className='text-base 2xl:text-xl font-medium text-[#00285A]'>Deadline</span> */}
                        {/* <span className='text-[#00000099] text-sm 2xl:text-lg'>Not Complete</span> */}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    {item?.submissions?.status === "submitted" ? (
                      <Button
                        variant="outlined"
                        className="!text-xs 2xl:!text-md"
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
                        className="!text-xs 2xl:!text-md"
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
                      className="!text-xs 2xl:!text-md"
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
