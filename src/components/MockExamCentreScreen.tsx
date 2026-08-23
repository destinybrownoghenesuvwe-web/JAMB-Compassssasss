import React, { useState, useEffect, useMemo } from 'react';
import { TabType } from '../types';

interface MockExamCentreScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface MockExamCard {
  id: string;
  title: string;
  category: 'General' | 'Science' | 'Arts' | 'Commercial' | 'Medical' | 'Engineering';
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  icon: string;
  bgGradient: string;
  attemptsCount: number;
  avgScore: string;
  description: string;
}

export interface ExamQuestion {
  id: string;
  subject: string;
  questionNumber: number;
  questionText: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyConcept: string;
  topic: string;
  suggestedResource: string;
}

const SAMPLE_MOCK_EXAMS: MockExamCard[] = [
  {
    id: 'general-utme-2026',
    title: 'General UTME Full Mock 2026',
    category: 'General',
    questionsCount: 180,
    durationMinutes: 120,
    difficulty: 'Advanced',
    icon: 'school',
    bgGradient: 'from-[#0F172A] to-[#0F9D58]',
    attemptsCount: 14250,
    avgScore: '264 / 400',
    description: 'Complete 4-subject standard UTME exam simulation under official JAMB CBT rules and time constraints.',
  },
  {
    id: 'science-mock-pro',
    title: 'Medical & Science Super Mock',
    category: 'Science',
    questionsCount: 160,
    durationMinutes: 120,
    difficulty: 'Advanced',
    icon: 'biotech',
    bgGradient: 'from-[#064E3B] to-[#10B981]',
    attemptsCount: 8920,
    avgScore: '278 / 400',
    description: 'Intensive drill for Medicine, Pharmacy, and Biological Science aspirants covering Use of English, Bio, Chem & Physics.',
  },
  {
    id: 'engineering-mock-2026',
    title: 'Engineering & Technology Mock',
    category: 'Engineering',
    questionsCount: 160,
    durationMinutes: 120,
    difficulty: 'Advanced',
    icon: 'engineering',
    bgGradient: 'from-[#1E293B] to-[#2563EB]',
    attemptsCount: 6540,
    avgScore: '270 / 400',
    description: 'Calculations-heavy mock set tailored for Engineering and Physical Science UTME candidates.',
  },
  {
    id: 'arts-humanities-mock',
    title: 'Arts & Humanities Core Mock',
    category: 'Arts',
    questionsCount: 160,
    durationMinutes: 120,
    difficulty: 'Intermediate',
    icon: 'menu_book',
    bgGradient: 'from-[#312E81] to-[#6366F1]',
    attemptsCount: 5120,
    avgScore: '258 / 400',
    description: 'Comprehension, Literature, Government, and History focus with in-depth textual analysis.',
  },
  {
    id: 'commercial-business-mock',
    title: 'Commercial & Economics Mock',
    category: 'Commercial',
    questionsCount: 160,
    durationMinutes: 120,
    difficulty: 'Intermediate',
    icon: 'payments',
    bgGradient: 'from-[#1E1B4B] to-[#D97706]',
    attemptsCount: 4890,
    avgScore: '252 / 400',
    description: 'Comprehensive test for Accounting, Economics, Commerce, and English Language candidates.',
  },
  {
    id: 'medical-starter-mock',
    title: 'Medical Sciences Foundation Drill',
    category: 'Medical',
    questionsCount: 100,
    durationMinutes: 75,
    difficulty: 'Foundation',
    icon: 'health_and_safety',
    bgGradient: 'from-[#0F281E] to-[#16A34A]',
    attemptsCount: 7300,
    avgScore: '78%',
    description: 'Foundational mock geared towards mastering high-frequency organic chemistry and human physiology questions.',
  },
];

