import type { h } from "vue";

export type renderType = typeof h;

export type columnItemType = {
  title: string; // 列名
  dataIndex?: string; // table data key 值
  width: number; // 列 宽度
  slotKey?: string; // 插槽作用域 id
  slotTitleKey?: string; // 头部插槽作用域 id
  sortable?: boolean; //是否 支持排序
  align?: "left" | "center" | "right"; // 布局
  key?: string; // 哪个列数据 作为 唯一key 值 默认 index
  render?: (h: renderType, row: any) => void; // 自定义render
  fixedLeft?: boolean; // 是否固定在左侧
};

// 0 默认 1 升 2 降
export type sortStatusType = 0 | 1 | 2;
