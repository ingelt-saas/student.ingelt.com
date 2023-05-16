import { ArrowRightAlt } from '@mui/icons-material';
import React from 'react';

const BlogItem = () => {
    return <div className='rounded-lg shadow-md border border-[#78787840]'>
        <div className='rounded-lg overflow-hidden md:h-36 xl:h-40'>
            <img src='https://images.pexels.com/photos/3808060/pexels-photo-3808060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' className='w-full h-full object-cover' />
        </div>
        <div className='px-3 py-4 flex flex-col gap-y-3'>
            <h1 className='text-xl font-medium leading-none'>Best book on scaling your startup</h1>
            <p className='text-sm text-[#00000099] font-medium'>Here are some things you should know work regarding how we </p>
            <a href='#post' rel='noreferrer' target='_blank' className='text-sm font-medium inline-flex items-center gap-1 w-fit'>
                Read Post
                <ArrowRightAlt fontSize='small' />
            </a>
        </div>
    </div>
}

const Blogs = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold">Latest Blog</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5'>
                <BlogItem />
                <BlogItem />
                <BlogItem />
            </div>
        </div>
    );
}

export default Blogs;
