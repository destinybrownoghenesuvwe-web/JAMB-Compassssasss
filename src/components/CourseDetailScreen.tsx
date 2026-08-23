import React, { useState } from 'react';
import { Course, TabType, University } from '../types';
import { COURSES_DATA, UNIVERSITIES_DATA } from '../data/mockData';

interface CourseDetailScreenProps {
  course?: Course | null;
  setActiveTab: (tab: TabType) => void;
  onSelectUniversity?: (univ: University) => void;
  onSelectCourse?: (course: Course) => void;
}

export const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({
  course: initialCourse,
  setActiveTab,
  onSelectUniversity,
  onSelectCourse,
}) => {
  // Default to Computer Science if no course is passed or passed course is empty
  const defaultCs = COURSES_DATA.find((c) => c.id === 'comp-sci') || COURSES_DATA[1] || COURSES_DATA[0];
  const currentCourse = initialCourse || defaultCs;

  // Interactive states
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [selectedCareerModal, setSelectedCareerModal] = useState<any | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBookmarkToggle = () => {
    setIsSaved(!isSaved);
    showToast(isSaved ? `Removed "${currentCourse.name}" from saved courses` : `Saved "${currentCourse.name}" to your bookmarks!`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Course link copied to clipboard!');
    } else {
      showToast('Course link ready to share');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // 10 Careers for Section 6
  const careerOpportunities = [
    {
      title: 'Software Engineer',
      icon: 'code',
      bg: 'bg-emerald-50 text-[#0F9D58] border-emerald-200',
      description: 'Architect, develop, test, and maintain enterprise software applications, cloud services, and scalable web solutions.',
      skills: ['TypeScript', 'React / Node.js', 'System Architecture', 'Git / CI/CD'],
      responsibilities: 'Write clean code, design microservices, review PRs, build web and mobile interfaces.',
      avgSalary: '₦350,000 - ₦1,200,000 / month',
    },
    {
      title: 'Data Scientist',
      icon: 'analytics',
      bg: 'bg-blue-50 text-[#2563EB] border-blue-200',
      description: 'Extract actionable insights from huge datasets using statistical models, machine learning, and data visualization tools.',
      skills: ['Python', 'SQL & Pandas', 'Machine Learning', 'PowerBI / Tableau'],
      responsibilities: 'Train predictive models, analyze user churn, build automated dashboards.',
      avgSalary: '₦400,000 - ₦1,500,000 / month',
    },
    {
      title: 'Cybersecurity Analyst',
      icon: 'security',
      bg: 'bg-rose-50 text-rose-600 border-rose-200',
      description: 'Protect organizational networks, databases, and servers from unauthorized access, cyber threats, and security vulnerabilities.',
      skills: ['Ethical Hacking', 'Network Security', 'SIEM & Firewalls', 'Penetration Testing'],
      responsibilities: 'Monitor threats, audit security logs, respond to incidents, configure security policies.',
      avgSalary: '₦450,000 - ₦1,400,000 / month',
    },
    {
      title: 'AI Engineer',
      icon: 'smart_toy',
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Design neural networks, large language models, computer vision systems, and autonomous intelligent agents.',
      skills: ['PyTorch / TensorFlow', 'NLP', 'Computer Vision', 'Deep Learning'],
      responsibilities: 'Train AI models, fine-tune LLMs, integrate AI APIs into production systems.',
      avgSalary: '₦500,000 - ₦2,000,000 / month',
    },
    {
      title: 'Cloud Engineer',
      icon: 'cloud_sync',
      bg: 'bg-sky-50 text-sky-700 border-sky-200',
      description: 'Deploy, automate, and manage scalable cloud infrastructure across AWS, Google Cloud, and Microsoft Azure.',
      skills: ['AWS / GCP', 'Docker & Kubernetes', 'Terraform', 'DevOps Pipelines'],
      responsibilities: 'Manage cloud clusters, configure auto-scaling, maintain system uptime and disaster recovery.',
      avgSalary: '₦420,000 - ₦1,600,000 / month',
    },
    {
      title: 'Mobile App Developer',
      icon: 'phone_android',
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Create high-performance iOS and Android mobile applications using cross-platform and native frameworks.',
      skills: ['Flutter / React Native', 'Kotlin / Swift', 'REST APIs', 'UI/UX Mobile Design'],
      responsibilities: 'Build mobile screens, optimize battery & memory usage, deploy to App Store and Google Play.',
      avgSalary: '₦300,000 - ₦1,100,000 / month',
    },
    {
      title: 'Systems Analyst',
      icon: 'account_tree',
      bg: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Evaluate business requirements and design IT system architectures to streamline organizational workflows.',
      skills: ['UML Modeling', 'Business Analysis', 'Database Design', 'Agile / Scrum'],
      responsibilities: 'Bridge communication between business managers and tech development teams.',
      avgSalary: '₦320,000 - ₦950,000 / month',
    },
    {
      title: 'Database Administrator',
      icon: 'database',
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Maintain database integrity, design relational schemas, optimize complex SQL queries, and manage data backups.',
      skills: ['PostgreSQL / MySQL', 'MongoDB / Redis', 'Query Optimization', 'Backup & Disaster Recovery'],
      responsibilities: 'Tune database queries, manage database replication, enforce data security compliance.',
      avgSalary: '₦350,000 - ₦1,100,000 / month',
    },
    {
      title: 'Game Developer',
      icon: 'sports_esports',
      bg: 'bg-pink-50 text-pink-700 border-pink-200',
      description: 'Build 2D and 3D interactive video games, graphics engines, game physics, and multiplayer network code.',
      skills: ['Unity / Unreal Engine', 'C++ / C#', 'Game Physics', '3D Asset Integration'],
      responsibilities: 'Program game mechanics, render shader effects, optimize framerates across consoles and PC.',
      avgSalary: '₦300,000 - ₦1,200,000 / month',
    },
    {
      title: 'Web Developer',
      icon: 'language',
      bg: 'bg-emerald-50 text-[#0F9D58] border-emerald-200',
      description: 'Craft responsive, accessible frontend interfaces and server-side REST APIs powering modern web portals.',
      skills: ['HTML/CSS/JS', 'Tailwind CSS', 'React / Next.js', 'Web Accessibility'],
      responsibilities: 'Convert design mockups into living code, optimize page load performance, integrate payment gateways.',
      avgSalary: '₦250,000 - ₦850,000 / month',
    },
  ];

  // Universities offering CS (Section 7)
  const topUniversitiesCS = [
    {
      name: 'University of Lagos',
      abbrev: 'UNILAG',
      state: 'Lagos State',
      type: 'Federal University',
      availability: 'UTME & Direct Entry Accredited',
      cutOff: 260,
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Covenant University',
      abbrev: 'CU',
      state: 'Ogun State',
      type: 'Private University',
      availability: 'UTME Accredited (Top Ranked CS)',
      cutOff: 240,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Obafemi Awolowo University',
      abbrev: 'OAU',
      state: 'Osun State',
      type: 'Federal University',
      availability: 'UTME & Direct Entry Accredited',
      cutOff: 255,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'University of Nigeria, Nsukka',
      abbrev: 'UNN',
      state: 'Enugu State',
      type: 'Federal University',
      availability: 'UTME & Direct Entry Accredited',
      cutOff: 250,
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Ahmadu Bello University',
      abbrev: 'ABU',
      state: 'Kaduna State',
      type: 'Federal University',
      availability: 'UTME & Direct Entry Accredited',
      cutOff: 245,
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'University of Port Harcourt',
      abbrev: 'UNIPORT',
      state: 'Rivers State',
      type: 'Federal University',
      availability: 'UTME & Direct Entry Accredited',
      cutOff: 240,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Related Courses (Section 8)
  const relatedCourses = [
    {
      id: 'soft-eng',
      name: 'Software Engineering',
      icon: 'terminal',
      desc: 'Focuses strictly on engineering principles, software testing, clean architecture, and development lifecycles.',
    },
    {
      id: 'info-tech',
      name: 'Information Technology',
      icon: 'dns',
      desc: 'Emphasizes practical IT systems administration, enterprise networking, web servers, and technical support.',
    },
    {
      id: 'cyber-sec',
      name: 'Cyber Security',
      icon: 'verified_user',
      desc: 'Dedicated degree path in network defense, digital forensics, ethical hacking, and information protection.',
    },
    {
      id: 'data-sci',
      name: 'Data Science',
      icon: 'monitoring',
      desc: 'Interdisciplinary field blending statistics, programming, big data processing, and predictive analytics.',
    },
    {
      id: 'comp-eng',
      name: 'Computer Engineering',
      icon: 'memory',
      desc: 'Combines electrical engineering and computer science to build microprocessors, IoT hardware, and embedded systems.',
    },
    {
      id: 'info-sys',
      name: 'Information Systems',
      icon: 'storefront',
      desc: 'Connects business management with technology solutions, database administration, and enterprise software.',
    },
  ];

  // Student Skills (Section 9)
  const studentSkills = [
    { name: 'Problem Solving', icon: 'extension', color: 'bg-emerald-50 text-[#0F9D58] border-emerald-200' },
    { name: 'Programming', icon: 'code', color: 'bg-blue-50 text-[#2563EB] border-blue-200' },
    { name: 'Critical Thinking', icon: 'psychology', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { name: 'Algorithms', icon: 'account_tree', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Databases', icon: 'database', color: 'bg-rose-50 text-rose-600 border-rose-200' },
    { name: 'Networking', icon: 'hub', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { name: 'Artificial Intelligence', icon: 'auto_awesome', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { name: 'Cybersecurity', icon: 'shield', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { name: 'Software Design', icon: 'architecture', color: 'bg-pink-50 text-pink-700 border-pink-200' },
    { name: 'Cloud Computing', icon: 'cloud', color: 'bg-slate-100 text-[#0F172A] border-slate-300' },
  ];

  // Learning Roadmap Steps (Section 10)
  const roadmapSteps = [
    {
      stepNumber: 'Step 1',
      title: 'Meet Admission Requirements',
      icon: 'rule',
      desc: 'Secure 5 O’Level credits in English, Math, Physics, Chemistry, & Biology/Geography. Score 240+ in UTME with English, Math, Physics, and Chemistry.',
    },
    {
      stepNumber: 'Step 2',
      title: 'Gain Admission & Registration',
      icon: 'school',
      desc: 'Accept admission offer on JAMB CAPS portal, complete university screening, and register for 100-Level faculty courses.',
    },
    {
      stepNumber: 'Step 3',
      title: 'Study Core CS Courses',
      icon: 'auto_stories',
      desc: 'Master fundamentals in programming (Python/C++), discrete structures, data structures & algorithms, database systems, and operating systems.',
    },
    {
      stepNumber: 'Step 4',
      title: 'Industrial Training (SIWES)',
      icon: 'business_center',
      desc: 'Undertake 6-month compulsory practical internship (Students Industrial Work Experience Scheme) in tech companies or IT firms during 300-Level.',
    },
    {
      stepNumber: 'Step 5',
      title: 'Complete Final Year Project & Graduate',
      icon: 'workspace_premium',
      desc: 'Build and defend an innovative software or research project, complete final examinations, and earn your Bachelor of Science (B.Sc.) degree.',
    },
    {
      stepNumber: 'Step 6',
      title: 'Professional Certifications',
      icon: 'verified',
      desc: 'Enhance your career readiness with industry-recognized certifications (AWS Certified Developer, CompTIA Security+, Oracle DB, PMP).',
    },
    {
      stepNumber: 'Step 7',
      title: 'Career Development & Innovation',
      icon: 'rocket_launch',
      desc: 'Join global tech companies, build startups, contribute to open-source, or pursue postgraduate studies (M.Sc / Ph.D) in Artificial Intelligence or Data Science.',
    },
  ];

  // FAQ Items (Section 11)
  const faqs = [
    {
      question: 'Is Computer Science difficult?',
      answer:
        'Computer Science can be challenging because it relies heavily on analytical thinking, logic, and problem-solving skills rather than rote memorization. However, with consistent practice in coding and understanding fundamental mathematical logic, students excel and find it immensely rewarding.',
    },
    {
      question: 'Can science students study Computer Science?',
      answer:
        'Yes, absolutely! Science students who have O’Level credit passes in Mathematics, English, Physics, and Chemistry are prime candidates for Computer Science in Nigerian universities.',
    },
    {
      question: 'Which universities offer Computer Science in Nigeria?',
      answer:
        'Over 100 accredited universities in Nigeria offer Computer Science, including Federal institutions like UNILAG, OAU, UNN, ABU, UNIPORT, and top Private universities like Covenant University and Babcock University.',
    },
    {
      question: 'What careers can I pursue with a Computer Science degree?',
      answer:
        'Graduates can work as Software Engineers, Data Scientists, Cybersecurity Analysts, AI Engineers, Cloud Architects, Mobile Developers, Systems Analysts, Database Administrators, and Tech Entrepreneurs.',
    },
    {
      question: 'Can I switch to Computer Science later through Direct Entry?',
      answer:
        'Yes. Candidates holding a National Diploma (ND) or Higher National Diploma (HND) in Computer Science, Software Engineering, or Electrical Electronics with Upper Credit, or those with 2 A-Level passes in Math and Physics, can apply for 200-Level Direct Entry.',
    },
  ];

  // Resources (Section 12)
  const studentResources = [
    {
      title: 'JAMB Syllabus for Computer Science',
      icon: 'picture_as_pdf',
      desc: 'Official topics and objectives for UTME Mathematics, Physics, and Chemistry.',
    },
    {
      title: 'Recommended Textbooks',
      icon: 'book',
      desc: 'Comprehensive list of approved WAEC, NECO, and JAMB preparatory textbooks.',
    },
    {
      title: 'CBT Practice Engine',
      icon: 'laptop_mac',
      desc: 'Simulate full timed 4-subject JAMB examinations with automated scoring.',
    },
    {
      title: '10-Year Past Questions',
      icon: 'quiz',
      desc: 'Access past questions with detailed step-by-step explanations for all subject modules.',
    },
    {
      title: 'Admission Requirements Guide',
      icon: 'fact_check',
      desc: 'Detailed breakdown of Post-UTME screening requirements across federal universities.',
    },
    {
      title: 'Tech Scholarships & Grants',
      icon: 'card_membership',
      desc: 'Explore university scholarships and STEM grants available for Nigerian students.',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] font-sans pb-20">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#0F9D58] flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
          <span className="text-xs font-bold font-sans">{toastMessage}</span>
        </div>
      )}

      {/* PAGE HEADER SECTION */}
      <header className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#E2E8F0] pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-between text-xs text-[#475569]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-[#0F9D58] transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => setActiveTab('courses')}
                className="hover:text-[#0F9D58] transition-colors"
              >
                Courses
              </button>
              <span>/</span>
              <span className="font-semibold text-[#0F172A]">{currentCourse.name}</span>
            </div>

            <button
              onClick={() => setActiveTab('courses')}
              className="flex items-center gap-1 text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 hover:bg-[#0F9D58]/20 px-3 py-1.5 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Courses</span>
            </button>
          </nav>

          {/* Header Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Title & Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] font-bold text-xs font-display">
                  <span className="material-symbols-outlined text-sm">school</span>
                  {currentCourse.category} Faculty
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-bold text-[11px]">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  High Employment Demand
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#0F172A] tracking-tight leading-tight">
                {currentCourse.name}
              </h1>

              <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore admission requirements, subject combinations, universities, career opportunities and everything you need to know about {currentCourse.name}.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleBookmarkToggle}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs ${
                    isSaved
                      ? 'bg-rose-500 text-white'
                      : 'bg-[#0F9D58] text-white hover:bg-[#0b8046]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {isSaved ? 'bookmark_added' : 'bookmark'}
                  </span>
                  <span>{isSaved ? 'Saved to Bookmarks' : 'Bookmark Course'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2.5 bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#0F9D58] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                >
                  <span className="material-symbols-outlined text-base text-[#2563EB]">share</span>
                  <span>Share Course</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#0F9D58] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                >
                  <span className="material-symbols-outlined text-base text-[#475569]">print</span>
                  <span>Print Info</span>
                </button>
              </div>
            </div>

            {/* Hero Illustration Box & Quick Facts Card */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Professional Hero Image Illustration */}
              <div className="relative rounded-[20px] overflow-hidden border border-[#E2E8F0] shadow-md bg-slate-900 group">
                <img
                  src={currentCourse.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
                  alt={currentCourse.name}
                  className="w-full h-56 object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">terminal</span>
                    Technology & Digital Innovation
                  </span>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    {currentCourse.description}
                  </p>
                </div>
              </div>

              {/* Quick Facts Card */}
              <div className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-xs grid grid-cols-2 gap-4 text-xs font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">schedule</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#475569] block font-semibold uppercase">Duration</span>
                    <span className="font-extrabold text-[#0F172A]">{currentCourse.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">account_balance</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#475569] block font-semibold uppercase">Faculty</span>
                    <span className="font-extrabold text-[#0F172A]">{currentCourse.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">assignment_turned_in</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#475569] block font-semibold uppercase">Admission Type</span>
                    <span className="font-extrabold text-[#0F172A]">UTME & DE</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">domain</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#475569] block font-semibold uppercase">Institutions</span>
                    <span className="font-extrabold text-[#0F172A]">100+ Universities</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </header>

      {/* SECTION 1: COURSE OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Academic Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">info</span>
              Course Overview
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column: What is CS & What students learn */}
            <div className="space-y-6">
              
              {/* What is Computer Science */}
              <div className="space-y-2">
                <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F9D58] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">help_center</span>
                  </span>
                  <span>What is {currentCourse.name}?</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-10">
                  {currentCourse.name} is the systematic study of computation, algorithmic processes, data structures, and software architecture. Unlike computer engineering which focuses heavily on physical hardware components, Computer Science emphasizes software development, computational logic, theoretical algorithms, and digital system design.
                </p>
              </div>

              {/* What Students Learn */}
              <div className="space-y-2">
                <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">school</span>
                  </span>
                  <span>What Students Learn</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-10">
                  Undergraduates master object-oriented and functional programming languages (Python, Java, C++, JavaScript), data structures (trees, graphs, hash tables), database management systems, artificial intelligence, operating system internals, and software development lifecycles.
                </p>
              </div>

              {/* Industries where graduates work */}
              <div className="space-y-2">
                <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">business</span>
                  </span>
                  <span>Industries Where Graduates Work</span>
                </h3>
                <div className="pl-10 grid grid-cols-2 gap-2 text-xs text-[#0F172A] font-semibold">
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>FinTech & Banking</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>Software & SaaS</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>Telecommunications</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>E-Commerce & Retail</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Major Study Areas & Skills Developed */}
            <div className="space-y-6">
              
              {/* Major Study Areas */}
              <div className="space-y-3">
                <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">category</span>
                  </span>
                  <span>Major Study Areas</span>
                </h3>
                <div className="space-y-2 pl-10">
                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                    <span className="text-xs font-bold text-[#0F172A] block">1. Artificial Intelligence & Machine Learning</span>
                    <p className="text-[11px] text-[#475569]">Neural networks, deep learning, natural language processing, and automated reasoning.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                    <span className="text-xs font-bold text-[#0F172A] block">2. Cybersecurity & Cryptography</span>
                    <p className="text-[11px] text-[#475569]">Data encryption, secure network protocols, threat intelligence, and digital forensics.</p>
                  </div>
                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] space-y-1">
                    <span className="text-xs font-bold text-[#0F172A] block">3. Software Engineering & Systems</span>
                    <p className="text-[11px] text-[#475569]">Full-stack web/mobile development, cloud microservices, and system architecture.</p>
                  </div>
                </div>
              </div>

              {/* Skills Developed */}
              <div className="space-y-2">
                <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">psychology</span>
                  </span>
                  <span>Core Skills Developed</span>
                </h3>
                <ul className="pl-10 text-xs text-[#475569] space-y-1.5 list-disc list-inside">
                  <li>Algorithmic logic and computational complexity reduction</li>
                  <li>Data modeling, SQL and NoSQL database management</li>
                  <li>Object-oriented design patterns and clean code practices</li>
                  <li>Version control (Git) and collaborative engineering workflows</li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: COURSE SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-[#0F172A]">Course Snapshot at a Glance</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-[#F8FAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-1 text-center hover:border-[#0F9D58] transition-colors">
            <span className="material-symbols-outlined text-2xl text-[#0F9D58]">timer</span>
            <span className="text-2xl font-black font-display text-[#0F172A] block">4 Years</span>
            <span className="text-[11px] font-semibold text-[#475569]">Study Duration</span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-1 text-center hover:border-[#2563EB] transition-colors">
            <span className="material-symbols-outlined text-2xl text-[#2563EB]">computer</span>
            <span className="text-2xl font-black font-display text-[#0F172A] block">Computing</span>
            <span className="text-[11px] font-semibold text-[#475569]">Primary Faculty</span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-1 text-center hover:border-purple-600 transition-colors">
            <span className="material-symbols-outlined text-2xl text-purple-600">how_to_reg</span>
            <span className="text-2xl font-black font-display text-[#0F172A] block">UTME & DE</span>
            <span className="text-[11px] font-semibold text-[#475569]">Admission Type</span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-1 text-center hover:border-amber-600 transition-colors">
            <span className="material-symbols-outlined text-2xl text-amber-600">work_history</span>
            <span className="text-2xl font-black font-display text-[#0F172A] block">25+</span>
            <span className="text-[11px] font-semibold text-[#475569]">Career Opportunities</span>
          </div>

          <div className="bg-[#F8FAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-1 text-center col-span-2 sm:col-span-1 hover:border-emerald-600 transition-colors">
            <span className="material-symbols-outlined text-2xl text-emerald-600">domain</span>
            <span className="text-2xl font-black font-display text-[#0F172A] block">100+</span>
            <span className="text-[11px] font-semibold text-[#475569]">Accredited Universities</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: ADMISSION REQUIREMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Verification Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
              Admission Requirements Checklist
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* UTME & O'Level Requirements */}
            <div className="space-y-4">
              <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">fact_check</span>
                </span>
                <span>UTME Candidate Criteria</span>
              </h3>

              <div className="space-y-3 text-xs text-[#0F172A]">
                <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm">UTME Score Benchmark</span>
                    <span className="text-[#475569]">Minimum JAMB UTME score of 200+ (240+ recommended for top Federal Universities like UNILAG, OAU, UNN).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm">Minimum O’Level Credit Passes</span>
                    <span className="text-[#475569]">At least 5 Credit passes in SSCE (WAEC, NECO, or NABTEB) obtained in not more than two sittings.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm">Compulsory Subjects</span>
                    <span className="text-[#475569]">English Language, Mathematics, Physics, Chemistry, and any other relevant science subject.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Entry Requirements */}
            <div className="space-y-4">
              <h3 className="font-bold text-base font-display text-[#0F172A] flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">flight_land</span>
                </span>
                <span>Direct Entry (DE) Candidate Criteria</span>
              </h3>

              <div className="space-y-3 text-xs text-[#0F172A]">
                <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm">GCE A-Level Qualification</span>
                    <span className="text-[#475569]">Two (2) A-Level passes in Mathematics and Physics or Chemistry.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm">ND / HND Diploma Pass</span>
                    <span className="text-[#475569]">Upper Credit pass in National Diploma (ND) or Higher National Diploma (HND) in Computer Science or Computer Engineering.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <span className="material-symbols-outlined text-[#0F9D58] text-lg shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <span className="font-bold block text-sm">JUPEB / IJMB Certification</span>
                    <span className="text-[#475569]">Minimum of 10 points in JUPEB or IJMB examination with Mathematics and Physics subjects.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: UTME SUBJECT COMBINATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Compulsory 4-Subject Registration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563EB]">menu_book</span>
              UTME Subject Combination
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          {/* Card 1: English */}
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-[16px] border border-emerald-200 p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#0F9D58] text-white">
                Compulsory
              </span>
              <span className="text-xs font-bold text-[#0F9D58]">01</span>
            </div>
            <h3 className="font-extrabold text-base font-display text-[#0F172A]">Use of English</h3>
            <p className="text-[11px] text-[#475569]">Mandatory subject for all JAMB UTME candidates nationwide.</p>
          </div>

          {/* Card 2: Mathematics */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-[16px] border border-blue-200 p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#2563EB] text-white">
                Major Subject
              </span>
              <span className="text-xs font-bold text-[#2563EB]">02</span>
            </div>
            <h3 className="font-extrabold text-base font-display text-[#0F172A]">Mathematics</h3>
            <p className="text-[11px] text-[#475569]">Essential foundation for computational algorithms and logic design.</p>
          </div>

          {/* Card 3: Physics */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-[16px] border border-purple-200 p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-700 text-white">
                Core Science
              </span>
              <span className="text-xs font-bold text-purple-700">03</span>
            </div>
            <h3 className="font-extrabold text-base font-display text-[#0F172A]">Physics</h3>
            <p className="text-[11px] text-[#475569]">Covers mechanics, electronics, electricity, and wave optics.</p>
          </div>

          {/* Card 4: Chemistry */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-[16px] border border-amber-200 p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-700 text-white">
                Required Science
              </span>
              <span className="text-xs font-bold text-amber-700">04</span>
            </div>
            <h3 className="font-extrabold text-base font-display text-[#0F172A]">Chemistry</h3>
            <p className="text-[11px] text-[#475569]">Required science module by most public Federal/State universities.</p>
          </div>

        </div>

        {/* Note Box */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex items-center gap-3 text-xs text-[#475569]">
          <span className="material-symbols-outlined text-[#2563EB] text-xl shrink-0">info</span>
          <p className="leading-relaxed">
            <strong className="text-[#0F172A]">Official Guidance Note:</strong> Always confirm subject combinations using the latest official JAMB brochure and your chosen institution’s specific admission requirements before completing registration.
          </p>
        </div>
      </section>

      {/* SECTION 5: O'LEVEL REQUIREMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Secondary School Certificate (SSCE)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">assignment_turned_in</span>
              O’Level Requirements Checklist
            </h2>
          </div>

          {/* Success Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#0F9D58] border border-emerald-200 text-xs font-bold">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>1 or 2 Sittings Accepted</span>
          </span>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">check_box</span>
              <div>
                <span className="font-bold text-sm text-[#0F172A] block">English Language</span>
                <span className="text-[11px] text-[#475569]">Credit Pass (A1 - C6)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">check_box</span>
              <div>
                <span className="font-bold text-sm text-[#0F172A] block">Mathematics</span>
                <span className="text-[11px] text-[#475569]">Credit Pass (A1 - C6)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">check_box</span>
              <div>
                <span className="font-bold text-sm text-[#0F172A] block">Physics</span>
                <span className="text-[11px] text-[#475569]">Credit Pass (A1 - C6)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">check_box</span>
              <div>
                <span className="font-bold text-sm text-[#0F172A] block">Chemistry</span>
                <span className="text-[11px] text-[#475569]">Credit Pass (A1 - C6)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">check_box</span>
              <div>
                <span className="font-bold text-sm text-[#0F172A] block">One Add. Science Subject</span>
                <span className="text-[11px] text-[#475569]">Biology, Further Maths, or Geography</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">stars</span>
              <div>
                <span className="font-bold text-sm text-[#0F9D58] block">Total: 5 Credits</span>
                <span className="text-[11px] text-[#475569]">WAEC / NECO / NABTEB</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: CAREER OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Employment & Professional Paths
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">work</span>
              Career Opportunities (10+)
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('careers')}
            className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
          >
            <span>Explore All Career Paths</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {careerOpportunities.map((career, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[16px] border border-[#E2E8F0] p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${career.bg} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-xl">{career.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
                    In-Demand
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 line-clamp-2 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {career.skills.map((sk, sIdx) => (
                    <span key={sIdx} className="text-[10px] bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] px-2 py-0.5 rounded font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#475569]">High Growth</span>
                <button
                  onClick={() => setSelectedCareerModal(career)}
                  className="text-xs font-bold text-[#0F9D58] hover:text-[#0b8046] flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: TOP UNIVERSITIES OFFERING THIS COURSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Accredited Higher Institutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563EB]">domain</span>
              Top Universities Offering Computer Science
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('universities')}
            className="px-4 py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#0b8046] transition-colors flex items-center gap-1.5"
          >
            <span>View All Universities</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topUniversitiesCS.map((univ, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="h-40 relative bg-slate-900">
                  <img
                    src={univ.image}
                    alt={univ.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#0F172A]">
                      {univ.type}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">location_on</span>
                      {univ.state}
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300">
                      Cut-off: {univ.cutOff}+
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                    {univ.name} ({univ.abbrev})
                  </h3>
                  <p className="text-xs text-[#475569] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#0F9D58]">verified</span>
                    <span>{univ.availability}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    const matchInMock = UNIVERSITIES_DATA.find((u) => u.name.includes(univ.abbrev) || u.abbreviation === univ.abbrev);
                    if (matchInMock && onSelectUniversity) {
                      onSelectUniversity(matchInMock);
                    } else {
                      setActiveTab('universities');
                    }
                  }}
                  className="w-full py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white text-xs font-bold rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1"
                >
                  <span>View University Profile</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: RELATED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Alternative Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">alt_route</span>
              Related Courses & Majors
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedCourses.map((rel, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] transition-all flex items-start gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl">{rel.icon}</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                  {rel.name}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                  {rel.desc}
                </p>
                <button
                  onClick={() => {
                    const matchCourse = COURSES_DATA.find(c => c.id === rel.id);
                    if (matchCourse && onSelectCourse) {
                      onSelectCourse(matchCourse);
                    } else {
                      setActiveTab('courses');
                    }
                  }}
                  className="text-[11px] font-bold text-[#0F9D58] hover:underline flex items-center gap-1 pt-1"
                >
                  <span>Explore Major</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: STUDENT SKILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Competency Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600">psychology_alt</span>
              Key Student Skills Developed
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {studentSkills.map((sk, idx) => (
            <div
              key={idx}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 shadow-xs hover:scale-105 transition-transform ${sk.color}`}
            >
              <span className="material-symbols-outlined text-base">{sk.icon}</span>
              <span>{sk.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: LEARNING ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Undergraduate Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">timeline</span>
              Learning & Career Roadmap
            </h2>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#0F9D58]/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
          {roadmapSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Point Icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-[#0F9D58] text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-base">{step.icon}</span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-[16px] border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] transition-colors space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0F9D58] border border-emerald-200">
                  {step.stepNumber}
                </span>
                <h3 className="text-base font-extrabold font-display text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Aspirant Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">quiz</span>
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#0F172A] hover:text-[#0F9D58] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0F9D58] text-base">help</span>
                    <span>{faq.question}</span>
                  </span>
                  <span className="material-symbols-outlined text-[#475569]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0]/50 mt-1 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 12: STUDENT RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
              Preparation Toolkit
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563EB]">folder_open</span>
              Essential Student Resources
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-[16px] border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">{res.icon}</span>
                </div>
                <h3 className="font-bold text-base font-display text-[#0F172A]">{res.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{res.desc}</p>
              </div>

              <button
                onClick={() => {
                  if (res.title.includes('CBT') || res.title.includes('Past Questions')) {
                    setActiveTab('study-hub');
                  } else {
                    setActiveTab('guide');
                  }
                }}
                className="w-full py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1"
              >
                <span>Open Resource</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 13: SAVE & SHARE ACTION BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#F8FAFC] rounded-[20px] border border-[#E2E8F0] p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base font-display text-[#0F172A]">Save or Share {currentCourse.name} Information</h3>
            <p className="text-xs text-[#475569]">Export or save course details for future UTME registration and offline reference.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleBookmarkToggle}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                isSaved
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0F9D58]'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isSaved ? 'bookmark_remove' : 'bookmark_add'}
              </span>
              <span>{isSaved ? 'Saved' : 'Save Course'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#0F9D58] rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-[#2563EB]">share</span>
              <span>Share Course</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#0F9D58] rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-[#475569]">print</span>
              <span>Print Info</span>
            </button>

            <button
              onClick={() => showToast('Summary PDF generation initialized')}
              className="px-4 py-2 bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#0F9D58] rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-emerald-600">download</span>
              <span>Download Summary</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 14: CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F9D58] rounded-[24px] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden text-center space-y-6">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#0F9D58]/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-extrabold font-display uppercase tracking-wider text-emerald-400 bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
              Take the Next Step
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Pursue {currentCourse.name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Explore universities, prepare for UTME with past questions, and take the confident next step towards your future academic degree.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={() => setActiveTab('universities')}
              className="px-6 py-3 bg-[#0F9D58] hover:bg-[#0b8046] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">domain</span>
              <span>Find Universities</span>
            </button>

            <button
              onClick={() => setActiveTab('study-hub')}
              className="px-6 py-3 bg-white text-[#0F172A] hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-[#2563EB]">rocket_launch</span>
              <span>Start My Journey</span>
            </button>
          </div>
        </div>
      </section>

      {/* CAREER DETAILS MODAL (IF CLICKED) */}
      {selectedCareerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedCareerModal.bg}`}>
                  <span className="material-symbols-outlined text-lg">{selectedCareerModal.icon}</span>
                </div>
                <h3 className="font-bold text-lg font-display text-[#0F172A]">{selectedCareerModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCareerModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-[#0F172A] flex items-center justify-center hover:bg-slate-200"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#0F172A]">
              <div>
                <span className="font-bold text-[#475569] block mb-0.5">Overview & Duties:</span>
                <p className="text-[#475569] leading-relaxed">{selectedCareerModal.description}</p>
              </div>

              <div>
                <span className="font-bold text-[#475569] block mb-0.5">Key Responsibilities:</span>
                <p className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-[#0F172A] leading-relaxed">
                  {selectedCareerModal.responsibilities}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#475569] block mb-0.5">Estimated Entry Salary (Nigeria):</span>
                <span className="font-extrabold text-[#0F9D58] text-sm">{selectedCareerModal.avgSalary}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCareerModal(null)}
                className="px-5 py-2 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#0b8046]"
              >
                Close Career Info
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
