"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Login() {
  const supabase = createClientComponentClient();
  const { addNotification } = useNotifications();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={[]}
            redirectTo={`${window.location.origin}/auth/callback`}
          />
        </CardContent>
      </Card>
    </div>
  );
}