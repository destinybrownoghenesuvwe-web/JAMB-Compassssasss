import React, { useState } from 'react';
import { TabType } from '../types';

interface JambGuideScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export const JambGuideScreen: React.FC<JambGuideScreenProps> = ({ setActiveTab }) => {
  // State for horizontal timeline active step selection
  const [activeStepId, setActiveStepId] = useState<number>(1);

  // Accordion state for Step-by-Step Guide
  const [openAccordionStep, setOpenAccordionStep] = useState<number | null>(1);

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Completed items state (saved locally in component state)
  const [completedDocs, setCompletedItems] = useState<Record<string, boolean>>({
    nin: true,
    phone: true,
    email: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleDocItem = (key: string) => {
    setCompletedItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      if (updated[key]) {
        showToast(`Marked ${key.toUpperCase()} as ready!`);
      }
      return updated;
    });
  };

  // 7 Timeline Steps
  const timelineSteps = [
    {
      id: 1,
      number: "01",
      icon: "badge",
      title: "Prepare Info",
      shortDesc: "Gather NIN, Phone & Email",
      fullDesc: "Obtain your 11-digit NIN and ensure you have a dedicated mobile number and active personal email.",
    },
    {
      id: 2,
      number: "02",
      icon: "app_registration",
      title: "Create Profile",
      shortDesc: "Send SMS for Profile Code",
      fullDesc: "Send 'NIN [11 digits]' via SMS to 55019 or 66019 from your unique mobile line to receive your 10-digit Profile Code.",
    },
    {
      id: 3,
      number: "03",
      icon: "payments",
      title: "Obtain PIN",
      shortDesc: "Pay via Remita/Bank/USSD",
      fullDesc: "Purchase your official JAMB e-PIN at accredited banks, NIPOST, Remita, or online platforms using your Profile Code.",
    },
    {
      id: 4,
      number: "04",
      icon: "apartment",
      title: "Visit CBT Centre",
      shortDesc: "Biometrics & Course Selection",
      fullDesc: "Visit an official JAMB Accredited CBT Centre to fill data, select courses/universities, and capture biometrics.",
    },
    {
      id: 5,
      number: "05",
      icon: "fact_check",
      title: "Biometrics & Verification",
      shortDesc: "Capture 10 fingers & photo",
      fullDesc: "Complete live facial passport photo capture and 10-finger biometric print scanning at the center terminal.",
    },
    {
      id: 6,
      number: "06",
      icon: "print",
      title: "Print Slip",
      shortDesc: "Obtain Registration Slip",
      fullDesc: "Review all data on screen, submit, and collect your official printed JAMB Registration Slip with your Reg Number.",
    },
    {
      id: 7,
      number: "07",
      icon: "school",
      title: "Exam Preparation",
      shortDesc: "Study Hub & Mock CBT",
      fullDesc: "Access official JAMB syllabus, practice mock CBT exams on Study Hub, and print your examination venue slip.",
    },
  ];

  // Document Checklist Items
  const docChecklist = [
    {
      id: "nin",
      title: "National Identification Number (NIN)",
      desc: "11-digit NIN issued by NIMC. Must match your official full name and date of birth exactly.",
      badge: "Mandatory",
    },
    {
      id: "phone",
      title: "Valid Personal Mobile Phone Number",
      desc: "Must be owned solely by you. Used for profile creation, e-PIN delivery, and CAPS alerts.",
      badge: "Mandatory",
    },
    {
      id: "email",
      title: "Personal Email Address",
      desc: "Active Gmail or Yahoo address for receiving official JAMB CAPS updates and password resets.",
      badge: "Mandatory",
    },
    {
      id: "pin",
      title: "JAMB e-PIN Payment Confirmation",
      desc: "Official e-PIN generated upon payment via Remita, banks, or online channels.",
      badge: "Required at CBT",
    },
    {
      id: "passport",
      title: "Passport Photograph Requirements",
      desc: "Captured live at CBT center. Wear clean clothing; neutral background; no face caps or dark glasses.",
      badge: "Live Capture",
    },
    {
      id: "olevel",
      title: "O'Level Result Information",
      desc: "WAEC/NECO/NABTEB statement of results or scratch cards (Awaiting Result 'AR' is also allowed).",
      badge: "If Available",
    },
    {
      id: "payment",
      title: "Payment Receipt & Reference",
      desc: "Proof of e-PIN purchase receipt and CBT registration service charge payment slip.",
      badge: "Proof of Payment",
    },
  ];

