import { type Slots, type FunctionalComponent } from "vue";
type PropsType = {
    render?: Function;
    dataItem?: any;
    dataValue: string;
    slotKey: string | undefined;
    slots: Slots;
};
declare const H5TableCell: FunctionalComponent<PropsType>;
export default H5TableCell;
