/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, BatchClient } from '../types';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Percent,
  TrendingUp,
  AlertTriangle,
  Building,
  Layers,
  X,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BatchBillingScreenProps {
  batchClients: BatchClient[];
  setBatchClients: React.Dispatch<React.SetStateAction<BatchClient[]>>;
  moveToScreen: (screen: Screen) => void;
}

export default function BatchBillingScreen({
  batchClients,
  setBatchClients,
  moveToScreen
}: BatchBillingScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Regular' | 'Inadimplente' | 'Aguardando'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New partner company form inputs
  const [newName, setNewName] = useState('');
  const [newCnpj, setNewCnpj] = useState('');
  const [newPlan, setNewPlan] = useState('Lote 50');
  const [newStatus, setNewStatus] = useState<'Regular' | 'Inadimplente' | 'Aguardando'>('Regular');

  // Filter computations
  const filteredClients = batchClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm);
    const matchesFilter = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCnpj) return;

    // Basic 2 letter initials generator
    const initials = newName
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');

    const newClient: BatchClient = {
      id: `BC-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      cnpj: newCnpj,
      plan: newPlan,
      billingType: newPlan === 'Lote 10' ? 'Individual' : 'Consolidado',
      status: newStatus,
      initials: initials || 'CO'
    };

    setBatchClients([newClient, ...batchClients]);
    setIsModalOpen(false);

    // Reset fields
    setNewName('');
    setNewCnpj('');
    setNewPlan('Lote 50');
    setNewStatus('Regular');
  };

  const deleteClient = (id: string) => {
    setBatchClients(batchClients.filter((c) => c.id !== id));
  };

  return (
    <div className="flex-grow bg-[#f7f9fb] min-h-screen relative font-sans select-none pb-24 md:pb-8">
      {/* Main Container */}
      <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        {/* Screen Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-black tracking-tight mb-2">Gestão de Planos em Lote</h2>
            <p className="text-sm text-[#505f76] font-normal">
              Gerencie licenças e faturamento centralizado para seus clientes.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-5 py-3 bg-black text-white rounded-xl font-semibold text-xs hover:bg-slate-950 active:scale-[0.98] transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Adicionar Nova Empresa</span>
          </button>
        </header>

        {/* Batch Plans Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lote 10 Empresas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-black tracking-tight">Lote 10 Empresas</h3>
                <p className="text-xs text-slate-400 mt-0.5">Faturamento Mensal</p>
              </div>
              <Layers className="text-indigo-400 w-7 h-7" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-semibold text-[#505f76]">Uso das Licenças</span>
                <span className="text-sm font-bold text-[#191c1e]">8 / 10</span>
              </div>
              <div className="w-full bg-[#f2f4f6] h-2 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full transition-all duration-500 w-[80%]"></div>
              </div>
            </div>

            <p className="text-xs text-[#505f76] leading-relaxed">
              Ideal para escritórios em fase de crescimento inicial.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-[#191c1e]">
                R$ 450,00<span className="text-xs font-normal text-slate-500">/mês</span>
              </span>
              <button
                onClick={() => alert('Visualizando detalhes do plano Lote 10')}
                className="text-xs font-bold text-black hover:underline cursor-pointer"
              >
                Ver Detalhes
              </button>
            </div>
          </div>

          {/* Lote 50 Empresas - Highlighted */}
          <div className="bg-[#0d1c32] text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="bg-[#d3e4fe] text-[#0b1c30] text-[9px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest shadow">
                Mais Popular
              </span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Lote 50 Empresas</h3>
                <p className="text-xs text-[#76849f] mt-0.5">Faturamento Anual</p>
              </div>
              <Building className="text-[#d3e4fe] w-7 h-7 shrink-0" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-semibold text-[#76849f]">Uso das Licenças</span>
                <span className="text-sm font-bold text-white">42 / 50</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#d3e4fe] h-full rounded-full transition-all duration-500 w-[84%]"></div>
              </div>
            </div>

            <p className="text-xs text-[#76849f] leading-relaxed">
              Solução robusta para escritórios consolidados com alto volume.
            </p>

            <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
              <span className="text-sm font-bold text-[#d3e4fe]">
                R$ 1.850,00<span className="text-xs font-normal text-[#76849f]">/mês</span>
              </span>
              <button
                onClick={() => alert('Abrindo painel do plano Lote 50')}
                className="text-xs font-bold text-[#d3e4fe] hover:underline cursor-pointer"
              >
                Gerenciar
              </button>
            </div>
          </div>

          {/* White-Label Lote */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col justify-between space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-black tracking-tight">White-Label</h3>
                <p className="text-xs text-slate-400 mt-0.5">Plano Personalizado</p>
              </div>
              <Award className="text-black w-7 h-7" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-semibold text-[#505f76]">Uso das Licenças</span>
                <span className="text-sm font-bold text-black font-mono">Ilimitado</span>
              </div>
              <div className="w-full bg-[#f2f4f6] h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full transition-all duration-500 w-[100%]"></div>
              </div>
            </div>

            <p className="text-xs text-[#505f76] leading-relaxed">
              Sua marca, nossa tecnologia. Experiência 100% customizada.
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-black">Sob Consulta</span>
              <button
                onClick={() => alert('Abrindo canal para agendamento com um especialista VisionBiz...')}
                className="text-xs font-bold text-black hover:underline cursor-pointer"
              >
                Falar com Consultor
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Table & searching filters */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-120/45 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="w-full pl-11 pr-4 py-2.5 bg-[#f7f9fb] border border-slate-200/80 rounded-xl text-sm focus:border-black outline-none outline-0 font-medium"
                placeholder="Buscar por empresa ou CNPJ..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-end">
              <select
                className="text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white font-semibold outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">Filtrar Todos</option>
                <option value="Regular">Regular</option>
                <option value="Inadimplente">Inadimplente</option>
                <option value="Aguardando">Aguardando</option>
              </select>

              <button
                onClick={() => alert('Dados das empresas exportados com total segurança.')}
                className="flex items-center gap-1 px-4 py-2 border border-slate-200 text-slate-700 bg-white shadow-xs hover:bg-slate-50 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Relatório</span>
              </button>
            </div>
          </div>

          {/* Table representation */}
          <div className="bg-white border border-[#c5c6cd]/45 rounded-2xl shadow-sm overflow-hidden whitespace-nowrap">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-indigo-120/15">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Empresa Cliente</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">CNPJ</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plano Vinculado</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Faturamento</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-[#d0e1fb] text-[#0d1c32] font-bold flex items-center justify-center shrink-0 uppercase text-xs">
                            {client.initials}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{client.name}</div>
                            <div className="text-[11px] text-slate-400">Ativo</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4.5 font-mono text-xs text-slate-600">{client.cnpj}</td>

                      <td className="px-6 py-4.5">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                          {client.plan}
                        </span>
                      </td>

                      <td className="px-6 py-4.5 text-sm font-bold text-slate-850">{client.billingType}</td>

                      <td className="px-6 py-4.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            client.status === 'Regular'
                              ? 'bg-emerald-100 text-emerald-800'
                              : client.status === 'Inadimplente'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              client.status === 'Regular'
                                ? 'bg-emerald-600'
                                : client.status === 'Inadimplente'
                                ? 'bg-red-650'
                                : 'bg-amber-600'
                            }`}
                          ></span>
                          <span>{client.status}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4.5 text-right">
                        <button
                          onClick={() => deleteClient(client.id)}
                          className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-110 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Mostrando {filteredClients.length} de {batchClients.length} empresas vinculadas</span>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 border border-slate-250 bg-white rounded-lg hover:bg-slate-100 cursor-pointer disabled:opacity-40" disabled>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="px-3 py-1 bg-black text-white rounded-lg font-bold">1</button>
                <button className="px-3 py-1 border border-slate-200 bg-white text-slate-800 rounded-lg hover:bg-slate-100 font-bold cursor-pointer">2</button>
                <button className="px-2.5 py-1 border border-slate-250 bg-white rounded-lg hover:bg-slate-100 cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetrical widget summary metrics bottom section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-[#f2f4f6]/60 p-6 rounded-2xl border border-slate-200 flex gap-6 items-center">
            <div className="w-16 h-16 bg-white shrink-0 border border-slate-200 rounded-full flex items-center justify-center text-black shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Próximo Faturamento Consolidado
              </h4>
              <div className="text-2xl font-black text-black mt-1">R$ 4.250,00</div>
              <p className="text-xs text-slate-500 mt-1">Vencimento em 15 de Outubro de 2023</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-center text-center shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Economia de Lote
            </span>
            <div className="text-3xl font-black text-emerald-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
              <span>32%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">vs. Planos Individuais</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-center text-center shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Eficiência Fiscal
            </span>
            <div className="text-2xl font-bold text-black">Alta</div>
            <div className="flex justify-center gap-1 mt-2.5">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="w-2 h-2 bg-black rounded-full"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
            </div>
          </div>
        </section>
      </div>

      {/* Add Partner Dialog Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative border border-slate-100"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-black cursor-pointer p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-black mb-2 tracking-tight">Vincular Empresa Cliente</h3>
              <p className="text-xs text-slate-500 mb-6">
                Associe um novo CNPJ ao faturamento consolidado de lote para fornecer acesso imediato.
              </p>

              <form onSubmit={handleAddCompany} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nome Fantasia / Razão Social</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Solaris Marketing Ltda"
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">CNPJ da Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="00.000.000/0001-00"
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none font-mono"
                    value={newCnpj}
                    onChange={(e) => setNewCnpj(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Lote do Plano</label>
                    <select
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white"
                      value={newPlan}
                      onChange={(e) => setNewPlan(e.target.value)}
                    >
                      <option value="Lote 10">Lote 10 Empresas</option>
                      <option value="Lote 50">Lote 50 Empresas</option>
                      <option value="White-Label">White-Label</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Status de Fatura</label>
                    <select
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                    >
                      <option value="Regular">Regular (Adimplente)</option>
                      <option value="Aguardando">Aguardando Confirmação</option>
                      <option value="Inadimplente">Inadimplente</option>
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
                    Adicionar Empresa
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
