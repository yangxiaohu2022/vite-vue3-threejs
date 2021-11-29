import { defineComponent, ref, onMounted, UnwrapRef } from "vue";
import render from "./render";
export default defineComponent({
    name: "SolarSystem",
    setup() {
        const renderRef = ref();
        onMounted(() => {
            render(renderRef.value);
        });
        return () => {
            return <div ref={renderRef}>SolarSystem</div>;
        };
    },
});
