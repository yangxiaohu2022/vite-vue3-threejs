#### [几何体 Geometry](https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry)

```js
//长方体 参数：长，宽，高
const geometry = new BoxGeometry(100, 100, 100);
// 球体 参数：半径60  经纬度细分数40,40
const geometry = new SphereGeometry(60, 40, 40);
// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
const geometry = new CylinderGeometry(50, 50, 100, 25);
// 正八面体
const geometry = new OctahedronGeometry(50);
// 正十二面体
const geometry = new DodecahedronGeometry(50);
// 正二十面体
const geometry = new IcosahedronGeometry(50);
```
