import React from 'react';
import { CardSpotlight } from '../ui/card-spotlight';

const StatCard = ({ title, value, icon: Icon, colorClass, shadowColorClass }) => {
    return (
        <div className="relative group w-full mb-3 mr-3 cursor-default">
            {/* Bottom Card / Shadow */}
            <div className={`absolute inset-0 border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[8px] translate-y-[8px] group-hover:translate-x-[12px] group-hover:translate-y-[12px] ${shadowColorClass || 'bg-[#CDC1FF]'}`} />

            {/* Top Card */}
            <CardSpotlight
                className="relative bg-white rounded-2xl p-6 h-full border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-10 hover:-translate-x-1 hover:-translate-y-1"
                color="rgba(162, 148, 249, 0.15)"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-900 text-sm font-bold uppercase tracking-wider">{title}</p>
                        <p className="text-4xl font-black text-gray-900 mt-2">{value}</p>
                    </div>
                    <div className={`p-4 rounded-xl border-2 border-[#A294F9]/30 shadow-[2px_2px_0px_0px_rgba(162,148,249,0.3)] ${colorClass}`}>
                        {Icon && <Icon className="w-8 h-8" />}
                    </div>
                </div>
            </CardSpotlight>
        </div>
    );
};

export default StatCard;
