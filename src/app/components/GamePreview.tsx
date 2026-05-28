import { ArrowRight, Check } from "lucide-react";
import { Character } from "./Character";
import { FloatingChip } from "./FloatingChip";

const QUESTION = {
  scenario:
    "A friend is telling a story that is taking way longer than expected, but you can tell it matters to them, so you stay interested.",
  choices: ["Making space for someone", "Advanced nodding endurance", "Emergency story survival mode"],
  correctAnswer: "Making space for someone",
  conversationPrompt:
    "Tell your partner about a time someone made you feel heard, even when what you were saying was small.",
};

export function GamePreview() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between pt-6 pb-4">
      <div className="relative w-full h-28">
        <FloatingChip style={{ top: "10px", left: "5%" }} delay={0.1}>
          personal values 💡
        </FloatingChip>
        <FloatingChip style={{ top: "0px", right: "8%", background: "#fff8f5", borderColor: "rgba(124,58,237,0.2)" }} delay={0.5} className="hidden sm:block">
          wisdom check 🧠
        </FloatingChip>
        <FloatingChip style={{ bottom: "0px", left: "30%" }} delay={0.9}>
          share a memory ✨
        </FloatingChip>
      </div>

      <div className="mb-2">
        <Character mood="happy" />
      </div>

      <div className="w-full max-w-[340px] mx-auto">
        <div
          className="rounded-2xl p-4 mb-3"
          style={{ background: "white", border: "2px solid rgba(255,77,126,0.12)", boxShadow: "0 4px 20px rgba(255,77,126,0.08)" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: "Nunito, sans-serif", color: "#ff4d7e", fontWeight: 800 }}
          >
            Scenario · Round 1
          </p>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#1a0a2e", fontSize: "0.88rem", lineHeight: "1.55" }}>
            {QUESTION.scenario}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {QUESTION.choices.map((choice, index) => {
            const optionLabel = String.fromCharCode(97 + index);
            const isCorrect = choice === QUESTION.correctAnswer;
            const bg = isCorrect ? "#f0fdf4" : "white";
            const border = isCorrect ? "2px solid #34d399" : "2px solid rgba(0,0,0,0.08)";
            const textColor = isCorrect ? "#065f46" : "#9d8aaa";
            const dotBg = isCorrect ? "#34d399" : "#ececf0";

            return (
              <div
                key={choice}
                className="text-left rounded-xl px-3 py-2.5 flex items-center gap-3"
                style={{ background: bg, border }}
              >
                <span
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs"
                  style={{ background: dotBg, color: "white", fontFamily: "Fredoka, sans-serif", fontWeight: 700 }}
                >
                  {optionLabel.toUpperCase()}
                </span>
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.82rem", color: textColor, fontWeight: 600 }}>
                  {choice}
                </span>
                {isCorrect && <Check aria-hidden="true" className="ml-auto shrink-0" size={16} strokeWidth={3} style={{ color: "#10b981" }} />}
              </div>
            );
          })}
        </div>

        <div
          className="rounded-xl px-3 py-2.5 mt-2"
          style={{ background: "#f5f0ff", border: "2px solid rgba(124,58,237,0.2)" }}
        >
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.78rem", color: "#5b21b6", lineHeight: "1.5" }}>
            💬 <strong>Share a memory!</strong> {QUESTION.conversationPrompt}
          </p>
        </div>

        <div
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-center"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ff4d7e)",
            color: "white",
            fontFamily: "Fredoka, sans-serif",
            fontSize: "0.95rem",
            filter: "blur(1.5px)",
            opacity: 0.5,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          Next Question
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
