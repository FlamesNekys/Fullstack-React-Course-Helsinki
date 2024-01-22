/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                appear: 'opacity 5s cubic-bezier(0.4, 0, 0.6, 1)',
            },
            keyframes: {
                opacity: {
                    '0%': { opacity: '0' },
                    '25%': { opacity: '1' },
                    '75%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
        },
    },
    plugins: [],
}

