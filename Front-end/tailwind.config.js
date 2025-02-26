/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: "#33302E", // Deep Charcoal for text
      accent: "#E63946",  // Muted Red for highlights
      background: "#F8F9FA", // Light Gray for UI
      secondary: "#E5E5E5", // Soft Neutral Gray for cards
      hover: "#457B9D", // Deep Cyan-Blue for buttons
      darkBg: "#1E1E1E", // Dark mode background
      darkCard: "#252526", // Dark mode cards
      highlight: "#FF7F50", // Coral Orange
    },
  },
  },
  plugins: [],
}

