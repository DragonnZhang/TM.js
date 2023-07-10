import * as TM from '../index'
import './index.css'

const el: HTMLCanvasElement = document.querySelector('#c') as HTMLCanvasElement
const manual = TM.init(el, { camera: { lookAt: [1, 2, 3] } })
manual.setOption({
  models: [
    {
      id: '1',
      file: './cube.obj'
    }
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
  ]
  // animation: true,
  // appearAnimation: 'zoom'
})

const { showPrev, showNext, jumpToStep } = manual

const ele = document.querySelector('.button')!
const button = document.createElement('button')
button.onclick = showPrev
button.innerText = 'next'
ele.appendChild(button)

const button2 = document.createElement('button')
button2.onclick = showNext
button2.innerText = 'prev'
ele.appendChild(button2)

document.onkeyup = (e) => {
  if (e.key === 'ArrowLeft') {
    showPrev()
  } else if (e.key === 'ArrowRight') {
    showNext()
  }
}
