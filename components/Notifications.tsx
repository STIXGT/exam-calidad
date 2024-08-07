"use client";
import React from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50">
      {notifications.map(notification => (
        <Alert key={notification.id} className={`mb-2 ${notification.type === 'error' ? 'bg-red-100' : notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
          <AlertDescription>
            {notification.message}
            <button onClick={() => removeNotification(notification.id)} className="ml-2 text-sm">
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default Notifications;