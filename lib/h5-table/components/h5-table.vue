<template>
  <div
    ref="tableRef"
    class="table"
    :style="{
      height: handleCellSize(tableHeight),
    }"
  >
    <section class="table-header">
      <div
        class="fixed-title-mark"
        v-if="props.fixedHeader"
        :style="{
          width: handleCellSize(firstColumn.width),
          height: handleCellSize(props.headerHeight),
          textAlign: firstColumn.align || 'center',
        }"
      >
        <h5-table-cell
          :key="Math.random()"
          :dataValue="firstColumn.title"
          :slotKey="firstColumn.slotTitleKey"
          :slots="$slots"
        />
      </div>
      <div v-show="moreMark" class="fixed-title-more">
        <div class="mark"></div>
      </div>
      <h5-table-header
        ref="tableContainerRef"
        :column="props.column"
        :class="['title-header', { fixedHeader: props.fixedHeader }]"
        :style="{
          transform: `translateX(${distanTableX})`,
          transition: 'none',
        }"
        @handleHeadSortClick="handleHeadSortClick"
        :slots="$slots"
        :multiple="props.multiple"
      ></h5-table-header>
      <section
        v-if="props.fixedHeader"
        :style="{
          height: handleCellSize(props.headerHeight),
        }"
      ></section>
      <section
        class="first-column"
        :style="{
          width: handleCellSize(firstColumn.width),
        }"
      >
        <div
          :class="['table-row-column', 'first-table-row-column']"
          :style="{
            width: handleCellSize(firstColumn.width),
            height: handleCellSize(props.headerHeight),
            borderBottom: 'none',
            textAlign: firstColumn.align || 'center',
          }"
        >
          <h5-table-cell
            :key="Math.random()"
            :dataValue="firstColumn.title"
            :style="{
              ...(props.fixedHeader && {
                visibility: 'hidden',
              }),
            }"
          />
        </div>
        <template v-for="(item, index) in props.tableDatas">
          <div
            :class="['table-row-column', 'first-table-row-column']"
            :style="{
              width: handleCellSize(firstColumn.width),
              height: handleCellSize(props.rowHeight),
              textAlign: firstColumn.align || 'center',
            }"
            v-if="isShowRow(index)"
          >
            <h5-table-cell
              :key="index"
              :dataValue="
                firstColumn.dataIndex ? item[firstColumn.dataIndex] : ''
              "
              :dataItem="item"
              :render="firstColumn.render"
              :slotKey="firstColumn.slotKey"
              :slots="$slots"
            />
          </div>
        </template>
      </section>
    </section>

    <section
      class="table-content"
      :style="`transform: translateX(${distanTableX});transition:none`"
    >
      <template v-for="(item, index) in props.tableDatas">
        <h5-table-row
          v-if="isShowRow(index)"
          :key="index"
          :data-item="item"
          :column="props.column"
          :height="props.rowHeight"
          :slots="$slots"
          :multiple="props.multiple"
          @touchend.native="handleClick(item, index)"
        >
        </h5-table-row>
      </template>
    </section>
    <section
      class="loading"
      @click="tryAgain"
      v-show="props.disable && loadingText.length > 0"
    >
      {{ loadingText }}
    </section>
    <slot name="rowDownMark"></slot>
  </div>
</template>
<script lang="ts" setup name="H5Table">
import h5TableCell from "./h5-table-cell";
import H5TableRow from "./h5-table-row.vue";
import H5TableHeader from "./h5-table-header.vue";
import useGetTransformX from "../hooks/useGetTransformX";
import useHandleScroll from "../hooks/useHandleScroll";
import {
  onMounted,
  computed,
  ref,
  watchEffect,
  watch,
  onBeforeUpdate,
} from "vue";
import type { columnItemType, sortStatusType } from "../types";
import { cellSize, pxtorem } from "../utils";

type propstype = {
  minTableHeight?: number; //表格最小高度
  rowNum?: number; // 表格显示几行
  headerHeight?: number; // 头部默认高度
  rowHeight?: number; //每行数据的默认高度
  column: Array<columnItemType>;
  tableDatas: Array<any>;
  fixedHeader?: boolean; // 是否固定表头
  isClick?: boolean; // 是否需要触发行点击事件
  disable?: boolean; // 是否启用下拉加载
  error?: boolean; // 数据加载失败
  loading?: boolean; // 数据处于加载状态
  finish?: boolean; // 数据 是否完全加载
  loadingText?: string; // 加载文案
  errorText?: string; // 失败文案
  finishedText?: string; // 完成文案
  offset?: number; //触发加载的底部距离
  multiple?: number; // 设计稿几倍图
  optimized?: boolean; // 是否开启优化
};

type emitType = {
  (e: "rowClick", item: any, index: number): void;
  (e: "handleHeadSortClick", propKey: string, type: sortStatusType): void;
  (e: "update:loading", val: boolean): void;
  (e: "update:error", val: boolean): void;
  (e: "load"): void;
};

const distanTableX = ref<string>("");
const tableHeight = ref<number>(600);
const tablewidth = ref<number>(0);
const tablecontent = ref<number>(0);
const tableRef = ref<HTMLElement | null>(null);
const tableContainerRef = ref<typeof H5TableHeader | null>(null);

const props = withDefaults(defineProps<propstype>(), {
  minTableHeight: 600,
  rowNum: 6,
  headerHeight: 60,
  rowHeight: 100,
  tableDatas: () => [],
  fixedHeader: true,
  isClick: true,
  disable: false, // 是否启用下拉加载
  error: false, // 数据加载失败
  loading: false, // 数据处于加载状态
  finish: false, // 数据 是否完全加载
  loadingText: "加载中...", // 加载文案
  errorText: "出错了", // 失败文案
  finishedText: "到底了", // 完成文案
  offset: 10,
  multiple: 2,
  optimized: false,
});

