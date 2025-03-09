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
                foreground: "rgba(var(--foreground))",
                border: "rgba(var(--border))",

                buttonPrimary: "rgba(var(--button-primary))",
                buttonSecondary: "rgba(var(--button-secondary))",
                card: "rgba(var(--card))",
                cta: "rgba(var(--cta))",

                textPrimary: "rgba(var(--text-primary))",
                textSecondary: "rgba(var(--text-secondary))",

                black: "rgba(var(--black))",
                white: "rgba(var(--white))",

                purple: "rgba(var(--purple))",
                lavender: "rgba(var(--lavender))",
                red: "rgba(var(--red))",
                ltRed: "rgba(var(--lt-red))",
                dkGrey: "rgba(var(--dk-grey))",
                ltGrey: "rgba(var(--lt-grey))",
            },
        },
    },
    plugins: [],
}
export default config