const DEMO_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'q1',
    subject: 'Use of English',
    questionNumber: 1,
    questionText: 'Choose the option that BEST fills the gap in the sentence below:\nThe committee chairman declared that the company\'s financial performance was ________ by the sudden global economic recession.',
    options: [
      { key: 'A', text: 'Facilitated and enhanced' },
      { key: 'B', text: 'Hampered and severely disrupted' },
      { key: 'C', text: 'Augmented without precedent' },
      { key: 'D', text: 'Exacerbated into immediate prosperity' },
    ],
    correctAnswer: 'B',
    explanation: '"Hampered" means hindered or obstructed progress. An economic downturn negatively affects company performance.',
    keyConcept: 'Contextual Lexis & Synonym Analysis',
    topic: 'Vocabulary & Diction',
    suggestedResource: 'Use of English Syllabus Section 2: Sentence Structure & Lexis',
  },
  {
    id: 'q2',
    subject: 'Use of English',
    questionNumber: 2,
    questionText: 'In the passage below, what is the primary argument conveyed by the author regarding renewable energy adoption?',
    options: [
      { key: 'A', text: 'Fossil fuels will remain cheaper for the next century.' },
      { key: 'B', text: 'Transitioning to clean energy requires infrastructure investments alongside policy incentives.' },
      { key: 'C', text: 'Solar panels are inefficient in tropical regions.' },
      { key: 'D', text: 'Government regulation hampers private energy innovation.' },
    ],
    correctAnswer: 'B',
    explanation: 'The passage highlights that grid modernization and tax incentives are key catalysts for scaling clean energy adoption.',
    keyConcept: 'Reading Comprehension & Critical Inference',
    topic: 'Reading Comprehension',
    suggestedResource: 'JAMB Recommended Novel & Comprehension Guide',
  },
  {
    id: 'q3',
    subject: 'Mathematics',
    questionNumber: 3,
    questionText: 'If log₂ (x + 3) + log₂ (x - 3) = 4, calculate the positive real value of x.',
    options: [
      { key: 'A', text: 'x = 4' },
      { key: 'B', text: 'x = 5' },
      { key: 'C', text: 'x = 25' },
      { key: 'D', text: 'x = 7' },
    ],
    correctAnswer: 'B',
    explanation: 'Using log law: log₂( (x+3)(x-3) ) = 4 → log₂(x² - 9) = 4 → x² - 9 = 2⁴ = 16 → x² = 25 → x = 5 (since x > 3 for valid log).',
    keyConcept: 'Logarithmic Equations & Expansion: log(a) + log(b) = log(ab)',
    topic: 'Logarithms & Indices',
    suggestedResource: 'New General Mathematics - Chapter 4: Surds & Logarithms',
  },
  {
    id: 'q4',
    subject: 'Physics',
    questionNumber: 4,
    questionText: 'A car travelling at 20 m/s applies brakes and decelerates uniformly to a stop over a distance of 50 metres. Calculate the magnitude of the deceleration.',
    options: [
      { key: 'A', text: '2.0 m/s²' },
      { key: 'B', text: '4.0 m/s²' },
      { key: 'C', text: '8.0 m/s²' },
      { key: 'D', text: '5.0 m/s²' },
    ],
    correctAnswer: 'B',
    explanation: 'Use formula v² = u² + 2as. Final velocity v = 0, initial u = 20 m/s, distance s = 50m. 0 = 400 + 2(a)(50) → 100a = -400 → a = -4.0 m/s². Magnitude = 4.0 m/s².',
    keyConcept: 'Equations of Uniform Motion under Constant Acceleration',
    topic: 'Kinematics & Mechanics',
    suggestedResource: 'Senior Secondary Physics by P.N. Okeke - Chapter 2',
  },
  {
    id: 'q5',
    subject: 'Chemistry',
    questionNumber: 5,
    questionText: 'Which of the following organic compounds will decolorize acidified potassium permanganate (KMnO₄) solution?',
    options: [
      { key: 'A', text: 'Ethane (C₂H₆)' },
      { key: 'B', text: 'Ethene (C₂H₄)' },
      { key: 'C', text: 'Methane (CH₄)' },
      { key: 'D', text: 'Tetrachloromethane (CCl₄)' },
    ],
    correctAnswer: 'B',
    explanation: 'Ethene contains a carbon-carbon double bond (unsaturated hydrocarbon) which readily undergoes oxidation/addition with cold dilute acidified KMnO₄.',
    keyConcept: 'Unsaturation Test for Alkenes using KMnO₄ (Baeyer\'s Test)',
    topic: 'Organic Chemistry & Hydrocarbons',
    suggestedResource: 'New School Chemistry by Osei Yaw Ababio - Chapter 14',
  },
  {
    id: 'q6',
    subject: 'Biology',
    questionNumber: 6,
    questionText: 'During aerobic cellular respiration, which process yields the highest net quantity of ATP molecules per molecule of glucose oxidized?',
    options: [
      { key: 'A', text: 'Glycolysis' },
      { key: 'B', text: 'Krebs Cycle (Citric Acid Cycle)' },
      { key: 'C', text: 'Oxidative Phosphorylation (Electron Transport Chain)' },
      { key: 'D', text: 'Lactic Acid Fermentation' },
    ],
    correctAnswer: 'C',
    explanation: 'Oxidative Phosphorylation via the Electron Transport Chain across the inner mitochondrial membrane yields approximately 30-32 ATP out of the total ~36-38 ATP per glucose.',
    keyConcept: 'Cellular Respiration Pathways & Energy Budget',
    topic: 'Cell Biology & Energetics',
    suggestedResource: 'Modern Biology for Senior Secondary Schools - Respiration',
  },
];

