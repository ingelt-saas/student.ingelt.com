import { Box, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
// import 'videojs-hls-quality-selector';
// import 'videojs-contrib-quality-levels';

// import qualitySelector from 'videojs-hls-quality-selector';
// import qualityLevels from 'videojs-contrib-quality-levels';

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

  // videojs.registerPlugin('hlsQualitySelector', qualitySelector);
  // videojs.registerPlugin('qualityLevels', qualityLevels);

  useEffect(() => {
    if (videoRef.current) {


      const player = videojs(videoRef.current, options);

      // player && player.qualityLevels();
      // player && player.hlsQualitySelector({
      //   displayCurrentQuality: true,
      // });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [options]);

  useEffect(() => {
    setOptions({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: file,
        type: 'video/mp4'
      }]
    });
  }, [file]);

  return (
    <Modal
      open={showPopup}
      onClose={closePopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='grid place-items-center'
    >
      <div className='outline-none bg-white rounded-md w-[80%] max-h-[95vh] h-auto relative'>
        <video data-setup='{"aspectRatio":"16:9"}' id='video-js' ref={videoRef} className="video-js vjs-default-skin" />
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