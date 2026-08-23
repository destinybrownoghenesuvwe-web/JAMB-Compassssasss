import React, { useState, useMemo } from 'react';
import { TabType, NewsArticle } from '../types';

interface NewsScreenProps {
  onSelectArticle?: (article: NewsArticle) => void;
  setActiveTab?: (tab: TabType) => void;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullContent: string[];
  date: string; // 2026
  readTime: string;
  author: string;
  authorRole: string;
  imageUrl: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  trendingType?: 'Most Read' | 'Most Shared' | 'Editor\'s Pick' | 'Recently Published';
  tags: string[];
  keyPoints?: string[];
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'jamb-2026-utme-registration-guide',
    title: 'JAMB Releases Official 2026 UTME Registration Portal Guidelines & e-PIN Fee Adjustments',
    category: 'JAMB Updates',
    summary: 'The Joint Admissions and Matriculation Board (JAMB) has officially published updated guidelines for the 2026 UTME e-PIN registration, profile code generation, and accredited CBT centers.',
    fullContent: [
      'ABUJA — The Joint Admissions and Matriculation Board (JAMB) has formally announced the commencement of profile code creation and e-PIN vending for the 2026 Unified Tertiary Matriculation Examination (UTME).',
      'According to the official communique issued by the Registrar, all prospective 2026 candidates must generate their 10-digit profile code using a unique National Identification Number (NIN) tied to a single registered phone number.',
      'JAMB has introduced proctored biometric verification 2.0 across all 700+ accredited CBT examination centers to completely eliminate impersonation and technical delays during the exam window.',
      'Candidates are strictly advised to double-check their subject combination matching their target course requirements before confirming e-PIN purchases at commercial banks or online portals.'
    ],
    date: 'Feb 12, 2026',
    readTime: '4 min read',
    author: 'Dr. Fabian Benjamin',
    authorRole: 'Head of Public Affairs, JAMB',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOZW8F8oSIwelv6-HK194QpMP8mEGqCpUZ55teZORqt-JlyOjawfKSQ6kKNq8GQll09Yejy1fNV75f_vOK5f4EJRMuJO2pHoMUgEW11akLtoqltkXcscyYzNmPobjQyebtqKnw0bSOGfFXMVwajZzpHBrGzY35U1m_u13nVJr7O5zCCxFDe66-c3cXYyk5B064qhJhB68X0mPvBDNxcdjN19cbSGFnSYiwums-Gwq-7WPiWsoIacUIoQ',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    trendingType: 'Most Read',
    tags: ['JAMB 2026', 'UTME Registration', 'NIN Verification', 'CBT Center'],
    keyPoints: [
      'NIN linking is mandatory via 55019 or 66019 SMS service.',
      'Approved registration fee remains capped at official regulated price.',
      'Biometric 2.0 dual-thumb scanning deployed at all 2026 CBT venues.',
      'Mock exam registration is optional but strongly recommended for first-timers.'
    ]
  },
  {
    id: 'universities-2026-post-utme-guidance',
    title: 'Top Nigerian Universities Publish Joint 2026 Post-UTME Admission Benchmarks',
    category: 'Admissions',
    summary: 'Federal and State universities across Nigeria have released preliminary departmental cut-off marks and aggregate calculation matrices for the 2026 admission cycle.',
    fullContent: [
      'LAGOS / ABUJA — Vice-Chancellors of leading tertiary institutions including UNILAG, UI, ABU Zaria, UNN, and OAU have released synchronized admission screening blueprints for 2026 UTME candidates.',
      'Under the newly approved National Central Admission Processing System (CAPS) framework, candidate eligibility will be weighted based on 50% UTME Score, 30% Post-UTME Screening Test/Essay, and 20% O-Level Distinction Points.',
      'High-demand competitive courses like Medicine & Surgery, Software Engineering, Law, and Nursing Sciences have established 2026 baseline screening thresholds starting from 250 UTME score.'
    ],
    date: 'Feb 08, 2026',
    readTime: '5 min read',
    author: 'Prof. Toyin Ogundipe',
    authorRole: 'Committee Chair, Committee of Vice-Chancellors',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALdaeaOfBEXfJtXPn71LDpUrcwU6axwGA1N4ZM_iCX1qIQ7H16qLfuyz5yy5iphDtqFn6mUkZ5uRWD_hukY3_-87rafu8WZ03segdlvxgcYUl7shuKXwI3xbEJNnHvWXEQjyXed4fl4PXs2S2axxATk5jvqyUGP4aBtWgGPjKFjTxBKyp3xrfgUdzEGPFmC6WKXIMyuLiOoIW-Cr_oFWscqE5n7xy4IzN6NyACyXEw_1WgDywhkfCGXg',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    trendingType: "Editor's Pick",
    tags: ['Universities', 'Cut-off Marks', 'Post-UTME 2026', 'CAPS Portal'],
    keyPoints: [
      'CAPS automatic O-Level verification will cross-match WAEC/NECO scratch cards directly.',
      'Candidates seeking transfer between courses must submit change-of-course forms before August 2026.',
      'First-choice institutions hold primary screening priority.'
    ]
  },
  {
    id: 'nelfund-2026-undergraduate-expansion',
    title: 'NELFUND Expands Student Tuition & Upkeep Loan Coverage for All 2026 Freshers',
    category: 'Scholarships',
    summary: 'The Nigerian Education Loan Fund has announced full fee coverage and monthly ₦20,000 stipends for all verified 2026 undergraduate matriculants.',
    fullContent: [
      'ABUJA — The Management of the Nigerian Education Loan Fund (NELFUND) has expanded its digital portal for 2026 UTME applicants entering federal and state universities, polytechnics, and colleges of education.',
      'The interest-free loan automatically remits 100% of institutional tuition fees directly to school bursaries, while depositing monthly living upkeep allowances straight to verified student bank accounts.',
      'No physical guarantors are needed; verification is processed via BVN, NIN, and JAMB registration credentials.'
    ],
    date: 'Feb 01, 2026',
    readTime: '4 min read',
    author: 'Akintunde Sawyerr',
    authorRole: 'Managing Director, NELFUND',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrsy1woumbhF-FfLyyZ8NGAizwFUWE4t6JljE9t3mGdYNelTrimOc7f-KQvsn8Fhhg-KrM-hWr9a8aPdvZV102Y2_2M3mnzV7Q8PrB_uKKy5D4DWuILupoQO27ZGRIbdoN_1_YEnc_Re1EQXdFxDeuDGZPqexuk_y6ZnvXwui4bgsFVPJfgzpuItRBFoBPvxmejtd55JcG3beNhnAYPdUDmW5RaiRvnYxMVC--ikpD5cR2Zc9ymmyyNA',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    trendingType: 'Most Shared',
    tags: ['NELFUND', 'Financial Aid', 'Student Loans 2026', 'Tuition Support'],
    keyPoints: [
      'Zero interest rate with repayment delayed until 2 years post-NYSC.',
      '100% institutional tuition fees transferred directly to school bursaries.',
      'Monthly ₦20,000 stipend paid every 25th of the month.'
    ]
  },
  {
    id: 'how-to-prepare-for-2026-cbt-exam',
    title: 'Mastering the 2026 CBT Examination: Time Management & Speed Accuracy Hacks',
    category: 'CBT Practice',
    summary: 'Educational psychologists and top-scoring JAMB scholars share proven strategies for tackling 180 questions in 120 minutes with high precision.',
    fullContent: [
      'Preparing for the Computer Based Test (CBT) requires more than memorizing syllabus topics — it requires high speed, muscle memory, and strategic question prioritization under time pressure.',
      'Our analytics show that candidates who practice with proctored 120-minute timed mock exams score an average of 42 points higher than those who practice without time limits.',
      'Key tactics include tackling Use of English comprehension passages first, flagging calculation-heavy questions for review, and maintaining a steady 40-seconds-per-question pace.'
    ],
    date: 'Jan 28, 2026',
    readTime: '6 min read',
    author: 'Grace Adebayo',
    authorRole: 'Lead Learning Strategist, JAMB Compass',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6k9ltNQimOJMIyA-pbjZItn06eGaQfWoF7MNSuYEgESssmvK0ERA3ORyk7huKayN35EREux72Yzt1ABTC7LWcMpsiTasgrCQYialSSB-VnaTFZPoN7dRMACWbZHhCO3oyKChnDaDd5ALVzMUvUD6nfNs3X3p4diS-zJtu93B-FzKDRHZZHZnDoo7IiL6j1xmR9D9nuslbosgvyGaYD6t5I6DBovU6uBHM3SQY49GS7K5yzNwjXngcA',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    trendingType: 'Recently Published',
    tags: ['CBT Exam', 'Study Strategy', 'UTME 2026', 'Mock Exams'],
    keyPoints: [
      'Use shortcut keys (A, B, C, D, N, P, R) on the CBT keyboard to save up to 12 minutes.',
      'Target 100% accuracy on standard Use of English register questions.',
      'Never leave any question unanswered; JAMB does not penalize incorrect guesses.'
    ]
  },
  {
    id: 'common-admission-mistakes-2026',
    title: 'Top 5 Common Admission Mistakes to Avoid During the 2026 JAMB CAPS Screening',
    category: 'Study Tips',
    summary: 'Avoid costly errors such as uploading wrong O-Level grades, mismatched NIN names, or failing to accept CAPS admission offers before the deadline.',
    fullContent: [
      'Every admission cycle, thousands of qualified candidates lose university placements due to avoidable administrative errors on the JAMB Central Admissions Processing System (CAPS).',
      'First, ensure that your name order on your WAEC/NECO certificate matches your National Identification Number (NIN) exactly. Spelling discrepancies can block automatic CAPS verification.',
      'Second, confirm that your O-Level results have been successfully uploaded to the official JAMB portal by visiting an accredited CBT center or checking your candidate dashboard.'
    ],
    date: 'Jan 20, 2026',
    readTime: '5 min read',
    author: 'Ibrahim Bello',
    authorRole: 'Senior Admission Advisor',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPQuIzhb_QUv5E8KITTF-RnpHL3wUNqY8-SLo4xf4FLvqfTHyiUHj84El4qUOq6pFCkbXfBBUemhrC-ub73l82yhOz6ph0ClfPXqhKNqipt9ek-v8SdppfLWNqjCbwjOXKQpd2fwtxN9Z46TtQuFb_IPqgZ4eYj_p-QtzEywveH62djClLPaJCD6Hka_7xRy9LhZQPTywOAxTZxQwttc-34b7-70u3PoGzV71z_iKhgYjZ0JLFFB37eA',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    tags: ['CAPS Portal', 'O-Level Upload', 'Admission Advice', 'Errors to Avoid'],
    keyPoints: [
      'Accepting an admission offer on CAPS is irreversible — check your choice thoroughly.',
      'Always request an official printout after uploading O-Level results at a CBT center.',
      'Monitor your CAPS admission status at least twice weekly during the screening window.'
    ]
  }
];

