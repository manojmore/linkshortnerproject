import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Links</h2>
        </div>
      </main>
    </div>
  );
}
