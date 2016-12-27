// === Modules ===
import reglConstructor from 'regl'
import mat4 from 'gl-mat4'
import vec2 from 'gl-vec2'
import glsl from 'glslify'

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

const node = vec2.fromValues(1, 0)
const node2 = vec2.fromValues(0, 1)

const getPoint = () => {
  const vec = vec2.fromValues(
    Math.random() - 0.5,
    Math.random() - 0.5
  )

  if (vec2.length(vec) > 0.5) {
    return getPoint()
  }

  const dist = vec2.fromValues(0, 0)

  const totalNodes = vec2.fromValues(0, 0)
  vec2.add(totalNodes, node, node2)

  // vec2.subtract(dist, vec, totalNodes)
  // vec2.subtract(dist, node, vec)
  vec2.subtract(dist, node, vec)

  // console.log(vec[1], dist[1], vec[1] * dist[1])

  // console.log(dist)

  // vec2.multiply(vec, vec, vec2.fromValues(Math.abs(dist[0]), Math.abs(dist[1])))
  // if (vec[0] > 0) {
    vec2.multiply(vec, vec, vec2.fromValues(-dist[0], Math.abs(dist[1])))
  // }
  // vec2.multiply(vec, vec, vec2.fromValues(dist[0], dist[1]))
  // vec2.multiply(vec, vec, vec2.fromValues(dist[0], 1))

  // vec[0] = vec[0] + dist[0] / 2

  return vec
}

for (let i = 0; i < pointsData.length; i += 2) {
  const point = getPoint()

  pointsData.set(point, i)
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

  varying vec2 pos;

  vec2 getScale (float w, float h) {
    if (w > h) {
      return vec2(h / w, 1);
    } else {
      return vec2(1, w / h);
    }
  }

  void main () {
    vec2 scale = getScale(width, height);
    /* pos = position * scale; */
    pos = position;

    gl_PointSize = pointSize;
    gl_Position = vec4(position * scale, 0, 1);
  }
`,
  frag: glsl`
  #define PI 3.1415926535897932384626433832795
  #pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

  precision mediump float;

  uniform float pointSize;

  varying vec2 pos;

  void main () {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
      discard;
    }

    /* float r = abs(pos.x); */
    /* float g = pos.y; */
    /* float b = 0.; */
    /* float a = 1.; */

    /* float angle = (atan(pos.y, pos.x) + PI) / (2. * PI); */

    /* vec3 rgb = hsl2rgb(angle, 0.5, 0.25); */

    /* vec4 color = vec4(rgb, 1); */

    vec4 color = vec4(1, 1, 1, 1);

    gl_FragColor = color;
  }
`
})


const drawNodes = regl({
  attributes: {
    position: [
      [1, 0],
      [0, 1]
    ]
  },
  uniforms: {
    pointSize: 10,
    width: regl.context('viewportWidth'),
    height: regl.context('viewportHeight')
  },
  primitive: 'points',
  count: 2,
  vert: `
  precision mediump float;

  attribute vec2 position;

  uniform float pointSize;
  uniform float width;
  uniform float height;

  varying vec2 pos;

  vec2 getScale (float w, float h) {
    if (w > h) {
      return vec2(h / w, 1);
    } else {
      return vec2(1, w / h);
    }
  }

  void main () {
    vec2 scale = getScale(width, height);
    /* pos = position * scale; */
    pos = position;

    gl_PointSize = pointSize;
    gl_Position = vec4(position * scale, 0, 1);
  }
`,
  frag: glsl`
  #define PI 3.1415926535897932384626433832795
  #pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

  precision mediump float;

  uniform float pointSize;

  varying vec2 pos;

  void main () {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) {
      discard;
    }

    gl_FragColor = vec4(1, 0, 0, 1);
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
  drawNodes()
})

