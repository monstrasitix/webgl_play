import * as entry from "@/app/interface/entry";

import { createLoop } from "@/utils/loop";

entry.setup();

document.addEventListener("DOMContentLoaded", function () {
    const loop = createLoop(function () {
        entry.update();
        entry.render();
    });

    loop.start();

    setTimeout(function () {
        loop.stop();

        entry.stop();
    }, 1_000);
});
