export type TabType = 'home' | 'about' | 'guide' | 'courses' | 'course-details' | 'university-details' | 'universities' | 'study-hub' | 'admission' | 'news' | 'dashboard' | 'careers' | 'subject-checker' | 'cbt-practice' | 'syllabus' | 'textbooks' | 'past-questions' | 'mock-exam' | 'scholarships' | 'profile' | 'help-centre' | 'study-planner' | 'notifications' | 'leaderboard' | 'parent-dashboard' | 'admin-dashboard' | 'platform-status' | 'login';

export type CareerCategory = 'All' | 'Medical' | 'Engineering' | 'Technology' | 'Business' | 'Arts' | 'Law' | 'Education' | 'Agriculture' | 'Social Sciences';

export interface Career {
  id: string;
  title: string;
  category: CareerCategory;
  shortDesc: string;
  duration: string;
  relatedCourse: string;
  icon: string;
  imageUrl: string;
  overview: string;
  responsibilities: string[];
  skillsRequired: string[];
  workEnvironment: string;
  careerOpportunities: string[];
  utmeSubjects: string[];
  oLevelSubjects: string[];
  growthOpportunities: string;
  pathwaySteps: {
    step: string;
    description: string;
    icon: string;
  }[];
}

export type CourseCategory = 'All' | 'Medical' | 'Tech' | 'Engineering' | 'Business' | 'Law' | 'Arts' | 'Science';

export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  tag: string;
  tagBg: string;
  tagText: string;
  description: string;
  applicants: string;
  utmeSubjects: string[];
  oLevelRequirements: string;
  cutOffMark: number;
  duration: string;
  careerProspects: string[];
  imageUrl: string;
  popular: boolean;
}

export type UniversityType = 'All' | 'Federal' | 'State' | 'Private';

export interface University {
  id: string;
  name: string;
  type: 'Federal' | 'State' | 'Private';
  location: string;
  abbreviation: string;
  description: string;
  cutOffMark: number;
  facultiesCount: number;
  tuitionRange: string;
  accommodation: string;
  imageUrl: string;
  website: string;
  accreditation: string;
  featured: boolean;
  gallery: string[];
  notableAlumni?: string[];
  requirements: {
    generalCutOff: number;
    medicineCutOff?: number;
    lawCutOff?: number;
    engineeringCutOff?: number;
    postUtmeRequired: boolean;
    postUtmeFormat: string;
  };
}

export interface RoadmapStep {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  timeline: string;
  icon: string;
  checklist: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  tips: string[];
  officialLink?: string;
}

export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  fullContent: string[];
  date: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
  author: string;
}

export type SubjectType = 'English' | 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology';

export interface CbtQuestion {
  id: string;
  subject: SubjectType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProfile {
  name: string;
  email: string;
  targetCourse: string;
  targetUniversity: string;
  targetScore: number;
  savedCourseIds: string[];
  savedUnivIds: string[];
  completedStepIds: string[];
  cbtHistory: {
    date: string;
    score: number;
    total: number;
    subject: string;
  }[];
}
