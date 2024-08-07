import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Task } from '@/types/task';

const supabase = createClientComponentClient();

export async function getTasks(): Promise<Task[]> {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'user_id'>): Promise<Task> {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...task, user_id: user?.id })
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateTask(id: number, updates: Partial<Task>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}