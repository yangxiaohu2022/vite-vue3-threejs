import {
    AmbientLight,
    ArcCurve,
    BufferAttribute,
    BufferGeometry,
    Clock,
    DoubleSide,
    Group,
    LineBasicMaterial,
    LineLoop,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    PointLight,
    Points,
    PointsMaterial,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer,
} from "three";

import sunImg from "./texture/sun.jpg";
import mercuryImg from "./texture/mercury.jpg";
import venusImg from "./texture/venus.jpg";
import earthImg from "./texture/earth.jpg";
import marsImg from "./texture/mars.jpg";
import jupiterImg from "./texture/jupiter.jpg";

import 海王星 from "./texture/海王星.jpg";
import 天王星 from "./texture/天王星.jpg";
import 天王星环 from "./texture/天王星环.jpg";
import 土星 from "./texture/土星.jpg";
import 土星环 from "./texture/土星环.jpg";

import { OrbitControls } from "@/plugins/three/controls/OrbitControls";

const K = 5;
export default function (el: HTMLElement) {
    const scene = new Scene();

    const cloud = createParticleSystem();
    scene.add(cloud);

    const sunData = {
        r: 10 * K,
        name: "sun",
        url: sunImg,
    };
    const sun = createSphereMesh(sunData.r, sunData.url);
    sun.name = sunData.name;
    scene.add(sun);

    const planetData = getPlanetData();
    const planetGroup = new Group();
    scene.add(planetGroup);
    planetData.forEach(item => {
        let planetMesh;
        if (item.ring) {
            planetMesh = createSphereMesh(item.r!, item.url!);
        } else {
            planetMesh = createSphereMesh(item.r, item.url);
        }
        item.angle = Math.PI * 2 * Math.random()
        planetMesh.name = item.name
        planetGroup.add(planetMesh);
        const circle = createCircle(item.revolutionR)
        scene.add(circle)
    });

    const [width, height] = getWidthHeight();
    const k = width / height;
    const s = 350;
    const camera = new OrthographicCamera(-k * s, k * s, s, -s, 1, 2500);
    camera.position.set(651, 613, 525);
    camera.lookAt(scene.position);

    const pointLight = new PointLight(0xffffff);
    pointLight.position.set(400, 200, 300);
    scene.add(pointLight);

    const ambient = new AmbientLight(0x444444);
    scene.add(ambient);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x101010, 1);

    renderer.setSize(width, height);
    renderer.render(scene, camera);
    el.innerHTML = "";
    el.append(renderer.domElement);

    const cloudStep = 0.0005;
    let clock = new Clock()
    const fps = 60;
    const 刷新时间 = 1 / fps
    let timeS = 0
    const render = () => {

        sun.rotation.y += 0.01;

        var 渲染间隔 = clock.getDelta();
        timeS = timeS + 渲染间隔;
        if (timeS > 刷新时间) {
            renderer.render(scene, camera);
            timeS = 0;
        }

        planetGroup.children.forEach((geo, index) => {
            const item = planetData[index]
            item.angle += 0.005 / item.revolutionR * 400;
            geo.position.set(item.revolutionR * Math.cos(item.angle), 0, item.revolutionR * Math.sin(item.angle))
            geo.rotation.y += 0.01;
        })

        cloud.rotation.x += cloudStep;
        cloud.rotation.y += cloudStep;
        cloud.rotation.z += cloudStep;
        requestAnimationFrame(render);
    };
    render();
    const controls = new OrbitControls(camera, renderer.domElement);
}

const textureLoader = new TextureLoader();

const createCircle = (r: number) => {
    const arc = new ArcCurve(0, 0, r, 0, 2 * Math.PI, true);
    const points = arc.getPoints(100)
    const geometry = new BufferGeometry()
    geometry.setFromPoints(points)

    const material = new LineBasicMaterial({
        color: 0x222222
    })

    const line = new LineLoop(geometry, material)
    line.rotateX(Math.PI / 2);
    return line
}

const createMesh = (geometry: BufferGeometry, url: string) => {
    const meshMaterial = new MeshBasicMaterial({
        map: textureLoader.load(url),
        side: DoubleSide,
    });
    const mesh = new Mesh(geometry, meshMaterial);
    return mesh;
};

const createSphereMesh = (r: number, url: string) => {
    const geometry = new SphereGeometry(r, 100, 100);
    return createMesh(geometry, url);
};

const createParticleSystem = () => {
    const geometry = new BufferGeometry();

    const n = 2500;
    const verArr = [],
        colorArr = [];
    for (let i = 0; i < 10000; i++) {
        verArr.push(
            (Math.random() - 0.5) * n,
            (Math.random() - 0.5) * n,
            (Math.random() - 0.5) * n
        );
        const color_k = Math.random();
        colorArr.push(color_k, color_k, color_k * 0.6);
    }

    const vertices = new Float32Array(verArr);
    const colors = new Float32Array(colorArr);

    geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));

    const pointsMaterial = new PointsMaterial({
        size: 0.1,
        vertexColors: true,
    });

    const points = new Points(geometry, pointsMaterial);
    return points;
};
const getWidthHeight = () => [window.innerWidth, window.innerHeight];

const getPlanetData = () => [
    {
        r: 2.5 * K,
        name: "mercury",
        url: mercuryImg,
        angle: 0,
        revolutionR: 20 * K,
    },
    {
        name: "venus",
        r: 3 * K,
        angle: 0,
        url: venusImg,
        revolutionR: 30 * K,
    },
    {
        name: "earth",
        r: 3.2 * K,
        angle: 0,
        url: earthImg,
        revolutionR: 40 * K,
    },
    {
        name: "mars",
        r: 2.5 * K, angle: 0,
        url: marsImg,
        revolutionR: 50 * K,
    },
    {
        name: "jupiter",
        r: 5 * K,
        angle: 0,
        url: jupiterImg,
        revolutionR: 60 * K,
    },
    {
        name: "土星",
        r: 3.5 * K,
        url: 土星,
        angle: 0,
        ring: {
            r1: 4 * K,
            r2: 6 * K,
            url: 土星环,
        },
        revolutionR: 70 * K,
    },
    {
        name: "天王星",
        r: 3.5 * K,
        url: 天王星,
        angle: 0,
        ring: {
            r1: 4 * K,
            r2: 6 * K,
            url: 天王星环,
        },
        revolutionR: 80 * K,
    },
    {
        name: "海王星",
        r: 4 * K,
        angle: 0,
        url: 海王星,
        revolutionR: 100 * K,
    },
];
