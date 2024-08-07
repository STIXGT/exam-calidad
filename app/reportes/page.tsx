"use client";

import React, { useState, useEffect } from 'react';
import { getClientes } from '@/utils/clienteService';
import { getOportunidades } from '@/utils/oportunidadService';
import { Cliente, Oportunidad } from '@/types/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotifications } from '@/contexts/NotificationContext';

const ReportesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([]);
  const [tipoReporte, setTipoReporte] = useState<'clientes' | 'ventas'>('clientes');
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const clientesData = await getClientes();
      const oportunidadesData = await getOportunidades();
      setClientes(clientesData);
      setOportunidades(oportunidadesData);
    } catch (error) {
      addNotification('Error al cargar datos para reportes', 'error');
    }
  }

  const reporteClientes = () => {
    const totalClientes = clientes.length;
    const clientesActivos = clientes.filter(c => c.estado === 'Activo').length;
    const clientesPotenciales = clientes.filter(c => c.estado === 'Potencial').length;
    const clientesInactivos = clientes.filter(c => c.estado === 'Inactivo').length;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Reporte de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total de Clientes: {totalClientes}</p>
          <p>Clientes Activos: {clientesActivos}</p>
          <p>Clientes Potenciales: {clientesPotenciales}</p>
          <p>Clientes Inactivos: {clientesInactivos}</p>
        </CardContent>
      </Card>
    );
  };

  const reporteVentas = () => {
    const totalOportunidades = oportunidades.length;
    const oportunidadesAbiertas = oportunidades.filter(o => o.estado === 'Abierta').length;
    const oportunidadesGanadas = oportunidades.filter(o => o.estado === 'Ganada').length;
    const oportunidadesPerdidas = oportunidades.filter(o => o.estado === 'Perdida').length;
    const valorTotalOportunidades = oportunidades.reduce((sum, o) => sum + o.valor, 0);
    const valorOportunidadesGanadas = oportunidades.filter(o => o.estado === 'Ganada').reduce((sum, o) => sum + o.valor, 0);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Reporte de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total de Oportunidades: {totalOportunidades}</p>
          <p>Oportunidades Abiertas: {oportunidadesAbiertas}</p>
          <p>Oportunidades Ganadas: {oportunidadesGanadas}</p>
          <p>Oportunidades Perdidas: {oportunidadesPerdidas}</p>
          <p>Valor Total de Oportunidades: ${valorTotalOportunidades.toFixed(2)}</p>
          <p>Valor de Oportunidades Ganadas: ${valorOportunidadesGanadas.toFixed(2)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Reportes</h1>
      <div className="mb-4">
        <Select value={tipoReporte} onValueChange={(value) => setTipoReporte(value as 'clientes' | 'ventas')}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo de reporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clientes">Reporte de Clientes</SelectItem>
            <SelectItem value="ventas">Reporte de Ventas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {tipoReporte === 'clientes' ? reporteClientes() : reporteVentas()}
    </div>
  );
};

export default ReportesPage;