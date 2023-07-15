import { Group } from 'three'
import { LoadingManager } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

class ModelLoader {
  private manager = new LoadingManager()

  constructor() {
    this.manager.addHandler(/\.obj$/i, new OBJLoader())
  }

  async loadAsync(file: string): Promise<Group> {
    const loader = this.manager.getHandler(file)
    return loader?.loadAsync(file)
  }
}

export const loader = new ModelLoader()
