import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Link } from 'react-router-dom';
import PDFViewerModal from '../PDFViewerModal/PDFViewerModal';

// assets
import pdf from '../../../assets/cb.pdf';


const PopOverModal = ({ anchorEl, setAnchorEl }) => {

    // pdf modal state
    const [pdfModal, setPdfModal] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className='flex flex-col'>
                    <button
                        className='px-3 py-1 font-semibold'
                        onClick={() => {
                            setFileUrl(pdf);
                            setPdfModal(true);
                        }}
                    >View</button>
                    <Link to='/assignments/assignmentId'>
                        <button className='px-3 py-1 font-semibold'>Submit</button>
                    </Link>
                </div>
            </Popover>
            {/* PDF viewer modal */}
            <PDFViewerModal
                modalOpen={pdfModal}
                modalClose={() => {
                    setPdfModal(false);
                    setFileUrl(null);
                }}
                fileUrl={fileUrl}
            />
        </>
    );
}

export default PopOverModal;