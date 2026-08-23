import React, { useState, useEffect } from 'react';
import { TabType, SubjectType, CbtQuestion } from '../types';
import { CBT_QUESTIONS } from '../data/mockData';

interface CbtPracticeScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

// Expanded Question Bank for 13 UTME Subjects
const EXTENDED_CBT_QUESTIONS: CbtQuestion[] = [
  ...CBT_QUESTIONS,
  // Economics
  {
    id: 'econ-1',
    subject: 'English' as SubjectType,
    question: 'Opportunity cost is best defined in economic theory as:',
    options: [
      'The real cost of a sacrifice in terms of the next best alternative foregone',
      'The total monetary expenditure incurred during production',
      'The fixed cost of capital machinery depreciated over time',
      'The explicit payment made for raw materials'
    ],
    correctIndex: 0,
    explanation: 'Opportunity cost measures the value of the next best alternative given up when making a choice.'
  },
  // Government
  {
    id: 'gov-1',
    subject: 'English' as SubjectType,
    question: 'Which principle ensures that government officials act within the limits defined by law?',
    options: ['Rule of Law', 'Parliamentary Sovereignty', 'Delegated Legislation', 'Gerreymandering'],
    correctIndex: 0,
    explanation: 'The Rule of Law states that all citizens and government authorities are subject to and accountable under the law.'
  },
  // Literature
  {
    id: 'lit-1',
    subject: 'English' as SubjectType,
    question: 'In drama, a speech delivered by a character alone on stage expressing internal thoughts is called a:',
    options: ['Soliloquy', 'Monologue', 'Aside', 'Prologue'],
    correctIndex: 0,
    explanation: 'A soliloquy is an utterance by a character alone on stage revealing private thoughts and motives.'
  },
  // Commerce
  {
    id: 'com-1',
    subject: 'English' as SubjectType,
    question: 'The document issued by a seller to correct an undercharge in a customer account is called a:',
    options: ['Debit Note', 'Credit Note', 'Invoice', 'Proforma Invoice'],
    correctIndex: 0,
    explanation: 'A Debit Note is sent by a supplier to inform a buyer that their account has been debited (undercharged).'
  },
  // CRS
  {
    id: 'crs-1',
    subject: 'English' as SubjectType,
    question: 'According to the Genesis account, God created man in His image on the:',
    options: ['Sixth Day', 'Fifth Day', 'Seventh Day', 'Third Day'],
    correctIndex: 0,
    explanation: 'According to Genesis 1:26-31, human beings were created on the sixth day of creation.'
  },
  // IRS
  {
    id: 'irs-1',
    subject: 'English' as SubjectType,
    question: 'Which Pillar of Islam mandates the payment of annual charitable wealth distribution to the needy?',
    options: ['Zakat', 'Sawm', 'Hajj', 'Shahadah'],
    correctIndex: 0,
    explanation: 'Zakat is the third pillar of Islam requiring Muslims to give a specific portion of wealth to charity annually.'
  },
  // Geography
  {
    id: 'geo-1',
    subject: 'English' as SubjectType,
    question: 'The scale of a map expressed as 1:50,000 means that 1 cm on the map represents:',
    options: ['0.5 km on the ground', '5 km on the ground', '50 km on the ground', '0.05 km on the ground'],
    correctIndex: 0,
    explanation: '1:50,000 means 1 cm = 50,000 cm = 500 meters = 0.5 km.'
  },
  // Agric Science
  {
    id: 'agric-1',
    subject: 'English' as SubjectType,
    question: 'Which soil type holds the highest moisture content due to small pore spaces?',
    options: ['Clay Soil', 'Sandy Soil', 'Loamy Soil', 'Silty Soil'],
    correctIndex: 0,
    explanation: 'Clay soil consists of fine particles with minute pores that retain water effectively.'
  }
];

