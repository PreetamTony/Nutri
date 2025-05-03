// import React from 'react';

interface InstructionsProps {
    currentPose: string;
  }
  
  const poseInstructions: Record<string, string[]> = {
    Tree: [
      'Stand straight with feet together',
      'Bend right knee and place foot on left inner thigh',
      'Extend arms overhead',
      'Hold the pose and breathe',
    ],
    Chair: [
      'Stand with feet hip-width apart',
      'Bend knees as if sitting back into a chair',
      'Raise arms parallel to ground',
      'Keep back straight and breathe',
    ],
    Cobra: [
      'Lie face down on the mat',
      'Place hands under shoulders',
      'Lift chest while keeping hips down',
      'Look slightly upward and breathe',
    ],
    Warrior: [
      'Step one foot back into a lunge',
      'Bend front knee at 90 degrees',
      'Raise arms overhead',
      'Look forward and hold',
    ],
    Dog: [
      'Start on hands and knees',
      'Lift hips toward ceiling',
      'Straighten arms and legs',
      'Press heels toward ground',
    ],
    Shoulderstand: [
      'Lie on back',
      'Lift legs overhead',
      'Support lower back with hands',
      'Keep body straight and breathe',
    ],
    Triangle: [
      'Stand with feet wide apart',
      'Turn right foot out 90 degrees',
      'Extend arms and bend to right',
      'Look up at top hand',
    ],
  };
  
  export default function Instructions({ currentPose }: InstructionsProps) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {currentPose} Pose Instructions
        </h3>
        <ol className="space-y-2">
          {poseInstructions[currentPose]?.map((instruction, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                {index + 1}
              </span>
              {instruction}
            </li>
          ))}
        </ol>
      </div>
    );
  }