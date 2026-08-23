import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface NotificationsScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface NotificationItem {
  id: string;
  category: 'Study' | 'Admissions' | 'Scholarships' | 'Mock Exams' | 'CBT Practice' | 'Universities' | 'News' | 'System';
  title: string;
  description: string;
  timestamp: string; // 2026 date text
  rawDate: string; // YYYY-MM-DD
  timeGroup: 'Today' | 'This Week' | 'Earlier in 2026';
  priority: 'High' | 'Medium' | 'Low';
  unread: boolean;
  bookmarked: boolean;
  icon: string;
  detailedNotes?: string;
  actionLabel?: string;
  actionTab?: TabType;
}

export interface SmartReminderItem {
  id: string;
  title: string;
  category: string;
  date: string; // 2026
  time: string;
  progress: number; // 0 to 100
  completed: boolean;
  pinned: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ setActiveTab }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'Priority'>('Newest');

  // Expanded card state
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Create Custom Reminder Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newReminderForm, setNewReminderForm] = useState({
    title: '',
    category: 'Study' as NotificationItem['category'],
    date: '2026-10-15',
    time: '09:00 AM',
    priority: 'High' as 'High' | 'Medium' | 'Low',
    description: '',
  });

  // Notifications Main Data
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      category: 'Study',
      title: 'Mathematics Revision Session Alert',
      description: 'Your Mathematics revision session on Quadratic Equations & Calculus begins in 30 minutes.',
      timestamp: 'Today, Oct 12, 2026 • 08:30 AM',
      rawDate: '2026-10-12',
      timeGroup: 'Today',
      priority: 'High',
      unread: true,
      bookmarked: true,
      icon: 'auto_stories',
      detailedNotes: 'Recommended topics: Quadratic factorization, logarithmic formulas, and 2024-2025 past questions.',
      actionLabel: 'Open Study Planner',
      actionTab: 'study-planner',
    },
    {
      id: 'notif-2',
      category: 'Admissions',
      title: 'University Preference Verification Alert',
      description: 'Review your preferred universities before the next 2026 JAMB admission screening milestone.',
      timestamp: 'Today, Oct 12, 2026 • 07:15 AM',
      rawDate: '2026-10-12',
      timeGroup: 'Today',
      priority: 'High',
      unread: true,
      bookmarked: false,
      icon: 'school',
      detailedNotes: 'Ensure your O Level combination matches the 2026 university guidelines for UNILAG, UI, and OAU.',
      actionLabel: 'Check Admission Requirements',
      actionTab: 'admission',
    },
    {
      id: 'notif-3',
      category: 'Scholarships',
      title: 'New Federal Scholarship Opportunity (2026)',
      description: 'New national undergraduate scholarship information has been published in the Scholarships Hub.',
      timestamp: 'Today, Oct 12, 2026 • 06:00 AM',
      rawDate: '2026-10-12',
      timeGroup: 'Today',
      priority: 'Medium',
      unread: true,
      bookmarked: true,
      icon: 'payments',
      detailedNotes: 'Eligibility: Candidates with 200+ target score in 2026 UTME. Covers full tuition and book grants.',
      actionLabel: 'View Scholarships',
      actionTab: 'scholarships',
    },
    {
      id: 'notif-4',
      category: 'Mock Exams',
      title: 'Demo CBT National Mock Schedule',
      description: 'Your scheduled demo mock exam in Physics & Chemistry is set for tomorrow morning.',
      timestamp: 'Yesterday, Oct 11, 2026 • 04:45 PM',
      rawDate: '2026-10-11',
      timeGroup: 'Today',
      priority: 'High',
      unread: true,
      bookmarked: false,
      icon: 'computer',
      detailedNotes: 'Simulation duration: 120 minutes, 180 questions with full timed analysis.',
      actionLabel: 'Launch Mock Exam',
      actionTab: 'mock-exam',
    },
    {
      id: 'notif-5',
      category: 'CBT Practice',
      title: 'Daily English CBT Practice Reminder',
      description: 'Complete today\'s Use of English & Concord exercise to maintain your 7-day study streak.',
      timestamp: 'Oct 10, 2026 • 02:20 PM',
      rawDate: '2026-10-10',
      timeGroup: 'This Week',
      priority: 'Medium',
      unread: false,
      bookmarked: false,
      icon: 'edit_note',
      detailedNotes: 'Focus area: Antonyms, Synonyms, Sentence Completion, and Comprehension Passages.',
      actionLabel: 'Start Practice',
      actionTab: 'cbt-practice',
    },
    {
      id: 'notif-6',
      category: 'News',
      title: '2026 JAMB Registration & Syllabus Guidelines Update',
      description: 'New official learning resources and updated syllabus outlines are now available in the Study Hub.',
      timestamp: 'Oct 09, 2026 • 11:10 AM',
      rawDate: '2026-10-09',
      timeGroup: 'This Week',
      priority: 'Medium',
      unread: false,
      bookmarked: true,
      icon: 'campaign',
      detailedNotes: 'Includes official novel breakdown and chapter summaries for 2026 English literature candidates.',
      actionLabel: 'Explore Syllabus',
      actionTab: 'syllabus',
    },
    {
      id: 'notif-7',
      category: 'System',
      title: 'Weekly Learning & CBT Analytics Report Ready',
      description: 'Your weekly performance report for Oct 1 - Oct 7, 2026 has been generated with 82% accuracy.',
      timestamp: 'Oct 08, 2026 • 09:00 AM',
      rawDate: '2026-10-08',
      timeGroup: 'This Week',
      priority: 'Low',
      unread: false,
      bookmarked: false,
      icon: 'bar_chart',
      detailedNotes: 'Great job! You spent 18.5 hours studying and completed 4 mock drills this week.',
      actionLabel: 'View Dashboard Analytics',
      actionTab: 'dashboard',
    },
    {
      id: 'notif-8',
      category: 'Universities',
      title: 'University Cut-Off Marks Directory Updated (2026)',
      description: 'Updated 2026 departmental cut-off estimates added for Federal & State Universities.',
      timestamp: 'Sep 28, 2026 • 10:30 AM',
      rawDate: '2026-09-28',
      timeGroup: 'Earlier in 2026',
      priority: 'Medium',
      unread: false,
      bookmarked: true,
      icon: 'account_balance',
      detailedNotes: 'Compare Medicine, Law, Computer Science, and Engineering thresholds across top institutions.',
      actionLabel: 'View Universities',
      actionTab: 'universities',
    },
    {
      id: 'notif-9',
      category: 'Study',
      title: 'Biology Plant Physiology Reading Milestone',
      description: 'You completed 80% of your scheduled Biology reading target for Q3 2026.',
      timestamp: 'Sep 20, 2026 • 05:00 PM',
      rawDate: '2026-09-20',
      timeGroup: 'Earlier in 2026',
      priority: 'Low',
      unread: false,
      bookmarked: false,
      icon: 'biotech',
      detailedNotes: 'Topics finished: Photosynthesis, Respiration, Transpiration, and Plant Hormones.',
      actionLabel: 'Review Study Hub',
      actionTab: 'study-hub',
    },
  ]);

  // Smart Reminders List State
  const [smartReminders, setSmartReminders] = useState<SmartReminderItem[]>([
    { id: 'sr-1', title: 'Upcoming Mathematics Revision', category: 'Study', date: 'Oct 12, 2026', time: '04:00 PM', progress: 75, completed: false, pinned: true, priority: 'High' },
    { id: 'sr-2', title: 'Weekly Physics Syllabus Goal', category: 'Revision', date: 'Oct 14, 2026', time: '06:30 PM', progress: 50, completed: false, pinned: false, priority: 'Medium' },
    { id: 'sr-3', title: 'Full CBT Mock Exam Preparation', category: 'Mock Exam', date: 'Oct 16, 2026', time: '09:00 AM', progress: 30, completed: false, pinned: true, priority: 'High' },
    { id: 'sr-4', title: 'Scholarship Application Checklist', category: 'Scholarship', date: 'Oct 20, 2026', time: '12:00 PM', progress: 90, completed: true, pinned: false, priority: 'High' },
    { id: 'sr-5', title: 'Saved University Requirements Review', category: 'Admissions', date: 'Oct 22, 2026', time: '02:00 PM', progress: 20, completed: false, pinned: true, priority: 'Medium' },
    { id: 'sr-6', title: 'Daily English Comprehension Goal', category: 'Reading', date: 'Oct 12, 2026', time: '08:00 PM', progress: 60, completed: false, pinned: false, priority: 'Low' },
  ]);

  // Preferences Toggles State
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    studyReminders: true,
    scholarshipAlerts: true,
    admissionUpdates: true,
    newsAlerts: false,
    cbtReminders: true,
    mockExamAlerts: true,
    achievementNotifications: true,
    weeklyProgressReports: true,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => {
      const nextVal = !prev[key];
      showToast(`Preference updated: ${String(key)} is now ${nextVal ? 'Enabled' : 'Disabled'}`);
      return { ...prev, [key]: nextVal };
    });
  };

  // Notification Actions
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  const handleClearRead = () => {
    setNotifications((prev) => prev.filter((n) => n.unread));
    showToast('Read notifications cleared.');
  };

  const handleToggleUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const next = !n.unread;
          showToast(next ? 'Marked as unread.' : 'Marked as read.');
          return { ...n, unread: next };
        }
        return n;
      })
    );
  };

  const handleToggleBookmark = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const next = !n.bookmarked;
          showToast(next ? 'Saved to bookmarks!' : 'Removed from bookmarks.');
          return { ...n, bookmarked: next };
        }
        return n;
      })
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification removed.');
  };

  const handleShareNotification = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`JAMB Compass 2026 Alert: ${title}`);
    }
    showToast('Notification link copied to clipboard!');
  };

  // Create custom reminder submit
  const handleCreateReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderForm.title.trim()) {
      showToast('⚠️ Please enter a title for your reminder.');
      return;
    }

    const createdNotif: NotificationItem = {
      id: `custom-${Date.now()}`,
      category: newReminderForm.category,
      title: newReminderForm.title,
      description: newReminderForm.description || `Custom reminder for ${newReminderForm.date} at ${newReminderForm.time}`,
      timestamp: `Scheduled: ${newReminderForm.date} • ${newReminderForm.time}`,
      rawDate: newReminderForm.date,
      timeGroup: 'Today',
      priority: newReminderForm.priority,
      unread: true,
      bookmarked: false,
      icon: 'alarm',
      detailedNotes: newReminderForm.description || 'Personal custom reminder created by student for 2026 target.',
      actionLabel: 'Open Study Planner',
      actionTab: 'study-planner',
    };

    const createdSmartReminder: SmartReminderItem = {
      id: `sr-custom-${Date.now()}`,
      title: newReminderForm.title,
      category: newReminderForm.category,
      date: newReminderForm.date,
      time: newReminderForm.time,
      progress: 0,
      completed: false,
      pinned: true,
      priority: newReminderForm.priority,
    };

    setNotifications((prev) => [createdNotif, ...prev]);
    setSmartReminders((prev) => [createdSmartReminder, ...prev]);
    setIsCreateModalOpen(false);
    setNewReminderForm({
      title: '',
      category: 'Study',
      date: '2026-10-15',
      time: '09:00 AM',
      priority: 'High',
      description: '',
    });
    showToast(`✨ Reminder "${createdNotif.title}" created successfully for 2026!`);
  };

  // Smart reminder toggles
  const toggleReminderComplete = (id: string) => {
    setSmartReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = !r.completed;
          showToast(next ? `Completed "${r.title}"!` : `Marked "${r.title}" as pending.`);
          return { ...r, completed: next, progress: next ? 100 : 50 };
        }
        return r;
      })
    );
  };

  const toggleReminderPin = (id: string) => {
    setSmartReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = !r.pinned;
          showToast(next ? 'Reminder pinned to top.' : 'Reminder unpinned.');
          return { ...r, pinned: next };
        }
        return r;
      })
    );
  };

  const snoozeReminder = (title: string) => {
    showToast(`⏰ "${title}" snoozed for 30 minutes.`);
  };

  // Filter & Sort Logic
  const filteredNotifications = useMemo(() => {
    return notifications
      .filter((n) => {
        // Search Filter
        const matchesSearch =
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.category.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filter
        let matchesCat = true;
        if (categoryFilter === 'Unread') matchesCat = n.unread;
        else if (categoryFilter !== 'All') matchesCat = n.category === categoryFilter;

        // Priority Filter
        let matchesPriority = true;
        if (priorityFilter !== 'All') matchesPriority = n.priority === priorityFilter;

        return matchesSearch && matchesCat && matchesPriority;
      })
      .sort((a, b) => {
        if (sortBy === 'Newest') return b.rawDate.localeCompare(a.rawDate);
        if (sortBy === 'Oldest') return a.rawDate.localeCompare(b.rawDate);
        if (sortBy === 'Priority') {
          const pMap = { High: 3, Medium: 2, Low: 1 };
          return pMap[b.priority] - pMap[a.priority];
        }
        return 0;
      });
  }, [notifications, searchQuery, categoryFilter, priorityFilter, sortBy]);

  // Grouped Notifications by Time Group
  const todayGroup = filteredNotifications.filter((n) => n.timeGroup === 'Today');
  const thisWeekGroup = filteredNotifications.filter((n) => n.timeGroup === 'This Week');
  const earlierGroup = filteredNotifications.filter((n) => n.timeGroup === 'Earlier in 2026');

  // KPI Calculations
  const unreadCount = notifications.filter((n) => n.unread).length;
  const todayRemindersCount = notifications.filter((n) => n.timeGroup === 'Today').length;
  const upcomingDeadlinesCount = notifications.filter((n) => n.priority === 'High').length;
  const completedRemindersCount = smartReminders.filter((r) => r.completed).length + 44; // demo base
  const savedAlertsCount = notifications.filter((n) => n.bookmarked).length;

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do JAMB Compass reminders work?',
      a: 'JAMB Compass automatically calculates key dates in the 2026 UTME admission calendar, such as CBT practice milestones, scholarship deadlines, and study session slots, displaying them in your personal notification feed.',
    },
    {
      q: 'Can I customize my notification channels and categories?',
      a: 'Yes! Scroll down to the Notification Preferences section to independently toggle Email, Push, and In-App notifications for study goals, CBT alerts, and admission updates.',
    },
    {
      q: 'How do I mute or clear specific notifications?',
      a: 'Click on the delete icon on any notification card to remove it, or use the "Clear Read Notifications" action button at the top of the feed.',
    },
    {
      q: 'Can I create my own personalized study reminders?',
      a: 'Absolutely! Click the "+ Create Reminder" button in the hero section or quick actions bar to set custom dates, times, and priority levels for any 2026 study topic.',
    },
    {
      q: 'Does this platform send official JAMB notifications directly?',
      a: 'JAMB Compass provides educational guidance, demo alerts, and personal study scheduling tools for candidate preparation. Official registration, CAPS status, and admissions must always be verified on the official JAMB portal (jamb.gov.ng).',
    },
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'} pb-24 font-sans`}>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP BREADCRUMB & THEME BAR */}
      <div className={`${darkMode ? 'bg-[#1C2541] border-slate-800' : 'bg-[#F8FAFC] border-[#E2E8F0]'} border-b`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2 text-[#475569] dark:text-slate-400">
            <button
              onClick={() => setActiveTab && setActiveTab('home')}
              className="hover:text-[#0F9D58] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#0F9D58] font-bold">Notifications &amp; Reminder Centre (2026)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                showToast(!darkMode ? 'Dark Theme Enabled' : 'Light Theme Enabled');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                darkMode
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0] hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* OFFICIAL NOTICE / DISCLAIMER BANNER */}
      <div className="bg-emerald-900/90 text-emerald-100 text-xs py-2.5 px-4 text-center border-b border-emerald-700/50 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm text-[#82FAAB]">info</span>
        <span>
          <strong>2026 JAMB Admission Cycle Demo:</strong> Platform notifications and reminders are personal study aids. Always verify official JAMB announcements on the official CAPS portal.
        </span>
      </div>

      {/* PAGE HEADER / HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">notifications_active</span>
              <span>Personalised Candidate Alerts &amp; Schedule</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Notifications &amp; <span className="text-[#82FAAB]">Reminder Centre</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Stay informed with personalised reminders, educational updates, and important milestones throughout your 2026 admission journey.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Create Reminder</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('preferences-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">tune</span>
                <span>Manage Preferences</span>
              </button>
            </div>
          </div>

          {/* HERO ILLUSTRATION BLOCK */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    🔔
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">JAMB Compass 2026</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">Smart Activity Hub</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Live Sync
                </span>
              </div>

              {/* Graphic Elements Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#82FAAB]">smartphone</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Phone Alerts</p>
                    <p className="text-[9px] text-slate-300">Push Active</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-300">calendar_month</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">2026 Calendar</p>
                    <p className="text-[9px] text-slate-300">Synced</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-300">checklist</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Study Tasks</p>
                    <p className="text-[9px] text-[#82FAAB]">80% Complete</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-rose-300">school</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Admission Prep</p>
                    <p className="text-[9px] text-slate-300">2026 Ready</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0F9D58]/20 border border-[#0F9D58]/40 rounded-2xl text-[11px] text-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Demo Workspace: Interactive notification dashboard for 2026 UTME candidates.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* NOTIFICATION SUMMARY KPI CARDS */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Unread', val: unreadCount, subtitle: 'Active alerts', icon: 'mark_email_unread', color: 'text-[#0F9D58]', bg: 'bg-emerald-50 dark:bg-slate-800', onClick: () => setCategoryFilter('Unread') },
            { title: "Today's Reminders", val: todayRemindersCount, subtitle: 'Oct 12, 2026', icon: 'today', color: 'text-[#2563EB]', bg: 'bg-blue-50 dark:bg-slate-800', onClick: () => setCategoryFilter('All') },
            { title: 'Upcoming Deadlines', val: upcomingDeadlinesCount, subtitle: 'High priority', icon: 'error_outline', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-slate-800', onClick: () => setPriorityFilter('High') },
            { title: 'Completed', val: completedRemindersCount, subtitle: 'Total finished', icon: 'task_alt', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-slate-800', onClick: () => {} },
            { title: 'Saved Alerts', val: savedAlertsCount, subtitle: 'Bookmarked', icon: 'bookmark', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-slate-800', onClick: () => setCategoryFilter('All') },
            { title: 'Settings', val: 'Preferences', subtitle: 'Push & Email', icon: 'tune', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-slate-800', onClick: () => {
              const el = document.getElementById('preferences-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }},
          ].map((kpi, idx) => (
            <div
              key={idx}
              onClick={kpi.onClick}
              className={`p-4 sm:p-5 rounded-3xl border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                <span className={`material-symbols-outlined ${kpi.color} text-xl`}>{kpi.icon}</span>
              </div>

              <div>
                <p className={`text-xl sm:text-2xl font-extrabold font-display ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                  {kpi.val}
                </p>
                <p className="text-[10px] text-[#475569] dark:text-slate-400 font-medium">{kpi.subtitle}</p>
              </div>
            </div>
          ))}
        </section>

        {/* QUICK ACTIONS BAR */}
        <section className={`p-4 sm:p-5 rounded-3xl border shadow-sm flex flex-wrap items-center justify-between gap-4 ${
          darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F9D58]">bolt</span>
            <span className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">Quick Actions</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="py-2 px-3.5 bg-emerald-50 text-[#0F9D58] dark:bg-slate-800 dark:text-emerald-400 font-bold text-xs rounded-xl hover:bg-[#0F9D58] hover:text-white transition-all flex items-center gap-1.5 border border-emerald-200 dark:border-slate-700"
            >
              <span className="material-symbols-outlined text-sm">done_all</span>
              <span>Mark All as Read</span>
            </button>

            <button
              onClick={handleClearRead}
              className="py-2 px-3.5 bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-1.5 border border-[#E2E8F0] dark:border-slate-700"
            >
              <span className="material-symbols-outlined text-sm">delete_sweep</span>
              <span>Clear Read Notifications</span>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="py-2 px-3.5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Create Reminder</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('preferences-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-2 px-3.5 bg-blue-50 text-[#2563EB] dark:bg-slate-800 dark:text-blue-300 font-bold text-xs rounded-xl hover:bg-[#2563EB] hover:text-white transition-all flex items-center gap-1.5 border border-blue-200 dark:border-slate-700"
            >
              <span className="material-symbols-outlined text-sm">settings</span>
              <span>Manage Preferences</span>
            </button>

            <button
              onClick={() => showToast('✨ Demo: Notification report exported as PDF/JSON.')}
              className="py-2 px-3.5 bg-purple-50 text-purple-700 dark:bg-slate-800 dark:text-purple-300 font-bold text-xs rounded-xl hover:bg-purple-600 hover:text-white transition-all flex items-center gap-1.5 border border-purple-200 dark:border-slate-700"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export Notifications</span>
            </button>
          </div>
        </section>

        {/* SEARCH, FILTER CHIPS & SORT BAR */}
        <section className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
          darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#475569] text-lg">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications, reminders or updates..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs focus:ring-2 focus:ring-[#0F9D58] focus:outline-none ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Priority Filter & Sort By */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#475569] dark:text-slate-400">
                <span>Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className={`py-1.5 px-3 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-[#0F9D58] ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
                  }`}
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#475569] dark:text-slate-400">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className={`py-1.5 px-3 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-[#0F9D58] ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
                  }`}
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="Priority">Priority Level</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {[
              'All',
              'Unread',
              'Study',
              'Admissions',
              'Scholarships',
              'Mock Exams',
              'CBT Practice',
              'Universities',
              'News',
              'System',
            ].map((cat) => {
              const active = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    active
                      ? 'bg-[#0F9D58] text-white shadow-md'
                      : darkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border border-[#E2E8F0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* NOTIFICATION FEED & SIDEBAR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* MAIN NOTIFICATION FEED (Col 8) */}
          <section className="lg:col-span-8 space-y-8">

            {filteredNotifications.length === 0 ? (
              /* EMPTY STATE */
              <div className={`p-10 rounded-3xl border text-center space-y-4 shadow-sm ${
                darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}>
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 dark:bg-slate-800 flex items-center justify-center text-4xl text-[#0F9D58]">
                  🎉
                </div>
                <h3 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                  You're All Caught Up!
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 max-w-md mx-auto">
                  No notifications match your search or filter criteria. Continue studying for the 2026 UTME and we'll keep you updated!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('All');
                      setPriorityFilter('All');
                    }}
                    className="py-2.5 px-5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] transition-all"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setActiveTab && setActiveTab('study-planner')}
                    className="py-2.5 px-5 bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white font-bold text-xs rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Return to Study Planner
                  </button>
                </div>
              </div>
            ) : (
              /* GROUPED FEED */
              <div className="space-y-8">
                {/* TODAY GROUP */}
                {todayGroup.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b pb-2 border-[#E2E8F0] dark:border-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] animate-pulse" />
                      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                        Today (Oct 12, 2026)
                      </h3>
                      <span className="text-[10px] bg-emerald-100 text-[#0F9D58] font-bold px-2 py-0.5 rounded-full">
                        {todayGroup.length} Alerts
                      </span>
                    </div>

                    <div className="space-y-3">
                      {todayGroup.map((n) => (
                        <NotificationCard
                          key={n.id}
                          item={n}
                          expanded={expandedId === n.id}
                          onToggleExpand={() => setExpandedId(expandedId === n.id ? null : n.id)}
                          onToggleUnread={() => handleToggleUnread(n.id)}
                          onToggleBookmark={() => handleToggleBookmark(n.id)}
                          onDelete={() => handleDeleteNotification(n.id)}
                          onShare={() => handleShareNotification(n.title)}
                          onAction={() => n.actionTab && setActiveTab && setActiveTab(n.actionTab)}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* THIS WEEK GROUP */}
                {thisWeekGroup.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b pb-2 border-[#E2E8F0] dark:border-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                        This Week (Oct 08 - Oct 11, 2026)
                      </h3>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                        {thisWeekGroup.length} Alerts
                      </span>
                    </div>

                    <div className="space-y-3">
                      {thisWeekGroup.map((n) => (
                        <NotificationCard
                          key={n.id}
                          item={n}
                          expanded={expandedId === n.id}
                          onToggleExpand={() => setExpandedId(expandedId === n.id ? null : n.id)}
                          onToggleUnread={() => handleToggleUnread(n.id)}
                          onToggleBookmark={() => handleToggleBookmark(n.id)}
                          onDelete={() => handleDeleteNotification(n.id)}
                          onShare={() => handleShareNotification(n.title)}
                          onAction={() => n.actionTab && setActiveTab && setActiveTab(n.actionTab)}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* EARLIER IN 2026 GROUP */}
                {earlierGroup.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b pb-2 border-[#E2E8F0] dark:border-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                        Earlier in 2026
                      </h3>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                        {earlierGroup.length} Archive
                      </span>
                    </div>

                    <div className="space-y-3">
                      {earlierGroup.map((n) => (
                        <NotificationCard
                          key={n.id}
                          item={n}
                          expanded={expandedId === n.id}
                          onToggleExpand={() => setExpandedId(expandedId === n.id ? null : n.id)}
                          onToggleUnread={() => handleToggleUnread(n.id)}
                          onToggleBookmark={() => handleToggleBookmark(n.id)}
                          onDelete={() => handleDeleteNotification(n.id)}
                          onShare={() => handleShareNotification(n.title)}
                          onAction={() => n.actionTab && setActiveTab && setActiveTab(n.actionTab)}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PINNED REMINDERS SECTION */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
              darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">push_pin</span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Pinned Reminders</h3>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                  High Priority
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Complete Biology Genetics Revision', due: 'Due: Oct 14, 2026', priority: 'High', color: 'border-rose-200 bg-rose-50/60 dark:bg-slate-800/80' },
                  { title: 'Prepare for Demo Mock Exam', due: 'Due: Oct 16, 2026', priority: 'High', color: 'border-amber-200 bg-amber-50/60 dark:bg-slate-800/80' },
                  { title: 'Review University Comparison (UNILAG vs UI)', due: 'Due: Oct 18, 2026', priority: 'Medium', color: 'border-blue-200 bg-blue-50/60 dark:bg-slate-800/80' },
                  { title: 'Read Official 2026 Admission Guide', due: 'Due: Oct 20, 2026', priority: 'Low', color: 'border-emerald-200 bg-emerald-50/60 dark:bg-slate-800/80' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border flex items-start justify-between ${item.color}`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-amber-500 text-sm">push_pin</span>
                        <p className="text-xs font-bold text-[#0F172A] dark:text-white">{item.title}</p>
                      </div>
                      <p className="text-[10px] text-[#475569] dark:text-slate-400">{item.due}</p>
                    </div>

                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-700' : item.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACHIEVEMENTS & MILESTONES SECTION */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
              darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">emoji_events</span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Achievements &amp; Milestones</h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-[#0F9D58] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Streak Active
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                {[
                  { badge: '🔥 7-Day Streak', desc: 'Consistent Study', color: 'bg-rose-50 border-rose-200 dark:bg-slate-800' },
                  { badge: '🎯 First Mock Done', desc: 'Score: 284/400', color: 'bg-emerald-50 border-emerald-200 dark:bg-slate-800' },
                  { badge: '⚡ 100 Questions', desc: 'CBT Practice', color: 'bg-blue-50 border-blue-200 dark:bg-slate-800' },
                  { badge: '🏆 Goal Achieved', desc: '28h Study Target', color: 'bg-amber-50 border-amber-200 dark:bg-slate-800' },
                  { badge: '📈 Math Improved', desc: '+15% Accuracy', color: 'bg-purple-50 border-purple-200 dark:bg-slate-800' },
                ].map((ach, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border ${ach.color} transition-all hover:scale-105 cursor-pointer`}>
                    <p className="text-xs font-extrabold text-[#0F172A] dark:text-white">{ach.badge}</p>
                    <p className="text-[9px] text-[#475569] dark:text-slate-400 mt-1">{ach.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* SIDEBAR COLUMNS (Col 4): SMART REMINDERS, MINI CALENDAR, ANALYTICS */}
          <section className="lg:col-span-4 space-y-6">

            {/* SMART REMINDERS WIDGET */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
              darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">alarm</span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Smart Reminders</h3>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="text-xs font-bold text-[#0F9D58] hover:underline"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-3">
                {smartReminders.map((r) => (
                  <div
                    key={r.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      r.completed
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 opacity-70'
                        : 'bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {r.pinned && <span className="material-symbols-outlined text-amber-500 text-xs">push_pin</span>}
                          <p className={`text-xs font-bold ${r.completed ? 'line-through text-slate-400' : 'text-[#0F172A] dark:text-white'}`}>
                            {r.title}
                          </p>
                        </div>
                        <p className="text-[10px] text-[#475569] dark:text-slate-400">
                          {r.date} • {r.time} ({r.category})
                        </p>
                      </div>

                      <button
                        onClick={() => toggleReminderComplete(r.id)}
                        className={`p-1 rounded-lg border transition-all ${
                          r.completed
                            ? 'bg-[#0F9D58] text-white border-[#0F9D58]'
                            : 'text-slate-400 hover:text-[#0F9D58] border-slate-200'
                        }`}
                        title="Mark Complete"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[9px] text-[#475569] dark:text-slate-400">
                        <span>Progress</span>
                        <span>{r.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#0F9D58] h-full transition-all" style={{ width: `${r.progress}%` }} />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-2 text-[10px] text-[#475569] dark:text-slate-400">
                      <button onClick={() => snoozeReminder(r.title)} className="hover:text-[#0F9D58] font-bold">
                        ⏰ Snooze
                      </button>
                      <button onClick={() => toggleReminderPin(r.id)} className="hover:text-amber-500 font-bold">
                        {r.pinned ? 'Unpin' : 'Pin'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MINI CALENDAR WIDGET (2026) */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
              darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2563EB]">calendar_today</span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">October 2026 Calendar</h3>
                </div>
                <span className="text-[10px] font-bold text-[#2563EB]">2026 Session</span>
              </div>

              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#475569] dark:text-slate-400">
                <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* Oct 1 is Thursday -> 4 offset */}
                {[27, 28, 29, 30].map((d) => (
                  <div key={d} className="p-1.5 text-slate-300 dark:text-slate-600 font-semibold">{d}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                  const isToday = d === 12;
                  const hasMock = d === 16;
                  const hasScholarship = d === 20;

                  return (
                    <div
                      key={d}
                      onClick={() => showToast(`Selected Oct ${d}, 2026 schedule`)}
                      className={`p-1.5 rounded-xl cursor-pointer transition-all ${
                        isToday
                          ? 'bg-[#0F9D58] text-white font-extrabold shadow-md'
                          : hasMock
                          ? 'bg-rose-100 text-rose-700 font-bold dark:bg-rose-900/40 dark:text-rose-200'
                          : hasScholarship
                          ? 'bg-amber-100 text-amber-700 font-bold dark:bg-amber-900/40 dark:text-amber-200'
                          : darkMode
                          ? 'hover:bg-slate-700 text-slate-200'
                          : 'hover:bg-slate-100 text-[#0F172A]'
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800 space-y-1 text-[10px] text-[#475569] dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0F9D58]" />
                  <span>Oct 12: Today's Study Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Oct 16: Demo Mock Exam</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Oct 20: Scholarship Deadline</span>
                </div>
              </div>
            </div>

            {/* NOTIFICATION ANALYTICS CARD */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
              darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-600">analytics</span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Notification Analytics</h3>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
                  Oct 2026
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#475569] dark:text-slate-400">Notifications Received</span>
                  <span className="font-bold text-[#0F172A] dark:text-white">124 Alerts</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#475569] dark:text-slate-400">Reminders Completed Rate</span>
                  <span className="font-bold text-[#0F9D58]">88%</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#475569] dark:text-slate-400">Avg Response Time</span>
                  <span className="font-bold text-[#2563EB]">14 Mins</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#475569] dark:text-slate-400">Most Active Study Day</span>
                  <span className="font-bold text-amber-600">Saturday</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#475569] dark:text-slate-400">Top Reminder Category</span>
                  <span className="font-bold text-emerald-600">CBT Practice</span>
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="pt-2">
                <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 mb-2">Weekly Completion Trend</p>
                <div className="flex items-end justify-between h-20 gap-1.5 px-2">
                  {[
                    { day: 'Mon', h: 60 },
                    { day: 'Tue', h: 45 },
                    { day: 'Wed', h: 80 },
                    { day: 'Thu', h: 90 },
                    { day: 'Fri', h: 70 },
                    { day: 'Sat', h: 100 },
                    { day: 'Sun', h: 50 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-[#0F9D58] rounded-t-md transition-all hover:bg-[#16A34A]" style={{ height: `${bar.h}%` }} />
                      <span className="text-[9px] text-slate-400">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>

        </div>

        {/* NOTIFICATION PREFERENCES SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
          darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
        }`} id="preferences-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Customisation Engine</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Notification Preferences
              </h2>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400">Manage channels &amp; candidate alert triggers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* DELIVERY CHANNELS */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white border-b pb-2 border-slate-200 dark:border-slate-700">
                Delivery Channels
              </h4>

              {[
                { label: 'In-App Notifications', key: 'inAppNotifications' as const },
                { label: 'Email Alerts', key: 'emailNotifications' as const },
                { label: 'Push Notifications', key: 'pushNotifications' as const },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200">{item.label}</span>
                  <button
                    onClick={() => togglePreference(item.key)}
                    className={`w-11 h-6 rounded-full transition-all relative ${
                      preferences[item.key] ? 'bg-[#0F9D58]' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-md ${
                      preferences[item.key] ? 'left-5.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* CONTENT ALERTS */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white border-b pb-2 border-slate-200 dark:border-slate-700">
                Study &amp; CBT Alerts
              </h4>

              {[
                { label: 'Study Reminders', key: 'studyReminders' as const },
                { label: 'CBT Practice Reminders', key: 'cbtReminders' as const },
                { label: 'Mock Exam Alerts', key: 'mockExamAlerts' as const },
                { label: 'Weekly Progress Reports', key: 'weeklyProgressReports' as const },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200">{item.label}</span>
                  <button
                    onClick={() => togglePreference(item.key)}
                    className={`w-11 h-6 rounded-full transition-all relative ${
                      preferences[item.key] ? 'bg-[#0F9D58]' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-md ${
                      preferences[item.key] ? 'left-5.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* ADMISSIONS & SCHOLARSHIPS */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white border-b pb-2 border-slate-200 dark:border-slate-700">
                Admissions &amp; Updates
              </h4>

              {[
                { label: 'Scholarship Alerts', key: 'scholarshipAlerts' as const },
                { label: 'Admission Updates', key: 'admissionUpdates' as const },
                { label: 'News & Guidelines', key: 'newsAlerts' as const },
                { label: 'Achievement Badges', key: 'achievementNotifications' as const },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200">{item.label}</span>
                  <button
                    onClick={() => togglePreference(item.key)}
                    className={`w-11 h-6 rounded-full transition-all relative ${
                      preferences[item.key] ? 'bg-[#0F9D58]' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-md ${
                      preferences[item.key] ? 'left-5.5' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* RECENT ACTIVITY TIMELINE SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
          darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Candidate Trail</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Recent Activity Timeline (2026)
            </h2>
          </div>

          <div className="relative pl-6 border-l-2 border-[#0F9D58]/30 space-y-6">
            {[
              { action: 'Completed Mathematics CBT Practice (Calculus)', time: 'Today, Oct 12, 2026 • 10:15 AM', icon: 'edit_note' },
              { action: 'Saved Federal Scholarship Opportunity to Bookmarks', time: 'Oct 11, 2026 • 04:30 PM', icon: 'bookmark' },
              { action: 'Updated Personal 2026 Study Schedule', time: 'Oct 10, 2026 • 01:20 PM', icon: 'edit_calendar' },
              { action: 'Viewed UNILAG Departmental Cut-Off Marks', time: 'Oct 09, 2026 • 09:45 AM', icon: 'school' },
              { action: 'Completed Physics CBT Mock Exam Drill', time: 'Oct 08, 2026 • 03:10 PM', icon: 'computer' },
              { action: 'Earned "7-Day Study Streak" Achievement Badge', time: 'Oct 07, 2026 • 08:00 AM', icon: 'emoji_events' },
            ].map((act, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0F9D58] border-2 border-white dark:border-slate-900" />
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0F9D58] text-lg">{act.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A] dark:text-white">{act.action}</p>
                      <p className="text-[10px] text-[#475569] dark:text-slate-400">{act.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-[#0F9D58] font-bold px-2 py-0.5 rounded">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
          darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
        }`}>
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Help &amp; Guidance</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              Find quick answers regarding notifications, custom reminders, and alert settings.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E2E8F0] dark:border-slate-700 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-[#0F9D58]/10 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-base">
                    {openFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="p-4 text-xs text-[#475569] dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 border-t border-[#E2E8F0] dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION (EMERALD & NAVY GRADIENT) */}
        <section className="relative rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <span className="inline-block bg-[#0F9D58] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              2026 Academic Success
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Never Miss an Important Update
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Stay organised with smart reminders, timely notifications, and personalised alerts throughout your 2026 admission journey.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
              <button
                onClick={() => setActiveTab && setActiveTab('study-planner')}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>Open Study Planner</span>
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#0F9D58] flex items-center justify-center text-3xl shadow-lg animate-pulse">
              🔔
            </div>
            <p className="text-sm font-extrabold text-[#82FAAB]">100% Synced</p>
            <p className="text-[10px] text-slate-300">2026 Admission Cycle</p>
          </div>
        </section>

      </div>

      {/* CREATE REMINDER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 border ${
            darkMode ? 'bg-[#1C2541] border-slate-700 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">add_alert</span>
                <h3 className="text-base font-bold font-display">Create Custom Reminder</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReminderSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Title</label>
                <input
                  type="text"
                  value={newReminderForm.title}
                  onChange={(e) => setNewReminderForm({ ...newReminderForm, title: e.target.value })}
                  placeholder="e.g. Physics Mechanics Past Questions"
                  className={`w-full mt-1 p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-[#0F9D58] focus:outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Category</label>
                  <select
                    value={newReminderForm.category}
                    onChange={(e) => setNewReminderForm({ ...newReminderForm, category: e.target.value as any })}
                    className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                    }`}
                  >
                    <option value="Study">Study</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Mock Exams">Mock Exams</option>
                    <option value="CBT Practice">CBT Practice</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Priority</label>
                  <select
                    value={newReminderForm.priority}
                    onChange={(e) => setNewReminderForm({ ...newReminderForm, priority: e.target.value as any })}
                    className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                    }`}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Date (2026)</label>
                  <input
                    type="text"
                    value={newReminderForm.date}
                    onChange={(e) => setNewReminderForm({ ...newReminderForm, date: e.target.value })}
                    className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Time</label>
                  <input
                    type="text"
                    value={newReminderForm.time}
                    onChange={(e) => setNewReminderForm({ ...newReminderForm, time: e.target.value })}
                    className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={newReminderForm.description}
                  onChange={(e) => setNewReminderForm({ ...newReminderForm, description: e.target.value })}
                  placeholder="Additional details..."
                  className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                  }`}
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-[#475569] dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] shadow-md"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

/* COMPONENT: INDIVIDUAL NOTIFICATION CARD */
interface NotificationCardProps {
  item: NotificationItem;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleUnread: () => void;
  onToggleBookmark: () => void;
  onDelete: () => void;
  onShare: () => void;
  onAction?: () => void;
  darkMode: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  item,
  expanded,
  onToggleExpand,
  onToggleUnread,
  onToggleBookmark,
  onDelete,
  onShare,
  onAction,
  darkMode,
}) => {
  return (
    <div
      className={`p-4 sm:p-5 rounded-3xl border transition-all shadow-sm hover:shadow-md ${
        item.unread
          ? darkMode
            ? 'bg-[#1C2541] border-[#0F9D58]/60 ring-1 ring-[#0F9D58]/30'
            : 'bg-emerald-50/40 border-[#0F9D58]/40 ring-1 ring-[#0F9D58]/20'
          : darkMode
          ? 'bg-slate-800/80 border-slate-700'
          : 'bg-white border-[#E2E8F0]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left icon & details */}
        <div className="flex items-start gap-3.5 flex-1">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-bold shadow-sm ${
              item.priority === 'High'
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300'
                : item.priority === 'Medium'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-emerald-100 text-[#0F9D58] dark:bg-emerald-950 dark:text-emerald-300'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[#0F9D58]">
                {item.category}
              </span>

              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                item.priority === 'High' ? 'bg-rose-100 text-rose-700' : item.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {item.priority} Priority
              </span>

              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-ping" title="Unread" />
              )}
            </div>

            <h4 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-[#0F172A]'}`}>
              {item.title}
            </h4>

            <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            <p className="text-[10px] text-[#475569] dark:text-slate-400 font-medium pt-1">
              {item.timestamp}
            </p>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleBookmark}
            className={`p-1.5 rounded-xl border transition-all ${
              item.bookmarked
                ? 'bg-amber-100 text-amber-600 border-amber-300'
                : 'text-slate-400 hover:text-amber-500 border-transparent'
            }`}
            title={item.bookmarked ? 'Saved' : 'Save to bookmarks'}
          >
            <span className="material-symbols-outlined text-sm">
              {item.bookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          <button
            onClick={onToggleUnread}
            className={`p-1.5 rounded-xl border transition-all ${
              item.unread
                ? 'bg-emerald-100 text-[#0F9D58] border-emerald-300'
                : 'text-slate-400 hover:text-[#0F9D58] border-transparent'
            }`}
            title={item.unread ? 'Mark as read' : 'Mark as unread'}
          >
            <span className="material-symbols-outlined text-sm">
              {item.unread ? 'mark_email_read' : 'mark_email_unread'}
            </span>
          </button>

          <button
            onClick={onShare}
            className="p-1.5 rounded-xl text-slate-400 hover:text-blue-500 transition-all"
            title="Share"
          >
            <span className="material-symbols-outlined text-sm">share</span>
          </button>

          <button
            onClick={onDelete}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 transition-all"
            title="Delete"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      </div>

      {/* Expand Details Bar */}
      <div className="mt-3 pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-bold">
        <button
          onClick={onToggleExpand}
          className="text-[#0F9D58] hover:underline flex items-center gap-1"
        >
          <span>{expanded ? 'Hide Details' : 'Expand Details'}</span>
          <span className="material-symbols-outlined text-sm">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {item.actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1 bg-[#0F9D58] text-white rounded-xl text-[11px] font-bold hover:bg-[#16A34A] transition-all flex items-center gap-1"
          >
            <span>{item.actionLabel}</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Expanded Details Body */}
      {expanded && (
        <div className="mt-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs text-[#475569] dark:text-slate-300 space-y-2 border border-slate-200 dark:border-slate-800">
          <p className="font-bold text-[#0F172A] dark:text-white">Detailed Academic Note:</p>
          <p>{item.detailedNotes || 'No additional details specified for this candidate alert.'}</p>
          <div className="flex items-center gap-2 pt-1 text-[10px] text-emerald-600 font-bold">
            <span className="material-symbols-outlined text-xs">verified</span>
            <span>2026 JAMB Compass Guidance</span>
          </div>
        </div>
      )}
    </div>
  );
};
