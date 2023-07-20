import { Group, Material, Mesh } from 'three'
import { Tween, Easing } from '@tweenjs/tween.js'
import { no_disappear_animation } from './none'

function flash_in_animation(
  model: Group,
  position: [number, number, number],
  orientation?: [number, number, number]
) {
  orientation && model.rotation.set(...orientation)

  const from = [position[0], position[1] + 5, position[2]]
  const to = position
  const move = new Tween(from)
    .to(to, 200)
    .easing(Easing.Bounce.Out)
    .onUpdate(() => {
      model.position.set(...(from as [number, number, number]))
    })
    .start()

  // const o = { x: 0 }
  // const changeOpacity = new Tween(o)
  //   .to({ x: 1 }, 200)
  //   .easing(Easing.Linear.None)
  //   .onUpdate(() => {
  //     model.children.forEach((v) => {
  //       const m = (v as Mesh).material
  //       if (Array.isArray(m)) {
  //         m.forEach((v) => {
  //           v.transparent = true
  //           v.opacity = o.x
  //         })
  //       } else {
  //         m.transparent = true
  //         m.opacity = 0
  //         console.log(m)
  //       }
  //     })
  //   })
  //   .start()
}

function flash_out_animation(model: Group) {
  const position = model.position.toArray()
  const from = [position[0], position[1], position[2]]
  const to = [position[0], position[1] + 5, position[2]]
  const move = new Tween(from)
    .to(to, 200)
    .easing(Easing.Back.In)
    .onUpdate(() => {
      model.position.set(...(from as [number, number, number]))
    })
    .start()
    .onComplete(() => {
      no_disappear_animation(model)
    })
}

export { flash_in_animation, flash_out_animation }
