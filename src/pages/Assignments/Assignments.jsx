// React Support
import { useState } from "react";

// MUI Support
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  TableRow,
} from "@mui/material";
import { FileUpload, FileDownload, Assignment, MoreVert } from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import SortButton from "../../components/shared/SortButton/SortButton";
import UploadModal from "../../components/shared/UploadModal/UploadModal";
import StatsModal from "../../components/shared/StatsModal/StatsModal";

const Assignments = () => {
  // States
  const [uploadModal, setUploadModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);

  // Event Handlers
  const uploadModalHandle = (value) => {
    setUploadModal(value);
  };

  const statsModalHandle = (value) => {
    setStatsModal(value);
  };

  const data = [1, 2, 3, 4, 5, 6, 7, 8];

  // Component
  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
        Assignments
      </h1>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          width: "100%",
          px: {
            md: 2
          },
          py: 4
        }}
      >
        <SearchBar />
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

              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
              ></TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
              ></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <tr key={item} className='cursor-pointer duration-300 hover:bg-[#d0e1f9]'>
                <td className="text-left md:text-center py-2">
                  <div className="flex items-center">
                    <Assignment className="mr-3 text-[#4C9BFF]" />
                    <div className="inline">
                      <span className="font-semibold block">Assignment {index}.pdf</span>
                      <span className="text-sm font-normal md:hidden">Not Complete</span>
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  Not Complete
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  1-02-2023
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  1-02-2023
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
                    Upload
                    <FileUpload />
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
                    <FileDownload />
                  </Button>
                </td>
                <td className="py-2 text-right md:hidden">
                  <button>
                    <MoreVert />
                  </button>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>

        <Pagination count={10} className="mt-6" />
      </Box>

      {/* Upload modal */}
      <UploadModal
        uploadModal={uploadModal}
        uploadModalHandle={uploadModalHandle}
      />

      {/* Stats modal */}
      <StatsModal statsModal={statsModal} statsModalHandle={statsModalHandle} />
    </Box >
  );
};

export default Assignments;
