import React, { useState, useMemo } from 'react';
import { TabType, University, Course } from '../types';

interface AdmissionScreenProps {
  setActiveTab?: (tab: TabType) => void;
  onSelectUniversity?: (univ: University) => void;
  onSelectCourse?: (course: Course) => void;
}

export interface CapsStatusItem {
  id: string;
  code: string;
  title: string;
  meaning: string;
  nextStep: string;
  helpfulTips: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
}

const CAPS_STATUSES: CapsStatusItem[] = [
  {
    id: 'not-admitted',
    code: 'NA',
    title: 'Not Admitted / Pending',
    meaning: 'Your application is currently under review by your institution or JAMB. Admission lists are released in batches throughout the 2026 cycle.',
    nextStep: 'Check your CAPS portal twice weekly and confirm your O’Level results are properly uploaded.',
    helpfulTips: 'Do not panic if first batch is out. Universities release 2nd, 3rd, and supplementary lists through October 2026.',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/40 border-amber-300',
    badgeText: 'text-amber-800 dark:text-amber-300',
    icon: 'hourglass_empty'
  },
  {
    id: 'awaiting-screening',
    code: 'AS',
    title: 'Awaiting Screening / Verification',
    meaning: 'Your UTME score meets the general cut-off mark. You are awaiting post-UTME online screening or physical document verification at your target university.',
    nextStep: 'Register for your target institution’s 2026 Post-UTME screening form before the published deadline.',
    helpfulTips: 'Ensure your O’Level grade breakdown matches your official WAEC/NECO statement of result exactly.',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300',
    badgeText: 'text-[#2563EB] dark:text-blue-300',
    icon: 'pending_actions'
  },
  {
    id: 'screening-completed',
    code: 'SC',
    title: 'Screening Completed & Verified',
    meaning: 'Your post-UTME aggregate score and O’Level grades have been calculated and verified by the university admission office.',
    nextStep: 'Await departmental merit list compilation and institutional recommendation to JAMB CAPS.',
    helpfulTips: 'Track your aggregate score against the official 2026 departmental cut-off mark for your course.',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40 border-purple-300',
    badgeText: 'text-purple-700 dark:text-purple-300',
    icon: 'task_alt'
  },
  {
    id: 'admission-processing',
    code: 'ADP',
    title: 'Admission Being Processed (ADP)',
    meaning: 'Your institution has selected your profile and recommended you to JAMB for final clearance and matriculation number assignment.',
    nextStep: 'Monitor your CAPS portal daily. "Admission Offered" usually appears within 48 to 72 hours of ADP status.',
    helpfulTips: 'This status indicates a 95%+ probability of receiving a final admission offer for 2026.',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300',
    badgeText: 'text-[#0F9D58] dark:text-[#82FAAB]',
    icon: 'published_with_changes'
  },
  {
    id: 'admission-offered',
    code: 'AO',
    title: 'Admission Offered (CONGRATULATIONS)',
    meaning: 'JAMB and your chosen institution have formally offered you provisional admission for the 2026 academic session!',
    nextStep: 'Click "Accept Admission" on CAPS within 14 days to lock your seat and generate your admission letter.',
    helpfulTips: 'Accepting admission is final. If you reject, your profile will be placed in the 2026 CAPS marketplace.',
    badgeBg: 'bg-emerald-600 text-white border-emerald-500 animate-pulse',
    badgeText: 'text-white',
    icon: 'verified'
  },
  {
    id: 'admission-accepted',
    code: 'AA',
    title: 'Admission Accepted',
    meaning: 'You have formally accepted your 2026 admission offer on JAMB CAPS. Your provisional admission letter is ready for printing.',
    nextStep: 'Print your original JAMB Admission Letter and UTME Result Slip, then proceed with university online clearance.',
    helpfulTips: 'Keep 5 color copies of your printed JAMB admission letter for physical faculty screening.',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300',
    badgeText: 'text-[#0F9D58] dark:text-[#82FAAB]',
    icon: 'task_alt'
  }
];

const ADMISSION_STAGES = [
  { id: 'stage-1', label: 'Registration', desc: 'NIN creation & e-PIN purchase', date: 'Jan 15, 2026', icon: 'how_to_reg' },
  { id: 'stage-2', label: 'UTME Completed', desc: 'Computer Based Test sittings', date: 'April 20, 2026', icon: 'edit_note' },
  { id: 'stage-3', label: 'Result Available', desc: 'UTME score portal check', date: 'May 05, 2026', icon: 'insights' },
  { id: 'stage-4', label: 'Institution Screening', desc: 'Post-UTME form & O’Level upload', date: 'August 10, 2026', icon: 'school' },
  { id: 'stage-5', label: 'Admission Processing', desc: 'University recommendation to JAMB', date: 'Sept 15, 2026', icon: 'published_with_changes' },
  { id: 'stage-6', label: 'Admission Offered', desc: 'Provisional offer on CAPS', date: 'Oct 12, 2026', icon: 'verified' },
  { id: 'stage-7', label: 'Admission Accepted', desc: 'Candidate acceptance on CAPS', date: 'Oct 14, 2026', icon: 'task_alt' },
  { id: 'stage-8', label: 'School Clearance', desc: 'Faculty physical registration', date: 'Nov 01, 2026', icon: 'account_balance' },
];

const NEXT_ACTION_ITEMS = [
  {
    id: 'act-1',
    title: 'Check Official JAMB CAPS Portal',
    desc: 'Log in to efacility.jamb.gov.ng using your 2026 email credentials and request desktop view to check CAPS.',
    priority: 'High Priority',
    priorityColor: 'bg-rose-100 text-rose-700 border-rose-300',
    icon: 'open_in_new',
    actionType: 'open-caps-guide'
  },
  {
    id: 'act-2',
    title: 'Accept 2026 Admission Offer',
    desc: 'Click "Accept Admission" on CAPS within 14 days to preserve your provisional admission slot.',
    priority: 'Mandatory',
    priorityColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    icon: 'thumb_up',
    actionType: 'accept-demo'
  },
  {
    id: 'act-3',
    title: 'Print Official JAMB Admission Letter',
    desc: 'Generate your official 2026 admission letter for physical verification during campus screening.',
    priority: 'Mandatory',
    priorityColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    icon: 'print',
    actionType: 'print-letter'
  },
  {
    id: 'act-4',
    title: 'Prepare School Clearance Documents',
    desc: 'Gather WAEC/NECO statements, NIN slip, birth certificate, testimonials, and 12 passport photographs.',
    priority: 'Recommended',
    priorityColor: 'bg-blue-100 text-[#2563EB] border-blue-300',
    icon: 'folder_shared',
    actionType: 'checklist-scroll'
  },
  {
    id: 'act-5',
    title: 'Pay Institutional Acceptance Fee',
    desc: 'Pay your university acceptance fee through the school’s official student portal before the matriculation deadline.',
    priority: 'Required',
    priorityColor: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: 'payments',
    actionType: 'payments-info'
  },
  {
    id: 'act-6',
    title: 'Apply for NELFUND Student Loan 2026',
    desc: 'Access interest-free tuition funding and monthly stipends via the Nigerian Education Loan Fund portal.',
    priority: 'Optional Aid',
    priorityColor: 'bg-purple-100 text-purple-700 border-purple-300',
    icon: 'account_balance_wallet',
    actionType: 'nelfund-info'
  }
];

const TIMELINE_2026_EVENTS = [
  {
    date: 'January 15 – February 26, 2026',
    title: 'UTME Registration & Profile Code Creation',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    desc: 'NIN linking via 55019/66019 SMS, e-PIN purchase at commercial banks, and biometric capture.'
  },
  {
    date: 'March 07, 2026',
    title: 'Official Proctored Mock UTME Exam',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    desc: 'Optional practice exam across 700+ accredited CBT centers to familiarize students with timing.'
  },
  {
    date: 'April 18 – April 28, 2026',
    title: 'Main Unified Tertiary Matriculation Examination (UTME)',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    desc: 'Nationwide CBT examinations for over 1.9 million 2026 candidates.'
  },
  {
    date: 'May 05, 2026',
    title: 'UTME Result Release & Score Cards',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    desc: 'Results released via candidate dashboards and 55019 SMS score query service.'
  },
  {
    date: 'July 10 – August 30, 2026',
    title: 'Post-UTME Screenings & O’Level Uploads',
    status: 'Active Phase',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse',
    desc: 'Federal, State, and Private universities conduct post-UTME tests and verify O’Level results.'
  },
  {
    date: 'September 01 – October 15, 2026',
    title: 'JAMB CAPS Admission List Releases',
    status: 'Ongoing',
    statusColor: 'bg-blue-100 text-[#2563EB] border-blue-300',
    desc: 'Batch release of merit, catchment, and ELDS admission offers on the CAPS portal.'
  },
  {
    date: 'October 15 – November 15, 2026',
    title: 'Admission Offer Acceptance & Letter Printing',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    desc: 'Candidates accept admission offers on CAPS and print official admission credentials.'
  },
  {
    date: 'November 20, 2026',
    title: 'Freshers Physical Registration & Resumption',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    desc: 'Document screening, hostel allocation, and lecture commencement for 2026 session.'
  }
];

