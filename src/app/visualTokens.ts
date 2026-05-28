export const fonts = {
  heading: "Fredoka, sans-serif",
  body: "Nunito, sans-serif",
} as const;

export const colors = {
  text: "#1a0a2e",
  muted: "#6b5b7b",
  subtle: "#9d8aaa",
  pale: "#b0afc0",
  primary: "#ff4d7e",
  accent: "#7c3aed",
  conversationText: "#4c1d95",
  thinking: "#f59e0b",
  white: "#ffffff",
  correctBg: "#f0fdf4",
  correctBorder: "#34d399",
  correctText: "#065f46",
  correctIcon: "#10b981",
  neutralDot: "#ececf0",
  softSurface: "#f8f8fb",
} as const;

export const gradients = {
  page: "linear-gradient(160deg, #fff0f5 0%, #f8f4ff 50%, #fff5f0 100%)",
  brand: "linear-gradient(135deg, #ff4d7e, #7c3aed)",
  brandReverse: "linear-gradient(135deg, #7c3aed, #ff4d7e)",
} as const;

export const borders = {
  card: "2px solid rgba(255,77,126,0.12)",
  softCard: "2px solid rgba(255,77,126,0.08)",
  chip: "2px solid rgba(255,77,126,0.15)",
  softAction: "2px solid rgba(0,0,0,0.06)",
  neutralChoice: "rgba(0,0,0,0.08)",
  selectedWrong: "rgba(255,77,126,0.36)",
} as const;

export const shadows = {
  card: "0 4px 20px rgba(255,77,126,0.08)",
  floatingCard: "0 8px 40px rgba(124,58,237,0.1), 0 2px 12px rgba(255,77,126,0.08)",
  button: "0 6px 20px rgba(255,77,126,0.25)",
  buttonHover: "0 12px 32px rgba(255,77,126,0.3)",
  nextHover: "0 12px 32px rgba(255,77,126,0.24)",
  choiceRest: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
} as const;

export const pageStyle = {
  fontFamily: fonts.body,
  background: gradients.page,
} as const;