  // Common Mistakes
  const commonMistakes = [
    {
      title: "Incorrect Spelling of Names or DOB Mismatch",
      desc: "Entering names on JAMB differently from your NIN or WAEC certificate causes automatic CAPS disqualification during clearance.",
      icon: "border_color",
    },
    {
      title: "Wrong UTME Subject Combination",
      desc: "Selecting unapproved subject combinations (e.g. writing Agriculture instead of Physics for Computer Science) invalidates your score.",
      icon: "cancel",
    },
    {
      title: "Incorrect Institution & Course Selection",
      desc: "Choosing universities that do not offer your preferred course or selecting private universities without checking tuition requirements.",
      icon: "wrong_location",
    },
    {
      title: "Wrong Email Address or Shared Phone Line",
      desc: "Using a friend's or cybercafe agent's phone number or email locks you out of your JAMB CAPS portal permanently.",
      icon: "mark_email_unread",
    },
    {
      title: "Using Unofficial or Unaccredited Registration Centres",
      desc: "Registering at illegal cybercafes leads to invalid registration numbers, fake slips, and total exclusion from JAMB database.",
      icon: "warning",
    },
    {
      title: "Ignoring Confirmation Screen Before Final Submission",
      desc: "Failing to thoroughly verify your name, subjects, and sittings on the CBT operator screen before biometric submission.",
      icon: "published_with_changes",
    },
  ];

  // Registration Tips
  const registrationTips = [
    {
      title: "Register Early",
      desc: "Complete registration in the first 2 weeks to secure your preferred examination town and avoid last-minute portal slowdowns.",
      icon: "schedule",
      color: "bg-[#0F9D58]/10 text-[#0F9D58]",
    },
    {
      title: "Use Accurate Information",
      desc: "Ensure every letter in your name, date of birth, and origin matches your NIMC NIN database records word for word.",
      icon: "verified_user",
      color: "bg-[#2563EB]/10 text-[#2563EB]",
    },
    {
      title: "Keep Printed Copies",
      desc: "Print at least 5 clear physical copies of your registration slip and e-PIN receipt and store digital backups on Google Drive.",
      icon: "print",
      color: "bg-purple-500/10 text-purple-700",
    },
    {
      title: "Verify Subject Combination",
      desc: "Cross-check your 4 UTME subjects against the official JAMB IBASS brochure for your exact university and degree.",
      icon: "fact_check",
      color: "bg-amber-500/10 text-amber-700",
    },
    {
      title: "Follow Official Announcements",
      desc: "Rely exclusively on official JAMB handles (@JAMBHQ) and JAMB Compass for authentic portal dates and news updates.",
      icon: "campaign",
      color: "bg-[#0F9D58]/10 text-[#0F9D58]",
    },
    {
      title: "Prepare Before Visiting CBT Centre",
      desc: "Write down your course choices, 1st to 4th choices, and subject combinations on paper before sitting with the CBT operator.",
      icon: "checklist",
      color: "bg-[#2563EB]/10 text-[#2563EB]",
    },
  ];

  // FAQs
  const faqs = [
    {
      q: "Who can register for UTME and Direct Entry?",
      a: "Any candidate who possesses a valid National Identification Number (NIN) and meets the minimum age requirement (16 years) with required O'Level qualifications or A-Levels/ND/HND for Direct Entry.",
    },
    {
      q: "Can I correct mistakes after registration?",
      a: "Yes. JAMB opens an official 'Correction of Data' portal window after registration closes, allowing candidates to correct course choices, institution choices, names, or date of birth for a standard fee.",
    },
    {
      q: "What documents do I need to take to the accredited CBT centre?",
      a: "You only need your 10-digit JAMB Profile Code, NIN slip, e-PIN payment confirmation receipt, O'Level details (if available), and a written list of your course choices.",
    },
    {
      q: "Can I change my institution or course choice later?",
      a: "Yes. You can apply for a Change of Institution/Course on the JAMB portal before or after UTME exam results are released.",
    },
    {
      q: "What happens after I complete my JAMB registration?",
      a: "You should study actively with the JAMB syllabus, practice past questions on Study Hub, wait for examination venue slip printing, and write your UTME exam.",
    },
  ];

  // Related Tools Cards
  const relatedTools = [
    {
      title: "Subject Combination Checker",
      desc: "Verify exact 4 UTME subjects and O'Level prerequisites for all accredited Nigerian courses.",
      icon: "menu_book",
      tab: "subject-checker" as TabType,
    },
    {
      title: "Admission Requirements Checker",
      desc: "View university-specific cut-off marks, sittings rules, and Post-UTME screening formats.",
      icon: "fact_check",
      tab: "admission" as TabType,
    },
    {
      title: "Course Directory",
      desc: "Explore 85+ accredited degree courses with career prospects and requirements.",
      icon: "auto_stories",
      tab: "courses" as TabType,
    },
    {
      title: "University Directory",
      desc: "Browse Federal, State, and Private universities in Nigeria with cut-off scores.",
      icon: "account_balance",
      tab: "universities" as TabType,
    },
    {
      title: "Career Explorer",
      desc: "Discover high-demand careers, salary benchmarks, and matching university degrees.",
      icon: "work",
      tab: "careers" as TabType,
    },
    {
      title: "Study Hub & CBT Practice",
      desc: "Practice real past JAMB questions with timed CBT practice tests and detailed solutions.",
      icon: "quiz",
      tab: "study-hub" as TabType,
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0F172A] font-sans min-h-screen pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* PAGE HEADER / BREADCRUMB */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-2 text-xs text-[#475569] font-medium">
          <button
            onClick={() => setActiveTab && setActiveTab('home')}
            className="hover:text-[#0F9D58] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Home</span>
          </button>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#475569]">JAMB Guide</span>
          <span className="text-[#CBD5E1]">/</span>
          <span className="text-[#0F172A] font-bold">Registration Guide</span>
        </div>
      </div>

      {/* HERO HEADER SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white overflow-hidden py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>Official 2026 Candidate Roadmap</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight text-white">
              Complete JAMB Registration Guide
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
              Follow every step from preparing your documents to completing your registration and printing your examination slip. Avoid costly errors and secure your admission journey.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                <span>NIN Profile Verification</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>e-PIN Payment Channels</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Accredited CBT Centres Only</span>
              </span>
            </div>
          </div>

          {/* Hero Illustration Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">app_registration</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">JAMB Portal Status</p>
                    <p className="text-base font-bold font-display">UTME & DE Registration</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Active
                </span>
              </div>

              {/* Progress Summary Pill */}
              <div className="bg-white/10 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-300 font-medium">Required Documents</p>
                  <p className="text-sm font-bold">NIN, Email, Phone, e-PIN</p>
                </div>
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-300/30 text-xs font-bold px-3 py-1 rounded-xl">
                  7-Step Guide
                </span>
              </div>

              <div className="text-[11px] text-slate-300 bg-black/20 p-3 rounded-xl flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm flex-shrink-0 mt-0.5">info</span>
                <span>Always create your Profile Code using your personal phone number linked to your NIN.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* REGISTRATION PROGRESS TIMELINE (HORIZONTAL INTERACTIVE) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
                7-Step Candidate Journey
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
                Registration Progress Timeline
              </h2>
            </div>
            <p className="text-xs text-[#475569]">
              Click any step below to jump directly to its complete breakdown.
            </p>
          </div>

          <div className="overflow-x-auto w-full max-w-full pb-4 pt-2 no-scrollbar">
            <div className="flex items-center min-w-[920px] justify-between relative px-2">
              {/* Timeline Connecting Bar */}
              <div className="absolute top-7 left-12 right-12 h-1 bg-[#E2E8F0] z-0"></div>

              {timelineSteps.map((step) => {
                const isActive = activeStepId === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStepId(step.id);
                      setOpenAccordionStep(step.id);
                      showToast(`Selected Step ${step.id}: ${step.title}`);
                    }}
                    className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all w-28 text-center`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md transition-all ${
                        isActive
                          ? 'bg-[#0F9D58] text-white ring-4 ring-[#0F9D58]/20 scale-110'
                          : 'bg-white text-[#0F172A] border-2 border-[#E2E8F0] group-hover:border-[#0F9D58]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{step.icon}</span>
                    </div>

                    <span className="text-[11px] font-bold text-[#0F9D58] mt-2 block uppercase tracking-wider">
                      Step {step.number}
                    </span>

                    <h3 className={`text-xs font-bold mt-0.5 line-clamp-1 ${isActive ? 'text-[#0F9D58]' : 'text-[#0F172A]'}`}>
                      {step.title}
                    </h3>

                    <p className="text-[10px] text-[#475569] mt-0.5 line-clamp-1 max-w-[100px]">
                      {step.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Highlight Banner */}
          {(() => {
            const currentStepObj = timelineSteps.find((s) => s.id === activeStepId) || timelineSteps[0];
            return (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0F9D58] text-white flex items-center justify-center font-extrabold">
                    {currentStepObj.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">{currentStepObj.title}</h4>
                    <p className="text-[#475569] mt-0.5">{currentStepObj.fullDesc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenAccordionStep(currentStepObj.id)}
                  className="bg-[#0F9D58] text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#0d8a4d] transition-all shrink-0"
                >
                  View Details
                </button>
              </div>
            );
          })()}
        </section>

        {/* STEP-BY-STEP GUIDE (EXPANDABLE ACCORDIONS) */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Detailed Instructions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Step-by-Step Registration Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Expand each step to view requirements, procedures, and common pitfalls to avoid.
            </p>
          </div>

          <div className="space-y-4">

            {/* STEP 1 */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenAccordionStep(openAccordionStep === 1 ? null : 1)}
                className="w-full p-5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center">
                    01
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base">Step 1: Prepare Your Information</h3>
                    <p className="text-xs text-[#475569]">NIN, phone number, email, and personal details checklist</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#0F172A]">
                  {openAccordionStep === 1 ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {openAccordionStep === 1 && (
                <div className="p-6 bg-white space-y-4 border-t border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                  <p className="font-medium text-[#0F172A]">
                    Before starting registration, ensure you have gathered all mandatory information listed below:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                      <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#0F9D58] text-base">badge</span>
                        <span>National Identification Number (NIN)</span>
                      </p>
                      <p>11-digit NIN issued by NIMC. Must match your official full name and date of birth exactly.</p>
                    </div>

                    <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                      <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#0F9D58] text-base">phone_iphone</span>
                        <span>Dedicated Mobile Phone Number</span>
                      </p>
                      <p>Unique phone number owned by you. Do not share phone numbers with other JAMB candidates.</p>
                    </div>

                    <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                      <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#0F9D58] text-base">mail</span>
                        <span>Active Personal Email Address</span>
                      </p>
                      <p>Personal Gmail or Yahoo address for receiving official JAMB CAPS updates and password resets.</p>
                    </div>

                    <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                      <p className="font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#0F9D58] text-base">school</span>
                        <span>O'Level Result Details</span>
                      </p>
                      <p>WAEC/NECO/NABTEB subject grades or scratch card details (Awaiting Result 'AR' is also allowed).</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-emerald-900 flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#0F9D58] text-base flex-shrink-0 mt-0.5">photo_camera</span>
                    <span><strong>Passport Photograph Guidance:</strong> Do not bring paper passport photos. Your photograph will be captured live using an official web camera at the accredited CBT centre terminal.</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2 */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenAccordionStep(openAccordionStep === 2 ? null : 2)}
                className="w-full p-5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center">
                    02
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base">Step 2: Create Your JAMB Profile</h3>
                    <p className="text-xs text-[#475569]">Send SMS to 55019 or 66019 to obtain your 10-digit Profile Code</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#0F172A]">
                  {openAccordionStep === 2 ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {openAccordionStep === 2 && (
                <div className="p-6 bg-white space-y-4 border-t border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                  <p className="font-medium text-[#0F172A]">
                    Follow these exact steps to generate your JAMB Profile Code via SMS:
                  </p>

                  <div className="bg-[#0F172A] text-white p-4 rounded-xl font-mono text-xs space-y-2 border border-[#0F9D58]">
                    <p className="text-[#82FAAB] font-bold">SMS Format to 55019 or 66019:</p>
                    <p className="text-sm font-bold bg-white/10 p-2.5 rounded-lg">NIN 12345678901</p>
                    <p className="text-slate-300 text-[11px] font-sans">
                      (Type 'NIN' followed by a space, then your 11-digit National Identity Number).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-[#0F172A]">Why Accurate Profile Creation Matters:</p>
                    <p>
                      Your Profile Code links your NIN record permanently to your JAMB registration portal. Any name or birth date mismatch between your NIN and school certificates will require official NIMC correction before admission clearance.
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-base flex-shrink-0 mt-0.5">warning</span>
                    <span><strong>Common Mistakes to Avoid:</strong> Do not use a postpaid line or corporate SIM card. Ensure your phone line has at least ₦50 regular airtime balance (data bonus airtime will fail).</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3 */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenAccordionStep(openAccordionStep === 3 ? null : 3)}
                className="w-full p-5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center">
                    03
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base">Step 3: Obtain Registration PIN</h3>
                    <p className="text-xs text-[#475569]">Purchase official e-PIN via approved payment channels</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#0F172A]">
                  {openAccordionStep === 3 ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {openAccordionStep === 3 && (
                <div className="p-6 bg-white space-y-4 border-t border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                  <p className="font-medium text-[#0F172A]">
                    Use your 10-digit Profile Code to purchase your official e-PIN through any accredited partner:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <p className="font-bold text-[#0F172A]">Commercial Banks</p>
                      <p className="text-[11px] mt-1">FirstBank, Zenith, GTBank, Access, UBA over-the-counter or bank apps.</p>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <p className="font-bold text-[#0F172A]">Online Portals</p>
                      <p className="text-[11px] mt-1">Remita, Interswitch, Quickteller, or official JAMB payment portal.</p>
                    </div>

                    <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                      <p className="font-bold text-[#0F172A]">USSD Code Banking</p>
                      <p className="text-[11px] mt-1">Dial official bank USSD codes with your Profile Code.</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-blue-900 flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#2563EB] text-base flex-shrink-0 mt-0.5">receipt_long</span>
                    <span><strong>Proof of Payment:</strong> Always collect and store your official paper e-PIN receipt or digital transaction reference PDF. You will need to present this at the CBT centre.</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 4 */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenAccordionStep(openAccordionStep === 4 ? null : 4)}
                className="w-full p-5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center">
                    04
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base">Step 4: Visit an Accredited CBT Centre</h3>
                    <p className="text-xs text-[#475569]">Data capture, biometric verification, and course selection</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#0F172A]">
                  {openAccordionStep === 4 ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {openAccordionStep === 4 && (
                <div className="p-6 bg-white space-y-4 border-t border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                  <p className="font-medium text-[#0F172A]">
                    Present your e-PIN and Profile Code to the operator at an officially accredited JAMB CBT centre:
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base flex-shrink-0">check_circle</span>
                      <span><strong>Biometric Fingerprint Scan:</strong> Capture all 10 fingers on the biometric scanner.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base flex-shrink-0">check_circle</span>
                      <span><strong>Live Photo Capture:</strong> Live web camera portrait photograph.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#0F9D58] text-base flex-shrink-0">check_circle</span>
                      <span><strong>Course & Institution Selection:</strong> Choose 1st, 2nd, 3rd, and 4th choice institutions and degree programs.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* STEP 5 */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenAccordionStep(openAccordionStep === 5 ? null : 5)}
                className="w-full p-5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center">
                    05
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base">Step 5: Review Registration Information</h3>
                    <p className="text-xs text-[#475569]">Thoroughly verify screen details before final operator submission</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#0F172A]">
                  {openAccordionStep === 5 ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {openAccordionStep === 5 && (
                <div className="p-6 bg-white space-y-4 border-t border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                  <p className="font-medium text-[#0F172A]">
                    Check every single detail on the CBT terminal screen carefully before authorising final submission:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-bold text-[#0F172A] text-center">
                    <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">Full Name</div>
                    <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">Date of Birth</div>
                    <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">UTME Subjects</div>
                    <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">Target University</div>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 6 */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenAccordionStep(openAccordionStep === 6 ? null : 6)}
                className="w-full p-5 bg-[#F8FAFC] flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0F9D58] text-white font-extrabold text-xs flex items-center justify-center">
                    06
                  </span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base">Step 6: Print Registration Slip</h3>
                    <p className="text-xs text-[#475569]">Collect physical registration slip containing your JAMB Reg Number</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#0F172A]">
                  {openAccordionStep === 6 ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {openAccordionStep === 6 && (
                <div className="p-6 bg-white space-y-4 border-t border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                  <p className="font-medium text-[#0F172A]">
                    Upon completion, the CBT operator will print your official JAMB UTME/DE Registration Slip.
                  </p>
                  <p>
                    Verify that your Registration Number, barcode, photo, and subject combination are clearly visible. Keep at least 5 printed copies for university screening and exam day entry.
                  </p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* DOCUMENT CHECKLIST SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Document Readiness
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Required Documents Checklist
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Click on each document card to mark it as ready before heading to the CBT registration centre.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docChecklist.map((doc) => {
              const isChecked = !!completedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDocItem(doc.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-[#0F9D58] shadow-xs'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#0F9D58]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-[#0F172A] uppercase">
                      {doc.badge}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-[#16A34A] text-white' : 'border-2 border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isChecked && <span className="material-symbols-outlined text-xs font-bold">check</span>}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A]">{doc.title}</h3>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">{doc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMMON MISTAKES SECTION */}
        <section className="bg-amber-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200 space-y-6">
          <div className="flex items-center gap-2.5 text-amber-800">
            <span className="material-symbols-outlined text-2xl text-amber-600">warning</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Common Registration Mistakes to Avoid
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonMistakes.map((mistake, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-700">
                  <span className="material-symbols-outlined text-lg">{mistake.icon}</span>
                  <h3 className="font-bold text-xs text-[#0F172A]">{mistake.title}</h3>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">{mistake.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* REGISTRATION TIPS SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Expert Educational Advice
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Top Registration Tips for Success
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registrationTips.map((tip, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F9D58] transition-all space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${tip.color}`}>
                    <span className="material-symbols-outlined text-lg">{tip.icon}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{tip.title}</h3>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IMPORTANT REMINDERS HIGHLIGHT BOX */}
        <section className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4 border border-[#0F9D58]">
          <div className="flex items-center gap-2.5 text-[#82FAAB]">
            <span className="material-symbols-outlined text-2xl">priority_high</span>
            <h2 className="text-lg sm:text-xl font-bold font-display">Important Candidate Reminders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200 leading-relaxed">
            <div className="flex items-start gap-2 bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined text-[#82FAAB] text-base flex-shrink-0">check_circle</span>
              <span><strong>Accredited Centres Only:</strong> Never patronize unregistered cybercafes. Only official JAMB CBT state offices and accredited center terminals are valid.</span>
            </div>

            <div className="flex items-start gap-2 bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined text-[#82FAAB] text-base flex-shrink-0">check_circle</span>
              <span><strong>Keep Profile Details Secure:</strong> Your JAMB Profile Password and e-PIN should never be shared with strangers or fake social media agents.</span>
            </div>

            <div className="flex items-start gap-2 bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined text-[#82FAAB] text-base flex-shrink-0">check_circle</span>
              <span><strong>Verify Before Submission:</strong> Ensure every single letter on the operator screen is checked before giving biometric authorization.</span>
            </div>

            <div className="flex items-start gap-2 bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="material-symbols-outlined text-[#82FAAB] text-base flex-shrink-0">check_circle</span>
              <span><strong>Official Announcements:</strong> Refer exclusively to official JAMB portal bulletins and JAMB Compass for authentic registration deadlines.</span>
            </div>
          </div>
        </section>

        {/* RELATED TOOLS SECTION */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Explore More Guidance Tools
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Related Academic Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#0F9D58] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F9D58] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{tool.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{tool.desc}</p>
                </div>

                <button
                  onClick={() => {
                    if (setActiveTab) {
                      setActiveTab(tool.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white font-bold text-xs py-2.5 rounded-xl border border-[#E2E8F0] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Tool</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-md space-y-6 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-1">
              Got Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 bg-[#F8FAFC] flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#0F172A] hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[#0F172A] shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 bg-white text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white p-8 sm:p-12 relative text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Ready to Continue Your Journey?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Explore courses, prepare for UTME, and stay informed throughout your admission journey with JAMB Compass.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => {
                  if (setActiveTab) {
                    setActiveTab('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="bg-[#0F9D58] hover:bg-[#0d8a4d] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <span className="material-symbols-outlined text-base">auto_stories</span>
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) {
                    setActiveTab('study-hub');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Go to Study Hub</span>
                <span className="material-symbols-outlined text-base">quiz</span>
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