const FAQS_CAPS = [
  {
    question: 'What is JAMB CAPS and why is it mandatory for 2026 admissions?',
    answer: 'The Central Admissions Processing System (CAPS) is JAMB’s automated portal created to ensure transparency, eliminate backdoor admissions, and empower candidates to accept or reject provisional admission offers directly.'
  },
  {
    question: 'How do I accept or reject my 2026 admission offer on CAPS?',
    answer: 'Log in to efacility.jamb.gov.ng, select "Check Admission Status", switch your mobile browser to "Desktop Site View", click "Access my CAPS", navigate to "Admission Status", and click "Accept Admission".'
  },
  {
    question: 'What should I do if my status displays "Admission Being Processed"?',
    answer: 'This indicates that your institution has selected your profile and sent your recommendation to JAMB. No further action is required; check back within 48 to 72 hours for "Admission Offered".'
  },
  {
    question: 'Can my admission status change after accepting it on CAPS?',
    answer: 'Once you click "Accept Admission" on CAPS, your decision is permanent and your 2026 matriculation seat is secured. Your status will not revert.'
  },
  {
    question: 'Where do I verify my official, binding admission status?',
    answer: 'Always verify your official admission status directly on the official JAMB e-Facility portal (efacility.jamb.gov.ng) and your institution’s official student portal.'
  }
];

