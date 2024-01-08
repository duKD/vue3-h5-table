import type { Ref } from "vue";
import { onMounted, onUnmounted, reactive, watch, ref } from "vue";

export default function useScroll(
  target: Ref<null | HTMLElement>,
  handelScroll: Function
) {
  const handelScrollBase = () => {
    handelScroll();
  };

  watch(target, () => {
    if (target.value) {
      let targetDom = target.value;
      targetDom.addEventListener("scroll", handelScrollBase, {
        passive: false,
      });
    }
  });

  onUnmounted(() => {
    if (target.value) {
      target.value.removeEventListener("scroll", handelScrollBase);
    }
  });

  return [];
}
