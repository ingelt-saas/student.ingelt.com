import React, { useState, useEffect } from "react";

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
import { Assignment, RemoveRedEye } from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
// import SortButton from "../../components/shared/SortButton/SortButton";
import notesApi from "../../api/notes";
import moment from "moment/moment";
import getFile from "../../api/getFile";

const Notes = () => {
  const [notes, setNotes] = useState(null);
  const [sort, setSort] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [totalNotes, setTotalNotes] = useState(0);
  const [pagination, setPagination] = useState({ page: 0, rows: 10 });
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState();

  // file size converted , bytes into kb, mb, gb, tb
  const fileSize = (size) => {
    if (typeof size !== "number") {
      return "";
    }
    let units = ["B", "KB", "MB", "GB", "TB"],
      bytes = size,
      i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
      bytes /= 1024;
    }

    return bytes.toFixed(2) + " " + units[i];
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setSortOption('');
      try {
        const res = await notesApi.getNotes(pagination.page + 1, pagination.rows, searchValue);
        setTotalNotes(res.data?.count || 0);
        //sort
        if (sortOption === "name") {
          setNotes(
            res?.data?.rows.sort((a, b) => a.name.localeCompare(b.name))
          );
        } else if (sortOption === "createdAt") {
          setNotes(
            res?.data?.rows.sort((a, b) => {
              if (a.createdAt < b.createdAt) {
                return -1;
              }
              if (a.createdAt > b.createdAt) {
                return 1;
              }
              return 0;
            })
          );
        } else if (sortOption === "listening") {
          setNotes(
            res?.data?.rows.filter((item) => item.subject === 'listening')
          );
        } else if (sortOption === "reading") {
          setNotes(
            res?.data?.rows.filter((item) => item.subject === 'reading')
          );
        } else if (sortOption === "writing") {
          setNotes(
            res?.data?.rows.filter((item) => item.subject === 'writing')
          );
        } else if (sortOption === "speaking") {
          setNotes(
            res?.data?.rows.filter((item) => item.subject === 'speaking')
          );
        } else {
          setNotes(res?.data?.rows);
        }
      } catch (err) { }
      finally {
        setLoading(false);
      }
    })();
  }, [pagination, searchValue, sortOption]);

  // search handler
  const searchNotes = async (e) => {
    e.preventDefault();
    setPagination({ rows: 10, page: 0 });
    setSearchValue(e.target.search.value);
  };

  // download notes
  const downloadNote = async (key) => {
    const res = await getFile(key);
    window.open(res.data, '_blank');
  }

  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
        Notes
      </h1>

      <Box
        display="flex"
        justifyContent="space-between"
        className="w-full md:px-2 py-4"
      >
        <SearchBar handleSubmit={searchNotes} />
        {/* <Button
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
              <input type="radio" name="sort" id="sort1" onChange={() => setSortOption('date')} />
              <label htmlFor="sort1">Date</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="radio" name="sort" id="sort2" onChange={() => setSortOption('listening')} />
              <label htmlFor="sort2">Listening</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="radio" name="sort" id="sort3" onChange={() => setSortOption('reading')} />
              <label htmlFor="sort3">Reading</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="radio" name="sort" id="sort3" onChange={() => setSortOption('speaking')} />
              <label htmlFor="sort3">Speaking</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="radio" name="sort" id="sort3" onChange={() => setSortOption('writing')} />
              <label htmlFor="sort3">Writing</label>
            </div>
          </Box>
        </Popover> */}
      </Box>

      {loading && (
        <div className="py-10 flex justify-center">
          <CircularProgress />
        </div>
      )}

      {!loading && (Array.isArray(notes) && notes.length > 0 ?
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
                  File Size
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

            {notes.length > 0 && (
              <TableBody>
                {notes.map((item) => (
                  <tr
                    key={item.id}
                    className="cursor-pointer duration-300 hover:bg-[#d0e1f9] border-b md:border-0 border-[#C0C0C0]"
                  >
                    <td className="text-left md:text-center py-2">
                      <div className="flex items-center justify-start md:justify-end">
                        <div className='2xl:w-[65%] xl:w-[70%] lg:w-[80%] md:w-[90%] flex'>
                          <Assignment className="mr-3 text-[#4C9BFF]" />
                          <div className="inline">
                            <span className="font-semibold block">
                              {item.name}
                            </span>
                            <span className="text-sm font-semibold md:hidden text-[#6D6D6D]">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                      {fileSize(item.fileSize)}
                    </td>
                    <td className="py-2 capitalize text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                      {item.subject}
                    </td>
                    <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                      {moment(item.createdAt).format("ll")}
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
                        onClick={() => downloadNote(item.file)}
                      >
                        View
                        <RemoveRedEye sx={{ marginLeft: '4px' }} fontSize="small" />
                      </Button>
                    </td>
                    <td className="py-2 text-center md:hidden">
                      <button onClick={() => downloadNote(item.file)} className="text-[#0064E1]">
                        <RemoveRedEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </TableBody>
            )}
          </Table>

          <TablePagination
            component="div"
            color="primary"
            count={totalNotes}
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
        </Box> : <Alert severity="warning" icon={false} className='w-fit mx-auto'>No Notes Found</Alert>
      )}
    </Box>
  );
};

export default Notes;
