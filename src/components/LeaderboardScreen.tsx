import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface LeaderboardScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface StudentLeaderboardItem {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  initials: string;
  avatarBg: string;
  targetCourse: string;
  targetUniversity: string;
  state: string;
  school: string;
  points: number;
  weeklyPoints: number;
  monthlyPoints: number;
  studyHours: number;
  streakDays: number;
  badge: string;
  badgeColor: string;
  trend: 'up' | 'down' | 'same';
  trendValue: number;
  isCurrentUser?: boolean;
  cheersCount: number;
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  rewardBadge: string;
  rewardXp: number;
  participantsCount: number;
  daysRemaining: number;
  startDate: string;
  endDate: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
  isJoined: boolean;
  imageUrl: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: ' streak' | 'exam' | 'community' | 'mastery';
  icon: string;
  iconBg: string;
  iconColor: string;
  unlocked: boolean;
  unlockedDate?: string;
  xpBonus: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface StudyGroupItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  iconBg: string;
  membersCount: number;
  description: string;
  targetScoreRange: string;
  isJoined: boolean;
}

// 2026 Mock Community Leaderboard Data
const DEMO_LEADERBOARD_DATA: StudentLeaderboardItem[] = [
  {
    id: 's1',
    rank: 1,
    name: 'Funke Adebayo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: 'FA',
    avatarBg: 'bg-[#FBBF24]',
    targetCourse: 'Medicine & Surgery',
    targetUniversity: 'UNILAG (2026)',
    state: 'Lagos State',
    school: 'Queens College Yaba',
    points: 3950,
    weeklyPoints: 950,
    monthlyPoints: 3950,
    studyHours: 54,
    streakDays: 32,
    badge: 'JAMB Titan 2026',
    badgeColor: 'bg-[#FBBF24]/20 text-[#B45309]',
    trend: 'same',
    trendValue: 0,
    cheersCount: 142
  },
  {
    id: 's2',
    rank: 2,
    name: 'David Eze',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'DE',
    avatarBg: 'bg-[#CBD5E1]',
    targetCourse: 'Electrical Engineering',
    targetUniversity: 'OAU Ile-Ife (2026)',
    state: 'Osun State',
    school: 'Loyola College Ibadan',
    points: 3840,
    weeklyPoints: 890,
    monthlyPoints: 3840,
    studyHours: 49,
    streakDays: 28,
    badge: 'Physics Master',
    badgeColor: 'bg-[#2563EB]/10 text-[#2563EB]',
    trend: 'up',
    trendValue: 1,
    cheersCount: 98
  },
  {
    id: 's3',
    rank: 3,
    name: 'Fatima Bello',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    initials: 'FB',
    avatarBg: 'bg-[#B45309]',
    targetCourse: 'Jurisprudence & Law',
    targetUniversity: 'University of Ibadan (2026)',
    state: 'Oyo State',
    school: 'International School Ibadan',
    points: 3720,
    weeklyPoints: 840,
    monthlyPoints: 3720,
    studyHours: 46,
    streakDays: 25,
    badge: 'Lit-in-English Scholar',
    badgeColor: 'bg-[#0F9D58]/10 text-[#0F9D58]',
    trend: 'up',
    trendValue: 2,
    cheersCount: 86
  },
  {
    id: 's4',
    rank: 4,
    name: 'Michael Somto',
    avatar: '',
    initials: 'MS',
    avatarBg: 'bg-[#0F172A]',
    targetCourse: 'Computer Science',
    targetUniversity: 'UNN Nsukka (2026)',
    state: 'Enugu State',
    school: 'Dennis Memorial Grammar School',
    points: 3685,
    weeklyPoints: 820,
    monthlyPoints: 3685,
    studyHours: 44,
    streakDays: 22,
    badge: 'Math Blitz King',
    badgeColor: 'bg-[#2563EB]/10 text-[#2563EB]',
    trend: 'up',
    trendValue: 3,
    cheersCount: 64
  },
  {
    id: 's5',
    rank: 5,
    name: 'Adesuwa Igbinoba',
    avatar: '',
    initials: 'AI',
    avatarBg: 'bg-[#0F9D58]',
    targetCourse: 'Pharmacy',
    targetUniversity: 'Uniben (2026)',
    state: 'Edo State',
    school: 'Federal Government Girls College Benin',
    points: 3610,
    weeklyPoints: 790,
    monthlyPoints: 3610,
    studyHours: 41,
    streakDays: 19,
    badge: 'Chemistry Guru',
    badgeColor: 'bg-[#16A34A]/10 text-[#16A34A]',
    trend: 'down',
    trendValue: -1,
    cheersCount: 52
  },
  {
    id: 's6',
    rank: 6,
    name: 'Chidi Okeke',
    avatar: '',
    initials: 'CO',
    avatarBg: 'bg-[#F59E0B]',
    targetCourse: 'Mechanical Eng.',
    targetUniversity: 'FUTO Owerri (2026)',
    state: 'Imo State',
    school: 'Government Secondary School Owerri',
    points: 3540,
    weeklyPoints: 760,
    monthlyPoints: 3540,
    studyHours: 40,
    streakDays: 18,
    badge: 'Mock Master',
    badgeColor: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    trend: 'up',
    trendValue: 4,
    cheersCount: 47
  },
  {
    id: 's7',
    rank: 7,
    name: 'Amina Yusuf',
    avatar: '',
    initials: 'AY',
    avatarBg: 'bg-[#DC2626]',
    targetCourse: 'Microbiology',
    targetUniversity: 'ABU Zaria (2026)',
    state: 'Kaduna State',
    school: 'Barewa College Zaria',
    points: 3490,
    weeklyPoints: 740,
    monthlyPoints: 3490,
    studyHours: 39,
    streakDays: 17,
    badge: 'Bio Explorer',
    badgeColor: 'bg-[#16A34A]/10 text-[#16A34A]',
    trend: 'same',
    trendValue: 0,
    cheersCount: 41
  },
  {
    id: 's8',
    rank: 8,
    name: 'Blessing Emmanuel',
    avatar: '',
    initials: 'BE',
    avatarBg: 'bg-[#2563EB]',
    targetCourse: 'Accounting',
    targetUniversity: 'UNILAG (2026)',
    state: 'Lagos State',
    school: 'Methodist Girls High School',
    points: 3420,
    weeklyPoints: 710,
    monthlyPoints: 3420,
    studyHours: 37,
    streakDays: 16,
    badge: 'Commerce Pro',
    badgeColor: 'bg-[#2563EB]/10 text-[#2563EB]',
    trend: 'up',
    trendValue: 2,
    cheersCount: 38
  },
  {
    id: 'user',
    rank: 452,
    name: 'Emmanuel O. (You)',
    avatar: '',
    initials: 'YO',
    avatarBg: 'bg-[#0F9D58]',
    targetCourse: 'Computer Science',
    targetUniversity: 'UNILAG (2026 Target)',
    state: 'Lagos State',
    school: 'King\'s College Lagos',
    points: 1250,
    weeklyPoints: 340,
    monthlyPoints: 1250,
    studyHours: 18,
    streakDays: 14,
    badge: 'Early Starter 2026',
    badgeColor: 'bg-[#0F9D58] text-white font-bold',
    trend: 'up',
    trendValue: 12,
    isCurrentUser: true,
    cheersCount: 29
  }
];

