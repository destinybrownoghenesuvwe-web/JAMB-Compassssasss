import React, { useState } from 'react';
import { TabType } from '../types';

interface ParentDashboardScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  admissionYear: number;
  preferredCourse: string;
  preferredUniversity: string;
  readinessScore: number;
  status: 'On Track - High Readiness' | 'Needs Support' | 'Exceeding Goals';
  studyHoursThisWeek: number;
  cbtSessionsCompleted: number;
  mockExamsCompleted: number;
  avgPracticeScore: number;
  studyStreak: number;
  goalsAchieved: number;
  totalGoals: number;
}

const DEMO_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'samuel',
    name: 'Samuel Adebayo',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    admissionYear: 2026,
    preferredCourse: 'Computer Science',
    preferredUniversity: 'University of Lagos (UNILAG)',
    readinessScore: 85,
    status: 'On Track - High Readiness',
    studyHoursThisWeek: 42,
    cbtSessionsCompleted: 18,
    mockExamsCompleted: 4,
    avgPracticeScore: 312,
    studyStreak: 14,
    goalsAchieved: 8,
    totalGoals: 10
  },
  {
    id: 'chidimma',
    name: 'Chidimma Adebayo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    admissionYear: 2026,
    preferredCourse: 'Medicine & Surgery',
    preferredUniversity: 'University of Ibadan (UI)',
    readinessScore: 91,
    status: 'Exceeding Goals',
    studyHoursThisWeek: 48,
    cbtSessionsCompleted: 24,
    mockExamsCompleted: 6,
    avgPracticeScore: 338,
    studyStreak: 21,
    goalsAchieved: 9,
    totalGoals: 10
  }
];

