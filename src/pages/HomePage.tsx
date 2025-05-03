import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessagesSquare, CalendarCheck, Scan, Salad, Calculator, Rabbit, Activity } from 'lucide-react';
import { motion as m } from 'framer-motion';

const HomePage: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-200 via-primary-100 to-white opacity-30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 lg:pr-16 mb-16 lg:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-100/60 text-primary-600 shadow backdrop-blur animate-fade-in mb-4">
                🚀 Your Personal AI Nutritionist 
              </span>
              <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6 leading-tight">
                <span className="block slide-in-left gradient-text">Eat Smart</span>
                <span className="block slide-in-left" style={{ animationDelay: '0.3s' }}>Live Better</span>
              </h1>
              <p className="mt-3 text-lg text-gray-600 sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0 slide-in-left" style={{ animationDelay: '0.6s' }}>
                Your AI-powered personal nutrition assistant designed to promote healthier eating habits.<br />
                <span className="font-medium text-primary-600">Perfect for students and busy professionals✨</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/chat"
                  className="bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition duration-200 inline-flex items-center space-x-2 ring-2 ring-primary-100 focus:ring-4 focus:outline-none"
                >
                  <MessagesSquare size={22} />
                  <span>Try the Bot 🤖</span>
                </Link>
                <Link
                  to="/meal-planner"
                  className="bg-white/70 backdrop-blur-lg hover:bg-white text-primary-500 font-semibold px-8 py-3 rounded-full border border-primary-200 shadow-lg transition duration-200 inline-flex items-center space-x-2 ring-2 ring-primary-100 focus:ring-4 focus:outline-none"
                >
                  <CalendarCheck size={22} />
                  <span>Generate Meal Plan 🍽️</span>
                </Link>
                <Link
                  to="/scan-food"
                  className="bg-white/70 backdrop-blur-lg hover:bg-white text-primary-500 font-semibold px-8 py-3 rounded-full border border-primary-200 shadow-lg transition duration-200 inline-flex items-center space-x-2 ring-2 ring-primary-100 focus:ring-4 focus:outline-none"
                >
                  <Scan size={22} />
                  <span>Scan Your Food 📷</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Healthy food and lifestyle"
                className="rounded-lg shadow-xl w-full object-cover h-96 md:h-[500px] lg:h-[550px]"
              />
              <div className="absolute -bottom-10 -left-10 hidden md:block">
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 max-w-xs border border-primary-100 glass-card">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
                    <p className="font-semibold text-primary-700">NutriBot says: </p>
                  </div>
                  <p className="text-neutral-700 text-base italic">
                    “Did you know? Adding colorful vegetables to every meal helps ensure you get a wide range of essential nutrients.”
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-gradient-to-br from-white via-primary-50 to-primary-100 overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-24 left-0 w-[350px] h-[350px] bg-gradient-to-br from-primary-200 via-primary-100 to-white opacity-30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-extrabold text-primary-700 mb-6 drop-shadow-lg tracking-tight"
              {...fadeIn}
            >
              Your Personal Nutrition Guide✨
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-primary-700/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              NutriBot🤖 combines AI, nutrition science, and personalization to help you achieve your health goals and develop sustainable eating habits.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-lg border border-primary-100 rounded-2xl p-10 shadow-2xl glass-card z-10 relative flex flex-col items-center text-center hover:scale-[1.04] hover:shadow-3xl active:scale-100 transition-transform duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ rotate: -1, y: -4 }}
                whileTap={{ scale: 0.98, rotate: 1 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
              >
                <m.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 text-white flex items-center justify-center mb-6 text-2xl font-extrabold shadow-lg ring-4 ring-primary-100 cursor-pointer"
                  animate={{ scale: [1, 1.13, 0.97, 1], rotate: [0, 4, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2.7, ease: 'easeInOut', delay: 0.2 * index }}
                  whileHover={{ scale: 1.18, boxShadow: '0 0 24px 0 #4CAF50AA' }}
                  whileTap={{ scale: 0.93, rotate: -8 }}
                >
                  {/* Animated icon: wrap Lucide icon in motion for wiggle/pop */}
                  <m.span
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.22, rotate: 8 }}
                    whileTap={{ scale: 0.93, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {feature.icon}
                  </m.span>
                </m.div>
                <h3 className="text-2xl font-bold text-primary-700 mb-3 drop-shadow-sm group-hover:text-primary-600 transition-colors duration-200">{feature.title}</h3>
                <p className="text-neutral-700 text-base md:text-lg mb-4 group-hover:text-primary-700/80 transition-colors duration-200">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center underline underline-offset-2 group-hover:underline group-hover:text-primary-700 transition-colors duration-200"
                >
                  <span>Learn More</span>
                  <m.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 250 }}
                  >
                    <ArrowRight size={18} className="ml-1" />
                  </m.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        {/* Decorative animated blob */}
        <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary-200 via-primary-100 to-white opacity-30 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-extrabold text-primary-700 mb-6 drop-shadow-lg tracking-tight"
              {...fadeIn}
            >
              How NutriBot Works
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-primary-700/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our AI-powered assistant guides you through your nutrition journey in three simple steps
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mt-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
              >
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-primary-100 glass-card z-10 relative flex flex-col items-center text-center hover:scale-105 hover:shadow-3xl transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 text-white flex items-center justify-center mb-6 text-2xl font-extrabold shadow-lg ring-4 ring-primary-100 animate-bounce-slow">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-primary-700 mb-3 drop-shadow-sm">{step.title}</h3>
                  <p className="text-neutral-700 text-base md:text-lg">{step.description}</p>
                </div>
                {/* Animated arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                    <svg width="50" height="16" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.7" />
                        </linearGradient>
                      </defs>
                      <path d="M50 8H0M44 2l6 6-6 6" stroke="url(#arrow-gradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:mr-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Ready to transform your nutrition habits?
              </h2>
              <p className="text-primary-100 max-w-lg">
                Start your journey towards better health with personalized guidance from NutriBot. Sign up today and discover how easy healthy eating can be!
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-white text-primary-500 hover:bg-primary-50 font-medium px-6 py-3 rounded-lg transition duration-200"
              >
                Sign Up Free
              </Link>
              <Link
                to="/about"
                className="bg-transparent text-white border border-white hover:bg-primary-400 font-medium px-6 py-3 rounded-lg transition duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6"
              {...fadeIn}
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Thousands of users have transformed their eating habits with NutriBot
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-neutral-50 rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-300 overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Features data
const features = [
  {
    icon: <MessagesSquare className="h-6 w-6" />,
    title: "AI Nutrition Chat 🤖",
    description: "Get instant answers to your nutrition questions and personalized advice from our AI assistant. 🧑‍⚕️",
    link: "/chat"
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    title: "Personalized Meal Plans 📅",
    description: "Receive custom weekly meal plans based on your dietary preferences, restrictions, and health goals. ",
    link: "/meal-planner"
  },
  {
    icon: <Scan className="h-6 w-6" />,
    title: "Food Scanner 📷",
    description: "Quickly scan foods to get instant nutrition facts and healthy suggestions. 🔍",
    link: "/scan-food"
  },
  {
    icon: <Salad className="h-6 w-6" />,
    title: "Recipe Generator 🍳",
    description: "Turn leftover ingredients into delicious, healthy meals with AI-powered recipe suggestions. 👩‍🍳",
    link: "/recipe-generator"
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "BMI Calculator ⚖️",
    description: "Calculate your BMI and receive personalized recommendations for your health journey.",
    link: "/bmi-calculator"
  },
  {
    icon: <Rabbit className="h-6 w-6" />,
    title: "Food Alternatives 🍫➡️🥕",
    description: "Discover healthier alternatives to your favorite foods that align with your dietary goals.",
    link: "/food-alternatives"
  }
];

// Steps data
const steps = [
  {
    title: "Share Your Goals 🎯",
    description: "Tell NutriBot about your dietary preferences, restrictions, and health goals to get personalized guidance. 🗣️"
  },
  {
    title: "Get Personalized Plans 📋",
    description: "Receive customized meal plans, recipes, and nutrition advice tailored specifically to your needs. 🍽️"
  },
  {
    title: "Track & Improve 📈",
    description: "Monitor your progress, track your meals, and continuously improve your nutrition habits with AI feedback. 🔄"
  }
];

// Testimonials data
const testimonials = [
  {
    quote: "NutriBot has completely transformed my eating habits. The personalized meal plans fit perfectly with my busy schedule, and I've never felt healthier.",
    name: "Samantha",
    role: "Actress",
    avatar: "https://i.pinimg.com/736x/69/b1/34/69b134dff5b8c1b0e0dfd48ca8263292.jpg"
  },
  {
    quote: "As a student with a tight budget, NutriBot has been a game-changer. The recipe generator gives me healthy options with whatever ingredients I have available.",
    name: "Shahrukh Khan",
    role: "College Student",
    avatar: "https://i.pinimg.com/736x/34/3e/5a/343e5a48acc631d1065b7b77b5439432.jpg"
  },
  {
    quote: "I've tried many nutrition apps, but NutriBot stands out with its personalized AI chat. It's like having a nutritionist in my pocket 24/7.",
    name: "Sita",
    role: "Princess",
    avatar: "https://i.pinimg.com/736x/14/11/2b/14112bcd93b2ecc50a947bc396998748.jpg"
  }
];

export default HomePage;