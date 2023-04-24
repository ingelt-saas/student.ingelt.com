import React from 'react';

// assets
import logo from '../../../assets/images/logo.svg';

const Loader = () => {
    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className='animate-pulse'>
                <img src={logo} alt='' className='w-full h-auto' />
            </div>
        </div>
    );
}

export default Loader;
