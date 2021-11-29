import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'home',
        path: '/',
        component: () => import("./pages/Home")
    }, {
        name: 'first3dscene',
        path: '/first3dscene',
        component: () => import("./pages/First3DScene")
    }, {
        name: 'animation',
        path: '/animation',
        component: () => import("./pages/Animation")
    },
    {
        name: 'pm',
        path: '/pm',
        component: () => import("./pages/PM2.5")
    }, {
        name: 'tree',
        path: '/tree',
        component: () => import("./pages/Tree")
    }, {
        name: 'solarsystem',
        path: '/solarsystem',
        component: () => import("./pages/SolarSystem")
    }]
})