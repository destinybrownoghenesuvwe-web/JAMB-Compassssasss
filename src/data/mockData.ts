import { Course, University, RoadmapStep, NewsArticle, CbtQuestion } from '../types';

export const HERO_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuB3oK2A1pnqmy6Y7Ot4AZY7VCWYgpAzR8vKJ26VS6wLL38zzP_Q0SH5y5p9b4RhscxtZ91BLJGGyJhLvF8v4oZRFv3CFl5zI-dCNr6R9gyR-ALW1fltHLo8tbVun_x7SzKJLkZTEqeh9CtOl_cbWwPSrMwuXKgk27N06ECsqYyFT7IEkjLPrPiVEck3n1_M74iutsPG-0JMtSe03wRmJjN_1qcIcaZbpSMW6xhhCNodJJRCXwwprSq_h91_gM2CDug7CRS_i1TT95EA";

export const COURSES_DATA: Course[] = [
  {
    id: "med-surg",
    name: "Medicine & Surgery",
    category: "Medical",
    tag: "High Competition",
    tagBg: "bg-primary text-on-primary",
    tagText: "High Competition",
    description: "The most sought-after medical program with rigorous entry requirements and clinical excellence training.",
    applicants: "80k+ Applicants annually",
    utmeSubjects: ["Use of English", "Physics", "Chemistry", "Biology"],
    oLevelRequirements: "5 A1/B2/C6 Credits in English, Mathematics, Physics, Chemistry, and Biology in not more than 1 sitting.",
    cutOffMark: 285,
    duration: "6 Years (MBBS)",
    careerProspects: ["Surgeon", "General Practitioner", "Medical Researcher", "Public Health Director", "Clinical Consultant"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHjQcZQC8L8DugPa22lMx3XsfMvW7mFE5XGc5ON7uAhO8se5cQAvxqYiavkghkRvjLJQEterrB8EP3NIRNpIcgtNEr50o4A6RxaeuJcGE_celrhX9OtoE6nPP__iA4o9M2xbhJgjjK283L8b5ClxzsVZurYGI4VeDCdBY9WdML40jSmEzofg3qPHAdzDWetqJrD6DmS17Jks0Luvezel-VVRuPok1b0rioMXj67YjkS3gpCId-Gr1rxpNs6SVsXYDnEqXuWMfzqfUT",
    popular: true
  },
  {
    id: "comp-sci",
    name: "Computer Science",
    category: "Tech",
    tag: "Trending",
    tagBg: "bg-secondary text-on-secondary",
    tagText: "Trending",
    description: "Focusing on algorithms, software engineering, artificial intelligence, and digital innovation.",
    applicants: "Fastest growing career path",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry / Further Mathematics"],
    oLevelRequirements: "5 Credits in English, Mathematics, Physics, and any two of Chemistry, Biology, Economics, or Geography.",
    cutOffMark: 260,
    duration: "4 Years (B.Sc)",
    careerProspects: ["Software Engineer", "AI/ML Specialist", "Cybersecurity Analyst", "Cloud Architect", "Product Manager"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEWdW-JknoRnp0xWdZ7Pgg-888AeavaOJ_XUd26zunLTvBQF-wERW3JIjOq64BQBR3HU9ZNaDa-aw1HiusiJES3_wJNZxeRagbIOiLcTmlz1pGE12fupWSFDuUH8NXiOE5BvNdSNcz4hKbVveJmSVWRjWvAzVFjfV9l7rxRiqDg0keWTeiHPQuH5ulP5nHxtvwN_QJliEot_AZAjmNmwQCELW08QmnR5VNEuQ-B9_BjtcoP44PNdhJmI_Gf4uiAho4bi3kPhVvVZiy",
    popular: true
  },
  {
    id: "mech-eng",
    name: "Mechanical Engineering",
    category: "Engineering",
    tag: "Core Engineering",
    tagBg: "bg-on-surface-variant text-on-surface",
    tagText: "Core Engineering",
    description: "Deep dive into machine design, thermal science, mechatronics, and precision manufacturing.",
    applicants: "120+ Accredited Institutions",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 Credits including English, Mathematics, Physics, Chemistry, and any other technical/science subject.",
    cutOffMark: 250,
    duration: "5 Years (B.Eng)",
    careerProspects: ["Aerospace Engineer", "Robotics Engineer", "Energy Systems Designer", "Automotive Specialist", "Manufacturing Lead"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNbf67ku8JNUqA0wyCAgbVBRTh2O6a2dt-oslsXRO6Ozdn51yrdVu4GRIsxBsNjI-UbTuPWPAGNTYcfLwBEteZUnDSjF3IFD0jkWWR6NbJFt4MkGT6f_ZvJRdbcqI9_1YDOe-6x801tadRx4esqzrSp-6cg65M_KZ-fo2j3qDcKMwJr_air59QBSDIxybyFB_GoINdALVAw4hMhb07NiUFFbXPuqxlCTnMahHrdHhd_8PMByy2OQJlc-GxcE2njzrzJJFOKgXa11E1",
    popular: true
  },
  {
    id: "law",
    name: "Law (LL.B)",
    category: "Law",
    tag: "High Demand",
    tagBg: "bg-tertiary text-on-tertiary",
    tagText: "High Demand",
    description: "Comprehensive legal education covering constitutional law, corporate jurisprudence, and human rights advocacy.",
    applicants: "65k+ Applicants annually",
    utmeSubjects: ["Use of English", "Literature in English", "Government", "CRS / IRS / History"],
    oLevelRequirements: "5 Credits in English Language, Literature in English, Mathematics, and two other Arts/Social Science subjects.",
    cutOffMark: 275,
    duration: "5 Years (LL.B) + 1 Year Law School",
    careerProspects: ["Corporate Lawyer", "Senior Advocate", "Judge/Magistrate", "Legal Counsel", "International Diplomat"],
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    popular: false
  },
  {
    id: "acct",
    name: "Accounting & Finance",
    category: "Business",
    tag: "High Employment",
    tagBg: "bg-primary-container text-on-primary-container",
    tagText: "High Employment",
    description: "Master financial auditing, forensic accounting, tax management, and corporate valuation.",
    applicants: "95+ Accredited Universities",
    utmeSubjects: ["Use of English", "Mathematics", "Economics", "Accounting / Government"],
    oLevelRequirements: "5 Credits in English, Mathematics, Economics, and two of Accounting, Business Methods, or Commerce.",
    cutOffMark: 240,
    duration: "4 Years (B.Sc)",
    careerProspects: ["Chartered Accountant (ICAN/ACCA)", "Investment Banker", "Financial Auditor", "Tax Consultant", "Chief Financial Officer"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    popular: false
  },
  {
    id: "nursing",
    name: "Nursing Science",
    category: "Medical",
    tag: "High Demand",
    tagBg: "bg-primary text-on-primary",
    tagText: "High Demand",
    description: "Advanced clinical nursing care, community healthcare management, and midwifery specialization.",
    applicants: "50k+ Applicants annually",
    utmeSubjects: ["Use of English", "Physics", "Chemistry", "Biology"],
    oLevelRequirements: "5 Credits in English, Mathematics, Physics, Chemistry, and Biology at one sitting.",
    cutOffMark: 260,
    duration: "5 Years (B.N.Sc)",
    careerProspects: ["Registered Nurse/Midwife", "Nurse Practitioner", "Clinical Nurse Specialist", "Healthcare Administrator"],
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    popular: false
  },
  {
    id: "mass-comm",
    name: "Mass Communication",
    category: "Arts",
    tag: "Creative Tech",
    tagBg: "bg-secondary text-on-secondary",
    tagText: "Creative Tech",
    description: "Digital journalism, broadcasting, public relations, film production, and strategic media communication.",
    applicants: "70k+ Applicants annually",
    utmeSubjects: ["Use of English", "Literature in English", "Government", "Any Arts/Social Science subject"],
    oLevelRequirements: "5 Credits in English, Mathematics, Literature, Government, and one other Arts subject.",
    cutOffMark: 245,
    duration: "4 Years (B.Sc / B.A)",
    careerProspects: ["Broadcast Journalist", "PR Strategist", "Media Producer", "Content Strategist", "Digital Brand Manager"],
    imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
    popular: false
  },
  {
    id: "arch",
    name: "Architecture",
    category: "Engineering",
    tag: "Design & Build",
    tagBg: "bg-tertiary text-on-tertiary",
    tagText: "Design & Build",
    description: "Sustainable urban design, structural aesthetics, 3D architectural modeling, and environmental planning.",
    applicants: "40+ Universities",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry / Fine Arts / Technical Drawing"],
    oLevelRequirements: "5 Credits in English, Mathematics, Physics, and any two of Chemistry, Technical Drawing, Economics, or Fine Art.",
    cutOffMark: 240,
    duration: "4 Years B.Sc + 2 Years M.Sc",
    careerProspects: ["Licensed Architect", "Urban Planner", "Interior Designer", "Real Estate Developer", "Project Manager"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    popular: false
  },
  {
    id: "soft-eng",
    name: "Software Engineering",
    category: "Tech",
    tag: "Trending",
    tagBg: "bg-secondary text-on-secondary",
    tagText: "Trending",
    description: "Architecting enterprise systems, mobile applications, cloud solutions, and scalable software pipelines.",
    applicants: "65k+ Applicants annually",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 Credits in English, Mathematics, Physics, Chemistry, and any other Science subject.",
    cutOffMark: 265,
    duration: "4 Years (B.S.E)",
    careerProspects: ["Full-Stack Developer", "DevOps Engineer", "Cloud Architect", "Software Manager", "Solutions Architect"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "civil-eng",
    name: "Civil Engineering",
    category: "Engineering",
    tag: "Infrastructure",
    tagBg: "bg-on-surface-variant text-on-surface",
    tagText: "Infrastructure",
    description: "Structural design, concrete mechanics, geotechnical engineering, highways, and bridge construction.",
    applicants: "55k+ Applicants annually",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 Credits in English, Mathematics, Physics, Chemistry, and Further Maths or Geography.",
    cutOffMark: 250,
    duration: "5 Years (B.Eng)",
    careerProspects: ["Structural Engineer", "Site Manager", "Geotechnical Engineer", "Infrastructure Consultant", "Project Director"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "econ",
    name: "Economics",
    category: "Business",
    tag: "High Demand",
    tagBg: "bg-primary-container text-on-primary-container",
    tagText: "High Demand",
    description: "Micro/macroeconomic theory, econometrics, financial market analysis, policy development, and trade.",
    applicants: "75k+ Applicants annually",
    utmeSubjects: ["Use of English", "Economics", "Mathematics", "Government or Accounting"],
    oLevelRequirements: "5 Credits in English, Mathematics, Economics, and two Social Science / Commercial subjects.",
    cutOffMark: 245,
    duration: "4 Years (B.Sc)",
    careerProspects: ["Economic Analyst", "Policy Consultant", "Investment Banker", "Data Analyst", "Risk Manager"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    popular: true
  },
  {
    id: "pharm",
    name: "Pharmacy",
    category: "Medical",
    tag: "High Competition",
    tagBg: "bg-primary text-on-primary",
    tagText: "High Competition",
    description: "Drug synthesis, pharmacology, clinical dosage, compounding, and pharmaceutical quality assurance.",
    applicants: "60k+ Applicants annually",
    utmeSubjects: ["Use of English", "Physics", "Chemistry", "Biology"],
    oLevelRequirements: "5 Credits in English, Mathematics, Physics, Chemistry, and Biology in 1 sitting.",
    cutOffMark: 275,
    duration: "5 Years (Pharm.D)",
    careerProspects: ["Clinical Pharmacist", "Industrial Pharmacist", "Pharmacologist", "Regulatory Specialist", "Community Pharmacist"],
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    popular: true
  }
];

export const UNIVERSITIES_DATA: University[] = [
  {
    id: "unilag",
    name: "University of Lagos",
    type: "Federal",
    location: "Akoka, Yaba, Lagos State",
    abbreviation: "UNILAG",
    description: "Commonly known as UNILAG, it is one of Nigeria's most prestigious and sought-after universities, celebrated for research, innovation, and vibrant campus life.",
    cutOffMark: 200,
    facultiesCount: 12,
    tuitionRange: "₦120,000 - ₦190,000 / year",
    accommodation: "Available (8 major halls of residence on campus)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-z6zTQqc5ZjFaeXGwuuEk3lWhVR63n_1bEIBC5FOI5xwIApkCUhpxHmBdg30q8dilx8GYn5XqHLsNxf3J94WznXqV0ncI5f611Q4SAPKBqmO8EeyXM79DdL2aTQcvRjeXaMFsABGe7QPh1jvoAaIzqTO16FFFK8S26xXA7Pvtxl3asEokA3JJvMXmLCUPtJSbbhMX_V_z2bM6F5fGeusnpIzSrtWoeRHBb86vQVmBiUCKulbydJO6pKIGMyl_86bXt1yODVhd2x5i",
    website: "https://unilag.edu.ng",
    accreditation: "Fully Accredited by NUC",
    featured: true,
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-z6zTQqc5ZjFaeXGwuuEk3lWhVR63n_1bEIBC5FOI5xwIApkCUhpxHmBdg30q8dilx8GYn5XqHLsNxf3J94WznXqV0ncI5f611Q4SAPKBqmO8EeyXM79DdL2aTQcvRjeXaMFsABGe7QPh1jvoAaIzqTO16FFFK8S26xXA7Pvtxl3asEokA3JJvMXmLCUPtJSbbhMX_V_z2bM6F5fGeusnpIzSrtWoeRHBb86vQVmBiUCKulbydJO6pKIGMyl_86bXt1yODVhd2x5i",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
    ],
    notableAlumni: ["Prof. Yemi Osinbajo SAN", "Dr. Ngozi Okonjo-Iweala", "Femi Falana SAN", "Genevieve Nnaji"],
    requirements: {
      generalCutOff: 200,
      medicineCutOff: 310,
      lawCutOff: 295,
      engineeringCutOff: 275,
      postUtmeRequired: true,
      postUtmeFormat: "Aptitude Test (English, Mathematics & General Paper) + O'Level Aggregate"
    }
  },
  {
    id: "uniport",
    name: "University of Port Harcourt",
    type: "Federal",
    location: "Choba, Port Harcourt, Rivers State",
    abbreviation: "UNIPORT",
    description: "UNIPORT is renowned for its academic excellence in engineering, petroleum sciences, medicine, and social sciences, serving as a hub for Niger Delta intellectual leadership.",
    cutOffMark: 180,
    facultiesCount: 11,
    tuitionRange: "₦110,000 - ₦175,000 / year",
    accommodation: "Available (Nelson Mandela, King Jaja & Goodluck Jonathan Halls)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMyeUyYKVTTNCkGH_iyntqN3buhPyCrnrhe2TzSG7xzrAAZNKEUkY4BIAUh8s-iU_P_xIHDS_8D-AFgIi8QNDsMoo0NCfj7DdFBOPuutyRrqufq2jdVXAdnt0JCYlZ1ybFZ3l2PaoEPoZb8odq2e1ZaBOTA9riyPT-vbA6GA9wJH_rQ9R-D1ypJmWvE8faPD9_GAwkRR6N2Bry-PgRdO2lzxVepi3j2tK_VCsfB3WbwsHmcrK8zJdsmBwWnihFIEQIIPLpRYMi8YXs",
    website: "https://uniport.edu.ng",
    accreditation: "Fully Accredited by NUC",
    featured: true,
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMyeUyYKVTTNCkGH_iyntqN3buhPyCrnrhe2TzSG7xzrAAZNKEUkY4BIAUh8s-iU_P_xIHDS_8D-AFgIi8QNDsMoo0NCfj7DdFBOPuutyRrqufq2jdVXAdnt0JCYlZ1ybFZ3l2PaoEPoZb8odq2e1ZaBOTA9riyPT-vbA6GA9wJH_rQ9R-D1ypJmWvE8faPD9_GAwkRR6N2Bry-PgRdO2lzxVepi3j2tK_VCsfB3WbwsHmcrK8zJdsmBwWnihFIEQIIPLpRYMi8YXs",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
    ],
    notableAlumni: ["Goodluck Jonathan", "Rita Dominic", "Agbani Darego", "Burna Boy"],
    requirements: {
      generalCutOff: 180,
      medicineCutOff: 290,
      lawCutOff: 270,
      engineeringCutOff: 250,
      postUtmeRequired: true,
      postUtmeFormat: "CBT Screening based on UTME Subject Combination"
    }
  },
  {
    id: "oau",
    name: "Obafemi Awolowo University",
    type: "Federal",
    location: "Ile-Ife, Osun State",
    abbreviation: "OAU",
    description: "Known as 'Great Ife', OAU is celebrated as Africa's most beautiful campus, delivering top-tier education in pharmacy, law, arts, technology, and natural sciences.",
    cutOffMark: 200,
    facultiesCount: 13,
    tuitionRange: "₦90,000 - ₦160,000 / year",
    accommodation: "Available (Angola, Mozambique, Moremi & Awolowo Halls)",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
    website: "https://oauife.edu.ng",
    accreditation: "Fully Accredited by NUC",
    featured: false,
    gallery: ["https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80"],
    notableAlumni: ["Femi Adesina", "Lagbaja", "Dele Momodu", "Steph-Nora Okere"],
    requirements: {
      generalCutOff: 200,
      medicineCutOff: 305,
      lawCutOff: 290,
      engineeringCutOff: 265,
      postUtmeRequired: true,
      postUtmeFormat: "Intensive CBT screening + 50% UTME Score + 50% Post-UTME"
    }
  },
  {
    id: "ui",
    name: "University of Ibadan",
    type: "Federal",
    location: "Ibadan, Oyo State",
    abbreviation: "UI",
    description: "Nigeria's premier university founded in 1948. Consistently ranked among Africa's elite institutions for postgraduate research, medicine, arts, and agricultural sciences.",
    cutOffMark: 200,
    facultiesCount: 17,
    tuitionRange: "₦115,000 - ₦185,000 / year",
    accommodation: "Available (Mellanby, Tedder, Kuti & Queen Elizabeth II Halls)",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    website: "https://ui.edu.ng",
    accreditation: "Fully Accredited by NUC",
    featured: false,
    gallery: ["https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"],
    notableAlumni: ["Wole Soyinka", "Chinua Achebe", "Ken Saro-Wiwa", "J.P. Clark"],
    requirements: {
      generalCutOff: 200,
      medicineCutOff: 320,
      lawCutOff: 300,
      engineeringCutOff: 270,
      postUtmeRequired: true,
      postUtmeFormat: "Subject-based written exam (High competitiveness)"
    }
  },
  {
    id: "cov",
    name: "Covenant University",
    type: "Private",
    location: "Ota, Ogun State",
    abbreviation: "CU",
    description: "A leading private Christian university in Africa, world-renowned for entrepreneurship, computing, discipline, and ultra-modern research infrastructure.",
    cutOffMark: 180,
    facultiesCount: 4,
    tuitionRange: "₦1,500,000 - ₦2,800,000 / year",
    accommodation: "Mandatory On-Campus Residential Facilities",
    imageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
    website: "https://covenantuniversity.edu.ng",
    accreditation: "Fully Accredited by NUC",
    featured: false,
    gallery: ["https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80"],
    notableAlumni: ["Spellz", "Simi", "Bebi Philip", "Gideon Okeke"],
    requirements: {
      generalCutOff: 180,
      medicineCutOff: 260,
      engineeringCutOff: 230,
      postUtmeRequired: true,
      postUtmeFormat: "CUSAS Screening (Computer Aptitude & Oral Interview)"
    }
  },
  {
    id: "lasu",
    name: "Lagos State University",
    type: "State",
    location: "Ojo, Lagos State",
    abbreviation: "LASU",
    description: "One of Nigeria's fastest-growing and highest-ranked state universities, providing dynamic training in law, management sciences, and communication.",
    cutOffMark: 195,
    facultiesCount: 9,
    tuitionRange: "₦113,000 - ₦168,000 / year",
    accommodation: "Off-campus & Private Student Hostels available",
    imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80",
    website: "https://lasu.edu.ng",
    accreditation: "Fully Accredited by NUC",
    featured: false,
    gallery: ["https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"],
    notableAlumni: ["Babajide Sanwo-Olu", "Yinka Quadri", "Desmond Elliot", "Angela Okorie"],
    requirements: {
      generalCutOff: 195,
      medicineCutOff: 280,
      lawCutOff: 275,
      postUtmeRequired: true,
      postUtmeFormat: "Online O'Level Screening & UTME Aggregate Calculation"
    }
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: "Career Discovery",
    shortDesc: "Identify your passion, strengths, and best-fit academic paths.",
    timeline: "October - November (Pre-Exam Year)",
    icon: "explore",
    fullDesc: "Before choosing a course or buying JAMB forms, take time to analyze your academic strengths, personality type, and career aspirations. Research emerging job markets in Nigeria and globally.",
    checklist: [
      { id: "c1", text: "Take a personality & career aptitude self-assessment", completed: false },
      { id: "c2", text: "Check O-Level subject requirements for your dream career", completed: false },
      { id: "c3", text: "Discuss career prospects with mentors or guidance counselors", completed: false }
    ],
    tips: [
      "Avoid choosing courses solely because of peer pressure.",
      "Ensure your O-Level subjects align with your target course requirements."
    ]
  },
  {
    id: 2,
    title: "Choose Course",
    shortDesc: "Verify UTME subject combinations and O-Level credit rules.",
    timeline: "November - December",
    icon: "school",
    fullDesc: "Use the official JAMB Brochure to verify the exact 4 UTME subjects required for your chosen course. Many students lose admissions due to incorrect subject combinations!",
    checklist: [
      { id: "c4", text: "Verify the 4 UTME subjects for your intended course in JAMB Brochure", completed: false },
      { id: "c5", text: "Check special faculty waivers or O'Level grade stipulations", completed: false },
      { id: "c6", text: "Identify at least 2 backup / related courses with similar subjects", completed: false }
    ],
    tips: [
      "Use of English is mandatory for ALL courses in JAMB UTME.",
      "For Computer Science, Mathematics and Physics are compulsory."
    ]
  },
  {
    id: 3,
    title: "Select Varsity",
    shortDesc: "Compare federal, state, and private institutions and tuition.",
    timeline: "December - January",
    icon: "account_balance",
    fullDesc: "Research universities offering your course. Compare their annual cut-off marks, location, tuition fees, accreditation status, and academic calendar stability.",
    checklist: [
      { id: "c7", text: "Select 1st Choice (Federal / State University)", completed: false },
      { id: "c8", text: "Select 2nd Choice (State / Private University / Polytechnic)", completed: false },
      { id: "c9", text: "Check the university's average UTME cut-off mark for your course", completed: false }
    ],
    tips: [
      "Most top federal universities (UNILAG, UI, UNIPORT, OAU) only accept candidates who chose them as 1st choice.",
      "Consider accommodation costs and campus proximity when deciding."
    ]
  },
  {
    id: 4,
    title: "Registration",
    shortDesc: "NIN linking, Profile Code generation, and CBT center enrollment.",
    timeline: "January - February",
    icon: "assignment",
    fullDesc: "Official JAMB registration phase. You must obtain your National Identification Number (NIN) from NIMC before creating your JAMB profile code via SMS/USSD.",
    checklist: [
      { id: "c10", text: "Ensure your NIN details (Name, Date of Birth) match your school certificates exactly", completed: false },
      { id: "c11", text: "Send 'NIN 01234567890' to 55019 or 66019 to generate Profile Code", completed: false },
      { id: "c12", text: "Purchase JAMB e-PIN from accredited banks or online vendors", completed: false },
      { id: "c13", text: "Complete biometric capture at an accredited JAMB CBT registration center", completed: false }
    ],
    tips: [
      "Never register at cybercafes that are not accredited JAMB CBT centers.",
      "Safeguard your profile code, e-PIN, and login credentials."
    ]
  },
  {
    id: 5,
    title: "Preparation",
    shortDesc: "Study official syllabus, practice past questions, and master CBT.",
    timeline: "February - April",
    icon: "psychology",
    fullDesc: "Intensive exam preparation. Focus on the JAMB official syllabus for your 4 subjects. Master time management using Computer-Based Test (CBT) practice software.",
    checklist: [
      { id: "c14", text: "Download official JAMB syllabus for your 4 subjects", completed: false },
      { id: "c15", text: "Read the compulsory JAMB reading text (novel) for Use of English", completed: false },
      { id: "c16", text: "Complete at least 15 full timed CBT practice exams in our Study Hub", completed: false }
    ],
    tips: [
      "You have 2 hours to answer 180 questions (60 in English, 40 in each of the other 3 subjects). Speed is crucial!",
      "Review explanations for every mistake you make during practice."
    ]
  },
  {
    id: 6,
    title: "UTME Exam",
    shortDesc: "Print slip, locate CBT center, and take the examination.",
    timeline: "April (Exam Week)",
    icon: "computer",
    fullDesc: "Print your JAMB examination slip 1 week before the exam to know your exact CBT date, time, and center location. Arrive at least 1 hour early on exam day.",
    checklist: [
      { id: "c17", text: "Print 2 color copies of your JAMB Examination Notification Slip", completed: false },
      { id: "c18", text: "Locate your CBT center physically 1 or 2 days before the exam", completed: false },
      { id: "c19", text: "Arrive at the exam venue by 6:30 AM with your slip and valid ID", completed: false }
    ],
    tips: [
      "Do not bring wristwatches, phones, calculators, or smart glasses into the exam hall.",
      "Use the keyboard shortcuts: A, B, C, D to choose options, N for Next, P for Previous, R to submit."
    ]
  },
  {
    id: 7,
    title: "Result Check",
    shortDesc: "Check UTME score via SMS/portal and upload O-Level results.",
    timeline: "May - June",
    icon: "fact_check",
    fullDesc: "Once results are released by JAMB, check your score via SMS or portal. Crucially, upload your WAEC/NECO O-Level results to JAMB CAPS (Central Admissions Processing System).",
    checklist: [
      { id: "c20", text: "Send 'RESULT' to 55019 or 66019 from your registered phone number", completed: false },
      { id: "c21", text: "Print your Original JAMB Result Slip with passport photograph", completed: false },
      { id: "c22", text: "Visit an accredited CBT center to UPLOAD your WAEC/NECO results to JAMB CAPS", completed: false },
      { id: "c23", text: "Consider Change of Course/Institution if your score is below your target cut-off", completed: false }
    ],
    tips: [
      "No university can admit you if your O-Level results are not uploaded and reflecting on JAMB CAPS!",
      "Do not pay money to scammers claiming they can 'upgrade' your JAMB score."
    ]
  },
  {
    id: 8,
    title: "Admission",
    shortDesc: "Post-UTME screening, CAPS monitoring, and acceptance fee.",
    timeline: "July - December",
    icon: "verified",
    fullDesc: "Register and participate in your university's Post-UTME screening or aptitude test. Monitor your JAMB CAPS portal regularly to accept your admission offer when offered.",
    checklist: [
      { id: "c24", text: "Register and sit for your university's Post-UTME screening", completed: false },
      { id: "c25", text: "Log into JAMB CAPS weekly to check admission status", completed: false },
      { id: "c26", text: "Click 'ACCEPT' on JAMB CAPS when admission is offered", completed: false },
      { id: "c27", text: "Print JAMB Admission Letter and pay university acceptance fee", completed: false }
    ],
    tips: [
      "If offered admission on CAPS, you must accept it within the stipulated deadline or risk losing the slot.",
      "Congratulations! Welcome to university!"
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    category: "JAMB UPDATES",
    title: "JAMB Sets Cut-off Mark for 2026/2027 Admissions",
    excerpt: "The Joint Admissions and Matriculation Board has announced the official cut-off marks for various institutions across Nigeria following the policy meeting...",
    fullContent: [
      "The Joint Admissions and Matriculation Board (JAMB) has officially announced the minimum benchmark cut-off marks for admissions into Nigerian tertiary institutions for the 2026/2027 academic session.",
      "Following a high-level stakeholder policy meeting presided over by the Minister of Education and the Registrar of JAMB, the national minimum benchmark for universities was fixed at 140, while polytechnics and colleges of education were fixed at 100.",
      "However, individual institutions retain the autonomy to raise their specific cut-off marks higher than the national minimum. For instance, top federal universities such as the University of Lagos (UNILAG), University of Ibadan (UI), and University of Port Harcourt (UNIPORT) have maintained a general cut-off mark of 200 and above for degree programs.",
      "Highly competitive professional courses including Medicine and Surgery, Law, and Computer Science require significantly higher UTME scores ranging from 260 to 310 depending on the institution's departmental merit list.",
      "Candidates are strongly advised to check their respective university portals for departmental cut-off marks and ensure their WAEC/NECO O-Level results are promptly uploaded to JAMB CAPS."
    ],
    date: "2 hours ago",
    readTime: "5 min read",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm50yQGjQq3T5BFFP1CyUsAjViI7OufPHrK6Ea9BGOmKSCkVUlj5_jZD1JA6vemYo9jSN6TA2CukKpPngPqNFXSKDNeGVYhPHvP8WF3i3Ar55f1u8M2gILbBf1K8NENg89WFOw1jQZ61ATQuC0JYFUxmjfj9QZot49j649zPzzMrwiPFXyAsXoo_oeOTF0f-9HC0LnDC11uLuQQFC7r5jKy8vLm61Mf4bk7aDikQl5_d4UArqGM-1HW0FarXWeHN9LcqLgUi34U-ju",
    featured: true,
    author: "Dr. Kemi Ogunlesi (Education Editor)"
  },
  {
    id: "news-2",
    category: "EXAM PREP",
    title: "Top 10 Study Tips for UTME Success",
    excerpt: "Securing a high score requires more than just reading. Learn these strategic preparation methods used by top scorers who achieved 300+ in recent exams...",
    fullContent: [
      "Achieving a score of 300 and above in the Unified Tertiary Matriculation Examination (UTME) is the dream of every ambitious student. While hard work is essential, strategic preparation is what separates top scorers from average candidates.",
      "1. Master the Official JAMB Syllabus: Never study blindly. JAMB sets questions strictly from its published syllabus. Outline the topics for your 4 subjects and check them off as you study.",
      "2. Practice Timed CBT Mock Tests Daily: Time management is the number one hurdle in UTME. You have 120 minutes for 180 questions—giving you roughly 40 seconds per question. Regularly practicing with timed CBT software trains your brain to think quickly.",
      "3. Read and Re-read the Compulsory Literature Novel: For Use of English, the prescribed reading text accounts for a significant portion of marks. Read it at least three times and note key character quotes and plot twists.",
      "4. Analyze Past Question Trends (Last 10 Years): JAMB frequently rephrases or adapts concepts from previous years. Don't just memorize answers; understand the underlying principles.",
      "5. Avoid Examination Malpractice & Rumors: Stay focused on your books. Relying on leaked questions ('expo') invariably leads to canceled results and heartbreak."
    ],
    date: "Yesterday",
    readTime: "8 min read",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw5-Glpcn-wB8DJbt9XfpvPI-4-UjqqAAc-jr4hbP3LT7vu8L00VeFTcH-6eJpg6tgyB5jstGtT7eCrwOAJgQekfI720QC9ynNhHfeCqSjtciTAb-PuPzeXRFTxz8DrUx52d_ixUVxtcTpbwIDmFGi7-xrLFW609C02iWzYbUyGDSJvGv_Rf4829MdTitTXOxDzqAAgpnX1sYY6uH_S9nzlZttvnFLlXhxI7qgO1FJgZ15J23j6o0DCUyWYB1HUo_eZblIzw56rJCj",
    featured: true,
    author: "Emmanuel Okafor (CBT Master Trainer)"
  },
  {
    id: "news-3",
    category: "ADMISSION",
    title: "Direct Entry Registration: What You Need to Know",
    excerpt: "The board has updated the portal for direct entry candidates. Here is a comprehensive guide on the new requirements, diploma verifications, and deadlines...",
    fullContent: [
      "The Joint Admissions and Matriculation Board (JAMB) has commenced the sale and registration of Direct Entry (DE) forms for candidates seeking admission directly into 200 Level in Nigerian universities.",
      "Who is Eligible? Candidates possessing advanced qualifications such as National Diploma (ND), Higher National Diploma (HND), NCE, IJMB, JUPEB, or A-Level certificates with acceptable grades are eligible to apply.",
      "New Mandatory Verification Rule: To curb fraudulent certificate submissions, JAMB has instituted mandatory verification of all A-Level diplomas directly with the awarding institutions. Candidates must ensure their institutions upload their transcripts to the JAMB verification portal.",
      "Important Action Items:",
      "• Registration can ONLY be performed at JAMB Professional Test Centres (PTC) or state offices.",
      "• Candidates must link their NIN and present original copies of their certificates during biometric capture.",
      "• Always check that your choice university accepts your specific diploma type for your intended course."
    ],
    date: "May 15",
    readTime: "6 min read",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1bgtoj2lBrmQ36mzRT0rpik8XHkEK4fzBYBp6ptMNYHS_4AxuY9XTD6AM8VjV3vSM_AV4Jlt2WKtEbod7P5zY8m6x90uMjVc8Dia07GkVDFMp0fF-7aYstu9jiSrkARZWzBzsGrUKGQTXE2gVt7IWpOmbpG0kKtSxUVVGdJOJl4VzcvD4oh7Mpv20GAvP6Yvc5HzU7lrDYQMDVU9QeJA5F6p3ys2wLhxvS78iUwbWR6DwsifwrAT80d_5J11cE2ygkip4H2nOdA5-",
    featured: true,
    author: "Amina Yusuf (Admissions Consultant)"
  },
  {
    id: "news-4",
    category: "CAPS ALERT",
    title: "Why You Must Check Your O-Level Upload Status on JAMB CAPS",
    excerpt: "Over 40,000 candidates miss admission yearly simply because their WAEC/NECO results were not properly synced with JAMB CAPS. See how to verify today...",
    fullContent: [
      "One of the most tragic occurrences in Nigerian university admissions is when a student scores high in UTME and Post-UTME but fails to gain admission due to missing O-Level results on JAMB CAPS.",
      "Why does this happen? Many candidates register for JAMB using 'Awaiting Result' (AR). When their WAEC or NECO results are eventually released, they assume the results will automatically link to JAMB. This is false!",
      "You MUST physically visit an accredited JAMB CBT center or JAMB state office to perform what is called 'O-Level Upload'.",
      "How to verify if your results are uploaded:",
      "1. Log into your JAMB e-Facility profile at efacility.jamb.gov.ng.",
      "2. Click on 'Check Admission Status' and access 'JAMB CAPS'.",
      "3. On the left navigation menu, click on 'My O'Level'.",
      "4. If you see your grades displayed clearly (e.g., ENG A1, MATH B2), your upload is successful. If it appears blank or shows 'Awaiting Result', go immediately to a CBT center to re-upload!"
    ],
    date: "3 days ago",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    featured: false,
    author: "JAMB Public Relations Directorate"
  }
];

export const CBT_QUESTIONS: CbtQuestion[] = [
  // English
  {
    id: "eng-1",
    subject: "English",
    question: "Choose the option that is NEAREST in meaning to the capitalized word: The Principal was skeptical about the student's ALIBI.",
    options: ["Excuse or proof of absence", "Apology for misconduct", "Declaration of defiance", "Promise of improvement"],
    correctIndex: 0,
    explanation: "An 'alibi' is a claim or piece of evidence that one was elsewhere when an act, typically a criminal one, is alleged to have taken place."
  },
  {
    id: "eng-2",
    subject: "English",
    question: "Select the option that best completes the sentence: The team leader insisted that every member _______ the mandatory orientation.",
    options: ["attend", "attends", "attended", "must attend"],
    correctIndex: 0,
    explanation: "After verbs expressing demand, suggestion, or insistence (like 'insisted that'), subjunctive mood is used, requiring the base form of the verb without 's' ('attend')."
  },
  {
    id: "eng-3",
    subject: "English",
    question: "Identify the figure of speech in the statement: 'The silence in the examination hall was deafening.'",
    options: ["Oxymoron", "Hyperbole", "Personification", "Simile"],
    correctIndex: 0,
    explanation: "An oxymoron combines two contradictory terms ('silence' and 'deafening') for dramatic rhetorical effect."
  },
  // Mathematics
  {
    id: "math-1",
    subject: "Mathematics",
    question: "If log₁₀2 = 0.3010 and log₁₀3 = 0.4771, evaluate log₁₀12.",
    options: ["1.0791", "1.2552", "0.7781", "1.4771"],
    correctIndex: 0,
    explanation: "log₁₀12 = log₁₀(4 × 3) = log₁₀(2² × 3) = 2 log₁₀2 + log₁₀3 = 2(0.3010) + 0.4771 = 0.6020 + 0.4771 = 1.0791."
  },
  {
    id: "math-2",
    subject: "Mathematics",
    question: "Find the sum of the first 20 terms of the arithmetic progression (A.P.): 3, 7, 11, 15, ...",
    options: ["820", "780", "860", "900"],
    correctIndex: 0,
    explanation: "Here, first term a = 3, common difference d = 4, n = 20. Sum Sₙ = n/2 [2a + (n-1)d] = 20/2 [2(3) + 19(4)] = 10 [6 + 76] = 10 × 82 = 820."
  },
  {
    id: "math-3",
    subject: "Mathematics",
    question: "A matrix P has eigenvalues 4 and -2. What is the determinant of matrix P?",
    options: ["-8", "2", "6", "8"],
    correctIndex: 0,
    explanation: "The determinant of any square matrix is equal to the product of its eigenvalues. Det(P) = 4 × (-2) = -8."
  },
  // Physics
  {
    id: "phy-1",
    subject: "Physics",
    question: "A stone of mass 2 kg is projected vertically upwards with an initial velocity of 20 m/s. Calculate the maximum height reached. (Take g = 10 m/s²)",
    options: ["20 m", "10 m", "40 m", "15 m"],
    correctIndex: 0,
    explanation: "At maximum height, final velocity v = 0. Using v² = u² - 2gh => 0 = 20² - 2(10)h => 400 = 20h => h = 20 meters."
  },
  {
    id: "phy-2",
    subject: "Physics",
    question: "Which of the following electromagnetic waves has the shortest wavelength and highest frequency?",
    options: ["Gamma rays", "X-rays", "Ultraviolet radiation", "Radio waves"],
    correctIndex: 0,
    explanation: "Gamma rays reside at the extreme high-frequency end of the electromagnetic spectrum, possessing the shortest wavelengths and greatest photon energy."
  },
  // Chemistry
  {
    id: "chem-1",
    subject: "Chemistry",
    question: "What is the IUPAC name for the organic compound CH₃-CH(OH)-CH₃?",
    options: ["Propan-2-ol", "Propan-1-ol", "Propanone", "Methoxyethane"],
    correctIndex: 0,
    explanation: "The chain consists of 3 carbons (propane) with a hydroxyl (-OH) functional group attached to the second carbon atom, making it Propan-2-ol (isopropyl alcohol)."
  },
  {
    id: "chem-2",
    subject: "Chemistry",
    question: "Which of the following gases turns acidified potassium dichromate(VI) solution from orange to green?",
    options: ["Sulphur(IV) oxide (SO₂)", "Carbon(IV) oxide (CO₂)", "Oxygen (O₂)", "Nitrogen (N₂)"],
    correctIndex: 0,
    explanation: "Sulphur(IV) oxide is a strong reducing agent that reduces orange dichromate(VI) ions (Cr₂O₇²⁻) to green chromium(III) ions (Cr³⁺)."
  },
  // Biology
  {
    id: "bio-1",
    subject: "Biology",
    question: "Which cell organelle is primarily responsible for the production of adenosine triphosphate (ATP) during cellular respiration?",
    options: ["Mitochondrion", "Ribosome", "Golgi apparatus", "Endoplasmic reticulum"],
    correctIndex: 0,
    explanation: "The mitochondrion is known as the powerhouse of the cell because it generates most of the chemical energy needed to power biochemical reactions in the form of ATP."
  },
  {
    id: "bio-2",
    subject: "Biology",
    question: "In human genetics, if a man with blood group AB marries a woman with blood group O, what are the possible blood groups of their offspring?",
    options: ["Group A and Group B only", "Group AB and Group O only", "Group A, Group B, and Group AB", "Group O only"],
    correctIndex: 0,
    explanation: "The man contributes alleles A or B, while the woman contributes allele O (recessive). Therefore, offspring genotype can only be AO (Blood group A) or BO (Blood group B)."
  }
];
