export function createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string,
): WebGLShader | null {
    const shader = gl.createShader(type);

    if (shader) {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    }

    return shader;
}

export function createProgram(
    gl: WebGLRenderingContext,
    vertex: WebGLShader,
    fragment: WebGLShader,
): WebGLProgram | null {
    const program = gl.createProgram();

    if (program) {
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);

        gl.linkProgram(program);
        gl.validateProgram(program);
    }

    return program;
}
