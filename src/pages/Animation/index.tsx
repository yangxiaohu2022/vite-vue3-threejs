import { defineComponent } from "vue";
import "./index.less";
import RequestAnimationFrame from "./RequestAnimationFrame";
import MouseRotate from "./MouseRotate";
import MultGeometry from "./MultGeometry";
import Material from "./Material";

export default defineComponent({
  setup() {
    return () => (
      <div class="animation-content">
        <RequestAnimationFrame />
        <MouseRotate />
        <MultGeometry />
        <Material />
      </div>
    );
  },
});
