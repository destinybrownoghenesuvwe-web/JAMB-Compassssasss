import React, { useState, useEffect } from 'react';
import { University, Course, TabType } from '../types';
import { UNIVERSITIES_DATA, COURSES_DATA } from '../data/mockData';

interface UniversityDetailsScreenProps {
  university?: University | null;
  setActiveTab: (tab: TabType) => void;
  onSelectUniversity?: (univ: University) => void;
  onSelectCourse?: (course: Course) => void;
}

export const UniversityDetailsScreen: React.FC<UniversityDetailsScreenProps> = ({
  university,
  setActiveTab,
  onSelectUniversity,
  onSelectCourse,
}) => {
  // Fallback to UNILAG if no university is passed
  const currentUniv: University = university || UNIVERSITIES_DATA[0];

  // Interactive states
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [aboutReadMore, setAboutReadMore] = useState(false);
  const [searchCourseQuery, setSearchCourseQuery] = useState('');
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState('All');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);
  const [scholarshipModal, setScholarshipModal] = useState<any | null>(null);
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSaveCourse = (courseId: string) => {
    if (savedCourses.includes(courseId)) {
      setSavedCourses(savedCourses.filter(id => id !== courseId));
      showToast('Course removed from saved list');
    } else {
      setSavedCourses([...savedCourses, courseId]);
      showToast('Course saved successfully!');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      showToast('University details link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2500);
    } else {
      showToast('Sharing link prepared');
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    showToast(!isBookmarked ? `${currentUniv.name} bookmarked!` : 'Removed from bookmarks');
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Faculty list data
  const faculties = [
    { name: 'Faculty of Medicine', depts: 8, icon: 'medical_services', category: 'Medical', desc: 'Home to the College of Medicine and Lagos University Teaching Hospital (LUTH).' },
    { name: 'Faculty of Engineering', depts: 7, icon: 'engineering', category: 'Engineering', desc: 'Pioneering mechanical, electrical, civil, and petroleum engineering innovations.' },
    { name: 'Faculty of Science', depts: 11, icon: 'biotech', category: 'Science', desc: 'Leading academic studies in computer science, biochemistry, and microbiology.' },
    { name: 'Faculty of Law', depts: 5, icon: 'gavel', category: 'Law', desc: 'One of Africa’s premier law faculties producing elite legal advocates and judges.' },
    { name: 'Faculty of Education', depts: 9, icon: 'menu_book', category: 'Arts', desc: 'Training future academic scholars, educational managers, and counselors.' },
    { name: 'Faculty of Social Sciences', depts: 6, icon: 'groups', category: 'Business', desc: 'Focused on economics, political science, sociology, and mass communication.' },
    { name: 'Faculty of Management Sciences', depts: 6, icon: 'payments', category: 'Business', desc: 'Shaping future business executives in accounting, finance, and marketing.' },
    { name: 'Faculty of Arts', depts: 8, icon: 'palette', category: 'Arts', desc: 'Celebrating literature, European & African languages, philosophy, and history.' },
    { name: 'Faculty of Agriculture', depts: 5, icon: 'eco', category: 'Science', desc: 'Pioneering sustainable agritech, food security, and crop science research.' },
    { name: 'Faculty of Environmental Sciences', depts: 5, icon: 'architecture', category: 'Engineering', desc: 'Specialized training in architecture, urban planning, and estate management.' },
  ];

  // Campus Facilities data
  const campusFacilities = [
    {
      title: 'Main University Library',
      desc: 'Multi-story ultra-modern central library holding over 500,000 volumes, e-learning labs, and 24/7 quiet study hubs.',
      icon: 'local_library',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Teaching Hospital (LUTH)',
      desc: 'Premier medical referral hospital with specialized clinical units, ICU facilities, and advanced diagnostic laboratories.',
      icon: 'local_hospital',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Science & Robotics Labs',
      desc: 'High-tech research centers equipped with modern biotechnology tools, AI servers, and industrial testing machinery.',
      icon: 'biotech',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hostels & Halls of Residence',
      desc: 'Secured on-campus student halls (Moremi, Jaja, Mariere, Eni Njoku) featuring high-speed Wi-Fi and student lounges.',
      icon: 'hotel',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Olympic Sports Complex',
      desc: 'Standard running track, football stadium, indoor basketball arena, lawn tennis courts, and swimming pool.',
      icon: 'sports_soccer',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'ICT & Innovation Hub',
      desc: 'High-speed internet centers, coding bootcamps, student tech startup incubators, and 1,000-seat CBT exam halls.',
      icon: 'computer',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Campus Life Activities
  const campusLifeItems = [
    {
      title: 'Student Organisations',
      desc: 'Over 100 active clubs, departmental societies, ROTARACT, debate societies, and tech communities (GDSC, IEEE).',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      tag: 'Clubs & Societies',
    },
    {
      title: 'Sports & Varsity Games',
      desc: 'Annual Vice-Chancellor’s Cup, inter-hall tournaments, NUGA games participation, and athletics training.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      tag: 'Athletics',
    },
    {
      title: 'Accommodation & Hall Life',
      desc: 'Vibrant hall week carnivals, cultural night performances, inter-hall debates, and lifelong friendships.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      tag: 'Campus Housing',
    },
    {
      title: 'Annual Cultural Events',
      desc: 'Unilag Innovation Week, International Cultural Fair, TEDx events, and musical concerts on the Lagoon front.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      tag: 'Arts & Culture',
    },
    {
      title: 'Student Parliament & Leadership',
      desc: 'Active Student Union Government (SUG), parliamentary debates, hall executive councils, and civic leadership summits.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      tag: 'Leadership',
    },
    {
      title: 'Community Outreach',
      desc: 'Student-led medical outreach drives, rural literacy campaigns, beach cleanups, and youth mentorship.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
      tag: 'Volunteering',
    },
  ];

  // Scholarships data
  const scholarships = [
    {
      id: 'merit',
      title: 'University Merit Scholarship',
      type: 'Academic Excellence',
      eligibility: 'Awarded to top 1% academic performers in each faculty maintaining CGPA ≥ 4.50.',
      period: 'Annual Application (October - November)',
      coverage: 'Full tuition waiver + ₦150,000 annual book allowance',
      details: 'Candidates must have completed 100-Level at the university. Selection is purely merit-based determined by official senate academic results.',
    },
    {
      id: 'needs',
      title: 'Indigent Student Support Fund',
      type: 'Needs-Based Aid',
      eligibility: 'Undergraduate students facing documented financial distress with CGPA ≥ 3.00.',
      period: 'Rolling Application throughout academic session',
      coverage: 'Tuition support grant up to 80% + hostel fee assistance',
      details: 'Requires verification by the Dean of Student Affairs and submission of financial hardship documentation.',
    },
    {
      id: 'gov',
      title: 'Federal & State Government Bursary',
      type: 'Government Grant',
      eligibility: 'Indigenes of Lagos State and Federal Government Scholarship awardees.',
      period: 'Opens January every year',
      coverage: '₦100,000 - ₦250,000 annual education grant',
      details: 'Supported by the Lagos State Scholarship Board and Federal Ministry of Education for qualified undergraduate scholars.',
    },
    {
      id: 'corporate',
      title: 'Private Foundation & STEM Grants',
      type: 'Corporate Partnership',
      eligibility: 'Undergraduates in STEM, Law, and Medicine (MTN, NLNG, Shell, Chevron).',
      period: 'May - August (Annually)',
      coverage: '₦200,000 - ₦500,000 per academic year until graduation',
      details: 'High-value corporate scholarships awarded through competitive aptitude tests and academic record evaluation.',
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'Does this university conduct Post-UTME screening?',
      a: 'Yes. The university conducts a mandatory Computer-Based Test (CBT) Post-UTME screening for all candidates who selected the institution as their First Choice in JAMB and scored at least 200 in UTME.',
    },
    {
      q: 'What are the general cut-off marks for admission?',
      a: 'The general minimum UTME cut-off mark is 200. However, competitive programs like Medicine & Surgery (280+), Law (270+), Computer Science (250+), and Mechanical Engineering (260+) require significantly higher scores.',
    },
    {
      q: 'What courses are available at this university?',
      a: `The university offers over 85 accredited undergraduate degree programs across 12 faculties including Medicine, Engineering, Law, Computer Science, Pharmacy, Mass Communication, and Business Administration.`,
    },
    {
      q: 'Does the university provide student hostel accommodation?',
      a: 'Yes, on-campus hostels are available for undergraduate students (such as Moremi, Jaja, Mariere, Kofo Ademola, and Biobaku Halls). Accommodation is allocated through an online balloting portal after fee payment.',
    },
    {
      q: 'How do I apply for admission through JAMB?',
      a: 'Register the university as your First Choice during UTME registration. When Post-UTME forms open, log on to the university admissions portal, upload your WAEC/NECO O’Level results, pay the screening fee, and write the CBT exam.',
    },
  ];

  // Student Reviews
  const reviews = [
    {
      name: 'Chidi Okonkwo',
      program: 'B.Sc. Computer Science',
      year: 'Class of 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'Studying at Unilag gave me real hands-on coding experience and connected me directly with Yaba tech startup hubs. The tech community on campus is electric!',
    },
    {
      name: 'Amina Bello',
      program: 'MBBS Medicine & Surgery',
      year: 'Class of 2024',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      comment: 'The clinical training at LUTH is top-notch in West Africa. The doctors and professors are world-class, preparing you to excel anywhere globally.',
    },
    {
      name: 'Toluwani Adebayo',
      program: 'LL.B Law',
      year: 'Class of 2026',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'The moot court sessions and Law Library resources built my confidence for advocacy. Unilag Law alumni truly dominate the Nigerian legal landscape.',
    },
  ];

  // Related Universities
  const relatedUniversities = UNIVERSITIES_DATA.filter(u => u.id !== currentUniv.id);

  // Filter courses for Section 4
  const filteredCourses = COURSES_DATA.filter(c => {
    const matchesQuery = c.name.toLowerCase().includes(searchCourseQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchCourseQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchCourseQuery.toLowerCase());
    
    if (selectedFacultyFilter === 'All') return matchesQuery;
    return matchesQuery && (c.category.toLowerCase() === selectedFacultyFilter.toLowerCase() || c.category === 'All');
  });

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
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs text-[#475569] font-medium overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab('home')} className="hover:text-[#0F9D58] transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Home</span>
          </button>
          <span className="text-[#CBD5E1]">/</span>
          <button onClick={() => setActiveTab('universities')} className="hover:text-[#0F9D58] transition-colors">
            Universities
          </button>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#0F172A] font-bold truncate">{currentUniv.name}</span>
        </div>
      </div>

      {/* LARGE HERO BANNER */}
      <section className="relative w-full bg-[#0F172A] text-white overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={currentUniv.imageUrl}
            alt={currentUniv.name}
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
        </div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-12 flex flex-col justify-end min-h-[460px]">
          {/* Top Info Bar: Logo + Name + Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2.5 shadow-2xl flex items-center justify-center border border-white/20 flex-shrink-0">
                <img
                  src={currentUniv.imageUrl}
                  alt={`${currentUniv.name} seal`}
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback to symbol if image breaks
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="material-symbols-outlined text-4xl text-[#0F9D58] hidden">school</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-[#0F9D58] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {currentUniv.type} Institution
                  </span>
                  <span className="bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    {currentUniv.accreditation || 'NUC Accredited'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                  {currentUniv.name}
                </h1>
                <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-base text-[#0F9D58]">location_on</span>
                  <span>{currentUniv.location}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[#2563EB] font-semibold">Abbr: {currentUniv.abbreviation}</span>
                </p>
              </div>
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={currentUniv.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none bg-[#0F9D58] hover:bg-[#0d8a4d] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Official Website</span>
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </a>

              <button
                onClick={handleBookmarkToggle}
                className={`flex-1 md:flex-none text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                  isBookmarked
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}>
                  bookmark
                </span>
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <button
                onClick={handleShare}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  {isCopied ? 'check' : 'share'}
                </span>
                <span>{isCopied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* QUICK STATISTICS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-sm text-[#0F9D58]">event</span>
                <span>Established</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">1962</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-sm text-[#2563EB]">account_balance</span>
                <span>Type</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">{currentUniv.type}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-sm text-purple-400">school</span>
                <span>Faculties</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">{currentUniv.facultiesCount} Colleges</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-sm text-amber-400">menu_book</span>
                <span>Courses</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">85+ Programs</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-sm text-emerald-400">place</span>
                <span>Location</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white truncate">{currentUniv.location.split(',')[0]}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-slate-300 text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-sm text-pink-400">assignment_turned_in</span>
                <span>Admission</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">UTME & DE</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SECTION NAV BUTTONS */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-20 z-40 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold text-[#475569] py-3">
          <button onClick={() => scrollToSection('sec-about')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">About</button>
          <button onClick={() => scrollToSection('sec-snapshot')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Snapshot</button>
          <button onClick={() => scrollToSection('sec-faculties')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Faculties</button>
          <button onClick={() => scrollToSection('sec-courses')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Available Courses</button>
          <button onClick={() => scrollToSection('sec-requirements')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Admission Req</button>
          <button onClick={() => scrollToSection('sec-facilities')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Facilities</button>
          <button onClick={() => scrollToSection('sec-campus-life')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Campus Life</button>
          <button onClick={() => scrollToSection('sec-location')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Location Map</button>
          <button onClick={() => scrollToSection('sec-scholarships')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Scholarships</button>
          <button onClick={() => scrollToSection('sec-faqs')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">FAQs</button>
          <button onClick={() => scrollToSection('sec-reviews')} className="hover:text-[#0F9D58] whitespace-nowrap px-2 py-1">Reviews</button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-16">

        {/* SECTION 1: ABOUT THE UNIVERSITY */}
        <section id="sec-about" className="scroll-mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Image Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] group h-[340px] sm:h-[400px]">
                <img
                  src={currentUniv.imageUrl}
                  alt={currentUniv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="bg-[#0F9D58] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Historic Campus
                  </span>
                  <h4 className="text-lg font-bold font-display">{currentUniv.name} Senate & Library Precinct</h4>
                  <p className="text-xs text-slate-200">Established in 1962 as Nigeria’s premier urban research institution.</p>
                </div>
              </div>

              {/* Gallery thumbnails */}
              {currentUniv.gallery && currentUniv.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {currentUniv.gallery.slice(0, 3).map((img, i) => (
                    <div key={i} className="h-24 rounded-xl overflow-hidden border border-[#E2E8F0] shadow-xs">
                      <img src={img} alt="Campus View" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                  Institutional Profile
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
                  About {currentUniv.name}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#475569] leading-relaxed">
                <p>
                  <strong>{currentUniv.name} ({currentUniv.abbreviation})</strong> {currentUniv.description}
                </p>
                <p>
                  Founded in 1962, the university has consistently provided world-class academic education, high-impact research, and groundbreaking technological innovations. Located in the bustling heart of Lagos State, it serves as an intellectual lighthouse for over 55,000 students across Nigeria and the international community.
                </p>

                {aboutReadMore && (
                  <div className="space-y-4 pt-2 border-t border-[#E2E8F0] animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                        <h4 className="font-bold text-[#0F172A] text-sm flex items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-[#0F9D58] text-base">visibility</span>
                          <span>Our Vision</span>
                        </h4>
                        <p className="text-xs text-[#475569]">
                          To be a top-class institution for the pursuit of excellence in knowledge, character, and service to humanity.
                        </p>
                      </div>

                      <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                        <h4 className="font-bold text-[#0F172A] text-sm flex items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-[#2563EB] text-base">flag</span>
                          <span>Our Mission</span>
                        </h4>
                        <p className="text-xs text-[#475569]">
                          To provide a conducive teaching, learning, research and development environment where staff and students solve societal problems.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#0F172A] mb-1 text-sm">Why Students Choose {currentUniv.abbreviation}:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-[#475569]">
                        <li>Ranked among top 3 universities in Nigeria by Times Higher Education & QS Rankings.</li>
                        <li>Direct proximity to Yaba tech ecosystem and Lagos commercial opportunities.</li>
                        <li>Over 85% graduate employment rate within 6 months of graduation.</li>
                        <li>Ultra-modern research labs, LUTH teaching hospital, and extensive digital library.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setAboutReadMore(!aboutReadMore)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0F9D58] hover:text-[#0d8a4d] bg-[#0F9D58]/10 hover:bg-[#0F9D58]/20 px-4 py-2.5 rounded-xl transition-all"
              >
                <span>{aboutReadMore ? 'Read Less' : 'Read Full History & Vision'}</span>
                <span className="material-symbols-outlined text-sm">
                  {aboutReadMore ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: UNIVERSITY SNAPSHOT */}
        <section id="sec-snapshot" className="scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              At A Glance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              University Snapshot
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Key institutional metrics and facts defining {currentUniv.name}.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs text-center hover:border-[#0F9D58] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F9D58] mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">event</span>
              </div>
              <p className="text-xs font-semibold text-[#475569]">Founded</p>
              <p className="text-xl font-extrabold text-[#0F172A] mt-0.5">1962</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs text-center hover:border-[#2563EB] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <p className="text-xs font-semibold text-[#475569]">Location</p>
              <p className="text-base font-extrabold text-[#0F172A] mt-0.5 truncate">{currentUniv.location.split(',')[0]}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs text-center hover:border-purple-600 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <p className="text-xs font-semibold text-[#475569]">Type</p>
              <p className="text-base font-extrabold text-[#0F172A] mt-0.5">{currentUniv.type}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs text-center hover:border-amber-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">school</span>
              </div>
              <p className="text-xs font-semibold text-[#475569]">Faculties</p>
              <p className="text-xl font-extrabold text-[#0F172A] mt-0.5">{currentUniv.facultiesCount}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs text-center hover:border-pink-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">category</span>
              </div>
              <p className="text-xs font-semibold text-[#475569]">Departments</p>
              <p className="text-xl font-extrabold text-[#0F172A] mt-0.5">80+</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs text-center hover:border-indigo-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <p className="text-xs font-semibold text-[#475569]">Students</p>
              <p className="text-base font-extrabold text-[#0F172A] mt-0.5">55,000+</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: FACULTIES */}
        <section id="sec-faculties" className="scroll-mt-36">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Academic Divisions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
                Faculties & Colleges
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Explore specialized colleges offering undergraduate degree programs.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0F9D58] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              {faculties.length} Academic Faculties Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {faculties.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:border-[#0F9D58] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F9D58] flex items-center justify-center group-hover:bg-[#0F9D58] group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">{fac.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#475569] bg-slate-100 px-2.5 py-1 rounded-lg">
                      {fac.depts} Depts
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-sm group-hover:text-[#0F9D58] transition-colors leading-snug">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-[#475569] mt-2 line-clamp-2">
                    {fac.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedFacultyFilter(fac.category);
                    scrollToSection('sec-courses');
                  }}
                  className="mt-4 w-full text-xs font-semibold text-[#0F9D58] hover:bg-[#0F9D58] hover:text-white border border-[#0F9D58]/30 py-2 rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <span>Explore Faculty</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: AVAILABLE COURSES */}
        <section id="sec-courses" className="scroll-mt-36 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Degree Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
                Available Courses
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Search undergraduate degree programs offered by {currentUniv.name}.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchCourseQuery}
                onChange={(e) => setSearchCourseQuery(e.target.value)}
                placeholder="Search courses offered by this university..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
              />
              {searchCourseQuery && (
                <button
                  onClick={() => setSearchCourseQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-[#E2E8F0]">
            {['All', 'Medical', 'Engineering', 'Tech', 'Business', 'Law', 'Science', 'Arts'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFacultyFilter(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedFacultyFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#0F9D58] text-white shadow-xs'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-slate-200 border border-[#E2E8F0]'
                }`}
              >
                {cat} Courses
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => {
                const isSaved = savedCourses.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[#0F9D58] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md uppercase">
                          {course.category}
                        </span>
                        <span className="text-[11px] font-semibold text-[#475569] flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          <span>{course.duration}</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-[#0F172A] text-base group-hover:text-[#0F9D58] transition-colors leading-snug">
                        {course.name}
                      </h3>
                      <p className="text-xs text-[#475569] mt-2 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-semibold bg-white border border-[#E2E8F0] text-[#0F172A] px-2 py-0.5 rounded">
                          UTME Cut-off: {course.cutOffMark}+
                        </span>
                        <span className="text-[10px] font-semibold bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded">
                          UTME & Direct Entry
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (onSelectCourse) {
                            onSelectCourse(course);
                          } else {
                            setActiveTab('course-details');
                          }
                        }}
                        className="flex-1 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1"
                      >
                        <span>View Course Details</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>

                      <button
                        onClick={() => toggleSaveCourse(course.id)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-white border-[#E2E8F0] text-[#475569] hover:bg-slate-100'
                        }`}
                        title={isSaved ? 'Saved' : 'Save course'}
                      >
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                          bookmark
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2E8F0]">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
              <p className="text-sm font-bold text-[#0F172A]">No courses found matching "{searchCourseQuery}"</p>
              <p className="text-xs text-[#475569] mt-1">Try searching for "Computer Science", "Medicine", or select "All".</p>
              <button
                onClick={() => {
                  setSearchCourseQuery('');
                  setSelectedFacultyFilter('All');
                }}
                className="mt-4 bg-[#0F9D58] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </section>

        {/* SECTION 5: ADMISSION REQUIREMENTS */}
        <section id="sec-requirements" className="scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Entry Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Admission Requirements
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Check key entry criteria for UTME candidates, Direct Entry applicants, and O’Level results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UTME Checklist Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined">assignment_turned_in</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg">UTME Requirements</h3>
                  <p className="text-xs text-[#475569]">Standard 100-Level Entry via JAMB</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Minimum JAMB Score of <strong>200</strong> (Competitive courses require 250–310+).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Must choose <strong>{currentUniv.name}</strong> as <strong>First Choice</strong> in JAMB portal.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Four (4) UTME subject combinations correctly aligned with WAEC/NECO prerequisite criteria.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Age requirement: Candidate must be at least 16 years old by October 31 of admission year.</span>
                </li>
              </ul>
            </div>

            {/* Direct Entry Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <span className="material-symbols-outlined">workspace_premium</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg">Direct Entry Requirements</h3>
                  <p className="text-xs text-[#475569]">200-Level Direct Admission Criteria</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Minimum of 2 A-Level passes, IJMB, or JUPEB points (minimum 9–12 points).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>ND/HND candidates must possess Upper Credit classification from recognized polytechnics.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Must satisfy standard 5 O’Level Credit requirements in WAEC/NECO in relevant subjects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Direct Entry screening registration on official university admissions portal.</span>
                </li>
              </ul>
            </div>

            {/* O'Level Requirements */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg">O'Level Requirements</h3>
                  <p className="text-xs text-[#475569]">WAEC / NECO / NABTEB Credentials</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Minimum of <strong>5 Credit Passes</strong> in relevant subjects in WAEC/NECO/NABTEB.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span><strong>English Language and Mathematics</strong> are compulsory for all degree choices.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Results must be obtained in not more than <strong>ONE (1) Sitting</strong> for competitive courses like Medicine and Law.</span>
                </li>
              </ul>
            </div>

            {/* Post-UTME Information */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">quiz</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg">Post-UTME Information</h3>
                  <p className="text-xs text-[#475569]">CBT Examination & Aggregate Calculation</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Format: Computer-Based Test (CBT) covering Mathematics, English & General Paper.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>Final Admission Aggregate Weighting Formula: <strong>50% UTME + 30% Post-UTME + 20% O'Level</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span>O’Level results must be uploaded on JAMB CAPS portal before physical screening.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Note Disclaimer */}
          <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-900 text-xs sm:text-sm font-medium">
            <span className="material-symbols-outlined text-amber-600 text-xl flex-shrink-0">info</span>
            <p>
              <strong>Important Note:</strong> Admission requirements may change. Always verify the latest official information directly from the university portal and JAMB brochure.
            </p>
          </div>
        </section>

        {/* SECTION 6: CAMPUS FACILITIES */}
        <section id="sec-facilities" className="scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Campus Facilities
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              State-of-the-art facilities designed to support study, health, sports, and research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusFacilities.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-lg transition-all group"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="font-bold text-sm font-display flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#0F9D58]">{fac.icon}</span>
                      <span>{fac.title}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: CAMPUS LIFE */}
        <section id="sec-campus-life" className="scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Student Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Campus Life & Culture
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Experience the vibrant student community, leadership, sports, and cultural traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusLifeItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0F172A] text-base group-hover:text-[#0F9D58] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: LOCATION MAP */}
        <section id="sec-location" className="scroll-mt-36 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                  Geographic Location
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
                  University Location & Travel
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                  Located in the vibrant urban district of Akoka, Yaba, {currentUniv.name} overlooks the scenic Lagos Lagoon.
                </p>

                <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F9D58] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base">pin_drop</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">Main Campus Address</p>
                      <p className="text-[#475569] text-xs">{currentUniv.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base">near_me</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">Nearby Landmarks</p>
                      <p className="text-[#475569] text-xs">Third Mainland Bridge • Yaba Tech • Lagoon Waterfront</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base">directions_bus</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">Transportation Access</p>
                      <p className="text-[#475569] text-xs">Yaba BRT Terminal, Commercial Buses & Lagos Ferry</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDirectionsModalOpen(true)}
                className="w-full bg-[#0F9D58] hover:bg-[#0d8a4d] text-white text-xs sm:text-sm font-bold py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span className="material-symbols-outlined text-base">directions</span>
                <span>Get Directions & Transit Route</span>
              </button>
            </div>

            {/* Nigeria / Campus Map Visualizer */}
            <div className="lg:col-span-7 bg-[#0F172A] relative min-h-[350px] flex items-center justify-center p-6 text-white overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Lagos Map View"
                className="absolute inset-0 w-full h-full object-cover opacity-25 filter grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/70"></div>

              {/* Map pin card */}
              <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-sm text-center shadow-2xl space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#0F9D58] text-white mx-auto flex items-center justify-center shadow-lg animate-pulse">
                  <span className="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base font-display">{currentUniv.name}</h4>
                  <p className="text-xs text-slate-300 mt-1">{currentUniv.location}</p>
                  <p className="text-[11px] text-[#0F9D58] font-semibold mt-2">Coordinates: 6.5158° N, 3.3898° E</p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(currentUniv.name + ' ' + currentUniv.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-600 px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  <span>Open in Google Maps</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: SCHOLARSHIPS & FINANCIAL AID */}
        <section id="sec-scholarships" className="scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Financial Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Scholarships & Financial Aid
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Explore bursaries, merit grants, and corporate funding available to students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((sch) => (
              <div
                key={sch.id}
                className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#0F9D58] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md uppercase">
                      {sch.type}
                    </span>
                    <span className="text-xs text-[#475569] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">calendar_month</span>
                      <span>{sch.period}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0F172A] text-lg group-hover:text-[#0F9D58] transition-colors">
                    {sch.title}
                  </h3>
                  <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                    {sch.eligibility}
                  </p>

                  <div className="mt-4 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
                    <span className="text-[#0F9D58] font-bold block mb-0.5">Financial Coverage:</span>
                    <span>{sch.coverage}</span>
                  </div>
                </div>

                <button
                  onClick={() => setScholarshipModal(sch)}
                  className="mt-5 w-full bg-[#F8FAFC] hover:bg-[#0F9D58] hover:text-white text-[#0F172A] text-xs font-bold border border-[#E2E8F0] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
                >
                  <span>Learn More & Eligibility</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: RELATED UNIVERSITIES */}
        <section id="sec-related" className="scroll-mt-36">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                Explore Alternatives
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
                Related Universities
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1">
                Compare {currentUniv.name} with top peer institutions in Nigeria.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('universities')}
              className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
            >
              <span>View All Universities</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedUniversities.slice(0, 3).map((univ) => (
              <div
                key={univ.id}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-40 relative overflow-hidden">
                    <img
                      src={univ.imageUrl}
                      alt={univ.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#0F9D58] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {univ.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-[#0F172A] text-base group-hover:text-[#0F9D58] transition-colors leading-snug">
                      {univ.name}
                    </h3>
                    <p className="text-xs text-[#475569] mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#0F9D58]">location_on</span>
                      <span>{univ.location}</span>
                    </p>
                    <p className="text-xs text-[#475569] mt-2 line-clamp-2">
                      {univ.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      if (onSelectUniversity) {
                        onSelectUniversity(univ);
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-[#0F9D58] hover:bg-[#0d8a4d] text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
                  >
                    <span>View University Profile</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 11: STUDENT RESOURCES */}
        <section id="sec-resources" className="scroll-mt-36 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Helpful Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Student Navigation Resources
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Access essential guidance tools to streamline your JAMB admission process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#0F9D58] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm">JAMB Admission Guide</h3>
              </div>
              <p className="text-xs text-[#475569] mb-4">
                Step-by-step roadmap for post-UTME registration, JAMB CAPS acceptance, and physical screening.
              </p>
              <button
                onClick={() => setActiveTab('guide')}
                className="w-full text-xs font-bold text-[#0F9D58] bg-white border border-[#E2E8F0] py-2 rounded-xl hover:bg-[#0F9D58] hover:text-white transition-all"
              >
                Open Admission Guide
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-[#2563EB] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm">Course Directory</h3>
              </div>
              <p className="text-xs text-[#475569] mb-4">
                Full list of undergraduate programs with 5-year historical cut-off marks and requirements.
              </p>
              <button
                onClick={() => setActiveTab('courses')}
                className="w-full text-xs font-bold text-[#2563EB] bg-white border border-[#E2E8F0] py-2 rounded-xl hover:bg-[#2563EB] hover:text-white transition-all"
              >
                Open Course Directory
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between hover:border-purple-600 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">rule</span>
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm">Subject Combination Checker</h3>
              </div>
              <p className="text-xs text-[#475569] mb-4">
                Verify that your 4 JAMB subjects and 5 WAEC/NECO credits match your course requirements.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full text-xs font-bold text-purple-600 bg-white border border-[#E2E8F0] py-2 rounded-xl hover:bg-purple-600 hover:text-white transition-all"
              >
                Check Subject Combinations
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
        <section id="sec-faqs" className="scroll-mt-36 max-w-3xl mx-auto w-full">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Find answers to common questions about {currentUniv.name} admissions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-[#0F172A] text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[#0F9D58] flex-shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 13: STUDENT REVIEWS */}
        <section id="sec-reviews" className="scroll-mt-36">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Student Perspectives
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Student Reviews & Testimonials
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Hear directly from current undergraduates and recent alumni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#0F9D58] transition-all"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#E2E8F0]">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                  />
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm">{rev.name}</h4>
                    <p className="text-[11px] text-[#475569]">{rev.program} • {rev.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer note */}
          <p className="text-center text-[11px] text-slate-400 mt-4 italic">
            Note: Student reviews shown above are verified sample student testimonials compiled for demonstration purposes.
          </p>
        </section>

        {/* SECTION 14: CALL TO ACTION */}
        <section id="sec-cta" className="scroll-mt-36">
          <div className="bg-gradient-to-r from-[#0F9D58] via-[#0D8A4D] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                Begin Your Application
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Ready to Study Here?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Explore available courses, understand the admission process, and take the next step toward your academic future at {currentUniv.name}.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <button
                  onClick={() => scrollToSection('sec-courses')}
                  className="bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2"
                >
                  <span>View Courses</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>

                <button
                  onClick={() => setActiveTab('guide')}
                  className="bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm border-2 border-white/40 px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  <span>Start My Admission Journey</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL: GET DIRECTIONS & TRANSIT ROUTES */}
      {isDirectionsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E2E8F0] p-6 space-y-5 relative">
            <button
              onClick={() => setIsDirectionsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
                <span className="material-symbols-outlined">directions</span>
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg">Transit Directions to {currentUniv.abbreviation}</h3>
                <p className="text-xs text-[#475569]">Major transport hubs in Lagos to Akoka Campus</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#475569]">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="font-bold text-[#0F172A] mb-1">From Ikeja / Maryland:</p>
                <p>Board a bus heading to Yaba. At Yaba Bus Stop, board an Akoka / Unilag campus shuttle bus straight to the university main gate.</p>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="font-bold text-[#0F172A] mb-1">From Oshodi / Mile 2 / Ojota:</p>
                <p>Take a BRT bus to Fadeyi or Jibowu stop. Take a taxi/tricycle (Keke) to Yaba or Akoka directly.</p>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="font-bold text-[#0F172A] mb-1">From Victoria Island / Lekki:</p>
                <p>Take Third Mainland Bridge exit towards Yaba / Ebute Metta, follow Herbert Macaulay Way to St. Agnes, then proceed down Commercial Avenue to Akoka.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsDirectionsModalOpen(false)}
                className="bg-[#0F9D58] text-white text-xs font-bold px-5 py-2.5 rounded-xl"
              >
                Close Transit Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SCHOLARSHIP DETAILS */}
      {scholarshipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E2E8F0] p-6 space-y-4 relative">
            <button
              onClick={() => setScholarshipModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#0F9D58] uppercase">{scholarshipModal.type}</span>
                <h3 className="font-bold text-[#0F172A] text-lg leading-tight">{scholarshipModal.title}</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#475569]">
              <div>
                <h4 className="font-bold text-[#0F172A] mb-1">Financial Award Coverage:</h4>
                <p className="p-2.5 bg-emerald-50 text-[#0F9D58] font-semibold rounded-lg border border-emerald-200">
                  {scholarshipModal.coverage}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] mb-1">Eligibility Criteria:</h4>
                <p className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  {scholarshipModal.eligibility}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] mb-1">Application Period & Guidelines:</h4>
                <p className="p-2.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  {scholarshipModal.details}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setScholarshipModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold px-4 py-2.5 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setScholarshipModal(null);
                  showToast('Scholarship application portal link copied!');
                }}
                className="bg-[#0F9D58] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs"
              >
                Apply for Scholarship
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
