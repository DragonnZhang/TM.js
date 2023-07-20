import { Group } from 'three'
import { Tween, Easing } from '@tweenjs/tween.js'
import { no_animation, no_disappear_animation } from './none'

function zoom_animation(
  model: Group,
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

function zoom_disappear_animation(model: Group) {
  const scale = [1, 1, 1]
  const zoom = new Tween(scale)
    .to([0, 0, 0], 200)
    .easing(Easing.Linear.None)
    .onUpdate(() => {
      model.scale.set(...(scale as [number, number, number]))
    })
    .start()
    .onComplete(() => {
      no_disappear_animation(model)
    })
}

export { zoom_animation, zoom_disappear_animation }
