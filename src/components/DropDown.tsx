import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropDownProps {
  poseList: string[];
  currentPose: string;
  setCurrentPose: (pose: string) => void;
}

export default function DropDown({ poseList, currentPose, setCurrentPose }: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-700">{currentPose}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {poseList.map((pose) => (
            <button
              key={pose}
              onClick={() => {
                setCurrentPose(pose);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                currentPose === pose ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              {pose}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}