import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import { Activity } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { POINTS, keypointConnections } from '../utils/data';
import { drawPoint, drawSegment } from '../utils/helper';
import { poseImages } from '../utils/pose_images';
import DropDown from '../components/DropDown';
import Instructions from '../components/Instructions';

let skeletonColor = 'rgb(255,255,255)';
const poseList = [
  'Tree', 'Chair', 'Cobra', 'Warrior', 'Dog',
  'Shoulderstand', 'Triangle'
];

const CLASS_NO = {
  Chair: 0,
  Cobra: 1,
  Dog: 2,
  No_Pose: 3,
  Shoulderstand: 4,
  Triangle: 5,
  Tree: 6,
  Warrior: 7,
};

export default function YogaAssistantPage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState('Tree');
  const [isStartPose, setIsStartPose] = useState(false);
  const [flag, setFlag] = useState(false);
  const intervalRef = useRef<number>();

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if (timeDiff > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime, startingTime, bestPerform, flag]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
  }, [currentPose]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function get_center_point(landmarks: any, left_bodypart: number, right_bodypart: number) {
    const left = tf.gather(landmarks, left_bodypart, 1);
    const right = tf.gather(landmarks, right_bodypart, 1);
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
    return center;
  }

  function get_pose_size(landmarks: any, torso_size_multiplier = 2.5) {
    const hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP);
    const shoulders_center = get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER);
    const torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP);
    pose_center_new = tf.expandDims(pose_center_new, 1);
    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    
    const d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    const max_dist = tf.max(tf.norm(d, 'euclidean', 0));

    const pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist);
    return pose_size;
  }

  function normalize_pose_landmarks(landmarks: any) {
    let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP);
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);

    const pose_size = get_pose_size(landmarks);
    landmarks = tf.div(landmarks, pose_size);
    return landmarks;
  }

  function landmarks_to_embedding(landmarks: any) {
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    const embedding = tf.reshape(landmarks, [1, 34]);
    return embedding;
  }

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel(
      'https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json'
    );

    intervalRef.current = window.setInterval(() => {
      detectPose(detector, poseClassifier);
    }, 100);
  };

  const detectPose = async (detector: any, poseClassifier: any) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current?.getContext('2d');
      
      if (!ctx) return;
      
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      try {
        const keypoints = pose[0].keypoints;
        let input = keypoints.map((keypoint: any) => {
          if (keypoint.score > 0.4) {
            if (!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, 'rgb(255,255,255)');
              let connections = keypointConnections[keypoint.name as keyof typeof keypointConnections];
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase();
                  drawSegment(
                    ctx,
                    [keypoint.x, keypoint.y],
                    [
                      keypoints[POINTS[conName as keyof typeof POINTS]].x,
                      keypoints[POINTS[conName as keyof typeof POINTS]].y
                    ],
                    skeletonColor
                  );
                });
              } catch (err) {
                console.error('Error drawing connections:', err);
              }
            }
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });

        if (notDetected > 4) {
          skeletonColor = 'rgb(255,255,255)';
          return;
        }

        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        classification.array().then((data: any) => {
          const classNo = CLASS_NO[currentPose as keyof typeof CLASS_NO];
          if (data[0][classNo] > 0.97) {
            if (!flag) {
              setStartingTime(Date.now());
              setFlag(true);
            }
            setCurrentTime(Date.now());
            skeletonColor = 'rgb(0,255,0)';
          } else {
            setFlag(false);
            skeletonColor = 'rgb(255,255,255)';
          }
        });
      } catch (err) {
        console.error('Error in pose detection:', err);
      }
    }
  };

  const startYoga = () => {
    setIsStartPose(true);
    runMovenet();
  };

  const stopPose = () => {
    setIsStartPose(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const AVATAR_SRC = 'https://i.postimg.cc/WzfKp2mL/image.png';

  if (isStartPose) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-24 sm:pt-28 flex items-start justify-center">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 border border-blue-100 flex flex-col items-center">
          <div className="flex flex-col items-center -mt-24 mb-6">
            <img
              src={AVATAR_SRC}
              alt="Yoga Assistant Avatar"
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg ring-4 ring-blue-200 object-cover bg-white"
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-1">Yoga Assistant</h2>
            <p className="text-neutral-500 text-center max-w-lg">Practice yoga with real-time pose detection and guidance. Hold your pose, improve your best time, and enjoy your session!</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 w-full">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden flex-1">
              <Webcam
                ref={webcamRef}
                className="absolute inset-0 w-full h-full object-cover"
                width={640}
                height={480}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                width={640}
                height={480}
              />
            </div>
            <div className="flex-1 flex flex-col gap-6 items-center justify-center">
              <img
                src={poseImages[currentPose as keyof typeof poseImages]}
                alt={`${currentPose} pose`}
                className="w-60 h-60 object-contain rounded-xl shadow border border-neutral-200 bg-neutral-50"
              />
              <Instructions currentPose={currentPose} />
              <div className="flex gap-4 w-full justify-center">
                <div className="bg-blue-100 px-5 py-2 rounded-xl shadow text-blue-700 font-semibold text-base">
                  Time: {poseTime.toFixed(1)}s
                </div>
                <div className="bg-green-100 px-5 py-2 rounded-xl shadow text-green-700 font-semibold text-base">
                  Best: {bestPerform.toFixed(1)}s
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center w-full">
            <button
              onClick={stopPose}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-pink-600 transition-all text-lg"
            >
              Stop Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-24 sm:pt-28 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 border border-blue-100 flex flex-col items-center">
        <img
          src={AVATAR_SRC}
          alt="Yoga Assistant Avatar"
          className="h-28 w-28 rounded-full border-4 border-white shadow-lg ring-4 ring-blue-200 object-cover bg-white -mt-24 mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Yoga Assistant</h2>
        <p className="text-neutral-500 text-center max-w-md mb-6">Select your yoga pose and start practicing with real-time feedback and guidance. Stay consistent and beat your best time!</p>
        <div className="w-full max-w-md mx-auto space-y-6">
          <DropDown
            poseList={poseList}
            currentPose={currentPose}
            setCurrentPose={setCurrentPose}
          />
          <Instructions currentPose={currentPose} />
          <button
            onClick={startYoga}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-600 transition-all text-lg"
          >
            Start Practice
          </button>
        </div>
      </div>
    </div>
  );
}
