import { Manual } from './manual'
import { InitConfig } from './utils/type'

function init(domEl: HTMLCanvasElement, config?: InitConfig): Manual {
  return new Manual(domEl, config)
}

export { init }
