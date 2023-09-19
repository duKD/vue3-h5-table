import { Ref } from "vue";
export default function useHandleScroll(max: number, // 最多显示多少条
count: Ref<number>, // 表格数据量
rowHeight: number, // 每行高度
multiplex: number, // 设计几倍图
tableRef: Ref<HTMLElement | null>, disable: Ref<boolean>, // 是否开启下拉加载
optimized: boolean): {
    isShowRow: (index: number) => boolean;
};
