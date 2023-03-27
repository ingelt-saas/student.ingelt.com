// React Support
import { useState, useEffect } from "react";
import assignmentApi from "../../api/assignment";

// MUI Support
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
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
// import PDFViewerModal from "../../components/shared/PDFViewerModal/PDFViewerModal";

const Assignments = () => {

  const [uploadModal, setUploadModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    assignmentApi.getAllAssignments().then((res) => {
      setAssignments(res.data);
    });
  }, []);

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
        <SearchBar />
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
                        STATUS
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  STATUS
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {item.assignedDate}
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {item.endDate}
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D] font-bold">
                  7.2
                </td>
                <td className="py-2 text-center hidden md:table-cell">
                  <Button
                    onClick={() => setUploadModal(true)}
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

        {/* <Pagination count={10} className="mt-6" /> */}
      </Box>

      {/* Upload modal */}
      <UploadModal
        uploadModal={uploadModal ? true : false}
        uploadModalHandle={uploadModalHandle}
        assignment={uploadModal}
      />

      {/* Stats modal */}
      <StatsModal statsModal={statsModal} statsModalHandle={statsModalHandle} assignments={assignments} />

      {/* popover modal */}
      <PopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl} assignment={{}} />
    </Box>
  );
};

export default Assignments;
