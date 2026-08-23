import React, { useState } from 'react';
import { TabType } from '../types';

interface HelpCentreScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: 'Open' | 'Pending' | 'Resolved' | 'Closed';
  date: string;
  description: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  updatedDate: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  bookmarked: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'agent';
  text: string;
  time: string;
}

export const HelpCentreScreen: React.FC<HelpCentreScreenProps> = ({ setActiveTab }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Search Bar state
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    showToast('🎤 Voice Search Activated... Speak your question now.');
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('2026 UTME Cut-off Marks');
      showToast('Speech recognized: "2026 UTME Cut-off Marks"');
    }, 2500);
  };

  // AI Chat Assistant state
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello! I am Compass AI, your dedicated 2026 JAMB admission assistant. Ask me anything about registration, subject combinations, CBT strategies, or CAPS guidelines!",
      time: '10:00 AM',
    },
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiIsTyping, setAiIsTyping] = useState(false);

  const handleSendAiMessage = (customText?: string) => {
    const textToSend = customText || aiInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);
    if (!customText) setAiInput('');
    setAiIsTyping(true);

    setTimeout(() => {
      let responseText = "For the 2026 UTME cycle, always verify your subject combinations using our Subject Checker tool before submitting your profile code.";

      const lower = textToSend.toLowerCase();
      if (lower.includes('prepare') || lower.includes('utme') || lower.includes('study')) {
        responseText = "To prepare effectively for 2026 UTME: 1) Practice at least 20 past CBT questions daily. 2) Study according to the official 2026 JAMB Syllabus. 3) Take full-length timed mock exams on JAMB Compass.";
      } else if (lower.includes('caps') || lower.includes('admission')) {
        responseText = "JAMB CAPS (Central Admissions Processing System) handles all 2026 admissions. Remember to regularly check your profile for 'Admitted' status and accept/reject offers promptly.";
      } else if (lower.includes('course') || lower.includes('choose')) {
        responseText = "When choosing a course for 2026, ensure your O'Level credits match the departmental requirements. Use our 'Course Explorer' to compare university cut-off marks.";
      } else if (lower.includes('document') || lower.includes('requirement') || lower.includes('register')) {
        responseText = "Key documents for 2026 UTME registration: National Identification Number (NIN), active personal phone number, personal email address, and O'Level statement of result or awaiting result details.";
      } else if (lower.includes('cutoff') || lower.includes('cut off') || lower.includes('mark')) {
        responseText = "Official 2026 JAMB national baseline cut-off marks are typically announced at the policy meeting. Universities like UI and UNILAG often set departmental cut-offs between 200 - 280.";
      }

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAiMessages((prev) => [...prev, aiMsg]);
      setAiIsTyping(false);
    }, 1200);
  };

  // Live Support Chat (Demo) state
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [liveChatMessages, setLiveChatMessages] = useState<ChatMessage[]>([
    {
      id: 'lc1',
      sender: 'agent',
      text: 'Welcome to JAMB Compass Live Support (2026 Demo). Agent Chioma is online and ready to assist you!',
      time: '10:05 AM',
    },
  ]);
  const [liveChatInput, setLiveChatInput] = useState('');

  const handleSendLiveChat = () => {
    if (!liveChatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `lcu-${Date.now()}`,
      sender: 'user',
      text: liveChatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setLiveChatMessages((prev) => [...prev, userMsg]);
    setLiveChatInput('');

    setTimeout(() => {
      const agentMsg: ChatMessage = {
        id: `lca-${Date.now()}`,
        sender: 'agent',
        text: 'Thank you for your inquiry! Our support desk has logged your 2026 session request. A support representative will review your query shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setLiveChatMessages((prev) => [...prev, agentMsg]);
    }, 1000);
  };

  // Knowledge Base Articles
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 'art-1',
      title: 'Understanding the 2026 Admission Process',
      category: 'Admission Guidance',
      readTime: '8 min read',
      updatedDate: 'Updated Jan 2026',
      excerpt: 'A comprehensive walkthrough of CAPS, Post-UTME screening, aggregate score calculations, and merit lists.',
      content: [
        'The 2026 JAMB admission cycle relies on three pillars: your UTME score, Post-UTME screening (or O\'Level grading), and aggregate cut-off calculations.',
        'Always ensure your O\'Level results are uploaded to the official JAMB CAPS portal. Failure to upload O\'Level results will disqualify candidates from institutional recommendations.',
        'Track your status under the JAMB CAPS dashboard: "Not Admitted", "Proposed", "Recommended", or "Admitted".'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500',
      bookmarked: false,
    },
    {
      id: 'art-2',
      title: 'How to Register for 2026 UTME Step-by-Step',
      category: 'Registration Guide',
      readTime: '6 min read',
      updatedDate: 'Updated Jan 2026',
      excerpt: 'Learn how to generate your profile code using NIN via SMS 55019/66019 and procure e-PINs.',
      content: [
        'Step 1: Send "NIN [Your 11-digit NIN]" to 55019 or 66019 via SMS from your personal line.',
        'Step 2: Receive your 10-character Profile Code.',
        'Step 3: Present your Profile Code at accredited banks or online e-PIN vending channels for 2026.',
        'Step 4: Visit an accredited CBT registration centre for biometric capture.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500',
      bookmarked: true,
    },
    {
      id: 'art-3',
      title: 'Choosing the Right University & Course for 2026',
      category: 'Career Planning',
      readTime: '7 min read',
      updatedDate: 'Updated Jan 2026',
      excerpt: 'Evaluate federal, state, and private university requirements against your career ambitions.',
      content: [
        'Review institutional competitiveness before choosing your First Choice university.',
        'Check departmental quotas and catchment area policies for federal universities.',
        'Use JAMB Compass Subject Checker to avoid wrong subject combinations that lead to automatic disqualification.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=500',
      bookmarked: false,
    },
    {
      id: 'art-4',
      title: 'Mastering CBT Practice & Time Management',
      category: 'CBT Practice',
      readTime: '5 min read',
      updatedDate: 'Updated Jan 2026',
      excerpt: 'Proven techniques to answer 180 questions in 120 minutes with high accuracy.',
      content: [
        'Allocate 40 seconds per question on average. Answer English Language passages first while your concentration is highest.',
        'Use the 8-key keyboard navigation shortcut during official CBT practice sessions.',
        'Flag difficult questions and return to them during the final 15 minutes of your test.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500',
      bookmarked: false,
    },
    {
      id: 'art-5',
      title: 'How 2026 Undergraduate Scholarships Work',
      category: 'Scholarships',
      readTime: '9 min read',
      updatedDate: 'Updated Jan 2026',
      excerpt: 'Discover federal awards, corporate foundation grants, and state bursaries for freshers.',
      content: [
        'Corporate scholarships such as MTN Foundation and Shell JV awards typically require a minimum 200+ UTME score.',
        'Prepare certified copies of your Local Government Identification, Birth Certificate, and JAMB Result Slip.',
        'Apply early through verified portals to avoid missing application deadlines.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500',
      bookmarked: false,
    },
    {
      id: 'art-6',
      title: 'Managing Study Time & Beating Exam Anxiety',
      category: 'Study Skills',
      readTime: '6 min read',
      updatedDate: 'Updated Jan 2026',
      excerpt: 'Build a healthy timetable and mental resilience leading up to the 2026 examination dates.',
      content: [
        'Adopt the 50/10 Pomodoro technique: study intensely for 50 minutes, then take a 10-minute rest.',
        'Ensure 7-8 hours of sleep per night to consolidate memory retention.',
        'Participate in group mock revision sessions to test your speed against peers.'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=500',
      bookmarked: false,
    },
  ]);

  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(null);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextState = !a.bookmarked;
          showToast(nextState ? `Bookmarked "${a.title}"` : `Removed bookmark from "${a.title}"`);
          return { ...a, bookmarked: nextState };
        }
        return a;
      })
    );
  };

  // Support Tickets state
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'JC-2026-9842',
      subject: 'NIN Profile Code SMS Delay',
      category: 'Registration',
      priority: 'High',
      status: 'Pending',
      date: 'Jan 28, 2026',
      description: 'Sent SMS to 55019 over 6 hours ago but have not received my 10-digit profile code.',
    },
    {
      id: 'JC-2026-8102',
      subject: 'CBT Practice Score Synchronization',
      category: 'Technical Support',
      priority: 'Normal',
      status: 'Resolved',
      date: 'Jan 22, 2026',
      description: 'My completed mock test score did not immediately display on my analytics dashboard.',
    },
    {
      id: 'JC-2026-7721',
      subject: 'Subject Combination Verification for UNILAG Law',
      category: 'Admission Guidance',
      priority: 'Normal',
      status: 'Closed',
      date: 'Jan 15, 2026',
      description: 'Requested confirmation regarding Literature in English requirement for Law candidates.',
    },
  ]);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'JAMB Registration Guide',
    priority: 'Normal' as 'Normal' | 'High' | 'Urgent',
    description: '',
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) {
      showToast('⚠️ Please fill out all required ticket fields.');
      return;
    }

    const newTicket: Ticket = {
      id: `JC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketForm.subject,
      category: ticketForm.category,
      priority: ticketForm.priority,
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      description: ticketForm.description,
    };

    setTickets([newTicket, ...tickets]);
    setIsTicketModalOpen(false);
    setTicketForm({ subject: '', category: 'JAMB Registration Guide', priority: 'Normal', description: '' });
    showToast(`Support ticket ${newTicket.id} created successfully! Our 2026 desk will respond shortly.`);
  };

  // Video Tutorials State
  const [selectedVideoModal, setSelectedVideoModal] = useState<{
    title: string;
    duration: string;
    desc: string;
    thumbnail: string;
  } | null>(null);

  const videos = [
    {
      id: 'v1',
      title: '2026 UTME Registration Step-by-Step Roadmap',
      duration: '12:45',
      desc: 'Complete video walkthrough from NIN linkage, profile code generation, to biometric capture.',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 'v2',
      title: 'Mastering the 8-Key CBT Exam Interface',
      duration: '08:20',
      desc: 'Learn keyboard shortcuts, passage toggles, and time-allocation strategies for 2026 CBT.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 'v3',
      title: 'Understanding JAMB CAPS & Marketplace Offers',
      duration: '15:10',
      desc: 'Visual guide explaining recommendation lists, transfer approval, and CAPS acceptance.',
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 'v4',
      title: 'Subject Combination Checker Masterclass',
      duration: '10:05',
      desc: 'Avoid costly subject errors for Medicine, Engineering, Law, and Computer Science.',
      thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500',
    },
  ];

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I contact JAMB Compass support?',
      a: 'You can reach out through our live AI Assistant, submit a support ticket in the Ticket Management section below, or initiate a Live Chat with a support agent during official support hours.',
    },
    {
      q: 'Can the AI Assistant answer specific 2026 admission questions?',
      a: 'Yes! Compass AI is trained on official 2026 JAMB guidelines, university departmental requirements, subject combinations, and CBT preparation strategies.',
    },
    {
      q: 'How do I report a technical issue or bug on the platform?',
      a: 'Click on "Report a Bug" in the Quick Actions section or open a support ticket with the category "Technical Support". Our engineering team resolves issues promptly.',
    },
    {
      q: 'Where can I verify official 2026 JAMB announcements?',
      a: 'While JAMB Compass provides verified guidelines and updates, candidates can always cross-reference official announcements on the official JAMB portal (jamb.gov.ng).',
    },
    {
      q: 'How long does support take to respond to submitted tickets?',
      a: 'For 2026 admission candidates, standard support tickets are reviewed within 2 to 4 hours. High-priority inquiries during exam periods receive expedited responses.',
    },
  ];

  // User Feedback Form State
  const [feedbackRating, setFeedbackRating] = useState<'yes' | 'no' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackRating) {
      showToast('Please select Yes or No to rate this page.');
      return;
    }
    setFeedbackSubmitted(true);
    showToast('Thank you for helping us improve JAMB Compass for the 2026 cycle!');
  };

  // Filtered Articles based on Search Input
  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'} pb-24`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP BREADCRUMB & PREFERENCE BAR */}
      <div className={`${darkMode ? 'bg-[#1C2541] border-slate-800' : 'bg-[#F8FAFC] border-[#E2E8F0]'} border-b`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2 text-[#475569] dark:text-slate-400">
            <button
              onClick={() => setActiveTab && setActiveTab('home')}
              className="hover:text-[#0F9D58] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#0F9D58] font-bold">Help Centre &amp; AI Support (2026)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                showToast(!darkMode ? 'Dark Mode Activated' : 'Light Mode Enabled');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                darkMode
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-slate-100 text-[#0F172A] border-[#E2E8F0] hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PAGE HEADER / HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">support_agent</span>
              <span>Official 2026 Student Help Hub</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Help Centre &amp; <span className="text-[#82FAAB]">AI Support</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Get answers, explore helpful resources, chat with the JAMB Compass AI Assistant, and receive support throughout your 2026 admission journey.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('ai-assistant-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">smart_toy</span>
                <span>Chat with AI Assistant</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('knowledge-base-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>Explore Knowledge Base</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    🤖
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Compass AI 2026</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">Online &amp; Active</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Verified Guide
                </span>
              </div>

              {/* Graphic Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#82FAAB]">question_answer</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Instant Q&amp;A</p>
                    <p className="text-[9px] text-slate-300">UTME &amp; CAPS</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-300">menu_book</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">2026 Knowledge</p>
                    <p className="text-[9px] text-slate-300">100+ Guides</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-300">support_agent</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Human Support</p>
                    <p className="text-[9px] text-slate-300">24/7 Ticketing</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-purple-300">school</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Graduation Goals</p>
                    <p className="text-[9px] text-slate-300">2026 Admission</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0F9D58]/20 border border-[#0F9D58]/40 rounded-2xl text-[11px] text-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Educational Support: Powered by JAMB Compass AI for candidate guidance.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* WELCOME BANNER */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-[#0F9D58]/30'}`}>
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Always Here For Students</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] dark:text-white">
              Need Help? We're Here for You.
            </h2>
            <p className="text-sm text-[#475569] dark:text-slate-300 max-w-2xl">
              Search our knowledge base, ask the AI Assistant, or contact the JAMB Compass support team for personalized 2026 guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const searchEl = document.getElementById('smart-search-input');
                if (searchEl) searchEl.focus();
              }}
              className="py-3 px-5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              <span>Search Help</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('ai-assistant-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3 px-5 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              <span>Chat with AI</span>
            </button>
          </div>
        </section>

        {/* SMART SEARCH BAR */}
        <section className="space-y-4">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-5 text-[#0F9D58] text-2xl">search</span>
              <input
                id="smart-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, guides, admission questions, CBT help, scholarships..."
                className={`w-full py-4 pl-14 pr-14 rounded-2xl border text-sm sm:text-base font-medium shadow-lg focus:ring-2 focus:ring-[#0F9D58] focus:outline-none transition-all ${
                  darkMode ? 'bg-[#1C2541] border-slate-700 text-white placeholder-slate-400' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
                }`}
              />
              <button
                onClick={handleVoiceSearch}
                title="Voice Search"
                className={`absolute right-4 p-2 rounded-xl transition-all ${
                  isListening ? 'bg-rose-500 text-white animate-ping' : 'text-[#475569] dark:text-slate-400 hover:text-[#0F9D58]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">mic</span>
              </button>
            </div>

            {searchQuery && (
              <div className={`mt-2 p-4 rounded-2xl border shadow-xl space-y-2 absolute w-full z-20 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
                <p className="text-xs font-bold text-[#475569] dark:text-slate-400">
                  Found {filteredArticles.length} results for "{searchQuery}":
                </p>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setActiveArticleModal(art)}
                      className="p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#0F172A] dark:text-white">{art.title}</p>
                        <p className="text-[11px] text-[#475569] dark:text-slate-400">{art.category} • {art.readTime}</p>
                      </div>
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">arrow_forward</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-rose-500 font-medium">No matching articles found. Try searching for "UTME", "CBT", or "Caps".</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* POPULAR HELP CATEGORIES */}
        <section className="space-y-6">
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Browse By Topic</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Popular Help Categories (2026 Cycle)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: 'rocket_launch', title: 'Getting Started', desc: 'New candidate onboarding & profile creation for 2026.', category: 'Registration Guide' },
              { icon: 'how_to_reg', title: 'JAMB Registration', desc: 'NIN linkage, SMS profile codes, and e-PIN purchase.', category: 'Registration Guide' },
              { icon: 'laptop_mac', title: 'CBT Practice', desc: 'Exam center guidelines, timer tips, and CBT shortcuts.', category: 'CBT Practice' },
              { icon: 'assignment_turned_in', title: 'Mock Exams', desc: 'Preparing for national mock tests and performance tracking.', category: 'CBT Practice' },
              { icon: 'school', title: 'Admission Guidance', desc: 'Understanding CAPS, cutoff marks, and aggregate scores.', category: 'Admission Guidance' },
              { icon: 'payments', title: 'Scholarships', desc: 'Federal bursaries and corporate 2026 grants for freshers.', category: 'Scholarships' },
              { icon: 'account_balance', title: 'University Directory', desc: 'Federal, State, and Private university entry requirements.', category: 'Career Planning' },
              { icon: 'settings', title: 'Account Settings', desc: 'Profile updates, password resets, and 2FA security.', category: 'Registration Guide' },
              { icon: 'build', title: 'Technical Support', desc: 'App bug troubleshooting and login assistance.', category: 'Technical Support' },
              { icon: 'work', title: 'Career Planning', desc: 'Aligning UTME subject combinations with career paths.', category: 'Career Planning' },
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSearchQuery(cat.title);
                  showToast(`Filtering articles for ${cat.title}`);
                }}
                className={`p-5 rounded-3xl border shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                  darkMode ? 'bg-[#1C2541] border-slate-700 hover:border-[#0F9D58]' : 'bg-white border-[#E2E8F0] hover:border-[#0F9D58]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center group-hover:bg-[#0F9D58] group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-snug pt-1">
                    {cat.desc}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-[#0F9D58] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Topic</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI STUDY ASSISTANT INTERACTIVE CHAT */}
        <section id="ai-assistant-section" className="space-y-4">
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">AI Interactive Support</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Compass AI Study &amp; Admission Assistant
              </h2>
            </div>
            <span className="bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              <span>AI Engine Active 2026</span>
            </span>
          </div>

          <div className="bg-[#0F172A] text-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Prompt Suggestions Column */}
            <div className="lg:col-span-4 p-6 bg-[#1E293B] border-r border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-xl font-bold shadow-md">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Compass AI Tutor</h3>
                    <p className="text-[11px] text-slate-300">Trained on 2026 UTME Guidelines</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F9D58]/20 border border-[#0F9D58]/40 rounded-2xl text-xs text-emerald-200 space-y-1">
                  <p className="font-bold">✨ Quick Prompts</p>
                  <p className="text-[11px] text-slate-300">Click any prompt below to test Compass AI instantly:</p>
                </div>

                <div className="space-y-2">
                  {[
                    'How do I prepare for UTME 2026?',
                    'What should I study today for Chemistry?',
                    'Explain JAMB CAPS admission status.',
                    'How do I choose the right course?',
                    'What documents do I need for registration?',
                  ].map((promptText, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendAiMessage(promptText)}
                      className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-[#0F9D58]/30 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{promptText}</span>
                      <span className="material-symbols-outlined text-xs text-[#82FAAB] group-hover:translate-x-1 transition-transform">
                        send
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-[10px] text-slate-400 space-y-1">
                <p className="font-bold text-slate-300">⚠️ Disclaimer</p>
                <p>The AI Assistant provides educational guidance and should not replace official information from JAMB or your chosen institution.</p>
              </div>
            </div>

            {/* Right Chat Conversation Window */}
            <div className="lg:col-span-8 flex flex-col h-[500px]">
              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
                {aiMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-[#0F9D58] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        🤖
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0F9D58] text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="block text-[10px] text-right mt-1 opacity-70">{msg.time}</span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        👤
                      </div>
                    )}
                  </div>
                ))}

                {aiIsTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                    <div className="w-6 h-6 rounded-full bg-[#0F9D58] flex items-center justify-center text-white text-xs">
                      🤖
                    </div>
                    <span>Compass AI is generating response...</span>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#1E293B] border-t border-slate-800 flex items-center gap-3">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                  placeholder="Ask Compass AI anything about 2026 admissions..."
                  className="flex-1 py-3 px-4 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                />
                <button
                  onClick={() => handleSendAiMessage()}
                  className="py-3 px-5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all flex items-center gap-1 shadow-md"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KNOWLEDGE BASE ARTICLES */}
        <section id="knowledge-base-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">In-Depth Resources</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Knowledge Base &amp; 2026 Educational Articles
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#475569] dark:text-slate-400">
              <span>Filter:</span>
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] font-bold"
              >
                All Articles ({articles.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => setActiveArticleModal(art)}
                className={`rounded-3xl border shadow-md hover:shadow-2xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between group ${
                  darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F172A]/80 text-[#82FAAB] border border-[#0F9D58]/40 px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-sm">
                    {art.category}
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(art.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-[#0F9D58] hover:scale-110 transition-transform shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {art.bookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-[#475569] dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#0F9D58]">schedule</span>
                        <span>{art.readTime}</span>
                      </span>
                      <span>•</span>
                      <span className="text-[#0F9D58] font-bold">{art.updatedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-[#475569] dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0F9D58]">
                    <span>Read Full Article</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIVE CHAT SUPPORT & SUPPORT TICKETS MANAGEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Live Chat Support (Demo Widget) */}
          <section className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col justify-between ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold">
                      💬
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#16A34A] border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-white">Live Support Chat</h3>
                    <p className="text-[11px] text-[#16A34A] font-bold">Agent Chioma Online (Demo)</p>
                  </div>
                </div>

                <span className="text-[10px] bg-blue-100 text-[#2563EB] font-bold px-2.5 py-1 rounded-full uppercase">
                  Interactive Demo
                </span>
              </div>

              {/* Chat Message Window */}
              <div className="h-64 p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 overflow-y-auto space-y-3 custom-scrollbar text-xs">
                {liveChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#2563EB] text-white rounded-tr-none'
                          : 'bg-white dark:bg-slate-700 text-[#0F172A] dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="block text-[9px] text-right mt-1 opacity-70">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={liveChatInput}
                  onChange={(e) => setLiveChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendLiveChat()}
                  placeholder="Type a message to support..."
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <button
                  onClick={handleSendLiveChat}
                  className="py-2.5 px-4 bg-[#2563EB] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-1"
                >
                  <span>Send</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-[#475569] dark:text-slate-400 italic text-center pt-3 border-t border-[#E2E8F0] dark:border-slate-800">
              Note: This live chat widget provides interactive demonstration for candidate support during 2026.
            </p>
          </section>

          {/* Support Tickets Dashboard */}
          <section className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Ticket Management</span>
                <h2 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                  My Support Tickets (2026 Cycle)
                </h2>
              </div>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="py-2.5 px-4 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all flex items-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Create New Ticket</span>
              </button>
            </div>

            {/* Ticket Metric Cards */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Open</span>
                <strong className="text-base sm:text-lg font-extrabold text-[#2563EB] block">
                  {tickets.filter((t) => t.status === 'Open').length}
                </strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Pending</span>
                <strong className="text-base sm:text-lg font-extrabold text-amber-500 block">
                  {tickets.filter((t) => t.status === 'Pending').length}
                </strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Resolved</span>
                <strong className="text-base sm:text-lg font-extrabold text-[#16A34A] block">
                  {tickets.filter((t) => t.status === 'Resolved').length}
                </strong>
              </div>
              <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Closed</span>
                <strong className="text-base sm:text-lg font-extrabold text-slate-500 block">
                  {tickets.filter((t) => t.status === 'Closed').length}
                </strong>
              </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-3">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#0F9D58]">{t.id} • {t.date}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : t.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700'
                          : t.status === 'Open'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{t.subject}</h4>
                  <p className="text-[11px] text-[#475569] dark:text-slate-300">{t.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* VIDEO HELP CENTRE */}
        <section className="space-y-6">
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Visual Tutorials</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Video Help Centre &amp; 2026 Walkthroughs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideoModal(vid)}
                className={`rounded-3xl border shadow-md hover:shadow-2xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between group ${
                  darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#0F9D58] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {vid.desc}
                  </p>
                  <div className="pt-2 text-xs font-bold text-[#0F9D58] flex items-center gap-1">
                    <span>Watch Tutorial</span>
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK ACTIONS & RECENT ANNOUNCEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Actions */}
          <section className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Fast Assistance</span>
              <h2 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                Quick Action Short-cuts
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all text-left flex items-start gap-3 group"
              >
                <span className="material-symbols-outlined text-[#0F9D58] text-2xl">support_agent</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58]">Contact Support Desk</h4>
                  <p className="text-[10px] text-[#475569] dark:text-slate-400">Open a 24/7 inquiry ticket</p>
                </div>
              </button>

              <button
                onClick={() => showToast('Downloading 2026 Candidate Handbook PDF...')}
                className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all text-left flex items-start gap-3 group"
              >
                <span className="material-symbols-outlined text-[#2563EB] text-2xl">download</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58]">Download User Guide</h4>
                  <p className="text-[10px] text-[#475569] dark:text-slate-400">Official 2026 Candidate PDF</p>
                </div>
              </button>

              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all text-left flex items-start gap-3 group"
              >
                <span className="material-symbols-outlined text-rose-500 text-2xl">bug_report</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58]">Report a Bug</h4>
                  <p className="text-[10px] text-[#475569] dark:text-slate-400">Notify app developers</p>
                </div>
              </button>

              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all text-left flex items-start gap-3 group"
              >
                <span className="material-symbols-outlined text-amber-500 text-2xl">lightbulb</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#0F9D58]">Suggest a Feature</h4>
                  <p className="text-[10px] text-[#475569] dark:text-slate-400">Share your platform ideas</p>
                </div>
              </button>
            </div>

            {/* System Status Banner */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-bold text-[#16A34A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping" />
                <span>All JAMB Compass 2026 Services Operational</span>
              </div>
              <span>99.9% Uptime</span>
            </div>
          </section>

          {/* Recent Announcements */}
          <section className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">2026 Portal Updates</span>
              <h2 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                Recent Announcements &amp; System News
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { title: 'New 2026 UTME Past Questions & CBT Bank Added', date: 'Jan 28, 2026', type: 'Content Update' },
                { title: 'Updated Scholarship Hub: 15 New Undergraduate Grants Live', date: 'Jan 20, 2026', type: 'Scholarships' },
                { title: '2026 Federal & State University Cut-off Mark Database Updated', date: 'Jan 14, 2026', type: 'University News' },
                { title: 'System Performance Enhancements & Faster Mock Simulator', date: 'Jan 05, 2026', type: 'Platform' },
              ].map((anc, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#0F9D58]">{anc.type}</span>
                    <span className="text-[#475569] dark:text-slate-400">{anc.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{anc.title}</h4>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800 text-center sm:text-left">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Instant Guidance</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E2E8F0] dark:border-slate-700 overflow-hidden bg-[#F8FAFC] dark:bg-slate-800"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-base text-[#0F9D58]">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-[#475569] dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* USER FEEDBACK SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 text-center max-w-2xl mx-auto ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
            Was this Help Centre &amp; Support Page helpful?
          </h3>

          {!feedbackSubmitted ? (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFeedbackRating('yes')}
                  className={`py-2.5 px-6 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                    feedbackRating === 'yes'
                      ? 'bg-[#16A34A] text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white hover:bg-emerald-100'
                  }`}
                >
                  <span className="text-base">👍</span>
                  <span>Yes, helpful</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFeedbackRating('no')}
                  className={`py-2.5 px-6 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                    feedbackRating === 'no'
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white hover:bg-rose-100'
                  }`}
                >
                  <span className="text-base">👎</span>
                  <span>Needs improvement</span>
                </button>
              </div>

              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your suggestions to help us improve your 2026 support experience..."
                className="w-full p-3 rounded-2xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0F9D58]"
                rows={3}
              />

              <button
                type="submit"
                className="py-2.5 px-6 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all shadow-md"
              >
                Submit Feedback
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-bold text-[#16A34A] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Thank you! Your feedback has been logged for our 2026 support team.</span>
            </div>
          )}
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F9D58] via-[#0F281E] to-[#0F172A] p-8 sm:p-12 text-center text-white shadow-2xl">
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
              We're Here to Help You Succeed
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Whether you're preparing for the UTME, exploring universities, or planning your admission journey, JAMB Compass is here to support you throughout 2026.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="py-3 px-6 bg-[#82FAAB] text-[#00210E] text-xs font-extrabold rounded-2xl hover:bg-white transition-all shadow-lg"
              >
                Return to Dashboard
              </button>
              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="py-3 px-6 bg-white/10 text-white border border-white/20 text-xs font-bold rounded-2xl hover:bg-white/20 transition-all"
              >
                Explore Study Hub
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL: READ ARTICLE */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 relative ${darkMode ? 'bg-[#1C2541] text-white' : 'bg-white text-[#0F172A]'}`}>
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="space-y-3">
              <span className="bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold px-3 py-1 rounded-full uppercase">
                {activeArticleModal.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display">
                {activeArticleModal.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-[#475569] dark:text-slate-400 font-medium">
                <span>{activeArticleModal.readTime}</span>
                <span>•</span>
                <span>{activeArticleModal.updatedDate}</span>
              </div>
            </div>

            <div className="h-48 rounded-2xl overflow-hidden">
              <img src={activeArticleModal.imageUrl} alt={activeArticleModal.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#475569] dark:text-slate-300">
              {activeArticleModal.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex justify-between items-center">
              <button
                onClick={() => toggleBookmark(activeArticleModal.id)}
                className="py-2.5 px-4 rounded-xl border border-[#0F9D58] text-[#0F9D58] text-xs font-bold flex items-center gap-2 hover:bg-[#0F9D58]/10"
              >
                <span className="material-symbols-outlined text-sm">
                  {activeArticleModal.bookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>{activeArticleModal.bookmarked ? 'Bookmarked' : 'Bookmark Article'}</span>
              </button>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="py-2.5 px-5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW TICKET */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl p-6 space-y-5 shadow-2xl relative ${darkMode ? 'bg-[#1C2541] text-white' : 'bg-white text-[#0F172A]'}`}>
            <button
              onClick={() => setIsTicketModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="space-y-1">
              <h2 className="text-lg font-bold font-display">Create 2026 Support Ticket</h2>
              <p className="text-xs text-[#475569] dark:text-slate-400">Describe your inquiry for our support team.</p>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="e.g. Delay receiving profile code SMS"
                  className="w-full p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white"
                  >
                    <option value="Registration">JAMB Registration</option>
                    <option value="CBT Practice">CBT Practice Help</option>
                    <option value="Admission Guidance">Admission Guidance</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High (Urgent)</option>
                    <option value="Urgent">Urgent (Exam Pending)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Description</label>
                <textarea
                  required
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="Provide detailed information regarding your 2026 application issue..."
                  className="w-full p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-xs text-[#0F172A] dark:text-white"
                  rows={4}
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500 cursor-pointer hover:bg-slate-200">
                📎 Attach File or Screenshot (Optional)
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A]"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: WATCH VIDEO TUTORIAL */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedVideoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-base font-bold font-display pr-8">{selectedVideoModal.title}</h3>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
              <img src={selectedVideoModal.thumbnail} alt={selectedVideoModal.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 rounded-full bg-[#0F9D58] text-white animate-pulse">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedVideoModal.desc}</p>
          </div>
        </div>
      )}

    </div>
  );
};
