import React from 'react';

const GamesHeader: React.FC = () => (
  <div className="flex flex-col items-center mb-8 relative">
    <img
      src="https://i.postimg.cc/WzfKp2mL/image.png"
      alt="NutriBot Avatar"
      className="w-20 h-20 rounded-full border-4 border-primary-400 shadow-xl bg-white object-cover ring-4 ring-primary-200 animate-pulse-slow mb-2"
      style={{ zIndex: 2 }}
    />
    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 text-center drop-shadow-lg relative">
      NutriBot Games
    </h1>
    <p className="text-lg md:text-xl text-neutral-700 mt-2 text-center max-w-3xl mx-auto">
      Learn nutrition the fun way! Explore interactive games designed for Indian diets, powered by NutriBot's advanced AI. Earn rewards, challenge friends, and boost your healthy eating knowledge.
    </p>
  </div>
);

export default GamesHeader;
