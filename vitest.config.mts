import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        globals: true,
        include: ["./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        environment: "jsdom",
        setupFiles: "./tests/setup.ts",
        coverage: {
            provider: "v8",
            reporter: ["text", "html", "clover", "json"],
            reportsDirectory: "./tests/coverage",
        },
    },
})
