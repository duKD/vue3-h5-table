import type { Ref } from 'vue';
export default function useTouchMoveLeftAndRight(target: Ref<null | HTMLElement>, options?: {
    touchstart?: Function;
    touchmove?: Function;
    touchend?: Function;
}): Ref<number>[];
