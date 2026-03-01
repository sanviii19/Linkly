import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { Globe, MousePointer2, ArrowLeft, Clock, Calendar } from 'lucide-react';
import DailyClicksChart from '../components/Analytics/DailyClicksChart';
import DeviceBreakdownChart from '../components/Analytics/DeviceBreakdownChart';
import LinkInfoCard from '../components/Analytics/LinkInfoCard';
import StatCard from '../components/Analytics/StatCard';
import InfiniteMarquee from '../components/Analytics/InfiniteMarquee';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
    const { slug } = useParams({ from: '/analytics/$slug' });
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchAnalytics = async () => {
            if (!isAuthenticated) return;

            try {
                const response = await axiosInstance.get(`/api/analytics/${slug}`);
                setData(response.data);
            } catch (err) {
                console.error("Error fetching analytics:", err);
                if (err.response?.status === 403) {
                    setError("You don't have permission to view analytics for this link.");
                } else if (err.response?.status === 404) {
                    setError("Link not found.");
                } else {
                    setError("Failed to load analytics data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [slug, isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5EFFF] flex items-center justify-center bg-[radial-gradient(#CDC1FF_1px,transparent_1px)] [background-size:24px_24px]">
                <BeatLoader color="#A294F9" size={20} margin={5} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F5EFFF] flex flex-col items-center justify-center text-gray-900 bg-[radial-gradient(#CDC1FF_1px,transparent_1px)] [background-size:24px_24px]">
                <div className="bg-white p-8 rounded-3xl border-4 border-[#A294F9] shadow-[8px_8px_0px_0px_rgba(162,148,249,0.5)] flex flex-col items-center">
                    <h2 className="text-3xl font-black mb-4 text-[#A294F9] uppercase tracking-wider">Error</h2>
                    <p className="text-gray-900 font-bold mb-8 text-center">{error}</p>
                    <button
                        onClick={() => navigate({ to: '/dashboard' })}
                        className="px-8 py-3 bg-[#CDC1FF] border-2 border-[#A294F9] shadow-[4px_4px_0px_0px_rgba(162,148,249,0.5)] rounded-xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(162,148,249,0.5)] active:translate-y-0 active:translate-x-0 active:shadow-none transition-all font-black uppercase text-gray-900 tracking-wider"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const { link, analytics } = data;

    // Prepare data for Recharts
    const dailyClicksData = analytics.dailyClicks && analytics.dailyClicks.length > 0
        ? analytics.dailyClicks.map(item => ({
            _id: item._id, // Date string
            clicks: item.clicks
        }))
        : [];

    const deviceData = analytics.deviceBreakdown && analytics.deviceBreakdown.length > 0
        ? analytics.deviceBreakdown.map(item => ({
            name: item._id || 'Unknown',
            value: item.count
        }))
        : [{ name: 'No Data', value: 1 }];

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F5EFFF] p-6 pt-32 md:p-12 md:pt-32 font-sans relative overflow-hidden text-gray-900 bg-[radial-gradient(#CDC1FF_1px,transparent_1px)] [background-size:24px_24px]">
            <motion.div
                className="relative z-10 max-w-[1400px] mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 cursor-default uppercase tracking-tight flex flex-wrap items-center gap-3 md:gap-4">
                            <span className="bg-[#A294F9] text-white px-5 py-2 border-4 border-[#7C6DD8] rounded-xl shadow-[6px_6px_0px_0px_rgba(162,148,249,0.6)] -rotate-2 inline-block hover:rotate-2 hover:scale-105 transition-all duration-300">
                                Analytics
                            </span>
                            <span className="px-1 relative">
                                Dashboard
                                {/* Decorative underline */}
                                <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#CDC1FF]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="5" fill="none" />
                                </svg>
                            </span>
                        </h1>
                        <a
                            href={link.originalUrl || link.full_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#A294F9] bg-white text-sm md:text-base font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(162,148,249,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(162,148,249,0.4)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 ease-out w-fit mt-5 group hover:-rotate-1 hover:ring-4 hover:ring-[#CDC1FF]/40 origin-left"
                        >
                            <span className="bg-[#A294F9] text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest leading-none uppercase hidden sm:block">
                                DESTINATION
                            </span>
                            <span className="truncate max-w-[200px] sm:max-w-xs md:max-w-md pr-1">
                                {link.originalUrl || link.full_url}
                            </span>
                            <span className="text-[#A294F9] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform font-black">
                                ↗
                            </span>
                        </a>
                    </div>
                </motion.div>

                {/* Main Dashboard Grid */}
                <div className="flex flex-col gap-8 lg:gap-10">

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        <motion.div variants={itemVariants} className="h-full">
                            <StatCard
                                title="Total Clicks"
                                value={analytics.totalClicks}
                                icon={MousePointer2}
                                colorClass="bg-[#CDC1FF] text-gray-900"
                                shadowColorClass="bg-[#A294F9]"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants} className="h-full">
                            <StatCard
                                title="Unique Users"
                                value={analytics.uniqueClicks}
                                icon={Globe}
                                colorClass="bg-[#E5D9F2] text-gray-900"
                                shadowColorClass="bg-[#CDC1FF]"
                            />
                        </motion.div>
                    </div>

                    {/* Link Info Card Row */}
                    <motion.div variants={itemVariants} className="w-full">
                        <LinkInfoCard link={link} />
                    </motion.div>

                    {/* Charts Row: Trend Chart + Devices */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* Large Trend Chart */}
                        <motion.div variants={itemVariants} className="lg:col-span-8 h-[350px] sm:h-[400px]">
                            <DailyClicksChart data={dailyClicksData} />
                        </motion.div>

                        {/* Device Pie Chart */}
                        <motion.div variants={itemVariants} className="lg:col-span-4 h-[350px] sm:h-[400px]">
                            <DeviceBreakdownChart data={deviceData} />
                        </motion.div>
                    </div>

                    {/* Infinite Scrolling Marquee */}
                    <motion.div variants={itemVariants} className="w-full pb-10">
                        <InfiniteMarquee />
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsPage;
