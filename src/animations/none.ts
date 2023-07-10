import { Object3D } from 'three'

function no_animation(
  model: Object3D,
  position?: [number, number, number],
  orientation?: [number, number, number]
) {
  position && model.position.set(...position)
  orientation && model.rotation.set(...orientation)
}

export { no_animation }
