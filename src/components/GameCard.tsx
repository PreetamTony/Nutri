import React from 'react';
import { Link } from 'react-router-dom';

export interface GameCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  path: string;
  llm?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ icon, name, description, path, llm }) => {
  return (
    <div className="glass-card parallax-card flex flex-col items-center p-7 text-center shadow-xl border border-primary-100 hover:border-primary-400 card-hover-effect h-full">
      <div className="mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold text-primary-700 mb-2 gradient-text">{name}</h2>
      <p className="text-neutral-700 mb-4 text-base">{description}</p>
      <Link
        to={path}
        className="glass-button font-medium px-6 py-2 rounded-lg text-primary-600 hover:bg-primary-100 border border-primary-200 shadow"
      >
        Play Now
      </Link>
      {llm && (
        <span className="mt-3 inline-block text-xs text-primary-400 bg-primary-50 rounded px-2 py-0.5">AI-powered</span>
      )}
    </div>
  );
};

export default GameCard;
