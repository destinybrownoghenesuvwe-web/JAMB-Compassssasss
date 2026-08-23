import React, { useState, useMemo } from 'react';
import { TabType } from '../types';

interface ScholarshipsScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

export interface ScholarshipItem {
  id: string;
  name: string;
  provider: string;
  logoIcon: string;
  logoBg: string;
  logoColor: string;
  fundingType: 'Full Scholarship' | 'Tuition Only' | 'Annual Grant' | 'Living Stipend' | 'Student Loan (NELFUND)';
  studyLevel: 'Undergraduate 100L' | 'Undergraduate 200L' | 'Undergraduate 300L' | 'Postgraduate' | 'Pre-Degree / IJMB' | 'All Levels';
  category: 'Engineering' | 'Medicine' | 'Law' | 'Computer Science' | 'Business' | 'Arts' | 'Sciences' | 'General';
  eligibilityType: 'Merit-Based' | 'Need-Based' | 'Indigenes Only' | 'Female in STEM' | 'General';
  institutionType: 'Federal Universities' | 'State Universities' | 'Private Universities' | 'All Institutions';
  location: 'Nationwide' | 'Niger Delta Region' | 'South-West' | 'North-East' | 'South-East';
  amount: string;
  numberOfAwards: number;
  openDate: string; // 2026 date
  closeDate: string; // 2026 date
  status: 'Open for 2026' | 'Closing Soon' | 'Opening April 2026' | 'Under Review';
  statusColor: string;
  shortDesc: string;
  overview: string;
  benefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  selectionProcess: string[];
  faqs: { question: string; answer: string }[];
  timeline2026: { date: string; title: string; desc: string }[];
  officialPortalUrl: string;
}

