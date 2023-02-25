// Components
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SortIcon from "@mui/icons-material/Sort";
import { IoDocumentsOutline } from "react-icons/io5";

// Data
import autoCompleteData from "../../data/auto_complete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledButton = styled(Button)(() => ({
  textTransform: "capitalize",
}));

function createData(filename, filesize, subject, date) {
  return { filename, filesize, subject, date };
}

const rows = [
  createData("Listening Mock Tests", 1.59, "Listening", "24/01/23"),
  createData("Reading Comprehensions", 2.37, "Reading", "24/01/23"),
  createData("Mock Test Final", 2.62, "Mock Test", "24/01/23"),
  createData("Mock Test Initial", 3.05, "Mock Test", "24/01/23"),
  createData("Mock Test Initial", 3.05, "Mock Test", "24/01/23"),
  createData("Reading Comprehensions", 2.37, "Reading", "24/01/23"),
  createData("Mock Test Final", 2.62, "Mock Test", "24/01/23"),
  createData("Mock Test Initial", 3.05, "Mock Test", "24/01/23"),
];

const Documents = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="border-b-1 border-zinc-400 w-full text-4xl font-semibold py-4 mb-10">
        Documents
      </h1>

      <div className="flex justify-between items-center w-full mb-6 py-6">
        <Autocomplete
          className="w-2/5 bg-white"
          id="free-solo-search"
          freeSolo
          options={autoCompleteData.map((option) => option)}
          renderInput={(params) => (
            <TextField {...params} label="Search for Documents" />
          )}
        />

        <button className="bg-[#F4F4F4] text-[#00000091] py-2 px-3 rounded font-semibold text-md flex items-center justify-center">
          Sort
          <SortIcon className="ml-2" />
        </button>
      </div>

      <TableContainer component={Paper} className="mb-10">
        <Table aria-label="customized table">
          <TableHead className="bg-[#4396FF]">
            <TableRow>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell align="center">File Size (mb)</StyledTableCell>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Date Uploaded</StyledTableCell>
              <StyledTableCell align="center">Download</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.filename}>
                <StyledTableCell component="th" scope="row">
                  <span className="font-semibold flex items-center">
                    <IoDocumentsOutline className="mr-3 text-2xl text-[#72B0FF]" />
                    {row.filename}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <span className="font-semibold text-[gray]">
                    {row.filesize}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <span className="font-semibold text-[gray]">
                    {row.subject}
                  </span>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <span className="font-semibold text-[gray]">{row.date}</span>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <StyledButton
                    variant="outlined"
                    endIcon={<FileDownloadIcon />}
                  >
                    Download
                  </StyledButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={10} />
    </div>
  );
};

export default Documents;
