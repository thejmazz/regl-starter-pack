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
import vert from './shaders/vert.glsl'

// === Fragment Shaders ===
import basicMaterial from './shaders/frag/basic.glsl'
import normalMaterial from './shaders/frag/normal.glsl'
import diagonalsMaterial from './shaders/frag/diagonals.glsl'
import noiseMaterial from './shaders/frag/noise.glsl'

// === Utilities ===
import cameraConstructor from './util/camera.js'

// Instantiate regl
const regl = reglConstructor()

function params () {
  this.classic = false
  this.frequency = 4
  this.timefactor = 0
  this.octaves = 1
  this.amplitude = 1
  this.lacunarity = 1
  this.gain = 1
}

const p = new params()

const gui = new dat.GUI()
gui.add(p, 'classic')
gui.add(p, 'frequency', -20, 20, 0.1)
gui.add(p, 'timefactor', 0, 5, 0.01)

const fbm = gui.addFolder('fbm')
fbm.add(p, 'octaves', 1, 20, 1)
fbm.add(p, 'amplitude', -2, 2, 0.1)
fbm.add(p, 'lacunarity', 1, 20, 0.1)
fbm.add(p, 'gain', 1, 20, 0.1)

const drawFace = regl({
  vert,
  frag: noiseMaterial,
  attributes: {
    position: [
      [-1, 1, 0],
      [1, -1, 0],
      [1,  1, 0],
      [-2, -2, 0]
    ],
    view: mat4.identity([])
  },
  elements: [
    [0, 1, 2],
    [1, 3, 0]
  ],
  uniforms: {
    t: ({ tick }) => tick * 0.01,
    model: () => {
      const mat = mat4.identity([])
      // mat4.rotateX(mat, mat, Math.PI/2)
      mat4.rotateY(mat, mat, Math.PI * -0.1)

      return mat
    },
    color: [0.5, 0.2, 0.6],
    frequency: regl.prop('frequency'),
    timefactor: regl.prop('timefactor'),
    octaves: regl.prop('octaves'),
    amplitude: regl.prop('amplitude'),
    lacunarity: regl.prop('lacunarity'),
    gain: regl.prop('gain'),
    classic: regl.prop('classic')
    // resolution: regl.prop('resolution'),
    // angle: regl.prop('angle')
  }
})


regl.frame(({ viewportWidth, viewportHeight }) => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  drawFace(p)
})

