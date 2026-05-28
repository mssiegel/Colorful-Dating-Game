import { motion } from "motion/react";
import { borders, colors, fonts } from "../visualTokens";

export function FloatingChip({
  children,
  style,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
        y: { duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute px-4 py-2 rounded-full text-sm shadow-md${className ? ` ${className}` : ""}`}
      style={{
        background: colors.white,
        fontFamily: fonts.body,
        fontWeight: 700,
        color: colors.text,
        border: borders.chip,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
