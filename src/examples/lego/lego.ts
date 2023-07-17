import { Box3, Group, Vector3 } from 'three'
import * as TM from '../../index'
import './index.css'

const modelPath = '/public/models/ldraw/'

const el: HTMLCanvasElement = document.querySelector('#c') as HTMLCanvasElement
const manual = TM.init(el)
const models = [
  {
    id: '1',
    file: 'car.ldr_Packed.mpd'
  }
]
models.forEach((o) => {
  o.file = modelPath + o.file
})

function updateObjectVisibility(model: Group, nextStep: number) {
  model.traverse((c) => {
    if ((c as Group).isGroup) {
      c.visible = c.userData.buildingStep <= nextStep
    }
  })
}

const stepFunc: TM.StepFunction = (manual, currStep, nextStep) => {
  const { camera, controls, modelContainer, model_map } = manual
  const m = model_map.get('1')
  if (currStep === undefined) {
    camera.position.set(150, 200, 250)

    m!.rotation.x = Math.PI
    updateObjectVisibility(m!, nextStep)
    modelContainer.add(m!)

    const bbox = new Box3().setFromObject(m!)
    const size = bbox.getSize(new Vector3())
    const radius = Math.max(size.x, Math.max(size.y, size.z)) * 0.5

    controls.target0.copy(bbox.getCenter(new Vector3()))
    controls.position0
      .set(-2.3, 1, 2)
      .multiplyScalar(radius)
      .add(controls.target0)
    controls.reset()
  } else {
    if (nextStep >= 0 && nextStep <= m?.userData.numBuildingSteps - 1) {
      updateObjectVisibility(m!, nextStep)
      manual.current_step = nextStep
    }
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
