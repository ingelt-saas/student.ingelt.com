import { Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';

const AccommodationVideos = ({ videos }) => {

    // states
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const videoRef = useRef(null);

    // get file type form file name
    const getFileType = (fileName) => {
        // Get the last portion of the file name after the last dot (.)
        const fileExtension = fileName.split('.').pop();
        return fileExtension.toLowerCase(); // Convert to lowercase for consistency
    }

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, {
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
            });

            player.src({ src: selected?.path, type: `video/${getFileType(selected?.path)}` });

            return () => player && player.dispose();

        }
        // { src: res.data, type: `video/${getFileType(data.file)}` }
    }, [selected]);

    return (
        <>
            <div
                onClick={() => {
                    if (Array.isArray(videos) && videos.length > 0) {
                        setSelected(videos[0]);
                        setIsOpen(true);
                    }
                }}
                className='w-full aspect-video shadow-xl rounded-lg overflow-hidden cursor-pointer relative'
            >
                {videos?.length > 0 && <img src={videos[0]?.thumbnail_url} alt='' className='w-full h-full object-cover' />}
                <div className='w-full h-full top-0 left-0 absolute grid place-items-center'>
                    {videos?.length > 0 && <h3 className='text-xl text-white font-medium'>{videos?.length} Videos</h3>}
                    {videos?.length <= 0 && <h3 className='text-xl text-black font-medium'>No Videos</h3>}
                </div>
            </div>
            {/* video modal */}
            <Modal open={isOpen} onClose={() => setIsOpen(false)} className='grid place-items-center'>
                <div className='outline-none flex flex-col bg-white rounded-md overflow-hidden max-w-[95vw] md:max-w-[90vw]'>
                    <div>
                        <video data-setup='{"aspectRatio":"16:9"}' id='video-js' ref={videoRef} className="video-js vjs-default-skin" />
                    </div>
                    <div className='flex gap-1 p-1'>
                        {Array.isArray(videos) && videos.map((item, index) => <div key={index} className={`aspect-video rounded-lg overflow-hidden cursor-pointer ${selected?.path !== item?.path && 'grayscale'} `}>
                            <img src={item?.thumbnail_url} alt={item?.caption} className='h-full w-full object-cover' />
                        </div>)}
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AccommodationVideos;