export const AdmissionScreen: React.FC<AdmissionScreenProps> = ({
  setActiveTab,
  onSelectUniversity,
  onSelectCourse
}) => {
  // Toast Feedback State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Dark Focus Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Search / Demo Journey State
  const [searchYear, setSearchYear] = useState<string>('2026');
  const [searchUniv, setSearchUniv] = useState<string>('University of Ibadan (UI)');
  const [searchCourse, setSearchCourse] = useState<string>('Computer Science');
  const [searchRoute, setSearchRoute] = useState<'UTME' | 'Direct Entry'>('UTME');

  // Demo Status Switcher State
  const [demoStatus, setDemoStatus] = useState<'Admission Offered' | 'Admission Being Processed' | 'Awaiting Screening' | 'Admission Accepted' | 'Not Admitted'>('Admission Offered');
  const [isAcceptedDemo, setIsAcceptedDemo] = useState<boolean>(false);

  // Interactive Stage Step (1 to 8)
  const [activeStageIdx, setActiveStageIdx] = useState<number>(5); // 0-indexed: stage 6 = Admission Offered

  // Interactive Requirements Checklist State (IDs of checked items)
  const [checkedDocIds, setCheckedDocIds] = useState<string[]>([
    'doc-jamb-letter',
    'doc-olevel',
    'doc-nin',
    'doc-birth',
    'doc-utme-slip'
  ]);

  const allChecklistDocs = [
    { id: 'doc-jamb-letter', name: 'Official JAMB Admission Letter (2026)', required: true },
    { id: 'doc-olevel', name: 'Verified O’Level Statement of Results (5 Credits)', required: true },
    { id: 'doc-nin', name: 'National Identification Number (NIN) Slip', required: true },
    { id: 'doc-birth', name: 'Birth Certificate or Sworn Declaration of Age', required: true },
    { id: 'doc-utme-slip', name: 'Original 2026 UTME Result Slip', required: true },
    { id: 'doc-passports', name: 'Recent Passport Photographs (Red Background, 12 Copies)', required: true },
    { id: 'doc-acceptance-fee', name: 'University Acceptance Fee Payment Receipt', required: false },
    { id: 'doc-medical', name: 'Medical Fitness Certificate from University Health Centre', required: false },
  ];

  const toggleDocCheck = (id: string, name: string) => {
    if (checkedDocIds.includes(id)) {
      setCheckedDocIds(prev => prev.filter(i => i !== id));
      triggerToast(`Unchecked "${name}"`);
    } else {
      setCheckedDocIds(prev => [...prev, id]);
      triggerToast(`Marked "${name}" as ready! ✔️`);
    }
  };

  const readinessPercent = Math.round((checkedDocIds.length / allChecklistDocs.length) * 100);

  // Modals
  const [showCapsGuideModal, setShowCapsGuideModal] = useState<boolean>(false);
  const [showPrintLetterModal, setShowPrintLetterModal] = useState<boolean>(false);

  // Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Handle Accept Admission Demo
  const handleAcceptDemo = () => {
    if (demoStatus === 'Admission Accepted' || isAcceptedDemo) {
      triggerToast('You have already accepted your 2026 admission offer!');
      return;
    }
    setIsAcceptedDemo(true);
    setDemoStatus('Admission Accepted');
    setActiveStageIdx(6); // Stage 7: Admission Accepted
    triggerToast('🎉 Congratulations! Demo Admission Offer ACCEPTED on JAMB CAPS 2026.');
  };

  const handleResetSearch = () => {
    setSearchYear('2026');
    setSearchUniv('University of Ibadan (UI)');
    setSearchCourse('Computer Science');
    setSearchRoute('UTME');
    setDemoStatus('Admission Offered');
    setIsAcceptedDemo(false);
    setActiveStageIdx(5);
    triggerToast('Reset to default 2026 demo journey.');
  };

  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'} pb-24`}>
      {/* Toast Notification */}
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
            <span>Admission</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#0F9D58] font-bold">CAPS Tracker (2026)</span>
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

      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>2026 JAMB CAPS Educational Hub</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              JAMB CAPS – <span className="text-[#82FAAB]">Admission Status Tracker</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Understand your admission journey, learn what each admission stage means, and prepare for your next steps during the 2026 admission cycle.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('demo-journey-card');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">explore</span>
                <span>View Demo Admission Journey</span>
              </button>
              <button
                onClick={() => setShowCapsGuideModal(true)}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">help_outline</span>
                <span>Learn How CAPS Works</span>
              </button>
            </div>
          </div>

          {/* Hero Digital Illustration Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    🎓
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">CAPS Status Portal</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">2026 Cycle Demo</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Verified Guide
                </span>
              </div>

              {/* Illustration Components List */}
              <div className="space-y-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#82FAAB] text-xl">school</span>
                    <div>
                      <p className="text-xs font-bold text-white">University Admission</p>
                      <p className="text-[10px] text-slate-300">UTME &amp; Direct Entry Pathways</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#82FAAB]">2026</span>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-300 text-xl">fact_check</span>
                    <div>
                      <p className="text-xs font-bold text-white">Digital Progress Tracker</p>
                      <p className="text-[10px] text-slate-300">8 Milestone Stages</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-300">Active</span>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-300 text-xl">notifications_active</span>
                    <div>
                      <p className="text-xs font-bold text-white">Success Notification</p>
                      <p className="text-[10px] text-slate-300">Real-time status alerts</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-300">Live Demo</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic text-center pt-1">
                "Educational guide helping Nigerian students navigate CAPS with confidence."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* 1. BLUE INFORMATION NOTICE BANNER */}
        <div className="bg-gradient-to-r from-[#2563EB]/10 via-[#2563EB]/5 to-transparent border border-[#2563EB]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
              ℹ️
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold font-display text-[#0F172A] dark:text-white flex items-center gap-2">
                <span>Demo Admission Tracker</span>
                <span className="text-[10px] bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full font-bold uppercase">
                  Educational Simulation
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed max-w-3xl">
                This dashboard demonstrates the admission process using placeholder information for the 2026 cycle. Always verify your official admission status through the JAMB CAPS portal (<code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">efacility.jamb.gov.ng</code>) and your institution.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCapsGuideModal(true)}
            className="py-3 px-6 bg-[#2563EB] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-blue-700 transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">info</span>
            <span>Learn About CAPS</span>
          </button>
        </div>

        {/* 2. SEARCH & FILTER PANEL */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Admission Journey Filter</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Customize Demo Admission Journey (2026)
              </h2>
            </div>

            <button
              onClick={handleResetSearch}
              className="py-2 px-4 bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:text-[#0F9D58] text-xs font-bold rounded-xl border border-[#E2E8F0] dark:border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Reset Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Field 1: Admission Year */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Admission Year</label>
              <select
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
                className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="2026">2026 Cycle (Current)</option>
                <option value="2025">2025 Cycle (Archived)</option>
              </select>
            </div>

            {/* Field 2: Target Institution */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Institution</label>
              <select
                value={searchUniv}
                onChange={(e) => setSearchUniv(e.target.value)}
                className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="University of Ibadan (UI)">University of Ibadan (UI)</option>
                <option value="University of Lagos (UNILAG)">University of Lagos (UNILAG)</option>
                <option value="Ahmadu Bello University (ABU)">Ahmadu Bello University (ABU)</option>
                <option value="University of Nigeria, Nsukka (UNN)">University of Nigeria, Nsukka (UNN)</option>
                <option value="Obafemi Awolowo University (OAU)">Obafemi Awolowo University (OAU)</option>
                <option value="Covenant University (CU)">Covenant University (CU)</option>
                <option value="University of Port Harcourt (UNIPORT)">University of Port Harcourt (UNIPORT)</option>
              </select>
            </div>

            {/* Field 3: Target Course */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Course of Study</label>
              <select
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Medicine &amp; Surgery">Medicine &amp; Surgery</option>
                <option value="Law (LL.B)">Law (LL.B)</option>
                <option value="Nursing Science">Nursing Science</option>
                <option value="Accounting &amp; Finance">Accounting &amp; Finance</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>

            {/* Field 4: Admission Route Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Admission Route</label>
              <div className="flex rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 p-1">
                <button
                  type="button"
                  onClick={() => setSearchRoute('UTME')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    searchRoute === 'UTME'
                      ? 'bg-[#0F9D58] text-white shadow-sm'
                      : 'text-[#475569] dark:text-slate-300 hover:text-[#0F9D58]'
                  }`}
                >
                  UTME
                </button>
                <button
                  type="button"
                  onClick={() => setSearchRoute('Direct Entry')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    searchRoute === 'Direct Entry'
                      ? 'bg-[#0F9D58] text-white shadow-sm'
                      : 'text-[#475569] dark:text-slate-300 hover:text-[#0F9D58]'
                  }`}
                >
                  Direct Entry
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-slate-300">
              <span className="font-bold">Test Status Mode:</span>
              <button
                onClick={() => {
                  setDemoStatus('Admission Offered');
                  setActiveStageIdx(5);
                  triggerToast('Switched demo status to "Admission Offered"');
                }}
                className={`px-3 py-1 rounded-full border text-[11px] font-bold ${
                  demoStatus === 'Admission Offered' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Offered
              </button>
              <button
                onClick={() => {
                  setDemoStatus('Admission Being Processed');
                  setActiveStageIdx(4);
                  triggerToast('Switched demo status to "Admission Being Processed"');
                }}
                className={`px-3 py-1 rounded-full border text-[11px] font-bold ${
                  demoStatus === 'Admission Being Processed' ? 'bg-amber-500 text-white border-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Processing (ADP)
              </button>
              <button
                onClick={() => {
                  setDemoStatus('Awaiting Screening');
                  setActiveStageIdx(3);
                  triggerToast('Switched demo status to "Awaiting Screening"');
                }}
                className={`px-3 py-1 rounded-full border text-[11px] font-bold ${
                  demoStatus === 'Awaiting Screening' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Awaiting Screening
              </button>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('demo-journey-card');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                triggerToast(`Updated demo journey for ${searchUniv} - ${searchCourse}`);
              }}
              className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>View Demo Journey</span>
            </button>
          </div>
        </section>

        {/* 3. ADMISSION STATUS CARD */}
        <section id="demo-journey-card" className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          {/* Subtle Background Glow Accent */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#0F9D58]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-6 border-[#E2E8F0] dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold px-3 py-1 rounded-full border border-[#0F9D58]/30">
                  Admission Cycle: {searchYear}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700">
                  Route: {searchRoute}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] dark:text-white pt-1">
                {searchUniv}
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 font-medium">
                Course of Study: <strong className="text-[#0F172A] dark:text-white">{searchCourse}</strong> • Candidate: <span className="text-[#0F9D58] font-bold">Demo Student (2026456789XX)</span>
              </p>
            </div>

            {/* Current Status Badge */}
            <div className="flex flex-col items-start md:items-end space-y-2">
              <span className="text-[11px] text-[#475569] dark:text-slate-300 uppercase tracking-wider font-bold">Current CAPS Status</span>
              <div className="flex items-center gap-2">
                <span className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 border ${
                  demoStatus === 'Admission Offered' || demoStatus === 'Admission Accepted'
                    ? 'bg-[#16A34A] text-white border-emerald-500 shadow-lg animate-pulse'
                    : demoStatus === 'Admission Being Processed'
                    ? 'bg-amber-500 text-white border-amber-400'
                    : 'bg-blue-600 text-white border-blue-500'
                }`}>
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>{demoStatus} (Demo)</span>
                </span>
              </div>
              <span className="text-[10px] text-[#475569] dark:text-slate-400">
                Last Updated: Oct 14, 2026 • Verified 2026 Batch
              </span>
            </div>
          </div>

          {/* Quick Details Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700">
              <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">UTME Score</span>
              <p className="text-lg font-bold text-[#0F9D58] font-display">285 / 400</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700">
              <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Post-UTME Aggregate</span>
              <p className="text-lg font-bold text-[#2563EB] font-display">82.5%</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700">
              <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">O’Level Credits</span>
              <p className="text-lg font-bold text-emerald-600 font-display">5 Distinctions</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700">
              <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Choice Category</span>
              <p className="text-lg font-bold text-[#0F172A] dark:text-white font-display">1st Choice Merit</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCapsGuideModal(true)}
              className="py-3 px-6 bg-[#0F172A] dark:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              <span>Check Official CAPS Portal</span>
            </button>

            <button
              onClick={handleAcceptDemo}
              className={`py-3 px-6 font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 ${
                isAcceptedDemo
                  ? 'bg-emerald-700 text-white cursor-default'
                  : 'bg-[#0F9D58] hover:bg-[#16A34A] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isAcceptedDemo ? 'check_circle' : 'thumb_up'}
              </span>
              <span>{isAcceptedDemo ? 'Admission Accepted (Demo)' : 'Accept Admission (Demo)'}</span>
            </button>

            <button
              onClick={() => setShowPrintLetterModal(true)}
              className="py-3 px-6 bg-white dark:bg-slate-800 text-[#0F9D58] dark:text-[#82FAAB] font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#0F9D58]/10 border border-[#0F9D58] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Print Sample Admission Letter</span>
            </button>
          </div>
        </section>

        {/* 4. ADMISSION PROGRESS TRACKER */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Milestone Pipeline</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Interactive 2026 Admission Progress Tracker
              </h2>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400 font-medium">
              Click any stage to inspect detailed requirements and milestone dates.
            </p>
          </div>

          {/* Horizontal / Responsive Stepper Bar */}
          <div className="py-4 overflow-x-auto w-full max-w-full scrollbar-none">
            <div className="min-w-[800px] flex items-center justify-between relative px-4">
              {/* Connecting Line */}
              <div className="absolute top-7 left-10 right-10 h-1 bg-[#E2E8F0] dark:bg-slate-700 -z-0"></div>
              <div
                className="absolute top-7 left-10 h-1 bg-[#0F9D58] transition-all duration-500 -z-0"
                style={{ width: `${(activeStageIdx / (ADMISSION_STAGES.length - 1)) * 92}%` }}
              ></div>

              {ADMISSION_STAGES.map((stg, idx) => {
                const isCompleted = idx <= activeStageIdx;
                const isCurrent = idx === activeStageIdx;

                return (
                  <button
                    key={stg.id}
                    onClick={() => {
                      setActiveStageIdx(idx);
                      triggerToast(`Inspecting Stage ${idx + 1}: ${stg.label}`);
                    }}
                    className="flex flex-col items-center group relative z-10 focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#0F9D58] text-white ring-4 ring-[#0F9D58]/30 scale-110 shadow-lg'
                          : isCompleted
                          ? 'bg-[#16A34A] text-white shadow-md'
                          : 'bg-white dark:bg-slate-800 text-[#475569] border border-[#E2E8F0] dark:border-slate-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{stg.icon}</span>
                    </div>

                    <span className={`text-xs font-bold mt-2 text-center max-w-[90px] ${
                      isCurrent ? 'text-[#0F9D58] dark:text-[#82FAAB]' : isCompleted ? 'text-[#0F172A] dark:text-white' : 'text-[#475569]'
                    }`}>
                      {stg.label}
                    </span>

                    <span className="text-[10px] text-[#475569] dark:text-slate-400 mt-0.5">
                      {stg.date}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Details Card */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/20 text-[#0F9D58] flex items-center justify-center text-2xl font-bold shrink-0">
                <span className="material-symbols-outlined">{ADMISSION_STAGES[activeStageIdx].icon}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#0F9D58] uppercase">
                  Stage {activeStageIdx + 1} of 8 • {ADMISSION_STAGES[activeStageIdx].date}
                </span>
                <h4 className="text-base font-bold text-[#0F172A] dark:text-white">
                  {ADMISSION_STAGES[activeStageIdx].label}
                </h4>
                <p className="text-xs text-[#475569] dark:text-slate-300">
                  {ADMISSION_STAGES[activeStageIdx].desc}
                </p>
              </div>
            </div>

            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#0F9D58]/10 text-[#0F9D58] border border-[#0F9D58]/30 shrink-0">
              {activeStageIdx <= 5 ? 'Status Active' : 'Completed Stage'}
            </span>
          </div>
        </section>

        {/* 5. STATUS EXPLANATION SECTION */}
        <section className="space-y-6">
          <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Guide &amp; Terminology</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Understanding JAMB CAPS Status Codes
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              Learn what each official status message means during the 2026 admission process and what next step to take.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPS_STATUSES.map((item) => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${item.badgeBg} ${item.badgeText}`}>
                      {item.code} • {item.title}
                    </span>
                    <span className="material-symbols-outlined text-slate-400">{item.icon}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                    <strong className="text-[#0F172A] dark:text-white block mb-1">Meaning:</strong>
                    {item.meaning}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#0F9D58] block">Typical Next Step:</span>
                    <span className="text-[#475569] dark:text-slate-300">{item.nextStep}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    💡 <strong>Tip:</strong> {item.helpfulTips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. NEXT ACTIONS SECTION */}
        <section className="space-y-6">
          <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Candidate Recommended Action Plan</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Immediate Next Steps (2026 Cycle)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEXT_ACTION_ITEMS.map((act) => (
              <div
                key={act.id}
                onClick={() => {
                  if (act.actionType === 'open-caps-guide') setShowCapsGuideModal(true);
                  else if (act.actionType === 'accept-demo') handleAcceptDemo();
                  else if (act.actionType === 'print-letter') setShowPrintLetterModal(true);
                  else if (act.actionType === 'checklist-scroll') {
                    const el = document.getElementById('checklist-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (act.actionType === 'nelfund-info') {
                    if (setActiveTab) setActiveTab('scholarships');
                  } else {
                    triggerToast(`Selected: ${act.title}`);
                  }
                }}
                className={`p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4 ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">{act.icon}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${act.priorityColor}`}>
                      {act.priority}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0F9D58] group-hover:translate-x-1 transition-transform">
                  <span>Take Action</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ADMISSION REQUIREMENTS CHECKLIST */}
        <section id="checklist-section" className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Campus Screening Readiness</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                2026 Physical Document Verification Checklist
              </h2>
            </div>

            {/* Completion Percentage Progress Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs text-[#475569] dark:text-slate-400 block font-medium">Clearance Readiness</span>
                <span className="text-lg font-bold text-[#0F9D58] font-display">{readinessPercent}% Ready</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-[#0F9D58] flex items-center justify-center text-xs font-bold text-[#0F9D58] font-display">
                {checkedDocIds.length}/{allChecklistDocs.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-[#E2E8F0] dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0F9D58] to-[#16A34A] transition-all duration-500"
              style={{ width: `${readinessPercent}%` }}
            ></div>
          </div>

          {/* Interactive Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {allChecklistDocs.map((doc) => {
              const isChecked = checkedDocIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDocCheck(doc.id, doc.name)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isChecked
                      ? 'bg-[#0F9D58]/10 border-[#0F9D58]/40 dark:bg-[#0F9D58]/20'
                      : 'bg-[#F8FAFC] dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isChecked ? 'bg-[#0F9D58] text-white' : 'border-2 border-slate-400 bg-white dark:bg-slate-700'
                    }`}>
                      {isChecked && <span className="material-symbols-outlined text-sm">check</span>}
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${
                      isChecked ? 'text-[#0F172A] dark:text-white' : 'text-[#475569] dark:text-slate-300'
                    }`}>
                      {doc.name}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    doc.required
                      ? 'bg-rose-100 text-rose-700 border-rose-200'
                      : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}>
                    {doc.required ? 'Mandatory' : 'Optional'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. 2026 ADMISSION TIMELINE & INSIGHTS BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Timeline Column */}
          <div className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Official 2026 Calendar</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                2026 JAMB Admission Cycle Timeline
              </h2>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0] dark:before:bg-slate-700">
              {TIMELINE_2026_EVENTS.map((evt, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-800 border-4 border-[#0F9D58] group-hover:scale-125 transition-transform"></div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-bold text-[#0F9D58]">{evt.date}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${evt.statusColor}`}>
                        {evt.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-[#475569] dark:text-slate-300">
                      {evt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Insights & Circular Progress Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Analytics</span>
                <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
                  Admission Readiness Insights
                </h3>
              </div>

              {/* Circular Indicators Grid */}
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white block">Admission Readiness</span>
                    <span className="text-[10px] text-[#475569]">Based on cut-off &amp; score</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-[#0F9D58] flex items-center justify-center font-bold text-xs text-[#0F9D58] font-display">
                    85%
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white block">Documents Completed</span>
                    <span className="text-[10px] text-[#475569]">{checkedDocIds.length} of {allChecklistDocs.length} verified</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-[#2563EB] flex items-center justify-center font-bold text-xs text-[#2563EB] font-display">
                    {checkedDocIds.length}/8
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white block">Timeline Progress</span>
                    <span className="text-[10px] text-[#475569]">Phase 5 of 8 active</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-amber-500 flex items-center justify-center font-bold text-xs text-amber-600 font-display">
                    75%
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                  <div>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-white block">Remaining Steps</span>
                    <span className="text-[10px] text-[#475569]">Acceptance &amp; clearance</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-600 font-display">
                    2 Steps
                  </div>
                </div>
              </div>
            </div>

            {/* Help & Resources Fast Links Card */}
            <div className={`p-6 rounded-3xl border shadow-lg space-y-4 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
              <h4 className="text-sm font-bold font-display text-[#0F172A] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">menu_book</span>
                <span>Help &amp; Educational Guides</span>
              </h4>

              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setShowCapsGuideModal(true)}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-[#0F9D58] font-semibold flex items-center justify-between"
                >
                  <span>Understanding CAPS Step-by-Step</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('faq-caps-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-[#0F9D58] font-semibold flex items-center justify-between"
                >
                  <span>2026 Admission FAQ</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
                <button
                  onClick={() => setActiveTab && setActiveTab('universities')}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-[#0F9D58] font-semibold flex items-center justify-between"
                >
                  <span>Nigerian University Directory</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 9. FAQ ACCORDION SECTION */}
        <section id="faq-caps-section" className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A] dark:text-white">
              CAPS Admission Tracker FAQs (2026)
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS_CAPS.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#0F172A] dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.question}</span>
                  <span className="material-symbols-outlined text-slate-400 shrink-0">
                    {openFaqIdx === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#475569] dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 10. CALL TO ACTION SECTION */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-14 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="bg-[#0F9D58] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              2026 Academic Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Prepare for Your Next Admission Step
            </h2>
            <p className="text-xs sm:text-base text-slate-200 leading-relaxed">
              Stay organised throughout the 2026 admission cycle and always verify official admission information through JAMB and your chosen institution.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab && setActiveTab('universities')}
                className="py-3.5 px-8 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">school</span>
                <span>Explore Universities</span>
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="py-3.5 px-8 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/30 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                <span>Return to Student Dashboard</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL: LEARN ABOUT CAPS GUIDE */}
      {showCapsGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#1C2541] text-white' : 'bg-white text-[#0F172A]'}`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0F9D58] text-3xl">verified_user</span>
                <div>
                  <h3 className="text-lg font-bold font-display">How to Access Official JAMB CAPS (2026)</h3>
                  <p className="text-xs text-[#475569] dark:text-slate-400">Step-by-step guidance for desktop &amp; mobile users</p>
                </div>
              </div>
              <button
                onClick={() => setShowCapsGuideModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
                📌 <strong>Important Mobile Tip:</strong> When using Chrome or Safari on a mobile phone, you MUST enable <strong>"Desktop Site"</strong> view in your browser settings to see the "Access my CAPS" menu.
              </div>

              <ol className="space-y-3 list-decimal pl-5">
                <li>Visit the official JAMB e-Facility portal at <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">efacility.jamb.gov.ng</code>.</li>
                <li>Log in using your registered 2026 email address and portal password.</li>
                <li>Locate and click on <strong>"Check Admission Status"</strong>.</li>
                <li>Select examination year <strong>2026</strong> and enter your UTME Registration Number.</li>
                <li>Click <strong>"Access my CAPS"</strong> in the left sidebar menu.</li>
                <li>Click on <strong>"Admission Status"</strong> to view your current status (e.g. Admission Offered).</li>
                <li>If offered, click <strong>"Accept Admission"</strong> or <strong>"Reject Admission"</strong>.</li>
              </ol>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
                ⚠️ <strong>Security Disclaimer:</strong> Never share your JAMB password or profile code with unauthorized third parties. JAMB Compass is an educational platform and does not request your confidential login credentials.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowCapsGuideModal(false)}
                className="py-2.5 px-6 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A]"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRINT SAMPLE ADMISSION LETTER PREVIEW */}
      {showPrintLetterModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0F9D58] text-3xl">print</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0F172A]">Sample JAMB Admission Letter (2026)</h3>
                  <p className="text-xs text-[#475569]">Educational preview representation</p>
                </div>
              </div>
              <button
                onClick={() => setShowPrintLetterModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Letter Content Preview */}
            <div className="border border-slate-300 rounded-2xl p-6 bg-slate-50 space-y-4 text-xs font-serif leading-relaxed text-slate-800">
              <div className="text-center border-b pb-3 border-slate-300">
                <h4 className="text-base font-bold text-[#0F9D58] font-sans">JOINT ADMISSIONS AND MATRICULATION BOARD</h4>
                <p className="text-[10px] font-sans text-slate-500">NATIONAL HEADQUARTERS, BWARI, ABUJA</p>
                <p className="text-xs font-bold font-sans mt-1 text-[#0F172A]">2026 PROVISIONAL ADMISSION LETTER</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                <div><strong>Candidate Name:</strong> Samuel Adebayo</div>
                <div><strong>Reg Number:</strong> 2026456789XX</div>
                <div><strong>Institution:</strong> {searchUniv}</div>
                <div><strong>Course:</strong> {searchCourse}</div>
                <div><strong>Faculty:</strong> Science / Engineering</div>
                <div><strong>Academic Session:</strong> 2026 / 2027</div>
              </div>

              <p>
                Dear Candidate,
              </p>
              <p>
                I am pleased to inform you that you have been offered provisional admission into <strong>{searchUniv}</strong> to pursue a course of study leading to the award of Bachelor of Science (B.Sc.) in <strong>{searchCourse}</strong> for the 2026 academic session.
              </p>
              <p>
                This offer is subject to the verification of your O’Level qualifications and physical document clearance at your target institution.
              </p>

              <div className="pt-4 flex justify-between items-end font-sans text-[10px] border-t border-slate-300 text-slate-500">
                <div>Official Verification Seal: 2026-CAPS-OK</div>
                <div>Registrar, JAMB</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">For demo purposes only</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    window.print();
                    triggerToast('Sent sample letter to browser print dialogue.');
                  }}
                  className="py-2.5 px-6 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] shadow"
                >
                  Print Document
                </button>
                <button
                  onClick={() => setShowPrintLetterModal(false)}
                  className="py-2.5 px-4 bg-slate-200 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
