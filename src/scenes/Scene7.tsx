import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene7({ sceneTime }: SceneProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-teal-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Glowing rings */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-96 h-96 rounded-full border border-teal-400/20"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] rounded-full border border-teal-400/10"
      />

      {/* Shield Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-2xl shadow-teal-500/30 relative">
          {/* Shield shape */}
          <svg viewBox="0 0 60 60" className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M30 5 L50 15 L50 35 L30 50 L10 35 L10 15 Z" />
            <path d="M30 12 L44 19 L44 33 L30 43 L16 33 L16 19 Z" fill="currentColor" opacity="0.2" />
            <circle cx="30" cy="28" r="6" fill="currentColor" opacity="0.8" />
            <path d="M24 28 L28 32 L36 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          {/* Glow effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl bg-teal-400/20 blur-xl"
          />
        </div>
      </motion.div>

      {/* Project Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight"
      >
        AIFED
      </motion.h1>

      {/* Full form */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-teal-300 text-base md:text-lg text-center max-w-lg mb-4 px-4"
      >
        AI-Powered Identity and Forgery Examination
        <br />
        and Document Verification
      </motion.p>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="flex items-center gap-2 mb-8"
      >
        <span className="text-teal-400 text-sm font-medium">"</span>
        <p className="text-white/80 text-sm md:text-base italic">
          Detect Discrepancies. Explain Findings. Empower Verification.
        </p>
        <span className="text-teal-400 text-sm font-medium">"</span>
      </motion.div>

      {/* SIH Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2"
      >
        <p className="text-white/70 text-xs font-medium tracking-wider uppercase">
          Smart India Hackathon Project
        </p>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneTime > 5 ? 1 : 0 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8"
      >
        {['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'OpenCV'].map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5 + i * 0.15 }}
            className="text-[10px] text-white/30 font-mono"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
