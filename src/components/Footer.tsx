import React, { useState } from 'react';
import { TabType } from '../types';
import {
  CheckCircle2,
  School,
  Building2,
  BookOpen,
  BookMarked,
  Mail,
  Phone,
  MapPin,
  Compass,
  Share2,
  Hash,
  Briefcase,
  Play,
  Home,
  Info,
  Award,
  ListChecks,
  FileCheck,
  Search,
  BookOpenText,
  Monitor,
  CalendarDays,
  History,
  FileSpreadsheet,
  Newspaper,
  Megaphone,
  HelpCircle,
  Headphones,
  ShieldCheck,
  Scale,
  Bug,
  Send,
  Library
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleAlert = (title: string, message: string) => {
    alert(`${title}\n\n${message}`);
  };

  return (
    <footer className="bg-[#f5fbf2] text-slate-800 border-t border-[#bdcabc]/50 mt-auto font-sans relative">
      
      {/* TRUST SECTION ABOVE FOOTER */}
      <div className="border-b border-[#bdcabc]/40 bg-white/80 py-10 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#006a39]/10 text-[#006a39] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#006a39]" />
            <span>Nationwide Academic Impact</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#171d18]">
            Trusted by Students Across Nigeria
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Supporting candidates nationwide in making informed course selections and achieving top UTME scores for premier institutions.
          </p>

          {/* University Badges / Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2 max-w-4xl mx-auto">
            {[
              { name: 'University of Lagos', abbr: 'UNILAG', icon: School, loc: 'Lagos' },
              { name: 'University of Ibadan', abbr: 'UI', icon: Building2, loc: 'Ibadan' },
              { name: 'University of Nigeria', abbr: 'UNN', icon: BookOpen, loc: 'Nsukka' },
              { name: 'Univ. of Port Harcourt', abbr: 'UNIPORT', icon: Library, loc: 'Port Harcourt' },
              { name: 'Ahmadu Bello University', abbr: 'ABU Zaria', icon: BookMarked, loc: 'Zaria' },
            ].map((univ, idx) => {
              const IconComp = univ.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveTab('universities')}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#006a39] transition-all cursor-pointer flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#006a39]/10 text-[#006a39] flex items-center justify-center font-bold group-hover:bg-[#006a39] group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-[#171d18] block group-hover:text-[#006a39] transition-colors">{univ.abbr}</span>
                    <span className="text-[10px] text-slate-500 font-medium block truncate max-w-[110px]">{univ.loc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION CARDS BAR */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006a39]/10 text-[#006a39] flex items-center justify-center font-bold shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Email Support</span>
              <a href="mailto:support@jambcompass.ng" className="text-xs font-bold text-[#171d18] hover:text-[#006a39] transition-colors">
                support@jambcompass.ng
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006a39]/10 text-[#006a39] flex items-center justify-center font-bold shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Candidate Helpline</span>
              <a href="tel:+23480052622667" className="text-xs font-bold text-[#171d18] hover:text-[#006a39] transition-colors">
                +234 800 JAMB COMPASS
              </a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006a39]/10 text-[#006a39] flex items-center justify-center font-bold shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Headquarters</span>
              <span className="text-xs font-bold text-[#171d18]">
                Abuja &amp; Lagos, Nigeria
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN 6-COLUMN FOOTER NAVIGATION */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 border-t border-[#bdcabc]/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-6">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#006a39] flex items-center justify-center text-white shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold font-display text-[#006a39]">
                JAMB Compass
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              JAMB Compass is Nigeria's trusted digital platform helping students navigate every stage of their university admission journey.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {[
                { title: 'Facebook', icon: Share2, href: 'https://facebook.com' },
                { title: 'X (Twitter)', icon: Hash, href: 'https://x.com' },
                { title: 'LinkedIn', icon: Briefcase, href: 'https://linkedin.com' },
                { title: 'YouTube', icon: Play, href: 'https://youtube.com' },
              ].map((soc, sIdx) => {
                const SocIcon = soc.icon;
                return (
                  <a
                    key={sIdx}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#006a39] hover:border-[#006a39] hover:bg-[#e9f0e7] transition-all flex items-center justify-center"
                    title={soc.title}
                  >
                    <SocIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#006a39] font-display">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Home className="w-4 h-4 text-[#006a39]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-4 h-4 text-[#006a39]" />
                  <span>About</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('universities')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-[#006a39]" />
                  <span>Universities</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-[#006a39]" />
                  <span>Courses</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('scholarships')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-[#006a39]" />
                  <span>Scholarships</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('careers')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4 text-[#006a39]" />
                  <span>Career Explorer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#006a39] font-display">
              Quick Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActiveTab('subject-checker')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <ListChecks className="w-4 h-4 text-[#006a39]" />
                  <span>Subject Checker</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('subject-checker')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <FileCheck className="w-4 h-4 text-[#006a39]" />
                  <span>Requirements Checker</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('universities')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-[#006a39]" />
                  <span>Find Universities</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <BookOpenText className="w-4 h-4 text-[#006a39]" />
                  <span>JAMB Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cbt-practice')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Monitor className="w-4 h-4 text-[#006a39]" />
                  <span>CBT Practice</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('study-planner')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <CalendarDays className="w-4 h-4 text-[#006a39]" />
                  <span>Study Planner</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Learning Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#006a39] font-display">
              Learning
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActiveTab('past-questions')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <History className="w-4 h-4 text-[#006a39]" />
                  <span>Past Questions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#006a39]" />
                  <span>JAMB Syllabus</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('textbooks')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <BookMarked className="w-4 h-4 text-[#006a39]" />
                  <span>Textbooks</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('news')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Newspaper className="w-4 h-4 text-[#006a39]" />
                  <span>Blog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('news')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Megaphone className="w-4 h-4 text-[#006a39]" />
                  <span>News &amp; Updates</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#006a39] font-display">
              Support
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActiveTab('help-centre')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-[#006a39]" />
                  <span>Help Centre</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('help-centre')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-[#006a39]" />
                  <span>FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('help-centre')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Headphones className="w-4 h-4 text-[#006a39]" />
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAlert("Privacy Policy", "JAMB Compass prioritizes your data privacy. All student scores, study logs, and user preferences are handled securely in accordance with NDPR standards.")}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-[#006a39]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleAlert("Terms of Service", "JAMB Compass is a free educational portal providing study guidance, syllabus breakdowns, and cut-off score calculators for candidates across Nigeria.")}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Scale className="w-4 h-4 text-[#006a39]" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('platform-status')}
                  className="text-slate-700 hover:text-[#006a39] transition-colors flex items-center gap-1.5"
                >
                  <Bug className="w-4 h-4 text-[#006a39]" />
                  <span>Report a Problem</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 6: Stay Updated (Newsletter) */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#006a39] font-display">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Get official 2026 JAMB cut-off alerts, registration deadlines, and study tips sent to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#006a39] focus:border-transparent outline-none text-slate-800"
                />
                <button
                  type="submit"
                  className="bg-[#006a39] hover:bg-[#008649] text-white px-3 py-2 rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center"
                  title="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500 block">We respect your privacy. No spam.</span>
            </form>

            {subscribed && (
              <div className="p-2 rounded-xl bg-emerald-50 text-[#006a39] border border-emerald-200 text-[11px] font-bold flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#006a39]" />
                <span>Subscribed successfully!</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="border-t border-[#bdcabc]/40 bg-white/60 py-6 px-4 sm:px-6 text-xs text-slate-600">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          {/* Left Copyright */}
          <div className="font-medium text-slate-600">
            © 2026 JAMB Compass. All Rights Reserved.
          </div>

          {/* Center Motto */}
          <div className="font-bold text-[#006a39] text-xs">
            Guiding Students. Building Futures. Transforming Nigeria.
          </div>

          {/* Right Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 font-medium text-[11px]">
            <button 
              onClick={() => handleAlert("Privacy Policy", "JAMB Compass protects user data.")}
              className="hover:text-[#006a39] transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => handleAlert("Terms of Service", "JAMB Compass educational terms.")}
              className="hover:text-[#006a39] transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button 
              onClick={() => handleAlert("Cookie Policy", "Essential cookies are used to keep track of your practice exam progress.")}
              className="hover:text-[#006a39] transition-colors"
            >
              Cookies
            </button>
            <span>•</span>
            <button 
              onClick={() => handleAlert("Accessibility", "JAMB Compass is designed according to WCAG contrast standards.")}
              className="hover:text-[#006a39] transition-colors"
            >
              Accessibility
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};
