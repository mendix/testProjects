
const configUtils = require("/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native/metro-config/dist");
const fs = require("fs");
const path = require("path");

// On Windows, virtual drives (e.g. Z:) can be resolved by fs.realpathSync.native
// to their underlying UNC paths (e.g. //Mac/Home/...). This breaks Metro because
// projectRoot and watchFolders end up on different roots.
function safeRealpathSync(filePath) {
    const real = fs.realpathSync.native(filePath);
    if (process.platform === "win32" && path.parse(real).root !== path.parse(filePath).root) {
        return path.resolve(filePath);
    }
    return real;
}

const projectRoot = safeRealpathSync(__dirname);
const modelerNodeRoot = safeRealpathSync("/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node");

const metroConfig = {
    projectRoot,
    watchFolders: [
        safeRealpathSync("/Users/Grand.Julivan/repo/testProject2/theme"),
        safeRealpathSync("/Users/Grand.Julivan/repo/testProject2/javascriptsource"),
        safeRealpathSync("/Users/Grand.Julivan/repo/testProject2/themesource"),
        safeRealpathSync("/Users/Grand.Julivan/repo/testProject2/.mendix-cache/modules"),
        modelerNodeRoot,
    ],
    resolver: {
        useWatchman: false,
        platforms: ["ios", "android"],
        sourceExts: ["native.js", "js", "jsx", "ts", "tsx", "cjs", "mjs", "json", "js_commonjs-exports", "js_commonjs-module"],
        extraNodeModules: {
            "@babel/runtime": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@babel/runtime",
            "big.js": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/big.js",
            "react": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react",
            "react-dom": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-dom",
            "react-native-gesture-handler": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-gesture-handler",
            "react-native": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native",
            "hermes-compiler": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/hermes-compiler",
            "@react-native-community/cli": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-community/cli",
            "@react-native-community/cli-platform-android": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-community/cli-platform-android",
            "@react-native-community/cli-platform-ios": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-community/cli-platform-ios",
            "react-native-device-info": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-device-info",
            "react-native-material-menu": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-material-menu",
            "@react-navigation/bottom-tabs": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-navigation/bottom-tabs",
            "@react-navigation/core": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-navigation/core",
            "@react-navigation/drawer": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-navigation/drawer",
            "@react-navigation/native": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-navigation/native",
            "@react-navigation/stack": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-navigation/stack",
            "@react-navigation/native-stack": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-navigation/native-stack",
            "react-native-svg": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-svg",
            "react-native-tab-view": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-tab-view",
            "@react-native-vector-icons/common": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-vector-icons/common",
            "@d11/react-native-fast-image": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@d11/react-native-fast-image",
            "@shopify/flash-list": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@shopify/flash-list",
            "react-native-screens": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-screens",
            "react-native-localize": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-localize",
            "react-native-reanimated": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-reanimated",
            "react-native-worklets": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-worklets",
            "react-native-safe-area-context": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-safe-area-context",
            "react-native-blob-util": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/react-native-blob-util",
            "@react-native-async-storage/async-storage": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-async-storage/async-storage",
            "@react-native-community/datetimepicker": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-community/datetimepicker",
            "eventemitter3": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/eventemitter3",
            "@react-native-picker/picker": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native-picker/picker",
            "deprecated-react-native-prop-types": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/deprecated-react-native-prop-types",
            "@react-native/metro-config": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@react-native/metro-config",
            "@rollup/plugin-alias": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/@rollup/plugin-alias",
            "mendix": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix",
            "mx-global": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mx-global",
            "mx-api": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api",
            "mx-api/data": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/data",
            "mx-api/parser": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/parser",
            "mx-api/session": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/session",
            "mx-api/ui": "/Applications/Mendix Studio Pro 11.12.0 Beta.app/Contents/modeler/tools/node/node_modules/mendix/mx-api/ui"
        }
    },
    cacheVersion: "sha.00404e82",
};

module.exports = configUtils.mergeConfig(configUtils.getDefaultConfig(__dirname), metroConfig);
