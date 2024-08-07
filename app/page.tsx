"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, [supabase.auth]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a CRM App</h1>
      {user ? (
        <Card>
          <CardHeader>
            <CardTitle>¡Hola, {user.email}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Bienvenido de vuelta a tu CRM. ¿Qué te gustaría hacer hoy?</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button onClick={() => router.push('/dashboard')}>Ir al Dashboard</Button>
              <Button onClick={() => router.push('/clientes')} variant="outline">Ver Clientes</Button>
              <Button onClick={() => router.push('/oportunidades')} variant="outline">Ver Oportunidades</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Gestiona tus clientes y ventas de manera eficiente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Nuestro CRM te ayuda a mantener un seguimiento de tus clientes y oportunidades de venta en un solo lugar.</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button onClick={() => router.push('/login')}>Iniciar Sesión</Button>
              <Button onClick={() => router.push('/signup')} variant="outline">Registrarse</Button>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Características principales:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Mantén toda la información de tus clientes organizada y accesible.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Seguimiento de Oportunidades</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Rastrea y gestiona tus oportunidades de venta de manera eficiente.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reportes Detallados</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Obtén insights valiosos con nuestros reportes personalizados.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}