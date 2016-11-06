import reglConstructor from 'regl'

const regl = reglConstructor()

import frag from './shaders/frag.glsl'
import vert from './shaders/vert.glsl'

function params () {
  this.r = 0.5
  this.g = 0.5
  this.b = 0.5

  this.rSinComponent = 0
  this.rCosComponent = 0
  this.rTanComponent = 0
  this.rXComponent = 1
  this.rYComponent = 0

  this.gSinComponent = 0
  this.gCosComponent = 0
  this.gTanComponent = 0
  this.gXComponent = 0
  this.gYComponent = 1

  this.bSinComponent = 0
  this.bCosComponent = 1
  this.bTanComponent = 0
  this.bXComponent = 0
  this.bYComponent = 0
}

const p = new params()

const gui = new dat.GUI()

const rgb = gui.addFolder('rgb')
rgb.add(p, 'r', 0, 1)
rgb.add(p, 'g', 0, 1)
rgb.add(p, 'b', 0, 1)

gui.add(p, 'rSinComponent', 0, 1)
gui.add(p, 'rCosComponent', 0, 1)
gui.add(p, 'rTanComponent', 0, 1)
gui.add(p, 'rXComponent', -5, 5)
gui.add(p, 'rYComponent', -5, 5)


gui.add(p, 'gSinComponent', 0, 1)
gui.add(p, 'gCosComponent', 0, 1)
gui.add(p, 'gTanComponent', 0, 1)
gui.add(p, 'gXComponent', -5, 5)
gui.add(p, 'gYComponent', -5, 5)

gui.add(p, 'gSinComponent', 0, 1)
gui.add(p, 'gCosComponent', 0, 1)
gui.add(p, 'gTanComponent', 0, 1)
gui.add(p, 'gXComponent', -5, 5)
gui.add(p, 'gYComponent', -5, 5)

const uniforms = {
  t: ({ tick }) => 0.01 * tick,

  r: regl.prop('r'),
  g: regl.prop('g'),
  b: regl.prop('b'),

  rSinComponent: regl.prop('rSinComponent'),
  rCosComponent: regl.prop('rCosComponent'),
  rTanComponent: regl.prop('rTanComponent'),
  rXComponent: regl.prop('rXComponent'),
  rYComponent: regl.prop('rYComponent'),

  gSinComponent: regl.prop('gSinComponent'),
  gCosComponent: regl.prop('gCosComponent'),
  gTanComponent: regl.prop('gTanComponent'),
  gXComponent: regl.prop('gXComponent'),
  gYComponent: regl.prop('gYComponent'),

  bSinComponent: regl.prop('bSinComponent'),
  bCosComponent: regl.prop('bCosComponent'),
  bTanComponent: regl.prop('bTanComponent'),
  bXComponent: regl.prop('bXComponent'),
  bYComponent: regl.prop('bYComponent'),
}

const drawTriangle = regl({
  frag,
  vert,
  attributes: {
    position: regl.buffer([
      [-1, -1],
      [2, -1],
      [2,  2]
    ])
  },
  uniforms,
  count: 3
})

const drawTriangle2 = regl({
  frag,
  vert,
  attributes: {
    position: regl.buffer([
      [1, 1],
      [-2, 1],
      [-2,  -2]
    ])
  },
  uniforms,
  count: 3
})

regl.frame(({time}) => {
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  drawTriangle(p)
  drawTriangle2(p)
})

