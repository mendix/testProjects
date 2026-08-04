import {
    CopyRspackPlugin,
    CssExtractRspackPlugin,
    NormalModuleReplacementPlugin,
    rspack,
} from "file://C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/@rspack/core/dist/index.js";
import { glob } from "file://C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/glob/dist/esm/index.js";
import ServiceWorkerRspackPlugin from "file://C:/Program Files/Mendix/11.12.2/modeler/tools/node/rspack-plugin-mendix-serviceworker.mjs";

const JAVASCRIPT_SOURCE_PATH_REGEX = /javascriptsource/;
const PLUGGABLE_WIDGETS_PATH_REGEX = /[\\/]widgets[\\/]/;
const isProduction = process.env.NODE_ENV === "production";
const shouldGenerateSourceMaps = process.env.SOURCE_MAP_GENERATION === "enabled";
const shouldGenerateEmbeddedIndex = process.env.SHOULD_GENERATE_EMBEDDED_INDEX === "true";

export default {
    entry: () => {
        const pageFiles = glob.sync("./pages/**/*.js");

        const initialEntries = shouldGenerateEmbeddedIndex
            ? { "embedded-index": "./embedded-index.js", index: "./index.js" }
            : { index: "./index.js" };

        return pageFiles.reduce((entries, file) => {
            const normalizedPath = "./" + file.replace(/\\/g, "/");
            const name = normalizedPath.replace("./pages/", "").replace(".js", "");
            entries["pages/" + name] = normalizedPath;
            return entries;
        }, initialEntries);
    },
    experiments: {
        outputModule: true,
    },
    output: {
        module: true,
        library: {
            type: "module",
        },
        filename: (pathData) => {
            const isEntry =
                pathData.chunk?.name === "index" ||
                pathData.chunk?.name === "embedded-index" ||
                pathData.chunk.name?.startsWith("pages/");

            // See https://github.com/web-infra-dev/rspack/blob/main/crates/rspack_core/src/compiler/mod.rs#L406
            // where Rspack splits filename by "?" to get the actual file name and the optional query.
            const hash = process.env.CACHE_BUST ? "?" + process.env.CACHE_BUST : "";

            return isEntry
                ? "[name].js" + hash
                : isProduction
                    ? "chunks/[contenthash].js"
                    : "chunks/[name]-[contenthash].js";
        },
        chunkFilename: isProduction ? "chunks/[contenthash].js" : "chunks/[name]-[contenthash].js",
        chunkFormat: "module",
        clean: true,
    },
    mode: isProduction ? "production" : "development",
    devtool: shouldGenerateSourceMaps ? "source-map" : false,
    optimization: {
        runtimeChunk: "single", // create a single runtime bundle for all chunks to share the runtime code between them (helps with sharing react for example)
        splitChunks: {
            chunks: "all",
            minSize: isProduction ? 4096 : 1,
            cacheGroups: {
                styles: {
                    test: /\.css$/,
                    name: "widgets",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
        minimize: isProduction,
    },
    resolve: {
        modules: ["C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules", "node_modules"],
        alias: {
            "mx-api": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/mendix/mx-api",
            "mx-api/data": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/mendix/mx-api/data",
            "mx-api/parser": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/mendix/mx-api/parser",
            "mx-api/pwa": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/mendix/mx-api/pwa",
            "mx-api/session": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/mendix/mx-api/session",
            "mx-api/ui": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/mendix/mx-api/ui",

            // Rspack needs aliases to properly resolve modules that are imported by widgets with or without extension. Otherwise the build would fail with "Module not found" errors.
            "react/jsx-runtime": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/react/jsx-runtime.js",
            "react/jsx-runtime.js": "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/react/jsx-runtime.js",
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [JAVASCRIPT_SOURCE_PATH_REGEX, PLUGGABLE_WIDGETS_PATH_REGEX],
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "ecmascript",
                                jsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                            target: "es2020",
                        },
                        module: {
                            type: "es6",
                        },
                    },
                },
            },
            {
                test: /\.mjs$/,
                include: PLUGGABLE_WIDGETS_PATH_REGEX,

                // Temporary workaround for handling .mjs files in the pluggable widgets folder:
                // - Avoid Rspack parsing them as strict ESM to prevent missing exports errors
                // - Avoid ESModulesLinkingError for removed React APIs (findDOMNode in React 19)
                type: "javascript/auto",
            },
            {
                test: /\.css$/i,
                use: [
                    CssExtractRspackPlugin.loader,
                    {
                        loader: "C:/Program Files/Mendix/11.12.2/modeler/tools/node/node_modules/css-loader/dist/index.js",
                        options: {
                            sourceMap: shouldGenerateSourceMaps,
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new rspack.experiments.VirtualModulesPlugin({
            "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/empty-module.js": `export default {};`,
        }),
        new NormalModuleReplacementPlugin(/react-native/, "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/empty-module.js"),
        new CopyRspackPlugin({
            patterns: [
                {
                    from: "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets",
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ["**/*.js", "**/*.mjs", "**/*.css", "**/assets/**"],
                    },
                },
                {
                    context: "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets",
                    from: "**/assets/**",
                    noErrorOnMissing: true,
                },
            ],
        }),
        new CssExtractRspackPlugin({
            filename: "widgets.css",
        }),
        new ServiceWorkerRspackPlugin({
            deploymentDir: "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment",
        }),
    ],
};
