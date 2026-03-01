'use client';

import { UserButton } from '@clerk/nextjs';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">LinkShortner</h1>
        <span className="text-sm text-gray-600 dark:text-gray-400">Dashboard</span>
      </div>
      
      <div className="flex items-center gap-4">
        <UserButton 
          appearance={{
            elements: {
              avatarBox: 'h-10 w-10 rounded-full',
              userButtonTrigger: 'focus:shadow-none focus:outline-none',
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </header>
  );
}
