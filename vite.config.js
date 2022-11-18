import { sveltekit } from "@sveltejs/kit/vite";

import inject from '@rollup/plugin-inject';

import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    return {
        plugins : [
            sveltekit(),
        ],

        build : {
            target: "es2020",
            rollupOptions : {
                plugins : [
                    // Important for wallet adapter to work.
                    inject({ Buffer: ['buffer', 'Buffer'] })
                ]
            }
        },
        
        // Important for wallet adapter to work.
        resolve: {
            alias: {
                path: 'path-browserify',
            },
        },

        optimizeDeps : {
            esbuildOptions : {
                target: "es2020",
            },
        },
    };
});
