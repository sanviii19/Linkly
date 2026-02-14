import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { Globe, MousePointer2, ArrowLeft, Clock, Calendar } from 'lucide-react';
import DailyClicksChart from '../components/Analytics/DailyClicksChart';
import DeviceBreakdownChart from '../components/Analytics/DeviceBreakdownChart';
import StatCard from '../components/Analytics/StatCard';
import { BeatLoader } from 'react-spinners';

const AnalyticsPage = () => {
    const { slug } = useParams({ from: '/analytics/$slug' });
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <BeatLoader color="#8b5cf6" size={15} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                    onClick={() => navigate({ to: '/dashboard' })}
                    className="px-6 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition font-medium"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (!data) return null;

    const { link, analytics } = data;

    // Prepare data for Recharts
    // Ensure dailyClicks has data so chart doesn't break
    const dailyClicksData = analytics.dailyClicks && analytics.dailyClicks.length > 0
        ? analytics.dailyClicks.map(item => ({
            _id: item._id, // Date string
            clicks: item.clicks
        }))
        : [];

    // Transform device data for Pie Chart
    // Backend returns: object with _id (device type) and count
    const deviceData = analytics.deviceBreakdown && analytics.deviceBreakdown.length > 0
        ? analytics.deviceBreakdown.map(item => ({
            name: item._id || 'Unknown',
            value: item.count
        }))
        : [{ name: 'No Data', value: 1 }];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 p-6 md:p-12 font-sans relative overflow-hidden text-white">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <button
                    onClick={() => navigate({ to: '/dashboard' })}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
                            Analytics Dashboard
                        </h1>
                        <div className="flex items-center gap-2 text-violet-300/80">
                            <Globe className="w-4 h-4" />
                            <span className="truncate max-w-md">{link.originalUrl}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                        <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Short Link</p>
                            <a
                                href={`${import.meta.env.VITE_BACKEND_URL}/${link.shortUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white font-mono font-medium hover:text-violet-300 transition"
                            >
                                /{link.shortUrl}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Clicks"
                        value={analytics.totalClicks}
                        icon={MousePointer2}
                        colorClass="bg-violet-500"
                    />
                    <StatCard
                        title="Unique Users"
                        value={analytics.uniqueClicks}
                        icon={Globe}
                        colorClass="bg-blue-500"
                    />
                    <StatCard
                        title="Active From"
                        value={link.activeFrom ? new Date(link.activeFrom).toLocaleDateString() : 'Now'}
                        icon={Clock}
                        colorClass="bg-emerald-500"
                    />
                    <StatCard
                        title="Expires At"
                        value={link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : 'Never'}
                        icon={Calendar}
                        colorClass="bg-rose-500"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-4 text-white/90">Click Trends</h3>
                        <DailyClicksChart data={dailyClicksData} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white/90">Devices</h3>
                        <DeviceBreakdownChart data={deviceData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