export const CbtPracticeScreen: React.FC<CbtPracticeScreenProps> = ({ setActiveTab }) => {
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick Start Form state
  const [selectedSubject, setSelectedSubject] = useState<string>('English Language');
  const [questionMode, setQuestionMode] = useState<'Practice (Untimed)' | 'Timed Exam' | 'Speed Drill' | 'Topic Master'>('Timed Exam');
  const [difficulty, setDifficulty] = useState<'Standard UTME' | 'Advanced' | 'Easy' | 'High-Yield'>('Standard UTME');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [timeLimit, setTimeLimit] = useState<number>(30); // in minutes
  const [questionType, setQuestionType] = useState<string>('All Topics');

  // Active CBT Exam Simulator state
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showPalettePanel, setShowPalettePanel] = useState<boolean>(true);

  // Active Exam variables
  const [examQuestions, setExamQuestions] = useState<CbtQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(1800);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Review mode state after exam
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Animated Stats Counter State
  const [stats, setStats] = useState({
    sessions: 0,
    avgScore: 0,
    attempted: 0,
    correct: 0,
    accuracy: 0,
    studyTime: 0,
  });

  // Animate stats on mount
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setStats({
        sessions: Math.min(28, Math.floor(28 * (step / 20))),
        avgScore: Math.min(78, Math.floor(78 * (step / 20))),
        attempted: Math.min(1240, Math.floor(1240 * (step / 20))),
        correct: Math.min(967, Math.floor(967 * (step / 20))),
        accuracy: Math.min(78, Math.floor(78 * (step / 20))),
        studyTime: Math.min(18.5, Number((18.5 * (step / 20)).toFixed(1))),
      });
      if (step >= 20) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Timer countdown hook for live CBT exam
  useEffect(() => {
    if (!isExamActive || isExamSubmitted || isTimerPaused) return;

    if (secondsRemaining <= 0) {
      handleForceSubmit();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isExamSubmitted, isTimerPaused, secondsRemaining]);

  // Subject Cards List (13 Subjects)
  const subjectsList = [
    { name: 'English Language', count: '1,200 Questions', difficulty: 'Standard', tag: 'Compulsory', icon: 'spellcheck', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Mathematics', count: '950 Questions', difficulty: 'Advanced', tag: 'Calculation', icon: 'calculate', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { name: 'Biology', count: '1,100 Questions', difficulty: 'Standard', tag: 'Life Sciences', icon: 'biotech', color: 'bg-amber-500/10 text-amber-700' },
    { name: 'Chemistry', count: '850 Questions', difficulty: 'Standard', tag: 'Physical Sciences', icon: 'science', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Physics', count: '800 Questions', difficulty: 'Advanced', tag: 'Mechanics', icon: 'bolt', color: 'bg-purple-500/10 text-purple-700' },
    { name: 'Economics', count: '700 Questions', difficulty: 'Standard', tag: 'Commercial', icon: 'trending_up', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { name: 'Government', count: '750 Questions', difficulty: 'Standard', tag: 'Social Sciences', icon: 'account_balance', color: 'bg-slate-500/10 text-slate-700' },
    { name: 'Literature in English', count: '600 Questions', difficulty: 'Standard', tag: 'Arts', icon: 'auto_stories', color: 'bg-pink-500/10 text-pink-700' },
    { name: 'Commerce', count: '650 Questions', difficulty: 'Standard', tag: 'Business', icon: 'store', color: 'bg-indigo-500/10 text-indigo-700' },
    { name: 'CRS', count: '500 Questions', difficulty: 'Standard', tag: 'Humanities', icon: 'church', color: 'bg-amber-500/10 text-amber-700' },
    { name: 'IRS', count: '500 Questions', difficulty: 'Standard', tag: 'Humanities', icon: 'mosque', color: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Geography', count: '720 Questions', difficulty: 'Standard', tag: 'Social Sciences', icon: 'public', color: 'bg-[#2563EB]/10 text-[#2563EB]' },
    { name: 'Agricultural Science', count: '780 Questions', difficulty: 'Standard', tag: 'Agric Sciences', icon: 'agriculture', color: 'bg-emerald-500/10 text-emerald-700' },
  ];

  // Achievements List
  const achievements = [
    { title: 'First Practice Test', desc: 'Completed your very first CBT simulation session', icon: 'workspace_premium', badge: 'Completed', color: 'bg-[#0F9D58] text-white', progress: 100 },
    { title: '100 Questions Completed', desc: 'Answered over 100 UTME past questions', icon: 'task_alt', badge: 'Completed', color: 'bg-[#0F9D58] text-white', progress: 100 },
    { title: '7-Day Practice Streak', desc: 'Took practice tests for 7 consecutive days', icon: 'local_fire_department', badge: 'Active', color: 'bg-amber-500 text-white', progress: 100 },
    { title: '90% Accuracy Master', desc: 'Score above 90% in a 40-question mock exam', icon: 'stars', badge: 'Unlocked', color: 'bg-purple-600 text-white', progress: 92 },
    { title: 'Subject Master', desc: 'Complete 80% of questions in Mathematics', icon: 'military_tech', badge: 'In Progress', color: 'bg-[#2563EB] text-white', progress: 75 },
    { title: 'Gold Performer', desc: 'Maintain 280+ score average across 10 mock exams', icon: 'emoji_events', badge: 'Gold Level', color: 'bg-amber-600 text-white', progress: 85 },
  ];

  // Leaderboard Demo Data
  const leaderboardData = [
    { rank: '1st', name: 'Amina Bello', score: '348 / 400', points: '12,450 pts', subject: 'Medicine & Surgery', avatar: 'AB', badge: '👑 Gold' },
    { rank: '2nd', name: 'Chinedu Okeke', score: '335 / 400', points: '11,200 pts', subject: 'Computer Science', avatar: 'CO', badge: '🥈 Silver' },
    { rank: '3rd', name: 'Tunde Bakare', score: '328 / 400', points: '10,850 pts', subject: 'Law (LL.B)', avatar: 'TB', badge: '🥉 Bronze' },
    { rank: '4th', name: 'Blessing Adeyemi', score: '315 / 400', points: '9,900 pts', subject: 'Accounting', avatar: 'BA', badge: '⭐ Top 1%' },
    { rank: '5th', name: 'Emmanuel Okafor', score: '302 / 400', points: '9,450 pts', subject: 'Engineering', avatar: 'EO', badge: '⭐ Top 5%' },
  ];

  // FAQ Items
  const faqList = [
    { q: 'How does CBT practice work?', a: 'Our CBT Practice simulator replicates the exact layout, timer controls, 8-key shortcut setup, and question format used in official JAMB UTME centres. You select subjects, choose time limits, and receive instant scoring with full explanations.' },
    { q: 'Can I pause a practice session?', a: 'Yes! In Practice Mode, you can pause the timer anytime using the pause control to review your notes. In Exam Simulation Mode, the timer runs continuously to mimic real test conditions.' },
    { q: 'Will my scores be saved?', a: 'Yes, all your completed test attempts, time spent, question accuracy, and subject breakdown are automatically recorded in your personal performance dashboard.' },
    { q: 'How do I improve my score?', a: 'Analyse your post-test result summary, review explanations for missed questions, and use the "Revise Weak Topics" recommendations to target difficult subject areas.' },
    { q: 'Can I practise multiple subjects?', a: 'Yes! You can choose individual subjects for speed drills or launch full 4-subject UTME mock examinations combining Use of English with 3 other core subjects.' },
  ];

  // Start CBT Exam Function
  const startExam = (subjName: string = selectedSubject, customCount: number = questionCount, customTime: number = timeLimit) => {
    // Map selected subject string to matching mock questions or fallback
    let matchedQuestions = EXTENDED_CBT_QUESTIONS.filter((q) => {
      if (subjName.toLowerCase().includes('english')) return q.subject === 'English';
      if (subjName.toLowerCase().includes('math')) return q.subject === 'Mathematics';
      if (subjName.toLowerCase().includes('physic')) return q.subject === 'Physics';
      if (subjName.toLowerCase().includes('chemist')) return q.subject === 'Chemistry';
      if (subjName.toLowerCase().includes('biolog')) return q.subject === 'Biology';
      return true;
    });

    if (matchedQuestions.length === 0) {
      matchedQuestions = EXTENDED_CBT_QUESTIONS;
    }

    // Duplicate questions to match requested length if needed
    let finalSet: CbtQuestion[] = [];
    while (finalSet.length < customCount) {
      finalSet = [...finalSet, ...matchedQuestions];
    }
    finalSet = finalSet.slice(0, customCount).map((q, i) => ({
      ...q,
      id: `${q.id}-instance-${i}`,
      question: `[Q${i + 1}] ${q.question}`,
    }));

    setExamQuestions(finalSet);
    setSelectedSubject(subjName);
    setCurrentIdx(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(customTime * 60);
    setIsExamActive(true);
    setIsExamSubmitted(false);
    setIsReviewMode(false);
    setIsTimerPaused(false);
    showToast(`Started ${subjName} CBT Exam (${customCount} Questions, ${customTime} Mins)`);
  };

  const handleSelectOption = (optIdx: number) => {
    if (isExamSubmitted && !isReviewMode) return;
    const currentQ = examQuestions[currentIdx];
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx,
    }));
  };

  const handleClearAnswer = () => {
    const currentQ = examQuestions[currentIdx];
    if (!currentQ) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    showToast('Cleared answer selection');
  };

  const handleToggleFlag = () => {
    const currentQ = examQuestions[currentIdx];
    if (!currentQ) return;
    setFlaggedQuestions((prev) => {
      const isFlagged = !prev[currentQ.id];
      if (isFlagged) showToast('Question flagged for review');
      else showToast('Question flag removed');
      return { ...prev, [currentQ.id]: isFlagged };
    });
  };

  const handleForceSubmit = () => {
    setIsExamSubmitted(true);
    setShowSubmitModal(false);
    showToast('Exam submitted successfully!');
  };

  // Helper calculations for submit modal & summary
  const totalQCount = examQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = Math.max(0, totalQCount - answeredCount);
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  const correctAnswersCount = examQuestions.filter(
    (q) => userAnswers[q.id] === q.correctIndex
  ).length;
  const incorrectAnswersCount = Math.max(0, answeredCount - correctAnswersCount);
  const accuracyPercentage = totalQCount > 0 ? Math.round((correctAnswersCount / totalQCount) * 100) : 0;

  // Format timer seconds
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timerProgressPercentage = (timeLimit * 60) > 0 ? (secondsRemaining / (timeLimit * 60)) * 100 : 100;

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
          <button
            onClick={() => setActiveTab && setActiveTab('study-hub')}
            className="hover:text-[#0F9D58] transition-colors"
          >
            Study Hub
          </button>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#0F172A] font-bold">CBT Practice</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">computer</span>
              <span>JAMB UTME CBT Simulator</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              CBT Practice
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Practise with realistic computer-based tests and build confidence before your UTME. Experience timed exams, subject drills, immediate answer breakdowns, and detailed analytics.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                <span>Authentic 8-Key CBT Interface</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>13 UTME Disciplines</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Instant Diagnostic Analytics</span>
              </span>
            </div>
          </div>

          {/* Hero Computer Exam Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">laptop_chromebook</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Exam Centre Portal</p>
                    <p className="text-base font-bold font-display">JAMB CBT Test Engine</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Active
                </span>
              </div>

              {/* Computer Exam Screen Mockup */}
              <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-700/60 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Subject: Use of English</span>
                  <span className="text-amber-400 font-bold">Timer: 44:52</span>
                </div>
                <p className="text-slate-100 font-sans text-xs">
                  "Choose the option nearest in meaning to the bold word in the sentence..."
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                  <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 text-slate-300">A. Skeptical</div>
                  <div className="bg-[#0F9D58] text-white p-2 rounded-lg font-bold">B. Confident</div>
                  <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 text-slate-300">C. Uncertain</div>
                  <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 text-slate-300">D. Doubtful</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-center justify-between">
                <span>Realistic Timing & Nav Controls</span>
                <span className="font-bold text-[#82FAAB]">Ready to Test</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* ACTIVE CBT EXAM SIMULATOR (IF ACTIVE) */}
        {isExamActive && (
          <section id="active-cbt-container" className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden scroll-mt-6">
            {/* Examination Top Bar */}
            <div className="bg-[#0F172A] text-white p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58] flex items-center justify-center font-bold text-lg">
                  <span className="material-symbols-outlined">computer</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">UTME CBT Session</span>
                    <span className="text-[10px] bg-[#2563EB] px-2 py-0.5 rounded-full font-bold uppercase">{selectedSubject}</span>
                  </div>
                  <h2 className="text-lg font-bold font-display text-white">
                    Question {currentIdx + 1} of {examQuestions.length}
                  </h2>
                </div>
              </div>

              {/* Timer & Controls Panel */}
              <div className="flex items-center gap-4">
                {/* Timer Box */}
                <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl flex items-center gap-3">
                  <span className={`material-symbols-outlined text-lg ${secondsRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                    timer
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Remaining</p>
                    <p className={`text-base font-extrabold font-mono ${secondsRemaining < 300 ? 'text-red-400' : 'text-white'}`}>
                      {formatTimer(secondsRemaining)}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsTimerPaused(!isTimerPaused)}
                    title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
                    className="ml-1 p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300"
                  >
                    <span className="material-symbols-outlined text-sm">{isTimerPaused ? 'play_arrow' : 'pause'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowPalettePanel(!showPalettePanel)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  <span className="hidden sm:inline">Question Palette</span>
                </button>

                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  Submit Exam
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 relative">
              <div
                className={`h-2 transition-all duration-300 ${secondsRemaining < 300 ? 'bg-red-500' : 'bg-[#0F9D58]'}`}
                style={{ width: `${((currentIdx + 1) / examQuestions.length) * 100}%` }}
              ></div>
            </div>

            {/* Main Exam Interface Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Question Screen */}
              <div className={`${showPalettePanel ? 'lg:col-span-8' : 'lg:col-span-12'} p-6 sm:p-8 space-y-6`}>
                {examQuestions.length > 0 && (
                  <div className="space-y-6">
                    {/* Question Header & Instructions */}
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">
                        Question {currentIdx + 1}
                      </span>
                      {flaggedQuestions[examQuestions[currentIdx]?.id] && (
                        <span className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">flag</span>
                          Flagged
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
                      <p className="text-base sm:text-lg font-medium text-[#0F172A] leading-relaxed">
                        {examQuestions[currentIdx]?.question}
                      </p>
                    </div>

                    {/* Options List */}
                    <div className="space-y-3">
                      {examQuestions[currentIdx]?.options.map((opt, oIdx) => {
                        const qId = examQuestions[currentIdx].id;
                        const isSelected = userAnswers[qId] === oIdx;
                        const isCorrectOption = isReviewMode && oIdx === examQuestions[currentIdx].correctIndex;
                        const isWrongSelected = isReviewMode && isSelected && !isCorrectOption;

                        let optStyle = 'border-[#E2E8F0] bg-white hover:border-[#0F9D58] hover:bg-emerald-50/40 text-[#0F172A]';
                        if (isSelected && !isReviewMode) {
                          optStyle = 'border-[#0F9D58] bg-[#0F9D58]/10 text-[#0F172A] ring-2 ring-[#0F9D58]/30 font-semibold';
                        }
                        if (isReviewMode) {
                          if (isCorrectOption) optStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                          else if (isWrongSelected) optStyle = 'border-red-400 bg-red-100 text-red-900 font-semibold';
                        }

                        const optionLetters = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectOption(oIdx)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${optStyle}`}
                          >
                            <span
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSelected
                                  ? 'bg-[#0F9D58] text-white'
                                  : 'bg-slate-100 text-[#475569] border border-slate-200'
                              }`}
                            >
                              {optionLetters[oIdx]}
                            </span>
                            <span className="text-sm leading-relaxed mt-1 flex-1">{opt}</span>
                            {isSelected && (
                              <span className="material-symbols-outlined text-[#0F9D58] text-xl">check_circle</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations in Review Mode */}
                    {isReviewMode && (
                      <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-xs space-y-2 text-emerald-950">
                        <p className="font-bold text-sm flex items-center gap-1.5 text-emerald-800">
                          <span className="material-symbols-outlined text-base">lightbulb</span>
                          Answer Explanation:
                        </p>
                        <p className="leading-relaxed">{examQuestions[currentIdx]?.explanation}</p>
                      </div>
                    )}

                    {/* Navigation Buttons Row */}
                    <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                        disabled={currentIdx === 0}
                        className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#0F172A] font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                        Previous
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleClearAnswer}
                          className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#475569] font-bold text-xs flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">restart_alt</span>
                          Clear Answer
                        </button>

                        <button
                          onClick={handleToggleFlag}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1 ${
                            flaggedQuestions[examQuestions[currentIdx]?.id]
                              ? 'bg-amber-500 text-white border-amber-600'
                              : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-amber-50'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">flag</span>
                          {flaggedQuestions[examQuestions[currentIdx]?.id] ? 'Flagged' : 'Flag Question'}
                        </button>
                      </div>

                      <button
                        onClick={() => setCurrentIdx((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                        disabled={currentIdx === examQuestions.length - 1}
                        className="px-5 py-2.5 rounded-xl bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs"
                      >
                        Next
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Side Question Palette Panel */}
              {showPalettePanel && (
                <div className="lg:col-span-4 bg-[#F8FAFC] border-t lg:border-t-0 lg:border-l border-[#E2E8F0] p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                    <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-[#0F9D58]">apps</span>
                      Question Palette
                    </h3>
                    <span className="text-xs text-[#475569] font-semibold">
                      {answeredCount} / {examQuestions.length} Answered
                    </span>
                  </div>

                  {/* Grid of question buttons */}
                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                    {examQuestions.map((q, idx) => {
                      const isAnswered = userAnswers[q.id] !== undefined;
                      const isCurrent = currentIdx === idx;
                      const isFlagged = flaggedQuestions[q.id];

                      let btnBg = 'bg-white text-[#0F172A] border-[#E2E8F0]';
                      if (isAnswered) btnBg = 'bg-[#0F9D58] text-white border-[#0F9D58]';
                      if (isFlagged) btnBg = 'bg-amber-500 text-white border-amber-600';
                      if (isCurrent) btnBg += ' ring-2 ring-offset-2 ring-[#0F172A] font-extrabold scale-105';

                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentIdx(idx)}
                          className={`h-10 rounded-xl font-bold text-xs border transition-all flex items-center justify-center ${btnBg}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Palette Indicators Legend */}
                  <div className="space-y-2 pt-2 text-xs border-t border-[#E2E8F0]">
                    <p className="font-bold text-[#475569] text-[11px] uppercase tracking-wider">Status Indicators</p>
                    <div className="grid grid-cols-2 gap-2 text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-md bg-[#0F9D58]"></span>
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-md bg-white border border-[#E2E8F0]"></span>
                        <span>Unanswered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-md bg-amber-500"></span>
                        <span>Flagged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-md border-2 border-[#0F172A] bg-white"></span>
                        <span>Current</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Box */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] space-y-3">
                    <p className="text-xs text-[#475569]">
                      Ready to view your diagnostic result? Click submit below.
                    </p>
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SUBMIT EXAM CONFIRMATION MODAL */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-100 text-[#0F9D58] rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">
                  <span className="material-symbols-outlined">assignment_turned_in</span>
                </div>
                <h3 className="text-xl font-bold font-display text-[#0F172A]">Submit Your CBT Exam?</h3>
                <p className="text-xs text-[#475569]">
                  Please review your question summary before submitting your test.
                </p>
              </div>

              {/* Question Counts Summary */}
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-[#475569] font-medium">Total Questions:</span>
                  <span className="font-bold text-[#0F172A]">{totalQCount}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-[#0F9D58] font-semibold">Answered:</span>
                  <span className="font-bold text-[#0F9D58]">{answeredCount}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Unanswered:</span>
                  <span className="font-bold text-slate-700">{unansweredCount}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-amber-600 font-semibold">Flagged Questions:</span>
                  <span className="font-bold text-amber-600">{flaggedCount}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs py-3 rounded-xl transition-colors"
                >
                  Continue Reviewing
                </button>
                <button
                  onClick={handleForceSubmit}
                  className="flex-1 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-md"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULT SUMMARY SECTION (SHOWS AFTER SUBMISSION) */}
        {isExamSubmitted && (
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2 max-w-xl mx-auto border-b border-[#E2E8F0] pb-6">
              <span className="bg-emerald-100 text-[#0F9D58] border border-emerald-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase">
                Diagnostic Assessment Report
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
                CBT Exam Performance Summary
              </h2>
              <p className="text-xs text-[#475569]">
                Subject: <strong className="text-[#0F172A]">{selectedSubject}</strong> • Practice Test Completed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Circular Score Visualizer */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] space-y-4">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#0F9D58]"
                      strokeDasharray={`${accuracyPercentage}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold font-display text-[#0F172A]">{accuracyPercentage}%</span>
                    <span className="text-[11px] font-bold text-[#475569] uppercase">Score Accuracy</span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="bg-emerald-50 text-[#0F9D58] border border-emerald-200 text-xs font-bold px-3 py-1 rounded-xl">
                    Performance: {accuracyPercentage >= 75 ? 'UTME 300+ Ready' : 'Good Progress'}
                  </span>
                </div>
              </div>

              {/* Detailed Metrics Breakdown */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <p className="text-[11px] font-bold text-[#475569] uppercase">Total Questions</p>
                  <p className="text-xl font-extrabold text-[#0F172A]">{totalQCount}</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <p className="text-[11px] font-bold text-[#0F9D58] uppercase">Correct Answers</p>
                  <p className="text-xl font-extrabold text-[#0F9D58]">{correctAnswersCount}</p>
                </div>

                <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                  <p className="text-[11px] font-bold text-red-600 uppercase">Incorrect Answers</p>
                  <p className="text-xl font-extrabold text-red-600">{incorrectAnswersCount}</p>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <p className="text-[11px] font-bold text-[#475569] uppercase">Skipped / Unanswered</p>
                  <p className="text-xl font-extrabold text-[#0F172A]">{unansweredCount}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <p className="text-[11px] font-bold text-[#2563EB] uppercase">Time Used</p>
                  <p className="text-xl font-extrabold text-[#2563EB]">
                    {formatTimer(timeLimit * 60 - secondsRemaining)}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                  <p className="text-[11px] font-bold text-purple-700 uppercase">UTME Est. Score</p>
                  <p className="text-xl font-extrabold text-purple-700">
                    {Math.round((correctAnswersCount / totalQCount) * 400)} / 400
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 border-t border-[#E2E8F0] pt-6">
              <button
                onClick={() => {
                  setIsReviewMode(true);
                  setCurrentIdx(0);
                  const el = document.getElementById('active-cbt-container');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">menu_book</span>
                <span>Review Answers & Explanations</span>
              </button>

              <button
                onClick={() => startExam(selectedSubject, questionCount, timeLimit)}
                className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                <span>Retake Test</span>
              </button>

              <button
                onClick={() => {
                  setIsExamActive(false);
                  setIsExamSubmitted(false);
                }}
                className="bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs px-6 py-3 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Choose Another Subject
              </button>
            </div>
          </section>
        )}

        {/* QUICK START SETUP CARD */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Custom Test Generator
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Quick Start CBT Practice
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-[#0F9D58] border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#0F9D58]"></span>
              Instant Setup
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Select Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                {subjectsList.map((sub, idx) => (
                  <option key={idx} value={sub.name}>{sub.name}</option>
                ))}
              </select>
            </div>

            {/* Question Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                Question Mode
              </label>
              <select
                value={questionMode}
                onChange={(e) => setQuestionMode(e.target.value as any)}
                className="w-full p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Timed Exam">Timed Exam Mode</option>
                <option value="Practice (Untimed)">Practice (Untimed) Mode</option>
                <option value="Speed Drill">Speed Drill (Fast Pace)</option>
                <option value="Topic Master">Topic Master Focus</option>
              </select>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Standard UTME">Standard UTME Exam Standard</option>
                <option value="Easy">Easy (Foundational Revision)</option>
                <option value="Advanced">Advanced (High Score Target)</option>
                <option value="High-Yield">High-Yield Past Questions Only</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value={10}>10 Questions (Quick Review)</option>
                <option value={20}>20 Questions (Standard Drill)</option>
                <option value={40}>40 Questions (Full Subject UTME)</option>
                <option value={60}>60 Questions (Extended Exam)</option>
                <option value={100}>100 Questions (Marathon Mock)</option>
              </select>
            </div>

            {/* Time Limit */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                Time Limit (Minutes)
              </label>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value={10}>10 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={120}>120 Minutes (Full 4-Subject Mock)</option>
              </select>
            </div>

            {/* Question Types */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                Question Types
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All Topics">All Syllabus Topics</option>
                <option value="Past Questions Only">2014-2023 Solved Past Questions</option>
                <option value="High-Frequency">Top Recurring Questions</option>
                <option value="Formula Focus">Formulas & Quantitative Only</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#E2E8F0]">
            <button
              onClick={() => startExam(selectedSubject, questionCount, timeLimit)}
              className="w-full sm:w-auto bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs px-8 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              <span>Start Practice</span>
            </button>

            <button
              onClick={() => {
                startExam('Mathematics', 20, 30);
                showToast('Restored previous CBT practice session');
              }}
              className="w-full sm:w-auto bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs px-6 py-3.5 rounded-2xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">history</span>
              <span>Continue Previous Session</span>
            </button>
          </div>
        </section>

        {/* EXAM DASHBOARD / STATISTIC CARDS */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Performance Tracker
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Exam Performance Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* 1. Practice Sessions Completed */}
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined">assignment_turned_in</span>
              </div>
              <p className="text-[11px] font-bold text-[#475569] uppercase">Sessions Done</p>
              <p className="text-2xl font-extrabold font-display text-[#0F172A]">{stats.sessions}</p>
            </div>

            {/* 2. Average Score */}
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <p className="text-[11px] font-bold text-[#475569] uppercase">Average Score</p>
              <p className="text-2xl font-extrabold font-display text-[#0F172A]">{stats.avgScore}%</p>
            </div>

            {/* 3. Questions Attempted */}
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined">quiz</span>
              </div>
              <p className="text-[11px] font-bold text-[#475569] uppercase">Attempted</p>
              <p className="text-2xl font-extrabold font-display text-[#0F172A]">{stats.attempted.toLocaleString()}</p>
            </div>

            {/* 4. Correct Answers */}
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <p className="text-[11px] font-bold text-[#475569] uppercase">Correct</p>
              <p className="text-2xl font-extrabold font-display text-[#0F172A]">{stats.correct.toLocaleString()}</p>
            </div>

            {/* 5. Accuracy Percentage */}
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined">target</span>
              </div>
              <p className="text-[11px] font-bold text-[#475569] uppercase">Accuracy</p>
              <p className="text-2xl font-extrabold font-display text-[#0F172A]">{stats.accuracy}%</p>
            </div>

            {/* 6. Study Time */}
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center font-bold text-xl">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <p className="text-[11px] font-bold text-[#475569] uppercase">Study Time</p>
              <p className="text-2xl font-extrabold font-display text-[#0F172A]">{stats.studyTime} hrs</p>
            </div>
          </div>
        </section>

        {/* SUBJECT SELECTION GRID (13 SUBJECTS) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Subject Directory
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Select a UTME Subject to Practise
              </h2>
            </div>
            <p className="text-xs text-[#475569] font-medium">13 Approved JAMB Subjects Available</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subjectsList.map((sub, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl ${sub.color}`}>
                      <span className="material-symbols-outlined">{sub.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#475569] bg-slate-200/60 px-2.5 py-0.5 rounded-full uppercase">
                      {sub.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#0F172A]">{sub.name}</h3>
                    <p className="text-xs text-[#475569] mt-0.5">{sub.count}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#475569] border-t border-slate-200/60 pt-2">
                    <span>Difficulty:</span>
                    <span className="font-bold text-[#0F172A]">{sub.difficulty}</span>
                  </div>
                </div>

                <button
                  onClick={() => startExam(sub.name, 20, 30)}
                  className="w-full bg-white hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Start Practice</span>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PERFORMANCE ANALYTICS SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Deep Analytics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Performance Analytics & Mastery Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Topics Strength */}
            <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-4">
              <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
                Topics Strength (High Proficiency)
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#0F172A]">English Grammar & Concord</span>
                    <span className="text-[#0F9D58]">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#0F172A]">Cell Biology & Genetics</span>
                    <span className="text-[#0F9D58]">88%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#0F172A]">Mathematics Algebra & Logarithms</span>
                    <span className="text-[#0F9D58]">84%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics Needing Improvement */}
            <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-4">
              <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600">warning</span>
                Topics Needing Improvement
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#0F172A]">Organic Chemistry & Hydrocarbons</span>
                    <span className="text-amber-600">48%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#0F172A]">Physics Electrostatics & Current</span>
                    <span className="text-amber-600">54%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '54%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#0F172A]">Mathematics Calculus & Trigonometry</span>
                    <span className="text-amber-600">58%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECOMMENDED NEXT STEPS */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Personalised Guidance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Recommended Next Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xl">
                  <span className="material-symbols-outlined">auto_fix_high</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">Revise Weak Topics</h3>
                <p className="text-xs text-[#475569]">Target Organic Chemistry and Physics Electrostatics with focused notes.</p>
              </div>
              <button
                onClick={() => showToast('Opening Weak Topics Revision...')}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Revise Now
              </button>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold text-xl">
                  <span className="material-symbols-outlined">computer</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">Take Practice Test</h3>
                <p className="text-xs text-[#475569]">Attempt a 40-question timed Mathematics mock exam.</p>
              </div>
              <button
                onClick={() => startExam('Mathematics', 40, 45)}
                className="w-full bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
              >
                Start Test
              </button>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-xl">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">Read Study Notes</h3>
                <p className="text-xs text-[#475569]">High-yield summary guides and formula cheat sheets.</p>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Open Notes
              </button>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold text-xl">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">Review Syllabus</h3>
                <p className="text-xs text-[#475569]">Check official 2026 topic objectives and literature novels.</p>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                View Syllabus
              </button>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center font-bold text-xl">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">Download Timetable</h3>
                <p className="text-xs text-[#475569]">Save your weekly 4-subject study planner schedule.</p>
              </div>
              <button
                onClick={() => showToast('Downloading Study Timetable PDF...')}
                className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2 rounded-xl border border-[#E2E8F0] transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Gamified Milestones
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Practice Achievements & Badges
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 ${item.color}`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-[#0F172A]">{item.title}</h3>
                    <span className="text-[10px] font-bold text-[#0F9D58] bg-emerald-50 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569]">{item.desc}</p>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERBOARD DEMO FEATURE */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Community Rankings
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Weekly Student Leaderboard
              </h2>
            </div>
            <span className="text-xs text-[#475569] font-medium">Demo Data • Updated Live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] text-[#475569] font-bold border-b border-[#E2E8F0]">
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Target Discipline</th>
                  <th className="p-3.5">Practice Score</th>
                  <th className="p-3.5">Weekly Points</th>
                  <th className="p-3.5 text-right">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {leaderboardData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-[#0F9D58]">{row.rank}</td>
                    <td className="p-3.5 font-bold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-bold">
                          {row.avatar}
                        </span>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-[#475569]">{row.subject}</td>
                    <td className="p-3.5 font-bold text-[#0F172A]">{row.score}</td>
                    <td className="p-3.5 font-extrabold text-[#2563EB]">{row.points}</td>
                    <td className="p-3.5 text-right">
                      <span className="bg-slate-100 text-[#0F172A] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {row.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Got Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 bg-[#F8FAFC] hover:bg-slate-100 text-sm font-bold text-[#0F172A] flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[#0F9D58]">
                      {isOpen ? 'remove' : 'add'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0] bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="relative w-full rounded-3xl bg-gradient-to-r from-[#0F9D58] via-[#0F281E] to-[#0F172A] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Keep Practising. Keep Improving.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Consistent practice is one of the best ways to prepare for the UTME. Track your progress and build confidence with every session.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => startExam('English Language', 20, 30)}
                className="bg-white hover:bg-emerald-50 text-[#0F172A] font-bold text-xs px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                <span>Take Another Test</span>
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-3.5 rounded-2xl border border-white/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">school</span>
                <span>Go to Study Hub</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
