import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte()],
	server: {
		port: 3000,
		host: "localhost",
		proxy: {
			"/api": "http://localhost:3001"
		}
	}
});
