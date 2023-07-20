import {
  AnimationHandlerFunction,
  AnimationType,
  DisappearAnimationHandlerFunction
} from '../utils/type'
import { no_animation, no_disappear_animation } from './none'
import { zoom_animation, zoom_disappear_animation } from './zoom'
import { flash_in_animation, flash_out_animation } from './flash-in'

type AnimationHandler = {
  [K in AnimationType]: AnimationHandlerFunction
}

type DisappearAnimationHandler = {
  [K in AnimationType]: DisappearAnimationHandlerFunction
}

const animationHandler: AnimationHandler = {
  none: no_animation,
  zoom: zoom_animation,
  'flash-in': flash_in_animation
}

const disappearAnimationHandler: DisappearAnimationHandler = {
  none: no_disappear_animation,
  zoom: zoom_disappear_animation,
  'flash-in': flash_out_animation
}

export { animationHandler, disappearAnimationHandler }
