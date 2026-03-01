import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CardSpotlight } from '../ui/card-spotlight';

const DailyClicksChart = ({ data }) => {
    return (
        <div className="relative group w-full h-full mb-3 mr-3 cursor-default">
            {/* Bottom Card / Shadow */}
            <div className={`absolute inset-0 border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[8px] translate-y-[8px] group-hover:translate-x-[12px] group-hover:translate-y-[12px] bg-[#CDC1FF]`} />

            {/* Top Card */}
            <CardSpotlight
                className="relative bg-white rounded-2xl p-4 sm:p-6 border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 hover:-translate-x-1 hover:-translate-y-1 w-full h-full"
                color="rgba(162, 148, 249, 0.2)"
            >
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Click Trends</h3>
                <div className="flex-1 w-full relative">
                    {data.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            No click data available yet
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#A294F9" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#A294F9" stopOpacity={0.15} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5D9F2" vertical={false} />
                                <XAxis
                                    dataKey="_id"
                                    stroke="#A294F9"
                                    tick={{ fill: '#6b5b95', fontWeight: 'bold', fontSize: 12 }}
                                    tickLine={{ stroke: '#A294F9', strokeWidth: 2 }}
                                    axisLine={{ stroke: '#A294F9', strokeWidth: 2 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    stroke="#A294F9"
                                    tick={{ fill: '#6b5b95', fontWeight: 'bold', fontSize: 12 }}
                                    tickLine={{ stroke: '#A294F9', strokeWidth: 2 }}
                                    axisLine={{ stroke: '#A294F9', strokeWidth: 2 }}
                                    tickMargin={10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '2px solid #A294F9',
                                        boxShadow: '4px 4px 0px 0px rgba(162,148,249,0.4)',
                                        borderRadius: '0.5rem',
                                        fontWeight: 'bold',
                                        color: '#4a3d8f'
                                    }}
                                    itemStyle={{ color: '#A294F9', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="stepAfter"
                                    dataKey="clicks"
                                    stroke="#A294F9"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorClicks)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardSpotlight>
        </div>
    );
};

export default DailyClicksChart;
