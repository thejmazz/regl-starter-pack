precision mediump float;
#pragma glslify: noise = require('glsl-noise/simplex/2d');

float pattern(float v, float repeats, float threshold) {
    float result = mod(v * repeats, 1.0);
    return step(threshold, result);
}

const float PI=3.14159265358979323846;

uniform vec3 color;
uniform vec2 resolution;
uniform float angle;
uniform float t;

vec4 offsetRepeat = vec4(0.0, 0.0, 1.0, 1.0);

void main() {
    vec2 vUv = gl_FragCoord.xy;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float vCoord = vUv.y / offsetRepeat.w;

    // offset coord with noise for distortions
    vCoord += 0.15 * noise(vec2(vUv.y * 0.05, t * 0.01));
    vCoord += 0.01 * noise(vec2(vUv.x * 0.05, t * 0.01));

    // and/or offset these with noise too
    float repeats = 40.0; // total # of stripes
    float thickness = 0.5; // between 0 - 1
    float stripe = pattern(vCoord, repeats, thickness);

    // your two colors
    vec3 colorA = vec3(1.0);
    vec3 colorB = vec3(0.0);
    gl_FragColor.rgb = mix(colorA, colorB, stripe);
    gl_FragColor.a = 1.0;

    /* vec3 col; */
    /* if (uv.x > 0.5) { */
    /*     col = vec3(1, 0, 0); */
    /* } else { */
    /*     col = vec3(0, 1, 0); */
    /* } */

    /* float t = PI / 4.0; */
    /* float t = angle; */
    /* float w = 0.25;			  // width (larger value = smaller width) */
    /* float stripeVal = cos( ( gl_FragCoord.x * cos( t ) * w ) + ( gl_FragCoord.y * sin( t ) * w ) ); */
    /* /1* stripeVal = 1.0 - stripeVal; *1/ */

    /* vec4 col = vec4( stripeVal );	// contrast */
    /* col += vec4( 0.91, 0.91, 0.91, 1.0 );	  // color */
    /* gl_FragColor = col; */

    /* gl_FragColor = vec4(col, 1); */
}
