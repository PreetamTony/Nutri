import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Lightbulb, User, MessageCircle, CalendarCheck, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="bg-primary-500 rounded-lg shadow-md overflow-hidden">
            <div className="p-8 text-white text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                About NutriBot
              </h1>
              <p className="text-primary-100 max-w-2xl mx-auto text-lg mb-8">
                We're on a mission to make nutrition science accessible and personalized
                for everyone through the power of artificial intelligence.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">10+</p>
                  <p className="text-primary-100 text-sm">Active Users</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">1M+</p>
                  <p className="text-primary-100 text-sm">Nutrition Recommendations</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-primary-100 text-sm">Meal Plans Generated</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-primary-100 text-sm">User Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Story */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 mt-8">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-primary-500" />
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  NutriBot was born out of a simple observation: despite the abundance of nutrition information available today,
                  people still struggle to make healthy eating choices that are personalized to their unique needs and preferences.
                </p>
                <p>
                  Founded in 2025 by Preetam Tony J., a health-tech entrepreneur passionate about the intersection of nutrition science and artificial intelligence,
                  NutriBot aims to democratize access to personalized nutrition guidance.
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200">
              <div className="p-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center">
                  <Heart className="h-6 w-6 mr-2 text-primary-500" />
                  Our Mission
                </h2>
                <p className="text-neutral-700">
                  We believe that good nutrition should be accessible to everyone. Our mission is to empower individuals to make
                  informed food choices through personalized, AI-driven nutrition guidance that fits their unique needs and lifestyle.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200">
              <div className="p-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center">
                  <Lightbulb className="h-6 w-6 mr-2 text-primary-500" />
                  Our Values
                </h2>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <p><strong>Evidence-based:</strong> We prioritize scientific accuracy in all our recommendations.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <p><strong>Personalized:</strong> We recognize that nutrition is not one-size-fits-all.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <p><strong>Accessible:</strong> We make nutrition science understandable and actionable.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 mt-8">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-neutral-800">AI Nutrition Assistant</h3>
                      <p className="text-neutral-600 mt-1">
                        Get instant, personalized nutrition advice from our advanced AI chatbot.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                      <CalendarCheck size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-neutral-800">Personalized Meal Plans</h3>
                      <p className="text-neutral-600 mt-1">
                        Receive customized meal plans tailored to your dietary preferences and goals.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                      <Award size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-neutral-800">Progress Tracking</h3>
                      <p className="text-neutral-600 mt-1">
                        Track your nutrition journey with intuitive dashboards and achievements.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0">
                      <Shield size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-neutral-800">Data Privacy</h3>
                      <p className="text-neutral-600 mt-1">
                        Your data is secure and never shared with third parties without your consent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Meet the Team */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 mt-8">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-primary-500" />
                Meet the Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200">
                  <div className="h-48 bg-neutral-200">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQGP29XF89-prQ/profile-displayphoto-shrink_200_200/B56ZYVHHrLHoAY-/0/1744110910963?e=2147483647&v=beta&t=JZIqEmLjEfS-MOD6WKJ_INvVHRnMH1u7tK27twDI4lk"
                      alt="Preetam Tony J."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-neutral-800">Preetam Tony J.</h3>
                    <p className="text-neutral-600 text-sm">Founder & CEO</p>
                    <p className="text-neutral-600 text-sm mt-2">
                      Health-tech entrepreneur with a passion for making nutrition science accessible to everyone.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-primary-500 rounded-lg shadow-md overflow-hidden mt-8 text-white text-center">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to transform your nutrition habits?</h2>
              <p className="text-primary-100 max-w-2xl mx-auto mb-6">
                Join thousands of users who have already improved their eating habits with NutriBot.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/register"
                  className="bg-white text-primary-500 hover:bg-primary-50 font-medium px-6 py-3 rounded-lg transition duration-200"
                >
                  Sign Up Free
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent text-white border border-white hover:bg-primary-400 font-medium px-6 py-3 rounded-lg transition duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
