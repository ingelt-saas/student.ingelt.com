import { CircularProgress, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import moduleTrackApi from '../../api/moduleTrack';
import getFile from '../../api/getFile';

// get file type form file name
export const getFileType = (fileName) => {
    // Get the last portion of the file name after the last dot (.)
    const fileExtension = fileName.split('.').pop();
    return fileExtension.toLowerCase(); // Convert to lowercase for consistency
}

const ModuleVideo = ({ open, close, data }) => {
    // states
    const [loading, setLoading] = useState(true);
    const [videoSource, setVideoSource] = useState(null);
    const [moduleTrack, setModuleTrack] = useState(null);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [startDuration, setStartDuration] = useState(0);
    const [watchTime, setWatchTime] = useState(0);

    // video ref
    const videoRef = useRef();

    //  update end duration
    const setEndDuration = async () => {
        if (currentDuration && moduleTrack) {
            await moduleTrackApi.update(moduleTrack.id, { endDuration: currentDuration });
        }
    }

    // create a track data
    const createTrack = async () => {
        const postData = {
            startDuration: startDuration,
            endDuration: currentDuration,
            moduleId: data.id,
        };
        await moduleTrackApi.create(postData);
    };

    // handle close
    const handleClose = () => {
        createTrack();
        close();
    }

    // init video js
    useEffect(() => {
        if (videoRef.current && videoSource) {

            const player = videojs(videoRef.current, {
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
            });

            player.src(videoSource);
            // const qualityLevels = player.qualityLevels();

            // qualityLevels.on('addqualitylevel', function (event) {
            //     let qualityLevel = event.qualityLevel;

            //     if (qualityLevel.height >= 720) {
            //         qualityLevel.enabled = true;
            //     } else {
            //         qualityLevel.enabled = false;
            //     }
            // });

            // let enable720 = true;

            // for (let qualityLevel of qualityLevels) {
            //     if (qualityLevel.height >= 720) {
            //         qualityLevel.enabled = enable720;
            //     } else {
            //         qualityLevel.enabled = !enable720;
            //     }
            // }
            // enable720 = !enable720;

            // qualityLevels.on('change', function () {
            //     console.log('Quality Level changed!');
            //     console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
            // });

            player.on('timeupdate', () => {
                setCurrentDuration(player.currentTime());
            });

            // if (player) {
            //     player.on('ended', () => {
            //         player.dispose();
            //         createTrack(startDuration, duration);
            //         handleClose();
            //     });
            // }

            return () => player && player.dispose();
        }
    }, [videoSource]);


    // fetch video url 
    useEffect(() => {
        if (data?.file) {
            (async () => {
                try {
                    const res = await getFile(data.file);
                    if (res.data) {
                        setVideoSource({ src: res.data, type: `video/${getFileType(data.file)}` });
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('beforeunload', createTrack);

        return () => window.removeEventListener('beforeunload', createTrack);

    }, []);

    return <Modal open={open} onClose={handleClose} className='grid place-items-center p-5' >
        <div className='outline-none bg-white rounded-md w-[80%] max-h-[95vh] h-auto relative'>
            {loading && <div className='flex justify-center py-8'>
                <CircularProgress color='inherit' sx={{ '& circle': { stroke: '#1B3B7D' } }} />
            </div>}

            {!loading && !videoSource && <p className='text-center font-medium text-base py-5'>Not Found</p>}
            {!loading && videoSource &&
                <video onEnded={() => handleClose()} data-setup='{"aspectRatio":"16:9"}' id='video-js' ref={videoRef} className="video-js vjs-default-skin" />
            }

        </div>
    </Modal>
}

export default ModuleVideo;
