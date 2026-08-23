import React, { useState, useMemo } from 'react';
import { University, UniversityType, TabType, Course } from '../types';
import { UNIVERSITIES_DATA, COURSES_DATA } from '../data/mockData';

interface UniversitiesScreenProps {
  onSelectUniversity?: (univ: University, initialTab?: 'requirements' | 'gallery') => void;
  onViewDetails?: (univ: University) => void;
  setActiveTab?: (tab: TabType) => void;
}

// Extended Uni Comparison Item structure for rich rows
interface UniComparisonItem extends University {
  established: number;
  studentPopulation: string;
  flagshipCourses: string[];
  campusEnvironment: string;
  facilities: string;
  postUtmeDetails: string;
  matchScore: number;
  estTuitionRange: string;
}

const EXTENDED_UNIS_DATA: UniComparisonItem[] = UNIVERSITIES_DATA.map((u, idx) => {
  const establishedYears: Record<string, number> = {
    unilag: 1962,
    ui: 1948,
    oau: 1962,
    cov: 2002,
    uniport: 1975,
    lasu: 1983,
    abu: 1962,
    unn: 1960
  };

  const popMap: Record<string, string> = {
    unilag: '55,000+ Students',
    ui: '35,000+ Students',
    oau: '40,000+ Students',
    cov: '10,000+ Students',
    uniport: '45,000+ Students',
    lasu: '30,000+ Students',
    abu: '60,000+ Students',
    unn: '50,000+ Students'
  };

  const flagshipMap: Record<string, string[]> = {
    unilag: ['Medicine', 'Computer Science', 'Law', 'Accounting', 'Civil Eng.'],
    ui: ['Medicine & Surgery', 'Pharmacy', 'Law', 'Agriculture', 'English'],
    oau: ['Pharmacy', 'Architecture', 'Law', 'Computer Eng.', 'Dramatic Arts'],
    cov: ['Software Eng.', 'Cybersecurity', 'Banking & Finance', 'Architecture'],
    uniport: ['Petroleum Eng.', 'Medicine', 'Geology', 'Theater Arts'],
    lasu: ['Law', 'Medicine', 'Mass Communication', 'Public Admin'],
    abu: ['Veterinary Medicine', 'Architecture', 'Law', 'Electrical Eng.'],
    unn: ['Medicine', 'Law', 'Electronic Eng.', 'Biochemistry']
  };

  const envMap: Record<string, string> = {
    unilag: 'Urban Coastal Lagoon Campus (Lagos Metro)',
    ui: 'Serene Academic City (Historical Tree-Lined Campus)',
    oau: 'Architectural Masterpiece Campus (Ile-Ife Hills)',
    cov: 'Ultra-Modern High-Discipline Residential Smart Campus',
    uniport: 'Metropolitan Niger-Delta Research Hub',
    lasu: 'Dynamic Mega-City State University Campus',
    abu: 'Expansive Northern Academic Landmark Campus',
    unn: 'Historical Lion Campus (Nsukka Academic Valley)'
  };

  const facMap: Record<string, string> = {
    unilag: 'Marine Bio Labs, Innovation Centre, Olympic Pool, High-Speed Wi-Fi',
    ui: 'University Teaching Hospital (UCH), Kenneth Dike Library, Botanical Garden',
    oau: 'Hezekiah Oluwasanmi Library, Natural History Museum, Tech Incubator',
    cov: 'CU-CRID Research Hub, 24/7 Power, E-Learning Studios, Modern Sports Complex',
    uniport: 'Institute of Petroleum Studies, Clinical Skill Centre, Digital Library',
    lasu: 'Centre for General Nigerian Studies, Moot Court, ICT Innovation Lab',
    abu: 'Ahmadu Bello University Teaching Hospital, Research Farm, Solar Grid',
    unn: 'Roar Nigeria Hub, Nnamdi Azikiwe Library, Supercomputing Node'
  };

  const postUtmeMap: Record<string, string> = {
    unilag: 'Online CBT Aptitude Test (English, Maths & General Paper)',
    ui: 'High-Competitiveness Written/CBT Subject Test + O’Level Aggregation',
    oau: 'CBT Screening (50% UTME + 50% Post-UTME weighting)',
    cov: 'CUSAS Interactive Screening (CBT + Character Assessment)',
    uniport: 'CBT Screening aligned strictly with UTME Subject Combination',
    lasu: 'Point-Based Online Screening (O’Level Grades + UTME Score)',
    abu: 'CBT Screening for top candidates scoring 180+ in UTME',
    unn: 'CBT Post-UTME Exam in Science, Arts or Commercial groups'
  };

  const scores = [92, 87, 84, 95, 81, 78, 85, 88];

  return {
    ...u,
    established: establishedYears[u.id] || 1970,
    studentPopulation: popMap[u.id] || '35,000+ Students',
    flagshipCourses: flagshipMap[u.id] || ['Computer Science', 'Law', 'Medicine'],
    campusEnvironment: envMap[u.id] || 'Modern Academic Campus',
    facilities: facMap[u.id] || 'Central Library, ICT Centre, Science Laboratories',
    postUtmeDetails: postUtmeMap[u.id] || 'Standard CBT Screening & O’Level Verification',
    matchScore: scores[idx % scores.length],
    estTuitionRange: u.tuitionRange
  };
});

