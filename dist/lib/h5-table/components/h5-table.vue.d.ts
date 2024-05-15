import type { PropType as __PropType } from 'vue';
import type { columnItemType } from "../types";
declare const _sfc_main: import("vue").DefineComponent<{
    minTableHeight: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    rowNum: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    headerHeight: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    rowHeight: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    column: {
        type: __PropType<columnItemType[]>;
        required: true;
    };
    tableDatas: {
        type: __PropType<any[]>;
        required: true;
        default: () => never[];
    };
    fixedHeader: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isClick: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    error: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    loading: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    finish: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    loadingText: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    errorText: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    finishedText: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    offset: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    rootValue: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("load" | "handleHeadSortClick" | "rowClick" | "update:loading" | "update:error")[], "load" | "handleHeadSortClick" | "rowClick" | "update:loading" | "update:error", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    minTableHeight: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    rowNum: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    headerHeight: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    rowHeight: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    column: {
        type: __PropType<columnItemType[]>;
        required: true;
    };
    tableDatas: {
        type: __PropType<any[]>;
        required: true;
        default: () => never[];
    };
    fixedHeader: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isClick: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    error: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    loading: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    finish: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    loadingText: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    errorText: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    finishedText: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    offset: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    rootValue: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
}>> & {
    onLoad?: ((...args: any[]) => any) | undefined;
    onHandleHeadSortClick?: ((...args: any[]) => any) | undefined;
    onRowClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    "onUpdate:error"?: ((...args: any[]) => any) | undefined;
}, {
    error: boolean | undefined;
    rootValue: number | undefined;
    minTableHeight: number | undefined;
    rowNum: number | undefined;
    headerHeight: number | undefined;
    rowHeight: number | undefined;
    tableDatas: any[];
    fixedHeader: boolean | undefined;
    isClick: boolean | undefined;
    disable: boolean | undefined;
    loading: boolean | undefined;
    finish: boolean | undefined;
    loadingText: string | undefined;
    errorText: string | undefined;
    finishedText: string | undefined;
    offset: number | undefined;
}, {}>;
export default _sfc_main;
