import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface PastQuestionsScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

// Data Interface for Practice Questions
export interface PracticeQuestion {
  id: string;
  subject: string;
  year: string;
  topic: string;
  section: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  questionNumber: number;
  questionText: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyConcept: string;
  suggestedResource: string;
}

// Sample Question Collections
export interface QuestionCollection {
  id: string;
  subject: string;
  title: string;
  questionsCount: number;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  year: string;
  icon: string;
  bgGradient: string;
  attemptedCount: number;
  accuracy: number;
}

// Demo Practice Questions Data (Original Sample Questions)
const SAMPLE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'math-q1',
    subject: 'Mathematics',
    year: '2026 Sample Set',
    topic: 'Logarithms & Indices',
    section: 'Algebra',
    difficulty: 'Intermediate',
    questionNumber: 1,
    questionText: 'If log 2 = 0.3010 and log 3 = 0.4771, find the value of log 12 without using logarithm tables.',
    options: [
      { key: 'A', text: '0.7781' },
      { key: 'B', text: '1.0791' },
      { key: 'C', text: '1.2552' },
      { key: 'D', text: '0.9030' },
    ],
    correctAnswer: 'B',
    explanation: 'Express 12 as factors of 2 and 3: 12 = 2² × 3. Using logarithmic laws: log(12) = log(2² × 3) = 2 log(2) + log(3) = 2(0.3010) + 0.4771 = 0.6020 + 0.4771 = 1.0791.',
    keyConcept: 'Laws of Logarithms: log(a × b) = log(a) + log(b) and log(aⁿ) = n log(a)',
    suggestedResource: 'New General Mathematics - Chapter 4 (Surds & Logarithms)',
  },
  {
    id: 'math-q2',
    subject: 'Mathematics',
    year: '2026 Sample Set',
    topic: 'Quadratic Equations',
    section: 'Algebra',
    difficulty: 'Foundation',
    questionNumber: 2,
    questionText: 'Find the roots of the quadratic equation: 2x² - 5x + 3 = 0.',
    options: [
      { key: 'A', text: 'x = 1 or x = 3/2' },
      { key: 'B', text: 'x = -1 or x = -3/2' },
      { key: 'C', text: 'x = 2 or x = 3' },
      { key: 'D', text: 'x = 1/2 or x = 3' },
    ],
    correctAnswer: 'A',
    explanation: 'Factorizing 2x² - 5x + 3 = 0: split -5x into -2x and -3x → 2x(x - 1) - 3(x - 1) = 0 → (2x - 3)(x - 1) = 0. Thus, x = 1 or x = 3/2.',
    keyConcept: 'Quadratic Factorization: ax² + bx + c = 0',
    suggestedResource: 'Mathematics Syllabus Section 2: Polynomials & Equations',
  },
  {
    id: 'eng-q1',
    subject: 'English Language',
    year: '2024 Sample Set',
    topic: 'Synonyms & Vocabulary',
    section: 'Use of English',
    difficulty: 'Foundation',
    questionNumber: 3,
    questionText: 'In the sentence below, choose the option NEAREST IN MEANING to the underlined word:\n"The principal gave a METICULOUS explanation of the new school regulations."',
    options: [
      { key: 'A', text: 'Hasty and brief' },
      { key: 'B', text: 'Thorough and precise' },
      { key: 'C', text: 'Confusing and length' },
      { key: 'D', text: 'Vague and casual' },
    ],
    correctAnswer: 'B',
    explanation: '"Meticulous" means showing great attention to detail, careful, thorough, and precise.',
    keyConcept: 'Lexis & Structure: Contextual Vocabulary Analysis',
    suggestedResource: 'English Language Syllabus Section 3: Vocabulary Development',
  },
  {
    id: 'phy-q1',
    subject: 'Physics',
    year: '2024 Sample Set',
    topic: 'Kinematics & Motion',
    section: 'Mechanics',
    difficulty: 'Advanced',
    questionNumber: 4,
    questionText: 'A car accelerates uniformly from rest at a rate of 2.5 m/s² for 8 seconds. Calculate the total distance covered during this period.',
    options: [
      { key: 'A', text: '40 meters' },
      { key: 'B', text: '80 meters' },
      { key: 'C', text: '160 meters' },
      { key: 'D', text: '800 meters' },
    ],
    correctAnswer: 'B',
    explanation: 'Using the second equation of linear motion: s = ut + ½at². Given u = 0, a = 2.5 m/s², t = 8s: s = (0)(8) + ½(2.5)(8²) = 0.5 × 2.5 × 64 = 80 meters.',
    keyConcept: 'Equations of Uniformly Accelerated Motion',
    suggestedResource: 'Senior Secondary Physics by Okeke - Kinematics Chapter',
  },
  {
    id: 'chem-q1',
    subject: 'Chemistry',
    year: '2023 Sample Set',
    topic: 'Stoichiometry & Mole Concept',
    section: 'Physical Chemistry',
    difficulty: 'Intermediate',
    questionNumber: 5,
    questionText: 'What volume of oxygen at s.t.p. is required for the complete combustion of 5.6 dm³ of methane (CH₄)? [Molar volume of gas at s.t.p. = 22.4 dm³]',
    options: [
      { key: 'A', text: '5.6 dm³' },
      { key: 'B', text: '11.2 dm³' },
      { key: 'C', text: '22.4 dm³' },
      { key: 'D', text: '44.8 dm³' },
    ],
    correctAnswer: 'B',
    explanation: 'Balanced combustion equation: CH₄ + 2O₂ → CO₂ + 2H₂O. 1 mole of CH₄ reacts with 2 moles of O₂. By Gay-Lussac’s law of combining volumes, 1 volume of CH₄ requires 2 volumes of O₂. Volume of O₂ = 2 × 5.6 dm³ = 11.2 dm³.',
    keyConcept: 'Gas Stoichiometry & Gay-Lussac’s Law',
    suggestedResource: 'New School Chemistry by Ababio - Gas Calculations',
  },
  {
    id: 'bio-q1',
    subject: 'Biology',
    year: '2023 Sample Set',
    topic: 'Cell Biology & Organelles',
    section: 'Living Organisms',
    difficulty: 'Foundation',
    questionNumber: 6,
    questionText: 'Which of the following cellular organelles is primarily responsible for ATP energy production during aerobic respiration?',
    options: [
      { key: 'A', text: 'Ribosome' },
      { key: 'B', text: 'Mitochondrion' },
      { key: 'C', text: 'Golgi Apparatus' },
      { key: 'D', text: 'Endoplasmic Reticulum' },
    ],
    correctAnswer: 'B',
    explanation: 'The mitochondrion is known as the powerhouse of the cell because it generates Adenosine Triphosphate (ATP) through cellular respiration.',
    keyConcept: 'Cell Organelle Functions',
    suggestedResource: 'Essential Biology by M.C. Michael - Cell Structure Chapter',
  },
];

