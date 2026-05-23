/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SSOLoginWhiteLabelScreenProps {
  onLoginSuccess: () => void;
  onSwitchToStandard: () => void;
}

export default function SSOLoginWhiteLabelScreen({ onLoginSuccess, onSwitchToStandard }: SSOLoginWhiteLabelScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 700);
    }, 1200);
  };

  return (
    <div
      className="bg-pattern min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden relative font-sans w-full select-none"
      style={{
        backgroundColor: '#f7f9fb',
        backgroundImage: 'radial-gradient(#d1d5db 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Decorative Atmosphere header */}
      <div className="fixed top-0 left-0 w-full h-[5px] bg-[#1A365D]/80 opacity-60 z-50"></div>

      {/* Giant faint bottom right shield background */}
      <div className="fixed bottom-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none text-[#1A365D]">
        <ShieldCheck className="w-[200px] h-[200px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Switch back switcher helper */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onSwitchToStandard}
            className="text-xs font-semibold text-slate-600 hover:text-black bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            id="login-switch-standard"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Voltar para Login Padrão VisionBiz</span>
          </button>
        </div>

        {/* Dynamic Partner Login Container */}
        <div className="bg-white border border-[#c5c6cd]/30 rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
          {/* Logo container low */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 flex items-center justify-center p-3 bg-[#f2f4f6] rounded-xl mb-2 border border-slate-100">
              <img
                alt="Contabilidade Alfa Logo"
                className="max-w-full max-h-full object-contain cursor-pointer transition-transform hover:scale-105"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcnvtiuVsnaxfah-YOIvpIv_9uerDDyqjVJq-bwEXmvbH7XuN7N1SRgSzlT8chc4nZT2rBOV82wJLD4P_1AfVuI8gui0YR60vODYO5gfgK8MPe6GtQvAX8hN91lgjDHlNnrOjkc7oTVIzgFHf9oSMDkciPtAAjQ9PphJTOC91xwd4V30d1ESYZ7MOjh_uUMmIVwyTrYaPvghs-JFFomsWe1ogNJzRsfqxOx8n2pSH2z-XYjaXvqBkkx80xgsuUaVQiWgr9Yp1MZwo8"
              />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-[#191c1e] tracking-tight">Login via Contabilidade Alfa</h1>
              <p className="text-sm font-normal text-[#44474d] mt-1">Acesse sua conta VisionBiz com segurança</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
            {/* E-mail Corporativo */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#44474d] ml-1 block" htmlFor="email">
                E-mail Corporativo
              </label>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777e] group-focus-within:text-[#1A365D] transition-colors flex items-center">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  className="w-full pl-11 pr-4 py-3 bg-[#f7f9fb] border border-[#c5c6cd]/60 rounded-xl text-base text-[#191c1e] placeholder:text-[#75777e]/60 focus:border-[#1A365D] focus:ring-3 focus:ring-[#1A365D]/10 outline-none transition-all font-sans"
                  id="email"
                  placeholder="nome@empresa.com.br"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-[#44474d]" htmlFor="password">
                  Senha
                </label>
                <a className="text-xs font-semibold text-[#1A365D] hover:underline" href="#forgot" onClick={(e) => e.preventDefault()}>
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777e] group-focus-within:text-[#1A365D] transition-colors flex items-center">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  className="w-full pl-11 pr-12 py-3 bg-[#f7f9fb] border border-[#c5c6cd]/60 rounded-xl text-base text-[#191c1e] placeholder:text-[#75777e]/60 focus:border-[#1A365D] focus:ring-3 focus:ring-[#1A365D]/10 outline-none transition-all font-sans"
                  id="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75777e] hover:text-[#1b2a47] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 px-1 pt-1">
              <input
                className="w-4 h-4 rounded border-[#c5c6cd] text-[#1A365D] focus:ring-[#1A365D] cursor-pointer"
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="text-xs font-semibold text-[#44474d] cursor-pointer select-none" htmlFor="remember">
                Lembrar neste dispositivo
              </label>
            </div>

            {/* Large White-Label CTA */}
            <button
              className={`w-full py-4 text-white rounded-xl font-semibold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                success ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#1A365D] hover:bg-[#0f233d] active:scale-[0.98]'
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
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>Autenticado!</span>
                </>
              ) : (
                <>
                  <span>Acessar Hub</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </form>

          {/* Identity Footnote */}
          <div className="pt-6 border-t border-slate-100 flex flex-col items-center">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-120/65 px-4 py-1.5 rounded-full">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#75777e]">Powered By</span>
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600 inline" />
                <span>VisionBiz Hub</span>
              </span>
            </div>
          </div>
        </div>

        {/* Custom simplified footer */}
        <footer className="mt-8 flex justify-center space-x-6 text-xs font-semibold text-[#75777e]/80">
          <a className="hover:text-black transition-colors" href="#help" onClick={(e) => e.preventDefault()}>
            Ajuda
          </a>
          <a className="hover:text-black transition-colors" href="#privacy" onClick={(e) => e.preventDefault()}>
            Privacidade
          </a>
          <a className="hover:text-black transition-colors" href="#terms" onClick={(e) => e.preventDefault()}>
            Termos
          </a>
        </footer>
      </motion.div>
    </div>
  );
}
