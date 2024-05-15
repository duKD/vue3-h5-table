import type { PropType as __PropType } from 'vue';
import type { columnItemType } from "../types";
declare const _sfc_main: import("vue").DefineComponent<{
    column: {
        type: __PropType<columnItemType[]>;
        required: true;
        default: () => never[];
    };
    height: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    slots: {
        type: __PropType<Readonly<{
            [name: string]: import("vue").Slot<any> | undefined;
        }>>;
        required: true;
    };
    rootValue: {
        type: __PropType<number>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "handleHeadSortClick"[], "handleHeadSortClick", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: __PropType<columnItemType[]>;
        required: true;
        default: () => never[];
    };
    height: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    slots: {
        type: __PropType<Readonly<{
            [name: string]: import("vue").Slot<any> | undefined;
        }>>;
        required: true;
    };
    rootValue: {
        type: __PropType<number>;
        required: true;
    };
}>> & {
    onHandleHeadSortClick?: ((...args: any[]) => any) | undefined;
}, {
    column: columnItemType[];
    height: number | undefined;
}, {}>;
export default _sfc_main;
