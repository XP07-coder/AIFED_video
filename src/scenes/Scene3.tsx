import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene3({ sceneTime }: SceneProps) {
  const merged = sceneTime > 8;

  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-teal-50/20 to-blue-50/30 flex flex-col items-center justify-center relative overflow-hidden p-8">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-10 text-center"
      >
        Why We Need AIFED
      </motion.h2>

      {/* Separate steps merging into dashboard */}
      <div className="flex items-center justify-center gap-4 relative w-full max-w-4xl">
        {/* Individual manual steps */}
        {!merged && (
          <>
            {[
              { icon: '📄', label: 'Manual\nScreening', delay: 0.3 },
              { icon: '🔎', label: 'Field-by-\nField Check', delay: 0.5 },
              { icon: '📝', label: 'Paper\nNotes', delay: 0.7 },
              { icon: '📂', label: 'Physical\nFiling', delay: 0.9 },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl mb-2">
                  {step.icon}
                </div>
                <span className="text-[10px] text-gray-500 text-center whitespace-pre-line">{step.label}</span>
              </motion.div>
            ))}
          </>
        )}

        {/* Merged dashboard */}
        {merged && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="w-full max-w-lg"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Dashboard header */}
              <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2744] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-teal-500 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-white text-sm font-bold">AIFED Dashboard</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 grid grid-cols-3 gap-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-teal-50 rounded-lg p-3 border border-teal-100"
                >
                  <p className="text-[10px] text-teal-600">Screening</p>
                  <p className="text-lg font-bold text-teal-700">✓</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-50 rounded-lg p-3 border border-blue-100"
                >
                  <p className="text-[10px] text-blue-600">Findings</p>
                  <p className="text-lg font-bold text-blue-700">3</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-purple-50 rounded-lg p-3 border border-purple-100"
                >
                  <p className="text-[10px] text-purple-600">Queue</p>
                  <p className="text-lg font-bold text-purple-700">2</p>
                </motion.div>
              </div>

              {/* Merged features */}
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {['Document Screening', 'Explainable Findings', 'Case Management', 'Audit Trail'].map((feat, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.2 }}
                      className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {feat}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Arrow showing merge */}
      {!merged && sceneTime > 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 text-teal-500">
            <span className="text-xs font-medium">Merging into one platform</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >→</motion.span>
          </div>
        </motion.div>
      )}

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: merged ? 1.5 : 3 }}
        className="flex gap-4 mt-8"
      >
        {[
          { label: 'Organize Checks', color: 'teal' },
          { label: 'Prioritize Cases', color: 'blue' },
          { label: 'Clear Records', color: 'purple' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (merged ? 1.5 : 3) + i * 0.2 }}
            className={`px-4 py-2 rounded-full border text-xs font-medium ${
              item.color === 'teal' ? 'bg-teal-50 text-teal-700 border-teal-200' :
              item.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-purple-50 text-purple-700 border-purple-200'
            }`}
          >
            {item.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
