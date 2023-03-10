<template>
  <div class="position">
    <h5-table
      ref="h5TableRef"
      :fixed-header="true"
      :column="column"
      :table-datas="[...datas, ...datas, ...datas]"
      @row-click="rowClick"
      @handle-head-sort-click="handleHeadSortClick"
    >
      <template #title="item">
        <section class="nameAndMarkValue">
          <div class="name">
            {{ item.select }}
            <span class="type">{{ item.type === 1 ? "深" : "沪" }}</span>
          </div>
          <div class="markValue">{{ item.markValue }}</div>
        </section>
      </template>
      <template #positionAndUse="item">
        <section class="positionAndUse">
          <div class="position">
            {{ item.position }}
          </div>
          <div class="use">{{ item.use }}</div>
        </section>
      </template>

      <template #curAndCost="item">
        <section class="curAndCost">
          <div class="cur">
            {{ item.cur }}
          </div>
          <div class="cost">{{ item.cost }}</div>
        </section>
      </template>
      <template #floatAndProfit="item">
        <section class="floatAndProfit">
          <div class="float">{{ item.float }}</div>
          <div class="profit">{{ item.profit }}</div>
        </section>
      </template>

      <template #rowDownMark>
        <section
          class="rowDownMark"
          :style="{
            top: cellSize(rowDownMarkTop),
          }"
          v-show="rowDownMarkTop > 0"
        >
          <div class="rowDownMark-item" @click="handelSell">买入</div>
          <div class="rowDownMark-item">卖出</div>
          <div class="rowDownMark-item">行情</div>
        </section>
      </template>
    </h5-table>
  </div>
</template>
<script setup lang="ts">
import { H5Table } from "@/components/h5-table";
import type {
  cloumnItemType,
  sortStatusType,
} from "@/components/h5-table/types";
import { watchEffect, ref } from "vue";
import { cellSize } from "@/components/h5-table/utils";

const column: Array<cloumnItemType> = [
  {
    title: "名称/市值",
    dataIndex: "nameAndMarkValue",
    width: 250,
    slotKey: "title",
    align: "left",
  },
  {
    title: "持仓/可用",
    slotKey: "positionAndUse",
    dataIndex: "positionAndUse",
    sortable: true,
    width: 200,
    align: "right",
  },
  {
    title: "现价/成本",
    slotKey: "curAndCost",
    dataIndex: "curAndCost",
    sortable: true,
    width: 200,
    align: "right",
  },
  {
    title: "浮动/盈亏",
    width: 200,
    slotKey: "floatAndProfit",
    align: "right",
  },
  {
    title: "账户资产",
    dataIndex: "count",
    width: 200,
  },
];

const datas = [
  {
    select: "中国移动",
    type: 1,
    position: "27,000",
    use: "5,000",
    markValue: "500,033.341",
    cur: "30.004",
    cost: "32.453",
    newPrice: 20,
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    select: "沃尔德",
    type: 1,
    markValue: "23,933.341",
    position: "27,000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    select: "招商证券",
    markValue: "500,033,341",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    position: "27,000",
    use: "5,000",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    select: "招商证券",
    markValue: "500,033,341",
    position: "27,000",
    use: "5,000",
    cur: "30.004",
    cost: "32.453",
    newPrice: 20,
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    select: "招商证券",
    markValue: "500,033,341",
    position: "27,000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
];

const rowDownMarkTop = ref<number>(0);

const h5TableRef = ref<typeof H5Table | null>(null);

const rowClick = (item: any, index: number) => {
  console.log("rowClick====");

  rowDownMarkTop.value = (index + 1) * 100 + 60;
  if (h5TableRef.value) {
    h5TableRef.value.handleDom(60, index);
  }
};

//处理排序
const handleHeadSortClick = (propsKey: string, type: sortStatusType) => {
  console.log("handleHeadSortClick====", propsKey, type);
};

const handelSell = () => {
  console.log("handelSell====");
};

watchEffect(() => {});
</script>
<style>
body{
  padding: 0;
  margin: 0 !important;
}</style>
<style lang="scss" scoped>

.position {
  font-size: 24px;
  .nameAndMarkValue {
    padding: 10px;
    .name {
      display: inline-block;
      position: relative;
      color: #222;
      font-size: 32px;
      .type {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -40px;
        display: inline-block;
        font-size:24px;
        border: 1px solid #ff858d;
        padding: 0 4px;
        color: #ff858d;
      }
    }
    .markValue {
      color: #999;
      font-size: 24px;
    }
  }

  .positionAndUse {
    font-size: 28px;
    .position {
      color: #222;
    }
    .use {
      color: #999;
    }
  }

  .curAndCost {
    font-size: 28px;
    .cur {
      color: #222;
    }
    .cost {
      color: #999;
    }
  }

  .floatAndProfit {
    color: red;
  }

  .rowDownMark {
    position: absolute;
    width: 100%;
    display: flex;
    z-index: 99;
    height: 60px;
    background-color: #fcfcfc;
    align-items: center;
    .rowDownMark-item {
      flex-grow: 1;
      color: #309fea;
      text-align: center;
    }
  }
}
</style>
