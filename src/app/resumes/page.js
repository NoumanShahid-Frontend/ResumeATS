'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, 
  FaUpload,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaLock,
  FaCrown
} from 'react-icons/fa';

export default function MyResumes() {
  const { data: session } = useSession();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock user subscription
  const userPlan = 'FREE_TRIAL';
  const trialDaysLeft = 2;

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (resume) => {
    if (userPlan === 'EXPIRED_TRIAL') {
      alert('Your free trial has expired. Upgrade to Pro to download reports.');
      return;
    }
    
    if (userPlan === 'FREE_TRIAL') {
      alert(`Free trial: ${trialDaysLeft} days left. Upgrade to Pro for unlimited downloads.`);
    }
    
    console.log('Downloading:', resume.originalName);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', 'General job requirements');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.error) {
        alert(`Upload failed: ${result.error}`);
      } else {
        alert('Resume uploaded successfully!');
        fetchResumes(); // Refresh the list
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
            <p className="text-gray-600">Manage and optimize your resume collection</p>
          </div>
          
          <div className="flex items-center gap-4">
            {userPlan === 'FREE_TRIAL' && (
              <div className="bg-orange-100 border border-orange-200 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <FaCrown className="text-orange-600" />
                  <span className="text-orange-800 font-medium text-sm">
                    Trial: {trialDaysLeft} days left
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FaUpload />
                Upload New Resume
              </label>
            </div>
          </div>
        </div>

        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <motion.div 
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaFileAlt className="text-blue-600 text-xl" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    resume.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                    resume.status === 'Optimized' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {resume.status}
                  </span>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{resume.originalName}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 font-medium">ATS Score</span>
                    <span className={`font-bold text-lg ${
                      resume.atsScore >= 80 ? 'text-green-600' : 
                      resume.atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {resume.atsScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        resume.atsScore >= 80 ? 'bg-green-500' : 
                        resume.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${resume.atsScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium">
                    <FaEye className="text-sm" />
                    View
                  </button>
                  <button 
                    onClick={() => handleDownload(resume)}
                    className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${
                      userPlan === 'EXPIRED_TRIAL' 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    disabled={userPlan === 'EXPIRED_TRIAL'}
                  >
                    {userPlan === 'EXPIRED_TRIAL' ? <FaLock className="text-sm" /> : <FaDownload className="text-sm" />}
                    {userPlan === 'EXPIRED_TRIAL' ? 'Locked' : 'Download'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-12 shadow-lg text-center"
          >
            <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Resumes Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Upload your first resume to get started with ATS optimization and improve your job search success.
            </p>
            <div>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
                id="first-resume-upload"
              />
              <label
                htmlFor="first-resume-upload"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto cursor-pointer"
              >
                <FaUpload />
                Upload Your First Resume
              </label>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}