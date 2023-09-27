<template>
  <div ref="tableRef" class="table">
    <section
      class="table-header"
      :style="{
        width: tableContent + 'px',
      }"
    >
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
        @handleHeadSortClick="handleHeadSortClick"
        :slots="$slots"
        :rootValue="props.rootValue"
        :style="{
          transition: 'none',
        }"
      ></h5-table-header>
      <section
        v-if="props.fixedHeader"
        :style="{
          height: handleCellSize(props.headerHeight),
        }"
      ></section>
    </section>

    <section
      class="scroll-container"
      :style="{
        height: handleCellSize(props.minTableHeight),
      }"
    >
      <section
        class="first-column"
        :style="{
          width: handleCellSize(firstColumn.width),
        }"
      >
        <div
          v-for="(item, index) in props.tableDates"
          :class="['table-row-column', 'first-table-row-column']"
          :style="{
            width: handleCellSize(firstColumn.width),
            height: handleCellSize(props.rowHeight),
            textAlign: firstColumn.align || 'center',
          }"
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
      </section>

      <div class="section-container">
        <section
          class="table-content"
          :style="{
            width: tableContent + 'px',
          }"
        >
          <h5-table-row
            v-for="(item, index) in props.tableDates"
            :key="index"
            :data-item="item"
            :column="props.column"
            :height="props.rowHeight"
            :slots="$slots"
            :width="tableContent + 'px'"
            :rootValue="props.rootValue"
            @click="handleClick(item, index)"
          >
          </h5-table-row>
        </section>
        <div
          class="rowMarkContainer"
          :style="{
            top: rowDownMarkTop + 'px',
          }"
          v-show="rowDownMarkTop > 0"
        >
          <slot name="rowDownMark"></slot>
        </div>
      </div>
    </section>

    <!-- <section
      class="loading"
      @click="tryAgain"
      v-show="props.disable && loadingText.length > 0"
    >
      {{ loadingText }}
    </section> -->
  </div>
</template>
<script lang="ts" setup name="H5Table">
import h5TableCell from "./h5-table-cell";
import H5TableRow from "./h5-table-row.vue";
import H5TableHeader from "./h5-table-header.vue";

import { onMounted, computed, ref, watchEffect } from "vue";
import type { columnItemType, sortStatusType } from "../types";
import { cellSize, pxtorem } from "../utils";
import useIScroll from "../hooks/useIScroll";
import useDebounce from "../hooks/useDebounce";

type propsType = {
  minTableHeight?: number; //表格最小高度
  rowNum?: number; // 表格显示几行
  headerHeight?: number; // 头部默认高度
  rowHeight?: number; //每行数据的默认高度
  column: Array<columnItemType>;
  tableDates: Array<any>;
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
  rootValue?: number; //
  optimized?: boolean; // 是否开启优化
};

type emitType = {
  (e: "rowClick", item: any, index: number): void;
  (e: "handleHeadSortClick", propKey: string, type: sortStatusType): void;
  (e: "update:loading", val: boolean): void;
  (e: "update:error", val: boolean): void;
  (e: "load"): void;
};

const tableWidth = ref<number>(0);
const tableContent = ref<number>(0);
const tableRef = ref<HTMLElement | null>(null);
const tableContainerRef = ref<typeof H5TableHeader | null>(null);
const iScrollContainerRef = ref<HTMLElement | null>(null);
const rowDownMarkTop = ref<number>(0);

const rem = Number(document.documentElement.style.fontSize.replace("px", ""));

const props = withDefaults(defineProps<propsType>(), {
  minTableHeight: 600,
  rowNum: 6,
  headerHeight: 60,
  rowHeight: 100,
  tableDates: () => [],
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
  rootValue: 75,
  optimized: false,
});

const emits = defineEmits<emitType>();

const disable = computed(() => props.disable);

const moreMark = ref<boolean>(false);

const handleCellSize = (num: number | undefined) => {
  return cellSize(num, props.rootValue);
};

// const loading = computed({
//   get() {
//     return props.loading;
//   },
//   set(val: boolean) {
//     emits("update:loading", val);
//   },
// });

// const error = computed({
//   get() {
//     return props.error;
//   },
//   set(val: boolean) {
//     emits("update:error", val);
//   },
// });

