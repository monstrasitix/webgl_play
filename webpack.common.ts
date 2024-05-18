import { resolve } from "path";
import { Configuration, RuleSetRule } from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import HTMLPlugin from "html-webpack-plugin";

export function root(path: string): string {
    return resolve(__dirname, path);
}

export function rule(obj: RuleSetRule): RuleSetRule {
    return {
        ...obj,
        exclude: [/node_modules/i],
    };
}

export function common(): Configuration {
    return {
        entry: {
            app: root("./source/index.ts"),
        },
        output: {
            filename: "[name].bundle.js",
            clean: true,
            path: root("./dist"),
        },
        module: {
            rules: [
                rule({
                    test: /\.ts$/i,
                    use: "esbuild-loader",
                }),
                rule({
                    test: /\.glsl$/i,
                    use: "raw-loader",
                }),
            ],
        },
        resolve: {
            plugins: [
                new TsconfigPathsPlugin(),
            ],
            extensions: [
                ".js",
                ".ts",
                ".json",
                ".glsl",
            ],
        },
        plugins: [
            new HTMLPlugin({
                template: root("./public/index.html"),
            }),
        ],
    };
}

