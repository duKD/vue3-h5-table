import { h, type Slots, type FunctionalComponent } from "vue";

type PropsType = {
  render?: Function;
  dataIndex?: any;
  dataItem?: any;
  dataValue: string;
  slotKey: string | undefined;
  slots: Slots;
};

const H5TableCell: FunctionalComponent<PropsType> = (props) => {
  // 插槽优先级最高
  if (props.slots && props.slotKey && props.slots[props.slotKey]) {
    return props.slots[props.slotKey]!({item: props.dataItem, index: props.dataIndex});
  }
  // 自定义 render
  if (props.render) {
    return props.render(h, props.dataItem);
  }
  // 默认value
  return h("div", { class: "cell", innerHTML: props.dataValue });
};

export default H5TableCell;
