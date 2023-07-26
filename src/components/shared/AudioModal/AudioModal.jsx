import { CircularProgress, Modal } from '@mui/material'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useEffect, useRef, useState } from 'react'
import getFile from '../../../api/getFile';
import Image from '../Image/Image';

const AudioModal = ({ file, open, close }) => {

  const [loading, setLoading] = useState(true);
  const [fileURL, setFileURL] = useState(null);

  const rootRef = useRef(null);

  useEffect(() => {
    if (file?.file) {
      (async () => {
        try {
          const res = await getFile(file.file);
          setFileURL(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [file]);

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div ref={rootRef} className="outline-none absolute w-[90%] md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 rounded-lg overflow-hidden -translate-y-1/2 bg-white">
        {loading && <div className='flex justify-center py-8'>
          <CircularProgress sx={{ '& circle': { stroke: '#1B3B7D' } }} />
        </div>}
        {!loading && <>
          {!fileURL && <p className='text-center font-medium text-base py-5'>Not Found</p>}
          {fileURL && <div className=''>
            {file?.thumbnail && <Image alt={file?.name} src={file?.thumbnail} className='w-full object-cover aspect-video h-auto' />}
            <AudioPlayer
              autoPlay
              src={fileURL}
              showFilledProgress
              showFilledVolume
              controls
            />
          </div>}
        </>}

      </div>
    </Modal>
  )
}

export default AudioModal