const DEMO_CHALLENGES: ChallengeItem[] = [
  {
    id: 'c1',
    title: '7-Day Mathematics Challenge',
    category: 'Mathematics',
    difficulty: 'Intermediate',
    description: 'Solve 20 algebra, trigonometry, and calculus JAMB questions daily for 7 days in the 2026 cycle.',
    rewardBadge: 'Math Blitz 2026',
    rewardXp: 500,
    participantsCount: 3420,
    daysRemaining: 3,
    startDate: 'Jul 28, 2026',
    endDate: 'Aug 4, 2026',
    progress: 65,
    totalSteps: 7,
    completedSteps: 4,
    isJoined: true,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c2',
    title: '500 Practice Questions Sprint',
    category: 'All Subjects',
    difficulty: 'Advanced',
    description: 'Complete 500 authentic past JAMB CBT questions across your 4 registered subjects.',
    rewardBadge: 'Mock Master',
    rewardXp: 1000,
    participantsCount: 5120,
    daysRemaining: 6,
    startDate: 'Jul 25, 2026',
    endDate: 'Aug 8, 2026',
    progress: 49,
    totalSteps: 500,
    completedSteps: 245,
    isJoined: true,
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c3',
    title: 'Weekly English Concord & Oral Revision',
    category: 'Use of English',
    difficulty: 'Beginner',
    description: 'Master English Concord rules, Antonyms, Synonyms, and Oral English stress patterns for 2026.',
    rewardBadge: 'Grammar Champ',
    rewardXp: 350,
    participantsCount: 4890,
    daysRemaining: 4,
    startDate: 'Jul 27, 2026',
    endDate: 'Aug 3, 2026',
    progress: 0,
    totalSteps: 5,
    completedSteps: 0,
    isJoined: false,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c4',
    title: 'Biology Mastery Sprint',
    category: 'Biology',
    difficulty: 'Intermediate',
    description: 'Deep dive into Genetics, Ecology, and Human Physiology JAMB syllabus requirements.',
    rewardBadge: 'Bio Titan 2026',
    rewardXp: 600,
    participantsCount: 2980,
    daysRemaining: 8,
    startDate: 'Jul 30, 2026',
    endDate: 'Aug 10, 2026',
    progress: 0,
    totalSteps: 10,
    completedSteps: 0,
    isJoined: false,
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'c5',
    title: 'Physics Speed Quiz Showdown',
    category: 'Physics',
    difficulty: 'Expert',
    description: 'Timed 30-minute speed tests covering Motion, Electricity, and Quantum Physics.',
    rewardBadge: 'Speed Demon',
    rewardXp: 800,
    participantsCount: 1840,
    daysRemaining: 5,
    startDate: 'Jul 29, 2026',
    endDate: 'Aug 6, 2026',
    progress: 0,
    totalSteps: 3,
    completedSteps: 0,
    isJoined: false,
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80'
  }
];

const DEMO_BADGES: AchievementBadge[] = [
  {
    id: 'b1',
    title: 'Early Starter 2026',
    description: 'Commenced early preparation for the 2026 JAMB examination before January 2026.',
    category: 'community',
    icon: 'rocket_launch',
    iconBg: 'bg-[#0F9D58]/10',
    iconColor: 'text-[#0F9D58]',
    unlocked: true,
    unlockedDate: 'Jan 12, 2026',
    xpBonus: 200,
    rarity: 'Common'
  },
  {
    id: 'b2',
    title: '7-Day Streak Warrior',
    description: 'Maintained continuous daily study activity for 7 consecutive days in 2026.',
    category: ' streak',
    icon: 'local_fire_department',
    iconBg: 'bg-[#F59E0B]/10',
    iconColor: 'text-[#F59E0B]',
    unlocked: true,
    unlockedDate: 'Feb 04, 2026',
    xpBonus: 300,
    rarity: 'Common'
  },
  {
    id: 'b3',
    title: 'Study Warrior',
    description: 'Completed 10 full-length JAMB timed mock examinations.',
    category: 'exam',
    icon: 'shield',
    iconBg: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
    unlocked: true,
    unlockedDate: 'Mar 18, 2026',
    xpBonus: 500,
    rarity: 'Rare'
  },
  {
    id: 'b4',
    title: 'Mock Master (300+)',
    description: 'Scored 300 points or above in a full CBT simulation mock exam.',
    category: 'exam',
    icon: 'military_tech',
    iconBg: 'bg-[#FBBF24]/10',
    iconColor: 'text-[#B45309]',
    unlocked: false,
    xpBonus: 1000,
    rarity: 'Legendary'
  },
  {
    id: 'b5',
    title: '1,000 Questions Completed',
    description: 'Answered 1,000 CBT practice questions across all 4 subjects accurately.',
    category: 'mastery',
    icon: 'task_alt',
    iconBg: 'bg-[#16A34A]/10',
    iconColor: 'text-[#16A34A]',
    unlocked: true,
    unlockedDate: 'Apr 22, 2026',
    xpBonus: 750,
    rarity: 'Rare'
  },
  {
    id: 'b6',
    title: 'Scholarship Explorer',
    description: 'Saved and explored 5 eligible tertiary scholarships for the 2026 session.',
    category: 'community',
    icon: 'school',
    iconBg: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
    unlocked: true,
    unlockedDate: 'May 10, 2026',
    xpBonus: 250,
    rarity: 'Common'
  },
  {
    id: 'b7',
    title: 'Career Planner',
    description: 'Mapped target JAMB subject combinations to 3 prospective university degrees.',
    category: 'community',
    icon: 'work_history',
    iconBg: 'bg-[#0F172A]/10',
    iconColor: 'text-[#0F172A]',
    unlocked: true,
    unlockedDate: 'Jun 05, 2026',
    xpBonus: 250,
    rarity: 'Common'
  },
  {
    id: 'b8',
    title: 'Perfect Week',
    description: 'Achieved 100% scheduled study task completion for a full calendar week.',
    category: ' streak',
    icon: 'auto_awesome',
    iconBg: 'bg-[#FBBF24]/10',
    iconColor: 'text-[#F59E0B]',
    unlocked: true,
    unlockedDate: 'Jul 15, 2026',
    xpBonus: 600,
    rarity: 'Epic'
  }
];

