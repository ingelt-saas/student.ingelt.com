import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';

const VideoModal = ({ file, showPopup, closePopup }) => {

  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [options, setOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: file,
      type: 'video/mp4'
    }]
  });

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        sources: [{
          src: file,
          type: 'video/mp4'
        }]
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [file]);

  if (!showPopup) {
    return null;
  }

  return (
    <Modal
      open={showPopup}
      onClose={closePopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='grid place-items-center'
    >
      <div className='outline-none bg-white rounded-md max-w-[90%] h-auto relative'>
        <video id='video-js' ref={videoRef} className="video-js vjs-default-skin" />
      </div>

      {/* <Box ref={rootRef} className="absolute w-[90%] md:w-auto outline-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}

      {/* <ReactPlayer
          url={file}
          style={{ borderRadius: '20px', overflow: 'hidden' }}
          playing={true}
          width="100%"
          height="100%"
          volume={1}
          pip={true}
          controls
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
        /> */}
      {/* </Box> */}
    </Modal>
  )
}

export default VideoModal