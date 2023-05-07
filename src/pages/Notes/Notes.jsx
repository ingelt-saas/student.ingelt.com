import React, { useState, useEffect } from 'react';

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
import { FileDownload, Assignment } from "@mui/icons-material";

// Custom Components
import SearchBar from "../../components/shared/SearchBar/SearchBar";
import SortButton from "../../components/shared/SortButton/SortButton";
import notesApi from '../../api/notes';
import moment from 'moment/moment';

const Notes = () => {

    const [notes, setNotes] = useState(null);
    const [totalNotes, setTotalNotes] = useState(0);
    const [pagination, setPagination] = useState({ page: 0, rows: 5 });
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState();

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

    useEffect(() => {
        if (searchValue) {
            setLoading(true);
            notesApi.search(searchValue, pagination.page + 1, pagination.rows)
                .then(res => {
                    setTotalNotes(res?.data?.count);
                    setNotes(res?.data?.rows);
                    setLoading(false);
                })
        } else {
            notesApi.getNotes(pagination.page + 1, pagination.rows)
                .then(res => {
                    setTotalNotes(res?.data?.count);
                    setNotes(res?.data?.rows);
                    setLoading(false);
                })
        }
    }, [pagination, searchValue]);

    // search handler
    const searchNotes = async (e) => {
        e.preventDefault();
        setPagination({ rows: 5, page: 0 });
        setSearchValue(e.target.search.value);
    }

    return (
        <Box sx={{ width: "100%" }}>
            <h1 className="border-b-1 border-[#DCDEE1] w-full text-4xl pb-4 mb-6">
                Notes
            </h1>

            <Box display="flex" justifyContent="space-between" className="w-full md:px-2 py-4">
                <SearchBar handleSubmit={searchNotes} />
                <SortButton />
            </Box>


            {loading && <div className="py-10 flex justify-center">
                <CircularProgress />
            </div>}

            {!loading && Array.isArray(notes) && notes.length > 0 && <Box className="flex flex-col items-center" sx={{ width: "100%" }}>
                {Array.isArray(notes) && <Table>
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
                        {notes.map((item) => (
                            <tr
                                key={item.id}
                                className="cursor-pointer duration-300 hover:bg-[#d0e1f9] border-b md:border-0 border-[#C0C0C0]"
                            >
                                <td className="text-left md:text-center py-2">
                                    <div className="flex items-center justify-start md:justify-center">
                                        <Assignment className="mr-3 text-[#4C9BFF]" />
                                        <div className="inline">
                                            <span className="font-semibold block">{item.name}</span>
                                            <span className="text-sm font-semibold md:hidden text-[#6D6D6D]">
                                                {item.name}
                                            </span>
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
                                    {moment(item.createdAt).format('ll')}
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
                </Table>}

                <TablePagination
                    component='div'
                    color="primary"
                    count={totalNotes}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    page={pagination.page}
                    rowsPerPage={pagination.rows}
                    onPageChange={(_, newPage) => setPagination({ ...pagination, page: newPage })}
                    onRowsPerPageChange={(e) => setPagination({ ...pagination, rows: e.target.value })}
                    className="mt-6" />
            </Box>}
            {!loading && Array.isArray(notes) && notes.length <= 0 && <p className='text-center text-red-500 text-xl font-semibold'>Note Not Found</p>}

        </Box>
    );
}

export default Notes;