const UNIVERSITY_ANNOUNCEMENTS_DATA = [
  {
    id: 'u-1',
    univName: 'University of Lagos (UNILAG)',
    shortCode: 'UNILAG',
    title: '2026 Post-UTME Online Screening Registration Schedule Released',
    date: 'Feb 10, 2026',
    badge: 'Screening',
    badgeColor: 'bg-[#0F9D58]/10 text-[#0F9D58]'
  },
  {
    id: 'u-2',
    univName: 'Ahmadu Bello University (ABU Zaria)',
    shortCode: 'ABU',
    title: 'Faculty of Engineering & Medical Sciences Cut-off Marks Approved',
    date: 'Feb 07, 2026',
    badge: 'Cut-off Marks',
    badgeColor: 'bg-blue-100 text-[#2563EB]'
  },
  {
    id: 'u-3',
    univName: 'University of Ibadan (UI)',
    shortCode: 'UI',
    title: 'Direct Entry Verification Portal Active for 2026 Candidates',
    date: 'Feb 03, 2026',
    badge: 'Direct Entry',
    badgeColor: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'u-4',
    univName: 'Obafemi Awolowo University (OAU Ile-Ife)',
    shortCode: 'OAU',
    title: 'Updated 2026 Subject Combinations for Law & Social Sciences',
    date: 'Jan 29, 2026',
    badge: 'Subject Guide',
    badgeColor: 'bg-amber-100 text-amber-800'
  }
];

