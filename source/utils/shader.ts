type ShaderType = WebGLRenderingContext[
    | "VERTEX_SHADER"
    | "FRAGMENT_SHADER"
];

export function createShader(
    gl: WebGLRenderingContext,
    type: ShaderType,
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
    vs: WebGLShader,
    fs: WebGLShader,
): WebGLProgram | null {
    const program = gl.createProgram();

    if (program) {
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        gl.linkProgram(program);
        gl.validateProgram(program);
    }

    return program;
}

export function validateShader(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    vs: WebGLShader,
    fs: WebGLShader,
) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`Link failed: ${gl.getProgramInfoLog(program)}`);
        console.error(`vs info-log: ${gl.getShaderInfoLog(vs)}`);
        console.error(`fs info-log: ${gl.getShaderInfoLog(fs)}`);
    }
}

export function quickShader(
    gl: WebGLRenderingContext,
    vSource: string,
    fSource: string,
): WebGLProgram | null {
    const vs = createShader(gl, gl.VERTEX_SHADER, vSource)!;
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fSource)!;
    const program = createProgram(gl, vs, fs)!;

    validateShader(gl, program, vs, fs);

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    return program;
}