// Sample Question Collections
const QUESTION_COLLECTIONS: QuestionCollection[] = [
  {
    id: 'math-2026',
    subject: 'Mathematics',
    title: 'Mathematics 2026 UTME Drill Set',
    questionsCount: 120,
    difficulty: 'Intermediate',
    year: '2026',
    icon: 'calculate',
    bgGradient: 'from-[#0F172A] to-[#0F9D58]',
    attemptedCount: 84,
    accuracy: 85,
  },
  {
    id: 'eng-2024',
    subject: 'English Language',
    title: 'Use of English Comprehension & Lexis',
    questionsCount: 100,
    difficulty: 'Foundation',
    year: '2024',
    icon: 'spellcheck',
    bgGradient: 'from-[#1E1B4B] to-[#2563EB]',
    attemptedCount: 95,
    accuracy: 92,
  },
  {
    id: 'phy-2024',
    subject: 'Physics',
    title: 'Physics Mechanics, Waves & Optics',
    questionsCount: 95,
    difficulty: 'Advanced',
    year: '2024',
    icon: 'bolt',
    bgGradient: 'from-[#1E293B] to-[#D97706]',
    attemptedCount: 60,
    accuracy: 78,
  },
  {
    id: 'chem-2023',
    subject: 'Chemistry',
    title: 'Chemistry Organic & Physical Stoichiometry',
    questionsCount: 110,
    difficulty: 'Intermediate',
    year: '2023',
    icon: 'science',
    bgGradient: 'from-[#064E3B] to-[#10B981]',
    attemptedCount: 72,
    accuracy: 81,
  },
  {
    id: 'bio-2023',
    subject: 'Biology',
    title: 'Biology Diversity, Genetics & Ecology',
    questionsCount: 85,
    difficulty: 'Foundation',
    year: '2023',
    icon: 'biotech',
    bgGradient: 'from-[#14532D] to-[#16A34A]',
    attemptedCount: 50,
    accuracy: 88,
  },
  {
    id: 'econ-2022',
    subject: 'Economics',
    title: 'Economics Micro & Macro Theory',
    questionsCount: 90,
    difficulty: 'Intermediate',
    year: '2022',
    icon: 'trending_up',
    bgGradient: 'from-[#312E81] to-[#6366F1]',
    attemptedCount: 40,
    accuracy: 75,
  },
];

