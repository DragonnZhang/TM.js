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
  position?: [number, number, number]
  orientation?: [number, number, number]
}
interface CameraConfig {
  position?: [number, number, number]
  lookAt?: [number, number, number]
}
interface InitConfig {
  camera: CameraConfig | Camera
}
interface ManualOption {
  animation?: boolean
  appearAnimation?: 'none' | 'zoom' | 'flash-in'
  models: Model[]
  steps: Step[]
}
type ModelMap = Map<string, Object3D>

export { ManualOption, InitConfig, ModelMap, Step }
