import { nodeResolve } from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/@rollup/plugin-node-resolve/dist/cjs/index.js";
import commonjs from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/@rollup/plugin-commonjs/dist/cjs/index.js";
import { babel } from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/@rollup/plugin-babel/dist/cjs/index.js";
import del from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/rollup-plugin-delete/dist/index.mjs";
import esbuild from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/rollup-plugin-esbuild/dist/index.mjs";
import postcss from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/rollup-plugin-postcss/dist/index.js";
import nodePolyfills from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/rollup-plugin-polyfill-node/dist/index.js";

import mendixCopy from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/rollup-plugin-mendix-copy.mjs";
import mendixResolve from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/rollup-plugin-mendix-resolve.mjs";
import mendixOnlyWriteChanged from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/rollup-plugin-mendix-only-write-changed.mjs";
import mendixServiceWorker from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/rollup-plugin-mendix-serviceworker.mjs";
import sourcemaps from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/rollup-plugin-sourcemaps2/dist/index.js";
import alias from "file://C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/@rollup/plugin-alias/dist/index.js";

const JAVASCRIPT_SOURCE_PATH_REGEX = /javascriptsource/;
const MENDIX_PACKAGE_PATH_REGEX = /mendix/;
const PLUGGABLE_WIDGETS_PATH_FILTER = "./widgets/**";

const isProduction = process.env.NODE_ENV === "production";
const shouldGenerateSourceMaps = process.env.SOURCE_MAP_GENERATION === "enabled";
const shouldGenerateEmbeddedIndex = process.env.SHOULD_GENERATE_EMBEDDED_INDEX === "true";

export default {
    input: shouldGenerateEmbeddedIndex ? ["embedded-index.js", "index.js"] : ["index.js"],
    watch: {
        clearScreen: false,
        buildDelay: 1000,
    },
    output: {
        dir: "dist",
        format: "es",
        chunkFileNames: isProduction ? "[hash].js" : "[name]-[hash].js",
        sourcemap: shouldGenerateSourceMaps,
        minifyInternalExports: isProduction,
        experimentalMinChunkSize: isProduction ? 4096 : 1,
    },
    treeshake: isProduction,
    plugins: [
        ignore(/react-native/),
        shouldGenerateSourceMaps &&
            sourcemaps({
                include: [PLUGGABLE_WIDGETS_PATH_FILTER, JAVASCRIPT_SOURCE_PATH_REGEX, MENDIX_PACKAGE_PATH_REGEX],
            }),
        mendixResolve(
            "C:/Program Files/Mendix/11.9.1/modeler/tools/node/web-resolutions.json",
            "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules",
        ),
        nodePolyfills(),
        esbuild({
            sourceMap: shouldGenerateSourceMaps,
            exclude: [JAVASCRIPT_SOURCE_PATH_REGEX, PLUGGABLE_WIDGETS_PATH_FILTER],
            minify: isProduction,
            target: "ES2020",
            define: {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            },
            loaders: {
                // Enable JSX in .js files too
                ".js": "jsx",
            },
        }),
        nodeResolve({
            modulePaths: ["C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules"],
        }),
        commonjs({
            transformMixedEsModules: true,
            strictRequires: "auto",
            exclude: [
                "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/**",
                PLUGGABLE_WIDGETS_PATH_FILTER,
            ],
        }),
        babel({
            babelHelpers: "bundled",
            include: JAVASCRIPT_SOURCE_PATH_REGEX,
            presets: [
                [
                    "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/@babel/preset-env",
                    { targets: { safari: "13" } },
                ],
            ],
            plugins: [
                "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/@babel/plugin-syntax-dynamic-import",
            ],
        }),
        del({
            targets: "dist",
            runOnce: true,
        }),
        postcss({
            extract: "widgets.css",
            minimize: isProduction,
            sourcemap: shouldGenerateSourceMaps ? "inline" : false,
        }),
        mendixCopy({
            sources: [
                {
                    folder: "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/tree-node-web/tests/testProject/deployment/web/widgets",
                    exclude: [".js", ".mjs", ".css"],
                    include: "**",
                },
            ],
        }),
        mendixServiceWorker({
            deploymentDir: "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/tree-node-web/tests/testProject/deployment",
        }),
        mendixOnlyWriteChanged(),
        alias({
            entries: {
                "mx-api": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/mx-api",
                "mx-api/data": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/mx-api/data",
                "mx-api/parser":
                    "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/mx-api/parser",
                "mx-api/session":
                    "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/mx-api/session",
                "mx-api/ui": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/mx-api/ui",
                "mx-api/pwa": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/mendix/mx-api/pwa",
                "react": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/react",
                "react-dom": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/react-dom",
                "react/jsx-runtime": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/react/jsx-runtime",
                "react/jsx-dev-runtime": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/react/jsx-dev-runtime",
                "big.js": "C:/Program Files/Mendix/11.9.1/modeler/tools/node/node_modules/big.js",
            },
        }),
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
        resolveDynamicImport(specifier) {
            if ((typeof specifier === "string" && specifier === emptyFileName) || regex.test(specifier)) {
                return emptyFileName;
            }
        },
        load(id) {
            return id === emptyFileName ? emptyFile : null;
        },
    };
}
