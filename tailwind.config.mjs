export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Titles සඳහා Premium Serif Font එක
        serif: ["var(--font-playfair)", "serif"],
        // Body Text සඳහා Clean Sans Font එක
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        // Food Color Psychology වර්ණ
        nutriBg: "#FAF9F5",      // Premium Off-White
        nutriDark: "#1E293B",    // Deep Slate
        nutriPrimary: "#0F766E", // Premium Emerald Green
        nutriAccent: "#D97706",  // Warm Amber
      },
    },
  },
  plugins: [],
};