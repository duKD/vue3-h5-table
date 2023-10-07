import { Ref, ref, onUnmounted, watch } from "vue";

export default function useHandleScroll(
  max: number, // 最多显示多少条
  count: Ref<number>, // 表格数据量
  realRowHeight: Ref<number>, // 每行数据实际高度 px
  tableRef: Ref<HTMLElement | null>,
  disable: Ref<boolean>, // 是否开启下拉加载
  optimized: boolean // 是否开启优化
) {
  // 上下 预留的数量
  const changeNum = 30;
  // 可以显示的列表索引数
  const showRange = ref<Array<number>>([0, max + changeNum * 2]);

  // 滚动距离
  const scrollStart = ref<number>(0);
  const scrollEnd = ref<number>(0);
  // 记录 总移动距离 用于计算 实际的index值
  const hasDistance = ref<number>(0);
  const curIndex = ref<number>(0);

  const needOptimized = () => {
    // 查看是否 开启下拉加载 是否 开启优化
    if (disable.value || !optimized) return false;
    // 数据量是否达标
    if (count.value <= max + changeNum * 2) return false;
    return true;
  };

  const setIndex = (index: number) => {
    showRange.value = [index, index + max + changeNum * 2];
  };
  const isShowRow = (index: number) => {
    if (disable.value || !optimized) return true;

    return index >= showRange.value[0] && index <= showRange.value[1];
  };

  const startChangeShowRange = () => {
    if (!needOptimized()) return;
    scrollStart.value = tableRef.value ? tableRef.value.scrollTop : 0;
    tableRef.value!.style.overflowY = "auto";
  };

  const endChangeShowRange = () => {
    if (!needOptimized()) return;
    tableRef.value!.style.overflowY = "hidden";
    scrollEnd.value = tableRef.value ? tableRef.value.scrollTop : 0;

    hasDistance.value += scrollEnd.value - scrollStart.value;

    curIndex.value = Math.ceil(hasDistance.value / realRowHeight.value);

    let distanY = (scrollEnd.value - scrollStart.value) / realRowHeight.value;

    const hasScrollIndex =
      (distanY > 0 ? Math.ceil(distanY) : Math.floor(distanY)) + curIndex.value;

    if (hasScrollIndex <= changeNum) {
      setIndex(0);
    } else if (
      hasScrollIndex > changeNum &&
      hasScrollIndex < count.value - max
    ) {
      setIndex(hasScrollIndex - changeNum);
    } else {
      setIndex(count.value - max - changeNum);
    }
  };

  watch(tableRef, () => {
    if (tableRef.value && optimized) {
      let targetDom = tableRef.value;
      targetDom.addEventListener("touchstart", startChangeShowRange, {
        passive: true,
      });
      targetDom.addEventListener("touchend", endChangeShowRange, {
        passive: true,
      });
    }
  });

  onUnmounted(() => {
    if (tableRef.value && optimized) {
      tableRef.value.removeEventListener("touchstart", startChangeShowRange);
      tableRef.value.removeEventListener("touchend", endChangeShowRange);
    }
  });

  return { isShowRow };
}
