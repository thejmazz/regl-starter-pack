precision mediump float;
attribute vec2 position;

uniform float t;

varying vec2 uv;

void main() {
  gl_Position = vec4(
    position.x,
    position.y,
    /* sin(t) * position.y, */
    0, 1);
  uv = position.xy;
}
