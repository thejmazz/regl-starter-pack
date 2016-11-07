precision mediump float;

uniform mat4 model, view, projection;
attribute vec3 position, normal;

varying vec3 vnormal;

void main () {
    vnormal = normal;
    gl_Position = projection * view * model * vec4(position, 1.0);
}
