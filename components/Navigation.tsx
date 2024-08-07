"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@supabase/auth-helpers-react';
import LogoutButton from './LogoutButton';

const Navigation: React.FC = () => {
  const user = useUser();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/clientes', label: 'Clientes' },
    { href: '/oportunidades', label: 'Oportunidades' },
    { href: '/reportes', label: 'Reportes' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          CRM App
        </Link>
        <div className="space-x-1 md:space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/login')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;