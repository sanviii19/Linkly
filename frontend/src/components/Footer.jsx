import React from 'react';
import { Link } from '@tanstack/react-router';

const Footer = () => {
  return (
    <footer className="relative bg-[#E5D9F2] border-t-4 border-[#A294F9]/30 overflow-hidden pt-16 pb-12 mt-auto z-10 selection:bg-[#CDC1FF] selection:text-gray-900">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#CDC1FF_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-8 group cursor-pointer hover:scale-110 transition-transform duration-300">
          <div className="w-12 h-12 bg-[#A294F9] border-4 border-[#7C6DD8] rounded-xl shadow-[4px_4px_0px_0px_rgba(162,148,249,0.5)] flex items-center justify-center group-hover:-rotate-12 transition-all duration-300">
            <img src="/logo2.png" alt="Linkly" className="h-6 w-auto filter brightness-0 invert" />
          </div>
          <span className="text-3xl font-black text-gray-900 tracking-tight uppercase group-hover:text-[#A294F9] transition-colors">Linkly</span>
        </div>

        {/* Links horizontal block */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 w-full px-4">
          <Link to="/" className="text-sm font-black text-gray-900 hover:text-[#A294F9] uppercase tracking-wider transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#A294F9] transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/dashboard" className="text-sm font-black text-gray-900 hover:text-[#A294F9] uppercase tracking-wider transition-colors relative group">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#A294F9] transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/auth" search={{ mode: 'login' }} className="text-sm font-black text-gray-900 hover:text-[#A294F9] uppercase tracking-wider transition-colors relative group">
            Log In
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#A294F9] transition-all group-hover:w-full"></span>
          </Link>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-black text-gray-900 hover:text-[#A294F9] uppercase tracking-wider transition-colors relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#A294F9] transition-all group-hover:w-full"></span>
          </button>
          <a href="#" className="text-sm font-black text-gray-900 hover:text-[#A294F9] uppercase tracking-wider transition-colors relative group">
            Privacy
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#A294F9] transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-sm font-black text-gray-900 hover:text-[#A294F9] uppercase tracking-wider transition-colors relative group">
            Terms
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#A294F9] transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Separator */}
        <div className="w-full border-t-4 border-dashed border-[#CDC1FF]/40 mb-8 max-w-4xl"></div>

        {/* Bottom Bar */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs sm:text-sm font-black text-gray-500 uppercase tracking-widest text-center md:text-left hover:text-gray-900 transition-colors cursor-default">
            &copy; {new Date().getFullYear()} Linkly LLC. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-[#CDC1FF] border-2 border-[#A294F9]/40 rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(162,148,249,0.4)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(162,148,249,0.4)] active:translate-y-0 active:translate-x-0 active:shadow-none hover:bg-[#A294F9] transition-all text-gray-900 hover:text-white group">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#E5D9F2] border-2 border-[#A294F9]/40 rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(162,148,249,0.4)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(162,148,249,0.4)] active:translate-y-0 active:translate-x-0 active:shadow-none hover:bg-[#A294F9] transition-all text-gray-900 hover:text-white group">
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-[#A294F9] border-2 border-[#7C6DD8] rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(124,109,216,0.5)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(124,109,216,0.5)] active:translate-y-0 active:translate-x-0 active:shadow-none hover:bg-[#7C6DD8] transition-all text-white group">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
