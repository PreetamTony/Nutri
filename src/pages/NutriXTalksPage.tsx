import React, { useState, useEffect, useRef } from 'react';
import { nutrixTalks } from './nutrix_talks_data';

const AUTOPLAY_INTERVAL = 18000; // 18 seconds

const NutriXTalksPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const talks = nutrixTalks;

  useEffect(() => {
    if (!isPaused) {
      timer.current = setTimeout(() => {
        setCurrent((prev) => (prev === talks.length - 1 ? 0 : prev + 1));
      }, AUTOPLAY_INTERVAL);
    }
    return () => timer.current && clearTimeout(timer.current);
  }, [current, isPaused, talks.length]);

  const prevVideo = () => setCurrent((prev) => (prev === 0 ? talks.length - 1 : prev - 1));
  const nextVideo = () => setCurrent((prev) => (prev === talks.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 pt-24 sm:pt-28 flex flex-col items-center px-2">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 border border-blue-100 mt-8 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-2 text-center font-display tracking-tight">NutriX Talks</h2>
        <p className="text-neutral-600 text-center mb-8 text-lg max-w-2xl">Inspiring talks and expert insights on nutrition, wellness, and healthy living. Curated for you, TEDx-style!</p>
        <div className="relative w-full flex flex-col items-center">
          {/* Thumbnails Carousel */}
          <div className="flex gap-4 mb-6 overflow-x-auto w-full justify-center">
            {talks.map((talk, idx) => (
              <button
                key={talk.title}
                onClick={() => setCurrent(idx)}
                className={`flex flex-col items-center transition-all ${idx === current ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-90'}`}
                aria-label={`Go to video ${idx + 1}`}
              >
                <img
                  src={talk.thumbnail}
                  alt={talk.title}
                  className={`w-32 h-20 object-cover rounded-lg border-2 ${idx === current ? 'border-pink-500 shadow-lg' : 'border-neutral-200'}`}
                />
                <span className="text-xs mt-1 text-neutral-700 font-medium truncate w-28 text-center">{talk.title}</span>
              </button>
            ))}
          </div>
          {/* Video Player */}
          <div
            className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-200 bg-black"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <iframe
              title={talks[current].title}
              src={talks[current].url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full min-h-[300px]"
            />
          </div>
          {/* Controls */}
          <div className="flex items-center justify-between w-full mt-4">
            <button
              onClick={prevVideo}
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-bold hover:bg-primary-200 transition"
            >
              ◀ Prev
            </button>
            <span className="text-xl font-semibold text-neutral-700 text-center flex-1">
              {talks[current].title}
            </span>
            <button
              onClick={nextVideo}
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-bold hover:bg-primary-200 transition"
            >
              Next ▶
            </button>
          </div>
          {/* Speaker Bio, Tags */}
          <div className="mt-6 flex flex-col md:flex-row gap-4 w-full items-center md:items-start justify-between">
            <div className="flex-1">
              <div className="text-lg font-bold text-pink-600 mb-1">{talks[current].speaker}</div>
              <div className="text-neutral-700 mb-2 text-sm">{talks[current].bio}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {talks[current].tags.map((tag) => (
                <span key={tag} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutriXTalksPage;
