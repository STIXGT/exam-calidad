"use client";

import "./globals.css";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { NotificationProvider } from '@/contexts/NotificationContext';
import Notifications from '@/components/Notifications';
import Navigation from '@/components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClientComponentClient());
  return (
    <html lang="en">
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          <NotificationProvider>
            <Navigation />
              <main className="container mx-auto mt-4">
                {children}
              </main>
            <Notifications />
          </NotificationProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
