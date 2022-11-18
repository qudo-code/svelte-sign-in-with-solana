import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess : preprocess({
        styles : {
            default : "scss",
        },
    }),

    kit : {
        adapter : adapter(),

        alias : {
            src : "./src",
        },
        env : {
            publicPrefix : "MATR_",
        },
    },
};

export default config;
