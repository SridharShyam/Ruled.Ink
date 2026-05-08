/*
 * RULED.INK — Personalization File
 * This is the only file you need to edit to make Ruled.Ink yours.
 * Change your name, schedule, skills, and default tasks here.
 * Everything else — logic, UI, features — stays the same.
 */

// ─────────────────────────────────────────
// RULED.INK — User Configuration
// Edit this file to personalize your system
// ─────────────────────────────────────────

export const USER = {
  name: "Shyam", // Default name
  wakeTime: "06:00",
  collegeStart: "09:00",
  collegeEnd: "17:00",
  commuteMinutes: 30,
  sleepTime: "22:00",
}

export const DEFAULT_SCHEDULE = [
  { time: "06:00", end: "08:00", name: "Wake up + Morning prep", sub: "Freshen up · Light study", type: "free" },
  { time: "08:00", end: "09:00", name: "Travel", sub: "Commute → listen, read, think", type: "travel" },
  { time: "09:00", end: "13:00", name: "College — Morning", sub: "Morning classes", type: "college" },
  { time: "13:00", end: "14:00", name: "Lunch break", sub: "Eat · Rest", type: "lunch" },
  { time: "14:00", end: "17:00", name: "College — Afternoon", sub: "Afternoon classes", type: "college" },
  { time: "17:00", end: "18:00", name: "Travel home", sub: "Commute back", type: "travel" },
  { time: "18:00", end: "19:00", name: "Assignments", sub: "Complete pending work", type: "assign" },
  { time: "19:00", end: "20:30", name: "Skill building", sub: "Learning · Projects · Practice", type: "skill" },
  { time: "20:30", end: "21:30", name: "Content creation", sub: "Write · Record · Post", type: "content" },
  { time: "21:30", end: "22:00", name: "Wind down", sub: "Review · Plan tomorrow", type: "free" },
  { time: "22:00", end: "06:00", name: "Sleep", sub: "Rest · Non-negotiable", type: "sleep" },
]

export const DEFAULT_SKILLS = [
  { id: 's1', name: "GNN Mastery", topic: "Backpropagation in GNNs", pct: 45, color: "#5c7a5c", icon: "📘" },
  { id: 's2', name: "MLOps", topic: "Model Deployment with BentoML", pct: 30, color: "#7a6c9e", icon: "📊" },
  { id: 's3', name: "Distributed Systems", topic: "Raft Consensus Algorithm", pct: 60, color: "#c47c4a", icon: "⌨" },
]

export const DEFAULT_TASKS = [
  { id: 1, text: "Master Neural Network backpropagation", completed: false, type: "skill" },
  { id: 2, text: "Draft YouTube script for GNN explanation", completed: false, type: "content" },
  { id: 3, text: "Submit OS assignment batch 1", completed: true, type: "assign" },
  { id: 4, text: "Leetcode: Solve 3 medium array problems", completed: false, type: "skill" },
  { id: 5, text: "Attend Distributed Systems lecture", completed: false, type: "college" },
  { id: 6, text: "Review feedback on Portfolio mission", completed: false, type: "projects" },
]

export const DEFAULT_PROJECTS = [
  { id: 1, name: 'Neural-Vis Three.js', description: 'Interactive 3D visualization of Graph Neural Networks using Three.js and React.', status: 'Building', progress: 65, stack: ['React', 'Three.js', 'GNN'], github: 'https://github.com/shyam/ruled-ink', live: 'https://ruled-ink.vercel.app', deadline: '2026-05-20' },
  { id: 2, name: 'Personal OS', description: 'A productivity dashboard for CS students inspired by notebook aesthetics.', status: 'Building', progress: 85, stack: ['React', 'Tailwind', 'Vite'], github: 'https://github.com/shyam/ruled-ink', live: 'https://ruled-ink.vercel.app', deadline: '2026-05-15' },
  { id: 3, name: 'Distributed Crawler', description: 'High-performance web crawler with distributed task management.', status: 'Idea', progress: 10, stack: ['Go', 'Redis', 'Docker'], github: 'https://github.com/shyam/crawler', deadline: '2026-06-01' },
  { id: 4, name: 'Algo-Trade Bot', description: 'Trading bot using reinforcement learning for crypto assets.', status: 'On Hold', progress: 40, stack: ['Python', 'PyTorch', 'Binance API'], github: 'https://github.com/shyam/trade-bot', deadline: '2026-04-10' },
]

export const DEFAULT_IDEAS = [
  "Building a distributed crawler in Go",
  "GNNs vs CNNs: When to use which?",
  "My MLOps stack for 2026",
  "Why notebook UI is the future of productivity",
]

export const CONTENT_TARGETS = {
  linkedin: 3,    // posts per week
  instagram: 2,   // posts per week
  youtube: 0.5,   // posts per week (1 every 2 weeks = 0.5)
}
