'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import ScoreTeaser from '../components/ScoreTeaser';
import { 
  FaExclamationTriangle, 
  FaSearch, 
  FaFileAlt, 
  FaEnvelope, 
  FaSpinner,
  FaRocket,
  FaRedo,
  FaCrown,
  FaGift
} from 'react-icons/fa';

export default function ScanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scanResult, setScanResult] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    
    // Allow guest access but track it
    if (!session) {
      setIsGuest(true);
    }
  }, [session, status]);

  const handleScanComplete = (result) => {
    setScanResult(result);
    
    // Prompt guest users to sign up after scan
    if (isGuest) {
      setTimeout(() => {
        if (confirm('Sign up to save your results and get unlimited scans!')) {
          router.push('/auth/signup');
        }
      }, 3000);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {isGuest && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-yellow-600 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800">Guest Mode</p>
                <p className="text-sm text-yellow-700">
                  Sign up to save your results and get unlimited scans!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaRocket className="text-blue-600 text-3xl" />
              <h1 className="text-4xl font-bold text-gray-800">ATS Resume Scanner</h1>
            </div>
            <p className="text-xl text-gray-600">
              Upload your resume and job description to get instant ATS compatibility feedback
            </p>
          </div>

          {!scanResult ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <FileUpload onUpload={handleScanComplete} />
              
              {/* Free tier limitations */}
              {session?.user?.subscriptionTier === 'FREE' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaGift className="text-blue-600" />
                    <p className="text-sm text-blue-800">
                      <strong>Free Plan:</strong> 1 scan per month. 
                      <a href="/pricing" className="underline ml-1 hover:text-blue-900">Upgrade for unlimited scans</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <ScoreTeaser score={scanResult.score} topIssues={scanResult.topIssues} />
              
              {/* Upgrade prompts */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <FaCrown className="text-yellow-400 text-2xl" />
                  <h2 className="text-2xl font-bold">Want More Insights?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <FaSearch className="text-3xl mb-2 mx-auto text-blue-200" />
                    <h3 className="font-semibold mb-2">Detailed Analysis</h3>
                    <p className="text-sm opacity-90">Side-by-side comparison with recommendations</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <FaFileAlt className="text-3xl mb-2 mx-auto text-blue-200" />
                    <h3 className="font-semibold mb-2">Optimized Resume</h3>
                    <p className="text-sm opacity-90">Download ATS-friendly version instantly</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <FaEnvelope className="text-3xl mb-2 mx-auto text-blue-200" />
                    <h3 className="font-semibold mb-2">Cover Letter</h3>
                    <p className="text-sm opacity-90">AI-generated matching cover letter</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Get Full Report - $4.99
                  </button>
                  <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setScanResult(null)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <FaRedo />
                  Scan Another Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}