import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

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
    {
      name: "Mock 8",
      reading: 50,
      writing: 70,
      speaking: 58,
      listening: 98,
      amt: 100,
    },
    {
      name: "Mock 9",
      reading: 50,
      writing: 70,
      speaking: 58,
      listening: 98,
      amt: 100,
    },
    {
      name: "Mock 10",
      reading: 50,
      writing: 70,
      speaking: 58,
      listening: 98,
      amt: 100,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Performance</h1>
          <div className="flex gap-x-3 mt-2">
            <div className="flex gap-x-2 items-center">
              <span className="w-3 h-3 block rounded bg-[#0064E199]"></span>
              <span className="text-sm">Reading</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <span className="w-3 h-3 block rounded bg-[#0064E1]"></span>
              <span className="text-sm">Writing</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <span className="w-3 h-3 block rounded bg-[#B3D1F6]"></span>
              <span className="text-sm">Speaking</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <span className="w-3 h-3 block rounded bg-[#3383E7]"></span>
              <span className="text-sm">Listening</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ResponsiveContainer width="100%" height="100%" minHeight="270px">
          <BarChart
            width="100%"
            height="100%"
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" style={{ fontWeight: 600 }} />
            {/* <YAxis /> */}
            <Tooltip
              wrapperStyle={{ outline: "none", textTransform: "capitalize" }}
            />
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
};

export default StudentGraph;
