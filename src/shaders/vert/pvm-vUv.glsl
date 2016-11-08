precision mediump float;

attribute vec3 position;

uniform mat4 model, view, projection;

varying vec2 vUv;

void main() {
    vUv = position.xy;
    gl_Position = projection * view * model * vec4(position, 1);
}
