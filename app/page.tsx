import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">LinkShortner</h2>
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-32">
        <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Shorten your links
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Create short, memorable links in seconds. Track clicks and manage your links efficiently—all in one place.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </main>
    </div>
  );
}
