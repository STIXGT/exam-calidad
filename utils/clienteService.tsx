import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Cliente } from '@/types/client';

const supabase = createClientComponentClient();

export async function getClientes(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('creado_el', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createCliente(cliente: Omit<Cliente, 'id' | 'creado_el' | 'creado_por'>): Promise<Cliente> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('No se pudo obtener el usuario actual');

  const { data, error } = await supabase
    .from('clientes')
    .insert({ ...cliente, creado_por: user.id })
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateCliente(id: number, updates: Partial<Cliente>): Promise<Cliente> {
  const { data, error } = await supabase
    .from('clientes')
    .update(updates)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteCliente(id: number): Promise<void> {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}