export function createLoop(callback: FrameRequestCallback) {
    let frameId = 0;
    let passed = 0;

    function onFrame(time: number) {
        callback(time - passed);
        passed = time;

        start();
    }

    function start() {
        frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
        cancelAnimationFrame(frameId);
    }

    return {
        start,
        stop,
    };
}

