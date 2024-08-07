"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/utils/authService';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { addNotification } = useNotifications();

  const handleLogout = async () => {
    try {
      await signOut();
      addNotification('Sesión Cerrada correctamente', 'success');
      router.push('/login'); // O la ruta que prefieras después del logout
    } catch (error) {
      console.error('Error al cerrar sesion:', error);
      addNotification('Error al cerrar sesion', 'error');
    }
  };

  return (
    <Button onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;