import React, { useState } from 'react';
import { COMPANY } from '../constants/company';
import { loginUser, registerUser } from '../services/authService';
import { UserProfile, UserRole } from '../types';
import {
  Coffee,
  Lock,
  Mail,
  User,
  Building2,
  Phone,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  onAuthSuccess: (user: UserProfile) => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onAuthSuccess,
  onNavigateHome
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Register form state
  const [regCompany, setRegCompany] = useState<string>('');
  const [regBuyerName, setRegBuyerName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regCountry, setRegCountry] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  // Fast Demo 1-Click login helper
  const handleQuickDemoLogin = async (demoEmail: string, demoPass: string) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const user = await loginUser(demoEmail, demoPass);
      onAuthSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!loginEmail.trim() || !loginPassword) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser(loginEmail, loginPassword);
      onAuthSuccess(user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    setIsLoading(true);
    try {
      const user = await registerUser({
        companyName: regCompany,
        buyerName: regBuyerName,
        email: regEmail,
        phoneWhatsApp: regPhone,
        country: regCountry,
        password: regPassword,
        confirmPassword: regConfirmPassword
      });
      setSuccessMessage('Account created successfully! Logging you in...');
      setTimeout(() => {
        onAuthSuccess(user);
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F4EFE6] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#5A4630] hover:text-[#14281D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>
          <span className="text-xs text-[#8A7459] font-medium">
            Ethiopian Specialty Coffee Export Portal
          </span>
        </div>

        {/* Card Box */}
        <div className="bg-[#FAF5EE] rounded-3xl border border-[#D9CDB8] shadow-xl overflow-hidden">
          {/* Header banner */}
          <div className="bg-[#14281D] text-[#FAF5EE] px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-[#C8963E]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8963E] to-[#8C6220] text-[#14281D] mb-3 shadow-md">
              <Coffee className="w-8 h-8 stroke-[2.2]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#EADFCB] tracking-wide uppercase">
              {COMPANY.shortName}
            </h1>
            <p className="text-xs text-[#C8963E] mt-1 font-serif italic">
              "{COMPANY.slogan}"
            </p>
            <p className="text-xs text-[#A8987E] mt-2 max-w-md mx-auto">
              Secure commercial gateway for international green coffee buyers, quality inspectors, and export staff.
            </p>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#0D1A13] p-1 rounded-xl max-w-xs mx-auto mt-6 border border-[#2A4434]">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#C8963E] text-[#14281D] shadow-sm'
                    : 'text-[#C2B59B] hover:text-[#FAF5EE]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#C8963E] text-[#14281D] shadow-sm'
                    : 'text-[#C2B59B] hover:text-[#FAF5EE]'
                }`}
              >
                Register as Buyer
              </button>
            </div>
          </div>

          {/* Quick Demo Login Pill Bar */}
          <div className="bg-[#ECE4D4] px-6 py-3 border-b border-[#D9CDB8] text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-semibold text-[#5A4630] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
                Demo 1-Click Access:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('buyer@sample.com', 'password123')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF5EE] hover:bg-white text-[#14281D] border border-[#C8B89E] font-medium text-[11px] hover:border-[#14281D] transition-colors cursor-pointer"
                >
                  👤 Sample Buyer
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('staff@mesfincoffee.com', 'staff123')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF5EE] hover:bg-white text-[#14281D] border border-[#C8B89E] font-medium text-[11px] hover:border-[#14281D] transition-colors cursor-pointer"
                >
                  📋 Export Staff
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin@mesfincoffee.com', 'admin123')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF5EE] hover:bg-white text-[#14281D] border border-[#C8B89E] font-medium text-[11px] hover:border-[#14281D] transition-colors cursor-pointer"
                >
                  ⚡ Admin
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Error or Success notification */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Error:</span> {errorMessage}
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Success:</span> {successMessage}
                </div>
              </div>
            )}

            {mode === 'login' ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8A7459] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. buyer@sample.com or your-email@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D0C2AB] rounded-xl text-sm text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-2 focus:ring-[#14281D]/20 focus:border-[#14281D]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[#3D2F1F] uppercase tracking-wider">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8A7459] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#D0C2AB] rounded-xl text-sm text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-2 focus:ring-[#14281D]/20 focus:border-[#14281D]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7459] hover:text-[#1E2421] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full justify-center mt-2"
                >
                  {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
                </Button>

                <div className="pt-4 border-t border-[#E8DFC8] text-center text-xs text-[#705C45]">
                  <span>Don't have an international buyer account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setErrorMessage(null);
                    }}
                    className="font-bold text-[#14281D] hover:underline cursor-pointer"
                  >
                    Register here
                  </button>
                </div>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="e.g. Nordic Roasters AB"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Buyer / Contact Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={regBuyerName}
                        onChange={(e) => setRegBuyerName(e.target.value)}
                        placeholder="e.g. Elena Lindqvist"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      WhatsApp / Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+46 70 123 4567"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Country of Import *
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={regCountry}
                      onChange={(e) => setRegCountry(e.target.value)}
                      placeholder="e.g. Germany, Japan, United States, Saudi Arabia..."
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Password (min 6 chars) *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#A4947E] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full justify-center mt-3"
                >
                  {isLoading ? 'Creating Account...' : 'Complete Buyer Registration'}
                </Button>

                <div className="pt-3 border-t border-[#E8DFC8] text-center text-xs text-[#705C45]">
                  <span>Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                    }}
                    className="font-bold text-[#14281D] hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security & Confidentiality Footer */}
        <div className="mt-6 text-center text-xs text-[#7A664E] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C8963E]" />
          <span>Direct export relationship with Mesfin Girma Gemeda Coffee Supplies & Exporter.</span>
        </div>
      </div>
    </div>
  );
};
