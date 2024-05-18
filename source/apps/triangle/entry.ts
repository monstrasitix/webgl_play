import vertexShader from "@/app/triangle/vertex.glsl";
import fragmentShader from "@/app/triangle/fragment.glsl";

import { createProgram, createShader } from "@/utils/shader";
import { createContext, resizeCanvas } from "@/utils/canvas";

const gl = createContext()!;
const canvas = gl.canvas as HTMLElement;

export function setup() {
    document.body.appendChild(canvas);

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader)!;
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)!;

    const program = createProgram(gl, vertex, fragment)!;
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    const positionsSize = 2;
    const positions = new Float32Array([
        0.0, 0.0, //
        0.0, 0.5, //
        0.7, 0.0, //
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(
        positionLocation,
        positionsSize,
        gl.FLOAT,
        false,
        0,
        0,
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
}

export function update() {
    resizeCanvas(gl);
}

export function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

export function stop() {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.useProgram(null);
}
