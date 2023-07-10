import { Object3D } from 'three'
import { Tween, Easing } from '@tweenjs/tween.js'
import { no_animation } from './none'

function zoom_animation(
  model: Object3D,
  position: [number, number, number],
  orientation?: [number, number, number]
) {
  no_animation(model, position, orientation)
  const scale = [0, 0, 0]
  const zoom = new Tween(scale)
    .to([1, 1, 1], 200)
    .easing(Easing.Linear.None)
    .onUpdate(() => {
      model.scale.set(...(scale as [number, number, number]))
    })
    .start()
}

export { zoom_animation }
