"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/authService';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { addNotification } = useNotifications();

  const handleLogout = async () => {
    try {
      await signOut();
      addNotification('Logged out successfully', 'success');
      router.push('/login'); // O la ruta que prefieras después del logout
    } catch (error) {
      console.error('Logout error:', error);
      addNotification('Failed to log out', 'error');
    }
  };

  return (
    <Button onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default LogoutButton;