import reglConstructor from 'regl'
import bunny from 'bunny'
import mat4 from 'gl-mat4'

const regl = reglConstructor()

import projectionViewModel from './shaders/vert/proj-view-model.glsl'
import basicMaterial from './shaders/frag/basic.glsl'

const drawBunny = regl({
  vert: projectionViewModel,
  frag: basicMaterial,
  attributes: {
    position: bunny.positions
  },
  elements: bunny.cells,
  uniforms: {
    model: mat4.identity([]),
    view: ({ tick }) => {
      const t = tick * 0.01
      return mat4.lookAt([],
        [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
        [0, 2.5, 0],
        [0, 1, 0]
      )
    },
    projection: ({ viewportWidth, viewportHeight }) => {
      return mat4.perspective([],
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        1000)
    },
    color: [0.5, 0.2, 0.6]
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  drawBunny()
})
