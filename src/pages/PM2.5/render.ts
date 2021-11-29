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


import { AmbientLight, FileLoader, Group, OrthographicCamera, PointLight, Scene, Sprite, SpriteMaterial, TextureLoader, WebGLRenderer } from "three"

import imgeSrc from "./snowflake1.png"

interface PM {
    name: string,
    value: number,
    coordinate: number[]
}

export function render(dom: HTMLElement) {
    /**
    * 创建场景对象Scene
    */
    const scene = new Scene()

    /**
     * 一个精灵模型对象表示一个城市的位置和数据
     */

    // 加载一个背景透明的圆形贴图，矩形精灵显示为圆形效果
    const texture = new TextureLoader().load(imgeSrc)

    // 创建组对象，包含所有精灵对象
    const group = new Group()

    // 文件加载对象
    const loader = new FileLoader()

    // 加载PM2.5数据

    loader.load("./pm2.5.json", (data) => {
        const res = JSON.parse(data as string) as [PM]
        //遍历数据
        res.forEach(elem => {
            // 精灵材质
            var spriteMaterial = new SpriteMaterial({
                // map: texture, // 设置精灵纹理贴图
                // transparent: true,
                // opacity: 1,
                color: "red",
            });
            // 创建精灵模型对象
            var sprite = new Sprite(spriteMaterial);
            group.add(sprite);
            // 控制精灵大小   使用PM2.5大小设置精灵模型的大小
            // 注意适当缩放pm2.5大小,以便得到更好的显示效果
            var k = elem.value / 200
            sprite.scale.set(k, k, 1);
            //获得城市坐标设置精灵模型对象的位置
            sprite.position.set(elem.coordinate[0], elem.coordinate[1], 0)

        })

    })
    // 中国城市坐标整体的几何中心不在坐标原点，需要适当的平移
    group.position.set(-110, -30, 0);
    scene.add(group);//把精灵群组插入场景中

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

