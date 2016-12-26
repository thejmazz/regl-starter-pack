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

const WIDTH = 64
const HEIGHT = 64

const pointsData = new Float32Array(WIDTH * HEIGHT * 2)

for (let i = 0; i < pointsData.length; i += 2) {
  pointsData[i + 0] = Math.random() - 0.5
  pointsData[i + 1] = Math.random() - 0.5
}

const points = regl({
  attributes: {
    position: pointsData
  },
  uniforms: {
    pointSize: 5,
    width: regl.context('viewportWidth'),
    height: regl.context('viewportHeight')
  },
  primitive: 'points',
  count: WIDTH * HEIGHT,
  vert: `
  precision mediump float;

  attribute vec2 position;

  uniform float pointSize;
  uniform float width;
  uniform float height;

  vec2 getScale (float w, float h) {
    if (w > h) {
      return vec2(h / w, 1);
    } else {
      return vec2(1, w / h);
    }
  }

  void main () {
    gl_PointSize = pointSize;
    gl_Position = vec4(position * getScale(width, height), 0, 1);
  }
`,
  frag: `
  precision mediump float;

  uniform float pointSize;

  void main () {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
      discard;
    }

    gl_FragColor = vec4(1, 1, 1, 1);
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

