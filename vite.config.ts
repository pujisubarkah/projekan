
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Vite will auto-detect postcss.config.cjs
export default defineConfig({
	plugins: [sveltekit()]
});
