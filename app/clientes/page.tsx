"use client";

import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '@/utils/clienteService';
import { Cliente } from '@/types/client';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id' | 'creado_el' | 'creado_por'>>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    estado: 'Potencial'
  });
  const [editandoCliente, setEditandoCliente] = useState<Cliente | null>(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      addNotification('Error al cargar clientes', 'error');
    }
  }

  async function handleCreateCliente(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createCliente(nuevoCliente);
      addNotification('Cliente creado con éxito', 'success');
      setNuevoCliente({ nombre: '', email: '', telefono: '', empresa: '', estado: 'Potencial' });
      fetchClientes();
    } catch (error) {
      addNotification('Error al crear cliente', 'error');
    }
  }

  async function handleUpdateCliente(e: React.FormEvent) {
    e.preventDefault();
    if (!editandoCliente) return;
    try {
      await updateCliente(editandoCliente.id, editandoCliente);
      addNotification('Cliente actualizado con éxito', 'success');
      setEditandoCliente(null);
      fetchClientes();
    } catch (error) {
      addNotification('Error al actualizar cliente', 'error');
    }
  }

  async function handleDeleteCliente(id: number) {
    try {
      await deleteCliente(id);
      addNotification('Cliente eliminado con éxito', 'success');
      fetchClientes();
    } catch (error) {
      addNotification('Error al eliminar cliente', 'error');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <Card>
        <CardHeader>
          <CardTitle>{editandoCliente ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editandoCliente ? handleUpdateCliente : handleCreateCliente} className="space-y-4">
            <Input
              placeholder="Nombre"
              value={editandoCliente ? editandoCliente.nombre : nuevoCliente.nombre}
              onChange={(e) => editandoCliente 
                ? setEditandoCliente({...editandoCliente, nombre: e.target.value})
                : setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
            />
            <Input
              placeholder="Email"
              value={editandoCliente ? editandoCliente.email : nuevoCliente.email}
              onChange={(e) => editandoCliente
                ? setEditandoCliente({...editandoCliente, email: e.target.value})
                : setNuevoCliente({...nuevoCliente, email: e.target.value})}
            />
            <Input
              placeholder="Teléfono"
              value={editandoCliente ? editandoCliente.telefono : nuevoCliente.telefono}
              onChange={(e) => editandoCliente
                ? setEditandoCliente({...editandoCliente, telefono: e.target.value})
                : setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
            />
            <Input
              placeholder="Empresa"
              value={editandoCliente ? editandoCliente.empresa : nuevoCliente.empresa}
              onChange={(e) => editandoCliente
                ? setEditandoCliente({...editandoCliente, empresa: e.target.value})
                : setNuevoCliente({...nuevoCliente, empresa: e.target.value})}
            />
            <Select
              value={editandoCliente ? editandoCliente.estado : nuevoCliente.estado}
              onValueChange={(value) => editandoCliente
                ? setEditandoCliente({...editandoCliente, estado: value as 'Potencial' | 'Activo' | 'Inactivo'})
                : setNuevoCliente({...nuevoCliente, estado: value as 'Potencial' | 'Activo' | 'Inactivo'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Potencial">Potencial</SelectItem>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">{editandoCliente ? 'Actualizar Cliente' : 'Añadir Cliente'}</Button>
            {editandoCliente && (
              <Button type="button" onClick={() => setEditandoCliente(null)}>Cancelar Edición</Button>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>
        {clientes.map((cliente) => (
          <Card key={cliente.id} className="mb-4">
            <CardContent>
              <p><strong>Nombre:</strong> {cliente.nombre}</p>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Teléfono:</strong> {cliente.telefono}</p>
              <p><strong>Empresa:</strong> {cliente.empresa}</p>
              <p><strong>Estado:</strong> {cliente.estado}</p>
              <div className="mt-2">
                <Button onClick={() => setEditandoCliente(cliente)} className="mr-2">Editar</Button>
                <Button onClick={() => handleDeleteCliente(cliente.id)} variant="destructive">Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientesPage;