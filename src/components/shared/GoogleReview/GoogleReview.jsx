import React from 'react';

const GoogleReview = () => {
    return (
        <div className='flex flex-col gap-10'>
            <h1 className='font-semibold max-sm:text-2xl text-3xl text-[#0C3C82]'>Here form our students</h1>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {[...Array(4)].map((item, index) => <div key={index} className='flex flex-col rounded-xl overflow-hidden shadow-2xl'>
                    <div className='aspect-[8/9]'>
                        <img src="https://s3-alpha-sig.figma.com/img/1e42/16ef/b0757955d3b7a6cd2b223bc16541bfec?Expires=1695600000&Signature=keYfEKD6Tvlb6HyokRuCUcV79-K97Itxktk2naAXJ8AvWfwt67VVqwv59NsMYv2-TJuBvE99n-bzom8B~PiUY3sHkLm4NJ3mZOaoJwcgeTc~ENjah2Ywbot1E1kUonWHiBqkS-Gt6bxvXQEL3DTFmsW9m2Nb61U8YlN5g0g-5GylEIPxvBOaz3LZwG75A3Yrm7DaHukQqRMTg0RlUBVsY13VzHOvO3B4O3OjkKlYMpLyAXURUq3tY7f17KAECr3ssVKTFA6fH3kjeZJhkytf-2gXepY2YrzU~JipXIUpIkxYkuFgoCqQNoti6FgZeG9DCbWLjRxRP9hVmxt4dgzmVg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex flex-col'>
                        <p className='px-4 py-2 text-[#0C3C82] text-sm'>
                            Ingelt board boasts an exceptional team with a strong commitment to their work.
                        </p>
                        <hr className='bg-[#0C3C82] h-[1px]' />
                        <p className='flex justify-between items-center py-2.5 px-4 text-[#0C3C82] text-sm font-medium'>
                            <span>Study Visa</span>
                            <img src='https://logowik.com/content/uploads/images/flag-uk7204.logowik.com.webp' alt='' className='w-5 aspect-square object-cover rounded-full' />
                        </p>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default GoogleReview;
