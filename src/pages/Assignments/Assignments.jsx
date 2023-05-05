// React Support
import { useState, useEffect } from "react";
import assignmentApi from "../../api/assignment";

// MUI Support
import {
  Box,
  Button,
  CircularProgress,
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
} from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import SortButton from "../../components/shared/SortButton/SortButton";
import UploadModal from "../../components/shared/UploadModal/UploadModal";
import StatsModal from "../../components/shared/StatsModal/StatsModal";
import PopOver from "../../components/shared/PopOverModal/PopOverModal";
import moment from "moment/moment";
import getFile from "../../api/getFile";
// import PDFViewerModal from "../../components/shared/PDFViewerModal/PDFViewerModal";

const Assignments = () => {

  const [uploadModal, setUploadModal] = useState({ open: false, value: null });
  const [statsModal, setStatsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState(null);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [pagination, setPagination] = useState({ rows: 5, page: 0 });
  const [searchValue, setSearchValue] = useState(null);


  // fetch and search assignments
  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      assignmentApi.searchAssignments(searchValue, pagination.page + 1, pagination.rows)
        .then(res => {
          setTotalAssignments(res?.data?.count);
          setAssignments(res.data?.rows);
          setLoading(false);
        })
    } else {
      setLoading(true);
      assignmentApi.getAllAssignments(pagination.page + 1, pagination.rows)
        .then((res) => {
          setTotalAssignments(res?.data?.count);
          setAssignments(res.data?.rows);
          setLoading(false);
        });
    }
  }, [pagination, searchValue]);

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
        <div className="flex justify-center sm:justify-between gap-x-9 w-full sm:w-1/2">
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
          <SortButton />
        </div>
      </Box>

      {loading && <div className="py-10 flex justify-center">
        <CircularProgress />
      </div>}

      {!loading && Array.isArray(assignments) && assignments.length > 0 && (
        <Box className="flex-col items-center flex" sx={{ width: "100%" }}>
          <Table>
            <TableHead className="!hidden md:!table-header-group">
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  File Name
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
                  Assigned Date
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Deadline
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
                    <div className="flex items-center justify-start md:justify-center">
                      <Assignment className="mr-3 text-[#4C9BFF]" />
                      <div className="inline">
                        <span className="font-semibold block">{item.name}</span>
                        <span className="text-sm font-normal md:hidden">
                          {item.submissions ? (item.submissions.evaluated ? 'Evaluated' : 'Submitted') : 'Not Done'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    {!item.submissions.id ? 'Not Done' : (item.submissions.evaluated ? 'Evaluated' : 'Submitted')}
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    {moment(item.assignedDate).format('ll')}
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                    {moment(item.endDate).format('ll')}
                    <small className="ml-1">{moment(item.endDate).format('LT')}</small>
                  </td>
                  <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D] font-bold">
                    {item.submissions && (item.submissions.evaluated ? item.submissions.scores : '')}
                  </td>
                  <td className="py-2 text-center hidden md:table-cell">
                    <Button
                      onClick={() => setUploadModal({ open: true, value: item })}
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        color: "#6D6D6D",
                        borderColor: "#6D6D6D",
                        borderRadius: "8px",
                      }}
                    >
                      Submit
                      <FileUpload sx={{ marginLeft: "2px" }} />
                    </Button>
                  </td>
                  <td className="py-2 text-center hidden md:table-cell">
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
                      Download
                      <FileDownload sx={{ marginLeft: "2px" }} />
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
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            page={pagination.page}
            rowsPerPage={pagination.rows}
            onPageChange={(_, newPage) => setPagination({ ...pagination, page: newPage })}
            onRowsPerPageChange={(e) => setPagination({ ...pagination, rows: e.target.value })}
            className="mt-6" />

        </Box>
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
    </Box>
  );
};

export default Assignments;
