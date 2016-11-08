precision mediump float;

const float PI=3.14159265358979323846;

uniform vec3 color;
uniform vec2 resolution;
uniform float angle;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    /* vec3 col; */
    /* if (uv.x > 0.5) { */
    /*     col = vec3(1, 0, 0); */
    /* } else { */
    /*     col = vec3(0, 1, 0); */
    /* } */

    /* float t = PI / 4.0; */
    float t = angle;
    float w = 0.25;			  // width (larger value = smaller width)
    float stripeVal = cos( ( gl_FragCoord.x * cos( t ) * w ) + ( gl_FragCoord.y * sin( t ) * w ) );
    /* stripeVal = 1.0 - stripeVal; */

    vec4 col = vec4( stripeVal );	// contrast
    col += vec4( 0.91, 0.91, 0.91, 1.0 );	  // color
    gl_FragColor = col;

    /* gl_FragColor = vec4(col, 1); */
}
