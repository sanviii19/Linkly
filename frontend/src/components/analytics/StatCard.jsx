import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
                    <p className="text-3xl font-bold text-white mt-2">{value}</p>
                </div>
                <div className={`p-4 rounded-xl bg-opacity-20 ${colorClass}`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
