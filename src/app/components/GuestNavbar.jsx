'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AuthModal from './AuthModal';
import { 
  FaUser, 
  FaDollarSign, 
  FaRocket, 
  FaBars, 
  FaTimes,
  FaHome
} from 'react-icons/fa';

export default function GuestNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Pricing', href: '/pricing', icon: FaDollarSign }
  ];

  const handleAnalyzeClick = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <motion.nav 
      className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-blue-200/50 transition-all duration-500"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-md"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaRocket className="text-white text-lg" />
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">Resume ATS Fixer</h1>
                <p className="text-xs text-gray-500 -mt-1">AI-Powered Resume Optimization</p>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.div 
                key={item.name}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    pathname === item.href 
                      ? 'text-blue-600 bg-blue-50 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="text-sm" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
            
            {/* Analyze Resume Button */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={handleAnalyzeClick}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <FaRocket className="text-sm" />
                <span>Analyze Resume</span>
              </button>
            </motion.div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                <FaUser className="text-sm" />
                Sign In
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={() => openAuthModal('signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl font-medium"
              >
                <FaUser className="text-sm" />
                Sign Up
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl transition-all text-gray-700 hover:bg-blue-50"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 mt-2 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        pathname === item.href 
                          ? 'text-blue-600 bg-blue-50 font-semibold' 
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="text-blue-600" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.button
                  onClick={() => {
                    handleAnalyzeClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <FaRocket />
                  <span className="font-medium">Analyze Resume</span>
                </motion.button>
                
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <motion.button
                    onClick={() => {
                      openAuthModal('signin');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all"
                  >
                    <FaUser className="text-blue-600" />
                    <span className="font-medium">Sign In</span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    <FaUser />
                    <span className="font-medium">Sign Up</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        callbackUrl="/scan"
      />
    </motion.nav>
  );
}