import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Decorative theme toggle — dark theme is the design language,
// so this just swaps sun/moon with a rotation animation.

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-white/[0.08] bg-[#111111] text-[#F5E9D7] transition-colors duration-200 hover:bg-white/5"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;