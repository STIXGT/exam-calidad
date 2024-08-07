"use client";
import React, { useState, useEffect } from 'react';
import { getTasks } from '@/utils/taskService';
import { Task } from '@/types/task';
import { useNotifications } from '@/contexts/NotificationContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const TaskReport: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
      addNotification('Report generated successfully', 'success');
    } catch (error) {
      addNotification('Failed to generate report', 'error');
    }
  }

  const completedTasks = tasks.filter(task => task.is_completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <Card>
      <CardHeader>Task Report</CardHeader>
      <CardContent>
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
      </CardContent>
    </Card>
  );
};

export default TaskReport;