import React, { useState } from 'react';
import { Button } from '@mui/material'
import { FileUpload } from '@mui/icons-material';
import UploadModal from '../../components/shared/UploadModal/UploadModal';
import PDFViewerModal from '../../components/shared/PDFViewerModal/PDFViewerModal';

// assets 
import pdf from '../../assets/cb.pdf';
import { Viewer, Worker } from '@react-pdf-viewer/core';

const SingleAssignment = () => {

    const [uploadModal, setUploadModal] = useState(false);
    const [pdfModal, setPdfModal] = useState(false);

    const uploadModalHandle = (value) => {
        setUploadModal(value);
    };

    return (
        <>
            <div className='flex flex-col justify-between gap-y-4 h-full w-full'>
                <div className='w-full'>
                    <p className='flex justify-between items-center mb-4'>
                        <span className='font-semibold text-2xl'>Assignment 1.pdf</span>
                        <span className='font-semibold text-xl'>Marks: 4.5</span>
                    </p>
                    <p className='flex justify-between'>
                        <span className='text-[#6D6D6D] text-sm w-auto font-semibold'>Assigned Date: 02-02-2023</span>
                        <span className='text-[#6D6D6D] text-sm w-auto font-semibold'>Deadline: 02-02-2023</span>
                    </p>
                </div>
                <div className='w-full flex-1'>
                    <div className='h-full overflow-y-auto'>
                        <div className='h-[120px] border-2 rounded-lg border-[#787878] flex flex-row overflow-hidden' onClick={() => setPdfModal(true)}>
                            <div className='w-[120px] h-full overflow-hidden select-none'>
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                                    <Viewer fileUrl={pdf} />
                                </Worker>
                            </div>
                            <div className='flex-1 flex items-center'>
                                <div className='px-2 py-2'>
                                    <h4 className='text-xl font-semibold'>Assignment 11.pdf</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Button
                        onClick={() => uploadModalHandle('assign')}
                        variant="contained"
                        color="primary"
                        size="small"
                        className='text-[#f2f2f2] border-[#0064E1] rounded-lg font-bold capitalize w-full'
                    >
                        Upload
                        <FileUpload />
                    </Button>
                </div>
            </div>
            {/* Upload modal */}
            <UploadModal
                uploadModal={uploadModal}
                uploadModalHandle={uploadModalHandle}
            />
            <PDFViewerModal modalOpen={pdfModal} modalClose={() => setPdfModal(false)} fileUrl={pdf} />
        </>
    );
}

export default SingleAssignment;
