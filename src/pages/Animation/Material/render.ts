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


/**
 * Geometry  https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
 */

import { AmbientLight, AxesHelper, BoxGeometry, Mesh, MeshLambertMaterial, MeshPhongMaterial, OrthographicCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three"
import { OrbitControls } from "@/plugins/three/controls/OrbitControls"

export default function (dom: HTMLElement) {
    /**
    * 创建场景对象Scene
    */
    const scene = new Scene()

    /**
     * 创建网格模型
     */

    const geometry = new BoxGeometry(100, 100, 100) // 创建立方体
    // 半透明效果
    // 添加opacity和transparent属性
    // opacity的值是0~1之间
    // transparent表示是否开启透明度效果，默认是false表示透明度设置不起作用
    // 值设置为true，网格模型就会呈现透明的效果
    const material = new MeshLambertMaterial({
        color: 0x0000ff,
        opacity: 0.4,
        transparent: true
    }) // 材质对象Material
    const mesh = new Mesh(geometry, material) // 网格模型对象Mesh

    scene.add(mesh) // 网格模型添加到场景对象中

    // 球体网格模型
    const geometry2 = new SphereGeometry(60, 40, 40);

    // 高光效果
    // specular表示球体网格模型的高光颜色，改颜色的RGB值会与光照颜色的RGB分量相乘
    // shininess属性可以理解为光照强度的系数
    const material2 = new MeshPhongMaterial({
        color: 0xff00ff,
        specular: 0x4488ee,
        shininess: 12
    });

    const mesh2 = new Mesh(geometry2, material2); // 网格模型对象Mesh
    mesh2.translateY(110); // 球体网格模型沿Y轴正方向平移110
    scene.add(mesh2);

    /**
     * 辅助三维坐标系
     */

    const axisHelper = new AxesHelper(200)

    scene.add(axisHelper)

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


    // let T1 = new Date

    // const loop = () => {
    //     const T2 = new Date
    //     const diff = T2.getTime() - T1.getTime() // 时间差

    //     T1 = T2 // 记录本次时间

    //     // 执行渲染操作   指定场景、相机作为参数
    //     renderer.render(scene, camera)

    //     mesh.rotateY(0.001 * diff)

    //     requestAnimationFrame(loop)

    // }

    // loop()

    const render = () => {
        renderer.render(scene, camera) // 执行渲染操作
        requestAnimationFrame(render) // 请求再次执行渲染函数 render
    }

    render()

    const controls = new OrbitControls(camera, renderer.domElement) // 创建控件对象

    // 2. controls.addEventListener('change', render)

    return function destory() {
        dom.removeChild(renderer.domElement)
    }
}

