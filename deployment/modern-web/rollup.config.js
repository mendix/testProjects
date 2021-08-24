const { join, relative } = require("path");
const {
    nodeResolve,
} = require("/tmp/mxbuild/modeler/tools/node/node_modules/@rollup/plugin-node-resolve");
const commonjs = require("/tmp/mxbuild/modeler/tools/node/node_modules/@rollup/plugin-commonjs");
const clear = require("/tmp/mxbuild/modeler/tools/node/node_modules/rollup-plugin-clear");
const esbuild = require("/tmp/mxbuild/modeler/tools/node/node_modules/rollup-plugin-esbuild");
const alias = require("/tmp/mxbuild/modeler/tools/node/node_modules/@rollup/plugin-alias");
const { babel } = require("/tmp/mxbuild/modeler/tools/node/node_modules/@rollup/plugin-babel");
const nodePolyfills = require("/tmp/mxbuild/modeler/tools/node/node_modules/rollup-plugin-node-polyfills");
const glob = require("/tmp/mxbuild/modeler/tools/node/node_modules/glob");
const dynamicImportToGlob = require("/source/tests/testProject/deployment/modern-web/dynamic-import-to-glob.js");
const JAVASCRIPT_SOURCE_PATH_REGEX = /javascriptsource/;

const mendixPages = {
    name: "rollup-plugin-mendix-pages",
    resolveDynamicImport(specifier, importer) {
        const importGlob = dynamicImportToGlob(specifier);
        if (importGlob === "./pages/*.js") {
            const files = glob.sync(join(__dirname, "./pages/*.js"));
            files.forEach((f) => {
                this.emitFile({
                    id: relative(__dirname, f),
                    fileName: relative(__dirname, f),
                    type: "chunk",
                    implicitlyLoadedAfterOneOf: [importer],
                });
            });
            return false;
        }
    },
    renderDynamicImport() {
        return {
            left: "import(",
            right: `+ "?${Date.now()}")`,
        };
    },
};

export default {
    input: "index.js",
    watch: {
        clearScreen: false,
    },
    output: {
        dir: "dist",
        format: "es",
        chunkFileNames: "[name].js",
        sourcemap: true,
        manualChunks(id) {
            if (id.includes("node_modules")) {
                return "commons";
            }
        },
    },
    treeshake: {
        // commented for now, as rollup stripped mobx configuration from index.ts
        // moduleSideEffects: false,
    },
    plugins: [
        nodePolyfills(),
        esbuild({
            // All options are optional
            sourceMap: true, // default
            exclude: JAVASCRIPT_SOURCE_PATH_REGEX,
            minify: process.env.NODE_ENV === "production",
            // Like @rollup/plugin-replace
            define: {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            },
            loaders: {
                // Enable JSX in .js files too
                ".js": "jsx",
            },
        }),
        alias({
            entries: {
                react: "/tmp/mxbuild/modeler/tools/node/node_modules/react",
                "big.js": "/tmp/mxbuild/modeler/tools/node/node_modules/big.js",
                "mendix-web": "/tmp/mxbuild/modeler/tools/node/node_modules/mendix-web",
            },
            customResolver: nodeResolve(),
        }),
        ignore(/react-native/),
        nodeResolve(),
        commonjs({ transformMixedEsModules: true }),
        // @rollup/plugin-babel must be placed after @rollup/plugin-commonjs
        babel({
            babelHelpers: "bundled",
            include: JAVASCRIPT_SOURCE_PATH_REGEX,
            presets: [
                [
                    "/tmp/mxbuild/modeler/tools/node/node_modules/@babel/preset-env",
                    { targets: { safari: "12" } },
                ],
            ],
            plugins: [
                "/tmp/mxbuild/modeler/tools/node/node_modules/@babel/plugin-syntax-dynamic-import",
            ],
        }),
        clear({
            targets: ["dist"],
            // watch: true,
        }),
        mendixPages,
    ],
};

function ignore(regex) {
    const emptyFile = "export default {}";
    const emptyFileName = "\0rollup_plugin_ignore_empty_module_placeholder";

    return {
        name: "ignore",
        resolveId(importee) {
            return importee === emptyFileName || regex.test(importee) ? emptyFileName : null;
        },
        load(id) {
            return id === emptyFileName ? emptyFile : null;
        },
    };
}
