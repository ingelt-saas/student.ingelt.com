import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const StudentGraph = () => {

    const data = [
        {
            name: "Mock 1",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
        {
            name: "Mock 2",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
        {
            name: "Mock 3",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
        {
            name: "Mock 4",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
        {
            name: "Mock 5",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
        {
            name: "Mock 6",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
        {
            name: "Mock 7",
            reading: 50,
            writing: 70,
            speaking: 58,
            listening: 98,
            amt: 100,
        },
    ];

    return (
        <div>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='text-2xl font-semibold'>Performance</h1>
                    <div className='flex gap-x-3 mt-2'>
                        <div className='flex gap-x-2 items-center'>
                            <span className='w-3 h-3 block rounded bg-[#0064E199]'></span>
                            <span className='text-sm'>Reading</span>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <span className='w-3 h-3 block rounded bg-[#0064E1]'></span>
                            <span className='text-sm'>Writing</span>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <span className='w-3 h-3 block rounded bg-[#B3D1F6]'></span>
                            <span className='text-sm'>Speaking</span>
                        </div>
                        <div className='flex gap-x-2 items-center'>
                            <span className='w-3 h-3 block rounded bg-[#3383E7]'></span>
                            <span className='text-sm'>Listening</span>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <select className='cursor-pointer pr-9 py-1.5 px-4 bg-[#0064E114] border border-[#78787866] font-semibold rounded-lg focus:outline-none appearance-none'>
                        <option>Jul-Week1</option>
                        <option>Jul-Week2</option>
                    </select>
                    <svg className='w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 duration-300' viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.24018 6.67797L16.3802 0L18.4198 1.90761L9.24018 10.4932L0.0605469 1.90761L2.10015 0L9.24018 6.67797Z" fill="black" />
                    </svg>
                </div>
            </div>
            <div className='mt-10'>
                <ResponsiveContainer width="100%" height="100%" minHeight="270px">
                    <BarChart
                        width="100%"
                        height="100%"
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" style={{ fontWeight: 600, }} />
                        {/* <YAxis /> */}
                        <Tooltip wrapperStyle={{ outline: 'none', textTransform: 'capitalize' }} />
                        {/* <Legend /> */}
                        <Bar dataKey="reading" fill="#0064E199" />
                        <Bar dataKey="writing" fill="#0064E1" />
                        <Bar dataKey="speaking" fill="#B3D1F6" />
                        <Bar dataKey="listening" fill="#3383E7" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StudentGraph;
