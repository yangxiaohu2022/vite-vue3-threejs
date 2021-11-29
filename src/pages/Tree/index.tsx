import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    UnwrapRef,
} from "vue";
import { render } from "./render";
export default defineComponent({
    setup() {
        const elRef = ref();
        const renderRef: UnwrapRef<{ value: Function | undefined }> = ref();
        onMounted(async () => {
            // 渲染 scene  返回 移除销毁方法
            renderRef.value = await render(elRef.value);
        });
        onBeforeUnmount(() => {
            // 销毁
            renderRef.value!();
            renderRef.value = undefined;
        });
        return () => <div ref={elRef}></div>;
    },
});
