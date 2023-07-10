import { AnimationHandlerFunction, AnimationType } from '../utils/type'
import { no_animation } from './none'
import { zoom_animation } from './zoom'
import { flash_in_animation } from './flash-in'

type AnimationHandler = {
  [K in AnimationType]: AnimationHandlerFunction
}

const animationHandler: AnimationHandler = {
  none: no_animation,
  zoom: zoom_animation,
  'flash-in': flash_in_animation
}

export default animationHandler
