import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface JambSyllabusScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

interface SyllabusTopic {
  id: string;
  name: string;
  estimatedTime: string; // e.g. "2.0 hrs"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resourceType: 'Practice CBT' | 'Study Notes' | 'Video Lesson' | 'Past Questions';
  completed: boolean;
}

interface SyllabusSection {
  id: string;
  title: string;
  description: string;
  learningObjectives: string;
  topics: SyllabusTopic[];
}

interface SubjectDetail {
  id: string;
  name: string;
  category: 'Compulsory' | 'Sciences' | 'Commercial' | 'Arts' | 'Humanities';
  icon: string;
  topicCount: number;
  estimatedHours: number;
  difficulty: 'Standard UTME' | 'Advanced' | 'Intermediate';
  introduction: string;
  learningObjectives: string[];
  recommendedDuration: string;
  recommendedTextbooks: string[];
  sections: SyllabusSection[];
}

// 19 Complete UTME Subjects
const ALL_SUBJECTS: {
  id: string;
  name: string;
  category: 'Compulsory' | 'Sciences' | 'Commercial' | 'Arts' | 'Humanities';
  icon: string;
  topicCount: number;
  estimatedHours: number;
  difficulty: 'Standard UTME' | 'Advanced' | 'Intermediate';
}[] = [
  { id: 'english', name: 'English Language', category: 'Compulsory', icon: 'spellcheck', topicCount: 45, estimatedHours: 50, difficulty: 'Standard UTME' },
  { id: 'maths', name: 'Mathematics', category: 'Sciences', icon: 'calculate', topicCount: 38, estimatedHours: 48, difficulty: 'Advanced' },
  { id: 'biology', name: 'Biology', category: 'Sciences', icon: 'biotech', topicCount: 42, estimatedHours: 42, difficulty: 'Standard UTME' },
  { id: 'chemistry', name: 'Chemistry', category: 'Sciences', icon: 'science', topicCount: 40, estimatedHours: 45, difficulty: 'Standard UTME' },
  { id: 'physics', name: 'Physics', category: 'Sciences', icon: 'bolt', topicCount: 36, estimatedHours: 46, difficulty: 'Advanced' },
  { id: 'economics', name: 'Economics', category: 'Commercial', icon: 'trending_up', topicCount: 34, estimatedHours: 38, difficulty: 'Standard UTME' },
  { id: 'government', name: 'Government', category: 'Arts', icon: 'account_balance', topicCount: 32, estimatedHours: 36, difficulty: 'Standard UTME' },
  { id: 'literature', name: 'Literature in English', category: 'Arts', icon: 'auto_stories', topicCount: 28, estimatedHours: 40, difficulty: 'Standard UTME' },
  { id: 'commerce', name: 'Commerce', category: 'Commercial', icon: 'store', topicCount: 30, estimatedHours: 32, difficulty: 'Standard UTME' },
  { id: 'geography', name: 'Geography', category: 'Arts', icon: 'public', topicCount: 35, estimatedHours: 40, difficulty: 'Standard UTME' },
  { id: 'agric', name: 'Agricultural Science', category: 'Sciences', icon: 'agriculture', topicCount: 38, estimatedHours: 35, difficulty: 'Standard UTME' },
  { id: 'crs', name: 'CRS', category: 'Humanities', icon: 'church', topicCount: 26, estimatedHours: 30, difficulty: 'Standard UTME' },
  { id: 'irs', name: 'IRS', category: 'Humanities', icon: 'mosque', topicCount: 26, estimatedHours: 30, difficulty: 'Standard UTME' },
  { id: 'history', name: 'History', category: 'Arts', icon: 'history_edu', topicCount: 29, estimatedHours: 34, difficulty: 'Standard UTME' },
  { id: 'arabic', name: 'Arabic', category: 'Humanities', icon: 'translate', topicCount: 24, estimatedHours: 28, difficulty: 'Standard UTME' },
  { id: 'french', name: 'French', category: 'Humanities', icon: 'language', topicCount: 25, estimatedHours: 30, difficulty: 'Standard UTME' },
  { id: 'yoruba', name: 'Yoruba', category: 'Humanities', icon: 'record_voice_over', topicCount: 22, estimatedHours: 25, difficulty: 'Standard UTME' },
  { id: 'igbo', name: 'Igbo', category: 'Humanities', icon: 'chat', topicCount: 22, estimatedHours: 25, difficulty: 'Standard UTME' },
  { id: 'hausa', name: 'Hausa', category: 'Humanities', icon: 'forum', topicCount: 22, estimatedHours: 25, difficulty: 'Standard UTME' },
];

