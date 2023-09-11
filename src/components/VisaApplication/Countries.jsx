import React from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

const Countries = () => {

    function importAll(r) {

        const name = (e) => {
            const obj = {
                "./": "",
                ".webp": "",
            }
            const pattern = new RegExp(Object.keys(obj).join("|"), "gi");
            return e.replace(pattern, matched => obj[matched]);
        }
        
        return r.keys().filter(item=> item==="./USA.webp" || item==="./Canada.webp" || item==="./Australia.webp" || item==="./UK.webp" || item==="./Ireland.webp").map(e => ({ name: name(e), image: r(e) }));
    }

    // /\.(png|jpe?g|svg)$/
    const images = () => {
        let images = require.context('../../assets/NewDesign/Country Flag 2', false, /\.(webp)$/);
        images = importAll(images);
        return images;
    };

    return (
        <section className='bg-primary w-full px-5'>
            <div className='container mx-auto'>
                <div className='text-center'>
                    {/* <h1 className='text-xl md:text-4xl font-bold mx-auto text-[#001E43] w-fit relative'>Our Countries</h1> */}
                </div>
                <div className='mt-0'>
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
                        {Array.isArray(images()) && images().map(({ name, image }, index) =>
                            <SwiperSlide key={index}>
                                <div className='flex flex-col items-center gap-3'>
                                    <img className='w-3/4 aspect-square object-cover mix-blend-darken' draggable={false} src={image} alt={name} />
                                    <p className='text-sm font-medium text-center'>{name}</p>
                                </div>
                            </SwiperSlide>
                        )}

                    </Swiper>

                </div>
            </div>
        </section>
    );
}

export default Countries;