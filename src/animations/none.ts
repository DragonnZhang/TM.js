import { Group } from 'three'

function no_animation(
  model: Group,
  position: [number, number, number],
  orientation?: [number, number, number]
) {
  model.position.set(...position)
  orientation && model.rotation.set(...orientation)
}

export { no_animation }
