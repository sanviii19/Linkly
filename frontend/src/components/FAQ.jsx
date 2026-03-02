import React, { useState, useRef, useEffect } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);

    const faqs = [
        {
            question: "How do I get started with Linkly?",
            answer: "Getting started is easy! Simply sign up for a free account, paste your long URL into the shortener box, and click 'Shorten Now'. You can then copy your new short link, generate a QR code, and share it anywhere."
        },
        {
            question: "Can I customize my short links?",
            answer: "Yes! Once you have an account, you can create custom aliases for your links (e.g., linkly.com/my-brand) to make them more memorable and on-brand."
        },
        {
            question: "What analytics are available?",
            answer: "We provide comprehensive analytics for all your links through an intuitive dashboard. You can track total clicks and unique users, view your daily click trends by week, and see a breakdown of the specific device types (Mobile, Desktop, Tablet) your visitors are using."
        },
        {
            question: "Can I set expiration dates or schedule my links?",
            answer: "Absolutely! For authenticated users, you can schedule links to become active at a specific date and time, and set custom expiration dates when they should stop redirecting. This gives you complete control over time-sensitive campaigns."
        },
        {
            question: "How secure are my links?",
            answer: "Security is our top priority. All links are encrypted with HTTPS. We also offer password protection for your short links—visitors will be prompted to enter your secure pin before they can access the destination URL."
        },
        {
            question: "Can I generate QR codes and share links directly?",
            answer: "Yes! Every link you create automatically generates a dynamic QR code that you can download. Plus, our dashboard includes one-click sharing buttons for WhatsApp, X (Twitter), LinkedIn, and Facebook."
        }
    ];

    return (
        <section id="faq" className="py-20 bg-gray-900 border-t border-purple-700 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-violet-600/50 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-700/50 rounded-full blur-3xl animate-pulse delay-1000"></div>
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div> */}
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm mb-6">
                        <span className="text-sm font-medium text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-violet-500 inline-block mr-2 animate-pulse"></span>
                            FAQ
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Frequently asked questions
                    </h2>
                </div>

                {/* Accordion Questions */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group rounded-2xl border transition-all duration-500 ease-out ${openIndex === index
                                ? 'bg-gradient-to-br from-gray-800/90 to-gray-800/70 border-violet-500/50 shadow-2xl shadow-violet-500/20'
                                : 'bg-gray-800/40 border-gray-700 hover:border-violet-500/30 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-violet-500/5'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                            >
                                <span className={`text-lg font-semibold transition-colors duration-300 ${openIndex === index ? 'text-violet-300' : 'text-gray-200 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-500 ease-out ${openIndex === index
                                    ? 'bg-violet-500 border-violet-400 rotate-180 scale-110'
                                    : 'bg-gray-700/50 border-gray-600 group-hover:border-violet-400/50 group-hover:bg-gray-700'
                                    }`}>
                                    <svg
                                        className={`w-5 h-5 transition-all duration-300 ${openIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-violet-300'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                ref={el => contentRefs.current[index] = el}
                                style={{
                                    maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0px',
                                    transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out, padding 0.5s ease-in-out'
                                }}
                                className={`overflow-hidden ${openIndex === index ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className="px-6 pb-6 pt-2">
                                    <div className={`text-gray-300 leading-relaxed transition-all duration-300 ${openIndex === index ? 'translate-y-0' : '-translate-y-2'}`}>
                                        <div className="pl-4 border-l-2 border-violet-500/30">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
