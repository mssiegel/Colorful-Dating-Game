import { motion } from "motion/react";

export function Character({ mood }: { mood: "idle" | "happy" | "thinking" }) {
  const colors = {
    idle: "#ff4d7e",
    happy: "#7c3aed",
    thinking: "#f59e0b",
  };
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <ellipse cx="36" cy="44" rx="22" ry="18" fill={colors[mood]} />
        <circle cx="36" cy="28" r="18" fill={colors[mood]} />
        <circle cx="29" cy="26" r="3.5" fill="white" />
        <circle cx="43" cy="26" r="3.5" fill="white" />
        <circle cx="30" cy="27" r="1.8" fill="#1a0a2e" />
        <circle cx="44" cy="27" r="1.8" fill="#1a0a2e" />
        {mood === "happy" ? (
          <path d="M29 33 Q36 39 43 33" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        ) : mood === "thinking" ? (
          <path d="M30 34 Q36 36 42 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M30 34 Q36 37 42 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        )}
        <ellipse cx="14" cy="38" rx="7" ry="4" fill={colors[mood]} transform="rotate(-20 14 38)" />
        <ellipse cx="58" cy="38" rx="7" ry="4" fill={colors[mood]} transform="rotate(20 58 38)" />
      </svg>
    </motion.div>
  );
}
