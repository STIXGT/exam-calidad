"use client";

import React from 'react';
import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react';
import LogoutButton from './LogoutButton';

const Navigation: React.FC = () => {
  const user = useUser();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/tasks" className="hover:text-gray-300">
            Tasks
          </Link>
          <Link href="/reports" className="hover:text-gray-300">
            Reports
          </Link>
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;