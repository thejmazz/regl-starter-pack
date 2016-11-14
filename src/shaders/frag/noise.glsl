precision mediump float;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)
#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)

uniform vec3 color;
/* uniform vec2 resolution; */
/* uniform float angle; */
uniform float t;

uniform float frequency;
uniform float timefactor;

uniform int octaves;
uniform float amplitude;
uniform float lacunarity;
uniform float gain;

uniform bool classic;

varying vec2 vUv;

float fbm (vec2 pos, float time, float frequency, float amplitude, float lacunarity, float gain) {
    float f = frequency;
    float total = 0.0;
    /* int octaves = 5; */

    for (int i = 0; i < 100; i++) {
        float noise;

        if (!classic) {
            noise = snoise3(vec3(pos * frequency, time)) * amplitude;
        } else {
            noise = cnoise3(vec3(pos * frequency, time)) * amplitude;
        }

        total += noise;

        frequency *= lacunarity;
        amplitude *= gain;

        if (i == octaves - 1 ) {
            break;
        }
    }

    return total;
}

void main() {
    float noise;

    /* noise = snoise3(vec3(vUv * frequency, t * timefactor)); */
    /* noise = cnoise3(vec3(vUv * frequency, t * timefactor)); */
    /* noise = pnoise3(vec3(vUv * frequency, t * timefactor), vec3(1., 1., 1.)); */

    noise = fbm(vUv, t * timefactor, frequency, amplitude, lacunarity, gain);

    gl_FragColor = vec4(vec3(noise), 1.0);
}
