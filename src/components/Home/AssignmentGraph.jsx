import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const AssignmentGraph = () => {

    const data = [
        { name: 'Reading', Band: 5, fill: '#6417D1', YAxis: 10 },
        { name: 'Writing', Band: 3.5, fill: '#0263FF', YAxis: 10 },
        { name: 'Speaking', Band: 4.8, fill: '#FF7723', YAxis: 10 },
        { name: 'Listening', Band: 9, fill: '#BA5C12', YAxis: 10 },
    ];

    return (
        <div className="border border-[#78787840] shadow-lg rounded-md py-6 px-3 bg-white">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Assignment</h1>
                <div className='relative text-white'>
                    <select className='cursor-pointer pr-9 py-1.5 px-4 bg-[#0064E1] text-white font-semibold rounded-lg focus:outline-none appearance-none'>
                        <option>Assignment 1</option>
                        <option>Assignment 2</option>
                    </select>
                    <svg className='w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 duration-300' viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.24018 6.67797L16.3802 0L18.4198 1.90761L9.24018 10.4932L0.0605469 1.90761L2.10015 0L9.24018 6.67797Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
            <div className="mt-5 overflow-hidden rounded-md">
                <div className='w-[calc(100%+30px)] -ml-[30px]'>
                    <ResponsiveContainer width="100%" height="100%" minHeight={230}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey='YAxis' />
                            <Bar dataKey="Band" barSize={20}>
                                <LabelList dataKey="Band" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default AssignmentGraph;
