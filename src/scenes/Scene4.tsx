import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene4({ sceneTime }: SceneProps) {
  const steps = [
    { id: 'upload', label: 'Upload', icon: '📤', time: 0 },
    { id: 'ocr', label: 'OCR Extraction', icon: '📋', time: 5 },
    { id: 'check', label: 'Consistency Checks', icon: '✅', time: 10 },
    { id: 'findings', label: 'Findings', icon: '📊', time: 15 },
    { id: 'review', label: 'Human Review', icon: '👤', time: 20 },
    { id: 'decision', label: 'Recorded Decision', icon: '✓', time: 25 },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-blue-50/20 to-teal-50/10 flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-6 text-center"
      >
        Our Solution
      </motion.h2>

      {/* Pipeline visualization */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: sceneTime >= step.time ? 1 : 0.3, 
              scale: sceneTime >= step.time ? 1 : 0.8 
            }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-500 ${
              sceneTime >= step.time 
                ? 'bg-white border-teal-400 shadow-lg shadow-teal-100' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <span className="text-xl mb-1">{step.icon}</span>
              <span className="text-[10px] font-medium text-gray-600 text-center">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                animate={{ opacity: sceneTime >= step.time + 3 ? 1 : 0.3 }}
                className="mx-1 text-teal-400"
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-[10px] text-gray-400 ml-4">
              aifed.gov.in/dashboard
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3 mb-4">
              {/* Upload area */}
              <motion.div
                animate={{ borderColor: sceneTime >= 0 && sceneTime < 5 ? '#0d9488' : '#e5e7eb' }}
                className="col-span-1 border-2 border-dashed rounded-lg p-3 flex flex-col items-center justify-center"
              >
                <span className="text-xl mb-1">📤</span>
                <span className="text-[9px] text-gray-500 text-center">Upload Document</span>
                {sceneTime >= 0 && sceneTime < 5 && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mt-1 w-full h-1 bg-teal-400 rounded"
                  />
                )}
              </motion.div>

              {/* OCR Result */}
              <motion.div
                animate={{ opacity: sceneTime >= 5 ? 1 : 0.3 }}
                className="col-span-1 bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <p className="text-[9px] text-gray-400 mb-1">Extracted Text</p>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-gray-200 rounded" />
                  <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
                </div>
              </motion.div>

              {/* Findings */}
              <motion.div
                animate={{ opacity: sceneTime >= 15 ? 1 : 0.3 }}
                className="col-span-1 bg-red-50 rounded-lg p-3 border border-red-200"
              >
                <p className="text-[9px] text-red-400 mb-1">⚠ Findings</p>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-red-200 rounded" />
                  <div className="h-1.5 w-2/3 bg-red-200 rounded" />
                </div>
              </motion.div>

              {/* Review Queue */}
              <motion.div
                animate={{ opacity: sceneTime >= 20 ? 1 : 0.3 }}
                className="col-span-1 bg-blue-50 rounded-lg p-3 border border-blue-200"
              >
                <p className="text-[9px] text-blue-400 mb-1">Review Queue</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <div className="h-1.5 w-full bg-blue-200 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <div className="h-1.5 w-3/4 bg-yellow-200 rounded" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Event history */}
            <motion.div
              animate={{ opacity: sceneTime >= 25 ? 1 : 0.3 }}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <p className="text-[9px] text-gray-400 mb-2 font-medium">Audit Trail</p>
              <div className="space-y-1.5">
                {[
                  { time: '10:23', event: 'Document uploaded', color: 'teal' },
                  { time: '10:23', event: 'OCR extraction complete', color: 'blue' },
                  { time: '10:24', event: '2 inconsistencies detected', color: 'red' },
                  { time: '10:25', event: 'Case sent to review queue', color: 'purple' },
                  { time: '10:30', event: 'Officer decision recorded', color: 'green' },
                ].map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: sceneTime >= 25 ? 1 : 0, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[8px] text-gray-400 w-8">{log.time}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      log.color === 'teal' ? 'bg-teal-400' :
                      log.color === 'blue' ? 'bg-blue-400' :
                      log.color === 'red' ? 'bg-red-400' :
                      log.color === 'purple' ? 'bg-purple-400' :
                      'bg-green-400'
                    }`} />
                    <span className="text-[9px] text-gray-600">{log.event}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Human-in-the-loop note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneTime > 25 ? 1 : 0 }}
        className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2"
      >
        <span className="text-sm">👤</span>
        <span className="text-[10px] text-amber-700 font-medium">Human-in-the-loop: Authorized officers make all final decisions</span>
      </motion.div>
    </div>
  );
}
