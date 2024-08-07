import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Oportunidad } from '@/types/client';

const supabase = createClientComponentClient();

export async function getOportunidades(): Promise<Oportunidad[]> {
  const { data, error } = await supabase
    .from('oportunidades')
    .select('*')
    .order('fecha_cierre', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createOportunidad(oportunidad: Omit<Oportunidad, 'id' | 'creado_por'>): Promise<Oportunidad> {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('oportunidades')
    .insert({ ...oportunidad, creado_por: user?.id })
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateOportunidad(id: number, updates: Partial<Oportunidad>): Promise<Oportunidad> {
  const { data, error } = await supabase
    .from('oportunidades')
    .update(updates)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteOportunidad(id: number): Promise<void> {
  const { error } = await supabase
    .from('oportunidades')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}