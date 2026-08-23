import React, { useState } from 'react';
import { TabType } from '../types';

interface AboutJambScreenProps {
  setActiveTab: (tab: TabType) => void;
}

export const AboutJambScreen: React.FC<AboutJambScreenProps> = ({ setActiveTab }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPathway, setSelectedPathway] = useState<'utme' | 'de' | null>(null);

  const milestones = [
    {
      year: '1978',
      title: 'Establishment of JAMB',
      icon: 'gavel',
      desc: 'Established by Decree No. 2 of 1978 as the legal central body responsible for matriculation examinations into all Nigerian universities.',
      badgeBg: 'bg-[#0F9D58] text-white',
    },
    {
      year: '1980s',
      title: 'Expansion of Admission Coordination',
      icon: 'account_balance',
      desc: 'Mandate officially expanded to encompass Polytechnics, Colleges of Education, and Monotechnics across federal and state levels.',
      badgeBg: 'bg-[#2563EB] text-white',
    },
    {
      year: '2013',
      title: 'Introduction of Computer-Based Testing (CBT)',
      icon: 'devices',
      desc: 'Pioneered full digital Computer-Based Testing to reduce examination malpractice, streamline scoring, and modernize testing infrastructure.',
      badgeBg: 'bg-[#0F172A] text-white',
    },
    {
      year: '2015',
      title: 'Full Transition to CBT Examinations',
      icon: 'laptop_mac',
      desc: '100% phase-out of paper-pencil tests nationwide, establishing over 750 biometric-verified CBT centers across all 36 states and FCT.',
      badgeBg: 'bg-[#0F9D58] text-white',
    },
    {
      year: 'Present',
      title: 'Digital Registration, CAPS & Continuous Innovation',
      icon: 'auto_awesome',
      desc: 'Launch of the Central Admissions Processing System (CAPS), mobile profile code generation, and real-time automated offer tracking.',
      badgeBg: 'bg-[#2563EB] text-white',
    },
  ];

  const functions = [
    {
      icon: 'assignment_turned_in',
      title: 'Conduct UTME',
      desc: 'Administers the annual Unified Tertiary Matriculation Examination for over 1.8 million prospective undergraduates nationwide.',
      iconBg: 'bg-[#0F9D58]/10 text-[#0F9D58]',
    },
    {
      icon: 'hub',
      title: 'Coordinate Admissions',
      desc: 'Harmonizes admission lists across federal, state, and private tertiary institutions to eliminate dual placements and ensure equity.',
      iconBg: 'bg-[#2563EB]/10 text-[#2563EB]',
    },
    {
      icon: 'badge',
      title: 'Manage Direct Entry Admissions',
      desc: 'Facilitates 200-level direct entry placement for ND, HND, NCE, IJMB, and JUPEB diploma certificate holders.',
      iconBg: 'bg-[#0F172A]/10 text-[#0F172A]',
    },
    {
      icon: 'policy',
      title: 'Develop Admission Policies',
      desc: 'Advises the Federal Ministry of Education and institutional Senates on national minimum benchmark cut-off marks and entry standards.',
      iconBg: 'bg-[#0F9D58]/10 text-[#0F9D58]',
    },
    {
      icon: 'folder_shared',
      title: 'Maintain Admission Records',
      desc: 'Stores permanent matriculation registries, verifies official transcripts, and issues authentic admission letters for NYSC mobilization.',
      iconBg: 'bg-[#2563EB]/10 text-[#2563EB]',
    },
    {
      icon: 'verified_user',
      title: 'Support Fair & Transparent Processes',
      desc: 'Operates the automated Central Admissions Processing System (CAPS) ensuring merit, catchments, and quota compliance without bias.',
      iconBg: 'bg-[#0F172A]/10 text-[#0F172A]',
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Career Choice',
      icon: 'psychology',
      desc: 'Identify your academic strengths, interest areas, and long-term professional aspirations before picking subjects.',
    },
    {
      step: 2,
      title: 'Course Selection',
      icon: 'menu_book',
      desc: 'Verify prerequisite O’Level subjects and UTME subject combinations in the official JAMB Brochure.',
    },
    {
      step: 3,
      title: 'Choose Institution',
      icon: 'account_balance',
      desc: 'Select 1st Choice (University), 2nd Choice (Univ/Poly), 3rd Choice (Polytechnic), and 4th Choice (College of Education).',
    },
    {
      step: 4,
      title: 'Register for UTME',
      icon: 'app_registration',
      desc: 'Generate a profile code via SMS with your NIN, purchase e-PIN, and capture biometrics at an accredited CBT Centre.',
    },
    {
      step: 5,
      title: 'Write Examination',
      icon: 'computer',
      desc: 'Sit for the 4-subject Computer Based Test (Use of English + 3 core subjects) at your assigned exam slip center.',
    },
    {
      step: 6,
      title: 'Check Result',
      icon: 'analytics',
      desc: 'Access your official score via SMS or the JAMB e-Facility portal within days of writing the exam.',
    },
    {
      step: 7,
      title: 'Apply for Post-UTME',
      icon: 'edit_note',
      desc: 'Register and write the screening test/screening evaluation conducted by your chosen institution.',
    },
    {
      step: 8,
      title: 'Admission via CAPS',
      icon: 'fact_check',
      desc: 'Monitor your status on JAMB CAPS portal and formally ACCEPT or REJECT institutional admission offers.',
    },
    {
      step: 9,
      title: 'School Registration',
      icon: 'school',
      desc: 'Print your official JAMB Admission Letter and complete physical clearance and matriculation at your university.',
    },
  ];

  const faqs = [
    {
      q: 'What is UTME?',
      a: 'The Unified Tertiary Matriculation Examination (UTME) is a computer-based standardized test conducted annually by JAMB for prospective students seeking entry into 100-level undergraduate programs in Nigerian universities, polytechnics, and colleges of education.',
    },
    {
      q: 'Who needs Direct Entry (DE)?',
      a: 'Direct Entry is for candidates who already possess post-secondary qualifications such as National Diploma (ND), Higher National Diploma (HND), Nigeria Certificate in Education (NCE), IJMB, JUPEB, or GCE A-Levels. DE allows candidates to gain direct admission into 200-level.',
    },
    {
      q: 'Can I change my course or institution after writing UTME?',
      a: 'Yes! JAMB opens a window for "Change of Course/Institution" on the official e-Facility portal. Candidates can switch their institution or course choices to align with their UTME score and post-UTME cut-off requirements.',
    },
    {
      q: 'What is JAMB CAPS and why is it important?',
      a: 'CAPS stands for Central Admissions Processing System. It is an automated platform designed by JAMB to ensure transparency in admissions. Through CAPS, candidates can upload O’Level results, track admission recommendations, and formally ACCEPT or REJECT admission offers.',
    },
    {
      q: 'How many institutions can I choose during registration?',
      a: 'During JAMB UTME registration, you are allowed to choose up to four institutions: First Choice (usually a Federal or State University), Second Choice (University or Polytechnic), Third Choice (Polytechnic or Monotechnic), and Fourth Choice (College of Education).',
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] font-sans antialiased">
      {/* Container wrapper */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center space-x-2 text-sm text-[#475569] mb-6 font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className="hover:text-[#0F9D58] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Home
          </button>
          <span className="material-symbols-outlined text-xs text-[#CBD5E1]">chevron_right</span>
          <span className="text-[#0F172A] font-semibold bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
            About JAMB
          </span>
        </nav>

        {/* PAGE HEADER */}
        <div className="bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#E8F5E9]/30 rounded-[20px] p-6 sm:p-10 lg:p-12 mb-16 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#0F9D58]/10 to-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold tracking-wide uppercase">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Official Guide
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">update</span>
                  Updated for 2026/2027
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-[#0F172A] mb-5 leading-[1.15] tracking-tight">
                About the Joint Admissions and <span className="text-[#0F9D58] relative inline-block">Matriculation Board <span className="absolute bottom-1 left-0 w-full h-2 bg-[#0F9D58]/15 -z-10 rounded"></span></span> (JAMB)
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-2xl">
                Learn about the official organization responsible for coordinating tertiary institution admissions in Nigeria, ensuring quality, transparency, and standardized evaluation for all candidates.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => setActiveTab('guide')}
                  className="bg-[#0F9D58] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:bg-[#0b8047] hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Admission Roadmap</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button
                  onClick={() => setActiveTab('study-hub')}
                  className="bg-white text-[#0F172A] border border-[#E2E8F0] px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#F8FAFC] transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[#2563EB]">menu_book</span>
                  <span>Practice UTME CBT</span>
                </button>
              </div>
            </div>

            {/* Illustration Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[20px] bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0F9D58] p-1.5 shadow-xl">
                <div className="rounded-[18px] bg-white p-6 sm:p-8 overflow-hidden relative">
                  {/* Decorative Header Illustration Graphic */}
                  <div className="bg-gradient-to-br from-[#E8F5E9] to-[#EFF6FF] rounded-2xl p-6 text-center border border-[#E2E8F0] relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-[#0F9D58] to-[#2563EB] flex items-center justify-center text-white shadow-lg mb-4 transform hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-4xl">school</span>
                    </div>
                    <div className="flex justify-center items-center gap-3 text-[#0F172A] font-bold font-display text-lg mb-1">
                      <span>JAMB Compass</span>
                      <span className="material-symbols-outlined text-[#0F9D58] text-xl">workspace_premium</span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      Empowering 1.8M+ Nigerian prospective undergraduates each year
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 text-[#0F9D58] font-bold text-lg">
                        <span className="material-symbols-outlined text-xl">groups</span>
                        <span>1.8M+</span>
                      </div>
                      <span className="text-[12px] text-[#475569] font-medium block mt-0.5">Annual Candidates</span>
                    </div>

                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 text-[#2563EB] font-bold text-lg">
                        <span className="material-symbols-outlined text-xl">account_balance</span>
                        <span>200+</span>
                      </div>
                      <span className="text-[12px] text-[#475569] font-medium block mt-0.5">Institutions</span>
                    </div>

                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
                        <span className="material-symbols-outlined text-xl">laptop_chromebook</span>
                        <span>750+</span>
                      </div>
                      <span className="text-[12px] text-[#475569] font-medium block mt-0.5">CBT Centres</span>
                    </div>

                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                      <div className="flex items-center gap-2 text-[#0F9D58] font-bold text-lg">
                        <span className="material-symbols-outlined text-xl">verified</span>
                        <span>100%</span>
                      </div>
                      <span className="text-[12px] text-[#475569] font-medium block mt-0.5">Digital CAPS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1 – WHAT IS JAMB? */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0F9D58] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Core Overview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              What is JAMB?
            </h2>
            <p className="text-[#475569] text-base mt-2">
              Understanding the statutory role and mandate of the Joint Admissions and Matriculation Board.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Education/Examination Illustration */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[20px] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F9D58]/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm">account_balance</span>
                    Federal Statutory Body
                  </div>

                  <h3 className="text-2xl font-bold font-display leading-snug">
                    Nigeria's Central Gatekeeper for Higher Education
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    Established under Federal Law, JAMB ensures that admission into higher institutions in Nigeria is based on merit, equity, and standardized academic evaluation.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="material-symbols-outlined text-[#0F9D58]">check_circle</span>
                      <span className="text-xs text-slate-200">Universities (Federal, State & Private)</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="material-symbols-outlined text-[#2563EB]">check_circle</span>
                      <span className="text-xs text-slate-200">Polytechnics & Monotechnics</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                      <span className="text-xs text-slate-200">Colleges of Education</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Explanation & Highlight Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-[16px] p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#0F172A] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F9D58]">menu_book</span>
                  Understanding the Purpose of JAMB
                </h3>

                <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                  The <strong className="text-[#0F172A]">Joint Admissions and Matriculation Board (JAMB)</strong> is the official entrance examination board for tertiary-level institutions in Nigeria. Its primary responsibility is to conduct centralized examinations and coordinate admissions for prospective undergraduates.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                    <h4 className="font-bold text-sm text-[#0F172A] mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#0F9D58]">verified</span>
                      Standardized Testing
                    </h4>
                    <p className="text-xs text-[#475569]">
                      Provides a uniform, unbiased assessment tool (UTME) across all 36 states and FCT.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                    <h4 className="font-bold text-sm text-[#0F172A] mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#2563EB]">swap_horizontal_circle</span>
                      Fair Coordination
                    </h4>
                    <p className="text-xs text-[#475569]">
                      Prevents multiple admissions for a single candidate while maximizing quota utilization.
                    </p>
                  </div>
                </div>

                {/* Highlighted Information Box */}
                <div className="mt-6 bg-gradient-to-r from-[#E8F5E9] to-[#EFF6FF] border-l-4 border-[#0F9D58] p-5 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#0F9D58] text-2xl flex-shrink-0 mt-0.5">
                      info
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#0F172A] mb-1">Key Takeaway for Admission Seekers</h5>
                      <p className="text-xs sm:text-sm text-[#0F172A]/90 font-medium leading-relaxed">
                        "JAMB conducts the Unified Tertiary Matriculation Examination (UTME) and coordinates admissions into Nigerian tertiary institutions."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 – HISTORY OF JAMB */}
        <section className="mb-20 bg-[#F8FAFC] rounded-[20px] p-6 sm:p-10 border border-[#E2E8F0]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Evolution & Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              History of JAMB
            </h2>
            <p className="text-[#475569] text-base mt-2">
              Tracing the historical transformation of Nigerian university admissions from 1978 to the modern digital era.
            </p>
          </div>

          {/* Timeline Wrapper */}
          <div className="max-w-4xl mx-auto relative px-2">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#CBD5E1] -translate-x-1/2" />

            <div className="space-y-8 relative">
              {milestones.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full md:w-1/2">
                      <div className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold font-display ${item.badgeBg}`}
                          >
                            {item.year}
                          </span>
                          <span className="material-symbols-outlined text-[#475569] text-xl">
                            {item.icon}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-display text-[#0F172A] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Dot Indicator */}
                    <div className="z-10 w-10 h-10 rounded-full bg-[#FFFFFF] border-4 border-[#0F9D58] shadow-md flex items-center justify-center text-[#0F9D58] font-bold text-xs flex-shrink-0">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                    </div>

                    {/* Empty placeholder for opposite side on desktop */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3 – MISSION, VISION & CORE VALUES */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0F9D58] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              Mission, Vision & Core Values
            </h2>
            <p className="text-[#475569] text-base mt-2">
              The institutional values and aspirational goals steering JAMB's operational excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-[16px] p-6 sm:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">track_changes</span>
                </div>
                <h3 className="text-xl font-bold font-display text-[#0F172A] mb-3">
                  Mission
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  To conduct credible examinations for placements in tertiary institutions, while ensuring high academic standards, transparency, and integrity across all Nigerian tertiary institutions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center text-xs font-semibold text-[#0F9D58]">
                <span>Standardized Evaluation</span>
                <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-[16px] p-6 sm:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-xl font-bold font-display text-[#0F172A] mb-3">
                  Vision
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  To be the most efficient, technological, and reliable examination body in Africa, providing equal educational opportunities for every qualified candidate in Nigeria.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center text-xs font-semibold text-[#2563EB]">
                <span>Pan-African Educational Leadership</span>
                <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="bg-white rounded-[16px] p-6 sm:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">shield</span>
                </div>
                <h3 className="text-xl font-bold font-display text-[#0F172A] mb-3">
                  Core Values
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Integrity', 'Transparency', 'Excellence', 'Innovation', 'Accountability'].map((val, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" />
                      {val}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center text-xs font-semibold text-[#0F172A]">
                <span>Ethical Governance</span>
                <span className="material-symbols-outlined text-sm ml-auto">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 – FUNCTIONS OF JAMB */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0F9D58] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Mandate & Scope
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              What Does JAMB Do?
            </h2>
            <p className="text-[#475569] text-base mt-2">
              Key operational responsibilities and public services carried out by the Board.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {functions.map((fn, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${fn.iconBg} flex items-center justify-center mb-4 font-bold`}>
                    <span className="material-symbols-outlined text-2xl">{fn.icon}</span>
                  </div>
                  <h3 className="text-base font-bold font-display text-[#0F172A] mb-2">
                    {fn.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {fn.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 – TYPES OF ADMISSION */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Entry Routes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              Admission Pathways
            </h2>
            <p className="text-[#475569] text-base mt-2">
              Understanding the two primary entry modes into Nigerian tertiary institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* UTME Pathway Card */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 border-2 border-[#0F9D58]/30 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#0F9D58] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl font-display">
                100-Level Entry
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">edit_note</span>
                </div>

                <h3 className="text-2xl font-bold font-display text-[#0F172A] mb-3">
                  UTME Pathway
                </h3>

                <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                  The standard entrance route for candidates applying directly from secondary schools or holding SSCE/WAEC/NECO/NABTEB credentials.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] block mb-0.5">Who Should Apply:</span>
                    <span className="text-xs text-[#475569]">SS3 leavers, WAEC/NECO candidates, and first-time applicants.</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] block mb-0.5">Key Requirements:</span>
                    <span className="text-xs text-[#475569]">5 O'Level credits (including English & Maths) + 4-subject UTME CBT score.</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] block mb-0.5">Entry Target:</span>
                    <span className="text-xs text-[#0F9D58] font-bold">100-Level First Year Undergraduate</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('guide')}
                className="w-full bg-[#0F9D58] text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-[#0b8047] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Learn More About UTME</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>

            {/* Direct Entry Pathway Card */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 border-2 border-[#2563EB]/30 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-[#2563EB] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl font-display">
                200-Level Entry
              </div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>

                <h3 className="text-2xl font-bold font-display text-[#0F172A] mb-3">
                  Direct Entry (DE)
                </h3>

                <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                  The advanced entry route for candidates who already hold post-secondary diploma certifications or A-Level certificates.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] block mb-0.5">Who Should Apply:</span>
                    <span className="text-xs text-[#475569]">Holders of ND, HND, NCE, IJMB, JUPEB, or Cambridge A-Levels.</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] block mb-0.5">Key Requirements:</span>
                    <span className="text-xs text-[#475569]">Diploma Certificate / Transcript + 5 O'Level credits. No UTME exam required.</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] block mb-0.5">Entry Target:</span>
                    <span className="text-xs text-[#2563EB] font-bold">200-Level Second Year Undergraduate</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('guide')}
                className="w-full bg-[#2563EB] text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Learn More About Direct Entry</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 6 – HOW JAMB WORKS */}
        <section className="mb-20 bg-white rounded-[20px] p-6 sm:p-10 border border-[#E2E8F0] shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#0F9D58] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Step-by-Step Flow
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              How the Admission Process Works
            </h2>
            <p className="text-[#475569] text-base mt-2">
              An end-to-end interactive flowchart of a candidate's journey from course selection to university matriculation.
            </p>
          </div>

          {/* Process Steps Horizontal Grid / Selector */}
          <div className="overflow-x-auto w-full max-w-full pb-4 no-scrollbar mb-8">
            <div className="flex min-w-[900px] gap-2.5 justify-between">
              {processSteps.map((s) => {
                const isActive = activeStep === s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`flex-1 p-3.5 rounded-xl border transition-all text-center flex flex-col items-center justify-between gap-2 relative ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-105 z-10'
                        : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:border-[#0F9D58]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                        isActive
                          ? 'bg-[#0F9D58] text-white'
                          : 'bg-[#E2E8F0] text-[#475569]'
                      }`}
                    >
                      {s.step}
                    </span>
                    <span className="material-symbols-outlined text-lg">
                      {s.icon}
                    </span>
                    <span className="text-[11px] font-bold line-clamp-1 leading-tight">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Details Box */}
          {(() => {
            const current = processSteps.find((s) => s.step === activeStep) || processSteps[0];
            return (
              <div className="bg-gradient-to-r from-[#F8FAFC] to-[#E8F5E9]/40 p-6 sm:p-8 rounded-[16px] border border-[#E2E8F0] flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F9D58] text-white flex items-center justify-center font-bold text-2xl shadow-md flex-shrink-0">
                    {current.step}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider font-display">
                      Step {current.step} of 9
                    </span>
                    <h3 className="text-xl font-bold font-display text-[#0F172A] mb-1">
                      {current.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed max-w-2xl">
                      {current.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
                  <button
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Prev
                  </button>
                  <button
                    disabled={activeStep === 9}
                    onClick={() => setActiveStep((prev) => Math.min(9, prev + 1))}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#0F9D58] text-white text-xs font-bold hover:bg-[#0b8047] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 shadow-sm"
                  >
                    Next
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </section>

        {/* SECTION 7 – JAMB BY THE NUMBERS */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#0F9D58] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Scale & Impact
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-[#0F172A]">
              JAMB by the Numbers
            </h2>
            <p className="text-[#475569] text-base mt-2">
              Key statistical figures illustrating the immense scale of higher education admissions in Nigeria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] mb-1">
                500+
              </div>
              <div className="text-sm font-bold text-[#0F9D58] mb-1">Accredited Courses</div>
              <p className="text-xs text-[#475569]">
                Degree, diploma, and NCE fields across science, arts, engineering & medicine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] mb-1">
                200+
              </div>
              <div className="text-sm font-bold text-[#2563EB] mb-1">Tertiary Institutions</div>
              <p className="text-xs text-[#475569]">
                Federal, State, and accredited Private universities, polytechnics & colleges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] mb-1">
                1.8M+
              </div>
              <div className="text-sm font-bold text-[#0F172A] mb-1">Annual Candidates</div>
              <p className="text-xs text-[#475569]">
                Prospective students participating in the UTME and Direct Entry cycles yearly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center group">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">laptop_chromebook</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] mb-1">
                750+
              </div>
              <div className="text-sm font-bold text-[#0F9D58] mb-1">CBT Centres</div>
              <p className="text-xs text-[#475569]">
                Fully equipped biometric examination centers across all 36 Nigerian states & FCT.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8 – FREQUENTLY ASKED QUESTIONS */}
        <section className="mb-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#2563EB] font-bold text-xs uppercase tracking-wider mb-2 block font-display">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-[#475569] text-sm mt-1">
              Clear answers to essential questions regarding the JAMB examination and admission process.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[16px] border border-[#E2E8F0] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-none hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="font-bold font-display text-sm sm:text-base text-[#0F172A] flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] text-xs font-bold flex items-center justify-center flex-shrink-0">
                        Q
                      </span>
                      {faq.q}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#475569] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#0F9D58]' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0]/50 bg-[#F8FAFC]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 9 – CALL TO ACTION */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#0F9D58] via-[#0F172A] to-[#1E293B] rounded-[24px] p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-xl">
            {/* Background glow effects */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#0F9D58]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#2563EB]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold tracking-wide uppercase">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                Start Preparing Today
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight tracking-tight">
                Ready to Begin Your JAMB Journey?
              </h2>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Explore courses, compare universities, prepare for UTME with practice questions, and understand every step of the admission process.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('guide')}
                  className="w-full sm:w-auto bg-[#0F9D58] text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:bg-[#0b8047] hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Your Journey</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                  <span>Explore Courses</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
