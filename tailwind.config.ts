import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                background: "rgba(var(--background))",
                border: "rgba(var(--border))",
                card: "rgba(var(--card))",
                cta: "rgba(var(--cta))",
                black: "rgba(var(--black))",
                white: "rgba(var(--white))",
            },
        },
    },
    plugins: [],
}
export default config
