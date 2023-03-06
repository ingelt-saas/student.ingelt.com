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
import { FileUpload, FileDownload, Assignment } from "@mui/icons-material";

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
    console.log(value);
    setUploadModal(value);
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
        sx={{ width: "100%", px: 2, py: 4 }}
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

      <Box className="flex flex-col items-center" sx={{ width: "100%" }}>
        <Table>
          <TableHead>
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
            {data.map((item) => (
              <TableRow key={item}>
                <TableCell
                  align="center"
                  sx={{ borderBottomWidth: "0", py: 1, fontWeight: 600 }}
                >
                  <Assignment className="mr-3 text-[#4C9BFF]" />
                  Assignment 1.pdf
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottomWidth: "0",
                    py: 1,
                    fontWeight: 500,
                    color: "#6D6D6D",
                  }}
                >
                  Not Complete
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottomWidth: "0",
                    py: 1,
                    fontWeight: 500,
                    color: "#6D6D6D",
                  }}
                >
                  1-02-2023
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottomWidth: "0",
                    py: 1,
                    fontWeight: 500,
                    color: "#6D6D6D",
                  }}
                >
                  1-02-2023
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottomWidth: "0",
                    py: 1,
                    fontWeight: 500,
                    color: "#6D6D6D",
                  }}
                >
                  7.2
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottomWidth: "0", py: 1 }}
                >
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
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ borderBottomWidth: "0", py: 1 }}
                >
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
                </TableCell>
              </TableRow>
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
    </Box>
  );
};

export default Assignments;
