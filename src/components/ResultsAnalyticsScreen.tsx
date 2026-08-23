import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface ResultsAnalyticsScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface ExamHistoryItem {
  id: string;
  name: string;
  subject: string;
  date: string;
  score: string;
  numericScore: number;
  totalScore: number;
  percentage: number;
  timeUsed: string;
  status: 'Passed' | 'Distinction' | 'Needs Improvement' | 'Reviewed';
  questionsCount: number;
  correctCount: number;
}

export interface SubjectAnalytics {
  id: string;
  name: string;
  category: 'Science' | 'Arts' | 'Commercial' | 'General';
  icon: string;
  colorBg: string;
  colorText: string;
  avgScore: number;
  questionsAttempted: number;
  accuracy: number;
  progress: number;
  badge: 'Mastered' | 'Proficient' | 'Good' | 'Needs Review';
}

const SUBJECT_PERFORMANCE_DATA: SubjectAnalytics[] = [
  {
    id: 'english',
    name: 'English Language',
    category: 'General',
    icon: 'menu_book',
    colorBg: 'bg-emerald-100',
    colorText: 'text-[#0F9D58]',
    avgScore: 84,
    questionsAttempted: 640,
    accuracy: 88,
    progress: 92,
    badge: 'Mastered',
  },
  {
    id: 'maths',
    name: 'Mathematics',
    category: 'Science',
    icon: 'calculate',
    colorBg: 'bg-blue-100',
    colorText: 'text-[#2563EB]',
    avgScore: 78,
    questionsAttempted: 520,
    accuracy: 81,
    progress: 85,
    badge: 'Proficient',
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'Science',
    icon: 'science',
    colorBg: 'bg-purple-100',
    colorText: 'text-purple-600',
    avgScore: 71,
    questionsAttempted: 380,
    accuracy: 74,
    progress: 78,
    badge: 'Good',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'Science',
    icon: 'biotech',
    colorBg: 'bg-rose-100',
    colorText: 'text-rose-600',
    avgScore: 62,
    questionsAttempted: 340,
    accuracy: 65,
    progress: 60,
    badge: 'Needs Review',
  },
  {
    id: 'biology',
    name: 'Biology',
    category: 'Science',
    icon: 'eco',
    colorBg: 'bg-emerald-100',
    colorText: 'text-emerald-700',
    avgScore: 80,
    questionsAttempted: 290,
    accuracy: 83,
    progress: 88,
    badge: 'Proficient',
  },
  {
    id: 'economics',
    name: 'Economics',
    category: 'Commercial',
    icon: 'payments',
    colorBg: 'bg-amber-100',
    colorText: 'text-amber-700',
    avgScore: 76,
    questionsAttempted: 210,
    accuracy: 79,
    progress: 80,
    badge: 'Good',
  },
  {
    id: 'government',
    name: 'Government',
    category: 'Arts',
    icon: 'gavel',
    colorBg: 'bg-indigo-100',
    colorText: 'text-indigo-700',
    avgScore: 74,
    questionsAttempted: 180,
    accuracy: 76,
    progress: 75,
    badge: 'Good',
  },
  {
    id: 'literature',
    name: 'Literature in English',
    category: 'Arts',
    icon: 'auto_stories',
    colorBg: 'bg-pink-100',
    colorText: 'text-pink-700',
    avgScore: 82,
    questionsAttempted: 150,
    accuracy: 85,
    progress: 86,
    badge: 'Mastered',
  },
  {
    id: 'commerce',
    name: 'Commerce',
    category: 'Commercial',
    icon: 'storefront',
    colorBg: 'bg-cyan-100',
    colorText: 'text-cyan-700',
    avgScore: 79,
    questionsAttempted: 130,
    accuracy: 80,
    progress: 82,
    badge: 'Good',
  },
  {
    id: 'crs',
    name: 'CRS (Christian Religion)',
    category: 'Arts',
    icon: 'church',
    colorBg: 'bg-[#0F9D58]/10',
    colorText: 'text-[#0F9D58]',
    avgScore: 88,
    questionsAttempted: 110,
    accuracy: 90,
    progress: 94,
    badge: 'Mastered',
  },
  {
    id: 'irs',
    name: 'IRS (Islamic Religion)',
    category: 'Arts',
    icon: 'mosque',
    colorBg: 'bg-teal-100',
    colorText: 'text-teal-700',
    avgScore: 86,
    questionsAttempted: 90,
    accuracy: 89,
    progress: 91,
    badge: 'Mastered',
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'General',
    icon: 'public',
    colorBg: 'bg-sky-100',
    colorText: 'text-sky-700',
    avgScore: 73,
    questionsAttempted: 95,
    accuracy: 75,
    progress: 72,
    badge: 'Good',
  },
  {
    id: 'agriculture',
    name: 'Agricultural Science',
    category: 'Science',
    icon: 'agriculture',
    colorBg: 'bg-lime-100',
    colorText: 'text-lime-700',
    avgScore: 81,
    questionsAttempted: 105,
    accuracy: 84,
    progress: 85,
    badge: 'Proficient',
  },
];

