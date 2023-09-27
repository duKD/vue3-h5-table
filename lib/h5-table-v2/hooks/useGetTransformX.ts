import useTouchMoveLeftAndRight from "./useTouchMoveLeftAndRight";
import { onMounted, ref, type Ref } from "vue";

//计算左右能移动的 px 位移
export default function useGetTransformX(
  target: Ref<HTMLElement | null>,
  tablewidth: Ref<number>,
  tableContent: Ref<number>,
  disable: Ref<boolean>,
  bottomLoadEvent: Function,
  offset: number,
  stopPropagation: boolean = true
) {
  const previousX = ref<number>(0);

  const transformX = ref<number>(0);

  const handleBottom = () => {
    if (target.value) {
      if (
        target.value.scrollHeight - target.value.scrollTop <
        target.value.clientHeight + offset
      ) {
        disable.value && bottomLoadEvent();
      }
    }
  };

  const touchend = () => {
    previousX.value = transformX.value;
    distanX.value = 0;
    distanY.value = 0;
  };

  const touchmove = (event: TouchEvent, direction: string) => {
    if (direction) {
      event.cancelable && event.preventDefault();
      const max = tableContent.value - tablewidth.value;
      // 只有表格内容超过了 表格外部 才让拖动
      if (max > 0) {
        const temp = Math.min(previousX.value + distanX.value, 0);
        const res = Math.max(-max, temp);
        transformX.value = res;
      }
    }
    // 兼容处理 滚动事件行为
    if (stopPropagation) {
      if (target.value?.scrollTop !== 0) {
        event.stopPropagation();
      }
    }

    if (distanY.value <= 0) {
      handleBottom();
    }
  };

  onMounted(() => {
    handleBottom();
  });

  const [distanX, distanY] = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend,
  });

  return [transformX, distanX, distanY];
}
