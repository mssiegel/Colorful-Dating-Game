import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Home, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { QUESTIONS, MODE_CONFIG, sampleQuestions, type ModeId, type Question } from "../data/questions";
import { Character } from "./Character";

const MODE_IDS: ModeId[] = ["date-night", "deep-dive", "long-distance"];
type GameSession = { mode: ModeId | null; questions: Question[] };

function isModeId(mode: string | undefined): mode is ModeId {
  return Boolean(mode && MODE_IDS.includes(mode as ModeId));
}

function getScoreMessage(score: number) {
  if (score === 5) return "Perfect wisdom!";
  if (score >= 3) return "Great minds think alike";
  return "Keep exploring together";
}

const pageStyle = {
  fontFamily: "Nunito, sans-serif",
  background: "linear-gradient(160deg, #fff0f5 0%, #f8f4ff 50%, #fff5f0 100%)",
};

const questionTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
} as const;

const questionVariants = {
  enter: { opacity: 0, y: 18, scale: 0.98, filter: "blur(3px)" },
  center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, scale: 0.99, filter: "blur(2px)" },
};

const choicesVariants = {
  enter: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
  center: { transition: { staggerChildren: 0.045 } },
};

const choiceVariants = {
  enter: { opacity: 0, y: 10, scale: 0.99 },
  center: { opacity: 1, y: 0, scale: 1 },
};

