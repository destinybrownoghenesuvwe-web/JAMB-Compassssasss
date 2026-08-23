import React, { useState } from 'react';
import { TabType } from '../types';

interface AdminDashboardScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

// Interfaces
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Candidate' | 'Parent' | 'Instructor' | 'Super Admin' | 'Content Manager';
  status: 'Active' | 'Pending' | 'Suspended' | 'Verified';
  regDate: string; // 2026 date
  lastActive: string; // 2026 date
  progress: number;
  avatar?: string;
}

export interface SupportTicket {
  id: string;
  user: string;
  subject: string;
  category: 'Technical' | 'Billing' | 'Admission Inquiry' | 'CBT Issue';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  createdAt: string; // 2026
}

export interface ModerationItem {
  id: string;
  reporter: string;
  targetUser: string;
  type: 'Reported Post' | 'Flagged Comment' | 'Challenge Dispute' | 'Leaderboard Report';
  contentSnippet: string;
  reason: string;
  timestamp: string; // 2026
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ setActiveTab }) => {
  // Theme Toggle state (Light / Dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Active Sidebar Section (Anchor navigation within Admin Dashboard)
  const [activeAdminSection, setActiveAdminSection] = useState<'overview' | 'users' | 'content' | 'announcements' | 'support' | 'moderation' | 'health' | 'reports' | 'logs' | 'roles' | 'settings'>('overview');

  // Mobile Sidebar Open
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // UI View States for Demo testing (Normal, Loading, Offline)
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'offline'>('normal');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(curr => (curr === msg ? null : curr));
    }, 4000);
  };

  // Global Search Input
  const [searchQuery, setSearchQuery] = useState('');

  // Analytics Period Switcher
  const [analyticsPeriod, setAnalyticsPeriod] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  // Interactive User Management State
  const [usersList, setUsersList] = useState<AdminUser[]>([
    {
      id: 'J2026-8821',
      name: 'Chukwudi Okafor',
      email: 'c.okafor@gmail.com',
      role: 'Candidate',
      status: 'Active',
      regDate: 'Mar 14, 2026',
      lastActive: 'Oct 15, 2026',
      progress: 85,
    },
    {
      id: 'J2026-9012',
      name: 'Amina Sadiq',
      email: 'amina.sadiq@yahoo.com',
      role: 'Candidate',
      status: 'Pending',
      regDate: 'Apr 02, 2026',
      lastActive: 'Oct 14, 2026',
      progress: 62,
    },
    {
      id: 'J2026-1142',
      name: 'Tunde Adeyemi',
      email: 't.adeyemi@hotmail.com',
      role: 'Candidate',
      status: 'Suspended',
      regDate: 'Feb 12, 2026',
      lastActive: 'Sep 28, 2026',
      progress: 30,
    },
    {
      id: 'J2026-4410',
      name: 'Dr. Folake Johnson',
      email: 'f.johnson@unilag.edu.ng',
      role: 'Instructor',
      status: 'Verified',
      regDate: 'Jan 10, 2026',
      lastActive: 'Oct 15, 2026',
      progress: 100,
    },
    {
      id: 'J2026-7731',
      name: 'Chief Emeka Adebayo',
      email: 'e.adebayo.parent@gmail.com',
      role: 'Parent',
      status: 'Active',
      regDate: 'May 19, 2026',
      lastActive: 'Oct 15, 2026',
      progress: 94,
    },
    {
      id: 'J2026-3390',
      name: 'Blessing Danjuma',
      email: 'blessing.d@gmail.com',
      role: 'Candidate',
      status: 'Active',
      regDate: 'Jun 05, 2026',
      lastActive: 'Oct 13, 2026',
      progress: 78,
    }
  ]);

  const [selectedUserFilter, setSelectedUserFilter] = useState<'All' | 'Candidate' | 'Parent' | 'Instructor'>('All');
  const [selectedUserStatusFilter, setSelectedUserStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Suspended' | 'Verified'>('All');
  const [selectedUserModal, setSelectedUserModal] = useState<AdminUser | null>(null);

  // Content Management Cards Data
  const contentItems = [
    { title: 'Courses', published: 145, draft: 12, scheduled: 5, archived: 2, icon: 'school', color: 'bg-[#0F9D58]' },
    { title: 'Universities', published: 210, draft: 8, scheduled: 2, archived: 1, icon: 'account_balance', color: 'bg-[#2563EB]' },
    { title: 'Scholarships', published: 82, draft: 34, scheduled: 15, archived: 4, icon: 'payments', color: 'bg-[#F59E0B]' },
    { title: 'Articles & News', published: 340, draft: 19, scheduled: 8, archived: 12, icon: 'newspaper', color: 'bg-[#9333EA]' },
    { title: 'Study Guides', published: 96, draft: 5, scheduled: 3, archived: 0, icon: 'auto_stories', color: 'bg-[#0F172A]' },
    { title: 'Practice Questions', published: 15400, draft: 1200, scheduled: 500, archived: 150, icon: 'quiz', color: 'bg-[#16A34A]' },
    { title: 'Mock Exams', published: 24, draft: 4, scheduled: 6, archived: 1, icon: 'assignment_turned_in', color: 'bg-[#DC2626]' },
    { title: 'JAMB Syllabus 2026', published: 38, draft: 0, scheduled: 0, archived: 2, icon: 'bookmark_manager', color: 'bg-[#0891B2]' },
  ];

  // Announcements Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<'General' | 'Exam Alert' | 'Scholarship' | 'System Maintenance'>('General');
  const [annContent, setAnnContent] = useState('');
  const [annTarget, setAnnTarget] = useState<'All Users' | 'Students' | 'Parents'>('All Users');
  const [annPubDate, setAnnPubDate] = useState('2026-10-20');
  const [annExpDate, setAnnExpDate] = useState('2026-11-30');
  const [annPriority, setAnnPriority] = useState<'Normal' | 'High' | 'Urgent'>('Normal');
  const [announcementsList, setAnnouncementsList] = useState([
    {
      id: 'A2026-01',
      title: 'Official 2026 JAMB CBT Practice Drills Launched',
      category: 'Exam Alert',
      target: 'Students',
      date: 'Oct 10, 2026',
      status: 'Published',
      priority: 'High'
    },
    {
      id: 'A2026-02',
      title: 'Scheduled System Maintenance Notification',
      category: 'System Maintenance',
      target: 'All Users',
      date: 'Nov 01, 2026',
      status: 'Scheduled',
      priority: 'Urgent'
    }
  ]);
  const [showAnnPreviewModal, setShowAnnPreviewModal] = useState(false);

  // Support Tickets State
  const [ticketsList, setTicketsList] = useState<SupportTicket[]>([
    { id: 'TCK-4912', user: 'Gabriel Nwankwo', subject: 'CBT practice timer froze mid-session', category: 'CBT Issue', priority: 'High', status: 'Open', createdAt: 'Oct 15, 2026 14:20' },
    { id: 'TCK-4911', user: 'Kemi Adebayo', subject: 'Unable to update O-Level subjects in profile', category: 'Technical', priority: 'Medium', status: 'Pending', createdAt: 'Oct 15, 2026 11:05' },
    { id: 'TCK-4910', user: 'Ibrahim Musa', subject: 'Parent monitoring email link not received', category: 'Admission Inquiry', priority: 'Low', status: 'Resolved', createdAt: 'Oct 14, 2026 16:45' },
    { id: 'TCK-4909', user: 'Chinelo Eke', subject: 'Payment receipt confirmation for 2026 prep package', category: 'Billing', priority: 'Medium', status: 'Resolved', createdAt: 'Oct 14, 2026 09:30' },
  ]);

  // Moderation Items State
  const [modQueue, setModQueue] = useState<ModerationItem[]>([
    { id: 'MOD-881', reporter: 'User #9012', targetUser: 'User #4421', type: 'Reported Post', contentSnippet: '"Selling leaked 2026 JAMB answers DM fast..."', reason: 'Fraudulent activity / exam malpractices pitch', timestamp: 'Oct 15, 2026 13:40' },
    { id: 'MOD-882', reporter: 'User #1120', targetUser: 'User #9932', type: 'Flagged Comment', contentSnippet: '"Offensive abusive comment on community study thread"', reason: 'Inappropriate language', timestamp: 'Oct 15, 2026 10:15' },
    { id: 'MOD-883', reporter: 'Automated Bot', targetUser: 'User #5512', type: 'Leaderboard Report', contentSnippet: 'Abnormal speed submission: 100 questions answered in 4 seconds', reason: 'Possible script abuse', timestamp: 'Oct 14, 2026 22:10' }
  ]);

  // Activity Timeline (2026)
  const activityLogs = [
    { id: 'log1', action: 'Published 2026 Tertiary Scholarship Guide', admin: 'Super Admin (You)', time: '12 mins ago', date: 'Oct 15, 2026', icon: 'publish', color: 'text-[#0F9D58] bg-[#0F9D58]/10' },
    { id: 'log2', action: 'Added University of Jos 2026 cut-off criteria', admin: 'Content Manager', time: '1 hour ago', date: 'Oct 15, 2026', icon: 'domain', color: 'text-[#2563EB] bg-[#2563EB]/10' },
    { id: 'log3', action: 'Resolved Support Ticket #TCK-4910', admin: 'Support Agent #4', time: '3 hours ago', date: 'Oct 15, 2026', icon: 'check_circle', color: 'text-[#16A34A] bg-[#16A34A]/10' },
    { id: 'log4', action: 'Suspended flagged user account J2026-1142', admin: 'Moderator Team', time: '5 hours ago', date: 'Oct 15, 2026', icon: 'gavel', color: 'text-[#DC2626] bg-[#DC2626]/10' },
    { id: 'log5', action: 'Updated System Security Firewall rules', admin: 'Systems Lead', time: 'Yesterday', date: 'Oct 14, 2026', icon: 'shield', color: 'text-[#0F172A] bg-[#0F172A]/10' }
  ];

  // System Roles Cards
  const roleCards = [
    { title: 'Super Admin', count: 3, desc: 'Unrestricted full access to operations, audit logs, and user roles.', badge: 'Full Access', color: 'bg-emerald-500' },
    { title: 'Content Manager', count: 8, desc: 'Manage courses, universities, past questions, and news articles.', badge: 'Content & Media', color: 'bg-blue-500' },
    { title: 'Support Agent', count: 14, desc: 'Handle student inquiries, ticket resolutions, and user accounts.', badge: 'Ticket Queue', color: 'bg-amber-500' },
    { title: 'Moderator', count: 6, desc: 'Review flagged posts, comments, leaderboard disputes, and rules.', badge: 'Community', color: 'bg-purple-500' },
    { title: 'Analytics Manager', count: 4, desc: 'Access usage reports, cohort graphs, and data export features.', badge: 'Read-only Data', color: 'bg-slate-700' }
  ];

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqList = [
    {
      q: 'How do I manage user accounts and reset credentials?',
      a: 'Navigate to the User Management section, search for the student or parent by ID or email, and use the quick actions menu to view profile, edit status, or trigger a secure password reset link.'
    },
    {
      q: 'How do I publish platform-wide 2026 announcements?',
      a: 'Use the Announcements Centre form to draft your message, select target audiences (Students, Parents, or All), choose publication dates for 2026, and click "Publish Now" or "Schedule".'
    },
    {
      q: 'How do I export system reports and learning analytics?',
      a: 'Visit the Reports & Exports card grid. Select your desired report type (e.g., User Report or Learning Analytics) and click "Download PDF" or "Export CSV" for instant processing.'
    },
    {
      q: 'How are administrator roles assigned and audited?',
      a: 'Role assignments are handled in the Roles & Permissions section. Every administrative action (content edit, account suspension, setting toggle) is automatically recorded in the immutable 2026 Audit Log.'
    },
    {
      q: 'How do I monitor platform uptime and system health?',
      a: 'The System Health section monitors real-time API latency, Database node status, storage capacity, background job queues, and security firewall alerts across all 2026 servers.'
    }
  ];

  // Quick Action Handler
  const handleQuickAction = (actionName: string) => {
    triggerToast(`Quick action triggered: ${actionName} ⚡`);
  };

  // Filtered Users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedUserFilter === 'All' || u.role === selectedUserFilter;
    const matchesStatus = selectedUserStatusFilter === 'All' || u.status === selectedUserStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle User Action
  const handleUserStatusToggle = (userId: string, newStatus: AdminUser['status']) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    triggerToast(`Updated user ${userId} status to ${newStatus}`);
    if (selectedUserModal?.id === userId) {
      setSelectedUserModal(curr => curr ? { ...curr, status: newStatus } : null);
    }
  };

  // Handle Announcement Submit
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim()) {
      triggerToast('Please enter an announcement title');
      return;
    }
    const newAnn = {
      id: `A2026-0${announcementsList.length + 1}`,
      title: annTitle,
      category: annCategory,
      target: annTarget,
      date: annPubDate,
      status: 'Published',
      priority: annPriority
    };
    setAnnouncementsList(prev => [newAnn, ...prev]);
    setAnnTitle('');
    setAnnContent('');
    triggerToast(`Announcement "${annTitle}" published for 2026 cycle! 📢`);
  };

  // Handle Moderation action
  const handleModAction = (id: string, actionName: string) => {
    setModQueue(prev => prev.filter(m => m.id !== id));
    triggerToast(`Moderation item ${id} ${actionName} successfully!`);
  };

  // Handle Ticket action
  const handleTicketStatusChange = (id: string, newStatus: SupportTicket['status']) => {
    setTicketsList(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    triggerToast(`Ticket ${id} status updated to ${newStatus}`);
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-300 font-sans ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      
      {/* Toast Notification floating box */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58]/40 animate-slide-up">
          <span className="material-symbols-outlined text-[#FBBF24]">verified</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 2026 DEMO DISCLAIMER TOP BANNER */}
      <div className="bg-[#0F172A] text-white py-2 px-4 text-center border-b border-white/10 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium text-emerald-400">
            <span className="material-symbols-outlined text-base text-[#FBBF24]">admin_panel_settings</span>
            <span>
              <strong>JAMB Compass 2026 Admin Workspace:</strong> Internal Platform Management Console.
            </span>
          </div>
          <div className="text-slate-300 text-xs hidden lg:block">
            All system data, statistics, and user records are demo metrics for testing operational workflows.
          </div>

          {/* Controls: Dark mode & Demo states */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                triggerToast(isDarkMode ? 'Switched to Light Mode' : 'Switched to Dark Mode');
              }}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 transition-all"
            >
              <span className="material-symbols-outlined text-sm">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* View state toggle */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-lg text-xs">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Demo:</span>
              <button
                onClick={() => setViewState('normal')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${viewState === 'normal' ? 'bg-[#0F9D58] text-white' : 'text-slate-300'}`}
              >
                Normal
              </button>
              <button
                onClick={() => setViewState('loading')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${viewState === 'loading' ? 'bg-[#2563EB] text-white' : 'text-slate-300'}`}
              >
                Loading
              </button>
              <button
                onClick={() => setViewState('offline')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${viewState === 'offline' ? 'bg-[#DC2626] text-white' : 'text-slate-300'}`}
              >
                Offline
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative">

        {/* PERSISTENT LEFT SIDEBAR */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto
          ${isDarkMode ? 'bg-[#0B132B] border-slate-800' : 'bg-white border-slate-200'}
          border-r flex flex-col justify-between p-4 shadow-lg lg:shadow-none
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar pr-1">
            {/* Logo & Brand */}
            <div className="flex items-center justify-between px-2 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58] text-white flex items-center justify-center font-bold shadow-md">
                  <span className="material-symbols-outlined text-2xl">compass_calibration</span>
                </div>
                <div>
                  <h2 className={`font-extrabold font-display text-base leading-tight ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                    JAMB Compass
                  </h2>
                  <span className="text-[10px] font-bold text-[#0F9D58] tracking-wider uppercase">
                    Admin Portal 2026
                  </span>
                </div>
              </div>
              
              {/* Mobile Close Button */}
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Sidebar Navigation Links */}
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
                { id: 'users', label: 'User Management', icon: 'group' },
                { id: 'content', label: 'Content Hub', icon: 'folder' },
                { id: 'announcements', label: 'Announcements', icon: 'campaign' },
                { id: 'support', label: 'Support Queue', icon: 'support_agent', badge: '45' },
                { id: 'moderation', label: 'Community Mod', icon: 'gavel', badge: '3' },
                { id: 'health', label: 'System Health', icon: 'monitoring' },
                { id: 'reports', label: 'Reports & Exports', icon: 'assessment' },
                { id: 'logs', label: 'Activity Logs', icon: 'history' },
                { id: 'roles', label: 'Roles & Access', icon: 'verified_user' },
                { id: 'settings', label: 'System Settings', icon: 'settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminSection(item.id as any);
                    setIsMobileSidebarOpen(false);
                    const el = document.getElementById(`section-${item.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all
                    ${activeAdminSection === item.id 
                      ? 'bg-[#0F9D58] text-white shadow-md' 
                      : isDarkMode 
                        ? 'text-slate-300 hover:bg-slate-800' 
                        : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      activeAdminSection === item.id ? 'bg-white text-[#0F9D58]' : 'bg-[#DC2626] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Admin Profile & Exit Footer */}
          <div className={`pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} space-y-3`}>
            <div className="flex items-center gap-3 px-2">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Admin Profile" 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#0F9D58]"
              />
              <div className="overflow-hidden">
                <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Dr. Adebayo Controls
                </p>
                <p className="text-[10px] text-[#0F9D58] font-semibold">Super Administrator</p>
              </div>
            </div>

            <button 
              onClick={() => {
                if (setActiveTab) setActiveTab('home');
              }}
              className={`w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2`}
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Exit Admin Workspace
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 pb-20 px-4 sm:px-6 lg:px-8 pt-4">

          {/* STICKY TOP NAVIGATION BAR */}
          <header className={`
            sticky top-0 z-20 rounded-2xl border mb-6 px-4 py-3 backdrop-blur-md shadow-sm flex flex-wrap items-center justify-between gap-4
            ${isDarkMode ? 'bg-[#0F172A]/90 border-slate-800 text-white' : 'bg-white/90 border-slate-200 text-[#0F172A]'}
          `}>
            {/* Mobile Toggle & Search */}
            <div className="flex items-center gap-3 flex-1 min-w-[240px]">
              <button 
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>

              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                <input 
                  type="text"
                  placeholder="Global Search (Users, Courses, 2026 Tickets)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-1.5 rounded-xl text-xs font-medium border outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-[#0F9D58]' 
                      : 'bg-slate-50 border-slate-200 text-[#0F172A] focus:border-[#0F9D58]'
                  }`}
                />
              </div>
            </div>

            {/* Quick Actions & Profile Options */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Actions Button */}
              <button 
                onClick={() => handleQuickAction('Create Announcement')}
                className="px-3.5 py-2 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span className="hidden sm:inline">Quick Action</span>
              </button>

              {/* Notifications Icon */}
              <button 
                onClick={() => triggerToast('No new unread system alerts in 2026 queue.')}
                className={`p-2 rounded-xl border relative transition-all ${
                  isDarkMode ? 'border-slate-700 text-slate-200 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC2626]"></span>
              </button>

              {/* Messages Icon */}
              <button 
                onClick={() => triggerToast('Admin direct messenger opening...')}
                className={`p-2 rounded-xl border transition-all ${
                  isDarkMode ? 'border-slate-700 text-slate-200 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </button>

              {/* Admin Avatar Dropdown */}
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                  alt="Admin Avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-[#0F9D58]"
                />
                <span className="text-xs font-bold hidden md:inline">Super Admin</span>
              </div>
            </div>
          </header>

          {/* PAGE HEADER */}
          <section className="mb-8 space-y-2">
            <nav className="flex items-center gap-2 text-xs text-[#475569]">
              <span>Admin</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-semibold text-[#0F9D58] capitalize">{activeAdminSection}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold font-display ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  JAMB Compass Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
                  Monitor platform activity, manage educational content, and oversee operations during the 2026 admission cycle.
                </p>
              </div>

              {/* Placeholder 2026 Date */}
              <div className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-white border-slate-200 text-[#0F9D58]'
              }`}>
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>Thursday, Oct 15, 2026</span>
              </div>
            </div>
          </section>

          {/* LOADING STATE VIEW */}
          {viewState === 'loading' && (
            <div className={`p-12 rounded-3xl border text-center my-10 space-y-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="w-16 h-16 border-4 border-[#0F9D58] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="text-xl font-bold font-display">Syncing 2026 Admin Analytics...</h3>
              <p className="text-sm text-slate-400">Fetching real-time platform metrics, active server loads, and candidate registrations.</p>
            </div>
          )}

          {/* OFFLINE / ERROR STATE VIEW */}
          {viewState === 'offline' && (
            <div className="bg-rose-50 border border-rose-200 p-8 rounded-3xl text-center my-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl">cloud_off</span>
              </div>
              <h3 className="text-xl font-bold font-display text-rose-900">Admin Connection Interrupted</h3>
              <p className="text-sm text-rose-700 max-w-lg mx-auto">
                Unable to contact 2026 JAMB Compass primary data node. Showing local cached administrative data.
              </p>
              <button 
                onClick={() => setViewState('normal')}
                className="px-6 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-all"
              >
                Retry Server Sync
              </button>
            </div>
          )}

          {viewState === 'normal' && (
            <>
              {/* PLATFORM OVERVIEW (KPI CARDS) */}
              <section id="section-overview" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-10">
                {[
                  { title: 'Total Registered', value: '124,850', sub: '↑ +4.2% (2026)', icon: 'group', color: 'text-[#0F9D58]' },
                  { title: 'Active Today', value: '42,310', sub: 'Peak 14:00 GMT', icon: 'bolt', color: 'text-[#2563EB]' },
                  { title: 'New Reg. Today', value: '+1,420', sub: 'Verified Candidates', icon: 'person_add', color: 'text-[#16A34A]' },
                  { title: 'Study Sessions', value: '85,600', sub: 'Avg 42m duration', icon: 'auto_stories', color: 'text-[#F59E0B]' },
                  { title: 'Mock Exams Done', value: '12,450', sub: '92% completion', icon: 'assignment_turned_in', color: 'text-[#9333EA]' },
                  { title: 'Open Tickets', value: '45', sub: '12 Urgent Priority', icon: 'support_agent', color: 'text-[#DC2626]' },
                  { title: 'Published Items', value: '342', sub: 'Courses & News', icon: 'article', color: 'text-[#0891B2]' },
                  { title: 'System Health', value: '99.98%', sub: 'Operational (2026)', icon: 'verified', color: 'text-[#0F9D58]' },
                ].map((kpi, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase text-slate-400 truncate">{kpi.title}</span>
                      <span className={`material-symbols-outlined text-base ${kpi.color}`}>{kpi.icon}</span>
                    </div>
                    <span className={`text-xl font-extrabold font-display block ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                      {kpi.value}
                    </span>
                    <span className={`text-[10px] font-bold block mt-1 ${kpi.color}`}>{kpi.sub}</span>
                  </div>
                ))}
              </section>

              {/* REAL-TIME ANALYTICS SECTION */}
              <section className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                      Real-Time Platform Engagement (2026)
                    </h3>
                    <p className="text-xs text-slate-400">Daily Active Candidates, Study Hours, and Mock Exam Completion Rates</p>
                  </div>

                  {/* Period Switcher Buttons */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                    {(['7D', '30D', '90D', '1Y'] as const).map(pd => (
                      <button
                        key={pd}
                        onClick={() => {
                          setAnalyticsPeriod(pd);
                          triggerToast(`Switched analytics view to ${pd} range`);
                        }}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          analyticsPeriod === pd ? 'bg-[#0F9D58] text-white shadow' : 'hover:bg-slate-200'
                        }`}
                      >
                        {pd}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Visual Chart Bars */}
                <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-200 pb-4">
                  {[
                    { day: 'Week 1', users: 65, hours: 80, label: '32,400 Users / 48,000 hrs' },
                    { day: 'Week 2', users: 78, hours: 85, label: '38,900 Users / 52,000 hrs' },
                    { day: 'Week 3', users: 72, hours: 75, label: '36,000 Users / 44,000 hrs' },
                    { day: 'Week 4', users: 90, hours: 95, label: '45,000 Users / 62,000 hrs' },
                    { day: 'Week 5', users: 84, hours: 88, label: '42,000 Users / 56,000 hrs' },
                    { day: 'Week 6', users: 95, hours: 98, label: '48,500 Users / 68,000 hrs' },
                    { day: 'Week 7', users: 88, hours: 90, label: '44,200 Users / 59,000 hrs' },
                    { day: 'Current', users: 98, hours: 100, label: '49,800 Users / 72,000 hrs' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative">
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] px-2.5 py-1 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-md">
                        {item.day}: {item.label}
                      </div>
                      <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-full">
                        <div className="w-1/2 bg-[#0F9D58] rounded-t-lg transition-all group-hover:bg-[#16A34A]" style={{ height: `${item.users}%` }}></div>
                        <div className="w-1/2 bg-[#2563EB] rounded-t-lg transition-all group-hover:bg-blue-600" style={{ height: `${item.hours}%` }}></div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">{item.day}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">User Retention Rate</span>
                    <strong className="text-base text-[#0F9D58]">88.4% (Monthly)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">Avg Daily Session</span>
                    <strong className="text-base text-[#2563EB]">48.2 Minutes</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">CBT Drill Completion</span>
                    <strong className="text-base text-[#F59E0B]">94.1% Accuracy</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold uppercase text-[10px]">2026 Target Score</span>
                    <strong className="text-base text-purple-600">315 JAMB Average</strong>
                  </div>
                </div>
              </section>

              {/* USER MANAGEMENT TABLE */}
              <section id="section-users" className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className={`text-xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                      User Management Workspace
                    </h2>
                    <p className="text-xs text-slate-400">View, search, filter, and moderate registered candidates, parents, and instructors.</p>
                  </div>

                  {/* Filters & Export Button */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Role Filter */}
                    <select
                      value={selectedUserFilter}
                      onChange={(e) => setSelectedUserFilter(e.target.value as any)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-slate-50 text-[#0F172A] border-slate-200"
                    >
                      <option value="All">All Roles</option>
                      <option value="Candidate">Candidates</option>
                      <option value="Parent">Parents</option>
                      <option value="Instructor">Instructors</option>
                    </select>

                    {/* Status Filter */}
                    <select
                      value={selectedUserStatusFilter}
                      onChange={(e) => setSelectedUserStatusFilter(e.target.value as any)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold border bg-slate-50 text-[#0F172A] border-slate-200"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Verified">Verified</option>
                    </select>

                    <button 
                      onClick={() => triggerToast('Exported filtered user table to CSV (Demo 2026 file)')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold border border-slate-200 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      Export CSV
                    </button>
                  </div>
                </div>

                {/* Table Component */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className={`border-b ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                      <tr>
                        <th className="p-3.5 font-bold uppercase">User Info</th>
                        <th className="p-3.5 font-bold uppercase">Role</th>
                        <th className="p-3.5 font-bold uppercase">Status</th>
                        <th className="p-3.5 font-bold uppercase">Reg Date (2026)</th>
                        <th className="p-3.5 font-bold uppercase">Last Active</th>
                        <th className="p-3.5 font-bold uppercase">Learning Progress</th>
                        <th className="p-3.5 font-bold uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className={`hover:bg-slate-50/50 transition-colors ${isDarkMode ? 'hover:bg-slate-700/50' : ''}`}>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold text-xs">
                                {u.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <strong className="block text-[#0F172A] dark:text-white font-bold">{u.name}</strong>
                                <span className="text-[10px] text-slate-400">{u.email} • ID: {u.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 font-semibold text-slate-600 dark:text-slate-300">
                            {u.role}
                          </td>

                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                              u.status === 'Active' ? 'bg-[#0F9D58]/10 text-[#0F9D58]' :
                              u.status === 'Verified' ? 'bg-[#2563EB]/10 text-[#2563EB]' :
                              u.status === 'Pending' ? 'bg-[#F59E0B]/10 text-[#B45309]' :
                              'bg-rose-100 text-rose-700'
                            }`}>
                              {u.status}
                            </span>
                          </td>

                          <td className="p-3.5 text-slate-500 font-medium">
                            {u.regDate}
                          </td>

                          <td className="p-3.5 text-slate-500 font-medium">
                            {u.lastActive}
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#0F9D58] h-full" style={{ width: `${u.progress}%` }}></div>
                              </div>
                              <span className="font-bold text-[11px]">{u.progress}%</span>
                            </div>
                          </td>

                          <td className="p-3.5 text-right space-x-1">
                            <button
                              onClick={() => setSelectedUserModal(u)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-lg text-[11px] font-bold transition-all"
                            >
                              View
                            </button>
                            {u.status !== 'Suspended' ? (
                              <button
                                onClick={() => handleUserStatusToggle(u.id, 'Suspended')}
                                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[11px] font-bold transition-all"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUserStatusToggle(u.id, 'Active')}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#0F9D58] rounded-lg text-[11px] font-bold transition-all"
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* CONTENT MANAGEMENT CARDS */}
              <section id="section-content" className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className={`text-xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                      Educational Content Hub
                    </h2>
                    <p className="text-xs text-slate-400">Oversee courses, university cut-offs, scholarship deadlines, and syllabus updates.</p>
                  </div>
                  <button 
                    onClick={() => handleQuickAction('Create Content')}
                    className="px-4 py-2 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Item
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {contentItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-5 rounded-3xl border shadow-sm hover:shadow-md transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`w-10 h-10 rounded-2xl ${item.color} text-white flex items-center justify-center font-bold shadow-sm`}>
                          <span className="material-symbols-outlined text-xl">{item.icon}</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase text-slate-400">2026 Content</span>
                      </div>

                      <h3 className={`font-bold text-base mb-3 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>{item.title}</h3>

                      <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Published:</span>
                          <strong className="text-[#0F9D58]">{item.published}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Drafts:</span>
                          <strong className="text-amber-600">{item.draft}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Scheduled:</span>
                          <strong className="text-blue-600">{item.scheduled}</strong>
                        </div>
                      </div>

                      <button 
                        onClick={() => triggerToast(`Managing ${item.title} directory...`)}
                        className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold transition-all text-center"
                      >
                        Manage {item.title}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* ANNOUNCEMENTS CENTRE */}
              <section id="section-announcements" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                {/* Announcement Creator Form */}
                <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                    Publish 2026 Announcement
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">Broadcast official JAMB updates, scholarship alerts, or system maintenance notices.</p>

                  <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 2026 Full-Length Mock Simulation #5 Live"
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium ${
                          isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-[#0F172A]'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                        <select 
                          value={annCategory}
                          onChange={(e) => setAnnCategory(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl text-xs border bg-slate-50 text-[#0F172A] border-slate-200"
                        >
                          <option value="General">General</option>
                          <option value="Exam Alert">Exam Alert</option>
                          <option value="Scholarship">Scholarship</option>
                          <option value="System Maintenance">Maintenance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Target Audience</label>
                        <select 
                          value={annTarget}
                          onChange={(e) => setAnnTarget(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl text-xs border bg-slate-50 text-[#0F172A] border-slate-200"
                        >
                          <option value="All Users">All Users</option>
                          <option value="Students">Candidates Only</option>
                          <option value="Parents">Guardians Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Priority</label>
                        <select 
                          value={annPriority}
                          onChange={(e) => setAnnPriority(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl text-xs border bg-slate-50 text-[#0F172A] border-slate-200"
                        >
                          <option value="Normal">Normal</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Announcement Body</label>
                      <textarea 
                        rows={3}
                        placeholder="Write clear instructions for candidates..."
                        value={annContent}
                        onChange={(e) => setAnnContent(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium ${
                          isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-[#0F172A]'
                        }`}
                      ></textarea>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button 
                        type="submit"
                        className="px-5 py-2.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">send</span>
                        Publish Announcement
                      </button>

                      <button 
                        type="button"
                        onClick={() => setShowAnnPreviewModal(true)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-xl text-xs font-bold border border-slate-200 transition-all"
                      >
                        Preview Draft
                      </button>
                    </div>
                  </form>
                </div>

                {/* Active Announcements Feed */}
                <div className={`lg:col-span-5 p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h3 className={`text-lg font-bold font-display mb-4 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                    Active Announcements (2026)
                  </h3>

                  <div className="space-y-3">
                    {announcementsList.map((ann) => (
                      <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#0F9D58]/10 text-[#0F9D58]">
                            {ann.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">{ann.date}</span>
                        </div>
                        <h4 className="font-bold text-xs text-[#0F172A]">{ann.title}</h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                          <span>Target: <strong>{ann.target}</strong></span>
                          <span className="text-emerald-600 font-bold">● {ann.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SUPPORT DASHBOARD & COMMUNITY MODERATION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                {/* Support Queue */}
                <div id="section-support" className={`lg:col-span-7 p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                        Support Desk Queue
                      </h2>
                      <p className="text-xs text-slate-400">Avg Response Time: <strong>14 Mins</strong> • CSAT: <strong>4.9/5.0</strong></p>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-100 text-rose-700">
                      45 Open Tickets
                    </span>
                  </div>

                  <div className="space-y-3">
                    {ticketsList.map((t) => (
                      <div key={t.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-xs text-[#0F172A]">{t.id}</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-700">{t.category}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${t.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'}`}>{t.priority}</span>
                          </div>
                          <p className="font-semibold text-xs text-[#0F172A]">{t.subject}</p>
                          <span className="text-[10px] text-slate-400">From: {t.user} • {t.createdAt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTicketStatusChange(t.id, 'Resolved')}
                            className="px-3 py-1.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold transition-all"
                          >
                            Resolve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Moderation Queue */}
                <div id="section-moderation" className={`lg:col-span-5 p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                    Community Moderation
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">Review reported posts, comments, and leaderboard integrity flags.</p>

                  <div className="space-y-3">
                    {modQueue.map((m) => (
                      <div key={m.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-rose-600">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">flag</span>
                            {m.type}
                          </span>
                          <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                        </div>
                        <p className="text-xs italic text-slate-700 font-medium">{m.contentSnippet}</p>
                        <p className="text-[10px] text-slate-400">Reason: <strong>{m.reason}</strong></p>
                        <div className="flex items-center gap-2 pt-1">
                          <button 
                            onClick={() => handleModAction(m.id, 'Approved')}
                            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-[#0F172A] rounded-lg text-[11px] font-bold transition-all"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleModAction(m.id, 'Removed')}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold transition-all"
                          >
                            Remove Post
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SYSTEM HEALTH CARDS */}
              <section id="section-health" className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  System Health &amp; Infrastructure (2026 Node)
                </h2>
                <p className="text-xs text-slate-400 mb-6">Real-time telemetry, server loads, API response speeds, and security status.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: 'API Gateway', status: 'Operational', latency: '24ms', load: '18% Load', color: 'text-[#0F9D58] bg-[#0F9D58]/10' },
                    { title: 'Primary Database', status: 'Healthy', latency: '8ms', load: '32% Storage', color: 'text-[#2563EB] bg-[#2563EB]/10' },
                    { title: 'CBT Exam Engine', status: 'Operational', latency: '12ms', load: '45% Concurrency', color: 'text-[#16A34A] bg-[#16A34A]/10' },
                    { title: 'Security Firewall', status: 'Protected', latency: '0 Vulnerabilities', load: 'WAF Active 2026', color: 'text-purple-600 bg-purple-100' },
                  ].map((sys, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0F172A]">{sys.title}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${sys.color}`}>
                          {sys.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        <div>Latency: <strong>{sys.latency}</strong></div>
                        <div>Capacity: <strong>{sys.load}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* REPORTS & EXPORTS */}
              <section id="section-reports" className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Reports &amp; Data Exports (2026)
                </h2>
                <p className="text-xs text-slate-400 mb-6">Generate official summary reports and download dataset snapshots.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'User Registration Audit 2026', type: 'Candidate Growth & Demographics', icon: 'group' },
                    { title: 'Learning & Practice Analytics', type: 'CBT Subject Mastery & Scores', icon: 'analytics' },
                    { title: '2026 Scholarship Distribution', type: 'Applications & Awardee Logs', icon: 'payments' },
                    { title: 'Support Desk Resolution Log', type: 'Ticket SLA & CSAT Ratings', icon: 'support_agent' },
                    { title: 'System Security Audit', type: 'Access Logs & Firewall Events', icon: 'security' },
                    { title: 'University Cut-off Trends 2026', type: 'JAMB CAPS Admission Predictor', icon: 'account_balance' },
                  ].map((rep, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                          <span className="material-symbols-outlined">{rep.icon}</span>
                        </span>
                        <div>
                          <h4 className="font-bold text-xs text-[#0F172A]">{rep.title}</h4>
                          <span className="text-[10px] text-slate-400">{rep.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                        <button 
                          onClick={() => triggerToast(`Downloaded "${rep.title}" as PDF (2026 Demo)`)}
                          className="flex-1 py-1.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-[11px] font-bold transition-all text-center"
                        >
                          Download PDF
                        </button>
                        <button 
                          onClick={() => triggerToast(`Exported "${rep.title}" as CSV (2026 Demo)`)}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0F172A] rounded-xl text-[11px] font-bold transition-all"
                        >
                          CSV
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ACTIVITY LOG TIMELINE */}
              <section id="section-logs" className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Administrative Activity Log (2026)
                </h2>
                <p className="text-xs text-slate-400 mb-6">Immutable record of changes made by administrators during the 2026 cycle.</p>

                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center ${log.color}`}>
                        <span className="material-symbols-outlined text-base">{log.icon}</span>
                      </span>
                      <div className="flex-1">
                        <p className="font-bold text-xs text-[#0F172A]">{log.action}</p>
                        <span className="text-[10px] text-slate-400">By: <strong>{log.admin}</strong> • {log.date} ({log.time})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ROLE & PERMISSIONS CARDS */}
              <section id="section-roles" className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Role &amp; Permissions Matrix
                </h2>
                <p className="text-xs text-slate-400 mb-6">Manage administrative tiers, privileges, and team access.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {roleCards.map((rc, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#0F172A]">{rc.title}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-200 text-slate-800">{rc.count} Users</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{rc.desc}</p>
                      <button 
                        onClick={() => triggerToast(`Editing permissions for ${rc.title}...`)}
                        className="w-full mt-2 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0F172A] rounded-xl text-[11px] font-bold transition-all"
                      >
                        Manage Privileges
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* QUICK ACTIONS FLOATING PANEL */}
              <section className="bg-gradient-to-r from-[#0F9D58] to-[#0F172A] text-white p-6 rounded-3xl shadow-xl mb-10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">Quick Administration Actions</h3>
                    <p className="text-xs text-slate-200">Shortcuts to common daily tasks for the 2026 admission cycle.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {[
                    'Create Announcement',
                    'Add Scholarship 2026',
                    'Add University Cut-off',
                    'Create Practice Drill',
                    'Export User Data',
                    'Open Support Queue'
                  ].map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(act)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 backdrop-blur-md transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">flash_on</span>
                      {act}
                    </button>
                  ))}
                </div>
              </section>

              {/* SYSTEM SETTINGS PREVIEW */}
              <section id="section-settings" className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  System Settings Overview
                </h2>
                <p className="text-xs text-slate-400 mb-6">Configure platform parameters, security policies, and notification triggers.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: 'General Settings', desc: 'Site branding, 2026 session year, and contact emails.', icon: 'tune' },
                    { title: 'Email Templates', desc: 'Welcome emails, password resets, and monthly reports.', icon: 'mail_lock' },
                    { title: 'Security & Auth', desc: '2FA rules, session timeouts, and IP whitelisting.', icon: 'security' },
                    { title: 'Integrations (Demo)', desc: 'JAMB Portal sync, SMS gateway, and payment processors.', icon: 'extension' },
                  ].map((set, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0F9D58]">{set.icon}</span>
                        <h4 className="font-bold text-xs text-[#0F172A]">{set.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500">{set.desc}</p>
                      <button 
                        onClick={() => triggerToast(`Opened ${set.title} settings modal`)}
                        className="w-full mt-2 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0F172A] rounded-xl text-[11px] font-bold transition-all"
                      >
                        Configure
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ SECTION ACCORDION */}
              <section className={`p-6 rounded-3xl border shadow-sm mb-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h2 className={`text-xl font-bold font-display mb-1 ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  Administrator FAQ &amp; Guidelines
                </h2>
                <p className="text-xs text-slate-400 mb-6">Frequently asked questions regarding 2026 JAMB Compass administration.</p>

                <div className="space-y-3">
                  {faqList.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs text-[#0F172A] flex items-center justify-between"
                      >
                        <span>{faq.q}</span>
                        <span className="material-symbols-outlined text-slate-400">
                          {openFaqIndex === idx ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </span>
                      </button>

                      {openFaqIndex === idx && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* CALL TO ACTION BANNER */}
              <section className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F9D58] text-white p-8 md:p-10 rounded-3xl shadow-xl mb-12 relative overflow-hidden">
                <div className="max-w-3xl space-y-3 relative z-10">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    2026 Admission Cycle Operational
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    Manage the Platform with Confidence
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Monitor users, publish educational resources, and oversee every aspect of the JAMB Compass platform throughout the 2026 admission cycle.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-3">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('section-reports');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow transition-all"
                    >
                      View Reports
                    </button>

                    <button 
                      onClick={() => {
                        const el = document.getElementById('section-settings');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all"
                    >
                      Open System Settings
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* MINIMAL FOOTER */}
          <footer className={`pt-6 border-t text-xs text-center space-y-2 ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
            <div className="flex justify-center items-center gap-4">
              <span>JAMB Compass Admin <strong>v1.0 (Demo 2026)</strong></span>
              <span>•</span>
              <button onClick={() => triggerToast('Privacy Policy (2026 Admin Spec)')} className="hover:underline">Privacy</button>
              <span>•</span>
              <button onClick={() => triggerToast('Terms of Service (2026 Admin Spec)')} className="hover:underline">Terms</button>
              <span>•</span>
              <button onClick={() => triggerToast('All systems 100% operational')} className="text-[#0F9D58] font-bold">System Status</button>
            </div>
            <p className="text-[11px] text-slate-400">
              Internal Administration Console • 2026 JAMB Admission Cycle Platform Operations
            </p>
          </footer>
        </main>
      </div>

      {/* USER DETAIL MODAL */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#0F172A]">User Details: {selectedUserModal.name}</h3>
              <button 
                onClick={() => setSelectedUserModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-bold">User ID:</span>
                <span className="font-bold text-[#0F172A]">{selectedUserModal.id}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-bold">Email:</span>
                <span className="font-semibold text-[#0F172A]">{selectedUserModal.email}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-bold">Role:</span>
                <span className="font-bold text-[#0F9D58]">{selectedUserModal.role}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-bold">Registration Date:</span>
                <span className="font-semibold text-[#0F172A]">{selectedUserModal.regDate}</span>
              </div>

              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-bold">2026 Learning Progress:</span>
                <span className="font-extrabold text-[#2563EB]">{selectedUserModal.progress}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button 
                onClick={() => {
                  triggerToast(`Triggered password reset link for ${selectedUserModal.email}`);
                  setSelectedUserModal(null);
                }}
                className="flex-1 py-2 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A] transition-all"
              >
                Reset Password
              </button>

              <button 
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2 bg-slate-100 text-[#0F172A] rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANNOUNCEMENT PREVIEW MODAL */}
      {showAnnPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58]">
                Preview: {annCategory} (2026)
              </span>
              <button 
                onClick={() => setShowAnnPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#0F172A]">{annTitle || 'Untitled Announcement'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {annContent || 'No message body provided.'}
              </p>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Audience: <strong>{annTarget}</strong></span>
                <span>Priority: <strong>{annPriority}</strong></span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setShowAnnPreviewModal(false)}
                className="px-5 py-2 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A] transition-all"
              >
                Done Previewing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
