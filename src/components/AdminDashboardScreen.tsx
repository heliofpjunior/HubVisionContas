/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, Tenant } from '../types';
import {
  Download,
  Users,
  Building,
  LogIn,
  Search,
  Filter,
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  Bell,
  Grid,
  CheckCircle,
  HelpCircle,
  X,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminDashboardScreenProps {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  moveToScreen: (screen: Screen) => void;
}

export default function AdminDashboardScreen({ tenants, setTenants, moveToScreen }: AdminDashboardScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Ativo' | 'Suspenso'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);

  // New Tenant Form inputs
  const [newName, setNewName] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [newType, setNewType] = useState('Client Company');
  const [newStatus, setNewStatus] = useState<'Ativo' | 'Suspenso'>('Ativo');

  // Filter calculations
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || tenant.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSubdomain) return;

    const initials = newName
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');

    const newTenant: Tenant = {
      id: `T-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newName,
      subdomain: newSubdomain.toLowerCase().endsWith('.contas.io')
        ? newSubdomain.toLowerCase()
        : `${newSubdomain.toLowerCase()}.contas.io`,
      type: newType,
      status: newStatus,
      initials: initials || 'NT'
    };

    setTenants([newTenant, ...tenants]);
    setIsModalOpen(false);

    // Reset inputs
    setNewName('');
    setNewSubdomain('');
    setNewType('Client Company');
  };

  const toggleTenantStatus = (id: string) => {
    setTenants(
      tenants.map((t) => {
        if (t.id === id) {
          return { ...t, status: t.status === 'Ativo' ? 'Suspenso' : 'Ativo' };
        }
        return t;
      })
    );
    setDropdownOpenId(null);
  };

  const deleteTenant = (id: string) => {
    setTenants(tenants.filter((t) => t.id !== id));
    setDropdownOpenId(null);
  };

  return (
    <div className="flex-1 bg-[#f7f9fb] min-h-screen relative font-sans select-none pb-24 md:pb-8">
      {/* TopAppBar header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/60 shadow-sm flex justify-between items-center w-full px-6 md:px-8 h-16 shrink-0">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center bg-[#f2f4f6]/80 rounded-full px-4 py-1.5 border border-slate-200/50 w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-[#191c1e] placeholder:text-slate-400"
              placeholder="Buscar tenants ou logs..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-[#44474d] hover:bg-[#f2f4f6] transition-colors rounded-full relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="hidden sm:block p-2 text-[#44474d] hover:bg-[#f2f4f6] transition-colors rounded-full cursor-pointer">
              <Grid className="w-5 h-5" />
            </button>
          </div>

          <div className="h-8 w-[1px] bg-slate-200"></div>

          {/* User profile dropdown trigger */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#000] tracking-tight">Admin Central</p>
              <p className="text-xs text-[#44474d]">Seletor de Tenant</p>
            </div>
            <img
              alt="Foto de perfil do administrador"
              className="w-10 h-10 rounded-full border-2 border-slate-100 object-cover"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2lBanV5qSNO3hN7pceb8KjrW2p9WG-3Zff-ckCdddc8THknpYiLH8cvGniegcKp0gf-ULxS6r9MWGA21LYOsNCFZpMyVlNArz9QdE0GYG6Jb1hX-Gi3yQRgc1opLwDBSeXZLX8WevExsxAl4W687Giph8TOQ_DPmcZwKe_EPJXwNQCDKgbUQlki_mXW5ZbMb1_HjcOyh9Uo-8f-ypGQAdb7yopDk3AcoMHj7jpr8FSpsPdjSJqH4a-PRvOIHk8Qx0YJ6AJab3jHAc"
            />
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        {/* Dashboard Title segment */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-black tracking-tight mb-2">Dashboard Administrativo</h2>
            <p className="text-sm text-[#44474d] font-normal">Visão geral do ecossistema Central de Contas.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-black text-white rounded-xl font-semibold text-sm hover:bg-slate-900 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Tenant</span>
            </button>
            <button
              onClick={() => {
                alert('Iniciando exportação dos dados do ecossistema...');
              }}
              className="flex items-center space-x-1.5 px-4 py-2.5 border border-slate-300 bg-white text-slate-800 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        </section>

        {/* Stats Bento Grid - 3 cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tenants Count */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#d6e3ff] flex items-center justify-center text-[#0d1c32] shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Tenants</p>
              <p className="text-3xl font-extrabold text-black mt-1">128</p>
              <p className="text-xs text-emerald-600 flex items-center mt-2 font-medium">
                <span className="mr-1">▲</span>
                <span>+12 este mês</span>
              </p>
            </div>
          </div>

          {/* Card 2: Active Users */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#0b1c30] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usuários Ativos</p>
              <p className="text-3xl font-extrabold text-black mt-1">4.2k</p>
              <p className="text-xs text-indigo-600 flex items-center mt-2 font-medium">
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                <span>89% engajamento</span>
              </p>
            </div>
          </div>

          {/* Card 3: Daily Logins */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-6 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#ffdcbd] flex items-center justify-center text-[#2b1701] shrink-0">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logins Hoje</p>
              <p className="text-3xl font-extrabold text-black mt-1">856</p>
              <p className="text-xs text-slate-600 flex items-center mt-2 font-medium">
                <span className="mr-1">🕒</span>
                <span>Pico às 09:30 AM</span>
              </p>
            </div>
          </div>
        </section>

        {/* Tenants Table Block */}
        <section className="bg-white border border-[#c5c6cd]/50 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-black tracking-tight">Tenants Recentemente Gerenciados</h3>
              <p className="text-xs text-[#44474d]">Listagem completa e controle de instâncias.</p>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {/* Quick Status Filter tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                    statusFilter === 'all' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setStatusFilter('Ativo')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                    statusFilter === 'Ativo' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  Ativo
                </button>
                <button
                  onClick={() => setStatusFilter('Suspenso')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                    statusFilter === 'Suspenso' ? 'bg-white text-slate-600 shadow-sm' : 'text-slate-500 hover:text-black'
                  }`}
                >
                  Suspenso
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredTenants.length === 0 ? (
              <div className="py-12 px-6 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-500">Nenhum tenant encontrado</p>
                <p className="text-xs text-slate-400">Tente ajustar seus termos de busca ou filtros.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="mt-2 text-xs font-bold text-black border border-black px-3 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subdomínio</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors group relative">
                      {/* Name Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => {
                              // Custom shortcut if clicking on Alfa Contabilidade
                              if (tenant.id === 'T-48291') {
                                moveToScreen(Screen.SSOLoginWhiteLabel);
                              } else {
                                alert(`Selecionar tenant: ${tenant.name}`);
                              }
                            }}
                            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-indigo-50 flex items-center justify-center font-bold text-[#1a202c] group-hover:text-indigo-600 transition-colors uppercase shrink-0 text-sm tracking-wide border border-slate-200/45 cursor-pointer"
                          >
                            {tenant.initials}
                          </button>
                          <div>
                            <p
                              onClick={() => {
                                if (tenant.id === 'T-48291') moveToScreen(Screen.SSOLoginWhiteLabel);
                              }}
                              className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors"
                            >
                              {tenant.name}
                            </p>
                            <p className="text-xs text-slate-500">{tenant.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Subdomain Column */}
                      <td className="px-6 py-5">
                        <span className="font-mono text-xs text-indigo-900/90 bg-indigo-50/50 px-2 py-1 rounded border border-indigo-100/30">
                          {tenant.subdomain}
                        </span>
                      </td>

                      {/* Type Column */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                          {tenant.type}
                        </span>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              tenant.status === 'Ativo' ? 'bg-emerald-500 animate-pulse-soft' : 'bg-slate-400'
                            }`}
                          ></span>
                          <span className="text-xs font-semibold text-slate-700">{tenant.status}</span>
                        </div>
                      </td>

                      {/* Action Dropdowns Column */}
                      <td className="px-6 py-5 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            onClick={() => setDropdownOpenId(dropdownOpenId === tenant.id ? null : tenant.id)}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-black inline-flex items-center"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Quick action block */}
                          {dropdownOpenId === tenant.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpenId(null)}></div>
                              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 p-1 text-left z-50 animate-in fade-in slide-in-from-top-1 duration-100">
                                <button
                                  onClick={() => toggleTenantStatus(tenant.id)}
                                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 rounded-lg text-slate-700 hover:text-black transition-colors cursor-pointer"
                                >
                                  Alternar para {tenant.status === 'Ativo' ? 'Suspenso' : 'Ativo'}
                                </button>
                                {tenant.id === 'T-48291' && (
                                  <button
                                    onClick={() => {
                                      setDropdownOpenId(null);
                                      moveToScreen(Screen.SSOLoginWhiteLabel);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-emerald-50 rounded-lg text-emerald-700 transition-colors cursor-pointer"
                                  >
                                    Ver Tela de Login Custom
                                  </button>
                                )}
                                <div className="h-[1px] bg-slate-100 my-1"></div>
                                <button
                                  onClick={() => deleteTenant(tenant.id)}
                                  className="w-full text-left px-3 py-2 text-xs font-bold hover:bg-red-50 rounded-lg text-red-600 transition-colors cursor-pointer"
                                >
                                  Excluir Tenant
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Simple pagination block details */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Exibindo {filteredTenants.length} de {tenants.length} Tenants cadastrados
            </span>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-slate-200 rounded transition-colors disabled:opacity-40" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-slate-200 rounded transition-colors disabled:opacity-40" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Dynamic CTA Floating on mobile view */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-all active:scale-90"
        id="dashboard-mobile-fab"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Nova Empresa / Novo Tenant Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-black cursor-pointer p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-black tracking-tight mb-2">Cadastrar Novo Tenant</h3>
              <p className="text-xs text-slate-500 mb-6">
                Insira as informações básicas para delegar um novo subdomínio corporativo no SSO Hub.
              </p>

              <form onSubmit={handleCreateTenant} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Nome da Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Alfa Contabilidade, Beta Corp"
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Subdomínio Desejado</label>
                  <div className="flex">
                    <input
                      type="text"
                      required
                      placeholder="nomedaempresa"
                      className="w-full p-3 border border-slate-200 rounded-l-xl text-sm focus:border-black outline-none"
                      value={newSubdomain.replace('.contas.io', '')}
                      onChange={(e) => setNewSubdomain(e.target.value)}
                    />
                    <span className="bg-slate-100 border border-slate-200 border-l-0 text-slate-500 px-3 flex items-center rounded-r-xl text-xs font-mono">
                      .contas.io
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Tipo de Tenant</label>
                    <select
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white"
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                    >
                      <option value="Accounting Firm">Firma Contábil</option>
                      <option value="Client Company">Empresa Cliente</option>
                      <option value="Enterprise Client">Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Status Inicial</label>
                    <select
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as 'Ativo' | 'Suspenso')}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Suspenso">Suspenso</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-black hover:bg-slate-900 text-white font-semibold text-xs rounded-xl cursor-pointer shadow-md"
                  >
                    Salvar Registro
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
