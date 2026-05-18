import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#06090e',
          surface: '#0c1219',
          elevated: '#111c26',
          overlay: '#162232',
        },
        border: {
          DEFAULT: '#1a2a3a',
          bright: '#2a3f54',
          glow: '#3a5570',
        },
        txt: {
          primary: '#dde6f0',
          secondary: '#6b8099',
          muted: '#3d5166',
          dim: '#253545',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          dim: '#0369a1',
          glow: 'rgba(14,165,233,0.15)',
        },
        energy: {
          DEFAULT: '#f59e0b',
          dim: '#92400e',
          glow: 'rgba(245,158,11,0.15)',
        },
        defense: {
          DEFAULT: '#22c55e',
          dim: '#14532d',
          glow: 'rgba(34,197,94,0.15)',
        },
        ai: {
          DEFAULT: '#3b82f6',
          dim: '#1e3a8a',
          glow: 'rgba(59,130,246,0.15)',
        },
        space: {
          DEFAULT: '#a855f7',
          dim: '#581c87',
          glow: 'rgba(168,85,247,0.15)',
        },
        cyber: {
          DEFAULT: '#ef4444',
          dim: '#7f1d1d',
          glow: 'rgba(239,68,68,0.15)',
        },
        up: '#22c55e',
        down: '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(26,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.4) 1px, transparent 1px)`,
        'grid-pattern-fine': `linear-gradient(rgba(26,42,58,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.2) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '48px 48px',
        'grid-fine': '24px 24px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
