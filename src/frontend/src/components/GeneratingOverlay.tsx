import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  "Analyzing your description...",
  "Selecting the perfect layout...",
  "Generating content...",
  "Applying styles...",
  "Finalizing your website...",
];

interface GeneratingOverlayProps {
  step: number;
}

export default function GeneratingOverlay({ step }: GeneratingOverlayProps) {
  const currentStep = Math.min(step, steps.length - 1);
  const progress = (step / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
    >
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm text-center px-6">
        <div className="w-16 h-16 rounded-2xl shimmer-btn flex items-center justify-center glow-cyan">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>

        <div>
          <h2 className="font-display text-2xl font-600 mb-2">
            Building your website
          </h2>
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-muted-foreground text-sm"
          >
            {steps[currentStep]}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full shimmer-btn"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="flex gap-1.5">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i <= currentStep ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
