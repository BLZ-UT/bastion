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
          base: '#0c0a08',
          surface: '#16130f',
          elevated: '#1e1a15',
          overlay: '#28221a',
        },
        border: {
          DEFAULT: '#332c22',
          bright: '#524331',
          glow: '#6b5738',
        },
        txt: {
          primary: '#efe6d3',
          secondary: '#a3927a',
          muted: '#6b5f4e',
          dim: '#3a3226',
        },
        accent: {
          DEFAULT: '#c9963f',
          dim: '#7a5a26',
          bright: '#e0b262',
          glow: 'rgba(201,150,63,0.18)',
        },
        energy: {
          DEFAULT: '#c76b2e',
          dim: '#7a4218',
          glow: 'rgba(199,107,46,0.16)',
        },
        defense: {
          DEFAULT: '#6b7a3a',
          dim: '#3f4a1f',
          glow: 'rgba(107,122,58,0.16)',
        },
        ai: {
          DEFAULT: '#3f7288',
          dim: '#20404d',
          glow: 'rgba(63,114,136,0.16)',
        },
        space: {
          DEFAULT: '#7a5480',
          dim: '#452e4a',
          glow: 'rgba(122,84,128,0.16)',
        },
        cyber: {
          DEFAULT: '#9c3f30',
          dim: '#5c211a',
          glow: 'rgba(156,63,48,0.16)',
        },
        up: '#7a9c4e',
        down: '#b04a34',
        rivet: '#403626',
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(82,67,49,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(82,67,49,0.35) 1px, transparent 1px)`,
        'grid-pattern-fine': `linear-gradient(rgba(82,67,49,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(82,67,49,0.18) 1px, transparent 1px)`,
        'hazard-stripes': `repeating-linear-gradient(135deg, #c9963f 0, #c9963f 10px, #16130f 10px, #16130f 20px)`,
      },
      backgroundSize: {
        grid: '48px 48px',
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
