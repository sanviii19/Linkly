import React from 'react';
import { motion } from 'framer-motion';

const messages = [
    "🚀 FAST & RELIABLE REDIRECTION",
    "📊 REAL-TIME LINK ANALYTICS",
    "🔒 BUILT-IN SECURITY PROTOCOLS",
    "🔗 SEAMLESS LINK MANAGEMENT",
    "📱 CROSS-DEVICE COMPATIBILITY",
    "✨ MODERN NEOBRUTALIST DESIGN"
];

const InfiniteMarquee = () => {
    // We duplicate the list to ensure a perfectly seamless infinite scroll
    const items = [...messages, ...messages, ...messages, ...messages];

    return (
        <div className="w-full bg-[#A294F9] text-white py-5 sm:py-6 overflow-hidden flex whitespace-nowrap border-4 border-[#7C6DD8] shadow-[8px_8px_0px_0px_rgba(124,109,216,0.6)] rounded-2xl relative group">

            {/* Left and Right Fade for neat edges */}
            <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#A294F9] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#A294F9] to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex items-center"
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30 // Adjust duration for scroll speed
                }}
            >
                {items.map((msg, idx) => (
                    <div key={idx} className="flex items-center">
                        <span className="text-xl sm:text-2xl font-black tracking-widest px-8 hover:text-[#F5EFFF] transition-colors cursor-default">
                            {msg}
                        </span>
                        <span className="text-[#CDC1FF] text-2xl font-bold px-2">
                            *
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteMarquee;
