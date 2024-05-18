export function createContext(): WebGLRenderingContext | null {
    return document.createElement("canvas").getContext("webgl");
}

export function resizeCanvas(gl: WebGLRenderingContext) {
    const exceedsWidth = gl.canvas.width !== innerWidth;
    const exceedsHeight = gl.canvas.height !== innerHeight;

    if (exceedsWidth) {
        gl.canvas.width = innerWidth;
    }

    if (exceedsHeight) {
        gl.canvas.height = innerHeight;
    }

    if (exceedsWidth || exceedsHeight) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
