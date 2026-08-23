import React, { useState } from 'react';
import { TabType, SubjectType } from '../types';
import { CBT_QUESTIONS, COURSES_DATA, UNIVERSITIES_DATA } from '../data/mockData';

interface StudyHubScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export const StudyHubScreen: React.FC<StudyHubScreenProps> = ({ setActiveTab }) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');

  // CBT Modal / Practice state
  const [isCbtModalOpen, setIsCbtModalOpen] = useState(false);
  const [cbtSubject, setCbtSubject] = useState<SubjectType | 'All'>('All');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [isCbtSubmitted, setIsCbtSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes

  // Timetable state
  const [activeTimetableDay, setActiveTimetableDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Mon');
  const [isEditTimetableOpen, setIsEditTimetableOpen] = useState(false);

  // Resource / Article Modal state
  const [activeResourceModal, setActiveResourceModal] = useState<{ title: string; desc: string; category: string } | null>(null);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick suggestion chips
  const suggestionChips = [
    'Mathematics',
    'English',
    'Biology',
    'Chemistry',
    'Physics',
    'Government',
    'Economics',
    'Literature',
    'Commerce',
    'CRS',
    'IRS',
    'Agricultural Science',
  ];

  // Subject Library Data (13 Subjects)
  const subjectList = [
    { name: 'English Language', topics: 24, questions: 1200, progress: 75, icon: 'spellcheck', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Mathematics', topics: 18, questions: 950, progress: 45, icon: 'calculate', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { name: 'Physics', topics: 15, questions: 800, progress: 30, icon: 'bolt', color: 'bg-purple-500/10 text-purple-700' },
    { name: 'Chemistry', topics: 16, questions: 850, progress: 60, icon: 'science', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Biology', topics: 21, questions: 1100, progress: 80, icon: 'biotech', color: 'bg-amber-500/10 text-amber-700' },
    { name: 'Economics', topics: 14, questions: 700, progress: 50, icon: 'trending_up', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { name: 'Government', topics: 17, questions: 750, progress: 65, icon: 'account_balance', color: 'bg-slate-500/10 text-slate-700' },
    { name: 'Literature', topics: 12, questions: 600, progress: 40, icon: 'auto_stories', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Commerce', topics: 13, questions: 650, progress: 55, icon: 'store', color: 'bg-indigo-500/10 text-indigo-700' },
    { name: 'CRS', topics: 11, questions: 500, progress: 70, icon: 'church', color: 'bg-amber-500/10 text-amber-700' },
    { name: 'IRS', topics: 11, questions: 500, progress: 60, icon: 'mosque', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Geography', topics: 15, questions: 720, progress: 35, icon: 'public', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { name: 'Agricultural Science', topics: 16, questions: 780, progress: 50, icon: 'agriculture', color: 'bg-emerald-500/10 text-emerald-700' },
  ];

  // Filter subjects based on search & suggestion chip
  const filteredSubjects = subjectList.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChip = selectedSubjectFilter === 'All' || sub.name.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
    return matchesSearch && matchesChip;
  });

  // Featured Learning Resources
  const featuredResources = [
    {
      title: 'JAMB Syllabus 2026',
      desc: 'Complete official topic outline, objectives, and recommended literature texts for all 13 subjects.',
      tag: 'Official Syllabus',
      icon: 'menu_book',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZPLNSx1MEfRRhl6aQoqYS3oF_64ll2pi3JZ53vCM_0iavqKS8mbjoUZWNzUehjyvEwJ-wrR_1cx62Y92tuRi3Y-jlmCocfnNEF5Tr_zc8MKUDH1cQIKv75iKqj0Sd01CmB4NAoe3eq7pzkRGj0yrt4VtRJlwPrBM6m78V6EMZ0FfuRPtCZcKN0Qyhm5kd4BC7tjRrYyotOJ56mEd8E5hrmXSvTCSc9wlteSMvZuhD2nPKlpoF4nt-1w',
    },
    {
      title: 'JAMB Recommended Textbooks',
      desc: 'Full directory of approved literature novels, grammar references, and science textbooks with chapter guides.',
      tag: 'Textbooks Guide',
      icon: 'library_books',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh28bxUddLJsRwceLH3ezGHtFaJITL_SRC6msg2yH80sxZQnYmjUWYPFSyzMLEcJ7Isuhafe7Bhk1HZ8jSvcdf4Sr28h_MQvJJiSUCq6O4THVBM68NgekRYN9aPzg20JYASu-ZzoowfD1Brsiyhh8dqpmvesUA6zJiz7WwCKP2VwUvN0mQYGoAbVdvgDXpj1t24GNshzFwCFRc_4Y6__NqPUnFee559UJQ8sr5YgAg3VsOENzLCtUmwQ',
    },
    {
      title: 'High-Yield Study Notes',
      desc: 'Concise chapter summaries, formula cheat sheets, and definitions tailored for rapid revision.',
      tag: 'Revision Notes',
      icon: 'edit_note',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7qqF9du6pfHACGYz5H2ze9FJ-1Mv_75MQp9nwQxgkSVLqyICd0_F8Slm85iz0Xh8zghd3aRmJjwDpsfqJv0yWcNvV2ZLfQXyzI9-8uyGHvOHmUzMUq4XTMYZB_aGsRbHEJiQpbH5sfbisFhkWV3XSBaACuT7kZlYg6IhtdolDLn2p4ZHv8bPha-aqRcxlyzDtVsTQyqDhKynfqGDr509GWM-xESJHCdcx8iS1xYZ_GJ6Hs3MHKS2nZw',
    },
    {
      title: 'Revision & Shortcut Guides',
      desc: 'Top 100 recurring UTME math formulas, physics equation breakdowns, and English grammar rules.',
      tag: 'Shortcuts & Cheat Sheets',
      icon: 'functions',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC0V95-1to1es6PfxtlqpPhRCZcOPlwDXD9Ugm2bsmml2GhAfTisjy95tvJg9Ad3mJ48Ooy-p88pZiLxHLFmXQf1ImT30JHGRj8pNH5GJWi8uAHnDcWXntp8bU6p9XVR94bxHd2-oGylCEFRYZwD6BS0fJ9HGtKg39VsyF0zhM0uBaRG6WcAtZoULtYjxYYBaZRAkxSqKZ0-XnQBinLiwypJXIsSxOc5FIwxJfLAiMaiMlXrN6v6y7Mg',
    },
    {
      title: 'Exam Strategies & CBT Tactics',
      desc: 'Master time allocation, elimination techniques, and navigation controls for maximum speed.',
      tag: 'Strategy Blueprint',
      icon: 'psychology',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt3RaDDgWV6HhslywAq6XSrxn239-NiK9VZHrzT17IyzcJkd6qt_1i6MfOUt24zIyyDKujUCtoD8NR6sS0ZT-ZF_47olo5RfBdhHsQUIyC-LPaxfhqyqZYEnlUCbve962hU7KSJHCCqf3y1GSByTqcN4KWCMWUTAmIkE_ji3XIp0y2NFh8gjJBnjtYvq4ftzymc-CUFt46pomHdvjsOdzailWFvZHFHFfbXf9WaMXNmr2jTS40dtYB0A',
    },
    {
      title: 'Learning Video Lectures (Placeholder)',
      desc: 'Step-by-step video tutorials explaining difficult topics in Chemistry, Physics, and Mathematics.',
      tag: 'Video Courses',
      icon: 'ondemand_video',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxoz92RNSBpV2eLoFkbOGarFLIHjMUWBRFH83IMJAhVdKYqkl1mSRjOp6YXCZ75MccxP9JzK62tPfwAPpg7-J3eeEQ3J8Weqr8Vz_Gl-8tf4cA42XQmTwGFp87bpWd76MtJgiYi4Do2M5_NPFZuaPjzZGQjoMkty8-DLjIddaQj6Uxk8UCFb40mlDFVeblvZPY2c-DlH2nD3S7IDJIHXGZVjA_3lYa9ZZiU_gvRphliif_9puVgfvkCw',
    },
  ];

  // Weekly Timetable Sessions Data
  const timetableData: Record<string, { time: string; subject: string; topic: string; color: string }[]> = {
    Mon: [
      { time: '08:00 - 10:00 AM', subject: 'Use of English', topic: 'Comprehension & Vocabulary', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { time: '11:00 - 01:00 PM', subject: 'Mathematics', topic: 'Calculus & Quadratic Equations', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { time: '03:00 - 05:00 PM', subject: 'Physics', topic: 'Vectors & Linear Motion', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    ],
    Tue: [
      { time: '08:00 - 10:00 AM', subject: 'Chemistry', topic: 'Stoichiometry & Periodic Table', color: 'bg-amber-100 text-amber-800 border-amber-300' },
      { time: '11:00 - 01:00 PM', subject: 'Biology', topic: 'Cell Biology & Transport Systems', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { time: '03:00 - 05:00 PM', subject: 'CBT Speed Drill', topic: 'Past Questions Speed Test (60 Mins)', color: 'bg-red-100 text-red-800 border-red-300' },
    ],
    Wed: [
      { time: '08:00 - 10:00 AM', subject: 'Use of English', topic: 'Oral English & Concord Rules', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { time: '11:00 - 01:00 PM', subject: 'Physics', topic: 'Electricity, Waves & Optics', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { time: '03:00 - 05:00 PM', subject: 'Economics', topic: 'Demand, Supply & Inflation', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    ],
    Thu: [
      { time: '08:00 - 10:00 AM', subject: 'Mathematics', topic: 'Trigonometry & Logarithms', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { time: '11:00 - 01:00 PM', subject: 'Chemistry', topic: 'Organic Reactions & Electrolysis', color: 'bg-amber-100 text-amber-800 border-amber-300' },
      { time: '03:00 - 05:00 PM', subject: 'Government', topic: 'Pre-Colonial & Constitutional History', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    ],
    Fri: [
      { time: '08:00 - 10:00 AM', subject: 'Biology', topic: 'Genetics, Evolution & Ecology', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { time: '11:00 - 01:00 PM', subject: 'Literature', topic: 'Recommended Novels Analysis', color: 'bg-pink-100 text-pink-800 border-pink-300' },
      { time: '03:00 - 05:00 PM', subject: 'Weak Topic Revision', topic: 'Targeted Review Session', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    ],
    Sat: [
      { time: '09:00 - 11:00 AM', subject: 'Full UTME CBT Simulation', topic: '4-Subject Timed Mock Exam', color: 'bg-emerald-600 text-white font-bold border-emerald-700' },
      { time: '02:00 - 04:00 PM', subject: 'Mock Exam Analysis', topic: 'Review Incorrect Answers & Explanations', color: 'bg-[#0F172A] text-white border-[#0F172A]' },
    ],
    Sun: [
      { time: '02:00 - 04:00 PM', subject: 'Weekly Review', topic: 'Organize Notes & Plan Next Week', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    ],
  };

  // Recent Activity Items
  const recentActivities = [
    { title: 'Completed Mathematics Revision', desc: 'Calculus & Coordinate Geometry', time: '2 hours ago', score: '95% Score', icon: 'calculate', color: 'text-blue-600 bg-blue-50' },
    { title: 'Downloaded Chemistry Syllabus', desc: 'Official 2026 Topic Outline', time: 'Yesterday', score: 'PDF 2.4 MB', icon: 'download', color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Practised Use of English CBT', desc: 'Comprehension & Synonyms Drill', time: '2 days ago', score: '48 / 50 Correct', icon: 'computer', color: 'text-purple-600 bg-purple-50' },
    { title: 'Saved Biology Notes', desc: 'Cell Division & Photosynthesis', time: '3 days ago', score: 'Bookmark Added', icon: 'bookmark', color: 'text-amber-600 bg-amber-50' },
  ];

  // Exam Preparation Tips
  const examTips = [
    { title: 'Create a Structured Study Plan', desc: 'Divide your 4 UTME subjects into 2-hour study blocks with regular breaks to ensure balanced coverage.', icon: 'calendar_month', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { title: 'Practise Consistently with CBT', desc: 'Take at least two timed CBT mock exams every week to build speed, accuracy, and exam stamina.', icon: 'laptop_chromebook', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { title: 'Focus 60% on Weak Topics', desc: 'Identify topics where you score below 60% in practice tests and dedicate focused revision sessions to them.', icon: 'target', color: 'bg-amber-500/10 text-amber-700' },
    { title: 'Maintain Daily Study Consistency', desc: 'Studying 3-4 hours daily over several months produces far better retention than last-minute cramming.', icon: 'bolt', color: 'bg-purple-500/10 text-purple-700' },
    { title: 'Prioritize Sleep Before Exam Day', desc: 'Get at least 8 hours of restorative sleep the night before your UTME to maximize cognitive recall speed.', icon: 'bedtime', color: 'bg-indigo-500/10 text-indigo-700' },
    { title: 'Arrive 1 Hour Early at CBT Centre', desc: 'Reach your accredited examination venue early to complete biometric screening smoothly without panic.', icon: 'schedule', color: 'bg-emerald-500/10 text-emerald-700' },
  ];

  // Study Challenges & Achievement Badges
  const studyChallenges = [
    { title: '7-Day Study Streak', desc: 'Studied every day for 7 consecutive days', progress: 100, badge: 'Completed', icon: 'local_fire_department', color: 'bg-amber-500 text-white' },
    { title: 'Completed 100 Questions', desc: 'Answered 120 practice questions in CBT mode', progress: 100, badge: 'Mastered', icon: 'workspace_premium', color: 'bg-[#0F9D58] text-white' },
    { title: 'Master Mathematics', desc: 'Complete 85% of Mathematics syllabus topics', progress: 65, badge: 'In Progress', icon: 'calculate', color: 'bg-[#2563EB] text-white' },
    { title: 'Finished Weekly Plan', desc: 'Completed all 5 scheduled weekday sessions', progress: 100, badge: 'Completed', icon: 'task_alt', color: 'bg-[#0F9D58] text-white' },
    { title: 'Ready for Mock Exam', desc: 'Achieve 250+ score in CBT Practice Mode', progress: 85, badge: 'Unlocked', icon: 'stars', color: 'bg-purple-600 text-white' },
  ];

  // Recommended For You Items
  const recommendedItems = [
    { title: 'Targeted Practice: Use of English', category: 'Recommended Subject', desc: 'Boost your score in the compulsory subject with 50 high-yield comprehension drills.', icon: 'spellcheck', tag: 'High Priority' },
    { title: '2026 Approved Literature Novel Summaries', category: 'New Resource', desc: 'Complete chapter-by-chapter analysis, character guides, and likely exam questions.', icon: 'auto_stories', tag: 'Literature' },
    { title: 'Top 50 Recurring UTME Physics Formulas', category: 'Popular Revision Guide', desc: 'Essential equation list with solved past question examples.', icon: 'functions', tag: 'Cheat Sheet' },
    { title: '4-Subject Timed CBT Simulation', category: 'Suggested Test', desc: 'Full 2-hour realistic JAMB CBT exam environment to benchmark your readiness.', icon: 'computer', tag: 'Full Mock' },
  ];

  // Latest Educational Updates (Articles)
  const educationalUpdates = [
    { title: 'Updated JAMB Syllabus: Key Changes for Candidates', category: 'Official Updates', desc: 'JAMB releases updated syllabus guidelines and novel lists for the upcoming UTME session.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZPLNSx1MEfRRhl6aQoqYS3oF_64ll2pi3JZ53vCM_0iavqKS8mbjoUZWNzUehjyvEwJ-wrR_1cx62Y92tuRi3Y-jlmCocfnNEF5Tr_zc8MKUDH1cQIKv75iKqj0Sd01CmB4NAoe3eq7pzkRGj0yrt4VtRJlwPrBM6m78V6EMZ0FfuRPtCZcKN0Qyhm5kd4BC7tjRrYyotOJ56mEd8E5hrmXSvTCSc9wlteSMvZuhD2nPKlpoF4nt-1w' },
    { title: 'Top Exam Preparation Strategies: How to Score 300+ in UTME', category: 'Exam Strategy', desc: 'Proven study routines and speed techniques used by top-scoring Nigerian candidates.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh28bxUddLJsRwceLH3ezGHtFaJITL_SRC6msg2yH80sxZQnYmjUWYPFSyzMLEcJ7Isuhafe7Bhk1HZ8jSvcdf4Sr28h_MQvJJiSUCq6O4THVBM68NgekRYN9aPzg20JYASu-ZzoowfD1Brsiyhh8dqpmvesUA6zJiz7WwCKP2VwUvN0mQYGoAbVdvgDXpj1t24GNshzFwCFRc_4Y6__NqPUnFee559UJQ8sr5YgAg3VsOENzLCtUmwQ' },
    { title: 'Effective Time Management: Balancing 4 Subjects in 2 Hours', category: 'Time Management', desc: 'Master time allocation per question to complete your exam with time left to review.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt3RaDDgWV6HhslywAq6XSrxn239-NiK9VZHrzT17IyzcJkd6qt_1i6MfOUt24zIyyDKujUCtoD8NR6sS0ZT-ZF_47olo5RfBdhHsQUIyC-LPaxfhqyqZYEnlUCbve962hU7KSJHCCqf3y1GSByTqcN4KWCMWUTAmIkE_ji3XIp0y2NFh8gjJBnjtYvq4ftzymc-CUFt46pomHdvjsOdzailWFvZHFHFfbXf9WaMXNmr2jTS40dtYB0A' },
    { title: 'How to Avoid Common UTME Mistakes on Exam Day', category: 'Candidate Guide', desc: 'Avoid critical errors during CBT navigation, subject confirmation, and profile logins.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxoz92RNSBpV2eLoFkbOGarFLIHjMUWBRFH83IMJAhVdKYqkl1mSRjOp6YXCZ75MccxP9JzK62tPfwAPpg7-J3eeEQ3J8Weqr8Vz_Gl-8tf4cA42XQmTwGFp87bpWd76MtJgiYi4Do2M5_NPFZuaPjzZGQjoMkty8-DLjIddaQj6Uxk8UCFb40mlDFVeblvZPY2c-DlH2nD3S7IDJIHXGZVjA_3lYa9ZZiU_gvRphliif_9puVgfvkCw' },
  ];

  // FAQ Items
  const faqs = [
    { q: 'How do I prepare effectively for the UTME?', a: 'Start by studying with the official JAMB syllabus for your 4 chosen subjects, practice past questions under timed CBT conditions, and focus on mastering high-yield topics.' },
    { q: 'How many hours should I study daily for JAMB?', a: 'Aim for 3 to 5 hours of dedicated, focused study daily. Break your time into 50-minute study sessions with 10-minute rest breaks.' },
    { q: 'Should I use past questions during my preparation?', a: 'Yes! Solving past questions is crucial. JAMB frequently repeats core question structures and concepts in Use of English, Mathematics, and Sciences.' },
    { q: 'What is the best revision strategy close to the exam date?', a: 'Focus 70% of your remaining time taking full-length timed CBT practice tests and reviewing explanations for every missed question.' },
    { q: 'How do I improve my scores in weak subjects?', a: 'Break weak subjects into small sub-topics, study the fundamental concepts first, and solve 20 topic-specific past questions daily until confident.' },
  ];

  // CBT Practice Helper logic
  const activeQuestions = CBT_QUESTIONS.filter(
    (q) => cbtSubject === 'All' || q.subject === cbtSubject
  );
  const currentQ = activeQuestions[currentQuestionIdx] || activeQuestions[0];

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isCbtSubmitted) return;
    setSelectedOptions((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleStartCbtPractice = (subject: SubjectType | 'All' = 'All') => {
    setCbtSubject(subject);
    setCurrentQuestionIdx(0);
    setSelectedOptions({});
    setIsCbtSubmitted(false);
    setTimerSeconds(600);
    setIsCbtModalOpen(true);
  };

  const correctAnswersCount = activeQuestions.filter(
    (q) => selectedOptions[q.id] === q.correctIndex
  ).length;

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0F172A] font-sans min-h-screen pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* PAGE HEADER / BREADCRUMB */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs text-[#475569] font-medium">
          <button
            onClick={() => setActiveTab && setActiveTab('home')}
            className="hover:text-[#0F9D58] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Home</span>
          </button>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#0F172A] font-bold">Study Hub</span>
        </div>
      </div>

      {/* HERO HEADER SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              <span>Complete UTME Preparation Centre</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              Study Hub
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Everything you need to prepare confidently for the UTME in one place. Access syllabus guides, past question drills, CBT practice, study plans, and topic summaries.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                <span>5,000+ Past Questions</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>13 UTME Subjects Covered</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Official 2026 Syllabus</span>
              </span>
            </div>
          </div>

          {/* Hero Illustration Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">school</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Academic Portal</p>
                    <p className="text-base font-bold font-display">JAMB Learning Suite</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Live
                </span>
              </div>

              {/* Progress Summary Pill */}
              <div className="bg-white/10 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-300 font-medium">Daily Goal Target</p>
                  <p className="text-sm font-bold">2 Hours • 50 Questions</p>
                </div>
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-300/30 text-xs font-bold px-3 py-1 rounded-xl">
                  75% Complete
                </span>
              </div>

              <div className="text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm flex-shrink-0 mt-0.5">lightbulb</span>
                <span>Tip: Practice with timed CBT tests weekly to improve speed and question accuracy.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SEARCH SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-4">
          <div className="relative max-w-3xl mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What would you like to study today? (e.g. Mathematics Calculus, English Grammar, Biology...)"
              className="w-full pl-12 pr-12 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F9D58] focus:bg-white transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-2">
            <span className="text-xs font-bold text-[#475569] uppercase tracking-wider mr-2">Quick Filter:</span>
            <button
              onClick={() => setSelectedSubjectFilter('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedSubjectFilter === 'All'
                  ? 'bg-[#0F9D58] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#0F9D58]'
              }`}
            >
              All Subjects
            </button>
            {suggestionChips.map((chip) => {
              const isSelected = selectedSubjectFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => {
                    setSelectedSubjectFilter(chip);
                    showToast(`Filtered by ${chip}`);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#0F9D58] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#0F9D58]'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </section>

        {/* PERSONAL STUDY OVERVIEW */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Personal Student Dashboard
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Welcome Back, Candidate! 👋
              </h2>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2 rounded-2xl text-xs font-medium italic">
              "Success is the sum of small efforts, repeated day in and day out."
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Study Streak */}
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-2xl shrink-0">
                <span className="material-symbols-outlined">local_fire_department</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Study Streak</p>
                <p className="text-lg font-extrabold text-[#0F172A]">12 Days</p>
                <p className="text-[10px] text-[#16A34A] font-semibold mt-0.5">Active daily learner</p>
              </div>
            </div>

            {/* Today's Goal */}
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold text-2xl shrink-0">
                <span className="material-symbols-outlined">track_changes</span>
              </div>
              <div className="w-full">
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Today's Goal</p>
                <p className="text-lg font-extrabold text-[#0F172A]">75% Done</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#0F9D58] h-full rounded-full w-[75%]"></div>
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-2xl shrink-0">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <div className="w-full">
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Weekly Progress</p>
                <p className="text-lg font-extrabold text-[#0F172A]">84% Mastery</p>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full w-[84%]"></div>
                </div>
              </div>
            </div>

            {/* Hours Studied */}
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-2xl shrink-0">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Hours Studied</p>
                <p className="text-lg font-extrabold text-[#0F172A]">14.5 Hours</p>
                <p className="text-[10px] text-[#475569] mt-0.5">This week</p>
              </div>
            </div>

            {/* Subjects Completed */}
            <div className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-2xl shrink-0">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Target Subjects</p>
                <p className="text-lg font-extrabold text-[#0F172A]">4 / 4 Active</p>
                <p className="text-[10px] text-[#0F9D58] font-semibold mt-0.5">Fully assigned</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACCESS CARDS (6 CARDS) */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Shortcuts & Tools
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Quick Access Hub
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. JAMB Syllabus */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">JAMB Syllabus</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Official topic breakdown, objectives, and literature novel guides for all 13 UTME subjects.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveResourceModal({
                    title: 'JAMB Syllabus 2026',
                    desc: 'Official 2026 UTME syllabus breakdown covering Use of English, Mathematics, Sciences, Arts, and Commercial subjects.',
                    category: 'Syllabus Guide',
                  });
                }}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Syllabus</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* 2. Recommended Textbooks */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">library_books</span>
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">Recommended Textbooks</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Comprehensive directory of approved literature novels and reference textbooks.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveResourceModal({
                    title: 'Approved JAMB Textbooks Directory',
                    desc: 'Full list of official books recommended by JAMB for Literature in English, Use of English, and Sciences.',
                    category: 'Textbooks Directory',
                  });
                }}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Textbooks</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* 3. CBT Practice */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">computer</span>
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">CBT Practice</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Simulate real computer-based UTME testing environment with instant scoring and explanations.
                </p>
              </div>
              <button
                onClick={() => handleStartCbtPractice('All')}
                className="w-full bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Start Practice</span>
                <span className="material-symbols-outlined text-sm">play_arrow</span>
              </button>
            </div>

            {/* 4. Past Questions */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">Past Questions</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Browse over 10 years of solved UTME questions categorized by subject and topic.
                </p>
              </div>
              <button
                onClick={() => handleStartCbtPractice('English')}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Past Questions</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* 5. Study Timetable */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">Study Timetable</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Customizable weekly schedule planner to balance your 4 target UTME subjects.
                </p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('timetable-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Timetable</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* 6. Exam Tips */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-2xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">Exam Tips</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Expert advice on time management, guessing techniques, and avoiding exam stress.
                </p>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('exam-tips-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Tips</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* SUBJECT LIBRARY (13 SUBJECTS) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Explore All 13 UTME Disciplines
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Subject Library
              </h2>
            </div>
            <p className="text-xs text-[#475569]">
              Showing {filteredSubjects.length} of 13 Subjects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubjects.map((sub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F9D58] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl ${sub.color}`}>
                      <span className="material-symbols-outlined">{sub.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#0F9D58] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {sub.progress}% Mastery
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#0F172A]">{sub.name}</h3>

                  <div className="flex items-center gap-4 text-xs text-[#475569]">
                    <span>{sub.topics} Topics</span>
                    <span>•</span>
                    <span>{sub.questions} Questions</span>
                  </div>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: `${sub.progress}%` }}></div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleStartCbtPractice(
                      ['Mathematics', 'Physics', 'Chemistry', 'Biology'].includes(sub.name)
                        ? (sub.name as SubjectType)
                        : 'English'
                    );
                  }}
                  className="w-full mt-2 bg-white hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Study {sub.name}</span>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED LEARNING RESOURCES */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Curated Materials
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Featured Learning Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((res, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={res.img}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {res.tag}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-[#0F172A]">{res.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{res.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveResourceModal({
                        title: res.title,
                        desc: res.desc,
                        category: res.tag,
                      });
                    }}
                    className="w-full mt-3 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Open Resource</span>
                    <span className="material-symbols-outlined text-sm">launch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDY TIMETABLE COMPONENT */}
        <section id="timetable-section" className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Weekly Planner
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Study Timetable
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditTimetableOpen(true)}
                className="bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs px-4 py-2 rounded-xl border border-[#E2E8F0] transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Timetable</span>
              </button>

              <button
                onClick={() => showToast('Downloading Weekly Timetable PDF...')}
                className="bg-[#0F9D58] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#0d8a4d] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
            {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const).map((day) => {
              const isSelected = activeTimetableDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveTimetableDay(day)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#0F172A]'
                  }`}
                >
                  {day === 'Mon' && 'Monday'}
                  {day === 'Tue' && 'Tuesday'}
                  {day === 'Wed' && 'Wednesday'}
                  {day === 'Thu' && 'Thursday'}
                  {day === 'Fri' && 'Friday'}
                  {day === 'Sat' && 'Saturday'}
                  {day === 'Sun' && 'Sunday'}
                </button>
              );
            })}
          </div>

          {/* Sessions Display for Selected Day */}
          <div className="space-y-3 pt-2">
            {timetableData[activeTimetableDay]?.map((session, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${session.color}`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 block">{session.time}</span>
                    <h4 className="font-bold text-sm sm:text-base">{session.subject}</h4>
                    <p className="text-xs opacity-90">{session.topic}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleStartCbtPractice('All')}
                  className="bg-white/90 hover:bg-white text-[#0F172A] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-black/10 transition-colors shrink-0 self-start sm:self-auto"
                >
                  Start Session
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CBT PRACTICE PREVIEW & LIVE SIMULATION BANNER */}
        <section className="bg-gradient-to-br from-[#0F172A] to-[#0F281E] text-white p-6 sm:p-8 rounded-3xl border border-[#0F9D58] shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">laptop_mac</span>
                <span>Interactive CBT Practice Simulator</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                CBT Practice Preview
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Experience authentic UTME computer-based testing with real past questions, automatic timing, instant score reports, and detailed solution guides.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleStartCbtPractice('All')}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                <span>Start Practice Now</span>
              </button>

              <button
                onClick={() => showToast('Previous CBT Results: 275/400 (Top 5% percentile)')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">bar_chart</span>
                <span>View Results History</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-200">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] uppercase font-bold text-[#82FAAB]">Questions Available</p>
              <p className="text-lg font-bold text-white mt-0.5">5,000+ Items</p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] uppercase font-bold text-[#82FAAB]">UTME Subjects</p>
              <p className="text-lg font-bold text-white mt-0.5">All 13 Subjects</p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] uppercase font-bold text-[#82FAAB]">Estimated Time</p>
              <p className="text-lg font-bold text-white mt-0.5">60 Mins / Test</p>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] uppercase font-bold text-[#82FAAB]">Difficulty Levels</p>
              <p className="text-lg font-bold text-white mt-0.5">Easy • Med • Hard</p>
            </div>
          </div>
        </section>

        {/* RECENT STUDY ACTIVITY */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Your Learning History
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Recent Study Activity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${act.color}`}>
                    <span className="material-symbols-outlined text-xl">{act.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#475569]">{act.time}</span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{act.title}</h3>
                  <p className="text-xs text-[#475569] mt-0.5">{act.desc}</p>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#0F9D58]">{act.score}</span>
                  <span className="text-[#2563EB] font-semibold cursor-pointer hover:underline">Revisit</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAM PREPARATION TIPS */}
        <section id="exam-tips-section" className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Candidate Best Practices
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Exam Preparation Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {examTips.map((tip, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F9D58] transition-all space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${tip.color}`}>
                    <span className="material-symbols-outlined text-lg">{tip.icon}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{tip.title}</h3>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STUDY CHALLENGES & BADGES */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Gamified Learning Milestones
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Study Challenges & Badges
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyChallenges.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.color}`}>
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-[#0F172A] uppercase">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{item.title}</h3>
                  <p className="text-xs text-[#475569] mt-0.5">{item.desc}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-[#475569]">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDED FOR YOU */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Personalized Recommendations
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Recommended for You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedItems.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md uppercase">
                      {rec.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#0F9D58] bg-emerald-50 px-2 py-0.5 rounded-md">
                      {rec.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{rec.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{rec.desc}</p>
                </div>

                <button
                  onClick={() => handleStartCbtPractice('All')}
                  className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Now</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST EDUCATIONAL UPDATES (ARTICLES) */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              News & Exam Insights
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Latest Educational Updates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationalUpdates.map((art, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative h-36 overflow-hidden bg-slate-100">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {art.category}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[#0F172A] line-clamp-2">{art.title}</h3>
                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">{art.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (setActiveTab) {
                        setActiveTab('news');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-full mt-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Read More</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Study Hub FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 bg-[#F8FAFC] flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#0F172A] hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[#0F172A] shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 bg-white text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 relative text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Start Preparing Smarter Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Build a study routine, practise consistently, and prepare with confidence using the JAMB Compass Study Hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => handleStartCbtPractice('All')}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Start CBT Practice</span>
                <span className="material-symbols-outlined text-lg">play_arrow</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('timetable-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Resources</span>
                <span className="material-symbols-outlined text-lg">auto_stories</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* CBT INTERACTIVE PRACTICE MODAL */}
      {isCbtModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#0F172A] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-[#0F9D58]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#82FAAB] text-2xl">laptop_mac</span>
                <div>
                  <h3 className="font-bold text-base font-display">JAMB CBT Exam Simulator</h3>
                  <p className="text-xs text-slate-300">
                    {cbtSubject === 'All' ? 'Full All-Subject Mock' : cbtSubject} • Question {currentQuestionIdx + 1} of {activeQuestions.length}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCbtModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-xl hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Question Box */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#475569] border-b border-[#E2E8F0] pb-3">
                  <span className="font-bold text-[#0F9D58] uppercase">{currentQ.subject}</span>
                  <span className="font-mono font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                    Timer: {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-[#0F172A] leading-relaxed">
                  {currentQ.question}
                </h4>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedOptions[currentQ.id] === optIdx;
                    const isCorrect = optIdx === currentQ.correctIndex;
                    let style = 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#0F9D58]';

                    if (isCbtSubmitted) {
                      if (isCorrect) style = 'bg-emerald-50 border-[#0F9D58] text-emerald-900 font-bold';
                      else if (isSelected && !isCorrect) style = 'bg-red-50 border-red-300 text-red-900 line-through';
                    } else if (isSelected) {
                      style = 'bg-[#0F9D58] border-[#0F9D58] text-white font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-all text-xs sm:text-sm ${style}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected && !isCbtSubmitted
                              ? 'bg-white text-[#0F9D58]'
                              : isCbtSubmitted && isCorrect
                              ? 'bg-[#0F9D58] text-white'
                              : 'bg-white border text-[#475569]'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isCbtSubmitted && (
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">lightbulb</span>
                      <span>Explanation:</span>
                    </p>
                    <p>{currentQ.explanation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] disabled:opacity-40 hover:bg-slate-100 transition-colors"
                >
                  Previous
                </button>
                <button
                  disabled={currentQuestionIdx === activeQuestions.length - 1}
                  onClick={() => setCurrentQuestionIdx((p) => Math.min(activeQuestions.length - 1, p + 1))}
                  className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-slate-800 transition-colors"
                >
                  Next Question
                </button>
              </div>

              {!isCbtSubmitted ? (
                <button
                  onClick={() => setIsCbtSubmitted(true)}
                  className="px-6 py-2 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Submit CBT Test
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#0F9D58]">
                    Score: {correctAnswersCount} / {activeQuestions.length} ({Math.round((correctAnswersCount / activeQuestions.length) * 100)}%)
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOptions({});
                      setIsCbtSubmitted(false);
                      setCurrentQuestionIdx(0);
                    }}
                    className="px-4 py-2 bg-[#0F172A] text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Retake Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RESOURCE PREVIEW MODAL */}
      {activeResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#0F172A] w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F9D58] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {activeResourceModal.category}
              </span>
              <button
                onClick={() => setActiveResourceModal(null)}
                className="text-[#475569] hover:text-[#0F172A]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <h3 className="font-bold text-lg font-display text-[#0F172A]">
              {activeResourceModal.title}
            </h3>

            <p className="text-xs text-[#475569] leading-relaxed">
              {activeResourceModal.desc}
            </p>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl text-xs text-[#0F172A] space-y-2">
              <p className="font-bold flex items-center gap-1 text-[#0F9D58]">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Resource Summary:</span>
              </p>
              <p>Includes chapter breakdowns, key formulas, recommended literature guides, and high-yield question samples for 2026 UTME candidates.</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  showToast(`Downloading ${activeResourceModal.title}...`);
                  setActiveResourceModal(null);
                }}
                className="flex-1 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download PDF Guide</span>
              </button>
              <button
                onClick={() => setActiveResourceModal(null)}
                className="px-5 bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs py-3 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TIMETABLE MODAL */}
      {isEditTimetableOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#0F172A] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="font-bold text-base font-display text-[#0F172A]">Edit Timetable Session</h3>
              <button onClick={() => setIsEditTimetableOpen(false)} className="text-[#475569] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Select Day</label>
                <select className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none font-semibold">
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Subject</label>
                <select className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none font-semibold">
                  {subjectList.map((s, i) => (
                    <option key={i}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Target Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Organic Chemistry & Electrolysis"
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  showToast('Timetable updated successfully!');
                  setIsEditTimetableOpen(false);
                }}
                className="flex-1 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditTimetableOpen(false)}
                className="px-5 bg-[#F8FAFC] text-[#0F172A] font-bold text-xs py-3 rounded-xl border border-[#E2E8F0]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
