// types/task.ts
export type Task = {
    id: number;
    user_id: string;
    title: string;
    description: string;
    is_completed: boolean;
    created_at: string;
  };