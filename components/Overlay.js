"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGalaxyStore } from "../lib/store";

export default function Overlay() {
  const stage = useGalaxyStore((s) => s.stage);
  const selectedPhoto = useGalaxyStore((s) => s.selectedPhoto);
  const selectPhoto = useGalaxyStore((s) => s.selectPhoto);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 flex items-end justify-center pb-16 md:items-center md:pb-0">
        <AnimatePresence>
          {stage === "intro" && (
            <motion.p
              key="intro-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="select-none text-lg font-light uppercase tracking-widest text-white/80 md:text-2xl"
            >
              Touch the planet
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.button
            key="back-button"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            onClick={() => selectPhoto(null)}
            className="pointer-events-auto absolute left-6 top-6 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur transition hover:bg-white/20"
          >
            ← Back to galaxy
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