const emits = defineEmits<emitType>();

const disable = computed(() => props.disable);

const moreMark = ref<boolean>(false);

const handleCellSize = (num: number | undefined) => {
  return cellSize(num, props.multiple);
};

const loading = computed({
  get() {
    return props.loading;
  },
  set(val: boolean) {
    emits("update:loading", val);
  },
});

const error = computed({
  get() {
    return props.error;
  },
  set(val: boolean) {
    emits("update:error", val);
  },
});

const loadingText = computed(() => {
  let str = "";
  if (loading.value) {
    str = props.loadingText;
  }
  if (props.finish) {
    str = props.finishedText;
  }
  if (error.value) {
    str = props.errorText;
  }
  return str;
});

const bottomEvent = () => {
  if (props.finish) return;
  if (!loading.value) {
    loading.value = true;
    emits("load");
  }
};

const tryAgain = () => {
  if (error.value) {
    error.value = false;
    emits("load");
  }
};

const handleClick = (item: any, index: number) => {
  if (!props.isClick) return;
  //只有 左右 上下 移动 都在 20像素之内 才判定 用户点击
  if (Math.abs(distanX.value) < 20 && Math.abs(distanY.value) < 20) {
    emits("rowClick", item, index);
  }
};

const handleHeadSortClick = (propKey: string, type: sortStatusType) => {
  emits("handleHeadSortClick", propKey, type);
};

// const getKey = (item: any, index: number) => {
//   const temp = props.column.find((obj) => obj.key);
//   if (temp) {
//     return item[temp.key as any];
//   }
//   return index;
// };

// 根据 指定下标 下 移动元素
const handleDom = () => {
  // 使用闭包 记录 上次 被操作的dom 列表
  let pre_doms: Array<any> = [];
  return (height: number, index: number) => {
    if (pre_doms.length > 0) {
      pre_doms.forEach((item) => {
        item.style.marginBottom = 0;
      });
      // 恢复清空
      pre_doms = [];
    }

    // index -1 表示 恢复margin 移动
    if (index === -1) return;

    const tabelDom = tableRef.value;
    //获取第一列
    const firstColumn =
      tabelDom?.querySelector(".table-header .first-column") || null;

    const targetDom = firstColumn?.children[index + 1] || null;
    if (targetDom) {
      (targetDom as any).style.marginBottom = pxtorem(height, props.multiple);
      pre_doms.push(targetDom);
    }

    // 移动 index 所属的行
    const rowDom = tabelDom?.querySelector(".table-content")?.children[index];
    const rowTarget: HTMLCollection | undefined = rowDom?.children;
    if (rowTarget) {
      Array.from(rowTarget).forEach((item) => {
        (item as any).style.marginBottom = pxtorem(height, props.multiple);
        pre_doms.push(item);
      });
    }
  };
};

const firstColumn = computed(() => {
  return props.column[0];
});

const [transformX, distanX, distanY] = useGetTransformX(
  tableRef,
  tablewidth,
  tablecontent,
  disable,
  bottomEvent,
  props.offset
);

const count = computed(() => props.tableDatas.length);

const { isShowRow } = useHandleScroll(
  40,
  count,
  props.rowHeight,
  props.multiple,
  tableRef,
  disable,
  props.optimized
);

watchEffect(() => {
  if (tableRef.value) {
    tablewidth.value = tableRef.value.clientWidth;
  }
});

watchEffect(() => {
  distanTableX.value = transformX.value + "px";
});

//判断 左右滚动 是否触底
watchEffect(() => {
  if (tableRef.value && transformX.value !== 0) {
    let temp =
      tablecontent.value - (tableRef.value.clientWidth - transformX.value);

    if (temp >= 0 && temp < 10) {
      moreMark.value = false;
    } else {
      moreMark.value = true;
    }
  }
});

//计算 表格内容的宽度
watch(tableContainerRef, () => {
  if (tableContainerRef.value && tableContainerRef.value.titleRef) {
    let children: HTMLCollection = tableContainerRef.value.titleRef.children;
    if (children.length > 0) {
      let count = 0;
      Array.from(children).forEach((val, index) => {
        count += val.clientWidth;
      });
      tablecontent.value = count;

      // 是否显示更多的标识
      moreMark.value = tablecontent.value > window.screen.width;
    }
  }
});

watchEffect(() => {
  if (props.tableDatas.length >= props.rowNum) {
    tableHeight.value = Math.max(
      props.rowHeight * props.rowNum + props.headerHeight,
      props.minTableHeight
    );
  }
});

defineExpose({
  handleDom: handleDom(),
  tableRef,
});
</script>
<style lang="scss" scoped>
.table {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  // overflow: hidden;
}

.fixedHeader {
  position: fixed;
  z-index: 100;
  min-width: 100%;
}
.table-header {
  position: relative;
}
.fixed-title-mark {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  background-color: #fcfcfc;
}
.first-column {
  position: absolute;
  top: 0;
  z-index: 9;
  background-color: #fff;
  .table-row-column {
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
  }
  .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.loading {
  text-align: center;
}

.fixed-title-more {
  position: fixed;
  right: 0;
  width: 60px;
  height: 60px;
  z-index: 101;
  background-color: #fcfcfc;

  .mark {
    position: absolute;
    height: 20px;
    width: 20px;
    // background-color: transparent; /* 模块背景为透明 */

    border-color: #999;

    border-style: solid;

    border-width: 5px 5px 0 0;
    top: 30%;
    left: 30%;

    transform: rotate(45deg); /*箭头方向可以自由切换角度*/
  }
}
</style>