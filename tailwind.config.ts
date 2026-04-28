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
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#94a3b8',
            'h2, h3, h4': { color: '#f1f5f9' },
            p: { lineHeight: '1.8', marginBottom: '1.25rem' },
            h2: { marginTop: '3.5rem', marginBottom: '1rem', fontSize: '1.5rem' },
            h3: { marginTop: '2.5rem', marginBottom: '0.75rem', fontSize: '1.25rem' },
            h4: { marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.125rem' },
            a: { color: '#c084fc', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            strong: { color: '#f1f5f9' },
            blockquote: { borderLeftColor: '#c084fc', color: '#94a3b8', fontStyle: 'italic' },
            code: { backgroundColor: '#13131a', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontSize: '0.875rem' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: { backgroundColor: '#13131a', borderRadius: '0.75rem' },
            hr: { borderColor: '#2a2a3a' },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
