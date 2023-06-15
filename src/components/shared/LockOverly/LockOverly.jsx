import React from 'react';
import { Link } from 'react-router-dom';

const LockOverly = () => {
    return (
        <div className="z-50 group absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 rounded-md">
            <div className='relative text-center'>
                <p className='text-sm absolute -top-6 w-max left-1/2 font-medium duration-200 opacity-0 group-hover:opacity-95 -translate-x-1/2'>You need to Enroll with an <Link to='/find-institute'>IELTS institute</Link></p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className='w-14 h-14'
                >
                    <path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm4 11.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723z" fill='#1B3B7D' />
                </svg>
            </div>
        </div>
    );
}

export default LockOverly;
