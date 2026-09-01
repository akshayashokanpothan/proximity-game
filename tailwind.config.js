/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cred: {
          canvas: "#08080A",
          card: "#121216",
          cardHover: "#181820",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(255, 255, 255, 0.2)",
          lime: "#00FF66",
          amber: "#FFB800",
          crimson: "#FF3366",
          purple: "#8B5CF6",
          cyan: "#00F0FF",
          subtle: "#666675",
          muted: "#9999A8",
        },
        tier: {
          freezing: "#3B82F6",
          lukewarm: "#F59E0B",
          hot: "#F97316",
          extreme: "#EC4899",
          target: "#00FF66"
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cred-glow-lime': '0 0 25px -5px rgba(0, 255, 102, 0.4)',
        'cred-glow-amber': '0 0 25px -5px rgba(255, 184, 0, 0.4)',
        'cred-glow-crimson': '0 0 25px -5px rgba(255, 51, 102, 0.4)',
        'cred-glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'cred-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