export const UniversitiesScreen: React.FC<UniversitiesScreenProps> = ({
  onSelectUniversity,
  onViewDetails,
  setActiveTab
}) => {
  // Toast Notification State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Dark Focus Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // View Mode: 'compare' (default) vs 'directory'
  const [viewMode, setViewMode] = useState<'compare' | 'directory'>('compare');

  // Comparison Selector State (up to 4 selected universities)
  const [comparedUniIds, setComparedUniIds] = useState<string[]>(['unilag', 'ui', 'cov']);

  const selectedComparedUnis = useMemo(() => {
    return comparedUniIds
      .map(id => EXTENDED_UNIS_DATA.find(u => u.id === id))
      .filter((u): u is UniComparisonItem => u !== undefined);
  }, [comparedUniIds]);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<UniversityType>('All');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState<'UTME' | 'Direct Entry'>('UTME');
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'alpha' | 'cutoff-desc' | 'established'>('popular');

  // Active Filter Chip
  const [activeChip, setActiveChip] = useState('All');
  const filterChips = ['All', 'Engineering', 'Medicine', 'Law', 'Computer Science', 'Business', 'Arts', 'Sciences', 'Education', 'Agriculture'];

  // Course Match Analyser State
  const [matchCourse, setMatchCourse] = useState('Computer Science');
  const [matchState, setMatchState] = useState('Lagos');
  const [matchType, setMatchType] = useState<'All' | 'Federal' | 'State' | 'Private'>('All');
  const [matchCareer, setMatchCareer] = useState('Artificial Intelligence & Software Engineering');
  const [matchScoreResults, setMatchScoreResults] = useState<{
    topMatch: UniComparisonItem;
    secondMatch: UniComparisonItem;
    thirdMatch: UniComparisonItem;
    fourthMatch: UniComparisonItem;
  }>({
    topMatch: EXTENDED_UNIS_DATA[0], // UNILAG 95%
    secondMatch: EXTENDED_UNIS_DATA[3], // Covenant 92%
    thirdMatch: EXTENDED_UNIS_DATA[2], // UI 87%
    fourthMatch: EXTENDED_UNIS_DATA[1], // UNIPORT 81%
  });

  const handleRunMatch = () => {
    // Re-shuffle or calculate best matches based on state & course inputs
    const filtered = [...EXTENDED_UNIS_DATA].sort((a, b) => {
      let scoreA = a.matchScore;
      let scoreB = b.matchScore;
      if (a.location.toLowerCase().includes(matchState.toLowerCase())) scoreA += 10;
      if (b.location.toLowerCase().includes(matchState.toLowerCase())) scoreB += 10;
      if (matchType !== 'All' && a.type === matchType) scoreA += 8;
      if (matchType !== 'All' && b.type === matchType) scoreB += 8;
      return scoreB - scoreA;
    });

    setMatchScoreResults({
      topMatch: filtered[0] || EXTENDED_UNIS_DATA[0],
      secondMatch: filtered[1] || EXTENDED_UNIS_DATA[1],
      thirdMatch: filtered[2] || EXTENDED_UNIS_DATA[2],
      fourthMatch: filtered[3] || EXTENDED_UNIS_DATA[3],
    });

    triggerToast(`Matched 2026 Universities for ${matchCourse} in ${matchState}!`);
  };

  // Modal State
  const [showAddUniModal, setShowAddUniModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedMapUni, setSelectedMapUni] = useState<UniComparisonItem>(EXTENDED_UNIS_DATA[0]);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Filtered Universities for Directory View & Search
  const filteredUniversities = useMemo(() => {
    return EXTENDED_UNIS_DATA.filter((univ) => {
      const matchesType = selectedTypeFilter === 'All' || univ.type === selectedTypeFilter;
      const matchesSearch =
        univ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        univ.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        univ.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        univ.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesChip =
        activeChip === 'All' ||
        univ.flagshipCourses.some(c => c.toLowerCase().includes(activeChip.toLowerCase()));

      return matchesType && matchesSearch && matchesChip;
    }).sort((a, b) => {
      if (sortBy === 'cutoff-desc') return b.cutOffMark - a.cutOffMark;
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      if (sortBy === 'established') return a.established - b.established;
      return b.matchScore - a.matchScore;
    });
  }, [selectedTypeFilter, searchQuery, activeChip, sortBy]);

  // Handle Add/Remove Uni to comparison
  const toggleCompareUni = (id: string) => {
    if (comparedUniIds.includes(id)) {
      if (comparedUniIds.length <= 1) {
        triggerToast('You must keep at least 1 university in the comparison matrix!');
        return;
      }
      setComparedUniIds(prev => prev.filter(i => i !== id));
      triggerToast('Removed institution from comparison list.');
    } else {
      if (comparedUniIds.length >= 4) {
        triggerToast('You can compare a maximum of 4 universities side-by-side.');
        return;
      }
      setComparedUniIds(prev => [...prev, id]);
      const uniName = EXTENDED_UNIS_DATA.find(u => u.id === id)?.abbreviation || id;
      triggerToast(`Added ${uniName} to comparison list!`);
    }
  };

  const handleVoiceSearch = () => {
    triggerToast('🎙️ Voice Search activated. Say a university or course name...');
  };

  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'} pb-24`}>
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* TOP BREADCRUMB & FOCUS BAR */}
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
              onClick={() => setViewMode('directory')}
              className="hover:text-[#0F9D58] transition-colors"
            >
              Universities
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-[#0F9D58] font-bold">Compare Universities (2026)</span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher Toggle */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('compare')}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  viewMode === 'compare' ? 'bg-[#0F9D58] text-white shadow-sm' : 'text-[#475569] dark:text-slate-300'
                }`}
              >
                Compare &amp; Match
              </button>
              <button
                onClick={() => setViewMode('directory')}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  viewMode === 'directory' ? 'bg-[#0F9D58] text-white shadow-sm' : 'text-[#475569] dark:text-slate-300'
                }`}
              >
                All Directory ({UNIVERSITIES_DATA.length})
              </button>
            </div>

            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                triggerToast(!isDarkMode ? 'Dark Focus Mode Activated' : 'Light Mode Enabled');
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
      </div>

      {/* PAGE HEADER / HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
              <span>Official 2026 Academic Comparison Engine</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              University Comparison &amp; <span className="text-[#82FAAB]">Course Match</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Compare universities, explore admission information, and discover institutions that align with your academic goals for the 2026 admission cycle.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('comparison-matrix-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">analytics</span>
                <span>Explore Side-by-Side Matrix</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('course-matcher-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>Run Course Matcher</span>
              </button>
            </div>
          </div>

          {/* Premium Hero Graphic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    🏛️
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">NUC Accredited Data</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">2026 Admission Benchmarks</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Verified Guide
                </span>
              </div>

              {/* Digital Hero Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#82FAAB]">account_balance</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">University Campuses</p>
                    <p className="text-[9px] text-slate-300">Federal, State &amp; Private</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-300">analytics</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Analytics Dashboard</p>
                    <p className="text-[9px] text-slate-300">Side-by-side matrices</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-300">school</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Graduation Cap</p>
                    <p className="text-[9px] text-slate-300">Degree Pathways 2026</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-purple-300">map</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Geo Location Maps</p>
                    <p className="text-[9px] text-slate-300">State campus pinpoints</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0F9D58]/20 border border-[#0F9D58]/40 rounded-2xl text-[11px] text-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Guidance note: Demo comparison metrics derived from official 2026 guidelines.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* SMART SEARCH BAR */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#0F9D58] text-2xl group-focus-within:scale-110 transition-transform">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universities, courses, or locations for 2026 cycle..."
              className="w-full pl-14 pr-16 py-4 bg-[#F8FAFC] dark:bg-slate-800 border-2 border-[#E2E8F0] dark:border-slate-700 focus:border-[#0F9D58] dark:focus:border-[#0F9D58] focus:ring-4 focus:ring-[#0F9D58]/10 rounded-2xl text-sm sm:text-base font-medium text-[#0F172A] dark:text-white transition-all shadow-inner"
            />
            <button
              onClick={handleVoiceSearch}
              title="Voice Search"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#475569] dark:text-slate-300 hover:text-[#0F9D58] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>
          </div>

          {/* FILTER PANEL: DROPDOWNS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Course Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Course</label>
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">All Courses</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Medicine & Surgery">Medicine &amp; Surgery</option>
                <option value="Law">Law (LL.B)</option>
                <option value="Engineering">Engineering</option>
                <option value="Accounting">Accounting &amp; Finance</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>

            {/* State Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300">State / Location</label>
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">All States</option>
                <option value="Lagos">Lagos State</option>
                <option value="Oyo">Oyo State</option>
                <option value="Ogun">Ogun State</option>
                <option value="Rivers">Rivers State</option>
                <option value="Osun">Osun State</option>
                <option value="Kaduna">Kaduna State</option>
                <option value="Enugu">Enugu State</option>
              </select>
            </div>

            {/* Institution Type Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Institution Type</label>
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value as UniversityType)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">All Types</option>
                <option value="Federal">Federal Universities</option>
                <option value="State">State Universities</option>
                <option value="Private">Private Universities</option>
              </select>
            </div>

            {/* Admission Route */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Admission Route</label>
              <select
                value={selectedRouteFilter}
                onChange={(e) => setSelectedRouteFilter(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="UTME">UTME (100 Level)</option>
                <option value="Direct Entry">Direct Entry (200L)</option>
              </select>
            </div>

            {/* Faculty */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Faculty</label>
              <select
                value={selectedFacultyFilter}
                onChange={(e) => setSelectedFacultyFilter(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="All">All Faculties</option>
                <option value="Science">Sciences &amp; Computing</option>
                <option value="Medicine">Clinical &amp; Health Sciences</option>
                <option value="Engineering">Engineering &amp; Tech</option>
                <option value="Law">Law &amp; Jurisprudence</option>
                <option value="Social Sciences">Social &amp; Management Sciences</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#475569] dark:text-slate-300">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="popular">Most Popular (2026)</option>
                <option value="cutoff-desc">Highest UTME Cut-off</option>
                <option value="established">Established Year</option>
                <option value="alpha">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>

          {/* FILTER CHIPS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#475569] dark:text-slate-400 shrink-0">Field Categories:</span>
            {filterChips.map(chip => (
              <button
                key={chip}
                onClick={() => {
                  setActiveChip(chip);
                  triggerToast(`Filtered for ${chip} programs.`);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  activeChip === chip
                    ? 'bg-[#0F9D58] text-white border-[#0F9D58] shadow-sm'
                    : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-300 border-[#E2E8F0] dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* COMPARE UNIVERSITIES SELECTOR CARDS (UP TO 4 SLOTS) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Comparison Deck</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Selected Institutions for 2026 Comparison ({selectedComparedUnis.length} of 4)
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddUniModal(true)}
                className="py-2 px-4 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                <span>Add Institution</span>
              </button>

              <button
                onClick={() => {
                  setComparedUniIds(['unilag', 'ui']);
                  triggerToast('Reset comparison deck to default.');
                }}
                className="py-2 px-3 bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-slate-300 text-xs font-bold rounded-xl border border-[#E2E8F0] dark:border-slate-700 hover:text-[#0F9D58]"
              >
                Reset Deck
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedComparedUnis.map((uni) => (
              <div
                key={uni.id}
                className={`p-5 rounded-3xl border shadow-md relative flex flex-col justify-between transition-all group ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <button
                  onClick={() => toggleCompareUni(uni.id)}
                  title="Remove from comparison"
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-500 transition-colors flex items-center justify-center text-xs"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>

                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F9D58]/10 border border-[#0F9D58]/30 overflow-hidden p-1 flex items-center justify-center">
                    <img
                      src={uni.imageUrl}
                      alt={uni.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F9D58] bg-[#0F9D58]/10 px-2.5 py-0.5 rounded-full border border-[#0F9D58]/20">
                      Est. {uni.established} • {uni.type}
                    </span>
                    <h3 className="text-base font-extrabold font-display text-[#0F172A] dark:text-white pt-1.5 leading-snug">
                      {uni.name} ({uni.abbreviation})
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-slate-400 font-medium">
                      📍 {uni.location}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#475569] dark:text-slate-400 block">2026 UTME Cut-off</span>
                    <strong className="text-sm font-bold text-[#0F9D58]">{uni.cutOffMark} Score</strong>
                  </div>

                  <button
                    onClick={() => onViewDetails && onViewDetails(uni)}
                    className="py-1.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 text-[#0F172A] dark:text-white hover:text-[#0F9D58] text-[11px] font-bold rounded-xl border border-[#E2E8F0] dark:border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <span>View Profile</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Empty Slot Card if less than 4 selected */}
            {selectedComparedUnis.length < 4 && (
              <button
                onClick={() => setShowAddUniModal(true)}
                className="p-6 rounded-3xl border-2 border-dashed border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] bg-[#F8FAFC]/50 dark:bg-slate-900/40 transition-all flex flex-col items-center justify-center text-center space-y-3 min-h-[220px] group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] group-hover:bg-[#0F9D58] group-hover:text-white transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">add</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A] dark:text-white">Add 4th Institution</p>
                  <p className="text-xs text-[#475569] dark:text-slate-400">Click to pick from NUC directory</p>
                </div>
              </button>
            )}
          </div>
        </section>

        {/* SIDE-BY-SIDE COMPARISON TABLE */}
        <section id="comparison-matrix-section" className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Side-by-Side Matrix</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Detailed 2026 Academic Metric Matrix
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="py-2.5 px-4 bg-[#0F172A] dark:bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download PDF Summary</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="py-2.5 px-4 bg-white dark:bg-slate-800 text-[#0F9D58] border border-[#0F9D58] text-xs font-bold rounded-xl hover:bg-[#0F9D58]/10 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-slate-800">
                  <th className="p-4 text-xs font-extrabold uppercase text-[#475569] dark:text-slate-400 min-w-[200px] bg-slate-100 dark:bg-slate-900 sticky left-0 z-10">
                    Comparison Metric
                  </th>
                  {selectedComparedUnis.map(uni => (
                    <th key={uni.id} className="p-4 text-center min-w-[240px]">
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-sm font-extrabold text-[#0F172A] dark:text-white font-display">
                          {uni.name}
                        </span>
                        <span className="text-[10px] bg-[#0F9D58]/10 text-[#0F9D58] px-2 py-0.5 rounded-full font-bold">
                          {uni.type} • Est. {uni.established}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800 text-xs sm:text-sm">
                {/* Row 1: Location */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    📍 Location
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300 font-medium">
                      {u.location}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Institution Type */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    🏛️ Institution Type
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center font-semibold text-[#0F9D58]">
                      {u.type} University
                    </td>
                  ))}
                </tr>

                {/* Row 3: Flagship Courses Offered */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    📚 Flagship Courses Offered
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {u.flagshipCourses.map(fc => (
                          <span key={fc} className="bg-slate-200 dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {fc}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row 4: Admission Route Pathways */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    🛣️ Admission Route Pathways
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      UTME (100L) &amp; Direct Entry (200L)
                    </td>
                  ))}
                </tr>

                {/* Row 5: General Entry Requirements */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    📋 General Entry Requirements (2026)
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      Min. UTME: <strong>{u.cutOffMark}</strong> + 5 O’Level Credits (WAEC/NECO in max 2 sittings)
                    </td>
                  ))}
                </tr>

                {/* Row 6: Post-UTME Information */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    💻 Post-UTME Guidance
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      {u.postUtmeDetails}
                    </td>
                  ))}
                </tr>

                {/* Row 7: Programme Duration */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    ⏳ Programme Duration
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      4 Years (B.Sc) / 5 Years (Eng &amp; Law) / 6 Years (MBBS)
                    </td>
                  ))}
                </tr>

                {/* Row 8: Campus Environment */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    🌿 Campus Environment
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      {u.campusEnvironment}
                    </td>
                  ))}
                </tr>

                {/* Row 9: Student Population */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    👥 Student Population (Placeholder)
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center font-semibold text-[#0F172A] dark:text-white">
                      {u.studentPopulation}
                    </td>
                  ))}
                </tr>

                {/* Row 10: Facilities Overview */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    🔬 Facilities Overview
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      {u.facilities}
                    </td>
                  ))}
                </tr>

                {/* Row 11: Accommodation Availability */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    🏠 Accommodation Availability
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center text-[#475569] dark:text-slate-300">
                      {u.accommodation}
                    </td>
                  ))}
                </tr>

                {/* Row 12: Estimated Tuition Range */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100/80 dark:bg-slate-900/80 sticky left-0 z-10">
                    💳 Estimated Annual Tuition
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center font-bold text-[#2563EB]">
                      {u.estTuitionRange}
                    </td>
                  ))}
                </tr>

                {/* Row 13: Actions */}
                <tr className="bg-slate-50 dark:bg-slate-900">
                  <td className="p-4 font-bold text-[#0F172A] dark:text-white bg-slate-100 dark:bg-slate-900 sticky left-0 z-10">
                    ⚡ Quick Actions
                  </td>
                  {selectedComparedUnis.map(u => (
                    <td key={u.id} className="p-4 text-center">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => onViewDetails && onViewDetails(u)}
                          className="py-1.5 px-3 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A] transition-colors"
                        >
                          View Full Profile
                        </button>

                        <button
                          onClick={() => triggerToast(`Saved ${u.abbreviation} comparison data to your profile!`)}
                          className="py-1 px-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-[#475569] dark:text-slate-300 rounded-xl text-[11px] font-bold hover:text-[#0F9D58]"
                        >
                          Save Comparison
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* COURSE MATCH ANALYSER & CIRCULAR MATCH SCORES */}
        <section id="course-matcher-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form & Input Card */}
          <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Intelligent Match Engine</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white pt-0.5">
                2026 Course &amp; University Match Analyser
              </h2>
              <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
                Enter your academic preferences to generate customized compatibility scores for top Nigerian tertiary institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input 1: Preferred Course */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Preferred Course</label>
                <select
                  value={matchCourse}
                  onChange={(e) => setMatchCourse(e.target.value)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Medicine & Surgery">Medicine &amp; Surgery</option>
                  <option value="Law (LL.B)">Law (LL.B)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Accounting & Finance">Accounting &amp; Finance</option>
                  <option value="Nursing Science">Nursing Science</option>
                  <option value="Mass Communication">Mass Communication</option>
                  <option value="Pharmacy">Pharmacy</option>
                </select>
              </div>

              {/* Input 2: Preferred State */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Preferred State / Region</label>
                <select
                  value={matchState}
                  onChange={(e) => setMatchState(e.target.value)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
                >
                  <option value="Lagos">Lagos State</option>
                  <option value="Oyo">Oyo State</option>
                  <option value="Ogun">Ogun State</option>
                  <option value="Rivers">Rivers State</option>
                  <option value="Abuja">Federal Capital Territory (Abuja)</option>
                  <option value="Enugu">Enugu State</option>
                  <option value="Kaduna">Kaduna State</option>
                </select>
              </div>

              {/* Input 3: Institution Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Institution Type Preference</label>
                <select
                  value={matchType}
                  onChange={(e) => setMatchType(e.target.value as any)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
                >
                  <option value="All">Any Institution Type (Federal, State, Private)</option>
                  <option value="Federal">Federal Universities Only</option>
                  <option value="State">State Universities Only</option>
                  <option value="Private">Private Universities Only</option>
                </select>
              </div>

              {/* Input 4: Career Interest */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Career Goal Interest</label>
                <select
                  value={matchCareer}
                  onChange={(e) => setMatchCareer(e.target.value)}
                  className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
                >
                  <option value="Artificial Intelligence & Software Engineering">AI &amp; Software Development</option>
                  <option value="Clinical Medicine & Hospital Practice">Clinical Medicine &amp; Surgery</option>
                  <option value="Corporate Law & Commercial Advocacy">Corporate Law &amp; Governance</option>
                  <option value="Renewable Energy & Robotics">Renewable Energy &amp; Mechatronics</option>
                  <option value="Investment Banking & Financial Audit">Investment Banking &amp; Audit</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRunMatch}
              className="w-full py-3.5 bg-[#0F9D58] text-white font-bold text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">psychology</span>
              <span>Calculate 2026 Match Recommendations</span>
            </button>

            {/* Prominent Educational Disclaimer Note */}
            <div className="p-4 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs text-[#2563EB] dark:text-blue-300 flex items-start gap-3">
              <span className="material-symbols-outlined text-lg shrink-0">info</span>
              <div>
                <strong className="block font-bold">Important Educational Guidance Notice:</strong>
                Recommendations are based on demo criteria and are for guidance only. Always verify official admission requirements directly with JAMB and your target institutions.
              </div>
            </div>
          </div>

          {/* Match Score Display Cards with Circular SVG Progress Indicators */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-[#E2E8F0] dark:border-slate-800">
              <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white flex items-center gap-2">
                <span>Calculated Match Scores (Demo)</span>
                <span className="text-[10px] bg-[#0F9D58] text-white px-2 py-0.5 rounded-full font-bold">2026</span>
              </h3>
            </div>

            {/* Circular Progress Cards */}
            <div className="space-y-3">
              {/* Score 1 */}
              <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between gap-4 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-200 dark:text-slate-700" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeWidth="4"></circle>
                      <circle className="text-[#0F9D58]" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeDasharray="138" strokeDashoffset="11" strokeWidth="4"></circle>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#0F9D58]">92%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0F9D58] uppercase">Top Match Candidate</span>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      {matchScoreResults.topMatch.name}
                    </h4>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400">
                      {matchScoreResults.topMatch.location} • Cut-off: {matchScoreResults.topMatch.cutOffMark}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-[#0F9D58] text-[10px] font-bold rounded-full border border-emerald-300">
                  Optimal Fit
                </span>
              </div>

              {/* Score 2 */}
              <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between gap-4 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-200 dark:text-slate-700" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeWidth="4"></circle>
                      <circle className="text-[#2563EB]" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeDasharray="138" strokeDashoffset="18" strokeWidth="4"></circle>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#2563EB]">87%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2563EB] uppercase">Second Choice Match</span>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      {matchScoreResults.secondMatch.name}
                    </h4>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400">
                      {matchScoreResults.secondMatch.location} • Cut-off: {matchScoreResults.secondMatch.cutOffMark}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-[#2563EB] text-[10px] font-bold rounded-full border border-blue-300">
                  High Fit
                </span>
              </div>

              {/* Score 3 */}
              <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between gap-4 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-200 dark:text-slate-700" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeWidth="4"></circle>
                      <circle className="text-purple-600" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeDasharray="138" strokeDashoffset="26" strokeWidth="4"></circle>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-purple-600">81%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Third Choice Match</span>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      {matchScoreResults.thirdMatch.name}
                    </h4>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400">
                      {matchScoreResults.thirdMatch.location} • Cut-off: {matchScoreResults.thirdMatch.cutOffMark}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full border border-purple-300">
                  Solid Fit
                </span>
              </div>

              {/* Score 4 */}
              <div className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between gap-4 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-200 dark:text-slate-700" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeWidth="4"></circle>
                      <circle className="text-amber-600" cx="28" cy="28" fill="transparent" r="22" stroke="currentColor" strokeDasharray="138" strokeDashoffset="33" strokeWidth="4"></circle>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-amber-600">76%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">Alternative Match</span>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      {matchScoreResults.fourthMatch.name}
                    </h4>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400">
                      {matchScoreResults.fourthMatch.location} • Cut-off: {matchScoreResults.fourthMatch.cutOffMark}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full border border-amber-300">
                  Alternative
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* REGIONAL MAP VIEW PLACEHOLDER */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Geographical Distribution</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Interactive University Map View (2026 Cycle)
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-2xl text-xs font-bold text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58]"></span> Federal</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span> State</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Private</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#0F281E] text-white border border-slate-700 shadow-2xl flex flex-col justify-between p-6">
            {/* Top Bar Map Controls */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-xs border border-white/20">
                <span className="material-symbols-outlined text-[#82FAAB] text-sm">my_location</span>
                <span>Federal Republic of Nigeria • 36 States &amp; FCT</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
                <button
                  onClick={() => triggerToast('Zooming map view (+)')}
                  className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
                <button
                  onClick={() => triggerToast('Zooming map view (-)')}
                  className="p-1.5 hover:bg-white/20 rounded-xl text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
              </div>
            </div>

            {/* Interactive Map University Pins Canvas */}
            <div className="relative w-full h-full flex items-center justify-center my-4">
              {/* Animated Map Grid & Pin Items */}
              <div className="absolute inset-0 bg-[radial-gradient(#0F9D58_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl z-10">
                {EXTENDED_UNIS_DATA.slice(0, 8).map((uni, idx) => (
                  <button
                    key={uni.id}
                    onClick={() => {
                      setSelectedMapUni(uni);
                      triggerToast(`Selected ${uni.name} on the Map.`);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all hover:scale-105 shadow-md flex items-center gap-2.5 ${
                      selectedMapUni.id === uni.id
                        ? 'bg-[#0F9D58] text-white border-emerald-400 ring-4 ring-[#0F9D58]/40'
                        : 'bg-[#0F172A]/80 text-white border-slate-700 hover:border-[#0F9D58]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#82FAAB] shrink-0 animate-ping"></span>
                    <div>
                      <p className="text-xs font-bold leading-none">{uni.abbreviation}</p>
                      <p className="text-[10px] text-slate-300 truncate max-w-[100px] mt-0.5">{uni.location.split(',')[0]}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Map Uni Popup Info Card */}
            <div className="z-10 bg-black/75 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#82FAAB] text-3xl">domain</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {selectedMapUni.name} ({selectedMapUni.abbreviation})
                  </h4>
                  <p className="text-xs text-slate-300">
                    {selectedMapUni.location} • {selectedMapUni.type} University • Est. {selectedMapUni.established}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onViewDetails && onViewDetails(selectedMapUni)}
                className="py-2 px-4 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all shrink-0 flex items-center gap-1.5"
              >
                <span>View Full Details</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </section>

        {/* UNIVERSITY INSIGHTS GRID */}
        <section className="space-y-6">
          <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Institutional Benchmarks</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              University Insights &amp; Excellence Areas (2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-[#0F9D58] flex items-center justify-center text-xl">
                <span className="material-symbols-outlined">workspace_premium</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Academic Strengths</h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                NUC-accredited programs featuring top-ranked faculty members, international research partnerships, and rigorous curriculum standards.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-[#2563EB] flex items-center justify-center text-xl">
                <span className="material-symbols-outlined">category</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Popular Faculties</h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                High demand faculties including Clinical Medicine, Computing &amp; AI, Law, Electrical Engineering, and Business Administration.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 flex items-center justify-center text-xl">
                <span className="material-symbols-outlined">science</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Research Opportunities</h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                Access to state-of-the-art laboratory facilities, national science foundation grants, and undergraduate research fellowships.
              </p>
            </div>

            {/* Card 4 */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 flex items-center justify-center text-xl">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Student Support Services</h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                24/7 academic counseling, mental wellness centres, work-study financial aid, and peer tutoring networks across departments.
              </p>
            </div>

            {/* Card 5 */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-700 flex items-center justify-center text-xl">
                <span className="material-symbols-outlined">sports_basketball</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Campus Life &amp; Culture</h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                Vibrant student unions, inter-university sports championships (NUGA games), debates, hackathons, and cultural societies.
              </p>
            </div>

            {/* Card 6 */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-3 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-900/40 text-teal-700 flex items-center justify-center text-xl">
                <span className="material-symbols-outlined">work</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white">Career Development</h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                Dedicated career centers, corporate internship matching with multinational partners, and active alumni mentorship programs.
              </p>
            </div>
          </div>
        </section>

        {/* SAVE & EXPORT TOOLBAR */}
        <section className="bg-gradient-to-r from-[#0F172A] via-[#1C2541] to-[#0F281E] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#82FAAB]">save</span>
              <span>Save &amp; Share Your 2026 Comparison Data</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Export your side-by-side analysis, download a comprehensive PDF report, or bookmark your favorite university shortlist.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => triggerToast('Saved 2026 Comparison Shortlist to Profile!')}
              className="py-3 px-5 bg-[#0F9D58] hover:bg-[#16A34A] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">bookmark</span>
              <span>Save Comparison</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="py-3 px-5 bg-white text-[#0F172A] hover:bg-slate-100 text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">picture_as_pdf</span>
              <span>Download PDF Summary</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                triggerToast('Copied 2026 Comparison link to clipboard!');
              }}
              className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-2xl border border-white/20 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">share</span>
              <span>Share</span>
            </button>
          </div>
        </section>

        {/* RELATED RESOURCES */}
        <section className="space-y-6">
          <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Academic Ecosystem</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Related 2026 Educational Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => setViewMode('directory')}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3 ${
                isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                University Directory
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300">
                Browse full profiles, admission contacts, and cut-off marks for all accredited Nigerian universities.
              </p>
            </div>

            <div
              onClick={() => setActiveTab && setActiveTab('courses')}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3 ${
                isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">auto_stories</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                Course Directory
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300">
                Explore UTME subject combinations, O’Level requirements, and career prospects across 50+ degree programs.
              </p>
            </div>

            <div
              onClick={() => setActiveTab && setActiveTab('subject-checker')}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3 ${
                isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">fact_check</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-purple-600 transition-colors">
                Admission Requirements Checker
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300">
                Verify if your 2026 WAEC/NECO grades and UTME score meet departmental cut-offs.
              </p>
            </div>

            <div
              onClick={() => setActiveTab && setActiveTab('careers')}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3 ${
                isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">explore</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-amber-800 transition-colors">
                Career Explorer
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300">
                Discover future industry opportunities, job growth forecasts, and necessary certifications.
              </p>
            </div>

            <div
              onClick={() => setActiveTab && setActiveTab('scholarships')}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3 ${
                isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#0F9D58] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                2026 Scholarships Hub
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300">
                Access federal bursaries, state grants, and private foundation scholarships for new undergraduates.
              </p>
            </div>

            <div
              onClick={() => setActiveTab && setActiveTab('study-hub')}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-lg transition-all cursor-pointer group space-y-3 ${
                isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">school</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-rose-600 transition-colors">
                Study Hub &amp; CBT Practice
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300">
                Practice past UTME questions, access JAMB syllabi, and simulate proctored CBT examinations.
              </p>
            </div>
          </div>
        </section>

        {/* 2026 ADMISSION REMINDERS */}
        <section className="space-y-6">
          <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Candidate Deadlines</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              2026 Admission Cycle Reminders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg shrink-0">
                <span className="material-symbols-outlined">event_note</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase">Aug 15, 2026</span>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Review University Requirements</h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400">
                  Ensure your O’Level result breakdown matches the target faculty’s 2026 guidelines.
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-9 h-9 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center text-lg shrink-0">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#0F9D58] uppercase">Sept 01, 2026</span>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Track Application Deadlines</h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400">
                  Federal university post-UTME forms close strictly 14 days after release.
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-lg shrink-0">
                <span className="material-symbols-outlined">laptop</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2563EB] uppercase">Sept 20, 2026</span>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Prepare Post-UTME CBT Requirements</h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400">
                  Download institutional past questions and practice speed-testing online.
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg shrink-0">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase">Oct 10, 2026</span>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Monitor CAPS Admission Updates</h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400">
                  Log in twice weekly to check for "Admission Offered" recommendations.
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-lg shrink-0">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-700 uppercase">Oct 25, 2026</span>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Verify Official Institutional Portals</h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400">
                  Cross-check all cut-off updates directly on official university website domains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Candidate Support</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Questions (2026)
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How many universities can I compare side-by-side?',
                a: 'You can compare up to 4 universities simultaneously in the interactive metric deck. Simply click "Add Institution" to swap or include new institutions from our NUC directory.'
              },
              {
                q: 'How is the match score calculated?',
                a: 'The 2026 match algorithm evaluates your preferred course, location preferences, institution type preference, UTME cut-off compatibility, and career goals to compute a percentage score.'
              },
              {
                q: 'Does a high match score guarantee university admission?',
                a: 'No. The match score is an educational simulation designed for planning purposes. Admission is subject to official JAMB UTME performance, Post-UTME screening results, and institutional departmental cut-off marks.'
              },
              {
                q: 'Where can I verify official 2026 admission requirements?',
                a: 'Always verify binding admission requirements through the official JAMB IBASS brochure portal (ibass.jamb.gov.ng) and the official website of your target university.'
              },
              {
                q: 'Can I save or print my university comparison report?',
                a: 'Yes! You can click "Download PDF Summary" or "Save Comparison" in the export bar to keep a copy of your 2026 analysis.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#0F9D58] bg-[#F8FAFC] dark:bg-slate-800/80'
                      : 'border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className={`material-symbols-outlined text-lg text-[#0F9D58] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 text-xs text-[#475569] dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION (CTA) */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F9D58] via-[#0F172A] to-[#0F9D58] text-white p-8 sm:p-14 text-center shadow-2xl border border-[#0F9D58]/40 space-y-6">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="bg-white/20 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              2026 Admission Confidence
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Find the University That Fits Your Future
            </h2>

            <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
              Compare institutions, explore your options, and make informed decisions throughout the 2026 admission cycle.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setViewMode('directory')}
                className="py-3.5 px-8 bg-white text-[#0F9D58] font-bold text-xs sm:text-sm rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
              >
                Explore University Directory
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="py-3.5 px-8 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 border border-white/20 transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL 1: ADD / SWAP UNIVERSITY TO COMPARISON DECK */}
      {showAddUniModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C2541] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
                Select Institution for 2026 Comparison
              </h3>
              <button
                onClick={() => setShowAddUniModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXTENDED_UNIS_DATA.map(uni => {
                const isSelected = comparedUniIds.includes(uni.id);
                return (
                  <div
                    key={uni.id}
                    onClick={() => {
                      toggleCompareUni(uni.id);
                      setShowAddUniModal(false);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#0F9D58] bg-[#0F9D58]/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-[#0F9D58] bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                        <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">{uni.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{uni.location}</p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isSelected ? 'bg-[#0F9D58] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {isSelected ? 'Selected' : 'Add'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PDF EXPORT SUMMARY DEMO */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C2541] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center text-3xl mx-auto">
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                2026 Comparison PDF Report Ready
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                Your comparison summary for {selectedComparedUnis.map(u => u.abbreviation).join(', ')} has been generated with official 2026 benchmarks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-left text-slate-700 dark:text-slate-300 space-y-1">
              <p>📄 <strong>Document Title:</strong> JAMB Compass 2026 University Matrix Report</p>
              <p>🗓️ <strong>Cycle Date:</strong> 2026 Academic Session</p>
              <p>🏛️ <strong>Selected Institutions:</strong> {selectedComparedUnis.length} Universities</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowExportModal(false);
                  triggerToast('📥 Downloading JAMB_Compass_2026_Comparison.pdf');
                }}
                className="flex-1 py-3 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all"
              >
                Download PDF Now
              </button>

              <button
                onClick={() => setShowExportModal(false)}
                className="py-3 px-6 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm rounded-2xl hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
