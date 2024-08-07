"use client";

import React from 'react';
import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const MainPage = () => {
  const user = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Task Management System</h1>
      
      {user ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hello, {user.email}</CardTitle>
              <CardDescription>What would you like to do today?</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Link href="/dashboard">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Link href="/tasks">
                <Button className="w-full">Manage Tasks</Button>
              </Link>
              <Link href="/reports">
                <Button className="w-full">View Reports</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Sign in or create an account to start managing your tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center space-x-4">
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About Our System</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Effortlessly manage your tasks</li>
                <li>Track your progress with intuitive dashboards</li>
                <li>Generate insightful reports</li>
                <li>Collaborate with team members</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MainPage;