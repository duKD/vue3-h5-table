import type { Ref } from "vue";
import { onMounted, onUnmounted, reactive, watch, ref } from "vue";

const getAngle = (x: number, y: number) => {
  return (Math.atan2(y, x) * 180) / Math.PI;
};

const getTouchDirection = (x: number, y: number) => {
  if (Math.abs(x) > 5) {
    let angle = getAngle(x, y);
    if (angle >= -45 && angle <= 45) {
      // 向右
      return "right";
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      // 向左
      return "left";
    }
  } else {
    return "";
  }
};

//计算元素 滑动距离
export default function useTouchMoveLeftAndRight(
  target: Ref<null | HTMLElement>,
  options?: {
    touchstart?: Function;
    touchmove?: Function;
    touchend?: Function;
  }
) {
  //滑动距离
  const distanX = ref<number>(0);
  const distanY = ref<number>(0);

  // 位置标记 开始
  const start = reactive({
    x: 0,
    y: 0,
  });
  // 位置标记 结束
  const end = reactive({
    x: 0,
    y: 0,
  });

  const startHandle = (event: TouchEvent) => {
    let touch: Touch = event.touches[0];
    if (touch) {
      start.x = touch.pageX;
      start.y = touch.pageY;
      options?.touchstart?.(event);
    }
  };

  const moveHandle = (event: TouchEvent) => {
    let touch: Touch = event.touches[0];
    if (touch) {
      end.x = touch.pageX;
      end.y = touch.pageY;
      let direction = getTouchDirection(end.x - start.x, end.y - start.y);
      distanX.value = end.x - start.x;
      distanY.value = end.y - start.y;
      options?.touchmove?.(event, direction);
    }
  };

  const endHandle = (event: TouchEvent) => {
    let touch: Touch = event.changedTouches[0];
    if (touch) {
      end.x = touch.pageX;
      end.y = touch.pageY;
      options?.touchend?.(event);
    }
  };

  watch(target, () => {
    if (target.value) {
      let targetDom = target.value;
      targetDom.addEventListener("touchstart", startHandle, { passive: false });
      targetDom.addEventListener("touchmove", moveHandle, { passive: false });
      targetDom.addEventListener("touchend", endHandle, { passive: false });
    }
  });

  onUnmounted(() => {
    if (target.value) {
      target.value.removeEventListener("touchstart", startHandle);
      target.value.removeEventListener("touchmove", moveHandle);
      target.value.removeEventListener("touchend", endHandle);
    }
  });

  return [distanX, distanY];
}
