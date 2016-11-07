import reglConstructor from 'regl'
import mat4 from 'gl-mat4'

// === Models ===
import bunny from 'bunny'
import teapot from 'teapot'
import dragon from 'stanford-dragon'

const regl = reglConstructor()

// === Shaders ===
import position from './shaders/vert/position.glsl'
import projectionViewModel from './shaders/vert/proj-view-model.glsl'
import basicMaterial from './shaders/frag/basic.glsl'

const drawModel = (model) => regl({
  vert: position,
  frag: basicMaterial,
  attributes: {
    position: [
      [-1, -1, 0], // 0 bottom-left
      [1, -1, 0], // 1 bottom-right
      [1, 1, 0], // 2 top-right
      [-1, 1, 0] // 3 top-left
    ]
  },
  elements: [
    [0, 1, 2],
    [0, 3, 2]
  ],
  // count: 3,
  // elements: model.cells,
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
        2000)
    },
    color: [0.5, 0.2, 0.6]
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  drawModel(teapot)()
})
