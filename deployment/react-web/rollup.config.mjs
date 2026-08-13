import { nodeResolve } from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@rollup/plugin-node-resolve/dist/cjs/index.js";
import commonjs from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@rollup/plugin-commonjs/dist/cjs/index.js";
import { babel } from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@rollup/plugin-babel/dist/cjs/index.js";
import del from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/rollup-plugin-delete/dist/index.mjs";
import esbuild from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/rollup-plugin-esbuild/dist/index.mjs";
import styles from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/rollup-plugin-styles/dist/index.js";
import nodePolyfills from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/rollup-plugin-polyfill-node/dist/index.js";

import mendixCopy from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/rollup-plugin-mendix-copy.mjs";
import mendixPages from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/rollup-plugin-mendix-pages.mjs";
import mendixResolve from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/rollup-plugin-mendix-resolve.mjs";
import mendixOnlyWriteChanged from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/rollup-plugin-mendix-only-write-changed.mjs";
import mendixServiceWorker from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/rollup-plugin-mendix-serviceworker.mjs";
import sourcemaps from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/rollup-plugin-sourcemaps2/dist/index.js";
import alias from "file:///Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@rollup/plugin-alias/dist/index.js";

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
        chunkFileNames: isProduction ? "chunks/[hash].js" : "chunks/[name]-[hash].js",
        // `rollup-plugin-styles` computes the extracted CSS filename via Rollup's asset naming,
        // but calls this hook with a partial asset shape that uses `name` instead of `names`.
        assetFileNames: (assetInfo) => {
            const assetNames = assetInfo.names ?? (assetInfo.name ? [assetInfo.name] : []);

            return assetNames.some((name) => name === "widgets" || name === "widgets.css")
                ? "widgets.css"
                : "assets/[name]-[hash][extname]";
        },
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
        mendixPages(),
        mendixResolve(
            "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/web-resolutions.json",
            "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules",
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
            modulePaths: ["/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules"],
        }),
        commonjs({
            transformMixedEsModules: true,
            strictRequires: "auto",
            exclude: [
                "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/**",
                PLUGGABLE_WIDGETS_PATH_FILTER,
            ],
        }),
        babel({
            babelHelpers: "bundled",
            include: JAVASCRIPT_SOURCE_PATH_REGEX,
            presets: [
                [
                    "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@babel/preset-env",
                    { targets: { safari: "13" } },
                ],
            ],
            plugins: [
                "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@babel/plugin-syntax-dynamic-import",
            ],
        }),
        del({
            targets: "dist",
            runOnce: true,
        }),
        styles({
            config: false,
            mode: ["extract", "widgets.css"],
            minimize: isProduction,
            sourceMap: shouldGenerateSourceMaps ? "inline" : false,
            import: false,
            url: false,
            autoModules: true,
        }),
        mendixCopy({
            sources: [
                {
                    folder: "/Users/Grand.Julivan/repo/testProject2/deployment/web/widgets",
                    ignore: ["**/*.js", "**/*.mjs", "**/*.css", "**/assets/**"],
                    include: "**",
                },
                {
                    folder: "/Users/Grand.Julivan/repo/testProject2/deployment/web/widgets",
                    include: "**/assets/**",
                },
            ],
        }),
        mendixServiceWorker({
            deploymentDir: "/Users/Grand.Julivan/repo/testProject2/deployment",
        }),
        mendixOnlyWriteChanged(),
        alias({
            entries: {
                "mx-api": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api",
                "mx-api/data": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/data",
                "mx-api/parser": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/parser",
                "mx-api/session": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/session",
                "mx-api/ui": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/ui",
                "mx-api/pwa": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/pwa",
                react: "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react",
                "react-dom": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-dom",
                "react/jsx-runtime": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react/jsx-runtime",
                "react/jsx-dev-runtime":
                    "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react/jsx-dev-runtime",
                "big.js": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/big.js",
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