const DEMO_STUDY_GROUPS: StudyGroupItem[] = [
  {
    id: 'g1',
    name: 'Science Students 2026',
    category: 'Science',
    icon: 'science',
    iconBg: 'bg-[#0F9D58]/10 text-[#0F9D58]',
    membersCount: 8420,
    description: 'Physics, Chemistry, Biology & Maths discussions, formula sharing, and daily CBT drills.',
    targetScoreRange: '280 - 360+',
    isJoined: true
  },
  {
    id: 'g2',
    name: 'Engineering Aspirants 2026',
    category: 'Engineering',
    icon: 'engineering',
    iconBg: 'bg-[#2563EB]/10 text-[#2563EB]',
    membersCount: 5120,
    description: 'Focus on Further Maths, Advanced Physics, and Mechanics practice for 2026.',
    targetScoreRange: '290 - 350+',
    isJoined: false
  },
  {
    id: 'g3',
    name: 'Medical & Health Track',
    category: 'Medicine',
    icon: 'medical_services',
    iconBg: 'bg-[#DC2626]/10 text-[#DC2626]',
    membersCount: 6300,
    description: 'High-yield Biology diagrams, Organic Chemistry mechanisms, and top cut-off mark tips.',
    targetScoreRange: '310 - 370+',
    isJoined: true
  },
  {
    id: 'g4',
    name: 'Arts & Law Hub 2026',
    category: 'Law & Arts',
    icon: 'gavel',
    iconBg: 'bg-[#0F172A]/10 text-[#0F172A]',
    membersCount: 3900,
    description: 'Literature analysis, Government constitutions, CRS quotes, and Use of English Mastery.',
    targetScoreRange: '270 - 340+',
    isJoined: false
  }
];

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ setActiveTab }) => {
  // Filters & State
  const [scopeTab, setScopeTab] = useState<'Global' | 'Friends' | 'School' | 'State'>('Global');
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly' | 'All-Time'>('Weekly');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  
  // Interactive User States
  const [leaderboard, setLeaderboard] = useState<StudentLeaderboardItem[]>(DEMO_LEADERBOARD_DATA);
  const [challenges, setChallenges] = useState<ChallengeItem[]>(DEMO_CHALLENGES);
  const [studyGroups, setStudyGroups] = useState<StudyGroupItem[]>(DEMO_STUDY_GROUPS);
  const [streakDays, setStreakDays] = useState(14);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [activeBadgeCategory, setActiveBadgeCategory] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  // Toast & Modals
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<StudentLeaderboardItem | null>(null);
  const [selectedChallengeModal, setSelectedChallengeModal] = useState<ChallengeItem | null>(null);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<AchievementBadge | null>(null);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Filtered Leaderboard
  const filteredLeaderboard = useMemo(() => {
    return leaderboard.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.targetCourse.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCourse = selectedCourseFilter === 'All' || student.targetCourse.includes(selectedCourseFilter);
      return matchesSearch && matchesCourse;
    });
  }, [leaderboard, searchQuery, selectedCourseFilter]);

  // Handle Cheer
  const handleCheer = (studentId: string) => {
    setLeaderboard(prev => prev.map(s => {
      if (s.id === studentId) {
        showToast(`You cheered ${s.name}! 👏 (+5 Community Cheer XP)`);
        return { ...s, cheersCount: s.cheersCount + 1 };
      }
      return s;
    }));
  };

  // Handle Daily Streak Check-in
  const handleCheckIn = () => {
    if (hasCheckedInToday) {
      showToast('You have already logged your study activity for today (July 31, 2026)! 🔥');
      return;
    }
    setStreakDays(prev => prev + 1);
    setHasCheckedInToday(true);
    showToast('Awesome! 15-Day Streak unlocked for July 31, 2026! +50 XP Bonus added! 🔥');
  };

  // Handle Challenge Join/Leave
  const handleToggleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const nextJoined = !c.isJoined;
        showToast(nextJoined ? `Joined "${c.title}" for 2026!` : `Left "${c.title}".`);
        return {
          ...c,
          isJoined: nextJoined,
          participantsCount: nextJoined ? c.participantsCount + 1 : c.participantsCount - 1
        };
      }
      return c;
    }));
  };

  // Handle Group Join/Leave
  const handleToggleGroup = (groupId: string) => {
    setStudyGroups(prev => prev.map(g => {
      if (g.id === groupId) {
        const nextJoined = !g.isJoined;
        showToast(nextJoined ? `Joined study group "${g.name}"!` : `Left study group "${g.name}".`);
        return {
          ...g,
          isJoined: nextJoined,
          membersCount: nextJoined ? g.membersCount + 1 : g.membersCount - 1
        };
      }
      return g;
    }));
  };

  // Top 3 Podiums
  const top1 = leaderboard.find(s => s.rank === 1) || leaderboard[0];
  const top2 = leaderboard.find(s => s.rank === 2) || leaderboard[1];
  const top3 = leaderboard.find(s => s.rank === 3) || leaderboard[2];
  const currentUser = leaderboard.find(s => s.isCurrentUser) || leaderboard[8];

  const filteredBadges = useMemo(() => {
    if (activeBadgeCategory === 'unlocked') return DEMO_BADGES.filter(b => b.unlocked);
    if (activeBadgeCategory === 'locked') return DEMO_BADGES.filter(b => !b.unlocked);
    return DEMO_BADGES;
  }, [activeBadgeCategory]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#2563EB]/40 animate-slide-up">
          <span className="material-symbols-outlined text-[#FBBF24]">stars</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Demo Banner Notice */}
      <div className="bg-[#0F9D58]/10 border-b border-[#0F9D58]/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-[#0F9D58]">
          <span className="material-symbols-outlined text-base">info</span>
          <span>
            <strong>2026 JAMB Admission Cycle:</strong> Leaderboards, ranks, and study challenges use demo community data to illustrate platform features.
          </span>
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
          <span className="font-semibold text-[#0F9D58]">Community & Challenges</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F9D58] text-white rounded-3xl p-6 md:p-10 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#0F9D58]/10 blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#FBBF24] border border-white/10">
                <span className="material-symbols-outlined text-sm">emoji_events</span>
                2026 JAMB Aspirants Community
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                Community Leaderboard & <span className="text-[#FBBF24]">Study Challenges</span>
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Stay motivated by participating in study challenges, earning achievements, and tracking your progress with the JAMB Compass community during the 2026 admission cycle.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a 
                  href="#active-challenges"
                  className="bg-[#0F9D58] hover:bg-[#16A34A] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-green-900/40 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">explore</span>
                  Browse Challenges
                </a>
                
                <button 
                  onClick={() => setShowGuidelinesModal(true)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-5 py-3 rounded-xl backdrop-blur-sm border border-white/15 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">gavel</span>
                  Community Rules
                </button>
              </div>
            </div>

            {/* Hero Visual Banner Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full max-w-md shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FBBF24] text-[#0F172A] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-2xl">trophy</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Weekly Hall of Fame</h3>
                      <p className="text-xs text-slate-300">2026 Session - Week 30</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FBBF24] bg-[#FBBF24]/20 px-2.5 py-1 rounded-full">
                    LIVE
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#FBBF24]">🥇 #1</span>
                      <span className="text-xs font-semibold text-white">Funke Adebayo</span>
                    </div>
                    <span className="text-xs font-bold text-[#0F9D58] bg-white/10 px-2 py-0.5 rounded">3,950 XP</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-300">🥈 #2</span>
                      <span className="text-xs font-semibold text-white">David Eze</span>
                    </div>
                    <span className="text-xs font-bold text-slate-200 bg-white/10 px-2 py-0.5 rounded">3,840 XP</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#B45309]">🥉 #3</span>
                      <span className="text-xs font-semibold text-white">Fatima Bello</span>
                    </div>
                    <span className="text-xs font-bold text-amber-200 bg-white/10 px-2 py-0.5 rounded">3,720 XP</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-300">
                  ⚡ Over 1,250,000+ total study hours logged by 2026 candidates!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Overview KPI Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-xl">groups</span>
            </div>
            <span className="text-2xl font-extrabold text-[#0F172A] font-display">48,520</span>
            <span className="text-xs text-[#475569] font-medium mt-0.5">Community Members</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-xl">bolt</span>
            </div>
            <span className="text-2xl font-extrabold text-[#0F172A] font-display">12,840</span>
            <span className="text-xs text-[#475569] font-medium mt-0.5">Active Learners Today</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-xl">emoji_events</span>
            </div>
            <span className="text-2xl font-extrabold text-[#0F172A] font-display">18</span>
            <span className="text-xs text-[#475569] font-medium mt-0.5">Weekly Challenges</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-xl">schedule</span>
            </div>
            <span className="text-2xl font-extrabold text-[#0F172A] font-display">1.42M</span>
            <span className="text-xs text-[#475569] font-medium mt-0.5">Total Study Hours</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-xl">insights</span>
            </div>
            <span className="text-2xl font-extrabold text-[#0F172A] font-display">286 / 400</span>
            <span className="text-xs text-[#475569] font-medium mt-0.5">Avg Community Score</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/10 text-[#B45309] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-xl">military_tech</span>
            </div>
            <span className="text-2xl font-extrabold text-[#0F172A] font-display">142.8K</span>
            <span className="text-xs text-[#475569] font-medium mt-0.5">Achievements Earned</span>
          </div>
        </section>

        {/* Current User Rank Card & Podium Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* User Featured Rank & Progress Ring Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-[#0F9D58] to-[#0F172A] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Your 2026 Ranking</span>
                    <h2 className="text-xl font-bold font-display text-white">Emerald League</h2>
                  </div>
                  <span className="bg-[#FBBF24] text-[#0F172A] font-bold text-xs px-3 py-1 rounded-full shadow">
                    Division 1
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-300">Global Rank</p>
                    <p className="text-3xl font-extrabold font-display text-white">#{currentUser.rank}</p>
                    <p className="text-xs text-emerald-300 font-medium">Top 1% of candidates</p>
                  </div>

                  {/* Animated Progress Ring */}
                  <div className="w-24 h-24 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="transparent" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        stroke="#FBBF24" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-extrabold text-white">75%</span>
                      <span className="text-[10px] text-slate-300">To Diamond</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-black/20 p-3 rounded-xl text-center text-xs">
                  <div>
                    <p className="font-bold text-base text-white">{currentUser.weeklyPoints}</p>
                    <p className="text-[11px] text-slate-300">Weekly XP</p>
                  </div>
                  <div className="border-x border-white/10 px-1">
                    <p className="font-bold text-base text-white">{currentUser.monthlyPoints}</p>
                    <p className="text-[11px] text-slate-300">Monthly XP</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#FBBF24] flex items-center justify-center gap-0.5">
                      {streakDays} <span className="text-xs">🔥</span>
                    </p>
                    <p className="text-[11px] text-slate-300">Streak Days</p>
                  </div>
                </div>

                <button 
                  onClick={handleCheckIn}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow ${
                    hasCheckedInToday
                      ? 'bg-emerald-800/80 text-emerald-200 cursor-default'
                      : 'bg-[#FBBF24] hover:bg-amber-400 text-[#0F172A] active:scale-98'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  {hasCheckedInToday ? 'Today\'s 2026 Check-in Done ✓' : 'Claim Daily Streak (+50 XP)'}
                </button>
              </div>
            </div>

            {/* Quick Challenge Status Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0F172A]">Your Active Challenges</h3>
                <span className="text-xs text-[#0F9D58] font-bold">2 Enrolled</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#0F172A]">7-Day Mathematics Challenge</span>
                    <span className="text-[#0F9D58]">65%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0F9D58] h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#0F172A]">500 Practice Questions</span>
                    <span className="text-[#2563EB]">49%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '49%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Podiums / Top 3 Performers */}
          <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-[#0F172A]">Top Performers Podiums</h2>
                  <p className="text-xs text-[#475569]">Leading candidates for the 2026 JAMB admission cycle</p>
                </div>
                <span className="bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">event</span>
                  July 2026 Standings
                </span>
              </div>

              {/* Podium Visual Columns */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 items-end pt-6">
                {/* 2nd Place - Silver */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-3 text-center">
                    <img 
                      src={top2.avatar} 
                      alt={top2.name} 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-[#CBD5E1] shadow-lg mx-auto"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#CBD5E1] text-[#0F172A] w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs shadow">
                      2
                    </div>
                  </div>

                  <div className="text-center mb-2">
                    <h3 className="font-bold text-xs md:text-sm text-[#0F172A] line-clamp-1">{top2.name}</h3>
                    <p className="text-[11px] text-[#475569]">{top2.targetCourse}</p>
                    <p className="text-xs font-extrabold text-[#2563EB] mt-0.5">{top2.points} XP</p>
                  </div>

                  <button 
                    onClick={() => handleCheer(top2.id)}
                    className="mb-2 text-[10px] md:text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1"
                  >
                    👏 {top2.cheersCount} Cheers
                  </button>

                  <div className="w-full h-24 md:h-32 bg-slate-100 rounded-t-2xl border-t-4 border-[#CBD5E1] flex flex-col items-center justify-center text-slate-400 font-extrabold text-lg md:text-xl shadow-inner">
                    <span>2ND</span>
                    <span className="text-[10px] font-medium text-slate-500">{top2.streakDays}d Streak 🔥</span>
                  </div>
                </div>

                {/* 1st Place - Gold */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-3 text-center">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[#FBBF24] animate-bounce">
                      <span className="material-symbols-outlined text-2xl">emoji_events</span>
                    </div>
                    <img 
                      src={top1.avatar} 
                      alt={top1.name} 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-[#FBBF24] shadow-xl mx-auto ring-4 ring-[#FBBF24]/20"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBBF24] text-[#0F172A] w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shadow-md">
                      1
                    </div>
                  </div>

                  <div className="text-center mb-2">
                    <h3 className="font-bold text-xs md:text-base text-[#0F172A] line-clamp-1">{top1.name}</h3>
                    <p className="text-[11px] text-[#475569]">{top1.targetCourse}</p>
                    <p className="text-xs md:text-sm font-extrabold text-[#0F9D58] mt-0.5">{top1.points} XP</p>
                  </div>

                  <button 
                    onClick={() => handleCheer(top1.id)}
                    className="mb-2 text-[10px] md:text-xs bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-200 px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1"
                  >
                    👏 {top1.cheersCount} Cheers
                  </button>

                  <div className="w-full h-36 md:h-44 bg-gradient-to-b from-amber-50 to-amber-100/60 rounded-t-2xl border-t-4 border-[#FBBF24] flex flex-col items-center justify-center text-[#B45309] font-extrabold text-xl md:text-2xl shadow-inner">
                    <span>1ST</span>
                    <span className="text-[11px] font-bold text-[#B45309]">{top1.streakDays}d Streak 🔥</span>
                  </div>
                </div>

                {/* 3rd Place - Bronze */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-3 text-center">
                    <img 
                      src={top3.avatar} 
                      alt={top3.name} 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-[#B45309] shadow-lg mx-auto"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#B45309] text-white w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs shadow">
                      3
                    </div>
                  </div>

                  <div className="text-center mb-2">
                    <h3 className="font-bold text-xs md:text-sm text-[#0F172A] line-clamp-1">{top3.name}</h3>
                    <p className="text-[11px] text-[#475569]">{top3.targetCourse}</p>
                    <p className="text-xs font-extrabold text-[#B45309] mt-0.5">{top3.points} XP</p>
                  </div>

                  <button 
                    onClick={() => handleCheer(top3.id)}
                    className="mb-2 text-[10px] md:text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1"
                  >
                    👏 {top3.cheersCount} Cheers
                  </button>

                  <div className="w-full h-20 md:h-28 bg-amber-900/10 rounded-t-2xl border-t-4 border-[#B45309] flex flex-col items-center justify-center text-[#B45309] font-extrabold text-lg md:text-xl shadow-inner">
                    <span>3RD</span>
                    <span className="text-[10px] font-medium text-[#B45309]">{top3.streakDays}d Streak 🔥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERBOARD TABLE SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          {/* Header & Tabs Bar */}
          <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-display text-[#0F172A]">JAMB 2026 Candidate Rankings</h2>
              <p className="text-xs text-[#475569]">Filter by region, institution category, and leaderboard timeframes</p>
            </div>

            {/* Scope Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
              {(['Global', 'Friends', 'School', 'State'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setScopeTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    scopeTab === tab
                      ? 'bg-[#0F9D58] text-white shadow-sm'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter Controls Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="sm:col-span-6 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input 
                type="text"
                placeholder="Search candidates by name, school, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9D58]/20 focus:border-[#0F9D58]"
              />
            </div>

            {/* Course Dropdown */}
            <div className="sm:col-span-3">
              <select 
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0F9D58]/20"
              >
                <option value="All font-medium">All Courses</option>
                <option value="Medicine">Medicine & Health</option>
                <option value="Engineering">Engineering & Tech</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Law">Law & Humanities</option>
                <option value="Accounting">Business & Finance</option>
              </select>
            </div>

            {/* Timeframe Selector */}
            <div className="sm:col-span-3 flex justify-end">
              <div className="flex rounded-xl bg-white border border-slate-200 p-1 text-xs font-semibold text-[#475569] w-full justify-around">
                {(['Weekly', 'Monthly', 'All-Time'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                      timeframe === tf ? 'bg-[#0F172A] text-white font-bold' : 'hover:bg-slate-100'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full max-w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center">Rank</th>
                  <th className="py-3.5 px-4">Candidate & Target</th>
                  <th className="py-3.5 px-4">State & Institution</th>
                  <th className="py-3.5 px-4 text-center">Points (XP)</th>
                  <th className="py-3.5 px-4 text-center">Study Hours</th>
                  <th className="py-3.5 px-4 text-center">Badge</th>
                  <th className="py-3.5 px-4 text-center">Trend</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeaderboard.map((student) => {
                  const isUser = student.isCurrentUser;
                  return (
                    <tr 
                      key={student.id} 
                      className={`transition-colors hover:bg-slate-50 ${
                        isUser ? 'bg-[#0F9D58]/10 font-medium border-l-4 border-l-[#0F9D58]' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 text-center">
                        {student.rank === 1 && <span className="text-lg">🥇</span>}
                        {student.rank === 2 && <span className="text-lg">🥈</span>}
                        {student.rank === 3 && <span className="text-lg">🥉</span>}
                        {student.rank > 3 && (
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            isUser ? 'bg-[#0F9D58] text-white' : 'bg-slate-100 text-[#475569]'
                          }`}>
                            #{student.rank}
                          </span>
                        )}
                      </td>

                      {/* Candidate Name & Avatar */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img 
                              src={student.avatar} 
                              alt={student.name} 
                              className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className={`w-9 h-9 rounded-full ${student.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                              {student.initials}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                              {student.name}
                              {isUser && (
                                <span className="bg-[#0F9D58] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#475569]">
                              {student.targetCourse} • <span className="text-[#0F9D58] font-semibold">{student.targetUniversity}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* State & School */}
                      <td className="py-4 px-4 text-[#475569]">
                        <div className="font-medium text-[#0F172A]">{student.state}</div>
                        <div className="text-[11px] text-[#475569]">{student.school}</div>
                      </td>

                      {/* Points */}
                      <td className="py-4 px-4 text-center font-extrabold text-[#0F172A] text-sm">
                        {student.points.toLocaleString()} XP
                      </td>

                      {/* Study Hours */}
                      <td className="py-4 px-4 text-center font-semibold text-[#475569]">
                        {student.studyHours} hrs
                      </td>

                      {/* Badge */}
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${student.badgeColor}`}>
                          {student.badge}
                        </span>
                      </td>

                      {/* Trend */}
                      <td className="py-4 px-4 text-center">
                        {student.trend === 'up' && (
                          <span className="inline-flex items-center gap-0.5 text-[#16A34A] font-bold">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +{student.trendValue}
                          </span>
                        )}
                        {student.trend === 'down' && (
                          <span className="inline-flex items-center gap-0.5 text-[#DC2626] font-bold">
                            <span className="material-symbols-outlined text-sm">trending_down</span>
                            {student.trendValue}
                          </span>
                        )}
                        {student.trend === 'same' && (
                          <span className="text-slate-400 font-bold">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setSelectedStudentProfile(student)}
                            className="p-1.5 hover:bg-slate-200 text-[#475569] rounded-lg transition-colors"
                            title="View Profile Details"
                          >
                            <span className="material-symbols-outlined text-base">visibility</span>
                          </button>
                          
                          <button 
                            onClick={() => handleCheer(student.id)}
                            className="p-1.5 hover:bg-emerald-100 text-[#0F9D58] rounded-lg transition-colors"
                            title="Cheer Candidate 👏"
                          >
                            👏
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-[#475569]">
            Showing top rankings for the 2026 JAMB admission cycle. Updated hourly.
          </div>
        </section>

        {/* ACTIVE STUDY CHALLENGES */}
        <section id="active-challenges" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#0F172A]">Active 2026 Study Challenges</h2>
              <p className="text-xs text-[#475569]">Join time-bound challenges to earn extra XP, unlock badges, and stay accountable</p>
            </div>
            
            <span className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-3 py-1.5 rounded-full self-start">
              5 Challenges Active in Cycle
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
              >
                <div className="h-44 relative overflow-hidden">
                  <img 
                    src={challenge.imageUrl} 
                    alt={challenge.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {challenge.category}
                    </span>
                    <span className="bg-[#FBBF24] text-[#0F172A] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {challenge.difficulty}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {challenge.daysRemaining}d Left
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-base text-white line-clamp-1">{challenge.title}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-sm">groups</span>
                      {challenge.participantsCount.toLocaleString()} candidates participating
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#FBBF24]">military_tech</span>
                      <span className="font-semibold text-[#0F172A]">{challenge.rewardBadge}</span>
                    </div>
                    <span className="font-extrabold text-[#0F9D58] bg-[#0F9D58]/10 px-2.5 py-1 rounded-full">
                      +{challenge.rewardXp} XP
                    </span>
                  </div>

                  {challenge.isJoined && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#475569]">Your Progress</span>
                        <span className="text-[#0F9D58] font-bold">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0F9D58] h-full rounded-full transition-all duration-500" style={{ width: `${challenge.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleToggleJoinChallenge(challenge.id)}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        challenge.isJoined
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-[#0F9D58] hover:bg-[#16A34A] text-white shadow-md'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {challenge.isJoined ? 'check_circle' : 'add_circle'}
                      </span>
                      {challenge.isJoined ? 'Joined Challenge' : 'Join Challenge'}
                    </button>

                    <button 
                      onClick={() => setSelectedChallengeModal(challenge)}
                      className="p-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-[#0F172A] transition-colors"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-lg">info</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS GALLERY & BADGES */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#0F172A]">2026 Achievement Badge Gallery</h2>
              <p className="text-xs text-[#475569]">Unlock milestone badges as you master CBT practice and study consistency</p>
            </div>

            {/* Category Filter */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              {(['all', 'unlocked', 'locked'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveBadgeCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                    activeBadgeCategory === cat ? 'bg-[#0F172A] text-white font-bold' : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {filteredBadges.map((badge) => (
              <div 
                key={badge.id}
                onClick={() => setSelectedBadgeModal(badge)}
                className={`bg-white p-5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer group hover:shadow-lg ${
                  badge.unlocked 
                    ? 'border-slate-200 hover:border-[#0F9D58]' 
                    : 'border-slate-200 opacity-60 grayscale hover:grayscale-0'
                }`}
              >
                <div className="w-full flex justify-end">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    badge.rarity === 'Legendary' ? 'bg-amber-100 text-amber-800' :
                    badge.rarity === 'Epic' ? 'bg-purple-100 text-purple-800' :
                    badge.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {badge.rarity}
                  </span>
                </div>

                <div className={`w-16 h-16 rounded-2xl ${badge.iconBg} ${badge.iconColor} flex items-center justify-center my-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[#0F172A]">{badge.title}</h3>
                  <p className="text-[11px] text-[#475569] line-clamp-2">{badge.description}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs">
                  <span className="text-[#0F9D58] font-bold">+{badge.xpBonus} XP</span>
                  <span className={`font-semibold ${badge.unlocked ? 'text-[#16A34A]' : 'text-slate-400'}`}>
                    {badge.unlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDY STREAK VISUAL HEATMAP SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
                Consistency Tracker 2026
              </div>

              <h2 className="text-2xl font-bold font-display text-[#0F172A]">
                Keep Your Study Streak Alive
              </h2>

              <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                Regular daily practice is the #1 predictor of scoring 300+ in JAMB 2026. Log at least 30 minutes of CBT questions daily to build your momentum!
              </p>

              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div>
                  <p className="text-2xl font-extrabold text-[#F59E0B] font-display">{streakDays}</p>
                  <p className="text-[11px] text-[#475569] font-medium">Current Streak</p>
                </div>
                <div className="border-x border-slate-200 px-2">
                  <p className="text-2xl font-extrabold text-[#0F9D58] font-display">21</p>
                  <p className="text-[11px] text-[#475569] font-medium">Best Streak</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#2563EB] font-display">6/7</p>
                  <p className="text-[11px] text-[#475569] font-medium">This Week</p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-[#B45309] font-medium flex items-start gap-2">
                <span className="material-symbols-outlined text-base shrink-0">format_quote</span>
                <i>"Success in JAMB 2026 isn't built in a day, it's built daily. Consistency beats intensity every time!"</i>
              </div>
            </div>

            {/* Calendar Heatmap Visualization */}
            <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-[#0F172A]">2026 12-Week Study Heatmap</h3>
                <span className="text-xs text-[#475569]">May 2026 - July 2026</span>
              </div>

              {/* Grid of 84 cells (12 weeks x 7 days) */}
              <div className="grid grid-cols-12 gap-1.5 justify-center mb-4">
                {Array.from({ length: 84 }).map((_, idx) => {
                  // Simulate realistic study activity
                  const activeLevels = ['bg-slate-200', 'bg-[#0F9D58]/20', 'bg-[#0F9D58]/50', 'bg-[#0F9D58]/80', 'bg-[#0F9D58]'];
                  const levelIndex = idx % 5 === 0 ? 4 : (idx % 7 === 0 ? 1 : (idx % 3 === 0 ? 3 : 2));
                  const bgClass = activeLevels[levelIndex];
                  
                  return (
                    <div 
                      key={idx} 
                      className={`w-full aspect-square rounded-sm ${bgClass} transition-transform hover:scale-125 hover:z-10 cursor-pointer`}
                      title={`2026 Day ${idx + 1}: ${levelIndex * 45} mins studied`}
                    ></div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-[#475569]">
                <span>Less Active</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#0F9D58]/20"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#0F9D58]/50"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#0F9D58]/80"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#0F9D58]"></div>
                </div>
                <span>More Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE COMMUNITY ACTIVITY FEED & REWARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Live Activity Feed */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold font-display text-[#0F172A]">2026 Community Live Activity</h2>
                <p className="text-xs text-[#475569]">Real-time achievements and study milestones from fellow candidates</p>
              </div>
              <span className="w-3 h-3 rounded-full bg-[#16A34A] animate-ping"></span>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0F9D58]/20 text-[#0F9D58] flex items-center justify-center font-bold text-xs shrink-0">
                  CO
                </div>
                <div className="flex-1 text-xs">
                  <p className="text-[#0F172A]">
                    <strong>Chidi Okeke</strong> scored <strong>312/400</strong> in Physics & Chemistry Mock Exam 2026.
                  </p>
                  <span className="text-[10px] text-slate-400">10 mins ago • 2026 CBT Simulation</span>
                </div>
                <button onClick={() => showToast('Congratulated Chidi! 🎉')} className="text-xs hover:bg-slate-200 px-2.5 py-1 rounded-lg">
                  👏 Cheer
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                  AY
                </div>
                <div className="flex-1 text-xs">
                  <p className="text-[#0F172A]">
                    <strong>Amina Yusuf</strong> unlocked the <strong>Biology Mastery 2026</strong> badge.
                  </p>
                  <span className="text-[10px] text-slate-400">25 mins ago • Achievement</span>
                </div>
                <button onClick={() => showToast('Congratulated Amina! 🎉')} className="text-xs hover:bg-slate-200 px-2.5 py-1 rounded-lg">
                  👏 Cheer
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F59E0B]/20 text-[#B45309] flex items-center justify-center font-bold text-xs shrink-0">
                  BE
                </div>
                <div className="flex-1 text-xs">
                  <p className="text-[#0F172A]">
                    <strong>Blessing Emmanuel</strong> reached a <strong>16-Day Streak</strong> in Accounting.
                  </p>
                  <span className="text-[10px] text-slate-400">42 mins ago • Streak Milestone</span>
                </div>
                <button onClick={() => showToast('Congratulated Blessing! 🎉')} className="text-xs hover:bg-slate-200 px-2.5 py-1 rounded-lg">
                  👏 Cheer
                </button>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0F172A]/20 text-[#0F172A] flex items-center justify-center font-bold text-xs shrink-0">
                  KW
                </div>
                <div className="flex-1 text-xs">
                  <p className="text-[#0F172A]">
                    <strong>Kenneth Wamba</strong> joined the <strong>Engineering Aspirants 2026</strong> group.
                  </p>
                  <span className="text-[10px] text-slate-400">1 hr ago • Group Join</span>
                </div>
                <button onClick={() => showToast('Welcomed Kenneth! 👋')} className="text-xs hover:bg-slate-200 px-2.5 py-1 rounded-lg">
                  👋 Welcome
                </button>
              </div>
            </div>
          </div>

          {/* Community Rewards & Redemption */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">XP Rewards Store</h2>
                  <p className="text-xs text-slate-300">Redeem earned points for study perks</p>
                </div>
                <span className="bg-[#FBBF24] text-[#0F172A] font-extrabold text-xs px-3 py-1 rounded-full">
                  1,250 XP
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#FBBF24]">workspace_premium</span>
                    <div>
                      <p className="text-xs font-bold text-white">2026 Ambassador Frame</p>
                      <p className="text-[10px] text-slate-300">Custom profile avatar border</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast('Redeemed 2026 Ambassador Frame! ✨')}
                    className="bg-[#0F9D58] hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    500 XP
                  </button>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#2563EB]">description</span>
                    <div>
                      <p className="text-xs font-bold text-white">2026 Secret Formula Sheet</p>
                      <p className="text-[10px] text-slate-300">PDF download for Maths & Physics</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast('Redeemed 2026 Secret Formula Sheet! 📄')}
                    className="bg-[#0F9D58] hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    750 XP
                  </button>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-purple-400">verified</span>
                    <div>
                      <p className="text-xs font-bold text-white">JAMB 2026 Completion Cert</p>
                      <p className="text-[10px] text-slate-300">Official digital certificate</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast('Redeemed JAMB 2026 Completion Certificate! 🎓')}
                    className="bg-[#0F9D58] hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    1,000 XP
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
              New rewards unlocked every week in the 2026 cycle.
            </div>
          </div>
        </div>

        {/* ASPIRANT STUDY GROUPS */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold font-display text-[#0F172A]">2026 Aspirant Study Groups</h2>
              <p className="text-xs text-[#475569]">Connect with students preparing for similar courses and target JAMB cut-off marks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyGroups.map((group) => (
              <div 
                key={group.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${group.iconBg} flex items-center justify-center font-bold`}>
                      <span className="material-symbols-outlined text-2xl">{group.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-[#475569] px-2.5 py-1 rounded-full">
                      {group.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#0F172A] mb-1">{group.name}</h3>
                  <p className="text-xs text-[#0F9D58] font-semibold mb-2">
                    {group.membersCount.toLocaleString()} Aspirants • Target {group.targetScoreRange}
                  </p>
                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    {group.description}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleGroup(group.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    group.isJoined
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-[#0F172A] hover:bg-[#1E293B] text-white shadow'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {group.isJoined ? 'check_circle' : 'group_add'}
                  </span>
                  {group.isJoined ? 'Joined Group' : 'Join Study Group'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY GUIDELINES SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold font-display text-[#0F172A]">Community Code of Conduct</h2>
              <p className="text-xs text-[#475569]">Maintaining academic integrity and support during the 2026 cycle</p>
            </div>
            <button 
              onClick={() => setShowGuidelinesModal(true)}
              className="text-xs font-bold text-[#0F9D58] hover:underline"
            >
              Full Policy Details →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-[#0F9D58] font-bold text-sm">
                <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                Respect Others
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Treat all 2026 aspirants with kindness. No harassment, bullying, or dismissive behavior is tolerated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-[#2563EB] font-bold text-sm">
                <span className="material-symbols-outlined">share</span>
                Share Verified Tips
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Post accurate past question solutions, study techniques, and verified 2026 JAMB syllabus information.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-sm">
                <span className="material-symbols-outlined">block</span>
                No Spam or Scams
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Strict prohibition of illegal "runs", exam fraud offers, unverified links, or advertising services.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-display text-[#0F172A]">Frequently Asked Questions</h2>
            <p className="text-xs md:text-sm text-[#475569] mt-1">Everything you need to know about 2026 Leaderboards and Study Challenges</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How are 2026 Leaderboard points (XP) calculated?',
                a: 'XP points are awarded for completing CBT practice tests (1 XP per correct question), maintaining daily study streaks (+50 XP daily bonus), finishing weekly challenges (+350 to +1000 XP), and participating in study groups.'
              },
              {
                q: 'Can I participate in multiple study challenges simultaneously?',
                a: 'Yes! You can join as many active 2026 study challenges as you like. Progress is automatically tracked based on your CBT test activity.'
              },
              {
                q: 'How do 2026 League Divisions work?',
                a: 'Candidates are grouped into Leagues (Bronze, Silver, Gold, Emerald, Diamond). The top 10% of candidates in each division promote to the next league at the end of every weekly reset on Sunday at midnight.'
              },
              {
                q: 'Are the rankings on this page real JAMB scores?',
                a: 'No. This leaderboard uses demo community data and practice performance metrics to encourage friendly competition during the 2026 JAMB admission preparation cycle.'
              },
              {
                q: 'How do study streaks work?',
                a: 'Log into JAMB Compass and complete at least one CBT practice session or quiz daily. Missing a full day will reset your streak counter unless you use a Streak Saver reward.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button 
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 md:p-5 text-left font-bold text-sm text-[#0F172A] flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0F9D58]' : 'text-slate-400'}`}>
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 text-xs md:text-sm text-[#475569] border-t border-slate-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="bg-gradient-to-r from-[#0F9D58] to-[#0F172A] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-white/5 opacity-5 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Learn Together. Grow Together.
            </h2>
            
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              Challenge yourself, celebrate your progress, and stay motivated with the JAMB Compass community throughout the 2026 admission cycle.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a 
                href="#active-challenges"
                className="bg-[#FBBF24] hover:bg-amber-400 text-[#0F172A] font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all scale-100 active:scale-95"
              >
                Join a 2026 Challenge
              </a>

              <button 
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-xl border border-white/20 transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 pt-10 pb-6 text-center text-xs text-[#475569]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F9D58]">JAMB Compass 2026</span>
              <span>• Educational Platform for Nigerian Candidates</span>
            </div>
            
            <p>© 2026 JAMB Compass. All rights reserved. Demo Rankings & Challenges.</p>
          </div>
        </footer>
      </div>

      {/* STUDENT PROFILE MODAL */}
      {selectedStudentProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
            <button 
              onClick={() => setSelectedStudentProfile(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center space-y-2">
              <div className={`w-20 h-20 rounded-full ${selectedStudentProfile.avatarBg} text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md overflow-hidden`}>
                {selectedStudentProfile.avatar ? (
                  <img src={selectedStudentProfile.avatar} alt={selectedStudentProfile.name} className="w-full h-full object-cover" />
                ) : (
                  selectedStudentProfile.initials
                )}
              </div>

              <h3 className="text-xl font-bold font-display text-[#0F172A]">{selectedStudentProfile.name}</h3>
              <p className="text-xs text-[#0F9D58] font-bold">{selectedStudentProfile.targetCourse} • {selectedStudentProfile.targetUniversity}</p>
              <p className="text-xs text-[#475569]">{selectedStudentProfile.school}, {selectedStudentProfile.state}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-4 rounded-2xl text-center text-xs border border-slate-100">
              <div>
                <p className="font-extrabold text-base text-[#0F172A]">#{selectedStudentProfile.rank}</p>
                <p className="text-[10px] text-slate-500">2026 Rank</p>
              </div>
              <div className="border-x border-slate-200 px-1">
                <p className="font-extrabold text-base text-[#0F9D58]">{selectedStudentProfile.points} XP</p>
                <p className="text-[10px] text-slate-500">Total Points</p>
              </div>
              <div>
                <p className="font-extrabold text-base text-[#F59E0B]">{selectedStudentProfile.streakDays}d 🔥</p>
                <p className="text-[10px] text-slate-500">Streak</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs p-3 bg-emerald-50 text-[#0F9D58] rounded-xl font-semibold">
              <span>Primary Achievement</span>
              <span>{selectedStudentProfile.badge}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => {
                  handleCheer(selectedStudentProfile.id);
                  setSelectedStudentProfile(null);
                }}
                className="w-full bg-[#0F9D58] hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                👏 Give High-Five / Cheer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGE MODAL */}
      {selectedChallengeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative">
            <button 
              onClick={() => setSelectedChallengeModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="h-40 rounded-2xl overflow-hidden relative">
              <img src={selectedChallengeModal.imageUrl} alt={selectedChallengeModal.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="bg-[#FBBF24] text-[#0F172A] text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {selectedChallengeModal.difficulty}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedChallengeModal.title}</h3>
              </div>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              {selectedChallengeModal.description}
            </p>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl text-xs border border-slate-100">
              <div>
                <span className="text-slate-500">Timeline:</span>
                <p className="font-bold text-[#0F172A]">{selectedChallengeModal.startDate} - {selectedChallengeModal.endDate}</p>
              </div>
              <div>
                <span className="text-slate-500">Reward:</span>
                <p className="font-bold text-[#0F9D58]">{selectedChallengeModal.rewardBadge} (+{selectedChallengeModal.rewardXp} XP)</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => {
                  handleToggleJoinChallenge(selectedChallengeModal.id);
                  setSelectedChallengeModal(null);
                }}
                className="flex-1 bg-[#0F9D58] hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl transition-colors"
              >
                {selectedChallengeModal.isJoined ? 'Leave Challenge' : 'Join 2026 Challenge Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BADGE DETAIL MODAL */}
      {selectedBadgeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 relative">
            <button 
              onClick={() => setSelectedBadgeModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className={`w-20 h-20 rounded-full ${selectedBadgeModal.iconBg} ${selectedBadgeModal.iconColor} flex items-center justify-center mx-auto shadow-md`}>
              <span className="material-symbols-outlined text-4xl">{selectedBadgeModal.icon}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {selectedBadgeModal.rarity} Badge
              </span>
              <h3 className="text-lg font-bold font-display text-[#0F172A] mt-1">{selectedBadgeModal.title}</h3>
              <p className="text-xs text-[#475569] mt-2 leading-relaxed">{selectedBadgeModal.description}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between font-medium">
              <span>XP Bonus: <strong className="text-[#0F9D58]">+{selectedBadgeModal.xpBonus} XP</strong></span>
              <span className={selectedBadgeModal.unlocked ? 'text-[#16A34A] font-bold' : 'text-slate-400'}>
                {selectedBadgeModal.unlocked ? `Unlocked (${selectedBadgeModal.unlockedDate})` : 'Locked'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* GUIDELINES MODAL */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setShowGuidelinesModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <span className="material-symbols-outlined text-2xl text-[#0F9D58]">gavel</span>
              <h3 className="text-xl font-bold font-display text-[#0F172A]">2026 Community Rules & Integrity</h3>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-[#475569] leading-relaxed">
              <p><strong>1. Academic Honesty:</strong> Practice questions and mock tests are designed for genuine skill building. Using automated scripts or unfair means invalidates streak progress.</p>
              <p><strong>2. Mutual Respect:</strong> Maintain a encouraging tone in study groups and live feeds. Discrimination or offensive remarks will result in temporary suspension.</p>
              <p><strong>3. Zero Tolerance for Exam Fraud:</strong> JAMB Compass strict rules forbid selling purported "examination leakages" or "runs". Accounts engaging in fraudulent claims will be reported.</p>
              <p><strong>4. Privacy & Safety:</strong> Do not share personal phone numbers, bank details, or passwords in open study groups.</p>
            </div>

            <button 
              onClick={() => setShowGuidelinesModal(false)}
              className="w-full bg-[#0F9D58] text-white font-bold text-xs py-3 rounded-xl"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
