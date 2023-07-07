import * as TM from '../index'
import './index.css'

const el: HTMLCanvasElement = document.querySelector('#c') as HTMLCanvasElement
const manual = TM.init(el)
manual.setOption({
  models: [
    {
      id: '1',
      file: './cube.obj'
    },
  ],
  steps: [
    {
      name: 'step 1',
      objs: [
        {
          id: '1',
          position: [0, 0, 0],
          orientation: [0, 0, 0]
        }
      ]
    },
    {
      name: 'step 2',
      objs: [
        {
          id: '1',
          position: [5, 0, 0],
          orientation: [1, 1, 1]
        }
      ]
    }
  ],
  appearAnimation: 'zoom'
})

const { showPrev, showNext, jumpToStep } = manual

const ele = document.querySelector('.button')!
const button = document.createElement('button')
button.onclick = triggerNext
button.innerText = 'next'
ele.appendChild(button)

function triggerNext() {
  showNext()
}

const button2 = document.createElement('button')
button2.onclick = triggerPrev
button2.innerText = 'prev'
ele.appendChild(button2)

function triggerPrev() {
  showPrev()
}

document.onkeyup = (e) => {
  if (e.key === 'ArrowLeft') {
    triggerPrev()
  }
  else if (e.key === 'ArrowRight') {
    triggerNext()
  }
}
