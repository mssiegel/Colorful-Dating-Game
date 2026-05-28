import { ArrowRight, Check } from "lucide-react";
import { Character } from "./Character";
import { FloatingChip } from "./FloatingChip";
import { borders, colors, fonts, gradients, shadows } from "../visualTokens";

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
          style={{ background: colors.white, border: borders.card, boxShadow: shadows.card }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: fonts.body, color: colors.primary, fontWeight: 800 }}
          >
            Scenario · Round 1
          </p>
          <p style={{ fontFamily: fonts.body, color: colors.text, fontSize: "0.88rem", lineHeight: "1.55" }}>
            {QUESTION.scenario}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {QUESTION.choices.map((choice, index) => {
            const optionLabel = String.fromCharCode(97 + index);
            const isCorrect = choice === QUESTION.correctAnswer;
            const bg = isCorrect ? colors.correctBg : colors.white;
            const border = isCorrect ? `2px solid ${colors.correctBorder}` : `2px solid ${borders.neutralChoice}`;
            const textColor = isCorrect ? colors.correctText : colors.subtle;
            const dotBg = isCorrect ? colors.correctBorder : colors.neutralDot;

            return (
              <div
                key={choice}
                className="text-left rounded-xl px-3 py-2.5 flex items-center gap-3"
                style={{ background: bg, border }}
              >
                <span
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs"
                  style={{ background: dotBg, color: colors.white, fontFamily: fonts.heading, fontWeight: 700 }}
                >
                  {optionLabel.toUpperCase()}
                </span>
                <span style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: textColor, fontWeight: 600 }}>
                  {choice}
                </span>
                {isCorrect && <Check aria-hidden="true" className="ml-auto shrink-0" size={16} strokeWidth={3} style={{ color: colors.correctIcon }} />}
              </div>
            );
          })}
        </div>

        <div
          className="relative mt-3 overflow-hidden rounded-2xl px-4 py-3"
          style={{
            background: "linear-gradient(135deg, #f5f0ff, #fff7fb)",
            border: "2px solid rgba(124,58,237,0.42)",
            boxShadow: "0 10px 26px rgba(124,58,237,0.16), 0 3px 12px rgba(255,77,126,0.12)",
          }}
        >
          <div
            className="absolute bottom-2.5 left-0 top-2.5 w-1 rounded-r-full"
            style={{ background: colors.accent }}
          />
          <p style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: colors.conversationText, lineHeight: "1.55" }}>
            💬{" "}
            <strong style={{ color: colors.accent, fontFamily: fonts.heading, fontSize: "0.9rem" }}>
              Share a memory!
            </strong>{" "}
            {QUESTION.conversationPrompt}
          </p>
        </div>

        <div
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-center"
          style={{
            background: gradients.brandReverse,
            color: colors.white,
            fontFamily: fonts.heading,
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
