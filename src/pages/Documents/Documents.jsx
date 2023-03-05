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
import { FileDownload, Assignment } from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import SortButton from "../../components/shared/SortButton/SortButton";

const Notes = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];

  // Component
  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
        Documents
      </h1>

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: "100%", px: 2, py: 4 }}
      >
        <SearchBar />

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
                File Size (MB)
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
              >
                Subject
              </TableCell>

              <TableCell
                align="center"
                sx={{ fontWeight: 600, fontSize: "1rem" }}
              >
                Date Uploaded
              </TableCell>

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
                  Test Docs
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
                  4.5
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
                  Listening
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
    </Box>
  );
};

export default Notes;
