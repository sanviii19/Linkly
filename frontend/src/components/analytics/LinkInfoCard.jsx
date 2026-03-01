import React from 'react';
import { Lock, Clock, Calendar, AlertCircle, CheckCircle, ExternalLink, Copy, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { CardSpotlight } from '../ui/card-spotlight';

const LinkInfoCard = ({ link }) => {
    const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
    const isActive = !link.activeFrom || new Date(link.activeFrom) <= new Date();
    const isScheduled = link.activeFrom && new Date(link.activeFrom) > new Date();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/${link.shortUrl}`);
            // You might want to add a toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full h-full">
            {/* Card 1: Link Details */}
            <div className="relative group w-full sm:mb-4 sm:mr-4 mb-3 mr-3 cursor-default flex-1">
                {/* Bottom Card */}
                <div className="absolute inset-0 bg-[#A294F9] border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[16px] translate-y-[16px] group-hover:translate-x-[24px] group-hover:translate-y-[24px] shadow-sm" />

                {/* Middle Card */}
                <div className="absolute inset-0 bg-[#CDC1FF] border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[8px] translate-y-[8px] group-hover:translate-x-[12px] group-hover:translate-y-[12px]" />

                {/* Top Card */}
                <CardSpotlight
                    className="relative bg-white rounded-2xl p-6 lg:p-8 h-full border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-[4px] group-hover:-translate-y-[4px] z-10"
                    color="rgba(162, 148, 249, 0.25)"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <ExternalLink className="w-6 h-6 text-[#A294F9]" />
                        Link Details
                    </h3>

                    <div className="space-y-6 flex-1 flex flex-col">
                        <div className="space-y-6">
                            {/* Short Link */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#A294F9]/30 bg-white text-sm font-semibold text-gray-900 shadow-[3px_3px_0px_0px_rgba(162,148,249,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(162,148,249,0.3)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 ease-out w-full sm:w-fit group hover:rotate-1 hover:ring-4 hover:ring-[#CDC1FF]/40 origin-left cursor-text">
                                    <span className="bg-[#A294F9] text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider leading-none uppercase sm:shrink-0">
                                        SHORT LINK
                                    </span>
                                    <span className="text-[#A294F9] font-bold font-mono text-xs sm:text-sm truncate flex-1 min-w-[100px]">
                                        {import.meta.env.VITE_BACKEND_URL}/{link.shortUrl}
                                    </span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-1 hover:bg-[#F5EFFF] rounded-md transition-colors text-[#A294F9] hover:text-[#7C6DD8] active:scale-95 shrink-0 relative z-20 cursor-pointer pointer-events-auto"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Original Destination */}
                            <div className="relative z-20 pointer-events-auto">
                                <a
                                    href={link.originalUrl || link.full_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#A294F9]/30 bg-white text-sm font-semibold text-gray-900 shadow-[3px_3px_0px_0px_rgba(162,148,249,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(162,148,249,0.3)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 ease-out w-fit max-w-full group hover:-rotate-1 hover:ring-4 hover:ring-[#CDC1FF]/30 origin-left cursor-pointer"
                                >
                                    <span className="bg-[#CDC1FF] text-gray-900 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider leading-none uppercase shrink-0">
                                        DESTINATION
                                    </span>
                                    <span className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] pr-1">
                                        {link.originalUrl || link.full_url}
                                    </span>
                                    <span className="text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform font-bold shrink-0">
                                        ↗
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </CardSpotlight>
            </div>

            {/* Card 2: Status & Protection */}
            <div className="relative group w-full sm:mb-4 sm:mr-4 mb-3 mr-3 cursor-default flex-1">
                {/* Bottom Card */}
                <div className="absolute inset-0 bg-[#CDC1FF] border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[16px] translate-y-[16px] group-hover:translate-x-[24px] group-hover:translate-y-[24px] shadow-sm" />

                {/* Middle Card */}
                <div className="absolute inset-0 bg-[#E5D9F2] border-2 border-[#A294F9]/40 rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-x-[8px] translate-y-[8px] group-hover:translate-x-[12px] group-hover:translate-y-[12px]" />

                {/* Top Card */}
                <CardSpotlight
                    className="relative bg-white rounded-2xl p-6 lg:p-8 h-full border-2 border-[#A294F9]/30 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-[4px] group-hover:-translate-y-[4px] z-10"
                    color="rgba(205, 193, 255, 0.3)"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-[#A294F9]" />
                        Status & Details
                    </h3>

                    <div className="space-y-6 flex-1 flex flex-col relative z-20 pointer-events-auto">
                        <div className="space-y-3">
                            {/* Password Protection */}
                            <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${link.isPasswordProtected
                                ? 'bg-amber-50 border-amber-200 text-amber-800'
                                : 'bg-white border-gray-200 text-gray-700'
                                }`}>
                                <Lock className={`w-5 h-5 ${link.isPasswordProtected ? 'text-amber-500' : 'text-gray-400'}`} />
                                <div className="flex-1">
                                    <p className="text-sm font-bold">
                                        {link.isPasswordProtected ? 'Password Protected' : 'No Password Protection'}
                                    </p>
                                </div>
                            </div>

                            {/* Expiration Status */}
                            {link.expiresAt && (
                                <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${isExpired
                                    ? 'bg-red-50 border-red-200 text-red-800'
                                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                    }`}>
                                    <AlertCircle className={`w-5 h-5 ${isExpired ? 'text-red-500' : 'text-emerald-500'}`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">
                                            {isExpired ? 'Expired' : 'Active'}
                                        </p>
                                        <p className="text-xs font-medium opacity-80 mt-0.5">
                                            {isExpired
                                                ? `Expired on ${new Date(link.expiresAt).toLocaleDateString()}`
                                                : `Expires on ${new Date(link.expiresAt).toLocaleDateString()}`
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Scheduled Status */}
                            {link.activeFrom && (
                                <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${isScheduled
                                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                                    : 'bg-white border-gray-200 text-gray-700'
                                    }`}>
                                    <Clock className={`w-5 h-5 ${isScheduled ? 'text-blue-500' : 'text-gray-400'}`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">
                                            {isScheduled ? 'Scheduled' : 'Active'}
                                        </p>
                                        <p className="text-xs font-medium opacity-80 mt-0.5">
                                            {isScheduled
                                                ? `Starts ${new Date(link.activeFrom).toLocaleString()}`
                                                : `Active since ${new Date(link.activeFrom).toLocaleDateString()}`
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-xs font-bold text-gray-400 text-center pt-4 mt-auto">
                            Created on {new Date(link.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </CardSpotlight>
            </div>
        </div>
    );
};

export default LinkInfoCard;
