import React, { useState } from 'react';

const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

const ResearchPapersPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const pubmedUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(pubmedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <img
          src={AVATAR_SRC}
          alt="NutriBot Logo"
          className="h-20 w-20 rounded-full border-2 border-neutral-200 shadow mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Research Papers</h1>
        <p className="text-neutral-500 mb-6 text-center text-sm">Find scholarly articles and research papers on your nutrition topics of interest.</p>
        <form onSubmit={handleSearch} className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your research query..."
            className="border border-neutral-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-200 bg-neutral-50 placeholder:text-neutral-400 text-base"
          />
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition disabled:bg-primary-300"
            disabled={!query.trim()}
          >
            Search PubMed
          </button>
        </form>
        {query && (
          <a
            href={pubmedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-primary-600 hover:text-primary-700 underline text-sm"
          >
            Or open PubMed with your query
          </a>
        )}
      </div>
    </div>
  );
};

export default ResearchPapersPage;
