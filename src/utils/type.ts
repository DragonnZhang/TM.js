import { Camera, Object3D } from 'three'

interface Model {
  id: string
  file: string
}
interface Step {
  name?: string
  objs: Obj[]
}
interface Obj {
  id: string
  position: [number, number, number]
  orientation?: [number, number, number]
}
interface CameraConfig {
  position?: [number, number, number]
  lookAt?: [number, number, number]
}
interface InitConfig {
  camera: CameraConfig | Camera
}
type ManualOption = {
  models: Model[]
  steps: Step[]
} & (
  | {
      animation?: false
    }
  | {
      animation: true
      appearAnimation: AnimationType
    }
)
type ModelMap = Map<string, Object3D>
type AnimationType = 'none' | 'zoom' | 'flash-in'

type AnimationHandlerFunction = (
  model: Object3D,
  position: [number, number, number],
  orientation?: [number, number, number]
) => void

export {
  ManualOption,
  InitConfig,
  ModelMap,
  Step,
  AnimationType,
  AnimationHandlerFunction
}
