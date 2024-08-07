"use client";
import React, { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Dashboard: React.FC = () => {
  const user = useUser();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (user) {
      addNotification(`Welcome back, ${user.email}!`, 'info');
    }
  }, [user]);

  if (!user) {
    return <Alert><AlertDescription>Please log in to view your dashboard.</AlertDescription></Alert>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard, {user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>Tasks Overview</CardHeader>
          <CardContent>
            {/* Placeholder for tasks overview */}
            <p>You have X tasks pending.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Recent Activity</CardHeader>
          <CardContent>
            {/* Placeholder for recent activity */}
            <p>Your last login was on: {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;