import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import homeApi from '../../api/home';

// const data = [
//     { name: 'Reading', fill: '#6417D1', YAxis: 10 },
//     { name: 'Writing', fill: '#0263FF', YAxis: 10 },
//     { name: 'Speaking', fill: '#FF7723', YAxis: 10 },
//     { name: 'Listening', fill: '#BA5C12', YAxis: 10 },
// ];

const AssignmentGraph = () => {

    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await homeApi.getSubmissions();
                setSubmissions(res?.data);
                setLoading(false);
            } catch (err) {
                setSubmissions(null);
                setLoading(false);
            }
        })();
    }, []);

    const graphData = Array.isArray(submissions) ? submissions.map(i => ({ name: i?.assignment?.name, score: i.scores })) : []

    return (
        <div className="border border-[#78787840] shadow-lg rounded-md py-6 px-3 bg-white">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Assignment</h1>
            </div>

            <div className="mt-5 overflow-hidden rounded-md">
                {!loading && <div className='w-[calc(100%+30px)] -ml-[30px]'>
                    <ResponsiveContainer width="100%" height="100%" minHeight={230}>
                        <BarChart
                            width={500}
                            height={300}
                            data={graphData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" style={{ fontSize: '0.75rem' }} />
                            <YAxis />
                            <Bar dataKey="score" barSize={20} fill='#BA5C12'>
                                <LabelList dataKey="score" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>}
            </div>
        </div>
    );
}

export default AssignmentGraph;
