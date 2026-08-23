import React, { useState } from 'react';
import { TabType } from '../types';

interface StudentProfileScreenProps {
  setActiveTab?: (tab: TabType) => void;
  onLogout?: () => void;
}

export const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({
  setActiveTab,
  onLogout,
}) => {
  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dark Mode Toggle
  const [darkMode, setDarkMode] = useState(false);

  // Editable Profile Data
  const [profileData, setProfileData] = useState({
    fullName: 'Samuel Adebayo',
    email: 'samuel.adebayo@jambmail.edu.ng',
    phone: '+234 810 555 2026',
    stateOfOrigin: 'Lagos State',
    currentLocation: 'Ibadan, Oyo State',
    preferredInstitution: 'University of Ibadan',
    preferredCourse: 'Computer Science',
    admissionRoute: 'UTME',
    targetGradYear: '2030 (2026 Entry)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  });

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...profileData });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...editFormData });
    setIsEditModalOpen(false);
    showToast('Profile information updated successfully for 2026 cycle!');
  };

  // Notification Toggles
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    scholarships: true,
    admission: true,
    cbtReminders: true,
    plannerReminders: false,
    weeklyReports: true,
    newsUpdates: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    const updated = !notifications[key];
    setNotifications((prev) => ({ ...prev, [key]: updated }));
    showToast(`${String(key).replace(/([A-Z])/g, ' $1')} preference ${updated ? 'enabled' : 'disabled'}`);
  };

  // Saved Content Filter & Items
  const [savedTab, setSavedTab] = useState<
    'unis' | 'courses' | 'scholarships' | 'articles' | 'questions' | 'textbooks' | 'comparisons'
  >('unis');

  const [savedUnis, setSavedUnis] = useState([
    { id: 'u1', name: 'University of Ibadan', code: 'UI', location: 'Oyo State', cutOff: 200, icon: 'account_balance' },
    { id: 'u2', name: 'University of Lagos', code: 'UNILAG', location: 'Lagos State', cutOff: 200, icon: 'school' },
    { id: 'u3', name: 'Covenant University', code: 'CU', location: 'Ogun State', cutOff: 180, icon: 'domain' },
  ]);

  const [savedCourses, setSavedCourses] = useState([
    { id: 'c1', name: 'Computer Science', faculty: 'Sciences', duration: '4 Years', cutOff: 240, icon: 'computer' },
    { id: 'c2', name: 'Medicine & Surgery', faculty: 'Clinical Sciences', duration: '6 Years', cutOff: 280, icon: 'medical_services' },
    { id: 'c3', name: 'Law (LL.B)', faculty: 'Law', duration: '5 Years', cutOff: 250, icon: 'gavel' },
  ]);

  const [savedScholarships, setSavedScholarships] = useState([
    { id: 's1', title: 'MTN Foundation Scholarship 2026', provider: 'MTN Nigeria', amount: '₦300,000 / Year', deadline: 'Aug 30, 2026' },
    { id: 's2', title: 'Federal Government Bilateral Award 2026', provider: 'Federal Ministry of Education', amount: 'Full Tuition + Stipend', deadline: 'Oct 15, 2026' },
  ]);

  const [savedArticles, setSavedArticles] = useState([
    { id: 'a1', title: '2026 JAMB CAPS Admission Acceptance Guide', date: 'Jul 28, 2026', readTime: '5 min read' },
    { id: 'a2', title: 'How to Calculate Your 2026 Aggregate Score for UI & UNILAG', date: 'Jul 20, 2026', readTime: '7 min read' },
  ]);

  const [savedQuestions, setSavedQuestions] = useState([
    { id: 'q1', subject: 'Physics', question: 'A body of mass 5kg falls freely from height of 20m. Find velocity upon impact.', dateSaved: 'Jul 26, 2026' },
    { id: 'q2', subject: 'Chemistry', question: 'Which of the following organic compounds decolorizes bromine water in CCl4?', dateSaved: 'Jul 19, 2026' },
  ]);

  const [savedTextbooks, setSavedTextbooks] = useState([
    { id: 't1', title: 'Explicit Physics for Senior Secondary & UTME', author: 'P.N. Okeke', subject: 'Physics' },
    { id: 't2', title: 'Countdown to Senior Secondary Certificate Mathematics', author: 'A.O. Kalejaiye', subject: 'Mathematics' },
  ]);

  const [savedComparisons, setSavedComparisons] = useState([
    { id: 'cm1', title: 'UI vs UNILAG (Computer Science 2026)', dateCreated: 'Jul 24, 2026', matchScore: '92% vs 88%' },
  ]);

  const removeSavedItem = (type: string, id: string) => {
    if (type === 'unis') setSavedUnis((prev) => prev.filter((i) => i.id !== id));
    if (type === 'courses') setSavedCourses((prev) => prev.filter((i) => i.id !== id));
    if (type === 'scholarships') setSavedScholarships((prev) => prev.filter((i) => i.id !== id));
    if (type === 'articles') setSavedArticles((prev) => prev.filter((i) => i.id !== id));
    if (type === 'questions') setSavedQuestions((prev) => prev.filter((i) => i.id !== id));
    if (type === 'textbooks') setSavedTextbooks((prev) => prev.filter((i) => i.id !== id));
    if (type === 'comparisons') setSavedComparisons((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from saved content');
  };

  // Security Modals & Toggles
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirmPass: '' });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirmPass) {
      showToast('⚠️ New passwords do not match');
      return;
    }
    setIsPasswordModalOpen(false);
    setPasswordForm({ current: '', newPass: '', confirmPass: '' });
    showToast('Security password updated successfully!');
  };

  // Destructive Confirmation Modal
  const [destructiveModal, setDestructiveModal] = useState<'deactivate' | 'delete' | 'signout' | null>(null);

  const handleConfirmDestructive = () => {
    if (destructiveModal === 'signout') {
      showToast('Signing out...');
      setTimeout(() => {
        if (onLogout) onLogout();
        if (setActiveTab) setActiveTab('home');
      }, 1000);
    } else if (destructiveModal === 'deactivate') {
      showToast('Account deactivated for 2026 cycle. You can reactivate anytime by logging back in.');
      setDestructiveModal(null);
    } else if (destructiveModal === 'delete') {
      showToast('Account deletion request initiated.');
      setDestructiveModal(null);
    }
  };

  // FAQ Accordions State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I edit my profile information?',
      a: 'Click the "Edit Profile" button in the Profile Overview card or top action bar. You can update your contact details, preferred institution, course of study, and target graduation year anytime during the 2026 cycle.',
    },
    {
      q: 'Can I change my preferred course for the 2026 admission cycle?',
      a: 'Yes, you can update your target course and target universities in your profile settings. This updates your custom CBT practice recommendations and Subject Combination Checker suggestions.',
    },
    {
      q: 'How do I manage my email and push notifications?',
      a: 'Navigate to the "Notification Preferences" section below and use the toggle switches to enable or disable alerts for scholarship deadlines, CBT reminders, and admission status updates.',
    },
    {
      q: 'Can I export my learning progress and CBT history?',
      a: 'Absolutely! Under the "Data Export" section, click "Download Profile Summary" or "Export Learning Progress" to generate a demo PDF or CSV breakdown of your performance metrics.',
    },
    {
      q: 'How do I secure my account?',
      a: 'You can enable Two-Factor Authentication (2FA), update your password regularly, monitor your active login sessions under "Security & Privacy", and ensure your account recovery email is verified.',
    },
  ];

  // Data Export Demo
  const handleExportData = (type: string) => {
    showToast(`Generating ${type} export for 2026 cycle... Download starting!`);
  };

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
            <span className="text-[#0F9D58] font-bold">My Account Settings (2026)</span>
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

      {/* PAGE HEADER / HERO */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">badge</span>
              <span>Student Profile Portal 2026</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Student Profile &amp; <span className="text-[#82FAAB]">Account Settings</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Manage your personal information, study preferences, security, and learning experience throughout the 2026 admission cycle.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="py-3 px-6 bg-[#0F9D58] text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-[#16A34A] transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                <span>Edit Profile Information</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('saved-content-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-white/10 text-white font-bold text-xs sm:text-sm rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">bookmark</span>
                <span>My Saved Content</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration / Analytics Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    🎓
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Account Status</p>
                    <p className="text-sm font-extrabold text-[#82FAAB]">Verified 2026 Student</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Member
                </span>
              </div>

              {/* Graphic Indicators */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#82FAAB]">dashboard</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Student Dashboard</p>
                    <p className="text-[9px] text-slate-300">2026 Cycle Sync</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-amber-300">insights</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Learning Analytics</p>
                    <p className="text-[9px] text-slate-300">85% Readiness</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-300">laptop</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Multi-Device</p>
                    <p className="text-[9px] text-slate-300">Laptop &amp; Mobile</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-purple-300">settings</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Account Security</p>
                    <p className="text-[9px] text-slate-300">2FA Active</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0F9D58]/20 border border-[#0F9D58]/40 rounded-2xl text-[11px] text-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">info</span>
                <span>Demo Profile: Data displayed is for candidate preview during 2026 cycle.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* 1. PROFILE OVERVIEW CARD */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-[#0F9D58] shadow-lg bg-slate-200">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => showToast('Simulating image upload... Select a file from your computer.')}
                title="Upload Photo"
                className="absolute -bottom-2 -right-2 bg-[#0F9D58] text-white p-2.5 rounded-full shadow-md hover:bg-[#16A34A] transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] dark:text-white">
                  {profileData.fullName}
                </h2>
                <span className="bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>Verified 2026 Candidate</span>
                </span>
              </div>

              <p className="text-sm font-semibold text-[#475569] dark:text-slate-300">
                Target: <strong className="text-[#0F9D58]">{profileData.preferredCourse}</strong> at <strong className="text-[#0F172A] dark:text-white">{profileData.preferredInstitution}</strong>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#475569] dark:text-slate-400 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#0F9D58]">calendar_today</span>
                  <span>Admission Year: <strong>2026</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#2563EB]">how_to_reg</span>
                  <span>Member Since: <strong>2026</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-500">alt_route</span>
                  <span>Route: <strong>{profileData.admissionRoute}</strong></span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="py-2.5 px-5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-all flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => showToast('Uploading new photo... Image updated!')}
              className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white text-xs font-bold rounded-xl border border-[#E2E8F0] dark:border-slate-700 hover:bg-slate-200 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              <span>Upload Photo</span>
            </button>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Profile link copied to clipboard!');
                }
              }}
              className="py-2.5 px-4 bg-white dark:bg-slate-800 text-[#2563EB] text-xs font-bold rounded-xl border border-[#2563EB]/30 hover:bg-[#2563EB]/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              <span>Share Profile</span>
            </button>
          </div>
        </section>

        {/* 2. PROFILE INFORMATION GRID */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex items-center justify-between border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Personal Records</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Candidate Information &amp; 2026 Parameters
              </h2>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              <span>Modify Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Full Name</span>
              <strong className="text-sm font-bold text-[#0F172A] dark:text-white block">{profileData.fullName}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Email Address</span>
              <strong className="text-sm font-bold text-[#0F172A] dark:text-white block">{profileData.email}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Phone Number</span>
              <strong className="text-sm font-bold text-[#0F172A] dark:text-white block">{profileData.phone}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">State of Origin</span>
              <strong className="text-sm font-bold text-[#0F172A] dark:text-white block">{profileData.stateOfOrigin}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Current Location</span>
              <strong className="text-sm font-bold text-[#0F172A] dark:text-white block">{profileData.currentLocation}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Preferred Institution</span>
              <strong className="text-sm font-bold text-[#0F9D58] block">{profileData.preferredInstitution}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Preferred Course</span>
              <strong className="text-sm font-bold text-[#0F9D58] block">{profileData.preferredCourse}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Admission Route</span>
              <strong className="text-sm font-bold text-[#2563EB] block">{profileData.admissionRoute} (100 Level)</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 block">Target Graduation Year</span>
              <strong className="text-sm font-bold text-[#0F172A] dark:text-white block">{profileData.targetGradYear}</strong>
            </div>
          </div>
        </section>

        {/* 3. ACADEMIC GOALS & CIRCULAR PROGRESS INDICATORS */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">2026 Target Benchmarks</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Academic Goals &amp; Readiness Indicators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Target Course & Unis */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#82FAAB] uppercase">Target Course Goal</span>
                <span className="material-symbols-outlined text-[#82FAAB]">flag</span>
              </div>
              <h3 className="text-xl font-bold font-display">{profileData.preferredCourse}</h3>
              <p className="text-xs text-slate-300">
                Primary Target: <strong>{profileData.preferredInstitution}</strong><br />
                Secondary Targets: UNILAG, Covenant University
              </p>
              <div className="pt-2 border-t border-slate-700 text-xs text-[#82FAAB] font-bold flex items-center justify-between">
                <span>Admission Readiness Score</span>
                <span>85% Match</span>
              </div>
            </div>

            {/* Daily & Weekly Study Goals */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#475569] dark:text-slate-400 uppercase">Daily Study Hours</span>
                <h3 className="text-2xl font-extrabold font-display text-[#0F172A] dark:text-white">3.5 Hours / Day</h3>
                <p className="text-xs text-[#16A34A] font-bold">↑ 78% Goal Achieved Today</p>
              </div>
              {/* Circular Indicator */}
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-200 dark:text-slate-700" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6" />
                  <circle className="text-[#0F9D58]" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeDasharray="200" strokeDashoffset="44" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#0F172A] dark:text-white">78%</span>
              </div>
            </div>

            {/* Weekly Study Goal & Mock Exam Target */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#475569] dark:text-slate-400 uppercase">Mock Exam Target</span>
                <h3 className="text-2xl font-extrabold font-display text-[#2563EB]">320 / 400</h3>
                <p className="text-xs text-[#2563EB] font-bold">Latest Score: 310 Score</p>
              </div>
              {/* Circular Indicator */}
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-200 dark:text-slate-700" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6" />
                  <circle className="text-[#2563EB]" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeDasharray="200" strokeDashoffset="32" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-[#0F172A] dark:text-white">84%</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ACCOUNT STATISTICS DASHBOARD */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">2026 Metrics</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Account Statistics &amp; Performance Summary
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">schedule</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Study Hours</p>
              <strong className="text-lg font-extrabold text-[#0F172A] dark:text-white block">142 hrs</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-[#2563EB] text-xl">laptop_mac</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">CBT Sessions</p>
              <strong className="text-lg font-extrabold text-[#0F172A] dark:text-white block">38</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-purple-600 text-xl">assignment_turned_in</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Mock Exams</p>
              <strong className="text-lg font-extrabold text-[#0F172A] dark:text-white block">6 Exams</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-amber-500 text-xl">quiz</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Questions</p>
              <strong className="text-lg font-extrabold text-[#0F172A] dark:text-white block">1,450+</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-emerald-600 text-xl">bookmark</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Saved Items</p>
              <strong className="text-lg font-extrabold text-[#0F172A] dark:text-white block">24 Items</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-rose-500 text-xl">emoji_events</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Achievements</p>
              <strong className="text-lg font-extrabold text-[#0F172A] dark:text-white block">7 Badges</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-[#0F9D58] text-xl">analytics</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Avg CBT Score</p>
              <strong className="text-lg font-extrabold text-[#0F9D58] block">78.5%</strong>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 shadow-sm ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <span className="material-symbols-outlined text-orange-500 text-xl">local_fire_department</span>
              <p className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase">Study Streak</p>
              <strong className="text-lg font-extrabold text-orange-500 block">14 Days</strong>
            </div>
          </div>
        </section>

        {/* 5. NOTIFICATION PREFERENCES & SECURITY SETTINGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NOTIFICATION PREFERENCES */}
          <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Alert Controls</span>
              <h2 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                Notification Preferences (2026 Cycle)
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', title: 'Email Notifications', desc: 'Receive weekly progress digests and important 2026 announcements.' },
                { key: 'push', title: 'Push Notifications', desc: 'Instant browser & mobile alerts for study reminders and updates.' },
                { key: 'scholarships', title: 'Scholarship Alerts', desc: 'Get notified when new 2026 undergraduate scholarships open.' },
                { key: 'admission', title: 'Admission Updates', desc: 'Alerts on CAPS status changes and university screening dates.' },
                { key: 'cbtReminders', title: 'CBT Practice Reminders', desc: 'Daily study goal nudges to maintain your 14-day streak.' },
                { key: 'plannerReminders', title: 'Study Planner Reminders', desc: 'Scheduled alerts for your custom timetable subjects.' },
                { key: 'weeklyReports', title: 'Weekly Performance Reports', desc: 'Comprehensive analytics report emailed every Sunday.' },
                { key: 'newsUpdates', title: 'JAMB News & Policy Alerts', desc: 'Updates on 2026 UTME cut-off marks and official guidelines.' },
              ].map((item) => {
                const isChecked = notifications[item.key as keyof typeof notifications];
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{item.title}</p>
                      <p className="text-[11px] text-[#475569] dark:text-slate-400">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${isChecked ? 'bg-[#0F9D58]' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isChecked ? 'transform translate-x-6' : ''}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECURITY SETTINGS */}
          <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Account Protection</span>
                <h2 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                  Security Settings &amp; Active Devices
                </h2>
              </div>
              <span className="bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                High Security
              </span>
            </div>

            <div className="space-y-4">
              {/* Change Password Card */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#0F9D58]">lock</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">Account Password</p>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400">Last changed: May 2026 (Strong)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="py-1.5 px-3 bg-white dark:bg-slate-700 border border-[#E2E8F0] dark:border-slate-600 text-[#0F172A] dark:text-white text-xs font-bold rounded-xl hover:text-[#0F9D58]"
                >
                  Change Password
                </button>
              </div>

              {/* Two-Factor Auth Card */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#2563EB]">verified_user</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400">SMS Verification + Authenticator Code</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    showToast(twoFactorEnabled ? '2FA disabled' : '2FA security enabled!');
                  }}
                  className={`py-1.5 px-3 text-xs font-bold rounded-xl transition-all ${
                    twoFactorEnabled
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
                </button>
              </div>

              {/* Login Activity & Active Devices */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">Active Login Sessions (2 Devices)</span>
                  <span className="text-[10px] text-[#0F9D58] font-bold">Lagos &amp; Ibadan</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">desktop_windows</span>
                      <span>Chrome on Windows 11 (Current Session)</span>
                    </div>
                    <span className="text-[10px] text-[#16A34A] font-bold">Active Now</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">smartphone</span>
                      <span>Safari on iPhone 15 (Ibadan, 2026)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">2 hours ago</span>
                  </div>
                </div>
              </div>

              {/* Privacy Settings & Recovery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white">Privacy Setting</p>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400">Private Profile (Leaderboard Only)</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white">Account Recovery</p>
                  <p className="text-[11px] text-[#16A34A] font-bold">Verified Backup Phone Active</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 6. LEARNING PREFERENCES */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Custom Study Experience</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Learning Preferences &amp; Platform Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Preferred Language */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Preferred Language</label>
              <select
                onChange={(e) => showToast(`Language set to ${e.target.value}`)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="English">English (Standard)</option>
                <option value="Yoruba">Yoruba</option>
                <option value="Hausa">Hausa</option>
                <option value="Igbo">Igbo</option>
              </select>
            </div>

            {/* Study Reminder Frequency */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Study Reminder Frequency</label>
              <select
                onChange={(e) => showToast(`Study reminders updated to ${e.target.value}`)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Daily at 8:00 AM">Daily at 8:00 AM</option>
                <option value="Twice Daily (Morning & Evening)">Twice Daily (Morning &amp; Evening)</option>
                <option value="Weekly Every Monday">Weekly Every Monday</option>
                <option value="Custom Timetable">Custom Timetable Aligned</option>
              </select>
            </div>

            {/* Default Dashboard Landing */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Default Landing View</label>
              <select
                onChange={(e) => showToast(`Default view set to ${e.target.value}`)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#0F9D58]"
              >
                <option value="Overview Dashboard">Student Overview Dashboard</option>
                <option value="CBT Exam Mode">CBT Exam Practice Mode</option>
                <option value="Admission CAPS Tracker">Admission CAPS Tracker</option>
                <option value="Subject Combination Checker">Subject Combination Checker</option>
              </select>
            </div>

            {/* Preferred UTME Subjects */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-2">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Registered UTME Subjects (2026 Combination)</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {['English Language (Compulsory)', 'Mathematics', 'Physics', 'Chemistry'].map((subj) => (
                  <span key={subj} className="bg-[#0F9D58]/10 border border-[#0F9D58]/30 text-[#0F9D58] px-3 py-1 rounded-xl text-xs font-bold">
                    {subj}
                  </span>
                ))}
              </div>
            </div>

            {/* Accessibility Options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] dark:text-slate-300">Accessibility Options</label>
              <div className="flex items-center gap-2 pt-1">
                <span className="bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
                  High Contrast Text: ON
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
                  Screen Reader Friendly
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. MY SAVED CONTENT SECTION */}
        <section id="saved-content-section" className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Bookmarked Resources</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                My Saved Content &amp; Favorites
              </h2>
            </div>
          </div>

          {/* Saved Content Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2E8F0] dark:border-slate-800 scrollbar-none">
            {[
              { id: 'unis', label: `Universities (${savedUnis.length})` },
              { id: 'courses', label: `Courses (${savedCourses.length})` },
              { id: 'scholarships', label: `Scholarships (${savedScholarships.length})` },
              { id: 'articles', label: `Articles (${savedArticles.length})` },
              { id: 'questions', label: `Questions (${savedQuestions.length})` },
              { id: 'textbooks', label: `Textbooks (${savedTextbooks.length})` },
              { id: 'comparisons', label: `Comparisons (${savedComparisons.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSavedTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  savedTab === tab.id
                    ? 'bg-[#0F9D58] text-white shadow-sm'
                    : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Saved Universities */}
          {savedTab === 'unis' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedUnis.length === 0 ? (
                <div className="col-span-full text-center py-10 text-slate-400 space-y-2">
                  <span className="material-symbols-outlined text-4xl">folder_open</span>
                  <p className="text-xs font-bold">No saved universities found.</p>
                </div>
              ) : (
                savedUnis.map((uni) => (
                  <div key={uni.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0F9D58] text-2xl">{uni.icon}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{uni.name} ({uni.code})</h4>
                        <p className="text-[11px] text-[#475569] dark:text-slate-400">📍 {uni.location} • Cut-off: {uni.cutOff}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSavedItem('unis', uni.id)}
                      title="Remove"
                      className="text-rose-500 hover:text-rose-700 p-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Saved Courses */}
          {savedTab === 'courses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedCourses.length === 0 ? (
                <div className="col-span-full text-center py-10 text-slate-400 space-y-2">
                  <span className="material-symbols-outlined text-4xl">folder_open</span>
                  <p className="text-xs font-bold">No saved courses found.</p>
                </div>
              ) : (
                savedCourses.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#2563EB] text-2xl">{c.icon}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{c.name}</h4>
                        <p className="text-[11px] text-[#475569] dark:text-slate-400">{c.faculty} • {c.duration} • Cut-off: {c.cutOff}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSavedItem('courses', c.id)}
                      title="Remove"
                      className="text-rose-500 hover:text-rose-700 p-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Saved Scholarships */}
          {savedTab === 'scholarships' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedScholarships.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{s.title}</h4>
                    <p className="text-[11px] text-[#0F9D58] font-bold">{s.amount} • Deadline: {s.deadline}</p>
                  </div>
                  <button
                    onClick={() => removeSavedItem('scholarships', s.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Saved Articles */}
          {savedTab === 'articles' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedArticles.map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{a.title}</h4>
                    <p className="text-[11px] text-slate-400">{a.date} • {a.readTime}</p>
                  </div>
                  <button
                    onClick={() => removeSavedItem('articles', a.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 5: Saved Questions */}
          {savedTab === 'questions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#0F9D58] uppercase">{q.subject}</span>
                    <p className="text-xs font-semibold text-[#0F172A] dark:text-white line-clamp-2">{q.question}</p>
                  </div>
                  <button
                    onClick={() => removeSavedItem('questions', q.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 6: Saved Textbooks */}
          {savedTab === 'textbooks' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedTextbooks.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{t.title}</h4>
                    <p className="text-[11px] text-slate-400">Author: {t.author} • {t.subject}</p>
                  </div>
                  <button
                    onClick={() => removeSavedItem('textbooks', t.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 7: Saved Comparisons */}
          {savedTab === 'comparisons' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedComparisons.map((cm) => (
                <div key={cm.id} className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{cm.title}</h4>
                    <p className="text-[11px] text-[#2563EB] font-bold">Match Score: {cm.matchScore}</p>
                  </div>
                  <button
                    onClick={() => removeSavedItem('comparisons', cm.id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 8. ACHIEVEMENTS & BADGES */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Milestones Unlocked</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Student Achievements &amp; Badges (2026 Cycle)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { title: 'Early Starter', icon: 'rocket_launch', color: 'bg-emerald-500', desc: 'Registered 2026 Pioneer' },
              { title: '7-Day Streak', icon: 'local_fire_department', color: 'bg-orange-500', desc: 'Continuous Daily Study' },
              { title: '100 Questions', icon: 'quiz', color: 'bg-blue-600', desc: 'Centurion Solver' },
              { title: 'Top Performer', icon: 'military_tech', color: 'bg-amber-500', desc: 'Scored 90th Percentile' },
              { title: 'Scholarship Explorer', icon: 'school', color: 'bg-purple-600', desc: '3 Grants Saved' },
              { title: 'Career Planner', icon: 'map', color: 'bg-teal-600', desc: 'Pathway Completed' },
              { title: 'Mock Champion', icon: 'emoji_events', color: 'bg-rose-500', desc: '300+ Mock Score' },
            ].map((badge) => (
              <div
                key={badge.title}
                className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-center space-y-2 hover:scale-105 transition-transform"
              >
                <div className={`w-12 h-12 mx-auto rounded-2xl ${badge.color} text-white flex items-center justify-center shadow-md`}>
                  <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                </div>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white leading-tight">{badge.title}</p>
                <p className="text-[10px] text-[#475569] dark:text-slate-400">{badge.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. ACTIVITY TIMELINE & DATA EXPORT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ACTIVITY TIMELINE */}
          <section className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Historical Logs</span>
              <h2 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                Recent Activity Timeline (2026)
              </h2>
            </div>

            <div className="relative border-l-2 border-[#0F9D58]/30 ml-4 space-y-6 pl-6">
              {[
                { date: 'Jul 28, 2026', title: 'Completed CBT Practice Test', desc: 'Physics Mechanics (Score: 88% - 35/40)' },
                { date: 'Jul 22, 2026', title: 'Saved University of Ibadan', desc: 'Added UI Computer Science to target list' },
                { date: 'Jul 15, 2026', title: 'Started 2026 Full Length Mock Exam #4', desc: 'Aggregated Score: 310 / 400' },
                { date: 'Jun 30, 2026', title: 'Updated Profile Preferences', desc: 'Confirmed UTME subject combination' },
                { date: 'Jun 18, 2026', title: 'Downloaded Chemistry Syllabus Guide', desc: '2026 Official Syllabus PDF saved' },
                { date: 'May 25, 2026', title: 'Viewed Federal Scholarship Board 2026', desc: 'Tracked eligibility requirements' },
              ].map((log, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0F9D58] ring-4 ring-[#0F9D58]/20 group-hover:scale-125 transition-transform" />
                  <span className="text-[11px] font-bold text-[#0F9D58] block">{log.date}</span>
                  <p className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{log.title}</p>
                  <p className="text-xs text-[#475569] dark:text-slate-400">{log.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DATA EXPORT & HELP */}
          <div className="lg:col-span-5 space-y-8">
            {/* DATA EXPORT CARDS */}
            <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Reports &amp; Downloads</span>
                <h2 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
                  Data Export (Demo)
                </h2>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleExportData('Profile Summary PDF')}
                  className="w-full p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0F9D58]">picture_as_pdf</span>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A] dark:text-white">Download Profile Summary</p>
                      <p className="text-[10px] text-[#475569] dark:text-slate-400">PDF breakdown of targets &amp; credentials</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-xs">download</span>
                </button>

                <button
                  onClick={() => handleExportData('Learning Progress CSV')}
                  className="w-full p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#2563EB]">table_chart</span>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A] dark:text-white">Export Learning Progress</p>
                      <p className="text-[10px] text-[#475569] dark:text-slate-400">CSV dataset of CBT practice scores</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-xs">download</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#0F9D58] transition-all flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-purple-600">print</span>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A] dark:text-white">Print Profile Dashboard</p>
                      <p className="text-[10px] text-[#475569] dark:text-slate-400">Printer-friendly report layout</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-xs">print</span>
                </button>
              </div>
            </section>

            {/* HELP & SUPPORT CARDS */}
            <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="border-b pb-3 border-[#E2E8F0] dark:border-slate-800">
                <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Assistance</span>
                <h2 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
                  Help &amp; Support Resources
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => showToast('Redirecting to Help Centre...')}
                  className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-left hover:border-[#0F9D58]"
                >
                  <span className="material-symbols-outlined text-[#0F9D58] text-xl">help_center</span>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white pt-1">Help Centre</p>
                </button>

                <button
                  onClick={() => showToast('Opening Live Support Chat...')}
                  className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-left hover:border-[#0F9D58]"
                >
                  <span className="material-symbols-outlined text-[#2563EB] text-xl">support_agent</span>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white pt-1">Contact Support</p>
                </button>

                <button
                  onClick={() => showToast('Opening Feedback Form...')}
                  className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-left hover:border-[#0F9D58]"
                >
                  <span className="material-symbols-outlined text-amber-500 text-xl">rate_review</span>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white pt-1">Send Feedback</p>
                </button>

                <button
                  onClick={() => showToast('Report modal opened.')}
                  className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-left hover:border-[#0F9D58]"
                >
                  <span className="material-symbols-outlined text-rose-500 text-xl">report_problem</span>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-white pt-1">Report Issue</p>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* 10. FAQ ACCORDION SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${darkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="border-b pb-4 border-[#E2E8F0] dark:border-slate-800">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Account Guidance</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Account Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E2E8F0] dark:border-slate-700 overflow-hidden bg-[#F8FAFC] dark:bg-slate-800 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-base">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#475569] dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-700/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 11. ACCOUNT MANAGEMENT (DESTRUCTIVE ACTIONS) */}
        <section className={`p-6 sm:p-8 rounded-3xl border border-rose-200 dark:border-rose-950 shadow-xl space-y-6 bg-rose-50/50 dark:bg-rose-950/20`}>
          <div className="border-b pb-4 border-rose-200 dark:border-rose-900">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Zone of Control</span>
            <h2 className="text-xl font-bold font-display text-rose-950 dark:text-rose-200">
              Account Management &amp; Termination Options
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-bold text-rose-950 dark:text-rose-200">Deactivate or Delete Profile</p>
              <p className="text-[11px] text-rose-700 dark:text-rose-300">
                Temporarily pause your 2026 study sync or permanently remove your demo candidate records.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setDestructiveModal('deactivate')}
                className="py-2.5 px-4 bg-amber-500 text-white text-xs font-bold rounded-xl hover:bg-amber-600 transition-all shadow-sm"
              >
                Deactivate Account
              </button>

              <button
                onClick={() => setDestructiveModal('delete')}
                className="py-2.5 px-4 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-all shadow-sm"
              >
                Delete Account
              </button>

              <button
                onClick={() => setDestructiveModal('signout')}
                className="py-2.5 px-4 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </section>

        {/* 12. CALL TO ACTION BANNER */}
        <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-[#0F9D58] via-[#006a39] to-[#0F172A] py-14 px-8 text-center text-white shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block bg-white/20 text-[#82FAAB] px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
              2026 Academic Excellence
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Personalise Your Learning Journey
            </h2>

            <p className="text-sm sm:text-base text-slate-100 opacity-90 leading-relaxed">
              Keep your profile updated, stay organised, and make the most of every feature available throughout the 2026 admission cycle.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="bg-white text-[#0F9D58] px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm hover:scale-105 transition-all shadow-lg"
              >
                Go to Dashboard
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('cbt-practice')}
                className="border border-white/30 text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm hover:bg-white/10 transition-all"
              >
                Continue Studying
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* MODAL 1: EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C2541] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 border border-[#E2E8F0] dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
                Edit 2026 Candidate Profile
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Phone Number</label>
                <input
                  type="text"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#475569] dark:text-slate-300">State of Origin</label>
                  <input
                    type="text"
                    value={editFormData.stateOfOrigin}
                    onChange={(e) => setEditFormData({ ...editFormData, stateOfOrigin: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#475569] dark:text-slate-300">Current Location</label>
                  <input
                    type="text"
                    value={editFormData.currentLocation}
                    onChange={(e) => setEditFormData({ ...editFormData, currentLocation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Preferred Institution</label>
                <input
                  type="text"
                  value={editFormData.preferredInstitution}
                  onChange={(e) => setEditFormData({ ...editFormData, preferredInstitution: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Preferred Course</label>
                <input
                  type="text"
                  value={editFormData.preferredCourse}
                  onChange={(e) => setEditFormData({ ...editFormData, preferredCourse: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#475569] dark:text-slate-300">Admission Route</label>
                  <select
                    value={editFormData.admissionRoute}
                    onChange={(e) => setEditFormData({ ...editFormData, admissionRoute: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  >
                    <option value="UTME">UTME (100 Level)</option>
                    <option value="Direct Entry">Direct Entry (200 Level)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#475569] dark:text-slate-300">Target Grad Year</label>
                  <input
                    type="text"
                    value={editFormData.targetGradYear}
                    onChange={(e) => setEditFormData({ ...editFormData, targetGradYear: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#0F9D58] text-white font-bold rounded-xl hover:bg-[#16A34A]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C2541] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 border border-[#E2E8F0] dark:border-slate-700">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white">
                Update Account Password
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#475569] dark:text-slate-300">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPass: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#0F9D58] text-white font-bold rounded-xl hover:bg-[#16A34A]"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DESTRUCTIVE ACTION CONFIRMATION MODAL */}
      {destructiveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C2541] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 flex items-center justify-center text-3xl">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>

            <h3 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
              {destructiveModal === 'signout'
                ? 'Sign Out of JAMB Compass?'
                : destructiveModal === 'deactivate'
                ? 'Deactivate Student Account?'
                : 'Permanently Delete Account?'}
            </h3>

            <p className="text-xs text-[#475569] dark:text-slate-300">
              {destructiveModal === 'signout'
                ? 'Are you sure you want to end your current 2026 active session?'
                : destructiveModal === 'deactivate'
                ? 'Deactivating will pause your notifications and 2026 study streak until you sign back in.'
                : 'This action is irreversible. All saved universities, CBT history, and 2026 progress data will be deleted.'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDestructiveModal(null)}
                className="py-2.5 px-5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDestructive}
                className={`py-2.5 px-6 text-white text-xs font-bold rounded-xl shadow-md ${
                  destructiveModal === 'signout'
                    ? 'bg-slate-800 hover:bg-slate-900'
                    : destructiveModal === 'deactivate'
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
