// === Modules ===
import reglConstructor from 'regl'
import mat4 from 'gl-mat4'
import normals from 'angle-normals'

// === Models ===
import bunny from 'bunny'
import teapot from 'teapot'
import dragon from 'stanford-dragon'

// === Geometries ===
import primitiveCube from 'primitive-cube'
import primitivePlane from 'primitive-plane'

// === Utilities ===
import cameraConstructor from './util/camera.js'

// Instantiate regl
const regl = reglConstructor()

const quad = regl({
  attributes: {
    position: [
      [ -1, -1 ],
      [ 1, -1 ],
      [ 1, 1 ],
      [ -1, 1 ]
    ]
  },
  elements: [
    [0, 1, 2],
    [0, 2, 3]
  ],
  count: 3,
  offset: 3,
  vert: `
  precision mediump float;

  attribute vec2 position;

  void main () {
    gl_Position = vec4(position, 0, 1);
  }
`,
  frag: `
  precision mediump float;

  void main () {
    gl_FragColor = vec4(1, 0, 0, 1);
  }
`
})

const points = regl({
  attributes: {
    position: [
      [ -0.5, -0.5 ],
      [ 0.5, -0.5 ],
      [ 0, 0.5 ]
    ]
  },
  uniforms: {
    pointSize: 40
  },
  primitive: 'points',
  count: 3,
  vert: `
  precision mediump float;

  attribute vec2 position;

  uniform float pointSize;

  void main () {
    gl_PointSize = pointSize;
    gl_Position = vec4(position, 0, 1);
  }
`,
  frag: `
  precision mediump float;

  uniform float pointSize;

  void main () {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
      discard;
    }

    gl_FragColor = vec4(0, 1, 0, 1);
  }
`
})


regl.frame(({ viewportWidth, viewportHeight }) => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  // quad()
  points({ pointSize: 4 })
})

