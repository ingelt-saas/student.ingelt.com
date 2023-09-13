import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

const AccommodationImages = ({ images }) => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Swiper
            speed={500}
            modules={[Navigation]}
            className='!relative'
            navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
            }}
            onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
            }}
        >
            {Array.isArray(images) && images.map((item, index) => <SwiperSlide key={index}>
                <div className='aspect-video overflow-hidden rounded-md'>
                    <img draggable={false} src={item.path} alt='' className='w-full h-full object-cover' />
                </div>
            </SwiperSlide>)}
            <div className='flex w-full z-50 px-2 justify-between absolute top-1/2 left-0 -translate-y-1/2'>
                <button ref={prevRef} className='bg-transparent'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={40}
                        height={40}
                        viewBox="0 0 80 80"
                        fill="none"
                    >
                        <path
                            d="M40.0002 6.66602C21.6002 6.66602 6.66682 21.5993 6.66682 39.9994C6.66682 58.3994 21.6002 73.3327 40.0002 73.3327C58.4002 73.3327 73.3335 58.3994 73.3335 39.9994C73.3335 21.5993 58.4002 6.66602 40.0002 6.66602ZM40.0002 36.666H53.3335V43.3327H40.0002V53.3327L26.6668 39.9994L40.0002 26.666V36.666Z"
                            fill="white"
                        />
                    </svg>
                </button>
                <button ref={nextRef} className='bg-transparent'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={40}
                        height={40}
                        viewBox="0 0 80 80"
                        fill="none"
                    >
                        <path
                            d="M39.9998 6.66602C58.3998 6.66602 73.3332 21.5993 73.3332 39.9994C73.3332 58.3994 58.3998 73.3327 39.9998 73.3327C21.5998 73.3327 6.6665 58.3994 6.6665 39.9994C6.6665 21.5993 21.5998 6.66602 39.9998 6.66602ZM39.9998 36.666H26.6665V43.3327H39.9998V53.3327L53.3332 39.9994L39.9998 26.666V36.666Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>
        </Swiper>
    );
}

export default AccommodationImages;
