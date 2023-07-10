import { AnimationHandlerFunction, AnimationType } from '../utils/type'
import { no_animation } from './none'
import { zoom_animation } from './zoom'

type AnimationHandler = {
  [K in AnimationType]: AnimationHandlerFunction
}

const animationHandler: AnimationHandler = {
  none: no_animation,
  zoom: zoom_animation,
  'flash-in': no_animation
}

export default animationHandler
