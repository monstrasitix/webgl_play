// Data
import POSITIONS from "@/app/triangle/positions";

// Shaders
import vertexShader from "@/app/triangle/vertex.glsl";
import fragmentShader from "@/app/triangle/fragment.glsl";

// Utilities
import { COLOR_GREY } from "@/utils/color";
import { quickShader } from "@/utils/shader";
import { createContext, resizeCanvas } from "@/utils/canvas";

const gl = createContext()!;
const canvas = gl.canvas as HTMLElement;

document.body.appendChild(canvas);

export function setup() {
    gl.clearColor(...COLOR_GREY, 1.0);

    const program = quickShader(gl, vertexShader, fragmentShader)!;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(POSITIONS), gl.STATIC_DRAW);

    const attributePosition = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(attributePosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attributePosition);

    gl.useProgram(program);
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

