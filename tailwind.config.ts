import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#13131a",
        card: "#1a1a24",
        border: "#2a2a3a",
        accent: {
          purple: "#c084fc",
          pink: "#f472b6",
        },
        muted: "#94a3b8",
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #c084fc, #f472b6)",
      },
    },
  },
  plugins: [],
};
export default config;
