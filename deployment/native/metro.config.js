
const configUtils = require("C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native/metro-config/dist");
const path = require("path");

const metroConfig = {
    watchFolders: [
        path.resolve(__dirname, "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/bubble-chart-web/tests/testProject/theme"),
        path.resolve(__dirname, "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/bubble-chart-web/tests/testProject/javascriptsource"),
        path.resolve(__dirname, "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/bubble-chart-web/tests/testProject/themesource"),
        path.resolve(__dirname, "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules"),
    ],
    resolver: {
        useWatchman: false,
        platforms: ["ios", "android"],
        sourceExts: ["native.js", "js", "jsx", "ts", "tsx", "cjs", "mjs", "json", "js_commonjs-exports", "js_commonjs-module"],
        extraNodeModules: {
            "@babel/runtime": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@babel/runtime",
            "big.js": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/big.js",
            "react": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react",
            "react-dom": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-dom",
            "react-native-gesture-handler": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-gesture-handler",
            "react-native": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native",
            "@react-native-community/cli": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-community/cli",
            "@react-native-community/cli-platform-android": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-community/cli-platform-android",
            "@react-native-community/cli-platform-ios": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-community/cli-platform-ios",
            "react-native-device-info": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-device-info",
            "react-native-material-menu": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-material-menu",
            "@react-navigation/bottom-tabs": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-navigation/bottom-tabs",
            "@react-navigation/core": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-navigation/core",
            "@react-navigation/drawer": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-navigation/drawer",
            "@react-navigation/native": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-navigation/native",
            "@react-navigation/stack": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-navigation/stack",
            "react-native-svg": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-svg",
            "react-native-tab-view": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-tab-view",
            "react-native-vector-icons": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-vector-icons",
            "react-native-fast-image": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-fast-image",
            "react-native-screens": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-screens",
            "react-native-localize": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-localize",
            "react-native-reanimated": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-reanimated",
            "react-native-safe-area-context": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-safe-area-context",
            "react-native-blob-util": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/react-native-blob-util",
            "@react-native-async-storage/async-storage": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-async-storage/async-storage",
            "@react-native-community/datetimepicker": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-community/datetimepicker",
            "@react-native-masked-view/masked-view": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-masked-view/masked-view",
            "eventemitter3": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/eventemitter3",
            "@react-native-picker/picker": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native-picker/picker",
            "deprecated-react-native-prop-types": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/deprecated-react-native-prop-types",
            "metro-file-map": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/metro-file-map",
            "@react-native/metro-config": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@react-native/metro-config",
            "@rollup/plugin-alias": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/@rollup/plugin-alias",
            "mendix": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/mendix",
            "mx-global": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/mx-global",
            "mx-api": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/mendix/mx-api",
            "mx-api/data": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/mendix/mx-api/data",
            "mx-api/session": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/mendix/mx-api/session",
            "mx-api/ui": "C:/Program Files/Mendix/10.24.0.73019/modeler/tools/node/node_modules/mendix/mx-api/ui"
        }
    },
    cacheVersion: "73019",
};

module.exports = configUtils.mergeConfig(configUtils.getDefaultConfig(__dirname), metroConfig);
