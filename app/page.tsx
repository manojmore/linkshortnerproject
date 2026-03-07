import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Link2, BarChart3, Lock, Zap, Copy, Share2 } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: Link2,
      title: 'Instant Link Shortening',
      description: 'Convert long URLs into short, shareable links in just one click.',
    },
    {
      icon: BarChart3,
      title: 'Click Analytics',
      description: 'Track clicks, geographic data, and referrers for each shortened link.',
    },
    {
      icon: Lock,
      title: 'Secure & Reliable',
      description: 'Your links are protected with industry-standard security measures.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures your redirects happen instantly.',
    },
    {
      icon: Copy,
      title: 'Easy to Copy',
      description: 'One-click copying makes sharing your shortened links effortless.',
    },
    {
      icon: Share2,
      title: 'Share Everywhere',
      description: 'Perfect for social media, emails, marketing campaigns, and more.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">LinkShortner</h2>
        </div>
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white dark:from-zinc-900 dark:to-black">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                Shorten Your Links,{' '}
                <span className="text-blue-600 dark:text-blue-400">Amplify Your Reach</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Transform long, unwieldy URLs into short, memorable links. Track performance, manage your links, and optimize your sharing strategy—all from one powerful platform.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <SignUpButton mode="modal">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Get Started Free
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="px-8 py-3 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 md:py-32 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to manage, track, and optimize your links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg dark:hover:shadow-blue-500/10 transition-all"
                  >
                    <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-20 md:py-32 bg-gray-50 dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Get started in three simple steps.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Paste Your URL',
                  description: 'Paste any long URL into LinkShortner. It takes just a few seconds.',
                },
                {
                  step: '2',
                  title: 'Customize (Optional)',
                  description: 'Add custom aliases or let us generate a short code automatically.',
                },
                {
                  step: '3',
                  title: 'Share & Track',
                  description: 'Copy your shortened link and share it everywhere. Monitor clicks in real-time.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 md:py-32 bg-blue-600 dark:bg-blue-900">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Shorten Your Links?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Join thousands of users who are already shortening and tracking their links with LinkShortner.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <SignUpButton mode="modal">
                <button className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Start for Free
                </button>
              </SignUpButton>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-gray-600 dark:text-gray-400">
                © 2026 LinkShortner. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
