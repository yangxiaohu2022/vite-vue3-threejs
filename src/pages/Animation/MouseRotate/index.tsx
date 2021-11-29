import { defineComponent, ref, onMounted } from "vue";
import render from "./render";

export default defineComponent({
  setup() {
    const el = ref();
    onMounted(() => {
      render(el.value);
    });
    return () => (
      <div class="animation-block" ref={el}>
        <span>MouseRotate</span>
      </div>
    );
  },
});
