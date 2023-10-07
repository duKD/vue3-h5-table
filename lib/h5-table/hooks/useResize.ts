import { onMounted, onBeforeUnmount } from "vue";

export default function useResize(
  fn: Array<(this: Window, ev: UIEvent) => any>
) {
  onMounted(() => {
    fn.forEach((item) => {
      window.addEventListener("resize", item);
    });
  });

  onBeforeUnmount(() => {
    fn.forEach((item) => {
      window.removeEventListener("resize", item);
    });
  });
}