const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
  {
    id: 'nnpc-chevron-2026',
    name: 'NNPC / Chevron Joint Venture National University Scholarship 2026',
    provider: 'Chevron Nigeria Limited & NNPC',
    logoIcon: 'school',
    logoBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    logoColor: 'text-[#0F9D58]',
    fundingType: 'Full Scholarship',
    studyLevel: 'Undergraduate 200L',
    category: 'Engineering',
    eligibilityType: 'Merit-Based',
    institutionType: 'All Institutions',
    location: 'Nationwide',
    amount: '₦500,000 / Year',
    numberOfAwards: 500,
    openDate: 'Feb 10, 2026',
    closeDate: 'May 30, 2026',
    status: 'Open for 2026',
    statusColor: 'bg-emerald-100 text-[#0F9D58] border-emerald-300',
    shortDesc: 'Provides financial support to full-time 200-level Nigerian undergraduate students pursuing engineering, earth sciences, and related courses.',
    overview: 'The NNPC/Chevron Joint Venture National University Scholarship program aims to promote academic excellence and develop human capacity in Nigeria’s tertiary institutions for the 2026 academic year.',
    benefits: [
      '₦500,000 annual academic grant until graduation',
      'Complimentary laptop and tech stipend upon award',
      'Exclusive invitation to Chevron Nigeria summer internship programs',
      'Mentorship sessions with senior engineering leaders'
    ],
    eligibilityCriteria: [
      'Must be a full-time 200-level student in a recognized Nigerian University',
      'Minimum CGPA of 3.5 out of 5.0 (or equivalent First Class / Upper Second Class track)',
      'Scored 230 or higher in JAMB UTME 2026 exam',
      'Possess a minimum of 5 O-Level credits including English, Mathematics, Physics, Chemistry'
    ],
    requiredDocuments: [
      'Official JAMB 2026 Result Slip & Admission Letter',
      'O-Level Statement of Result / Certificate (WAEC/NECO/NABTEB)',
      'University Student ID Card & 100-Level Course Registration Form',
      'State of Origin & Local Government Identification Letter',
      'Recent Passport Photograph (White Background)'
    ],
    applicationSteps: [
      'Create an applicant profile on the official Chevron scholarship portal.',
      'Fill in personal, academic, and institution details accurately.',
      'Upload high-resolution clear scans of all required documents.',
      'Submit the application and download your confirmation registration slip.'
    ],
    selectionProcess: [
      'Initial document screening & CGPA verification (June 2026)',
      'Nationwide Computer Based Aptitude Test (July 2026)',
      'Verification of university transcripts and LGA origin (August 2026)',
      'Official award letter issuance and bursary disbursement (September 2026)'
    ],
    faqs: [
      {
        question: 'Can 100-level or final year students apply for the 2026 scheme?',
        answer: 'No, this specific scheme is strictly reserved for full-time 200-level undergraduate students enrolled for the 2026 academic session.'
      },
      {
        question: 'Are students from private universities eligible?',
        answer: 'Yes, full-time students in accredited federal, state, and private universities across Nigeria can apply.'
      }
    ],
    timeline2026: [
      { date: 'Feb 10, 2026', title: 'Portal Opens', desc: 'Online application commences on official portal.' },
      { date: 'May 30, 2026', title: 'Application Deadline', desc: 'Portal closes at 11:59 PM West Africa Time.' },
      { date: 'July 18, 2026', title: 'CBT Aptitude Test', desc: 'Proctored online screening test across designated centers.' },
      { date: 'Sept 15, 2026', title: 'Disbursement', desc: 'First tranche of ₦500,000 credited to awardees.' }
    ],
    officialPortalUrl: 'https://scholarship.chevronnigeria.com'
  },
  {
    id: 'mtn-foundation-2026',
    name: 'MTN Foundation Science & Technology Scholarship 2026',
    provider: 'MTN Nigeria Foundation',
    logoIcon: 'payments',
    logoBg: 'bg-amber-100 dark:bg-amber-900/40',
    logoColor: 'text-amber-700',
    fundingType: 'Annual Grant',
    studyLevel: 'Undergraduate 300L',
    category: 'Computer Science',
    eligibilityType: 'Merit-Based',
    institutionType: 'All Institutions',
    location: 'Nationwide',
    amount: '₦300,000 / Year',
    numberOfAwards: 300,
    openDate: 'Mar 01, 2026',
    closeDate: 'June 15, 2026',
    status: 'Open for 2026',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    shortDesc: 'Designed to recognize and reward academic excellence among 300-level STEM students in Nigerian public tertiary institutions.',
    overview: 'The MTN Foundation Science and Technology Scholarship Scheme (MTNF STSS) has supported over 10,000 Nigerian students. For the 2026 session, 300 top-performing STEM undergraduates will receive annual financial grants.',
    benefits: [
      '₦300,000 annual scholarship covering tuition, books, and accommodation support',
      'Renewable every year until graduation subject to maintaining a 3.5 CGPA',
      'Employability skills workshop & career masterclasses by MTN executives',
      'Access to exclusive MTN tech alumni network'
    ],
    eligibilityCriteria: [
      'Full-time 300-level student studying Science, Technology, Engineering or Math in a Public University/Polytechnic',
      'Minimum Cumulative Grade Point Average (CGPA) of 3.5 or Upper Second Class',
      'JAMB 2026 score of 220+ in relevant subject combination',
      'Blind students in 200L or 300L of any discipline are eligible under MTNF Blind Student Scheme'
    ],
    requiredDocuments: [
      'JAMB Original Result Slip & Admission Letter',
      'Certified University Semester Academic Transcript',
      'Valid Student ID Card & National Identity Number (NIN)',
      'Passport Photograph & Local Government Letter of Identification'
    ],
    applicationSteps: [
      'Visit the MTN Nigeria Foundation portal.',
      'Select MTNF STSS 2026 Application form.',
      'Fill in verified CGPA details matching official academic transcripts.',
      'Upload required scanned credentials and submit.'
    ],
    selectionProcess: [
      'Automated transcript verification & shortlisting (July 2026)',
      'Regional Computer Based Screening Test (August 2026)',
      'Award ceremony and inaugural disbursement (October 2026)'
    ],
    faqs: [
      {
        question: 'Does this scholarship cover Polytechnic students?',
        answer: 'Yes! HND 1 students in public polytechnics with a minimum CGPA of 3.0 in ND program are eligible.'
      }
    ],
    timeline2026: [
      { date: 'Mar 01, 2026', title: 'Applications Open', desc: 'Online portal activated nationwide.' },
      { date: 'June 15, 2026', title: 'Deadline', desc: 'Submission portal locks.' },
      { date: 'Aug 20, 2026', title: 'National Screening', desc: 'CBT examination conducted across geopolitical zones.' }
    ],
    officialPortalUrl: 'https://www.mtn.ng/foundation/scholarships'
  },
  {
    id: 'nelfund-loan-2026',
    name: 'NELFUND Nigeria Education Loan Scheme 2026',
    provider: 'Federal Government of Nigeria (NELFUND)',
    logoIcon: 'account_balance',
    logoBg: 'bg-[#0F9D58]/15',
    logoColor: 'text-[#0F9D58]',
    fundingType: 'Student Loan (NELFUND)',
    studyLevel: 'All Levels',
    category: 'General',
    eligibilityType: 'Need-Based',
    institutionType: 'Federal Universities',
    location: 'Nationwide',
    amount: '100% Institutional Fees + ₦20,000 Monthly Stipend',
    numberOfAwards: 250000,
    openDate: 'Jan 01, 2026',
    closeDate: 'Dec 31, 2026',
    status: 'Open for 2026',
    statusColor: 'bg-[#0F9D58]/20 text-[#0F9D58] border-[#0F9D58]/40',
    shortDesc: 'Federal government interest-free tuition financing and upkeep allowance for all Nigerian undergraduates in public tertiary institutions.',
    overview: 'The Nigerian Education Loan Fund (NELFUND) provides interest-free loans to cover 100% of institutional fees directly paid to tertiary institutions, alongside a monthly living allowance for eligible Nigerian students during the 2026 session.',
    benefits: [
      '100% direct payment of university institutional fees to the school',
      '₦20,000 monthly living upkeep stipend paid directly to the student account',
      'Zero interest rate with flexible repayment starting 2 years after NYSC completion',
      'No guarantor required — verified automatically via JAMB, NIN, and BVN'
    ],
    eligibilityCriteria: [
      'Admitted student into a Federal or State University, Polytechnic, or College of Education for 2026',
      'Must possess a valid National Identification Number (NIN) & Bank Verification Number (BVN)',
      'Valid JAMB Registration Number & Official Matriculation Details'
    ],
    requiredDocuments: [
      'JAMB 2026 Admission Letter & Result Slip',
      'National Identification Number (NIN) Slip',
      'Bank Verification Number (BVN) Details',
      'Student Matriculation / Application Number'
    ],
    applicationSteps: [
      'Access the official NELFUND Portal (nelf.gov.ng).',
      'Click on "Apply for Student Loan 2026".',
      'Verify identity using JAMB Reg No, NIN, and Matriculation Number.',
      'Request institutional fee loan and upkeep stipend, then submit.'
    ],
    selectionProcess: [
      'Instant automated data cross-matching with JAMB & University database',
      'Direct fee transfer to university bursary within 14 business days',
      'Monthly upkeep credit to student bank account on 25th of every month'
    ],
    faqs: [
      {
        question: 'When do I start repaying the NELFUND loan?',
        answer: 'Repayment begins 2 years after completing the National Youth Service Corps (NYSC), through a 10% monthly payroll deduction upon gaining employment.'
      }
    ],
    timeline2026: [
      { date: 'Jan 01, 2026', title: 'Portal Active', desc: 'Continuous registration open throughout 2026 academic calendar.' }
    ],
    officialPortalUrl: 'https://nelf.gov.ng'
  },
  {
    id: 'totalenergies-2026',
    name: 'TotalEnergies National Merit University Scholarship 2026',
    provider: 'TotalEnergies EP Nigeria Limited',
    logoIcon: 'science',
    logoBg: 'bg-blue-100 dark:bg-blue-900/40',
    logoColor: 'text-[#2563EB]',
    fundingType: 'Full Scholarship',
    studyLevel: 'Undergraduate 100L',
    category: 'Sciences',
    eligibilityType: 'Merit-Based',
    institutionType: 'All Institutions',
    location: 'Nationwide',
    amount: '₦450,000 / Year',
    numberOfAwards: 200,
    openDate: 'Apr 01, 2026',
    closeDate: 'July 15, 2026',
    status: 'Opening April 2026',
    statusColor: 'bg-blue-100 text-[#2563EB] border-blue-300',
    shortDesc: 'Aims to reward academic excellence and foster technological growth among 100-level undergraduate scholars across Nigeria.',
    overview: 'TotalEnergies EP Nigeria Limited awards annual scholarships to outstanding 100-level undergraduates enrolled in Nigerian tertiary institutions for the 2026 academic cycle.',
    benefits: [
      '₦450,000 annual allowance covering educational expenses',
      'Mentorship program with TotalEnergies geoscientists and engineers',
      'Opportunity for industrial attachment placement'
    ],
    eligibilityCriteria: [
      'Registered 100-level student in a recognized Nigerian University for 2026 session',
      'Minimum of 240 in 2026 JAMB UTME',
      'Minimum of 5 A/B credits in SSCE (WAEC/NECO) at one sitting'
    ],
    requiredDocuments: [
      'JAMB 2026 Score Slip & University Admission Letter',
      'SSCE Original Certificate or Certified Result Slip',
      'Recent Birth Certificate or Sworn Declaration of Age',
      'LGA Letter of Identification'
    ],
    applicationSteps: [
      'Register on the TotalEnergies scholarship recruitment portal.',
      'Complete biographical and academic performance forms.',
      'Attach clear PDF documents and submit application.'
    ],
    selectionProcess: [
      'Computer-Based Selection Test across key examination zones in Nigeria',
      'Document verification and final awardee publish'
    ],
    faqs: [
      {
        question: 'Are Arts or Law students eligible?',
        answer: 'The National Merit scheme focuses on Engineering, Sciences, Medicine, and Management Sciences.'
      }
    ],
    timeline2026: [
      { date: 'Apr 01, 2026', title: 'Portal Opens', desc: 'Applications open online.' },
      { date: 'July 15, 2026', title: 'Closing Date', desc: 'Applications window closes.' }
    ],
    officialPortalUrl: 'https://scholarships.totalenergies.ng'
  },
  {
    id: 'lagos-state-bursary-2026',
    name: 'Lagos State Scholarship & Bursary Award 2026',
    provider: 'Lagos State Scholarship Board',
    logoIcon: 'apartment',
    logoBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    logoColor: 'text-emerald-700',
    fundingType: 'Tuition Only',
    studyLevel: 'All Levels',
    category: 'General',
    eligibilityType: 'Indigenes Only',
    institutionType: 'All Institutions',
    location: 'South-West',
    amount: '₦250,000 / Year',
    numberOfAwards: 2500,
    openDate: 'May 01, 2026',
    closeDate: 'Aug 30, 2026',
    status: 'Opening April 2026',
    statusColor: 'bg-purple-100 text-purple-700 border-purple-300',
    shortDesc: 'Financial assistance scheme specifically for Lagos State indigenes in accredited tertiary institutions nationwide.',
    overview: 'The Lagos State Scholarship Board invites applications from indigenes of Lagos State enrolled in tertiary institutions across Nigeria for the 2026 Bursary and Scholarship awards.',
    benefits: [
      'Bursary grant of ₦250,000 per academic session',
      'Special Higher Education grant for First Class CGPA holders',
      'Free enrollment into Lagos State digital skills academy'
    ],
    eligibilityCriteria: [
      'Must be a verified indigene of Lagos State (Oba / Chief / Local Government Clearance)',
      'Enrolled as a full-time student in any recognized public tertiary institution in Nigeria',
      'Possess a valid Lagos State Resident Registration Agency (LASSRA) ID Card'
    ],
    requiredDocuments: [
      'LASSRA Registration Card',
      'Letter of Indigeneship from Local Government of origin in Lagos State',
      'JAMB 2026 Result Slip & University Admission Letter',
      'O-Level Statement of Result'
    ],
    applicationSteps: [
      'Purchase application scratch card or pay pin online via Lagos State Portal.',
      'Fill out the online application form and upload credentials.',
      'Attend mandatory physical screening at designated centers in Lagos.'
    ],
    selectionProcess: [
      'Physical screening and indigeneship document verification',
      'Approval by Lagos State Scholarship Board',
      'Direct disbursement to awardee bank accounts'
    ],
    faqs: [
      {
        question: 'Do non-indigenes who reside in Lagos qualify?',
        answer: 'No, the Bursary scheme is strictly reserved for verified Lagos State indigenes.'
      }
    ],
    timeline2026: [
      { date: 'May 01, 2026', title: 'Portal Activation', desc: 'Lagos State portal opens for 2026 registrations.' },
      { date: 'Aug 30, 2026', title: 'Deadline', desc: 'Final date for document upload.' }
    ],
    officialPortalUrl: 'https://lagosstatescholarshipboard.org'
  },
  {
    id: 'wimbiz-fem-stem-2026',
    name: 'WIMBIZ & TechGirls Nigeria Women in STEM Grant 2026',
    provider: 'WIMBIZ & TechGirls Africa',
    logoIcon: 'woman',
    logoBg: 'bg-rose-100 dark:bg-rose-900/40',
    logoColor: 'text-rose-600',
    fundingType: 'Living Stipend',
    studyLevel: 'Undergraduate 100L',
    category: 'Computer Science',
    eligibilityType: 'Female in STEM',
    institutionType: 'All Institutions',
    location: 'Nationwide',
    amount: '₦350,000 + Tech Equipment',
    numberOfAwards: 150,
    openDate: 'Feb 15, 2026',
    closeDate: 'May 15, 2026',
    status: 'Open for 2026',
    statusColor: 'bg-rose-100 text-rose-700 border-rose-300',
    shortDesc: 'Empowering young Nigerian female undergraduates pursuing Computer Science, Artificial Intelligence, Cybersecurity, and Robotics.',
    overview: 'The Women in Management, Business and Public Service (WIMBIZ) in partnership with TechGirls Africa offers full educational bursaries and computing laptops to outstanding female STEM students admitted for the 2026 cycle.',
    benefits: [
      '₦350,000 annual academic stipend',
      'Brand new high-performance developer laptop',
      '1-on-1 mentorship with female tech leaders in Fintech and AI',
      'Free pass to WIMBIZ Annual Tech Conference'
    ],
    eligibilityCriteria: [
      'Female Nigerian student admitted into 100-level STEM course for 2026',
      'JAMB 2026 UTME Score of 210 or higher',
      'Passion for software development, data science, or engineering'
    ],
    requiredDocuments: [
      'JAMB 2026 Result Slip & Admission Letter',
      'Short 500-word Motivation Essay: "Why I Chose a Career in STEM"',
      'O-Level Credits in English, Math, Physics, Chemistry'
    ],
    applicationSteps: [
      'Submit application form online on WIMBIZ portal.',
      'Include motivation essay and GitHub/portfolio link if available.',
      'Participate in a 15-minute virtual interview if shortlisted.'
    ],
    selectionProcess: [
      'Essay review & academic screening (May 2026)',
      'Virtual panel interview (June 2026)',
      'Laptops & grant presentation ceremony (July 2026)'
    ],
    faqs: [
      {
        question: 'Is coding experience compulsory to apply?',
        answer: 'No prior coding experience is required, but enthusiasm for technology and strong academic background are essential.'
      }
    ],
    timeline2026: [
      { date: 'Feb 15, 2026', title: 'Applications Open', desc: 'Online application period begins.' },
      { date: 'May 15, 2026', title: 'Portal Closes', desc: 'Submissions closed.' }
    ],
    officialPortalUrl: 'https://wimbiz.org/stem-grant-2026'
  }
];

