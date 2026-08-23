import React from 'react';
import { TabType, Course, University, NewsArticle } from '../types';
import { COURSES_DATA, UNIVERSITIES_DATA, NEWS_ARTICLES } from '../data/mockData';
import heroPhoto from '../assets/images/nigerian_students_hero_1786063317403.jpg';
import {
  ArrowRight,
  PlayCircle,
  GraduationCap,
  CheckCircle2,
  Building2,
  ClipboardList,
  BrainCircuit,
  Zap,
  Users,
  ChevronRight,
  Image as ImageIcon,
  Clock,
  Compass
} from 'lucide-react';

interface HomeScreenProps {
  setActiveTab: (tab: TabType) => void;
  onSelectCourse: (course: Course) => void;
  onSelectUniversity: (univ: University, initialTab?: 'requirements' | 'gallery') => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenTutorial: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setActiveTab,
  onSelectCourse,
  onSelectUniversity,
  onSelectArticle,
  onOpenAuth,
  onOpenTutorial,
}) => {
  const popularCourses = COURSES_DATA.slice(0, 3);
  const featuredUnivs = UNIVERSITIES_DATA.slice(0, 2);
  const latestNews = NEWS_ARTICLES.slice(0, 3);

  const roadmapSteps = [
    { num: 1, title: 'Career Discovery', desc: 'Identify your strengths and field of interest', active: true },
    { num: 2, title: 'Choose Course', desc: 'Verify required subject combinations and O Level rules', active: true },
    { num: 3, title: 'Select Varsity', desc: 'Compare cut-off marks, fees, and state locations', active: true },
    { num: 4, title: 'Registration', desc: 'Obtain NIN and register at an accredited CBT center', active: true },
    { num: 5, title: 'Preparation', desc: 'Practice mock exams, syllabus drills, and past questions', active: false },
    { num: 6, title: 'UTME Exam', desc: 'Write your examination and meet your target score', active: false },
    { num: 7, title: 'Result Check', desc: 'Review performance and confirm CAPS eligibility', active: false },
    { num: 8, title: 'Gain Admission', desc: 'Accept admission offer on JAMB CAPS portal', active: false },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#f5fbf2] via-[#eef8eb]/60 to-[#f5fbf2] border-b border-[#bdcabc]/30 w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left Hero Copy & CTAs */}
          <div className="lg:col-span-7 z-10 text-center lg:text-left space-y-5 sm:space-y-6 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006a39]/10 text-[#006a39] text-xs font-bold border border-[#006a39]/20 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a39] animate-pulse"></span>
              <span>2026 Admission Cycle Active</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display text-[#171d18] leading-[1.15] tracking-tight">
              Your Complete Guide from <span className="text-[#006a39] relative inline-block">
                Registration
                <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-[#82faab]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,5 100,15" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span> to Admission
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#3e4a3f] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Navigate the complex Nigerian educational landscape with confidence. Get expert guidance, CBT practice drills, cut-off checkers, and real-time updates for your 2026 JAMB journey.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto bg-[#006a39] hover:bg-[#008649] text-white px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 group min-h-[44px]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenTutorial}
                className="w-full sm:w-auto border border-[#bdcabc] bg-white hover:bg-[#f0fdf4] px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-[#171d18] active:scale-95 transition-all shadow-2xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <PlayCircle className="w-5 h-5 text-[#006a39]" />
                <span>Watch Tutorial</span>
              </button>
            </div>

            {/* Trust Metrics / Indicators */}
            <div className="pt-6 border-t border-[#bdcabc]/50 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
              <div 
                onClick={() => setActiveTab('courses')}
                className="cursor-pointer group text-center lg:text-left"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-[#006a39]">500+</p>
                <p className="text-[10px] sm:text-xs text-[#3e4a3f] font-bold uppercase tracking-wider mt-0.5">Courses</p>
              </div>

              <div 
                onClick={() => setActiveTab('universities')}
                className="cursor-pointer group text-center lg:text-left"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-[#006a39]">170+</p>
                <p className="text-[10px] sm:text-xs text-[#3e4a3f] font-bold uppercase tracking-wider mt-0.5">Universities</p>
              </div>

              <div 
                onClick={() => setActiveTab('study-hub')}
                className="cursor-pointer group text-center lg:text-left"
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-[#006a39]">1M+</p>
                <p className="text-[10px] sm:text-xs text-[#3e4a3f] font-bold uppercase tracking-wider mt-0.5">Students</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full mt-4 lg:mt-0">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[#006a39]/15 rounded-3xl blur-3xl -z-10 transform scale-95"></div>

            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img
                src={heroPhoto}
                alt="Nigerian Students Preparing for JAMB Admission"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Floating Overlay Badge 1 */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2 animate-bounce-slow">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#006a39] text-white flex items-center justify-center font-bold shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 block">Target Score</span>
                  <span className="text-xs font-extrabold text-[#171d18]">310+ UTME</span>
                </div>
              </div>

              {/* Floating Overlay Badge 2 */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-white/40 flex items-center gap-2 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#006a39] shrink-0" />
                <div>
                  <span className="text-xs font-bold text-[#171d18] block">2026 JAMB Syllabus</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500">100% Aligned Materials</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. QUICK ACCESS SECTION */}
      <section className="py-10 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          <div
            onClick={() => setActiveTab('courses')}
            className="bg-[#f5fbf2] border border-[#bdcabc] p-5 sm:p-6 rounded-2xl hover:border-[#006a39] hover:shadow-md transition-all group cursor-pointer w-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#82faab] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-2xs">
              <GraduationCap className="w-6 h-6 text-[#00522b]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold font-display mb-1 text-[#171d18]">Explore Courses</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3f]">Find the perfect career path for you.</p>
          </div>

          <div
            onClick={() => setActiveTab('universities')}
            className="bg-[#f5fbf2] border border-[#bdcabc] p-5 sm:p-6 rounded-2xl hover:border-[#006a39] hover:shadow-md transition-all group cursor-pointer w-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#dae2fd] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-2xs">
              <Building2 className="w-6 h-6 text-[#565e74]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold font-display mb-1 text-[#171d18]">Find Universities</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3f]">Compare top schools and requirements.</p>
          </div>

          <div
            onClick={() => setActiveTab('guide')}
            className="bg-[#f5fbf2] border border-[#bdcabc] p-5 sm:p-6 rounded-2xl hover:border-[#006a39] hover:shadow-md transition-all group cursor-pointer w-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#82faab] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-2xs">
              <ClipboardList className="w-6 h-6 text-[#00522b]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold font-display mb-1 text-[#171d18]">JAMB Guide</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3f]">Step-by-step registration roadmap.</p>
          </div>

          <div
            onClick={() => setActiveTab('study-hub')}
            className="bg-[#f5fbf2] border border-[#bdcabc] p-5 sm:p-6 rounded-2xl hover:border-[#006a39] hover:shadow-md transition-all group cursor-pointer w-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-2xs">
              <BrainCircuit className="w-6 h-6 text-[#0051d5]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold font-display mb-1 text-[#171d18]">Study Hub</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3f]">Practice tests and study materials.</p>
          </div>
        </div>
      </section>

      {/* 3. JOURNEY ROADMAP SECTION (RESPONSIVE VERTICAL ON MOBILE / HORIZONTAL ON DESKTOP) */}
      <section className="py-12 sm:py-16 bg-[#eff6ec] overflow-hidden border-y border-[#bdcabc]/30 w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#171d18] mb-2">
            The JAMB Journey Roadmap
          </h2>
          <p className="text-sm sm:text-base text-[#3e4a3f]">
            Follow these 8 essential steps to secure your university admission.
          </p>
        </div>

        {/* Desktop Horizontal Roadmap (Visible on lg screens) */}
        <div className="hidden lg:block relative w-full overflow-x-auto pb-6 no-scrollbar">
          <div className="flex min-w-[1100px] px-6 items-start justify-between relative max-w-[1280px] mx-auto">
            {/* Horizontal Connector Line */}
            <div className="absolute top-8 left-12 right-12 h-1 bg-[#bdcabc] z-0"></div>

            {roadmapSteps.map((step) => (
              <div
                key={step.num}
                onClick={() => setActiveTab('guide')}
                className="flex flex-col items-center text-center w-32 cursor-pointer group z-10"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg mb-3 relative border-4 border-[#eff6ec] shadow-md transition-transform group-hover:scale-110 ${
                    step.active
                      ? 'bg-[#006a39] text-white'
                      : 'bg-[#bdcabc] text-[#3e4a3f] group-hover:bg-[#008649] group-hover:text-white'
                  }`}
                >
                  {step.num}
                </div>
                <p className={`text-xs font-bold transition-colors ${step.active ? 'text-[#171d18]' : 'text-[#3e4a3f] group-hover:text-[#006a39]'}`}>
                  {step.title}
                </p>
                <span className="text-[10px] text-[#006a39] opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-0.5">
                  View step <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Step-by-Step Timeline (Visible on screens < lg) */}
        <div className="block lg:hidden max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative border-l-2 border-[#006a39]/30 ml-4 sm:ml-6 space-y-6">
            {roadmapSteps.map((step) => (
              <div
                key={step.num}
                onClick={() => setActiveTab('guide')}
                className="relative pl-6 sm:pl-8 group cursor-pointer"
              >
                {/* Step Bullet Circle */}
                <div
                  className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transition-transform group-hover:scale-110 ${
                    step.active
                      ? 'bg-[#006a39] text-white'
                      : 'bg-[#bdcabc] text-[#3e4a3f] group-hover:bg-[#008649] group-hover:text-white'
                  }`}
                >
                  0{step.num}
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#bdcabc]/60 shadow-2xs group-hover:border-[#006a39] transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold font-display text-[#171d18] group-hover:text-[#006a39] transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-[10px] font-bold text-[#006a39] bg-[#006a39]/10 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      View step <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-[#3e4a3f] font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR COURSES SECTION */}
      <section className="py-12 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4 w-full">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#171d18]">Popular Courses</h2>
            <p className="text-xs sm:text-sm text-[#3e4a3f]">Discover top-rated academic programs in Nigeria.</p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-[#006a39] font-bold text-xs sm:text-sm flex items-center gap-1 hover:underline group"
          >
            <span>View all courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="group bg-white border border-[#bdcabc] rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#006a39] transition-all cursor-pointer flex flex-col w-full"
            >
              <div className="h-40 bg-[#008649] relative overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center opacity-70 group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('${course.imageUrl}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#006a39] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-2xs">
                  {course.tagText}
                </div>
                <div className="absolute bottom-3 right-3 text-white text-xs font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Cut-off: {course.cutOffMark}+
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display mb-2 text-[#171d18] group-hover:text-[#006a39] transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3e4a3f] mb-6 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[#bdcabc]/40 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#006a39]" />
                    <span className="text-xs font-semibold text-[#3e4a3f]">{course.applicants}</span>
                  </div>
                  <span className="text-xs font-bold text-[#006a39] flex items-center gap-0.5">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED UNIVERSITIES SECTION */}
      <section className="py-12 sm:py-16 bg-[#dee4db]/50 border-y border-[#bdcabc]/40 w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#171d18]">Featured Universities</h2>
            <p className="text-xs sm:text-sm text-[#3e4a3f]">Top-ranking institutions based on academic excellence and facilities.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 w-full">
            {featuredUnivs.map((univ) => (
              <div
                key={univ.id}
                className="flex flex-col sm:flex-row bg-[#f5fbf2] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl border border-[#bdcabc]/50 hover:border-[#006a39] transition-all group w-full"
              >
                <div className="sm:w-5/12 overflow-hidden h-52 sm:h-auto relative shrink-0">
                  <img
                    alt={univ.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={univ.imageUrl}
                  />
                  <div className="absolute top-3 left-3 bg-[#006a39] text-white text-[11px] px-2.5 py-1 rounded-md font-bold">
                    {univ.abbreviation}
                  </div>
                </div>
                <div className="p-6 sm:p-8 sm:w-7/12 flex flex-col justify-center">
                  <span className="text-[11px] text-[#006a39] font-bold uppercase tracking-wider mb-1">
                    {univ.type} University
                  </span>
                  <h3 
                    onClick={() => onSelectUniversity(univ, 'requirements')}
                    className="text-xl font-bold font-display mb-2 text-[#171d18] hover:text-[#006a39] cursor-pointer transition-colors"
                  >
                    {univ.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3e4a3f] mb-6 leading-relaxed line-clamp-3">
                    {univ.description}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => onSelectUniversity(univ, 'requirements')}
                      className="bg-[#006a39] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#008649] transition-all shadow-2xs min-h-[40px]"
                    >
                      View Requirements
                    </button>
                    <button
                      onClick={() => onSelectUniversity(univ, 'gallery')}
                      className="text-[#006a39] font-bold text-xs flex items-center gap-1 hover:bg-[#eff6ec] px-3 py-2 rounded-xl transition-all"
                    >
                      <span>Gallery</span>
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST ADMISSION NEWS SECTION */}
      <section className="py-12 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 w-full">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#171d18]">Latest Admission News</h2>
          <button
            onClick={() => setActiveTab('news')}
            className="text-[#006a39] font-bold text-xs sm:text-sm flex items-center gap-1 hover:underline"
          >
            <span>View all articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {latestNews.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white border border-[#bdcabc] rounded-2xl overflow-hidden hover:border-[#006a39] hover:shadow-lg transition-all cursor-pointer flex flex-col group w-full"
            >
              <div
                className="w-full h-44 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 relative"
                style={{ backgroundImage: `url('${article.imageUrl}')` }}
              >
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {article.category}
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold font-display mb-2 text-[#171d18] group-hover:text-[#006a39] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#3e4a3f] line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-2 pt-3 border-t border-[#bdcabc]/40 text-[11px] font-semibold text-[#3e4a3f] flex items-center justify-between">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1 text-[#006a39]">
                    {article.readTime} <Clock className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 mb-12 sm:mb-20">
        <div className="bg-[#006a39] rounded-3xl p-6 sm:p-10 md:p-16 text-center relative overflow-hidden shadow-xl w-full">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="40" id="dots" patternUnits="userSpaceOnUse" width="40">
                  <circle cx="2" cy="2" fill="white" r="2"></circle>
                </pattern>
              </defs>
              <rect fill="url(#dots)" height="100%" width="100%"></rect>
            </svg>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-bold font-display leading-tight">
              Ready To Begin Your Admission Journey?
            </h2>
            <p className="text-sm sm:text-lg text-[#f6fff4] opacity-90 leading-relaxed font-medium">
              Join over a million students who use JAMB Compass to navigate their way into their dream universities. It's free, forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center pt-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto bg-white text-[#006a39] px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:bg-[#eff6ec] active:scale-95 transition-all min-h-[44px]"
              >
                Create Free Account
              </button>
              <button
                onClick={() => {
                  alert("Live Expert Guidance: Connect with our admission counselors via WhatsApp or email support@jambcompass.ng!");
                }}
                className="w-full sm:w-auto border-2 border-white text-white px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base hover:bg-white/10 active:scale-95 transition-all min-h-[44px]"
              >
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
