import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'VisionBiz Hub - SSO & Billing',
  description: 'Plataforma SSO Hub Admin, Gestão de Assinaturas, Faturamento em Lote e Checkout Seguro da VisionBiz.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
