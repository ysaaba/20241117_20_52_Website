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
  Star,
  Play,
  Users,
  Trophy
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
    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ text, author, role, delay }: {
  text: string;
  author: string;
  role: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-2xl shadow-lg"
  >
    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{text}"</p>
    <div>
      <p className="font-semibold text-gray-900">{author}</p>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  </motion.div>
);

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-blue-900/90" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-200 text-sm font-medium inline-block mb-6">
                Welcome to Swedish Learning
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Master Swedish
                <span className="block bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent mt-2">
                  The Natural Way
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience an immersive journey to Swedish fluency through interactive exercises, 
                real-time feedback, and a carefully crafted learning approach.
              </p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Start Learning Now <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-blue-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10,000+ Active Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Features</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                Complete Swedish Learning System
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Master every aspect of Swedish with our comprehensive learning modules.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Grammar Mastery"
              description="Interactive exercises covering articles, nouns, verbs, and more with instant feedback."
              delay={0.2}
            />
            <FeatureCard
              icon={<Volume2 className="w-6 h-6" />}
              title="Pronunciation"
              description="Native audio examples and speech recognition for perfect pronunciation."
              delay={0.4}
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Smart Learning"
              description="Adaptive learning system that adjusts to your progress and needs."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                What Our Learners Say
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              text="This platform made learning Swedish enjoyable and effective. The interactive exercises are fantastic!"
              author="Emma Johnson"
              role="Beginner Learner"
              delay={0.2}
            />
            <TestimonialCard
              text="The grammar visualizations helped me understand complex concepts easily. Highly recommended!"
              author="Marcus Anderson"
              role="Intermediate Learner"
              delay={0.4}
            />
            <TestimonialCard
              text="Perfect for daily practice. The progress tracking keeps me motivated."
              author="Sofia Berg"
              role="Advanced Learner"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9')] bg-cover bg-center opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your Swedish Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of successful learners and begin your path to Swedish fluency.
            </p>
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
            >
              Begin Learning <Sparkles className="w-5 h-5 inline-block ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}