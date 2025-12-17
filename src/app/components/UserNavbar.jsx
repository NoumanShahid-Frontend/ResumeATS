'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaFileAlt, 
  FaDollarSign, 
  FaRocket, 
  FaBars, 
  FaTimes,
  FaHome,
  FaSearch,
  FaBell,
  FaCog,
  FaUser
} from 'react-icons/fa';

export default function UserNavbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
    { name: 'My Resumes', href: '/resumes', icon: FaFileAlt },
    { name: 'Scan Resume', href: '/scan', icon: FaSearch },
    { name: 'Pricing', href: '/pricing', icon: FaDollarSign }
  ];

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-200/50' 
          : 'bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100/50'
      }`}
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
            <Link href="/dashboard" className="flex items-center gap-3 group">
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
                <p className="text-xs text-gray-500 -mt-1">Dashboard</p>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div 
                key={item.name}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  <item.icon className="text-sm" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative"
            >
              <FaBell />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <FaCog />
            </motion.button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {session?.user?.name?.[0] || session?.user?.email?.[0] || 'U'}
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-medium text-gray-700">
                    {session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {session?.user?.subscriptionTier?.toLowerCase() || 'free'} Plan
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
              >
                <FaSignOutAlt className="text-xs" />
                <span className="hidden lg:block">Sign Out</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
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
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {session?.user?.name?.[0] || session?.user?.email?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">
                      {session?.user?.subscriptionTier?.toLowerCase() || 'free'} Plan
                    </p>
                  </div>
                </div>

                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="text-blue-600" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <div className="border-t border-gray-200 pt-3">
                  <motion.button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all"
                  >
                    <FaSignOutAlt />
                    <span className="font-medium">Sign Out</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}