const SCHOLARSHIP_CATEGORIES_DATA = [
  { id: 'cat-fg', title: 'Federal Government Scholarships', count: '45+ Schemes', icon: 'account_balance', color: 'bg-emerald-100 text-[#0F9D58]' },
  { id: 'cat-state', title: 'State Government Bursaries', count: '120+ Schemes', icon: 'location_city', color: 'bg-blue-100 text-[#2563EB]' },
  { id: 'cat-private', title: 'Private Foundation Grants', count: '85+ Schemes', icon: 'volunteer_activism', color: 'bg-purple-100 text-purple-700' },
  { id: 'cat-univ', title: 'University Financial Aid', count: '60+ Institutions', icon: 'school', color: 'bg-amber-100 text-amber-700' },
  { id: 'cat-stem', title: 'STEM & Tech Scholarships', count: '90+ Schemes', icon: 'code', color: 'bg-teal-100 text-teal-700' },
  { id: 'cat-med', title: 'Medical & Healthcare Aid', count: '35+ Schemes', icon: 'medical_services', color: 'bg-rose-100 text-rose-700' },
  { id: 'cat-eng', title: 'Engineering & Oil/Gas', count: '50+ Schemes', icon: 'engineering', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'cat-nelfund', title: 'NELFUND Student Loans', count: '100% Tuition + Upkeep', icon: 'payments', color: 'bg-emerald-100 text-emerald-800' }
];

