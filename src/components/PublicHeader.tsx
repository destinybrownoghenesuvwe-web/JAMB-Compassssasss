import React from 'react';
import { TabType } from '../types';
import { Compass, Search } from 'lucide-react';

export interface PublicHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAuth,
}) => {
  return (
    <header className="docked full-width top-0 sticky z-40 bg-[#f5fbf2]/95 backdrop-blur-md shadow-xs h-16 sm:h-20 transition-all duration-300 border-b border-[#bdcabc]/30">
      <nav className="flex justify-between items-center w-full px-3.5 sm:px-6 max-w-[1280px] mx-auto h-full gap-2">
        {/* Left: Brand Logo & Title (Strictly no hamburger or drawer triggers) */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#006a39] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Compass className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-base sm:text-xl font-bold font-display text-[#006a39] tracking-tight whitespace-nowrap">
            JAMB Compass
          </span>
        </div>

        {/* Center: Simplified Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => setActiveTab('home')}
            className={`text-sm transition-all py-1.5 relative font-semibold ${
              activeTab === 'home'
                ? 'text-[#006a39] border-b-2 border-[#006a39]'
                : 'text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`text-sm transition-all py-1.5 relative font-semibold ${
              activeTab === 'about'
                ? 'text-[#006a39] border-b-2 border-[#006a39]'
                : 'text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`text-sm transition-all py-1.5 relative font-semibold ${
              activeTab === 'courses'
                ? 'text-[#006a39] border-b-2 border-[#006a39]'
                : 'text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            Courses
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`text-sm transition-all py-1.5 relative font-semibold ${
              activeTab === 'universities'
                ? 'text-[#006a39] border-b-2 border-[#006a39]'
                : 'text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            Universities
          </button>

          <button
            onClick={() => setActiveTab('help-centre')}
            className={`text-sm transition-all py-1.5 relative font-semibold ${
              activeTab === 'help-centre'
                ? 'text-[#006a39] border-b-2 border-[#006a39]'
                : 'text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            Help Centre
          </button>
        </div>

        {/* Right: Search, Login & Sign Up Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 rounded-xl text-[#3e4a3f] hover:text-[#006a39] hover:bg-[#e9f0e7] transition-all flex items-center justify-center shrink-0"
            title="Search courses, universities, news"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>

          <div className="h-5 sm:h-6 w-px bg-[#bdcabc]/60 mx-0.5 sm:mx-1 hidden xs:block"></div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-[#006a39] font-semibold text-xs sm:text-sm hover:bg-[#eff6ec] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all border border-transparent hover:border-[#bdcabc]/40 whitespace-nowrap shrink-0"
            >
              Login
            </button>

            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-[#006a39] hover:bg-[#008649] text-white font-semibold text-xs sm:text-sm px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
