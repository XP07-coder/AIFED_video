import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene1({ sceneTime }: SceneProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0a1628" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Document Animation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative mb-8"
      >
        {/* Document */}
        <div className="w-72 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 relative overflow-hidden">
          {/* DEMO watermark */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-red-400/30 text-4xl font-bold -rotate-12 tracking-widest">DEMO</span>
          </div>
          
          {/* Document header */}
          <div className="border-b border-gray-200 pb-3 mb-4">
            <div className="h-3 w-32 bg-gray-300 rounded mb-2" />
            <div className="h-2 w-24 bg-gray-200 rounded" />
          </div>

          {/* Photo placeholder */}
          <div className="w-16 h-20 bg-gray-100 rounded border border-gray-200 mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16">Name:</span>
              <div className="h-2 w-28 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16">DOB:</span>
              <div className="h-2 w-20 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16">ID No:</span>
              <div className="h-2 w-24 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16">Address:</span>
              <div className="h-2 w-36 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-16">Issued:</span>
              <div className="h-2 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Highlight mismatch */}
          {sceneTime > 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-[60%] left-4 right-4 h-6 border-2 border-red-400 rounded bg-red-50/50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -right-2 -top-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-[10px] font-bold">!</span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-2xl md:text-3xl font-bold text-[#0a1628] text-center mb-4"
      >
        Can we trust every identity document?
      </motion.h1>

      {/* Logo reveal */}
      {sceneTime > 7 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-white" fill="currentColor">
              <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 10 L30 15 L30 25 L20 30 L10 25 L10 15 Z" fill="currentColor" opacity="0.3"/>
              <circle cx="20" cy="20" r="4" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0a1628]">AIFED</h2>
            <p className="text-xs text-teal-600">AI-Powered Document Verification</p>
          </div>
        </motion.div>
      )}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-teal-300/30"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}