const JAMB_TIMELINE_2026 = [
  {
    step: '01',
    title: 'Profile Creation & e-PIN Vending',
    date: 'Jan 15 – Feb 26, 2026',
    status: 'Completed',
    statusColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    icon: 'how_to_reg',
    desc: 'Candidates generate 10-digit profile code via SMS to 55019/66019 and purchase official e-PINs.'
  },
  {
    step: '02',
    title: 'Official Mock UTME Examination',
    date: 'March 07, 2026',
    status: 'Ongoing / Active',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse',
    icon: 'edit_note',
    desc: 'Proctored practice examination at designated CBT centers nationwide for registered candidates.'
  },
  {
    step: '03',
    title: 'Main 2026 UTME Examination Window',
    date: 'April 18 – April 28, 2026',
    status: 'Upcoming',
    statusColor: 'bg-blue-100 text-[#2563EB] border-blue-300',
    icon: 'school',
    desc: 'The nationwide Unified Tertiary Matriculation Examination conducted across 700+ CBT hubs.'
  },
  {
    step: '04',
    title: 'Result Portal Activation & SMS Notification',
    date: 'May 05, 2026',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: 'insights',
    desc: 'Candidates check scores via candidate dashboard and official 55019 SMS query service.'
  },
  {
    step: '05',
    title: 'Central Admissions Processing System (CAPS)',
    date: 'June 01, 2026',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: 'sync_alt',
    desc: 'Automated placement, institutional recommendations, and O-Level transcript verification.'
  },
  {
    step: '06',
    title: 'Post-UTME Institutional Screenings',
    date: 'July 10 – Aug 30, 2026',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: 'account_balance',
    desc: 'Universities, polytechnics, and colleges conduct online or CBT screening tests.'
  },
  {
    step: '07',
    title: 'Admission Offer & CAPS Acceptance Period',
    date: 'Sept 15, 2026',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: 'task_alt',
    desc: 'Official admission letter printing and acceptance confirmation on CAPS portal.'
  },
  {
    step: '08',
    title: 'Freshers Clearance & Matriculation 2026',
    date: 'Oct 01, 2026',
    status: 'Scheduled',
    statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
    icon: 'military_tech',
    desc: 'Physical documentation, fee clearance, and resumption for 2026 academic session.'
  }
];

