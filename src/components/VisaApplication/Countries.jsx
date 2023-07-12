import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

const Countries = () => {

    function importAll(r) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('../../assets/NewDesign/Country Flag 2', false, /\.(png|jpe?g|svg)$/));

    return (
        <section className='bg-primary w-full px-5'>
            <div className='container mx-auto'>
                <div className='text-center'>
                    <h1 className='text-xl md:text-4xl font-bold mx-auto text-[#001E43] w-fit relative'>Our Countries</h1>
                </div>
                <div className='mt-5'>
                    <Swiper
                        speed={700}
                        draggable={false}
                        slidesPerView={3}
                        spaceBetween={10}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            }
                        }}
                        modules={[Autoplay]}
                    >
                        {Array.isArray(images) && images.map((image, index) =>
                            <SwiperSlide key={index}><img draggable={false} src={image} alt='' /></SwiperSlide>
                        )}

                    </Swiper>

                </div>
            </div>
        </section>
    );
}

export default Countries;