import React, { useState } from 'react';
import { TabType, Course, University, NewsArticle } from '../types';
import { ResultsAnalyticsScreen } from './ResultsAnalyticsScreen';

interface StudentDashboardProps {
  setActiveTab: (tab: TabType) => void;
  onSelectCourse?: (course: Course) => void;
  onSelectUniversity?: (univ: University) => void;
  onSelectArticle?: (article: NewsArticle) => void;
  onLogout?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  setActiveTab,
  onSelectCourse,
  onSelectUniversity,
  onSelectArticle,
  onLogout,
}) => {
  // Sidebar active view
  const [activeSidebarNav, setActiveSidebarNav] = useState<string>('dashboard');
  
  // Interactive tasks state
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Register for Mock Exam', completed: true },
    { id: '2', text: 'Download 2026 JAMB Syllabus', completed: true },
    { id: '3', text: 'Practise Mathematics Past Questions', completed: false },
    { id: '4', text: 'Review Subject Combination for Medicine', completed: false },
    { id: '5', text: 'Check Latest Admission News', completed: false },
  ]);

  // Study plan state
  const [studyPlan, setStudyPlan] = useState([
    { id: 'math', subject: 'Mathematics', topic: 'Algebra & Quadratic Equations', status: 'Completed', progress: 100, color: 'text-[#0F9D58] bg-[#0F9D58]/10' },
    { id: 'eng', subject: 'English Language', topic: 'Oral Forms & Concord', status: 'In Progress', progress: 65, color: 'text-[#2563EB] bg-[#2563EB]/10' },
    { id: 'phy', subject: 'Physics', topic: 'Heat & Thermodynamics', status: 'Pending', progress: 20, color: 'text-[#D97706] bg-[#F59E0B]/10' },
    { id: 'chem', subject: 'Chemistry', topic: 'Organic Chemistry Reactions', status: 'Pending', progress: 0, color: 'text-[#475569] bg-[#E2E8F0]' },
    { id: 'bio', subject: 'Biology', topic: 'Cell Structure & Genetics', status: 'Pending', progress: 0, color: 'text-[#475569] bg-[#E2E8F0]' },
  ]);

  // Notifications toggle modal state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Subject checker modal state
  const [showSubjectChecker, setShowSubjectChecker] = useState(false);
  const [checkerCourse, setCheckerCourse] = useState('Medicine & Surgery');
  const [checkerResult, setCheckerResult] = useState<{
    subjects: string[];
    oLevel: string[];
    valid: boolean;
  } | null>(null);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleStudyPlanStatus = (id: string) => {
    setStudyPlan(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.status === 'Completed') {
            return { ...item, status: 'In Progress', progress: 50, color: 'text-[#2563EB] bg-[#2563EB]/10' };
          } else if (item.status === 'In Progress') {
            return { ...item, status: 'Completed', progress: 100, color: 'text-[#0F9D58] bg-[#0F9D58]/10' };
          } else {
            return { ...item, status: 'In Progress', progress: 50, color: 'text-[#2563EB] bg-[#2563EB]/10' };
          }
        }
        return item;
      })
    );
  };

  const handleSubjectCheck = (courseName: string) => {
    if (courseName.toLowerCase().includes('medicine')) {
      setCheckerResult({
        subjects: ['Use of English', 'Biology', 'Chemistry', 'Physics'],
        oLevel: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
        valid: true,
      });
    } else if (courseName.toLowerCase().includes('computer') || courseName.toLowerCase().includes('engineering')) {
      setCheckerResult({
        subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
        oLevel: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Further Maths / Biology'],
        valid: true,
      });
    } else if (courseName.toLowerCase().includes('law')) {
      setCheckerResult({
        subjects: ['Use of English', 'Literature in English', 'CRK / IRK', 'Government / History'],
        oLevel: ['English Language', 'Mathematics', 'Literature in English', 'Government', 'CRS/IRS'],
        valid: true,
      });
    } else {
      setCheckerResult({
        subjects: ['Use of English', 'Mathematics', 'Economics', 'Government'],
        oLevel: ['English Language', 'Mathematics', 'Economics', 'Commerce', 'Accounting'],
        valid: true,
      });
    }
  };

  // Mock data for recommendations
  const recommendedCourses: Course[] = [
    {
      id: 'med-1',
      name: 'Medicine & Surgery',
      category: 'Medical',
      tag: 'High Competition',
      tagBg: 'bg-rose-100',
      tagText: 'text-rose-700',
      description: 'A 6-year professional degree leading to MBBS qualification in clinical and surgical practice.',
      applicants: '185,000+',
      utmeSubjects: ['English', 'Biology', 'Chemistry', 'Physics'],
      oLevelRequirements: '5 Credits in English, Maths, Biology, Chemistry, Physics',
      cutOffMark: 280,
      duration: '6 Years',
      careerProspects: ['Medical Doctor', 'Surgeon', 'Clinical Researcher'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      popular: true,
    },
    {
      id: 'cs-2',
      name: 'Computer Science',
      category: 'Tech',
      tag: 'In High Demand',
      tagBg: 'bg-[#2563EB]/10',
      tagText: 'text-[#2563EB]',
      description: 'Software development, artificial intelligence, algorithms, cloud computing, and cyber security.',
      applicants: '140,000+',
      utmeSubjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
      oLevelRequirements: '5 Credits in English, Maths, Physics, Chemistry, +1 science',
      cutOffMark: 250,
      duration: '4 Years',
      careerProspects: ['Software Engineer', 'Data Scientist', 'AI Specialist'],
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      popular: true,
    },
    {
      id: 'law-3',
      name: 'Law (LL.B)',
      category: 'Law',
      tag: 'Prestigious',
      tagBg: 'bg-purple-100',
      tagText: 'text-purple-700',
      description: 'Comprehensive legal education covering Constitutional, Criminal, Commercial, and International Law.',
      applicants: '110,000+',
      utmeSubjects: ['English', 'Literature', 'Government', 'CRS/IRS'],
      oLevelRequirements: '5 Credits in English, Maths, Literature, Government, +1 art',
      cutOffMark: 270,
      duration: '5 Years',
      careerProspects: ['Barrister', 'Corporate Attorney', 'Magistrate'],
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      popular: true,
    },
    {
      id: 'nurs-4',
      name: 'Nursing Science',
      category: 'Medical',
      tag: 'Rapid Growth',
      tagBg: 'bg-[#0F9D58]/10',
      tagText: 'text-[#0F9D58]',
      description: 'Professional healthcare program combining clinical nursing care, anatomy, and public health.',
      applicants: '95,000+',
      utmeSubjects: ['English', 'Biology', 'Chemistry', 'Physics'],
      oLevelRequirements: '5 Credits in English, Maths, Biology, Chemistry, Physics',
      cutOffMark: 240,
      duration: '5 Years',
      careerProspects: ['Registered Nurse', 'Nurse Practitioner', 'Healthcare Administrator'],
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      popular: false,
    },
    {
      id: 'acc-5',
      name: 'Accounting',
      category: 'Business',
      tag: 'ICAN Track',
      tagBg: 'bg-amber-100',
      tagText: 'text-amber-800',
      description: 'Financial accounting, auditing, taxation, corporate finance, and forensic accounting.',
      applicants: '88,000+',
      utmeSubjects: ['English', 'Mathematics', 'Economics', 'Government'],
      oLevelRequirements: '5 Credits in English, Maths, Economics, +2 social science',
      cutOffMark: 230,
      duration: '4 Years',
      careerProspects: ['Chartered Accountant', 'Financial Analyst', 'Auditor'],
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      popular: false,
    },
    {
      id: 'mech-6',
      name: 'Mechanical Engineering',
      category: 'Engineering',
      tag: 'COREN Accredited',
      tagBg: 'bg-sky-100',
      tagText: 'text-sky-800',
      description: 'Thermodynamics, robotics, automotive design, manufacturing systems, and mechanics.',
      applicants: '75,000+',
      utmeSubjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
      oLevelRequirements: '5 Credits in English, Maths, Physics, Chemistry, Further Maths',
      cutOffMark: 245,
      duration: '5 Years',
      careerProspects: ['Mechanical Engineer', 'Automotive Specialist', 'Energy Consultant'],
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      popular: false,
    },
  ];

  const recommendedUnivs: University[] = [
    {
      id: 'unilag',
      name: 'University of Lagos',
      type: 'Federal',
      location: 'Akoka, Lagos State',
      abbreviation: 'UNILAG',
      description: 'The University of First Choice and the Nation’s Pride, premier federal research university in Lagos.',
      cutOffMark: 200,
      facultiesCount: 12,
      tuitionRange: '₦55,000 - ₦100,000',
      accommodation: 'Available (Hostel balloting)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr-mcmEA5N_gO-2neMLoVyEKIvb5w8z20kRsDVjWKzU4B7xTrCWmZwgb49szo4TmkA6Et1Y_QksmhYZ-Bj9N_itBM82RcGWKNHAHo0bzVNbd3B8dW_lYKQGYSnjl7lcvD4zQ7T8xnQ--SJ7_9mh33gU0NexXR8S5-SaapFbY-rHrfx7PkYVfZN4bF0T8QYPz1WORQsuahYL-yrpipEPpc7Xcqu4Atj3nT6qEdufZPPKBJzLrKXiZd3doE_yJDD3YkS4BbmqOnrznAx',
      website: 'https://unilag.edu.ng',
      accreditation: 'NUC Fully Accredited',
      featured: true,
      gallery: [],
      requirements: {
        generalCutOff: 200,
        medicineCutOff: 280,
        lawCutOff: 270,
        engineeringCutOff: 250,
        postUtmeRequired: true,
        postUtmeFormat: 'Online CBT screening (30 Questions)',
      },
    },
    {
      id: 'uniport',
      name: 'University of Port Harcourt',
      type: 'Federal',
      location: 'Port Harcourt, Rivers State',
      abbreviation: 'UNIPORT',
      description: 'Leading federal university renowned for Petroleum Engineering and Medical Sciences.',
      cutOffMark: 180,
      facultiesCount: 14,
      tuitionRange: '₦45,000 - ₦85,000',
      accommodation: 'Hostels available',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      website: 'https://uniport.edu.ng',
      accreditation: 'NUC Fully Accredited',
      featured: true,
      gallery: [],
      requirements: {
        generalCutOff: 180,
        medicineCutOff: 275,
        engineeringCutOff: 240,
        postUtmeRequired: true,
        postUtmeFormat: 'CBT Screening Exam',
      },
    },
    {
      id: 'unn',
      name: 'University of Nigeria, Nsukka',
      type: 'Federal',
      location: 'Nsukka, Enugu State',
      abbreviation: 'UNN',
      description: 'Restoring the dignity of man since 1960. Historic university in Eastern Nigeria.',
      cutOffMark: 180,
      facultiesCount: 15,
      tuitionRange: '₦60,000 - ₦90,000',
      accommodation: 'Campus hostels',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      website: 'https://unn.edu.ng',
      accreditation: 'NUC Fully Accredited',
      featured: true,
      gallery: [],
      requirements: {
        generalCutOff: 180,
        medicineCutOff: 282,
        lawCutOff: 275,
        postUtmeRequired: true,
        postUtmeFormat: 'Computer Based Screening',
      },
    },
  ];

  const newsCards: NewsArticle[] = [
    {
      id: 'news-1',
      category: 'Official Notice',
      title: 'JAMB Registration Updates for 2026 UTME Candidates',
      excerpt: 'The Joint Admissions and Matriculation Board announces mandatory NIN profile code generation and nationwide CBT centre list.',
      fullContent: ['The Joint Admissions and Matriculation Board (JAMB) has officially commenced registration.'],
      date: 'April 2026',
      readTime: '3 min read',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
      featured: true,
      author: 'JAMB Public Affairs',
    },
    {
      id: 'news-2',
      category: 'Admission CAPS',
      title: 'New Admission Guidelines Released by Ministry of Education',
      excerpt: 'Central Admissions Processing System (CAPS) updates regulations regarding O’Level verification and catchment quota distribution.',
      fullContent: ['The Federal Ministry of Education has released updated admission guidelines.'],
      date: 'April 2026',
      readTime: '4 min read',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      featured: false,
      author: 'Edu Policy Team',
    },
    {
      id: 'news-3',
      category: 'University Rankings',
      title: 'Top Universities for Computer Science in Nigeria 2026',
      excerpt: 'Comprehensive analysis of curriculum, lab infrastructure, cut-off benchmarks, and graduate employability rates.',
      fullContent: ['Computer Science remains one of the most competitive courses in Nigerian tertiary institutions.'],
      date: 'March 2026',
      readTime: '5 min read',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      featured: false,
      author: 'JAMB Compass Research',
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      
      {/* TOP COMPACT DASHBOARD HEADER & PROFILE BAR */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Mobile Menu & Logo Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-9 h-9 rounded-xl bg-[#0F9D58] flex items-center justify-center text-white font-bold shadow-sm">
                <span className="material-symbols-outlined text-xl">explore</span>
              </div>
              <span className="font-bold font-display text-lg text-[#0F172A] hidden sm:inline-block">
                JAMB Compass
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] hidden md:inline-block">
              Student Portal
            </span>
          </div>

          {/* Search bar & Top Right Profile / Notifications */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-end">
            
            {/* Search Input */}
            <div className="relative max-w-xs w-full hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search courses, universities, past questions..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#0F9D58] focus:bg-white transition-all"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors relative"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-4 z-50 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <span className="font-bold text-xs text-[#0F172A] font-display">Notifications</span>
                    <span className="text-[10px] text-[#0F9D58] font-bold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="space-y-3 pt-3">
                    <div className="flex gap-3 text-xs p-2 rounded-lg bg-[#E8F5E9]/50">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base">verified</span>
                      <div>
                        <p className="font-semibold text-[#0F172A]">Mock Exam Date Announced</p>
                        <p className="text-[11px] text-[#475569]">Optional CBT mock takes place next Saturday.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs p-2 rounded-lg bg-[#EFF6FF]">
                      <span className="material-symbols-outlined text-[#2563EB] text-base">menu_book</span>
                      <div>
                        <p className="font-semibold text-[#0F172A]">Physics Syllabus Updated</p>
                        <p className="text-[11px] text-[#475569]">Heat & Thermodynamics breakdown added.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Messages Icon */}
            <button
              onClick={() => setActiveTab('study-hub')}
              className="p-2 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors relative"
              title="Study Discussions"
            >
              <span className="material-symbols-outlined text-xl">forum</span>
            </button>

            {/* User Profile Avatar & Name */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-[#E2E8F0]"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0F9D58] to-[#2563EB] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  D
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">Destiny O.</p>
                  <p className="text-[10px] text-[#0F9D58] font-semibold">Science Track</p>
                </div>
                <span className="material-symbols-outlined text-xs text-[#475569]">expand_more</span>
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50">
                  <div className="px-3 py-2 border-b border-[#E2E8F0]">
                    <p className="text-xs font-bold text-[#0F172A]">Destiny O.</p>
                    <p className="text-[11px] text-[#475569] truncate">destiny@example.com</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setActiveSidebarNav('settings');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg flex items-center gap-2 mt-1"
                  >
                    <span className="material-symbols-outlined text-sm">settings</span>
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onLogout) onLogout();
                      setActiveTab('home');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* DASHBOARD BODY WITH SIDEBAR & MAIN LAYOUT */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row flex-1 min-w-0">
        
        {/* LEFT SIDEBAR NAVIGATION (Desktop Sticky & Mobile Horizontal) */}
        <aside className="w-64 bg-white border-r border-[#E2E8F0] p-4 hidden lg:flex flex-col justify-between sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-6">
            
            {/* Nav Group 1 */}
            <div>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider px-3 mb-2 font-display">
                Main Portal
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSidebarNav('dashboard')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'dashboard'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">dashboard</span>
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('journey');
                    setActiveTab('guide');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'journey'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">alt_route</span>
                  My Journey
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('courses');
                    setActiveTab('courses');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'courses'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">menu_book</span>
                  Courses
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('universities');
                    setActiveTab('universities');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'universities'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">account_balance</span>
                  Universities
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('study-hub');
                    setActiveTab('study-hub');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'study-hub'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">school</span>
                  Study Hub
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('cbt');
                    setActiveTab('study-hub');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'cbt'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">laptop_chromebook</span>
                  CBT Practice
                </button>
              </nav>
            </div>

            {/* Nav Group 2 */}
            <div>
              <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider px-3 mb-2 font-display">
                Personal Saved
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSidebarNav('saved')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'saved'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">bookmark</span>
                  Saved Items (5)
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('scholarships');
                    setActiveTab('admission');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'scholarships'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">payments</span>
                  Scholarships
                </button>

                <button
                  onClick={() => {
                    setActiveSidebarNav('news');
                    setActiveTab('news');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeSidebarNav === 'news'
                      ? 'bg-[#0F9D58] text-white shadow-md font-bold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">newspaper</span>
                  Latest News
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Settings / Logout */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-1">
            <button
              onClick={() => setActiveSidebarNav('settings')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </button>

            <button
              onClick={() => {
                if (onLogout) onLogout();
                setActiveTab('home');
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Logout
            </button>
          </div>
        </aside>

        {/* MOBILE HORIZONTAL NAVIGATION TABS */}
        <div className="lg:hidden w-full bg-white border-b border-[#E2E8F0] px-4 py-2 flex overflow-x-auto no-scrollbar gap-2 sticky top-16 z-30">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'guide', label: 'Journey', icon: 'alt_route' },
            { id: 'courses', label: 'Courses', icon: 'menu_book' },
            { id: 'universities', label: 'Universities', icon: 'account_balance' },
            { id: 'study-hub', label: 'CBT Practice', icon: 'laptop_chromebook' },
            { id: 'news', label: 'News', icon: 'newspaper' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSidebarNav(item.id);
                if (item.id !== 'dashboard') setActiveTab(item.id as TabType);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeSidebarNav === item.id
                  ? 'bg-[#0F9D58] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* MAIN DASHBOARD CONTENT GRID */}
        <main className="flex-1 p-2 sm:p-4 lg:p-6 space-y-8 min-w-0">
          {activeSidebarNav === 'dashboard' || activeSidebarNav === 'analytics' ? (
            <ResultsAnalyticsScreen setActiveTab={setActiveTab} />
          ) : (
            <>
          {/* WELCOME BANNER SECTION */}
          <section className="bg-gradient-to-r from-[#0F9D58] via-[#0F172A] to-[#1E293B] rounded-[20px] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
            {/* Decorative background blur shapes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#0F9D58]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold font-display">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  Candidate ID: 2026/UTME/94812
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
                  Good Morning, Destiny 👋
                </h1>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                  Your admission journey is <strong className="text-emerald-400">45% complete</strong>. Continue practicing Mathematics and Chemistry to reach your target score of <strong className="text-white">280+</strong>.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('study-hub')}
                    className="bg-[#0F9D58] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-[#0b8047] shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Continue Learning</span>
                    <span className="material-symbols-outlined text-base">play_circle</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('guide')}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>View My Progress</span>
                    <span className="material-symbols-outlined text-base">analytics</span>
                  </button>
                </div>
              </div>

              {/* Graphic Banner Element */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#0F9D58] to-[#2563EB] flex items-center justify-center text-white shadow-lg mb-3">
                    <span className="material-symbols-outlined text-3xl">laptop_mac</span>
                  </div>
                  <p className="font-bold text-sm text-white font-display">UTME CBT Simulator</p>
                  <p className="text-xs text-slate-300 mt-0.5">20,000+ Verified Past Questions</p>
                  <button
                    onClick={() => setActiveTab('study-hub')}
                    className="mt-3 w-full py-1.5 bg-white text-[#0F172A] font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Start Test
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ADMISSION JOURNEY PROGRESS TRACKER */}
          <section className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">route</span>
                  Your Admission Journey
                </h2>
                <p className="text-xs text-[#475569]">Step-by-step milestones towards your university matriculation.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1 rounded-full">
                  45% Completed
                </span>
              </div>
            </div>

            {/* Horizontal Steps Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { step: '1. Career', status: 'Completed', icon: 'psychology', done: true },
                { step: '2. Course', status: 'Completed', icon: 'menu_book', done: true },
                { step: '3. University', status: 'Completed', icon: 'account_balance', done: true },
                { step: '4. Registration', status: 'In Progress', icon: 'edit_note', active: true },
                { step: '5. Preparation', status: 'Pending', icon: 'laptop_chromebook', locked: true },
                { step: '6. UTME Exam', status: 'Locked', icon: 'event', locked: true },
                { step: '7. Admission', status: 'Locked', icon: 'verified', locked: true },
              ].map((st, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    st.done
                      ? 'bg-[#E8F5E9]/60 border-[#0F9D58]/30 text-[#0F9D58]'
                      : st.active
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] shadow-xs'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] opacity-75'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    {st.done ? (
                      <span className="material-symbols-outlined text-lg text-[#0F9D58]">check_circle</span>
                    ) : st.active ? (
                      <span className="material-symbols-outlined text-lg text-[#2563EB] animate-pulse">pending</span>
                    ) : (
                      <span className="material-symbols-outlined text-lg text-[#475569]">lock</span>
                    )}
                  </div>
                  <p className="text-xs font-bold font-display line-clamp-1">{st.step}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">{st.status}</p>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK ACTION CARDS (6 Clickable Cards) */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563EB]">bolt</span>
              Quick Actions
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                onClick={() => setActiveTab('courses')}
                className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">travel_explore</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mb-1 font-display">Explore Courses</h3>
                <p className="text-xs text-[#475569]">Discover cut-offs, career paths, and subject requirements.</p>
              </div>

              <div
                onClick={() => setActiveTab('universities')}
                className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mb-1 font-display">Find Universities</h3>
                <p className="text-xs text-[#475569]">Compare Federal, State & Private cut-off marks and hosteling.</p>
              </div>

              <div
                onClick={() => setShowSubjectChecker(true)}
                className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">fact_check</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mb-1 font-display">Subject Combination Checker</h3>
                <p className="text-xs text-[#475569]">Verify O'Level and UTME subject requirements instantly.</p>
              </div>

              <div
                onClick={() => setActiveTab('guide')}
                className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">assignment</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mb-1 font-display">Registration Guide</h3>
                <p className="text-xs text-[#475569]">NIN profile code, e-PIN purchase & accredited CBT centres.</p>
              </div>

              <div
                onClick={() => setActiveTab('study-hub')}
                className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">laptop_chromebook</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mb-1 font-display">CBT Practice</h3>
                <p className="text-xs text-[#475569]">Timed computer-based mock exams with instant scoring.</p>
              </div>

              <div
                onClick={() => setActiveTab('admission')}
                className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <h3 className="font-bold text-sm text-[#0F172A] mb-1 font-display">Admission Guide</h3>
                <p className="text-xs text-[#475569]">JAMB CAPS portal guidelines and Post-UTME tips.</p>
              </div>
            </div>
          </section>

          {/* TWO COLUMN GRID: STUDY PLAN & PERFORMANCE OVERVIEW + RIGHT SIDEBAR PANELS */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* LEFT 8 COLUMNS: STUDY PLAN & PERFORMANCE */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* MY STUDY PLAN */}
              <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold font-display text-[#0F172A] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0F9D58]">calendar_today</span>
                    Today's Study Plan
                  </h2>
                  <span className="text-xs font-semibold text-[#2563EB] cursor-pointer hover:underline">
                    Edit Schedule
                  </span>
                </div>

                <div className="space-y-3">
                  {studyPlan.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleStudyPlanStatus(item.id)}
                      className="p-3.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                            item.status === 'Completed'
                              ? 'bg-[#0F9D58] text-white border-[#0F9D58]'
                              : 'border-[#E2E8F0] bg-white text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <div>
                          <p className={`text-xs font-bold text-[#0F172A] ${item.status === 'Completed' ? 'line-through opacity-70' : ''}`}>
                            {item.subject}
                          </p>
                          <p className="text-[11px] text-[#475569]">{item.topic}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="w-24 bg-[#E2E8F0] h-2 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="bg-[#0F9D58] h-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PERFORMANCE OVERVIEW & SCORE BREAKDOWN */}
              <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold font-display text-[#0F172A] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#2563EB]">analytics</span>
                      Performance Overview
                    </h2>
                    <p className="text-xs text-[#475569]">Mock CBT quiz statistics and subject strengths.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('study-hub')}
                    className="text-xs font-bold text-[#0F9D58] hover:underline"
                  >
                    Take Mock CBT
                  </button>
                </div>

                {/* Stat Grid Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center">
                    <p className="text-2xl font-extrabold font-display text-[#0F172A]">12</p>
                    <p className="text-[11px] text-[#475569] font-medium mt-0.5">Tests Completed</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center">
                    <p className="text-2xl font-extrabold font-display text-[#0F9D58]">285<span className="text-xs text-[#475569]">/400</span></p>
                    <p className="text-[11px] text-[#475569] font-medium mt-0.5">Average Score</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center">
                    <p className="text-2xl font-extrabold font-display text-[#2563EB]">8</p>
                    <p className="text-[11px] text-[#475569] font-medium mt-0.5">Saved Courses</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center">
                    <p className="text-2xl font-extrabold font-display text-[#0F172A]">48 hrs</p>
                    <p className="text-[11px] text-[#475569] font-medium mt-0.5">Total Study Hours</p>
                  </div>
                </div>

                {/* Subject Circular Progress / Bar Breakdown */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-display">
                    Subject Score Mastery
                  </p>
                  {[
                    { sub: 'Use of English', score: 82, color: 'bg-[#0F9D58]', mark: '82/100' },
                    { sub: 'Mathematics', score: 65, color: 'bg-[#2563EB]', mark: '65/100' },
                    { sub: 'Physics', score: 45, color: 'bg-[#F59E0B]', mark: '45/100' },
                    { sub: 'Chemistry', score: 72, color: 'bg-[#0F9D58]', mark: '72/100' },
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#0F172A]">{s.sub}</span>
                        <span className="text-[#475569]">{s.mark}</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} transition-all duration-500`} style={{ width: `${s.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECENT ACTIVITY & UPCOMING TASKS */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* RECENT ACTIVITY */}
                <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm space-y-4">
                  <h2 className="text-base font-bold font-display text-[#0F172A] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0F172A]">history</span>
                    Recent Activity
                  </h2>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#F8FAFC]">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base mt-0.5">visibility</span>
                      <div>
                        <p className="font-semibold text-[#0F172A]">Viewed Medicine & Surgery</p>
                        <p className="text-[11px] text-[#475569]">Checked UTME subject combinations • 2 hrs ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#F8FAFC]">
                      <span className="material-symbols-outlined text-[#2563EB] text-base mt-0.5">bookmark</span>
                      <div>
                        <p className="font-semibold text-[#0F172A]">Saved University of Lagos</p>
                        <p className="text-[11px] text-[#475569]">Added to 1st Choice preference • Yesterday</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#F8FAFC]">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base mt-0.5">task_alt</span>
                      <div>
                        <p className="font-semibold text-[#0F172A]">Completed Mathematics Quiz</p>
                        <p className="text-[11px] text-[#475569]">Scored 18/20 in Algebra • 2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#F8FAFC]">
                      <span className="material-symbols-outlined text-[#0F172A] text-base mt-0.5">download</span>
                      <div>
                        <p className="font-semibold text-[#0F172A]">Downloaded JAMB Syllabus PDF</p>
                        <p className="text-[11px] text-[#475569]">All 4 subjects saved • 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UPCOMING TASKS CHECKLIST */}
                <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm space-y-4">
                  <h2 className="text-base font-bold font-display text-[#0F172A] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0F9D58]">checklist</span>
                    Upcoming Tasks
                  </h2>

                  <div className="space-y-2">
                    {tasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => toggleTask(t.id)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                      >
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold ${
                            t.completed
                              ? 'bg-[#0F9D58] text-white border-[#0F9D58]'
                              : 'border-[#E2E8F0] bg-white text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className={`text-xs font-medium text-[#0F172A] ${t.completed ? 'line-through text-[#475569]' : ''}`}>
                          {t.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* FEATURED RESOURCES */}
              <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold font-display text-[#0F172A] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0F9D58]">menu_book</span>
                    Featured Study Resources
                  </h2>
                  <button onClick={() => setActiveTab('study-hub')} className="text-xs font-bold text-[#0F9D58] hover:underline">
                    Browse All
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Official JAMB Syllabus 2026', desc: 'Approved topic breakdowns for all 25 UTME subjects.', icon: 'menu_book', tag: 'Official' },
                    { title: 'Recommended Textbooks', desc: 'Curated list of mandatory reading materials.', icon: 'auto_stories', tag: 'Approved' },
                    { title: '10-Year Past Questions', desc: 'Authentic previous exam questions with explanations.', icon: 'quiz', tag: 'CBT Ready' },
                    { title: 'Exam Day Tips', desc: 'Biometric registration & time management guide.', icon: 'lightbulb', tag: 'Strategy' },
                    { title: 'Time Management Guide', desc: 'Pacing strategies for 60 questions in 45 minutes.', icon: 'timer', tag: 'High Yield' },
                    { title: 'Post-UTME Prep', desc: 'Institutional screening pattern guides.', icon: 'school', tag: 'Admission' },
                  ].map((res, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="material-symbols-outlined text-[#0F9D58] text-xl">{res.icon}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0F9D58]/10 text-[#0F9D58]">
                            {res.tag}
                          </span>
                        </div>
                        <h3 className="font-bold text-xs text-[#0F172A] mb-1 font-display">{res.title}</h3>
                        <p className="text-[11px] text-[#475569]">{res.desc}</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('study-hub')}
                        className="mt-3 text-xs font-bold text-[#2563EB] hover:underline text-left flex items-center gap-1"
                      >
                        <span>Open Resource</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT 4 COLUMNS: SIDEBAR WIDGETS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* STUDY STREAK WIDGET */}
              <div className="bg-gradient-to-br from-[#0F9D58] to-[#008649] text-white rounded-[16px] p-5 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider font-display opacity-90">
                    Daily Study Streak
                  </span>
                  <span className="material-symbols-outlined text-amber-300 text-2xl animate-bounce">
                    local_fire_department
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-display">7 Days</span>
                  <span className="text-xs text-emerald-100 font-semibold">Active 🔥</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  You're in the top 5% of active students this week! Keep it up to boost retention.
                </p>
              </div>

              {/* UPCOMING EXAM COUNTDOWN */}
              <div className="bg-white rounded-[16px] p-5 border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-display flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-rose-500 text-base">timer</span>
                    2026 UTME Countdown
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Official Date
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xl font-bold font-display text-[#0F172A]">42</span>
                    <span className="block text-[10px] text-[#475569] uppercase font-bold">Days</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xl font-bold font-display text-[#0F172A]">14</span>
                    <span className="block text-[10px] text-[#475569] uppercase font-bold">Hours</span>
                  </div>
                  <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xl font-bold font-display text-[#0F172A]">55</span>
                    <span className="block text-[10px] text-[#475569] uppercase font-bold">Mins</span>
                  </div>
                </div>
              </div>

              {/* TODAY'S STUDY TIP */}
              <div className="bg-[#EFF6FF] border border-[#2563EB]/20 rounded-[16px] p-5 text-[#0F172A] space-y-2">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold text-xs uppercase tracking-wider font-display">
                  <span className="material-symbols-outlined text-lg">lightbulb</span>
                  Today's Study Tip
                </div>
                <p className="text-xs text-[#0F172A]/90 font-medium leading-relaxed">
                  "Active recall is 300% more effective than passive re-reading. Close your book and explain key concepts out loud!"
                </p>
              </div>

              {/* MOTIVATIONAL QUOTE */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-5 space-y-2">
                <span className="text-[11px] font-bold text-[#0F9D58] uppercase tracking-wider font-display block">
                  Daily Inspiration
                </span>
                <p className="text-xs text-[#475569] italic leading-relaxed">
                  "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing."
                </p>
              </div>

              {/* MINI CALENDAR WIDGET */}
              <div className="bg-white rounded-[16px] p-5 border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-bold font-display text-[#0F172A]">
                  <span>April 2026</span>
                  <div className="flex gap-1 text-[#475569]">
                    <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#0F172A]">chevron_left</span>
                    <span className="material-symbols-outlined text-sm cursor-pointer hover:text-[#0F172A]">chevron_right</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i} className="text-[#475569] font-bold py-1">{d}</span>
                  ))}
                  {[28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day, idx) => {
                    const isToday = day === 28;
                    return (
                      <span
                        key={idx}
                        className={`py-1 rounded-lg font-medium cursor-pointer ${
                          isToday
                            ? 'bg-[#0F9D58] text-white font-bold'
                            : 'hover:bg-[#F8FAFC] text-[#0F172A]'
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* RECOMMENDED COURSES SECTION */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">stars</span>
                Recommended Courses for You
              </h2>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-bold text-[#0F9D58] hover:underline"
              >
                View All Courses
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${course.tagBg} ${course.tagText}`}>
                        {course.tag}
                      </span>
                      <span className="text-xs font-bold text-[#0F9D58]">
                        Cut-off: {course.cutOffMark}
                      </span>
                    </div>

                    <h3 className="font-bold text-base font-display text-[#0F172A]">{course.name}</h3>

                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 border-t border-[#E2E8F0] flex justify-between text-[11px] text-[#475569]">
                      <span>Duration: {course.duration}</span>
                      <span>Applicants: {course.applicants}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                    <button
                      onClick={() => {
                        if (onSelectCourse) onSelectCourse(course);
                        else setActiveTab('courses');
                      }}
                      className="w-full py-2 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl text-xs font-bold hover:bg-[#0F9D58] hover:text-white hover:border-[#0F9D58] transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECOMMENDED UNIVERSITIES SECTION */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563EB]">school</span>
                Top Recommended Universities
              </h2>
              <button
                onClick={() => setActiveTab('universities')}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Explore All Institutions
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUnivs.map(univ => (
                <div
                  key={univ.id}
                  className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-36 bg-slate-100 overflow-hidden">
                    <img
                      src={univ.imageUrl}
                      alt={univ.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#0F172A] font-bold text-[10px] px-2.5 py-1 rounded-full shadow-xs">
                      {univ.type} Institution
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-base font-display text-[#0F172A]">{univ.name}</h3>
                    <p className="text-xs text-[#475569] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
                      {univ.location}
                    </p>
                    <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed pt-1">
                      {univ.description}
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                    <button
                      onClick={() => {
                        if (onSelectUniversity) onSelectUniversity(univ);
                        else setActiveTab('universities');
                      }}
                      className="w-full py-2 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-xl text-xs font-bold hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LATEST NEWS CARDS */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">newspaper</span>
                Latest Admission News
              </h2>
              <button
                onClick={() => setActiveTab('news')}
                className="text-xs font-bold text-[#0F9D58] hover:underline"
              >
                Read All News
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsCards.map(art => (
                <div
                  key={art.id}
                  className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-32 bg-slate-100 overflow-hidden relative">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#0F9D58] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {art.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] text-[#475569] font-medium">{art.date} • {art.readTime}</span>
                      <h3 className="font-bold text-sm font-display text-[#0F172A] line-clamp-2">{art.title}</h3>
                      <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                    <button
                      onClick={() => {
                        if (onSelectArticle) onSelectArticle(art);
                        else setActiveTab('news');
                      }}
                      className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
                    >
                      <span>Read More</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
            </>
          )}

        </main>
      </div>

      {/* SUBJECT COMBINATION CHECKER MODAL */}
      {showSubjectChecker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[20px] max-w-lg w-full p-6 space-y-5 border border-[#E2E8F0] shadow-2xl relative">
            <button
              onClick={() => setShowSubjectChecker(false)}
              className="absolute top-4 right-4 text-[#475569] hover:text-[#0F172A]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">fact_check</span>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">Subject Combination Checker</h3>
                <p className="text-xs text-[#475569]">Verify O'Level and UTME requirements for your course.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#0F172A] block">Select Course</label>
              <select
                value={checkerCourse}
                onChange={(e) => {
                  setCheckerCourse(e.target.value);
                  handleSubjectCheck(e.target.value);
                }}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0F9D58]"
              >
                <option value="Medicine & Surgery">Medicine & Surgery</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Law (LL.B)">Law (LL.B)</option>
                <option value="Accounting">Accounting</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>

              <button
                onClick={() => handleSubjectCheck(checkerCourse)}
                className="w-full py-2.5 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#0b8047] transition-all"
              >
                Verify Combination
              </button>
            </div>

            {checkerResult && (
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-3 pt-3">
                <div className="flex items-center gap-2 text-[#0F9D58] font-bold text-xs">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Approved JAMB Requirements for {checkerCourse}</span>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#0F172A] mb-1">UTME 4-Subject Combination:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(checkerResult?.subjects || []).map((s, i) => (
                      <span key={i} className="text-[11px] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-lg font-semibold text-[#0F172A]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#0F172A] mb-1">O'Level 5-Credit Requirements:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(checkerResult?.oLevel || []).map((s, i) => (
                      <span key={i} className="text-[11px] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-lg font-semibold text-[#475569]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
