"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ProtectedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        addNotification('You must be logged in to view this page', 'error');
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [supabase, router, addNotification]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Protected Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a protected page. Only authenticated users can see this content.</p>
        </CardContent>
      </Card>
    </div>
  );
}