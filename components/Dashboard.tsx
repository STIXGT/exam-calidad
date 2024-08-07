"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { getClientes } from '@/utils/clienteService';
import { Cliente } from '@/types/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const user = useUser();
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getClientes();
      setClientes(data);
    };

    fetchClientes();
  }, []);

  if (!user) {
    return <div>Por favor, inicia sesión para ver el dashboard.</div>;
  }

  const clientesActivos = clientes.filter(c => c.estado === 'Activo').length;
  const clientesPotenciales = clientes.filter(c => c.estado === 'Potencial').length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard, {user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total de Clientes: {clientes.length}</p>
            <p>Clientes Activos: {clientesActivos}</p>
            <p>Clientes Potenciales: {clientesPotenciales}</p>
          </CardContent>
        </Card>
        {/* Añade más tarjetas para otras métricas relevantes */}
      </div>
    </div>
  );
};

export default Dashboard;