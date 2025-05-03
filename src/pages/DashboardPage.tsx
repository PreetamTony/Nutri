import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Activity, Calendar, Apple, 
  Droplets, TrendingUp, Award, Settings,
  Plus, PlusCircle, Clock, Edit
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full mx-auto flex items-center justify-center border-2 border-primary-200">
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt={userProfile.displayName || 'User'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl text-neutral-400">
                        {userProfile?.displayName?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-4 mb-2">
                    {userProfile?.displayName || 'User'}
                  </h2>
                  <p className="text-neutral-500 text-sm">Member since {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">DASHBOARD</h3>
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === 'overview'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <Activity size={18} className="mr-3" />
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('nutrition')}
                      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === 'nutrition'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <Apple size={18} className="mr-3" />
                      Nutrition Logs
                    </button>
                    <button
                      onClick={() => setActiveTab('water')}
                      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === 'water'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <Droplets size={18} className="mr-3" />
                      Water Tracking
                    </button>
                    <button
                      onClick={() => setActiveTab('progress')}
                      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === 'progress'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <TrendingUp size={18} className="mr-3" />
                      Progress
                    </button>
                    <button
                      onClick={() => setActiveTab('achievements')}
                      className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                        activeTab === 'achievements'
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:translate-x-1 hover:shadow-sm'
                      }`}
                    >
                      <Award size={18} className="mr-3" />
                      Achievements
                    </button>
                  </nav>
                </div>
                
                <div className="border-t border-neutral-200 pt-6 mt-4">
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">PREFERENCES</h3>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                      activeTab === 'settings'
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:translate-x-1 hover:shadow-sm'
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-800 mb-4">Daily Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 text-primary-700 flex items-center justify-center border-2 border-primary-200">
                              <Apple size={24} />
                            </div>
                            <div className="ml-4">
                              <p className="text-neutral-500 text-sm mb-1">Calories</p>
                              <p className="text-3xl font-bold text-neutral-900">1,450</p>
                              <p className="text-sm font-medium text-primary-600 mt-1">
                                <span className="font-medium">550 remaining</span> of daily goal
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                              <Droplets size={24} />
                            </div>
                            <div className="ml-4">
                              <p className="text-neutral-500 text-sm mb-1">Water</p>
                              <p className="text-3xl font-bold text-neutral-900">4 / 8</p>
                              <p className="text-xs text-blue-500">
                                <span className="font-medium">4 more</span> glasses to go
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-500 flex items-center justify-center">
                              <TrendingUp size={24} />
                            </div>
                            <div className="ml-4">
                              <p className="text-neutral-500 text-sm mb-1">Streak</p>
                              <p className="text-3xl font-bold text-neutral-900">4 days</p>
                              <p className="text-xs text-accent-500">
                                <span className="font-medium">+2 days</span> from last week
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-neutral-800">Today's Meals</h2>
                        <button className="bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors duration-200">
                          <Plus size={16} className="mr-1" />
                          Add meal
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 text-primary-700 flex items-center justify-center border-2 border-primary-200">
                                <Clock size={18} />
                              </div>
                              <div className="ml-4">
                                <h3 className="font-semibold text-neutral-900">Breakfast</h3>
                                <p className="text-sm text-neutral-500">7:30 AM</p>
                              </div>
                            </div>
                            <button className="text-neutral-400 hover:text-neutral-700">
                              <Edit size={16} />
                            </button>
                          </div>
                          <div className="mt-3 pl-13">
                            <p className="text-neutral-700">Oatmeal with berries and almond butter</p>
                            <p className="text-sm text-neutral-500 mt-1">320 calories • 12g protein • 45g carbs • 10g fat</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 text-primary-700 flex items-center justify-center border-2 border-primary-200">
                                <Clock size={18} />
                              </div>
                              <div className="ml-4">
                                <h3 className="font-semibold text-neutral-900">Lunch</h3>
                                <p className="text-sm text-neutral-500">12:30 PM</p>
                              </div>
                            </div>
                            <button className="text-neutral-400 hover:text-neutral-700">
                              <Edit size={16} />
                            </button>
                          </div>
                          <div className="mt-3 pl-13">
                            <p className="text-neutral-700">Quinoa bowl with grilled chicken and vegetables</p>
                            <p className="text-sm text-neutral-500 mt-1">450 calories • 35g protein • 40g carbs • 15g fat</p>
                          </div>
                        </div>
                        
                        <div className="border-dashed border-2 border-neutral-300 rounded-lg p-6 text-center">
                          <button className="text-neutral-500 hover:text-primary-500 flex items-center justify-center w-full">
                            <PlusCircle size={18} className="mr-2" />
                            <span>Add dinner</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow duration-300">
                      <div className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Recent Achievements</h2>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                              <Award size={20} />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium text-neutral-800">Consistency Champion</h3>
                              <p className="text-sm text-neutral-500">Logged meals for 3 days in a row</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Droplets size={20} />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium text-neutral-800">Hydration Hero</h3>
                              <p className="text-sm text-neutral-500">Reached water goal 5 times</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <Link to="/achievements" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                            View all achievements
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow duration-300">
                      <div className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Upcoming Meal Plan</h2>
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                          <p className="text-neutral-600">No upcoming meal plans</p>
                          <Link
                            to="/meal-planner"
                            className="mt-4 inline-flex items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
                          >
                            <Plus size={16} className="mr-1" />
                            Create a meal plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab !== 'overview' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 p-8 text-center">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    This section is under construction and will be available soon.
                  </p>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Return to Overview
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;