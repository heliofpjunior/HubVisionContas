/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, Invoice } from '../types';
import {
  Filter,
  Download,
  Calendar,
  CreditCard,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  QrCode,
  FileCheck
} from 'lucide-react';

interface InvoicesScreenProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  moveToScreen: (screen: Screen) => void;
  discountApplied: boolean;
}

export default function InvoicesScreen({
  invoices,
  setInvoices,
  moveToScreen,
  discountApplied
}: InvoicesScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Apply discount state if connected
  const calcInvoiceValue = (val: number) => {
    return discountApplied ? val * 0.75 : val;
  };

  const filteredInvoices = invoices.filter((inv) => {
    return (
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDownloadInvoice = (id: string) => {
    alert(`Preparando download do recibo fiscal e demonstrativo detalhado da fatura ${id} (Formato PDF)...`);
  };

  return (
    <div className="flex-1 bg-[#f7f9fb] min-h-screen relative font-sans select-none pb-24 md:pb-8">
      {/* Page Header */}
      <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-black tracking-tight mb-2">Invoices & Billing</h2>
            <p className="text-sm text-[#505f76] font-normal">
              Gerencie seu histórico de faturamento consolidado e faturas pendentes.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Filtro avançado de transações')}
              className="flex items-center gap-1.5 px-4 py-2 px-md py-sm border border-slate-300 text-slate-800 bg-white text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Filtrar</span>
            </button>
            <button
              onClick={() => alert('Iniciando transferência eletrônica do extrato analítico em CSV...')}
              className="flex items-center gap-1.5 px-4 py-2 px-md py-sm bg-black text-white text-xs font-semibold rounded-xl hover:bg-slate-900 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Tudo</span>
            </button>
          </div>
        </header>

        {/* Top Summary Bento Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next Billing */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Próxima Cobrança
              </span>
              <h3 className="text-3xl font-black text-black">
                R$ {calcInvoiceValue(1240.00).toFixed(2).replace('.', ',')}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#0d1c32]" />
                  <span>15 de Outubro, 2023</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#0d1c32]" />
                  <span>Visa final 4242</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto relative z-10">
              <button
                onClick={() => moveToScreen(Screen.Checkout)}
                className="flex-1 md:flex-none px-6 py-3 bg-black text-white font-semibold text-xs rounded-xl hover:bg-slate-900 shadow-md cursor-pointer text-center"
              >
                Pagar Antecipado
              </button>
              <button
                onClick={() => moveToScreen(Screen.Subscription)}
                className="flex-1 md:flex-none px-6 py-3 border border-slate-300 text-slate-700 bg-white font-semibold text-xs rounded-xl hover:bg-slate-50 cursor-pointer text-center"
              >
                Alterar Plano
              </button>
            </div>
            {/* Soft decorative right gradient element */}
            <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
          </div>

          {/* total year sum summary card */}
          <div className="bg-white border border-slate-200/70 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Total Este Ano
              </span>
              <h4 className="text-2xl font-black text-black mt-2">
                R$ {calcInvoiceValue(14880.00).toFixed(2).replace('.', ',')}
              </h4>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>Indicativo de consumo</span>
                <span>75% do limite</span>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction Table History list */}
        <section className="bg-white border border-[#c5c6cd]/50 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-lg font-bold text-black tracking-tight">Histórico de Transações</h3>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:border-black outline-none w-64 text-slate-800"
                placeholder="Buscar faturas..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredInvoices.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs font-semibold">
                Nenhuma fatura condizente encontrada.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID / Data</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Método</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4.5">
                        <div className="text-xs font-bold text-slate-900">{inv.id}</div>
                        <div className="text-[11px] text-slate-500">{inv.date}</div>
                      </td>

                      <td className="px-6 py-4.5 font-sans font-bold text-[#191c1e] text-sm">
                        R$ {calcInvoiceValue(inv.value).toFixed(2).replace('.', ',')}
                      </td>

                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          {inv.method === 'Pix' ? (
                            <QrCode className="w-4 h-4 text-indigo-500 shrink-0" />
                          ) : inv.method === 'Cartão' ? (
                            <CreditCard className="w-4 h-4 text-indigo-500 shrink-0" />
                          ) : (
                            <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                          )}
                          <span>{inv.method}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inv.status === 'Pago'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.status === 'Pendente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              inv.status === 'Pago'
                                ? 'bg-emerald-500'
                                : inv.status === 'Pendente'
                                ? 'bg-yellow-500'
                                : 'bg-red-550'
                            }`}
                          ></span>
                          <span>{inv.status}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4.5 text-right">
                        {inv.status === 'Pendente' ? (
                          <button
                            onClick={() => moveToScreen(Screen.Checkout)}
                            className="px-4 py-2 bg-black text-white rounded-lg font-semibold text-xs hover:bg-slate-900 cursor-pointer"
                          >
                            Pagar Agora
                          </button>
                        ) : inv.status === 'Falhou' ? (
                          <button
                            onClick={() => moveToScreen(Screen.Checkout)}
                            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold text-xs cursor-pointer"
                          >
                            Tentar Novamente
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownloadInvoice(inv.id)}
                            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <FileCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>PDF</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Simple footer indicator */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>Mostrando 1-5 de 24 faturas cadastradas</span>
            <div className="flex gap-1">
              <button className="p-1 border border-slate-200 bg-white rounded-lg hover:bg-slate-100 cursor-pointer text-slate-400" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-2.5 py-1 bg-black text-white rounded-lg text-xs font-bold">1</button>
              <button className="px-2.5 py-1 border border-slate-200 bg-white text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-100 cursor-pointer">2</button>
              <button className="p-1 border border-slate-200 bg-white rounded-lg hover:bg-slate-100 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Bottom secure support panels */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#f2f4f6]/50 rounded-2xl border border-slate-200/40 flex items-start gap-4">
            <div className="w-12 h-12 bg-[#d6e3ff] text-[#0d1c32] flex items-center justify-center rounded-xl shrink-0 border border-[#b9c7e4]/20 shadow-sm">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 tracking-tight">Problemas com cobrança?</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Nossa equipe de suporte financeiro está disponível para ajudar com disputas ou dúvidas sobre valores faturados.
              </p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  alert('Central de relacionamentos em breve incorporada no SSO Hub!');
                }}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xs inline-flex items-center gap-1 hover:underline cursor-pointer"
                href="#support"
              >
                <span>Falar com Suporte</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-6 bg-[#f2f4f6]/50 rounded-2xl border border-slate-200/40 flex items-start gap-4">
            <div className="w-12 h-12 bg-[#d3e4fe] text-[#0b1c30] flex items-center justify-center rounded-xl shrink-0 border border-[#b7c8e1]/20 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 tracking-tight">Segurança de Pagamento</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Todos os dados de faturamento e pagamentos são criptografados de ponta a ponta seguindo as rigorosas diretrizes de conformidade PCI-DSS Nível 1.
              </p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  alert('Política de segurança operacional encriptada.');
                }}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-xs inline-flex items-center gap-1 hover:underline cursor-pointer"
                href="#policy"
              >
                <span>Ver Política</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
