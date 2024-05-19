export function createContext(): WebGLRenderingContext | null {
    return document.createElement("canvas").getContext("webgl");
}

export function resizeCanvas(gl: WebGLRenderingContext) {
    const widthChanged = gl.canvas.width !== innerWidth;
    const heightChanged = gl.canvas.height !== innerHeight;

    if (widthChanged) {
        gl.canvas.width = innerWidth;
    }

    if (heightChanged) {
        gl.canvas.height = innerHeight;
    }

    if (widthChanged || heightChanged) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
}
