import "webpack-dev-server";

import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import { common, root } from "./webpack.common";

export default function(): Configuration {
    return merge(common(), {
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

