import { Camera, Group } from 'three'
import { Manual } from '../manual'

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
  steps: Step[] | StepFunction
} & (
  | {
      animation?: false
    }
  | {
      animation: true
      appearAnimation: AnimationType
    }
)
type ModelMap = Map<string, Group>
type AnimationType = 'none' | 'zoom' | 'flash-in'
type StepFunction = (
  manual: Manual,
  prevStep: number | undefined,
  nextStep: number
) => void

type AnimationHandlerFunction = (
  model: Group,
  position: [number, number, number],
  orientation?: [number, number, number]
) => void

type DisappearAnimationHandlerFunction = (model: Group) => void

export {
  ManualOption,
  InitConfig,
  ModelMap,
  Step,
  AnimationType,
  AnimationHandlerFunction,
  DisappearAnimationHandlerFunction,
  StepFunction
}
