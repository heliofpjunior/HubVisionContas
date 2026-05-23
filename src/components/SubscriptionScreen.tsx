/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen } from '../types';
import {
  TrendingUp,
  Award,
  Link,
  History,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

interface SubscriptionScreenProps {
  moveToScreen: (screen: Screen) => void;
  discountApplied: boolean;
  setDiscountApplied: (applied: boolean) => void;
}

export default function SubscriptionScreen({
  moveToScreen,
  discountApplied,
  setDiscountApplied
}: SubscriptionScreenProps) {
  const [crc, setCrc] = useState('');
  const [accountingEmail, setAccountingEmail] = useState('');
  const [connecting, setConnecting] = useState(false);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crc || !accountingEmail) return;

    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setDiscountApplied(true);
      alert(
        'Desconto Ativado! Parabéns, sua contabilidade parceira foi conectada. Você acaba de receber 25% de desconto vitalício na sua mensalidade. Seu valor mensal passará de R$ R$ 459,90 para R$ R$ 344,92!'
      );
    }, 1200);
  };

  const basePrice = 459.90;
  const currentPrice = discountApplied ? basePrice * 0.75 : basePrice;

  return (
    <div className="flex-1 bg-[#f7f9fb] min-h-screen relative font-sans select-none pb-24 md:pb-8">
      {/* Page Header */}
      <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-black tracking-tight mb-2">Gestão de Assinatura</h2>
          <p className="text-sm text-[#505f76] font-normal">
            Gerencie seus planos, limites e conexões contábeis em um só lugar.
          </p>
        </header>

        {/* Dynamic Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Plan Status Card */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200/60 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 bg-[#d0e1fb]/90 text-[#0d1c32] text-xs font-bold rounded-full mb-3 gap-1.5 border border-[#b9c7e4]/20">
                    <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                    <span>PLANO DP ESSENCIAL</span>
                  </span>
                  <h3 className="text-xl font-bold text-[#191c1e] tracking-tight">Assinatura Ativa</h3>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRÓXIMA FATURA</p>
                  <p className="text-2xl font-black text-black">R$ {currentPrice.toFixed(2).replace('.', ',')}</p>
                  {discountApplied && (
                    <p className="text-xs font-bold text-emerald-600 line-through">
                      De R$ {basePrice.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                  <p className="text-xs text-[#505f76] mt-0.5">Vencimento em 15/10/2023</p>
                </div>
              </div>

              {/* Collapsed progress indicator bar */}
              <div className="bg-[#f2f4f6] rounded-xl p-6 mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-[#44474d]">Uso de Colaboradores</span>
                  <span className="text-sm font-bold text-black">12 / 25</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full transition-all duration-1000 w-[48%]"></div>
                </div>
                <p className="mt-2 text-xs text-slate-500 font-medium">
                  Você ainda pode adicionar 13 colaboradores neste plano.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => moveToScreen(Screen.Checkout)}
                className="bg-black hover:bg-slate-900 text-white px-5 py-3 rounded-xl font-semibold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all cursor-pointer shadow-md"
              >
                <span>Upgrade de Plano</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={() => moveToScreen(Screen.Invoices)}
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer"
              >
                Ver Faturas
              </button>
            </div>
          </div>

          {/* Accountant Partner Discount Card */}
          <div className="lg:col-span-5 xl:col-span-4 bg-[#0d1c32] text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-slate-800">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Award className="text-[#d3e4fe] w-7 h-7 shrink-0" />
                <h3 className="text-lg font-bold text-white tracking-tight">Contador Conectado</h3>
              </div>
              <p className="text-xs text-[#76849f] leading-relaxed mb-6">
                Conecte sua conta à sua contabilidade parceira e receba{' '}
                <strong className="text-[#d3e4fe]">25% de desconto vitalício</strong> na sua mensalidade.
              </p>

              {discountApplied ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 space-y-1 text-xs">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Conexão Ativa!</span>
                  </p>
                  <p className="text-slate-300">Desconto vitalício de 25% já sendo aplicado.</p>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleApplyDiscount}>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#76849f]">CRC do Contador</label>
                    <input
                      required
                      value={crc}
                      onChange={(e) => setCrc(e.target.value)}
                      className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#76849f]/70 focus:ring-2 focus:ring-[#d3e4fe] focus:border-transparent outline-none transition-all"
                      placeholder="Ex: MG-000000/O"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#76849f]">E-mail do Escritório</label>
                    <input
                      required
                      value={accountingEmail}
                      onChange={(e) => setAccountingEmail(e.target.value)}
                      className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#76849f]/70 focus:ring-2 focus:ring-[#d3e4fe] focus:border-transparent outline-none transition-all"
                      placeholder="contato@escritorio.com.br"
                      type="email"
                    />
                  </div>
                  <button
                    disabled={connecting}
                    className="bg-[#d3e4fe] hover:bg-[#b7c8e1] text-[#0b1c30] py-3 rounded-xl font-semibold text-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
                    type="submit"
                  >
                    {connecting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0b1c30]" />
                        <span>Autenticando CRC...</span>
                      </>
                    ) : (
                      <>
                        <span>Ativar Desconto</span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            {/* Decorative background circle */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d3e4fe]/5 rounded-full -mr-16 -mb-16 pointer-events-none"></div>
          </div>

          {/* Quick Actions Auxiliary Services */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f2f4f6]/60 p-5 rounded-2xl flex items-center gap-4 border border-slate-200/40 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-sm shrink-0 border border-slate-100">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#191c1e]">Histórico</h4>
                <p className="text-xs text-slate-500 font-medium">Logs de alteração</p>
              </div>
            </div>

            <div className="bg-[#f2f4f6]/60 p-5 rounded-2xl flex items-center gap-4 border border-slate-200/40 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-sm shrink-0 border border-slate-100">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#191c1e]">Pagamento</h4>
                <p className="text-xs text-slate-500 font-medium">Final **** 4421</p>
              </div>
            </div>

            <div className="bg-[#f2f4f6]/60 p-5 rounded-2xl flex items-center gap-4 border border-slate-200/40 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-sm shrink-0 border border-slate-100">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#191c1e]">Segurança</h4>
                <p className="text-xs text-slate-500 font-medium">Acessos e auditoria</p>
              </div>
            </div>
          </div>

          {/* Interactive Promo Banner */}
          <div className="lg:col-span-12 relative rounded-3xl h-56 overflow-hidden group border border-slate-200/50 shadow-sm select-none">
            <img
              alt="Plano Enterprise Promotion banner"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnOBJlOE6LWKyhs7txHff_FHeUYwa3RI8HHyyym5A6GJ6ZNBjAX84e1hJAFYj9xIYOZYL4sl7whUOp3GRNh1U9t0YmapFbOUTlpjcSnI2grQ-cERwmvW-8UyOeAZFfeoiV5XadrRrG33-swdDd6ThD0k6eJZPqYB9laAyLTKSkyK844Fh-xPa8rMhlteM4f7Q35Vox7UxHkiJWIxndg9nSmVAkeWFh1vmMyVUuxM_nkP7FlqAJUO2k4LKlhS2vwIzp2k24InkwTcwq"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent flex items-center px-8 md:px-12">
              <div className="max-w-md">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">Explore o Plano Enterprise</h3>
                <p className="text-xs md:text-sm text-slate-300 mb-4 font-normal leading-relaxed">
                  Gestão avançada de múltiplos CNPJs, integração total via API e suporte dedicado 24/7.
                </p>
                <button
                  onClick={() => moveToScreen(Screen.Checkout)}
                  className="bg-white hover:bg-slate-100 text-black px-5 py-2.5 rounded-full font-semibold text-xs active:scale-[0.98] transition-all cursor-pointer shadow"
                >
                  Conhecer mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
