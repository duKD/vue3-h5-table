<template>
  <section class="table-row">
    <div
      v-for="(item, index) in props.column"
      :class="['table-row-column', index === 0 ? 'first-table-row-column' : '']"
      :style="{
        width: cellSize(item.width),
        height: cellSize(props.height),
        textAlign: item.align || 'center',
      }"
    >
      <h5-table-cell
        :key="index"
        :dataValue="item.dataIndex ? props.dataItem[item.dataIndex] : ''"
        :dataItem="props.dataItem"
        :render="item.render"
        :slotKey="item.slotKey"
        :slots="props.slots"
      />
    </div>
  </section>
</template>
<script lang="ts" setup name="H5TableRow">
import h5TableCell from "./h5-table-cell";
import type { SetupContext } from "vue";
import type { columnItemType } from "../types";
import { cellSize } from "../utils";

type propsType = {
  column: Array<columnItemType>;
  dataItem: any;
  height: number;
  slots: SetupContext["slots"];
};

const props = withDefaults(defineProps<propsType>(), {
  column: () => [],
});
</script>
<style lang="scss" scoped>
.table-row {
  display: flex;
  flex-wrap: nowrap;
}
.table-row-column {
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.first-table-row-column {
  flex-grow: 0;
}

.cell {
  width: 100%;
  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.center {
  text-align: center;
}
</style>
