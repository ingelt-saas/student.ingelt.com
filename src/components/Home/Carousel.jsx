import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Carousel = () => {

    const data = [
        {
            image: "https://images.unsplash.com/photo-1676022763096-a1ad12b2e370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            options: [
                'Find course & universities in your favourite country.',
                "Explore In-demand courses."
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1676022763096-a1ad12b2e370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            options: [
                'Find course & universities in your favourite country.',
                "Explore In-demand courses."
            ]
        },
        {
            image: "https://images.unsplash.com/photo-1676022763096-a1ad12b2e370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
            options: [
                'Find course & universities in your favourite country.',
                "Explore In-demand courses."
            ]
        },
    ];

    return (
        <>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className='!bg-white !shadow-xl !rounded-xl !overflow-hidden !pb-5 homeCarousel'
            >
                {data.map(({ image, options }, index) => <SwiperSlide key={index}>
                    <div className='relative w-full'>
                        <span className='absolute top-2 left-2 bg-white rounded-full px-3 py-1 font-medium shadow-xl text-sm'>What’s new</span>
                        <div className='w-full h-48'>
                            <img draggable={false} src={image} alt='' className='w-full h-full object-cover' />
                        </div>
                        <div className='px-4 py-4'>
                            <ul className='pl-3 list-disc text-[rgba(0,_0,_0,_0.60)] font-medium'>
                                {options.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </SwiperSlide>)}
            </Swiper>
            {/* <div className= relative'>
                <span className='absolute top-2 left-2 bg-white rounded-full px-3 py-1 font-medium shadow-xl text-sm'>What’s new</span>
                <div className='w-full h-48'>
                    <img src='' alt='' className='w-full h-full object-cover' />
                </div>
                <div className='px-4 py-4'>
                    <ul className='pl-3 list-disc text-[rgba(0,_0,_0,_0.60)] font-medium'>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div> */}
        </>
    );
}

export default Carousel;
