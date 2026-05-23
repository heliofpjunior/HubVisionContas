/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, Tenant, BatchClient, Invoice } from './types';
import {
  INITIAL_TENANTS,
  INITIAL_BATCH_CLIENTS,
  INITIAL_INVOICES
} from './mockData';

// Component imports
import SSOLoginScreen from './components/SSOLoginScreen';
import SSOLoginWhiteLabelScreen from './components/SSOLoginWhiteLabelScreen';
import AdminDashboardScreen from './components/AdminDashboardScreen';
import SubscriptionScreen from './components/SubscriptionScreen';
import BatchBillingScreen from './components/BatchBillingScreen';
import InvoicesScreen from './components/InvoicesScreen';
import CheckoutScreen from './components/CheckoutScreen';
import ControlDock from './components/ControlDock';

// HeroIcons/Lucide imports for Navigation Sidebar
import {
  LayoutDashboard,
  Layers,
  Coins,
  ShieldCheck,
  CreditCard,
  LogOut,
  Menu,
  X,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Global App States
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SSOLogin);
  const [tenants, setTenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [batchClients, setBatchClients] = useState<BatchClient[]>(INITIAL_BATCH_CLIENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication Helpers
  const handleLoginSuccess = () => {
    setCurrentScreen(Screen.AdminDashboard);
  };

  const handleLogout = () => {
    setCurrentScreen(Screen.SSOLogin);
  };

  // Check if current screen is external (Login screens) vs inside main dashboard shell
  const isAuthScreen =
    currentScreen === Screen.SSOLogin || currentScreen === Screen.SSOLoginWhiteLabel;

  // Navigation Links Definition for Shell
  const navLinks = [
    {
      id: Screen.AdminDashboard,
      label: 'SSO Hub Dashboard',
      icon: LayoutDashboard,
      description: 'Tenants e logs'
    },
    {
      id: Screen.Subscription,
      label: 'Sua Assinatura',
      icon: ShieldCheck,
      description: 'Limites e conexões'
    },
    {
      id: Screen.BatchBilling,
      label: 'Planos em Lote',
      icon: Layers,
      description: 'Licenças agrupadas'
    },
    {
      id: Screen.Invoices,
      label: 'Faturas e Recibos',
      icon: Coins,
      description: 'Histórico de cobrança'
    },
    {
      id: Screen.Checkout,
      label: 'Checkout de Pagamento',
      icon: CreditCard,
      description: 'Assinar plano'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-slate-900 overflow-x-hidden select-none font-sans relative">
      {/* On-Screen Screen Navigator dock helper */}
      <ControlDock currentScreen={currentScreen} setScreen={setCurrentScreen} />

      {/* RENDER MODE A: Auth screens with blank background (outside main dashboard layout) */}
      {isAuthScreen ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentScreen === Screen.SSOLogin && (
              <motion.div
                key="sso-standard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <SSOLoginScreen
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToWhiteLabel={() => setCurrentScreen(Screen.SSOLoginWhiteLabel)}
                />
              </motion.div>
            )}

            {currentScreen === Screen.SSOLoginWhiteLabel && (
              <motion.div
                key="sso-whitelabel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <SSOLoginWhiteLabelScreen
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToStandard={() => setCurrentScreen(Screen.SSOLogin)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* RENDER MODE B: Central shell containing Left Sidebar and Top Header */
        <div className="flex w-full min-h-screen">
          {/* DESKTOP SIDEBAR NAVIGATION */}
          <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200/60 shrink-0 sticky top-0 h-screen select-none">
            {/* Sidebar Top Branding logo segment */}
            <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#d6e3ff] rounded-xl flex items-center justify-center border border-indigo-120/10">
                <ShieldCheck className="w-5 h-5 text-[#0d1c32]" />
              </div>
              <div>
                <h1 className="text-sm font-black text-black tracking-tight leading-none">VisionBiz Hub</h1>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                  SSO & Billing
                </p>
              </div>
            </div>

            {/* Menu Nav Links links */}
            <nav className="flex-1 p-4 space-y-1.5 mt-4">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = currentScreen === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setCurrentScreen(link.id)}
                    className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-left transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-black text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                    }`}
                    id={`nav-link-${link.id}`}
                  >
                    <IconComponent
                      className={`w-5 h-5 shrink-0 ${
                        isActive ? 'text-[#d3e4fe]' : 'text-slate-400 group-hover:text-black'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold leading-none">{link.label}</p>
                      <p
                        className={`text-[10px] mt-0.5 leading-none ${
                          isActive ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {link.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer segment */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-3 text-red-500 hover:text-red-700 hover:bg-red-50 text-xs font-bold rounded-xl transition-all cursor-pointer"
                id="sidebar-logout"
              >
                <div className="flex items-center space-x-2">
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Sair da Conta</span>
                </div>
                <span className="text-[9px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full uppercase font-black">
                  Log out
                </span>
              </button>
            </div>
          </aside>

          {/* MOBILE SLIDING SIDEBAR DRAWER AND BOTTOM NAV BAR BAR */}
          <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex justify-around items-center h-16 px-2 shadow-2xl">
            {navLinks.slice(0, 4).map((link) => {
              const IconComponent = link.icon;
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentScreen(link.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-lg text-[9px] font-bold ${
                    isActive ? 'text-[#1a365d]' : 'text-slate-400'
                  }`}
                  id={`bottom-nav-${link.id}`}
                >
                  <IconComponent className="w-5 `h-5 mb-0.5 shrink-0" />
                  <span>{link.label.split(' ')[0]}</span>
                </button>
              );
            })}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center p-2.5 text-slate-400"
              id="bottom-nav-more"
            >
              <Menu className="w-5 h-5 mb-0.5 shrink-0" />
              <span>Mais</span>
            </button>
          </div>

          {/* Sliding Bottom Drawer panel for extra shortcuts */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                ></div>
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl border-t border-slate-200 z-[110] p-6 space-y-6 shadow-2xl"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-slate-400">
                      Navegação VisionBiz
                    </span>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-black cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setCurrentScreen(Screen.Checkout);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left cursor-pointer"
                    >
                      <CreditCard className="w-5 h-5 text-indigo-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Checkout</p>
                        <p className="text-[10px] text-slate-400">Pagar plano</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentScreen(Screen.SSOLogin);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left cursor-pointer"
                    >
                      <UserCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Login Padrão</p>
                        <p className="text-[10px] text-slate-400">Login SSO</p>
                      </div>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full bg-red-50 text-red-600 font-bold py-3.5 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Sair da Instância</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* MAIN PAGE RENDER OUTLET */}
          <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#f7f9fb]">
            <AnimatePresence mode="wait">
              {currentScreen === Screen.AdminDashboard && (
                <motion.div
                  key="admin-dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex-grow flex flex-col"
                >
                  <AdminDashboardScreen
                    tenants={tenants}
                    setTenants={setTenants}
                    moveToScreen={setCurrentScreen}
                  />
                </motion.div>
              )}

              {currentScreen === Screen.Subscription && (
                <motion.div
                  key="subscription"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex-grow flex flex-col"
                >
                  <SubscriptionScreen
                    moveToScreen={setCurrentScreen}
                    discountApplied={discountApplied}
                    setDiscountApplied={setDiscountApplied}
                  />
                </motion.div>
              )}

              {currentScreen === Screen.BatchBilling && (
                <motion.div
                  key="batch-billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex-grow flex flex-col"
                >
                  <BatchBillingScreen
                    batchClients={batchClients}
                    setBatchClients={setBatchClients}
                    moveToScreen={setCurrentScreen}
                  />
                </motion.div>
              )}

              {currentScreen === Screen.Invoices && (
                <motion.div
                  key="invoices"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex-grow flex flex-col"
                >
                  <InvoicesScreen
                    invoices={invoices}
                    setInvoices={setInvoices}
                    moveToScreen={setCurrentScreen}
                    discountApplied={discountApplied}
                  />
                </motion.div>
              )}

              {currentScreen === Screen.Checkout && (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex-grow flex flex-col"
                >
                  <CheckoutScreen moveToScreen={setCurrentScreen} discountApplied={discountApplied} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  );
}
