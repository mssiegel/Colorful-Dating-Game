import { useEffect, useState } from "react";
import { MODE_CONFIG, QUESTIONS, isModeId, sampleQuestions, type ModeConfig, type ModeId, type Question } from "./data/questions";

export type CharacterMood = "idle" | "happy" | "thinking";
export type ModeTheme = Omit<ModeConfig, "id">;

type SampledSession = { mode: ModeId | null; questions: Question[] };

export function useGameSession(routeMode: string | undefined) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [session, setSession] = useState<SampledSession>(() => ({
    mode: isModeId(routeMode) ? routeMode : null,
    questions: isModeId(routeMode) ? sampleQuestions(QUESTIONS[routeMode]) : [],
  }));

  useEffect(() => {
    if (!isModeId(routeMode)) {
      if (session.mode !== null) {
        setSession({ mode: null, questions: [] });
      }

      return;
    }

    if (session.mode === routeMode) return;

    setSession({ mode: routeMode, questions: sampleQuestions(QUESTIONS[routeMode]) });
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setIsAdvancing(false);
  }, [routeMode, session.mode]);

  const mode = isModeId(routeMode) ? routeMode : null;
  const modeConfig = mode ? MODE_CONFIG[mode] : null;
  const questions = session.questions;
  const question = questions[currentIndex] ?? null;
  const selectedChoice = selected && question ? question.choices.find((choice) => choice.id === selected) : undefined;
  const hasAnswered = Boolean(selectedChoice);
  const mood: CharacterMood = !hasAnswered ? "idle" : selectedChoice?.correct ? "happy" : "thinking";
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  function selectChoice(choiceId: string) {
    if (!question || selected || isAdvancing) return;

    const choice = question.choices.find((item) => item.id === choiceId);
    if (!choice) return;

    setSelected(choiceId);

    if (choice.correct) {
      setScore((currentScore) => currentScore + 1);
    }
  }

  function nextQuestion() {
    if (!hasAnswered || isAdvancing) return;

    setIsAdvancing(true);

    if (isLastQuestion) {
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

  function playAgain() {
    if (!mode) return;

    setSession({ mode, questions: sampleQuestions(QUESTIONS[mode]) });
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setIsAdvancing(false);
  }

  return {
    isValidMode: Boolean(mode),
    mode,
    modeConfig,
    question,
    currentIndex,
    selected,
    score,
    done,
    isAdvancing,
    hasAnswered,
    mood,
    progress,
    totalQuestions,
    isLastQuestion,
    selectChoice,
    nextQuestion,
    playAgain,
  };
}

