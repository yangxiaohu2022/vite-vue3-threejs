import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
    name: "Home",
    setup() {
        return () => (
            <>
                <RouterLink to={"first3dscene"}>第一个3D场景</RouterLink>
                <br />
                <RouterLink to={"animation"}>动画</RouterLink>
                <br />
                <RouterLink to={"pm"}>PM2.5</RouterLink>
                <br />
                <RouterLink to={"tree"}>Tree</RouterLink>
                <br />
                <RouterLink to={"solarsystem"}>太阳系</RouterLink>
            </>
        );
    },
});
