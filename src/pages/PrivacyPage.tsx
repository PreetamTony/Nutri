import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Lock, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200">
            <div className="bg-primary-500 text-white p-6">
              <div className="flex items-center">
                <Shield className="h-10 w-10 text-white opacity-80 mr-4" />
                <div>
                  <h1 className="text-2xl font-semibold">Privacy Policy</h1>
                  <p className="text-primary-100">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none text-neutral-700">
                <p>
                  At NutriBot, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                  disclose, and safeguard your information when you use our application.
                </p>
                
                <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary-500" />
                  Information We Collect
                </h2>
                <p>
                  We collect information that you provide directly to us when you:
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      <strong>Create an account</strong>: We collect your name, email address, and password.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      <strong>Complete your profile</strong>: We collect information such as your height, 
                      weight, age, gender, dietary preferences, allergies, and health goals.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      <strong>Use our features</strong>: We collect information about your food choices, 
                      meal plans, nutrition logs, and interactions with the NutriBot Assistant.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      <strong>Contact us</strong>: We collect any information you provide when you 
                      contact us for customer support.
                    </div>
                  </li>
                </ul>
                
                <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary-500" />
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      Provide, maintain, and improve our services
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      Personalize your experience and deliver content relevant to your interests
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      Process and complete transactions
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      Send you technical notices, updates, security alerts, and administrative messages
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      Respond to your comments, questions, and requests
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-primary-500 mt-1 mr-2">•</div>
                    <div>
                      Develop new products and services
                    </div>
                  </li>
                </ul>
                
                <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                  Data Retention
                </h2>
                <p>
                  We will retain your information for as long as your account is active or as needed to provide you services. 
                  If you wish to cancel your account or request that we no longer use your information, 
                  contact us at privacy@nutribot.com.
                </p>
                
                <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">Security</h2>
                <p>
                  We take reasonable measures to help protect your personal information from loss, theft, 
                  misuse, unauthorized access, disclosure, alteration, and destruction.
                </p>
                
                <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4">Changes to this Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                
                <h2 className="text-xl font-semibold text-neutral-800 mt-8 mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary-500" />
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2">
                  <strong>Email</strong>: privacy@nutribot.com
                </p>
                <p>
                  <strong>Address</strong>: 123 Nutrition Avenue, Health City, CA 94000, USA
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-neutral-200 text-center">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Have more questions?</h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              If you have any questions about our privacy practices or would like to exercise your data rights, 
              please don't hesitate to contact us.
            </p>
            <Link
              to="/contact"
              className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-md transition duration-200 inline-flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;