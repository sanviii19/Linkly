import React from 'react';
import { CardSpotlight } from '../ui/card-spotlight';

const DailyClicksChart = ({ data, selectedWeek, setSelectedWeek }) => {
    // Dynamic Y-axis upper bound
    const maxClicks = data.length > 0 ? Math.max(...data.map(d => d.clicks)) : 0;
    // Add a little headroom so the tallest bar doesn't touch the top
    const yMax = maxClicks > 0 ? maxClicks * 1.1 : 5;

    return (
        <div className="relative group w-full h-full mb-2 mr-2 cursor-default">
            {/* Bottom Card / Shadow */}
            <div className={`absolute inset-0 border-2 border-[#A294F9]/40 rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[6px] translate-y-[6px] group-hover:translate-x-[8px] group-hover:translate-y-[8px] bg-[#CDC1FF]`} />

            {/* Top Card */}
            <CardSpotlight
                className="relative bg-[#FFFBF1] rounded-xl p-4 sm:p-5 border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 hover:-translate-x-1 hover:-translate-y-1 w-full h-full"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-30">
                    <h3 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight m-0">Click Trends</h3>

                    {/* Week Picker - Cleaner Design */}
                    <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border-2 border-[#A294F9]/40 rounded-lg p-1 sm:p-1.5 shadow-sm">
                        <label htmlFor="chart-week-picker" className="font-bold text-gray-600 uppercase tracking-widest text-[9px] sm:text-[10px] pl-1">
                            Week
                        </label>
                        <input
                            type="week"
                            id="chart-week-picker"
                            value={selectedWeek}
                            onChange={(e) => setSelectedWeek && setSelectedWeek(e.target.value)}
                            className="bg-white border-[1.5px] border-[#A294F9] shadow-[2px_2px_0px_0px_rgba(162,148,249,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(162,148,249,0.4)] focus:shadow-[4px_4px_0px_0px_rgba(162,148,249,0.5)] focus:-translate-y-0.5 focus:-translate-x-0.5 focus:outline-none rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-bold uppercase text-gray-900 transition-all cursor-pointer pointer-events-auto"
                        />
                    </div>
                </div>
                <div className="flex-1 w-full relative flex flex-col">
                    {data.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                            No click data available yet
                        </div>
                    ) : (
                        <div className="flex justify-between items-end w-full h-full pt-8 pb-2 px-1 sm:px-4">
                            {data.map((day, index) => {
                                const heightPercent = maxClicks > 0 ? (day.clicks / yMax) * 100 : 0;
                                // ensure minimum height for visibility even with 0 clicks
                                const barHeight = Math.max(heightPercent, 2);

                                return (
                                    <div key={day._id || index} className="flex flex-col items-center h-full justify-end relative group/bar w-[13%] sm:w-16">

                                        {/* Day Label Box (Top aligned) */}
                                        <div className="absolute top-0 -mt-10 sm:-mt-12 border-y-[3px] border-l-[3px] border-r-[10px] border-[#A294F9] rounded-xl px-2.5 py-1 sm:px-4 sm:py-1.5 bg-white text-sm sm:text-base font-black text-gray-900 shadow-[3px_3px_0px_0px_rgba(162,148,249,0.5)] z-10 flex items-center justify-center transition-all duration-300 group-hover/bar:-translate-y-1 group-hover/bar:rotate-[-4deg] group-hover/bar:scale-110 hover:shadow-[4px_4px_0px_0px_rgba(162,148,249,0.6)]">
                                            {day._id}
                                        </div>

                                        {/* Hover Tooltip for Clicks (Conditionally Right/Left aligned) */}
                                        <div className={`opacity-0 group-hover/bar:opacity-100 transition-opacity absolute top-1/2 -translate-y-1/2 ${index > 3 ? 'right-full mr-2' : 'left-full ml-2'} bg-[#A294F9] text-white text-[10px] font-bold rounded-md px-1.5 py-0.5 pointer-events-none shadow-[2px_2px_0px_0px_rgba(162,148,249,0.4)] whitespace-nowrap z-30`}>
                                            {day.clicks} {day.clicks === 1 ? 'click' : 'clicks'}
                                            {/* Tooltip small arrow pointing to the bar */}
                                            <div className={`absolute top-1/2 -translate-y-1/2 ${index > 3 ? 'left-full border-[3px] border-transparent border-l-[#A294F9]' : 'right-full border-[3px] border-transparent border-r-[#A294F9]'}`}></div>
                                        </div>

                                        {/* Custom Bar */}
                                        <div
                                            className="w-full border-2 border-[#A294F9] rounded-lg bg-[#CDC1FF] transition-all duration-300 group-hover/bar:-translate-y-1 shadow-[2px_2px_0px_0px_rgba(162,148,249,0.5)] group-hover/bar:shadow-[3px_3px_0px_0px_rgba(162,148,249,0.6)]"
                                            style={{ height: `${barHeight}%` }}
                                        ></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </CardSpotlight>
        </div>
    );
};

export default DailyClicksChart;
