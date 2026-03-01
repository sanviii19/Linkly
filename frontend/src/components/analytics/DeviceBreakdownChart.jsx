import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CardSpotlight } from '../ui/card-spotlight';

const COLORS = ['#A294F9', '#CDC1FF', '#E5D9F2', '#8B7BDB', '#7C6DD8'];

const DeviceBreakdownChart = ({ data }) => {
    const isNoData = data.length === 1 && data[0].name === 'No Data';

    return (
        <div className="relative group w-full h-full mb-3 mr-3 cursor-default">
            {/* Bottom Card / Shadow */}
            <div className={`absolute inset-0 border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[8px] translate-y-[8px] group-hover:translate-x-[12px] group-hover:translate-y-[12px] bg-[#E5D9F2]`} />

            {/* Top Card */}
            <CardSpotlight
                className="relative bg-white rounded-2xl p-4 sm:p-6 border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 hover:-translate-x-1 hover:-translate-y-1 w-full h-full"
                color="rgba(162, 148, 249, 0.2)"
            >
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Devices</h3>
                <div className="flex-1 w-full relative">
                    {isNoData ? (
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            No device data available yet
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="#A294F9"
                                    strokeWidth={2}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '2px solid #A294F9',
                                        boxShadow: '4px 4px 0px 0px rgba(162,148,249,0.4)',
                                        borderRadius: '0.5rem',
                                        fontWeight: 'bold',
                                        color: '#4a3d8f'
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ fontWeight: 'bold', fontSize: '14px', color: '#6b5b95' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardSpotlight>
        </div>
    );
};

export default DeviceBreakdownChart;
