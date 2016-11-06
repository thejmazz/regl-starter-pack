precision mediump float;

uniform float t;

uniform float r;
uniform float g;
uniform float b;

uniform float rSinComponent;
uniform float rCosComponent;
uniform float rTanComponent;
uniform float rXComponent;
uniform float rYComponent;

uniform float gSinComponent;
uniform float gCosComponent;
uniform float gTanComponent;
uniform float gXComponent;
uniform float gYComponent;

uniform float bSinComponent;
uniform float bCosComponent;
uniform float bTanComponent;
uniform float bXComponent;
uniform float bYComponent;

varying vec2 uv;

void main() {
    float r2 = r *
        (uv.x * rXComponent + 1.0) *
        (uv.y * rYComponent + 1.0) *
        (sin(t) * rSinComponent + 1.0) *
        (cos(t) * rCosComponent + 1.0) *
        (tan(t) * rTanComponent + 1.0);

    float g2 = g *
        (uv.x * gXComponent + 1.0) *
        (uv.y * gYComponent + 1.0) *
        (sin(t) * gSinComponent + 1.0) *
        (cos(t) * gCosComponent + 1.0) *
        (tan(t) * gTanComponent + 1.0);

    float b2 = b *
        (uv.x * bXComponent + 1.0) *
        (uv.y * bYComponent + 1.0) *
        (sin(t) * bSinComponent + 1.0) *
        (cos(t) * bCosComponent + 1.0) *
        (tan(t) * bTanComponent + 1.0);

    gl_FragColor = vec4(r2, g2, b2, 1.0);
}
