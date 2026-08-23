import React, { useState } from 'react';
import { TabType } from '../types';

interface StudyPlannerScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

interface TaskItem {
  id: string;
  title: string;
  subject: string;
  date: string; // YYYY-MM-DD format
  startTime: string;
  endTime: string;
  priority: 'Low' | 'Medium' | 'High';
  category: 'Revision' | 'Practice Test' | 'Reading' | 'Assignment' | 'Mock Exam';
  completed: boolean;
  notes?: string;
}

interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'urgent' | 'info' | 'success';
  read: boolean;
}

export const StudyPlannerScreen: React.FC<StudyPlannerScreenProps> = ({ setActiveTab }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calendar View State: Month, Week, Day, Agenda
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // 9 = October 2026
  const monthNames = [
    'January 2026', 'February 2026', 'March 2026', 'April 2026',
    'May 2026', 'June 2026', 'July 2026', 'August 2026',
    'September 2026', 'October 2026', 'November 2026', 'December 2026'
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prev) => prev - 1);
      showToast(`Switched to ${monthNames[currentMonthIndex - 1]}`);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < 11) {
      setCurrentMonthIndex((prev) => prev + 1);
      showToast(`Switched to ${monthNames[currentMonthIndex + 1]}`);
    }
  };

  // Selected Day Modal/Details State
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number | null>(12); // Oct 12, 2026 default

  // Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 't1',
      title: 'English Use of English & Concord Revision',
      subject: 'English',
      date: '2026-10-12',
      startTime: '08:00 AM',
      endTime: '09:30 AM',
      priority: 'High',
      category: 'Revision',
      completed: true,
      notes: 'Focus on registers, antonyms, and comprehension passages.',
    },
    {
      id: 't2',
      title: 'Mathematics Algebraic Expressions Practice',
      subject: 'Mathematics',
      date: '2026-10-12',
      startTime: '10:00 AM',
      endTime: '11:45 AM',
      priority: 'High',
      category: 'Practice Test',
      completed: true,
      notes: 'Solve 30 past questions on quadratic equations and indices.',
    },
    {
      id: 't3',
      title: 'Physics Mechanics & Dynamics CBT Mock',
      subject: 'Physics',
      date: '2026-10-12',
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      priority: 'Medium',
      category: 'Mock Exam',
      completed: false,
      notes: 'Timed session 50 questions.',
    },
    {
      id: 't4',
      title: 'Chemistry Organic Hydrocarbons Review',
      subject: 'Chemistry',
      date: '2026-10-12',
      startTime: '05:00 PM',
      endTime: '06:30 PM',
      priority: 'Normal' as any,
      category: 'Reading',
      completed: false,
      notes: 'Chapter 4 alkanes and alkenes reactions.',
    },
    {
      id: 't5',
      title: 'Biology Plant Cell Structure & Transport',
      subject: 'Biology',
      date: '2026-10-13',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      priority: 'Medium',
      category: 'Reading',
      completed: false,
    },
    {
      id: 't6',
      title: 'Government Constitution & Federalism CBT',
      subject: 'Government',
      date: '2026-10-14',
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      priority: 'Low' as any,
      category: 'Practice Test',
      completed: false,
    },
  ]);

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = !t.completed;
          showToast(next ? `Marked "${t.title}" as Completed!` : `Marked "${t.title}" as Pending`);
          return { ...t, completed: next };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task removed from schedule.');
  };

  // Quick Add Task Form State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    subject: 'Mathematics',
    date: '2026-10-12',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    priority: 'High' as 'Low' | 'Medium' | 'High',
    category: 'Revision' as 'Revision' | 'Practice Test' | 'Reading' | 'Assignment' | 'Mock Exam',
    notes: '',
  });

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      showToast('⚠️ Please enter a task title.');
      return;
    }

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: taskForm.title,
      subject: taskForm.subject,
      date: taskForm.date,
      startTime: taskForm.startTime,
      endTime: taskForm.endTime,
      priority: taskForm.priority,
      category: taskForm.category,
      completed: false,
      notes: taskForm.notes,
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsTaskModalOpen(false);
    setTaskForm({
      title: '',
      subject: 'Mathematics',
      date: '2026-10-12',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      priority: 'High',
      category: 'Revision',
      notes: '',
    });
    showToast(`Task "${newTask.title}" added to your 2026 study planner!`);
  };

  // Reminders state
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'r1', title: 'Revision starts in 30 minutes: Chemistry Hydrocarbons', time: '4:30 PM Today', type: 'urgent', read: false },
    { id: 'r2', title: 'Complete today\'s Mathematics practice session (Algebra)', time: '10:00 AM Today', type: 'info', read: false },
    { id: 'r3', title: 'Scholarship application deadline reminder (2026 Cycle)', time: 'Oct 25, 2026', type: 'urgent', read: false },
    { id: 'r4', title: 'Review saved university requirements for UNILAG & UI', time: 'Tomorrow 9:00 AM', type: 'info', read: true },
    { id: 'r5', title: 'Upcoming national mock exam simulation scheduled', time: 'Oct 18, 2026', type: 'success', read: true },
  ]);

  const dismissReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    showToast('Reminder dismissed.');
  };

  // Goals & Milestones State
  const [goals, setGoals] = useState([
    { id: 'g1', title: 'Complete 20 Study Sessions', current: 16, total: 20, unit: 'sessions', icon: 'auto_stories' },
    { id: 'g2', title: 'Finish Biology 2026 Syllabus', current: 18, total: 22, unit: 'topics', icon: 'biotech' },
    { id: 'g3', title: 'Take 5 Full-Length CBT Tests', current: 4, total: 5, unit: 'tests', icon: 'computer' },
    { id: 'g4', title: 'Complete 2 National Mock Exams', current: 1, total: 2, unit: 'mocks', icon: 'assignment' },
    { id: 'g5', title: 'Reach 85% Exam Readiness', current: 78, total: 85, unit: '%', icon: 'verified_user' },
  ]);

  const incrementGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id && g.current < g.total) {
          const nextVal = Math.min(g.total, g.current + 1);
          showToast(`Updated "${g.title}" progress to ${nextVal}/${g.total}`);
          return { ...g, current: nextVal };
        }
        return g;
      })
    );
  };

  // Subject Tracker Cards Data
  const subjectsData = [
    { name: 'English', hours: 24.5, completedTopics: 14, totalTopics: 18, nextTopic: 'Oral English & Phonetics', color: '#0F9D58', icon: 'menu_book' },
    { name: 'Mathematics', hours: 32.0, completedTopics: 16, totalTopics: 22, nextTopic: 'Differentiation & Integration', color: '#2563EB', icon: 'calculate' },
    { name: 'Physics', hours: 21.0, completedTopics: 12, totalTopics: 16, nextTopic: 'Wave Motion & Sound', color: '#7C3AED', icon: 'science' },
    { name: 'Chemistry', hours: 19.5, completedTopics: 11, totalTopics: 15, nextTopic: 'Electrolysis & Redox', color: '#EA580C', icon: 'science' },
    { name: 'Biology', hours: 26.0, completedTopics: 17, totalTopics: 20, nextTopic: 'Genetics & Evolution', color: '#16A34A', icon: 'biotech' },
    { name: 'Government', hours: 15.0, completedTopics: 9, totalTopics: 14, nextTopic: 'Public Administration', color: '#D97706', icon: 'account_balance' },
    { name: 'Economics', hours: 18.0, completedTopics: 10, totalTopics: 15, nextTopic: 'International Trade', color: '#0284C7', icon: 'trending_up' },
    { name: 'Literature', hours: 14.0, completedTopics: 8, totalTopics: 12, nextTopic: 'African Poetry Analysis', color: '#DB2777', icon: 'collections_bookmark' },
    { name: 'Commerce', hours: 12.5, completedTopics: 7, totalTopics: 11, nextTopic: 'Stock Exchange & Capital', color: '#059669', icon: 'storefront' },
  ];

  // Export / Share handlers
  const handleExportPlan = (action: string) => {
    showToast(`✨ ${action} initialized for your 2026 Study Schedule!`);
  };

  // FAQ State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I create a personalized study plan for 2026?',
      a: 'Click on the "Quick Add Task" or "+ Add Task" button. Enter your target subject, start and end times, priority level, and category. The schedule will automatically place it in your calendar.',
    },
    {
      q: 'Can I edit or reschedule my existing study sessions?',
      a: 'Yes! You can toggle completion, edit details, or remove any task directly from the Today Schedule timeline or calendar view.',
    },
    {
      q: 'How do smart study reminders work?',
      a: 'Reminders notify you 30 minutes before a scheduled study session or mock exam begins, ensuring you maintain a consistent 2026 study streak.',
    },
    {
      q: 'Can I export or print my monthly study calendar?',
      a: 'Absolutely. Use the "Export & Share" bar to download your study plan as a PDF summary, print a physical layout, or duplicate your weekly plan.',
    },
    {
      q: 'How are the AI Study Recommendations generated?',
      a: 'Recommendations analyze your CBT practice accuracy, completed topics, and subject time distribution to suggest optimal focus areas.',
    },
  ];

  // Compute today tasks count
  const todayTasks = tasks.filter((t) => t.date === '2026-10-12');
  const completedTodayCount = todayTasks.filter((t) => t.completed).length;

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'} pb-24`}>
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
            <span className="text-[#0F9D58] font-bold">Smart Study Planner &amp; Calendar (2026)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                showToast(!darkMode ? 'Dark Mode Enabled' : 'Light Mode Enabled');
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

      {/* PAGE HEADER / HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>2026 Academic Calendar &amp; Time Management</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Smart Study Planner &amp; <span className="text-[#82FAAB]">Calendar</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Plan your study sessions, stay organised, and prepare confidently for the 2026 admission cycle with a personalised learning schedule.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">add_task</span>
                <span>Quick Add Task</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('calendar-grid-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">calendar_view_month</span>
                <span>View Monthly Calendar</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration Block */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    📅
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">October 2026 Schedule</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">Active Study Plan</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  UTME Prep
                </span>
              </div>

              {/* Graphic Indicators */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#82FAAB]">schedule</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">4.5 Hrs Logged</p>
                    <p className="text-[9px] text-slate-300">Target: 6.0 Hrs</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-300">task_alt</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">12/15 Tasks</p>
                    <p className="text-[9px] text-slate-300">80% Done Today</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-rose-400">local_fire_department</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">7 Day Streak</p>
                    <p className="text-[9px] text-slate-[#82FAAB]">Consistent Study</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-300">bar_chart</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">85% Readiness</p>
                    <p className="text-[9px] text-slate-300">2026 Goal</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0F9D58]/20 border border-[#0F9D58]/40 rounded-2xl text-[11px] text-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Interactive Planner: Personal study data demo for 2026 candidate preparation.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* TODAY OVERVIEW KPI CARDS */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Today's Study Time", val: "4h 30m", subtitle: "Goal: 6h 00m", icon: "schedule", color: "text-[#0F9D58]", bg: "bg-emerald-50 dark:bg-slate-800" },
            { title: "Tasks Completed", val: `${completedTodayCount} / ${todayTasks.length}`, subtitle: "Today's checklist", icon: "task_alt", color: "text-[#2563EB]", bg: "bg-blue-50 dark:bg-slate-800" },
            { title: "Upcoming Sessions", val: `${todayTasks.filter(t => !t.completed).length} Left`, subtitle: "Physics & Chemistry", icon: "event_repeat", color: "text-amber-500", bg: "bg-amber-50 dark:bg-slate-800" },
            { title: "Revision Progress", val: "65%", subtitle: "+5% this week", icon: "auto_stories", color: "text-purple-600", bg: "bg-purple-50 dark:bg-slate-800" },
            { title: "Study Streak", val: "7 Days 🔥", subtitle: "Personal best!", icon: "local_fire_department", color: "text-rose-500", bg: "bg-rose-50 dark:bg-slate-800" },
            { title: "Weekly Goal", val: "85%", subtitle: "Target: 28 Hours", icon: "verified", color: "text-[#16A34A]", bg: "bg-emerald-50 dark:bg-slate-800" },
          ].map((kpi, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-2 ${
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

        {/* SMART STUDY CALENDAR & QUICK TASK ADDITION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="calendar-grid-section">

          {/* CALENDAR COLUMN (Col 8) */}
          <section className={`lg:col-span-8 p-6 rounded-3xl border shadow-xl flex flex-col justify-between ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="space-y-6">
              {/* Calendar Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">2026 Academic Schedule</span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                      {monthNames[currentMonthIndex]}
                    </h2>
                    <div className="flex items-center gap-1 border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-1">
                      <button
                        onClick={handlePrevMonth}
                        className="p-1 hover:bg-[#0F9D58] hover:text-white rounded-lg transition-all"
                        title="Previous Month"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="p-1 hover:bg-[#0F9D58] hover:text-white rounded-lg transition-all"
                        title="Next Month"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* View Selector Tabs */}
                <div className="flex items-center gap-1 bg-[#F8FAFC] dark:bg-slate-800 p-1.5 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold">
                  {(['month', 'week', 'day', 'agenda'] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setCalendarView(view)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                        calendarView === view
                          ? 'bg-[#0F9D58] text-white shadow-md'
                          : 'text-[#475569] dark:text-slate-400 hover:text-[#0F172A]'
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Render Views */}
              {calendarView === 'month' && (
                <div className="space-y-2">
                  {/* Weekday Labels */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#475569] dark:text-slate-400 pb-2">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>

                  {/* 35 Calendar Cells Grid for October 2026 */}
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {/* Padding days before Oct 1 (Thu) -> 4 days: Sep 27..30 */}
                    {[27, 28, 29, 30].map((num) => (
                      <div
                        key={`prev-${num}`}
                        className="h-20 sm:h-24 p-1.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 opacity-40 border border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-400"
                      >
                        {num}
                      </div>
                    ))}

                    {/* October 1 to 31 */}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
                      const isToday = dayNum === 12; // Oct 12, 2026 today
                      const isSelected = selectedCalendarDate === dayNum;

                      // Event mapping for October 2026
                      let eventBadge = null;
                      if (dayNum === 5) eventBadge = { label: 'English Rev', color: 'bg-emerald-500 text-white' };
                      if (dayNum === 7) eventBadge = { label: 'Math CBT', color: 'bg-blue-600 text-white' };
                      if (dayNum === 12) eventBadge = { label: 'Today (4 Tasks)', color: 'bg-[#0F9D58] text-white font-bold' };
                      if (dayNum === 18) eventBadge = { label: 'National Mock', color: 'bg-purple-600 text-white' };
                      if (dayNum === 25) eventBadge = { label: 'Scholarship', color: 'bg-amber-500 text-white' };

                      return (
                        <div
                          key={dayNum}
                          onClick={() => {
                            setSelectedCalendarDate(dayNum);
                            showToast(`Selected Oct ${dayNum}, 2026 schedule`);
                          }}
                          className={`h-20 sm:h-24 p-1.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isToday
                              ? 'bg-[#0F9D58]/10 border-[#0F9D58] ring-2 ring-[#0F9D58]/40'
                              : isSelected
                              ? 'bg-blue-50 dark:bg-slate-800 border-[#2563EB]'
                              : darkMode
                              ? 'bg-slate-800/80 border-slate-700 hover:border-[#0F9D58]'
                              : 'bg-white border-[#E2E8F0] hover:border-[#0F9D58]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isToday ? 'text-[#0F9D58] font-extrabold' : 'text-[#0F172A] dark:text-white'}`}>
                              {dayNum}
                            </span>
                            {isToday && (
                              <span className="w-2 h-2 rounded-full bg-[#0F9D58] animate-ping" />
                            )}
                          </div>

                          {eventBadge && (
                            <div className={`px-1.5 py-0.5 rounded-md text-[9px] truncate ${eventBadge.color}`}>
                              {eventBadge.label}
                            </div>
                          )}

                          <div className="flex items-center gap-1 text-[9px] text-[#475569] dark:text-slate-400">
                            {dayNum % 2 === 0 ? '📚 2h Study' : '✏️ CBT Practice'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Agenda / Week View Placeholder Details */}
              {calendarView !== 'month' && (
                <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white capitalize">
                      {calendarView} View Schedule (Oct 12 - Oct 18, 2026)
                    </h3>
                    <span className="text-xs text-[#0F9D58] font-bold">2026 UTME Mode</span>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-3 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#0F172A] dark:text-white">{task.title}</p>
                          <p className="text-[11px] text-[#475569] dark:text-slate-300">{task.date} • {task.startTime} - {task.endTime} • Category: {task.category}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${task.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Day Agenda Banner */}
              <div className="p-4 bg-emerald-50 dark:bg-slate-800 border border-[#0F9D58]/30 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#0F9D58] text-xl">event_note</span>
                  <div>
                    <p className="font-bold text-[#0F172A] dark:text-white">
                      Selected Date: October {selectedCalendarDate || 12}, 2026
                    </p>
                    <p className="text-[11px] text-[#475569] dark:text-slate-300">
                      {todayTasks.length} study sessions scheduled for this day.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsTaskModalOpen(true)}
                  className="px-3 py-1.5 bg-[#0F9D58] text-white font-bold rounded-xl text-xs hover:bg-[#16A34A] transition-all"
                >
                  + Add Session
                </button>
              </div>
            </div>
          </section>

          {/* QUICK ADD TASK & TODAY'S TIMELINE COLUMN (Col 4) */}
          <section className="lg:col-span-4 space-y-6">

            {/* QUICK ADD TASK FLOATING CARD */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">edit_calendar</span>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Quick Add Task</h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-[#0F9D58] font-bold px-2 py-0.5 rounded-full">
                  Fast Planner
                </span>
              </div>

              <form onSubmit={handleSaveTask} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Task Title</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    placeholder="e.g. English Concord Past Questions"
                    className={`w-full mt-1 p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-[#0F9D58] focus:outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Subject</label>
                    <select
                      value={taskForm.subject}
                      onChange={(e) => setTaskForm({ ...taskForm, subject: e.target.value })}
                      className={`w-full mt-1 p-2 rounded-xl border text-xs focus:ring-2 focus:ring-[#0F9D58] ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                      }`}
                    >
                      {['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Government', 'Economics', 'Literature', 'Commerce'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Priority</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                      className={`w-full mt-1 p-2 rounded-xl border text-xs focus:ring-2 focus:ring-[#0F9D58] ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                      }`}
                    >
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Start Time</label>
                    <input
                      type="text"
                      value={taskForm.startTime}
                      onChange={(e) => setTaskForm({ ...taskForm, startTime: e.target.value })}
                      className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase">Category</label>
                    <select
                      value={taskForm.category}
                      onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value as any })}
                      className={`w-full mt-1 p-2 rounded-xl border text-xs ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-[#E2E8F0] text-[#0F172A]'
                      }`}
                    >
                      <option value="Revision">Revision</option>
                      <option value="Practice Test">Practice Test</option>
                      <option value="Reading">Reading</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Mock Exam">Mock Exam</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] transition-all shadow-md flex items-center justify-center gap-1"
                  >
                    <span>Save Task</span>
                    <span className="material-symbols-outlined text-sm">check</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaskForm({ title: '', subject: 'Mathematics', date: '2026-10-12', startTime: '09:00 AM', endTime: '10:30 AM', priority: 'High', category: 'Revision', notes: '' })}
                    className="py-2.5 px-3 bg-slate-100 dark:bg-slate-700 text-[#475569] dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* TODAY'S SCHEDULE TIMELINE */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Today's Timeline (Oct 12)</h3>
                <span className="text-[11px] font-bold text-[#0F9D58]">{completedTodayCount}/{todayTasks.length} Completed</span>
              </div>

              <div className="space-y-3 relative pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                {todayTasks.map((t) => (
                  <div key={t.id} className="relative group">
                    <span className={`absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${t.completed ? 'bg-[#0F9D58]' : 'bg-amber-500'}`} />

                    <div className={`p-3 rounded-2xl border transition-all ${t.completed ? 'bg-emerald-50/50 dark:bg-slate-800/50 border-emerald-200 dark:border-slate-700' : 'bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`text-xs font-bold ${t.completed ? 'line-through text-slate-400' : 'text-[#0F172A] dark:text-white'}`}>
                            {t.title}
                          </p>
                          <p className="text-[10px] text-[#475569] dark:text-slate-400 mt-0.5">
                            {t.startTime} - {t.endTime} • {t.subject} • {t.category}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleTaskCompletion(t.id)}
                          className={`p-1 rounded-lg border transition-all ${
                            t.completed ? 'bg-[#0F9D58] text-white border-[#0F9D58]' : 'text-slate-400 hover:text-[#0F9D58] border-slate-200'
                          }`}
                          title="Toggle Completion"
                        >
                          <span className="material-symbols-outlined text-sm">check</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>

        {/* WEEKLY STUDY PLAN (7-DAY PLANNER) */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Weekly Overview</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Weekly Study Plan (Oct 12 - Oct 18, 2026)
              </h2>
            </div>
            <span className="text-xs font-bold text-[#475569] dark:text-slate-400">Weekly Target: 28 Study Hours</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {[
              { day: 'Monday', date: 'Oct 12', hours: '4.5 hrs', tasks: '4 tasks', percent: 80, isToday: true },
              { day: 'Tuesday', date: 'Oct 13', hours: '4.0 hrs', tasks: '3 tasks', percent: 0, isToday: false },
              { day: 'Wednesday', date: 'Oct 14', hours: '3.5 hrs', tasks: '3 tasks', percent: 0, isToday: false },
              { day: 'Thursday', date: 'Oct 15', hours: '4.5 hrs', tasks: '4 tasks', percent: 0, isToday: false },
              { day: 'Friday', date: 'Oct 16', hours: '3.0 hrs', tasks: '2 tasks', percent: 0, isToday: false },
              { day: 'Saturday', date: 'Oct 17', hours: '5.0 hrs', tasks: 'Mock Exam', percent: 0, isToday: false },
              { day: 'Sunday', date: 'Oct 18', hours: '3.5 hrs', tasks: 'Weekly Review', percent: 0, isToday: false },
            ].map((dayObj, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  dayObj.isToday
                    ? 'bg-emerald-50 dark:bg-slate-800 border-[#0F9D58] ring-2 ring-[#0F9D58]/30'
                    : darkMode
                    ? 'bg-slate-800/60 border-slate-700'
                    : 'bg-slate-50 border-[#E2E8F0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white">{dayObj.day}</span>
                    {dayObj.isToday && <span className="text-[9px] bg-[#0F9D58] text-white font-extrabold px-2 py-0.5 rounded-full">Today</span>}
                  </div>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400 font-medium">{dayObj.date}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-[#0F172A] dark:text-white">{dayObj.hours}</p>
                  <p className="text-[10px] text-[#0F9D58] font-bold">{dayObj.tasks}</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F9D58] h-full transition-all" style={{ width: `${dayObj.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUBJECT STUDY TRACKER */}
        <section className="space-y-6">
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Subject Coverage</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Subject Study Tracker (2026 UTME Syllabus)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjectsData.map((subj, idx) => {
              const percent = Math.round((subj.completedTopics / subj.totalTopics) * 100);
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 ${
                    darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-xl">{subj.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0F172A] dark:text-white">{subj.name}</h3>
                        <p className="text-[11px] text-[#475569] dark:text-slate-400">{subj.hours} Hours Logged</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#0F9D58]">{percent}%</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#475569] dark:text-slate-400 font-medium">
                      <span>Topics: {subj.completedTopics} / {subj.totalTopics}</span>
                      <span>Next: {subj.nextTopic}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#0F9D58] h-full transition-all" style={{ width: `${percent}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab('study-hub');
                      showToast(`Opening Study Hub for ${subj.name}...`);
                    }}
                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white font-bold text-xs rounded-xl hover:bg-[#0F9D58] hover:text-white transition-all flex items-center justify-center gap-1"
                  >
                    <span>Continue Study</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* SMART RECOMMENDATIONS & GOALS & MILESTONES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* AI SMART RECOMMENDATIONS (Col 6) */}
          <section className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">auto_awesome</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">Smart AI Recommendations</h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-[#0F9D58] font-bold px-2.5 py-1 rounded-full uppercase">
                  Analytics Driven
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { text: 'Focus on Organic Chemistry this week based on past CBT accuracy (58%).', icon: 'science', color: 'bg-amber-50 dark:bg-slate-800 border-amber-200 text-amber-800 dark:text-amber-300' },
                  { text: 'Increase Mathematics practice by 2 hours to reach your 85% cut-off goal.', icon: 'calculate', color: 'bg-blue-50 dark:bg-slate-800 border-blue-200 text-blue-800 dark:text-blue-300' },
                  { text: 'Schedule another Mock Exam simulation before October 18, 2026.', icon: 'computer', color: 'bg-purple-50 dark:bg-slate-800 border-purple-200 text-purple-800 dark:text-purple-300' },
                  { text: 'Review weak English comprehension passages from 2024 & 2025 archives.', icon: 'menu_book', color: 'bg-emerald-50 dark:bg-slate-800 border-emerald-200 text-emerald-800 dark:text-emerald-300' },
                  { text: 'Maintain your current 7-day study streak for optimal memory retention.', icon: 'local_fire_department', color: 'bg-rose-50 dark:bg-slate-800 border-rose-200 text-rose-800 dark:text-rose-300' },
                ].map((rec, i) => (
                  <div key={i} className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-semibold ${rec.color}`}>
                    <span className="material-symbols-outlined text-lg shrink-0">{rec.icon}</span>
                    <span>{rec.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-[#475569] dark:text-slate-400 italic text-center pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
              Recommendations are generated from demo learning analytics.
            </p>
          </section>

          {/* GOALS & MILESTONES (Col 6) */}
          <section className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">emoji_events</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">Goals &amp; Milestones (2026)</h3>
                </div>
                <span className="text-[10px] bg-blue-100 text-[#2563EB] font-bold px-2.5 py-1 rounded-full uppercase">
                  Progress Tracker
                </span>
              </div>

              <div className="space-y-3">
                {goals.map((goal) => {
                  const pct = Math.round((goal.current / goal.total) * 100);
                  return (
                    <div key={goal.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#0F9D58] text-base">{goal.icon}</span>
                          <span className="font-bold text-[#0F172A] dark:text-white">{goal.title}</span>
                        </div>
                        <span className="font-extrabold text-[#0F9D58]">{goal.current}/{goal.total} {goal.unit} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0F9D58] h-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => showToast('✨ All study milestone badges synchronized!')}
              className="w-full py-2.5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] transition-all"
            >
              Update Milestones
            </button>
          </section>
        </div>

        {/* REMINDERS & NOTIFICATIONS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">notifications_active</span>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">Smart Study Reminders &amp; Alerts</h3>
            </div>
            <span className="text-xs text-[#0F9D58] font-bold">{reminders.length} Active Notifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                  rem.type === 'urgent'
                    ? 'bg-rose-50 dark:bg-slate-800 border-rose-200 dark:border-slate-700 text-rose-800 dark:text-rose-300'
                    : rem.type === 'success'
                    ? 'bg-emerald-50 dark:bg-slate-800 border-emerald-200 dark:border-slate-700 text-emerald-800 dark:text-emerald-300'
                    : 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700 text-blue-800 dark:text-blue-300'
                }`}
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold leading-snug">{rem.title}</p>
                  <p className="text-[10px] opacity-80">{rem.time}</p>
                </div>

                <button
                  onClick={() => dismissReminder(rem.id)}
                  className="p-1 hover:bg-black/10 rounded-lg transition-all"
                  title="Dismiss Reminder"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTIVITY INSIGHTS ANALYTICS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Learning Analytics</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Productivity Insights &amp; Time Allocation
              </h2>
            </div>
            <span className="text-xs font-bold text-[#0F9D58]">2026 Cycle Performance</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Study Hours This Week', val: '28.5 hrs', pct: '100%' },
              { label: 'Most Studied Subject', val: 'Mathematics', pct: '38%' },
              { label: 'Longest Session', val: '2.5 hrs', pct: '85%' },
              { label: 'Completion Rate', val: '88%', pct: '88%' },
              { label: 'Avg Daily Study', val: '4.1 hrs', pct: '75%' },
              { label: 'Consistency Score', val: '92 / 100', pct: '92%' },
            ].map((insight, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">{insight.label}</span>
                <p className="text-base font-extrabold text-[#0F172A] dark:text-white">{insight.val}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0F9D58] h-full" style={{ width: insight.pct }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDY RESOURCES SHORTCUTS */}
        <section className="space-y-6">
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Quick Navigation</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Study Resources &amp; Prep Shortcuts
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { title: 'Study Hub', icon: 'menu_book', tab: 'study-hub' },
              { title: 'CBT Practice', icon: 'computer', tab: 'cbt-practice' },
              { title: 'Mock Exams', icon: 'assignment', tab: 'mock-exam' },
              { title: 'Past Questions', icon: 'quiz', tab: 'past-questions' },
              { title: 'Syllabus 2026', icon: 'list_alt', tab: 'syllabus' },
              { title: 'Textbooks', icon: 'book', tab: 'textbooks' },
              { title: 'Scholarships', icon: 'payments', tab: 'scholarships' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  if (setActiveTab) setActiveTab(item.tab as TabType);
                  showToast(`Navigating to ${item.title}...`);
                }}
                className={`p-4 rounded-3xl border shadow-sm hover:shadow-xl transition-all flex flex-col items-center justify-center text-center space-y-2 group ${
                  darkMode ? 'bg-[#1C2541] border-slate-700 hover:border-[#0F9D58]' : 'bg-white border-[#E2E8F0] hover:border-[#0F9D58]'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center group-hover:bg-[#0F9D58] group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <span className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* EXPORT & SHARE TOOLBAR */}
        <section className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0F9D58] text-2xl">download_for_offline</span>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">Export &amp; Share Study Schedule</h3>
              <p className="text-xs text-[#475569] dark:text-slate-400">Download your 2026 study plan or share with study peers.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleExportPlan('Download PDF Plan')}
              className="py-2.5 px-4 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all flex items-center gap-1.5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
              <span>Download PDF (Demo)</span>
            </button>

            <button
              onClick={() => handleExportPlan('Print Schedule')}
              className="py-2.5 px-4 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold rounded-xl hover:bg-slate-100 transition-all border border-[#E2E8F0] dark:border-slate-700 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print Planner</span>
            </button>

            <button
              onClick={() => handleExportPlan('Share Schedule')}
              className="py-2.5 px-4 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold rounded-xl hover:bg-slate-100 transition-all border border-[#E2E8F0] dark:border-slate-700 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              <span>Share Link</span>
            </button>
          </div>
        </section>

        {/* FAQ SECTION (ACCORDION) */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Help &amp; Clarification</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined text-base text-[#0F9D58] transition-transform ${faqOpenIndex === idx ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {faqOpenIndex === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#475569] dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="bg-[#0F9D58]/40 text-[#82FAAB] border border-[#0F9D58]/60 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              2026 Academic Discipline
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Stay Consistent. Stay Prepared.
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Build productive study habits, track your progress, and stay focused throughout your 2026 admission journey with JAMB Compass.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('study-hub');
                }}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">play_circle</span>
                <span>Start Studying Now</span>
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('dashboard');
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                <span>Return to Dashboard</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
