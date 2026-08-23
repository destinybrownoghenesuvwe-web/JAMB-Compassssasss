import React, { useState } from 'react';
import {
  Compass,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Phone,
  Mail
} from 'lucide-react';
import { TabType } from '../types';

interface LoginPageProps {
  initialMode?: 'login' | 'signup';
  onClose?: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
  setActiveTab?: (tab: TabType) => void;
  isModal?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialMode = 'login',
  onClose,
  onSuccess,
  setActiveTab,
  isModal = false,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Form fields
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneOrCode, setPhoneOrCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Interaction & Validation states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setForgotPasswordNotice(false);

    // Basic Validation
    if (!emailOrUsername.trim()) {
      setErrorMessage('Please enter your email or username.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    // Check basic email format if user entered an '@' symbol
    if (emailOrUsername.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against JAMB Compass user backend
    setTimeout(() => {
      setIsLoading(false);
      
      const computedName = mode === 'login' 
        ? (emailOrUsername.split('@')[0] || 'Student').replace(/[^a-zA-Z0-9_]/g, ' ')
        : fullName.trim();
      const computedEmail = emailOrUsername.includes('@') ? emailOrUsername.trim() : `${emailOrUsername.trim().toLowerCase()}@student.jambcompass.ng`;

      setSuccessMessage(mode === 'login' ? 'Login successful! Redirecting to your dashboard...' : 'Account created successfully! Welcome to JAMB Compass.');

      setTimeout(() => {
        onSuccess({
          name: computedName.charAt(0).toUpperCase() + computedName.slice(1),
          email: computedEmail,
        });
        if (onClose) onClose();
      }, 1000);
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const computedName = `${provider} Student`;
      const computedEmail = `user.${provider.toLowerCase()}@jambcompass.ng`;

      setSuccessMessage(`Authenticated with ${provider}! Redirecting...`);

      setTimeout(() => {
        onSuccess({
          name: computedName,
          email: computedEmail,
        });
        if (onClose) onClose();
      }, 1000);
    }, 1000);
  };

  const handleForgotPassword = () => {
    if (!emailOrUsername.trim()) {
      setErrorMessage('Please enter your email address or username above first.');
      return;
    }
    setErrorMessage(null);
    setForgotPasswordNotice(true);
  };

  const containerContent = (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden relative flex flex-col md:flex-row transition-all duration-300">
      
      {/* Optional Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          aria-label="Close modal"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* ==========================================
          LEFT WELCOME & BRAND PANEL (WITH DIAGONAL CUT)
         ========================================== */}
      <div className="md:w-5/12 bg-gradient-to-br from-[#F5FBF7] via-[#E8F5EC] to-[#DDF0E3] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden text-[#111827]">
        
        {/* Diagonal Visual Separation Overlay for Desktop */}
        <div 
          className="hidden md:block absolute -right-12 top-0 bottom-0 w-24 bg-white z-10 transform skew-x-[-12deg]"
          aria-hidden="true"
        ></div>

        {/* Decorative Background Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#82faab]/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top Logo Section */}
        <div className="relative z-20 space-y-6">
          <div 
            onClick={() => setActiveTab && setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group inline-flex"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#16A34A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black font-display text-[#16A34A] tracking-tight">
                JAMB Compass
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                2026 UTME Suite
              </span>
            </div>
          </div>

          {/* Dynamic Headline */}
          <div className="pt-4 space-y-3">
            <h1 className="text-3xl lg:text-4xl font-black font-display text-[#111827] leading-tight tracking-tight">
              {mode === 'login' ? (
                <>
                  WELCOME <span className="text-[#16A34A] underline decoration-[#82faab] decoration-4 underline-offset-4">BACK!</span>
                </>
              ) : (
                <>
                  JOIN <span className="text-[#16A34A] underline decoration-[#82faab] decoration-4 underline-offset-4">US!</span>
                </>
              )}
            </h1>

            <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
              {mode === 'login'
                ? 'Log in to continue your journey and access your JAMB Compass dashboard.'
                : 'Create your free portal account to track subject combinations, CBT drills, and university requirements.'}
            </p>
          </div>

          {/* Educational Feature Pills */}
          <div className="pt-2 flex flex-col gap-2.5 max-w-xs">
            <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-white/60 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <span className="text-xs font-semibold text-[#111827]">Instant Syllabus &amp; Past Questions</span>
            </div>

            <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl border border-white/60 shadow-2xs">
              <div className="w-6 h-6 rounded-lg bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <span className="text-xs font-semibold text-[#111827]">Cut-off &amp; CAPS Eligibility Checkers</span>
            </div>
          </div>
        </div>

        {/* Bottom Security / Trust Section */}
        <div className="relative z-20 pt-8 mt-8 border-t border-[#16A34A]/20">
          <div className="flex items-start gap-3 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-[#16A34A]/10 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#111827]">Your data is safe with us.</h4>
              <p className="text-[11px] text-[#6B7280] font-medium leading-normal">
                We use secure technology to help protect your information.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          RIGHT FORM PANEL
         ========================================== */}
      <div className="md:w-7/12 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white z-20 relative">
        
        {/* Form Header */}
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#111827]">
            {mode === 'login' ? (
              <>
                Log <span className="text-[#16A34A]">In</span>
              </>
            ) : (
              <>
                Create <span className="text-[#16A34A]">Account</span>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] font-medium">
            {mode === 'login'
              ? 'Welcome back! Please enter your details.'
              : 'Enter your credentials to register your student portal.'}
          </p>
        </div>

        {/* Validation Error Message Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Message Alert */}
        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Forgot Password Notice */}
        {forgotPasswordNotice && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <Mail className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Password reset instructions have been sent to {emailOrUsername || 'your email'}. Check your inbox.</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Extra Fields for Sign Up Mode */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-xs font-bold text-[#111827] block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chukwudi Abubakar Ogunlewé"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#16A34A] focus:bg-white text-[#111827] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* Email or Username Input */}
          <div className="space-y-1">
            <label htmlFor="emailOrUsername" className="text-xs font-bold text-[#111827] block">
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="emailOrUsername"
                type="text"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#16A34A] focus:bg-white text-[#111827] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Extra Field: Phone or JAMB Profile Code for Sign Up */}
          {mode === 'signup' && (
            <div className="space-y-1">
              <label htmlFor="phoneOrCode" className="text-xs font-bold text-[#111827] block">
                JAMB Profile Code or Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="phoneOrCode"
                  type="tel"
                  value={phoneOrCode}
                  onChange={(e) => setPhoneOrCode(e.target.value)}
                  placeholder="e.g. 08012345678 or 10-digit profile code"
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#16A34A] focus:bg-white text-[#111827] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition-all font-medium"
                />
              </div>
            </div>
          )}

          {/* Password Input with Visibility Toggle */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-bold text-[#111827] block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#F8FAFC] border border-[#E5E7EB] focus:border-[#16A34A] focus:bg-white text-[#111827] text-xs sm:text-sm rounded-xl pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#16A34A] transition-colors focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login Options: Remember Me & Forgot Password */}
          {mode === 'login' && (
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#111827] font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A] border-slate-300 accent-[#16A34A]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#16A34A] hover:underline font-bold transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Primary Login / Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#16A34A] hover:bg-[#15803D] active:bg-[#15803D] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75 disabled:cursor-not-allowed group focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>{mode === 'login' ? 'Logging in...' : 'Creating account...'}</span>
              </>
            ) : (
              <>
                <span>{mode === 'login' ? 'Log In' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E7EB]"></div>
          </div>
          <div className="relative inline-block bg-white px-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
            Or continue with
          </div>
        </div>

        {/* Official Outlined Social Buttons (Google, Apple, Microsoft) */}
        <div className="grid grid-cols-3 gap-3">
          
          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#E5E7EB] hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-[#111827] transition-all shadow-2xs group"
            title="Continue with Google"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="hidden sm:inline">Google</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Apple')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#E5E7EB] hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-[#111827] transition-all shadow-2xs group"
            title="Continue with Apple"
          >
            <svg className="w-4 h-4 shrink-0 fill-current text-[#111827]" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.81c.67-.82 1.13-1.96.99-3.11-1 .04-2.22.67-2.92 1.48-.63.73-1.18 1.9-1.03 3.03 1.12.09 2.28-.58 2.96-1.4" />
            </svg>
            <span className="hidden sm:inline">Apple</span>
          </button>

          {/* Microsoft Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Microsoft')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#E5E7EB] hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-[#111827] transition-all shadow-2xs group"
            title="Continue with Microsoft"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            <span className="hidden sm:inline">Microsoft</span>
          </button>

        </div>

        {/* Bottom Switch between Login & Sign Up */}
        <div className="mt-8 pt-4 border-t border-[#E5E7EB] text-center">
          <p className="text-xs text-[#6B7280] font-medium">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#16A34A] font-extrabold hover:underline transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#16A34A] font-extrabold hover:underline transition-colors"
                >
                  Log In
                </button>
              </>
            )}
          </p>
        </div>

      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        {containerContent}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8FAFC] py-10 px-4 sm:px-6 flex items-center justify-center">
      {containerContent}
    </div>
  );
};
