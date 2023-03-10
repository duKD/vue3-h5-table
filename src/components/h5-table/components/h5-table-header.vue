<template>
  <div ref="titleRef" class="title">
    <div
      v-for="(item, index) in props.column"
      :class="['table-row-column', index === 0 ? 'first-table-row-column' : '']"
      :style="{
        width: cellSize(item.width),
        height: cellSize(props.height),
        textAlign: item.align || 'center',
      }"
       @click="changeSortStatus(item.dataIndex||'')"
    >
      <h5-table-cell :key="index" :dataValue="item.title" />
      <span v-if="item.sortable&&item.dataIndex" :class="['table-caret-wrapper',sortStatus[item.dataIndex]===1 ? 'isascending' : '',sortStatus[item.dataIndex]===2 ? 'isdescending' : '',]">
        <i class="sort-caret ascending"></i>
        <i class="sort-caret descending"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup name="H5TableHeader">
import { ref, onMounted,reactive } from "vue";
import type { cloumnItemType,sortStatusType } from "../types";
import h5TableCell from "./h5-table-cell";
import {cellSize} from '../utils'

type propsType = {
  column: Array<cloumnItemType>;
  height?: number;
};


type emitType = {
  (e:'handleHeadSortClick',propKey:string,type:sortStatusType):void
}

const sortStatus = reactive<{[p:string]:sortStatusType}>({})





const props = withDefaults(defineProps<propsType>(), {
  column: () => [],
  height: 60,
});

const emits = defineEmits<emitType>()

const titleRef = ref<HTMLElement | null>(null);


const changeSortStatus = (propsKey:string)=>{
  if(!propsKey) return 
  
  for(let item in sortStatus){
    if(item !==propsKey){
      sortStatus[item] = 0
    }
  }


  if(!sortStatus[propsKey]){
    sortStatus[propsKey] = 0
  }
  sortStatus[propsKey] = (sortStatus[propsKey]+1)%3 as sortStatusType
  emits('handleHeadSortClick',propsKey,sortStatus[propsKey])
}


defineExpose({
  titleRef,
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  font-size: 24px;

  .table-row-column {
    position: relative;
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fcfcfc;

    .table-caret-wrapper {
      position: absolute;
      right: 0;
      width: 30px;
      height: 42px;
    }
    .sort-caret {
      border: 10px solid transparent;
      width: 0;
      height: 0;
      left: 0;
      position: absolute;
    }
    .ascending {
      border-bottom-color: #c0c4cc;
      top: 0;
    }
    .descending {
      border-top-color: #c0c4cc;
      bottom: 0;
    }
    .isascending .ascending{
      border-bottom-color: #309FEA;
    }
    .isdescending .descending{
      border-top-color: #309FEA;
    }
  }
  .first-table-row-column {
    flex-grow: 0;
  }
}
</style>
