import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type { StorybookConfig } from "@storybook/react-webpack5";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { swcConfig as SwcBuildConfig } from "./swc.build.ts";
import { swcConfig as SwcDevConfig } from "./swc.dev.ts";
import type { Options as SwcOptions } from "@swc/core";
import type { Options } from "@storybook/types";

const storybookConfig: StorybookConfig = {
    stories: [
        "../packages/**/*.stories.@(ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-webpack5-compiler-swc"
    ],
    framework: "@storybook/react-webpack5",
    docs: {
        autodocs: "tag"
    },
    swc: (_: SwcOptions, { configType }: Options): SwcOptions => {
        return configType === "PRODUCTION" ? SwcBuildConfig : SwcDevConfig;
    },
    webpackFinal(config, { configType }) {
        config.resolve = {
            ...config.resolve,
            plugins: [
                ...(config.resolve?.plugins || []),
                new TsconfigPathsPlugin({
                    configFile: "./tsconfig.json",
                    extensions: config.resolve?.extensions
                })
            ]
        };

        config.plugins = [
            ...(config.plugins ?? []),
            configType !== "PRODUCTION" && new ReactRefreshWebpackPlugin({
                overlay: {
                    sockIntegration: "whm"
                }
            })
        ].filter(Boolean);

        return config;
    }
};

export default storybookConfig;
