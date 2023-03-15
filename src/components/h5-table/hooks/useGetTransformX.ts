import useTouchMoveLeftAndRight from "./useTouchMoveLeftAndRight";
import { ref, type Ref } from "vue";

//计算左右能移动的 px 位移
export default function useGetTransformX(
  target: Ref<HTMLElement | null>,
  tablewidth: Ref<number>,
  tableContent: Ref<number>,
  stopPropagation: boolean = true
) {
  const previousX = ref<number>(0);

  const transformX = ref<number>(0);

  const touchend = () => {
    previousX.value = transformX.value;
    distanX.value = 0;
    distanY.value = 0;
  };

  const touchmove = (event: TouchEvent, direction: string) => {
    if (direction) {
      event.cancelable && event.preventDefault();
      const max = tableContent.value - tablewidth.value;
      console.log(5555, tableContent.value, tablewidth.value);

      // 只有表格内容超过了 表格外部 才让拖动
      if (max > 0) {
        const temp = Math.min(previousX.value + distanX.value, 0);
        const res = Math.max(-max, temp);
        transformX.value = res;
      }
    }

    if (stopPropagation) {
      if (target.value?.scrollTop !== 0) {
        event.stopPropagation();
      }
    }
  };

  const [distanX, distanY] = useTouchMoveLeftAndRight(target, {
    touchmove,
    touchend,
  });

  return [transformX, distanX, distanY];
}
