/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen } from '../types';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SSOLoginScreenProps {
  onLoginSuccess: () => void;
  onSwitchToWhiteLabel: () => void;
}

export default function SSOLoginScreen({ onLoginSuccess, onSwitchToWhiteLabel }: SSOLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login server authentication call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Let it play success animation before going forward
      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-center items-center px-4 overflow-hidden relative font-sans w-full select-none">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d6e3ff]/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d3e4fe]/30 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Toggle Switcher for Demo Scope completeness */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onSwitchToWhiteLabel}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-50 px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 transition-all flex items-center gap-1.5 cursor-pointer"
            id="login-switch-partner"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Simular Login Customizado (Contabilidade Alfa)</span>
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img
            alt="VisionBiz Logo"
            className="h-16 w-auto object-contain cursor-pointer transition-transform hover:scale-103"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXdLyG8Nh78OzOqjd1ikXbWXMyhbpAkomdqiGliZyu6Jgqtsqm_Z96cFmWohudkMcqSXQITMk1cQ8f4ovsWO6nDucmNMzZegECB-ESnO86gvgm6GJNCfAgGzAtUD7D4f8ukydJHbZrbZor6kG0wlhjr0MxbzMKZq2ATbW46g0IpoYDtxwm4E2lPZoae9c8msOqKjTpmbmobeIB3s-j98MLdyfQlmFL5yvYTlkTsrwsHhhYOIG0AYu1rYBfJ9Oh9-_ZqxiHwIXw7gvL"
          />
        </div>

        {/* Authentication Container */}
        <div className="bg-white rounded-2xl p-8 md:p-10 auth-card-shadow border border-slate-100/80">
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#191c1e] tracking-tight mb-2">Bem-vindo de volta</h1>
            <p className="text-sm text-[#44474d] font-normal">Acesse sua conta VisionBiz SSO Hub</p>
          </header>

          <form className="space-y-6" id="loginForm" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#44474d] block ml-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777e] flex items-center">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3 bg-[#f7f9fb] border border-[#c5c6cd]/60 rounded-xl text-base text-[#191c1e] placeholder:text-[#75777e]/60 focus:border-black focus:ring-3 focus:ring-black/5 outline-none transition-all"
                  id="email"
                  name="email"
                  placeholder="nome@exemplo.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-[#44474d]" htmlFor="password">
                  Senha
                </label>
                <a className="text-xs font-semibold text-[#000000] hover:underline" href="#forgot" onClick={(e) => e.preventDefault()}>
                  Esqueci minha senha
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777e] flex items-center">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  className="w-full pl-11 pr-12 py-3 bg-[#f7f9fb] border border-[#c5c6cd]/60 rounded-xl text-base text-[#191c1e] placeholder:text-[#75777e]/60 focus:border-black focus:ring-3 focus:ring-black/5 outline-none transition-all"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75777e] hover:text-black transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center px-1">
              <input
                className="w-4 h-4 text-black bg-white border-[#c5c6cd] rounded focus:ring-black transition-colors cursor-pointer"
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="ml-2.5 text-xs font-medium text-[#44474d] cursor-pointer select-none" htmlFor="remember">
                Lembrar deste dispositivo
              </label>
            </div>

            {/* Primary Action Button */}
            <button
              className={`w-full py-4 text-white rounded-xl font-semibold text-sm shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                success ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-black hover:bg-slate-900 active:scale-[0.98]'
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : success ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-100" />
                  <span>Acesso Concedido!</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>

          {/* Support Section */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
            <a
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#505f76] hover:text-black transition-colors"
              href="#support"
              onClick={(e) => e.preventDefault()}
            >
              <HelpCircle className="w-4 h-4 text-[#505f76] flex-shrink-0" />
              <span>Suporte VisionBiz</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#75777e]">
            <ShieldCheck className="w-4 h-4 text-[#505f76]/80" />
            <span>Powered by VisionBiz SSO</span>
          </div>
          <div className="flex justify-center gap-6 text-xs text-[#c5c6cd]">
            <a className="hover:text-[#44474d] transition-colors" href="#terms" onClick={(e) => e.preventDefault()}>
              Termos
            </a>
            <a className="hover:text-[#44474d] transition-colors" href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacidade
            </a>
            <a className="hover:text-[#44474d] transition-colors" href="#security" onClick={(e) => e.preventDefault()}>
              Segurança
            </a>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