const VIDEO_MEDIA_ITEMS = [
  {
    id: 'v-1',
    title: 'Step-by-Step: How to Check 2026 UTME Results & Upload O-Level on CAPS',
    duration: '08:45',
    category: 'Educational Video',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrsy1woumbhF-FfLyyZ8NGAizwFUWE4t6JljE9t3mGdYNelTrimOc7f-KQvsn8Fhhg-KrM-hWr9a8aPdvZV102Y2_2M3mnzV7Q8PrB_uKKy5D4DWuILupoQO27ZGRIbdoN_1_YEnc_Re1EQXdFxDeuDGZPqexuk_y6ZnvXwui4bgsFVPJfgzpuItRBFoBPvxmejtd55JcG3beNhnAYPdUDmW5RaiRvnYxMVC--ikpD5cR2Zc9ymmyyNA',
    views: '45K views'
  },
  {
    id: 'v-2',
    title: 'Top 5 CBT Keyboard Shortcuts Every Candidate Must Know for UTME 2026',
    duration: '05:20',
    category: 'Study Guides',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6k9ltNQimOJMIyA-pbjZItn06eGaQfWoF7MNSuYEgESssmvK0ERA3ORyk7huKayN35EREux72Yzt1ABTC7LWcMpsiTasgrCQYialSSB-VnaTFZPoN7dRMACWbZHhCO3oyKChnDaDd5ALVzMUvUD6nfNs3X3p4diS-zJtu93B-FzKDRHZZHZnDoo7IiL6j1xmR9D9nuslbosgvyGaYD6t5I6DBovU6uBHM3SQY49GS7K5yzNwjXngcA',
    views: '82K views'
  },
  {
    id: 'v-3',
    title: 'Expert Panel: How University Cut-Off Marks Are Calculated in 2026',
    duration: '14:10',
    category: 'Admission Webinars',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALdaeaOfBEXfJtXPn71LDpUrcwU6axwGA1N4ZM_iCX1qIQ7H16qLfuyz5yy5iphDtqFn6mUkZ5uRWD_hukY3_-87rafu8WZ03segdlvxgcYUl7shuKXwI3xbEJNnHvWXEQjyXed4fl4PXs2S2axxATk5jvqyUGP4aBtWgGPjKFjTxBKyp3xrfgUdzEGPFmC6WKXIMyuLiOoIW-Cr_oFWscqE5n7xy4IzN6NyACyXEw_1WgDywhkfCGXg',
    views: '38K views'
  }
];

const FAQS_NEWS = [
  {
    question: 'How often is the News & Announcements Centre updated for 2026?',
    answer: 'Our editorial team updates the news feed in real time as official press statements, university bulletins, and JAMB Registrar advisories are published.'
  },
  {
    question: 'Where does JAMB Compass source its news updates?',
    answer: 'All news content is sourced directly from official government bulletins, the official JAMB Registrar press release portal, accredited university public relations offices, and verified NELFUND releases.'
  },
  {
    question: 'How can I receive instant notifications for urgent admission updates?',
    answer: 'You can subscribe to our 2026 Admission Newsletter using the subscription card on this page or bookmark your favorite category filters to stay informed.'
  },
  {
    question: 'Can I bookmark or save news articles for offline reading?',
    answer: 'Yes! Simply click the Bookmark icon on any news card to save it to your personal 2026 Saved Articles collection in your session.'
  },
  {
    question: 'How do I verify if a university admission notice is genuine?',
    answer: 'Always cross-check admission announcements with your official JAMB CAPS candidate portal and the university’s official domain (.edu.ng) before making any payments.'
  }
];

