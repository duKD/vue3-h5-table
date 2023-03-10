<template>
  <div class="position">
    <div style="height: 100px">swiper</div>
    <p>555555</p>
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
            top:`${rowDownMarkTop/100}rem`
          }"
          v-show="rowDownMarkTop>0"
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
import {H5Table} from '@/components/bs-common/h5-table'
import type {cloumnItemType,sortStatusType} from '@/components/bs-common/h5-table/types'
import type { PositionShareDetailInquiryResponse } from "@/types/interface"
import {positionInterface} from '@/tool/interface.tool'
import { watchEffect,ref } from 'vue';




const column:Array<cloumnItemType> = [
    {
        title:'名称/市值',
        dataIndex:'nameAndMarkValue',
        width:200,
        slotKey:'title',
        align:'left'
    },
    {
        title:'持仓/可用',
        slotKey:'positionAndUse',
        dataIndex:'positionAndUse',
        sortable:true,
        width:200,
        align:'right'
    },
    {
        title:'现价/成本',
        slotKey:'curAndCost',
        dataIndex:'curAndCost',
        sortable:true,
        width:200,
        align:'right'
    },
    {
        title:'浮动/盈亏',
        width:200,
        slotKey:'floatAndProfit',
        align:'right'
    },
    {
        title:'账户资产',
        dataIndex:'count',
        width:200,
    },
]

const datas = [
    {
        select:'国泰',
        type:1,
        position:'27,000',
        use:'5,000',
        markValue: '500,033.341',
        cur:'30.004',
        cost:'32.453',
        newPrice:20,
        float:'+18,879.09',
        profit:'-5.45%',
        count: '120,121'
    },
    {
        select:'沃尔德',
        type:1,
        markValue: '23,933.341',
        position:'27,000',
        use:'5,000',
        newPrice:20,
        cur:'30.004',
        cost:'32.453',
        float:'+18,879.09',
        profit:'-5.45%',
        count: '120,121'
    },
    {
        select:'招商证券',
        markValue: '500,033,341',
        newPrice:20,
        cur:'30.004',
        cost:'32.453',
        position:'27,000',
        use:'5,000',
        float:'+18,879.09',
        profit:'-5.45%',
        count: '120,121'
    },
    {
        select:'招商证券',
        markValue: '500,033,341',
        position:'27,000',
        use:'5,000',
        cur:'30.004',
        cost:'32.453',
        newPrice:20,
        float:'+18,879.09',
        profit:'-5.45%',
        count: '120,121'
    },
    {
        select:'招商证券',
        markValue: '500,033,341',
        position:'27,000',
        use:'5,000',
        newPrice:20,
        cur:'30.004',
        cost:'32.453',
        float:'+18,879.09',
        profit:'-5.45%',
        count: '120,121'
    },
]

const rowDownMarkTop = ref<number>(0)

const h5TableRef = ref<typeof H5Table|null>(null)

const rowClick = (item:any,index:number)=>{
    console.log('rowClick====');
    
    rowDownMarkTop.value = (index+1)*100+60
    if(h5TableRef.value){
      h5TableRef.value.handleDom(60,index)
    }
}

//处理排序
const handleHeadSortClick = (propsKey:string,type:sortStatusType)=>{
  console.log('handleHeadSortClick====',propsKey,type);
}

const handelSell = ()=>{
  console.log('handelSell====');
  
}
// const positionShareRes = positionInterface<PositionShareDetailInquiryResponse>()

watchEffect(()=>{
  // console.log(99999,positionShareRes.value[0]);
})
</script>
<style lang="scss" scoped>
.position {
  .nameAndMarkValue {
    padding: 0.1rem;
    .name {
      display: inline-block;
      position: relative;
      color: #222;
      font-size: 0.32rem;
      .type {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -0.4rem;
        display: inline-block;
        font-size: 0.24rem;
        border: 1px solid #ff858d;
        padding: 0 0.04rem;
        color: #ff858d;
      }
    }
    .markValue {
      color: #999;
      font-size: 0.24rem;
    }
  }

  .positionAndUse {
    font-size: 0.28rem;
    .position {
      color: #222;
    }
    .use {
      color: #999;
    }
  }

  .curAndCost {
    font-size: 0.28rem;
    .cur {
      color: #222;
    }
    .cost {
      color: #999;
    }
  }

  .floatAndProfit{
    color:red;
    .float{

    }
    .profit{

    }
  }

  .rowDownMark{
    position: absolute;
    width: 100%;
    display: flex;
    z-index: 99;
    height:.6rem;
    background-color: #FCFCFC;
    align-items: center;
  .rowDownMark-item{
     flex-grow: 1;
     color: #309FEA;
     text-align: center;
  }
}
}
</style>
