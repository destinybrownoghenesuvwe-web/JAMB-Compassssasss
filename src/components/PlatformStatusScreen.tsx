import React, { useState } from 'react';
import { TabType } from '../types';

interface PlatformStatusScreenProps {
  setActiveTab?: (tab: TabType) => void;
}

// Service Interface
export interface MonitoredService {
  id: string;
  name: string;
  category: 'Core Infrastructure' | 'Learning Tools' | 'Student Services' | 'Admin & Support';
  status: 'Operational' | 'Maintenance' | 'Degraded' | 'Offline';
  latency: string;
  uptime: string;
  icon: string;
  description: string;
}

export const PlatformStatusScreen: React.FC<PlatformStatusScreenProps> = ({ setActiveTab }) => {
  // Theme Toggle state (Light / Dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toast notification state
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Filter category for Monitored Services
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('All');

  // Interactive Services State (Allow demo status switching)
  const [services, setServices] = useState<MonitoredService[]>([
    { id: 'web', name: 'Website', category: 'Core Infrastructure', status: 'Operational', latency: '42ms', uptime: '99.99%', icon: 'language', description: 'Main web portal, static pages, and public routing' },
    { id: 'dash', name: 'Student Dashboard', category: 'Student Services', status: 'Operational', latency: '68ms', uptime: '99.95%', icon: 'dashboard', description: 'Personalised student progress, subject trackers, and goals' },
    { id: 'planner', name: 'Study Planner', category: 'Learning Tools', status: 'Operational', latency: '54ms', uptime: '99.98%', icon: 'calendar_month', description: 'Automated study schedule calculator and syllabus milestone engine' },
    { id: 'cbt', name: 'CBT Practice Engine', category: 'Learning Tools', status: 'Operational', latency: '85ms', uptime: '99.92%', icon: 'quiz', description: 'Timed JAMB drill engine with 15,000+ past questions' },
    { id: 'mock', name: 'Mock Exams Portal', category: 'Learning Tools', status: 'Operational', latency: '92ms', uptime: '99.90%', icon: 'assignment_turned_in', description: 'Full-length 400-mark 2026 JAMB simulated exam suite' },
    { id: 'unilist', name: 'University Directory', category: 'Student Services', status: 'Operational', latency: '48ms', uptime: '100.0%', icon: 'account_balance', description: 'Nigerian tertiary institution database, catchment areas, and cut-off points' },
    { id: 'scholar', name: 'Scholarships Hub', category: 'Student Services', status: 'Operational', latency: '50ms', uptime: '99.96%', icon: 'payments', description: 'Federal, State, and Corporate tertiary scholarship opportunities' },
    { id: 'news', name: 'News Centre', category: 'Student Services', status: 'Operational', latency: '38ms', uptime: '99.99%', icon: 'newspaper', description: 'Official 2026 JAMB press updates, university post-UTME notices' },
    { id: 'community', name: 'Community Forum', category: 'Student Services', status: 'Maintenance', latency: '140ms', uptime: '98.85%', icon: 'forum', description: 'Peer discussion boards, study buddy groups, and challenge leaderboards' },
    { id: 'ai', name: 'AI Assistant', category: 'Learning Tools', status: 'Operational', latency: '110ms', uptime: '99.88%', icon: 'smart_toy', description: 'Intelligent tutor for syllabus explanations and step-by-step problem solving' },
    { id: 'support', name: 'Support Centre', category: 'Admin & Support', status: 'Operational', latency: '45ms', uptime: '99.99%', icon: 'support_agent', description: 'Ticket helpdesk, candidate support chat, and parent inquiry routing' },
    { id: 'admin', name: 'Admin Dashboard', category: 'Admin & Support', status: 'Operational', latency: '52ms', uptime: '99.97%', icon: 'admin_panel_settings', description: 'Platform moderation, user management, and analytics node' },
  ]);

  // System Health History Trend Chart Tab
  const [chartMetric, setChartMetric] = useState<'availability' | 'performance' | 'latency'>('availability');

  // Interactive System States Preview Modal / Showcase State
  const [previewState, setPreviewState] = useState<'none' | '404' | '500' | 'offline' | 'loading' | 'empty' | 'success'>('none');

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // QR Code Modal State
  const [showQrModal, setShowQrModal] = useState(false);

  // Report Problem Form State
  const [reportCategory, setReportCategory] = useState('CBT Practice Engine');
  const [reportSubject, setReportSubject] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportFileName, setReportFileName] = useState<string | null>(null);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportSubject.trim() || !reportDesc.trim()) {
      triggerToast('Please provide a subject and description for your issue report.');
      return;
    }
    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      setReportSubject('');
      setReportDesc('');
      setReportFileName(null);
      triggerToast('Your platform report has been submitted to the JAMB Compass engineering team!');
    }, 1200);
  };

  // Toggle single service status for interactive demo testing
  const toggleServiceStatus = (id: string) => {
    const statusCycle: MonitoredService['status'][] = ['Operational', 'Maintenance', 'Degraded', 'Offline'];
    setServices(prev => prev.map(s => {
      if (s.id === id) {
        const nextIdx = (statusCycle.indexOf(s.status) + 1) % statusCycle.length;
        const newStatus = statusCycle[nextIdx];
        triggerToast(`Updated "${s.name}" demo status to ${newStatus}`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const filteredServices = services.filter(s => {
    if (serviceCategoryFilter === 'All') return true;
    return s.category === serviceCategoryFilter;
  });

  const operationalCount = services.filter(s => s.status === 'Operational').length;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-[#0F172A]'}`}>
      
      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#0F9D58]/40 animate-bounce">
          <span className="material-symbols-outlined text-[#FBBF24]">info</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* TOP COMPASS SCOPE DISCLAIMER BAR */}
      <div className="bg-[#0F172A] text-white py-2 px-4 border-b border-white/10 text-xs text-center relative z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#0F9D58]">verified_user</span>
            <span>
              <strong>Official JAMB Compass Status Notice:</strong> Operational health metrics for the <strong>2026 JAMB Admission Cycle</strong> prep platform.
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[11px] text-slate-400 hidden lg:inline">
              * Note: Reports system status for JAMB Compass only, not official JAMB or university portals.
            </span>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                triggerToast(isDarkMode ? 'Switched to Light Mode' : 'Switched to Dark Mode');
              }}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 transition-all"
            >
              <span className="material-symbols-outlined text-sm">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* PAGE HEADER & BREADCRUMB */}
        <section className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => setActiveTab && setActiveTab('home')} className="hover:text-[#0F9D58] transition-colors">Home</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-semibold text-[#0F9D58]">Platform Status & App Hub</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
            <div className="lg:col-span-7 space-y-4 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F9D58]/10 text-[#0F9D58] dark:bg-[#0F9D58]/20 dark:text-emerald-400 text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D58] animate-ping"></span>
                <span>2026 Academic Season Active</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-tight">
                Platform Status & <span className="text-[#0F9D58]">App Hub</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Monitor the real-time health of JAMB Compass, download the official mobile app, and stay informed about releases and system maintenance throughout the 2026 admission cycle.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="#services-grid" 
                  className="px-5 py-2.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">health_metrics</span>
                  View Service Status
                </a>
                <a 
                  href="#mobile-app-hub" 
                  className="px-5 py-2.5 bg-[#0F172A] hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">smartphone</span>
                  Download 2026 App
                </a>
                <a 
                  href="#system-states" 
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-[#0F172A] dark:text-white text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-600 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">preview</span>
                  System UI States
                </a>
              </div>
            </div>

            {/* DISPLAY ILLUSTRATION CARDS / VECTOR BADGES */}
            <div className="lg:col-span-5 relative flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-gradient-to-br from-[#0F9D58]/10 via-[#2563EB]/10 to-[#0F172A]/10 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-2xl text-[#0F9D58]">laptop</span>
                    <span className="text-[10px] font-bold block mt-1 text-slate-600 dark:text-slate-300">Web Portal</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-2xl text-[#2563EB]">smartphone</span>
                    <span className="text-[10px] font-bold block mt-1 text-slate-600 dark:text-slate-300">Mobile Apps</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-2xl text-[#9333EA]">cloud</span>
                    <span className="text-[10px] font-bold block mt-1 text-slate-600 dark:text-slate-300">Cloud Sync</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-2xl text-[#F59E0B]">security</span>
                    <span className="text-[10px] font-bold block mt-1 text-slate-600 dark:text-slate-300">2026 Shield</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-2xl text-[#0891B2]">dns</span>
                    <span className="text-[10px] font-bold block mt-1 text-slate-600 dark:text-slate-300">Server Nodes</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl shadow-sm text-center">
                    <span className="material-symbols-outlined text-2xl text-[#16A34A]">school</span>
                    <span className="text-[10px] font-bold block mt-1 text-slate-600 dark:text-slate-300">Students</span>
                  </div>
                </div>

                <div className="bg-[#0F172A] text-white p-3 rounded-2xl flex items-center justify-between text-xs px-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400">workspace_premium</span>
                    <span className="font-semibold">2026 JAMB Admission Suite</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-2 py-0.5 rounded-full">v1.0 Demo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LARGE OVERALL STATUS BANNER */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all ${
          operationalCount === services.length 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' 
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${
                operationalCount === services.length ? 'bg-[#0F9D58]' : 'bg-[#F59E0B]'
              }`}>
                <span className="material-symbols-outlined text-3xl">
                  {operationalCount === services.length ? 'check_circle' : 'warning'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase ${
                    operationalCount === services.length 
                      ? 'bg-[#0F9D58] text-white' 
                      : 'bg-[#F59E0B] text-white'
                  }`}>
                    {operationalCount === services.length ? 'System Operational' : 'Partial Maintenance'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Checked 2 mins ago</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display mt-1 text-[#0F172A] dark:text-white">
                  {operationalCount === services.length 
                    ? 'All JAMB Compass Services Operational' 
                    : `${operationalCount} of ${services.length} Services Operational`}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  All system pipelines, CBT exam drills, scholarship databases, and mobile APIs are operating normally for the 2026 cycle.
                </p>
              </div>
            </div>

            <button
              onClick={() => triggerToast('Refreshing platform telemetry... All systems nominal for 2026!')}
              className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-white rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-center flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Refresh Telemetry
            </button>
          </div>
        </section>

        {/* SYSTEM HEALTH KPI CARDS */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Overall Uptime', value: '99.9%', sub: '2026 Target Met', icon: 'speed', color: 'text-[#0F9D58]' },
            { title: 'Avg Response Time', value: '124ms', sub: 'Global Latency', icon: 'bolt', color: 'text-[#2563EB]' },
            { title: 'System Availability', value: '99.98%', sub: 'Last 30 Days', icon: 'cloud_done', color: 'text-[#16A34A]' },
            { title: 'Resolved Incidents', value: '142', sub: '2026 Cycle', icon: 'task_alt', color: 'text-[#0891B2]' },
            { title: 'Active Maintenance', value: '1', sub: 'Scheduled Window', icon: 'build', color: 'text-[#F59E0B]' },
            { title: 'Platform Version', value: 'v1.0 (Demo)', sub: '2026 Release', icon: 'verified', color: 'text-[#9333EA]' },
          ].map((kpi, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">{kpi.title}</span>
                <span className={`material-symbols-outlined text-base ${kpi.color}`}>{kpi.icon}</span>
              </div>
              <span className={`text-xl sm:text-2xl font-extrabold font-display block ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>
                {kpi.value}
              </span>
              <span className={`text-[10px] font-bold block mt-1 ${kpi.color}`}>{kpi.sub}</span>
            </div>
          ))}
        </section>

        {/* MONITORED SERVICES GRID */}
        <section id="services-grid" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold font-display">Monitored Services</h2>
              <p className="text-xs text-slate-500">Real-time status tracking across key modules of the JAMB Compass 2026 platform.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
              {['All', 'Core Infrastructure', 'Learning Tools', 'Student Services', 'Admin & Support'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setServiceCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    serviceCategoryFilter === cat 
                      ? 'bg-[#0F9D58] text-white shadow' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className={`p-5 rounded-2xl border shadow-sm transition-all hover:shadow-md ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-xl">{service.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0F172A] dark:text-white">{service.name}</h3>
                      <span className="text-[10px] text-slate-400 font-medium">{service.category}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <button 
                    onClick={() => toggleServiceStatus(service.id)}
                    title="Click to toggle status for interactive testing"
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 transition-transform hover:scale-105 ${
                      service.status === 'Operational' ? 'bg-[#16A34A]/10 text-[#16A34A]' :
                      service.status === 'Maintenance' ? 'bg-[#F59E0B]/10 text-[#B45309]' :
                      service.status === 'Degraded' ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' :
                      'bg-rose-100 text-rose-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      service.status === 'Operational' ? 'bg-[#16A34A]' :
                      service.status === 'Maintenance' ? 'bg-[#F59E0B]' :
                      service.status === 'Degraded' ? 'bg-[#0EA5E9]' :
                      'bg-rose-600'
                    }`}></span>
                    <span>{service.status}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-3 border-t border-slate-100 dark:border-slate-700 text-slate-500">
                  <span>Latency: <strong className="text-slate-700 dark:text-slate-200">{service.latency}</strong></span>
                  <span>Uptime: <strong className="text-[#0F9D58]">{service.uptime}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SYSTEM STATUS HISTORY (INTERACTIVE LINE CHART / METRIC VISUAL) */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold font-display">System Status History (2026 Cycle)</h2>
              <p className="text-xs text-slate-500">Historical performance trends and 90-day uptime metrics.</p>
            </div>

            {/* Metric Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl text-xs font-semibold">
              {[
                { id: 'availability', label: 'Availability Trend' },
                { id: 'performance', label: 'Performance Trend' },
                { id: 'latency', label: 'Response Time' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setChartMetric(m.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartMetric === m.id ? 'bg-[#0F9D58] text-white shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Bar / Chart Grid */}
          <div className="h-56 flex items-end justify-between gap-1.5 border-b border-slate-200 dark:border-slate-700 pb-4">
            {[
              { label: 'Jan 2026', val: 99.8, lat: 110, perf: 98.5 },
              { label: 'Feb 2026', val: 100, lat: 95, perf: 99.8 },
              { label: 'Mar 2026', val: 99.9, lat: 105, perf: 99.2 },
              { label: 'Apr 2026', val: 99.5, lat: 130, perf: 97.4 },
              { label: 'May 2026', val: 100, lat: 98, perf: 100.0 },
              { label: 'Jun 2026', val: 99.9, lat: 102, perf: 99.5 },
              { label: 'Jul 2026', val: 99.8, lat: 115, perf: 99.0 },
              { label: 'Aug 2026', val: 100, lat: 92, perf: 99.9 },
              { label: 'Sep 2026', val: 99.9, lat: 100, perf: 99.4 },
              { label: 'Oct 2026', val: 99.98, lat: 124, perf: 99.9 },
            ].map((d, idx) => {
              const height = chartMetric === 'availability' ? d.val : chartMetric === 'performance' ? d.perf : Math.max(20, 160 - d.lat);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] px-2.5 py-1 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-md">
                    {d.label}: {chartMetric === 'availability' ? `${d.val}% Uptime` : chartMetric === 'performance' ? `${d.perf}% Efficiency` : `${d.lat}ms Latency`}
                  </div>
                  <div className="w-full max-w-[40px] bg-slate-100 dark:bg-slate-700 h-full rounded-t-xl overflow-hidden flex items-end justify-center">
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        chartMetric === 'availability' ? 'bg-[#0F9D58]' :
                        chartMetric === 'performance' ? 'bg-[#2563EB]' :
                        'bg-[#9333EA]'
                      }`} 
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 truncate">{d.label.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-slate-500">
            <span>Overall 2026 Availability: <strong className="text-[#0F9D58]">99.91% Average</strong></span>
            <span>Target SLA: <strong className="text-slate-700 dark:text-slate-300">99.90%</strong></span>
            <span>Zero Unscheduled Outages Recorded in 2026</span>
          </div>
        </section>

        {/* RECENT INCIDENTS & SCHEDULED MAINTENANCE GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RECENT INCIDENTS */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">history</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">Recent Incidents (2026)</h2>
                <p className="text-xs text-slate-500">Completed maintenance logs and resolved performance updates.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Routine Platform Maintenance Completed', status: 'Resolved', date: 'May 14, 2026', desc: 'Database index re-optimization and CBT past question cache clearing completed smoothly.' },
                { title: 'Performance Improvements', status: 'Resolved', date: 'April 28, 2026', desc: 'Upgraded CDN routing for faster loading of university directory cut-off lists.' },
                { title: 'Security Update Deployment', status: 'Resolved', date: 'March 15, 2026', desc: 'Applied SSL security patches and multi-factor authorization safeguards.' },
                { title: 'Study Planner Optimisation', status: 'Resolved', date: 'February 20, 2026', desc: 'Recalibrated study schedule recommendation algorithm for 2026 JAMB dates.' },
                { title: 'Dashboard Enhancement', status: 'Resolved', date: 'January 10, 2026', desc: 'Released updated candidate analytics cards and subject target score widgets.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#0F172A] dark:text-white">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-[#0F9D58] dark:bg-emerald-950 dark:text-emerald-400">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  <span className="text-[10px] text-slate-400 font-medium block">Timestamp: {item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SCHEDULED MAINTENANCE */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-[#F59E0B] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">event_upcoming</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">Scheduled Maintenance (2026)</h2>
                <p className="text-xs text-slate-500">Upcoming planned service windows for platform upgrades.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Routine Platform Maintenance', window: 'Nov 02, 2026 (02:00 - 04:00 GMT)', duration: '2 Hours', features: 'CBT Drill Engine, Leaderboard Sync', status: 'Scheduled' },
                { title: 'Database Optimisation', window: 'Nov 18, 2026 (01:00 - 03:00 GMT)', duration: '2 Hours', features: 'University Directory, Scholarship Searches', status: 'Upcoming' },
                { title: 'Feature Deployment (v1.1 Release)', window: 'Dec 05, 2026 (03:00 - 04:30 GMT)', duration: '1.5 Hours', features: 'Parent Dashboard Sync, AI Tutor 2.0', status: 'Scheduled' },
                { title: 'Security Improvements', window: 'Dec 20, 2026 (02:00 - 03:00 GMT)', duration: '1 Hour', features: 'OAuth Authentication, User Settings', status: 'Planned' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-amber-200/60 dark:border-amber-800/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#0F172A] dark:text-white">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F59E0B] text-white">
                      {item.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="material-symbols-outlined text-sm text-[#F59E0B]">schedule</span>
                      <span><strong>Window:</strong> {item.window}</span>
                    </div>
                    <div className="text-[11px]"><strong>Expected Duration:</strong> {item.duration}</div>
                    <div className="text-[11px]"><strong>Affected Features:</strong> {item.features}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MOBILE APP HUB SECTION */}
        <section id="mobile-app-hub" className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#0F9D58] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider inline-block">
                JAMB Compass Mobile 2026
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Study Anywhere with JAMB Compass
              </h2>

              <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
                Access study resources, reminders, CBT practice, scholarships, and your learning dashboard from anywhere on Android or iOS.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => triggerToast('Initiating iOS App Store download demo placeholder...')}
                  className="px-5 py-3 bg-white text-[#0F172A] hover:bg-slate-100 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">apple</span>
                  <div className="text-left">
                    <span className="text-[9px] uppercase block text-slate-500 font-semibold">Download on the</span>
                    <span>App Store</span>
                  </div>
                </button>

                <button 
                  onClick={() => triggerToast('Initiating Google Play Store download demo placeholder...')}
                  className="px-5 py-3 bg-white text-[#0F172A] hover:bg-slate-100 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg text-[#0F9D58]">play_store</span>
                  <div className="text-left">
                    <span className="text-[9px] uppercase block text-slate-500 font-semibold">Get it on</span>
                    <span>Google Play</span>
                  </div>
                </button>

                <button 
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">qr_code_2</span>
                  <span>Scan QR Code</span>
                </button>
              </div>

              {/* Required Notice */}
              <p className="text-[11px] text-slate-300 italic pt-2">
                * Note: Mobile applications are demonstration placeholders for the 2026 JAMB admission season.
              </p>
            </div>

            {/* Mobile Devices Mockup Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-96 bg-slate-800 rounded-[3rem] p-3 border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between">
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2"></div>
                <div className="flex-1 bg-white text-[#0F172A] rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F9D58]">JAMB Compass</span>
                    <span className="text-[10px] bg-emerald-100 text-[#0F9D58] px-2 py-0.5 rounded-full font-bold">2026 App</span>
                  </div>

                  <div className="space-y-2 my-auto">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold block">Daily CBT Drill</span>
                      <strong className="text-xs text-[#0F172A]">Physics: Use of Calculators</strong>
                    </div>
                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-[#0F9D58]">
                      <span className="text-[10px] font-bold block">2026 Target Score</span>
                      <strong className="text-sm">315 / 400 (85% Progress)</strong>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-[#0F9D58] text-white rounded-xl text-xs font-bold">
                    Start Practice Drill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S NEW (RELEASE NOTES CARDS, 2026) */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold font-display">What's New in 2026</h2>
            <p className="text-xs text-slate-500">Official release notes and feature improvements added to JAMB Compass.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { ver: 'v1.0 (Current)', date: 'Oct 15, 2026', title: 'Improved Candidate Dashboard', desc: 'Enhanced real-time score tracking, parent monitoring code generator, and subject check widgets.', icon: 'dashboard', color: 'bg-[#0F9D58]' },
              { ver: 'v0.9.5', date: 'Sep 28, 2026', title: 'New Scholarship Hub', desc: 'Added filterable database of 80+ tertiary scholarships with 2026 application deadline alerts.', icon: 'payments', color: 'bg-[#2563EB]' },
              { ver: 'v0.9.0', date: 'Aug 14, 2026', title: 'Enhanced CBT Practice', desc: 'Full 2026 JAMB question bank integration with instant explanations and topic weak-spot analysis.', icon: 'quiz', color: 'bg-[#F59E0B]' },
              { ver: 'v0.8.5', date: 'Jul 02, 2026', title: 'Smarter Study Planner', desc: 'Automated study schedule generator matching target score goals with official 2026 exam timetables.', icon: 'calendar_today', color: 'bg-[#9333EA]' },
              { ver: 'v0.8.0', date: 'May 19, 2026', title: 'Updated University Directory', desc: 'Complete 2026 catchment criteria, post-UTME cutoff marks, and course faculty requirements.', icon: 'account_balance', color: 'bg-[#0891B2]' },
              { ver: 'v0.7.5', date: 'Apr 05, 2026', title: 'Community Challenges', desc: 'Weekly peer mock exam leaderboards, study group challenges, and subject streak rewards.', icon: 'military_tech', color: 'bg-[#16A34A]' },
            ].map((rel, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border shadow-sm transition-all hover:shadow-md ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-2xl ${rel.color} text-white flex items-center justify-center font-bold`}>
                    <span className="material-symbols-outlined text-xl">{rel.icon}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#0F9D58] block">{rel.ver}</span>
                    <span className="text-[10px] text-slate-400">{rel.date}</span>
                  </div>
                </div>

                <h3 className="font-bold text-base mb-2 text-[#0F172A] dark:text-white">{rel.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{rel.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SYSTEM STATES SHOWCASE SECTION */}
        <section id="system-states" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold font-display">System States Showcase</h2>
              <p className="text-xs text-slate-500">Interactive preview of handled application states (404, 500, Offline, Loading, Empty, Success).</p>
            </div>

            <span className="text-xs font-bold text-[#0F9D58]">Click any state below to view full UI demo</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { id: '404', label: '404 Not Found', icon: 'search_off', color: 'border-amber-300 text-amber-600' },
              { id: '500', label: '500 Server Error', icon: 'report', color: 'border-rose-300 text-rose-600' },
              { id: 'offline', label: 'Offline Mode', icon: 'wifi_off', color: 'border-blue-300 text-blue-600' },
              { id: 'loading', label: 'Loading State', icon: 'progress_activity', color: 'border-purple-300 text-purple-600' },
              { id: 'empty', label: 'Empty State', icon: 'inbox', color: 'border-slate-300 text-slate-600' },
              { id: 'success', label: 'Success State', icon: 'check_circle', color: 'border-emerald-300 text-[#0F9D58]' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setPreviewState(st.id as any)}
                className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all text-center space-y-2 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <span className={`material-symbols-outlined text-3xl block mx-auto ${st.color}`}>{st.icon}</span>
                <span className="text-xs font-bold block text-[#0F172A] dark:text-white">{st.label}</span>
                <span className="text-[10px] text-[#0F9D58] font-semibold block">Preview UI</span>
              </button>
            ))}
          </div>
        </section>

        {/* HELPFUL RESOURCES */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold font-display">Helpful Resources</h2>
            <p className="text-xs text-slate-500">Quick links to candidate support tools and admission guides.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { title: 'Help Centre', icon: 'help', tab: 'help-centre' },
              { title: 'FAQ Section', icon: 'quiz', tab: 'help-centre' },
              { title: 'Support Tickets', icon: 'support_agent', tab: 'help-centre' },
              { title: 'AI Assistant', icon: 'smart_toy', tab: 'dashboard' },
              { title: 'Study Planner', icon: 'calendar_month', tab: 'study-planner' },
              { title: 'University Directory', icon: 'account_balance', tab: 'universities' },
              { title: 'Community Forum', icon: 'groups', tab: 'leaderboard' },
            ].map((res, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab && setActiveTab(res.tab as any)}
                className={`p-4 rounded-2xl border text-center space-y-2 shadow-sm hover:shadow-md transition-all ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-[#0F172A]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-xl">{res.icon}</span>
                </div>
                <span className="text-xs font-bold block">{res.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* REPORT A PROBLEM (SUPPORT FORM) */}
        <section className={`p-6 sm:p-10 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold uppercase">
                Platform Helpdesk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">Report a Platform Problem</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Encountering an issue on the JAMB Compass website or mobile app? Submit a ticket directly to our operational response team.
              </p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Issue Category</label>
                  <select
                    value={reportCategory}
                    onChange={(e) => setReportCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#0F9D58]"
                  >
                    <option>CBT Practice Engine</option>
                    <option>Study Planner Calculation</option>
                    <option>Scholarships Database</option>
                    <option>University Directory</option>
                    <option>Account & Authentication</option>
                    <option>Mobile App Sync Placeholder</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief summary of problem..."
                    value={reportSubject}
                    onChange={(e) => setReportSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#0F9D58]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe what happened, what step caused the issue, and expected behavior..."
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#0F9D58]"
                />
              </div>

              {/* Screenshot Upload Placeholder */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Screenshot Upload (Optional Placeholder)</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <span className="material-symbols-outlined text-2xl text-slate-400 block mb-1">upload_file</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                    {reportFileName ? `Selected file: ${reportFileName}` : 'Click to select screenshot or drag & drop'}
                  </span>
                  <span className="text-[10px] text-slate-400">PNG, JPG up to 5MB</span>
                  <input 
                    type="file" 
                    onChange={(e) => e.target.files?.[0] && setReportFileName(e.target.files[0].name)}
                    className="hidden" 
                    id="screenshot-input"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
                <strong>Notice:</strong> Reports relate strictly to JAMB Compass platform functionality only, not official JAMB servers.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setReportSubject('');
                    setReportDesc('');
                    setReportFileName(null);
                  }}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReport}
                  className="px-6 py-2.5 bg-[#0F9D58] hover:bg-[#16A34A] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  {isSubmittingReport ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">send</span>
                      <span>Submit Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold font-display">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500">Common inquiries regarding platform status, mobile downloads, and service updates.</p>
          </div>

          <div className="space-y-3">
            {[
              { q: 'How do I know if the platform is down?', a: 'Check this Platform Status dashboard. If a service shows Degraded, Maintenance, or Offline, our engineering team is actively monitoring or resolving the node.' },
              { q: 'Where can I report technical issues?', a: 'Use the "Report a Platform Problem" form above or submit a support ticket via the Help Centre. Support agents respond within 24 hours during the 2026 cycle.' },
              { q: 'What happens during maintenance?', a: 'During scheduled maintenance windows, certain features (like live leaderboard drills) may be temporarily paused while database optimizations are deployed.' },
              { q: 'Can I use the platform offline?', a: 'Yes! The JAMB Compass mobile application allows downloading CBT practice question banks for offline drill practice.' },
              { q: 'How do I download the mobile app?', a: 'Click the App Store or Google Play buttons in the Mobile App Hub section above, or scan the QR code to install the 2026 prep suite.' },
            ].map((faq, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all ${
                  openFaq === idx ? 'border-[#0F9D58] bg-[#0F9D58]/5' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm flex items-center justify-between text-[#0F172A] dark:text-white"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-base">
                    {openFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL & CONTACT CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Follow Updates', desc: 'Real-time status tweets & news alerts', icon: 'campaign', action: 'Follow @JAMBCompass' },
            { title: 'Email Support', desc: 'Direct inquiry for account assistance', icon: 'mail', action: 'support@jambcompass.ng' },
            { title: 'Community Forum', desc: 'Discuss issues with fellow candidates', icon: 'forum', action: 'Visit Forum (Demo)' },
            { title: 'Release Notes', desc: 'Complete 2026 version history', icon: 'history_edu', action: 'View All Releases' },
            { title: 'Platform Blog', desc: 'Admission advice and study guides', icon: 'article', action: 'Read 2026 Blog' },
          ].map((card, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold mb-3">
                  <span className="material-symbols-outlined text-xl">{card.icon}</span>
                </div>
                <h3 className="font-bold text-sm mb-1 text-[#0F172A] dark:text-white">{card.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{card.desc}</p>
              </div>
              <button 
                onClick={() => triggerToast(`Opening ${card.title} link...`)}
                className="text-xs font-bold text-[#0F9D58] hover:underline flex items-center gap-1"
              >
                <span>{card.action}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </section>

        {/* FINAL CALL TO ACTION (EMERALD & NAVY GRADIENT) */}
        <section className="bg-gradient-to-r from-[#0F172A] via-[#0F9D58] to-[#2563EB] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
            Your Complete Companion for the 2026 Admission Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed">
            Plan smarter, study consistently, explore opportunities, and stay informed with JAMB Compass throughout the 2026 academic cycle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab && setActiveTab('dashboard')}
              className="px-6 py-3 bg-white text-[#0F172A] hover:bg-slate-100 rounded-2xl font-bold text-xs shadow-md transition-all"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => setActiveTab && setActiveTab('study-planner')}
              className="px-6 py-3 bg-[#0F172A] text-white hover:bg-slate-900 rounded-2xl font-bold text-xs shadow-md transition-all border border-white/20"
            >
              Explore Study Hub
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={`pt-8 pb-4 border-t text-xs space-y-4 ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0F9D58] text-white flex items-center justify-center font-bold text-xs">
                C
              </div>
              <span className="font-bold text-[#0F172A] dark:text-white">JAMB Compass 2026</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                Version 1.0 (Demo)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-semibold">
              <button onClick={() => triggerToast('Privacy Policy (Demo 2026)')} className="hover:text-[#0F9D58]">Privacy Policy</button>
              <button onClick={() => triggerToast('Terms of Service (Demo 2026)')} className="hover:text-[#0F9D58]">Terms</button>
              <button onClick={() => triggerToast('Accessibility Commitment (WCAG AA)')} className="hover:text-[#0F9D58]">Accessibility</button>
              <button onClick={() => setActiveTab && setActiveTab('help-centre')} className="hover:text-[#0F9D58]">Contact</button>
              <button onClick={() => setActiveTab && setActiveTab('platform-status')} className="text-[#0F9D58] font-bold">System Status</button>
            </div>
          </div>

          <p className="text-center sm:text-left text-[11px] text-slate-400">
            Copyright © 2026 JAMB Compass. All rights reserved. Providing educational guidance and CBT preparation tools for Nigerian university candidates.
          </p>
        </footer>

      </div>

      {/* SYSTEM STATES SHOWCASE MODAL / PREVIEW DIALOG */}
      {previewState !== 'none' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-[#0F172A]'
          }`}>
            <button
              onClick={() => setPreviewState('none')}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* 404 PREVIEW */}
            {previewState === '404' && (
              <div className="text-center space-y-4 py-6">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">search_off</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">HTTP 404 Error</span>
                <h3 className="text-2xl font-extrabold font-display">We couldn't find that page.</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  The requested resource or syllabus page may have been moved, renamed, or is temporarily unavailable in the 2026 database.
                </p>
                <div className="flex justify-center gap-3 pt-4">
                  <button 
                    onClick={() => {
                      setPreviewState('none');
                      if (setActiveTab) setActiveTab('home');
                    }}
                    className="px-5 py-2.5 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A]"
                  >
                    Return Home
                  </button>
                  <button 
                    onClick={() => {
                      setPreviewState('none');
                      triggerToast('Opening global search dialog...');
                    }}
                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
                  >
                    Search Platform
                  </button>
                </div>
              </div>
            )}

            {/* 500 PREVIEW */}
            {previewState === '500' && (
              <div className="text-center space-y-4 py-6">
                <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">report</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">HTTP 500 Server Exception</span>
                <h3 className="text-2xl font-extrabold font-display">Something went wrong.</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  An unexpected exception occurred on the JAMB Compass node. Our automated telemetry alert has been fired for 2026 engineers.
                </p>
                <div className="flex justify-center pt-4">
                  <button 
                    onClick={() => {
                      setPreviewState('none');
                      triggerToast('Retrying operation...');
                    }}
                    className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* OFFLINE PREVIEW */}
            {previewState === 'offline' && (
              <div className="text-center space-y-4 py-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">wifi_off</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Network Connection Lost</span>
                <h3 className="text-2xl font-extrabold font-display">You're currently offline.</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Please check your internet connection. Cached study notes and saved offline CBT questions remain accessible.
                </p>
                <div className="flex justify-center pt-4">
                  <button 
                    onClick={() => {
                      setPreviewState('none');
                      triggerToast('Re-checking network connection...');
                    }}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            )}

            {/* LOADING PREVIEW */}
            {previewState === 'loading' && (
              <div className="space-y-4 py-6">
                <div className="flex items-center gap-3 justify-center text-purple-600">
                  <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-bold">Syncing 2026 Platform Data...</span>
                </div>

                {/* SKELETON CARDS */}
                <div className="space-y-3 pt-4">
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-700/60 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-700/60 rounded-lg animate-pulse"></div>
                  <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                </div>

                <div className="text-center pt-4">
                  <button 
                    onClick={() => setPreviewState('none')}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-xs font-bold rounded-xl"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            )}

            {/* EMPTY PREVIEW */}
            {previewState === 'empty' && (
              <div className="text-center space-y-4 py-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">inbox</span>
                </div>
                <h3 className="text-2xl font-extrabold font-display">No data available yet.</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You have not logged any completed practice drills or scholarship bookmarks for the 2026 academic cycle.
                </p>
                <div className="flex justify-center pt-4">
                  <button 
                    onClick={() => {
                      setPreviewState('none');
                      if (setActiveTab) setActiveTab('cbt-practice');
                    }}
                    className="px-6 py-2.5 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A]"
                  >
                    Explore Platform
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS PREVIEW */}
            {previewState === 'success' && (
              <div className="text-center space-y-4 py-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#0F9D58] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#0F9D58] text-xs font-bold">Confirmation</span>
                <h3 className="text-2xl font-extrabold font-display">Action completed successfully.</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your 2026 study plan target has been saved and synced across all your connected devices.
                </p>
                <div className="flex justify-center pt-4">
                  <button 
                    onClick={() => setPreviewState('none')}
                    className="px-6 py-2.5 bg-[#0F9D58] text-white rounded-xl text-xs font-bold hover:bg-[#16A34A]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl relative text-center space-y-4 ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-[#0F172A]'
          }`}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="material-symbols-outlined text-4xl text-[#0F9D58]">qr_code_2</span>
            <h3 className="text-xl font-bold font-display">Scan QR Code</h3>
            <p className="text-xs text-slate-500">Scan with your phone camera to open the 2026 JAMB Compass mobile installer.</p>

            <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto shadow-inner border border-slate-200 flex items-center justify-center">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://jambcompass.ng/app-2026" 
                alt="QR Code Placeholder"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[10px] text-slate-400 italic">
              * Demonstration placeholder for 2026 mobile app setup.
            </p>

            <button 
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-700 font-bold text-xs rounded-xl"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
