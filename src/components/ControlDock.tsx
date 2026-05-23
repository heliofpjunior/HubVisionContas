/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen } from '../types';
import { Layers, ShieldCheck, UserCheck, LayoutDashboard, Key, CreditCard, Receipt } from 'lucide-react';

interface ControlDockProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function ControlDock({ currentScreen, setScreen }: ControlDockProps) {
  const [minimized, setMinimized] = React.useState(false);

  const screensConfig = [
    { id: Screen.SSOLogin, label: 'Standard SSO Login', icon: Key, color: 'bg-indigo-600' },
    { id: Screen.SSOLoginWhiteLabel, label: 'Alfa Partner Login', icon: UserCheck, color: 'bg-emerald-600' },
    { id: Screen.AdminDashboard, label: 'SSO Hub Admin Dashboard', icon: LayoutDashboard, color: 'bg-blue-600' },
    { id: Screen.Subscription, label: 'Gestão de Assinatura', icon: Layers, color: 'bg-sky-600' },
    { id: Screen.BatchBilling, label: 'Planos em Lote', icon: Layers, color: 'bg-purple-600' },
    { id: Screen.Invoices, label: 'Invoices & Billing', icon: Receipt, color: 'bg-amber-600' },
    { id: Screen.Checkout, label: 'Secure Checkout', icon: CreditCard, color: 'bg-red-600' },
  ];

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-[9999] bg-slate-900 text-white rounded-full p-3 shadow-2xl border border-slate-700/50 hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
        id="control-dock-expand"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>Navegador de Telas VisionBiz</span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-[9999] w-[92%] max-w-md bg-slate-900/95 backdrop-blur-md text-white rounded-xl p-4 shadow-2xl border border-slate-700/50"
      id="control-dock-container"
    >
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Navegador de Telas (SSO & Billing)
          </span>
        </div>
        <button
          onClick={() => setMinimized(true)}
          className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 cursor-pointer transition-colors"
          id="control-dock-minimize"
        >
          Minimizar
        </button>
      </div>

      <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
        Selecione qualquer tela abaixo para visualizar a reprodução de alta fidelidade dos mockups fornecidos:
      </p>

      <div className="grid grid-cols-2 gap-2">
        {screensConfig.map((screen) => {
          const IconComponent = screen.icon;
          const isActive = currentScreen === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => setScreen(screen.id)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-all pointer-events-auto cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
              id={`btn-screen-${screen.id}`}
            >
              <div className={`p-1 rounded ${screen.color} text-white shrink-0`}>
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{screen.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
