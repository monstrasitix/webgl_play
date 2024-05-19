import "webpack-dev-server";

import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import { Env, common, root } from "./webpack.common";

export default function (env: Env): Configuration {
    return merge(common(env), {
        mode: "development",
        devServer: {
            port: 8080,
            hot: true,
            static: {
                directory: root("./public/"),
            },
        },
    });
}
