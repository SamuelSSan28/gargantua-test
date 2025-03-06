import React from 'react';
import ClientProviders from '@src/components/ClientProviders';

export const metadata = {
  title: "Microcrédito",
  description: "Aplicação de solicitação de empréstimos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
