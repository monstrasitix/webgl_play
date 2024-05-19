// Node
import { resolve } from "path";

// Webpack
import { Configuration, NormalModuleReplacementPlugin } from "webpack";

// Plugins
import HTMLPlugin from "html-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

export type Env = {
    app?: string;
};

export function root(path: string): string {
    return resolve(__dirname, path);
}

/**
 * Default entry from `./source/apps` folder.
 */
const ENTRY = "interface";

class ResolveApp extends NormalModuleReplacementPlugin {
    constructor(app: string) {
        super(
            new RegExp(ENTRY, "i"),
            (resource) => {
                resource.request = resource.request.replace(ENTRY, app);
            },
        );
    }
}

export function common(env: Env): Configuration {
    const { app = ENTRY } = env;

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
        plugins: [
            new HTMLPlugin({
                template: root("./public/index.html"),
            }),
            new ResolveApp(app),
        ],
        resolve: {
            plugins: [new TsconfigPathsPlugin()],
            extensions: [".js", ".ts"],
        },
    };
}
