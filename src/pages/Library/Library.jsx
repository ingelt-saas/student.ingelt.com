import { useState, useEffect } from "react";
// import LibraryApi from "../../api/Library";

// MUI Support
import {
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
import { FileDownload, Assignment, Sort } from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import SortButton from "../../components/shared/SortButton/SortButton";
import libraryApi from "../../api/library";
import moment from "moment";
import getFile from "../../api/getFile";

const Library = () => {

  const [Library, setLibrary] = useState([]);
  const [sort,setSort]=useState(false);
  const [sortOption, setSortOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, rows: 5 });

  // file size converted , bytes into kb, mb, gb, tb
  const fileSize = (size) => {
    if (typeof size !== 'number') {
      return '';
    }
    let units = ['B', 'KB', 'MB', 'GB', 'TB'],
      bytes = size,
      i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
      bytes /= 1024;
    }

    return bytes.toFixed(2) + ' ' + units[i];
  };

  const downloadItem = async (key) => {
    const res = await getFile(key);
    window.open(res?.data, '_blank');
  }

  // search library items
  const searchLibrary = (e) => {
    e.preventDefault();
    setSearchValue(e.target.search.value);
    setPagination({ rows: 5, page: 0 });
  }

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      libraryApi.search(searchValue, pagination.page + 1, pagination.rows)
        .then(res => {
          setTotalItems(res?.data?.count);
          setLibrary(res?.data?.rows);
          setLoading(false);
        });
    } else {
      setLoading(true);
      libraryApi.getAll(pagination.page + 1, pagination.rows)
        .then(res => {
          setTotalItems(res?.data?.count);
          setLibrary(res?.data?.rows);
          setLoading(false);
        });
    }

  }, [searchValue, pagination]);

  // Component
  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
        InGelt's Library
      </h1>

      <Box
        display="flex"
        justifyContent="space-between"
        className="w-full md:px-2 py-4"
      >
        <SearchBar handleSubmit={searchLibrary} />
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
          >
            <Sort sx={{}} />
          </Button>
          <Popover
            open={sort}
            onClose={() => setSort(false)}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 160, left: 1350 }}
          >
            <Box sx={{ p: 2, width: 180 }}>
              <h3 className="text-lg font-semibold mb-2">Sort By</h3>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort1" onChange={() => setSortOption('name')} />
                <label htmlFor="sort1">Name</label>
              </div>
              {/* <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort2" onChange={() => setSortOption('evaluated')} />
                <label htmlFor="sort2">Evaluated</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="radio" name="sort" id="sort3" onChange={() => setSortOption('submitted')} />
                <label htmlFor="sort3">Submitted</label>
                </div> */}
            </Box>
          </Popover>
      </Box>

      {loading && <div className="py-10 flex justify-center">
        <CircularProgress />
      </div>}

      {!loading && <Box className="flex flex-col items-center" sx={{ width: "100%" }}>

        {Array.isArray(Library) && Library.length > 0 ? <Table>
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

          <TableBody>
            {Library?.map((item) => (
              <tr
                key={item?.id}
                className="cursor-pointer duration-300 hover:bg-[#d0e1f9] border-b md:border-0 border-[#C0C0C0]"
              >
                <td className="text-left md:text-center py-2">
                  <div className="flex items-center justify-start md:justify-center">
                    <Assignment className="mr-3 text-[#4C9BFF]" />
                    <div className="inline">
                      <span className="font-semibold block">{item?.name}</span>
                      <span className="text-sm font-semibold md:hidden text-[#6D6D6D]">
                        {item?.fileSize} - {item?.createdAt}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {fileSize(item?.fileSize)}
                </td>
                <td className="py-2 text-center capitalize text-sm hidden md:table-cell text-[#6D6D6D]">
                  {item?.subject}
                </td>
                <td className="py-2 text-center text-sm hidden md:table-cell text-[#6D6D6D]">
                  {moment(item?.createdAt).format('ll')}
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
                    onClick={() => downloadItem(item?.file)}
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
        </Table> : <p></p>
        }

        <TablePagination
          component='div'
          color="primary"
          count={totalItems}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          page={pagination.page}
          rowsPerPage={pagination.rows}
          onPageChange={(_, newPage) => setPagination({ ...pagination, page: newPage })}
          onRowsPerPageChange={(e) => setPagination({ ...pagination, rows: e.target.value })}
          className="mt-6" />

      </Box>}

    </Box >
  );
};

export default Library;
