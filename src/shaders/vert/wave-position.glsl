precision mediump float;

uniform float t;

attribute vec3 position;

void main() {
    float x = position.x;
    float y = position.y;
    /* float y = position.y * sin(t + position.x); */
    float z = position.z;
    gl_Position = vec4(x, y, z, 1);
}
