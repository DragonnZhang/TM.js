import { Manual } from './manual'

function init(domEl: HTMLCanvasElement): Manual {
  return new Manual(domEl)
}

export { init }
