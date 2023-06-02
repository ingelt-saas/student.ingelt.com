// React Support
import { useState, useEffect } from "react";
import assignmentApi from "../../api/assignment";

// MUI Support
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  // Pagination,
  TableRow,
} from "@mui/material";
import {
  FileUpload,
  FileDownload,
  Assignment,
  MoreVert,
  Sort,
  RemoveRedEye
} from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
// import SortButton from "../../components/shared/SortButton/SortButton";
import UploadModal from "../../components/shared/UploadModal/UploadModal";
import StatsModal from "../../components/shared/StatsModal/StatsModal";
import PopOver from "../../components/shared/PopOverModal/PopOverModal";
import moment from "moment/moment";
import getFile from "../../api/getFile";
import UpdateSubmissionModal from "../../components/Submission/UpdateSubmissionModal";
// import PDFViewerModal from "../../components/shared/PDFViewerModal/PDFViewerModal";

const Assignments = () => {

  const [uploadModal, setUploadModal] = useState({ open: false, value: null });
  const [sort, setSort] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [statsModal, setStatsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState(null);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [pagination, setPagination] = useState({ rows: 10, page: 0 });
  const [searchValue, setSearchValue] = useState(null);
  const [submissionUpdateModal, setSubmissionUpdateModal] = useState(null);

  // fetch and search assignments
  useEffect(() => {

    setLoading(true);
    assignmentApi.getAllAssignments(pagination.page + 1, pagination.rows, searchValue)
      .then((res) => {
        setTotalAssignments(res?.data?.count);
        //sorting
        let sortedRows = res.data?.rows;
        if (sortOption === "name") {
          sortedRows = sortedRows.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "evaluated") {
          sortedRows = sortedRows.filter(a => {
            const status = a.submissions.evaluated;
            return status === 1;
          });
        } else if (sortOption === "submitted") {
          sortedRows = sortedRows.filter(a => {
            const status = a.submissions.evaluated;
            return status === 0;
          });

        } else if (sortOption === "notDone") {
          sortedRows = sortedRows.filter(a => {
            const status = a.submissions ? a.submissions.evaluated : null;
            return status === 0 || status === null;
          });
        }
        setAssignments(sortedRows);
        setLoading(false);
      });
  }, [pagination, searchValue, sortOption]);

  // search assignment form handle
  const searchAssignments = (e) => {
    e.preventDefault();
    setPagination({ page: 0, rows: 5 });
    setSearchValue(e.target.search.value);
  }

  const downloadAssignment = async (key) => {
    const res = await getFile(key);
    window.open(res?.data, '_blank');
  }

  const viewSubmission = async (item) => {
    const res = await getFile(item?.submissions?.file);
    window.open(res?.data, '_blank');
  }

  // Event Handlers
  const uploadModalHandle = () => {
    setUploadModal(false);
  };

  const statsModalHandle = (value) => {
    setStatsModal(value);
  };

  const popOverHandle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
        Assignments
      </h1>

      <Box className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between w-full md:px-2 py-4">
        <SearchBar handleSubmit={searchAssignments} />
        <div className="flex justify-center sm:justify-end gap-x-9 w-full sm:w-1/2">
          <Button
            variant="contained"
            sx={{
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 2,
            }}
            onClick={() => setStatsModal(true)}
          >
            Show Stats
          </Button>
          <Button
            variant="text"
            sx={{
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 2,
              color: "#00000085",
              backgroundColor: "#F4F4F4",
              display: { xs: 'none', md: 'flex' }
            }}
            onClick={() => setSort(true)}
          >
            Sort
            <Sort sx={{ ml: 0.4 }} />
          </Button>
          <Button
            variant="text"
            sx={{
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 2,
              color: "#00000085",
              backgroundColor: "#F4F4F4",
              display: { xs: 'flex', md: 'none' }
            }}
            onClick={() => setSort(true)}
          >
            <Sort sx={{}} />
          </Button>
          <Popover
            open={sort}
            onClose={() => setSort(false)}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 170, left: 1600 }}
          >
            <Box sx={{ p: 2, width: { xs: 150, md: 180 }, }}>
              <h3 className="text-lg font-semibold mb-2">Sort By</h3>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort1" onChange={() => setSortOption('name')} />
                <label htmlFor="sort1">Name</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort2" onChange={() => setSortOption('evaluated')} />
                <label htmlFor="sort2">Evaluated</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort3" onChange={() => setSortOption('submitted')} />
                <label htmlFor="sort3">Submitted</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort3" onChange={() => setSortOption('notDone')} />
                <label htmlFor="sort3">Not Done</label>
              </div>
            </Box>
          </Popover>
        </div>
      </Box>

      {loading && <div className="py-10 flex justify-center">
        <CircularProgress />
      </div>}

      {!loading && (Array.isArray(assignments) && assignments.length > 0 ?
        <Box className="flex-col items-center flex" sx={{ width: "100%" }}>
          <Table>
            <TableHead className="!hidden md:!table-header-group">
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Topic
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Module
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Uploaded By
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Marks
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer duration-300 hover:bg-[#d0e1f9]"
                >
                  <td className="text-left md:text-center py-2">
                    {/* <div className="flex items-center justify-start md:justify-center">
                      <Assignment className="mr-3 text-[#4C9BFF]" />
                      <div className="inline">
                        <span className="font-semibold block">{item.name}</span>
                        <span className="text-sm font-normal md:hidden">
                          {item.submissions ? (item.submissions.evaluated ? 'Evaluated' : 'Submitted') : 'Not Done'}
                        </span>
                      </div>
                    </div> */}
                    <div className="flex items-center justify-start md:justify-end">
                      <div className='2xl:w-[75%] xl:w-[80%] lg:w-[90%] md:w-[100%] flex'>
                        <Assignment className="mr-3 text-[#4C9BFF]" />
                        <div className="inline text-left">
                          <span className="font-semibold block">
                            {item.name}
                          </span>
                          <span className="text-sm font-normal md:hidden">
                            {item.submissions ? (item.submissions.evaluated ? 'Evaluated' : 'Submitted') : 'Not Done'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    <span className="capitalize">{item?.subject}</span>
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    <span className="capitalize">{item?.uploaderName}</span>
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    {!item.submissions.id ? 'Not Done' : (item.submissions.evaluated ? 'Evaluated' : 'Submitted')}
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    {item.submissions && (item.submissions.evaluated ? item.submissions.scores : '')}
                  </td>
                  <td className="py-2 text-center hidden md:table-cell">
                    {item.submissions?.id && <Button
                      onClick={() => viewSubmission(item)}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        color: "#6D6D6D",
                        borderColor: "#6D6D6D",
                        borderRadius: "8px",
                        marginRight: '0.5rem'
                      }}
                    >
                      View Submission
                      <RemoveRedEye fontSize="small" sx={{ marginLeft: "2px" }} />
                    </Button>}
                    {item.submissions?.id && <Button
                      onClick={() => setSubmissionUpdateModal(item)}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        color: "#6D6D6D",
                        borderColor: "#6D6D6D",
                        borderRadius: "8px",
                        marginRight: '0.5rem'
                      }}
                    >
                      Update Submission
                    </Button>}
                    {!item.submissions?.id && <Button
                      onClick={() => setUploadModal({ open: true, value: item })}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        color: "#6D6D6D",
                        borderColor: "#6D6D6D",
                        borderRadius: "8px",
                        marginRight: '0.5rem'
                      }}
                    >
                      Submit
                      <FileUpload sx={{ marginLeft: "2px" }} />
                    </Button>}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        color: "#0064E1",
                        borderColor: "#0064E1",
                        borderRadius: "8px",
                      }}
                      onClick={() => downloadAssignment(item?.file)}
                    >
                      View
                      <RemoveRedEye sx={{ marginLeft: "4px" }} />
                    </Button>
                  </td>
                  <td className="py-2 text-right md:hidden">
                    <button onClick={popOverHandle}>
                      <MoreVert />
                    </button>
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component='div'
            color="primary"
            count={totalAssignments}
            rowsPerPageOptions={[10, 25, 50, 100]}
            page={pagination.page}
            rowsPerPage={pagination.rows}
            onPageChange={(_, newPage) => setPagination({ ...pagination, page: newPage })}
            onRowsPerPageChange={(e) => setPagination({ ...pagination, rows: e.target.value })}
            className="mt-6" />

        </Box> : <Alert severity="warning" icon={false} className="mx-auto w-fit">No Assignments Found</Alert>
      )}

      {/* Upload modal */}
      {uploadModal.value && <UploadModal
        uploadModal={uploadModal.open}
        uploadModalHandle={uploadModalHandle}
        assignment={uploadModal.value}
      />}

      {/* Stats modal */}
      <StatsModal statsModal={statsModal} statsModalHandle={statsModalHandle} totalAssignments={totalAssignments} />

      {/* popover modal */}
      <PopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl} assignment={{}} />

      {/* update submission modal */}
      <UpdateSubmissionModal
        open={Boolean(submissionUpdateModal)}
        data={submissionUpdateModal}
        close={() => setSubmissionUpdateModal(null)}
      />

    </Box>
  );
};

export default Assignments;
