/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                iron: {
                    gold: '#C5A059',
                    dark: '#0A192F',
                    light: '#F8F9FA',
                    accent: '#112240',
                    slate: '#8892b0',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
