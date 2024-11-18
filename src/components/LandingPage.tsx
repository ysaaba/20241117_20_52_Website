import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Languages, 
  Brain,
  ArrowRight,
  CheckCircle2,
  Volume2,
  Sparkles,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FeatureCard = ({ icon, title, description, delay }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9')] opacity-10 bg-cover bg-center" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Swedish
              <span className="block text-blue-200 mt-2">The Smart Way</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Master Swedish grammar through interactive exercises, real-time feedback, and a structured learning approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Start Learning <ArrowRight className="w-5 h-5" />
              </motion.button>
              <button 
                onClick={onGetStarted}
                className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Explore Exercises
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Comprehensive Swedish Learning
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practice all aspects of Swedish grammar with our specialized exercise modules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Articles"
              description="Master Swedish articles with interactive exercises for en, ett, and their forms."
              delay={0.2}
            />
            <FeatureCard
              icon={<Languages className="w-6 h-6" />}
              title="Nouns"
              description="Learn noun forms, gender, and plurals through practical examples."
              delay={0.4}
            />
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Verb Groups"
              description="Practice verb conjugations across all tenses and groups."
              delay={0.6}
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Adjectives"
              description="Perfect your adjective forms with comprehensive exercises."
              delay={0.8}
            />
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Learn with Us?
              </h2>
              <div className="space-y-4">
                {[
                  'Interactive exercises with immediate feedback',
                  'Comprehensive coverage of Swedish grammar',
                  'Progress tracking and performance statistics',
                  'Structured learning path from beginner to advanced'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Get Started <Sparkles className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9"
                  alt="Learning Swedish"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">4.9/5 Rating</span>
                </div>
                <p className="text-sm text-gray-600">from 1000+ learners</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Speaking Swedish?
            </h2>
            <p className="text-blue-100 mb-8">
              Join thousands of learners who are already on their way to Swedish fluency.
            </p>
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 