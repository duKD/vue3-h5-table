import BScroll, { Options } from "@better-scroll/core";
import { ref, Ref, watch } from "vue";

interface UseIScrollOptions extends Options {
  disable: Ref<boolean>; // 是否开启下拉加载
  bottomLoadEvent: Function;
  offset: number;
  handleTransform: Function;
}

export default function useIScroll(
  wrapper: Ref<HTMLElement | null>,
  tableDates: Ref<any[] | null>,
  options: UseIScrollOptions
) {
  const iScroll = ref<BScroll | null>();
  const distanceX = ref<number>(0);

  const { disable, offset, bottomLoadEvent, handleTransform } = options;

  const handleBottom = () => {
    if (wrapper.value) {
      if (
        wrapper.value.scrollHeight - wrapper.value.scrollTop <
        wrapper.value.clientHeight + offset
      ) {
        disable.value && bottomLoadEvent();
      }
    }
  };

  watch(wrapper, () => {
    // 初始化 iScroll 实例
    if (wrapper.value) {
      setTimeout(() => {
        iScroll.value = new BScroll(wrapper.value!, options);
        iScroll.value.on("scroll", (e: any) => {
          console.log("scroll-----", e);
          distanceX.value = e.x;
          handleTransform(distanceX.value);
        });
      }, 1000);
    }
  });

  watch(tableDates, () => {
    if (iScroll.value && tableDates.value) {
      iScroll.value.refresh();
    }
  });

  return [distanceX];
}
