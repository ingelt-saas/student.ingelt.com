import { Box, CircularProgress, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import getFile from '../../../api/getFile';
// import 'videojs-hls-quality-selector';
// import 'videojs-contrib-quality-levels';

// import qualitySelector from 'videojs-hls-quality-selector';
// import qualityLevels from 'videojs-contrib-quality-levels';

const VideoModal = ({ file, open, close }) => {

  // states
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);

  const [options, setOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
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

      if (player) {
        player.on('ended', () => {
          player.dispose();
          close();
        });
      }

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [options]);

  useEffect(() => {
    if (file) {
      (async () => {
        try {
          const res = await getFile(file?.file);
          const video = res.data;
          setOptions({
            ...options,
            sources: [{
              src: video,
              type: file?.fileType
            }]
          })
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [file]);

  console.log(options)

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='grid place-items-center'
    >
      <div className='outline-none bg-white rounded-md w-[80%] max-h-[95vh] h-auto relative'>
        {loading && <div className='flex justify-center py-8'>
          <CircularProgress sx={{ '& circle': { stroke: '#1B3B7D' } }} />
        </div>}

        {!loading && !options?.sources && <p className='text-center font-medium text-base py-5'>Not Found</p>}
        {!loading && options?.sources &&
          <video data-setup='{"aspectRatio":"16:9"}' id='video-js' ref={videoRef} className="video-js vjs-default-skin" />
        }

      </div>

    </Modal>
  )
}

export default VideoModal