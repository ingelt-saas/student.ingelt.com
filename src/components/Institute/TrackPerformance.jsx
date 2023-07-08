import React from 'react';
import { useContext } from 'react';
import { StudentContext } from '../../contexts';
import LockOverly from '../shared/LockOverly/LockOverly';
import StudentGraph from '../Home/StudentGraph';
import { useState } from 'react';
import { Assessment, GpsFixed, Quiz } from '@mui/icons-material';
import AssignmentGraph from '../Home/AssignmentGraph';
import { useEffect } from 'react';
import homeApi from '../../api/home';

const TrackPerformance = () => {

    // states
    const [graphData, setGraphData] = useState([]);
    const [bands, setBands] = useState({ listeningBands: 0, writingBands: 0, readingBands: 0, speakingBands: 0 });

    // context
    const { student } = useContext(StudentContext);

    useEffect(() => {
        (async () => {
            try {
                const bands = await homeApi.getBands();
                const graphData = await homeApi.getGraphData();
                setBands(bands.data);
                setGraphData(graphData.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div>
            <div className='flex gap-6 flex-wrap mt-10'>

                {/* student graph */}
                <div className="w-full relative foo:w-[calc(100%/12*8-24px)]">
                    {!student.organizationId && <LockOverly />}
                    <div className="border border-[#78787840] shadow-lg rounded-lg px-4 py-5 bg-white">
                        <StudentGraph data={graphData} />
                    </div>
                </div>

                {/* score  */}
                <div className="w-full relative foo:w-[calc(100%/12*4-24px)]">
                    {!student.organizationId && <LockOverly />}
                    <div className="border border-[#78787840] shadow-lg rounded-md py-6 px-3 bg-white">
                        <h1 className="font-bold text-2xl">Your Predicted Bands</h1>
                        <div className="mt-5 overflow-hidden rounded-md">
                            <div className="bg-[#1B3B7D] py-2 px-4 text-lg text-[#f2f2f2] font-bold flex items-center justify-between">
                                <h3>Total Bands</h3>
                                <span>
                                    {(
                                        (bands?.listeningBands +
                                            bands?.writingBands +
                                            bands?.speakingBands +
                                            bands?.readingBands) /
                                        4
                                    ).toFixed(2) || "Not Enough Data"}
                                </span>
                            </div>

                            <div className="border-2 border-t-0 border-[#78787840]">
                                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                                    <h3>Listening</h3>
                                    <span>
                                        {bands?.listeningBands?.toFixed(2) || "Not Enough Data"}
                                    </span>
                                </div>

                                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                                    <h3>Reading</h3>
                                    <span>
                                        {bands?.readingBands?.toFixed(2) || "Not Enough Data"}
                                    </span>
                                </div>

                                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                                    <h3>Speaking</h3>
                                    <span>
                                        {bands?.speakingBands?.toFixed(2) || "Not Enough Data"}
                                    </span>
                                </div>

                                <div className="py-4 px-4 text-base font-semibold flex items-center justify-between">
                                    <h3>Writing</h3>
                                    <span>
                                        {bands?.writingBands?.toFixed(2) || "Not Enough Data"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* assignment graph  */}
                <div className="w-full relative foo:w-[calc(100%/12*8-24px)]">
                    {!student.organizationId && <LockOverly />}
                    <AssignmentGraph />
                </div>

                {/* mock test Performance */}
                <div className="w-full relative foo:w-[calc(100%/12*4-24px)]">
                    {!student.organizationId && <LockOverly />}
                    <div className="-z-10 border border-[#78787840] shadow-lg rounded-lg px-4 py-5 bg-white">
                        <h1 className="font-semibold text-xl mb-6">Mock Test Performance</h1>

                        <div className="border border-[#78787840] w-full px-3 lg:px-5 xl:px-8 py-4 flex justify-between items-center my-2">
                            <div className="bg-[#1B3B7D] p-2 text-white rounded-md mr-8 xl:mr-5 w-fit flex items-center justify-center">
                                <Assessment />
                            </div>
                            <div className="flex justify-around items-center">
                                <span className="font-semibold text-xl mr-4 xl:w-36">
                                    Average Score
                                </span>
                                <span className="text-lg font-semibold text-white bg-[#1B3B7D] rounded-md px-2 py-1 w-20">
                                    {(
                                        (bands?.listeningBands +
                                            bands?.writingBands +
                                            bands?.speakingBands +
                                            bands?.readingBands) /
                                        4
                                    ).toFixed(2) || "Not Enough Data"}
                                </span>
                            </div>
                        </div>

                        <div className="border border-[#78787840] w-full px-3 lg:px-5 xl:px-8 py-4 flex justify-between items-center my-2">
                            <div className="bg-[#1B3B7D] p-2 text-white rounded-md mr-8 xl:mr-5 w-fit flex items-center justify-center">
                                <GpsFixed />
                            </div>

                            <div className="flex justify-around items-center">
                                <span className="font-semibold text-xl mr-4 xl:w-36">
                                    Target Score
                                </span>
                                <span className="text-lg font-semibold text-white bg-[#1B3B7D] rounded-md px-2 py-1 w-20">
                                    {student?.targetScore ? student?.targetScore : "Not Set"}
                                </span>
                            </div>
                        </div>

                        <div className="border border-[#78787840] w-full px-3 lg:px-5 xl:px-8 py-4 flex justify-between items-center my-2">
                            <div className="bg-[#1B3B7D] p-2 text-white rounded-md mr-8 xl:mr-5 w-fit flex items-center justify-center">
                                <Quiz />
                            </div>

                            <div className="flex justify-around items-center">
                                <span className="font-semibold text-xl mr-4 xl:w-36">
                                    Tests Attempted
                                </span>
                                <span className="text-lg font-semibold text-white bg-[#1B3B7D] rounded-md px-2 py-1 w-20">
                                    {graphData?.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TrackPerformance;
