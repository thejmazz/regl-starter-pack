precision mediump float;

uniform mat4 model, view, projection;
uniform float t;

attribute vec3 position, normal;

varying vec3 vnormal;

void main () {
    vec3 p2 = position;
    p2.z += sin(t + p2.y*p2.x);

    vnormal = normal;
    vnormal = normalize(p2);
    /* vnormal.z = p2.z; */
    gl_Position = projection * view * model * vec4(p2, 1.0);
}

