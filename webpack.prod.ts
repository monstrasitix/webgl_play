import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import { EnvParams, common } from "./webpack.common";

export default function (env: EnvParams): Configuration {
    return merge(common(env), {
        mode: "production",
    });
}
