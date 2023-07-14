import { Group } from 'three'

function no_animation(
  model: Group,
  position: [number, number, number],
  orientation?: [number, number, number]
) {
  model.position.set(...position)
  orientation && model.rotation.set(...orientation)
}

function no_disappear_animation(model: Group) {
  model.parent?.remove(model)
}

export { no_animation, no_disappear_animation }
