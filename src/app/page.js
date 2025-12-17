'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from './components/AnimatedCounter';
import AuthModal from './components/AuthModal';
import { 
  FaRocket, 
  FaCheck, 
  FaTimes, 
  FaFileAlt, 
  FaBullseye, 
  FaChartBar,
  FaSearch,
  FaBolt,
  FaStar,
  FaFire,
  FaUsers,
  FaShieldAlt,
  FaClock,
  FaDownload,
  FaLinkedin,
  FaHeadset,
  FaAward,
  FaLightbulb,
  FaChartLine,
  FaPlay,
  FaArrowRight,
  FaQuoteLeft,
  FaGraduationCap,
  FaBriefcase,
  FaBuilding
} from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { data: session } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [problemRef, problemInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [solutionRef, solutionInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const handleScanClick = () => {
    if (session) {
      window.location.href = '/scan';
    } else {
      setAuthMode('signin');
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 text-white/20"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaFileAlt size={60} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-white/20"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaChartBar size={40} />
        </motion.div>

        <div className="relative container mx-auto px-4 py-20 pt-32">
          <motion.div 
            className="text-center max-w-5xl mx-auto text-white"
            variants={staggerContainer}
            initial="initial"
            animate={heroInView ? "animate" : "initial"}
          >
            <motion.div
              variants={fadeInUp}
              className="mb-8"
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Beat the{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ATS
                </span>
                <br />
                Land the{' '}
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Interview
                </span>
              </motion.h1>
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 leading-relaxed text-white/90 max-w-3xl mx-auto"
            >
              Get your resume past Applicant Tracking Systems with{' '}
              <span className="font-semibold text-yellow-300">AI-powered optimization.</span>
              <br />
              See exactly what's blocking you and fix it in minutes.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={handleScanClick}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-10 py-5 rounded-2xl text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaRocket className="text-xl group-hover:animate-bounce" />
                  Scan My Resume - FREE
                  <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-white/80"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheck className="text-green-400 text-xl" />
                  <span>No signup required • Instant results</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Animated Stats */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: 94, suffix: '%', label: 'Success Rate' },
                { number: 50, suffix: 'K+', label: 'Resumes Optimized' },
                { number: 3, suffix: 'x', label: 'More Interviews' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-4xl font-bold mb-2 text-yellow-300">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      {/* Problem Section */}
      <div ref={problemRef} className="py-20 bg-gradient-to-br from-red-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #f87171 2px, transparent 2px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={problemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Why Your Resume Gets{' '}
              <span className="text-red-600">Rejected</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              75% of resumes never reach human eyes. Here's what's stopping yours:
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate={problemInView ? "animate" : "initial"}
          >
            {[
              { icon: FaTimes, title: 'Missing Keywords', desc: 'ATS systems scan for specific job-related terms', color: 'red' },
              { icon: FaFileAlt, title: 'Poor Formatting', desc: 'Complex layouts confuse parsing algorithms', color: 'orange' },
              { icon: FaBullseye, title: 'Generic Content', desc: 'One-size-fits-all resumes don\'t match job requirements', color: 'yellow' },
              { icon: FaChartBar, title: 'Low ATS Score', desc: 'Algorithms rank your resume below the cutoff', color: 'red' }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className={`w-20 h-20 bg-${item.color}-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className={`text-${item.color}-500`} />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Solution Section */}
      <div id="solution" ref={solutionRef} className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #ffffff 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={solutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              How We{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Fix
              </span>{' '}
              Your Resume
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our AI analyzes and optimizes every aspect of your resume
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate={solutionInView ? "animate" : "initial"}
          >
            {[
              { 
                icon: FaSearch, 
                title: 'Deep ATS Analysis', 
                desc: 'Our AI scans your resume like real ATS systems, identifying exactly where your resume fails and why.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: FaBullseye, 
                title: 'Smart Keyword Matching', 
                desc: 'Compare your resume against job requirements and see exactly which keywords you\'re missing.',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                icon: FaBolt, 
                title: 'One-Click Optimization', 
                desc: 'Download an ATS-optimized resume with industry-specific templates and AI improvements.',
                gradient: 'from-orange-500 to-red-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" ref={featuresRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Job Success
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize your job search and land your dream role
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate={featuresInView ? "animate" : "initial"}
          >
            {[
              { icon: FaShieldAlt, title: 'ATS Compatibility', desc: 'Guaranteed to pass major ATS systems', color: 'blue' },
              { icon: FaClock, title: 'Instant Results', desc: 'Get your optimized resume in under 60 seconds', color: 'green' },
              { icon: FaDownload, title: 'Multiple Formats', desc: 'Download in PDF, Word, and plain text', color: 'purple' },
              { icon: FaLightbulb, title: 'Smart Suggestions', desc: 'AI-powered content recommendations', color: 'orange' },
              { icon: FaUsers, title: 'Industry Experts', desc: 'Reviewed by hiring managers', color: 'red' },
              { icon: FaAward, title: 'Success Guarantee', desc: '30-day money-back guarantee', color: 'yellow' },
              { icon: FaChartLine, title: 'Performance Tracking', desc: 'Track your application success rate', color: 'indigo' },
              { icon: FaHeadset, title: '24/7 Support', desc: 'Get help whenever you need it', color: 'pink' }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-${item.color}-500`}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className={`w-12 h-12 bg-${item.color}-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Success Stories That{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Inspire
              </span>
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Real results from real job seekers who transformed their careers
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate={testimonialsInView ? "animate" : "initial"}
          >
            {[
              { 
                name: 'Sarah Martinez', 
                role: 'Software Engineer at Google', 
                quote: 'Increased my interview rate by 300%. The keyword optimization was a complete game-changer for my tech career!',
                avatar: 'SM',
                company: 'Google',
                icon: FaGraduationCap
              },
              { 
                name: 'Mike Rodriguez', 
                role: 'Marketing Director at Meta', 
                quote: 'Finally understood why my resume wasn\'t getting through. Fixed everything in just 10 minutes!',
                avatar: 'MR',
                company: 'Meta',
                icon: FaBriefcase
              },
              { 
                name: 'Lisa Kim', 
                role: 'Senior Data Analyst at Netflix', 
                quote: 'The side-by-side comparison showed me exactly what recruiters were looking for. Landed my dream job!',
                avatar: 'LK',
                company: 'Netflix',
                icon: FaBuilding
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                whileHover={{ y: -10 }}
              >
                <FaQuoteLeft className="text-3xl text-purple-300 mb-4" />
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4 text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-purple-200 text-sm flex items-center gap-2">
                      <testimonial.icon />
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                <p className="text-purple-100 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={testimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                    >
                      <FaStar />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join professionals from top companies worldwide
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate={statsInView ? "animate" : "initial"}
          >
            {[
              { number: 500, suffix: '+', label: 'Fortune 500 Hires' },
              { number: 98, suffix: '%', label: 'Customer Satisfaction' },
              { number: 24, suffix: '/7', label: 'Support Available' },
              { number: 150, suffix: '+', label: 'Industries Covered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Success Plan
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Start free, upgrade when you're ready to dominate your job search
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <h3 className="text-2xl font-bold mb-4">Free Starter</h3>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg text-blue-200">/forever</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><FaCheck className="text-green-400 mr-3" />Basic ATS Score</li>
                <li className="flex items-center"><FaCheck className="text-green-400 mr-3" />Top 3 Issues</li>
                <li className="flex items-center"><FaTimes className="text-gray-500 mr-3" />Detailed Analysis</li>
                <li className="flex items-center"><FaTimes className="text-gray-500 mr-3" />Resume Download</li>
              </ul>
              <button 
                onClick={handleScanClick}
                className="block w-full bg-white/20 text-center py-3 rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                Start Free Scan
              </button>
            </motion.div>
            
            {/* Pro Plan */}
            <motion.div 
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 relative transform scale-105 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.08 }}
            >
              <motion.div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaFire /> MOST POPULAR
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white">Pro Report</h3>
              <div className="text-4xl font-bold mb-6 text-white">
                $4.99<span className="text-lg text-orange-100">/report</span>
              </div>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-center"><FaCheck className="text-green-300 mr-3" />Full ATS Analysis</li>
                <li className="flex items-center"><FaCheck className="text-green-300 mr-3" />Optimized Resume</li>
                <li className="flex items-center"><FaCheck className="text-green-300 mr-3" />AI Cover Letter</li>
                <li className="flex items-center"><FaCheck className="text-green-300 mr-3" />Industry Templates</li>
              </ul>
              <Link href="/pricing" className="block w-full bg-white text-orange-600 text-center py-3 rounded-xl font-bold hover:bg-orange-50 transition-all">
                Get Full Report
              </Link>
            </motion.div>
            
            {/* Unlimited Plan */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <h3 className="text-2xl font-bold mb-4">Unlimited Pro</h3>
              <div className="text-4xl font-bold mb-6">
                $14.99<span className="text-lg text-blue-200">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center"><FaCheck className="text-green-400 mr-3" />Everything in Pro</li>
                <li className="flex items-center"><FaCheck className="text-green-400 mr-3" />Unlimited Scans</li>
                <li className="flex items-center"><FaLinkedin className="text-green-400 mr-3" />LinkedIn Optimization</li>
                <li className="flex items-center"><FaHeadset className="text-green-400 mr-3" />Priority Support</li>
              </ul>
              <Link href="/pricing" className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-center py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Ready to Land Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Join thousands of successful job seekers who transformed their careers with our ATS optimization
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={handleScanClick}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-12 py-5 rounded-2xl text-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <FaRocket className="text-xl group-hover:animate-bounce" />
                Start Your Success Story - FREE
                <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        callbackUrl="/scan"
      />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}