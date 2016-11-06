import reglConstructor from 'regl'

const regl = reglConstructor()

const drawTriangle = regl({
  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // regl.buffer creates a new array buffer object
    position: regl.buffer([
      [-2, -2],   // no need to flatten nested arrays, regl automatically
      [4, -2],    // unrolls them into a typedarray (default Float32)
      [4,  4]
    ])
    // regl automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: regl.prop('color')
  },

  // This tells regl the number of vertices to draw in this command
  count: 3
})

regl.frame(({time}) => {
  // clear contents of the drawing buffer
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  // draw a triangle using the command defined above
  drawTriangle({
    color: [
      Math.cos(time * 0.1),
      Math.sin(time * 0.0008),
      Math.cos(time * 0.003),
      1
    ]
  })
})

