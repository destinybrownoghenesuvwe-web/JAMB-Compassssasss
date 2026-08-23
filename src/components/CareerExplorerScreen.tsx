import React, { useState } from 'react';
import { TabType, Career, CareerCategory } from '../types';

interface CareerExplorerScreenProps {
  setActiveTab: (tab: TabType) => void;
  onSelectCourseName?: (courseName: string) => void;
}

export const CareerExplorerScreen: React.FC<CareerExplorerScreenProps> = ({
  setActiveTab,
  onSelectCourseName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CareerCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareerModal, setSelectedCareerModal] = useState<Career | null>(null);
  
  // Active career for the interactive pathway section (defaults to Software Developer)
  const [pathwayCareerId, setPathwayCareerId] = useState<string>('soft-dev');

  // Master Careers Dataset (12 Detailed Careers)
  const careersData: Career[] = [
    {
      id: 'doctor',
      title: 'Medical Doctor',
      category: 'Medical',
      shortDesc: 'Diagnose diseases, prescribe medical treatments, and perform clinical procedures to preserve health.',
      duration: '6 Years Degree',
      relatedCourse: 'Medicine & Surgery (MBBS)',
      icon: 'medical_services',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      overview: 'Medical Doctors evaluate patient symptoms, perform physical examinations, order diagnostic tests, prescribe medications, and manage acute and chronic medical conditions in hospitals, clinics, or private practice.',
      responsibilities: [
        'Examine patients and record clinical medical histories',
        'Order and interpret laboratory tests, X-rays, and diagnostic scans',
        'Prescribe medications, therapies, and preventive healthcare plans',
        'Perform surgical or non-invasive clinical procedures',
        'Collaborate with healthcare teams including nurses and specialists',
      ],
      skillsRequired: ['Clinical Diagnosis', 'Patient Empathy', 'Critical Decision Making', 'Pharmacology', 'Problem Solving'],
      workEnvironment: 'Teaching Hospitals, General Medical Centres, Private Clinics, Research Institutes, Public Health Agencies.',
      careerOpportunities: ['Consultant Specialist', 'General Practitioner (GP)', 'Surgical Resident', 'Clinical Researcher', 'Hospital Administrator'],
      utmeSubjects: ['Use of English', 'Biology', 'Chemistry', 'Physics'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
      growthOpportunities: 'High global demand. Opportunities for residency specialization, clinical research fellowships, and medical healthcare leadership.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Biology, Chemistry, Physics. UTME Target: 280+", icon: "edit_note" },
        { step: "University Admissions", description: "6-Year MBBS Degree in an accredited Nigerian Medical School.", icon: "school" },
        { step: "Housemanship", description: "1-Year mandatory clinical internship in a recognized teaching hospital.", icon: "clinical_notes" },
        { step: "NYSC & MDCN", description: "Mandatory Youth Service & full registration with Medical and Dental Council of Nigeria.", icon: "verified" },
        { step: "Specialization / Residency", description: "Postgraduate fellowship training in Surgery, Pediatrics, Cardiology, or Public Health.", icon: "workspace_premium" },
      ]
    },
    {
      id: 'soft-dev',
      title: 'Software Developer',
      category: 'Technology',
      shortDesc: 'Architect, code, test, and maintain digital applications, web services, and enterprise software platforms.',
      duration: '4 Years Degree',
      relatedCourse: 'Computer Science / Software Engineering',
      icon: 'terminal',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      overview: 'Software Developers use programming languages, cloud frameworks, and database architectures to build web, mobile, and desktop applications that solve complex problems for businesses and users.',
      responsibilities: [
        'Write clean, efficient, and well-documented backend and frontend code',
        'Design scalable database schemas and integration APIs',
        'Debug system bugs, perform unit testing, and optimize application performance',
        'Collaborate with UI/UX designers, product managers, and devops engineers',
        'Deploy updates to cloud platforms using continuous integration tools',
      ],
      skillsRequired: ['TypeScript / JavaScript', 'Python / Java', 'Database Management', 'Data Structures & Algorithms', 'Git & CI/CD'],
      workEnvironment: 'Tech Hubs, Remote Work Environments, Software Consultancies, Financial Institutions, Startups.',
      careerOpportunities: ['Full-Stack Developer', 'Mobile App Engineer', 'Backend Architect', 'DevOps Specialist', 'CTO / Tech Lead'],
      utmeSubjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Further Mathematics or Biology'],
      growthOpportunities: 'Rapid exponential growth driven by the digital economy, fintech expansion, and remote global employment.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Physics, Chemistry. UTME Target: 250+", icon: "edit_note" },
        { step: "University Admission", description: "4-Year B.Sc in Computer Science, Software Engineering, or Computer Engineering.", icon: "school" },
        { step: "Practical Portfolio", description: "Build real-world open-source projects, web apps, and complete developer internships.", icon: "code" },
        { step: "Graduation & NYSC", description: "Graduate with honors and gain IT experience during youth service year.", icon: "workspace_premium" },
        { step: "Professional Career", description: "Join tech firms as Junior Developer, progressing to Senior Engineer or Tech Founder.", icon: "rocket_launch" },
      ]
    },
    {
      id: 'lawyer',
      title: 'Lawyer / Legal Practitioner',
      category: 'Law',
      shortDesc: 'Provide legal counsel, advocate for clients in courts of law, and draft legal instruments and commercial contracts.',
      duration: '5 Years Degree',
      relatedCourse: 'Law (LL.B)',
      icon: 'gavel',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      overview: 'Lawyers research constitutional law, statutory regulations, legal precedents, and advocate on behalf of individuals, corporations, or government bodies in civil, criminal, and corporate matters.',
      responsibilities: [
        'Represent clients in court litigation, tribunals, and alternative dispute resolution',
        'Draft contracts, legal opinions, corporate agreements, and wills',
        'Advise businesses on regulatory compliance and statutory obligations',
        'Conduct legal research into past judicial precedents and statutes',
        'Negotiate legal settlements and commercial deals',
      ],
      skillsRequired: ['Legal Advocacy', 'Analytical Reasoning', 'Contract Drafting', 'Public Speaking', 'Critical Negotiation'],
      workEnvironment: 'Law Firms, Corporate Headquarters, Courtrooms, Government Ministries, NGO Human Rights Agencies.',
      careerOpportunities: ['Barrister at Law', 'Corporate Counsel', 'Senior Advocate of Nigeria (SAN)', 'Magistrate / Judge', 'Legal Analyst'],
      utmeSubjects: ['Use of English', 'Literature in English', 'Government or History', 'CRS / IRS or Economics'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Literature in English', 'Government', 'CRS / IRS / Economics'],
      growthOpportunities: 'Steady long-term career progression with pathways to Law Firm Partnership, Corporate Directorship, or Judicial Appointment.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Literature, Government. UTME Target: 270+", icon: "edit_note" },
        { step: "LL.B Law Degree", description: "5-Year LL.B program in an accredited Faculty of Law.", icon: "school" },
        { step: "Nigerian Law School", description: "1-Year Bar Final vocational course at the Nigerian Law School.", icon: "gavel" },
        { step: "Call to Bar", description: "Formal admission to the Nigerian Bar as Barrister and Solicitor of the Supreme Court.", icon: "verified" },
        { step: "Legal Practice", description: "Pupilage at a reputable Law Firm or in-house legal department.", icon: "work" },
      ]
    },
    {
      id: 'architect',
      title: 'Architect',
      category: 'Engineering',
      shortDesc: 'Design aesthetic, functional, and structurally sound buildings, urban centers, and physical spaces.',
      duration: '5 Years Degree',
      relatedCourse: 'Architecture',
      icon: 'architecture',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      overview: 'Architects blend artistic creativity with structural engineering principles to create detailed architectural plans, 3D BIM models, and oversee building construction to ensure environmental sustainability and safety.',
      responsibilities: [
        'Develop conceptual building layouts, 3D renderings, and master plans',
        'Use CAD and BIM software (Revit, AutoCAD, SketchUp) to create technical drawings',
        'Ensure building plans comply with spatial codes, zoning laws, and safety regulations',
        'Inspect construction sites to verify compliance with architectural specifications',
        'Collaborate with structural engineers, quantity surveyors, and project managers',
      ],
      skillsRequired: ['Architectural Drawing', '3D BIM Software', 'Spatial Awareness', 'Structural Understanding', 'Creative Design'],
      workEnvironment: 'Architectural Studios, Property Development Firms, Construction Sites, Municipal Planning Boards.',
      careerOpportunities: ['Chartered Architect', 'Urban Planner', 'Interior Architect', 'BIM Manager', 'Construction Director'],
      utmeSubjects: ['Use of English', 'Mathematics', 'Physics', 'Fine Art or Chemistry or Geography'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Fine Art or Technical Drawing'],
      growthOpportunities: 'High growth driven by urbanization, real estate expansion, smart city initiatives, and sustainable eco-building design.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Physics, Chemistry, Tech Drawing. UTME Target: 240+", icon: "edit_note" },
        { step: "B.Sc Architecture", description: "4 to 5-Year University Architecture Degree.", icon: "school" },
        { step: "M.Sc Architecture", description: "Master of Science in Architecture for professional competence.", icon: "workspace_premium" },
        { step: "ARCON Registration", description: "Professional competency examination and registration with Architects Registration Council of Nigeria.", icon: "verified" },
        { step: "Architectural Practice", description: "Lead architectural projects or establish an independent design studio.", icon: "domain" },
      ]
    },
    {
      id: 'accountant',
      title: 'Chartered Accountant',
      category: 'Business',
      shortDesc: 'Manage organizational financial statements, perform auditing, ensure tax compliance, and guide investment decisions.',
      duration: '4 Years Degree',
      relatedCourse: 'Accounting / Finance',
      icon: 'calculate',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      overview: 'Accountants prepare accurate financial reports, conduct internal or independent audits, optimize tax liability, and advise executive leadership on corporate financial strategy and risk management.',
      responsibilities: [
        'Prepare balance sheets, income statements, and monthly cash flow reports',
        'Conduct internal financial audits to detect errors, fraud, or inefficiencies',
        'Ensure corporate tax compliance with Federal and State Inland Revenue services',
        'Implement financial accounting software and internal control systems',
        'Provide cost benefit analysis for strategic company investments',
      ],
      skillsRequired: ['Financial Accounting', 'Auditing', 'Taxation Law', 'Excel & ERP Systems', 'Quantitative Analysis'],
      workEnvironment: 'Big Four Accounting Firms, Commercial Banks, Corporate Conglomerates, Government Agencies, Tax Consultancies.',
      careerOpportunities: ['Audit Manager', 'Chief Financial Officer (CFO)', 'Tax Consultant', 'Forensic Accountant', 'Financial Controller'],
      utmeSubjects: ['Use of English', 'Mathematics', 'Economics', 'Government or Commerce'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Economics', 'Commerce or Financial Accounting', 'Government'],
      growthOpportunities: 'Essential role in every sector. Rapid advancement for candidates with ICAN or ACCA professional certifications.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Economics, Accounting. UTME Target: 230+", icon: "edit_note" },
        { step: "University Degree", description: "4-Year B.Sc in Accounting or Finance.", icon: "school" },
        { step: "ICAN / ACCA Exams", description: "Write professional ICAN (Institute of Chartered Accountants of Nigeria) or ACCA examinations.", icon: "verified" },
        { step: "Professional Audit", description: "Gain practical auditing experience in a chartered accounting firm.", icon: "business_center" },
        { step: "Executive Leader", description: "Advance to Financial Controller, Audit Partner, or Chief Financial Officer.", icon: "trending_up" },
      ]
    },
    {
      id: 'civil-eng',
      title: 'Civil Engineer',
      category: 'Engineering',
      shortDesc: 'Plan, design, and supervise the construction of bridges, highways, dams, airports, and structural infrastructure.',
      duration: '5 Years Degree',
      relatedCourse: 'Civil Engineering',
      icon: 'engineering',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
      overview: 'Civil Engineers analyze soil mechanics, structural loads, fluid mechanics, and environmental impact to design enduring infrastructure essential for commerce and modern society.',
      responsibilities: [
        'Calculate structural load-bearing requirements and stress thresholds',
        'Analyze soil reports, topographical survey maps, and environmental impact data',
        'Oversee concrete testing, steel reinforcement, and site safety management',
        'Manage construction budgets, project schedules, and contractor workflows',
        'Ensure infrastructure meets national building codes and safety standards',
      ],
      skillsRequired: ['Structural Calculation', 'AutoCAD Civil 3D', 'Project Management', 'Geotechnical Engineering', 'Concrete Mechanics'],
      workEnvironment: 'Engineering Consultancies, Construction Sites, Infrastructure Authorities, Ministry of Works.',
      careerOpportunities: ['Structural Engineer', 'Geotechnical Specialist', 'Site Resident Engineer', 'Project Manager', 'Water Resources Engineer'],
      utmeSubjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Further Mathematics or Geography'],
      growthOpportunities: 'High national demand for infrastructure development, highway expansion, urban renewal, and real estate engineering.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Physics, Chemistry. UTME Target: 245+", icon: "edit_note" },
        { step: "B.Eng Degree", description: "5-Year Civil Engineering degree at an accredited Faculty of Engineering.", icon: "school" },
        { step: "NSE & COREN", description: "Join Nigerian Society of Engineers & obtain COREN professional practicing license.", icon: "verified" },
        { step: "Site Engineering", description: "Supervise major structural construction projects and civil works.", icon: "construction" },
        { step: "Engineering Consultant", description: "Lead multi-billion naira infrastructure master plans or establish a consulting firm.", icon: "domain" },
      ]
    },
    {
      id: 'nurse',
      title: 'Registered Nurse',
      category: 'Medical',
      shortDesc: 'Deliver direct patient healthcare, administer medications, monitor clinical recovery, and advocate for health wellness.',
      duration: '5 Years Degree',
      relatedCourse: 'Nursing Science (B.NSc)',
      icon: 'health_and_safety',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      overview: 'Registered Nurses form the core of patient care, performing clinical assessments, monitoring vital signs, administering therapy, and educating patients and families on disease management.',
      responsibilities: [
        'Assess patient health status, record vital signs, and monitor clinical progress',
        'Administer prescribed medications, IV infusions, and wound care treatments',
        'Assist physicians and surgeons during medical procedures and surgeries',
        'Educate patients on health maintenance, disease prevention, and post-discharge recovery',
        'Maintain accurate patient clinical records and nursing care plans',
      ],
      skillsRequired: ['Patient Care & Empathy', 'Clinical Assessment', 'Medication Administration', 'Emergency Triage', 'Healthcare Communication'],
      workEnvironment: 'Hospitals, Maternity Clinics, Intensive Care Units (ICU), Public Health Centres, International Humanitarian NGOs.',
      careerOpportunities: ['Critical Care Nurse', 'Nurse Anesthetist', 'Pediatric Nurse', 'Public Health Officer', 'Nurse Administrator'],
      utmeSubjects: ['Use of English', 'Biology', 'Chemistry', 'Physics'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
      growthOpportunities: 'Globally coveted skill. High demand locally and internationally with opportunities for specialized nurse practitioner roles.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Biology, Chemistry, Physics. UTME Target: 240+", icon: "edit_note" },
        { step: "B.NSc Degree", description: "5-Year Bachelor of Nursing Science Degree program.", icon: "school" },
        { step: "NMCN Licensing", description: "Pass Nursing & Midwifery Council of Nigeria professional licensing exams.", icon: "verified" },
        { step: "Clinical Practice", description: "Gain hands-on clinical practice in hospitals, surgical suites, or public health units.", icon: "sanitizer" },
        { step: "Specialty Practice", description: "Specialize in Anesthesia, ICU, Midwifery, or Nursing Education.", icon: "workspace_premium" },
      ]
    },
    {
      id: 'pharmacist',
      title: 'Pharmacist',
      category: 'Medical',
      shortDesc: 'Formulate, compound, dispense medications, and ensure rational drug therapy and safe pharmaceutical usage.',
      duration: '5 Years Degree',
      relatedCourse: 'Pharmacy (Pharm.D / B.Pharm)',
      icon: 'medication',
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
      overview: 'Pharmacists are experts in drug action, biochemistry, and therapeutic efficacy. They advise doctors and patients on drug interactions, side effects, dosage regimens, and pharmaceutical manufacturing.',
      responsibilities: [
        'Review prescriptions for dosage accuracy, drug-drug interactions, and contraindications',
        'Dispense medications and counsel patients on safe administration regimens',
        'Oversee pharmaceutical manufacturing, quality control, and drug formulation',
        'Manage pharmacy inventory, storage conditions, and controlled substance protocols',
        'Participate in clinical trial research and pharmaceutical product safety monitoring',
      ],
      skillsRequired: ['Pharmacology', 'Biochemistry', 'Clinical Counseling', 'Pharmaceutical Calculations', 'Quality Assurance'],
      workEnvironment: 'Community Pharmacies, Hospital Pharmacies, Pharmaceutical Manufacturing Plants, NAFDAC, Research Labs.',
      careerOpportunities: ['Community Pharmacist', 'Hospital Clinical Pharmacist', 'Industrial Production Manager', 'Regulatory Affairs Officer', 'Medical Sales Specialist'],
      utmeSubjects: ['Use of English', 'Biology', 'Chemistry', 'Physics'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
      growthOpportunities: 'High demand across retail, clinical healthcare, local manufacturing, and government regulatory agencies.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Biology, Chemistry, Physics. UTME Target: 260+", icon: "edit_note" },
        { step: "Pharm.D / B.Pharm", description: "5 to 6-Year Doctor of Pharmacy or Bachelor of Pharmacy Degree.", icon: "school" },
        { step: "Intership Year", description: "1-Year mandatory pharmacy internship in a hospital, community, or industrial setting.", icon: "medication_liquid" },
        { step: "PCN Registration", description: "Licensing with the Pharmacy Council of Nigeria (PCN).", icon: "verified" },
        { step: "Practice & Venture", description: "Establish a pharmacy chain, lead hospital clinical pharmacy, or manage drug production.", icon: "store" },
      ]
    },
    {
      id: 'teacher',
      title: 'Educationist / Secondary School Educator',
      category: 'Education',
      shortDesc: 'Inspire and educate students, develop instructional curricula, and mentor the next generation of Nigerian youth.',
      duration: '4 Years Degree',
      relatedCourse: 'Education (B.Ed / B.Sc Ed)',
      icon: 'school',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      overview: 'Educationists shape academic growth by designing lesson plans, deploying innovative pedagogy, assessing student performance, and nurturing critical thinking skills.',
      responsibilities: [
        'Develop curriculum lesson plans aligned with national education benchmarks',
        'Deliver interactive instruction in specialized subjects (Sciences, Arts, Commercial)',
        'Evaluate student academic progress through assignments, tests, and examinations',
        'Mentor students in career choices, personal character, and study habits',
        'Integrate educational technology tools to enhance classroom learning',
      ],
      skillsRequired: ['Pedagogy & Teaching Methodologies', 'Classroom Management', 'Curriculum Design', 'Student Mentorship', 'Educational Tech'],
      workEnvironment: 'Secondary Schools, Educational Colleges, Educational Ministries, E-Learning EdTech Platforms.',
      careerOpportunities: ['Subject Specialist Educator', 'School Principal / Administrator', 'Curriculum Developer', 'Educational Consultant', 'EdTech Content Creator'],
      utmeSubjects: ['Use of English', 'Subject of Specialization (e.g., Maths/Physics or Literature/Govt)', '+ 2 Teaching Subjects'],
      oLevelSubjects: ['English Language', 'Mathematics', '+ 3 Subjects relevant to specialization'],
      growthOpportunities: 'Evergreen profession with opportunities for school leadership, international teaching credentials, and edtech innovations.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths and specialization subjects. UTME Target: 200+", icon: "edit_note" },
        { step: "B.Ed / B.Sc(Ed) Degree", description: "4-Year Bachelor of Education degree program.", icon: "school" },
        { step: "TRCN Certification", description: "Professional registration with Teachers Registration Council of Nigeria.", icon: "verified" },
        { step: "Classroom Teaching", description: "Teach in top-tier schools or international academies.", icon: "co_present" },
        { step: "Educational Leadership", description: "Advance to School Directorship, Educational Policy Advisor, or EdTech Founder.", icon: "stars" },
      ]
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist / AI Analyst',
      category: 'Technology',
      shortDesc: 'Extract actionable insights from big data using statistical modeling, machine learning, and data visualization.',
      duration: '4 Years Degree',
      relatedCourse: 'Data Science / Statistics / Computer Science',
      icon: 'analytics',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      overview: 'Data Scientists combine mathematics, programming, and domain knowledge to build predictive machine learning models that optimize commercial decision making and automate complex processes.',
      responsibilities: [
        'Clean, preprocess, and analyze structured and unstructured datasets',
        'Build predictive statistical and machine learning models (Python, R, SQL)',
        'Create interactive dashboard visualizations (PowerBI, Tableau, Grafana)',
        'Communicate data insights to non-technical business stakeholders',
        'Deploy data pipelines into production cloud environments',
      ],
      skillsRequired: ['Python / R Programming', 'SQL & Data Wrangling', 'Machine Learning Algorithms', 'Applied Statistics', 'Data Visualization'],
      workEnvironment: 'Fintech Companies, Telecommunications Networks, E-Commerce Giants, Consultancies, Global Remote Techs.',
      careerOpportunities: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'BI Developer', 'AI Research Scientist'],
      utmeSubjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry or Economics'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry or Economics', 'Further Mathematics'],
      growthOpportunities: 'One of the fastest-growing global careers with lucrative compensation and remote work flexibility.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Physics, Chemistry/Economics. UTME Target: 240+", icon: "edit_note" },
        { step: "University Degree", description: "4-Year B.Sc in Data Science, Computer Science, Statistics, or Mathematics.", icon: "school" },
        { step: "Specialized Projects", description: "Master Python, SQL, Machine Learning and showcase Kaggle/GitHub data projects.", icon: "dataset" },
        { step: "Entry Analytics Role", description: "Join corporate organizations as Data Analyst or Junior ML Engineer.", icon: "query_stats" },
        { step: "Lead Scientist", description: "Advance to Principal Data Scientist or Head of Analytics & AI.", icon: "psychology_alt" },
      ]
    },
    {
      id: 'mech-eng',
      title: 'Mechanical Engineer',
      category: 'Engineering',
      shortDesc: 'Design, manufacture, and maintain mechanical systems, thermal equipment, power plants, and robotics.',
      duration: '5 Years Degree',
      relatedCourse: 'Mechanical Engineering',
      icon: 'settings_suggest',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      overview: 'Mechanical Engineers apply principles of mechanics, thermodynamics, robotics, and materials science to design machinery, HVAC systems, automotive engines, and industrial manufacturing plants.',
      responsibilities: [
        'Design mechanical components and assemblies using 3D CAD modeling software',
        'Analyze thermal stress, fluid dynamics, and mechanical vibration forces',
        'Supervise manufacturing processes, machining, welding, and quality assembly',
        'Maintain heavy industrial machinery, turbines, and factory production lines',
        'Conduct research into renewable energy systems and automated robotics',
      ],
      skillsRequired: ['SolidWorks / CAD Modeling', 'Thermodynamics', 'Fluid Mechanics', 'CNC Machining', 'Robotics & Automation'],
      workEnvironment: 'Oil & Gas Platforms, Manufacturing Factories, Automotive Plants, Power Generation Stations, Aerospace Consultancies.',
      careerOpportunities: ['Mechanical Design Engineer', 'Maintenance Manager', 'HVAC Engineer', 'Robotics Engineer', 'Energy Plant Manager'],
      utmeSubjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Further Mathematics or Technical Drawing'],
      growthOpportunities: 'High technical demand across oil & gas, industrial automation, manufacturing, and renewable power generation.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Physics, Chemistry. UTME Target: 245+", icon: "edit_note" },
        { step: "B.Eng Degree", description: "5-Year Mechanical Engineering degree.", icon: "school" },
        { step: "Industrial Training", description: "Gain hands-on factory and industrial plant maintenance experience.", icon: "precision_manufacturing" },
        { step: "COREN & NSE", description: "Obtain professional COREN certification for practice as Registered Engineer.", icon: "verified" },
        { step: "Plant Manager", description: "Lead manufacturing operations or establish an engineering firm.", icon: "factory" },
      ]
    },
    {
      id: 'psychologist',
      title: 'Psychologist / Mental Health Professional',
      category: 'Social Sciences',
      shortDesc: 'Study human behavior, cognitive processes, emotional wellness, and provide psychological therapy and assessment.',
      duration: '4 Years Degree',
      relatedCourse: 'Psychology',
      icon: 'psychology',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      overview: 'Psychologists evaluate psychological conditions, conduct psychometric testing, provide evidence-based psychotherapy, and counsel individuals, schools, and corporate organizations on mental health.',
      responsibilities: [
        'Conduct clinical psychological assessments, interviews, and psychometric tests',
        'Formulate therapeutic treatment plans for anxiety, depression, and stress',
        'Provide cognitive behavioral therapy (CBT) and counseling sessions',
        'Advise corporate companies on employee mental wellness and organizational culture',
        'Conduct academic research on human cognition, child development, and social behavior',
      ],
      skillsRequired: ['Clinical Assessment', 'Psychotherapy Techniques', 'Empathy & Active Listening', 'Psychometric Analysis', 'Research Methodology'],
      workEnvironment: 'Psychiatric Hospitals, Rehabilitation Centres, Private Counseling Practices, Universities, Corporate HR Units.',
      careerOpportunities: ['Clinical Psychologist', 'Counseling Psychologist', 'Organizational / HR Psychologist', 'Educational Psychologist', 'Behavioral Researcher'],
      utmeSubjects: ['Use of English', 'Biology', 'Economics or Government', 'Any other Social Science subject'],
      oLevelSubjects: ['English Language', 'Mathematics', 'Biology', 'Economics or Government', '+ 1 Social Science'],
      growthOpportunities: 'Growing societal awareness of mental health, leading to expanded opportunities in healthcare, schools, and corporate HR.',
      pathwaySteps: [
        { step: "O'Levels & UTME", description: "Credit passes in English, Maths, Biology, Social Sciences. UTME Target: 220+", icon: "edit_note" },
        { step: "B.Sc Psychology", description: "4-Year Bachelor of Science in Psychology.", icon: "school" },
        { step: "M.Sc Clinical Psychology", description: "Postgraduate master's degree in Clinical or Organizational Psychology.", icon: "workspace_premium" },
        { step: "NPA Registration", description: "Licensing with the Nigerian Psychological Association.", icon: "verified" },
        { step: "Psychological Practice", description: "Establish a counseling practice or lead mental wellness in major organizations.", icon: "self_improvement" },
      ]
    }
  ];

  // Categories list
  const filterCategories: CareerCategory[] = [
    'All',
    'Medical',
    'Engineering',
    'Technology',
    'Business',
    'Arts',
    'Law',
    'Education',
    'Agriculture',
    'Social Sciences'
  ];

  // Popular Category Cards list
  const popularCategories = [
    { title: 'Medical & Health Sciences', category: 'Medical' as CareerCategory, icon: 'medical_services', color: 'bg-emerald-50 text-[#0F9D58] border-emerald-200' },
    { title: 'Engineering & Built Environment', category: 'Engineering' as CareerCategory, icon: 'engineering', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { title: 'Technology & Computing', category: 'Technology' as CareerCategory, icon: 'laptop_mac', color: 'bg-blue-50 text-[#2563EB] border-blue-200' },
    { title: 'Business & Finance', category: 'Business' as CareerCategory, icon: 'payments', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { title: 'Law & Jurisprudence', category: 'Law' as CareerCategory, icon: 'gavel', color: 'bg-slate-100 text-[#0F172A] border-slate-300' },
    { title: 'Arts & Humanities', category: 'Arts' as CareerCategory, icon: 'palette', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { title: 'Education & Pedagogy', category: 'Education' as CareerCategory, icon: 'school', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { title: 'Agriculture & Bio-Resources', category: 'Agriculture' as CareerCategory, icon: 'eco', color: 'bg-lime-50 text-lime-800 border-lime-200' },
    { title: 'Social Sciences', category: 'Social Sciences' as CareerCategory, icon: 'psychology', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  ];

  // Success Stories
  const successStories = [
    {
      name: "Dr. Amina Yusuf",
      career: "Consultant Pediatrician",
      university: "University of Lagos (UNILAG)",
      quote: "JAMB Compass gave me clarity on my UTME subject combinations when I was 16. Scoring 292 gave me admission into Medicine on my first attempt!",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Chidi Okafor",
      career: "Senior Fintech Software Engineer",
      university: "Federal University of Technology, Akure (FUTA)",
      quote: "Understanding the transition from Computer Science theory to practical web engineering early helped me secure software developer roles before graduation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Zainab Ahmed",
      career: "Corporate Lawyer",
      university: "Ahmadu Bello University (ABU Zaria)",
      quote: "The pathway feature laid out the exact steps from LL.B degree to the Law School Bar Finals. It gave me the roadmap I needed.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Emeka Nwachukwu",
      career: "Lead Data Scientist",
      university: "University of Nigeria, Nsukka (UNN)",
      quote: "Checking my subject requirements saved me from a fatal JAMB subject combination mistake. I recommend JAMB Compass to every Nigerian secondary student.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Dynamic filtering of careers
  const filteredCareers = careersData.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relatedCourse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Current career object for the pathway section
  const currentPathwayCareer = careersData.find(c => c.id === pathwayCareerId) || careersData[1];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] font-sans pb-16">
      
      {/* PAGE HEADER SECTION WITH BREADCRUMB */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#E2E8F0] pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#475569]">
            <button onClick={() => setActiveTab('home')} className="hover:text-[#0F9D58] transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="font-semibold text-[#0F172A]">Career Explorer</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Header Text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] font-bold text-xs font-display">
                <span className="material-symbols-outlined text-sm">explore</span>
                Nigerian Career & Tertiary Guidance
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#0F172A] leading-tight">
                Discover Your Future Career
              </h1>

              <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore professions, understand career paths, discover required university courses, and start planning your UTME journey with confidence.
              </p>

              {/* Quick stats pills */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-[#475569]">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                  <span className="material-symbols-outlined text-[#0F9D58] text-base">verified</span>
                  <span>500+ Verified Professions</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                  <span className="material-symbols-outlined text-[#2563EB] text-base">school</span>
                  <span>Direct UTME & O'Level Mapping</span>
                </div>
              </div>
            </div>

            {/* Illustration Graphic Box */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-tr from-[#0F172A] to-[#1E293B] rounded-[24px] p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0F9D58]/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <p className="text-xs font-bold font-display uppercase tracking-wider text-emerald-400">
                    Explore Multi-Disciplinary Fields
                  </p>
                  
                  {/* Career Icons Matrix */}
                  <div className="grid grid-cols-4 gap-3 text-center">
                    {[
                      { name: 'Medicine', icon: 'medical_services', color: 'bg-rose-500/20 text-rose-300' },
                      { name: 'Eng.', icon: 'engineering', color: 'bg-amber-500/20 text-amber-300' },
                      { name: 'Law', icon: 'gavel', color: 'bg-purple-500/20 text-purple-300' },
                      { name: 'Tech', icon: 'terminal', color: 'bg-blue-500/20 text-blue-300' },
                      { name: 'Education', icon: 'school', color: 'bg-teal-500/20 text-teal-300' },
                      { name: 'Business', icon: 'calculate', color: 'bg-emerald-500/20 text-emerald-300' },
                      { name: 'Architecture', icon: 'architecture', color: 'bg-sky-500/20 text-sky-300' },
                      { name: 'Agriculture', icon: 'eco', color: 'bg-lime-500/20 text-lime-300' },
                    ].map((item, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border border-white/10 ${item.color} backdrop-blur-sm flex flex-col items-center justify-center`}>
                        <span className="material-symbols-outlined text-xl mb-1">{item.icon}</span>
                        <span className="text-[10px] font-semibold">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 text-center">
                    Empowering thousands of Nigerian students to make informed academic choices.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section id="careers-search" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Search Input Bar */}
        <div className="relative max-w-3xl mx-auto">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search careers (e.g. Software Developer, Doctor, Architect, Lawyer...)"
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-12 pr-10 py-3.5 text-sm text-[#0F172A] focus:outline-none focus:border-[#0F9D58] focus:bg-white shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#0F172A]"
            >
              <span className="material-symbols-outlined text-lg">cancel</span>
            </button>
          )}
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F9D58] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
              }`}
            >
              {cat === 'All' ? 'All Careers' : cat}
            </button>
          ))}
        </div>

      </section>

      {/* FEATURED CAREERS GRID (12 Detailed Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0F9D58]">work</span>
              Featured Careers ({filteredCareers.length})
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">Select a career card to view full entry requirements, responsibilities, and pathways.</p>
          </div>
        </div>

        {filteredCareers.length === 0 ? (
          <div className="bg-[#F8FAFC] rounded-2xl p-12 text-center border border-[#E2E8F0] space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#475569]">search_off</span>
            <p className="font-bold text-base text-[#0F172A]">No careers found matching "{searchQuery}"</p>
            <p className="text-xs text-[#475569]">Try clearing your search query or selecting a different career category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 bg-[#0F9D58] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCareers.map(career => (
              <div
                key={career.id}
                className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 p-5 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedCareerModal(career)}
              >
                <div className="space-y-3">
                  {/* Icon Header & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0F9D58] group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-2xl">{career.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
                      {career.category}
                    </span>
                  </div>

                  {/* Title & Short Desc */}
                  <div>
                    <h3 className="font-bold text-base font-display text-[#0F172A] group-hover:text-[#0F9D58] transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-xs text-[#475569] line-clamp-2 mt-1 leading-relaxed">
                      {career.shortDesc}
                    </p>
                  </div>

                  {/* Duration & Related Course */}
                  <div className="pt-2 border-t border-[#E2E8F0] space-y-1 text-xs text-[#475569]">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#0F9D58]">schedule</span>
                      <span>{career.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-[#0F172A]">
                      <span className="material-symbols-outlined text-sm text-[#2563EB]">school</span>
                      <span className="truncate">{career.relatedCourse}</span>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <div className="pt-4 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCareerModal(career);
                    }}
                    className="w-full py-2 bg-[#F8FAFC] hover:bg-[#0F9D58] text-[#0F172A] hover:text-white border border-[#E2E8F0] hover:border-[#0F9D58] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 group-hover:bg-[#0F9D58] group-hover:text-white"
                  >
                    <span>Explore Career</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CAREER PATHWAY SECTION (Interactive Step-by-Step Diagram) */}
      <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-12 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F9D58] font-display uppercase tracking-wider">
                Interactive Career Roadmap
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] mt-1">
                How to Become a {currentPathwayCareer.title}
              </h2>
              <p className="text-xs text-[#475569] mt-1">
                Sequential academic and professional milestones from secondary school to career entry.
              </p>
            </div>

            {/* Profession Selector for Pathway */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[#0F172A] whitespace-nowrap">Switch Career Pathway:</label>
              <select
                value={pathwayCareerId}
                onChange={(e) => setPathwayCareerId(e.target.value)}
                className="bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] px-3 py-2 focus:outline-none focus:border-[#0F9D58]"
              >
                {careersData.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Horizontal Pathway Steps Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {(currentPathwayCareer?.pathwaySteps || []).map((st, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm relative space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F9D58] text-white font-bold text-xs flex items-center justify-center font-display">
                      {index + 1}
                    </div>
                    <span className="material-symbols-outlined text-[#2563EB] text-xl">{st.icon}</span>
                  </div>

                  <h3 className="font-bold text-sm text-[#0F172A] font-display">
                    {st.step}
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] text-[10px] text-[#0F9D58] font-bold">
                  Step {index + 1} of 5
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* POPULAR CAREER CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-display text-[#0F172A]">
            Popular Career Categories
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">Explore career pathways categorized by industry sectors.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularCategories.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCategory(item.category);
                const searchElem = document.getElementById('careers-search');
                if (searchElem) searchElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-4 rounded-2xl border ${item.color} hover:shadow-md transition-all cursor-pointer space-y-2 flex flex-col items-center text-center group`}
            >
              <div className="p-2.5 rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-xs font-display">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE THIS CAREER / THREE COLUMN VALUES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold font-display text-[#0F172A]">
              Why Plan Your Career Early?
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Aligning your natural strengths with target professions ensures long-term career satisfaction and academic success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">impact_molding</span>
              </div>
              <h3 className="font-bold text-base font-display text-[#0F172A]">Career Impact</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Choose a profession that empowers you to address societal challenges in healthcare, technology, law, infrastructure, or education in Nigeria and worldwide.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">trending_up</span>
              </div>
              <h3 className="font-bold text-base font-display text-[#0F172A]">Future Opportunities</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Discover high-demand fields experiencing rapid employment expansion, remote global flexibility, and strong long-term career resilience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F172A]/10 text-[#0F172A] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>
              <h3 className="font-bold text-base font-display text-[#0F172A]">Required Skills</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Understand the specific technical, analytical, creative, and interpersonal skills needed so you can start cultivating them before university.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-display text-[#0F172A]">
            Success Stories
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">Inspirational journeys from Nigerian tertiary graduates.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {successStories.map((story, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0F9D58]"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A] font-display">{story.name}</h3>
                    <p className="text-[11px] font-semibold text-[#0F9D58]">{story.career}</p>
                  </div>
                </div>

                <p className="text-xs text-[#475569] italic leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] text-[10px] font-bold text-[#475569] flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#2563EB]">school</span>
                <span>{story.university}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER PLANNING TIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-display text-[#0F172A]">
            Career Planning Tips
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">Essential advice for secondary students preparing for UTME registration.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Know Your Interests", desc: "Evaluate your natural intellectual strengths rather than succumbing strictly to peer or external pressure.", icon: "self_improvement" },
            { title: "Research University Requirements", desc: "Verify departmental cut-offs and specific O'Level and JAMB subject combinations for your target course.", icon: "fact_check" },
            { title: "Develop Relevant Skills", desc: "Start building foundational coding, writing, research, or mathematical skills early in your secondary school years.", icon: "code" },
            { title: "Prepare Early for UTME", desc: "Utilize CBT past question simulators to build speed and accuracy before the official examination date.", icon: "laptop_chromebook" },
            { title: "Talk to Career Mentors", desc: "Engage with practicing professionals and university undergraduates in your field of interest.", icon: "record_voice_over" },
            { title: "Set Long-Term Goals", desc: "Map out 5-year academic milestones leading from university matriculation to professional graduation.", icon: "flag" },
          ].map((tip, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex gap-3 hover:border-[#0F9D58] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">{tip.icon}</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm font-display text-[#0F172A]">{tip.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED RESOURCES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-display text-[#0F172A]">
            Related Platform Tools
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">Seamlessly transition from career exploration to university preparation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[
            { title: "Course Directory", desc: "Browse 200+ university degree programs.", tab: 'courses' as TabType, icon: "menu_book" },
            { title: "Subject Checker", desc: "Verify O'Level & JAMB subjects.", tab: 'guide' as TabType, icon: "fact_check" },
            { title: "University Directory", desc: "Compare Federal & State universities.", tab: 'universities' as TabType, icon: "account_balance" },
            { title: "Study Hub", desc: "Practice 20,000+ CBT past questions.", tab: 'study-hub' as TabType, icon: "laptop_chromebook" },
            { title: "Admission Guide", desc: "Understand JAMB CAPS & Post-UTME.", tab: 'admission' as TabType, icon: "verified" },
          ].map((res, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">{res.icon}</span>
                </div>
                <h3 className="font-bold text-xs font-display text-[#0F172A]">{res.title}</h3>
                <p className="text-[11px] text-[#475569]">{res.desc}</p>
              </div>

              <button
                onClick={() => setActiveTab(res.tab)}
                className="w-full py-1.5 bg-[#F8FAFC] hover:bg-[#2563EB] text-[#0F172A] hover:text-white font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <span>Open Tool</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION (Gradient Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-[#0F9D58] via-[#0F172A] to-[#1E293B] rounded-[24px] p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Found a Career That Inspires You?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Explore the university courses, admission cut-off benchmarks, and subject combinations needed to begin your academic journey.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('courses')}
                className="bg-[#0F9D58] hover:bg-[#0b8047] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Explore Courses</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => setActiveTab('universities')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-xs transition-all flex items-center gap-2"
              >
                <span>Find Universities</span>
                <span className="material-symbols-outlined text-sm">account_balance</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER DETAIL PREVIEW MODAL */}
      {selectedCareerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 relative my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCareerModal(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">{selectedCareerModal.icon}</span>
              </div>
              <div className="space-y-1 pr-8">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0F9D58]/10 text-[#0F9D58]">
                    {selectedCareerModal.category}
                  </span>
                  <span className="text-xs text-[#475569] font-medium">• {selectedCareerModal.duration}</span>
                </div>
                <h2 className="text-2xl font-bold font-display text-[#0F172A]">
                  {selectedCareerModal.title}
                </h2>
                <p className="text-xs text-[#475569]">
                  Primary Degree: <strong className="text-[#0F172A]">{selectedCareerModal.relatedCourse}</strong>
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] font-display">Career Overview</h3>
              <p className="text-xs text-[#475569] leading-relaxed">{selectedCareerModal.overview}</p>
            </div>

            {/* Two Column Grid for Responsibilities & Skills */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Daily Responsibilities */}
              <div className="space-y-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] font-display flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#0F9D58]">task_alt</span>
                  Daily Responsibilities
                </h3>
                <ul className="space-y-2 text-xs text-[#475569]">
                  {(Array.isArray(selectedCareerModal.responsibilities) ? selectedCareerModal.responsibilities : [selectedCareerModal.responsibilities || '']).map((res, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#0F9D58] font-bold mt-0.5">•</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Required */}
              <div className="space-y-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] font-display flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#2563EB]">psychology</span>
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(selectedCareerModal.skillsRequired) ? selectedCareerModal.skillsRequired : [selectedCareerModal.skillsRequired || '']).map((sk, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#EFF6FF] text-[#2563EB] border border-blue-100">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* UTME & O'Level Prerequisites */}
            <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#E8F5E9]/50 border border-[#0F9D58]/20">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#0F9D58] font-display flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                  Suggested UTME Subjects
                </p>
                <p className="text-xs font-semibold text-[#0F172A]">
                  {(selectedCareerModal.utmeSubjects || []).join(' • ')}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-[#0F9D58] font-display flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">fact_check</span>
                  O'Level Requirements
                </p>
                <p className="text-xs font-semibold text-[#0F172A]">
                  {(selectedCareerModal.oLevelSubjects || []).join(' • ')}
                </p>
              </div>
            </div>

            {/* Work Environment & Growth */}
            <div className="space-y-3 text-xs text-[#475569]">
              <div>
                <strong className="text-[#0F172A] font-display block mb-0.5">Work Environment:</strong>
                <p>{selectedCareerModal.workEnvironment}</p>
              </div>

              <div>
                <strong className="text-[#0F172A] font-display block mb-0.5">Career Opportunities & Growth:</strong>
                <p>{selectedCareerModal.growthOpportunities}</p>
              </div>

              {/* Earnings Note (Compliant with Prompt Rules) */}
              <div className="p-3 rounded-xl bg-slate-100 text-[#475569] text-[11px] italic">
                <strong>Note on Compensation:</strong> Professional earnings vary significantly depending on employer scale, geographic location, years of post-graduation experience, industry sector, and specialized postgraduate certifications.
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setSelectedCareerModal(null)}
                className="px-5 py-2.5 bg-[#F8FAFC] text-[#0F172A] font-bold text-xs rounded-xl border border-[#E2E8F0]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCareerModal(null);
                  setActiveTab('courses');
                }}
                className="px-5 py-2.5 bg-[#0F9D58] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#0b8047] flex items-center gap-1"
              >
                <span>View Related Courses</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
