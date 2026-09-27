import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  sceneTime: number;
}

export default function Scene5({ sceneTime }: SceneProps) {
  const components = [
    { id: 'frontend', label: 'Frontend', sublabel: 'React + TypeScript', x: '50%', y: '10%', color: 'blue', delay: 0 },
    { id: 'api', label: 'Backend API', sublabel: 'Python + FastAPI', x: '50%', y: '35%', color: 'teal', delay: 1 },
    { id: 'ocr', label: 'OCR Engine', sublabel: 'Text Extraction', x: '20%', y: '55%', color: 'purple', delay: 2 },
    { id: 'cv', label: 'Image Analysis', sublabel: 'OpenCV', x: '80%', y: '55%', color: 'orange', delay: 3 },
    { id: 'db', label: 'Database', sublabel: 'PostgreSQL', x: '50%', y: '75%', color: 'green', delay: 4 },
    { id: 'dashboard', label: 'Officer Dashboard', sublabel: 'Role-based Access', x: '50%', y: '92%', color: 'navy', delay: 5 },
  ];

  const connections = [
    { from: 'frontend', to: 'api', delay: 1.5 },
    { from: 'api', to: 'ocr', delay: 2.5 },
    { from: 'api', to: 'cv', delay: 3.5 },
    { from: 'ocr', to: 'db', delay: 4.5 },
    { from: 'cv', to: 'db', delay: 5.5 },
    { from: 'db', to: 'dashboard', delay: 6.5 },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-300 text-blue-700';
      case 'teal': return 'bg-teal-50 border-teal-300 text-teal-700';
      case 'purple': return 'bg-purple-50 border-purple-300 text-purple-700';
      case 'orange': return 'bg-orange-50 border-orange-300 text-orange-700';
      case 'green': return 'bg-green-50 border-green-300 text-green-700';
      case 'navy': return 'bg-[#0a1628] border-[#0a1628] text-white';
      default: return 'bg-gray-50 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-blue-50/30 flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-4 text-center"
      >
        How It Works
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-500 mb-6 text-center"
      >
        System Architecture
      </motion.p>

      {/* Architecture Diagram */}
      <div className="relative w-full max-w-3xl h-[420px]">
        {/* Connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Frontend to API */}
          <motion.line
            x1="50" y1="18" x2="50" y2="35"
            stroke="#0d9488" strokeWidth="0.3" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: sceneTime > 1.5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* API to OCR */}
          <motion.line
            x1="45" y1="42" x2="25" y2="55"
            stroke="#7c3aed" strokeWidth="0.3" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: sceneTime > 2.5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* API to CV */}
          <motion.line
            x1="55" y1="42" x2="75" y2="55"
            stroke="#ea580c" strokeWidth="0.3" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: sceneTime > 3.5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* OCR to DB */}
          <motion.line
            x1="25" y1="63" x2="45" y2="75"
            stroke="#16a34a" strokeWidth="0.3" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: sceneTime > 4.5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* CV to DB */}
          <motion.line
            x1="75" y1="63" x2="55" y2="75"
            stroke="#16a34a" strokeWidth="0.3" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: sceneTime > 5.5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          {/* DB to Dashboard */}
          <motion.line
            x1="50" y1="82" x2="50" y2="90"
            stroke="#0a1628" strokeWidth="0.3" strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: sceneTime > 6.5 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Component nodes */}
        {components.map((comp) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: sceneTime > comp.delay ? 1 : 0.2, 
              scale: sceneTime > comp.delay ? 1 : 0.7 
            }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-xl border-2 shadow-lg ${getColorClasses(comp.color)}`}
            style={{ left: comp.x, top: comp.y }}
          >
            <p className="text-xs font-bold text-center whitespace-nowrap">{comp.label}</p>
            <p className={`text-[9px] text-center ${comp.color === 'navy' ? 'text-gray-300' : 'text-gray-500'}`}>
              {comp.sublabel}
            </p>
          </motion.div>
        ))}

        {/* Data flow indicators */}
        {sceneTime > 2 && (
          <>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute left-[48%] top-[22%] w-2 h-2 rounded-full bg-teal-400"
            />
            <motion.div
              animate={{ y: [0, 15, 0], x: [-10, 0, 10] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute left-[30%] top-[48%] w-2 h-2 rounded-full bg-purple-400"
            />
            <motion.div
              animate={{ y: [0, 15, 0], x: [10, 0, -10] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute left-[70%] top-[48%] w-2 h-2 rounded-full bg-orange-400"
            />
          </>
        )}
      </div>

      {/* Security features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: sceneTime > 20 ? 1 : 0, y: sceneTime > 20 ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="flex gap-3 flex-wrap justify-center mt-2"
      >
        {[
          { icon: '🔒', label: 'Role-based Access' },
          { icon: '📋', label: 'Audit Logs' },
          { icon: '🧪', label: 'Synthetic Data (Prototype)' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: sceneTime > 20 ? 1 : 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5"
          >
            <span className="text-sm">{item.icon}</span>
            <span className="text-[10px] font-medium text-gray-600">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
