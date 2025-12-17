'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthModal from '../components/AuthModal';
import { 
  FaCheck, 
  FaTimes, 
  FaRocket, 
  FaFire, 
  FaCrown,
  FaShieldAlt,
  FaClock,
  FaDownload,
  FaLinkedin,
  FaHeadset,
  FaUsers,
  FaChartLine,
  FaStar,
  FaQuestionCircle,
  FaMoneyBillWave,
  FaFileAlt,
  FaLock,
  FaBullseye,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

export default function PricingPage() {
  const { data: session } = useSession();
  const [isYearly, setIsYearly] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handlePlanSelect = (plan) => {
    if (!session) {
      setSelectedPlan(plan);
      setAuthModalOpen(true);
    } else {
      // Redirect to dashboard for logged in users
      window.location.href = '/dashboard';
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: 0,
      yearlyPrice: 0,
      description: 'Perfect for trying out our ATS optimization',
      features: [
        'Basic ATS Score Analysis',
        'Top 3 Critical Issues',
        'Basic Keyword Matching',
        'Simple Format Check',
        '1 Resume Scan per Month'
      ],
      limitations: [
        'No Detailed Analysis',
        'No Resume Download',
        'No Cover Letter Generation',
        'No Priority Support'
      ],
      buttonText: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      id: 'pro',
      name: 'Pro Report',
      price: 4.99,
      yearlyPrice: 49.99,
      description: 'Complete ATS optimization for job seekers',
      features: [
        'Complete ATS Analysis',
        'Detailed Score Breakdown',
        'Keyword Optimization',
        'ATS-Optimized Resume Download',
        'AI-Generated Cover Letter',
        'Industry-Specific Templates',
        'Format Optimization',
        'Skills Gap Analysis',
        'Email Support'
      ],
      limitations: [],
      buttonText: 'Get Pro Report',
      popular: true,
      color: 'blue'
    },
    {
      id: 'unlimited',
      name: 'Unlimited Pro',
      price: 14.99,
      yearlyPrice: 149.99,
      description: 'Unlimited access for serious job seekers',
      features: [
        'Everything in Pro Report',
        'Unlimited Resume Scans',
        'Multiple Resume Versions',
        'LinkedIn Profile Optimization',
        'Job Application Tracking',
        'Interview Preparation Tips',
        'Salary Negotiation Guide',
        'Priority Support',
        'Career Coaching Resources',
        'Industry Insights'
      ],
      limitations: [],
      buttonText: 'Start 3-Day Free Trial',
      popular: false,
      color: 'purple'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Google',
      rating: 5,
      text: 'Increased my interview rate by 400%. The keyword optimization was incredible!',
      imageId: '1494790108755-74b6c3b5e7b6'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Marketing Manager',
      company: 'Meta',
      rating: 5,
      text: 'Finally understood why my resume wasn\'t getting through ATS systems.',
      imageId: '1507003211169-0a1dd7a99553'
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist',
      company: 'Netflix',
      rating: 5,
      text: 'The AI suggestions helped me land my dream job in just 2 weeks!',
      imageId: '1438761681033-6461ffad8d80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                Simple Pricing,
                <br />Powerful Results
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Transform your job search with AI-powered resume optimization.
              <span className="block mt-2 font-semibold text-blue-600">Start free, upgrade when you see results.</span>
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12"
            >
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Resumes Optimized</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
                <div className="text-gray-600">More Interviews</div>
              </div>
            </motion.div>
            
            {/* Billing Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center gap-4 mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto"
            >
              <span className={`font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>Monthly</span>
              <motion.button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-16 h-8 rounded-full transition-colors ${isYearly ? 'bg-blue-600' : 'bg-gray-300'}`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: isYearly ? 32 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
              <span className={`font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                Yearly 
                <span className="ml-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Save 17%</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? 'transform scale-105 border-2 border-blue-500' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <FaFire /> MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-800">
                      ${isYearly ? plan.yearlyPrice : plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {plan.price === 0 ? '/forever' : isYearly ? '/year' : plan.id === 'pro' ? '/report' : '/month'}
                    </span>
                    {isYearly && plan.price > 0 && (
                      <div className="text-sm text-green-600 mt-1">
                        Save ${((plan.price * 12) - plan.yearlyPrice).toFixed(2)} per year
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaTimes className="text-red-500" />
                      Not Included
                    </h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FaTimes className="text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  onClick={() => handlePlanSelect(plan)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                      : plan.id === 'free'
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our users transformed their job search
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=60&h=60&fit=crop&crop=face`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-blue-600 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-xs">{testimonial.company}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our service
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                icon: FaRocket,
                q: "How does the free trial work?",
                a: "Get 3 days of full access to test all features, then upgrade anytime. No credit card required."
              },
              {
                icon: FaSignOutAlt,
                q: "Can I cancel anytime?",
                a: "Absolutely! You can cancel your subscription at any time with no questions asked. No hidden fees or commitments."
              },
              {
                icon: FaMoneyBillWave,
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your purchase."
              },
              {
                icon: FaBullseye,
                q: "How accurate is the ATS scoring?",
                a: "Our AI is trained on real ATS systems used by Fortune 500 companies and provides 95%+ accuracy in scoring."
              },
              {
                icon: FaFileAlt,
                q: "What file formats do you support?",
                a: "We support PDF, DOC, DOCX, and TXT formats. Your resume will be optimized while maintaining professional formatting."
              },
              {
                icon: FaLock,
                q: "Is my data secure and private?",
                a: "Yes! We use enterprise-grade encryption and never share your personal information. Your resume data is completely secure."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <faq.icon className="text-blue-600 text-lg" />
                    <span className="font-semibold text-gray-800">{faq.q}</span>
                  </div>
                  {openFaq === idx ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          mode="signup"
          callbackUrl="/pricing"
        />
      )}
      
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