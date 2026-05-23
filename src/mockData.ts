/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tenant, BatchClient, Invoice } from './types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'T-48291',
    name: 'Alfa Contabilidade',
    subdomain: 'alfa.contas.io',
    type: 'Accounting Firm',
    status: 'Ativo',
    initials: 'AC'
  },
  {
    id: 'T-48295',
    name: 'Beta Tech Solutions',
    subdomain: 'betatech.contas.io',
    type: 'Client Company',
    status: 'Ativo',
    initials: 'BT'
  },
  {
    id: 'T-48302',
    name: 'Gama Consultoria',
    subdomain: 'gama.contas.io',
    type: 'Client Company',
    status: 'Suspenso',
    initials: 'GC'
  }
];

export const INITIAL_BATCH_CLIENTS: BatchClient[] = [
  {
    id: 'BC-001',
    name: 'Solaris Marketing Ltda',
    cnpj: '12.345.678/0001-90',
    plan: 'Lote 50',
    billingType: 'Consolidado',
    status: 'Regular',
    initials: 'SM'
  },
  {
    id: 'BC-002',
    name: 'TechFlow Solutions',
    cnpj: '98.765.432/0001-11',
    plan: 'Lote 50',
    billingType: 'Consolidado',
    status: 'Inadimplente',
    initials: 'TF'
  },
  {
    id: 'BC-003',
    name: 'Blue Coffee House',
    cnpj: '45.678.901/0001-22',
    plan: 'Lote 10',
    billingType: 'Individual',
    status: 'Aguardando',
    initials: 'BC'
  },
  {
    id: 'BC-004',
    name: 'Green Logística SA',
    cnpj: '77.888.999/0001-33',
    plan: 'White-Label',
    billingType: 'Consolidado',
    status: 'Regular',
    initials: 'GL'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: '#VB-2023-009',
    date: '15 Set, 2023',
    value: 1240.00,
    method: 'Pix',
    status: 'Pendente'
  },
  {
    id: '#VB-2023-008',
    date: '15 Ago, 2023',
    value: 1240.00,
    method: 'Cartão',
    status: 'Pago'
  },
  {
    id: '#VB-2023-007',
    date: '15 Jul, 2023',
    value: 1100.00,
    method: 'Boleto',
    status: 'Pago'
  },
  {
    id: '#VB-2023-006',
    date: '15 Jun, 2023',
    value: 1100.00,
    method: 'Cartão',
    status: 'Falhou'
  },
  {
    id: '#VB-2023-005',
    date: '15 Mai, 2023',
    value: 980.00,
    method: 'Pix',
    status: 'Pago'
  }
];
