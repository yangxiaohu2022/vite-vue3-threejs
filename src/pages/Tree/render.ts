/** 
 * 程序结构
 *                                                                                                 
 *                                              几何体 Geometry -- 形状 和 尺寸                      
 *                                             /                                                  
 *                                            /                                                   
 *                                网格模型 Mesh -- 材质 Material -- 颜色 贴图 透明度
 *                               /
 *                              /
 *                    场景 Scene -- 光照 Light -- 颜色
 *                  /                        \
 *                 /                          \
 *                /                            分类 -- 平行光  点光源  平行光     
 *               /
 *              /
 *             /                位置
 *            /               / 
 *           /               /  视线方向
 *          /               / /          透射投影 PerspectiveCamera
 *         /               / /          /
 * three.js ---- 相机 Camera --- 投影方式 - 正射投影 OrthographicCamera
 *         \
 *          \                    渲染器创建 -- WebGLRender()
 *           \                 /
 *            \               /  
 *              渲染器 Renderer -- 开始渲染 -- .render(scene, camera)
 *                             \
 *                              \
 *                                domElement 属性 -- canvas 对象
 */


import { AmbientLight, Mesh, MeshLambertMaterial, OrthographicCamera, PlaneGeometry, PointLight, RepeatWrapping, Scene, Sprite, SpriteMaterial, TextureLoader, WebGLRenderer } from "three"

import treeImg from "./tree.png"
import grassImg from "./grasslight-big.jpg"

export async function render(dom: HTMLElement) {
    /**
    * 创建场景对象Scene
    */
    const scene = new Scene()

    /**
     * 精灵创建树林效果
     */

    // 加载树纹理贴图
    const textureTree = await new TextureLoader().loadAsync(treeImg)

    // 批量创建表示一个树的精灵模型

    for (let i = 0; i < 100; i++) {
        const spriteMaterial = new SpriteMaterial({
            map: textureTree // 设置精灵纹理贴图
        })
        // 创建精灵模型对象
        const sprite = new Sprite(spriteMaterial)
        scene.add(sprite)
        // 控制精灵大小
        sprite.scale.set(10, 10, 1) // 只需设置xy方向分量
        const k1 = Math.random() - 0.5;
        const k2 = Math.random() - 0.5;
        // 设置精灵模型位置，在xoz平面上随机分布
        sprite.position.set(100 * k1, 10, 100 * k2)
    }

    /**
     * 创建一个草地平面
     */
    const geometry = new PlaneGeometry(100, 100) // 创建矩形平面
    // 加载草地纹理贴图
    const texture = await new TextureLoader().loadAsync(grassImg)

    // 设置纹理的重复模式
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    // uv两个方向纹理重复数量
    texture.repeat.set(10, 10)

    const material = new MeshLambertMaterial({
        // color: 0x777700,
        lightMap: texture
    })
    const mesh = new Mesh(geometry, material) // 网格模型
    scene.add(mesh) // 网格模型添加到场景中
    mesh.rotateX(-Math.PI / 2)


    /**
     * 光源设置
     */

    const point = new PointLight(0xfff) // 电光源
    point.position.set(400, 200, 300) // 设置光源位置
    scene.add(point)  // 添加光源到场景中

    // 环境光
    const ambient = new AmbientLight(0x444)
    scene.add(ambient) // 添加环境光到场景中

    /**
     * 相机
     */

    // 窗口宽高
    const { innerHeight: height, innerWidth: width } = window

    const k = width / height  // 窗口宽高比
    const s = 20 // 三维场景显示范围控制系数，系数越大显示范围越大

    // 创建相机
    const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)

    camera.position.set(200, 300, 200) // 设置相机位置

    camera.lookAt(scene.position) // 设置相机方向，指向的场景对象

    /**
     * 创建渲染器对象
     */

    const renderer = new WebGLRenderer
    renderer.setSize(width, height) // 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1) // 设置背景色

    dom.appendChild(renderer.domElement) // 插入到页面

    const loop = () => {
        // 执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }

    loop()

    return function destory() {
        dom.removeChild(renderer.domElement)
    }
}

