precision mediump float;

uniform mat4 model, view, projection;
uniform float t;

attribute vec3 position, normal;

varying vec3 vnormal;

void main () {
    vec3 p2 = position;
    p2.z += sin(t + p2.y);

    float dx = 0.1; // some small number
    float dy = (sin(t + p2.y + dx) - sin(t + p2.y - dx)) / 2.0;
    // Now you have the two components of your tangent vector:
    vec2 tangent = vec2(dx, dy);
    // Which in 2d, you can rotate 90º to get a normal
    vnormal = vec3(-tangent.y, tangent.x, 0);


    gl_Position = projection * view * model * vec4(p2, 1.0);
}

