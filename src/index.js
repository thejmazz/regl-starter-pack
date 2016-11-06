import reglConstructor from 'regl'

const regl = reglConstructor()

import frag from './shaders/frag.glsl'
import vert from './shaders/vert.glsl'

const drawTriangle = regl({
  frag,
  vert,
  attributes: {
    position: regl.buffer([
      [-2, -2],
      [4, -2],
      [4,  4]
    ])
  },
  uniforms: {
    color: regl.prop('color'),
    t: ({ tick }) => 0.01 * tick
  },
  count: 3
})

regl.frame(({time}) => {
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  drawTriangle({
    color: [
      Math.cos(time * 0.1),
      Math.sin(time * 0.0008),
      Math.cos(time * 0.003),
      1
    ]
  })
})