const SUCCESS_STORIES = [
  {
    id: 'story-1',
    name: 'Chidi Okoro',
    university: 'University of Lagos (UNILAG)',
    scholarship: 'NNPC / Chevron Scholar 2026',
    course: 'Mechanical Engineering',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtXnfy0mg6qH6yWQ5HEEZ_BItqlTD3anwsgZ4wuCUWM3JPl8JXQ4jMcLrP4qxihM5aYxDxiCq-L60vJFaqqcgLrM0tumGTBzql3zfcelV-NoUq91vC9NMp-9u6s_Hqn6t5Xn8HMZSoDdIPhmTWhFKCm1HzRsufBJpwyCuP8a77FpuHuTTv3elkfUlcVNArZ9fVzoOnR0qOHusuvtyIucH9rl7gFtwC2KWx823jabBxC74HUW_ZsHXrrQ',
    advice: 'Start building your document folder early. Ensure your JAMB 2026 name matches your NIN and Bank Verification Number exactly!',
    badge: 'Awardee ₦500k/Yr'
  },
  {
    id: 'story-2',
    name: 'Fatima Bello',
    university: 'Ahmadu Bello University (ABU Zaria)',
    scholarship: 'MTN Foundation Scholar',
    course: 'Computer Science',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQrBp2-DU6Mw6vMwY6THEtU2VRIwfC6hNDEo4PBelasP56_5vr6gdMpg0FJ-qO3JXU5K2ZVt_Yv2A0ZRy7_A0I5Ro82VNJOZwDK6AwRWBwi5z6VxMAE3qJYkzWVh7rLiNKID97RDw1TZJbVTx0aeZbQPhnWOWA5JxHfpf07lTmqntkFS92d-edvWFREVq1jzcVt0bNbRSHmfbjD3I3oPJWVdPrOk4Sq9zZac6_X9P6z1pbluNOVzjZOw',
    advice: 'Practise speed and accuracy for CBT screening tests. The JAMB Compass practice engine helped me score 84% on the scholarship aptitude test!',
    badge: 'Awardee ₦300k/Yr'
  },
  {
    id: 'story-3',
    name: 'Emeka Nwachukwu',
    university: 'University of Nigeria, Nsukka (UNN)',
    scholarship: 'NELFUND Loan Beneficiary 2026',
    course: 'Medicine & Surgery',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4qaJc0gEmkBUhC7hzbe6WdEbS5DF8LfMl1CDWe0VlmN38FJFq6OZxbtLaaBr8TGt_cC3RU_A57symZFgWyEkA4fSgrSoJ7ZE8zHQLG1784XPSpn8aslMQzwMWBV2SwYIcXsgs5Zrceya4_1JjT6TDDjzx6KJd_BcNVe4st4Gc3ZgETA599R2RJkhrrTJqDSYvyDDi81cIVkJhO1dIJwfahpav0n5w66AsslKg7tku2TEPxFE7M0AO1w',
    advice: 'NELFUND covered 100% of my tuition fees directly to UNN bursary, plus my monthly ₦20,000 upkeep. Don’t let tuition hold you back in 2026!',
    badge: 'NELFUND Beneficiary'
  }
];

const LATEST_NEWS_ARTICLES = [
  {
    id: 'news-1',
    title: 'Federal Government Expands NELFUND Education Loan Portal for 2026 Candidates',
    category: 'NELFUND Update',
    date: 'Feb 12, 2026',
    readTime: '4 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrsy1woumbhF-FfLyyZ8NGAizwFUWE4t6JljE9t3mGdYNelTrimOc7f-KQvsn8Fhhg-KrM-hWr9a8aPdvZV102Y2_2M3mnzV7Q8PrB_uKKy5D4DWuILupoQO27ZGRIbdoN_1_YEnc_Re1EQXdFxDeuDGZPqexuk_y6ZnvXwui4bgsFVPJfgzpuItRBFoBPvxmejtd55JcG3beNhnAYPdUDmW5RaiRvnYxMVC--ikpD5cR2Zc9ymmyyNA',
    summary: 'The Federal Government has announced streamlined registration for 2026 undergraduate candidates with zero guarantor requirements.'
  },
  {
    id: 'news-2',
    title: 'Top 10 Undergraduate Scholarships Opening in Q2 2026 (Dates & Requirements)',
    category: 'Scholarship Guide',
    date: 'Feb 05, 2026',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6k9ltNQimOJMIyA-pbjZItn06eGaQfWoF7MNSuYEgESssmvK0ERA3ORyk7huKayN35EREux72Yzt1ABTC7LWcMpsiTasgrCQYialSSB-VnaTFZPoN7dRMACWbZHhCO3oyKChnDaDd5ALVzMUvUD6nfNs3X3p4diS-zJtu93B-FzKDRHZZHZnDoo7IiL6j1xmR9D9nuslbosgvyGaYD6t5I6DBovU6uBHM3SQY49GS7K5yzNwjXngcA',
    summary: 'A complete round-up of oil company, banking foundation, and state bursary awards opening for 2026 applicants.'
  },
  {
    id: 'news-3',
    title: 'How to Avoid Fake Scholarship Portals & Scam Fees in 2026',
    category: 'Security Alert',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPQuIzhb_QUv5E8KITTF-RnpHL3wUNqY8-SLo4xf4FLvqfTHyiUHj84El4qUOq6pFCkbXfBBUemhrC-ub73l82yhOz6ph0ClfPXqhKNqipt9ek-v8SdppfLWNqjCbwjOXKQpd2fwtxN9Z46TtQuFb_IPqgZ4eYj_p-QtzEywveH62djClLPaJCD6Hka_7xRy9LhZQPTywOAxTZxQwttc-34b7-70u3PoGzV71z_iKhgYjZ0JLFFB37eA',
    summary: 'Official verification steps to ensure you only apply through genuine, fee-free official scholarship websites.'
  }
];

