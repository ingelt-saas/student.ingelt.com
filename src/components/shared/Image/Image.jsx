import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import getFile from '../../../api/getFile';
import avatar from '../../../assets/images/demodp.png';

const Image = ({ src, alt, className }) => {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (src) {
            getFile(src)
                .then(res => setUrl(res?.data))
        } else {
            setUrl(avatar);
        }
    }, [src]);
    return !url ? <span className={`${className} shadow `}></span> : <img
        src={url}
        alt={alt} className={className}
        onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = avatar;
        }}
    />;
}

export default Image;

