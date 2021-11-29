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


import { AmbientLight, BoxGeometry, Mesh, MeshLambertMaterial, OrthographicCamera, PointLight, Scene, WebGLRenderer } from "three"

export function render(dom: HTMLElement) {
    /**
    * 创建场景对象Scene
    */
    const scene = new Scene()

    /**
     * 创建网格模型
     */

    const geometry = new BoxGeometry(100, 100, 100) // 创建立方体
    const material = new MeshLambertMaterial({
        color: 0x0000ff
    }) // 材质对象Material
    const mesh = new Mesh(geometry, material) // 网格模型对象Mesh

    scene.add(mesh) // 网格模型添加到场景对象中

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
    const { clientHeight: height, clientWidth: width } = dom

    const k = width / height  // 窗口宽高比
    const s = 200 // 三维场景显示范围控制系数，系数越大显示范围越大

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


    let T1 = new Date

    const loop = () => {
        const T2 = new Date
        const diff = T2.getTime() - T1.getTime() // 时间差

        T1 = T2 // 记录本次时间

        // 执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera)

        mesh.rotateY(0.001 * diff)

        requestAnimationFrame(loop)

    }

    loop()

    return function destory() {
        dom.removeChild(renderer.domElement)
    }
}

