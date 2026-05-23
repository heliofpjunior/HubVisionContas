/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, CheckoutState } from '../types';
import {
  CreditCard,
  QrCode,
  FileText,
  Lock,
  ChevronLeft,
  DollarSign,
  Tag,
  ShieldCheck,
  Check,
  Building,
  Loader2,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutScreenProps {
  moveToScreen: (screen: Screen) => void;
  discountApplied: boolean;
}

export default function CheckoutScreen({ moveToScreen, discountApplied }: CheckoutScreenProps) {
  const [tab, setTab] = useState<'credit' | 'pix' | 'boleto'>('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [isSuccessOverlayOpen, setIsSuccessOverlayOpen] = useState(false);

  // Raw default order totals based on user's Image 7
  const baseSubtotal = 2388.00;
  // Apply the permanent CRC 25% discount if applied, else standard annual 20% discount
  const defaultAnnualDiscount = 477.60; // 20% discount
  const additionalPartnerDiscount = discountApplied ? baseSubtotal * 0.25 : 0;

  // Coupon Code calculations
  const getCouponValue = () => {
    if (appliedCoupon === 'VISION25') return (baseSubtotal - defaultAnnualDiscount) * 0.25;
    if (appliedCoupon === 'WELCOME20') return (baseSubtotal - defaultAnnualDiscount) * 0.20;
    return 0;
  };

  const couponDiscount = getCouponValue();
  const subtotal = baseSubtotal;
  const taxesValue = 0.00;
  const totalValue = Math.max(0, subtotal - defaultAnnualDiscount - additionalPartnerDiscount - couponDiscount + taxesValue);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCoupon = couponInput.trim().toUpperCase();
    if (cleanCoupon === 'VISION25' || cleanCoupon === 'WELCOME20') {
      setAppliedCoupon(cleanCoupon);
      alert(`Cupom ${cleanCoupon} aplicado com sucesso!`);
    } else {
      alert('Cupom inválido. Tente usar "VISION25" ou "WELCOME20".');
    }
    setCouponInput('');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted.slice(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiry(value.slice(0, 5));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value.slice(0, 4));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);

    setTimeout(() => {
      setCheckoutLoading(false);
      setIsSuccessOverlayOpen(true);
    }, 1800);
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText('00020126360014BR.GOV.BCB.PIX0114VISIONBIZHUB25');
    alert('Chave Copia e Cola Pix copiada para a área de transferência!');
  };

  return (
    <div className="flex-1 bg-[#f7f9fb] min-h-screen relative font-sans select-none pb-24 md:pb-8">
      {/* Container */}
      <div className="p-6 md:p-8 space-y-8 max-w-[1200px] mx-auto w-full">
        {/* Back Link */}
        <button
          onClick={() => moveToScreen(Screen.Subscription)}
          className="text-xs font-bold text-slate-500 hover:text-black flex items-center gap-1 bg-white border border-slate-300/60 px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4.5 h-4.5 text-slate-500" />
          <span>Voltar para Minha Conta</span>
        </button>

        {/* Page title */}
        <header className="mb-4">
          <h2 className="text-3xl font-bold text-black tracking-tight mb-2">Método de Pagamento</h2>
          <p className="text-sm text-[#505f76]">Finalize sua assinatura com total segurança.</p>
        </header>

        {/* Checkout Main Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Forms block */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-slate-500" />
              <span>Opções de Faturamento Seguro</span>
            </h3>

            {/* Selector Tabs */}
            <div className="grid grid-cols-3 bg-[#f2f4f6] rounded-xl p-1 mb-8">
              <button
                onClick={() => setTab('credit')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tab === 'credit' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-center">Cartão</span>
              </button>
              <button
                onClick={() => setTab('pix')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tab === 'pix' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Pix</span>
              </button>
              <button
                onClick={() => setTab('boleto')}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tab === 'boleto' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Boleto</span>
              </button>
            </div>

            {/* TAB: Credit card form */}
            {tab === 'credit' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Nome Impresso no Cartão</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: JOSÉ RAMOS SOUZA"
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none uppercase font-semibold text-slate-800"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Número do Cartão</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <CreditCard className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 4532 1102 9382 4242"
                      className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none font-mono tracking-wider text-slate-800 font-semibold"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Data de Expiração</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 12/28"
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none font-mono text-center text-slate-800 font-semibold"
                      value={expiry}
                      onChange={handleExpiryChange}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">CVC / Código de Segurança</label>
                    <input
                      type="password"
                      required
                      placeholder="Ex: 123"
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none font-mono text-center text-slate-800 font-semibold"
                      value={cvv}
                      onChange={handleCvvChange}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="save_card"
                    className="w-4 h-4 rounded border-slate-200 text-black focus:ring-black cursor-pointer"
                    defaultChecked
                  />
                  <label htmlFor="save_card" className="text-xs text-slate-500 font-semibold cursor-pointer">
                    Salvar este cartão para faturas e renovações recorrentes automáticas.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={checkoutLoading}
                  className="w-full bg-black hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer text-sm"
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validando Transação...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                      <span>Finalizar Assinatura</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB: Pix copy copy details */}
            {tab === 'pix' && (
              <div className="space-y-6 text-center py-6">
                <div className="inline-flex p-6 bg-slate-50 rounded-2xl border border-slate-200/50 justify-center">
                  {/* Decorative QR visual rendering key */}
                  <QrCode className="w-40 h-40 text-[#0d1c32]" />
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <h4 className="font-bold text-slate-900">Pague via Pix em segundos</h4>
                  <p className="text-xs text-[#505f76] leading-relaxed">
                    Escaneie o QR Code acima pelo app do seu banco ou copie e cole a linha de código Pix abaixo.
                  </p>
                </div>

                <div className="p-3 bg-[#f2f4f6] rounded-xl flex items-center justify-between border border-slate-200/40 max-w-md mx-auto">
                  <span className="font-mono text-center text-[10px] text-slate-550 truncate px-2 select-all">
                    00020126360014BR.GOV.BCB.PIX0114VISIONBIZHUB25
                  </span>
                  <button
                    onClick={handleCopyPixKey}
                    className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg shrink-0 cursor-pointer transition-colors shadow-sm"
                    id="btn-copy-pix"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setCheckoutLoading(true);
                    setTimeout(() => {
                      setCheckoutLoading(false);
                      setIsSuccessOverlayOpen(true);
                    }, 1200);
                  }}
                  className="w-full max-w-md mx-auto bg-black hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow mt-4 flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>Confirmar Pagamento Pix Realizado</span>
                </button>
              </div>
            )}

            {/* TAB: Boleto banner */}
            {tab === 'boleto' && (
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100">
                  <FileText className="w-8 h-8" />
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <h4 className="font-bold text-slate-900">Emissão de Boleto Bancário</h4>
                  <p className="text-xs text-[#505f76] leading-relaxed">
                    O boleto será emitido em PDF com vencimento para 3 dias corridos.
                  </p>
                </div>

                <div className="bg-amber-50/70 text-amber-800 border border-amber-100 p-4 rounded-xl text-left text-xs space-y-1.5 max-w-md mx-auto font-medium">
                  <p className="font-bold">Tempo de liberação:</p>
                  <p className="text-amber-700 font-normal leading-relaxed">
                    Faturas pagas via boleto bancário demoram até 3 dias úteis para aprovação e liberação no SSO Hub.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCheckoutLoading(true);
                    setTimeout(() => {
                      setCheckoutLoading(false);
                      setIsSuccessOverlayOpen(true);
                    }, 1200);
                  }}
                  className="w-full max-w-md mx-auto bg-black hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow mt-4 flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>Gerar & Imprimir Boleto</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column Summary Box bar */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Resumo do Pedido</h3>

            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Subtotal Anual</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>

              <div className="flex justify-between text-xs font-semibold text-emerald-600">
                <span>Desconto Anual (20% off)</span>
                <span>- R$ {defaultAnnualDiscount.toFixed(2).replace('.', ',')}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-xs font-semibold text-emerald-600">
                  <span>Conexão Contabilidade (25% off)</span>
                  <span>- R$ {additionalPartnerDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  <span>Cupom ({appliedCoupon})</span>
                  <span>- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="h-[1px] bg-slate-200 my-1"></div>

              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Impostos & Taxas</span>
                <span>R$ 0,00</span>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-bold text-slate-900">Total Pago</span>
                <span className="text-2xl font-black text-black">
                  R$ {totalValue.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Promo Code inputs */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block ml-1">
                Cupom de Desconto
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: WELCOME20, VISION25"
                  className="w-full uppercase p-3 border border-slate-200 rounded-xl text-xs font-bold focus:border-black outline-none bg-white text-slate-800"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs cursor-pointer transition-colors shrink-0"
                >
                  Aplicar
                </button>
              </div>
              <p className="text-[10px] text-slate-400 pl-1 leading-normal font-medium">
                Dica de demonstração: Tente usar <strong className="text-slate-600">VISION25</strong> para 25% de desconto extra.
              </p>
            </form>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 leading-normal text-center font-medium">
                Dúvidas? Entre em contato pelo e-mail{' '}
                <a className="text-slate-600 hover:underline font-semibold" href="mailto:financeiro@visionbiz.com.br">
                  financeiro@visionbiz.com.br
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Success Overlay */}
      <AnimatePresence>
        {isSuccessOverlayOpen && (
          <div className="fixed inset-0 bg-slate-950/80 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Giant circle check */}
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">Assinatura Concluída!</h3>
                <p className="text-sm text-[#505f76] leading-relaxed px-2 font-normal">
                  Seu pagamento foi aprovado com sucesso. Sua licença de uso do SSO Hub foi renovada/atualizada de imediato.
                </p>
              </div>

              {/* Receipt metadata box */}
              <div className="bg-[#f2f4f6]/60 rounded-xl p-4 text-left border border-slate-200/20 text-xs text-slate-600 space-y-2 font-medium">
                <div className="flex justify-between">
                  <span>Nº Recibo:</span>
                  <span className="font-mono text-slate-850">#VB-CO3841-A</span>
                </div>
                <div className="flex justify-between">
                  <span>Operação:</span>
                  <span className="text-slate-850">Cobrança Anual Recorrente</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 text-sm">
                  <span>Valor Transacionado:</span>
                  <span>R$ {totalValue.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSuccessOverlayOpen(false);
                  moveToScreen(Screen.AdminDashboard);
                }}
                className="w-full bg-black hover:bg-slate-900 text-white py-3.5 rounded-xl font-bold text-sm active:scale-[0.98] cursor-pointer"
              >
                Voltar para o Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
