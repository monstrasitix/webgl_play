import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import { common } from "./webpack.common";

export default function(): Configuration {
    return merge(common(), {
        mode: "production",
    });
}

