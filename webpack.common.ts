import { resolve } from "path";
import { Configuration, NormalModuleReplacementPlugin } from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import HTMLPlugin from "html-webpack-plugin";

const ENTRY = "interface";

export type Env = {
    app?: string;
};

export type EnvParams = {
    app: string;
};

export function parseEnvs(env: Env): EnvParams {
    return {
        app: env.app ?? ENTRY,
    };
}

export function root(path: string): string {
    return resolve(__dirname, path);
}

export function common(params: EnvParams): Configuration {
    const { app } = parseEnvs(params);

    return {
        entry: {
            [app]: root("./source/loop.ts"),
        },
        output: {
            clean: true,
            path: root("./dist"),
            filename: "[name].bundle.js",
        },
        module: {
            rules: [
                {
                    test: /\.ts$/i,
                    use: "esbuild-loader",
                    exclude: [/node_modules/i],
                },
                {
                    test: /\.glsl$/i,
                    use: "raw-loader",
                    exclude: [/node_modules/i],
                },
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
                (resource) => {
                    resource.request = resource.request.replace(ENTRY, app);
                },
            ),
        ],
    };
}
