/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Course, University, NewsArticle } from './types';
import { PublicHeader } from './components/PublicHeader';
import { AuthenticatedHeader } from './components/AuthenticatedHeader';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { AboutJambScreen } from './components/AboutJambScreen';
import { CoursesScreen } from './components/CoursesScreen';
import { UniversitiesScreen } from './components/UniversitiesScreen';
import { JambGuideScreen } from './components/JambGuideScreen';
import { StudyHubScreen } from './components/StudyHubScreen';
import { AdmissionScreen } from './components/AdmissionScreen';
import { NewsScreen } from './components/NewsScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { CareerExplorerScreen } from './components/CareerExplorerScreen';
import { CourseDetailScreen } from './components/CourseDetailScreen';
import { UniversityDetailsScreen } from './components/UniversityDetailsScreen';
import { SubjectCombinationCheckerScreen } from './components/SubjectCombinationCheckerScreen';
import { CbtPracticeScreen } from './components/CbtPracticeScreen';
import { JambSyllabusScreen } from './components/JambSyllabusScreen';
import { RecommendedTextbooksScreen } from './components/RecommendedTextbooksScreen';
import { PastQuestionsScreen } from './components/PastQuestionsScreen';
import { MockExamCentreScreen } from './components/MockExamCentreScreen';
import { ScholarshipsScreen } from './components/ScholarshipsScreen';
import { StudentProfileScreen } from './components/StudentProfileScreen';
import { HelpCentreScreen } from './components/HelpCentreScreen';
import { StudyPlannerScreen } from './components/StudyPlannerScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ParentDashboardScreen } from './components/ParentDashboardScreen';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { PlatformStatusScreen } from './components/PlatformStatusScreen';
import { LoginPage } from './components/LoginPage';
import {
  CourseModal,
  UniversityModal,
  ArticleModal,
  AuthModal,
  SearchModal,
  VideoTutorialModal,
} from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Modal & Selection states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedUniv, setSelectedUniv] = useState<{ univ: University; tab: 'requirements' | 'gallery' } | null>(null);
  const [selectedUnivDetail, setSelectedUnivDetail] = useState<University | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const handleOpenUnivDetail = (univ: University) => {
    setSelectedUnivDetail(univ);
    setActiveTab('university-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#f5fbf2] text-[#171d18] font-sans antialiased selection:bg-[#82faab] selection:text-[#00522b]">
      {/* Top Banner if logged in and inside student portal */}
      {user && activeTab !== 'home' && (
        <div className="bg-[#006a39] text-white text-xs py-2 px-3 sm:px-6 z-50 border-b border-[#008649]">
          <div className="flex flex-wrap items-center justify-between gap-2 max-w-[1280px] mx-auto w-full">
            <span className="flex items-center gap-1 font-medium truncate max-w-[200px] sm:max-w-none">
              <span className="material-symbols-outlined text-sm text-[#82faab]">account_circle</span>
              <span className="truncate">Welcome back, <strong className="text-[#82faab]">{user.name.split(' ')[0]}</strong></span>
              <span className="hidden md:inline text-white/80">({user.email})</span>
            </span>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="bg-[#82faab] text-[#00522b] hover:bg-white px-2 sm:px-2.5 py-0.5 rounded font-bold transition-colors flex items-center gap-1 text-[11px] sm:text-xs"
              >
                <span className="material-symbols-outlined text-xs">dashboard</span>
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className="hidden sm:flex hover:underline items-center gap-1 font-semibold text-xs"
              >
                <span>Checklist</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white bg-white/10 px-2 py-0.5 rounded transition-colors text-[11px] sm:text-xs"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Header Architecture:
          - Public / Unauthenticated / Home: ALWAYS PublicHeader (Strictly NO Hamburger)
          - Authenticated Student Portal (After login on dashboard/learning/protected tabs): AuthenticatedHeader (With Student Drawer)
      */}
      {user && activeTab !== 'home' ? (
        <AuthenticatedHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <PublicHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAuth={(mode) => setAuthMode(mode)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center w-full max-w-full overflow-x-hidden">
        {activeTab === 'home' && (
          <HomeScreen
            setActiveTab={setActiveTab}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
            }}
            onSelectUniversity={(univ, tab = 'requirements') => setSelectedUniv({ univ, tab })}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onOpenAuth={(mode) => setAuthMode(mode)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {activeTab === 'about' && <AboutJambScreen setActiveTab={setActiveTab} />}

        {activeTab === 'guide' && <JambGuideScreen setActiveTab={setActiveTab} />}

        {activeTab === 'courses' && (
          <CoursesScreen
            setActiveTab={setActiveTab}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
            }}
            onSelectUniversity={(univ) => setSelectedUniv({ univ, tab: 'requirements' })}
          />
        )}

        {activeTab === 'subject-checker' && (
          <SubjectCombinationCheckerScreen
            setActiveTab={setActiveTab}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
            }}
          />
        )}

        {activeTab === 'course-details' && (
          <CourseDetailScreen
            course={selectedCourse}
            setActiveTab={setActiveTab}
            onSelectUniversity={(univ) => setSelectedUniv({ univ, tab: 'requirements' })}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'universities' && (
          <UniversitiesScreen
            onSelectUniversity={(univ, tab = 'requirements') => setSelectedUniv({ univ, tab })}
            onViewDetails={handleOpenUnivDetail}
          />
        )}

        {activeTab === 'university-details' && (
          <UniversityDetailsScreen
            university={selectedUnivDetail}
            setActiveTab={setActiveTab}
            onSelectUniversity={(univ) => {
              setSelectedUnivDetail(univ);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'study-hub' && <StudyHubScreen setActiveTab={setActiveTab} />}

        {activeTab === 'syllabus' && <JambSyllabusScreen setActiveTab={setActiveTab} />}

        {activeTab === 'textbooks' && <RecommendedTextbooksScreen setActiveTab={setActiveTab} />}

        {activeTab === 'past-questions' && <PastQuestionsScreen setActiveTab={setActiveTab} />}

        {activeTab === 'mock-exam' && <MockExamCentreScreen setActiveTab={setActiveTab} />}

        {activeTab === 'cbt-practice' && <CbtPracticeScreen setActiveTab={setActiveTab} />}

        {activeTab === 'admission' && (
          <AdmissionScreen
            setActiveTab={setActiveTab}
            onSelectUniversity={(univ) => handleOpenUnivDetail(univ)}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'news' && (
          <NewsScreen
            onSelectArticle={(article) => setSelectedArticle(article as any)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'careers' && (
          <CareerExplorerScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'help-centre' && (
          <HelpCentreScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'study-planner' && (
          <StudyPlannerScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'notifications' && (
          <NotificationsScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'parent-dashboard' && (
          <ParentDashboardScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboardScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'platform-status' && (
          <PlatformStatusScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipsScreen setActiveTab={setActiveTab} />
        )}

        {activeTab === 'profile' && (
          <StudentProfileScreen
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            setActiveTab={setActiveTab}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              setActiveTab('course-details');
            }}
            onSelectUniversity={(univ) => setSelectedUniv({ univ, tab: 'requirements' })}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'login' && (
          <LoginPage
            initialMode="login"
            onSuccess={handleAuthSuccess}
            setActiveTab={setActiveTab}
            isModal={false}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      {activeTab !== 'course-details' && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onSelectUniv={() => {
            setSelectedCourse(null);
            setActiveTab('universities');
          }}
        />
      )}

      <UniversityModal
        univ={selectedUniv?.univ || null}
        initialTab={selectedUniv?.tab || 'requirements'}
        onClose={() => setSelectedUniv(null)}
        onViewFullDetails={handleOpenUnivDetail}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSuccess={handleAuthSuccess}
        setActiveTab={setActiveTab}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsSearchOpen(false);
        }}
      />

      <VideoTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateToStep={() => {
          setIsTutorialOpen(false);
          setActiveTab('guide');
        }}
      />
    </div>
  );
}