// Rich Sample Detailed Syllabus Data
const SUBJECT_SYLLABUS_DETAILS: Record<string, SubjectDetail> = {
  maths: {
    id: 'maths',
    name: 'Mathematics',
    category: 'Sciences',
    icon: 'calculate',
    topicCount: 38,
    estimatedHours: 48,
    difficulty: 'Advanced',
    introduction:
      'The UTME Mathematics syllabus tests candidates on fundamental mathematical concepts, problem-solving techniques, algebraic reasoning, geometric proofs, trigonometric identities, and introductory calculus.',
    learningObjectives: [
      'Acquire basic mathematical literacy and computational fluency required for university studies.',
      'Apply algebraic methods to simplify expressions, solve equations, and analyze functions.',
      'Understand geometric properties, coordinate geometry, and 3D mensuration.',
      'Demonstrate mastery in introductory differential and integral calculus.'
    ],
    recommendedDuration: '6 Weeks (8 Hours/Week)',
    recommendedTextbooks: [
      'New General Mathematics for Senior Secondary Schools Books 1–3 by M.F. Macrae et al.',
      'Exam Focus Mathematics for WASSCE & UTME by A.O. Kalejaiye.',
      'Hidden Facts in UTME Mathematics by M.A. Otunba.'
    ],
    sections: [
      {
        id: 'math-sec-1',
        title: 'Section 1: Number and Numeration',
        description: 'Covers number bases, fractions, surds, indices, logarithms, and financial arithmetic.',
        learningObjectives: 'Candidates should be able to manipulate indices, logarithms, base numbers, and calculate compound interest accurately.',
        topics: [
          { id: 'math-t1', name: 'Fractions, Decimals, Approximations and Significant Figures', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'math-t2', name: 'Indices, Logarithms and Surds Simplification', estimatedTime: '3.0 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: true },
          { id: 'math-t3', name: 'Number Bases (Conversion & Binary Arithmetic)', estimatedTime: '2.0 hrs', difficulty: 'Medium', resourceType: 'Past Questions', completed: false },
          { id: 'math-t4', name: 'Sets, Venn Diagrams & Set Operations', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'math-t5', name: 'Percentages, Ratios, Rates & Compound Interest', estimatedTime: '2.0 hrs', difficulty: 'Easy', resourceType: 'Practice CBT', completed: false }
        ]
      },
      {
        id: 'math-sec-2',
        title: 'Section 2: Algebra',
        description: 'Focuses on polynomials, quadratic equations, variation, matrices, and inequalities.',
        learningObjectives: 'Candidates should be able to solve linear, quadratic, and simultaneous equations, evaluate determinants, and manipulate matrices.',
        topics: [
          { id: 'math-t6', name: 'Polynomials & Factor Theorem', estimatedTime: '3.5 hrs', difficulty: 'Hard', resourceType: 'Video Lesson', completed: false },
          { id: 'math-t7', name: 'Quadratic Equations & Roots Analysis', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: true },
          { id: 'math-t8', name: 'Variation (Direct, Inverse, Joint & Partial)', estimatedTime: '2.0 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'math-t9', name: 'Matrices & 2x2 / 3x3 Determinants', estimatedTime: '3.0 hrs', difficulty: 'Hard', resourceType: 'Past Questions', completed: false },
          { id: 'math-t10', name: 'Linear & Quadratic Inequalities with Graphing', estimatedTime: '2.5 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: false }
        ]
      },
      {
        id: 'math-sec-3',
        title: 'Section 3: Geometry and Trigonometry',
        description: 'Covers Euclidean geometry, circle theorems, coordinate geometry, and trigonometric ratios.',
        learningObjectives: 'Apply trigonometric ratios, sine/cosine rules, and coordinate geometry formulas to solve distance and angle problems.',
        topics: [
          { id: 'math-t11', name: 'Euclidean Geometry & Angles in Polygons', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Study Notes', completed: false },
          { id: 'math-t12', name: 'Circle Theorems & Tangent Properties', estimatedTime: '3.5 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: false },
          { id: 'math-t13', name: 'Trigonometric Ratios, Elevation & Depression', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Past Questions', completed: true },
          { id: 'math-t14', name: 'Coordinate Geometry (Gradient, Midpoint & Distance)', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Video Lesson', completed: false }
        ]
      },
      {
        id: 'math-sec-4',
        title: 'Section 4: Calculus & Statistics',
        description: 'Covers differentiation, integration, measures of central tendency, and probability.',
        learningObjectives: 'Compute derivatives of algebraic functions, definite integrals, and calculate probability of compound events.',
        topics: [
          { id: 'math-t15', name: 'Differentiation of Algebraic Functions & Maxima/Minima', estimatedTime: '4.0 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: false },
          { id: 'math-t16', name: 'Integration & Area Under Algebraic Curves', estimatedTime: '3.5 hrs', difficulty: 'Hard', resourceType: 'Past Questions', completed: false },
          { id: 'math-t17', name: 'Statistics (Mean, Median, Mode, Variance & Std Dev)', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Study Notes', completed: true },
          { id: 'math-t18', name: 'Probability of Independent & Mutually Exclusive Events', estimatedTime: '2.5 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: false }
        ]
      }
    ]
  },
  english: {
    id: 'english',
    name: 'English Language',
    category: 'Compulsory',
    icon: 'spellcheck',
    topicCount: 45,
    estimatedHours: 50,
    difficulty: 'Standard UTME',
    introduction:
      'Use of English is compulsory for all UTME candidates. It assesses reading comprehension, vocabulary development, grammatical agreement, figures of speech, sentence interpretation, and oral phonetics.',
    learningObjectives: [
      'Comprehend and evaluate prose passages, drawing inference and identifying tone.',
      'Master English grammar, concord, tense sequence, and prepositional usage.',
      'Identify correct phonetic transcriptions, stress patterns, and vowel/consonant sounds.',
      'Demonstrate deep literary understanding of the compulsory JAMB prose novel.'
    ],
    recommendedDuration: '8 Weeks (6 Hours/Week)',
    recommendedTextbooks: [
      'The Life Changer by Khadija Abubakar Jalli (Official JAMB Prescribed Text)',
      'A Comprehensive English Language Course for SSCE & UTME by B.O. Oluikpe.',
      'Catch-up English Language for UTME by O.A. Adegoke.'
    ],
    sections: [
      {
        id: 'eng-sec-1',
        title: 'Section 1: Comprehension & Prescribed Novel',
        description: 'Passage comprehension, summary techniques, and analysis of "The Life Changer".',
        learningObjectives: 'Answer direct and inferential questions on reading passages and character/plot analysis of the prescribed text.',
        topics: [
          { id: 'eng-t1', name: 'Reading Comprehension Strategies & Inference Skills', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Practice CBT', completed: true },
          { id: 'eng-t2', name: 'JAMB Prescribed Novel: "The Life Changer" Chapter 1–5 Review', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Study Notes', completed: true },
          { id: 'eng-t3', name: 'JAMB Prescribed Novel: "The Life Changer" Chapter 6–9 & Key Themes', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: true },
          { id: 'eng-t4', name: 'Summary Writing & Identifying Main Ideas', estimatedTime: '2.0 hrs', difficulty: 'Easy', resourceType: 'Past Questions', completed: false }
        ]
      },
      {
        id: 'eng-sec-2',
        title: 'Section 2: Lexis, Structure & Synonyms',
        description: 'Tests vocabulary in context, antonyms, synonyms, idioms, and grammatical concordance.',
        learningObjectives: 'Select appropriate words for sentence completion, identify registers, and apply rules of concord.',
        topics: [
          { id: 'eng-t5', name: 'Synonyms & Nearest in Meaning Vocabulary', estimatedTime: '2.5 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: true },
          { id: 'eng-t6', name: 'Antonyms & Opposite in Meaning Words', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'eng-t7', name: 'Subject-Verb Agreement (Rules of Concord)', estimatedTime: '3.0 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: false },
          { id: 'eng-t8', name: 'Idioms, Phrasal Verbs & Figures of Speech', estimatedTime: '2.5 hrs', difficulty: 'Medium', resourceType: 'Past Questions', completed: false }
        ]
      },
      {
        id: 'eng-sec-3',
        title: 'Section 3: Oral Forms & Phonetics',
        description: 'Focuses on English vowel sounds, consonants, rhymes, and stress accentuation.',
        learningObjectives: 'Distinguish pure vowels, diphthongs, consonant clusters, primary stress placement, and emphatic stress.',
        topics: [
          { id: 'eng-t9', name: 'Monophthongs (Short & Long Vowel Sounds)', estimatedTime: '2.0 hrs', difficulty: 'Medium', resourceType: 'Video Lesson', completed: false },
          { id: 'eng-t10', name: 'Diphthongs & Triphthongs Pronunciation', estimatedTime: '2.0 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: false },
          { id: 'eng-t11', name: 'Silent Letters & Consonant Sounds', estimatedTime: '2.0 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'eng-t12', name: 'Word Stress & Emphatic Stress Identification', estimatedTime: '3.0 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: false }
        ]
      }
    ]
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    category: 'Sciences',
    icon: 'bolt',
    topicCount: 36,
    estimatedHours: 46,
    difficulty: 'Advanced',
    introduction:
      'Physics evaluates understanding of mechanical motion, properties of matter, heat energy, wave motion, geometrical optics, electromagnetism, and atomic physics.',
    learningObjectives: [
      'Master scalar and vector quantities, kinematics equations, and Newton laws of motion.',
      'Calculate thermal expansion, heat capacity, and gas law relationships.',
      'Understand wave phenomena, reflection, refraction, and optical instrument ray diagrams.',
      'Analyze electric fields, Ohm law, electromagnetic induction, and quantum atomic models.'
    ],
    recommendedDuration: '7 Weeks (7 Hours/Week)',
    recommendedTextbooks: [
      'Senior Secondary School Physics by P.N. Okeke and M.W. Anyakoha.',
      'New School Physics for Senior Secondary Schools by M.W. Anyakoha.',
      'Principles of Physics for SSS by Nelkon & Parker.'
    ],
    sections: [
      {
        id: 'phy-sec-1',
        title: 'Section 1: Mechanics and Matter',
        description: 'Kinematics, vectors, momentum, work, energy, power, simple machines, and fluids.',
        learningObjectives: 'Apply Newton laws, conservation of momentum, and calculate mechanical advantage and efficiency.',
        topics: [
          { id: 'phy-t1', name: 'Units, Dimensions & Vector Resolution', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'phy-t2', name: 'Equations of Motion under Constant Acceleration', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: true },
          { id: 'phy-t3', name: 'Projectiles & Circular Motion Mechanics', estimatedTime: '3.5 hrs', difficulty: 'Hard', resourceType: 'Video Lesson', completed: false },
          { id: 'phy-t4', name: 'Work, Energy, Power & Efficiency of Machines', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Past Questions', completed: false }
        ]
      },
      {
        id: 'phy-sec-2',
        title: 'Section 2: Thermal & Wave Physics',
        description: 'Heat capacity, thermal expansion, gas laws, sound waves, and light reflection/refraction.',
        learningObjectives: 'Solve specific heat capacity problems, wave velocity equations, and lens mirror formulas.',
        topics: [
          { id: 'phy-t5', name: 'Heat Capacity, Latent Heat & Expansion', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: true },
          { id: 'phy-t6', name: 'Gas Laws (Boyle, Charles, Pressure Law)', estimatedTime: '2.5 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
          { id: 'phy-t7', name: 'Wave Motion, Resonance & Sound Interference', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: false },
          { id: 'phy-t8', name: 'Refraction of Light, Lenses & Optical Instruments', estimatedTime: '3.5 hrs', difficulty: 'Hard', resourceType: 'Past Questions', completed: false }
        ]
      }
    ]
  }
};

export const JambSyllabusScreen: React.FC<JambSyllabusScreenProps> = ({ setActiveTab }) => {
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State Management
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths');
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState<Record<string, boolean>>({ maths: true, english: true });

  // Topic Completion Tracking in local state
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({
    'math-t1': true,
    'math-t2': true,
    'math-t4': true,
    'math-t7': true,
    'math-t8': true,
    'math-t13': true,
    'math-t17': true,
    'eng-t1': true,
    'eng-t2': true,
    'eng-t3': true,
    'eng-t5': true,
    'eng-t6': true,
    'eng-t11': true,
    'phy-t1': true,
    'phy-t2': true,
    'phy-t5': true,
    'phy-t6': true,
  });

  // Accordion Open States for Syllabus Sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'math-sec-1': true,
    'math-sec-2': true,
    'eng-sec-1': true,
    'phy-sec-1': true,
  });

  // FAQ Accordion Open State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Revision Modal / Drawer State
  const [selectedRevisionCard, setSelectedRevisionCard] = useState<{
    title: string;
    icon: string;
    items: string[];
  } | null>(null);

  // Study Planner Day Assignee State
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, string>>({
    Monday: 'Mathematics: Indices & Surds',
    Tuesday: 'Use of English: The Life Changer (Ch 1-3)',
    Wednesday: 'Physics: Equations of Motion',
    Thursday: 'Chemistry: Atomic Structure',
    Friday: 'Biology: Cell Biology & Genetics',
    Saturday: 'Mathematics: Quadratic Equations',
    Sunday: 'CBT Practice Speed Drill (40 Qs)',
  });

  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editingPlanText, setEditingPlanText] = useState<string>('');

  // Filtered Subjects List
  const filteredSubjects = useMemo(() => {
    return ALL_SUBJECTS.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Active Selected Subject Details
  const activeSubject = useMemo(() => {
    return (
      SUBJECT_SYLLABUS_DETAILS[selectedSubjectId] || {
        id: selectedSubjectId,
        name: ALL_SUBJECTS.find((s) => s.id === selectedSubjectId)?.name || 'Selected Subject',
        category: 'Sciences' as const,
        icon: ALL_SUBJECTS.find((s) => s.id === selectedSubjectId)?.icon || 'book',
        topicCount: 35,
        estimatedHours: 40,
        difficulty: 'Standard UTME' as const,
        introduction: `Detailed UTME syllabus for ${ALL_SUBJECTS.find((s) => s.id === selectedSubjectId)?.name || 'this subject'}. Covers core concepts, past questions, learning objectives, and recommended texts.`,
        learningObjectives: [
          'Master key principles and definitions in the JAMB curriculum.',
          'Solve past UTME questions accurately under timed exam conditions.',
          'Identify high-yield topics and frequently tested subject areas.',
          'Review recommended textbooks to ensure complete syllabus coverage.'
        ],
        recommendedDuration: '6 Weeks (6 Hours/Week)',
        recommendedTextbooks: [
          'Official JAMB Approved Textbook for SSCE & UTME.',
          'Exam Focus Companion Guide by Senior Scholars.',
          'Comprehensive Past Questions & Answers Series.'
        ],
        sections: [
          {
            id: `${selectedSubjectId}-sec-1`,
            title: 'Section 1: Core Fundamentals & Principles',
            description: 'Essential introductory concepts and fundamental principles.',
            learningObjectives: 'Understand basic definitions, terminology, and foundational theories.',
            topics: [
              { id: `${selectedSubjectId}-t1`, name: 'Topic 1: Introduction & Definitions', estimatedTime: '2.0 hrs', difficulty: 'Easy', resourceType: 'Study Notes', completed: true },
              { id: `${selectedSubjectId}-t2`, name: 'Topic 2: Key Concepts & Operations', estimatedTime: '2.5 hrs', difficulty: 'Medium', resourceType: 'Practice CBT', completed: false },
              { id: `${selectedSubjectId}-t3`, name: 'Topic 3: Application & Problem Solving', estimatedTime: '3.0 hrs', difficulty: 'Hard', resourceType: 'Past Questions', completed: false }
            ]
          },
          {
            id: `${selectedSubjectId}-sec-2`,
            title: 'Section 2: Intermediate Concepts',
            description: 'In-depth topics and practical application skills.',
            learningObjectives: 'Apply theoretical knowledge to standard examination scenarios.',
            topics: [
              { id: `${selectedSubjectId}-t4`, name: 'Topic 4: Structural Analysis & Dynamics', estimatedTime: '3.0 hrs', difficulty: 'Medium', resourceType: 'Video Lesson', completed: false },
              { id: `${selectedSubjectId}-t5`, name: 'Topic 5: High-Yield Exam Formulas', estimatedTime: '2.5 hrs', difficulty: 'Hard', resourceType: 'Practice CBT', completed: false }
            ]
          }
        ]
      }
    );
  }, [selectedSubjectId]);

  // Overall Completion Calculations
  const activeSubjectTotalTopics = activeSubject.sections.reduce((acc, sec) => acc + sec.topics.length, 0);
  const activeSubjectCompletedTopics = activeSubject.sections.reduce(
    (acc, sec) => acc + sec.topics.filter((t) => completedTopics[t.id]).length,
    0
  );
  const activeSubjectProgressPercent =
    activeSubjectTotalTopics > 0 ? Math.round((activeSubjectCompletedTopics / activeSubjectTotalTopics) * 100) : 0;

  // Toggle Topic Completion
  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics((prev) => {
      const isCompleted = !prev[topicId];
      if (isCompleted) showToast('Topic marked as completed! 🎉');
      else showToast('Topic marked as incomplete');
      return { ...prev, [topicId]: isCompleted };
    });
  };

  // Toggle Accordion Section
  const toggleSection = (secId: string) => {
    setOpenSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  // Toggle Bookmark
  const toggleBookmark = (subjId: string) => {
    setBookmarkedSubjects((prev) => {
      const isSaved = !prev[subjId];
      showToast(isSaved ? 'Subject bookmarked to Study Hub' : 'Removed from bookmarks');
      return { ...prev, [subjId]: isSaved };
    });
  };

  // Generate AI Study Plan
  const handleGenerateStudyPlan = () => {
    setWeeklyPlan({
      Monday: 'Mathematics: Algebra & Matrices (2.5 hrs)',
      Tuesday: 'Use of English: The Life Changer & Concord (2.0 hrs)',
      Wednesday: 'Physics: Kinematics & Vector Resolution (3.0 hrs)',
      Thursday: 'Chemistry: Stoichiometry & Gas Laws (2.5 hrs)',
      Friday: 'Biology: Genetics & Photosynthesis (2.5 hrs)',
      Saturday: 'Full-Length CBT Mock Exam Simulation (3.0 hrs)',
      Sunday: 'Mock Exam Review & Weak Areas Revision (2.0 hrs)',
    });
    showToast('AI Study Plan generated based on your weak areas! ⚡');
  };

  // Save Day Plan Edit
  const handleSaveDayEdit = () => {
    if (editingDay) {
      setWeeklyPlan((prev) => ({ ...prev, [editingDay]: editingPlanText }));
      setEditingDay(null);
      showToast(`Updated plan for ${editingDay}`);
    }
  };

  // FAQ List
  const faqList = [
    {
      q: 'What is the JAMB syllabus?',
      a: 'The JAMB UTME syllabus is an official curriculum document published by the Joint Admissions and Matriculation Board. It details all the subjects, topics, sub-topics, and specific learning objectives that candidates are tested on during the computer-based exam.',
    },
    {
      q: 'How do I use the syllabus effectively?',
      a: 'Use the interactive checklist to study systematically topic by topic. Review the learning objectives for each topic before reading textbooks, practice CBT past questions related to that specific topic, and mark topics as completed as you progress.',
    },
    {
      q: 'Should I study every topic listed in the syllabus?',
      a: 'Yes! JAMB draws questions randomly from the entire syllabus bank. Skipping topics creates gaps in your preparation that can lower your aggregate score. Focus on mastering core high-yield topics while covering the full syllabus.',
    },
    {
      q: 'Where can I find recommended textbooks?',
      a: 'The official JAMB recommended textbooks are listed under the "Recommended Resources" section for each subject. You can also access digital notes, summaries, and CBT practice modules directly on JAMB Compass.',
    },
    {
      q: 'How often is the JAMB syllabus updated?',
      a: 'JAMB updates syllabus texts periodically—most notably the compulsory Use of English prose novel (e.g. "The Life Changer") and specific literature set texts. All topics on JAMB Compass are updated for the 2026 UTME exam cycle.',
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

      {/* QUICK REVISION MODAL */}
      {selectedRevisionCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined">{selectedRevisionCard.icon}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">{selectedRevisionCard.title}</h3>
              </div>
              <button
                onClick={() => setSelectedRevisionCard(null)}
                className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-slate-200 flex items-center justify-center text-[#475569]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {selectedRevisionCard.items.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-xs leading-relaxed text-[#0F172A] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F9D58] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedRevisionCard(null)}
              className="w-full bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs"
            >
              Close Revision Card
            </button>
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
          <span className="text-[#0F172A] font-bold">JAMB Syllabus</span>
        </div>
      </div>

      {/* PAGE HEADER / HERO */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>Official UTME Syllabus Engine</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              JAMB Interactive <span className="text-[#82FAAB]">Syllabus</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Browse every UTME subject, understand the topics you need to study, track completion step-by-step, and prepare with confidence using interactive learning tools.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                <span>19 UTME Subjects Covered</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>Interactive Topic Tracker</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Prescribed Novel Summaries</span>
              </span>
            </div>
          </div>

          {/* Hero Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">auto_stories</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Digital Study Portal</p>
                    <p className="text-base font-bold font-display">Syllabus Mastery Hub</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  2026 UTME
                </span>
              </div>

              {/* Mock Syllabus Card */}
              <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-700/60 space-y-3 font-sans text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-[#82FAAB]">Use of English & Mathematics</span>
                  <span className="bg-[#2563EB]/20 text-[#2563EB] px-2 py-0.5 rounded text-[10px] font-bold">40 Topics</span>
                </div>
                <p className="text-slate-200 text-xs">
                  "Master topics in Number Bases, Quadratic Equations, Concord, and 'The Life Changer'..."
                </p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0F9D58] h-full w-[65%]"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Syllabus Completion: 65%</span>
                  <span className="text-[#82FAAB] font-bold">On Track for 320+</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-center justify-between">
                <span>Structured Learning Objectives</span>
                <span className="font-bold text-[#82FAAB]">Ready to Explore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SEARCH BAR & CATEGORY FILTERS */}
        <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-2/3">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subjects or syllabus topics (e.g. Mathematics, Concord, Equations)..."
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

            {/* Quick Action Button */}
            <div className="w-full md:w-auto flex items-center justify-end gap-3">
              <button
                onClick={handleGenerateStudyPlan}
                className="w-full md:w-auto bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                <span>Generate Study Schedule</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            <span className="text-[#475569] shrink-0 font-bold mr-1">Categories:</span>
            {['All', 'Compulsory', 'Sciences', 'Commercial', 'Arts', 'Humanities'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border border-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* SUBJECT CATEGORIES GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Explore Disciplines
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                UTME Subject Categories ({filteredSubjects.length})
              </h2>
            </div>
            <p className="hidden sm:block text-xs text-[#475569]">
              Click any subject to open its complete interactive syllabus
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSubjects.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              const isBookmarked = bookmarkedSubjects[sub.id];

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-4 group ${
                    isSelected
                      ? 'border-[#0F9D58] bg-[#0F9D58]/5 ring-2 ring-[#0F9D58]/30 shadow-md'
                      : 'border-[#E2E8F0] bg-white hover:border-[#0F9D58] hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected ? 'bg-[#0F9D58] text-white shadow-md' : 'bg-[#F8FAFC] text-[#0F9D58] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{sub.icon}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(sub.id);
                      }}
                      className="text-slate-400 hover:text-amber-500 transition-colors"
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark subject'}
                    >
                      <span className={`material-symbols-outlined text-lg ${isBookmarked ? 'text-amber-500 fill-1' : ''}`}>
                        {isBookmarked ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-slate-100 text-[#475569] font-bold px-2 py-0.5 rounded uppercase">
                        {sub.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] font-display group-hover:text-[#0F9D58] transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-[#475569] mt-1">
                      {sub.topicCount} Topics • ~{sub.estimatedHours} Hours
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-[#475569]">{sub.difficulty}</span>
                    <button
                      className={`font-bold text-xs flex items-center gap-1 ${
                        isSelected ? 'text-[#0F9D58]' : 'text-[#2563EB] group-hover:text-[#0F9D58]'
                      }`}
                    >
                      <span>{isSelected ? 'Viewing' : 'View Syllabus'}</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURED / SELECTED SUBJECT BANNER & SYLLABUS CONTENT */}
        <section className="space-y-8">
          {/* Selected Subject Banner */}
          <div className="bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800 space-y-6">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#0F9D58] text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {activeSubject.category}
                  </span>
                  <span className="bg-white/10 text-slate-200 border border-white/20 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase">
                    {activeSubject.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-md">
                    <span className="material-symbols-outlined text-2xl">{activeSubject.icon}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                    {activeSubject.name} Syllabus
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                  {activeSubject.introduction}
                </p>
              </div>

              {/* Action & Stats Box */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3 text-xs w-full lg:w-72 shrink-0">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Subject Completion</span>
                  <span className="font-bold text-[#82FAAB]">{activeSubjectProgressPercent}%</span>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0F9D58] h-full transition-all duration-500"
                    style={{ width: `${activeSubjectProgressPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Completed: {activeSubjectCompletedTopics} topics</span>
                  <span>Total: {activeSubjectTotalTopics} topics</span>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => showToast(`Downloaded ${activeSubject.name} Official PDF Syllabus`)}
                    className="flex-1 bg-white text-[#0F172A] hover:bg-slate-100 font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(activeSubject.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      bookmarkedSubjects[activeSubject.id]
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {bookmarkedSubjects[activeSubject.id] ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Subject Overview Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[#82FAAB] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Recommended Duration
                </span>
                <p className="text-white font-semibold text-sm">{activeSubject.recommendedDuration}</p>
              </div>

              <div className="bg-black/20 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[#82FAAB] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">flag</span>
                  Estimated Difficulty
                </span>
                <p className="text-white font-semibold text-sm">{activeSubject.difficulty}</p>
              </div>

              <div className="bg-black/20 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[#82FAAB] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">checklist</span>
                  Topic Structure
                </span>
                <p className="text-white font-semibold text-sm">{activeSubject.sections.length} Core Sections</p>
              </div>
            </div>
          </div>

          {/* SYLLABUS CONTENT ACCORDION SECTIONS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">view_stream</span>
                Syllabus Sections & Topics
              </h3>
              <span className="text-xs text-[#475569] font-medium">
                Check off topics as you study to update your progress
              </span>
            </div>

            <div className="space-y-4">
              {activeSubject.sections.map((section, idx) => {
                const isOpen = openSections[section.id] ?? (idx === 0);
                const secCompletedTopics = section.topics.filter((t) => completedTopics[t.id]).length;

                return (
                  <div
                    key={section.id}
                    className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden transition-all"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full text-left p-5 sm:p-6 bg-[#F8FAFC] hover:bg-slate-100 transition-colors flex items-center justify-between gap-4 border-b border-[#E2E8F0]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-[#0F172A] font-display">{section.title}</h4>
                          <p className="text-xs text-[#475569] mt-0.5">{section.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-semibold text-[#0F9D58] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full hidden sm:inline-block">
                          {secCompletedTopics} / {section.topics.length} Done
                        </span>
                        <span className="material-symbols-outlined text-[#475569] text-xl transition-transform duration-200">
                          {isOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </div>
                    </button>

                    {/* Accordion Content Body */}
                    {isOpen && (
                      <div className="p-5 sm:p-6 space-y-6">
                        {/* Section Learning Objectives */}
                        <div className="bg-[#0F9D58]/5 border border-[#0F9D58]/20 p-4 rounded-2xl text-xs text-[#0F172A] space-y-1">
                          <span className="font-bold text-[#0F9D58] uppercase tracking-wider block flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">lightbulb</span>
                            Section Learning Objective:
                          </span>
                          <p className="text-[#475569] leading-relaxed">{section.learningObjectives}</p>
                        </div>

                        {/* Topics Checklist Table / Cards */}
                        <div className="space-y-3">
                          {section.topics.map((topic) => {
                            const isDone = !!completedTopics[topic.id];

                            return (
                              <div
                                key={topic.id}
                                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                  isDone
                                    ? 'bg-emerald-50/50 border-emerald-200'
                                    : 'bg-white border-[#E2E8F0] hover:border-[#0F9D58]'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => toggleTopicCompletion(topic.id)}
                                    className="w-5 h-5 rounded border-slate-300 text-[#0F9D58] focus:ring-[#0F9D58] cursor-pointer mt-0.5"
                                  />
                                  <div>
                                    <p className={`text-xs sm:text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-[#0F172A]'}`}>
                                      {topic.name}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-[#475569]">
                                      <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">schedule</span>
                                        {topic.estimatedTime}
                                      </span>
                                      <span>•</span>
                                      <span
                                        className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                                          topic.difficulty === 'Easy'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : topic.difficulty === 'Medium'
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}
                                      >
                                        {topic.difficulty}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-center">
                                  <button
                                    onClick={() => {
                                      if (setActiveTab) setActiveTab('cbt-practice');
                                      showToast(`Opening CBT practice for ${topic.name}`);
                                    }}
                                    className="px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                                  >
                                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                                    <span>{topic.resourceType}</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LEARNING OBJECTIVES & RECOMMENDED TEXTBOOKS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Learning Objectives Cards */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Core Competencies
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
                Subject Learning Objectives
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {activeSubject.learningObjectives.map((obj, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F9D58] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F9D58] text-white text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      Objective {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      High Importance
                    </span>
                  </div>
                  <p className="text-xs text-[#0F172A] leading-relaxed font-medium">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Textbooks */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Official Literature
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">library_books</span>
                JAMB Recommended Textbooks
              </h3>
            </div>

            <div className="space-y-3">
              {activeSubject.recommendedTextbooks.map((book, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 font-bold">
                    <span className="material-symbols-outlined text-lg">menu_book</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#0F172A] leading-snug">{book}</p>
                    <span className="text-[10px] text-[#0F9D58] font-bold uppercase block">
                      Approved JAMB Curriculum Text
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STUDY PROGRESS & DASHBOARD */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Analytics & Performance
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">insights</span>
                Study Progress Tracker
              </h3>
            </div>
            <span className="text-xs font-bold text-[#2563EB] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full self-start sm:self-auto">
              Active Streak: 🔥 7 Days
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Circular Indicator Card */}
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
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
                    strokeDasharray={`${activeSubjectProgressPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-extrabold text-[#0F172A]">
                  {activeSubjectProgressPercent}%
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#475569] uppercase">Overall Completion</p>
                <p className="text-base font-extrabold text-[#0F172A] font-display mt-0.5">
                  {activeSubjectCompletedTopics} / {activeSubjectTotalTopics} Topics
                </p>
              </div>
            </div>

            {/* Remaining Topics */}
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-1">
              <span className="text-[11px] font-bold text-[#475569] uppercase block">Topics Remaining</span>
              <p className="text-2xl font-extrabold text-[#0F172A] font-display">
                {Math.max(0, activeSubjectTotalTopics - activeSubjectCompletedTopics)}
              </p>
              <p className="text-[11px] text-[#0F9D58] font-semibold">~12 Study Hours Needed</p>
            </div>

            {/* Weekly Goal Progress */}
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-1">
              <span className="text-[11px] font-bold text-[#475569] uppercase block">Weekly Target</span>
              <p className="text-2xl font-extrabold text-[#2563EB] font-display">8 / 10 Topics</p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-[#2563EB] h-full w-[80%]"></div>
              </div>
            </div>

            {/* Projected Score */}
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold text-[#0F9D58] uppercase block">Projected UTME Score</span>
              <p className="text-2xl font-extrabold text-[#0F9D58] font-display">315 / 400</p>
              <p className="text-[11px] text-[#0F9D58] font-semibold">Top 2% Candidate Range</p>
            </div>
          </div>
        </section>

        {/* WEEKLY STUDY PLANNER */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Custom Schedule
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">calendar_month</span>
                Weekly Syllabus Study Planner
              </h3>
            </div>

            <button
              onClick={handleGenerateStudyPlan}
              className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Generate AI Plan</span>
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const task = weeklyPlan[day] || 'Free Study / Revision';
              const isEditingThis = editingDay === day;

              return (
                <div key={day} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                      <span className="text-xs font-bold text-[#0F9D58] uppercase">{day}</span>
                      <button
                        onClick={() => {
                          setEditingDay(day);
                          setEditingPlanText(task);
                        }}
                        className="text-slate-400 hover:text-[#0F172A]"
                        title="Edit plan"
                      >
                        <span className="material-symbols-outlined text-xs">edit</span>
                      </button>
                    </div>

                    {isEditingThis ? (
                      <div className="pt-2 space-y-2">
                        <textarea
                          value={editingPlanText}
                          onChange={(e) => setEditingPlanText(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-[#0F9D58] rounded-xl focus:outline-none"
                          rows={2}
                        />
                        <button
                          onClick={handleSaveDayEdit}
                          className="w-full bg-[#0F9D58] text-white text-[10px] font-bold py-1 rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs font-medium text-[#0F172A] pt-2 leading-relaxed">
                        {task}
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] font-semibold text-[#475569] bg-white px-2 py-1 rounded-lg border border-[#E2E8F0] text-center">
                    Target: 2.5 Hours
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* QUICK REVISION FLASHCARDS */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              High-Yield Essentials
            </span>
            <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">style</span>
              Quick Revision Cards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Important Formulas',
                icon: 'functions',
                desc: 'Quadratic roots, matrix determinants, calculus derivatives, and wave speeds.',
                items: [
                  'Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a',
                  'Logarithm Rule: log_a(m × n) = log_a(m) + log_a(n)',
                  'Calculus Derivative: d/dx(x^n) = n·x^(n-1)',
                  'Wave Velocity: v = f × λ'
                ]
              },
              {
                title: 'Key Definitions',
                icon: 'menu_book',
                desc: 'Core definitions in Grammar, Concord, Cell Biology, and Thermodynamics.',
                items: [
                  'Rules of Concord: Singular subjects require singular verbs (e.g., Everyone IS present).',
                  'Opportunity Cost: The value of the next best alternative foregone.',
                  'Rule of Law: Supremacy of law over all citizens and authorities.',
                  'Specific Heat Capacity: Heat required to raise 1kg of matter by 1°C.'
                ]
              },
              {
                title: 'Frequently Tested Areas',
                icon: 'local_fire_department',
                desc: 'Top 10 topics responsible for 60% of past UTME exam questions.',
                items: [
                  'Use of English: "The Life Changer" Character motives & Synonyms (15 Qs)',
                  'Mathematics: Indices, Surds, Quadratic Equations & Calculus (12 Qs)',
                  'Physics: Equations of Motion, Lenses & Wave Resonance (10 Qs)',
                  'Chemistry: Stoichiometry, Periodic Table & Gas Laws (10 Qs)'
                ]
              },
              {
                title: 'Revision Checklist',
                icon: 'fact_check',
                desc: 'Step-by-step preparation checklist before taking full CBT mock tests.',
                items: [
                  'Complete all 38 topics in Mathematics syllabus.',
                  'Read Khadija Abubakar Jalli\'s "The Life Changer" twice.',
                  'Solve at least 5 years of UTME past questions per subject.',
                  'Practice 8-key keyboard shortcuts for JAMB CBT centres.'
                ]
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h4 className="text-base font-bold font-display text-[#0F172A]">{card.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
                </div>

                <button
                  onClick={() => setSelectedRevisionCard(card)}
                  className="w-full bg-[#F8FAFC] hover:bg-slate-100 text-[#0F172A] font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1"
                >
                  <span>Open Flashcard</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDED RESOURCES & RELATED SUBJECTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recommended Resources Cards */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Preparation Materials
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">folder_zip</span>
                Recommended Study Resources
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Official JAMB Textbooks', type: 'Approved Literature', icon: 'auto_stories', action: 'Open Textbooks' },
                { title: 'Topic-by-Topic Study Notes', type: 'Comprehensive PDF Notes', icon: 'description', action: 'Read Notes' },
                { title: '15 Years Past Questions', type: 'Solved Solutions', icon: 'quiz', action: 'Practice Past Questions' },
                { title: 'CBT Exam Simulator Engine', type: 'Timed Mock Practice', icon: 'computer', action: 'Launch Simulator' },
                { title: 'Video Explanations', type: 'Masterclasses', icon: 'smart_display', action: 'Watch Lessons' },
                { title: 'Formula & Definition Sheet', type: 'Quick Revision Guide', icon: 'fact_check', action: 'Download Sheet' }
              ].map((res, idx) => (
                <div key={idx} className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F9D58] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg">{res.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{res.title}</p>
                      <p className="text-[10px] text-[#475569] font-medium">{res.type}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab('cbt-practice');
                      showToast(`Opened ${res.title}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#0F9D58] hover:text-white font-bold text-[11px] transition-colors shrink-0"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Related Subjects Recommendation */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Subject Combinations
              </span>
              <h3 className="text-xl font-bold font-display text-[#0F172A]">Related UTME Subjects</h3>
            </div>

            <div className="space-y-3">
              {[
                { id: 'physics', name: 'Physics', icon: 'bolt', desc: 'Required for Engineering, Computer Science, and Physical Sciences.' },
                { id: 'chemistry', name: 'Chemistry', icon: 'science', desc: 'Core subject for Medicine, Pharmacy, Nursing, and Chemical Sciences.' },
                { id: 'biology', name: 'Biology', icon: 'biotech', desc: 'Compulsory for Medical, Agricultural, and Life Science pathways.' },
                { id: 'economics', name: 'Economics', icon: 'trending_up', desc: 'Key subject for Business Administration, Accounting, and Finance.' }
              ].map((rel, idx) => (
                <div key={idx} className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">{rel.icon}</span>
                      <p className="text-xs font-bold text-[#0F172A]">{rel.name}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSubjectId(rel.id)}
                      className="text-[10px] font-bold text-[#2563EB] hover:underline"
                    >
                      Explore
                    </button>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-tight">{rel.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST UPDATES SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Official Announcements
            </span>
            <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">campaign</span>
              Latest Syllabus & Exam Updates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'JAMB Prescribed Novel Directives',
                category: 'Compulsory English',
                date: 'July 2026',
                summary: 'All candidates must study "The Life Changer" by Khadija Abubakar Jalli. Questions will focus on character roles and moral themes.'
              },
              {
                title: 'Updated Science Syllabus Formats',
                category: 'Physics & Chemistry',
                date: 'June 2026',
                summary: 'Expanded syllabus coverage in Quantum Physics basics and Organic Chemistry nomenclature for 2026 UTME candidates.'
              },
              {
                title: 'UTME 8-Key CBT Shortcut Guide',
                category: 'CBT Exam Tips',
                date: 'May 2026',
                summary: 'Master using A, B, C, D keys for selecting options and N, P, S keys for Next, Previous, and Submit at test centres.'
              }
            ].map((upd, idx) => (
              <div key={idx} className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="bg-[#0F9D58]/10 text-[#0F9D58] px-2.5 py-0.5 rounded-full uppercase">
                      {upd.category}
                    </span>
                    <span className="text-[#475569]">{upd.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A] font-display">{upd.title}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">{upd.summary}</p>
                </div>

                <button
                  onClick={() => showToast(`Opening article: ${upd.title}`)}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#0F9D58] flex items-center gap-1 pt-2 border-t border-[#E2E8F0]"
                >
                  <span>Read Full Update</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Help & Clarification
            </span>
            <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">help_outline</span>
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 bg-[#F8FAFC] hover:bg-slate-100 transition-colors flex items-center justify-between gap-4"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A] font-display">{faq.q}</span>
                    <span className="material-symbols-outlined text-[#475569] text-xl shrink-0">
                      {isOpen ? 'remove_circle_outline' : 'add_circle_outline'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION GRADIENT BANNER */}
        <section className="bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl space-y-6">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="bg-[#0F9D58] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider inline-block">
              UTME Admission Mastery
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Master Every Topic Before Your Exam
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Track your progress, study smarter, and prepare confidently with the interactive JAMB syllabus and realistic CBT simulator.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  showToast('Interactive topic tracking activated!');
                }}
                className="w-full sm:w-auto bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-[#0F9D58]/30 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">task_alt</span>
                <span>Start Studying Syllabus</span>
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('cbt-practice')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs px-8 py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">computer</span>
                <span>Go to CBT Practice</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