export const NewsScreen: React.FC<NewsScreenProps> = ({ onSelectArticle, setActiveTab }) => {
  // Toast Feedback State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Dark Mode Focus Toggle State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Alert Banner Visibility
  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(true);

  // Search Query & Voice Sim
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    triggerToast('Listening... Speak now!');
    setTimeout(() => {
      setSearchQuery('2026 Registration UTME');
      setIsVoiceActive(false);
      triggerToast('Voice query applied: "2026 Registration UTME"');
    }, 2000);
  };

  // Category Filter Chips
  const categoriesList = [
    'All News',
    'JAMB Updates',
    'Admissions',
    'Universities',
    'Scholarships',
    'CBT Practice',
    'Study Tips',
    'Career Guidance',
    'Examinations',
    'Announcements'
  ];
  const [activeCategory, setActiveCategory] = useState<string>('All News');

  // Bookmarked / Saved Article IDs
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(['jamb-2026-utme-registration-guide']);

  const toggleBookmark = (id: string, title: string) => {
    if (savedArticleIds.includes(id)) {
      setSavedArticleIds((prev) => prev.filter((item) => item !== id));
      triggerToast(`Removed "${title.substring(0, 30)}..." from saved bookmarks.`);
    } else {
      setSavedArticleIds((prev) => [...prev, id]);
      triggerToast(`Saved "${title.substring(0, 30)}..." to your reading list! 🔖`);
    }
  };

  // Modal State for Full Article Reading
  const [readingArticle, setReadingArticle] = useState<NewsItem | null>(null);

  // Modal State for Video Playback Simulation
  const [activeVideoModal, setActiveVideoModal] = useState<(typeof VIDEO_MEDIA_ITEMS)[0] | null>(null);

  // Newsletter Email State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      triggerToast('Please enter a valid email address.');
      return;
    }
    triggerToast(`Subscribed successfully! 2026 alerts will be sent to ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Filtered News Items
  const filteredArticles = useMemo(() => {
    return NEWS_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'All News' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'} pb-24`}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">newspaper</span>
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
            <span className="text-[#0F9D58] font-bold">News &amp; Announcements (2026)</span>
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

      {/* GLOBAL ANNOUNCEMENT BANNER */}
      {showAlertBanner && (
        <div className="bg-gradient-to-r from-[#0F172A] via-[#0F9D58] to-[#16A34A] text-white px-4 py-3 shadow-md border-b border-[#0F9D58]/40 relative">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0">
                📢
              </span>
              <div>
                <strong className="font-bold text-[#82FAAB]">Important 2026 Admission Updates:</strong> Follow the latest admission guidance, deadlines, and educational announcements. Always verify critical information through official JAMB and institutional sources.
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  const el = document.getElementById('breaking-news-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-1.5 px-3 bg-white text-[#0F172A] font-bold text-xs rounded-xl hover:bg-[#82FAAB] transition-all shadow-sm"
              >
                Latest Updates
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('jamb-timeline-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-1.5 px-3 bg-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-all border border-white/30"
              >
                2026 Timeline
              </button>
              <button
                onClick={() => setShowAlertBanner(false)}
                className="text-white/80 hover:text-white transition-colors"
                title="Dismiss Banner"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Official 2026 Admission News Desk</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              News &amp; <span className="text-[#82FAAB]">Announcements Centre</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Stay informed with trusted updates, admission news, university announcements, and educational resources throughout the 2026 JAMB admission cycle.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('news-articles-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">newspaper</span>
                <span>Browse All 2026 Articles</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('university-announcements-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">school</span>
                <span>University News</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Banner Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F9D58] flex items-center justify-center text-white font-bold text-lg">
                    2026
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">JAMB Cycle Status</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">Mock Exam Phase</p>
                  </div>
                </div>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Live Updates
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#82FAAB] text-lg">check_circle</span>
                    <div>
                      <p className="text-xs font-bold text-white">e-PIN Registration Portal</p>
                      <p className="text-[10px] text-slate-400">Verified &amp; Active nationwide</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#82FAAB]">Active</span>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-amber-300 text-lg">schedule</span>
                    <div>
                      <p className="text-xs font-bold text-white">Mock UTME Screening</p>
                      <p className="text-[10px] text-slate-400">Scheduled March 07, 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-300">Upcoming</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic text-center pt-1">
                "Verified news updates direct from official JAMB &amp; university channels."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* 1. SEARCH SECTION & CATEGORY FILTER CHIPS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">News Search &amp; Filter</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Search 2026 Announcements &amp; News
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search news, announcements, universities, scholarships or admission updates for 2026..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3.5 pl-12 pr-24 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A] dark:text-white placeholder-[#475569]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#475569] hover:text-[#0F172A] dark:hover:text-white"
                  title="Clear Search"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
              <button
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  isVoiceActive
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-[#0F9D58]/10 text-[#0F9D58] hover:bg-[#0F9D58]/20'
                }`}
                title="Voice Search"
              >
                <span className="material-symbols-outlined text-sm">mic</span>
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#0F9D58] text-white border-[#0F9D58] shadow-md'
                    : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-300 border-[#E2E8F0] dark:border-slate-700 hover:bg-[#0F9D58]/10 hover:text-[#0F9D58]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 2. BREAKING NEWS SECTION */}
        <section id="breaking-news-section" className="space-y-6">
          <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-rose-600 text-2xl animate-pulse">
                campaign
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                  Breaking 2026 Headlines
                </h2>
                <p className="text-xs text-[#475569]">Verified urgent notices direct from JAMB &amp; Higher Education Ministry</p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-900/40 px-3 py-1 rounded-full border border-rose-300">
              Updated Today 2026
            </span>
          </div>

          {/* Featured Breaking Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Primary Large Featured Story */}
            {NEWS_DATA.filter((n) => n.isBreaking)[0] && (
              <div
                onClick={() => {
                  setReadingArticle(NEWS_DATA.filter((n) => n.isBreaking)[0]);
                  if (onSelectArticle) onSelectArticle(NEWS_DATA.filter((n) => n.isBreaking)[0] as any);
                }}
                className={`lg:col-span-7 rounded-3xl border overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer group flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={NEWS_DATA.filter((n) => n.isBreaking)[0].imageUrl}
                    alt="Breaking News"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md animate-pulse">
                      Breaking News
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      {NEWS_DATA.filter((n) => n.isBreaking)[0].category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-semibold text-[#82FAAB] mb-1 block">
                      {NEWS_DATA.filter((n) => n.isBreaking)[0].date} • {NEWS_DATA.filter((n) => n.isBreaking)[0].readTime}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold font-display group-hover:text-[#82FAAB] transition-colors line-clamp-2">
                      {NEWS_DATA.filter((n) => n.isBreaking)[0].title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed line-clamp-3">
                    {NEWS_DATA.filter((n) => n.isBreaking)[0].summary}
                  </p>

                  <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#0F9D58] font-bold">
                      <span className="material-symbols-outlined text-base">person</span>
                      <span>{NEWS_DATA.filter((n) => n.isBreaking)[0].author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(
                            NEWS_DATA.filter((n) => n.isBreaking)[0].id,
                            NEWS_DATA.filter((n) => n.isBreaking)[0].title
                          );
                        }}
                        className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] hover:text-[#0F9D58] transition-colors"
                        title="Bookmark Article"
                      >
                        <span className="material-symbols-outlined text-base">
                          {savedArticleIds.includes(NEWS_DATA.filter((n) => n.isBreaking)[0].id)
                            ? 'bookmark_added'
                            : 'bookmark'}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerToast('Article link copied to clipboard!');
                        }}
                        className="p-2 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] hover:text-[#0F9D58] transition-colors"
                        title="Share Article"
                      >
                        <span className="material-symbols-outlined text-base">share</span>
                      </button>
                      <span className="py-2 px-4 bg-[#0F9D58] text-white font-bold rounded-xl hover:bg-[#16A34A] transition-all">
                        Read More
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Breaking / Featured Stories Column */}
            <div className="lg:col-span-5 space-y-4">
              {NEWS_DATA.filter((n) => n.id !== NEWS_DATA.filter((b) => b.isBreaking)[0]?.id).slice(0, 2).map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    setReadingArticle(art);
                    if (onSelectArticle) onSelectArticle(art as any);
                  }}
                  className={`p-4 rounded-3xl border shadow-sm hover:shadow-md transition-all cursor-pointer group flex gap-4 ${
                    isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#0F9D58] uppercase">
                        <span>{art.category}</span>
                        <span className="text-[#475569]">{art.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#475569]">
                      <span>{art.readTime}</span>
                      <span className="text-[#0F9D58] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. TRENDING NOW HORIZONTAL TABS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-500 text-2xl">trending_up</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                  Trending 2026 Topics
                </h2>
                <p className="text-xs text-[#475569]">Most read and shared updates across candidate portals</p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                🔥 Most Read
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] border border-blue-300">
                💬 Most Shared
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#0F9D58] border border-emerald-300">
                ⭐ Editor's Pick
              </span>
            </div>
          </div>

          {/* Cards Carousel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NEWS_DATA.map((item, idx) => (
              <div
                key={`trending-${item.id}`}
                onClick={() => setReadingArticle(item)}
                className={`p-4 rounded-2xl border transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-extrabold text-[#0F9D58]">
                  <span>#{idx + 1} TRENDING</span>
                  <span className="bg-white dark:bg-slate-700 text-[#475569] dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600">
                    {item.trendingType || 'Popular'}
                  </span>
                </div>

                <h4 className="text-xs font-bold font-display text-[#0F172A] dark:text-white line-clamp-2 hover:text-[#0F9D58] transition-colors">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[10px] text-[#475569] pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>{item.date}</span>
                  <span className="text-[#0F9D58] font-bold">Read &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MAIN ARTICLES GRID */}
        <section id="news-articles-grid" className="space-y-6">
          <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Featured 2026 Articles ({filteredArticles.length})
              </h2>
              <p className="text-xs text-[#475569]">In-depth guides, policy analyses, and study advice</p>
            </div>
            <span className="text-xs font-bold text-[#0F9D58]">
              Showing category: {activeCategory}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-4xl text-[#475569] mb-2">search_off</span>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">No articles found</h3>
              <p className="text-xs text-[#475569] mb-4">No 2026 news articles match your current search or category filter.</p>
              <button
                onClick={() => {
                  setActiveCategory('All News');
                  setSearchQuery('');
                }}
                className="py-2 px-5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setReadingArticle(article)}
                  className={`rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-[#82FAAB] text-[10px] font-bold px-3 py-1 rounded-full border border-slate-700">
                      {article.category}
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id, article.title);
                        }}
                        className="w-8 h-8 rounded-full bg-white/90 text-[#0F172A] hover:text-[#0F9D58] flex items-center justify-center shadow-md transition-colors"
                        title="Save Article"
                      >
                        <span className="material-symbols-outlined text-base">
                          {savedArticleIds.includes(article.id) ? 'bookmark_added' : 'bookmark'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[#475569]">
                        <span className="font-bold text-[#0F9D58]">{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#475569] dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#475569]">
                      <span>{article.date}</span>
                      <span className="text-[#0F9D58] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 5. UNIVERSITY ANNOUNCEMENTS */}
        <section id="university-announcements-section" className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#0F9D58] text-2xl">school</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                  2026 University Announcements
                </h2>
                <p className="text-xs text-[#475569]">Official notices from Nigerian Federal, State, and Private tertiary campuses</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab('universities')}
              className="py-1.5 px-3.5 bg-[#0F9D58]/10 text-[#0F9D58] font-bold text-xs rounded-xl hover:bg-[#0F9D58]/20 transition-all hidden sm:inline-block"
            >
              Browse All Universities &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNIVERSITY_ANNOUNCEMENTS_DATA.map((u) => (
              <div
                key={u.id}
                className={`p-5 rounded-2xl border space-y-3 flex flex-col justify-between hover:shadow-md transition-all ${
                  isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#0F9D58] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    {u.shortCode}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${u.badgeColor}`}>
                    {u.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-white line-clamp-2">
                    {u.title}
                  </h4>
                  <p className="text-[11px] text-[#475569] font-medium">{u.univName}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] text-[#475569]">
                  <span>{u.date}</span>
                  <button
                    onClick={() => triggerToast(`Opened official details for ${u.univName}`)}
                    className="text-[#0F9D58] font-bold hover:underline"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. INTERACTIVE 2026 JAMB TIMELINE */}
        <section id="jamb-timeline-section" className={`p-6 sm:p-10 rounded-3xl border shadow-lg space-y-8 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Official Milestone Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] dark:text-white">
              2026 JAMB Admission Cycle Timeline
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Track critical dates from profile registration through to matriculation clearance.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto space-y-6">
            {/* Timeline Item List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JAMB_TIMELINE_2026.map((item) => (
                <div
                  key={item.step}
                  className={`p-5 rounded-2xl border flex items-start gap-4 transition-all hover:border-[#0F9D58] ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] font-bold flex flex-col items-center justify-center shrink-0 border border-[#0F9D58]/30">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="text-[9px] font-extrabold">{item.step}</span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-extrabold text-[#0F172A] dark:text-white">{item.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-[11px] font-bold text-[#0F9D58]">{item.date}</p>
                    <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SCHOLARSHIP UPDATES QUICK SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-600 text-2xl">payments</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                  2026 Scholarship &amp; Funding Alerts
                </h2>
                <p className="text-xs text-[#475569]">Verified undergraduate grants and bursaries for Nigerian scholars</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab('scholarships')}
              className="py-1.5 px-4 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A] transition-all"
            >
              Open Scholarships Hub &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border bg-[#F8FAFC] dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 space-y-3">
              <span className="bg-emerald-100 text-[#0F9D58] text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                Full Scholarship
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">NNPC/Chevron 2026 Scheme</h4>
              <p className="text-xs text-[#475569]">₦500,000 annual grant for 200-level undergraduates nationwide.</p>
              <button
                onClick={() => setActiveTab && setActiveTab('scholarships')}
                className="w-full py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A]"
              >
                Learn More
              </button>
            </div>

            <div className="p-5 rounded-2xl border bg-[#F8FAFC] dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 space-y-3">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300">
                Annual Grant
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">MTN Foundation Science &amp; Tech</h4>
              <p className="text-xs text-[#475569]">₦300,000 annual grant for STEM scholars with minimum 3.5 CGPA.</p>
              <button
                onClick={() => setActiveTab && setActiveTab('scholarships')}
                className="w-full py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A]"
              >
                Learn More
              </button>
            </div>

            <div className="p-5 rounded-2xl border bg-[#F8FAFC] dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 space-y-3">
              <span className="bg-blue-100 text-[#2563EB] text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-300">
                Federal Loan
              </span>
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">NELFUND Interest-Free Loan</h4>
              <p className="text-xs text-[#475569]">100% direct tuition coverage to school bursary + ₦20,000 upkeep stipend.</p>
              <button
                onClick={() => setActiveTab && setActiveTab('scholarships')}
                className="w-full py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A]"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* 8. VIDEO & MEDIA SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#0F9D58] text-2xl">play_circle</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                  Video &amp; Media Guides
                </h2>
                <p className="text-xs text-[#475569]">Video walkthroughs, expert interviews, and admission tutorials</p>
              </div>
            </div>

            <span className="text-xs font-bold text-[#0F9D58]">3 Video Tutorials</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_MEDIA_ITEMS.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideoModal(vid)}
                className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {vid.duration}
                  </span>
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[#82FAAB] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {vid.category}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors leading-snug line-clamp-2">
                    {vid.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-[#475569] pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span>{vid.views}</span>
                    <span className="text-[#0F9D58] font-bold flex items-center gap-1">
                      Watch Video <span className="material-symbols-outlined text-xs">play_arrow</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. PERSONALISED RECOMMENDATIONS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center gap-3 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="material-symbols-outlined text-[#0F9D58] text-2xl">auto_awesome</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Personalised Recommendations for You
              </h2>
              <p className="text-xs text-[#475569]">Curated news based on your target courses and admission interests</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border bg-[#0F9D58]/10 border-[#0F9D58]/30 flex items-start gap-4">
              <span className="material-symbols-outlined text-[#0F9D58] text-3xl shrink-0">menu_book</span>
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#0F9D58] uppercase">Recommended for UTME Prep</span>
                <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  2026 Use of English Comprehension Passage Analysis &amp; Novel Guide
                </h4>
                <p className="text-xs text-[#475569] dark:text-slate-300">
                  Read our full structural breakdown of the recommended English literature text for the 2026 exam.
                </p>
                <button
                  onClick={() => setReadingArticle(NEWS_DATA[3])}
                  className="text-xs font-bold text-[#0F9D58] hover:underline"
                >
                  Read Study Guide &rarr;
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl border bg-blue-500/10 border-blue-500/30 flex items-start gap-4">
              <span className="material-symbols-outlined text-[#2563EB] text-3xl shrink-0">school</span>
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold text-[#2563EB] uppercase">Target University Update</span>
                <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  UNILAG &amp; UI Post-UTME Aggregate Calculator &amp; Screening Requirements
                </h4>
                <p className="text-xs text-[#475569] dark:text-slate-300">
                  Calculate your weighted aggregate score based on your 2026 UTME and O-Level grades.
                </p>
                <button
                  onClick={() => setReadingArticle(NEWS_DATA[1])}
                  className="text-xs font-bold text-[#2563EB] hover:underline"
                >
                  View Admission Guidance &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 10. NEWSLETTER SECTION */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-2xl">
              ✉️
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
              Never Miss an Important 2026 Update
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Receive instant notifications about JAMB registration dates, cut-off mark releases, university admission lists, and scholarship openings.
            </p>

            <form onSubmit={handleSubscribeNewsletter} className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <input
                type="email"
                placeholder="Enter your student email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full py-3 px-4 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#82FAAB]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-8 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shrink-0 shadow-lg"
              >
                Subscribe Free
              </button>
            </form>
            <p className="text-[10px] text-slate-400">Official JAMB Compass Digest • Unsubscribe anytime with 1-click.</p>
          </div>
        </section>

        {/* 11. FAQ ACCORDION SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Help &amp; Verification</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS_NEWS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between gap-3"
                  >
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-base text-[#0F9D58]">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#475569] dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 12. CALL TO ACTION SECTION */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F9D58] via-[#0F172A] to-[#1E293B] text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Stay Informed Throughout the 2026 Admission Cycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Receive timely educational updates, prepare with confidence using practice CBT tools, and never miss important university admission guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-3">
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="py-3.5 px-8 bg-[#82FAAB] text-[#0F172A] font-extrabold text-xs sm:text-sm rounded-2xl hover:bg-white transition-all shadow-lg"
              >
                Explore Study Hub
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('universities')}
                className="py-3.5 px-8 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/30"
              >
                Browse Universities
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL: READ ARTICLE FULL CONTENT */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`relative w-full max-w-3xl rounded-3xl border p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-8 shadow-2xl ${isDarkMode ? 'bg-[#1C2541] border-slate-700 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'}`}>
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:text-[#0F172A] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F9D58] uppercase">
                <span className="bg-[#0F9D58]/10 px-3 py-1 rounded-full border border-[#0F9D58]/30">
                  {readingArticle.category}
                </span>
                <span>•</span>
                <span>{readingArticle.date}</span>
                <span>•</span>
                <span>{readingArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold font-display leading-tight">
                {readingArticle.title}
              </h2>

              <div className="flex items-center gap-3 pt-2 text-xs text-[#475569] dark:text-slate-300">
                <div className="w-9 h-9 rounded-full bg-[#0F9D58] text-white font-bold flex items-center justify-center text-xs">
                  {readingArticle.author.substring(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] dark:text-white">{readingArticle.author}</p>
                  <p className="text-[11px] text-[#475569]">{readingArticle.authorRole}</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
              <img src={readingArticle.imageUrl} alt={readingArticle.title} className="w-full h-full object-cover" />
            </div>

            {readingArticle.keyPoints && (
              <div className="p-4 bg-[#0F9D58]/10 rounded-2xl border border-[#0F9D58]/30 space-y-2">
                <h4 className="text-xs font-extrabold text-[#0F9D58] uppercase flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">key</span>
                  <span>Key Takeaways for 2026 Candidates</span>
                </h4>
                <ul className="space-y-1 text-xs text-[#0F172A] dark:text-white list-disc pl-4">
                  {readingArticle.keyPoints.map((kp, idx) => (
                    <li key={idx}>{kp}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-slate-300">
              {readingArticle.fullContent.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => toggleBookmark(readingArticle.id, readingArticle.title)}
                className="py-2.5 px-5 rounded-xl border border-[#0F9D58] text-[#0F9D58] font-bold text-xs hover:bg-[#0F9D58] hover:text-white transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  {savedArticleIds.includes(readingArticle.id) ? 'bookmark_added' : 'bookmark'}
                </span>
                <span>{savedArticleIds.includes(readingArticle.id) ? 'Saved in Bookmarks' : 'Save Article'}</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="py-2.5 px-6 bg-[#0F9D58] text-white font-bold text-xs rounded-xl hover:bg-[#16A34A]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIDEO PLAYER SIMULATION */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-black border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white space-y-4 p-6">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            <span className="text-[10px] font-bold text-[#82FAAB] bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/40">
              {activeVideoModal.category} • {activeVideoModal.duration}
            </span>

            <h3 className="text-base sm:text-xl font-bold font-display leading-snug">
              {activeVideoModal.title}
            </h3>

            {/* Video Player Display Container */}
            <div className="relative aspect-video w-full rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center border border-slate-800">
              <img src={activeVideoModal.thumbnail} alt={activeVideoModal.title} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shadow-2xl animate-pulse cursor-pointer">
                  <span className="material-symbols-outlined text-3xl">play_arrow</span>
                </div>
                <p className="text-xs font-bold text-white bg-black/70 px-4 py-1 rounded-full">
                  Click to play proctored video tutorial (2026 Stream)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>{activeVideoModal.views}</span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="py-2 px-5 bg-white text-[#0F172A] font-bold rounded-xl text-xs hover:bg-[#82FAAB]"
              >
                Done Watching
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
