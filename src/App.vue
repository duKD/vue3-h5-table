<template>
  <div class="position">
    <h5-table
      ref="h5TableRef"
      :fixed-header="true"
      :column="column"
      :table-datas="tableDatas"
      @row-click="rowClick"
      @handle-head-sort-click="handleHeadSortClick"
      v-model:error="error"
      :is-click="false"
      v-model:loading="loading"
      :finish="finish"
      @load="onload"
      disable
    >
      <template #titleSlot>
        <section class="nameAndMarkValueTitle">
          <div>
            <span class="name_1"> 班费 </span>/<span class="name_2">
              总和
            </span>
          </div>
        </section>
      </template>

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
import { H5Table } from "../lib/h5-table";
import type { columnItemType, sortStatusType } from "../lib/h5-table/types";
import { watchEffect, ref, watch } from "vue";
import { cellSize } from "../lib/h5-table/utils";

const column: Array<columnItemType> = [
  {
    title: "班费/总值",
    key: "id",
    dataIndex: "nameAndMarkValue",
    width: 250,
    slotKey: "title",
    slotTitleKey: "titleSlot",
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
    // sortable: true,
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
    id: 0,
    select: "三年二班",
    type: 1,
    position: "27000",
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
    id: 1,
    select: "四年一班",
    type: 1,
    markValue: "23,933.341",
    position: "28000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    id: 2,
    select: "三年二班",
    markValue: "500,033,341",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    position: "27300",
    use: "5,000",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    id: 3,
    select: "五年二班",
    markValue: "500,033,341",
    position: "27000",
    use: "5,000",
    cur: "30.004",
    cost: "32.453",
    newPrice: 20,
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    id: 4,
    select: "一年二班",
    markValue: "500,033,341",
    position: "27000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    id: 5,
    select: "六年三班",
    markValue: "500,033,341",
    position: "37000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    id: 6,
    select: "六年二班",
    markValue: "500,033,341",
    position: "37000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
  {
    id: 7,
    select: "六年五班",
    markValue: "500,033,341",
    position: "37000",
    use: "5,000",
    newPrice: 20,
    cur: "30.004",
    cost: "32.453",
    float: "+18,879.09",
    profit: "-5.45%",
    count: "120,121",
  },
];

const tableDatas = ref<Array<any>>(JSON.parse(JSON.stringify(datas)));

const rowDownMarkTop = ref<number>(0);

const h5TableRef = ref<typeof H5Table | null>(null);

const loading = ref<boolean>(false);
const error = ref<boolean>(false);
const finish = ref<boolean>(false);

const onload = () => {
  console.log("loading====");
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  // setTimeout(() => {
  //   error.value = true;
  // }, 1000);
  // setTimeout(() => {
  //   finish.value = true;
  // }, 1000);
};

const rowClick = (item: any, index: number) => {
  rowDownMarkTop.value = (index + 1) * 100 + 60;
  if (h5TableRef.value) {
    h5TableRef.value.handleDom(60, index);
  }
};

//处理排序
const handleHeadSortClick = (propsKey: string, type: sortStatusType) => {
  rowDownMarkTop.value = 0;
  if (h5TableRef.value) {
    h5TableRef.value.handleDom(60, -1);
  }
  if (type === 0) {
    tableDatas.value.splice(0, tableDatas.value.length, ...datas);
    return;
  }
  if (propsKey === "positionAndUse") {
    if (type === 1) {
      tableDatas.value.sort((a, b) => Number(b.position) - Number(a.position));
    } else {
      tableDatas.value.sort((a, b) => Number(a.position) - Number(b.position));
    }
  }
};

watch(tableDatas.value, () => {
  console.log("watch====", tableDatas);
});

const handelSell = () => {
  console.log("handelSell====");
};
</script>
<style>
body {
  padding: 0;
  margin: 0 !important;
}
</style>
<style lang="scss" scoped>
.position {
  font-size: 24px;

  .nameAndMarkValueTitle {
    display: flex;
  }
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
        font-size: 24px;
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
