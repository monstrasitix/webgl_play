import { resolve } from "path";
import {
    Configuration,
    RuleSetRule,
    NormalModuleReplacementPlugin,
} from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import HTMLPlugin from "html-webpack-plugin";

const ENTRY = "interface";

export type Env = {
    app?: string;
};

export type EnvParams = {
    app: string;
    mode: string;
};

export function parseEnvs(env: Env): EnvParams {
    return {
        app: env.app ?? ENTRY,
        mode: "loop",
    };
}

export function root(path: string): string {
    return resolve(__dirname, path);
}

export function rule(obj: RuleSetRule): RuleSetRule {
    return {
        ...obj,
        exclude: [/node_modules/i],
    };
}

export function common(params: EnvParams): Configuration {
    const { app, mode } = parseEnvs(params);

    return {
        entry: {
            app: root(`./source/${mode}.ts`),
        },
        output: {
            clean: true,
            path: root("./dist"),
            filename: "[name].bundle.js",
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
            plugins: [new TsconfigPathsPlugin()],
            extensions: [".js", ".ts", ".json"],
        },
        plugins: [
            new HTMLPlugin({
                template: root("./public/index.html"),
            }),
            new NormalModuleReplacementPlugin(
                new RegExp(ENTRY, "i"),
                resource => {
                    resource.request = resource.request.replace(ENTRY, app);
                },
            ),
        ],
    };
}