// const loadingText = computed(() => {
//   let str = "";
//   if (loading.value) {
//     str = props.loadingText;
//   }
//   if (props.finish) {
//     str = props.finishedText;
//   }
//   if (error.value) {
//     str = props.errorText;
//   }
//   return str;
// });

const bottomEvent = () => {
  // if (props.finish) return;
  // if (!loading.value) {
  //   loading.value = true;
  //   emits("load");
  // }
};

// const tryAgain = () => {
//   if (error.value) {
//     error.value = false;
//     emits("load");
//   }
// };

const handleClick = (item: any, index: number) => {
  if (!props.isClick) return;
  emits("rowClick", item, index);
};

const handleHeadSortClick = (propKey: string, type: sortStatusType) => {
  rowDownMarkTop.value = 0;
  emits("handleHeadSortClick", propKey, type);
};

// 根据 指定下标 下 移动元素
const handleDom = () => {
  // 使用闭包 记录 上次 被操作的dom 列表
  let pre_doms: Array<any> = [];
  return (height: number, index: number) => {
    if (pre_doms.length > 0) {
      pre_doms.forEach((item) => {
        item.style.paddingBottom = 0;
      });
      // 恢复清空
      pre_doms = [];
    }

    // index -1 表示 恢复margin 移动
    if (index === -1) return;

    const tableDom = tableRef.value;
    //获取第一列
    const firstColumn =
      tableDom?.querySelector(".scroll-container .first-column") || null;

    const targetDom = firstColumn?.children[index] || null;
    if (targetDom) {
      (targetDom as any).style.paddingBottom = pxtorem(height, props.rootValue);
      pre_doms.push(targetDom);
    }

    // 移动 index 所属的行
    const rowDom = tableDom?.querySelector(".table-content")?.children[index];
    const rowTarget: HTMLCollection | undefined = rowDom?.children;
    if (rowTarget) {
      Array.from(rowTarget).forEach((item) => {
        (item as any).style.paddingBottom = pxtorem(height, props.rootValue);
        pre_doms.push(item);
      });
    }

    // 计算 点击元素插槽下移距离
    const top =
      rowDom!.getBoundingClientRect().top -
      iScrollContainerRef.value!.getBoundingClientRect().top;

    rowDownMarkTop.value =
      (top as number) + (props.rowHeight / props.rootValue) * rem;
  };
};

const firstColumn = computed(() => {
  return props.column[0];
});

watchEffect(() => {
  if (tableRef.value) {
    tableWidth.value = tableRef.value.clientWidth;
  }
});

const tableDates = computed(() => props.tableDates);

useIScroll(iScrollContainerRef, tableDates, {
  scrollY: false,
  scrollX: true,
  click: true,
  preventDefault: false,
  momentum: false,
  bounce: false,
  probeType: 3,
  disable: disable,
  bottomLoadEvent: bottomEvent,
  offset: props.offset,
  handleTransform: (val: number) => {
    if (tableContainerRef.value?.titleRef) {
      let dom = tableContainerRef.value.titleRef;
      dom.style.transform = `translateX(${val}px)`;
    }
    handleTouchBottom(val);
  },
});

//判断 左右滚动 是否触底 显示隐藏 更多的标志 防抖
const handleTouchBottom = useDebounce((distanceX: number) => {
  if (tableRef.value && distanceX !== 0) {
    let temp = tableContent.value - (tableRef.value!.clientWidth - distanceX);
    if (temp < 10) {
      moreMark.value = false;
    } else {
      moreMark.value = true;
    }
  }
}, 200);
onMounted(() => {
  iScrollContainerRef.value = document.querySelector(".section-container");
  // 是否显示更多的标识
  let count = 0;
  props.column.forEach((item) => {
    count += item.width;
  });
  tableContent.value = (count / props.rootValue) * rem;

  moreMark.value = (count / props.rootValue) * rem > window.screen.width;
});

defineExpose({
  handleDom: handleDom(),
  tableRef,
});
</script>
<style lang="scss" scoped>
.table {
  position: relative;
  overflow: hidden;
}
.section-container {
  width: 100vw;
  height: auto;
  position: relative;
  overflow: hidden;
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

.scroll-container {
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
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

.rowMarkContainer {
  width: 100%;
  position: absolute;
  z-index: 9;
}
</style>
