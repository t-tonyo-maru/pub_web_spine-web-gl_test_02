import * as spine from '@esotericsoftware/spine-webgl'

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  console.log("spine")
  console.log(spine)

  console.log("canvas")
  console.log(canvas)

  // new spine.SpineCanvas(canvas, {
  //   pathPrefix: 'assets/spine-data/',
  //   app: new App()
  // })
}
