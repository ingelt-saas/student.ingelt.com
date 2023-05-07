import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import getFile from '../../../api/getFile';

const Image = ({ src, alt, className }) => {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        if (src) {
            getFile(src)
                .then(res => setUrl(res?.data))
        }
    }, [src]);
    return !src || !url ? <span className={`${className} shadow `}></span> : <img src={url} alt={alt} className={className} />;
}

export default Image;

