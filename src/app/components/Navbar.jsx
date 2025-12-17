'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
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
  FaCog
} from 'react-icons/fa';

export default function Navbar() {
  const { data: session, status } = useSession();
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
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Scan Resume', href: '/scan', icon: FaSearch },
    { name: 'Pricing', href: '/pricing', icon: FaDollarSign }
  ];

  const userNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
    { name: 'My Resumes', href: '/resumes', icon: FaFileAlt }
  ];

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-200/50' 
          : 'bg-white/10 backdrop-blur-sm'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaRocket className="text-white text-xl" />
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Resume ATS Fixer
                </h1>
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  } backdrop-blur-sm`}
                >
                  <item.icon className="text-sm" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-3">
            {status === 'loading' ? (
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                {/* User Navigation */}
                {userNavItems.map((item, index) => (
                  <motion.div 
                    key={item.name}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.href} 
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isScrolled 
                          ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                          : 'text-white/80 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      <item.icon className="text-sm" />
                      <span className="hidden xl:block">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-300/50">
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                    </div>
                    <span className={`text-sm font-medium ${
                      isScrolled ? 'text-gray-700' : 'text-white/90'
                    }`}>
                      {session.user?.name?.split(' ')[0] || session.user?.email?.split('@')[0]}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span className="hidden lg:block">Sign Out</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/auth/signin" 
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <FaUser className="text-sm" />
                    Sign In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/auth/signup" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl font-medium"
                  >
                    <FaUser className="text-sm" />
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 rounded-xl transition-all ${
              isScrolled 
                ? 'text-gray-700 hover:bg-blue-50' 
                : 'text-white hover:bg-white/20'
            }`}
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
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 mt-4 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
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
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="text-blue-600" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {session ? (
                  <>
                    <div className="border-t border-gray-200 pt-4">
                      {userNavItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navItems.length + index) * 0.1 }}
                        >
                          <Link 
                            href={item.href} 
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="text-blue-600" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all"
                    >
                      <FaSignOutAlt />
                      <span className="font-medium">Sign Out</span>
                    </motion.button>
                  </>
                ) : (
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link 
                        href="/auth/signin" 
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-700 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="text-blue-600" />
                        <span className="font-medium">Sign In</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link 
                        href="/auth/signup" 
                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser />
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}