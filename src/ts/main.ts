import * as spine from '@esotericsoftware/spine-webgl'

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  console.log('spine')
  console.log(spine)

  console.log('canvas')
  console.log(canvas)

  class App implements spine.SpineCanvasApp {
    private skeleton: spine.Skeleton
    private state: spine.AnimationState

    // https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/barebones-dragon.html
    // https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/barebones.html
    // https://github.com/EsotericSoftware/spine-runtimes/blob/4.1/spine-ts/spine-webgl/example/drag-and-drop.js

    loadAssets = (canvas: spine.SpineCanvas) => {}
    initialize = (canvas: spine.SpineCanvas) => {}
    update = (canvas: spine.SpineCanvas, delta: number) => {}
    render = (canvas: spine.SpineCanvas) => {}
    error = (canvas: spine.SpineCanvas, errors: spine.StringMap<string>) => {}
  }

  // new spine.SpineCanvas(canvas, {
  //   pathPrefix: 'assets/spine-data/',
  //   app: new App()
  // })
}
