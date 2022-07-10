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
  private skeleton: unknown
  private animationState: unknown

  constructor() {}

  loadAssets = (canvas: spine.SpineCanvas) => {
    // skeleton(json 形式) をロード
    canvas.assetManager.loadJson('model.json')
    // atlas ファイルをロード
    canvas.assetManager.loadTextureAtlas('model.atlas')
  }

  initialize = (canvas: spine.SpineCanvas) => {
    const assetManager = canvas.assetManager

    // テクスチャアトラスを生成
    const atlas = assetManager.require('model.atlas')
    // AtlasAttachmentLoader（リージョン、メッシュ、バウンディングボックス、パスのアタッチメントを解決するための要素）を生成
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas)
    // skeleton Json インスタンスを生成
    const skeletonJson = new spine.SkeletonJson(atlasLoader)

    // パース時に適用するスケールを設定
    skeletonJson.scale = 1
    // ファイルをパース
    const skeletonData = skeletonJson.readSkeletonData(
      assetManager.require('model.json')
    )
    // 新規スケルトンを生成
    this.skeleton = new spine.Skeleton(skeletonData)

    // skeleton データの位置を初期化。おそらく spine.SpineCanvas の原点(0, 0)は中央
    if (this.skeleton instanceof spine.Skeleton) {
      this.skeleton.x = 0
      this.skeleton.y = window.innerHeight * (-1 / 2)
    }

    // AnimationStateを作成し、`idle` アニメーションをセット
    const animationStateData = new spine.AnimationStateData(skeletonData)
    this.animationState = new spine.AnimationState(animationStateData)
    if (this.animationState instanceof spine.AnimationState) {
      this.animationState.setAnimation(0, 'idle', true)
    }
  }

  update = (canvas: spine.SpineCanvas, delta: number) => {
    if (!(this.animationState instanceof spine.AnimationState)) return
    if (!(this.skeleton instanceof spine.Skeleton)) return
    // delta タイムを用いてアニメーションを更新
    this.animationState.update(delta)
    // アニメーションを skeleton データに適用
    this.animationState.apply(this.skeleton)
    // skeleton データにボーンの更新をさせる
    this.skeleton.updateWorldTransform()
  }

  render = (canvas: spine.SpineCanvas) => {
    if (!(this.skeleton instanceof spine.Skeleton)) return
    const renderer = canvas.renderer

    // SP でうまくリサイズできないため、コメントアウト
    // renderer.resize(spine.ResizeMode.Expand)

    // canvas をクリア
    canvas.clear(0.2, 0.2, 0.2, 1)

    // レンダリング: 開始
    renderer.begin()
    // skeleton を描画
    renderer.drawSkeleton(this.skeleton, true)
    // レンダリング: 完了
    renderer.end()
  }

  error = (canvas: spine.SpineCanvas, errors: spine.StringMap<string>) => {
    console.log(canvas)
    console.log(errors)
  }
}
