'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCheckout } from '../../components/PaddleProvider';
import { 
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Award,
  Zap,
  Gift
} from 'lucide-react';

export default function PricingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Paddle checkout
  const { openCheckout, isLoaded: paddleLoaded } = useCheckout();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const handleGetStarted = async () => {
    if (!paddleLoaded) {
      setError('Payment system is loading. Please wait...');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await openCheckout({
        fullName: formData.fullName || 'Customer',
        email: formData.email || '',
        requests: formData.requests || 'Started from pricing page',
        company: formData.company || '',
        phone: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open checkout');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="py-6 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Vorve.tech
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pricing & Plans
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional AI-powered pitch deck services designed to help you win more deals, 
              secure funding, and make compelling presentations that convert.
            </p>
          </motion.div>

          {/* Main Pricing Card */}
          <motion.div
            variants={fadeInUp}
            className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl px-8 py-12 lg:px-16 lg:py-20 rounded-3xl overflow-hidden max-w-5xl mx-auto mb-16 group hover:shadow-3xl transition-all duration-500"
          >
            {/* Professional Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            {/* Popular Badge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg border border-white/20">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Most Popular</span>
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <motion.div variants={fadeInUp} className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Professional Package
                  </span>
                </motion.div>
                
                <motion.h2 
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
                >
                  Complete Solution
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Package
                  </span>
                </motion.h2>
                
                <motion.p 
                  variants={fadeInUp}
                  className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                  Everything you need for professional pitch decks that win deals and secure funding
                </motion.p>
              </div>

              {/* Enhanced Pricing Section */}
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
                    <div className="flex items-baseline justify-center mb-4">
                      <span className="text-2xl text-gray-400 font-medium">$</span>
                      <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">2,997</span>
                    </div>
                    <div className="text-gray-400 text-lg mb-6">per project</div>
                    
                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                      <div className="text-green-300 text-sm font-medium mb-1">🎯 Average ROI: 15-50x</div>
                      <div className="text-gray-300 text-sm">Our clients typically raise $45K-$1.5M</div>
                    </div>
                    
                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>100% Money-back guarantee</span>
                      </div>
                      <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span>14-day revision period</span>
                      </div>
                      <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>7-10 day delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Features Grid */}
              <motion.div 
                variants={staggerContainer}
                className="grid lg:grid-cols-2 gap-12 mb-16"
              >
                {/* Left Column - Core Deliverables */}
                <motion.div variants={fadeInUp} className="space-y-8">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">Core Deliverables</h3>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      { text: 'Professional 10-15 slide pitch deck', highlight: true },
                      { text: 'AI-optimized content & messaging', highlight: false },
                      { text: 'Custom design & branding', highlight: false },
                      { text: 'Investor-ready financial projections', highlight: true },
                      { text: 'Compelling storytelling framework', highlight: false },
                      { text: 'Multiple format exports (PPT, PDF, Figma)', highlight: false }
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                          feature.highlight 
                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20' 
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle className={`w-5 h-5 ${feature.highlight ? 'text-blue-400' : 'text-green-400'}`} />
                        </div>
                        <span className={`${feature.highlight ? 'text-white font-medium' : 'text-gray-300'} leading-relaxed`}>
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column - Bonus Services */}
                <motion.div variants={fadeInUp} className="space-y-8">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">Bonus Services</h3>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      { text: 'Market research & competitive analysis', value: '$500' },
                      { text: 'Industry-specific templates library', value: '$300' },
                      { text: 'Presentation coaching session (1 hour)', value: '$200' },
                      { text: 'LinkedIn optimization recommendations', value: '$150' },
                      { text: '30-day email support', value: '$200' },
                      { text: 'Future update templates', value: '$250' }
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                      >
                        <div className="flex items-start space-x-4">
                          <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                            {feature.text}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full ml-4 flex-shrink-0">
                          {feature.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Total Value */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">Total Bonus Value</div>
                      <div className="text-2xl font-bold text-white">$1,600</div>
                      <div className="text-xs text-purple-300">Included at no extra cost</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced Process Timeline */}
              <motion.div variants={fadeInUp} className="mb-16">
                <h3 className="text-3xl font-bold text-white mb-12 text-center">
                  Our Proven <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Process</span>
                </h3>
                
                <div className="grid sm:grid-cols-3 gap-8">
                  {[
                    {
                      step: 1,
                      title: "Discovery & Strategy",
                      description: "Deep-dive consultation to understand your goals, audience, and unique value proposition",
                      duration: "1-2 days",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      step: 2,
                      title: "AI-Powered Creation",
                      description: "Advanced AI content generation combined with expert design and market research",
                      duration: "5-7 days",
                      color: "from-purple-500 to-pink-500"
                    },
                    {
                      step: 3,
                      title: "Refinement & Delivery",
                      description: "Professional review, revisions, and coaching to ensure maximum impact",
                      duration: "2-3 days",
                      color: "from-green-500 to-emerald-500"
                    }
                  ].map((phase, index) => (
                    <div key={index} className="text-center group">
                      <div className="relative mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-white font-bold text-xl">{phase.step}</span>
                        </div>
                        {index < 2 && (
                          <div className="hidden sm:block absolute top-8 left-[calc(100%+1rem)] w-8 h-0.5 bg-gradient-to-r from-gray-600 to-gray-700"></div>
                        )}
                      </div>
                      <h4 className="font-bold text-white mb-3 text-lg">{phase.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{phase.description}</p>
                      <div className="inline-block bg-gray-800/50 border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                        {phase.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div variants={fadeInUp} className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
                  <button
                    onClick={handleGetStarted}
                    disabled={isSubmitting}
                    className="relative group inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Started Now
                          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
                
                <div className="mt-6 space-y-2">
                  <p className="text-gray-300 text-lg font-medium">
                    Ready to transform your pitch? Let's create your winning deck.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <span>✓ No setup fees</span>
                    <span>✓ Cancel anytime</span>
                    <span>✓ Fast delivery</span>
                  </div>
                </div>
                
                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                    {error}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Money-Back Guarantee</h3>
              <p className="text-gray-300">
                Not satisfied? Get your money back within 14 days, no questions asked.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <Award className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Proven Results</h3>
              <p className="text-gray-300">
                Our pitch decks have helped clients raise over $50M in funding and close major deals.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <Gift className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Bonus Materials</h3>
              <p className="text-gray-300">
                Receive exclusive templates, coaching, and ongoing support to maximize your success.
              </p>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "What's included in the Complete Solution Package?",
                  answer: "You'll receive a professionally designed 10-15 slide pitch deck, AI-optimized content, custom branding, financial projections, presentation coaching, and ongoing support."
                },
                {
                  question: "How long does it take to complete?",
                  answer: "The typical turnaround time is 7-10 business days from the initial consultation to final delivery, including revision rounds."
                },
                {
                  question: "Do you offer revisions?",
                  answer: "Yes! We include unlimited revisions during the 14-day revision period to ensure you're completely satisfied with the final product."
                },
                {
                  question: "What if I'm not satisfied?",
                  answer: "We offer a 100% money-back guarantee within 14 days of delivery. Your satisfaction is our top priority."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Pitch?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join hundreds of successful entrepreneurs and business leaders who&#39;ve used our AI-powered 
                pitch deck services to win deals and secure funding.
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal - Placeholder for now */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Get Started</h3>
            <p className="text-gray-300 mb-6">
              Ready to create your winning pitch deck? Contact us to begin your project.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <a
                href="mailto:support@vorve.tech?subject=Pitch Deck Project Inquiry"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
