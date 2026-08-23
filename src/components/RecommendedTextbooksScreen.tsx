import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface RecommendedTextbooksScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface Textbook {
  id: string;
  title: string;
  authors: string;
  subject: string;
  category: 'Sciences' | 'Commercial' | 'Arts' | 'Compulsory' | 'Humanities';
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  publicationType: 'Core Textbook' | 'Exam Guide' | 'Past Questions & Answers' | 'Literature Novel';
  coverBg: string; // gradient or theme color
  coverIcon: string;
  coverImage?: string;
  shortDesc: string;
  overview: string;
  whyUseful: string;
  keyTopics: string[];
  relatedSyllabusTopics: string[];
  relatedSyllabusSections: string[];
  recommendedApproach: string;
  readingLevel: string;
  estimatedHours: number;
  rating: number;
  reviewsCount: number;
  popularScore: number;
  status?: 'Recently Saved' | 'Currently Reading' | 'Completed' | 'Wishlist';
  progressPercent?: number;
}

// 12 High Quality UTME Recommended Textbooks
const ALL_TEXTBOOKS: Textbook[] = [
  {
    id: 'math-1',
    title: 'New General Mathematics for SS3',
    authors: 'M.F. Macrae, A.O. Kalejaiye, Z.I. Chima',
    subject: 'Mathematics',
    category: 'Sciences',
    difficulty: 'Advanced',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#0F172A] to-[#0F9D58]',
    coverIcon: 'calculate',
    shortDesc: 'The definitive textbook for WASSCE and UTME Mathematics, packed with stepped examples and exercises.',
    overview: 'New General Mathematics remains the premier reference text for senior secondary mathematics in Nigeria. It breaks down complex algebraic theorems, trigonometry, coordinate geometry, and introductory calculus into step-by-step practical examples aligned with the latest JAMB syllabus.',
    whyUseful: 'Provides exhaustive practice problems across every UTME topic with clear step-by-step solution keys.',
    keyTopics: ['Indices, Logarithms & Surds', 'Quadratic & Polynomial Equations', 'Circle Geometry & Trigonometry', 'Calculus: Differentiation & Integration'],
    relatedSyllabusTopics: ['Algebra & Matrices', 'Trigonometric Ratios', 'Coordinate Geometry', 'Probability'],
    relatedSyllabusSections: ['Section 1: Number and Numeration', 'Section 2: Algebra', 'Section 4: Calculus & Statistics'],
    recommendedApproach: 'Solve 10 problems daily starting from topic fundamentals before advancing to mixed UTME drill sets.',
    readingLevel: 'Senior Secondary / UTME',
    estimatedHours: 120,
    rating: 4.9,
    reviewsCount: 1420,
    popularScore: 98,
    status: 'Currently Reading',
    progressPercent: 65,
  },
  {
    id: 'eng-1',
    title: 'The Life Changer',
    authors: 'Khadija Abubakar Jalli',
    subject: 'English Language',
    category: 'Compulsory',
    difficulty: 'Foundation',
    publicationType: 'Literature Novel',
    coverBg: 'from-[#1E1B4B] to-[#2563EB]',
    coverIcon: 'auto_stories',
    shortDesc: 'Official JAMB prescribed prose text for Use of English. Mandatory for all 2026 UTME candidates.',
    overview: 'This short novel explores university campus life, integrity, morality, and family relationships through the character Ummi and her children. It contains crucial themes tested in the compulsory Use of English paper.',
    whyUseful: 'Direct source material for 10 to 15 questions in the UTME Use of English examination paper.',
    keyTopics: ['Character Analysis & Motivations', 'Campus Culture & Ethics', 'Plot Chronology & Key Events', 'Literary Devices & Idiomatic Expressions'],
    relatedSyllabusTopics: ['Passage Analysis', 'Inference & Contextual Meaning', 'Theme Identification'],
    relatedSyllabusSections: ['Section 1: Prescribed Text Analysis'],
    recommendedApproach: 'Read through once for storyline, then re-read chapter-by-chapter focusing on character quotes and thematic significance.',
    readingLevel: 'General UTME Candidates',
    estimatedHours: 15,
    rating: 4.8,
    reviewsCount: 3200,
    popularScore: 100,
    status: 'Completed',
    progressPercent: 100,
  },
  {
    id: 'phy-1',
    title: 'Senior Secondary School Physics',
    authors: 'P.N. Okeke, M.W. Anyakoha',
    subject: 'Physics',
    category: 'Sciences',
    difficulty: 'Advanced',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#1E293B] to-[#D97706]',
    coverIcon: 'bolt',
    shortDesc: 'The gold standard for UTME Physics, renowned for clear explanations of laws, formulas, and diagrams.',
    overview: 'Authored by legendary Nigerian physics educators, this book demystifies mechanics, wave motion, thermal physics, electricity, optics, and modern atomic physics with practical real-world applications.',
    whyUseful: 'Combines conceptual rigor with formula derivations and typical UTME numerical problem types.',
    keyTopics: ['Vectors & Kinematics', 'Thermal Expansion & Heat Capacity', 'Wave Optics & Refraction', 'Electromagnetism & Atomic Physics'],
    relatedSyllabusTopics: ['Newtonian Mechanics', 'Refraction at Plane & Curved Surfaces', 'Electric Current & Fields'],
    relatedSyllabusSections: ['Section 1: Mechanics & Matter', 'Section 2: Waves & Optics', 'Section 3: Electricity'],
    recommendedApproach: 'Study concept derivations first, memorize key SI units and formulas, then solve all end-of-chapter quantitative problems.',
    readingLevel: 'Senior Secondary / UTME',
    estimatedHours: 110,
    rating: 4.9,
    reviewsCount: 1150,
    popularScore: 95,
    status: 'Recently Saved',
    progressPercent: 25,
  },
  {
    id: 'chem-1',
    title: 'New School Chemistry for Senior Secondary',
    authors: 'O.Y. Ababio',
    subject: 'Chemistry',
    category: 'Sciences',
    difficulty: 'Intermediate',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#064E3B] to-[#10B981]',
    coverIcon: 'science',
    shortDesc: 'Known across West Africa as "Ababio", this book offers comprehensive coverage of all chemistry branches.',
    overview: 'New School Chemistry covers atomic structure, chemical bonding, stoichiometry, periodic trends, electrochemistry, organic functional groups, and industrial chemical processes.',
    whyUseful: 'Covers every single item in the UTME Chemistry syllabus with vivid reaction diagrams and stoichiometry equations.',
    keyTopics: ['Periodic Table & Atomic Structure', 'Stoichiometry & Mole Concept', 'Electrochemistry & Redox Reactions', 'Organic Chemistry & Hydrocarbons'],
    relatedSyllabusTopics: ['Gas Laws & Kinetic Theory', 'Acids, Bases & Salts', 'Alkanes, Alkenes & Alkanols'],
    relatedSyllabusSections: ['Section 1: Atomic Structure', 'Section 2: Physical Chemistry', 'Section 3: Organic Chemistry'],
    recommendedApproach: 'Practice drawing organic reaction structures and balancing stoichiometry equations daily.',
    readingLevel: 'Senior Secondary / UTME',
    estimatedHours: 105,
    rating: 4.9,
    reviewsCount: 1890,
    popularScore: 97,
    status: 'Wishlist',
    progressPercent: 0,
  },
  {
    id: 'bio-1',
    title: 'Essential Biology for Senior Secondary Schools',
    authors: 'M.C. Michael',
    subject: 'Biology',
    category: 'Sciences',
    difficulty: 'Foundation',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#14532D] to-[#16A34A]',
    coverIcon: 'biotech',
    shortDesc: 'An illustrated biology guide featuring detailed anatomical diagrams, cell structures, and ecological systems.',
    overview: 'Essential Biology breaks down biological diversity, cell biology, plant/animal nutrition, transport systems, genetics, evolution, and ecology into easily digestible visual modules.',
    whyUseful: 'High-density illustration layouts help students quickly recognize anatomical structure diagrams tested in UTME.',
    keyTopics: ['Cell Structure & Function', 'Plant & Animal Respiration', 'Genetics & Heredity', 'Ecology & Environmental Biology'],
    relatedSyllabusTopics: ['Ecosystem Dynamics', 'Mendelian Genetics', 'Organ Systems & Excretion'],
    relatedSyllabusSections: ['Section 1: Living Organisms', 'Section 2: Form & Function', 'Section 3: Ecology'],
    recommendedApproach: 'Focus on memorizing diagram labels and comparative tables (e.g., Mitosis vs Meiosis).',
    readingLevel: 'Senior Secondary / UTME',
    estimatedHours: 90,
    rating: 4.8,
    reviewsCount: 940,
    popularScore: 92,
  },
  {
    id: 'econ-1',
    title: 'Comprehensive Economics for Senior Secondary',
    authors: 'J.A. Aderinto, S.A. Abdullahi',
    subject: 'Economics',
    category: 'Commercial',
    difficulty: 'Intermediate',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#312E81] to-[#6366F1]',
    coverIcon: 'trending_up',
    shortDesc: 'Clear macroeconomic and microeconomic concepts with Nigerian economic development case studies.',
    overview: 'Covers demand and supply elasticity, market structures, national income accounting, inflation, money and banking, international trade, and West African economic organizations.',
    whyUseful: 'Includes graphical curves and mathematical calculation models frequently encountered in UTME Economics.',
    keyTopics: ['Demand, Supply & Price Determination', 'Production & Market Structures', 'National Income & Inflation', 'International Trade & Petroleum Economics'],
    relatedSyllabusTopics: ['Utility Theory', 'Money & Banking', 'Economic Growth Models'],
    relatedSyllabusSections: ['Section 1: Microeconomics', 'Section 2: Macroeconomics', 'Section 3: Nigerian Economy'],
    recommendedApproach: 'Practice plotting demand/supply shifts and calculating elasticity coefficients.',
    readingLevel: 'Senior Secondary / Commercial',
    estimatedHours: 85,
    rating: 4.7,
    reviewsCount: 680,
    popularScore: 89,
  },
  {
    id: 'gov-1',
    title: 'Government for Senior Secondary Schools',
    authors: 'J.U. Anyaele',
    subject: 'Government',
    category: 'Arts',
    difficulty: 'Intermediate',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#701A75] to-[#C084FC]',
    coverIcon: 'account_balance',
    shortDesc: 'Comprehensive history of political systems, constitutions, civil service, and Nigerian constitutional development.',
    overview: 'Examines basic political concepts, democracy, federalism, public administration, international organizations (ECOWAS, UN, AU), and pre-colonial to post-independence governance in Nigeria.',
    whyUseful: 'Detailed constitutional timeline covering 1922 Clifford to 1999 Constitution.',
    keyTopics: ['Basic Political Concepts & Isms', 'Constitutional Development in Nigeria', 'Public Administration & Civil Service', 'International Relations & ECOWAS'],
    relatedSyllabusTopics: ['Pre-Colonial Political Systems', 'Federalism in Nigeria', 'Foreign Policy'],
    relatedSyllabusSections: ['Section 1: Political Theory', 'Section 2: Constitutional History'],
    recommendedApproach: 'Create a chronological timeline table for Nigerian constitutional developments and nationalist movements.',
    readingLevel: 'Senior Secondary / Arts',
    estimatedHours: 80,
    rating: 4.8,
    reviewsCount: 750,
    popularScore: 88,
  },
  {
    id: 'lit-1',
    title: 'Exam Focus Literature in English for UTME',
    authors: 'J.O.J. Nwachukwu-Agbada et al.',
    subject: 'Literature in English',
    category: 'Arts',
    difficulty: 'Advanced',
    publicationType: 'Exam Guide',
    coverBg: 'from-[#831843] to-[#F43F5E]',
    coverIcon: 'menu_book',
    shortDesc: 'In-depth analysis of prescribed African and non-African prose, drama, and poetry texts.',
    overview: 'Provides scene-by-scene breakdowns, character studies, thematic explorations, literary device glossaries, and practice UTME questions for set books.',
    whyUseful: 'Saves time by condensing long plays and novels into structured analysis and key sample questions.',
    keyTopics: ['African & Non-African Prose Analysis', 'Drama & Stagecraft Analysis', 'Poetry Themes & Meter', 'Literary Terms & Devices'],
    relatedSyllabusTopics: ['Unseen Prose & Poetry', 'Set Text Dramas', 'Poetic Forms'],
    relatedSyllabusSections: ['Section 1: Literary Appreciation', 'Section 2: Prescribed Texts'],
    recommendedApproach: 'Read actual set plays/poems alongside Exam Focus summary notes for maximum thematic context.',
    readingLevel: 'Senior Secondary / Arts',
    estimatedHours: 75,
    rating: 4.9,
    reviewsCount: 820,
    popularScore: 91,
  },
  {
    id: 'com-1',
    title: 'Round-Up Commerce for Senior Secondary',
    authors: 'P.M. Onuoha',
    subject: 'Commerce',
    category: 'Commercial',
    difficulty: 'Foundation',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#065F46] to-[#059669]',
    coverIcon: 'store',
    shortDesc: 'Clear guide to trade, warehousing, insurance, banking, stock exchange, and e-commerce.',
    overview: 'Covers retail/wholesale trade, consumer protection, business units, capital structure, insurance principles, transportation, and digital commercial transactions.',
    whyUseful: 'Simplified definitions and practical business organization charts aligned with JAMB expectations.',
    keyTopics: ['Retail & Wholesale Trade', 'Insurance & Risk Management', 'Stock Exchange & Capital Markets', 'E-Commerce & Digital Payments'],
    relatedSyllabusTopics: ['Types of Business Units', 'Warehousing & Logistics', 'Commercial Law'],
    relatedSyllabusSections: ['Section 1: Elements of Commerce', 'Section 2: Financial Systems'],
    recommendedApproach: 'Focus on understanding trade documents, insurance terms, and stock market terminology.',
    readingLevel: 'Senior Secondary / Commercial',
    estimatedHours: 70,
    rating: 4.7,
    reviewsCount: 510,
    popularScore: 84,
  },
  {
    id: 'geo-1',
    title: 'Essential Geography for Senior Secondary',
    authors: 'O.A. Iwena',
    subject: 'Geography',
    category: 'Arts',
    difficulty: 'Intermediate',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#1E3A8A] to-[#3B82F6]',
    coverIcon: 'public',
    shortDesc: 'Covers physical, human, regional, and practical map reading techniques for UTME candidates.',
    overview: 'Examines landforms, climate zones, rocks, weathering, population dynamics, agriculture, industry, regional geography of Nigeria, and map reading skills.',
    whyUseful: 'Includes high-clarity contour maps and landform illustrations for practical map interpretation.',
    keyTopics: ['Map Reading & Scale Calculations', 'Physical Geography & Landforms', 'Climate & Vegetation Zones', 'Regional Geography of Nigeria'],
    relatedSyllabusTopics: ['Contour Lines & Gradient', 'Weathering & Erosion', 'Population Distribution'],
    relatedSyllabusSections: ['Section 1: Practical Geography', 'Section 2: Physical Geography'],
    recommendedApproach: 'Practice calculating grid references, scales, contours, and vertical exaggerations weekly.',
    readingLevel: 'Senior Secondary / Arts',
    estimatedHours: 85,
    rating: 4.8,
    reviewsCount: 430,
    popularScore: 82,
  },
  {
    id: 'agric-1',
    title: 'Essential Agricultural Science for SSS',
    authors: 'O.A. Iwena',
    subject: 'Agricultural Science',
    category: 'Sciences',
    difficulty: 'Foundation',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#365314] to-[#65A30D]',
    coverIcon: 'agriculture',
    shortDesc: 'Complete guide to crop production, soil science, animal husbandry, and agricultural economics.',
    overview: 'Provides essential knowledge on soil fertility, farm tools/mechanization, crop protection, livestock management, agricultural extension, and land tenure systems in Nigeria.',
    whyUseful: 'Richly illustrated with farm implements, crop diseases, and livestock pest identification guides.',
    keyTopics: ['Soil Science & Plant Nutrition', 'Crop Production & Disease Control', 'Animal Husbandry & Breeding', 'Farm Mechanization & Implements'],
    relatedSyllabusTopics: ['Land Tenure Systems', 'Pasture Management', 'Agro-Forestry'],
    relatedSyllabusSections: ['Section 1: Basic Agriculture', 'Section 2: Crop Science', 'Section 3: Animal Science'],
    recommendedApproach: 'Study botanical names, pest vectors, and soil nutrient deficiency symptoms carefully.',
    readingLevel: 'Senior Secondary / Sciences',
    estimatedHours: 75,
    rating: 4.7,
    reviewsCount: 390,
    popularScore: 80,
  },
  {
    id: 'crs-1',
    title: 'Christian Religious Knowledge for SSS',
    authors: 'E.A. Adegbola',
    subject: 'CRS',
    category: 'Humanities',
    difficulty: 'Foundation',
    publicationType: 'Core Textbook',
    coverBg: 'from-[#4C1D95] to-[#8B5CF6]',
    coverIcon: 'church',
    shortDesc: 'Covers Old Testament themes, Synoptic Gospels, and Apostolic Church ministry.',
    overview: 'Detailed exposition of creation, covenant, leadership, prophetic ministry, life and teachings of Jesus Christ, baptism, resurrection, and the early Church in Acts.',
    whyUseful: 'Includes precise scripture references and thematic summaries directly mapped to UTME CRS themes.',
    keyTopics: ['Sovereignty & Covenant', 'Leadership & Prophetism', 'Teachings & Miracles of Jesus', 'The Early Church & Epistles'],
    relatedSyllabusTopics: ['Old Testament Prophets', 'Sermon on the Mount', 'Pauline Epistles'],
    relatedSyllabusSections: ['Section 1: Old Testament', 'Section 2: New Testament'],
    recommendedApproach: 'Memorize key biblical chapter/verse anchors associated with major moral and historical events.',
    readingLevel: 'Senior Secondary / Humanities',
    estimatedHours: 65,
    rating: 4.8,
    reviewsCount: 460,
    popularScore: 81,
  },
];

