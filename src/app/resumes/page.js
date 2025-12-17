'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ResumesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    fetchResumes();
  }, [session, status, router]);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Resumes</h1>
            <p className="text-gray-600 mt-2">Manage and optimize your resume collection</p>
          </div>
          <Link href="/scan" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            New Scan
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-semibold mb-4">No resumes yet</h2>
            <p className="text-gray-600 mb-8">Upload your first resume to start optimizing for ATS systems</p>
            <Link href="/scan" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Upload Resume
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{resume.title}</h3>
                      <p className="text-sm text-gray-600">
                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-2xl">📄</div>
                  </div>
                  
                  {resume.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resume.tags.split(',').map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {resume.analyses?.length || 0} scans
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Version Manager for Pro Users */}
        {session.user.subscriptionTier !== 'FREE' && (
          <div className="mt-12 bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">Resume Version Manager</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-semibold mb-2">Create Master Resume</h3>
                <p className="text-gray-600 mb-4">Complete career history for all applications</p>
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                  Create Master
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Targeted Versions</h3>
                <p className="text-gray-600 mb-4">Tailored resumes for specific roles</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Create Version
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}