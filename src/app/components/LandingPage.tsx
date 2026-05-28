import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Play } from "lucide-react";
import { GamePreview } from "./GamePreview";

const MODES = [
  {
    id: "date-night",
    label: "Date Night",
    emoji: "🕯️",
    tagline: "Light & playful",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    id: "deep-dive",
    label: "Deep Dive",
    emoji: "🧠",
    tagline: "Core values",
    recommended: true,
    color: "#ff4d7e",
    bg: "#fff1f7",
    border: "#ff4d7e",
    glow: "rgba(255,77,126,0.2)",
  },
  {
    id: "long-distance",
    label: "Long Distance",
    emoji: "💌",
    tagline: "Heartfelt",
    color: "#7c3aed",
    bg: "#f5f0ff",
    border: "#c4b5fd",
    glow: "rgba(124,58,237,0.18)",
  },
];

export function LandingPage() {
  const [activeMode, setActiveMode] = useState("deep-dive");
  const navigate = useNavigate();
  const activeModeConfig = MODES.find((mode) => mode.id === activeMode) ?? MODES[1];

  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(160deg, #fff0f5 0%, #f8f4ff 50%, #fff5f0 100%)" }}
    >
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
            style={{ background: "linear-gradient(135deg, #ff4d7e, #7c3aed)", color: "white" }}
          >
            💑
          </div>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: "1.25rem", color: "#1a0a2e" }}>
            Two<span style={{ color: "#ff4d7e" }}>Minds</span>
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-5 pt-3 pb-10 sm:px-8 sm:pt-8 sm:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div>
            <h1
              className="text-[2.55rem] sm:text-[3.4rem] lg:text-[4.2rem]"
              style={{
                fontFamily: "Fredoka, sans-serif",
                lineHeight: "1.1",
                fontWeight: 700,
                color: "#ff4d7e",
                marginBottom: "0.1em",
              }}
            >
              Think deeper.
            </h1>
            <h1
              className="text-[2.55rem] sm:text-[3.4rem] lg:text-[4.2rem]"
              style={{
                fontFamily: "Fredoka, sans-serif",
                lineHeight: "1.1",
                fontWeight: 700,
                color: "#7c3aed",
              }}
            >
              Grow closer.
            </h1>
          </div>

          <p className="max-w-[420px]" style={{ color: "#6b5b7b", fontSize: "1.05rem", lineHeight: "1.7" }}>
            A wisdom game for couples. Each question has one right answer — and a story only you two can share.
          </p>

          <div className="flex flex-col items-start gap-2">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(255,77,126,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/play/${activeMode}`)}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #ff4d7e, #7c3aed)",
                color: "white",
                fontFamily: "Fredoka, sans-serif",
                fontSize: "1.1rem",
                boxShadow: "0 6px 20px rgba(255,77,126,0.25)",
                cursor: "pointer",
              }}
            >
              Start {activeModeConfig.label}
              <Play aria-hidden="true" size={18} fill="currentColor" strokeWidth={2.5} />
            </motion.button>
            <p style={{ color: "#8b7b98", fontSize: "0.88rem", fontWeight: 700 }}>
              Selected mode:{" "}
              <span style={{ color: activeModeConfig.color, fontFamily: "Fredoka, sans-serif" }}>
                {activeModeConfig.emoji} {activeModeConfig.label}
              </span>
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 800, color: "#b0afc0", letterSpacing: "0.08em" }} className="uppercase mb-3">
              Choose your mode
            </p>
            <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              {MODES.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <motion.button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    aria-pressed={isActive}
                    whileHover={{ y: -3, boxShadow: `0 8px 24px ${mode.glow}` }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      background: isActive ? mode.bg : "#f8f8fb",
                      borderColor: isActive ? mode.border : "rgba(0,0,0,0)",
                      boxShadow: isActive ? `0 8px 24px ${mode.glow}` : "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative flex w-full flex-col items-start px-4 py-3 rounded-2xl sm:w-auto"
                    style={{
                      border: "2px solid",
                      minWidth: "118px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    {mode.recommended && (
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{
                          background: mode.color,
                          color: "white",
                          fontFamily: "Nunito, sans-serif",
                          fontWeight: 800,
                          fontSize: "0.6rem",
                          letterSpacing: "0.04em",
                        }}
                      >
                        ✦ Recommended
                      </motion.span>
                    )}

                    <div className="relative mb-2">
                      <motion.div
                        animate={{ scale: isActive ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: mode.color, opacity: 0.15, transform: "scale(1.6)" }}
                      />
                      <motion.span
                        animate={{ scale: isActive ? 1.15 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="text-xl block"
                      >
                        {mode.emoji}
                      </motion.span>
                    </div>

                    <span
                      style={{
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: "0.92rem",
                        color: isActive ? mode.color : "#1a0a2e",
                        transition: "color 0.2s",
                      }}
                    >
                      {mode.label}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#b0afc0", fontWeight: 700, fontFamily: "Nunito, sans-serif" }}>
                      {mode.tagline}
                    </span>

                    <motion.div
                      animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full origin-left"
                      style={{ background: mode.color }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden min-h-[390px] sm:min-h-[440px] lg:min-h-[480px]"
          style={{
            background: "#ffffff",
            border: "2px solid rgba(255,77,126,0.08)",
            boxShadow: "0 8px 40px rgba(124,58,237,0.1), 0 2px 12px rgba(255,77,126,0.08)",
          }}
        >
          <GamePreview />
        </motion.div>
      </main>
    </div>
  );
}
