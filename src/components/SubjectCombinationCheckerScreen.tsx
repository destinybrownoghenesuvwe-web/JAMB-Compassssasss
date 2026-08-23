import React, { useState } from 'react';
import { TabType, Course } from '../types';
import { COURSES_DATA } from '../data/mockData';

interface SubjectCombinationCheckerScreenProps {
  setActiveTab: (tab: TabType) => void;
  onSelectCourse?: (course: Course) => void;
}

export const SubjectCombinationCheckerScreen: React.FC<SubjectCombinationCheckerScreenProps> = ({
  setActiveTab,
  onSelectCourse,
}) => {
  // Currently selected course (default: Computer Science)
  const defaultCourse = COURSES_DATA.find(c => c.id === 'comp-sci') || COURSES_DATA[1] || COURSES_DATA[0];
  const [selectedCourse, setSelectedCourse] = useState<Course>(defaultCourse);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Interactive Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveCourse = () => {
    if (savedCourses.includes(selectedCourse.id)) {
      setSavedCourses(savedCourses.filter(id => id !== selectedCourse.id));
      showToast(`${selectedCourse.name} removed from saved combinations.`);
    } else {
      setSavedCourses([...savedCourses, selectedCourse.id]);
      showToast(`${selectedCourse.name} combination saved successfully!`);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Subject combination link copied to clipboard!');
    } else {
      showToast('Subject combination share link prepared.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    const textContent = `
JAMB COMPASS - SUBJECT COMBINATION SUMMARY
--------------------------------------------------
Course: ${selectedCourse.name}
Faculty: ${selectedCourse.category}
Duration: ${selectedCourse.duration}
Target Cut-off Mark: ${selectedCourse.cutOffMark}+

UTME SUBJECT COMBINATION:
${(selectedCourse.utmeSubjects || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}

O'LEVEL REQUIREMENTS:
${selectedCourse.oLevelRequirements}

CAREER PROSPECTS:
${(selectedCourse.careerProspects || []).join(', ')}
--------------------------------------------------
Generated via JAMB Compass Educational Platform
`.trim();

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedCourse.name.replace(/[^a-zA-Z0-0]/g, '_')}_JAMB_Combination.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Downloaded combination summary TXT file.');
  };

  // Filtered courses for auto-suggestions & search
  const filteredCourses = COURSES_DATA.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.utmeSubjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && course.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Example search course keywords
  const popularCourseExamples = [
    { name: 'Computer Science', id: 'comp-sci' },
    { name: 'Medicine & Surgery', id: 'med-surg' },
    { name: 'Law (LL.B)', id: 'law' },
    { name: 'Accounting & Finance', id: 'acct' },
    { name: 'Civil Engineering', id: 'civil-eng' },
    { name: 'Nursing Science', id: 'nursing' },
    { name: 'Architecture', id: 'arch' },
    { name: 'Software Engineering', id: 'soft-eng' },
    { name: 'Mass Communication', id: 'mass-comm' },
    { name: 'Pharmacy', id: 'pharm' },
    { name: 'Economics', id: 'econ' },
    { name: 'Mechanical Engineering', id: 'mech-eng' },
  ];

  // Categories list
  const courseCategories = [
    { name: 'Science', icon: 'biotech', count: '18 Courses', color: 'text-purple-600 bg-purple-50' },
    { name: 'Medical', icon: 'medical_services', count: '14 Courses', color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Engineering', icon: 'engineering', count: '22 Courses', color: 'text-blue-600 bg-blue-50' },
    { name: 'Law', icon: 'gavel', count: '6 Courses', color: 'text-amber-600 bg-amber-50' },
    { name: 'Arts', icon: 'palette', count: '15 Courses', color: 'text-pink-600 bg-pink-50' },
    { name: 'Business', icon: 'payments', count: '16 Courses', color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Tech', icon: 'computer', count: '12 Courses', color: 'text-cyan-600 bg-cyan-50' },
  ];

  // Related courses logic
  const relatedCoursesList = COURSES_DATA.filter(c => c.id !== selectedCourse.id && (c.category === selectedCourse.category || c.popular)).slice(0, 6);

  // Common mistakes items
  const commonMistakes = [
    {
      title: 'Choosing Wrong UTME Subjects',
      desc: 'Selecting subjects not approved by JAMB for your course (e.g., writing Agricultural Science instead of Physics for Computer Science) leads to automatic screening disqualification.',
      icon: 'cancel',
      color: 'border-red-200 bg-red-50/50 text-red-700',
      iconColor: 'text-red-600 bg-red-100',
    },
    {
      title: 'Ignoring O’Level Sittings Rules',
      desc: 'Uploading 2-sitting WAEC/NECO results for institutions like UNILAG or UI that strictly mandate single-sitting credits for Medicine, Dentistry, or Law.',
      icon: 'history_toggle_off',
      color: 'border-amber-200 bg-amber-50/50 text-amber-800',
      iconColor: 'text-amber-600 bg-amber-100',
    },
    {
      title: 'Using Outdated Admission Information',
      desc: 'Relying on old tutorial center handouts or unverified blogs instead of confirming with the current official JAMB IBASS brochure.',
      icon: 'menu_book',
      color: 'border-orange-200 bg-orange-50/50 text-orange-800',
      iconColor: 'text-orange-600 bg-orange-100',
    },
    {
      title: 'Not Confirming Institutional Variations',
      desc: 'Assuming all federal and state universities accept identical subject combinations. State universities may accept Geography while federal ones mandate Physics.',
      icon: 'help_center',
      color: 'border-amber-200 bg-amber-50/50 text-amber-800',
      iconColor: 'text-amber-600 bg-amber-100',
    },
  ];

  // Related Tools
  const relatedTools = [
    {
      title: 'Course Directory',
      desc: 'Browse all 85+ accredited undergraduate programs across Nigerian universities.',
      icon: 'auto_stories',
      tab: 'courses' as TabType,
    },
    {
      title: 'University Directory',
      desc: 'Explore Federal, State, and Private universities in Nigeria with cut-off marks.',
      icon: 'account_balance',
      tab: 'universities' as TabType,
    },
    {
      title: 'Admission Requirements Checker',
      desc: 'Check Post-UTME screening formats, aggregate score calculators, and sittings policies.',
      icon: 'fact_check',
      tab: 'admission' as TabType,
    },
    {
      title: 'Study Hub & CBT Practice',
      desc: 'Practice past JAMB questions with detailed explanations and instant scoring.',
      icon: 'quiz',
      tab: 'study-hub' as TabType,
    },
    {
      title: 'Registration Guide',
      desc: 'Step-by-step roadmap for JAMB UTME registration, e-PIN purchase, and CBT centers.',
      icon: 'route',
      tab: 'guide' as TabType,
    },
    {
      title: 'Career Explorer',
      desc: 'Discover career pathways, salary trends, and required degrees in Nigeria.',
      icon: 'work',
      tab: 'careers' as TabType,
    },
  ];

  // FAQ list
  const faqs = [
    {
      q: 'How many subjects do I write in UTME?',
      a: 'All candidates write a total of four (4) subjects in UTME: Use of English (compulsory for all candidates) plus three (3) specific subjects relevant to your chosen course of study.',
    },
    {
      q: 'Can universities have additional subject requirements beyond JAMB?',
      a: 'Yes. While JAMB sets general subject combinations, individual universities (e.g. UNILAG, UI, OAU) may specify mandatory O’Level grade requirements (e.g., A1/B2 grades) or mandate specific subjects like Further Mathematics for Engineering and Computer Science.',
    },
    {
      q: 'Can I change my course later if I chose the wrong subjects?',
      a: 'Yes. If you discover a subject mismatch before Post-UTME screening, you can log in to the official JAMB portal and apply for "Change of Course/Institution" to align with your written UTME subjects.',
    },
    {
      q: 'What happens if I choose the wrong subject combination during UTME registration?',
      a: 'If your UTME subjects do not match the official requirements in the JAMB IBASS brochure for your chosen course, your application will be flagged during Post-UTME screening and rejected by CAPS (Central Admissions Processing System).',
    },
    {
      q: 'Where can I verify official JAMB requirements?',
      a: 'Official requirements are published annually in the official JAMB Integrated Brochure and Syllabus System (IBASS). You can cross-reference our platform data directly with IBASS or official university admission portals.',
    },
  ];

  const isSaved = savedCourses.includes(selectedCourse.id);

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
          <button onClick={() => setActiveTab('home')} className="hover:text-[#0F9D58] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Home</span>
          </button>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#475569]">Tools</span>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#0F172A] font-bold">Subject Combination Checker</span>
        </div>
      </div>

      {/* HERO HEADER */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>JAMB IBASS Approved Guide</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              JAMB Subject Combination Checker
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Select your preferred course to instantly view the recommended UTME 4-subject combination, O'Level 5-credit requirements, and Direct Entry pathways. Avoid costly admission mistakes before UTME registration.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                <span>85+ Accredited Degree Programs</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>UTME & Direct Entry Compatible</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Updated 2026/2027 Guidelines</span>
              </span>
            </div>
          </div>

          {/* Hero Visual / Illustration Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">school</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Instant Requirement Verification</p>
                    <p className="text-base font-bold font-display">{selectedCourse.name}</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Verified
                </span>
              </div>

              {/* Subject Badges */}
              <div className="grid grid-cols-2 gap-2">
                {(selectedCourse.utmeSubjects || []).map((subject, idx) => (
                  <div key={idx} className="bg-white/10 border border-white/10 p-2.5 rounded-xl flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0F9D58] text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold truncate">{subject}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm flex-shrink-0 mt-0.5">info</span>
                <span>Includes WAEC/NECO credit requirements and Direct Entry prerequisites.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SMART SEARCH SECTION */}
        <section className="relative z-30">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Course Selection Tool
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Search Course Combination
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Type any degree title or select from quick popular recommendations below.
              </p>
            </div>

            {/* Large Search Input with Auto-Suggestions Dropdown */}
            <div className="relative">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-[#0F9D58] text-2xl pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for a course... (e.g. Computer Science, Medicine, Law, Accounting, Nursing)"
                  className="w-full pl-12 pr-12 py-4 bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#0F9D58] rounded-2xl text-sm sm:text-base text-[#0F172A] font-medium outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                )}
              </div>

              {/* Auto-suggestions Dropdown */}
              {isSearchFocused && filteredCourses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl max-h-72 overflow-y-auto z-50 p-2 divide-y divide-slate-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                    Matching Courses ({filteredCourses.length})
                  </div>
                  {filteredCourses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsSearchFocused(false);
                        setSearchQuery('');
                        showToast(`Loaded subject requirements for ${course.name}`);
                      }}
                      className="w-full text-left p-3 hover:bg-emerald-50/60 rounded-xl transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F9D58] flex items-center justify-center font-bold text-xs">
                          {course.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                            {course.name}
                          </p>
                          <p className="text-xs text-[#475569]">
                            {course.category} • UTME Cut-off: {course.cutOffMark}+
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#0F9D58] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Select <span class="material-symbols-outlined text-xs">arrow_forward</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Example Search Chips */}
            <div>
              <p className="text-xs font-bold text-[#475569] mb-2.5">Example Searches & Popular Choices:</p>
              <div className="flex flex-wrap gap-2">
                {popularCourseExamples.map((item) => {
                  const matchingCourse = COURSES_DATA.find(c => c.id === item.id);
                  const isCurrent = selectedCourse.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (matchingCourse) {
                          setSelectedCourse(matchingCourse);
                          showToast(`Selected ${matchingCourse.name}`);
                        }
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all border ${
                        isCurrent
                          ? 'bg-[#0F9D58] text-white border-[#0F9D58] shadow-xs'
                          : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border-[#E2E8F0]'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* QUICK COURSE CATEGORIES */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Faculty Explorer
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Browse by Academic Category
              </h2>
            </div>

            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
              >
                <span>Reset Category Filter</span>
                <span className="material-symbols-outlined text-xs">refresh</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {courseCategories.map((cat, idx) => {
              const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(isSelected ? 'All' : cat.name);
                    const matchedCourse = COURSES_DATA.find(c => c.category.toLowerCase() === cat.name.toLowerCase());
                    if (matchedCourse) {
                      setSelectedCourse(matchedCourse);
                      showToast(`Switched to ${matchedCourse.name} (${cat.name})`);
                    }
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all hover:-translate-y-1 flex flex-col justify-between h-32 group ${
                    isSelected
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                      : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0F9D58] hover:shadow-xs'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#0F9D58] text-white' : cat.color}`}>
                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs group-hover:text-[#0F9D58] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-[#475569]'}`}>
                      {cat.count}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* RESULT PANEL FOR SELECTED COURSE */}
        <section className="bg-white rounded-3xl border border-[#E2E8F0] shadow-md overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#0F281E] text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#0F9D58] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Faculty of {selectedCourse.category}
                </span>
                <span className="bg-white/15 text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  {selectedCourse.duration}
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                  Target Cut-off: {selectedCourse.cutOffMark}+
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                {selectedCourse.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Action Bar inside result panel */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={handleSaveCourse}
                className={`flex-1 md:flex-none text-xs font-bold px-4 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  isSaved
                    ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                  bookmark
                </span>
                <span>{isSaved ? 'Saved' : 'Save Course'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print</span>
              </button>

              <button
                onClick={handleShare}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                <span>Share</span>
              </button>

              <button
                onClick={handleDownloadSummary}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download Summary</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">

            {/* SECTION: UTME SUBJECT COMBINATION (4 SUBJECT CARDS) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
                    <span>UTME 4-Subject Combination</span>
                  </h3>
                  <p className="text-xs text-[#475569]">
                    Compulsory subjects required during JAMB UTME exam registration.
                  </p>
                </div>
                <span className="bg-emerald-50 text-[#16A34A] border border-emerald-200 text-xs font-bold px-3 py-1 rounded-xl">
                  4 Subjects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Subject 1: Use of English */}
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border-2 border-emerald-500/30 hover:border-[#0F9D58] transition-all relative space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">check</span>
                      Compulsory
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-base">Use of English</h4>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                      Mandatory subject for all JAMB candidates across all faculties in Nigeria. Tests comprehension and lexicology.
                    </p>
                  </div>
                </div>

                {/* Subject 2 */}
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#0F172A] text-white font-extrabold text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="bg-emerald-50 text-[#16A34A] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      Requirement
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-base">
                      {selectedCourse.utmeSubjects?.[1] || 'Mathematics'}
                    </h4>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                      Core mandatory requirement for calculation, logic, analytical quantitative reasoning, and scientific methodology.
                    </p>
                  </div>
                </div>

                {/* Subject 3 */}
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#0F172A] text-white font-extrabold text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="bg-emerald-50 text-[#16A34A] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      Requirement
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-base">
                      {selectedCourse.utmeSubjects?.[2] || 'Physics'}
                    </h4>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                      Core requirement focusing on physical principles, natural mechanics, thermodynamics, and laboratory sciences.
                    </p>
                  </div>
                </div>

                {/* Subject 4 */}
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-[#0F172A] text-white font-extrabold text-xs flex items-center justify-center">
                      4
                    </span>
                    <span className="bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      Elective / Option
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-base">
                      {selectedCourse.utmeSubjects?.[3] || 'Chemistry / Biology'}
                    </h4>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                      Specialized elective subject accepted by accredited universities according to faculty guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: O'LEVEL & DIRECT ENTRY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* O'LEVEL REQUIREMENTS CHECKLIST */}
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F9D58] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-base">O'Level 5-Credit Requirements</h3>
                      <p className="text-xs text-[#475569]">WAEC / NECO / NABTEB prerequisite subjects</p>
                    </div>
                  </div>
                  <span className="bg-white border border-[#E2E8F0] text-[11px] font-bold px-2.5 py-1 rounded-lg text-[#0F172A]">
                    5 Credits
                  </span>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">
                  {selectedCourse.oLevelRequirements}
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg flex-shrink-0">check</span>
                    <span className="text-xs font-semibold text-[#0F172A]">English Language (Credit C6 or better)</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg flex-shrink-0">check</span>
                    <span className="text-xs font-semibold text-[#0F172A]">Mathematics (Credit C6 or better)</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg flex-shrink-0">check</span>
                    <span className="text-xs font-semibold text-[#0F172A]">Physics / Core Major Subject Credit</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg flex-shrink-0">check</span>
                    <span className="text-xs font-semibold text-[#0F172A]">Chemistry / Secondary Major Subject Credit</span>
                  </div>
                  <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-[#16A34A] text-lg flex-shrink-0">check</span>
                    <span className="text-xs font-semibold text-[#0F172A]">One additional Science or Social Science subject</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#475569] bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-sm flex-shrink-0 mt-0.5">warning</span>
                  <span><strong>Sittings Policy:</strong> Maximum 2 sittings allowed. Note that UNILAG, UI, and OAU strictly mandate 1 sitting for Medicine, Law, and Dentistry.</span>
                </div>
              </div>

              {/* DIRECT ENTRY (DE) REQUIREMENTS */}
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">workspace_premium</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-base">Direct Entry (DE) Requirements</h3>
                      <p className="text-xs text-[#475569]">200-Level direct entry pathways</p>
                    </div>
                  </div>
                  <span className="bg-blue-50 text-[#2563EB] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-blue-200">
                    200 Level
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                    <p className="font-bold text-[#0F172A] text-xs flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#2563EB] text-sm">school</span>
                      <span>JUPEB / IJMB A-Levels</span>
                    </p>
                    <p>Minimum 2-3 principal passes in relevant subjects (e.g., Mathematics, Physics, Chemistry) with a minimum total points score of 8-12 points.</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                    <p className="font-bold text-[#0F172A] text-xs flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#2563EB] text-sm">badge</span>
                      <span>ND / HND Qualifications</span>
                    </p>
                    <p>National Diploma (ND) or Higher National Diploma (HND) in relevant engineering, computing, or science discipline with Upper Credit grade.</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                    <p className="font-bold text-[#0F172A] text-xs flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#2563EB] text-sm">history_edu</span>
                      <span>Degree Transfer / NCE</span>
                    </p>
                    <p>First Degree in a related discipline with minimum 2nd Class Lower, or NCE Merit pass for Education faculties.</p>
                  </div>
                </div>

                <div className="text-[11px] text-[#475569] bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#2563EB] text-sm flex-shrink-0 mt-0.5">info</span>
                  <span>Direct Entry requirements differ between institutions. Always confirm with the latest JAMB brochure and your chosen university.</span>
                </div>
              </div>

            </div>

            {/* IMPORTANT NOTES BOX */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-800">
                <span className="material-symbols-outlined text-amber-600 text-xl">warning</span>
                <h3 className="font-bold text-sm uppercase tracking-wider font-display">
                  Important Admission Guidelines & Warnings
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900 font-medium">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-base flex-shrink-0 mt-0.5">priority_high</span>
                  <span>Some universities may have additional subject requirements (e.g. UNILAG requires Further Maths for Computer Science).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-base flex-shrink-0 mt-0.5">priority_high</span>
                  <span>Always consult the latest JAMB IBASS brochure before completing registration.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-base flex-shrink-0 mt-0.5">priority_high</span>
                  <span>Verify institutional cut-off policies and Post-UTME screening eligibility.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-base flex-shrink-0 mt-0.5">priority_high</span>
                  <span>Admission policies and cut-off thresholds can change yearly per senate decision.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* RELATED COURSES SECTION */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Alternative Options
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Related & Similar Programs
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Courses sharing similar subject combinations or academic career pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCoursesList.map((rel) => (
              <div
                key={rel.id}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#0F9D58] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">
                      {rel.category}
                    </span>
                    <span className="text-[11px] font-semibold text-[#475569]">
                      UTME: {rel.cutOffMark}+
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0F172A] text-base group-hover:text-[#0F9D58] transition-colors leading-tight">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#475569] mt-2 line-clamp-2">
                    {rel.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[11px] text-[#475569] font-medium">
                    {rel.duration}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCourse(rel);
                      showToast(`Switched to ${rel.name}`);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#0F9D58] hover:text-[#0d8a4d] flex items-center gap-1"
                  >
                    <span>Explore Combination</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMON ADMISSION MISTAKES SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
              Admission Danger Zone
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Common Subject Combination Mistakes
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Avoid these 4 critical errors that disqualify thousands of JAMB applicants every year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commonMistakes.map((m, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${m.color} space-y-3 transition-all hover:shadow-xs`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${m.iconColor} flex items-center justify-center flex-shrink-0`}>
                    <span className="material-symbols-outlined text-xl">{m.icon}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">
                    {m.title}
                  </h3>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED TOOLS SECTION */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Student Toolkit
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Explore Related Admission Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab(tool.tab)}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center group-hover:bg-[#0F9D58] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center text-xs font-bold text-[#0F9D58]">
                  <span>Open Tool</span>
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Clear answers regarding UTME subjects, sittings policies, and registration rules.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all bg-[#F8FAFC]"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-4 sm:p-5 font-bold text-left text-sm text-[#0F172A] hover:bg-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-slate-400">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#E2E8F0] text-xs sm:text-sm text-[#475569] leading-relaxed bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="rounded-3xl bg-gradient-to-r from-[#0F9D58] via-[#0F281E] to-[#0F172A] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="bg-white/20 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Take the Next Step
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Continue Your Admission Journey?
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Explore universities, understand admission requirements, and prepare confidently for UTME with our interactive tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('universities')}
                className="bg-white text-[#0F172A] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">account_balance</span>
                <span>Explore Universities</span>
              </button>

              <button
                onClick={() => setActiveTab('study-hub')}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] border border-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">quiz</span>
                <span>Go to Study Hub</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
