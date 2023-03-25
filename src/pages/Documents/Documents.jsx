import { useState, useEffect } from "react";
import document from "../../api/document";

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
import { FileDownload, Assignment } from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import SortButton from "../../components/shared/SortButton/SortButton";

const Notes = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getAllDocs = async () => {
      const docs = await document.getDocuments();
      setDocuments(docs.data);
    };

    getAllDocs();
    console.log(documents);
  }, [documents.length]);

  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
        Documents
      </h1>

      <Box
        display="flex"
        justifyContent="space-between"
        className="w-full md:px-2 py-4"
      >
        <SearchBar />
        <SortButton />
      </Box>

      <Box className="flex flex-col items-center" sx={{ width: "100%" }}>
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
            {documents.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer duration-300 hover:bg-[#d0e1f9] border-b md:border-0 border-[#C0C0C0]"
              >
                <td className="text-left md:text-center py-2">
                  <div className="flex items-center justify-start md:justify-center">
                    <Assignment className="mr-3 text-[#4C9BFF]" />
                    <div className="inline">
                      <span className="font-semibold block">{item.file}</span>
                      <span className="text-sm font-semibold md:hidden text-[#6D6D6D]">
                        {item.file}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {item.fileSize}
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {item.subject}
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {item.createdAt}
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
                <td className="py-2 text-center md:hidden">
                  <button className="text-[#0064E1]">
                    <FileDownload />
                  </button>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>

        {/* <Pagination count={10} className="mt-6" /> */}
      </Box>
    </Box>
  );
};

export default Notes;
