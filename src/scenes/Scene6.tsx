import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene6({ sceneTime }: SceneProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-teal-50/20 to-blue-50/30 flex flex-col items-center justify-center relative overflow-hidden p-8">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-8 text-center"
      >
        Expected Impact
      </motion.h2>

      {/* Before/After comparison */}
      <div className="flex items-center justify-center gap-8 w-full max-w-4xl mb-8">
        {/* Before - Cluttered */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="bg-red-50 rounded-xl border border-red-200 p-4 relative overflow-hidden">
            <p className="text-xs font-bold text-red-600 mb-3 text-center">BEFORE</p>
            <div className="space-y-2">
              {/* Scattered papers */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="bg-white rounded shadow-sm border border-gray-200 p-2 relative"
                  style={{ transform: `rotate(${(i - 2) * 4}deg)` }}
                >
                  <div className="h-1.5 w-3/4 bg-gray-200 rounded mb-1" />
                  <div className="h-1.5 w-1/2 bg-gray-200 rounded" />
                </motion.div>
              ))}
            </div>
            {/* Chaos indicators */}
            <div className="absolute top-2 right-2 text-red-400 text-lg">✗</div>
            <div className="absolute bottom-2 left-2">
              <span className="text-[9px] text-red-400">Disorganized</span>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-3xl text-teal-500"
          >
            →
          </motion.div>
          <span className="text-[9px] text-teal-600 font-medium mt-1">AIFED</span>
        </motion.div>

        {/* After - Organized */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1"
        >
          <div className="bg-green-50 rounded-xl border border-green-200 p-4 relative overflow-hidden">
            <p className="text-xs font-bold text-green-600 mb-3 text-center">AFTER</p>
            <div className="space-y-2">
              {/* Organized cards */}
              {[
                { status: 'Verified', color: 'green' },
                { status: 'In Review', color: 'yellow' },
                { status: 'Flagged', color: 'red' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: sceneTime > 3 ? 1 : 0.3, x: 0 }}
                  transition={{ delay: 3 + i * 0.3 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    item.color === 'green' ? 'bg-green-400' :
                    item.color === 'yellow' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                  <div className="flex-1">
                    <div className="h-1.5 w-3/4 bg-gray-200 rounded mb-1" />
                    <span className="text-[8px] text-gray-400">{item.status}</span>
                  </div>
                  <span className="text-[8px] text-gray-400">Case #{i + 1}</span>
                </motion.div>
              ))}
            </div>
            <div className="absolute top-2 right-2 text-green-400 text-lg">✓</div>
            <div className="absolute bottom-2 left-2">
              <span className="text-[9px] text-green-600">Organized & Traceable</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: sceneTime > 6 ? 1 : 0, y: sceneTime > 6 ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
      >
        {[
          { icon: '📊', title: 'Organized Screening', desc: 'Structured workflow' },
          { icon: '🔄', title: 'Consistent Checks', desc: 'Standardized process' },
          { icon: '📋', title: 'Case Prioritization', desc: 'Focus on what matters' },
          { icon: '🔍', title: 'Traceable Decisions', desc: 'Full audit trail' },
        ].map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: sceneTime > 6 ? 1 : 0, y: sceneTime > 6 ? 0 : 20 }}
            transition={{ delay: 6 + i * 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-2xl mb-2 block">{benefit.icon}</span>
            <p className="text-xs font-bold text-[#0a1628] mb-1">{benefit.title}</p>
            <p className="text-[10px] text-gray-500">{benefit.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Impact statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneTime > 12 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full px-6 py-3 border border-teal-200"
      >
        <p className="text-sm text-teal-700 font-medium text-center">
          A more traceable and accountable verification workflow
        </p>
      </motion.div>
    </div>
  );
}
