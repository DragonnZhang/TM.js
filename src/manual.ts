import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  DirectionalLight,
  Camera
} from 'three'
import { Tween, Easing, update } from '@tweenjs/tween.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { bindThis } from './utils/decorator'
import {
  ModelMap,
  InitConfig,
  Step,
  ManualOption,
  AnimationType
} from './utils/type'
import animationHandler from './animations'

class Manual {
  private renderer
  private camera: Camera
  private scene
  private current_step = -1
  private model_map: ModelMap = new Map<string, Group>()
  private steps: Step[] = []
  private modelContainer
  private controls
  private light
  private animation = false
  private appearAnimation: AnimationType = 'none'

  constructor(canvas: HTMLCanvasElement, config?: InitConfig) {
    // 1. set renderer
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas })

    // 2. set scene
    this.scene = new Scene()

    // 3. set camera
    if (config?.camera) {
      if (config.camera instanceof Camera) {
        // user passes camera instance
        this.camera = config.camera
      } else {
        // user only passes configuration
        this.camera = new PerspectiveCamera(75, 2, 0.1, 5)
        const { position, lookAt } = config.camera
        position && this.camera.position.set(...position)
        lookAt && this.camera.lookAt(...lookAt)
      }
    } else {
      // default camera configuration
      this.camera = new PerspectiveCamera(75, 2, 0.1, 50)
      this.camera.position.z = 10
    }

    // 4. set orbit control
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // 5. set light
    this.light = new DirectionalLight(0xffffff, 0.3)
    this.light.position.set(-11, 9, 9)
    this.scene.add(this.light)

    // 6. set group
    this.modelContainer = new Group()

    // 7. add group to scene
    this.scene.add(this.modelContainer)
  }

  private resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  private render() {
    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement
      if (this.camera instanceof PerspectiveCamera) {
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }
    }
    this.renderer.render(this.scene, this.camera)

    update()

    requestAnimationFrame(() => {
      this.render()
    })
  }

  async setOption(option: ManualOption) {
    // 0. check length: not 0
    if (!(option.steps.length && option.models.length)) {
      throw new Error("Option's steps and models' length must not be zero!")
    }

    option.animation && (this.animation = option.animation)
    option.animation && (this.appearAnimation = option.appearAnimation)

    // 1. store the models in model_map
    const loader = new OBJLoader()
    for (const model of option.models) {
      const { id, file } = model
      const m = await loader.loadAsync(file)
      this.model_map.set(id, m)
    }

    // 2. store the steps, which will be used in loadStep method
    this.steps = option.steps

    // 3. load the first step
    this.loadStep(0)

    // 4. set the current step to be 0
    this.current_step = 0

    // 5. run the render function
    this.render()
  }

  private loadStep(num: number) {
    const step = this.steps[num]

    if (!this.animation || this.current_step === -1) {
      // 1. clear the container
      this.modelContainer.clear()

      // 2. add models to modelContainer
      step.objs.forEach((obj) => {
        const model = this.model_map.get(obj.id)
        if (!model) {
          throw new Error(`Id in steps(${obj.id}) doesn' t exist in models!`)
        } else {
          model.position.set(...obj.position)
          obj.orientation && model.rotation.set(...obj.orientation)
          this.modelContainer.add(model)
        }
      })
    } else {
      // add animation when steps are switching
      const oldStep = this.steps[this.current_step]
      const newStep = this.steps[num]
      const oldIds = new Map(
        oldStep.objs.map((obj) => [
          obj.id,
          {
            position: obj.position,
            orientation: obj.orientation
          }
        ])
      )
      const newIds = new Map(
        newStep.objs.map((obj) => [
          obj.id,
          {
            position: obj.position,
            orientation: obj.orientation
          }
        ])
      )

      // 1. process oldIds which are in and not in newStep
      oldIds.forEach((v, oldId) => {
        const oldModel = this.model_map.get(oldId) as Group

        if (!newIds.has(oldId)) {
          // 这里应该考虑加一个消失动画
          this.modelContainer.remove(oldModel)
        } else {
          // move animation

          /* Copy v.position to old_position rather than align. Else when tween updates, it will affect v.position and will finally affect this.steps */
          const old_position = v.position.slice() as [number, number, number]
          const new_position = newIds.get(oldId)?.position
          if (new_position) {
            const move = new Tween(old_position)
              .to(new_position, 200)
              .easing(Easing.Linear.None)
              .onUpdate(() => {
                oldModel.position.set(...old_position)
              })
              .start()
          }

          // rotate animation
          const old_orientation = v.orientation?.slice() as [
            number,
            number,
            number
          ]
          const new_orientation = newIds.get(oldId)?.orientation
          if (old_orientation && new_orientation) {
            const move = new Tween(old_orientation)
              .to(new_orientation, 200)
              .easing(Easing.Linear.None)
              .onUpdate(() => {
                oldModel.rotation.set(...old_orientation)
              })
              .start()
          }
        }
      })
      // 2. process newIds which are not in oldStep
      newIds.forEach((v, newId) => {
        const newModel = this.model_map.get(newId) as Group
        if (!oldIds.has(newId)) {
          // add model appear animation (according to appearAnimation config)
          const handler = animationHandler[this.appearAnimation]
          handler(
            newModel,
            [...v.position],
            v.orientation ? [...v.orientation] : undefined
          )
          this.modelContainer.add(newModel)
        }
      })
    }

    // 3. update current step
    this.current_step = num
  }

  @bindThis
  showPrev() {
    if (this.current_step === 0) {
      return
    }
    this.loadStep(this.current_step - 1)
  }

  @bindThis
  showNext() {
    if (this.current_step === this.steps.length - 1) {
      return
    }
    this.loadStep(this.current_step + 1)
  }

  @bindThis
  jumpToStep(step: number) {
    if (!Number.isInteger(step)) {
      throw new Error('Step must be an integer!')
    }
    if (step < 0 || step >= this.steps.length) {
      throw new Error('Step must be between 0 and steps.length-1!')
    }
    this.loadStep(step)
  }
}

export { Manual }
