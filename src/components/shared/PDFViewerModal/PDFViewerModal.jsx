import React from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Modal } from '@mui/material';
import { Close } from '@mui/icons-material';


const PDFViewerModal = ({ modalOpen, modalClose, fileUrl }) => {
    return (
        <Modal open={modalOpen} onClose={modalClose} className='grid place-items-center'>
            <div className='h-[90vh] w-[90vw] rounded-lg outline-none overflow-hidden relative'>
                <button className='w-10 h-10 z-50 rounded-full absolute top-1 right-1' onClick={modalClose}>
                    <Close fontSize='medium' />
                </button>
                {fileUrl &&
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                        <Viewer fileUrl={fileUrl} defaultScale={SpecialZoomLevel.PageFit} />;
                    </Worker>
                }
            </div>
        </Modal>
    );
}

export default PDFViewerModal;
