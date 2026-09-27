import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene2({ sceneTime }: SceneProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-blue-50/30 to-gray-50 flex flex-col items-center justify-center relative overflow-hidden p-8">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-8 text-center"
      >
        The Verification Challenge
      </motion.h2>

      {/* Officer examining document */}
      <div className="flex items-center justify-center gap-12 mb-8">
        {/* Officer figure */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a2744] to-[#0a1628] flex items-center justify-center mb-2">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span className="text-xs text-gray-500 font-medium">Officer</span>
        </motion.div>

        {/* Document being examined */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="w-48 h-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-300/40 text-2xl font-bold -rotate-12">DEMO</span>
            </div>
            <div className="h-2 w-20 bg-gray-200 rounded mb-3" />
            <div className="h-2 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-2 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-2 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-2 w-28 bg-gray-200 rounded" />
          </div>

          {/* Magnifying glass */}
          <motion.div
            animate={{
              x: [0, 20, 20, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute -right-8 -top-4"
          >
            <div className="w-16 h-16 rounded-full border-4 border-teal-500 bg-teal-50/50 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mismatch highlight */}
      {sceneTime > 8 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-6"
        >
          {/* Field 1 */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-white rounded-lg shadow-lg border-2 border-red-300 p-4"
          >
            <p className="text-[10px] text-gray-400 mb-1">Field A — Date of Birth</p>
            <p className="text-lg font-mono font-bold text-[#0a1628]">15/03/1990</p>
          </motion.div>

          {/* Mismatch indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <span className="text-[10px] text-red-500 font-medium mt-1">Mismatch</span>
          </motion.div>

          {/* Field 2 */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg border-2 border-red-300 p-4"
          >
            <p className="text-[10px] text-gray-400 mb-1">Field B — Age on Document</p>
            <p className="text-lg font-mono font-bold text-[#0a1628]">28 years</p>
          </motion.div>
        </motion.div>
      )}

      {/* Problem points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex gap-6 mt-4"
      >
        {[
          { icon: '⏱', label: 'Time-consuming' },
          { icon: '📊', label: 'Hard to scale' },
          { icon: '🔍', label: 'May miss details' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + i * 0.3 }}
            className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium text-gray-600">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
