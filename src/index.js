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

// === Vertex Shaders ===
import position from './shaders/vert/position.glsl'
import wavePosition from './shaders/vert/wave-position.glsl'
import pvm from './shaders/vert/proj-view-model.glsl'
import pvmNormal from './shaders/vert/pvm-normal.glsl'
import pvmVuv from './shaders/vert/pvm-vUv.glsl'

// === Fragment Shaders ===
import basicMaterial from './shaders/frag/basic.glsl'
import normalMaterial from './shaders/frag/normal.glsl'
import diagonalsMaterial from './shaders/frag/diagonals.glsl'

// === Utilities ===
import cameraConstructor from './util/camera.js'

// Instantiate regl
const regl = reglConstructor()
// Instantiate camera
const camera = cameraConstructor(regl, {
  center: [0, 0, 0]
})

const drawModel = (model) => regl({
  vert: pvmVuv,
  frag: diagonalsMaterial,
  attributes: {
    position: model.positions,
    // normal: normals(model.cells, model.positions),
  },
  elements: model.cells,
  uniforms: {
    t: ({ tick }) => tick * 0.01,
    model: () => {
      const mat = mat4.identity([])
      // mat4.rotateX(mat, mat, Math.PI/2)
      mat4.rotateY(mat, mat, Math.PI * -0.1)

      return mat
    },
    color: [0.5, 0.2, 0.6],
    resolution: regl.prop('resolution'),
    angle: regl.prop('angle')
  }
})

const plane = primitivePlane(10, 10, 100, 100)

// center: [0, 0, 0]
// width: 2,
// length: 2,
// height: 2
// [-1, -1, 0], // 0: bottom left
// [1, -1, 0], // 1: bottom right
// [0.5, 2, 0], // 2: top
// [1, -1, -1], // 3: bottom right back
// [-1, -1, -1], // 4: bottem-left back
const pyramid = (center, width, length, height) => {
  const A = [ center[0] - width / 2, center[1], center[2] - length / 2 ] // 0: bottom left
  const B = [ center[0] - width / 2, center[1], center[2] + length / 2 ] // 1: bottom left back
  const C = [ center[0] + width / 2, center[1], center[1] - length / 2 ] // 2: bottom right
  const D = [ center[0] + width / 2, center[1], center[1] + length / 2 ] // 3: bottom right back

  const E = [ center[0], center[1] + height, center[2] ] // 4: top

  const positions = [].concat([A, B, C, D, E])
  const cells = [
    [ [ 0, 4, 2 ] ],
    [ [ 0, 4, 1 ] ],
    [ [ 2, 4, 3 ] ],
    [ [ 1, 4, 3 ] ]
  ]

  const faces = [
    { positions, cells: cells[0] },
    { positions, cells: cells[1] },
    { positions, cells: cells[2] },
    { positions, cells: cells[3] }
  ]

  return faces
}

const pyramid01 = {
  positions: [
    [-1, -1, 0], // 0: bottom left
    [1, -1, 0], // 1: bottom right
    [0.5, 2, 0], // 2: top
    [1, -1, -1], // 3: bottom right back
  ],
  cells: [
    [0, 1, 2],
  ]
}

const pyramid02 = {
  positions: [
    [-1, -1, 0], // 0: bottom left
    [1, -1, 0], // 1: bottom right
    [0.5, 2, 0], // 2: top
    [1, -1, -1], // 3: bottom right back
    [-1, -1, -1], // 4: bottem-left back
  ],
  cells: [
    [1, 2, 3]
  ]
}

const pyramid03 = {
  positions: [
    [-1, -1, 0], // 0: bottom left
    [1, -1, 0], // 1: bottom right
    [0.5, 2, 0], // 2: top
    [1, -1, -1], // 3: bottom right back
    [-1, -1, -1], // 4: bottem-left back
  ],
  cells: [
    [0, 2, 4]
  ]
}

const pyramid04 = {
  positions: [
    [-1, -1, 0], // 0: bottom left
    [1, -1, 0], // 1: bottom right
    [0.5, 2, 0], // 2: top
    [1, -1, -1], // 3: bottom right back
    [-1, -1, -1], // 4: bottem-left back
  ],
  cells: [
    [3, 2, 4]
  ]
}

const p = pyramid([0, 0, 0], 2, 2, 2)
const p2 = pyramid([2, 0, -2], 2, 3, 4)
// const p1 = { positions, cells: cells[0] }
// const p2 = { positions, cells: cells[1] }
// const p3 = { positions, cells: cells[2] }
// const p4 = { positions, cells: cells[3] }

const defaultAngles = [Math.PI / 4, Math.PI / 3, Math.PI / 2.5, Math.PI / 2]
const drawPyramid = ({ viewportWidth, viewportHeight }, pyramid, angles = defaultAngles) => {
  const base = {
    resolution: [viewportWidth, viewportHeight]
  }

  for (let i=0; i < pyramid.length; i++) {
    drawModel(pyramid[i])(Object.assign({}, base, { angle: angles[i] }))
  }
}

regl.frame(({ viewportWidth, viewportHeight }) => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  camera(() => {
    // drawModel(plane)({
    //   resolution: [viewportWidth, viewportHeight]
    // })
    // drawModel(bunny)({
    //   resolution: [viewportWidth, viewportHeight]
    // })
    drawPyramid({ viewportWidth, viewportWidth }, p)
    // drawPyramid({ viewportWidth, viewportWidth }, p2)
  })
})

