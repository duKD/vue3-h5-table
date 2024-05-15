<template>
  <div ref="titleRef" class="title">
    <div
      v-for="(item, index) in props.column"
      :key="index"
      :class="['table-row-column', index === 0 ? 'first-table-row-column' : '']"
      :style="{
        width: cellSize(item.width, props.rootValue),
        height: cellSize(props.height, props.rootValue),
        textAlign: item.align || 'center',
      }"
      @click="changeSortStatus(item)"
    >
      <h5-table-cell
        :key="index"
        :dataIndex="index"
        :dataValue="item.title"
        :slotKey="item.slotTitleKey"
        :slots="props.slots"
      />
      <span
        v-if="item.sortable && item.dataIndex"
        :class="[
          'table-caret-wrapper',
          sortStatus[item.dataIndex] === 1 ? 'is-ascending' : '',
          sortStatus[item.dataIndex] === 2 ? 'is-descending' : '',
        ]"
      >
        <i class="sort-caret ascending"></i>
        <i class="sort-caret descending"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup name="H5TableHeader">
import { ref, onMounted, reactive, SetupContext } from "vue";
import type { columnItemType, sortStatusType } from "../types";
import h5TableCell from "./h5-table-cell";
import { cellSize } from "../utils";

type propsType = {
  column: Array<columnItemType>;
  height?: number;
  slots: SetupContext["slots"];
  rootValue: number;
};

type emitType = {
  (e: "handleHeadSortClick", propKey: string, type: sortStatusType): void;
};

const sortStatus = ref<{ [p: string]: sortStatusType }>({});

const props = withDefaults(defineProps<propsType>(), {
  column: () => [],
  height: 60,
});

const emits = defineEmits<emitType>();

const titleRef = ref<HTMLElement | null>(null);

const changeSortStatus = (item: columnItemType) => {
  if (!item.dataIndex || !item.sortable) return;

  if (!sortStatus.value[item.dataIndex]) {
    sortStatus.value = {
      [item.dataIndex]: 0,
    };
  }
  sortStatus.value[item.dataIndex] = ((sortStatus.value[item.dataIndex] + 1) %
    3) as sortStatusType;
  emits(
    "handleHeadSortClick",
    item.dataIndex,
    sortStatus.value[item.dataIndex]
  );
};

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
    .is-ascending .ascending {
      border-bottom-color: #309fea;
    }
    .is-descending .descending {
      border-top-color: #309fea;
    }
  }
  .first-table-row-column {
    flex-grow: 0;
  }
}
</style>
