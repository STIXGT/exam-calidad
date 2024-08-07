"use client";
import React, { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { getTasks, createTask, updateTask, deleteTask } from '@/utils/taskService';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      addNotification('Failed to fetch tasks', 'error');
    }
  }

  async function handleCreateTask() {
    if (!newTaskTitle.trim()) return;
    try {
      await createTask({ title: newTaskTitle, description: '', is_completed: false});
      setNewTaskTitle('');
      fetchTasks();
      addNotification('Task created successfully', 'success');
    } catch (error) {
      addNotification('Failed to create task', 'error');
    }
  }

  async function handleToggleTask(task: Task) {
    try {
      await updateTask(task.id, { is_completed: !task.is_completed });
      fetchTasks();
      addNotification('Task updated successfully', 'success');
    } catch (error) {
      addNotification('Failed to update task', 'error');
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      fetchTasks();
      addNotification('Task deleted successfully', 'success');
    } catch (error) {
      addNotification('Failed to delete task', 'error');
    }
  }

  return (
    <Card>
      <CardHeader>Tasks</CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
            className="mr-2"
          />
          <Button onClick={handleCreateTask}>Add Task</Button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => handleToggleTask(task)}
                className="mr-2"
              />
              <span className={task.is_completed ? 'line-through' : ''}>{task.title}</span>
              <Button onClick={() => handleDeleteTask(task.id)} className="ml-auto">Delete</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskList;