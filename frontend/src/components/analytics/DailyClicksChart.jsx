import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DailyClicksChart = ({ data }) => {
    return (
        <div className="w-full h-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Daily Clicks</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis
                        dataKey="_id"
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        tickLine={{ stroke: '#ffffff20' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        tickLine={{ stroke: '#ffffff20' }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorClicks)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DailyClicksChart;
