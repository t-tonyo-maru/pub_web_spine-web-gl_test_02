import * as spine from '@esotericsoftware/spine-webgl'

// https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/barebones-dragon.html
// https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/barebones.html
// https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/drag-and-drop.js

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const path = 'assets/spine-data/'

  new spine.SpineCanvas(canvas, {
    pathPrefix: path,
    app: new App()
  })
}

class App implements spine.SpineCanvasApp {
  // private skeleton: spine.Skeleton
  // private state: spine.AnimationState

  loadAssets = (canvas: spine.SpineCanvas) => {
    canvas.assetManager.loadJson('model.json')
    canvas.assetManager.loadTextureAtlas('model.atlas')
  }
  initialize = (canvas: spine.SpineCanvas) => {
    console.log('canvas')
    console.log(canvas)
  }
  update = (canvas: spine.SpineCanvas, delta: number) => {}
  render = (canvas: spine.SpineCanvas) => {}
  error = (canvas: spine.SpineCanvas, errors: spine.StringMap<string>) => {}
}