const EXAM_HISTORY_DATA: ExamHistoryItem[] = [
  {
    id: 'ex-1',
    name: 'General UTME Full Mock 2026',
    subject: '4 Subjects (Eng, Bio, Chem, Phy)',
    date: 'Jul 28, 2026',
    score: '312 / 400',
    numericScore: 312,
    totalScore: 400,
    percentage: 78,
    timeUsed: '1h 48m',
    status: 'Distinction',
    questionsCount: 180,
    correctCount: 141,
  },
  {
    id: 'ex-2',
    name: 'Medical Sciences Super Mock',
    subject: '4 Subjects (Eng, Bio, Chem, Phy)',
    date: 'Jul 24, 2026',
    score: '294 / 400',
    numericScore: 294,
    totalScore: 400,
    percentage: 73.5,
    timeUsed: '1h 55m',
    status: 'Passed',
    questionsCount: 180,
    correctCount: 132,
  },
  {
    id: 'ex-3',
    name: 'Mathematics CBT Drill #14',
    subject: 'Mathematics',
    date: 'Jul 21, 2026',
    score: '44 / 50',
    numericScore: 44,
    totalScore: 50,
    percentage: 88,
    timeUsed: '32m',
    status: 'Distinction',
    questionsCount: 50,
    correctCount: 44,
  },
  {
    id: 'ex-4',
    name: 'Use of English Comprehension',
    subject: 'English Language',
    date: 'Jul 18, 2026',
    score: '52 / 60',
    numericScore: 52,
    totalScore: 60,
    percentage: 86.6,
    timeUsed: '41m',
    status: 'Distinction',
    questionsCount: 60,
    correctCount: 52,
  },
  {
    id: 'ex-5',
    name: 'Organic Chemistry & Stoichiometry',
    subject: 'Chemistry',
    date: 'Jul 15, 2026',
    score: '26 / 40',
    numericScore: 26,
    totalScore: 40,
    percentage: 65,
    timeUsed: '28m',
    status: 'Needs Improvement',
    questionsCount: 40,
    correctCount: 26,
  },
  {
    id: 'ex-6',
    name: 'Physics Mechanics & Waves',
    subject: 'Physics',
    date: 'Jul 11, 2026',
    score: '33 / 40',
    numericScore: 33,
    totalScore: 40,
    percentage: 82.5,
    timeUsed: '30m',
    status: 'Passed',
    questionsCount: 40,
    correctCount: 33,
  },
];

