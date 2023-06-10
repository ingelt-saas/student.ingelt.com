import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import getFile from '../../api/getFile';
import { Alert, Button, CircularProgress, TablePagination } from '@mui/material';

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
                        {notes?.rows.map(item => <div className='bg-white flex flex-col p-3 rounded-lg shadow-lg' key={item?.id}>
                            <div className='flex-1 pb-3'>
                                <img src={assignmentSVG} alt='' className='mx-auto' />
                                <h2 className='text-center text-lg 2xl:text-2xl text-[#00285A] font-medium'>{item.name}</h2>
                            </div>
                            <div className='flex justify-between pt-2 border-[#0000000F] border-t'>
                                <p className='flex flex-col'>
                                    <span className='text-base 2xl:text-xl font-medium text-[#00285A]'>File Size</span>
                                    <span className='text-[#00000099] text-sm 2xl:text-xl'>
                                        {fileSize(item?.fileSize)}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    <span className='text-base 2xl:text-xl font-medium text-[#00285A]'>Upload Date</span>
                                    <span className='text-[#00000099] text-sm 2xl:text-xl'>{moment(item.createdAt).format('ll')}</span>
                                </p>
                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                <Button
                                    onClick={() => downloadNote(item.file, item.name)}
                                    variant='outlined'
                                    className='!text-sm 2xl:!text-xl'
                                    sx={{
                                        width: '100%',
                                        border: '2px solid #0C3C82',
                                        borderRadius: '7px',
                                        textTransform: 'capitalize',
                                        color: '#0C3C82',
                                        fontWeight: 500,
                                        '&:hover': {
                                            border: '2px solid #0C3C82',
                                            color: '#0C3C82',
                                        }
                                    }}
                                    endIcon={<Download />}
                                >Download</Button>
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
