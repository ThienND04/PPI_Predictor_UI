/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // SciTech Blue palette
                scitech: {
                    primary: '#2563eb', // light primary
                    accent: '#38bdf8',
                    background: '#f9fafb',
                    surface: '#ffffff',
                    text: '#0f172a',
                    border: '#e5e7eb',
                    error: '#ef4444',
                    dark: {
                        primary: '#1e3a8a',
                        accent: '#0ea5e9',
                        background: '#0f172a',
                        surface: '#1e293b',
                        text: '#f9fafb',
                        border: '#334155',
                        error: '#f87171',
                    },
                },
            },
        },
    },
    plugins: [],
}
