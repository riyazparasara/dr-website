/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0A2A52",
                    light: "#153d6d",
                },
                accent: {
                    DEFAULT: "#2BB673",
                    hover: "#1f8a55",
                },
                "bg-main": "#F8FAFC",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
            },
            boxShadow: {
                premium: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
            },
        },
    },
    plugins: [],
};
