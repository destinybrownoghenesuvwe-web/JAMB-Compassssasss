import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import {
  Menu,
  Compass,
  Search,
  User,
  X,
  LayoutDashboard,
  Activity,
  Bell,
  Trophy,
  Info,
  BookOpen,
  GraduationCap,
  Building2,
  BookOpenText,
  ListChecks,
  FileCheck,
  Briefcase,
  CalendarDays,
  Monitor,
  BookMarked,
  Award,
  Newspaper,
  HelpCircle,
  Bookmark,
  Settings,
  LogOut,
  FileSpreadsheet,
  History,
  UserCheck
} from 'lucide-react';

export interface AuthenticatedHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  user: { name: string; email: string };
  onLogout: () => void;
}

interface NavCategory {
  title: string;
  items: {
    label: string;
    id: TabType;
    icon: string;
  }[];
}

export const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  user,
  onLogout,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const sidebarCategories: NavCategory[] = [
    {
      title: 'Platform',
      items: [
        { label: 'Dashboard', id: 'dashboard', icon: 'dashboard' },
        { label: 'Platform Status', id: 'platform-status', icon: 'platform-status' },
        { label: 'Notifications', id: 'notifications', icon: 'notifications' },
        { label: 'Leaderboard', id: 'leaderboard', icon: 'leaderboard' },
      ],
    },
    {
      title: 'Admissions',
      items: [
        { label: 'About JAMB', id: 'about', icon: 'about' },
        { label: 'JAMB Guide', id: 'guide', icon: 'guide' },
        { label: 'Admission Process', id: 'admission', icon: 'admission' },
      ],
    },
    {
      title: 'Universities & Courses',
      items: [
        { label: 'Universities', id: 'universities', icon: 'universities' },
        { label: 'Courses', id: 'courses', icon: 'courses' },
        { label: 'Subject Combination Checker', id: 'subject-checker', icon: 'subject-checker' },
        { label: 'Admission Requirements Checker', id: 'subject-checker', icon: 'requirements-checker' },
        { label: 'Career Explorer', id: 'careers', icon: 'careers' },
      ],
    },
    {
      title: 'Learning',
      items: [
        { label: 'Study Planner', id: 'study-planner', icon: 'study-planner' },
        { label: 'CBT Practice', id: 'cbt-practice', icon: 'cbt-practice' },
        { label: 'Recommended Textbooks', id: 'textbooks', icon: 'textbooks' },
        { label: 'JAMB Syllabus', id: 'syllabus', icon: 'syllabus' },
        { label: 'Past Questions', id: 'past-questions', icon: 'past-questions' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Scholarships', id: 'scholarships', icon: 'scholarships' },
        { label: 'News & Updates', id: 'news', icon: 'news' },
        { label: 'Help Centre & FAQ', id: 'help-centre', icon: 'help-centre' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile', id: 'profile', icon: 'profile' },
        { label: 'Settings', id: 'profile', icon: 'settings' },
        { label: 'Saved Items', id: 'profile', icon: 'bookmark' },
      ],
    },
  ];

  const getNavIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'dashboard': return <LayoutDashboard className={className} />;
      case 'platform-status': return <Activity className={className} />;
      case 'notifications': return <Bell className={className} />;
      case 'leaderboard': return <Trophy className={className} />;
      case 'about': return <Info className={className} />;
      case 'guide': return <BookOpenText className={className} />;
      case 'admission': return <GraduationCap className={className} />;
      case 'universities': return <Building2 className={className} />;
      case 'courses': return <BookOpen className={className} />;
      case 'subject-checker': return <ListChecks className={className} />;
      case 'requirements-checker': return <FileCheck className={className} />;
      case 'careers': return <Briefcase className={className} />;
      case 'study-planner': return <CalendarDays className={className} />;
      case 'cbt-practice': return <Monitor className={className} />;
      case 'textbooks': return <BookMarked className={className} />;
      case 'syllabus': return <FileSpreadsheet className={className} />;
      case 'past-questions': return <History className={className} />;
      case 'scholarships': return <Award className={className} />;
      case 'news': return <Newspaper className={className} />;
      case 'help-centre': return <HelpCircle className={className} />;
      case 'profile': return <User className={className} />;
      case 'settings': return <Settings className={className} />;
      case 'bookmark': return <Bookmark className={className} />;
      default: return <Info className={className} />;
    }
  };

  const handleNavClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="docked full-width top-0 sticky z-40 bg-[#f5fbf2]/95 backdrop-blur-md shadow-xs h-16 sm:h-20 transition-all duration-300 border-b border-[#bdcabc]/30">
        <nav className="flex justify-between items-center w-full px-3.5 sm:px-6 max-w-[1280px] mx-auto h-full gap-2">
          {/* Left: Authenticated Hamburger Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="authenticated-sidebar-toggle-btn"
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 sm:p-2 -ml-1 rounded-xl text-[#3e4a3f] hover:text-[#006a39] hover:bg-[#e9f0e7] transition-all flex items-center justify-center focus:outline-none shrink-0"
              title="Open Navigation Menu"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#006a39] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                <Compass className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-base sm:text-xl font-bold font-display text-[#006a39] tracking-tight whitespace-nowrap">
                JAMB Compass
              </span>
            </div>
          </div>

          {/* Center: Authenticated Top Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm transition-all py-1.5 relative font-semibold ${
                activeTab === 'dashboard'
                  ? 'text-[#006a39] border-b-2 border-[#006a39]'
                  : 'text-[#3e4a3f] hover:text-[#006a39]'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('cbt-practice')}
              className={`text-sm transition-all py-1.5 relative font-semibold ${
                activeTab === 'cbt-practice'
                  ? 'text-[#006a39] border-b-2 border-[#006a39]'
                  : 'text-[#3e4a3f] hover:text-[#006a39]'
              }`}
            >
              CBT Practice
            </button>

            <button
              onClick={() => setActiveTab('study-hub')}
              className={`text-sm transition-all py-1.5 relative font-semibold ${
                activeTab === 'study-hub'
                  ? 'text-[#006a39] border-b-2 border-[#006a39]'
                  : 'text-[#3e4a3f] hover:text-[#006a39]'
              }`}
            >
              Study Hub
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
              onClick={() => setActiveTab('syllabus')}
              className={`text-sm transition-all py-1.5 relative font-semibold ${
                activeTab === 'syllabus'
                  ? 'text-[#006a39] border-b-2 border-[#006a39]'
                  : 'text-[#3e4a3f] hover:text-[#006a39]'
              }`}
            >
              Syllabus
            </button>
          </div>

          {/* Right: Search, Notifications & Student Profile */}
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

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab('notifications')}
                className="p-1.5 sm:p-2 rounded-xl text-[#3e4a3f] hover:text-[#006a39] hover:bg-[#e9f0e7] transition-all relative hidden sm:flex items-center justify-center shrink-0"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-1.5 sm:gap-2 bg-[#e9f0e7] hover:bg-[#d8e6d5] text-[#006a39] font-bold text-xs sm:text-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all border border-[#006a39]/20 shrink-0"
                title="View Student Profile"
              >
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="max-w-[70px] sm:max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* SLIDE-IN NAVIGATION DRAWER FOR AUTHENTICATED STUDENTS */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white text-[#171d18] shadow-2xl z-50 flex flex-col transform transition-transform duration-300 overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#f5fbf2]">
              <div 
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-[#006a39] flex items-center justify-center text-white shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold font-display text-[#006a39] leading-none">
                    JAMB Compass
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Student Portal</span>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              {sidebarCategories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-1.5">
                  <h3 className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {cat.title}
                  </h3>
                  <div className="space-y-1">
                    {cat.items.map((item, itemIdx) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={itemIdx}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-left ${
                            isActive
                              ? 'bg-[#006a39]/10 text-[#006a39] font-bold border-l-4 border-[#006a39]'
                              : 'text-slate-700 hover:bg-[#eff6ec] hover:text-[#006a39] font-medium'
                          }`}
                        >
                          <span className={isActive ? 'text-[#006a39]' : 'text-slate-400'}>
                            {getNavIcon(item.icon, "w-4 h-4")}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer with Active User Details & Logout */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-2">
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2 py-1">
                  <div className="w-8 h-8 rounded-full bg-[#006a39] text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-xs font-bold text-slate-800 truncate">{user.name}</span>
                    <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
