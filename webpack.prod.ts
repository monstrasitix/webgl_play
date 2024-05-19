import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import { Env, common } from "./webpack.common";

export default function (env: Env): Configuration {
    return merge(common(env), {
        mode: "production",
    });
}
