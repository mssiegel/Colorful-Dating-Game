import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Home, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { QUESTIONS, MODE_CONFIG, isModeId, sampleQuestions, type ModeConfig, type ModeId, type Question } from "../data/questions";
import { borders, colors, fonts, gradients, pageStyle, shadows } from "../visualTokens";
import { Character } from "./Character";

type GameSession = { mode: ModeId | null; questions: Question[] };
type ModeTheme = Omit<ModeConfig, "id">;
type CharacterMood = "idle" | "happy" | "thinking";

function getScoreMessage(score: number) {
  if (score === 5) return "Perfect wisdom!";
  if (score >= 3) return "Great minds think alike";
  return "Keep exploring together";
}

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

function InvalidModeScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={pageStyle}>
      <div
        className="w-full max-w-sm rounded-2xl p-6 text-center"
        style={{ background: colors.white, border: borders.card, boxShadow: shadows.card }}
      >
        <p style={{ fontFamily: fonts.heading, color: colors.text, fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Mode not found
        </p>
        <p style={{ color: colors.muted, lineHeight: 1.6, marginBottom: "1.25rem" }}>
          Pick a game mode from the home screen to start a fresh round.
        </p>
        <button
          onClick={onHome}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3"
          style={{ background: gradients.brand, color: colors.white, fontFamily: fonts.heading, cursor: "pointer" }}
        >
          <Home aria-hidden="true" size={17} strokeWidth={2.5} />
          Back to home
        </button>
      </div>
    </div>
  );
}

function ScoreScreen({
  modeConfig,
  score,
  onPlayAgain,
  onHome,
}: {
  modeConfig: ModeTheme;
  score: number;
  onPlayAgain: () => void;
  onHome: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10" style={pageStyle}>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-3xl p-7 text-center"
        style={{ background: colors.white, border: borders.card, boxShadow: `0 10px 42px ${modeConfig.glow}` }}
      >
        <div className="mb-4 text-4xl">{modeConfig.emoji}</div>
        <p style={{ fontFamily: fonts.heading, color: modeConfig.color, fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          {modeConfig.label} complete
        </p>
        <h1 style={{ fontFamily: fonts.heading, color: colors.text, fontSize: "2.5rem", lineHeight: 1.05, marginBottom: "0.75rem" }}>
          You got {score}/5!
        </h1>
        <p style={{ color: colors.muted, fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{getScoreMessage(score)}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayAgain}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3"
            style={{ background: gradients.brand, color: colors.white, fontFamily: fonts.heading, cursor: "pointer" }}
          >
            <RotateCcw aria-hidden="true" size={17} strokeWidth={2.5} />
            Play again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onHome}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3"
            style={{ background: colors.softSurface, color: colors.muted, border: borders.softAction, fontFamily: fonts.heading, cursor: "pointer" }}
          >
            <Home aria-hidden="true" size={17} strokeWidth={2.5} />
            Back to home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

function GameHeader({
  modeConfig,
  currentIndex,
  totalQuestions,
  onHome,
}: {
  modeConfig: ModeTheme;
  currentIndex: number;
  totalQuestions: number;
  onHome: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-4">
      <button
        onClick={onHome}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2"
        style={{ background: "rgba(255,255,255,0.7)", color: colors.muted, border: "2px solid rgba(255,77,126,0.1)", fontFamily: fonts.heading, cursor: "pointer" }}
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={2.5} />
        Back
      </button>
      <div className="text-right">
        <p style={{ fontFamily: fonts.heading, color: modeConfig.color, fontSize: "1rem" }}>
          {modeConfig.emoji} {modeConfig.label}
        </p>
        <p style={{ color: colors.subtle, fontSize: "0.82rem", fontWeight: 800 }}>
          Round {currentIndex + 1} of {totalQuestions}
        </p>
      </div>
    </header>
  );
}

function ProgressBar({ modeConfig, progress }: { modeConfig: ModeTheme; progress: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.75)" }}>
      <motion.div
        className="h-full rounded-full"
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 130, damping: 22 }}
        style={{ background: `linear-gradient(135deg, ${modeConfig.color}, ${colors.accent})` }}
      />
    </div>
  );
}

function RoundCard({
  modeConfig,
  question,
  currentIndex,
  selected,
  hasAnswered,
  mood,
  isAdvancing,
  isLastQuestion,
  onSelect,
  onNext,
}: {
  modeConfig: ModeTheme;
  question: Question;
  currentIndex: number;
  selected: string | null;
  hasAnswered: boolean;
  mood: CharacterMood;
  isAdvancing: boolean;
  isLastQuestion: boolean;
  onSelect: (choiceId: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.main
      animate={{
        boxShadow: hasAnswered ? `0 14px 46px ${modeConfig.glow}` : `0 8px 40px ${modeConfig.glow}`,
      }}
      transition={{ duration: 0.28 }}
      className="relative overflow-hidden rounded-3xl px-4 pb-5 pt-6 sm:px-7 sm:pb-7"
      style={{ background: colors.white, border: borders.card }}
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
            style={{ background: colors.white, border: borders.card, boxShadow: shadows.card }}
          >
            <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: modeConfig.color, fontWeight: 800 }}>
              Scenario
            </p>
            <p style={{ color: colors.text, fontSize: "1rem", lineHeight: 1.6 }}>{question.scenario}</p>
          </div>

          <p className="mb-3 text-center" style={{ fontFamily: fonts.heading, color: colors.text, fontSize: "1.25rem" }}>
            {question.prompt}
          </p>

          <AnswerChoices
            modeConfig={modeConfig}
            question={question}
            selected={selected}
            hasAnswered={hasAnswered}
            onSelect={onSelect}
          />

          <ConversationPrompt modeConfig={modeConfig} question={question} visible={hasAnswered} />

          <NextQuestionButton
            visible={hasAnswered}
            isAdvancing={isAdvancing}
            isLastQuestion={isLastQuestion}
            onNext={onNext}
          />
        </motion.section>
      </AnimatePresence>
    </motion.main>
  );
}

