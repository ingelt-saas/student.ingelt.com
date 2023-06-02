import { Box, Button, Modal } from '@mui/material';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import React from 'react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';
import assignmentApi from '../../api/assignment';

const UpdateSubmissionModal = ({ open, close, data }) => {

    const [file, setFile] = useState(null);
    const [typeError, setTypeError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        if (loading) {
            return;
        }
        setFile(null);
        close();
    }

    const submissionUpdateHandler = async (e) => {
        if (!file) {
            return;
        }
        e.target.disabled = true;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('assignmentId', data.id);

        try {
            await assignmentApi.updateSubmission(formData);
            toast.success('Submission update successfully');
            handleClose();
            window.location.reload();
        } catch (err) {
            toast.error('Sorry! Something went wrong');
        } finally {
            e.target.disabled = false;
            setLoading(false);
        }
    }

    return (
        <Modal open={open} onClose={handleClose} className='grid place-items-center'>
            {/* Upload modal start */}
            <Box className='bg-white w-10/12 sm:w-[500px] shadow-lg rounded-lg outline-none px-5 py-7'>
                <Box>
                    <h2 className='text-xl font-medium'><span className='text-[#00000099]'>"{data?.name}"</span> solution update</h2>
                    {!file && <FileUploader
                        name='file'
                        types={['PDF', 'DOCX']}
                        label='Drag & Drop or Choose file to upload'
                        required={true}
                        disabled={file ? true : false}
                        onTypeError={(err) => setTypeError(err)}
                        handleChange={(e) => {
                            setTypeError('');
                            setFile(e);
                        }}
                    >
                        <div className="border-2 border-dashed py-5 px-4 text-center mt-3 cursor-pointer hover:bg-[#f2f2f2] duration-300">
                            <svg
                                className="w-8 h-8 mx-auto"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M32.5 4C32.5 6.33141 32.5 18.4547 32.5 48.2967V4ZM32.5 4L48.8198 20.3198M32.5 4L16.1802 20.3198M3 61.2784V56.6156V40.2958V61.2784ZM3 61.2784H61.2852V40.2958"
                                    stroke="black"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M3 47.2911V40.2969"
                                    stroke="black"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <h4 className="font-semibold text-2xl mt-1">Drag & Drop or Choose file to upload</h4>
                            <p className="text-base font-medium mt-1">PDF or DOCS</p>
                        </div>
                    </FileUploader>}
                    {file && <div className='max-h-[50vh] overflow-y-auto mt-5'>
                        <Viewer fileUrl={URL.createObjectURL(file)} defaultScale={SpecialZoomLevel.PageFit} />
                    </div>}

                    {typeError && <p className="text-center text-sm text-red-500 mt-2 font-medium">{typeError}</p>}
                </Box>
                <Box mt={2} className='flex items-center gap-x-3 justify-end'>
                    <Button
                        onClick={handleClose}
                        variant='outlined'
                        color='error'
                        disabled={loading}
                        sx={{
                            padding: '0.6rem 2rem',
                            borderRadius: '7px',
                            fontWeight: 700,
                        }}
                    >Cancel</Button>
                    <Button
                        onClick={submissionUpdateHandler}
                        variant='contained'
                        color='primary'
                        disabled={!Boolean(file) || loading}
                        sx={{
                            padding: '0.6rem 2rem',
                            borderRadius: '7px',
                            fontWeight: 700,
                        }}
                    >Update</Button>
                </Box>
            </Box>
            {/* Upload modal end */}
        </Modal >
    );
}

export default UpdateSubmissionModal;
