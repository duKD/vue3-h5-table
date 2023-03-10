import { defineComponent, h } from "vue";

export default defineComponent({
  name: "H5TableCell",
  props: ["render", "dataItem", "dataValue","slotKey","slots"],
  setup(props) {
    return () => {
         
      // 插槽优先级最高
      if(props.slots&&props.slotKey&&props.slots[props.slotKey]){
        return props.slots[props.slotKey](props.dataItem)
      }
      // 自定义 render
      if (props.render) {
        return props.render(h,props.dataItem) 
      } 
      // 默认value
      return h('div',{class:'cell',innerHTML:props.dataValue})
    };
  },
});