export const ParentDashboardScreen: React.FC<ParentDashboardScreenProps> = ({ setActiveTab }) => {
  // Active Student Profile
  const [selectedStudentId, setSelectedStudentId] = useState<string>('samuel');
  const student = DEMO_STUDENT_PROFILES.find(s => s.id === selectedStudentId) || DEMO_STUDENT_PROFILES[0];

  // UI View States (Testing state toggles)
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'empty' | 'offline'>('normal');

  // Interactive Modals & Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showEncouragementModal, setShowEncouragementModal] = useState(false);
  const [encouragementNote, setEncouragementNote] = useState('');
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('2026-08-05');
  const [showWeeklyReportModal, setShowWeeklyReportModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState<any | null>(null);
  const [showTipModal, setShowTipModal] = useState<any | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [sentMessages, setSentMessages] = useState<string[]>([
    "Keep up the great work in Physics, Samuel! Proud of your 14-day streak!"
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(curr => (curr === msg ? null : curr));
    }, 4000);
  };

  const handleSendEncouragement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!encouragementNote.trim()) return;
    setSentMessages(prev => [encouragementNote, ...prev]);
    triggerToast(`Encouragement note sent to ${student.name}'s 2026 dashboard! 💌`);
    setEncouragementNote('');
    setShowEncouragementModal(false);
  };

  const handleScheduleReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderTitle.trim()) return;
    triggerToast(`Study reminder "${reminderTitle}" scheduled for ${reminderDate}! 📅`);
    setReminderTitle('');
    setShowReminderModal(false);
  };

  // Subjects performance demo data
  const subjectsData = [
    {
      name: 'Use of English',
      score: 84,
      targetScore: 90,
      studyHours: 12.5,
      topicsCompleted: 10,
      totalTopics: 12,
      trend: 'up',
      trendValue: '+5%',
      color: 'bg-[#0F9D58]',
      textColor: 'text-[#0F9D58]',
      weakArea: 'Oral English Stress Patterns',
      strongArea: 'Concord & Lexis'
    },
    {
      name: 'Mathematics',
      score: 78,
      targetScore: 85,
      studyHours: 14.0,
      topicsCompleted: 9,
      totalTopics: 12,
      trend: 'up',
      trendValue: '+8%',
      color: 'bg-[#2563EB]',
      textColor: 'text-[#2563EB]',
      weakArea: 'Calculus Derivatives',
      strongArea: 'Trigonometry & Quadratic Equations'
    },
    {
      name: 'Physics',
      score: 76,
      targetScore: 85,
      studyHours: 9.5,
      topicsCompleted: 8,
      totalTopics: 12,
      trend: 'up',
      trendValue: '+4%',
      color: 'bg-[#F59E0B]',
      textColor: 'text-[#B45309]',
      weakArea: 'Electromagnetism & Waves',
      strongArea: 'Vectors & Scalar Motion'
    },
    {
      name: 'Chemistry',
      score: 64,
      targetScore: 80,
      studyHours: 6.0,
      topicsCompleted: 5,
      totalTopics: 12,
      trend: 'down',
      trendValue: '-3%',
      color: 'bg-[#DC2626]',
      textColor: 'text-[#DC2626]',
      weakArea: 'Organic Reaction Mechanisms',
      strongArea: 'Periodic Table Properties'
    },
    {
      name: 'Biology (Elective)',
      score: 82,
      targetScore: 90,
      studyHours: 8.0,
      topicsCompleted: 9,
      totalTopics: 11,
      trend: 'up',
      trendValue: '+6%',
      color: 'bg-[#16A34A]',
      textColor: 'text-[#16A34A]',
      weakArea: 'Plant Reproduction',
      strongArea: 'Human Digestive & Nervous System'
    },
    {
      name: 'Government',
      score: 88,
      targetScore: 90,
      studyHours: 7.5,
      topicsCompleted: 10,
      totalTopics: 10,
      trend: 'up',
      trendValue: '+9%',
      color: 'bg-[#0F172A]',
      textColor: 'text-[#0F172A]',
      weakArea: 'Pre-Colonial Administration',
      strongArea: 'Nigerian 1999 Constitution'
    },
    {
      name: 'Economics',
      score: 79,
      targetScore: 85,
      studyHours: 6.5,
      topicsCompleted: 7,
      totalTopics: 10,
      trend: 'up',
      trendValue: '+2%',
      color: 'bg-[#2563EB]',
      textColor: 'text-[#2563EB]',
      weakArea: 'Market Elasticity Calculations',
      strongArea: 'Inflation & Fiscal Policies'
    },
    {
      name: 'Literature in English',
      score: 85,
      targetScore: 90,
      studyHours: 8.5,
      topicsCompleted: 9,
      totalTopics: 10,
      trend: 'up',
      trendValue: '+7%',
      color: 'bg-[#0F9D58]',
      textColor: 'text-[#0F9D58]',
      weakArea: 'African Poetry Figures of Speech',
      strongArea: 'JAMB Prescribed Prose Drama'
    },
    {
      name: 'Commerce',
      score: 81,
      targetScore: 85,
      studyHours: 5.5,
      topicsCompleted: 8,
      totalTopics: 10,
      trend: 'same',
      trendValue: '0%',
      color: 'bg-[#F59E0B]',
      textColor: 'text-[#B45309]',
      weakArea: 'Foreign Trade Documents',
      strongArea: 'Consumer Protection Laws'
    }
  ];

  // Timeline entries (2026)
  const timelineActivities = [
    {
      id: 't1',
      title: 'Scheduled CBT Practice Simulation',
      date: 'Aug 04, 2026',
      time: '04:00 PM',
      type: 'CBT Test',
      status: 'Upcoming',
      badgeColor: 'bg-[#2563EB]/10 text-[#2563EB]',
      description: '40-question timed speed drill covering Use of English & Physics.'
    },
    {
      id: 't2',
      title: 'Weekly Chemistry Intensive Revision',
      date: 'Aug 07, 2026',
      time: '05:30 PM',
      type: 'Revision Session',
      status: 'Scheduled',
      badgeColor: 'bg-[#F59E0B]/10 text-[#B45309]',
      description: 'Focused review of Organic Hydrocarbons & Mole Concept calculations.'
    },
    {
      id: 't3',
      title: '2026 Full Length CBT Mock Exam #5',
      date: 'Aug 12, 2026',
      time: '09:00 AM',
      type: 'Mock Exam',
      status: 'High Priority',
      badgeColor: 'bg-[#DC2626]/10 text-[#DC2626]',
      description: 'Full 2-hour 400-mark mock simulation under exam conditions.'
    },
    {
      id: 't4',
      title: 'NNPC/Seplat Tertiary Scholarship Deadline',
      date: 'Aug 20, 2026',
      time: '11:59 PM',
      type: 'Scholarship',
      status: 'Reminder',
      badgeColor: 'bg-[#0F9D58]/10 text-[#0F9D58]',
      description: 'Verify O\'Level requirements and save 2026 application draft.'
    },
    {
      id: 't5',
      title: 'UNILAG CAPS & Course Requirements Review',
      date: 'Aug 28, 2026',
      time: '03:00 PM',
      type: 'University Research',
      status: 'Planned',
      badgeColor: 'bg-[#0F172A]/10 text-[#0F172A]',
      description: 'Review departmental cut-off history for Computer Science 2026 admission.'
    }
  ];

  // Goals (2026)
  const goalsList = [
    {
      id: 'g1',
      title: 'Complete 10 Mock Examinations',
      current: 4,
      target: 10,
      unit: 'Mocks',
      estDate: 'Oct 15, 2026',
      color: '#0F9D58'
    },
    {
      id: 'g2',
      title: 'Finish Biology & Chemistry Syllabus',
      current: 14,
      target: 23,
      unit: 'Topics',
      estDate: 'Sep 30, 2026',
      color: '#2563EB'
    },
    {
      id: 'g3',
      title: 'Maintain 30-Day Active Study Streak',
      current: student.studyStreak,
      target: 30,
      unit: 'Days',
      estDate: 'Aug 25, 2026',
      color: '#F59E0B'
    },
    {
      id: 'g4',
      title: 'Reach 90% Overall Readiness Score',
      current: student.readinessScore,
      target: 90,
      unit: '% Score',
      estDate: 'Nov 10, 2026',
      color: '#16A34A'
    },
    {
      id: 'g5',
      title: 'Complete Weekly 15-Hour Target',
      current: 12,
      target: 15,
      unit: 'Hours',
      estDate: 'Aug 03, 2026',
      color: '#0F172A'
    }
  ];

  // Achievement Badges
  const badgesList = [
    {
      title: 'Early Starter 2026',
      date: 'Jan 14, 2026',
      icon: 'rocket_launch',
      bg: 'bg-[#0F9D58]/10 text-[#0F9D58]',
      desc: 'Began early 2026 JAMB preparation 6 months ahead of schedule.'
    },
    {
      title: '100 Practice Questions',
      date: 'Feb 20, 2026',
      icon: 'task_alt',
      bg: 'bg-[#2563EB]/10 text-[#2563EB]',
      desc: 'Completed 100 accurate CBT questions across Mathematics and English.'
    },
    {
      title: '7-Day Study Streak',
      date: 'Mar 15, 2026',
      icon: 'local_fire_department',
      bg: 'bg-[#F59E0B]/10 text-[#F59E0B]',
      desc: 'Logged in and studied every day for 7 consecutive calendar days.'
    },
    {
      title: 'Top Subject Improved',
      date: 'May 04, 2026',
      icon: 'trending_up',
      bg: 'bg-[#16A34A]/10 text-[#16A34A]',
      desc: 'Increased Mathematics mock score by +15% over a single month.'
    },
    {
      title: 'Mock Champion',
      date: 'Jun 12, 2026',
      icon: 'military_tech',
      bg: 'bg-[#FBBF24]/20 text-[#B45309]',
      desc: 'Scored above 300 marks in a full 2026 CBT timed mock simulation.'
    },
    {
      title: 'Consistent Learner',
      date: 'Jul 08, 2026',
      icon: 'auto_awesome',
      bg: 'bg-[#0F9D58]/10 text-[#0F9D58]',
      desc: 'Completed 40+ total study hours in a single calendar month.'
    },
    {
      title: 'Scholarship Explorer',
      date: 'Jul 22, 2026',
      icon: 'school',
      bg: 'bg-[#2563EB]/10 text-[#2563EB]',
      desc: 'Explored and bookmarked eligible 2026 Nigerian tertiary scholarships.'
    },
    {
      title: 'Career Planner',
      date: 'Jul 28, 2026',
      icon: 'work_history',
      bg: 'bg-[#0F172A]/10 text-[#0F172A]',
      desc: 'Mapped subject combinations to prospective university degree requirements.'
    }
  ];

  // Notifications 2026
  const notificationsList = [
    {
      id: 'n1',
      title: 'Weekly Progress Report Ready',
      desc: `Detailed breakdown of ${student.name}'s study hours and subject accuracy for Week 30, 2026 is available.`,
      date: 'Jul 31, 2026',
      icon: 'assessment',
      unread: true
    },
    {
      id: 'n2',
      title: 'New Achievement Earned!',
      desc: `${student.name} unlocked the "14-Day Study Streak" badge with 42 study hours!`,
      date: 'Jul 29, 2026',
      icon: 'emoji_events',
      unread: false
    },
    {
      id: 'n3',
      title: 'Upcoming CBT Mock Exam Alert',
      desc: 'Full length 400-mark mock simulation #5 scheduled for August 12, 2026.',
      date: 'Jul 27, 2026',
      icon: 'event_note',
      unread: false
    },
    {
      id: 'n4',
      title: 'Weekly Study Goal Achieved',
      desc: 'Samuel completed 100% of his planned Mathematics & Physics drills for the week.',
      date: 'Jul 25, 2026',
      icon: 'check_circle',
      unread: false
    },
    {
      id: 'n5',
      title: 'New Chemistry Syllabus Video Added',
      desc: 'JAMB Compass uploaded 5 new Organic Chemistry solved video solutions for 2026.',
      date: 'Jul 20, 2026',
      icon: 'play_circle',
      unread: false
    }
  ];

  // Parent Resource Cards
  const parentResources = [
    {
      id: 'r1',
      title: 'Supporting Effective Study Habits at Home',
      category: 'Study Environment',
      readTime: '4 min read',
      icon: 'home_work',
      summary: 'Practical guidelines on creating a quiet, distraction-free CBT practice space for your 2026 candidate.'
    },
    {
      id: 'r2',
      title: 'Understanding the 2026 JAMB CAPS & Admission Journey',
      category: 'Admission Policy',
      readTime: '6 min read',
      icon: 'account_tree',
      summary: 'Demystifying O\'Level upload requirements, departmental cut-off marks, and CAPS acceptance steps.'
    },
    {
      id: 'r3',
      title: 'Helping Students Manage Exam Anxiety & Stress',
      category: 'Mental Wellness',
      readTime: '5 min read',
      icon: 'spa',
      summary: 'Recognizing signs of pressure, encouraging restful sleep, and keeping motivation high before CBT exams.'
    },
    {
      id: 'r4',
      title: 'Choosing the Right University & Course Alignment',
      category: 'Career Guidance',
      readTime: '7 min read',
      icon: 'domain',
      summary: 'Evaluating catchment areas, accreditation status, and subject combination rules for Nigerian universities.'
    },
    {
      id: 'r5',
      title: 'Financial Planning & Tertiary Scholarship Guide 2026',
      category: 'Scholarships',
      readTime: '8 min read',
      icon: 'payments',
      summary: 'Comprehensive list of undergraduate scholarships, application timelines, and financial aid strategies.'
    }
  ];

  // FAQs
  const faqItems = [
    {
      q: 'How are progress scores calculated on this dashboard?',
      a: 'The Overall Readiness Score is a weighted calculation derived from student CBT practice accuracy (40%), mock exam scores (30%), syllabus topic completion (20%), and study streak consistency (10%) within JAMB Compass.'
    },
    {
      q: 'Can I receive automated weekly progress reports via email or SMS?',
      a: 'Yes! You can enable automated weekly PDF summaries sent directly to your registered parent email address every Sunday evening during the 2026 admission cycle.'
    },
    {
      q: 'How can I best support my student using this dashboard?',
      a: 'Use the "Send Encouragement" tool to leave positive notes, review upcoming mock dates together on the calendar, celebrate new badge milestones, and ensure consistent daily study sessions.'
    },
    {
      q: 'Does this dashboard display official JAMB examination results?',
      a: 'No. This parent dashboard displays demo learning analytics, practice test scores, and study activity generated strictly within JAMB Compass. It is not affiliated with official JAMB portal records or official examination transcripts.'
    },
    {
      q: 'How are personalized study recommendations generated?',
      a: 'Recommendations are automatically generated by analyzing subject performance trends—highlighting topics where your student scores below target and recommending targeted revision exercises.'
    }
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8FAFC] text-[#0F172A] font-sans pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58]/40 animate-slide-up">
          <span className="material-symbols-outlined text-[#FBBF24]">verified</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 2026 DEMO DISCLAIMER BANNER */}
      <div className="bg-[#0F172A] text-white py-2.5 px-4 text-center border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2 font-medium text-emerald-400">
            <span className="material-symbols-outlined text-base text-[#FBBF24]">shield_person</span>
            <span>
              <strong>2026 JAMB Admission Cycle:</strong> Parent &amp; Guardian Monitoring Portal.
            </span>
          </div>
          <div className="text-slate-300 text-xs hidden sm:block">
            All student progress, test scores, and reports shown are demo learning analytics in JAMB Compass.
          </div>

          {/* UI State Switcher to test edge cases */}
          <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg text-xs">
            <span className="text-slate-400 text-[11px]">Demo Mode:</span>
            <button
              onClick={() => setViewState('normal')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                viewState === 'normal' ? 'bg-[#0F9D58] text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Active Data
            </button>
            <button
              onClick={() => setViewState('loading')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                viewState === 'loading' ? 'bg-[#2563EB] text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Loading State
            </button>
            <button
              onClick={() => setViewState('offline')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                viewState === 'offline' ? 'bg-[#DC2626] text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Offline Alert
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-[#475569] mb-6">
          <button 
            onClick={() => setActiveTab && setActiveTab('home')}
            className="hover:text-[#0F9D58] transition-colors"
          >
            Home
          </button>
          <span className="material-symbols-outlined text-sm text-[#CBD5E1]">chevron_right</span>
          <span className="font-semibold text-[#0F9D58]">Parent Dashboard</span>
        </nav>

        {/* LOADING STATE VIEW */}
        {viewState === 'loading' && (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center my-10 space-y-4">
            <div className="w-16 h-16 border-4 border-[#0F9D58] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="text-xl font-bold font-display text-[#0F172A]">Syncing 2026 Student Learning Analytics...</h3>
            <p className="text-sm text-[#475569]">Fetching real-time CBT practice scores, study hours, and mock exam trends for {student.name}.</p>
          </div>
        )}

        {/* OFFLINE / ERROR STATE VIEW */}
        {viewState === 'offline' && (
          <div className="bg-rose-50 border border-rose-200 p-8 rounded-3xl text-center my-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">wifi_off</span>
            </div>
            <h3 className="text-xl font-bold font-display text-rose-900">Connection Interrupted</h3>
            <p className="text-sm text-rose-700 max-w-lg mx-auto">
              Unable to reach JAMB Compass cloud server. Please check your internet connection or try again. Cached demo student data for 2026 remains visible below.
            </p>
            <button 
              onClick={() => setViewState('normal')}
              className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition-all"
            >
              Retry Connection
            </button>
          </div>
        )}

        {viewState === 'normal' && (
          <>
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F9D58] text-white rounded-3xl p-6 md:p-10 shadow-xl mb-10 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#0F9D58]/10 blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#FBBF24] border border-white/10">
                    <span className="material-symbols-outlined text-sm">family_restroom</span>
                    Guardian Portal • 2026 JAMB Session
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                    Parent &amp; Guardian <span className="text-[#FBBF24]">Dashboard</span>
                  </h1>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                    Monitor learning progress, celebrate achievements, and support your student's preparation throughout the 2026 admission cycle.
                  </p>

                  {/* Student Profile Switcher Tabs */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <span className="text-xs text-slate-300 font-medium">Select Student:</span>
                    {DEMO_STUDENT_PROFILES.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setSelectedStudentId(st.id);
                          triggerToast(`Switched view to ${st.name}'s 2026 dashboard! 🎓`);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                          selectedStudentId === st.id
                            ? 'bg-[#0F9D58] text-white shadow-lg ring-2 ring-emerald-400/40'
                            : 'bg-white/10 text-slate-200 hover:bg-white/20'
                        }`}
                      >
                        <img src={st.avatar} alt={st.name} className="w-5 h-5 rounded-full object-cover" />
                        <span>{st.name}</span>
                        <span className="text-[10px] opacity-80">({st.preferredCourse})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hero Illustration Graphic Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full max-w-md shadow-2xl space-y-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0F9D58] to-[#FBBF24] p-1 mx-auto shadow-lg relative">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                      />
                      <span className="absolute bottom-0 right-0 bg-[#0F9D58] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                        2026
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white">{student.name}</h3>
                      <p className="text-xs text-emerald-300 font-medium">{student.preferredCourse} • {student.preferredUniversity}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-black/20 p-3 rounded-xl text-xs text-left">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Status</span>
                        <p className="font-bold text-emerald-400 text-xs">{student.status}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Streak</span>
                        <p className="font-bold text-[#FBBF24] text-xs flex items-center gap-1">
                          {student.studyStreak} Days 🔥
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WELCOME CARD */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified_user</span>
                      Active Student Profile
                    </span>
                    <span className="bg-slate-100 text-[#475569] text-xs font-medium px-3 py-1.5 rounded-full">
                      JAMB Cycle Year: <strong>2026</strong>
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold font-display text-[#0F172A]">
                    {student.name}'s Preparation Summary
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#475569] pt-1">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Course</span>
                      <strong className="text-[#0F172A] text-sm block mt-0.5">{student.preferredCourse}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Target University</span>
                      <strong className="text-[#0F172A] text-sm block mt-0.5">{student.preferredUniversity}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Learning Status</span>
                      <strong className="text-[#0F9D58] text-sm block mt-0.5">{student.status}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-3">
                    <button 
                      onClick={() => {
                        if (setActiveTab) setActiveTab('profile');
                      }}
                      className="px-5 py-2.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">person</span>
                      View Student Profile
                    </button>

                    <button 
                      onClick={() => setShowWeeklyReportModal(true)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold rounded-xl border border-slate-200 transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">download</span>
                      Download Progress Summary (Demo PDF)
                    </button>
                  </div>
                </div>

                {/* Overall Readiness Ring */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8 text-center space-y-3">
                  <div className="w-32 h-32 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="54" stroke="#E2E8F0" strokeWidth="10" fill="transparent" />
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="54" 
                        stroke="#0F9D58" 
                        strokeWidth="10" 
                        fill="transparent" 
                        strokeDasharray="339.29"
                        strokeDashoffset={339.29 - (339.29 * student.readinessScore) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-[#0F172A] font-display">{student.readinessScore}%</span>
                      <span className="text-[10px] font-bold text-[#0F9D58] uppercase">Readiness</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Overall 2026 Readiness Score</h4>
                    <p className="text-[11px] text-[#475569] max-w-xs">
                      Derived from CBT accuracy, syllabus topics, and mock exam performance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* LEARNING OVERVIEW KPI CARDS */}
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <span className="text-2xl font-extrabold text-[#0F172A] font-display">{student.studyHoursThisWeek}h</span>
                <span className="text-xs text-[#475569] font-medium mt-0.5">Study Hours This Week</span>
                <span className="text-[10px] font-bold text-[#0F9D58] mt-1">↑ +15% vs last week</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-xl">quiz</span>
                </div>
                <span className="text-2xl font-extrabold text-[#0F172A] font-display">{student.cbtSessionsCompleted}</span>
                <span className="text-xs text-[#475569] font-medium mt-0.5">CBT Sessions Done</span>
                <span className="text-[10px] font-bold text-[#2563EB] mt-1">100% Verified</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
                </div>
                <span className="text-2xl font-extrabold text-[#0F172A] font-display">{student.mockExamsCompleted}</span>
                <span className="text-xs text-[#475569] font-medium mt-0.5">Mock Exams Done</span>
                <span className="text-[10px] font-bold text-[#B45309] mt-1">Target: 10 Exams</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-xl">insights</span>
                </div>
                <span className="text-2xl font-extrabold text-[#0F172A] font-display">{student.avgPracticeScore} / 400</span>
                <span className="text-xs text-[#475569] font-medium mt-0.5">Avg Practice Score</span>
                <span className="text-[10px] font-bold text-[#16A34A] mt-1">High Cut-off Tier</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/20 text-[#B45309] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-xl">local_fire_department</span>
                </div>
                <span className="text-2xl font-extrabold text-[#0F172A] font-display">{student.studyStreak} Days</span>
                <span className="text-xs text-[#475569] font-medium mt-0.5">Active Study Streak</span>
                <span className="text-[10px] font-bold text-[#B45309] mt-1">🔥 Top 5% Consistency</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-xl">emoji_events</span>
                </div>
                <span className="text-2xl font-extrabold text-[#0F172A] font-display">{student.goalsAchieved} / {student.totalGoals}</span>
                <span className="text-xs text-[#475569] font-medium mt-0.5">Goals Achieved</span>
                <span className="text-[10px] font-bold text-[#0F172A] mt-1">80% Milestone</span>
              </div>
            </section>

            {/* PROGRESS DASHBOARD & ANALYTICS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Weekly Performance & Trend Chart */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-[#0F172A]">Study Hours &amp; CBT Performance Trend</h3>
                    <p className="text-xs text-[#475569]">Monitored daily activity during July &amp; August 2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#475569]">Legend:</span>
                    <span className="text-xs font-semibold text-[#0F9D58] flex items-center gap-1">
                      <span className="w-3 h-3 bg-[#0F9D58] rounded-full inline-block"></span> Study Hours
                    </span>
                    <span className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 ml-2">
                      <span className="w-3 h-3 bg-[#2563EB] rounded-full inline-block"></span> Test Accuracy
                    </span>
                  </div>
                </div>

                {/* Simulated Visual Chart */}
                <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-200 pb-4">
                  {[
                    { day: 'Mon', hours: 5.5, score: 78, label: '5.5h / 78%' },
                    { day: 'Tue', hours: 7.0, score: 85, label: '7.0h / 85%' },
                    { day: 'Wed', hours: 4.5, score: 72, label: '4.5h / 72%' },
                    { day: 'Thu', hours: 8.0, score: 90, label: '8.0h / 90%' },
                    { day: 'Fri', hours: 6.5, score: 82, label: '6.5h / 82%' },
                    { day: 'Sat', hours: 7.5, score: 88, label: '7.5h / 88%' },
                    { day: 'Sun', hours: 3.0, score: 70, label: '3.0h / 70%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] px-2.5 py-1 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-md">
                        {item.day}: {item.label}
                      </div>

                      <div className="w-full max-w-[40px] flex items-end justify-center gap-1 h-full">
                        {/* Hours Bar */}
                        <div 
                          className="w-1/2 bg-[#0F9D58] rounded-t-lg transition-all duration-500 group-hover:bg-[#16A34A]" 
                          style={{ height: `${(item.hours / 9) * 100}%` }}
                        ></div>
                        {/* Score Bar */}
                        <div 
                          className="w-1/2 bg-[#2563EB] rounded-t-lg transition-all duration-500 group-hover:bg-blue-600" 
                          style={{ height: `${(item.score / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-[#475569]">{item.day}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Weekly Study Consistency</span>
                    <p className="text-lg font-bold text-[#0F172A] mt-0.5">94% (6/7 Active Days)</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Average Session Length</span>
                    <p className="text-lg font-bold text-[#0F9D58] mt-0.5">1.8 Hours / Session</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Monthly Trend Curve</span>
                    <p className="text-lg font-bold text-[#2563EB] mt-0.5">Steady ↑ +12% Growth</p>
                  </div>
                </div>
              </div>

              {/* Subject Completion & Readiness Cards */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold font-display text-[#0F172A]">Syllabus Completion</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#0F172A]">Use of English</span>
                        <span className="text-[#0F9D58]">83% (10/12 topics)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: '83%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#0F172A]">Mathematics</span>
                        <span className="text-[#2563EB]">75% (9/12 topics)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#0F172A]">Physics</span>
                        <span className="text-[#F59E0B]">67% (8/12 topics)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#0F172A]">Chemistry</span>
                        <span className="text-[#DC2626]">42% (5/12 topics)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#DC2626] h-full rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Encouragement Box */}
                <div className="bg-gradient-to-br from-[#0F9D58] to-[#0F172A] text-white p-6 rounded-3xl shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FBBF24]">
                    <span className="material-symbols-outlined text-base">volunteer_activism</span>
                    Parent Encouragement
                  </div>
                  <h4 className="font-bold text-base text-white">Send {student.name} a Boost Note</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A quick word of encouragement boosts candidate morale before major CBT practice tests.
                  </p>
                  <button 
                    onClick={() => setShowEncouragementModal(true)}
                    className="w-full py-2.5 bg-[#FBBF24] hover:bg-amber-400 text-[#0F172A] text-xs font-bold rounded-xl shadow transition-all"
                  >
                    Write Encouragement Message 💌
                  </button>
                </div>
              </div>
            </section>

            {/* SUBJECT PERFORMANCE GRID */}
            <section className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-display text-[#0F172A]">Subject Performance Breakdown</h2>
                  <p className="text-xs text-[#475569]">Detailed 2026 practice scores, hours logged, and improvement trends</p>
                </div>
                <span className="text-xs font-semibold text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1.5 rounded-full">
                  Click any subject to inspect topic mastery
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectsData.map((sub, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setShowSubjectModal(sub)}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-extrabold px-3 py-1 rounded-full text-white ${sub.color}`}>
                          {sub.name}
                        </span>
                        <span className={`text-xs font-bold flex items-center gap-0.5 ${
                          sub.trend === 'up' ? 'text-[#16A34A]' : sub.trend === 'down' ? 'text-[#DC2626]' : 'text-[#475569]'
                        }`}>
                          {sub.trend === 'up' && '↑'} {sub.trend === 'down' && '↓'} {sub.trendValue}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-extrabold text-[#0F172A] font-display">{sub.score}%</span>
                        <span className="text-xs text-slate-400">Target: {sub.targetScore}%</span>
                      </div>

                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
                        <div className={`${sub.color} h-full rounded-full transition-all duration-700`} style={{ width: `${sub.score}%` }}></div>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#475569] border-t border-slate-100 pt-3">
                        <div className="flex justify-between">
                          <span>Study Time Logged:</span>
                          <strong className="text-[#0F172A]">{sub.studyHours} Hours</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Syllabus Completion:</span>
                          <strong className="text-[#0F172A]">{sub.topicsCompleted} of {sub.totalTopics} Topics</strong>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0F9D58] font-bold group-hover:underline">
                      <span>View Topic Analysis</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* UPCOMING ACTIVITIES TIMELINE & GOALS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Upcoming Activities Timeline */}
              <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#0F172A]">Upcoming Activities (2026)</h2>
                    <p className="text-xs text-[#475569]">Scheduled CBT practice, mock exams, and reminders</p>
                  </div>
                  <button 
                    onClick={() => setShowReminderModal(true)}
                    className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 hover:bg-[#0F9D58]/20 px-3 py-1.5 rounded-xl transition-all"
                  >
                    + Add Reminder
                  </button>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                  {timelineActivities.map((act) => (
                    <div key={act.id} className="relative pl-8 space-y-1 group">
                      <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-white border-2 border-[#0F9D58] flex items-center justify-center text-[10px] font-bold text-[#0F9D58] shadow-sm">
                        ✓
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-400">{act.date} • {act.time}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${act.badgeColor}`}>
                          {act.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">{act.title}</h4>
                      <p className="text-xs text-[#475569] leading-relaxed">{act.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals & Milestones */}
              <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#0F172A]">Goals &amp; Milestones</h2>
                    <p className="text-xs text-[#475569]">Target completion tracking for 2026 preparation</p>
                  </div>
                  <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-3 py-1.5 rounded-full">
                    80% Overall Target
                  </span>
                </div>

                <div className="space-y-4">
                  {goalsList.map((goal) => {
                    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                    return (
                      <div key={goal.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A]">{goal.title}</h4>
                            <p className="text-[11px] text-[#475569]">Estimated Completion: <strong>{goal.estDate}</strong></p>
                          </div>
                          <span className="text-xs font-extrabold text-[#0F172A]">{pct}%</span>
                        </div>

                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-700" 
                            style={{ width: `${pct}%`, backgroundColor: goal.color }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-[11px] text-[#475569]">
                          <span>Current: {goal.current} {goal.unit}</span>
                          <span>Target: {goal.target} {goal.unit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ACHIEVEMENTS BADGE GALLERY */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-display text-[#0F172A]">Earned Achievements Gallery</h2>
                  <p className="text-xs text-[#475569]">{student.name}'s milestone trophies unlocked in 2026</p>
                </div>
                <span className="text-xs font-bold text-[#FBBF24] bg-[#FBBF24]/20 text-[#B45309] px-3 py-1.5 rounded-full">
                  🏆 8 Trophies Unlocked
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badgesList.map((b, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      triggerToast(`Badge Details: ${b.title} unlocked on ${b.date}! 🏆`);
                    }}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all text-center flex flex-col items-center space-y-2 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-full ${b.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                      <span className="material-symbols-outlined">{b.icon}</span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">{b.title}</h4>
                    <p className="text-[10px] text-[#475569] leading-tight line-clamp-2">{b.desc}</p>
                    <span className="text-[10px] font-semibold text-[#0F9D58] bg-[#0F9D58]/10 px-2 py-0.5 rounded-full">
                      Unlocked {b.date}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ATTENDANCE & CONSISTENCY HEATMAP */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#0F172A]">Attendance &amp; Study Consistency Heatmap</h2>
                  <p className="text-xs text-[#475569]">Daily activity log for the 2026 admission cycle</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#475569]">
                  <span>Less Active</span>
                  <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200"></span>
                  <span className="w-3 h-3 rounded bg-[#0F9D58]/30"></span>
                  <span className="w-3 h-3 rounded bg-[#0F9D58]/60"></span>
                  <span className="w-3 h-3 rounded bg-[#0F9D58]"></span>
                  <span>More Active</span>
                </div>
              </div>

              {/* Heatmap Grid Simulation */}
              <div className="overflow-x-auto w-full max-w-full pb-2">
                <div className="min-w-[700px] flex flex-col gap-2">
                  <div className="grid grid-cols-12 gap-2 text-center text-xs font-bold text-slate-400">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                      <span key={i}>{m} 2026</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    {Array.from({ length: 12 }).map((_, mIdx) => (
                      <div key={mIdx} className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        {Array.from({ length: 16 }).map((__, dIdx) => {
                          const isHigh = (mIdx + dIdx) % 3 === 0;
                          const isMid = (mIdx + dIdx) % 2 === 0;
                          return (
                            <div 
                              key={dIdx} 
                              className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${
                                mIdx > 7 ? 'bg-slate-100' : isHigh ? 'bg-[#0F9D58]' : isMid ? 'bg-[#0F9D58]/50' : 'bg-[#0F9D58]/20'
                              }`}
                              title={`Day ${dIdx + 1}, ${mIdx + 1}/2026`}
                            ></div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-2">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Consistency Score</span>
                  <p className="text-xl font-extrabold text-[#0F9D58] font-display">94% Excellent</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Active Days Logged</span>
                  <p className="text-xl font-extrabold text-[#2563EB] font-display">184 / 210 Days</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Average Session Length</span>
                  <p className="text-xl font-extrabold text-[#0F172A] font-display">1.8 Hours / Session</p>
                </div>
              </div>
            </section>

            {/* PERSONALISED INSIGHTS & RECOMMENDATIONS */}
            <section className="bg-emerald-900/10 border border-[#0F9D58]/30 rounded-3xl p-6 md:p-8 mb-12 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F9D58] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#0F172A]">Personalised Guardian Recommendations</h2>
                    <p className="text-xs text-[#475569]">Smart actionable tips generated for {student.name}'s 2026 preparation</p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1.5 rounded-full border border-[#0F9D58]/20">
                  Notice: Recommendations generated from demo learning analytics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#DC2626] bg-rose-50 px-2.5 py-1 rounded-full inline-block">
                    ⚡ Priority Focus Area
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A]">Encourage Organic Chemistry Revision</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Chemistry practice score is currently at 64%. Suggest scheduling an extra 30 minutes of Organic Reaction drills on Thursday evenings.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-full inline-block">
                    🎉 Celebrate Progress
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A]">Acknowledge Mathematics Improvement</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Mathematics score increased from 70% to 78% this month! Commend {student.name} for maintaining high trigonometry drill scores.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full inline-block">
                    📖 Reading Habit
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A]">Increase Daily Literature Reading</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Help {student.name} review prescribed 2026 JAMB prose texts for 15 minutes before bedtime to boost Lexis &amp; Structure speed.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#F59E0B] bg-amber-50 text-[#B45309] px-2.5 py-1 rounded-full inline-block">
                    ⏱ Mock Exam Goal
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A]">Schedule CBT Mock #5</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Candidate has completed 4 of 10 mock goals. Ensure a quiet 2-hour window on August 12, 2026 for Mock #5 simulation.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-full inline-block">
                    🏛 University Strategy
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A]">Review UNILAG Cut-off Requirements</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    Spend 10 minutes together reviewing previous 2026/2027 departmental aggregate cut-off benchmarks for Computer Science.
                  </p>
                </div>
              </div>
            </section>

            {/* NOTIFICATIONS & 2026 CALENDAR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Notifications */}
              <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#0F172A]">Parent Notifications (2026)</h2>
                    <p className="text-xs text-[#475569]">Updates and milestone alerts for {student.name}</p>
                  </div>
                  <span className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1 rounded-full">
                    5 Recent Alerts
                  </span>
                </div>

                <div className="space-y-4">
                  {notificationsList.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        n.unread ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-lg">{n.icon}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-[#0F172A]">{n.title}</h4>
                          <span className="text-[10px] font-semibold text-slate-400">{n.date}</span>
                        </div>
                        <p className="text-xs text-[#475569] leading-relaxed">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive August 2026 Calendar */}
              <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-xl font-bold font-display text-[#0F172A]">August 2026 Calendar</h2>
                    <p className="text-xs text-[#475569]">Key mock dates, practice drills &amp; deadlines</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                      <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </button>
                    <span className="text-xs font-bold text-[#0F172A] px-2">August 2026</span>
                    <button className="p-1 rounded hover:bg-slate-100 text-slate-500">
                      <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Monthly Grid */}
                <div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {/* Padding days */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="py-2.5 text-slate-300">Jul {26 + i}</div>
                    ))}

                    {/* Days 1-31 */}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const isToday = day === 1; // Aug 1
                      const isCBT = day === 4;
                      const isRevision = day === 7;
                      const isMock = day === 12;
                      const isScholarship = day === 20;

                      return (
                        <div 
                          key={day}
                          className={`py-2 rounded-xl border transition-all relative flex flex-col items-center justify-center min-h-[42px] cursor-pointer ${
                            isToday
                              ? 'bg-[#0F9D58] text-white font-extrabold shadow'
                              : isMock
                              ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                              : isCBT
                              ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                              : isRevision
                              ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                              : isScholarship
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-white border-slate-100 hover:bg-slate-50 text-[#0F172A]'
                          }`}
                          title={`August ${day}, 2026`}
                        >
                          <span>{day}</span>
                          {(isMock || isCBT || isRevision || isScholarship) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-current mt-0.5"></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-[11px] font-semibold border-t border-slate-100 pt-3 text-[#475569]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58]"></span> Current Date
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span> CBT Practice
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span> Mock Exam
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> Revision
                  </span>
                </div>
              </div>
            </div>

            {/* COMMUNICATION CENTRE */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-display text-[#0F172A]">Parent Communication &amp; Actions</h2>
                  <p className="text-xs text-[#475569]">Send notes, set reminders, and access family support tools for 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => setShowEncouragementModal(true)}
                  className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">send</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0F172A]">Send Encouragement Message</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Leave an uplifting note on {student.name}'s daily study dashboard.
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-[#0F9D58] flex items-center gap-1 group-hover:underline">
                    Write Message →
                  </span>
                </div>

                <div 
                  onClick={() => setShowWeeklyReportModal(true)}
                  className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0F172A]">View Weekly Progress Report</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Inspect weekly PDF summary of scores, study hours, and weak topics.
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-[#2563EB] flex items-center gap-1 group-hover:underline">
                    Inspect Report →
                  </span>
                </div>

                <div 
                  onClick={() => setShowReminderModal(true)}
                  className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">alarm</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0F172A]">Schedule Study Reminder</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Set a custom calendar alert for upcoming revision sessions in 2026.
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-[#B45309] flex items-center gap-1 group-hover:underline">
                    Set Reminder →
                  </span>
                </div>

                <div 
                  onClick={() => {
                    triggerToast(`Family Study Tips drawer opened! 📖`);
                  }}
                  className="p-6 rounded-3xl bg-slate-100 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">family_restroom</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0F172A]">Family Study Tips</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Best practices for parents supporting Nigerian tertiary aspirants.
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-[#0F172A] flex items-center gap-1 group-hover:underline">
                    Read Tips →
                  </span>
                </div>
              </div>

              {/* Sent Messages History */}
              {sentMessages.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#0F172A] mb-3 uppercase tracking-wider">
                    Recent Sent Notes to {student.name}
                  </h4>
                  <div className="space-y-2">
                    {sentMessages.map((msg, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] flex items-center justify-between">
                        <span className="italic">"{msg}"</span>
                        <span className="text-[10px] font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-2 py-0.5 rounded-full">
                          Delivered to 2026 Dashboard
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* PARENT EDUCATIONAL RESOURCES */}
            <section className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold font-display text-[#0F172A]">Resources for Parents &amp; Guardians</h2>
                  <p className="text-xs text-[#475569]">Guides on tertiary admission, stress management, and scholarship planning</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {parentResources.map((res) => (
                  <div 
                    key={res.id} 
                    onClick={() => setShowTipModal(res)}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58]">
                          {res.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{res.readTime}</span>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F172A] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">{res.icon}</span>
                      </div>

                      <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                        {res.title}
                      </h4>

                      <p className="text-xs text-[#475569] leading-relaxed">{res.summary}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0F9D58] font-bold group-hover:underline">
                      <span>Read Guide</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12">
              <h2 className="text-2xl font-bold font-display text-[#0F172A] mb-2 text-center">Frequently Asked Questions</h2>
              <p className="text-xs text-[#475569] text-center mb-6">Everything parents need to know about tracking 2026 preparation</p>

              <div className="max-w-3xl mx-auto space-y-3">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                    <button 
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 md:p-5 font-bold text-xs md:text-sm text-[#0F172A] flex justify-between items-center hover:bg-slate-50 transition-colors"
                    >
                      <span>{item.q}</span>
                      <span className={`material-symbols-outlined transition-transform text-slate-400 ${openFaqIndex === idx ? 'rotate-180 text-[#0F9D58]' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 md:p-5 pt-0 text-xs text-[#475569] leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-gradient-to-r from-[#0F9D58] via-[#16A34A] to-[#0F172A] text-white rounded-3xl p-8 md:p-12 text-center shadow-xl mb-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#FBBF24] text-xs font-bold border border-white/20">
                  JAMB 2026 Candidate Support
                </span>

                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">
                  Support Every Step of the Journey
                </h2>

                <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                  Stay connected with your student's progress and help them achieve their goals throughout the 2026 admission cycle.
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => {
                      triggerToast(`Displaying full 2026 progress report for ${student.name}! 📈`);
                    }}
                    className="bg-[#FBBF24] hover:bg-amber-400 text-[#0F172A] font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    View Full Progress
                  </button>

                  <button 
                    onClick={() => {
                      if (setActiveTab) setActiveTab('dashboard');
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-8 py-3.5 rounded-xl border border-white/20 transition-all"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {/* MODAL: Send Encouragement */}
      {showEncouragementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-display text-[#0F172A]">Send Encouragement Message</h3>
              <button onClick={() => setShowEncouragementModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-[#475569]">
              Your note will appear as a pop-up alert when {student.name} logs into their JAMB Compass study dashboard.
            </p>

            <form onSubmit={handleSendEncouragement} className="space-y-4">
              <textarea
                rows={4}
                value={encouragementNote}
                onChange={(e) => setEncouragementNote(e.target.value)}
                placeholder={`Write a brief uplifting message for ${student.name} (e.g. "Proud of your daily study streak! Keep pushing for UNILAG!")`}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F9D58]/20 focus:border-[#0F9D58] outline-none"
                required
              />

              <div className="flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowEncouragementModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#0F9D58] hover:bg-[#16A34A] text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Send Message 💌
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Schedule Study Reminder */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-display text-[#0F172A]">Schedule 2026 Study Reminder</h3>
              <button onClick={() => setShowReminderModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleScheduleReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Reminder Title</label>
                <input 
                  type="text"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  placeholder="e.g. Chemistry Organic Reaction Revision Drill"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F9D58]/20 focus:border-[#0F9D58] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Target Date (2026)</label>
                <input 
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0F9D58]/20 focus:border-[#0F9D58] outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowReminderModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  Schedule Reminder 📅
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Weekly Progress Report Preview */}
      {showWeeklyReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0F9D58]">description</span>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">Weekly Summary Report (Week 30, 2026)</h3>
              </div>
              <button onClick={() => setShowWeeklyReportModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-[#0F172A]">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>Student: <strong>{student.name}</strong></span>
                <span>Cycle: <strong>JAMB 2026</strong></span>
              </div>
              <div className="flex justify-between">
                <span>Total Hours Logged:</span>
                <strong>{student.studyHoursThisWeek} Hours</strong>
              </div>
              <div className="flex justify-between">
                <span>CBT Drills Completed:</span>
                <strong>{student.cbtSessionsCompleted} Sessions</strong>
              </div>
              <div className="flex justify-between">
                <span>Mock Exam Score:</span>
                <strong className="text-[#0F9D58]">{student.avgPracticeScore} / 400 Marks</strong>
              </div>
              <div className="flex justify-between">
                <span>Active Streak:</span>
                <strong className="text-[#FBBF24]">{student.studyStreak} Days 🔥</strong>
              </div>
              <div className="pt-2 border-t border-slate-200 text-slate-500">
                <em>* This demo progress report is generated within JAMB Compass for parental guidance.</em>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => setShowWeeklyReportModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  triggerToast(`Demo PDF Progress Report downloaded successfully for ${student.name}! 📄`);
                  setShowWeeklyReportModal(false);
                }}
                className="px-5 py-2 bg-[#0F9D58] hover:bg-[#16A34A] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Subject Topic Analysis */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${showSubjectModal.color}`}></span>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">{showSubjectModal.name} Mastery Analysis</h3>
              </div>
              <button onClick={() => setShowSubjectModal(null)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                <span>Current Practice Score:</span>
                <strong className="text-[#0F9D58] text-sm">{showSubjectModal.score}%</strong>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-[#16A34A] block mb-0.5">💪 Strongest Topic Area</span>
                <p className="text-[#0F172A]">{showSubjectModal.strongArea}</p>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <span className="font-bold text-[#DC2626] block mb-0.5">⚠️ Area Needing Revision</span>
                <p className="text-[#0F172A]">{showSubjectModal.weakArea}</p>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                Syllabus progress: {showSubjectModal.topicsCompleted} of {showSubjectModal.totalTopics} topics completed for the 2026 JAMB exam.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowSubjectModal(null)}
                className="px-5 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Resource Guide Detail */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-display text-[#0F172A]">{showTipModal.title}</h3>
              <button onClick={() => setShowTipModal(null)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
              <div className="p-3 rounded-xl bg-emerald-50 text-[#0F9D58] font-bold">
                Category: {showTipModal.category} • {showTipModal.readTime}
              </div>
              <p>{showTipModal.summary}</p>
              <p>
                As a guardian supporting a 2026 JAMB candidate, establishing consistent daily check-ins, celebrating small milestones, and providing balanced nutrition during intensive CBT drill weeks drastically improves candidate retention and confidence.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowTipModal(null)}
                className="px-5 py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL FOOTER */}
      <footer className="w-full bg-[#0F172A] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58] text-2xl">compass_calibration</span>
              <span className="font-extrabold text-xl font-display text-white">JAMB Compass</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The definitive study platform for Nigerian university aspirants. Empowering students and parents throughout the 2026 admission cycle.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Guardian Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => { if(setActiveTab) setActiveTab('parent-dashboard'); }} className="hover:text-white transition-colors">Parent Dashboard</button></li>
              <li><button onClick={() => { if(setActiveTab) setActiveTab('leaderboard'); }} className="hover:text-white transition-colors">Community Leaderboard</button></li>
              <li><button onClick={() => { if(setActiveTab) setActiveTab('study-planner'); }} className="hover:text-white transition-colors">Study Planner</button></li>
              <li><button onClick={() => { if(setActiveTab) setActiveTab('scholarships'); }} className="hover:text-white transition-colors">Scholarships 2026</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Support &amp; Guidance</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => { if(setActiveTab) setActiveTab('help-centre'); }} className="hover:text-white transition-colors">Parent Help Centre</button></li>
              <li><button onClick={() => { if(setActiveTab) setActiveTab('guide'); }} className="hover:text-white transition-colors">JAMB 2026 CAPS Guide</button></li>
              <li><button onClick={() => { if(setActiveTab) setActiveTab('careers'); }} className="hover:text-white transition-colors">Career Pathways</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">2026 Cycle Disclaimer</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              © 2026 JAMB Compass. All student progress, readiness scores, and reports on this dashboard are demo learning analytics designed for parental support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
