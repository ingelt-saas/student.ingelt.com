import { ArrowRightAlt, Close } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import blogApi from '../../api/blog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from '../shared/Image/Image';
import { useState } from 'react';
import { Modal } from '@mui/material';
import moment from 'moment';
import parse from 'html-react-parser';

const BlogItem = ({ item, setReadPost }) => {
    const { title, textContent, picture } = item;
    return <div className='rounded-lg shadow-md border border-[#78787840] flex flex-col h-full'>
        <div className='rounded-lg overflow-hidden md:h-36 xl:h-40'>
            <Image src={picture} alt={title} className={'w-full h-full object-cover'} />
        </div>
        <div className='px-3 py-4 flex flex-col flex-1 gap-y-3'>
            <h1 className='text-xl font-medium leading-none'>{title}</h1>
            <p className='text-sm text-[#00000099] font-medium flex-1'>
                {textContent?.length > 70 ? textContent.split('').slice(0, 70).join('') + '...' : textContent}
            </p>
            <button onClick={() => setReadPost(item)} className='text-sm font-medium inline-flex items-center gap-1 w-fit'>
                Read Post
                <ArrowRightAlt fontSize='small' />
            </button>
        </div>
    </div>
}

const Blogs = () => {

    const [readPost, setReadPost] = useState(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await blogApi.getBlogs();
            return res.data;
        }
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold">Latest Blogs</h1>
            <div className='mt-5 relative'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    speed={800}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    }}
                    className='!pb-16 -z-10'
                    modules={[Navigation]}
                    navigation={{
                        nextEl: nextRef.current,
                        prevEl: prevRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                >
                    {blogs.map(item =>
                        <SwiperSlide key={item.id} className='!h-auto'>
                            <BlogItem item={item} setReadPost={setReadPost} />
                        </SwiperSlide>
                    )}

                    <div className='flex z-20 items-center justify-center gap-x-4 absolute left-0 bottom-0 w-full h-auto'>
                        <button ref={prevRef} className='cursor-pointer disabled:opacity-30 disabled:cursor-auto text-[#0C3C82] border border-[#0C3C82] duration-300 rounded-md shadow-md px-4'>
                            <ArrowRightAlt fontSize='large' className='rotate-180' />
                        </button>
                        <button ref={nextRef} className='cursor-pointer disabled:opacity-30 disabled:cursor-auto text-[#0C3C82] border border-[#0C3C82] duration-300 rounded-md shadow-md px-4'>
                            <ArrowRightAlt fontSize='large' />
                        </button>
                    </div>
                </Swiper>
            </div>

            {/* read post modal */}
            <Modal open={Boolean(readPost)} onClose={() => setReadPost(null)} className='grid place-items-center py-10 overflow-y-auto relative'>
                <div className='bg-white max-w-[90vw] lg:w-[700px] 2xl:w-[900px] rounded-xl shadow-xl px-3 py-3'>
                    <button onClick={() => setReadPost(null)} className='absolute top-5 right-5 w-8 h-8 grid place-items-center rounded-full text-white bg-black bg-opacity-40'>
                        <Close />
                    </button>
                    <div className='overflow-hidden rounded-md'>
                        <Image src={readPost?.picture} alt={readPost?.title} className='w-full h-auto' />
                    </div>
                    <div className="flex flex-col gap-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <span className="bg-[#0C3C82] text-white text-xs rounded-full px-3 py-1 w-fit">{readPost?.category}</span>
                            <span className="text-sm">{moment(readPost?.createdAt).format('lll')}</span>
                        </div>
                        <h1 className='text-2xl text-[#0C3C82] font-medium leading-none'>{readPost?.title}</h1>
                        <div className='text-sm text-black opacity-75 font-medium'>
                            {readPost?.content && parse(readPost?.content)}
                            {/* {readPost?.content} */}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Blogs;
