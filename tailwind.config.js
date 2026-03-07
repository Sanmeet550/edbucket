/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1E2A5A',
                    foreground: '#FFFFFF',
                },
                accent: {
                    DEFAULT: '#4FD1C5',
                    foreground: '#1E2A5A',
                },
                background: '#F8FAFC',
                card: {
                    DEFAULT: 'rgba(255, 255, 255, 0.7)',
                    dark: 'rgba(30, 42, 90, 0.7)',
                }
            },
            fontFamily: {
                heading: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(135deg, #6B73FF 0%, #8E54E9 100%)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '20px',
            },
            scale: {
                '200': '2',
            }
        },
    },
    plugins: [],
}