export function PlayPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [gameSession, setGameSession] = useState<GameSession>(() => ({
    mode: isModeId(mode) ? mode : null,
    questions: isModeId(mode) ? sampleQuestions(QUESTIONS[mode]) : [],
  }));

  useEffect(() => {
    if (!isModeId(mode)) {
      if (gameSession.mode !== null) {
        setGameSession({ mode: null, questions: [] });
      }

      return;
    }

    if (gameSession.mode === mode) return;

    setGameSession({ mode, questions: sampleQuestions(QUESTIONS[mode]) });
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setIsAdvancing(false);
  }, [mode, gameSession.mode]);

  if (!isModeId(mode)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={pageStyle}>
        <div
          className="w-full max-w-sm rounded-2xl p-6 text-center"
          style={{ background: "white", border: "2px solid rgba(255,77,126,0.12)", boxShadow: "0 4px 20px rgba(255,77,126,0.08)" }}
        >
          <p style={{ fontFamily: "Fredoka, sans-serif", color: "#1a0a2e", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Mode not found
          </p>
          <p style={{ color: "#6b5b7b", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            Pick a game mode from the home screen to start a fresh round.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3"
            style={{ background: "linear-gradient(135deg, #ff4d7e, #7c3aed)", color: "white", fontFamily: "Fredoka, sans-serif", cursor: "pointer" }}
          >
            <Home aria-hidden="true" size={17} strokeWidth={2.5} />
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const modeConfig = MODE_CONFIG[mode];
  const questions = gameSession.questions;
  const question = questions[currentIndex];
  const selectedChoice = selected ? question.choices[Number(selected)] : undefined;
  const hasAnswered = Boolean(selectedChoice);
  const mood = !hasAnswered ? "idle" : selectedChoice === question.correctAnswer ? "happy" : "thinking";
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleSelect(optionId: string) {
    if (selected || isAdvancing) return;

    setSelected(optionId);

    if (question.choices[Number(optionId)] === question.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    }
  }

  function handleNext() {
    if (!hasAnswered || isAdvancing) return;

    setIsAdvancing(true);

    if (currentIndex === questions.length - 1) {
      window.setTimeout(() => {
        setDone(true);
        setIsAdvancing(false);
      }, 180);
      return;
    }

    window.setTimeout(() => {
      setCurrentIndex((index) => index + 1);
      setSelected(null);
      setIsAdvancing(false);
    }, 180);
  }

  function handlePlayAgain() {
    setGameSession({ mode, questions: sampleQuestions(QUESTIONS[mode]) });
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setIsAdvancing(false);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-10" style={pageStyle}>
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md rounded-3xl p-7 text-center"
          style={{ background: "white", border: "2px solid rgba(255,77,126,0.12)", boxShadow: `0 10px 42px ${modeConfig.glow}` }}
        >
          <div className="mb-4 text-4xl">{modeConfig.emoji}</div>
          <p style={{ fontFamily: "Fredoka, sans-serif", color: modeConfig.color, fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            {modeConfig.label} complete
          </p>
          <h1 style={{ fontFamily: "Fredoka, sans-serif", color: "#1a0a2e", fontSize: "2.5rem", lineHeight: 1.05, marginBottom: "0.75rem" }}>
            You got {score}/5!
          </h1>
          <p style={{ color: "#6b5b7b", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{getScoreMessage(score)}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePlayAgain}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3"
              style={{ background: "linear-gradient(135deg, #ff4d7e, #7c3aed)", color: "white", fontFamily: "Fredoka, sans-serif", cursor: "pointer" }}
            >
              <RotateCcw aria-hidden="true" size={17} strokeWidth={2.5} />
              Play again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3"
              style={{ background: "#f8f8fb", color: "#6b5b7b", border: "2px solid rgba(0,0,0,0.06)", fontFamily: "Fredoka, sans-serif", cursor: "pointer" }}
            >
              <Home aria-hidden="true" size={17} strokeWidth={2.5} />
              Back to home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-5 py-6 sm:px-8 sm:py-8" style={pageStyle}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(255,255,255,0.7)", color: "#6b5b7b", border: "2px solid rgba(255,77,126,0.1)", fontFamily: "Fredoka, sans-serif", cursor: "pointer" }}
          >
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={2.5} />
            Back
          </button>
          <div className="text-right">
            <p style={{ fontFamily: "Fredoka, sans-serif", color: modeConfig.color, fontSize: "1rem" }}>
              {modeConfig.emoji} {modeConfig.label}
            </p>
            <p style={{ color: "#9d8aaa", fontSize: "0.82rem", fontWeight: 800 }}>
              Round {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </header>

        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 130, damping: 22 }}
            style={{ background: `linear-gradient(135deg, ${modeConfig.color}, #7c3aed)` }}
          />
        </div>

        <motion.main
          animate={{
            boxShadow: hasAnswered ? `0 14px 46px ${modeConfig.glow}` : `0 8px 40px ${modeConfig.glow}`,
          }}
          transition={{ duration: 0.28 }}
          className="relative overflow-hidden rounded-3xl px-4 pb-5 pt-6 sm:px-7 sm:pb-7"
          style={{ background: "white", border: "2px solid rgba(255,77,126,0.12)" }}
        >
          <div className="pointer-events-none absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-widest" style={{ background: modeConfig.bg, color: modeConfig.color }}>
            Question {currentIndex + 1}
          </div>

          <motion.div
            key={mood}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="mb-4 flex justify-center pt-9"
          >
            <Character mood={mood} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.section
              key={currentIndex}
              variants={questionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={questionTransition}
              className="mx-auto max-w-xl"
            >
              <div
                className="mb-3 rounded-2xl p-4"
                style={{ background: "white", border: "2px solid rgba(255,77,126,0.12)", boxShadow: "0 4px 20px rgba(255,77,126,0.08)" }}
              >
                <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: modeConfig.color, fontWeight: 800 }}>
                  Scenario
                </p>
                <p style={{ color: "#1a0a2e", fontSize: "1rem", lineHeight: 1.6 }}>{question.scenario}</p>
              </div>

              <p className="mb-3 text-center" style={{ fontFamily: "Fredoka, sans-serif", color: "#1a0a2e", fontSize: "1.25rem" }}>
                {question.prompt}
              </p>

              <motion.div className="flex flex-col gap-2.5" variants={choicesVariants} initial="enter" animate="center">
                {question.choices.map((choice, index) => {
                  const optionId = String(index);
                  const optionLabel = String.fromCharCode(97 + index);
                  const isCorrect = choice === question.correctAnswer;
                  const isSelected = selected === optionId;
                  const revealCorrect = hasAnswered && isCorrect;
                  const revealWrongSelection = hasAnswered && isSelected && !isCorrect;
                  const bg = revealCorrect ? "#f0fdf4" : "white";
                  const border = revealCorrect ? "#34d399" : revealWrongSelection ? "rgba(255,77,126,0.36)" : "rgba(0,0,0,0.08)";
                  const textColor = revealCorrect ? "#065f46" : hasAnswered && !isSelected ? "#9d8aaa" : "#1a0a2e";
                  const dotBg = revealCorrect ? "#34d399" : revealWrongSelection ? "#ff4d7e" : "#ececf0";

                  return (
                    <motion.button
                      key={choice}
                      variants={choiceVariants}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={!hasAnswered ? { y: -2, borderColor: modeConfig.color, boxShadow: `0 8px 22px ${modeConfig.glow}` } : undefined}
                      whileTap={!hasAnswered ? { scale: 0.985 } : undefined}
                      onClick={() => handleSelect(optionId)}
                      disabled={hasAnswered}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left"
                      style={{ background: bg, border: `2px solid ${border}`, cursor: hasAnswered ? "default" : "pointer" }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs"
                        style={{ background: dotBg, color: "white", fontFamily: "Fredoka, sans-serif", fontWeight: 700 }}
                      >
                        {optionLabel.toUpperCase()}
                      </span>
                      <span style={{ color: textColor, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35 }}>{choice}</span>
                      {revealCorrect && <Check aria-hidden="true" className="ml-auto shrink-0" size={18} strokeWidth={3} style={{ color: "#10b981" }} />}
                      {revealWrongSelection && <X aria-hidden="true" className="ml-auto shrink-0" size={18} strokeWidth={3} style={{ color: "#ff4d7e" }} />}
                    </motion.button>
                  );
                })}
              </motion.div>

              <AnimatePresence>
                {hasAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="relative mt-4 overflow-hidden rounded-2xl px-4 py-4"
                    style={{
                      background: `linear-gradient(135deg, ${modeConfig.bg}, #ffffff)`,
                      border: `2px solid ${modeConfig.color}`,
                      boxShadow: `0 12px 30px ${modeConfig.glow}, 0 3px 12px rgba(124,58,237,0.14)`,
                    }}
                  >
                    <div
                      className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full"
                      style={{ background: modeConfig.color }}
                    />
                    <p style={{ color: "#4c1d95", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      <strong style={{ color: modeConfig.color, fontFamily: "Fredoka, sans-serif", fontSize: "1rem" }}>
                        Talk together:
                      </strong>{" "}
                      {question.conversationPrompt}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {hasAnswered && (
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(255,77,126,0.24)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={isAdvancing}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-center"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #ff4d7e)",
                      color: "white",
                      fontFamily: "Fredoka, sans-serif",
                      fontSize: "1rem",
                      cursor: isAdvancing ? "wait" : "pointer",
                      opacity: isAdvancing ? 0.82 : 1,
                    }}
                  >
                    {currentIndex === questions.length - 1 ? "See score" : "Next Question"}
                    <motion.span animate={{ x: isAdvancing ? 6 : 0 }} transition={{ duration: 0.18 }}>
                      <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.section>
          </AnimatePresence>
        </motion.main>
      </div>
    </div>
  );
}