export const PastQuestionsScreen: React.FC<PastQuestionsScreenProps> = ({ setActiveTab }) => {
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('All');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('All');
  const [selectedSortBy, setSelectedSortBy] = useState<string>('Most Popular');

  // Active Question Viewer State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<Record<string, boolean>>({
    'math-q1': true,
    'eng-q1': true,
  });
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<Record<string, boolean>>({});
  const [weakTopicsList, setWeakTopicsList] = useState<string[]>(['Algebra', 'Organic Chemistry', 'Mechanics']);

  // Bookmarks Sub-Tab Filter
  const [bookmarkTabFilter, setBookmarkTabFilter] = useState<'All' | 'Recently Saved' | 'Needs Review' | 'Completed'>('Recently Saved');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered Questions list
  const filteredQuestions = useMemo(() => {
    return SAMPLE_QUESTIONS.filter((q) => {
      const matchesSearch =
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.year.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubjectFilter === 'All' || q.subject === selectedSubjectFilter;
      const matchesYear = selectedYearFilter === 'All' || q.year.includes(selectedYearFilter);
      const matchesDifficulty = selectedDifficultyFilter === 'All' || q.difficulty === selectedDifficultyFilter;

      return matchesSearch && matchesSubject && matchesYear && matchesDifficulty;
    });
  }, [searchQuery, selectedSubjectFilter, selectedYearFilter, selectedDifficultyFilter]);

  const currentQuestion = filteredQuestions[currentQuestionIndex] || SAMPLE_QUESTIONS[0];

  // Answer Select Handler
  const handleSelectOption = (questionId: string, key: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: key }));
  };

  // Toggle Reveal Solution
  const handleToggleSolution = (questionId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Toggle Bookmark
  const handleToggleBookmark = (questionId: string) => {
    setBookmarkedQuestionIds((prev) => {
      const isSaved = !prev[questionId];
      showToast(isSaved ? 'Question saved to Bookmarks 🔖' : 'Removed from Bookmarks');
      return { ...prev, [questionId]: isSaved };
    });
  };

  // Toggle Flag
  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestionIds((prev) => {
      const isFlagged = !prev[questionId];
      showToast(isFlagged ? 'Question flagged for review 🚩' : 'Unflagged question');
      return { ...prev, [questionId]: isFlagged };
    });
  };

  // Add to Weak Topics
  const handleAddWeakTopic = (topic: string) => {
    if (!weakTopicsList.includes(topic)) {
      setWeakTopicsList((prev) => [...prev, topic]);
      showToast(`Added "${topic}" to Weak Topics tracker 🎯`);
    } else {
      showToast(`"${topic}" is already in your Weak Topics list.`);
    }
  };

  // Filter Chips
  const filterChips = [
    'Mathematics',
    'English',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Government',
    'Literature',
    'Commerce',
    'Geography',
    'Agricultural Science',
    'CRS',
    'IRS',
  ];

  // Quick Access Cards Data
  const quickAccessCards = [
    {
      title: 'Practice by Subject',
      desc: 'Focus on specific topics to build deep understanding.',
      icon: 'menu_book',
      color: 'text-[#0F9D58]',
      action: () => setSelectedSubjectFilter('Mathematics'),
    },
    {
      title: 'Practice by Year',
      desc: 'Review exam papers from 2010 to 2026.',
      icon: 'calendar_month',
      color: 'text-[#2563EB]',
      action: () => setSelectedYearFilter('2026'),
    },
    {
      title: 'Timed Challenge',
      desc: 'Simulate pressure with our speed-based challenges.',
      icon: 'timer',
      color: 'text-amber-500',
      action: () => setActiveTab && setActiveTab('cbt-practice'),
    },
    {
      title: 'Mock Test',
      desc: 'Full exam simulation with live scoring and grading.',
      icon: 'quiz',
      color: 'text-purple-600',
      action: () => setActiveTab && setActiveTab('cbt-practice'),
    },
    {
      title: 'Saved Questions',
      desc: 'Review questions you bookmarked during practice.',
      icon: 'bookmark',
      color: 'text-emerald-600',
      action: () => {
        const element = document.getElementById('bookmarked-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'Review Incorrect Answers',
      desc: 'Targeted re-drills on past mistakes to boost accuracy.',
      icon: 'flaky',
      color: 'text-red-500',
      action: () => showToast('Loaded 15 recent incorrect question drills!'),
    },
  ];

  // Weak Topics Data
  const weakTopics = [
    { name: 'Algebra & Matrices', subject: 'Mathematics', accuracy: 58, resource: 'New General Maths Ch. 4', priority: 'High' },
    { name: 'Organic Reactions', subject: 'Chemistry', accuracy: 62, resource: 'Ababio Chemistry Ch. 12', priority: 'High' },
    { name: 'Newtonian Mechanics', subject: 'Physics', accuracy: 65, resource: 'Okeke Physics Mechanics', priority: 'Medium' },
    { name: 'Inference & Context', subject: 'English', accuracy: 70, resource: 'Use of English Passage Guide', priority: 'Medium' },
    { name: 'Constitutional History', subject: 'Government', accuracy: 74, resource: 'Anyaele Government Ch. 8', priority: 'Low' },
  ];

  // Achievement Badges
  const achievements = [
    { name: 'First 50 Questions', desc: 'Answered 50 practice questions', icon: 'workspace_premium', status: 'Unlocked', badgeBg: 'bg-emerald-100 text-emerald-700' },
    { name: '100% Accuracy Score', desc: 'Perfect score on a 10-question set', icon: 'verified', status: 'Unlocked', badgeBg: 'bg-blue-100 text-blue-700' },
    { name: '7-Day Practice Streak', desc: 'Practised consistently for 7 days', icon: 'local_fire_department', status: 'Unlocked', badgeBg: 'bg-amber-100 text-amber-700' },
    { name: 'Completed 500 Questions', desc: 'Over 500 questions solved', icon: 'military_tech', status: 'Unlocked', badgeBg: 'bg-purple-100 text-purple-700' },
    { name: 'Subject Expert', desc: 'Scored >90% in English Language', icon: 'psychology', status: 'Unlocked', badgeBg: 'bg-[#0F9D58]/10 text-[#0F9D58]' },
    { name: 'Consistency Champion', desc: 'Solve 1,000 total UTME questions', icon: 'military_tech', status: 'In Progress (82%)', badgeBg: 'bg-slate-100 text-slate-600' },
  ];

  // Related Resources
  const relatedResources = [
    { title: 'CBT Practice Simulator', desc: 'Timed mock exams matching official JAMB interface.', icon: 'desktop_windows', tab: 'cbt-practice' as TabType },
    { title: 'Interactive Syllabus', desc: 'Official JAMB subject breakdown and topic checklists.', icon: 'auto_stories', tab: 'syllabus' as TabType },
    { title: 'Study Notes & Cheat Sheets', desc: 'High-yield subject summaries and formula guides.', icon: 'note_stack', tab: 'study-hub' as TabType },
    { title: 'Recommended Textbooks', desc: 'Curated list of JAMB approved textbooks and novels.', icon: 'menu_book', tab: 'textbooks' as TabType },
    { title: 'Study Planner & Timetable', desc: 'Customizable revision schedules and countdown tracker.', icon: 'calendar_month', tab: 'study-hub' as TabType },
    { title: 'UTME Exam Tips & Secrets', desc: 'Proven speed and elimination strategies for CBT exams.', icon: 'lightbulb', tab: 'guide' as TabType },
  ];

  // Latest Study Articles
  const articles = [
    { title: 'Effective Question Practice Techniques for UTME', category: 'Study Strategy', readTime: '5 min read', icon: 'school' },
    { title: 'How to Learn From Mistakes & Fix Weak Topics', category: 'Exam Preparation', readTime: '6 min read', icon: 'psychology' },
    { title: 'Improving Exam Speed: Solving 60 Questions in 45 Minutes', category: 'CBT Tactics', readTime: '4 min read', icon: 'timer' },
    { title: 'Managing Time & Pressure During JAMB CBT', category: 'Mindset & Focus', readTime: '7 min read', icon: 'self_improvement' },
  ];

  // FAQ Accordion Data
  const faqs = [
    {
      q: 'How should I practise questions for maximum retention?',
      a: 'We recommend starting by subject and topic to build core conceptual understanding. Once you achieve over 80% accuracy in individual topics, transition to timed full-length past question sets and CBT mock exams.',
    },
    {
      q: 'Why are detailed step-by-step explanations important?',
      a: 'Understanding why an answer is correct—and why the other options are wrong—prevents memorization traps. UTME frequently tests similar concepts with slightly altered numbers or phrasing.',
    },
    {
      q: 'How many questions should I practise daily?',
      a: 'Aim for 30 to 50 practice questions per day across your four UTME subjects. Consistency beats cramming; daily exposure keeps formulas and vocabulary fresh in your memory.',
    },
    {
      q: 'Can I bookmark difficult questions to review later?',
      a: 'Yes! Simply click the Bookmark icon on any question card. All saved items are organized in your Bookmarked Questions panel for quick revision before your exam date.',
    },
    {
      q: 'How do I improve my weakest subjects?',
      a: 'Use the Performance Dashboard and Weak Topics section. When you miss a question, click "Add to Weak Topics" to generate targeted review modules and textbook reading recommendations.',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] font-sans min-h-screen pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* BREADCRUMB NAV */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
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
          <span className="text-[#0F172A] font-bold">Past Questions &amp; Solutions</span>
        </div>
      </div>

      {/* PAGE HEADER / HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">quiz</span>
              <span>Interactive Question Practice Centre</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              Past Questions &amp; <span className="text-[#82FAAB]">Solutions</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Practise with original sample questions, test your knowledge, review step-by-step explanations, and monitor your progress across all UTME subjects.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                <span>Original Demo Question Sets</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>Detailed Step-by-Step Solutions</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Real-Time Performance Tracking</span>
              </span>
            </div>
          </div>

          {/* Hero Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">laptop_mac</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Practice Engine</p>
                    <p className="text-base font-bold font-display">UTME Mastery Hub</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Active Drill
                </span>
              </div>

              {/* Graphic Stats Pill */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                  <span className="material-symbols-outlined text-[#82FAAB] text-2xl">task_alt</span>
                  <span className="text-[11px] font-bold text-white">1,248</span>
                  <span className="text-[9px] text-slate-400">Attempted</span>
                </div>

                <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                  <span className="material-symbols-outlined text-[#3B82F6] text-2xl">insights</span>
                  <span className="text-[11px] font-bold text-white">82%</span>
                  <span className="text-[9px] text-slate-400">Accuracy</span>
                </div>

                <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                  <span className="material-symbols-outlined text-amber-400 text-2xl">local_fire_department</span>
                  <span className="text-[11px] font-bold text-white">7 Days</span>
                  <span className="text-[9px] text-slate-400">Streak</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-center justify-between">
                <span>Recent Subject Drill</span>
                <span className="font-bold text-[#82FAAB]">Mathematics (Logarithms)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SMART SEARCH & FILTER PANEL */}
        <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/2">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by subject, topic, or year..."
                className="w-full pl-12 pr-10 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="w-full lg:w-1/2 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <select
                value={selectedYearFilter}
                onChange={(e) => setSelectedYearFilter(e.target.value)}
                className="w-full sm:w-auto flex-1 py-3 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">Year: All Years</option>
                <option value="2026">2026 Sample Set</option>
                <option value="2025">2025 Past Papers</option>
                <option value="2024">2024 Past Papers</option>
                <option value="2023">2023 Past Papers</option>
                <option value="2022">2022 Sample Set</option>
              </select>

              <select
                value={selectedDifficultyFilter}
                onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
                className="w-full sm:w-auto flex-1 py-3 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">Difficulty: All</option>
                <option value="Foundation">Foundation</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={selectedSortBy}
                onChange={(e) => setSelectedSortBy(e.target.value)}
                className="w-full sm:w-auto flex-1 py-3 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Most Popular">Sort: Most Popular</option>
                <option value="Newest">Sort: Newest First</option>
                <option value="Most Attempted">Sort: Most Attempted</option>
                <option value="Difficulty">Sort: By Difficulty</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            <span className="text-[#475569] shrink-0 font-bold mr-1">Subject Chips:</span>
            <button
              onClick={() => setSelectedSubjectFilter('All')}
              className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                selectedSubjectFilter === 'All'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border border-[#E2E8F0]'
              }`}
            >
              All Subjects
            </button>
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setSelectedSubjectFilter(chip)}
                className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                  selectedSubjectFilter === chip
                    ? 'bg-[#0F9D58] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border border-[#E2E8F0]'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* QUICK ACCESS CARDS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Fast Navigation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Quick Access Practice Modes
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">Choose your preferred practice strategy</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccessCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#0F9D58] transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center group-hover:bg-[#0F9D58]/10 transition-colors">
                    <span className={`material-symbols-outlined text-2xl ${card.color}`}>{card.icon}</span>
                  </div>
                  <span className="text-[10px] bg-[#F8FAFC] text-[#475569] font-bold px-2 py-1 rounded-full uppercase border border-[#E2E8F0]">
                    Mode
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-display text-[#0F172A] mb-1">{card.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
                </div>

                <button
                  onClick={card.action}
                  className="w-full py-2.5 px-4 bg-[#F8FAFC] hover:bg-[#0F9D58] hover:text-white text-[#0F172A] font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 border border-[#E2E8F0]"
                >
                  <span>Open Mode</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTION VIEWER INTERFACE (INTERACTIVE DEMO DRIVER) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Question Box */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E2E8F0] shadow-lg overflow-hidden space-y-0">
            {/* Header / Top metadata */}
            <div className="p-5 sm:p-6 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#0F9D58] text-white text-xs font-bold px-3 py-1 rounded-xl">
                  Question #{currentQuestion.questionNumber} of {filteredQuestions.length}
                </span>
                <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded-xl">
                  {currentQuestion.subject}
                </span>
                <span className="text-xs font-semibold text-[#475569] hidden sm:inline">
                  • {currentQuestion.topic} ({currentQuestion.year})
                </span>
              </div>

              {/* Action Buttons: Bookmark, Flag, Report */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleBookmark(currentQuestion.id)}
                  className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold ${
                    bookmarkedQuestionIds[currentQuestion.id]
                      ? 'bg-amber-50 text-amber-600 border-amber-300'
                      : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                  title="Bookmark Question"
                >
                  <span className="material-symbols-outlined text-base">
                    {bookmarkedQuestionIds[currentQuestion.id] ? 'bookmark_remove' : 'bookmark_add'}
                  </span>
                  <span className="hidden sm:inline">
                    {bookmarkedQuestionIds[currentQuestion.id] ? 'Saved' : 'Save'}
                  </span>
                </button>

                <button
                  onClick={() => handleToggleFlag(currentQuestion.id)}
                  className={`p-2 rounded-xl border transition-all text-xs font-bold flex items-center gap-1 ${
                    flaggedQuestionIds[currentQuestion.id]
                      ? 'bg-red-50 text-red-600 border-red-300'
                      : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                  title="Flag for Review"
                >
                  <span className="material-symbols-outlined text-base">flag</span>
                  <span className="hidden sm:inline">Flag</span>
                </button>

                <button
                  onClick={() => showToast('Issue reported to academic editorial team.')}
                  className="p-2 rounded-xl border border-[#E2E8F0] bg-white text-[#475569] hover:bg-slate-100 transition-all text-xs font-bold flex items-center gap-1"
                  title="Report Issue"
                >
                  <span className="material-symbols-outlined text-base">report_problem</span>
                </button>
              </div>
            </div>

            {/* Question Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-base sm:text-lg font-semibold font-display text-[#0F172A] leading-relaxed whitespace-pre-line">
                {currentQuestion.questionText}
              </h3>

              {/* 4 Answer Options (A - D) */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option.key;
                  const isSolutionRevealed = revealedSolutions[currentQuestion.id];
                  const isCorrectOption = option.key === currentQuestion.correctAnswer;

                  let optionBorder = 'border-[#E2E8F0] hover:border-[#0F9D58]';
                  let optionBg = 'bg-[#F8FAFC]';
                  let badgeBg = 'bg-[#CBD5E1] text-[#0F172A]';

                  if (isSelected) {
                    optionBorder = 'border-[#0F9D58] ring-2 ring-[#0F9D58]/20';
                    optionBg = 'bg-[#0F9D58]/5';
                    badgeBg = 'bg-[#0F9D58] text-white';
                  }

                  if (isSolutionRevealed) {
                    if (isCorrectOption) {
                      optionBorder = 'border-[#16A34A] ring-2 ring-[#16A34A]/20';
                      optionBg = 'bg-emerald-50';
                      badgeBg = 'bg-[#16A34A] text-white';
                    } else if (isSelected && !isCorrectOption) {
                      optionBorder = 'border-red-500 ring-2 ring-red-500/20';
                      optionBg = 'bg-red-50';
                      badgeBg = 'bg-red-500 text-white';
                    }
                  }

                  return (
                    <label
                      key={option.key}
                      onClick={() => handleSelectOption(currentQuestion.id, option.key)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border ${optionBorder} ${optionBg} cursor-pointer transition-all relative group`}
                    >
                      <span className={`w-8 h-8 rounded-xl ${badgeBg} flex items-center justify-center font-bold text-xs shrink-0 mt-0.5`}>
                        {option.key}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#0F172A] pt-1 leading-relaxed">
                        {option.text}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Solution Toggle Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleToggleSolution(currentQuestion.id)}
                  className="flex items-center gap-2 text-xs font-bold text-[#0F9D58] hover:underline"
                >
                  <span className="material-symbols-outlined text-lg">lightbulb</span>
                  <span>
                    {revealedSolutions[currentQuestion.id] ? 'Hide Solution & Explanation' : 'Show Correct Answer & Solution'}
                  </span>
                </button>
              </div>

              {/* ANSWER EXPLANATION PANEL */}
              {revealedSolutions[currentQuestion.id] && (
                <div className="p-5 sm:p-6 bg-emerald-50/70 border-l-4 border-[#0F9D58] rounded-r-2xl space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Correct Answer: Option {currentQuestion.correctAnswer}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-[#0F9D58] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A] mb-1">Detailed Explanation</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">{currentQuestion.explanation}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">Key Concept</span>
                      <p className="font-bold text-[#0F172A]">{currentQuestion.keyConcept}</p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">Suggested Resource</span>
                      <p className="font-bold text-[#2563EB]">{currentQuestion.suggestedResource}</p>
                    </div>
                  </div>

                  {/* Explanation Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => handleAddWeakTopic(currentQuestion.topic)}
                      className="py-2 px-3 bg-white hover:bg-red-50 text-red-600 font-bold text-[11px] rounded-xl border border-red-200 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">playlist_add</span>
                      <span>Add to Weak Topics</span>
                    </button>

                    <button
                      onClick={() => setActiveTab && setActiveTab('textbooks')}
                      className="py-2 px-3 bg-white hover:bg-blue-50 text-[#2563EB] font-bold text-[11px] rounded-xl border border-blue-200 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">menu_book</span>
                      <span>Review Topic Textbook</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className={`py-2.5 px-4 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  currentQuestionIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                    : 'bg-white text-[#0F172A] hover:bg-slate-200 border border-[#E2E8F0]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
                <span>Previous</span>
              </button>

              <div className="text-xs font-bold text-[#475569]">
                {currentQuestionIndex + 1} / {filteredQuestions.length}
              </div>

              <button
                disabled={currentQuestionIndex === filteredQuestions.length - 1}
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                className={`py-2.5 px-4 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  currentQuestionIndex === filteredQuestions.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                    : 'bg-[#0F9D58] text-white hover:bg-[#0d8a4d] shadow-sm'
                }`}
              >
                <span>Next Question</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Question Grid Sidebar Progress Indicator */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <h4 className="text-base font-bold font-display text-[#0F172A]">Question Palette</h4>
                <span className="text-xs font-bold text-[#0F9D58]">
                  {Object.keys(selectedAnswers).length} / {filteredQuestions.length} Answered
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0F9D58] h-full transition-all duration-300"
                    style={{
                      width: `${(Object.keys(selectedAnswers).length / filteredQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {filteredQuestions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIndex;
                  const isFlagged = flaggedQuestionIds[q.id];

                  let btnBg = 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]';
                  if (isAnswered) btnBg = 'bg-[#0F9D58] text-white border-[#0F9D58]';
                  if (isCurrent) btnBg = 'bg-[#2563EB] text-white border-[#2563EB] ring-2 ring-[#2563EB]/30';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`relative h-10 rounded-xl border font-bold text-xs flex items-center justify-center transition-all ${btnBg}`}
                    >
                      <span>{q.questionNumber}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-around text-[11px] text-[#475569] pt-2 border-t border-[#E2E8F0]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58]"></span>
                  <span>Answered</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                  <span>Active</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>Flagged</span>
                </span>
              </div>
            </div>

            {/* Daily Challenge Promo Box */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                </div>
                <div>
                  <h4 className="text-base font-bold font-display text-white">Daily UTME Drill</h4>
                  <p className="text-xs text-slate-300">Solve 5 random past questions today</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Maintain your 7-day practice streak and earn mastery badges by attempting 5 rapid questions daily.
              </p>

              <button
                onClick={() => showToast('Daily 5-Question Drill started! ⚡')}
                className="w-full py-3 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                <span>Start Daily Drill Now</span>
              </button>
            </div>
          </aside>
        </section>

        {/* QUESTION COLLECTIONS GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Featured Exam Papers
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Question Collections
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">Select a subject sample set to begin</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUESTION_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#0F9D58] transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Header Banner */}
                <div className={`p-6 bg-gradient-to-r ${col.bgGradient} text-white space-y-2 relative overflow-hidden`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-white/20 backdrop-blur-xs text-white font-bold px-2.5 py-1 rounded-full uppercase">
                      {col.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{col.year} UTME</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="material-symbols-outlined text-3xl text-[#82FAAB]">{col.icon}</span>
                    <h3 className="text-base font-bold font-display leading-tight">{col.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#475569] font-medium border-b border-[#E2E8F0] pb-3">
                    <span>{col.questionsCount} Demo Questions</span>
                    <span className="font-bold text-[#0F9D58]">{col.accuracy}% Avg Score</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-[#475569]">
                      <span>Your Progress</span>
                      <span>{col.attemptedCount} / {col.questionsCount}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0F9D58] h-full"
                        style={{ width: `${(col.attemptedCount / col.questionsCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedSubjectFilter(col.subject);
                      showToast(`Loaded ${col.title}!`);
                    }}
                    className="w-full py-3 bg-[#F8FAFC] group-hover:bg-[#0F9D58] group-hover:text-white text-[#0F172A] font-bold text-xs rounded-2xl border border-[#E2E8F0] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Practice Paper</span>
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PERFORMANCE DASHBOARD SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Analytics Engine
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">analytics</span>
                Performance Dashboard
              </h2>
            </div>

            <span className="text-xs bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] font-semibold px-3 py-1.5 rounded-xl">
              Updated Live from CBT Practice
            </span>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#475569] block">Attempted</span>
              <span className="text-xl sm:text-2xl font-extrabold font-display text-[#0F172A]">1,248</span>
              <span className="text-[10px] text-[#0F9D58] font-bold block">+42 this week</span>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#475569] block">Correct Answers</span>
              <span className="text-xl sm:text-2xl font-extrabold font-display text-[#16A34A]">1,023</span>
              <span className="text-[10px] text-emerald-600 font-bold block">82% total score</span>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#475569] block">Accuracy Rate</span>
              <span className="text-xl sm:text-2xl font-extrabold font-display text-[#2563EB]">82%</span>
              <span className="text-[10px] text-blue-600 font-bold block">Top 5% candidates</span>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#475569] block">Average Time</span>
              <span className="text-xl sm:text-2xl font-extrabold font-display text-[#0F172A]">45s</span>
              <span className="text-[10px] text-slate-500 font-bold block">Per question</span>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-center space-y-1">
              <span className="text-[11px] font-semibold text-[#475569] block">Best Subject</span>
              <span className="text-lg font-extrabold font-display text-[#0F9D58]">English</span>
              <span className="text-[10px] text-[#0F9D58] font-bold block">92% accuracy</span>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] text-center space-y-1 border-l-4 border-l-red-500">
              <span className="text-[11px] font-semibold text-[#475569] block">Weakest Subject</span>
              <span className="text-lg font-extrabold font-display text-red-600">Algebra</span>
              <span className="text-[10px] text-red-500 font-bold block">58% accuracy</span>
            </div>
          </div>
        </section>

        {/* WEAK TOPICS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
                Targeted Remediation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Weak Topics &amp; Recommended Revision
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">Focus practice where it matters most</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weakTopics.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md space-y-4 border-l-4 border-l-red-500 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded uppercase">
                      Priority: {item.priority}
                    </span>
                    <span className="text-xs font-bold text-[#475569]">{item.subject}</span>
                  </div>

                  <h3 className="text-base font-bold font-display text-[#0F172A]">{item.name}</h3>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold text-[#475569]">
                      <span>Current Mastery</span>
                      <span className="font-bold text-red-600">{item.accuracy}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: `${item.accuracy}%` }}></div>
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] font-medium">
                    📖 Suggested Text: <span className="text-[#0F172A] font-bold">{item.resource}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedSubjectFilter(item.subject);
                    showToast(`Started targeted revision drill for ${item.name}!`);
                  }}
                  className="w-full py-3 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">build</span>
                  <span>Start Revision Drill</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKMARKED QUESTIONS SECTION */}
        <section id="bookmarked-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-3">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Personal Saved Repository
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">bookmark</span>
                Bookmarked Questions
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-2xl border border-[#E2E8F0]">
              {(['All', 'Recently Saved', 'Needs Review', 'Completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setBookmarkTabFilter(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    bookmarkTabFilter === tab
                      ? 'bg-[#0F9D58] text-white shadow-xs'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_QUESTIONS.filter((q) => bookmarkedQuestionIds[q.id]).map((q) => (
              <div
                key={q.id}
                className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded-full">
                      {q.subject} • {q.topic}
                    </span>
                    <span className="text-[10px] font-bold text-[#475569]">{q.year}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A] line-clamp-2">
                    {q.questionText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                  <span className="text-xs text-[#16A34A] font-bold">Answer: Option {q.correctAnswer}</span>

                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(SAMPLE_QUESTIONS.findIndex((item) => item.id === q.id));
                      window.scrollTo({ top: 500, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
                  >
                    <span>Review Question</span>
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEARNING INSIGHTS & ACHIEVEMENTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Learning Insights */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Progress Analytics
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">insights</span>
                Learning Insights
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <span className="text-xs text-[#475569] font-medium">Most Improved Subject</span>
                <p className="text-base font-bold text-[#0F9D58]">Mathematics (+14%)</p>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <span className="text-xs text-[#475569] font-medium">Fastest Completion Time</span>
                <p className="text-base font-bold text-[#2563EB]">Physics (32s / q)</p>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <span className="text-xs text-[#475569] font-medium">Weekly Solved Questions</span>
                <p className="text-base font-bold text-[#0F172A]">180 Questions</p>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                <span className="text-xs text-[#475569] font-medium">Study Achievement Level</span>
                <p className="text-base font-bold text-amber-600">Level 4 UTME Scholar</p>
              </div>
            </div>
          </div>

          {/* Achievements Badges */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Milestones &amp; Badges
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">military_tech</span>
                Achievements
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0] flex flex-col items-center text-center space-y-2 hover:border-[#0F9D58] transition-all"
                >
                  <div className={`w-10 h-10 rounded-2xl ${badge.badgeBg} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">{badge.name}</h4>
                    <span className="text-[10px] text-[#475569] block mt-0.5">{badge.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED STUDY RESOURCES */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Comprehensive Prep Tools
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Related Study Resources
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">Explore supplementary learning modules</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((res, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab && setActiveTab(res.tab)}
                className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#0F9D58] transition-all cursor-pointer flex items-center justify-between space-x-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center shrink-0 group-hover:bg-[#0F9D58] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">{res.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-[#0F172A]">{res.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed mt-0.5">{res.desc}</p>
                  </div>
                </div>

                <span className="material-symbols-outlined text-[#475569] group-hover:text-[#0F9D58] group-hover:translate-x-1 transition-all text-xl shrink-0">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST STUDY ARTICLES */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Expert Guidance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Latest Study Articles
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">Tips for exam speed and accuracy</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((art, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#0F9D58] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F9D58]">
                    <span className="material-symbols-outlined text-xl">{art.icon}</span>
                  </div>

                  <span className="text-[10px] bg-[#0F9D58]/10 text-[#0F9D58] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {art.category}
                  </span>

                  <h3 className="text-sm font-bold font-display text-[#0F172A] leading-snug">{art.title}</h3>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#475569] font-medium border-t border-[#E2E8F0] pt-3">
                  <span>{art.readTime}</span>
                  <button
                    onClick={() => showToast(`Opening "${art.title}" guide...`)}
                    className="font-bold text-[#2563EB] hover:underline"
                  >
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Candidate Support
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">help_outline</span>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all bg-[#F8FAFC]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0F172A] hover:bg-slate-200/50 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base">quiz</span>
                      <span>{faq.q}</span>
                    </span>
                    <span className="material-symbols-outlined text-[#475569] text-lg shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0]/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION (CTA) */}
        <section className="relative w-full bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden text-center space-y-6">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              <span>Boost Your UTME Score Today</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Practise More. Improve Faster.
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Build confidence by practising regularly, reviewing explanations, and tracking your progress over time with JAMB Compass.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab && setActiveTab('cbt-practice')}
                className="py-3.5 px-8 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Start CBT Practice</span>
                <span className="material-symbols-outlined text-base">play_circle</span>
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="py-3.5 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center gap-2"
              >
                <span>Return to Study Hub</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
