import { ref, onUnmounted } from "vue";

export default function useDebounce(fn: Function, delay: number) {
  const timer = ref<NodeJS.Timeout | null>(null);

  const debounce = (...args: any[]) => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    timer.value = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  // 在组件卸载时清除定时器，防止内存泄漏
  onUnmounted(() => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
  });

  return debounce;
}
