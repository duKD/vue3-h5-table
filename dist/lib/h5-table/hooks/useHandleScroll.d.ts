import { Ref } from "vue";
export default function useHandleScroll(max: number, // 最多显示多少条
count: Ref<number>, // 表格数据量
realRowHeight: Ref<number>, // 每行数据实际高度 px
tableRef: Ref<HTMLElement | null>, disable: Ref<boolean>, // 是否开启下拉加载
optimized: boolean): {
    isShowRow: (index: number) => boolean;
};
