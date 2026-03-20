import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CardSpotlight } from '../ui/card-spotlight';

const COLORS = ['#A294F9', '#CDC1FF', '#E5D9F2', '#8B7BDB', '#7C6DD8'];

const DeviceBreakdownChart = ({ data }) => {
    const isNoData = data.length === 1 && data[0].name === 'No Data';

    return (
        <div className="relative group w-full h-full mb-2 mr-2 cursor-default">
            {/* Bottom Card / Shadow */}
            <div className={`absolute inset-0 border-2 border-[#A294F9]/40 rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[6px] translate-y-[6px] group-hover:translate-x-[8px] group-hover:translate-y-[8px] bg-[#E5D9F2]`} />

            {/* Top Card */}
            <CardSpotlight
                className="relative bg-[#FFFBF1] rounded-xl p-4 sm:p-5 border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 hover:-translate-x-1 hover:-translate-y-1 w-full h-full"
            >
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-tight">Devices</h3>
                <div className="flex-1 w-full relative">
                    {isNoData ? (
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            No device data available yet
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                                <Pie
                                    data={data}
                                    cx="35%"
                                    cy="50%"
                                    innerRadius="45%"
                                    outerRadius="75%"
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
                                        border: '1.5px solid #A294F9',
                                        boxShadow: '2px 2px 0px 0px rgba(162,148,249,0.4)',
                                        borderRadius: '0.3rem',
                                        fontWeight: 'bold',
                                        fontSize: '12px',
                                        color: '#4a3d8f'
                                    }}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                    iconSize={10}
                                    wrapperStyle={{ 
                                        fontWeight: 'bold', 
                                        fontSize: '11px', 
                                        color: '#6b5b95',
                                        paddingLeft: '10px'
                                    }}
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
