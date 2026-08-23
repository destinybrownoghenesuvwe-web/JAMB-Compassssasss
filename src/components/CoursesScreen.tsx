import React, { useState, useMemo } from 'react';
import { Course, CourseCategory, TabType, University } from '../types';
import { COURSES_DATA, UNIVERSITIES_DATA } from '../data/mockData';

interface CoursesScreenProps {
  onSelectCourse: (course: Course) => void;
  setActiveTab?: (tab: TabType) => void;
  onSelectUniversity?: (univ: University) => void;
}

export const CoursesScreen: React.FC<CoursesScreenProps> = ({
  onSelectCourse,
  setActiveTab,
  onSelectUniversity,
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [selectedInstType, setSelectedInstType] = useState<string>('All');
  const [selectedAdmType, setSelectedAdmType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'alpha' | 'cutoff-desc' | 'cutoff-asc'>('popular');

  // Bookmarked / Saved Courses State
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Comparison State
  const [courseAId, setCourseAId] = useState<string>(COURSES_DATA[0]?.id || 'med-surg');
  const [courseBId, setCourseBId] = useState<string>(COURSES_DATA[1]?.id || 'comp-sci');

  // FAQ Accordion State
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Filter Categories
  const categoryChips: CourseCategory[] = [
    'All',
    'Science',
    'Medical',
    'Engineering',
    'Arts',
    'Business',
    'Law',
  ];

  const facultyOptions = [
    'All',
    'Medical Sciences',
    'Science',
    'Engineering',
    'Arts',
    'Social Sciences',
    'Law',
    'Management Sciences',
    'Education',
    'Agriculture',
    'Environmental Sciences',
  ];

  // Large Category Cards Data
  const featuredCategoryCards = [
    {
      title: 'Science',
      icon: 'science',
      coursesCount: '45+ Courses',
      description: 'Biological, chemical, physical, and computational sciences unlocking future technology.',
      categoryFilter: 'Science' as CourseCategory,
      facultyFilter: 'Science',
      color: 'bg-emerald-50 text-[#0F9D58] border-emerald-200',
    },
    {
      title: 'Medical Sciences',
      icon: 'medical_services',
      coursesCount: '28+ Courses',
      description: 'Medicine, Surgery, Nursing science, Pharmacy, Medical Laboratory, and Dentistry.',
      categoryFilter: 'Medical' as CourseCategory,
      facultyFilter: 'Medical Sciences',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      title: 'Engineering',
      icon: 'engineering',
      coursesCount: '35+ Courses',
      description: 'Civil, mechanical, electrical, computer, chemical, and mechatronic engineering programs.',
      categoryFilter: 'Engineering' as CourseCategory,
      facultyFilter: 'Engineering',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      title: 'Arts & Humanities',
      icon: 'palette',
      coursesCount: '30+ Courses',
      description: 'English, History, Theatre Arts, Philosophy, Languages, and Fine Arts disciplines.',
      categoryFilter: 'Arts' as CourseCategory,
      facultyFilter: 'Arts',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      title: 'Social Sciences',
      icon: 'public',
      coursesCount: '25+ Courses',
      description: 'Political science, Sociology, Psychology, Economics, and Mass Communication.',
      categoryFilter: 'Arts' as CourseCategory,
      facultyFilter: 'Social Sciences',
      color: 'bg-blue-50 text-[#2563EB] border-blue-200',
    },
    {
      title: 'Law',
      icon: 'gavel',
      coursesCount: '12+ Courses',
      description: 'Jurisprudence, Public law, Commercial law, International law, and Legal advocacy.',
      categoryFilter: 'Law' as CourseCategory,
      facultyFilter: 'Law',
      color: 'bg-slate-100 text-[#0F172A] border-slate-300',
    },
    {
      title: 'Management Sciences',
      icon: 'payments',
      coursesCount: '32+ Courses',
      description: 'Accounting, Banking & Finance, Business Administration, Marketing, and Actuarial Science.',
      categoryFilter: 'Business' as CourseCategory,
      facultyFilter: 'Management Sciences',
      color: 'bg-emerald-50 text-[#0F9D58] border-emerald-200',
    },
    {
      title: 'Education',
      icon: 'school',
      coursesCount: '40+ Courses',
      description: 'Pedagogy, Educational Technology, Science Education, Guidance & Counselling.',
      categoryFilter: 'Arts' as CourseCategory,
      facultyFilter: 'Education',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      title: 'Agriculture',
      icon: 'eco',
      coursesCount: '20+ Courses',
      description: 'Agronomy, Animal Science, Food Technology, Agricultural Economics, and Forestry.',
      categoryFilter: 'Science' as CourseCategory,
      facultyFilter: 'Agriculture',
      color: 'bg-lime-50 text-lime-800 border-lime-200',
    },
    {
      title: 'Environmental Sciences',
      icon: 'architecture',
      coursesCount: '18+ Courses',
      description: 'Architecture, Urban & Regional Planning, Estate Management, Quantity Surveying.',
      categoryFilter: 'Engineering' as CourseCategory,
      facultyFilter: 'Environmental Sciences',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
  ];

  // Helper for toggling bookmark
  const toggleSaveCourse = (e: React.MouseEvent, courseId: string, courseName: string) => {
    e.stopPropagation();
    if (savedCourseIds.includes(courseId)) {
      setSavedCourseIds(savedCourseIds.filter(id => id !== courseId));
      showToast(`Removed "${courseName}" from saved courses`);
    } else {
      setSavedCourseIds([...savedCourseIds, courseId]);
      showToast(`Saved "${courseName}" to your bookmarks`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered courses memo
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // Category Chip Filter
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

      // Faculty Filter
      const matchesFaculty =
        selectedFaculty === 'All' ||
        course.category.toLowerCase().includes(selectedFaculty.toLowerCase()) ||
        (selectedFaculty === 'Medical Sciences' && course.category === 'Medical') ||
        (selectedFaculty === 'Management Sciences' && course.category === 'Business') ||
        (selectedFaculty === 'Environmental Sciences' && course.name.includes('Architecture'));

      // Search Filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.utmeSubjects.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));

      // Duration Filter
      const matchesDuration =
        selectedDuration === 'All' ||
        (selectedDuration === '4 Years' && course.duration.includes('4')) ||
        (selectedDuration === '5 Years' && course.duration.includes('5')) ||
        (selectedDuration === '6 Years' && course.duration.includes('6'));

      return matchesCategory && matchesFaculty && matchesSearch && matchesDuration;
    }).sort((a, b) => {
      if (sortBy === 'cutoff-desc') return b.cutOffMark - a.cutOffMark;
      if (sortBy === 'cutoff-asc') return a.cutOffMark - b.cutOffMark;
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      // default 'popular'
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [selectedCategory, selectedFaculty, searchQuery, selectedDuration, sortBy]);

  // Comparison course objects
  const courseA = COURSES_DATA.find((c) => c.id === courseAId) || COURSES_DATA[0];
  const courseB = COURSES_DATA.find((c) => c.id === courseBId) || COURSES_DATA[1];

  // Frequently Asked Questions
  const faqs = [
    {
      question: 'How do I choose the right university course?',
      answer:
        'Start by evaluating your core academic strengths in secondary school (SSCE), personal interests, and career goals. Verify the compulsory UTME subject combinations and O’Level credits required by Nigerian universities to ensure you meet the eligibility criteria before applying.',
    },
    {
      question: 'Can I change my course after JAMB registration?',
      answer:
        'Yes! JAMB provides an official "Change of Course/Institution" window on the CAPS portal after the UTME examination. This allows candidates to adjust their chosen programme or university based on their actual UTME score.',
    },
    {
      question: 'What are UTME subject combinations?',
      answer:
        'UTME subject combinations are the four specific subjects required by JAMB for your chosen degree programme. Use of English is mandatory for all courses, while the remaining three subjects depend directly on your intended faculty (e.g., Physics, Chemistry, Biology for Medicine).',
    },
    {
      question: 'What are O’Level admission requirements in Nigeria?',
      answer:
        'Candidates must possess a minimum of 5 credit passes in relevant subjects including English Language and Mathematics in WAEC, NECO, or NABTEB in not more than two sittings (some competitive courses like Medicine require 1 sitting).',
    },
    {
      question: 'How long do degree programmes usually take in Nigerian universities?',
      answer:
        'Most Arts, Social Sciences, Sciences, and Management degree programmes take 4 years. Engineering, Law, Pharmacy, and Agriculture take 5 years, while Medicine & Surgery (MBBS) and Veterinary Medicine take 6 years.',
    },
  ];

  // Recommended Interest Clusters
  const recommendationClusters = [
    {
      title: 'If you enjoy Mathematics & Analytical Logic',
      bg: 'bg-emerald-50 border-emerald-200',
      icon: 'functions',
      iconColor: 'text-[#0F9D58]',
      recommended: [
        { name: 'Computer Science', id: 'comp-sci', icon: 'terminal' },
        { name: 'Software Engineering', id: 'soft-eng', icon: 'code' },
        { name: 'Mechanical Engineering', id: 'mech-eng', icon: 'engineering' },
        { name: 'Civil Engineering', id: 'civil-eng', icon: 'foundation' },
        { name: 'Architecture', id: 'arch', icon: 'architecture' },
      ],
    },
    {
      title: 'If you enjoy Biology, Human Anatomy & Health Sciences',
      bg: 'bg-rose-50 border-rose-200',
      icon: 'medical_services',
      iconColor: 'text-rose-600',
      recommended: [
        { name: 'Medicine & Surgery', id: 'med-surg', icon: 'clinical_notes' },
        { name: 'Nursing Science', id: 'nursing', icon: 'health_and_safety' },
        { name: 'Pharmacy', id: 'pharm', icon: 'medication' },
      ],
    },
    {
      title: 'If you enjoy Government, Writing, Debate & Literature',
      bg: 'bg-blue-50 border-blue-200',
      icon: 'gavel',
      iconColor: 'text-[#2563EB]',
      recommended: [
        { name: 'Law (LL.B)', id: 'law', icon: 'balance' },
        { name: 'Mass Communication', id: 'mass-comm', icon: 'campaign' },
        { name: 'Economics', id: 'econ', icon: 'trending_up' },
      ],
    },
    {
      title: 'If you enjoy Business, Markets & Corporate Leadership',
      bg: 'bg-purple-50 border-purple-200',
      icon: 'query_stats',
      iconColor: 'text-purple-700',
      recommended: [
        { name: 'Accounting & Finance', id: 'acct', icon: 'calculate' },
        { name: 'Economics', id: 'econ', icon: 'finance_chip' },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] font-sans pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#0F9D58] flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
          <span className="text-xs font-bold font-sans">{toastMessage}</span>
        </div>
      )}

      {/* 1. PAGE HEADER SECTION */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#E2E8F0] pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#475569]">
            <button
              onClick={() => setActiveTab && setActiveTab('home')}
              className="hover:text-[#0F9D58] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="font-semibold text-[#0F172A]">Courses</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Header Text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] font-bold text-xs font-display">
                <span className="material-symbols-outlined text-sm">menu_book</span>
                Course Directory & Admission Mapping
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#0F172A] leading-tight">
                Explore University Courses
              </h1>

              <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-2xl">
                Browse hundreds of undergraduate programmes across Nigerian universities and discover the right path for your future. Check official UTME subject requirements, O’Level grades, and career outcomes.
              </p>

              {/* Quick Pills */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-[#475569]">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                  <span className="material-symbols-outlined text-[#0F9D58] text-base">verified</span>
                  <span>100% NUC & JAMB Accredited</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                  <span className="material-symbols-outlined text-[#2563EB] text-base">domain</span>
                  <span>200+ Nigerian Universities</span>
                </div>
              </div>
            </div>

            {/* Illustration Graphic Box */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F9D58]/80 rounded-[24px] p-6 text-white shadow-xl relative overflow-hidden border border-[#E2E8F0]/20">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#0F9D58]/30 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold font-display uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">school</span>
                      Academic Explorer
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">2026/2027 Session</span>
                  </div>

                  {/* Visual Graphic Representation */}
                  <div className="grid grid-cols-3 gap-3 text-center py-2">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                      <span className="material-symbols-outlined text-emerald-400 text-2xl mb-1">auto_stories</span>
                      <span className="text-xs font-bold">500+</span>
                      <span className="text-[10px] text-slate-300">Degree Courses</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                      <span className="material-symbols-outlined text-blue-400 text-2xl mb-1">balance</span>
                      <span className="text-xs font-bold">12</span>
                      <span className="text-[10px] text-slate-300">Faculties</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col items-center">
                      <span className="material-symbols-outlined text-amber-400 text-2xl mb-1">workspace_premium</span>
                      <span className="text-xs font-bold">JAMB</span>
                      <span className="text-[10px] text-slate-300">Verified Rules</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 text-center leading-relaxed">
                    Verify subject combinations early to avoid wrong course selection during UTME registration.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section id="courses-search" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Large Search Input */}
        <div className="relative max-w-3xl mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, e.g. Computer Science, Medicine, Law..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-12 pr-28 py-4 text-sm text-[#0F172A] focus:outline-none focus:border-[#0F9D58] focus:bg-white shadow-xs transition-all font-sans"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#475569] hover:text-[#0F172A] bg-white px-2.5 py-1 rounded-lg border border-[#E2E8F0]"
            >
              Clear
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[11px] text-[#475569] bg-white px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-xs text-[#0F9D58]">bolt</span>
              <span>Instant Search</span>
            </div>
          )}
        </div>

        {/* Dropdown Filters Bar */}
        <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* Faculty Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">Faculty</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F9D58]"
            >
              {facultyOptions.map((fac) => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>

          {/* Duration Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">Duration</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F9D58]"
            >
              <option value="All">All Durations</option>
              <option value="4 Years">4 Years Degree</option>
              <option value="5 Years">5 Years Degree</option>
              <option value="6 Years">6 Years Degree</option>
            </select>
          </div>

          {/* Institution Type Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">Institution</label>
            <select
              value={selectedInstType}
              onChange={(e) => setSelectedInstType(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F9D58]"
            >
              <option value="All">All Universities</option>
              <option value="Federal">Federal Universities</option>
              <option value="State">State Universities</option>
              <option value="Private">Private Universities</option>
            </select>
          </div>

          {/* Admission Type Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">Admission Type</label>
            <select
              value={selectedAdmType}
              onChange={(e) => setSelectedAdmType(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F9D58]"
            >
              <option value="All">UTME & Direct Entry</option>
              <option value="UTME">UTME Candidate</option>
              <option value="DE">Direct Entry (DE)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">Sort Courses</label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0F9D58]"
            >
              <option value="popular">Popularity & Demand</option>
              <option value="alpha">Alphabetical (A - Z)</option>
              <option value="cutoff-desc">Highest Cut-off Mark</option>
              <option value="cutoff-asc">Lowest Cut-off Mark</option>
            </select>
          </div>

        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
          {categoryChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedCategory(chip)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === chip
                  ? 'bg-[#0F9D58] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
              }`}
            >
              {chip === 'All' ? 'All Faculties' : chip}
            </button>
          ))}
        </div>

      </section>

      {/* 3. FEATURED COURSE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">category</span>
              Featured Academic Faculties
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">Explore degree options across 10 major academic faculties in Nigerian higher education.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredCategoryCards.map((cat, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedCategory(cat.categoryFilter);
                setSelectedFaculty(cat.facultyFilter);
                document.getElementById('popular-courses-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white rounded-[16px] border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.color} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
                    {cat.coursesCount}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#475569] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2">
                <span className="text-xs font-bold text-[#0F9D58] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Courses</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR COURSES GRID */}
      <section id="popular-courses-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">stars</span>
              Popular Undergraduate Courses ({filteredCourses.length})
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">High-demand degree programmes across accredited public and private Nigerian universities.</p>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-[#F8FAFC] rounded-2xl p-12 text-center border border-[#E2E8F0] space-y-3 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-[#475569]">search_off</span>
            <p className="font-bold text-base text-[#0F172A]">No courses match your active search filters</p>
            <p className="text-xs text-[#475569]">Try clearing your search text or resetting your faculty filter selection.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedFaculty('All');
                setSelectedDuration('All');
              }}
              className="px-4 py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#0b8046] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const isSaved = savedCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 p-5 flex flex-col justify-between group cursor-pointer relative"
                >
                  <div className="space-y-3">
                    {/* Header Image / Badge */}
                    <div className="h-36 rounded-xl relative overflow-hidden bg-slate-900">
                      <img
                        src={course.imageUrl}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#0F172A] border border-white/20">
                          {course.category}
                        </span>
                        
                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => toggleSaveCourse(e, course.id, course.name)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-rose-500'
                          }`}
                          title={isSaved ? 'Saved to bookmarks' : 'Save course'}
                        >
                          <span className="material-symbols-outlined text-base">
                            {isSaved ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>
                      </div>

                      {/* Bottom Info Overlay */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-bold text-emerald-300 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">score</span>
                          {course.cutOffMark}+ UTME
                        </span>
                        <span className="bg-black/50 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-200">
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    {/* Course Title & Description */}
                    <div>
                      <h3 className="font-bold text-base font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors leading-snug">
                        {course.name}
                      </h3>
                      <p className="text-xs text-[#475569] mt-1.5 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* UTME Subject Preview */}
                    <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0] space-y-1">
                      <span className="text-[10px] font-bold text-[#0F9D58] uppercase tracking-wider block flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">edit_note</span>
                        UTME Subjects:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(course.utmeSubjects || []).map((sub, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white border border-[#E2E8F0] text-[#0F172A] px-1.5 py-0.5 rounded font-medium"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 mt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-[11px] text-[#475569] flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#2563EB]">groups</span>
                      <span>{course.applicants}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCourse(course);
                      }}
                      className="px-3 py-1.5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#0b8046] transition-colors flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. COURSE QUICK FACTS */}
      <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-12 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Nationwide Educational Index
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
              Course Quick Facts & Statistics
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Verified metrics powering tertiary choices for millions of Nigerian university aspirants.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] text-center shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F9D58] mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">auto_stories</span>
              </div>
              <h3 className="text-3xl font-black font-display text-[#0F172A]">500+</h3>
              <p className="text-xs font-semibold text-[#475569]">Accredited Courses</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] text-center shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">domain</span>
              </div>
              <h3 className="text-3xl font-black font-display text-[#0F172A]">200+</h3>
              <p className="text-xs font-semibold text-[#475569]">Universities</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] text-center shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-3xl font-black font-display text-[#0F172A]">10,000+</h3>
              <p className="text-xs font-semibold text-[#475569]">Admission Opportunities</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] text-center shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">map</span>
              </div>
              <h3 className="text-3xl font-black font-display text-[#0F172A]">36 States</h3>
              <p className="text-xs font-semibold text-[#475569]">Nationwide Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COURSE COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-[24px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
                Decision Assistant
              </span>
              <h2 className="text-2xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563EB]">compare_arrows</span>
                Course Comparison Tool
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">Compare entry requirements, durations, and career pathways side-by-side.</p>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
              <div>
                <label className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">Course A</label>
                <select
                  value={courseAId}
                  onChange={(e) => setCourseAId(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-1">Course B</label>
                <select
                  value={courseBId}
                  onChange={(e) => setCourseBId(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Course A Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#0F9D58] border border-emerald-200">
                  Course A
                </span>
                <span className="text-xs font-semibold text-[#475569]">{courseA.duration}</span>
              </div>

              <h3 className="text-xl font-extrabold font-display text-[#0F172A]">{courseA.name}</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[#475569] block mb-1">Faculty / Category:</span>
                  <span className="font-semibold text-[#0F172A] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0] inline-block">
                    {courseA.category}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">Cut-Off Competitiveness:</span>
                  <span className="font-extrabold text-[#0F9D58] text-sm">{courseA.cutOffMark}+ UTME Score</span>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">UTME Subjects Required:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(courseA.utmeSubjects || []).map((s, i) => (
                      <span key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[11px] font-medium text-[#0F172A]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">O'Level Requirements:</span>
                  <p className="text-[#0F172A] bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0] text-[11px] leading-relaxed">
                    {courseA.oLevelRequirements}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">Primary Career Pathways:</span>
                  <div className="flex flex-wrap gap-1">
                    {(courseA.careerProspects || []).map((cp, idx) => (
                      <span key={idx} className="bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded text-[10px] font-semibold">
                        {cp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCourse(courseA)}
                className="w-full py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
              >
                View Full Course Details
              </button>
            </div>

            {/* Course B Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                  Course B
                </span>
                <span className="text-xs font-semibold text-[#475569]">{courseB.duration}</span>
              </div>

              <h3 className="text-xl font-extrabold font-display text-[#0F172A]">{courseB.name}</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[#475569] block mb-1">Faculty / Category:</span>
                  <span className="font-semibold text-[#0F172A] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0] inline-block">
                    {courseB.category}
                  </span>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">Cut-Off Competitiveness:</span>
                  <span className="font-extrabold text-[#0F9D58] text-sm">{courseB.cutOffMark}+ UTME Score</span>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">UTME Subjects Required:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(courseB.utmeSubjects || []).map((s, i) => (
                      <span key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[11px] font-medium text-[#0F172A]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">O'Level Requirements:</span>
                  <p className="text-[#0F172A] bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0] text-[11px] leading-relaxed">
                    {courseB.oLevelRequirements}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#475569] block mb-1">Primary Career Pathways:</span>
                  <div className="flex flex-wrap gap-1">
                    {(courseB.careerProspects || []).map((cp, idx) => (
                      <span key={idx} className="bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded text-[10px] font-semibold">
                        {cp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCourse(courseB)}
                className="w-full py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
              >
                View Full Course Details
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 7. RECOMMENDED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F9D58]">psychology</span>
            Personalised Course Recommendations
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">Discover degree options aligned directly with your secondary school subject passions.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recommendationClusters.map((cluster, idx) => (
            <div key={idx} className={`p-6 rounded-[20px] border ${cluster.bg} space-y-4`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center ${cluster.iconColor}`}>
                  <span className="material-symbols-outlined text-2xl">{cluster.icon}</span>
                </div>
                <h3 className="font-bold text-base font-display text-[#0F172A]">{cluster.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {(cluster.recommended || []).map((rec, rIdx) => {
                  const matchCourse = COURSES_DATA.find(c => c.id === rec.id);
                  return (
                    <button
                      key={rIdx}
                      onClick={() => matchCourse && onSelectCourse(matchCourse)}
                      className="bg-white border border-[#E2E8F0] hover:border-[#0F9D58] hover:text-[#0F9D58] text-[#0F172A] px-3 py-2 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">{rec.icon}</span>
                      <span>{rec.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. STUDENT RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F9D58]">apps</span>
            Student Guidance Resources
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">Essential JAMB Compass tools designed to streamline your admission preparation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#0F9D58] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">rule</span>
            </div>
            <h3 className="font-bold text-base font-display text-[#0F172A]">Subject Combination Checker</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Verify exact 4-subject UTME requirements for any undergraduate course in Nigeria.
            </p>
            <button
              onClick={() => setActiveTab && setActiveTab('guide')}
              className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
            >
              Open Checker Tool
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#0F9D58] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">domain</span>
            </div>
            <h3 className="font-bold text-base font-display text-[#0F172A]">University Directory</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Explore 200+ Federal, State, and Private universities, cut-off marks, and tuition fees.
            </p>
            <button
              onClick={() => setActiveTab && setActiveTab('universities')}
              className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
            >
              Open University Directory
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#0F9D58] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">checklist</span>
            </div>
            <h3 className="font-bold text-base font-display text-[#0F172A]">Admission Requirements Checker</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Check O'Level sitting rules, DE entry credits, and age eligibility benchmarks.
            </p>
            <button
              onClick={() => setActiveTab && setActiveTab('admission')}
              className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
            >
              Open Requirements Checker
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#0F9D58] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">quiz</span>
            </div>
            <h3 className="font-bold text-base font-display text-[#0F172A]">CBT Practice & Study Hub</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Practice past JAMB questions with real-time CBT timer and instant detailed explanations.
            </p>
            <button
              onClick={() => setActiveTab && setActiveTab('study-hub')}
              className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
            >
              Launch CBT Practice
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#0F9D58] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">explore</span>
            </div>
            <h3 className="font-bold text-base font-display text-[#0F172A]">Career Explorer Tool</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Map undergraduate university courses directly to high-paying professional career pathways.
            </p>
            <button
              onClick={() => setActiveTab && setActiveTab('careers')}
              className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
            >
              Open Career Explorer
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 hover:border-[#0F9D58] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">article</span>
            </div>
            <h3 className="font-bold text-base font-display text-[#0F172A]">JAMB Registration Guide</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Step-by-step walkthrough for NIN generation, profile code creation, and pin vending.
            </p>
            <button
              onClick={() => setActiveTab && setActiveTab('guide')}
              className="px-4 py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors"
            >
              Read Registration Guide
            </button>
          </div>

        </div>
      </section>

      {/* 9. FEATURED UNIVERSITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">account_balance</span>
              Top Universities Offering These Courses
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">Explore premier Nigerian tertiary institutions with high academic accreditation.</p>
          </div>

          <button
            onClick={() => setActiveTab && setActiveTab('universities')}
            className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
          >
            <span>View All 200+ Universities</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSITIES_DATA.slice(0, 4).map((univ) => (
            <div
              key={univ.id}
              onClick={() => onSelectUniversity && onSelectUniversity(univ)}
              className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all p-4 space-y-3 cursor-pointer group"
            >
              <div className="h-28 rounded-xl overflow-hidden bg-slate-100 relative">
                <img
                  src={univ.imageUrl}
                  alt={univ.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 text-[#0F172A] border border-white/20">
                  {univ.type}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                  {univ.name} ({univ.abbreviation})
                </h3>
                <p className="text-[11px] text-[#475569] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
                  <span>{univ.location}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
                <span className="text-[#475569]">Cut-off: <strong className="text-[#0F9D58]">{univ.cutOffMark}+</strong></span>
                <span className="text-[#2563EB] font-bold flex items-center gap-0.5">
                  View <span className="material-symbols-outlined text-xs">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
            Help & Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#475569]">
            Common questions regarding course selection, JAMB UTME combinations, and O'Level requirements.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                  className="w-full text-left p-5 font-bold font-display text-sm sm:text-base text-[#0F172A] flex items-center justify-between gap-4 hover:text-[#0F9D58] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="material-symbols-outlined text-lg text-[#0F9D58] flex-shrink-0">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3 bg-[#F8FAFC]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F9D58] rounded-[28px] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F9D58]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider font-display">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              Start Your Tertiary Journey
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Find the Perfect Course?
            </h2>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Browse courses, compare requirements, and plan your journey to university with official JAMB guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={() => {
                document.getElementById('courses-search')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-[#0F9D58] hover:bg-[#0b8046] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">search</span>
              <span>Explore Courses</span>
            </button>

            <button
              onClick={() => setActiveTab && setActiveTab('universities')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">domain</span>
              <span>Find Universities</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
