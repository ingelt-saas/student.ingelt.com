import React, { useEffect, useState } from 'react';
import femaleAvatar from "../../../assets/images/FemaleAvatra.webp";
import maleAvatar from "../../../assets/images/MaleAvatra.webp";
import getFile from '../../../api/getFile';

const ProfileImage = ({ src, alt, gender, className }) => {

    const [url, setUrl] = useState(null);
    const avatar = gender === 'Male' ? maleAvatar : femaleAvatar;

    useEffect(() => {
        if (src) {
            getFile(src)
                .then(res => setUrl(res.data))
        }
    }, [src]);

    return <img
        src={url || avatar}
        alt={alt}
        className={className}
        onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = avatar;
        }}
    />
}

export default ProfileImage;
