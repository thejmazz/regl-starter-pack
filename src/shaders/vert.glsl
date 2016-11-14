precision mediump float;
attribute vec3 position;

uniform float t;

varying vec2 vUv;

void main() {
  gl_Position = vec4(position, 1.0);
  vUv = position.xy;
}
