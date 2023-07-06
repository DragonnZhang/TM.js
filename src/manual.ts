import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Object3D,
  Group,
  DirectionalLight,
  Camera,
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


interface Model {
  id: string
  file: string
}
interface Step {
  name?: string
  objs: Obj[]
}
interface Obj {
  id: string
  position?: [number, number, number]
  orientation?: [number, number, number]
}
interface CameraConfig {
  position?: [number, number, number]
  lookAt?: [number, number, number]
}
interface InitConfig {
  camera: CameraConfig | Camera
}
interface ManualOption {
  models: Model[]
  steps: Step[]
}

type ModelMap = Map<string, Object3D>

class Manual {
  private renderer
  private camera: Camera
  private scene
  private temp_index = 0
  private model_map: ModelMap = new Map<string, Object3D>()
  private steps: Step[] = []
  private modelContainer
  private controls
  private light

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
      }
      else {
        // user only passes configuration
        this.camera = new PerspectiveCamera(75, 2, 0.1, 5)
        const { position, lookAt } = config.camera
        position && this.camera.position.set(...position)
        lookAt && this.camera.lookAt(...lookAt)
      }
    }
    else {
      // default camera configuration
      this.camera = new PerspectiveCamera(75, 2, 0.1, 5)
      this.camera.position.z = 2
    }
    
    // 4. set orbit
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.maxAzimuthAngle = 0.25 * Math.PI
    this.controls.minAzimuthAngle = -0.25 * Math.PI
    this.controls.maxPolarAngle = Math.PI

    // 5. set light
    this.light = new DirectionalLight(0xffffff, 0.3)
    this.light.position.set(-11, 9, 9)
    this.scene.add(this.light)

    // 6. set group
    this.modelContainer = new Group()

    // 7. add group to scene
    this.scene.add(this.modelContainer)
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width  = canvas.clientWidth  * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
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

    requestAnimationFrame(() => {
      this.render()
    })
  }

  async setOption(option: ManualOption) {
    // 0. check length: not 0
    if (!(option.steps.length && option.models.length)) {
      throw new Error('Option\'s steps and models\' length must not be zero!')
    }

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
    this.temp_index = 0

    // 5. run the render function
    this.render()
  }

  private loadStep(num: number) {
    const step = this.steps[num]

    // 1. clear the container
    this.modelContainer.clear()

    // 2. add models to modelContainer
    step.objs.forEach((obj) => {
      const model = this.model_map.get(obj.id)
      if (!model) {
        throw new Error(`Id in steps(${obj.id}) doesn' t exist in models!`)
      }
      else {
        obj.position && model.position.set(...obj.position)
        obj.orientation && model.rotation.set(...obj.orientation)
        this.modelContainer.add(model)
      }
    })
  }

  showPrev() {
    if (this.temp_index === 0) {
      return
    }
    this.temp_index--
    this.loadStep(this.temp_index)
  }

  showNext() {
    if (this.temp_index === this.steps.length-1) {
      return
    }
    this.temp_index++
    this.loadStep(this.temp_index)
  }
}

export { Manual }
