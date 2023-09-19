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
            [name: string]: import("vue").Slot | undefined;
        }>>;
        required: true;
    };
    multiple: {
        type: __PropType<number>;
        required: true;
    };
}, {
    titleRef: import("vue").Ref<HTMLElement | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "handleHeadSortClick"[], "handleHeadSortClick", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
            [name: string]: import("vue").Slot | undefined;
        }>>;
        required: true;
    };
    multiple: {
        type: __PropType<number>;
        required: true;
    };
}>> & {
    onHandleHeadSortClick?: ((...args: any[]) => any) | undefined;
}, {
    column: columnItemType[];
    height: number | undefined;
}>;
export default _sfc_main;
