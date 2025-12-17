'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalScans: 0,
    averageScore: 0,
    recentAnalyses: []
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    // Fetch user stats
    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {session.user.name || 'User'}!</h1>
          <p className="text-gray-600 mt-2">Here's your resume optimization overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.totalResumes}</div>
            <div className="text-gray-600">Total Resumes</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">{stats.totalScans}</div>
            <div className="text-gray-600">ATS Scans</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-purple-600">{stats.averageScore}/100</div>
            <div className="text-gray-600">Average Score</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-orange-600">{session.user.subscriptionTier}</div>
            <div className="text-gray-600">Plan</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/scan" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700">
                New ATS Scan
              </Link>
              <Link href="/resumes" className="block w-full border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50">
                Manage Resumes
              </Link>
              <Link href="/profile" className="block w-full border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50">
                Update Profile
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {stats.recentAnalyses.length > 0 ? (
              <div className="space-y-3">
                {stats.recentAnalyses.map((analysis, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{analysis.resumeTitle}</div>
                      <div className="text-sm text-gray-600">{analysis.date}</div>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {analysis.score}/100
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">📄</div>
                <p>No scans yet. Upload your first resume to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Prompt for Free Users */}
        {session.user.subscriptionTier === 'FREE' && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Unlock Full Potential</h2>
            <p className="mb-6">Get unlimited scans, detailed reports, and optimized resume downloads</p>
            <Link href="/pricing" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Upgrade Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}