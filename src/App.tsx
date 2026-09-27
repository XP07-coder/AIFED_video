import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react';
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import Scene4 from './scenes/Scene4';
import Scene5 from './scenes/Scene5';
import Scene6 from './scenes/Scene6';
import Scene7 from './scenes/Scene7';

const TOTAL_DURATION = 150; // 2:30 in seconds

const SCENES = [
  { id: 1, start: 0, end: 10, component: Scene1 },
  { id: 2, start: 10, end: 35, component: Scene2 },
  { id: 3, start: 35, end: 55, component: Scene3 },
  { id: 4, start: 55, end: 85, component: Scene4 },
  { id: 5, start: 85, end: 120, component: Scene5 },
  { id: 6, start: 120, end: 140, component: Scene6 },
  { id: 7, start: 140, end: 150, component: Scene7 },
];

const SUBTITLES: { start: number; end: number; text: string }[] = [
  { start: 0, end: 4, text: "Can we trust every identity document?" },
  { start: 5, end: 10, text: "Introducing AIFED — AI-Powered Identity and Forgery Examination" },
  { start: 10, end: 18, text: "Identity documents are essential for establishing identity, but verifying them is not always straightforward." },
  { start: 18, end: 26, text: "Manual checks can be time-consuming, difficult to scale, and may overlook subtle alterations or inconsistent details." },
  { start: 26, end: 35, text: "Officers need a reliable way to identify potential warning signs and decide which cases deserve closer examination." },
  { start: 35, end: 45, text: "AIFED addresses this need by bringing document screening, explainable findings, and case management into one web-based platform." },
  { start: 45, end: 55, text: "It aims to help officers organize checks, prioritize cases, and maintain a clear record of their decisions." },
  { start: 55, end: 65, text: "With AIFED, an authorized officer can upload a document, inspect extracted text, and review highlighted inconsistencies." },
  { start: 65, end: 75, text: "The system organizes its findings and sends cases requiring attention to a review queue." },
  { start: 75, end: 85, text: "Officers examine the evidence and record the final decision — always a human-in-the-loop process." },
  { start: 85, end: 95, text: "The frontend uses React and TypeScript, while Python and FastAPI power the backend." },
  { start: 95, end: 105, text: "PostgreSQL stores structured case information. OCR tools extract text, and OpenCV-based image analysis helps identify potential visual alterations." },
  { start: 105, end: 113, text: "Role-based access, secure document handling, and audit logs support accountability." },
  { start: 113, end: 120, text: "The prototype uses synthetic data while authorized integrations are developed and validated." },
  { start: 120, end: 130, text: "AIFED aims to make initial screening more organized and improve the consistency of discrepancy checks." },
  { start: 130, end: 140, text: "Its expected impact is a more traceable and accountable verification workflow." },
  { start: 140, end: 150, text: "AIFED: Detect discrepancies. Explain findings. Empower verification." },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentScene = SCENES.find(s => currentTime >= s.start && currentTime < s.end) || SCENES[SCENES.length - 1];
  const currentSubtitle = SUBTITLES.find(s => currentTime >= s.start && currentTime < s.end);
  const progress = (currentTime / TOTAL_DURATION) * 100;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && currentTime < TOTAL_DURATION) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  const handlePlayPause = useCallback(() => {
    if (!hasStarted) setHasStarted(true);
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, currentTime, hasStarted]);

  const handleRestart = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    setHasStarted(true);
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * TOTAL_DURATION);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const SceneComponent = currentScene.component;

  return (
    <div className="w-screen h-screen bg-[#0a1628] flex flex-col items-center justify-center overflow-hidden relative">
      {/* Video Container */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] bg-white overflow-hidden">
        {/* Scene Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <SceneComponent isActive={true} sceneTime={currentTime - currentScene.start} />
          </motion.div>
        </AnimatePresence>

        {/* Subtitles */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center px-8 pointer-events-none z-50">
          <AnimatePresence mode="wait">
            {currentSubtitle && (
              <motion.div
                key={currentSubtitle.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-black/75 backdrop-blur-sm text-white px-6 py-3 rounded-lg max-w-3xl text-center"
              >
                <p className="text-base md:text-lg font-medium leading-relaxed">
                  {currentSubtitle.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Start Screen Overlay */}
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#1a2744] flex flex-col items-center justify-center z-[100] cursor-pointer"
            onClick={handlePlayPause}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-2xl shadow-teal-500/30">
                <svg viewBox="0 0 40 40" className="w-12 h-12 text-white" fill="currentColor">
                  <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 10 L30 15 L30 25 L20 30 L10 25 L10 15 Z" fill="currentColor" opacity="0.3"/>
                  <circle cx="20" cy="20" r="4" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">AIFED</h1>
            <p className="text-teal-300 text-lg mb-2">AI-Powered Identity and Forgery Examination</p>
            <p className="text-teal-300/70 text-sm mb-8">and Document Verification</p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
            >
              <Play className="w-8 h-8 text-white ml-1" />
            </motion.div>
            <p className="text-white/50 text-sm mt-6">Click to play • 2:30</p>
            <p className="text-white/30 text-xs mt-2">Smart India Hackathon Project</p>
          </motion.div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-12 pb-3 px-4 z-[60]">
        {/* Progress Bar */}
        <div
          className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full relative transition-all duration-100"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-teal-300 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={handleRestart}
              className="text-white hover:text-teal-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-teal-300 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-white/70 text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs">
              Scene {currentScene.id} / {SCENES.length}
            </span>
            <button className="text-white hover:text-teal-300 transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
