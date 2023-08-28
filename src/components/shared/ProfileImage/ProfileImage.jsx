import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
// import femaleAvatar from "../../../assets/images/FemaleAvatra.webp";
// import maleAvatar from "../../../assets/images/MaleAvatra.webp";
import getFile from '../../../api/getFile';

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#1B3B7D',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


const ProfileImage = ({ src, alt, gender, className }) => {

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  // const avatar = gender === 'Male' ? maleAvatar : femaleAvatar;

  useEffect(() => {
    if (src) {
      getFile(src)
        .then(res => {
          setUrl(res.data);
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }, [src])

  return loading ? <span className={`block shadow-md ${className}`}></span> : (src ? <div>
    <img
      src={url}
      alt={alt}
      className={className}
      draggable={false}
    />
  </div> :<div className='w-full h-full flex justify-center items-center'>
    <Avatar 
      className={className} 
      style={{width: '100%', height: '100%'}}
      {...stringAvatar(alt)}
    />
  </div>)
}

export default ProfileImage;
