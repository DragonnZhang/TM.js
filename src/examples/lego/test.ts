import * as TM from '../../index'
import './index.css'

const modelPath = '/public/models/'

const el: HTMLCanvasElement = document.querySelector('#c') as HTMLCanvasElement
const manual = TM.init(el)
const models = [
  {
    id: '1',
    file: 'cube.obj'
  },
  {
    id: '2',
    file: 'cube.obj'
  }
]
models.forEach((o) => {
  o.file = modelPath + o.file
})

const stepFunc: TM.StepFunction = (manual, prevStep, nextStep) => {
  if (!prevStep) {
    console.log(manual)
  } else {
    console.log(manual)
  }
}

manual.setOption({
  models: models,
  steps: stepFunc
})

const { showPrev, showNext, jumpToStep, getCurrentStep } = manual

const ele = document.querySelector('.button')!
const button = document.createElement('button')
button.onclick = showPrev
button.innerText = 'prev'
ele.appendChild(button)

const button2 = document.createElement('button')
button2.onclick = showNext
button2.innerText = 'next'
ele.appendChild(button2)

document.onkeyup = (e) => {
  if (e.key === 'ArrowLeft') {
    showPrev()
  } else if (e.key === 'ArrowRight') {
    showNext()
  }
}
