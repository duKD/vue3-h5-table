import type { PropType as __PropType } from 'vue';
import type { columnItemType } from "../types";
declare const _sfc_main: import("vue").DefineComponent<{
    column: {
        type: __PropType<columnItemType[]>;
        required: true;
        default: () => never[];
    };
    dataItem: {
        type: __PropType<any>;
        required: true;
    };
    height: {
        type: __PropType<number>;
        required: true;
    };
    slots: {
        type: __PropType<Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>>;
        required: true;
    };
    rootValue: {
        type: __PropType<number>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: __PropType<columnItemType[]>;
        required: true;
        default: () => never[];
    };
    dataItem: {
        type: __PropType<any>;
        required: true;
    };
    height: {
        type: __PropType<number>;
        required: true;
    };
    slots: {
        type: __PropType<Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>>;
        required: true;
    };
    rootValue: {
        type: __PropType<number>;
        required: true;
    };
}>>, {
    column: columnItemType[];
}>;
export default _sfc_main;
