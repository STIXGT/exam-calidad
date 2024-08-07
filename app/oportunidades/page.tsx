"use client";

import React, { useState, useEffect } from 'react';
import { getOportunidades, createOportunidad, updateOportunidad, deleteOportunidad } from '@/utils/oportunidadService';
import { getClientes } from '@/utils/clienteService';
import { Oportunidad, Cliente } from '@/types/client';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OportunidadesPage: React.FC = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nuevaOportunidad, setNuevaOportunidad] = useState<Partial<Oportunidad>>({
    cliente_id: 0,
    descripcion: '',
    valor: 0,
    estado: 'Abierta',
    fecha_cierre: new Date().toISOString().split('T')[0]
  });
  const [editandoOportunidad, setEditandoOportunidad] = useState<Oportunidad | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchOportunidades();
    fetchClientes();
  }, []);

  async function fetchOportunidades() {
    try {
      const data = await getOportunidades();
      setOportunidades(data);
    } catch (error) {
      addNotification('Error al cargar oportunidades', 'error');
    }
  }

  async function fetchClientes() {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      addNotification('Error al cargar clientes', 'error');
    }
  }

  async function handleCreateOportunidad(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createOportunidad(nuevaOportunidad as Oportunidad);
      addNotification('Oportunidad creada con éxito', 'success');
      setNuevaOportunidad({
        cliente_id: 0,
        descripcion: '',
        valor: 0,
        estado: 'Abierta',
        fecha_cierre: new Date().toISOString().split('T')[0]
      });
      fetchOportunidades();
    } catch (error) {
      addNotification('Error al crear oportunidad', 'error');
    }
  }

  async function handleUpdateOportunidad(e: React.FormEvent) {
    e.preventDefault();
    if (!editandoOportunidad) return;
    try {
      await updateOportunidad(editandoOportunidad.id, editandoOportunidad);
      addNotification('Oportunidad actualizada con éxito', 'success');
      setEditandoOportunidad(null);
      fetchOportunidades();
    } catch (error) {
      addNotification('Error al actualizar oportunidad', 'error');
    }
  }

  async function handleDeleteOportunidad(id: number) {
    try {
      await deleteOportunidad(id);
      addNotification('Oportunidad eliminada con éxito', 'success');
      fetchOportunidades();
    } catch (error) {
      addNotification('Error al eliminar oportunidad', 'error');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Oportunidades</h1>
      <Card>
        <CardHeader>
          <CardTitle>{editandoOportunidad ? 'Editar Oportunidad' : 'Añadir Nueva Oportunidad'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editandoOportunidad ? handleUpdateOportunidad : handleCreateOportunidad} className="space-y-4">
            <Select
              value={editandoOportunidad ? editandoOportunidad.cliente_id.toString() : nuevaOportunidad.cliente_id?.toString()}
              onValueChange={(value) => editandoOportunidad
                ? setEditandoOportunidad({...editandoOportunidad, cliente_id: parseInt(value)})
                : setNuevaOportunidad({...nuevaOportunidad, cliente_id: parseInt(value)})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((cliente) => (
                  <SelectItem key={cliente.id} value={cliente.id.toString()}>{cliente.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Descripción"
              value={editandoOportunidad ? editandoOportunidad.descripcion : nuevaOportunidad.descripcion}
              onChange={(e) => editandoOportunidad
                ? setEditandoOportunidad({...editandoOportunidad, descripcion: e.target.value})
                : setNuevaOportunidad({...nuevaOportunidad, descripcion: e.target.value})}
            />
            <Input
              type="number"
              placeholder="Valor"
              value={editandoOportunidad ? editandoOportunidad.valor : nuevaOportunidad.valor}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                editandoOportunidad
                  ? setEditandoOportunidad({...editandoOportunidad, valor: value})
                  : setNuevaOportunidad({...nuevaOportunidad, valor: value});
              }}
            />
            <Select
              value={editandoOportunidad ? editandoOportunidad.estado : nuevaOportunidad.estado}
              onValueChange={(value) => editandoOportunidad
                ? setEditandoOportunidad({...editandoOportunidad, estado: value as 'Abierta' | 'Ganada' | 'Perdida'})
                : setNuevaOportunidad({...nuevaOportunidad, estado: value as 'Abierta' | 'Ganada' | 'Perdida'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Abierta">Abierta</SelectItem>
                <SelectItem value="Ganada">Ganada</SelectItem>
                <SelectItem value="Perdida">Perdida</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={editandoOportunidad ? editandoOportunidad.fecha_cierre.split('T')[0] : nuevaOportunidad.fecha_cierre}
              onChange={(e) => editandoOportunidad
                ? setEditandoOportunidad({...editandoOportunidad, fecha_cierre: e.target.value})
                : setNuevaOportunidad({...nuevaOportunidad, fecha_cierre: e.target.value})}
            />
            <Button type="submit">{editandoOportunidad ? 'Actualizar Oportunidad' : 'Añadir Oportunidad'}</Button>
            {editandoOportunidad && (
              <Button type="button" onClick={() => setEditandoOportunidad(null)}>Cancelar Edición</Button>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Lista de Oportunidades</h2>
        {oportunidades.map((oportunidad) => (
          <Card key={oportunidad.id} className="mb-4">
            <CardContent>
              <p><strong>Cliente:</strong> {clientes.find(c => c.id === oportunidad.cliente_id)?.nombre}</p>
              <p><strong>Descripción:</strong> {oportunidad.descripcion}</p>
              <p><strong>Valor:</strong> ${oportunidad.valor.toFixed(2)}</p>
              <p><strong>Estado:</strong> {oportunidad.estado}</p>
              <p><strong>Fecha de Cierre:</strong> {new Date(oportunidad.fecha_cierre).toLocaleDateString()}</p>
              <div className="mt-2">
                <Button onClick={() => setEditandoOportunidad(oportunidad)} className="mr-2">Editar</Button>
                <Button onClick={() => handleDeleteOportunidad(oportunidad.id)} variant="destructive">Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OportunidadesPage;