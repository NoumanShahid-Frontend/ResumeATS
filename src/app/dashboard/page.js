'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, 
  FaChartLine, 
  FaUpload,
  FaDownload,
  FaStar,
  FaEye,
  FaPlus,
  FaCalendarAlt,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaLock,
  FaCrown
} from 'react-icons/fa';

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock user subscription - in real app this would come from session/API
  const userPlan = 'FREE_TRIAL'; // FREE_TRIAL, PRO, EXPIRED_TRIAL
  const trialDaysLeft = 2;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, resumesRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/resumes')
      ]);
      
      const statsData = await statsRes.json();
      const resumesData = await resumesRes.json();
      
      setStats(statsData);
      setResumes(resumesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = (resume) => {
    if (userPlan === 'EXPIRED_TRIAL') {
      alert('Your free trial has expired. Upgrade to Pro to download reports.');
      return;
    }
    
    if (userPlan === 'FREE_TRIAL') {
      alert(`Free trial: ${trialDaysLeft} days left. Upgrade to Pro for unlimited downloads.`);
    }
    
    // Mock download
    console.log('Downloading report for:', resume.originalName);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}!</p>
            </div>
            
            {/* Trial Status */}
            {userPlan === 'FREE_TRIAL' && (
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FaCrown className="text-orange-600" />
                  <span className="text-orange-800 font-medium">
                    Free Trial: {trialDaysLeft} days left
                  </span>
                </div>
              </div>
            )}
            
            {userPlan === 'EXPIRED_TRIAL' && (
              <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FaLock className="text-red-600" />
                  <span className="text-red-800 font-medium">Trial Expired - Upgrade to Pro</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalResumes || 0}</p>
                <div className="flex items-center mt-1">
                  <FaArrowUp className="text-green-500 text-xs mr-1" />
                  <span className="text-xs text-green-600">+2 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-blue-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg ATS Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.avgAtsScore || 0}%</p>
                <div className="flex items-center mt-1">
                  <FaArrowUp className="text-green-500 text-xs mr-1" />
                  <span className="text-xs text-green-600">+5% this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-green-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.applications || 0}</p>
                <div className="flex items-center mt-1">
                  <FaArrowUp className="text-green-500 text-xs mr-1" />
                  <span className="text-xs text-green-600">+12 this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FaUsers className="text-purple-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interview Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.interviewRate || 0}%</p>
                <div className="flex items-center mt-1">
                  <FaArrowUp className="text-green-500 text-xs mr-1" />
                  <span className="text-xs text-green-600">+8% improvement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-orange-600 text-xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ATS Score Trend</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaUpload />
                <span>Upload New Resume</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <FaStar />
                <span>AI Optimization</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <FaChartLine />
                <span>View Analytics</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Recent Resumes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Resumes</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          
          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.slice(0, 3).map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaFileAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{resume.originalName}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{resume.atsScore}%</p>
                      <p className="text-xs text-gray-600">{resume.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleDownloadReport(resume)}
                        className={`p-2 rounded-lg transition-colors ${
                          userPlan === 'EXPIRED_TRIAL' 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        disabled={userPlan === 'EXPIRED_TRIAL'}
                      >
                        {userPlan === 'EXPIRED_TRIAL' ? <FaLock /> : <FaDownload />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaFileAlt className="text-4xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No resumes uploaded yet</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upload Your First Resume
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}