precision mediump float;

/* uniform mat4 model, view, projection; */
uniform mat4 view, projection;

attribute vec3 position, normal;

varying vec3 vnormal;

void main () {
    vnormal = normal;
    gl_Position = projection * view * vec4(position, 1.0);
}
