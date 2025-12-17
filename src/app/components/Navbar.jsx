'use client';

import { useSession } from 'next-auth/react';
import GuestNavbar from './GuestNavbar';
import UserNavbar from './UserNavbar';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-blue-200/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-16">
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
              <div className="w-32 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return session ? <UserNavbar /> : <GuestNavbar />;
}