export const MockExamCentreScreen: React.FC<MockExamCentreScreenProps> = ({ setActiveTab }) => {
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dark session overlay mode for distraction-free exam environment
  const [isDarkModeSession, setIsDarkModeSession] = useState<boolean>(false);

  // Quick Start Controls State
  const [selectedMockCategory, setSelectedMockCategory] = useState<string>('General UTME Mock 2026');
  const [selectedExamMode, setSelectedExamMode] = useState<string>('Standard Timed (2 Hours)');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Advanced');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(180);
  const [selectedDuration, setSelectedDuration] = useState<number>(120);
  const [hasAgreedRules, setHasAgreedRules] = useState<boolean>(true);

  // Modals state
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [selectedExamForModal, setSelectedExamForModal] = useState<MockExamCard | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Live Exam Simulation State
  const [isExamLive, setIsExamLive] = useState<boolean>(false);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<Record<string, boolean>>({});

  // Countdown Timer state (seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200); // 2 hours default

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExamLive && secondsRemaining > 0 && !isExamCompleted) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isExamLive, secondsRemaining, isExamCompleted]);

  // Format Timer HH:MM:SS
  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer color indicator
  const getTimerBadgeStyle = () => {
    if (secondsRemaining < 300) return 'bg-red-600 text-white animate-pulse';
    if (secondsRemaining < 900) return 'bg-amber-500 text-white';
    return 'bg-[#0F9D58] text-white';
  };

  // Start Exam Flow
  const handleOpenInstructions = (examCard?: MockExamCard) => {
    const card = examCard || SAMPLE_MOCK_EXAMS[0];
    setSelectedExamForModal(card);
    setShowInstructionsModal(true);
  };

  const handleConfirmStartExam = () => {
    if (!hasAgreedRules) {
      showToast('Please check the box agreeing to the academic rules first.');
      return;
    }
    setShowInstructionsModal(false);
    setIsExamLive(true);
    setIsExamCompleted(false);
    setSecondsRemaining((selectedExamForModal?.durationMinutes || 120) * 60);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setFlaggedQuestionIds({});
    showToast('Mock Exam Started! Good luck! 🚀');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Exam Flow
  const handleFinishSubmitExam = () => {
    setShowSubmitModal(false);
    setIsExamLive(false);
    setIsExamCompleted(true);
    showToast('Exam submitted successfully! Generating detailed performance report...');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Current Active Question
  const activeQuestion = DEMO_EXAM_QUESTIONS[currentQuestionIdx] || DEMO_EXAM_QUESTIONS[0];

  // Option selection
  const handleSelectOption = (qId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestionIds((prev) => {
      const nextState = !prev[qId];
      showToast(nextState ? 'Question flagged for review 🚩' : 'Unflagged question');
      return { ...prev, [qId]: nextState };
    });
  };

  const handleClearResponse = (qId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    showToast('Response cleared');
  };

  // Computed results metrics
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = DEMO_EXAM_QUESTIONS.length - answeredCount;
  const flaggedCount = Object.keys(flaggedQuestionIds).filter((k) => flaggedQuestionIds[k]).length;

  const correctCount = useMemo(() => {
    return DEMO_EXAM_QUESTIONS.reduce((acc, q) => {
      if (userAnswers[q.id] === q.correctAnswer) return acc + 1;
      return acc;
    }, 0);
  }, [userAnswers]);

  const scorePercentage = Math.round((correctCount / DEMO_EXAM_QUESTIONS.length) * 100);
  const utmeScaledScore = Math.round((correctCount / DEMO_EXAM_QUESTIONS.length) * 400);

  // Weak Areas List
  const weakAreasData = [
    { title: 'Algebra & Logarithms', subject: 'Mathematics', accuracy: 52, resource: 'New General Maths Ch 4', priority: 'High' },
    { title: 'Organic Reactions & Alkenes', subject: 'Chemistry', accuracy: 60, resource: 'Ababio Chemistry Ch 14', priority: 'High' },
    { title: 'Equations of Motion & Kinematics', subject: 'Physics', accuracy: 65, resource: 'Okeke Physics Ch 2', priority: 'Medium' },
    { title: 'Reading Comprehension Inference', subject: 'Use of English', accuracy: 72, resource: 'JAMB Novel Passage Drill', priority: 'Medium' },
  ];

  // Achievement Badges
  const achievementsList = [
    { title: 'First Mock Completed', desc: 'Finished your first full-length UTME drill', icon: 'workspace_premium', status: 'Unlocked', color: 'bg-emerald-100 text-[#0F9D58]' },
    { title: 'Top Performer (300+)', desc: 'Scored above 300 on a full mock set', icon: 'military_tech', status: 'Unlocked', color: 'bg-blue-100 text-[#2563EB]' },
    { title: 'Perfect Speed Control', desc: 'Finished 180 questions with 20m to spare', icon: 'speed', status: 'Unlocked', color: 'bg-amber-100 text-amber-700' },
    { title: '7-Day Revision Streak', desc: 'Completed daily practice 7 days in a row', icon: 'local_fire_department', status: 'Unlocked', color: 'bg-purple-100 text-purple-700' },
    { title: 'Subject Master: English', desc: 'Achieved >90% accuracy in Use of English', icon: 'psychology', status: 'Unlocked', color: 'bg-emerald-100 text-[#0F9D58]' },
    { title: 'Mock Exam Champion', desc: 'Complete 10 full-length mock simulations', icon: 'stars', status: 'In Progress (4/10)', color: 'bg-slate-100 text-slate-600' },
  ];

  // History Data
  const recentHistoryData = [
    { name: 'General UTME Mock 2026 (Full)', date: 'May 28, 2026', score: '312 / 400', duration: '1h 48m', status: 'UTME Distinction' },
    { name: 'Medical Sciences Super Mock', date: 'May 22, 2026', score: '286 / 400', duration: '1h 55m', status: 'Passed' },
    { name: 'Engineering & Physical Sciences', date: 'May 15, 2026', score: '274 / 400', duration: '1h 50m', status: 'Passed' },
    { name: 'Use of English Special Drill', date: 'May 08, 2026', score: '88 / 100', duration: '42m', status: 'High Distinction' },
  ];

  // FAQs
  const faqData = [
    {
      q: 'How often should I take a full-length mock exam?',
      a: 'We recommend taking 1 full-length mock exam every week during your early preparation phase, and 2 to 3 full mocks per week during the final month before your official UTME exam date.',
    },
    {
      q: 'Can I pause a mock exam once started?',
      a: 'In Standard Timed Mode, the timer continues running to simulate official exam conditions. In Untimed Practice Mode, you can pause or resume your session anytime.',
    },
    {
      q: 'Will my mock results and answers be saved?',
      a: 'Yes! All completed mock exams, scores, answer breakdowns, and performance analytics are saved automatically in your account dashboard for revision.',
    },
    {
      q: 'How is the UTME Readiness Score calculated?',
      a: 'Your Readiness Score incorporates your average scaled score out of 400, subject consistency, time-per-question speed, and accuracy trend across your last 5 mock examinations.',
    },
    {
      q: 'How do I improve my performance in weak subjects?',
      a: 'Use our targeted "Weak Areas" recommendations to revise specific textbook chapters and practice topic-focused drills on CBT Practice before taking your next full mock.',
    },
  ];

  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-300 ${isDarkModeSession ? 'bg-[#0B132B] text-slate-100' : 'bg-white text-[#0F172A]'} pb-24`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP BREADCRUMB NAV */}
      <div className={`${isDarkModeSession ? 'bg-[#1C2541] border-slate-800' : 'bg-[#F8FAFC] border-[#E2E8F0]'} border-b`}>
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
              onClick={() => setActiveTab && setActiveTab('study-hub')}
              className="hover:text-[#0F9D58] transition-colors"
            >
              Study Hub
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-[#0F9D58] font-bold">Mock Exam Centre</span>
          </div>

          {/* Dark Exam Atmosphere Toggle */}
          <button
            onClick={() => {
              setIsDarkModeSession(!isDarkModeSession);
              showToast(!isDarkModeSession ? 'Exam Dark Mode activated' : 'Standard Light Mode activated');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isDarkModeSession
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0] hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isDarkModeSession ? 'light_mode' : 'dark_mode'}
            </span>
            <span>{isDarkModeSession ? 'Light View' : 'Focus Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      {!isExamLive && (
        <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/25 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Pearson VUE &amp; CBT Standard Simulation</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
                Mock Exam <span className="text-[#82FAAB]">Centre</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                Experience a realistic UTME simulation, practise under timed conditions, and measure your readiness before exam day with instant score reporting and deep analytics.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                  <span>Authentic CBT Timing</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                  <span>Instant Diagnostic Analytics</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>Official Readiness Scoring</span>
                </span>
              </div>
            </div>

            {/* Hero Graphic Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined text-2xl">desktop_windows</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 font-medium">Exam Engine</p>
                      <p className="text-base font-bold font-display">JAMB CBT Simulator v4.2</p>
                    </div>
                  </div>
                  <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    Ready
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                    <span className="material-symbols-outlined text-[#82FAAB] text-xl">quiz</span>
                    <span className="text-[11px] font-bold">180 Qs</span>
                    <span className="text-[9px] text-slate-400">Standard</span>
                  </div>
                  <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                    <span className="material-symbols-outlined text-[#2563EB] text-xl">timer</span>
                    <span className="text-[11px] font-bold">120 Mins</span>
                    <span className="text-[9px] text-slate-400">Time Limit</span>
                  </div>
                  <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                    <span className="material-symbols-outlined text-amber-400 text-xl">workspace_premium</span>
                    <span className="text-[11px] font-bold">400 Pts</span>
                    <span className="text-[9px] text-slate-400">Scale</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenInstructions()}
                  className="w-full py-3 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>Launch Full Mock Simulation</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* 1. EXAM OVERVIEW STATS */}
        {!isExamLive && (
          <section className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className={`p-4 rounded-3xl border shadow-xs flex flex-col justify-between space-y-2 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#0F9D58]">
                <span className="material-symbols-outlined text-2xl">format_list_bulleted</span>
                <span className="text-[10px] font-bold bg-[#0F9D58]/10 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Available Mocks</p>
                <h3 className="text-xl font-bold font-display">124</h3>
              </div>
            </div>

            <div className={`p-4 rounded-3xl border shadow-xs flex flex-col justify-between space-y-2 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#2563EB]">
                <span className="material-symbols-outlined text-2xl">task_alt</span>
                <span className="text-[10px] font-bold bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">History</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Completed Mocks</p>
                <h3 className="text-xl font-bold font-display">18</h3>
              </div>
            </div>

            <div className={`p-4 rounded-3xl border shadow-xs flex flex-col justify-between space-y-2 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#16A34A]">
                <span className="material-symbols-outlined text-2xl">analytics</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-[#16A34A] px-2 py-0.5 rounded-full">Avg</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Average Score</p>
                <h3 className="text-xl font-bold font-display">284 / 400</h3>
              </div>
            </div>

            <div className={`p-4 rounded-3xl border shadow-xs flex flex-col justify-between space-y-2 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-amber-500">
                <span className="material-symbols-outlined text-2xl">military_tech</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Personal Best</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Highest Score</p>
                <h3 className="text-xl font-bold font-display">328 / 400</h3>
              </div>
            </div>

            <div className={`p-4 rounded-3xl border shadow-xs flex flex-col justify-between space-y-2 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-purple-600">
                <span className="material-symbols-outlined text-2xl">schedule</span>
                <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Time</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Total Study Hours</p>
                <h3 className="text-xl font-bold font-display">48.5 hrs</h3>
              </div>
            </div>

            <div className={`p-4 rounded-3xl border shadow-xs flex flex-col justify-between space-y-2 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between text-[#0F9D58]">
                <span className="material-symbols-outlined text-2xl">insights</span>
                <span className="text-[10px] font-bold bg-[#0F9D58]/10 text-[#0F9D58] px-2 py-0.5 rounded-full">Status</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Readiness Score</p>
                <h3 className="text-xl font-bold font-display text-[#0F9D58]">86 / 100</h3>
              </div>
            </div>
          </section>
        )}

        {/* 2. LIVE EXAM INTERFACE */}
        {isExamLive && (
          <section className="space-y-6 animate-in fade-in duration-300">
            {/* Live Exam Top Bar */}
            <div className={`p-5 rounded-3xl border shadow-lg flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display">
                    {selectedExamForModal?.title || 'General UTME Full Mock 2026'}
                  </h2>
                  <p className="text-xs text-[#475569]">
                    Question <span className="font-bold text-[#0F9D58]">{currentQuestionIdx + 1}</span> of {DEMO_EXAM_QUESTIONS.length} • {activeQuestion.subject}
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-2xl font-mono font-bold text-sm sm:text-base shadow-sm flex items-center gap-2 ${getTimerBadgeStyle()}`}>
                  <span className="material-symbols-outlined text-lg">timer</span>
                  <span>{formatTime(secondsRemaining)}</span>
                </div>

                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Submit Exam</span>
                </button>
              </div>
            </div>

            {/* Exam Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Question Main Panel */}
              <div className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                {/* Subject Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E2E8F0]">
                  {['Use of English', 'Mathematics', 'Physics', 'Chemistry', 'Biology'].map((subj) => (
                    <button
                      key={subj}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        activeQuestion.subject === subj
                          ? 'bg-[#0F9D58] text-white'
                          : isDarkModeSession
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-[#F8FAFC] text-[#475569]'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>

                {/* Question Text */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#475569] font-semibold">
                    <span>Question {activeQuestion.questionNumber}</span>
                    <button
                      onClick={() => handleToggleFlag(activeQuestion.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-xl font-bold border transition-all ${
                        flaggedQuestionIds[activeQuestion.id]
                          ? 'bg-red-50 text-red-600 border-red-300'
                          : 'bg-transparent text-[#475569] border-[#E2E8F0]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">flag</span>
                      <span>{flaggedQuestionIds[activeQuestion.id] ? 'Flagged' : 'Flag Question'}</span>
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold font-display leading-relaxed whitespace-pre-line">
                    {activeQuestion.questionText}
                  </h3>
                </div>

                {/* Answer Options A-D */}
                <div className="space-y-3 pt-2">
                  {activeQuestion.options.map((opt) => {
                    const isSelected = userAnswers[activeQuestion.id] === opt.key;
                    return (
                      <label
                        key={opt.key}
                        onClick={() => handleSelectOption(activeQuestion.id, opt.key)}
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#0F9D58] bg-[#0F9D58]/10 ring-2 ring-[#0F9D58]/20'
                            : isDarkModeSession
                            ? 'border-slate-700 bg-slate-800/60 hover:border-slate-500'
                            : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0F9D58]'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#0F9D58] text-white' : 'bg-slate-200 text-[#0F172A]'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm font-medium pt-1 leading-relaxed">{opt.text}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Actions Bottom Bar */}
                <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                    className={`py-2.5 px-4 rounded-2xl font-bold text-xs flex items-center gap-1 ${
                      currentQuestionIdx === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                        : 'bg-slate-100 text-[#0F172A] hover:bg-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleClearResponse(activeQuestion.id)}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#475569] font-bold text-xs rounded-2xl border border-[#E2E8F0]"
                    >
                      Clear Response
                    </button>

                    <button
                      onClick={() => {
                        if (currentQuestionIdx < DEMO_EXAM_QUESTIONS.length - 1) {
                          setCurrentQuestionIdx((prev) => prev + 1);
                        } else {
                          setShowSubmitModal(true);
                        }
                      }}
                      className="py-2.5 px-5 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-1"
                    >
                      <span>{currentQuestionIdx === DEMO_EXAM_QUESTIONS.length - 1 ? 'Review & Submit' : 'Next Question'}</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Palette Side Panel */}
              <div className={`lg:col-span-4 p-6 rounded-3xl border shadow-md space-y-5 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <h4 className="text-base font-bold font-display">Question Palette</h4>
                  <span className="text-xs font-bold text-[#0F9D58]">
                    {answeredCount} / {DEMO_EXAM_QUESTIONS.length} Answered
                  </span>
                </div>

                {/* Palette Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {DEMO_EXAM_QUESTIONS.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = idx === currentQuestionIdx;
                    const isFlagged = flaggedQuestionIds[q.id];

                    let btnStyle = 'bg-slate-100 text-[#475569] border-[#E2E8F0]';
                    if (isAnswered) btnStyle = 'bg-[#0F9D58] text-white border-[#0F9D58]';
                    if (isCurrent) btnStyle = 'bg-[#2563EB] text-white border-[#2563EB] ring-2 ring-blue-300';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={`relative h-10 rounded-xl border font-bold text-xs flex items-center justify-center transition-all ${btnStyle}`}
                      >
                        <span>{q.questionNumber}</span>
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#475569] pt-2 border-t border-[#E2E8F0]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58]"></span>
                    <span>Answered</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                    <span>Active</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span>Unanswered</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span>Flagged</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. QUICK START SETUP CARD */}
        {!isExamLive && !isExamCompleted && (
          <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-2">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Custom Test Setup</span>
                <h2 className="text-xl sm:text-2xl font-bold font-display">Quick Start Exam Setup</h2>
              </div>
              <span className="text-xs text-[#475569]">Configure duration, difficulty &amp; subject set</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Field 1: Select Mock Exam */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Select Mock Set</label>
                <select
                  value={selectedMockCategory}
                  onChange={(e) => setSelectedMockCategory(e.target.value)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A]"
                >
                  <option value="General UTME Mock 2026">General UTME Full Mock 2026 (4 Subjects)</option>
                  <option value="Medical & Science Super Mock">Medical &amp; Science Super Mock</option>
                  <option value="Engineering & Technology Mock">Engineering &amp; Physical Sciences</option>
                  <option value="Arts & Humanities Core Mock">Arts &amp; Humanities Core Mock</option>
                  <option value="Commercial & Economics Mock">Commercial &amp; Business Mock</option>
                </select>
              </div>

              {/* Field 2: Exam Mode */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Exam Mode</label>
                <select
                  value={selectedExamMode}
                  onChange={(e) => setSelectedExamMode(e.target.value)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A]"
                >
                  <option value="Standard Timed (2 Hours)">Standard Timed (Strict CBT Simulation)</option>
                  <option value="Speed Drill (45 Mins)">Speed Challenge (Fast Pace)</option>
                  <option value="Untimed Practice">Untimed Practice Mode (Learning)</option>
                </select>
              </div>

              {/* Field 3: Difficulty */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">Difficulty Level</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A]"
                >
                  <option value="Foundation">Foundation (Introductory)</option>
                  <option value="Intermediate">Intermediate (Standard UTME)</option>
                  <option value="Advanced">Advanced (High-Competition Candidates)</option>
                </select>
              </div>
            </div>

            {/* Checkbox & Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E2E8F0]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#475569]">
                <input
                  type="checkbox"
                  checked={hasAgreedRules}
                  onChange={(e) => setHasAgreedRules(e.target.checked)}
                  className="w-4 h-4 text-[#0F9D58] rounded border-slate-300 focus:ring-[#0F9D58]"
                />
                <span>I agree to adhere to academic integrity rules and exam time limits.</span>
              </label>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenInstructions()}
                  className="flex-1 sm:flex-none py-3.5 px-6 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  <span>Start Mock Exam</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 4. AVAILABLE MOCK EXAMS CARDS GRID */}
        {!isExamLive && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Exam Library</span>
                <h2 className="text-xl sm:text-2xl font-bold font-display">Available Mock Exams</h2>
              </div>
              <p className="hidden sm:block text-xs text-[#475569]">Select a specialized mock exam set</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_MOCK_EXAMS.map((exam) => (
                <div
                  key={exam.id}
                  className={`p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between group ${
                    isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exam.bgGradient} text-white flex items-center justify-center shadow-md`}>
                        <span className="material-symbols-outlined text-2xl">{exam.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-[#475569] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                        {exam.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-[#475569] mt-1 leading-relaxed">{exam.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#475569] pt-2 border-t border-[#E2E8F0]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#0F9D58]">quiz</span>
                        <span>{exam.questionsCount} Questions</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#2563EB]">timer</span>
                        <span>{exam.durationMinutes} Mins</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenInstructions(exam)}
                    className="w-full py-3 bg-[#F8FAFC] hover:bg-[#0F9D58] hover:text-white text-[#0F172A] font-bold text-xs rounded-2xl transition-all border border-[#E2E8F0] flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Start Mock Exam</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. RESULT DASHBOARD & PERFORMANCE (POST-SUBMIT OR DEMO RESULT) */}
        {(isExamCompleted || !isExamLive) && (
          <section className="space-y-8 pt-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Diagnostic Report</span>
                <h2 className="text-xl sm:text-2xl font-bold font-display">Result Dashboard &amp; Analytics</h2>
              </div>
              {isExamCompleted && (
                <button
                  onClick={() => setIsExamCompleted(false)}
                  className="text-xs font-bold text-[#0F9D58] hover:underline"
                >
                  Back to All Mocks
                </button>
              )}
            </div>

            {/* Score Ring & Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Score Circular Card */}
              <div className={`lg:col-span-5 p-8 rounded-3xl border shadow-xl text-center space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <h3 className="text-lg font-bold font-display">Overall Performance</h3>

                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="80" stroke="#E2E8F0" strokeWidth="14" fill="transparent" />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#0F9D58"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray="502"
                      strokeDashoffset={502 - (502 * (scorePercentage || 78)) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F9D58]">
                      {utmeScaledScore || 312}
                    </span>
                    <span className="text-xs font-bold text-[#475569]">out of 400 UTME Pts</span>
                    <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#16A34A] text-[10px] font-bold uppercase">
                      Distinction Grade A
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#16A34A] block">Correct</span>
                    <span className="text-base font-bold text-[#0F172A]">{correctCount || 156}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-red-600 block">Incorrect</span>
                    <span className="text-base font-bold text-[#0F172A]">{DEMO_EXAM_QUESTIONS.length - correctCount || 24}</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-amber-600 block">Skipped</span>
                    <span className="text-base font-bold text-[#0F172A]">{unansweredCount || 0}</span>
                  </div>
                </div>
              </div>

              {/* Subject Analytics Progress Bars */}
              <div className={`lg:col-span-7 p-8 rounded-3xl border shadow-xl space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-display">Subject Breakdown</h3>
                  <span className="text-xs font-bold text-[#2563EB]">High Probability of UTME Success</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>Use of English</span>
                      <span className="text-[#0F9D58]">88% (88 / 100)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>Mathematics</span>
                      <span className="text-[#2563EB]">72% (72 / 100)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>Physics</span>
                      <span className="text-amber-500">68% (68 / 100)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span>Chemistry</span>
                      <span className="text-purple-600">84% (84 / 100)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#475569] font-medium">
                  <span className="material-symbols-outlined text-base text-[#0F9D58]">schedule</span>
                  <span>Average time spent per question: <strong>38 seconds</strong> (Goal &lt; 40s)</span>
                </div>
              </div>
            </div>

            {/* 6. QUESTION REVIEW INTERFACE */}
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <h3 className="text-lg font-bold font-display">Detailed Question Review &amp; Explanations</h3>
                <span className="text-xs font-semibold text-[#475569]">Step-by-step solutions</span>
              </div>

              <div className="space-y-6">
                {DEMO_EXAM_QUESTIONS.map((q) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-2.5 py-1 rounded-xl">
                          Question #{q.questionNumber} • {q.subject}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCorrect ? 'bg-emerald-100 text-[#16A34A]' : 'bg-red-100 text-red-600'}`}>
                          {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">{q.questionText}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                        <div className="p-3 rounded-xl border bg-white border-[#E2E8F0]">
                          <span className="text-[10px] font-bold text-[#475569] uppercase block">Your Answer</span>
                          <span className="font-bold text-[#0F172A]">{userAns ? `Option ${userAns}` : 'Not Answered'}</span>
                        </div>
                        <div className="p-3 rounded-xl border bg-emerald-50 border-emerald-200">
                          <span className="text-[10px] font-bold text-[#16A34A] uppercase block">Correct Answer</span>
                          <span className="font-bold text-[#16A34A]">Option {q.correctAnswer}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
                        <span className="font-bold text-[#0F172A] block">Explanation:</span>
                        <p className="text-[#475569] leading-relaxed">{q.explanation}</p>
                        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-[#2563EB]">
                          <span>Key Concept: <strong>{q.keyConcept}</strong></span>
                          <button
                            onClick={() => setActiveTab && setActiveTab('textbooks')}
                            className="hover:underline font-bold"
                          >
                            Revise Topic Resource →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7. WEAK AREAS RECOMMENDATIONS */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display">Targeted Weak Areas &amp; Revision</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {weakAreasData.map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-3xl border shadow-sm space-y-3 flex flex-col justify-between ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        {item.priority} Priority
                      </span>
                      <h4 className="text-sm font-bold font-display mt-2">{item.title}</h4>
                      <p className="text-xs text-[#475569] mt-1">{item.subject} • Accuracy {item.accuracy}%</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                      <p className="text-[11px] font-semibold text-[#2563EB]">{item.resource}</p>
                      <button
                        onClick={() => setActiveTab && setActiveTab('cbt-practice')}
                        className="w-full py-2 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                      >
                        Start Targeted Drill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. PERSONAL ACHIEVEMENTS BADGES */}
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <h3 className="text-lg font-bold font-display">Personal Achievements &amp; Badges</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievementsList.map((badge, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col items-center text-center space-y-2">
                    <div className={`w-12 h-12 rounded-2xl ${badge.color} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-[#0F172A]">{badge.title}</span>
                    <span className="text-[10px] text-[#475569]">{badge.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. CERTIFICATE PREVIEW CARD */}
            <div className="bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-[10px] bg-white/20 border border-white/30 text-white font-bold px-3 py-1 rounded-full uppercase">
                  Official Practice Certificate
                </span>
                <h3 className="text-2xl font-bold font-display text-white">UTME Readiness Certificate</h3>
                <p className="text-xs text-slate-200 leading-relaxed max-w-xl">
                  Awarded to candidate <strong>Alex Sterling</strong> for scoring <strong>312 / 400</strong> in the General UTME Full Mock Simulation on <strong>July 2026</strong>.
                </p>
                <p className="text-[11px] text-slate-400 italic">* Note: This certificate is for practice &amp; self-evaluation purposes only.</p>
              </div>

              <div className="lg:col-span-4 flex justify-end">
                <button
                  onClick={() => showToast('Demo certificate generated and downloaded! 📜')}
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Download Certificate PDF</span>
                </button>
              </div>
            </div>

            {/* 10. RECENT MOCK HISTORY TABLE */}
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-5 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <h3 className="text-lg font-bold font-display">Recent Mock History</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#475569] uppercase font-bold text-[10px]">
                      <th className="py-3 px-4">Exam Name</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {recentHistoryData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#0F172A]">{row.name}</td>
                        <td className="py-3.5 px-4 text-[#475569]">{row.date}</td>
                        <td className="py-3.5 px-4 font-bold text-[#0F9D58]">{row.score}</td>
                        <td className="py-3.5 px-4 text-[#475569]">{row.duration}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-emerald-100 text-[#16A34A] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => showToast(`Loaded detailed report for ${row.name}`)}
                            className="py-1.5 px-3 bg-[#F8FAFC] hover:bg-[#0F9D58] hover:text-white text-[#0F172A] font-bold text-[11px] rounded-xl border border-[#E2E8F0] transition-colors"
                          >
                            Review Result
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 11. FAQ ACCORDION SECTION */}
        {!isExamLive && (
          <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkModeSession ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">Help &amp; Guidance</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm flex items-center justify-between gap-4 bg-[#F8FAFC] hover:bg-slate-200/50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs text-[#475569] leading-relaxed bg-white border-t border-[#E2E8F0]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 12. CALL TO ACTION BANNER */}
        {!isExamLive && (
          <section className="bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
              Measure Your Readiness with Confidence
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Simulate the real UTME experience, analyse your results, and continue improving with personalized recommendations before official examination day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenInstructions()}
                className="py-3.5 px-8 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>Take Another Mock</span>
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="py-3.5 px-8 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>Return to Study Hub</span>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* PRE-EXAM INSTRUCTIONS MODAL */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#0F172A] max-w-xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">gavel</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display">Exam Instructions &amp; Rules</h3>
                  <p className="text-xs text-[#475569]">{selectedExamForModal?.title}</p>
                </div>
              </div>
              <button onClick={() => setShowInstructionsModal(false)} className="text-[#475569] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#475569] leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <p className="font-bold text-[#0F172A]">Please read the following rules carefully before starting:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong>Timing:</strong> The countdown timer will start immediately upon clicking Start. Total time: {selectedExamForModal?.durationMinutes || 120} minutes.</li>
                <li><strong>Auto-Submit:</strong> Your exam answers will auto-submit when the timer reaches 00:00:00.</li>
                <li><strong>Navigation:</strong> Use the Question Palette or Next/Previous buttons to switch between questions.</li>
                <li><strong>Flagging:</strong> You can flag questions for later review before final submission.</li>
                <li><strong>Academic Integrity:</strong> Do not consult secondary aids to ensure your readiness score accurately reflects your current knowledge level.</li>
              </ul>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#0F172A] pt-2 border-t border-[#E2E8F0]">
              <input
                type="checkbox"
                checked={hasAgreedRules}
                onChange={(e) => setHasAgreedRules(e.target.checked)}
                className="w-4 h-4 text-[#0F9D58] rounded border-slate-300 focus:ring-[#0F9D58]"
              />
              <span>I have read and understood the instructions.</span>
            </label>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-[#475569] font-bold text-xs rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStartExam}
                className="py-2.5 px-6 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-1.5"
              >
                <span>Start Exam Now</span>
                <span className="material-symbols-outlined text-sm">play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#0F172A] max-w-md w-full p-6 rounded-3xl shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">help</span>
              </div>
              <div>
                <h3 className="text-base font-bold font-display">Confirm Exam Submission</h3>
                <p className="text-xs text-[#475569]">Are you sure you want to finish?</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                <span className="text-emerald-600 font-bold block">Answered</span>
                <span className="text-base font-bold">{answeredCount}</span>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                <span className="text-slate-500 font-bold block">Unanswered</span>
                <span className="text-base font-bold">{unansweredCount}</span>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                <span className="text-red-500 font-bold block">Flagged</span>
                <span className="text-base font-bold">{flaggedCount}</span>
              </div>
            </div>

            <p className="text-xs text-[#475569] text-center">
              Remaining time: <strong className="text-[#0F172A] font-mono">{formatTime(secondsRemaining)}</strong>
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-[#475569] font-bold text-xs rounded-2xl"
              >
                Continue Reviewing
              </button>
              <button
                onClick={handleFinishSubmitExam}
                className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-md"
              >
                Submit Mock Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
