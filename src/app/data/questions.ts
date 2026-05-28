export interface Option {
  id: string;
  label: string;
  correct: boolean;
}

export interface Question {
  scenario: string;
  prompt: string;
  options: Option[];
  conversationPrompt: string;
}

export type ModeId = "date-night" | "deep-dive" | "long-distance";

export const QUESTIONS: Record<ModeId, Question[]> = {
  "date-night": [
    {
      scenario: "A friend suggests a restaurant you don't love, but they seem excited about it.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Choosing connection over preference", correct: true },
        { id: "b", label: "A serious food emergency", correct: false },
        { id: "c", label: "Proof that menus are too long", correct: false },
      ],
      conversationPrompt: "Tell about a time you went along with something small because it mattered to someone else.",
    },
    {
      scenario: "A friend picks a movie that looks terrible, but they are clearly excited to watch it.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "A tragic failure of cinema", correct: false },
        { id: "b", label: "Being open-minded", correct: true },
        { id: "c", label: "Popcorn-related bravery", correct: false },
      ],
      conversationPrompt: "Share a funny memory of something you expected to dislike but ended up enjoying.",
    },
    {
      scenario: "A friend finally finishes a small task they have been avoiding, and you celebrate like they won an Olympic medal.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Encouragement", correct: true },
        { id: "b", label: "Overuse of imaginary confetti", correct: false },
        { id: "c", label: "Professional clapping skills", correct: false },
      ],
      conversationPrompt: "Tell about a small win you had recently that deserved more celebration than it got.",
    },
    {
      scenario: "There is one cookie left. You want it, but a friend looks at it like it is their long-lost soulmate.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Dessert diplomacy", correct: false },
        { id: "b", label: "Generosity", correct: true },
        { id: "c", label: "A cookie emergency hotline", correct: false },
      ],
      conversationPrompt: "Share a memory of a tiny sacrifice someone made that actually meant a lot.",
    },
    {
      scenario: "A friend confidently leads you the wrong way, and instead of getting annoyed, you turn it into a mini adventure.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Flexibility", correct: true },
        { id: "b", label: "Advanced wandering", correct: false },
        { id: "c", label: "Map betrayal", correct: false },
      ],
      conversationPrompt: "Tell about a time a plan went wrong but turned into a good story.",
    },
  ],

  "deep-dive": [
    {
      scenario: "You promised to help with something, but now you're tired and hoping the other person forgets.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Responsibility", correct: true },
        { id: "b", label: "Strategic invisibility", correct: false },
        { id: "c", label: "Creative scheduling", correct: false },
      ],
      conversationPrompt: "Tell about a time keeping your word was harder than you expected.",
    },
    {
      scenario: "A friend asks what happened, and a small lie would make you look better.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Story editing", correct: false },
        { id: "b", label: "Honesty", correct: true },
        { id: "c", label: "Emergency reputation repair", correct: false },
      ],
      conversationPrompt: "Share a time when telling the truth felt uncomfortable but important.",
    },
    {
      scenario: "You helped make something succeed, but no one notices. You can either point it out or let the moment pass.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Humility", correct: true },
        { id: "b", label: "Invisible trophy collecting", correct: false },
        { id: "c", label: "Waiting for dramatic applause", correct: false },
      ],
      conversationPrompt: "Tell about a time you did something good that most people never saw.",
    },
    {
      scenario: "A friend did something that bothered you. You want to avoid it, but you know the honest conversation may help.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Courage", correct: true },
        { id: "b", label: "Emotional parkour", correct: false },
        { id: "c", label: "Professional topic dodging", correct: false },
      ],
      conversationPrompt: "Share a memory of a conversation you were nervous to have but were glad you had.",
    },
    {
      scenario: "You find a way to take a shortcut that no one would notice, but it would not feel right.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Secret efficiency", correct: false },
        { id: "b", label: "Integrity", correct: true },
        { id: "c", label: "Becoming a loophole detective", correct: false },
      ],
      conversationPrompt: "Tell about a time you made the right choice even though no one would have known.",
    },
  ],

  "long-distance": [
    {
      scenario: "You only have ten minutes to talk, but instead of being distracted, you give a friend your full attention.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Presence", correct: true },
        { id: "b", label: "Efficient multitasking", correct: false },
        { id: "c", label: "Advanced phone-holding skills", correct: false },
      ],
      conversationPrompt: "Tell about a small moment when you felt truly listened to.",
    },
    {
      scenario: "Nothing major happened today, but you still share one tiny detail that would usually be easy to skip.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Sharing life", correct: true },
        { id: "b", label: "Breaking news about sandwiches", correct: false },
        { id: "c", label: "International snack reporting", correct: false },
      ],
      conversationPrompt: "Share one small detail from your day that the other person might not know unless you told them.",
    },
    {
      scenario: "A friend mentioned something important recently. Later, you remember to ask how it went.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Careful attention", correct: true },
        { id: "b", label: "Calendar wizardry", correct: false },
        { id: "c", label: "Memory showing off", correct: false },
      ],
      conversationPrompt: "Tell about a time someone remembered a small detail about you and it made you feel cared for.",
    },
    {
      scenario: "A friend seems quieter than usual. Instead of assuming the worst, you stay kind and give them room to explain.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Trust", correct: true },
        { id: "b", label: "Detective mode", correct: false },
        { id: "c", label: "Emotional weather forecasting", correct: false },
      ],
      conversationPrompt: "Talk about what helps you feel safe opening up when something is on your mind.",
    },
    {
      scenario: "Life feels busy, so you suggest one simple thing to enjoy together soon.",
      prompt: "What does this represent?",
      options: [
        { id: "a", label: "Hope", correct: true },
        { id: "b", label: "Scheduling with feelings", correct: false },
        { id: "c", label: "Imaginary calendar decoration", correct: false },
      ],
      conversationPrompt: "Share one small thing you would love to do together soon.",
    },
  ],
};

export const MODE_CONFIG: Record<ModeId, { label: string; emoji: string; color: string; bg: string; glow: string }> = {
  "date-night": {
    label: "Date Night",
    emoji: "🕯️",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    glow: "rgba(245,158,11,0.3)",
  },
  "deep-dive": {
    label: "Deep Dive",
    emoji: "🧠",
    color: "#ff4d7e",
    bg: "rgba(255,77,126,0.15)",
    glow: "rgba(255,77,126,0.3)",
  },
  "long-distance": {
    label: "Long Distance",
    emoji: "💌",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.15)",
    glow: "rgba(124,58,237,0.3)",
  },
};