export const ScholarshipsScreen: React.FC<ScholarshipsScreenProps> = ({ setActiveTab }) => {
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dark Mode Focus State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Global Alert Banner Dismissed State
  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(true);

  // Search Query & Voice Search Sim
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);

  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    showToast('Listening for search query... Speak now!');
    setTimeout(() => {
      setSearchQuery('Engineering Scholarships 2026');
      setIsListeningVoice(false);
      showToast('Found search query: "Engineering Scholarships 2026"');
    }, 2000);
  };

  // Advanced Filter States
  const [selectedFundingType, setSelectedFundingType] = useState<string>('All');
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<string>('All');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEligibility, setSelectedEligibility] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Newest' | 'Deadline' | 'Awards'>('Newest');

  // Filter Chip Toggles
  const [activeChipFilter, setActiveChipFilter] = useState<string>('All');

  // Saved / Bookmarked Scholarships Array
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>(['nnpc-chevron-2026', 'nelfund-loan-2026']);

  const toggleSaveScholarship = (id: string, name: string) => {
    if (savedScholarshipIds.includes(id)) {
      setSavedScholarshipIds((prev) => prev.filter((item) => item !== id));
      showToast(`Removed "${name}" from saved opportunities.`);
    } else {
      setSavedScholarshipIds((prev) => [...prev, id]);
      showToast(`Saved "${name}" to your 2026 Dashboard! ⭐`);
    }
  };

  // Modal State for Scholarship Details
  const [selectedDetailScholarship, setSelectedDetailScholarship] = useState<ScholarshipItem | null>(null);

  // Modal State for Reading News Article
  const [selectedArticleModal, setSelectedArticleModal] = useState<(typeof LATEST_NEWS_ARTICLES)[0] | null>(null);

  // Interactive Checklist Items
  const [checklistItems, setChecklistItems] = useState([
    { id: 'c1', label: 'JAMB 2026 Official Result Slip', completed: true },
    { id: 'c2', label: 'National Identification Number (NIN) Slip', completed: true },
    { id: 'c3', label: 'O-Level Certificate / Statement of Result (WAEC/NECO)', completed: true },
    { id: 'c4', label: 'Birth Certificate / Declaration of Age', completed: false },
    { id: 'c5', label: 'LGA Identification Letter of Origin', completed: false },
    { id: 'c6', label: 'Personal Statement / Scholarship Motivation Essay', completed: false },
    { id: 'c7', label: 'White Background Passport Photographs (2x2)', completed: true },
    { id: 'c8', label: 'Recommendation Letter from School Principal or Clergy', completed: false }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedChecklistCount = checklistItems.filter((i) => i.completed).length;
  const checklistPercentage = Math.round((completedChecklistCount / checklistItems.length) * 100);

  // 2026 Calendar Month State
  const [calendarMonth, setCalendarMonth] = useState<string>('March 2026');

  // Accordion FAQ State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Filter Logic
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFunding = selectedFundingType === 'All' || s.fundingType === selectedFundingType;
      const matchesLevel = selectedStudyLevel === 'All' || s.studyLevel === selectedStudyLevel || s.studyLevel === 'All Levels';
      const matchesInst = selectedInstitutionType === 'All' || s.institutionType === selectedInstitutionType || s.institutionType === 'All Institutions';
      const matchesLoc = selectedLocation === 'All' || s.location === selectedLocation || s.location === 'Nationwide';
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory || s.category === 'General';
      const matchesEligibility = selectedEligibility === 'All' || s.eligibilityType === selectedEligibility;
      const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;

      const matchesChip =
        activeChipFilter === 'All' ||
        s.category.toLowerCase().includes(activeChipFilter.toLowerCase()) ||
        s.eligibilityType.toLowerCase().includes(activeChipFilter.toLowerCase()) ||
        s.fundingType.toLowerCase().includes(activeChipFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesFunding &&
        matchesLevel &&
        matchesInst &&
        matchesLoc &&
        matchesCategory &&
        matchesEligibility &&
        matchesStatus &&
        matchesChip
      );
    }).sort((a, b) => {
      if (sortBy === 'Awards') return b.numberOfAwards - a.numberOfAwards;
      return 0;
    });
  }, [
    searchQuery,
    selectedFundingType,
    selectedStudyLevel,
    selectedInstitutionType,
    selectedLocation,
    selectedCategory,
    selectedEligibility,
    selectedStatus,
    activeChipFilter,
    sortBy
  ]);

  return (
    <div
      className={`w-full min-h-screen font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0B132B] text-slate-100' : 'bg-[#FFFFFF] text-[#0F172A]'
      } pb-24`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58] animate-bounce">
          <span className="material-symbols-outlined text-[#0F9D58]">verified</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
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
            <button
              onClick={() => setActiveTab && setActiveTab('study-hub')}
              className="hover:text-[#0F9D58] transition-colors"
            >
              Scholarships
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-[#0F9D58] font-bold">Financial Aid (2026)</span>
          </div>

          {/* Dark Mode Focus Toggle */}
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              showToast(!isDarkMode ? 'Dark Focus Mode Enabled' : 'Light Mode Enabled');
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

      {/* GLOBAL ALERT BANNER */}
      {showAlertBanner && (
        <div className="bg-gradient-to-r from-[#0F9D58] via-[#16A34A] to-[#0F172A] text-white px-4 py-3 shadow-md border-b border-[#0F9D58]/30 relative">
          <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0">
                🎓
              </span>
              <div>
                <strong className="font-bold text-[#82FAAB] underline decoration-[#82FAAB]">2026 Scholarship Season is Now Live:</strong>{' '}
                Explore verified opportunities, bursaries, and NELFUND tuition loans for the 2026 academic cycle.
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  const el = document.getElementById('scholarships-list-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-1.5 px-3.5 bg-white text-[#0F172A] font-bold text-xs rounded-xl hover:bg-[#82FAAB] transition-all shadow-sm"
              >
                Explore Opportunities
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

      {/* PAGE HEADER / HERO */}
      <section className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#0F281E] to-[#0F9D58] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#0F9D58]/30 border border-[#0F9D58]/50 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>2026 Admission Cycle Funding Portal</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-white">
              Scholarships &amp; <span className="text-[#82FAAB]">Financial Aid (2026)</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              Explore verified scholarship information, bursaries, grants, and financial aid opportunities to support your university education during the 2026 admission cycle.
            </p>

            {/* Quick Hero Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
                <span className="block text-xl sm:text-2xl font-extrabold text-[#82FAAB]">500+</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">Active 2026 Grants</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
                <span className="block text-xl sm:text-2xl font-extrabold text-[#82FAAB]">₦2.5B+</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">Total Funding Pool</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center">
                <span className="block text-xl sm:text-2xl font-extrabold text-amber-300">NELFUND</span>
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">100% Tuition Loan</span>
              </div>
            </div>
          </div>

          {/* Hero Illustration Graphic Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F9D58] flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined text-2xl">school</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">2026 Scholar Status</p>
                    <p className="text-lg font-extrabold font-display text-[#82FAAB]">Verified Eligible</p>
                  </div>
                </div>
                <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Active Grants
                </span>
              </div>

              {/* Graphic Card Inner Content */}
              <div className="space-y-3">
                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#82FAAB] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">NNPC/Chevron 2026</p>
                      <p className="text-[10px] text-slate-400">₦500,000 / Year • Open</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#82FAAB] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Apply
                  </span>
                </div>

                <div className="p-3 bg-[#0F172A]/80 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">NELFUND Loan Scheme</p>
                      <p className="text-[10px] text-slate-400">100% Tuition + Upkeep</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Active
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 italic text-center pt-1">
                "Empowering Nigerian scholars with verified funding opportunities for the 2026 session."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 space-y-12">

        {/* 1. SMART SEARCH & ADVANCED FILTERS SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Smart Discovery Engine</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Search &amp; Filter 2026 Scholarships
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search scholarships, providers, universities or funding opportunities for 2026..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3.5 pl-12 pr-24 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0F9D58] text-[#0F172A] dark:text-white placeholder-[#475569]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#475569] hover:text-[#0F172A] dark:hover:text-white"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
              <button
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  isListeningVoice
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-[#0F9D58]/10 text-[#0F9D58] hover:bg-[#0F9D58]/20'
                }`}
                title="Voice Search"
              >
                <span className="material-symbols-outlined text-sm">mic</span>
              </button>
            </div>
          </div>

          {/* Advanced Dropdown Filters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {/* Funding Type */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Funding Type</label>
              <select
                value={selectedFundingType}
                onChange={(e) => setSelectedFundingType(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Funding Types</option>
                <option value="Full Scholarship">Full Scholarship</option>
                <option value="Tuition Only">Tuition Only</option>
                <option value="Annual Grant">Annual Grant</option>
                <option value="Living Stipend">Living Stipend</option>
                <option value="Student Loan (NELFUND)">Student Loan (NELFUND)</option>
              </select>
            </div>

            {/* Study Level */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Study Level</label>
              <select
                value={selectedStudyLevel}
                onChange={(e) => setSelectedStudyLevel(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Academic Levels</option>
                <option value="Undergraduate 100L">100 Level Freshers</option>
                <option value="Undergraduate 200L">200 Level Undergrads</option>
                <option value="Undergraduate 300L">300 Level Undergrads</option>
                <option value="Pre-Degree / IJMB">Pre-Degree / IJMB</option>
              </select>
            </div>

            {/* Institution Type */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Institution Type</label>
              <select
                value={selectedInstitutionType}
                onChange={(e) => setSelectedInstitutionType(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Institutions</option>
                <option value="Federal Universities">Federal Universities</option>
                <option value="State Universities">State Universities</option>
                <option value="Private Universities">Private Universities</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Locations</option>
                <option value="Nationwide">Nationwide</option>
                <option value="Niger Delta Region">Niger Delta Region</option>
                <option value="South-West">South-West</option>
                <option value="North-East">North-East</option>
                <option value="South-East">South-East</option>
              </select>
            </div>

            {/* Course Category */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Course Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Fields of Study</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine &amp; Health</option>
                <option value="Computer Science">Computer Science &amp; Tech</option>
                <option value="Law">Law</option>
                <option value="Business">Business &amp; Finance</option>
                <option value="Sciences">Sciences</option>
              </select>
            </div>

            {/* Eligibility */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Eligibility Criteria</label>
              <select
                value={selectedEligibility}
                onChange={(e) => setSelectedEligibility(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Criteria</option>
                <option value="Merit-Based">Merit-Based</option>
                <option value="Need-Based">Need-Based</option>
                <option value="Indigenes Only">State Indigenes Only</option>
                <option value="Female in STEM">Female Students in STEM</option>
              </select>
            </div>

            {/* Application Status */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Application Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-medium text-[#0F172A] dark:text-white"
              >
                <option value="All">All Statuses</option>
                <option value="Open for 2026">Open for 2026</option>
                <option value="Opening April 2026">Opening Soon (Q2 2026)</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase mb-1">Sort Results By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl font-bold text-[#0F9D58]"
              >
                <option value="Newest">Newest Listed</option>
                <option value="Deadline">Application Deadline</option>
                <option value="Awards">Highest Award Count</option>
              </select>
            </div>
          </div>

          {/* Filter Tag Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#475569] mr-1">Quick Tags:</span>
            {[
              'All',
              '2026 Scholarships',
              'Engineering',
              'Medicine',
              'Computer Science',
              'Merit-Based',
              'Need-Based',
              'Female in STEM',
              'Full Scholarship'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChipFilter(chip)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  activeChipFilter === chip
                    ? 'bg-[#0F9D58] text-white border-[#0F9D58] shadow-xs'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                    : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-[#0F9D58]'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* 2. FEATURED SCHOLARSHIPS CARDS GRID */}
        <section id="scholarships-list-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-2">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Verified Opportunities</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Featured Scholarships for 2026 ({filteredScholarships.length})
              </h2>
            </div>
            <span className="text-xs text-[#475569] font-medium">
              Showing official 2026 undergraduate opportunities
            </span>
          </div>

          {filteredScholarships.length === 0 ? (
            <div className="p-12 text-center bg-[#F8FAFC] dark:bg-slate-800 rounded-3xl border border-dashed border-[#E2E8F0] dark:border-slate-700 space-y-3">
              <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white">No scholarships match your filters</h3>
              <p className="text-xs text-[#475569]">Try clearing your search query or selecting "All" in the filters above.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFundingType('All');
                  setSelectedStudyLevel('All');
                  setSelectedInstitutionType('All');
                  setSelectedLocation('All');
                  setSelectedCategory('All');
                  setSelectedEligibility('All');
                  setSelectedStatus('All');
                  setActiveChipFilter('All');
                }}
                className="py-2 px-4 bg-[#0F9D58] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((sch) => {
                const isSaved = savedScholarshipIds.includes(sch.id);

                return (
                  <div
                    key={sch.id}
                    className={`p-6 rounded-3xl border shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between space-y-5 ${
                      isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${sch.logoBg} ${sch.logoColor} flex items-center justify-center shrink-0 shadow-xs`}>
                          <span className="material-symbols-outlined text-2xl">{sch.logoIcon}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${sch.statusColor}`}>
                            {sch.status}
                          </span>
                          <button
                            onClick={() => toggleSaveScholarship(sch.id, sch.name)}
                            className={`p-1.5 rounded-xl border transition-all ${
                              isSaved
                                ? 'bg-amber-100 text-amber-600 border-amber-300'
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-amber-500'
                            }`}
                            title={isSaved ? 'Saved to bookmarks' : 'Save opportunity'}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {isSaved ? 'bookmark_added' : 'bookmark_add'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Title & Provider */}
                      <div>
                        <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block mb-0.5">
                          {sch.provider}
                        </span>
                        <h3 className="text-base font-bold font-display text-[#0F172A] dark:text-white leading-snug">
                          {sch.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed line-clamp-2">
                        {sch.shortDesc}
                      </p>

                      {/* Key Specs Pills */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="p-2 bg-[#F8FAFC] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                          <span className="text-[#475569] block text-[9px] uppercase font-semibold">Value</span>
                          <span className="font-bold text-[#0F9D58]">{sch.amount}</span>
                        </div>
                        <div className="p-2 bg-[#F8FAFC] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                          <span className="text-[#475569] block text-[9px] uppercase font-semibold">Closing Date</span>
                          <span className="font-bold text-[#0F172A] dark:text-white">{sch.closeDate}</span>
                        </div>
                      </div>

                      {/* Tag Badges */}
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#475569]">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">{sch.fundingType}</span>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">{sch.studyLevel}</span>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">{sch.eligibilityType}</span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedDetailScholarship(sch)}
                        className="flex-1 py-2.5 px-4 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(`Check out ${sch.name} on JAMB Compass 2026: ${sch.officialPortalUrl}`);
                            showToast('Scholarship details link copied to clipboard! 📋');
                          } else {
                            showToast('Share link ready!');
                          }
                        }}
                        className="p-2.5 bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:text-[#0F172A] rounded-xl transition-all"
                        title="Share Scholarship"
                      >
                        <span className="material-symbols-outlined text-sm">share</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 3. SCHOLARSHIP CATEGORIES GRID */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Explore by Discipline</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Scholarship Categories (2026 Cycle)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SCHOLARSHIP_CATEGORIES_DATA.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  showToast(`Filtering for ${cat.title}...`);
                  const el = document.getElementById('scholarships-list-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-5 rounded-3xl border shadow-xs hover:shadow-lg transition-all cursor-pointer space-y-3 group ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className={`w-11 h-11 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
                  <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold font-display text-[#0F172A] dark:text-white group-hover:text-[#0F9D58] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#475569] font-medium mt-0.5">{cat.count}</p>
                </div>
                <div className="flex items-center text-[11px] font-bold text-[#0F9D58]">
                  <span>Explore Grants</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MY SCHOLARSHIP DASHBOARD & APPLICATION CHECKLIST (BENTO GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: My Scholarship Dashboard */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">folder_shared</span>
                </span>
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0F172A]">My 2026 Scholarship Tracker</h3>
                  <p className="text-xs text-[#475569]">Monitor your active applications and saved opportunities.</p>
                </div>
              </div>
            </div>

            {/* Dashboard Quick Counter Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
                <span className="text-2xl font-extrabold text-[#0F9D58]">{savedScholarshipIds.length}</span>
                <span className="block text-[10px] font-bold text-[#475569] uppercase">Saved</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
                <span className="text-2xl font-extrabold text-[#2563EB]">2</span>
                <span className="block text-[10px] font-bold text-[#475569] uppercase">In Progress</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#E2E8F0] shadow-xs">
                <span className="text-2xl font-extrabold text-amber-600">1</span>
                <span className="block text-[10px] font-bold text-[#475569] uppercase">Submitted</span>
              </div>
            </div>

            {/* Saved List Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Saved Opportunities (2026)</h4>
              {savedScholarshipIds.map((id) => {
                const item = SCHOLARSHIPS_DATA.find((s) => s.id === id);
                if (!item) return null;
                return (
                  <div key={id} className="p-3.5 bg-white rounded-2xl border border-[#E2E8F0] flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${item.logoBg} ${item.logoColor} flex items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined text-sm">{item.logoIcon}</span>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#0F172A] line-clamp-1">{item.name}</h5>
                        <p className="text-[10px] text-[#475569]">Deadline: {item.closeDate}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDetailScholarship(item)}
                      className="text-xs font-bold text-[#0F9D58] hover:underline"
                    >
                      View
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Application Checklist */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2.5 text-[#0F9D58]">
                <span className="material-symbols-outlined text-2xl">task_alt</span>
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0F172A]">Document Readiness Checklist</h3>
                  <p className="text-xs text-[#475569]">Verify credentials required across 90% of Nigerian scholarships.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0F9D58] bg-[#0F9D58]/10 px-2.5 py-1 rounded-full">
                {checklistPercentage}% Ready
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#475569]">
                <span>Document Completion</span>
                <span className="text-[#0F9D58] font-bold">{completedChecklistCount} of {checklistItems.length} Verified</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${checklistPercentage}%` }}
                  className="bg-gradient-to-r from-[#2563EB] to-[#0F9D58] h-full rounded-full transition-all duration-500"
                ></div>
              </div>
            </div>

            {/* Interactive Checklist Items */}
            <div className="space-y-2.5 pt-1">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    item.completed
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 text-[#0F172A]'
                      : 'bg-white dark:bg-slate-800 border-[#E2E8F0] dark:border-slate-700 text-[#475569]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-lg ${item.completed ? 'text-[#0F9D58]' : 'text-slate-300'}`}>
                      {item.completed ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`text-xs font-semibold ${item.completed ? 'line-through text-slate-500' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.completed ? 'bg-emerald-100 text-[#0F9D58]' : 'bg-slate-100 text-slate-500'}`}>
                    {item.completed ? 'Ready' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. 2026 APPLICATION CALENDAR & PERSONALISED RECOMMENDATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 2026 Calendar */}
          <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-3 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                </span>
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0F172A]">2026 Application Calendar</h3>
                  <p className="text-xs text-[#475569]">Track opening dates, test schedules, and deadlines for 2026.</p>
                </div>
              </div>

              {/* Month Selector */}
              <select
                value={calendarMonth}
                onChange={(e) => {
                  setCalendarMonth(e.target.value);
                  showToast(`Viewing 2026 Calendar for ${e.target.value}`);
                }}
                className="py-1.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A]"
              >
                <option value="January 2026">January 2026</option>
                <option value="February 2026">February 2026</option>
                <option value="March 2026">March 2026</option>
                <option value="April 2026">April 2026</option>
                <option value="May 2026">May 2026</option>
                <option value="June 2026">June 2026</option>
              </select>
            </div>

            {/* Calendar Event Highlights */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F9D58] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58]"></span>
                    Feb 10, 2026 • Opening Date
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-[#0F9D58] px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                  NNPC / Chevron Joint Venture National Scholarship 2026
                </h4>
                <p className="text-xs text-[#475569]">Portal opened for full-time 200L Nigerian undergraduates.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Mar 01, 2026 • Opening Date
                  </span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    Upcoming
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                  MTN Foundation Science &amp; Tech Scholarship 2026
                </h4>
                <p className="text-xs text-[#475569]">Applications open for 300L STEM undergraduates.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    May 30, 2026 • Application Deadline
                  </span>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    Deadline Alert
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                  NNPC / Chevron Portal Closing Date
                </h4>
                <p className="text-xs text-[#475569]">Final deadline for submitting scanned academic credentials.</p>
              </div>
            </div>
          </div>

          {/* Personalised Recommendations */}
          <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border shadow-md space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
            <div className="flex items-center gap-2.5 text-[#0F9D58] border-b border-[#E2E8F0] pb-3">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              <div>
                <h3 className="text-lg font-bold font-display text-[#0F172A]">AI Personalised Matches</h3>
                <p className="text-xs text-[#475569]">Matched against your 2026 course and JAMB score profile.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-emerald-100 text-[#0F9D58] px-2.5 py-0.5 rounded-full border border-emerald-300">
                    96% Match for Medical Student
                  </span>
                  <span className="text-xs font-bold text-[#0F9D58]">₦500,000/Yr</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">NNPC / Chevron National Merit Scheme 2026</h4>
                <p className="text-xs text-[#475569]">Matches your Medicine course interest and 230+ JAMB score minimum.</p>
                <button
                  onClick={() => setSelectedDetailScholarship(SCHOLARSHIPS_DATA[0])}
                  className="w-full py-2 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl transition-all"
                >
                  Explore Match
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-blue-100 text-[#2563EB] px-2.5 py-0.5 rounded-full border border-blue-300">
                    92% Match for 100L Undergrad
                  </span>
                  <span className="text-xs font-bold text-[#2563EB]">100% Tuition</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">NELFUND Federal Education Loan 2026</h4>
                <p className="text-xs text-[#475569]">Direct tuition payment + ₦20k monthly upkeep allowance.</p>
                <button
                  onClick={() => setSelectedDetailScholarship(SCHOLARSHIPS_DATA[2])}
                  className="w-full py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl transition-all"
                >
                  Explore Match
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. SCHOLARSHIP SUCCESS STORIES */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Scholar Testimonials</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Scholarship Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story) => (
              <div
                key={story.id}
                className={`p-6 rounded-3xl border shadow-md space-y-4 flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0F9D58] shadow-xs"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">{story.name}</h3>
                      <p className="text-[11px] text-[#0F9D58] font-bold">{story.scholarship}</p>
                      <p className="text-[10px] text-[#475569]">{story.university}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] dark:text-slate-300 italic leading-relaxed">
                    "{story.advice}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-emerald-100 text-[#0F9D58] px-2.5 py-1 rounded-full">
                    {story.badge}
                  </span>
                  <span className="text-[10px] text-slate-400">Verified Awardee</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#475569] text-center italic">
            * Note: Success stories represent illustrative awardee experiences to guide candidates during the 2026 cycle.
          </p>
        </section>

        {/* 7. LATEST FUNDING NEWS (2026) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Editorial &amp; Updates</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
                Latest 2026 Funding News
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LATEST_NEWS_ARTICLES.map((article) => (
              <div
                key={article.id}
                className={`rounded-3xl border overflow-hidden shadow-xs hover:shadow-xl transition-all space-y-4 flex flex-col justify-between ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div>
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0F172A]/80 backdrop-blur-md text-[#82FAAB] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-white/20">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#475569]">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-sm font-bold font-display text-[#0F172A] dark:text-white leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#475569] dark:text-slate-300 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedArticleModal(article)}
                    className="w-full py-2 bg-[#F8FAFC] dark:bg-slate-800 hover:bg-[#0F9D58] hover:text-white text-[#0F9D58] font-bold text-xs rounded-xl transition-all border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center gap-1"
                  >
                    <span>Read Full Article</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FINANCIAL AID RESOURCES */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider block mb-0.5">Educational Guides</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Financial Aid &amp; Application Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'How Scholarships Work in Nigeria', icon: 'menu_book', desc: 'Understanding Merit vs. Need-based bursaries and award structures.' },
              { title: 'Understanding NELFUND Student Loans', icon: 'account_balance', desc: 'Step-by-step guide to interest-free tuition financing and upkeep stipend.' },
              { title: 'University Living Cost Budgeting 2026', icon: 'calculate', desc: 'Calculate food, accommodation, and textbook costs for your target university.' },
              { title: 'Aptitude Test & CBT Prep Strategy', icon: 'quiz', desc: 'How to score in top 5% on scholarship selection examinations.' },
              { title: 'Writing a Winning Motivation Essay', icon: 'edit_note', desc: 'Structure your personal statement to stand out to selection boards.' },
              { title: 'Verifying Official Scholarship Portals', icon: 'gavel', desc: 'Protecting yourself against scam websites charging application fees.' }
            ].map((res, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border shadow-xs hover:shadow-md transition-all space-y-3 ${
                  isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">{res.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-[#0F172A] dark:text-white">{res.title}</h3>
                  <p className="text-xs text-[#475569] dark:text-slate-300 mt-1">{res.desc}</p>
                </div>
                <button
                  onClick={() => showToast(`Opening guide: "${res.title}"`)}
                  className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ ACCORDION SECTION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${isDarkMode ? 'bg-[#1C2541] border-slate-700' : 'bg-white border-[#E2E8F0]'}`}>
          <div className="space-y-1 border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Got Questions?</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white">
              Frequently Asked Questions (2026 Cycle)
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Who can apply for scholarships on JAMB Compass 2026?',
                a: 'All 2026 JAMB UTME candidates, 100-level freshers, and returning 200L/300L undergraduate students enrolled in accredited Nigerian universities and polytechnics can apply.'
              },
              {
                q: 'Can I apply for multiple scholarships simultaneously?',
                a: 'Yes! Candidates can apply for multiple independent scholarship schemes. However, once awarded, certain major oil company schemes require scholars to confirm non-concurrency.'
              },
              {
                q: 'How do I improve my chances of winning a scholarship?',
                a: 'Achieve a strong 2026 JAMB score (230+), maintain high O-Level grades, prepare thoroughly for CBT aptitude screening tests, and ensure all documents match your NIN identity perfectly.'
              },
              {
                q: 'What documents are commonly required for 2026 applications?',
                a: 'Standard required documents include your JAMB 2026 Result Slip, Admission Letter, O-Level Statement of Result, Birth Certificate, Local Government Indigeneship Letter, and NIN Slip.'
              },
              {
                q: 'How do I verify official scholarship portals and avoid scams?',
                a: 'Genuine Nigerian undergraduate scholarships are 100% free of application fees. JAMB Compass verifies official domain links (e.g. .gov.ng or official corporate sites) to prevent candidates from fake portals.'
              },
              {
                q: 'How does NELFUND (Nigeria Education Loan Fund) work for 2026 students?',
                a: 'NELFUND pays 100% of institutional tuition fees directly to your university bursary and disburses a monthly ₦20,000 living stipend directly to your bank account with zero interest.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-emerald-50/50 dark:bg-slate-800 border-[#0F9D58]'
                      : 'bg-[#F8FAFC] dark:bg-slate-800/50 border-[#E2E8F0] dark:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white flex items-center justify-between gap-3"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[#0F9D58] shrink-0">
                      {isOpen ? 'remove_circle' : 'add_circle'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#475569] dark:text-slate-300 leading-relaxed border-t border-[#0F9D58]/20 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. CALL TO ACTION SECTION */}
        <section className="relative w-full rounded-3xl bg-gradient-to-r from-[#0F9D58] via-[#0F172A] to-[#1E293B] text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-5 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-[#82FAAB] px-3.5 py-1 rounded-full text-xs font-bold uppercase">
              <span className="material-symbols-outlined text-sm">military_tech</span>
              <span>Start Your 2026 Funding Journey</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-white">
              Secure Funding for Your 2026 University Journey
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Discover funding opportunities, organise your applications, track important deadlines, and take the next step towards achieving your academic goals.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('scholarships-list-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Explore Scholarships</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <button
                onClick={() => setActiveTab && setActiveTab('study-hub')}
                className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">school</span>
                <span>Return to Study Hub</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* SCHOLARSHIP DETAILS MODAL */}
      {selectedDetailScholarship && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#1C2541] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto text-[#0F172A] dark:text-white space-y-6 p-6 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E2E8F0] dark:border-slate-700 pb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${selectedDetailScholarship.logoBg} ${selectedDetailScholarship.logoColor} flex items-center justify-center shrink-0 shadow-md`}>
                  <span className="material-symbols-outlined text-3xl">{selectedDetailScholarship.logoIcon}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#475569] uppercase tracking-wider block">
                    {selectedDetailScholarship.provider}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-display">
                    {selectedDetailScholarship.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedDetailScholarship(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] uppercase font-bold">Funding Value</span>
                <span className="font-extrabold text-[#0F9D58] text-sm">{selectedDetailScholarship.amount}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] uppercase font-bold">Closing Date (2026)</span>
                <span className="font-extrabold text-[#0F172A] dark:text-white text-sm">{selectedDetailScholarship.closeDate}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] uppercase font-bold">Target Level</span>
                <span className="font-bold text-[#2563EB] text-xs">{selectedDetailScholarship.studyLevel}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
                <span className="text-[#475569] block text-[10px] uppercase font-bold">Number of Awards</span>
                <span className="font-bold text-amber-600 text-xs">{selectedDetailScholarship.numberOfAwards} Slots</span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Overview</h4>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                {selectedDetailScholarship.overview}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Scholarship Benefits</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569] dark:text-slate-300">
                {selectedDetailScholarship.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#F8FAFC] dark:bg-slate-800 p-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                    <span className="material-symbols-outlined text-sm text-[#0F9D58] shrink-0 mt-0.5">check_circle</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Eligibility Requirements</h4>
              <ul className="space-y-1.5 text-xs text-[#475569] dark:text-slate-300">
                {selectedDetailScholarship.eligibilityCriteria.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#2563EB] shrink-0 mt-0.5">verified</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">Typical Required Documents</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedDetailScholarship.requiredDocuments.map((doc, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-slate-500">description</span>
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 2026 Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0F9D58] uppercase tracking-wider">2026 Application Timeline</h4>
              <div className="space-y-2 text-xs">
                {selectedDetailScholarship.timeline2026.map((t, idx) => (
                  <div key={idx} className="p-3 bg-[#F8FAFC] dark:bg-slate-800 rounded-xl flex items-center justify-between border border-[#E2E8F0] dark:border-slate-700">
                    <div>
                      <span className="font-bold text-[#0F172A] dark:text-white">{t.title}</span>
                      <span className="text-[11px] text-[#475569] block">{t.desc}</span>
                    </div>
                    <span className="font-extrabold text-[#0F9D58] text-xs bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full shrink-0">
                      {t.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Disclaimer Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
              <span className="material-symbols-outlined text-lg text-amber-600 shrink-0 mt-0.5">info</span>
              <div>
                <strong className="font-bold block mb-0.5">Official Verification Notice:</strong>
                Always confirm deadlines, eligibility requirements, and application instructions on the official scholarship provider's website before applying.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => toggleSaveScholarship(selectedDetailScholarship.id, selectedDetailScholarship.name)}
                className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#0F172A] dark:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">bookmark</span>
                <span>{savedScholarshipIds.includes(selectedDetailScholarship.id) ? 'Saved' : 'Save Opportunity'}</span>
              </button>

              <a
                href={selectedDetailScholarship.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`Redirecting to official portal: ${selectedDetailScholarship.officialPortalUrl}`);
                }}
                className="py-2.5 px-6 bg-[#0F9D58] hover:bg-[#0d8a4d] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Apply on Official Portal</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1C2541] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[85vh] overflow-y-auto text-[#0F172A] dark:text-white space-y-4 p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold bg-emerald-100 text-[#0F9D58] px-2.5 py-1 rounded-full uppercase">
                {selectedArticleModal.category}
              </span>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <h3 className="text-xl font-bold font-display leading-tight">{selectedArticleModal.title}</h3>
            <div className="text-xs text-[#475569] flex items-center gap-3">
              <span>Published: {selectedArticleModal.date}</span>
              <span>•</span>
              <span>{selectedArticleModal.readTime}</span>
            </div>

            <div className="h-56 w-full rounded-2xl overflow-hidden">
              <img src={selectedArticleModal.image} alt={selectedArticleModal.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
              {selectedArticleModal.summary}
            </p>

            <div className="p-4 bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl text-xs space-y-2 border border-[#E2E8F0] dark:border-slate-700">
              <h4 className="font-bold text-[#0F9D58]">Key Takeaway for 2026 Applicants:</h4>
              <p className="text-[#475569] dark:text-slate-300">
                Early preparation is key. Ensure your O-Level credits and 2026 JAMB score meet minimum eligibility thresholds before the application deadline.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="py-2 px-5 bg-[#0F9D58] text-white text-xs font-bold rounded-xl"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
