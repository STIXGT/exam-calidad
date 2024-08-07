"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const router = useRouter();
  const { addNotification } = useNotifications();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setDebugInfo('');
    if (password !== confirmPassword) {
      addNotification('Las contraseñas deben ser iguales', 'error');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        addNotification('Registro exitoso! Porfavor revisa tu correo y verifica tu cuenta.', 'success');
        router.push('/login');
      } else {
        addNotification('Ocurrio un error, intento nuevamente', 'error');
      }
    } catch (error: any) {
      console.error('Error al iniciar sesion:', error);
      setDebugInfo(`Error: ${error.message}, Error Code: ${error.code}, Status: ${error.status}`);
      addNotification(`Algo salio mal: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Iniciar sesion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Iniciando sesion...' : 'Iniciar Sesión'}
            </Button>
          </form>
          {debugInfo && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
              <p className="font-bold">Debug Info:</p>
              <p>{debugInfo}</p>
            </div>
          )}
          <p className="mt-4 text-center text-sm">
            Ya tiene una cuenta?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicie sesión
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;