import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import getFile from '../../api/getFile';
import { Alert, Button, CircularProgress, IconButton, TablePagination } from '@mui/material';

//assets
import assignmentSVG from '../../assets/images/assignment.svg';
import moment from 'moment';
import { Download } from '@mui/icons-material';
import notesApi from '../../api/notes';

const Notes = ({ searchQuery }) => {

    const [pagination, setPagination] = useState({ rows: 10, page: 0 });

    const { data: notes, isLoading } = useQuery({
        queryKey: ['notes', searchQuery, pagination],
        queryFn: async () => {
            const res = await notesApi.getNotes(pagination.page + 1, pagination.rows, searchQuery);
            return res.data;
        }
    });

    // download handler
    const downloadNote = async (key, fileName) => {
        const result = await getFile(key);
        const awsUrl = result.data;
        const res = await fetch(awsUrl);
        const blob = await res.blob();

        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

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

    return (
        <div className='mt-10'>
            {isLoading && <div className='flex justify-center'>
                <CircularProgress />
            </div>}
            {!isLoading && (Array.isArray(notes?.rows) && notes?.rows?.length > 0 ?
                <div>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-sm:px-5'>
                        {notes?.rows.map(item => <div key={item.id} className='h-full'>
                            {/* large device */}
                            <div className='flex flex-col items-center justify-center bg-white rounded-xl h-full 2xl:w-[19vw] xl:w-[18vw] lg:w-[28vw] shadow-[0px_10px_36px_rgba(0,0,0,0.16),0px_0px_0px_1px_rgba(0,0,0,0.06)] scale-95 hover:scale-100 duration-200 transition-transform hover:cursor-pointer'>
                                <div className='h-[60%] flex flex-col items-center justify-center pb-2 pt-6 border-[#0000000F] border-b w-full'>
                                    <img src={assignmentSVG} alt='' className='mx-auto' />
                                    <h2 className='font-bold px-4 py-2'>{item.name}</h2>
                                </div>
                                <div className='flex justify-between w-full px-6 py-2'>
                                    <p className='flex flex-col'>
                                        <span className='ext-base 2xl:text-md font-medium text-[#00285A]'>File Size</span>
                                        <span className='text-[#00000099] text-sm 2xl:text-xs'>
                                            {fileSize(item?.fileSize)}
                                        </span>
                                    </p>
                                    <p className='flex flex-col'>
                                        <span className='text-base 2xl:text-md font-medium text-[#00285A]'>Upload Date</span>
                                        <span className='text-[#00000099] text-sm 2xl:text-xs'>{moment(item.createdAt).format('ll')}</span>
                                    </p>
                                </div>
                                <div className='flex justify-between items-center mt-3 w-full px-4 pb-2'>
                                    <Button
                                        onClick={() => downloadNote(item.file, item.name)}
                                        variant="contained"
                                        className="!text-base 2xl:!text-md"
                                        sx={{
                                            border: "2px solid #0C3C82",
                                            width: "100%",
                                            borderRadius: "7px",
                                            textTransform: "capitalize",
                                            backgroundColor: "#0C3C82",
                                            color: "white",
                                            fontWeight: 400,
                                            padding: "4px 8px",
                                            "&:hover": {
                                                border: "2px solid #0C3C82",
                                                backgroundColor: "#0C3C82",
                                                color: "white",
                                            },
                                        }}
                                        endIcon={<Download />}
                                    >Download</Button>
                                </div>
                            </div>

                            {/* mobile device */}
                            <div className="flex items-center py-2 px-3 rounded-md sm:hidden shadow-[0px_10px_36px_rgba(0,0,0,0.16),0px_0px_0px_1px_rgba(0,0,0,0.06)]">
                                <div className="flex flex-1 gap-2">
                                    <img src={assignmentSVG} alt="" className='w-8 h-auto' />
                                    <div>
                                        <p className="font-semibold text-[#00285A]">{item.name}</p>
                                        <span className="text-[#00000099] text-sm 2xl:text-xs">
                                            {fileSize(item?.fileSize)}
                                        </span>
                                    </div>
                                </div>
                                <IconButton className='!text-[#00285A]' onClick={() => downloadNote(item.file, item.name)} >
                                    <Download />
                                </IconButton>
                            </div>
                        </div>)}
                    </div>
                    <TablePagination
                        component='div'
                        color="primary"
                        count={notes?.count}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        page={pagination.page}
                        rowsPerPage={pagination.rows}
                        onPageChange={(_, newPage) => setPagination({ ...pagination, page: newPage })}
                        onRowsPerPageChange={(e) => setPagination({ ...pagination, rows: e.target.value })}
                        className="mt-6"
                    />
                </div>
                :
                <Alert icon={false} severity='warning' className='mx-auto w-fit'>No Assignments Found</Alert>)}
        </div>
    );
}

export default Notes;
