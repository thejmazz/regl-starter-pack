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

// === Vertex Shaders ===
import position from './shaders/vert/position.glsl'
import wavePosition from './shaders/vert/wave-position.glsl'
import projectionViewModel from './shaders/vert/proj-view-model.glsl'
import pvmNormal from './shaders/vert/pvm-normal.glsl'

// === Fragment Shaders ===
import basicMaterial from './shaders/frag/basic.glsl'
import normalMaterial from './shaders/frag/normal.glsl'

// === Utilities ===
import cameraConstructor from './util/camera.js'

// Instantiate regl
const regl = reglConstructor()
// Instantiate camera
const camera = cameraConstructor(regl, {
  center: [0, 2.5, 0]
})

const drawModel = (model) => regl({
  vert: pvmNormal,
  frag: normalMaterial,
  attributes: {
    position: model.positions,
    normal: normals(model.cells, model.positions),
  },
  elements: model.cells,
  uniforms: {
    t: ({ tick }) => tick * 0.01,
    model: mat4.identity([]),
    // view: ({ tick }) => {
    //   const t = tick * 0.01
    //   return mat4.lookAt([],
    //     [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
    //     [0, 2.5, 0],
    //     [0, 1, 0]
    //   )
    // },
    // projection: ({ viewportWidth, viewportHeight }) => {
    //   return mat4.perspective([],
    //     Math.PI / 4,
    //     viewportWidth / viewportHeight,
    //     0.01,
    //     2000)
    // },
    color: [0.5, 0.2, 0.6]
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  camera(() => {
    drawModel(primitiveCube())()
    // drawModel(bunny)()
  })
})