// Featured Subjects List
const FEATURED_SUBJECTS = [
  { id: 'maths', name: 'Mathematics', icon: 'calculate', booksCount: 6, progress: 65, category: 'Sciences' },
  { id: 'english', name: 'English Language', icon: 'spellcheck', booksCount: 5, progress: 80, category: 'Compulsory' },
  { id: 'physics', name: 'Physics', icon: 'bolt', booksCount: 4, progress: 30, category: 'Sciences' },
  { id: 'chemistry', name: 'Chemistry', icon: 'science', booksCount: 5, progress: 45, category: 'Sciences' },
  { id: 'biology', name: 'Biology', icon: 'biotech', booksCount: 4, progress: 20, category: 'Sciences' },
  { id: 'economics', name: 'Economics', icon: 'trending_up', booksCount: 4, progress: 10, category: 'Commercial' },
];

export const RecommendedTextbooksScreen: React.FC<RecommendedTextbooksScreenProps> = ({ setActiveTab }) => {
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('All');
  const [selectedPublicationFilter, setSelectedPublicationFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Most Popular');

  // Saved / Library State
  const [savedBookIds, setSavedBookIds] = useState<Record<string, boolean>>({
    'math-1': true,
    'eng-1': true,
    'phy-1': true,
  });

  const [activeLibraryTab, setActiveLibraryTab] = useState<'Recently Saved' | 'Currently Reading' | 'Completed' | 'Wishlist'>('Currently Reading');

  // Selected Detail Textbook Modal State
  const [selectedBook, setSelectedBook] = useState<Textbook | null>(null);

  // Weekly Reading Plan State
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, string>>({
    Monday: 'New General Mathematics - Chapter 4 (Surds & Indices)',
    Tuesday: 'The Life Changer - Chapters 1 to 3 Character Analysis',
    Wednesday: 'Senior Secondary Physics - Vectors & Motion Equations',
    Thursday: 'New School Chemistry - Stoichiometry Calculations',
    Friday: 'Essential Biology - Cell Structure & Organelles',
    Saturday: 'UTME Past Questions Drill & Revision Notes',
    Sunday: 'Weekly Knowledge Recap & Flashcards Review',
  });
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editingPlanText, setEditingPlanText] = useState<string>('');

  // FAQ Accordion Index State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter & Search Logic
  const filteredTextbooks = useMemo(() => {
    return ALL_TEXTBOOKS.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubjectFilter === 'All' || book.subject === selectedSubjectFilter;
      const matchesCategory = selectedCategoryFilter === 'All' || book.category === selectedCategoryFilter;
      const matchesDifficulty = selectedDifficultyFilter === 'All' || book.difficulty === selectedDifficultyFilter;
      const matchesPublication = selectedPublicationFilter === 'All' || book.publicationType === selectedPublicationFilter;

      return matchesSearch && matchesSubject && matchesCategory && matchesDifficulty && matchesPublication;
    }).sort((a, b) => {
      if (sortBy === 'Most Popular') return b.popularScore - a.popularScore;
      if (sortBy === 'Newest') return b.estimatedHours - a.estimatedHours;
      if (sortBy === 'Alphabetical') return a.title.localeCompare(b.title);
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedSubjectFilter, selectedCategoryFilter, selectedDifficultyFilter, selectedPublicationFilter, sortBy]);

  // Toggle Save Book
  const toggleSaveBook = (bookId: string, bookTitle: string) => {
    setSavedBookIds((prev) => {
      const isSaved = !prev[bookId];
      showToast(isSaved ? `"${bookTitle}" saved to Study Library 📚` : `Removed "${bookTitle}" from library`);
      return { ...prev, [bookId]: isSaved };
    });
  };

  // Generate Auto Reading Plan
  const handleGenerateReadingPlan = () => {
    setWeeklyPlan({
      Monday: 'Mathematics: Indices, Surds & Logarithms (2.0 hrs)',
      Tuesday: 'Use of English: The Life Changer Novel Review (1.5 hrs)',
      Wednesday: 'Physics: Kinematics & Vector Resolution (2.5 hrs)',
      Thursday: 'Chemistry: Stoichiometry & Atomic Structure (2.0 hrs)',
      Friday: 'Biology: Cell Biology & Genetics (2.0 hrs)',
      Saturday: 'Full Syllabus CBT Practice Test & Weak Topic Drill (3.0 hrs)',
      Sunday: 'Textbook Revision & High-Yield Summary Reading (1.5 hrs)',
    });
    showToast('AI Reading Plan generated based on UTME syllabus weights! ⚡');
  };

  // Edit Day Plan
  const handleSaveDayEdit = () => {
    if (editingDay) {
      setWeeklyPlan((prev) => ({ ...prev, [editingDay]: editingPlanText }));
      setEditingDay(null);
      showToast(`Updated reading plan for ${editingDay}`);
    }
  };

  // Subject Filter Chips
  const filterChips = [
    'Mathematics',
    'English',
    'Biology',
    'Chemistry',
    'Physics',
    'Economics',
    'Government',
    'Literature',
    'Commerce',
    'Geography',
    'Agricultural Science',
    'CRS',
    'IRS',
  ];

  // Subject Collections
  const collections = [
    { name: 'Mathematics Collection', subject: 'Mathematics', count: 6, bg: 'from-[#0F172A] to-[#0F9D58]', icon: 'calculate' },
    { name: 'Science Collection', subject: 'Sciences', count: 18, bg: 'from-[#1E293B] to-[#2563EB]', icon: 'science' },
    { name: 'Arts Collection', subject: 'Arts', count: 12, bg: 'from-[#311B92] to-[#7C3AED]', icon: 'palette' },
    { name: 'Commercial Collection', subject: 'Commercial', count: 10, bg: 'from-[#064E3B] to-[#059669]', icon: 'store' },
    { name: 'Social Sciences Collection', subject: 'Humanities', count: 9, bg: 'from-[#78350F] to-[#D97706]', icon: 'public' },
  ];

  // Related Study Resources
  const relatedResources = [
    { title: 'Interactive Syllabus', desc: 'Browse official JAMB subject breakdown and topic checklists.', icon: 'auto_stories', tab: 'syllabus' as TabType },
    { title: 'Study Notes & Summaries', desc: 'High-yield chapter summaries and formula cheat sheets.', icon: 'note_stack', tab: 'study-hub' as TabType },
    { title: 'Past Questions Bank', desc: 'Over 15,000 solved UTME past questions with full step explanations.', icon: 'quiz', tab: 'cbt-practice' as TabType },
    { title: 'CBT Practice Simulator', desc: 'Timed mock examinations matching official JAMB CBT interface.', icon: 'desktop_windows', tab: 'cbt-practice' as TabType },
    { title: 'Revision Guides', desc: 'Quick 30-minute subject rapid revision cards.', icon: 'bolt', tab: 'study-hub' as TabType },
    { title: 'Study Timetable', desc: 'Customizable daily revision schedule and countdown tracker.', icon: 'calendar_month', tab: 'study-hub' as TabType },
  ];

  // Educational Articles
  const articles = [
    { title: 'How to Choose the Right Textbook for UTME 2026', category: 'Study Strategy', readTime: '5 min read', icon: 'menu_book' },
    { title: 'Effective Reading Strategies to Retain Complex Concepts', category: 'Exam Preparation', readTime: '7 min read', icon: 'psychology' },
    { title: 'Preparing for UTME with Recommended Books vs Online Notes', category: 'Resource Guide', readTime: '6 min read', icon: 'auto_awesome' },
    { title: '10 Study Habits That Improve Memory Retention in CBT Exams', category: 'Productivity', readTime: '8 min read', icon: 'lightbulb' },
  ];

  // Student Recommendations Mapping
  const studentRecommendations = [
    {
      baseSubject: 'Based on Mathematics',
      baseIcon: 'calculate',
      recommendations: [
        { title: 'Physics', desc: 'Senior Secondary Physics by Okeke', icon: 'bolt' },
        { title: 'Further Mathematics', desc: 'Advanced Pure & Applied Maths', icon: 'functions' },
        { title: 'Engineering Resources', desc: 'UTME Engineering Subject Combo Guide', icon: 'engineering' },
      ],
    },
    {
      baseSubject: 'Based on Biology',
      baseIcon: 'biotech',
      recommendations: [
        { title: 'Chemistry', desc: 'New School Chemistry by Ababio', icon: 'science' },
        { title: 'Health Sciences Resources', desc: 'Anatomy & Physiology Foundation Guide', icon: 'medical_services' },
        { title: 'Nursing Preparation', desc: 'UTME Medical & Nursing Entry Workbook', icon: 'health_and_safety' },
      ],
    },
  ];

  // FAQ Accordion List
  const faqs = [
    {
      q: 'Why are these textbooks recommended?',
      a: 'These textbooks are specifically curated because they align directly with the official Joint Admissions and Matriculation Board (JAMB) UTME syllabus. They cover all compulsory topics, provide worked examples, and are widely recommended by senior secondary school educators across Nigeria.',
    },
    {
      q: 'Do I need every single recommended textbook?',
      a: 'No. You do not need every single book listed. We recommend selecting one primary core textbook per subject and using secondary guides or digital study notes for topics you find particularly challenging.',
    },
    {
      q: 'Can I study using digital books or online summaries?',
      a: 'Yes! Digital summaries, e-learning platforms, and CBT practice software are excellent supplements. However, studying core concepts thoroughly in physical or complete e-textbooks provides the deep foundation needed for high UTME scores.',
    },
    {
      q: 'How should I plan my reading schedule?',
      a: 'Break down your subject textbooks by syllabus chapters. Use our Weekly Reading Planner to assign specific chapters or topic sections to each day of the week, ensuring you complete reading at least 4 weeks before your exam date.',
    },
    {
      q: 'How do textbooks relate to the official JAMB syllabus?',
      a: 'Each textbook card on JAMB Compass explicitly tags the exact syllabus sections and topics covered. Cross-referencing your reading with our Interactive Syllabus tool ensures zero gaps in your preparation.',
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

      {/* TEXTBOOK DETAILS MODAL / PANEL */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E2E8F0] max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-18 rounded-xl bg-gradient-to-br ${selectedBook.coverBg} text-white flex flex-col items-center justify-center shadow-md p-2 shrink-0`}>
                  <span className="material-symbols-outlined text-2xl mb-1">{selectedBook.coverIcon}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-center">{selectedBook.subject}</span>
                </div>
                <div>
                  <span className="text-[10px] bg-[#0F9D58]/10 text-[#0F9D58] font-bold px-2.5 py-0.5 rounded uppercase">
                    {selectedBook.publicationType}
                  </span>
                  <h3 className="text-xl font-bold font-display text-[#0F172A] mt-1">{selectedBook.title}</h3>
                  <p className="text-xs text-[#475569] font-medium">By {selectedBook.authors}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBook(null)}
                className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-slate-200 flex items-center justify-center text-[#475569] shrink-0"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Overview & Key Info */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm mb-1">Book Overview</h4>
                <p className="text-[#475569] leading-relaxed">{selectedBook.overview}</p>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-2">
                <h4 className="font-bold text-[#0F9D58] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Why This Book Is Useful
                </h4>
                <p className="text-[#0F172A]">{selectedBook.whyUseful}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                  <span className="text-[#475569] font-semibold text-[11px]">Recommended Study Approach</span>
                  <p className="text-[#0F172A] font-bold">{selectedBook.recommendedApproach}</p>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-1">
                  <span className="text-[#475569] font-semibold text-[11px]">Reading Duration & Level</span>
                  <p className="text-[#0F172A] font-bold">~{selectedBook.estimatedHours} Hours ({selectedBook.readingLevel})</p>
                </div>
              </div>

              {/* Key Topics & Syllabus Sections */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#0F172A]">Key Topics Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBook.keyTopics.map((topic, i) => (
                    <span key={i} className="bg-slate-100 text-[#0F172A] px-3 py-1 rounded-xl text-[11px] font-semibold">
                      • {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#0F172A]">Related Syllabus Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBook.relatedSyllabusSections.map((sec, i) => (
                    <span key={i} className="bg-[#2563EB]/10 text-[#2563EB] px-3 py-1 rounded-xl text-[11px] font-bold">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Legitimate Acquisition Note */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 flex items-start gap-2 text-[11px]">
                <span className="material-symbols-outlined text-base text-amber-600 shrink-0">info</span>
                <span>
                  <strong>Important Notice:</strong> Obtain textbooks from legitimate publishers, school libraries, registered educational institutions, or authorized booksellers to support authors and educational publishers.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  toggleSaveBook(selectedBook.id, selectedBook.title);
                }}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                  savedBookIds[selectedBook.id]
                    ? 'bg-slate-200 text-[#0F172A] hover:bg-slate-300'
                    : 'bg-[#0F9D58] text-white hover:bg-[#0d8a4d]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {savedBookIds[selectedBook.id] ? 'bookmark_remove' : 'bookmark_add'}
                </span>
                <span>{savedBookIds[selectedBook.id] ? 'In Study Library' : 'Save Book'}</span>
              </button>

              <button
                onClick={() => {
                  showToast(`Added "${selectedBook.title}" to Weekly Study Plan!`);
                  setSelectedBook(null);
                }}
                className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                <span>Add to Study Plan</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Book details link copied to clipboard!');
                }}
                className="p-3 rounded-2xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569]"
                title="Share book"
              >
                <span className="material-symbols-outlined text-sm">share</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BREADCRUMB */}
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
          <span className="text-[#0F172A] font-bold">Recommended Textbooks</span>
        </div>
      </div>

      {/* PAGE HEADER / HERO */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              <span>JAMB Approved Curriculum Resources</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              Recommended <span className="text-[#82FAAB]">Textbooks</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Browse subject-specific textbooks commonly recommended for UTME preparation and build your personal study library with structured reading goals and syllabus alignments.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                <span>Curated for All 19 UTME Subjects</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>Aligned with 2026 JAMB Syllabus</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Personal Weekly Reading Planner</span>
              </span>
            </div>
          </div>

          {/* Hero Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">local_library</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Digital Bookshelf</p>
                    <p className="text-base font-bold font-display">Study Library Engine</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  2026 Approved
                </span>
              </div>

              {/* Digital Bookshelf Visual */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                  <span className="material-symbols-outlined text-[#82FAAB] text-2xl">calculate</span>
                  <span className="text-[11px] font-bold text-white">Mathematics</span>
                  <span className="text-[9px] text-slate-400">6 Books</span>
                </div>

                <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                  <span className="material-symbols-outlined text-[#3B82F6] text-2xl">spellcheck</span>
                  <span className="text-[11px] font-bold text-white">English</span>
                  <span className="text-[9px] text-slate-400">5 Books</span>
                </div>

                <div className="bg-[#0F172A] p-3 rounded-2xl border border-slate-700/60 flex flex-col items-center text-center space-y-1">
                  <span className="material-symbols-outlined text-amber-400 text-2xl">bolt</span>
                  <span className="text-[11px] font-bold text-white">Physics</span>
                  <span className="text-[9px] text-slate-400">4 Books</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-center justify-between">
                <span>Personal Reading Progress</span>
                <span className="font-bold text-[#82FAAB]">65% Overall</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SEARCH & FILTER PANEL */}
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
                placeholder="Search textbooks, subjects, or authors..."
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
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full sm:w-auto flex-1 py-3 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">Category: All</option>
                <option value="Sciences">Sciences</option>
                <option value="Commercial">Commercial</option>
                <option value="Arts">Arts</option>
                <option value="Compulsory">Compulsory</option>
                <option value="Humanities">Humanities</option>
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto flex-1 py-3 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs text-[#0F172A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Most Popular">Sort: Most Popular</option>
                <option value="Newest">Sort: Estimated Hours</option>
                <option value="Alphabetical">Sort: Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            <span className="text-[#475569] shrink-0 font-bold mr-1">Quick Subjects:</span>
            <button
              onClick={() => setSelectedSubjectFilter('All')}
              className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 ${
                selectedSubjectFilter === 'All'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border border-[#E2E8F0]'
              }`}
            >
              All
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

        {/* FEATURED SUBJECTS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Subject Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Featured UTME Subjects
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">
              Filter books by core JAMB discipline
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_SUBJECTS.map((subj) => (
              <div
                key={subj.id}
                onClick={() => setSelectedSubjectFilter(subj.name)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer bg-white hover:border-[#0F9D58] hover:shadow-lg flex items-center justify-between space-x-4 ${
                  selectedSubjectFilter === subj.name ? 'border-[#0F9D58] bg-[#0F9D58]/5 ring-2 ring-[#0F9D58]/20' : 'border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{subj.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] font-display">{subj.name}</h3>
                    <p className="text-xs text-[#475569]">{subj.booksCount} Recommended Books</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#0F9D58] block">{subj.progress}% Read</span>
                  <button className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-0.5 justify-end mt-1">
                    <span>Explore</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED TEXTBOOKS GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Recommended Textbooks ({filteredTextbooks.length})
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Click any textbook to view detailed syllabus topics, study hours, and reading recommendations
              </p>
            </div>
          </div>

          {filteredTextbooks.length === 0 ? (
            <div className="p-12 text-center bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#475569]">search_off</span>
              <h3 className="text-base font-bold text-[#0F172A]">No Textbooks Found</h3>
              <p className="text-xs text-[#475569]">Try clearing search or adjusting your subject filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubjectFilter('All');
                  setSelectedCategoryFilter('All');
                  setSelectedDifficultyFilter('All');
                }}
                className="mt-2 bg-[#0F9D58] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTextbooks.map((book) => {
                const isSaved = savedBookIds[book.id];

                return (
                  <div
                    key={book.id}
                    className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                  >
                    {/* Book Header / Cover Banner */}
                    <div className={`bg-gradient-to-br ${book.coverBg} p-6 text-white relative min-h-[140px] flex flex-col justify-between`}>
                      <div className="flex items-start justify-between">
                        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {book.subject}
                        </span>

                        <span className="bg-black/30 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          {book.difficulty}
                        </span>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-3xl text-slate-200">{book.coverIcon}</span>
                          <div>
                            <span className="text-[10px] text-slate-300 block">UTME Standard</span>
                            <span className="text-xs font-bold text-white">~{book.estimatedHours} Hours Study</span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSaveBook(book.id, book.title)}
                          className={`p-2 rounded-xl transition-all ${
                            isSaved ? 'bg-amber-500 text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                          title={isSaved ? 'Saved in library' : 'Save to library'}
                        >
                          <span className="material-symbols-outlined text-base">
                            {isSaved ? 'bookmark' : 'bookmark_border'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Book Body */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-[#0F172A] font-display line-clamp-1 group-hover:text-[#0F9D58] transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#475569] font-medium">By {book.authors}</p>
                        <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">{book.shortDesc}</p>
                      </div>

                      {/* Related Syllabus Topics Tags */}
                      <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                        <span className="text-[10px] font-bold text-[#0F9D58] uppercase block">
                          Related Syllabus Topics:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {book.relatedSyllabusTopics.slice(0, 2).map((topic, i) => (
                            <span key={i} className="bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-2 py-0.5 rounded text-[10px] font-medium">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBook(book)}
                          className="flex-1 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-2.5 rounded-2xl transition-colors shadow-xs flex items-center justify-center gap-1"
                        >
                          <span>View Details</span>
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>

                        <button
                          onClick={() => toggleSaveBook(book.id, book.title)}
                          className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-colors ${
                            isSaved
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                          }`}
                        >
                          {isSaved ? 'Saved' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* MY STUDY LIBRARY */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Personal Progress
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">My Study Library</h2>
            </div>

            {/* Library Tab Filter */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] p-1 rounded-2xl border border-[#E2E8F0] text-xs font-bold overflow-x-auto">
              {(['Currently Reading', 'Recently Saved', 'Completed', 'Wishlist'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveLibraryTab(tab)}
                  className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                    activeLibraryTab === tab ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALL_TEXTBOOKS.filter((b) => savedBookIds[b.id] || b.status === activeLibraryTab).map((book) => (
              <div key={book.id} className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#0F9D58] uppercase">{book.subject}</span>
                    <h4 className="text-sm font-bold text-[#0F172A] line-clamp-1">{book.title}</h4>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-[#0F172A] font-bold px-2 py-0.5 rounded">
                    {book.progressPercent ?? 30}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0F9D58] h-full"
                    style={{ width: `${book.progressPercent ?? 30}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#475569]">
                  <span>Est. ~{book.estimatedHours} hrs</span>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="text-[#2563EB] font-bold hover:underline"
                  >
                    Open Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUBJECT COLLECTIONS */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Curated Stacks
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">Subject Collections</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {collections.map((col, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${col.bg} text-white flex items-center justify-center shadow-md`}>
                  <span className="material-symbols-outlined text-2xl">{col.icon}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] font-display">{col.name}</h3>
                  <p className="text-xs text-[#475569]">{col.count} Recommended Books</p>
                </div>

                <button
                  onClick={() => setSelectedCategoryFilter(col.subject === 'Mathematics' ? 'Sciences' : col.subject)}
                  className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] hover:text-white text-[#0F172A] text-xs font-bold py-2 rounded-xl transition-colors border border-[#E2E8F0]"
                >
                  Explore Collection
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* WEEKLY READING PLANNER */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold text-[#82FAAB] uppercase tracking-wider block mb-1">
                Structured Timetable
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">Weekly Reading Planner</h2>
            </div>

            <button
              onClick={handleGenerateReadingPlan}
              className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-sm">auto_fix_high</span>
              <span>Generate Reading Plan</span>
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 text-xs">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-[#82FAAB] block mb-1">{day}</span>
                  {editingDay === day ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingPlanText}
                        onChange={(e) => setEditingPlanText(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs focus:outline-none"
                        rows={3}
                      />
                      <button
                        onClick={handleSaveDayEdit}
                        className="w-full bg-[#16A34A] text-white font-bold py-1 rounded-lg text-[10px]"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-200 text-[11px] leading-relaxed">{weeklyPlan[day]}</p>
                  )}
                </div>

                {editingDay !== day && (
                  <button
                    onClick={() => {
                      setEditingDay(day);
                      setEditingPlanText(weeklyPlan[day]);
                    }}
                    className="text-[10px] text-[#82FAAB] font-bold hover:underline self-end mt-2"
                  >
                    Edit Task
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOOKMARKS & READING NOTES STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">bookmark</span>
            </div>
            <div>
              <span className="text-xl font-bold font-display text-[#0F172A]">
                {Object.keys(savedBookIds).length} Books
              </span>
              <p className="text-xs text-[#475569]">Saved Books in Library</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <div>
              <span className="text-xl font-bold font-display text-[#0F172A]">24 Chapter Notes</span>
              <p className="text-xs text-[#475569]">Personal Reading Notes</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">highlight</span>
            </div>
            <div>
              <span className="text-xl font-bold font-display text-[#0F172A]">142 Topics</span>
              <p className="text-xs text-[#475569]">Highlighted Syllabus Concepts</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">insights</span>
            </div>
            <div>
              <span className="text-xl font-bold font-display text-[#0F172A]">68% Target</span>
              <p className="text-xs text-[#475569]">Overall UTME Reading Progress</p>
            </div>
          </div>
        </section>

        {/* STUDENT RECOMMENDATIONS */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Personalized Guidance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">Student Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentRecommendations.map((group, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                    <span className="material-symbols-outlined">{group.baseIcon}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] font-display">{group.baseSubject}</h3>
                </div>

                <div className="space-y-3">
                  {group.recommendations.map((rec, rIdx) => (
                    <div key={rIdx} className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#2563EB]">{rec.icon}</span>
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A]">{rec.title}</h4>
                          <p className="text-[11px] text-[#475569]">{rec.desc}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedSubjectFilter(rec.title)}
                        className="text-xs font-bold text-[#0F9D58] hover:underline"
                      >
                        Explore
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED STUDY RESOURCES */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Complementary Tools
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">Related Study Resources</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedResources.map((res, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{res.icon}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] font-display">{res.title}</h3>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">{res.desc}</p>

                <button
                  onClick={() => setActiveTab && setActiveTab(res.tab)}
                  className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] hover:text-white text-[#0F172A] text-xs font-bold py-2.5 rounded-2xl transition-colors border border-[#E2E8F0] flex items-center justify-center gap-1.5"
                >
                  <span>Open Resource</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST EDUCATIONAL ARTICLES */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Expert Advice
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">Latest Educational Articles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((art, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                    <span className="material-symbols-outlined">{art.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#0F9D58] uppercase block">{art.category}</span>
                  <h3 className="text-xs font-bold text-[#0F172A] leading-snug font-display line-clamp-2">{art.title}</h3>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#475569]">{art.readTime}</span>
                  <button
                    onClick={() => showToast(`Opening article: "${art.title}"`)}
                    className="font-bold text-[#2563EB] hover:underline"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Common Enquiries
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all bg-[#F8FAFC]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0F172A] hover:text-[#0F9D58]"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-sm text-[#475569]">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0]/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Build Your Study Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Choose quality learning resources, organise your reading plan, and prepare confidently for the UTME.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition-colors"
              >
                Explore Study Hub
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('cbt-practice')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-6 py-3.5 rounded-2xl border border-white/20 transition-colors"
              >
                Start CBT Practice
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
