import React, { useState } from 'react';
import { Course, University, NewsArticle, TabType } from '../types';
import { COURSES_DATA, UNIVERSITIES_DATA, NEWS_ARTICLES, ROADMAP_STEPS } from '../data/mockData';
import { LoginPage } from './LoginPage';

// --- 1. COURSE MODAL ---
interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onSelectUniv: (univId: string) => void;
}
export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onSelectUniv }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#bdcabc]">
        {/* Header Image */}
        <div className="h-52 relative bg-[#008649]">
          <div
            className="w-full h-full bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url('${course.imageUrl}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.tagBg} mb-2 inline-block`}>
              {course.tagText}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-display">{course.name}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#171d18] font-display mb-2">Program Overview</h3>
            <p className="text-sm text-[#3e4a3f] leading-relaxed">{course.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#f5fbf2] p-4 rounded-xl border border-[#bdcabc]/50">
            <div>
              <span className="text-[11px] font-bold text-[#3e4a3f] uppercase block">Average Cut-off</span>
              <span className="text-lg font-bold text-[#006a39]">{course.cutOffMark}+ UTME</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#3e4a3f] uppercase block">Duration</span>
              <span className="text-lg font-bold text-[#171d18]">{course.duration}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#3e4a3f] uppercase block">Yearly Applicants</span>
              <span className="text-lg font-bold text-[#171d18]">{course.applicants}</span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#171d18] font-display mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a39]">menu_book</span>
              <span>Compulsory JAMB UTME Subjects (4)</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(course.utmeSubjects || []).map((sub, i) => (
                <span key={i} className="bg-[#eff6ec] border border-[#006a39]/30 text-[#006a39] font-bold px-3 py-1.5 rounded-xl text-xs">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#171d18] font-display mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0051d5]">rule_folder</span>
              <span>O-Level Credit Requirements (WAEC/NECO)</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(course.olevelRequirements) ? (
                course.olevelRequirements.map((req, i) => (
                  <span key={i} className="bg-[#dae2fd]/50 border border-[#0051d5]/20 text-[#131b2e] font-semibold px-3 py-1.5 rounded-xl text-xs">
                    {req}
                  </span>
                ))
              ) : (
                <p className="text-xs text-[#131b2e] bg-[#dae2fd]/30 p-3.5 rounded-xl border border-[#0051d5]/20 leading-relaxed font-medium">
                  {course.olevelRequirements || '5 Credits in relevant O-Level subjects.'}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#171d18] font-display mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#565e74]">work</span>
              <span>Career Opportunities</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(course.careerProspects || []).map((job, i) => (
                <span key={i} className="bg-[#f5fbf2] border border-[#bdcabc]/60 text-[#3e4a3f] px-3 py-1 rounded-lg text-xs">
                  {job}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#bdcabc]/40 flex justify-between items-center">
            <span className="text-xs text-[#3e4a3f]">Ensure your subject combination is 100% accurate before registering!</span>
            <button
              onClick={onClose}
              className="bg-[#006a39] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#008649] transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. UNIVERSITY MODAL ---
interface UniversityModalProps {
  univ: University | null;
  initialTab: 'requirements' | 'gallery';
  onClose: () => void;
  onViewFullDetails?: (univ: University) => void;
}
export const UniversityModal: React.FC<UniversityModalProps> = ({ univ, initialTab, onClose, onViewFullDetails }) => {
  const [tab, setTab] = useState<'requirements' | 'gallery'>(initialTab);

  if (!univ) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#bdcabc]">
        {/* Header */}
        <div className="h-56 relative bg-[#2b322c]">
          <img alt={univ.name} src={univ.imageUrl} className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white flex justify-between items-end">
            <div>
              <span className="bg-[#82faab] text-[#00522b] px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                {univ.type} University • {univ.abbreviation}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-display">{univ.name}</h2>
              <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span> {univ.location} • {univ.accreditation}
              </p>
            </div>
            <span className="bg-[#006a39] px-3.5 py-1.5 rounded-xl text-sm font-bold shadow-md whitespace-nowrap">
              Cut-off: {univ.cutOffMark}+
            </span>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-[#bdcabc]/40 px-6 bg-[#f5fbf2]">
          <button
            onClick={() => setTab('requirements')}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              tab === 'requirements'
                ? 'border-[#006a39] text-[#006a39]'
                : 'border-transparent text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">fact_check</span>
            <span>Admission Requirements & Info</span>
          </button>
          <button
            onClick={() => setTab('gallery')}
            className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              tab === 'gallery'
                ? 'border-[#006a39] text-[#006a39]'
                : 'border-transparent text-[#3e4a3f] hover:text-[#006a39]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">photo_library</span>
            <span>Campus Gallery ({univ.gallery.length})</span>
          </button>
        </div>

        <div className="p-6 md:p-8">
          {tab === 'requirements' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#171d18] font-display mb-2">About the Institution</h3>
                <p className="text-sm text-[#3e4a3f] leading-relaxed">{univ.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#eff6ec] p-5 rounded-xl border border-[#006a39]/30">
                <div>
                  <span className="text-[11px] font-bold text-[#3e4a3f] uppercase block">Faculties</span>
                  <span className="text-lg font-bold text-[#006a39]">{univ.facultiesCount} Faculties</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#3e4a3f] uppercase block">Tuition Fee Range</span>
                  <span className="text-lg font-bold text-[#171d18]">{univ.tuitionRange}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#3e4a3f] uppercase block">Accommodation</span>
                  <span className="text-lg font-bold text-[#171d18]">{univ.accommodation}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#171d18] font-display mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006a39]">stars</span>
                  <span>Notable Alumni</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(univ.notableAlumni || []).map((alumnus, i) => (
                    <span key={i} className="bg-white border border-[#bdcabc] text-[#171d18] font-semibold px-3 py-1.5 rounded-xl text-xs">
                      {alumnus}
                    </span>
                  ))}
                  {(!univ.notableAlumni || univ.notableAlumni.length === 0) && (
                    <span className="text-xs text-[#3e4a3f] italic">Prominent leaders, innovators, and industry pioneers.</span>
                  )}
                </div>
              </div>

              <div className="bg-[#dae2fd]/30 p-5 rounded-xl border border-[#bdcabc]">
                <h4 className="font-bold text-sm text-[#0051d5] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">info</span>
                  <span>JAMB Screening Note for {univ.abbreviation}</span>
                </h4>
                <p className="text-xs text-[#3e4a3f] leading-relaxed">
                  To be eligible for screening at {univ.name}, you must have selected the university as your <strong className="text-[#171d18]">First Choice</strong> during JAMB UTME registration and scored at least {univ.cutOffMark}. Ensure you upload your WAEC/NECO results on JAMB CAPS promptly!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#3e4a3f]">Explore the campus facilities, lecture halls, and landmarks of {univ.name}:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(univ.gallery || []).map((imgUrl, i) => (
                  <div key={i} className="group relative h-48 rounded-xl overflow-hidden bg-[#2b322c] border border-[#bdcabc]/50 shadow-sm">
                    <img alt={`Campus view ${i+1}`} src={imgUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/60 px-2.5 py-1 rounded-md">
                      Campus View #{i+1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-[#bdcabc]/40 flex flex-wrap items-center justify-between gap-3">
            {onViewFullDetails && (
              <button
                onClick={() => {
                  onClose();
                  onViewFullDetails(univ);
                }}
                className="bg-[#006a39] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#008649] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>View Full University Details Page</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-slate-100 text-[#171d18] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all ml-auto"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. ARTICLE MODAL ---
interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}
export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#bdcabc]">
        <div className="h-60 relative bg-[#2b322c]">
          <img alt={article.title} src={article.imageUrl} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-[#82faab] text-[#00522b] px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
              {article.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-display leading-snug">{article.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-center text-xs text-[#3e4a3f] pb-4 border-b border-[#bdcabc]/40">
            <span className="font-bold text-[#171d18] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#006a39]">person</span> {article.author}
            </span>
            <span>{article.date} • {article.readTime}</span>
          </div>

          <div className="text-sm md:text-base text-[#171d18] leading-relaxed space-y-4">
            <p className="font-semibold text-lg text-[#006a39]">{article.excerpt}</p>
            <p>{article.content}</p>
          </div>

          <div className="bg-[#eff6ec] p-5 rounded-xl border border-[#006a39]/30 text-xs text-[#3e4a3f]">
            <span className="font-bold text-[#006a39] block mb-1">Official Disclaimer:</span>
            <span>Always confirm exam dates and portal openings directly on the JAMB e-Facility website (efacility.jamb.gov.ng) or your student profile.</span>
          </div>

          <div className="pt-4 border-t border-[#bdcabc]/40 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#006a39] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#008649] transition-all"
            >
              Finished Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. AUTH MODAL ---
interface AuthModalProps {
  mode: 'login' | 'signup' | null;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
  setActiveTab?: (tab: TabType) => void;
}
export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSuccess, setActiveTab }) => {
  if (!mode) return null;

  return (
    <LoginPage
      initialMode={mode}
      onClose={onClose}
      onSuccess={onSuccess}
      setActiveTab={setActiveTab}
      isModal={true}
    />
  );
};

// --- 5. SEARCH MODAL ---
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType, item?: any) => void;
}
export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedCourses = query.trim() ? COURSES_DATA.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.tag.toLowerCase().includes(query.toLowerCase())) : [];
  const matchedUnivs = query.trim() ? UNIVERSITIES_DATA.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.abbreviation.toLowerCase().includes(query.toLowerCase())) : [];
  const matchedNews = query.trim() ? NEWS_ARTICLES.filter(n => n.title.toLowerCase().includes(query.toLowerCase())) : [];
  const matchedSteps = query.trim() ? ROADMAP_STEPS.filter(s => s.title.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#bdcabc]">
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#006a39]">
            search
          </span>
          <input
            type="text"
            autoFocus
            placeholder="Search JAMB Compass (Courses, Universities, News, Steps)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#f5fbf2] border-2 border-[#006a39] rounded-xl pl-12 pr-10 py-3.5 text-base font-medium outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#3e4a3f] bg-[#dee4db] px-2 py-1 rounded hover:bg-[#bdcabc]"
          >
            ESC
          </button>
        </div>

        {!query.trim() ? (
          <div className="text-center py-8 text-[#3e4a3f]">
            <p className="text-sm font-semibold mb-2">Popular Search Terms:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Medicine', 'UNILAG', 'Computer Science', 'Cut-off mark', 'CAPS upload', 'Direct Entry', 'OAU'].map((term, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(term)}
                  className="bg-[#eff6ec] text-[#006a39] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#006a39] hover:text-white transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto space-y-6 text-left">
            {matchedCourses.length === 0 && matchedUnivs.length === 0 && matchedNews.length === 0 && matchedSteps.length === 0 && (
              <p className="text-center py-6 text-sm text-[#3e4a3f]">No matches found for "{query}".</p>
            )}

            {matchedCourses.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase text-[#006a39] mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">school</span> Courses ({matchedCourses.length})
                </h4>
                <div className="space-y-1.5">
                  {matchedCourses.map(c => (
                    <div
                      key={c.id}
                      onClick={() => { onClose(); onNavigate('courses'); }}
                      className="p-3 bg-[#f5fbf2] hover:bg-[#eff6ec] rounded-xl cursor-pointer flex justify-between items-center transition-all"
                    >
                      <div>
                        <span className="font-bold text-sm text-[#171d18] block">{c.name}</span>
                        <span className="text-xs text-[#3e4a3f]">Cut-off: {c.cutOffMark}+ • {c.tagText}</span>
                      </div>
                      <span className="material-symbols-outlined text-[#006a39] text-base">arrow_forward</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedUnivs.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase text-[#0051d5] mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">account_balance</span> Universities ({matchedUnivs.length})
                </h4>
                <div className="space-y-1.5">
                  {matchedUnivs.map(u => (
                    <div
                      key={u.id}
                      onClick={() => { onClose(); onNavigate('universities'); }}
                      className="p-3 bg-[#f5fbf2] hover:bg-[#eff6ec] rounded-xl cursor-pointer flex justify-between items-center transition-all"
                    >
                      <div>
                        <span className="font-bold text-sm text-[#171d18] block">{u.name} ({u.abbreviation})</span>
                        <span className="text-xs text-[#3e4a3f]">{u.type} University • {u.location}</span>
                      </div>
                      <span className="material-symbols-outlined text-[#006a39] text-base">arrow_forward</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchedNews.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase text-[#565e74] mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">newspaper</span> News ({matchedNews.length})
                </h4>
                <div className="space-y-1.5">
                  {matchedNews.map(n => (
                    <div
                      key={n.id}
                      onClick={() => { onClose(); onNavigate('news'); }}
                      className="p-3 bg-[#f5fbf2] hover:bg-[#eff6ec] rounded-xl cursor-pointer flex justify-between items-center transition-all"
                    >
                      <span className="font-bold text-sm text-[#171d18] line-clamp-1">{n.title}</span>
                      <span className="text-xs text-[#006a39] whitespace-nowrap">{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 6. VIDEO TUTORIAL MODAL ---
interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStep: () => void;
}
export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose, onNavigateToStep }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState(0);

  if (!isOpen) return null;

  const timestamps = [
    { time: "00:15", label: "Step 1: Discovering Your True Career Calling" },
    { time: "01:45", label: "Step 2: Checking JAMB UTME Subject Combinations" },
    { time: "03:20", label: "Step 3: Federal vs State University Cut-offs" },
    { time: "05:10", label: "Step 4: Creating Your JAMB Profile Code (NIN)" },
    { time: "07:30", label: "Step 5: CBT Time Management & Exam Strategies" },
    { time: "10:05", label: "Step 6: CAPS Result Upload & Accepting Admission" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#171d18] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 text-white flex flex-col md:flex-row">
        {/* Player Canvas */}
        <div className="md:w-3/5 bg-black relative flex flex-col justify-between p-6 min-h-[320px] aspect-video">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-all md:hidden"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="z-10">
            <span className="bg-[#006a39] text-white px-2.5 py-1 rounded text-xs font-bold">JAMB Masterclass 2026</span>
            <h3 className="text-lg font-bold font-display mt-2">How to Secure Admission Without Stress</h3>
          </div>

          <div className="flex-grow flex items-center justify-center my-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-[#006a39] text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#008649] transition-all group"
            >
              <span className="material-symbols-outlined text-4xl ml-1">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          <div className="space-y-2 z-10">
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div className="bg-[#82faab] h-full w-1/3 transition-all duration-300"></div>
            </div>
            <div className="flex justify-between text-xs text-white/70">
              <span>{isPlaying ? "04:12" : "00:00"}</span>
              <span>12:45 Full Tutorial</span>
            </div>
          </div>
        </div>

        {/* Timestamps & Info Sidebar */}
        <div className="md:w-2/5 p-6 bg-[#2b322c] flex flex-col justify-between relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white hidden md:flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div>
            <h4 className="text-base font-bold font-display mb-1 text-white">Video Chapters</h4>
            <p className="text-xs text-white/70 mb-4">Click any topic to skip directly to that section:</p>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 no-scrollbar">
              {timestamps.map((ts, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveTimestamp(idx); setIsPlaying(true); }}
                  className={`w-full p-3 rounded-xl text-left text-xs transition-all flex items-center gap-3 border ${
                    activeTimestamp === idx
                      ? 'bg-[#006a39] border-[#82faab] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-[#82faab] font-bold">{ts.time}</span>
                  <span className="line-clamp-1">{ts.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              onClick={() => { onClose(); onNavigateToStep(); }}
              className="w-full bg-[#82faab] text-[#00522b] py-3 rounded-xl font-bold text-xs hover:bg-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Open Interactive 8-Step Roadmap</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