function AnswerChoices({
  modeConfig,
  question,
  selected,
  hasAnswered,
  onSelect,
}: {
  modeConfig: ModeTheme;
  question: Question;
  selected: string | null;
  hasAnswered: boolean;
  onSelect: (choiceId: string) => void;
}) {
  return (
    <motion.div className="flex flex-col gap-2.5" variants={choicesVariants} initial="enter" animate="center">
      {question.choices.map((choice) => {
        const isCorrect = choice.correct;
        const isSelected = selected === choice.id;
        const revealCorrect = hasAnswered && isCorrect;
        const revealWrongSelection = hasAnswered && isSelected && !isCorrect;
        const bg = revealCorrect ? colors.correctBg : colors.white;
        const border = revealCorrect ? colors.correctBorder : revealWrongSelection ? borders.selectedWrong : borders.neutralChoice;
        const textColor = revealCorrect ? colors.correctText : hasAnswered && !isSelected ? colors.subtle : colors.text;
        const dotBg = revealCorrect ? colors.correctBorder : revealWrongSelection ? colors.primary : colors.neutralDot;

        return (
          <motion.button
            key={choice.id}
            variants={choiceVariants}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            whileHover={!hasAnswered ? { y: -2, borderColor: modeConfig.color, boxShadow: `0 8px 22px ${modeConfig.glow}` } : undefined}
            whileTap={!hasAnswered ? { scale: 0.985 } : undefined}
            onClick={() => onSelect(choice.id)}
            disabled={hasAnswered}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left"
            style={{ background: bg, border: `2px solid ${border}`, cursor: hasAnswered ? "default" : "pointer" }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs"
              style={{ background: dotBg, color: colors.white, fontFamily: fonts.heading, fontWeight: 700 }}
            >
              {choice.id.toUpperCase()}
            </span>
            <span style={{ color: textColor, fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35 }}>{choice.label}</span>
            {revealCorrect && <Check aria-hidden="true" className="ml-auto shrink-0" size={18} strokeWidth={3} style={{ color: colors.correctIcon }} />}
            {revealWrongSelection && <X aria-hidden="true" className="ml-auto shrink-0" size={18} strokeWidth={3} style={{ color: colors.primary }} />}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function ConversationPrompt({ modeConfig, question, visible }: { modeConfig: ModeTheme; question: Question; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="relative mt-4 overflow-hidden rounded-2xl px-4 py-4"
          style={{
            background: `linear-gradient(135deg, ${modeConfig.bg}, ${colors.white})`,
            border: `2px solid ${modeConfig.color}`,
            boxShadow: `0 12px 30px ${modeConfig.glow}, 0 3px 12px rgba(124,58,237,0.14)`,
          }}
        >
          <div
            className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full"
            style={{ background: modeConfig.color }}
          />
          <p style={{ color: colors.conversationText, fontSize: "0.95rem", lineHeight: 1.6 }}>
            <strong style={{ color: modeConfig.color, fontFamily: fonts.heading, fontSize: "1rem" }}>
              Talk together:
            </strong>{" "}
            {question.conversationPrompt}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NextQuestionButton({
  visible,
  isAdvancing,
  isLastQuestion,
  onNext,
}: {
  visible: boolean;
  isAdvancing: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.02, boxShadow: shadows.nextHover }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={isAdvancing}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-center"
          style={{
            background: gradients.brandReverse,
            color: colors.white,
            fontFamily: fonts.heading,
            fontSize: "1rem",
            cursor: isAdvancing ? "wait" : "pointer",
            opacity: isAdvancing ? 0.82 : 1,
          }}
        >
          {isLastQuestion ? "See score" : "Next Question"}
          <motion.span animate={{ x: isAdvancing ? 6 : 0 }} transition={{ duration: 0.18 }}>
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

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
    return <InvalidModeScreen onHome={() => navigate("/")} />;
  }

  const modeConfig = MODE_CONFIG[mode];
  const questions = gameSession.questions;
  const question = questions[currentIndex];
  const selectedChoice = selected ? question.choices.find((choice) => choice.id === selected) : undefined;
  const hasAnswered = Boolean(selectedChoice);
  const mood = !hasAnswered ? "idle" : selectedChoice?.correct ? "happy" : "thinking";
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleSelect(choiceId: string) {
    if (selected || isAdvancing) return;

    const choice = question.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    setSelected(choiceId);

    if (choice.correct) {
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
      <ScoreScreen
        modeConfig={modeConfig}
        score={score}
        onPlayAgain={handlePlayAgain}
        onHome={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen w-full px-5 py-6 sm:px-8 sm:py-8" style={pageStyle}>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <GameHeader modeConfig={modeConfig} currentIndex={currentIndex} totalQuestions={questions.length} onHome={() => navigate("/")} />
        <ProgressBar modeConfig={modeConfig} progress={progress} />
        <RoundCard
          modeConfig={modeConfig}
          question={question}
          currentIndex={currentIndex}
          selected={selected}
          hasAnswered={hasAnswered}
          mood={mood}
          isAdvancing={isAdvancing}
          isLastQuestion={currentIndex === questions.length - 1}
          onSelect={handleSelect}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