export const ResultsAnalyticsScreen: React.FC<ResultsAnalyticsScreenProps> = ({ setActiveTab }) => {
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dark Focus Mode Toggle
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Time Range Filter for Performance Trends
  const [trendTimeframe, setTrendTimeframe] = useState<'Week' | 'Month' | 'Year'>('Month');
  const [activeTrendMetric, setActiveTrendMetric] = useState<string>('Weekly Scores');

  // Subject Performance Category Filter & Search
  const [subjectCategoryFilter, setSubjectCategoryFilter] = useState<string>('All');
  const [subjectSearchQuery, setSubjectSearchQuery] = useState<string>('');

  // Exam History Filter & Search
  const [historySearchQuery, setHistorySearchQuery] = useState<string>('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>('All');

  // Exam Review Modal state
  const [selectedReviewExam, setSelectedReviewExam] = useState<ExamHistoryItem | null>(null);

  // Email Report Modal State
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [emailAddressInput, setEmailAddressInput] = useState<string>('');

  // Interactive Calendar Active Day
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(28);

  // Learning Goals Checkbox State
  const [goalsState, setGoalsState] = useState([
    { id: 'g1', title: 'Complete 5 CBT Sessions', completed: 4, target: 5, unit: 'Sessions', percentage: 80, isDone: false },
    { id: 'g2', title: 'Study 10 Hours This Week', completed: 8.5, target: 10, unit: 'Hours', percentage: 85, isDone: false },
    { id: 'g3', title: 'Improve Mathematics to 85%', completed: 81, target: 85, unit: '% Score', percentage: 95, isDone: false },
    { id: 'g4', title: 'Finish Biology Syllabus Topics', completed: 18, target: 20, unit: 'Topics', percentage: 90, isDone: false },
    { id: 'g5', title: 'Take 2 Full Mock Exams', completed: 2, target: 2, unit: 'Mocks', percentage: 100, isDone: true },
  ]);

  const toggleGoal = (id: string) => {
    setGoalsState((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextDone = !g.isDone;
          showToast(nextDone ? `Goal "${g.title}" marked as completed! 🎉` : `Goal re-opened`);
          return { ...g, isDone: nextDone, percentage: nextDone ? 100 : Math.round((g.completed / g.target) * 100) };
        }
        return g;
      })
    );
  };

  // Accordion FAQ Open Index
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Filtered Subjects
  const filteredSubjects = useMemo(() => {
    return SUBJECT_PERFORMANCE_DATA.filter((s) => {
      const matchesCategory = subjectCategoryFilter === 'All' || s.category === subjectCategoryFilter;
      const matchesSearch = s.name.toLowerCase().includes(subjectSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [subjectCategoryFilter, subjectSearchQuery]);

  // Filtered Exam History
  const filteredHistory = useMemo(() => {
    return EXAM_HISTORY_DATA.filter((item) => {
      const matchesStatus = historyStatusFilter === 'All' || item.status === historyStatusFilter;
      const matchesSearch =
        item.name.toLowerCase().includes(historySearchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(historySearchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [historyStatusFilter, historySearchQuery]);

  // Handle Export / Share Actions
  const handleDownloadPDF = () => {
    showToast('Generating official JAMB Compass Analytics PDF Report...');
    setTimeout(() => {
      showToast('Report downloaded successfully! 📄');
    }, 1500);
  };

  const handlePrintSummary = () => {
    showToast('Opening print dialog...');
    window.print();
  };

  const handleShareResults = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://jambcompass.ng/analytics/student-report-2026');
      showToast('Results link copied to clipboard! 📋');
    } else {
      showToast('Share link ready!');
    }
  };

  const handleSendEmailReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddressInput || !emailAddressInput.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setShowEmailModal(false);
    showToast(`Progress report successfully dispatched to ${emailAddressInput}! ✉️`);
    setEmailAddressInput('');
  };

  return (
    <div
      className={`w-full max-w-full overflow-x-hidden min-h-screen font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'
      } pb-24`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP BREADCRUMB NAV */}
      <div className={`${isDarkMode ? 'bg-[#1C2541] border-slate-800' : 'bg-[#F8FAFC] border-[#E2E8F0]'} border-b`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2 text-[#475569]">
            <button
              onClick={() => setActiveTab && setActiveTab('home')}
              className="hover:text-[#0F9D58] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => setActiveTab && setActiveTab('dashboard')}
              className="hover:text-[#0F9D58] transition-colors"
            >
              Dashboard
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-[#0F9D58] font-bold">Results &amp; Analytics</span>
          </div>

          {/* Dark Mode Focus Toggle */}
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              showToast(!isDarkMode ? 'Dark Focus Workspace enabled' : 'Light Workspace enabled');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isDarkMode
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0] hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
            <span>{isDarkMode ? 'Light Mode' : 'Focus Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* PAGE HEADER / HERO */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/25 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">auto_graph</span>
              <span>JAMB Compass Diagnostic Intelligence</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              My Results &amp; <span className="text-[#82FAAB]">Analytics</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Track your learning journey, monitor performance trends, and discover opportunities to improve. Detailed diagnostic feedback to ensure peak readiness on exam day.
            </p>

            {/* Quick Action Pills */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadPDF}
                className="py-2.5 px-4 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download Report</span>
              </button>

              <button
                onClick={() => setShowEmailModal(true)}
                className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>Email to Parent/Tutor</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration Graphic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">analytics</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">UTME Readiness Score</p>
                    <p className="text-2xl font-extrabold font-display text-[#82FAAB]">86 / 100</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  High Admission Odds
                </span>
              </div>

              {/* Progress Bar in Graphic */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Target UTME Score: 320</span>
                  <span className="text-[#82FAAB]">Projected: 312</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#2563EB] to-[#0F9D58] h-full rounded-full w-[88%]"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                <div className="bg-[#0F172A]/70 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[9px] uppercase">Accuracy</span>
                  <span className="font-bold text-white text-xs">78.5%</span>
                </div>
                <div className="bg-[#0F172A]/70 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[9px] uppercase">Questions</span>
                  <span className="font-bold text-white text-xs">2,450</span>
                </div>
                <div className="bg-[#0F172A]/70 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[9px] uppercase">Streak</span>
                  <span className="font-bold text-amber-400 text-xs">12 Days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* 1. PERFORMANCE OVERVIEW KPI CARDS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Key Metrics</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Performance Overview</h2>
            </div>
            <span className="text-xs text-[#475569] font-medium hidden sm:block">Updated after every CBT test</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#0F9D58]">
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">grade</span>
                </div>
                <span className="text-[10px] font-bold bg-[#0F9D58]/10 text-[#0F9D58] px-2 py-0.5 rounded-full">
                  +3.2% vs last week
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Average Score</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">284 <span className="text-xs font-medium text-[#475569]">/ 400</span></h3>
                <p className="text-[11px] text-[#475569] mt-1">71.0% overall performance</p>
              </div>
            </div>

            {/* KPI 2 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#2563EB]">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">military_tech</span>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">
                  Personal Best
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Highest Score</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">342 <span className="text-xs font-medium text-[#475569]">/ 400</span></h3>
                <p className="text-[11px] text-[#16A34A] font-bold mt-1">UTME Distinction Level</p>
              </div>
            </div>

            {/* KPI 3 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-purple-600">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">quiz</span>
                </div>
                <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  24 CBT + 14 Mocks
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Total Tests Taken</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">38</h3>
                <p className="text-[11px] text-[#475569] mt-1">100% submission rate</p>
              </div>
            </div>

            {/* KPI 4 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-amber-500">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  2,450 Answered
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Questions Attempted</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">2,450</h3>
                <p className="text-[11px] text-[#475569] mt-1">Avg 40s per question</p>
              </div>
            </div>

            {/* KPI 5 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#16A34A]">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">target</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-[#16A34A] px-2 py-0.5 rounded-full">
                  Target: 85%
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Accuracy Rate</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">78.5%</h3>
                <p className="text-[11px] text-[#475569] mt-1">1,923 correct answers</p>
              </div>
            </div>

            {/* KPI 6 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#2563EB]">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">
                  This Month
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Study Hours</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">54.2 <span className="text-xs font-medium text-[#475569]">hrs</span></h3>
                <p className="text-[11px] text-[#475569] mt-1">1.8 hrs / day average</p>
              </div>
            </div>

            {/* KPI 7 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-rose-500">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">local_fire_department</span>
                </div>
                <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                  Active Streak
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Study Streak</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] mt-0.5">12 <span className="text-xs font-medium text-[#475569]">Days</span> 🔥</h3>
                <p className="text-[11px] text-[#475569] mt-1">Keep it going tomorrow!</p>
              </div>
            </div>

            {/* KPI 8 */}
            <div className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#0F9D58]">
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">insights</span>
                </div>
                <span className="text-[10px] font-bold bg-[#0F9D58]/10 text-[#0F9D58] px-2 py-0.5 rounded-full">
                  Index Score
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Overall Readiness</p>
                <h3 className="text-2xl font-extrabold font-display text-[#0F9D58] mt-0.5">86 <span className="text-xs font-medium text-[#475569]">/ 100</span></h3>
                <p className="text-[11px] text-[#475569] mt-1">High probability of success</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PERFORMANCE TRENDS (INTERACTIVE CHARTS) */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Interactive Analytics</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Performance Trends</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-1 rounded-2xl flex items-center gap-1 text-xs font-bold">
                {(['Week', 'Month', 'Year'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTrendTimeframe(t);
                      showToast(`Switched view to ${t}ly trends`);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      trendTimeframe === t
                        ? 'bg-[#0F9D58] text-white shadow-xs'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['Weekly Scores', 'Monthly Performance', 'Accuracy Trend', 'Study Hours', 'Improvement Rate'].map((m) => (
              <button
                key={m}
                onClick={() => setActiveTrendMetric(m)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  activeTrendMetric === m
                    ? 'bg-[#0F9D58] text-white border-[#0F9D58] shadow-sm'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                    : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-[#0F9D58]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Visual SVG Chart Representation */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs text-[#475569] font-medium">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0F9D58]"></span>
                <span>Actual UTME Score (Scaled /400)</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#2563EB] stroke-dashed"></span>
                <span>Benchmark Goal (300 Score)</span>
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full relative pt-6 pb-8 border-b border-l border-slate-300 dark:border-slate-700 flex items-end justify-between px-4 sm:px-8">
              {/* Goal line */}
              <div className="absolute top-[30%] left-0 right-0 border-b-2 border-dashed border-[#2563EB]/40 flex justify-end pr-2">
                <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">Target: 300</span>
              </div>

              {/* Chart Bars */}
              {[
                { label: 'Week 1', score: 240, height: '52%', detail: '240 / 400 (60%)' },
                { label: 'Week 2', score: 258, height: '60%', detail: '258 / 400 (64.5%)' },
                { label: 'Week 3', score: 272, height: '68%', detail: '272 / 400 (68%)' },
                { label: 'Week 4', score: 286, height: '74%', detail: '286 / 400 (71.5%)' },
                { label: 'Week 5', score: 294, height: '78%', detail: '294 / 400 (73.5%)' },
                { label: 'Week 6', score: 312, height: '84%', detail: '312 / 400 (78%)', isHigh: true },
                { label: 'Week 7 (Latest)', score: 328, height: '90%', detail: '328 / 400 (82%)', isLatest: true },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative">
                  {/* Hover tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-xl whitespace-nowrap z-20 pointer-events-none">
                    {item.detail}
                  </div>

                  <div className="text-[11px] font-bold text-[#0F172A] dark:text-white">{item.score}</div>

                  <div
                    style={{ height: item.height }}
                    className={`w-8 sm:w-12 rounded-t-2xl transition-all duration-500 ${
                      item.isLatest
                        ? 'bg-gradient-to-t from-[#0F9D58] to-[#16A34A] shadow-md ring-2 ring-[#0F9D58]/30'
                        : item.isHigh
                        ? 'bg-[#0F9D58]'
                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-[#0F9D58]/60'
                    }`}
                  ></div>

                  <span className="text-[11px] font-semibold text-[#475569]">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-[#475569] pt-2">
              <span>Overall Growth: <strong className="text-[#16A34A]">+88 Points</strong> over 7 weeks</span>
              <span>Next Recommended Milestone: <strong className="text-[#2563EB]">330+ Score</strong></span>
            </div>
          </div>
        </section>

        {/* 3. SUBJECT PERFORMANCE GRID */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Subject Breakdown</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Subject Performance ({SUBJECT_PERFORMANCE_DATA.length} Subjects)</h2>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search subject..."
                value={subjectSearchQuery}
                onChange={(e) => setSubjectSearchQuery(e.target.value)}
                className="py-2 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A]"
              />

              <select
                value={subjectCategoryFilter}
                onChange={(e) => setSubjectCategoryFilter(e.target.value)}
                className="py-2 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]"
              >
                <option value="All">All Categories</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Commercial">Commercial</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSubjects.map((sub) => {
              let badgeColor = 'bg-slate-100 text-slate-700';
              if (sub.badge === 'Mastered') badgeColor = 'bg-emerald-100 text-[#0F9D58]';
              if (sub.badge === 'Proficient') badgeColor = 'bg-blue-100 text-[#2563EB]';
              if (sub.badge === 'Good') badgeColor = 'bg-amber-100 text-amber-700';
              if (sub.badge === 'Needs Review') badgeColor = 'bg-rose-100 text-rose-700 animate-pulse';

              return (
                <div
                  key={sub.id}
                  className={`p-5 rounded-3xl border shadow-xs hover:shadow-xl transition-all space-y-4 flex flex-col justify-between ${
                    isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl ${sub.colorBg} ${sub.colorText} flex items-center justify-center shadow-xs`}>
                        <span className="material-symbols-outlined text-xl">{sub.icon}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${badgeColor}`}>
                        {sub.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold font-display text-[#0F172A]">{sub.name}</h3>
                      <p className="text-xs text-[#475569]">{sub.questionsAttempted} Questions Attempted</p>
                    </div>

                    {/* Progress Bar & Score */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#475569]">Avg Score</span>
                        <span className="font-bold text-[#0F9D58]">{sub.avgScore}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${sub.avgScore}%` }}
                          className="bg-[#0F9D58] h-full rounded-full transition-all duration-500"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#475569]">
                    <span>Accuracy: <strong className="text-[#0F172A]">{sub.accuracy}%</strong></span>
                    <button
                      onClick={() => {
                        showToast(`Launching ${sub.name} CBT Practice Drill!`);
                        if (setActiveTab) setActiveTab('cbt-practice');
                      }}
                      className="text-[#0F9D58] hover:underline font-bold flex items-center gap-0.5 text-xs"
                    >
                      <span>Practise</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. TOP STRENGTHS & AREAS FOR IMPROVEMENT (BENTO GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Top Strengths */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border shadow-md space-y-5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center gap-2.5 text-[#0F9D58] border-b border-[#E2E8F0] pb-3">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              <div>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">Top Strengths</h3>
                <p className="text-xs text-[#475569]">Key areas where you consistently outperform national benchmarks.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0F9D58] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Excellent in Mathematics</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Top 5% speed &amp; accuracy in Algebra, Trigonometry, and Logarithm expansions.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">speed</span>
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Fast Response Time</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Averages 32 seconds per question in Use of English (15% faster than time limit).</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">target</span>
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">High Accuracy in Comprehension</h4>
                  <p className="text-xs text-[#475569] mt-0.5">92% accuracy on JAMB recommended novel passage and context lexis drills.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">local_fire_department</span>
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Consistent Study Habit</h4>
                  <p className="text-xs text-[#475569] mt-0.5">Completed daily practice drills 12 days in a row without breaking streak.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className={`lg:col-span-6 p-6 rounded-3xl border shadow-md space-y-5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center gap-2.5 text-rose-600 border-b border-[#E2E8F0] pb-3">
              <span className="material-symbols-outlined text-2xl">trending_down</span>
              <div>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">Areas for Improvement</h3>
                <p className="text-xs text-[#475569]">Targeted weak points to focus on before your next mock exam.</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Organic Chemistry &amp; Alkenes</h4>
                  </div>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full">
                    Critical Weakness (42%)
                  </span>
                </div>
                <p className="text-xs text-[#475569]">Suggested Resource: <em>New School Chemistry by Ababio (Chapter 14)</em></p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      showToast('Opening Organic Chemistry CBT Drill...');
                      if (setActiveTab) setActiveTab('cbt-practice');
                    }}
                    className="py-1.5 px-3 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <span>Practice Now</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Reading Comprehension Context Inference</h4>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">
                    Moderate (61%)
                  </span>
                </div>
                <p className="text-xs text-[#475569]">Suggested Resource: <em>JAMB Novel Passage &amp; Diction Guide</em></p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      showToast('Opening Use of English Drill...');
                      if (setActiveTab) setActiveTab('cbt-practice');
                    }}
                    className="py-1.5 px-3 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <span>Practice Now</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Algebra &amp; Logarithmic Expansions</h4>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">
                    Moderate (65%)
                  </span>
                </div>
                <p className="text-xs text-[#475569]">Suggested Resource: <em>New General Mathematics Chapter 4: Surds &amp; Logarithms</em></p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      showToast('Opening Maths Logarithms Drill...');
                      if (setActiveTab) setActiveTab('cbt-practice');
                    }}
                    className="py-1.5 px-3 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <span>Practice Now</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SCORE DISTRIBUTION & TIME METRICS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Answer Breakdown</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Score Distribution &amp; Time Management</h2>
            </div>
            <span className="text-xs text-[#475569] font-medium hidden sm:block">Based on 2,450 Total Questions</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Pie / Donut Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="3.8" />
                  {/* Correct Answers (78.5%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#0F9D58"
                    strokeWidth="3.8"
                    strokeDasharray="78.5 21.5"
                    strokeDashoffset="0"
                  />
                  {/* Incorrect Answers (15.6%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="3.8"
                    strokeDasharray="15.6 84.4"
                    strokeDashoffset="-78.5"
                  />
                  {/* Skipped (3.9%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3.8"
                    strokeDasharray="3.9 96.1"
                    strokeDashoffset="-94.1"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold font-display text-[#0F172A] dark:text-white block">78.5%</span>
                  <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">Accuracy Rate</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Bars */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0F9D58]"></span>
                    <span>Correct Answers</span>
                  </span>
                  <span className="font-bold text-[#0F9D58]">1,923 (78.5%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0F9D58] h-full rounded-full w-[78.5%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600"></span>
                    <span>Incorrect Answers</span>
                  </span>
                  <span className="font-bold text-red-600">382 (15.6%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full rounded-full w-[15.6%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span>Skipped Questions</span>
                  </span>
                  <span className="font-bold text-amber-500">95 (3.9%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[3.9%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <span>Flagged Questions</span>
                  </span>
                  <span className="font-bold text-blue-600">50 (2.0%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-[2%]"></div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] text-xs font-medium text-[#475569] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58] text-base">timer</span>
                  <span>Average Speed: <strong>40s / question</strong> (Official limit: 45s)</span>
                </span>
                <span className="text-[#16A34A] font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded-md">Optimal Pace</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RECENT EXAM HISTORY TABLE */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Session Logs</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Recent Exam History</h2>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search history..."
                value={historySearchQuery}
                onChange={(e) => setHistorySearchQuery(e.target.value)}
                className="py-2 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A]"
              />

              <select
                value={historyStatusFilter}
                onChange={(e) => setHistoryStatusFilter(e.target.value)}
                className="py-2 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]"
              >
                <option value="All">All Statuses</option>
                <option value="Distinction">Distinction</option>
                <option value="Passed">Passed</option>
                <option value="Needs Improvement">Needs Improvement</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#475569] uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-4">Exam Name</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Time Used</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredHistory.map((item) => {
                  let badgeStyle = 'bg-slate-100 text-slate-700';
                  if (item.status === 'Distinction') badgeStyle = 'bg-emerald-100 text-[#0F9D58] font-bold';
                  if (item.status === 'Passed') badgeStyle = 'bg-blue-100 text-[#2563EB] font-bold';
                  if (item.status === 'Needs Improvement') badgeStyle = 'bg-rose-100 text-rose-700 font-bold';

                  return (
                    <tr key={item.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#0F172A] dark:text-white">{item.name}</td>
                      <td className="py-4 px-4 text-[#475569]">{item.subject}</td>
                      <td className="py-4 px-4 text-[#475569] whitespace-nowrap">{item.date}</td>
                      <td className="py-4 px-4 font-extrabold text-[#0F9D58] whitespace-nowrap">{item.score}</td>
                      <td className="py-4 px-4 text-[#475569] whitespace-nowrap">{item.timeUsed}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] ${badgeStyle}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedReviewExam(item)}
                          className="py-1.5 px-3 bg-slate-100 hover:bg-[#0F9D58] hover:text-white text-[#0F172A] font-bold text-xs rounded-xl transition-all border border-[#E2E8F0]"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. LEARNING GOALS & STUDY CALENDAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Learning Goals */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border shadow-md space-y-5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Targets</span>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">Learning Goals</h3>
              </div>
              <span className="text-xs text-[#0F9D58] font-bold">
                {goalsState.filter((g) => g.isDone).length} / {goalsState.length} Done
              </span>
            </div>

            <div className="space-y-4">
              {goalsState.map((goal) => (
                <div key={goal.id} className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={goal.isDone}
                        onChange={() => toggleGoal(goal.id)}
                        className="w-4 h-4 text-[#0F9D58] rounded border-slate-300 focus:ring-[#0F9D58]"
                      />
                      <span className={`text-xs font-bold ${goal.isDone ? 'line-through text-slate-400' : 'text-[#0F172A]'}`}>
                        {goal.title}
                      </span>
                    </label>
                    <span className="text-[11px] font-bold text-[#475569]">
                      {goal.completed} / {goal.target} {goal.unit}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${goal.percentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${goal.isDone ? 'bg-[#0F9D58]' : 'bg-[#2563EB]'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Calendar */}
          <div className={`lg:col-span-7 p-6 rounded-3xl border shadow-md space-y-5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Monthly Activity</span>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">Study Calendar (July 2026)</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#475569]">
                <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <span>Jul 2026</span>
                <button className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#475569] uppercase py-1">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {/* Days 1 to 31 */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isStudyDay = [2, 5, 8, 12, 15, 18, 20, 22, 24, 26, 28, 29].includes(day);
                  const isExamDay = [14, 21].includes(day);
                  const isMockDay = [24, 28].includes(day);
                  const isSelected = selectedCalendarDay === day;

                  let dayStyle = 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200';
                  if (isSelected) dayStyle = 'bg-[#0F9D58] text-white font-bold ring-2 ring-[#0F9D58]/30';

                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedCalendarDay(day);
                        showToast(`Logged session for July ${day}, 2026`);
                      }}
                      className={`h-10 rounded-2xl flex flex-col items-center justify-center relative transition-all ${dayStyle}`}
                    >
                      <span className="text-xs">{day}</span>
                      <div className="flex gap-0.5 mt-0.5">
                        {isStudyDay && <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>}
                        {isExamDay && <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>}
                        {isMockDay && <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#475569] font-medium pt-3 border-t border-[#E2E8F0]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                  <span>Study Days</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                  <span>CBT Exam Days</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span>Full Mock Exams</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 8. PERSONALISED AI INSIGHTS */}
        <section className="space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Diagnostic AI</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">Personalised Insights &amp; Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0F9D58] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Increase Chemistry Practice</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Organic reactions accuracy is currently 42%. Practising 20 targeted questions daily could boost your overall score by 15 points.
              </p>
              <button
                onClick={() => {
                  showToast('Navigating to Chemistry Practice...');
                  if (setActiveTab) setActiveTab('cbt-practice');
                }}
                className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1 pt-1"
              >
                <span>Start Drill</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-xl">calculate</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Review Algebra Topics</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Logarithm solution speed dropped by 12% in your last mock. Revisit Chapter 4 formulas in Recommended Textbooks.
              </p>
              <button
                onClick={() => {
                  showToast('Opening Recommended Textbooks...');
                  if (setActiveTab) setActiveTab('textbooks');
                }}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 pt-1"
              >
                <span>Open Textbook</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-xl">workspace_premium</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Schedule Next Mock Exam</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                You are in peak preparation condition with an 86/100 readiness index. Take a full 4-subject mock this weekend.
              </p>
              <button
                onClick={() => {
                  showToast('Navigating to Mock Exam Centre...');
                  if (setActiveTab) setActiveTab('mock-exam');
                }}
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 pt-1"
              >
                <span>Go to Mock Centre</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* 9. ACHIEVEMENTS & BADGES */}
        <section className="space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Milestones</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">Achievements &amp; Badges</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { title: 'First Test', icon: 'flag', status: 'Unlocked', color: 'bg-emerald-100 text-[#0F9D58]' },
              { title: 'Top Performer', icon: 'military_tech', status: 'Unlocked', color: 'bg-blue-100 text-[#2563EB]' },
              { title: '90% Accuracy', icon: 'target', status: 'Unlocked', color: 'bg-purple-100 text-purple-700' },
              { title: '1,000 Qs', icon: 'bolt', status: 'Unlocked', color: 'bg-amber-100 text-amber-700' },
              { title: '7-Day Streak', icon: 'local_fire_department', status: 'Unlocked', color: 'bg-rose-100 text-rose-700' },
              { title: 'Mock Master', icon: 'workspace_premium', status: 'Unlocked', color: 'bg-emerald-100 text-[#0F9D58]' },
              { title: 'Subject Expert', icon: 'school', status: 'Unlocked', color: 'bg-indigo-100 text-indigo-700' },
              { title: 'Consistency', icon: 'stars', status: 'Unlocked', color: 'bg-cyan-100 text-cyan-700' },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-3xl border shadow-xs text-center space-y-2 flex flex-col items-center justify-center hover:scale-105 transition-transform ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${badge.color} flex items-center justify-center shadow-xs`}>
                  <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                </div>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white leading-tight">{badge.title}</h4>
                <span className="text-[9px] font-bold text-[#16A34A] uppercase bg-emerald-50 px-2 py-0.5 rounded-full">
                  {badge.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 10. DEMO LEADERBOARD */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">National Rankings</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">UTME Aspirants Leaderboard</h2>
            </div>
            <span className="text-xs text-[#475569] font-medium hidden sm:block">Updated Weekly</span>
          </div>

          <div className="space-y-3">
            {[
              { rank: 1, name: 'Chinedu Okonkwo', target: 'UNILAG - Medicine', score: '354 / 400', pts: '4,850 Pts', badge: '🥇 Gold' },
              { rank: 2, name: 'Amina Bello', target: 'ABU Zaria - Software Eng.', score: '348 / 400', pts: '4,620 Pts', badge: '🥈 Silver' },
              { rank: 3, name: 'Emeka Nwosu', target: 'UI - Pharmacy', score: '342 / 400', pts: '4,410 Pts', badge: '🥉 Bronze' },
              { rank: 4, name: 'Fatimah Adebayo', target: 'OAU - Law', score: '336 / 400', pts: '4,200 Pts', badge: 'Top 1%' },
              { rank: 5, name: 'Tunde Bakare (You)', target: 'UNILAG - Mechanical Eng.', score: '312 / 400', pts: '3,890 Pts', badge: 'Top 3%', isUser: true },
            ].map((candidate) => (
              <div
                key={candidate.rank}
                className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 transition-all ${
                  candidate.isUser
                    ? 'bg-[#0F9D58]/10 border-[#0F9D58] ring-2 ring-[#0F9D58]/20'
                    : isDarkMode
                    ? 'bg-slate-800/60 border-slate-700'
                    : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                      candidate.rank === 1
                        ? 'bg-amber-400 text-white'
                        : candidate.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : candidate.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    #{candidate.rank}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                      <span>{candidate.name}</span>
                      {candidate.isUser && (
                        <span className="text-[10px] bg-[#0F9D58] text-white px-2 py-0.5 rounded-full uppercase">Your Profile</span>
                      )}
                    </h4>
                    <p className="text-[11px] text-[#475569]">{candidate.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-[#0F9D58] font-extrabold">{candidate.score}</span>
                  <span className="text-[#475569]">{candidate.pts}</span>
                  <span className="bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-xl text-[10px] text-[#0F172A] dark:text-white">
                    {candidate.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. EXPORT & SHARE BUTTONS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-4 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-2">
            <div>
              <h3 className="text-lg font-bold font-display text-[#0F172A]">Export &amp; Share Analytics</h3>
              <p className="text-xs text-[#475569]">Save, print, or share your progress report with parents and teachers.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="py-3 px-5 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">picture_as_pdf</span>
              <span>Download Progress Report</span>
            </button>

            <button
              onClick={handlePrintSummary}
              className="py-3 px-5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Print Summary</span>
            </button>

            <button
              onClick={handleShareResults}
              className="py-3 px-5 bg-[#F8FAFC] hover:bg-slate-200 text-[#0F172A] font-bold text-xs rounded-2xl border border-[#E2E8F0] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">share</span>
              <span>Share Results</span>
            </button>

            <button
              onClick={() => setShowEmailModal(true)}
              className="py-3 px-5 bg-[#F8FAFC] hover:bg-slate-200 text-[#0F172A] font-bold text-xs rounded-2xl border border-[#E2E8F0] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              <span>Email Report</span>
            </button>
          </div>
        </section>

        {/* 12. RELATED RESOURCES */}
        <section className="space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Quick Links</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">Related Resources</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'CBT Practice', tab: 'cbt-practice', icon: 'quiz', color: 'bg-emerald-100 text-[#0F9D58]' },
              { label: 'Mock Exam', tab: 'mock-exam', icon: 'school', color: 'bg-blue-100 text-[#2563EB]' },
              { label: 'Study Hub', tab: 'study-hub', icon: 'auto_stories', color: 'bg-purple-100 text-purple-700' },
              { label: 'JAMB Syllabus', tab: 'syllabus', icon: 'menu_book', color: 'bg-amber-100 text-amber-700' },
              { label: 'Past Questions', tab: 'past-questions', icon: 'history_edu', color: 'bg-rose-100 text-rose-700' },
              { label: 'Textbooks', tab: 'textbooks', icon: 'book', color: 'bg-cyan-100 text-cyan-700' },
            ].map((res) => (
              <button
                key={res.label}
                onClick={() => {
                  showToast(`Opening ${res.label}...`);
                  if (setActiveTab) setActiveTab(res.tab as TabType);
                }}
                className={`p-4 rounded-3xl border shadow-xs hover:shadow-md transition-all text-center space-y-2 flex flex-col items-center justify-center group ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl ${res.color} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-xl">{res.icon}</span>
                </div>
                <span className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                  {res.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 13. LATEST LEARNING TIPS */}
        <section className="space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Educational Insights</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">Latest Learning Tips</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'How to Improve Accuracy',
                desc: '5 proven strategies to eliminate silly calculation traps and options guesswork in UTME.',
                icon: 'target',
              },
              {
                title: 'Managing Exam Time',
                desc: 'Pacing 180 questions across 120 minutes with zero panic during Use of English passages.',
                icon: 'timer',
              },
              {
                title: 'Avoiding Common Traps',
                desc: 'Techniques for option elimination when facing tricky distractors in JAMB past questions.',
                icon: 'warning',
              },
              {
                title: 'Building a Study Plan',
                desc: 'Structuring 4-subject UTME revision according to your weakest syllabus topics.',
                icon: 'edit_calendar',
              },
            ].map((tip, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border shadow-xs space-y-3 flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">{tip.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">{tip.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{tip.desc}</p>
                </div>
                <button
                  onClick={() => showToast(`Reading "${tip.title}" guide`)}
                  className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Read Guide</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 14. FAQ ACCORDION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Help &amp; Support</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How is my readiness score calculated?',
                a: 'Your Readiness Score incorporates your overall average score, accuracy rate across attempted questions, syllabus topic coverage, and time management consistency over your last 5 exam sessions.',
              },
              {
                q: 'How often are analytics updated?',
                a: 'All dashboard analytics, subject accuracy graphs, and readiness metrics update instantly upon completing any CBT practice drill or full mock exam.',
              },
              {
                q: 'Can I export my results?',
                a: 'Yes! You can download a clean PDF report, print a physical summary, or email your performance report directly to your parents or tutors.',
              },
              {
                q: 'Why do some subjects have lower scores?',
                a: 'Lower scores highlight specific syllabus topics that need further revision. Check your "Areas for Improvement" cards to take targeted subject drills.',
              },
              {
                q: 'How can I improve my performance?',
                a: 'Review textbook chapters for weak topics, practise 30 minutes of CBT daily, and take full-length mock exams weekly under strict exam timing.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#E2E8F0] dark:border-slate-700 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between hover:bg-[#F8FAFC] dark:hover:bg-slate-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-base">
                    {openFaqIdx === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaqIdx === idx && (
                  <div className="p-4 pt-0 text-xs text-[#475569] leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-[#F8FAFC]/50 dark:bg-slate-800/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 15. CALL TO ACTION BANNER */}
        <section className="relative w-full rounded-3xl bg-gradient-to-r from-[#0F9D58] via-[#0F281E] to-[#0F172A] text-white p-8 sm:p-12 shadow-2xl overflow-hidden space-y-6">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              <span>Next Step to 300+ Score</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Keep Learning. Keep Improving.
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Every practice session brings you closer to your target university score. Continue tracking your progress and preparing with confidence.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  showToast('Opening CBT Practice...');
                  if (setActiveTab) setActiveTab('cbt-practice');
                }}
                className="py-3.5 px-6 bg-white hover:bg-slate-100 text-[#0F172A] font-extrabold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base text-[#0F9D58]">play_circle</span>
                <span>Take Another CBT Test</span>
              </button>

              <button
                onClick={() => {
                  showToast('Returning to Study Hub...');
                  if (setActiveTab) setActiveTab('study-hub');
                }}
                className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">auto_stories</span>
                <span>Return to Study Hub</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* REVIEW EXAM MODAL */}
      {selectedReviewExam && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C2541] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E2E8F0] dark:border-slate-700 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase">Session Detailed Review</span>
                <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">{selectedReviewExam.name}</h3>
              </div>
              <button
                onClick={() => setSelectedReviewExam(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] font-bold uppercase">Final Score</span>
                <span className="text-base font-extrabold text-[#0F9D58]">{selectedReviewExam.score}</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] font-bold uppercase">Accuracy</span>
                <span className="text-base font-extrabold text-[#2563EB]">{selectedReviewExam.percentage}%</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] font-bold uppercase">Time Used</span>
                <span className="text-base font-extrabold text-[#0F172A] dark:text-white">{selectedReviewExam.timeUsed}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#0F172A] dark:text-white">Topic Performance Highlights:</h4>
              <ul className="space-y-1.5 text-[#475569]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Perfect score in Use of English comprehension section.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Mathematics speed averaged 35 seconds per question.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-sm">warning</span>
                  <span>Missed 4 questions in Organic Chemistry reaction mechanisms.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedReviewExam(null)}
                className="py-2.5 px-5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#0d8a4d]"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL REPORT MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSendEmailReport}
            className="bg-white dark:bg-[#1C2541] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-[#E2E8F0] dark:border-slate-700 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2 text-[#0F9D58]">
                <span className="material-symbols-outlined text-xl">mail</span>
                <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Email Analytics Summary</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              Send a copy of your diagnostic performance report, subject accuracy, and readiness score directly to your parent or tutor.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F172A] dark:text-white block">Recipient Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. parent@example.com or tutor@school.ng"
                value={emailAddressInput}
                onChange={(e) => setEmailAddressInput(e.target.value)}
                className="w-full py-2.5 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-medium text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="py-2.5 px-4 bg-slate-100 text-[#475569] font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#0d8a4d]"
              >
                Send Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
