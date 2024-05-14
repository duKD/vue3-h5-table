import type { h } from "vue";
export type renderType = typeof h;
export type columnItemType = {
    title: string;
    dataIndex?: string;
    width: number;
    slotKey?: string;
    slotTitleKey?: string;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    key?: string;
    render?: (h: renderType, row: any) => void;
    fixedLeft?: boolean;
};
export type sortStatusType = 0 | 1 | 2;
