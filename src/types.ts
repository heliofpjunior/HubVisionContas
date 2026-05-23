/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Screen {
  SSOLogin = 'sso-login',
  SSOLoginWhiteLabel = 'sso-whitelabel',
  AdminDashboard = 'admin-dashboard',
  Subscription = 'subscription-mgmt',
  BatchBilling = 'batch-billing',
  Invoices = 'invoices-billing',
  Checkout = 'checkout'
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  type: string;
  status: 'Ativo' | 'Suspenso';
  initials: string;
}

export interface BatchClient {
  id: string;
  name: string;
  cnpj: string;
  plan: string;
  billingType: string;
  status: 'Regular' | 'Inadimplente' | 'Aguardando';
  initials: string;
}

export interface Invoice {
  id: string;
  date: string;
  value: number;
  method: 'Pix' | 'Cartão' | 'Boleto';
  status: 'Pendente' | 'Pago' | 'Falhou';
}

export interface CheckoutState {
  planName: string;
  priceRaw: number;
  discountRaw: number;
  couponCode: string;
  couponApplied: boolean;
  couponDiscount: number;
  tax: string;
  paymentMethod: 'credit' | 'pix' | 'boleto';
}
