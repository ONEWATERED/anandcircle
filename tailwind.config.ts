import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['Roboto Mono', 'monospace'],
				display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				brand: {
					blue: '#1B3A57',
					cyan: '#00FFFF',
					purple: '#8A2BE2',
					gray: '#F5F7FA',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-left': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-right': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(180deg)' }
				},
				'pulse-travel': {
					'0%': { transform: 'translateX(0)', opacity: '0.3' },
					'50%': { transform: 'translateX(150%)', opacity: '0.8' },
					'100%': { transform: 'translateX(300%)', opacity: '0.3' }
				},
				'glowing': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-up': 'fade-up 0.7s ease-out forwards',
				'fade-down': 'fade-down 0.7s ease-out forwards',
				'fade-left': 'fade-left 0.7s ease-out forwards',
				'fade-right': 'fade-right 0.7s ease-out forwards',
				'flip': 'flip 0.5s ease-out forwards',
				'pulse-travel': 'pulse-travel 3s ease-in-out infinite',
				'glowing': 'glowing 6s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 4s ease-in-out infinite'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.perspective-1000': {
					perspective: '1000px',
				},
				'.transform-style-3d': {
					transformStyle: 'preserve-3d',
				},
				'.backface-hidden': {
					backfaceVisibility: 'hidden',
				},
				'.rotate-y-180': {
					transform: 'rotateY(180deg)',
				},
				'.hover-flip:hover .transform-style-3d': {
					transform: 'rotateY(180deg)',
				},
				'.glass-morphism': {
					backgroundColor: 'rgba(255, 255, 255, 0.05)',
					backdropFilter: 'blur(16px)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
				},
				'.glass-card': {
					backgroundColor: 'rgba(255, 255, 255, 0.08)',
					backdropFilter: 'blur(12px)',
					border: '1px solid rgba(255, 255, 255, 0.12)',
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
				},
				'.text-gradient-blue-purple': {
					background: 'linear-gradient(135deg, #1B3A57, #8A2BE2)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					backgroundClip: 'text',
					color: 'transparent'
				},
				'.text-gradient-purple-cyan': {
					background: 'linear-gradient(135deg, #8A2BE2, #00FFFF)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					backgroundClip: 'text',
					color: 'transparent'
				},
				'.text-gradient-cyan-blue': {
					background: 'linear-gradient(135deg, #00FFFF, #1B3A57)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					backgroundClip: 'text',
					color: 'transparent'
				},
				'.bg-gradient-blue-purple': {
					background: 'linear-gradient(135deg, #1B3A57, #8A2BE2)'
				},
				'.bg-gradient-purple-cyan': {
					background: 'linear-gradient(135deg, #8A2BE2, #00FFFF)'
				},
				'.bg-gradient-cyan-blue': {
					background: 'linear-gradient(135deg, #00FFFF, #1B3A57)'
				}
			};
			addUtilities(newUtilities);
		},
	],
} satisfies Config;
