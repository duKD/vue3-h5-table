# Vue 3 + TypeScript + Vite

## 项目介绍

```
一个 基于vue3 ts 的 h5 table 组件  支持 左右拖动 支持排序 支持动态 插槽 以及 点击 交互

使用文档链接  https://blog.csdn.net/weixin_45485922/article/details/129444600?spm=1001.2014.3001.5502

更多使用 见github App.vue 文件
链接： https://github.com/duKD/vue3-h5-table 

```



## 简单使用

```
vscode + node(16.19.0 以上 )+ pnpm

下载项目 后

// 安装依赖
pnpm i

// 启动项目
pnpm run dev

预览

在vue3 项目使用
npm i vue3-h5-table

例子如下：
<template>
    <div>
        <div style="height:100px" @click="change">change</div>
        <h5-table
          :column="column"
          :table-datas="datas"
          @row-click="handleClick"
        >
        <template #title="item">
            <div  class='title'>{{ item.select }}</div>
        </template>
        <template #categoryOrAmount="item">
            <section class="categoryOrAmount">
                <div>{{ item.category===1?'买入':'卖出' }}</div>
                <div>{{ item.amount }}</div>
            </section>
        </template>
        </h5-table>
    </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue'
import  {H5Table, type columnItemType} from 'vue3-h5-table'
import 'vue3-h5-table/dist/style.css'

const handleClick = (item:any,index:number)=>{
    console.log('handleClick====',item,index);
}

const column:Array<columnItemType> = [
    {
        title:'我的自选',
        dataIndex:'select',
        width:120,
        slotKey:'title'
    },
    {
        title:'最新价',
        width:350,
        dataIndex:'newPrice',
    },
    {
        title:'涨幅/涨跌',
        dataIndex:'rate',
        width:250,
        render:(h,item)=>{
            return h('section',{},[h('div',{
                class:'rateDie',
            },item.rateDie),h('div',{
                class:'rateZ',
            },item.rateZ)])
        }
    },
    {
        title:'最高/最低',
        dataIndex:'maxOrMin',
        width:250,
        render:(h,item)=>{
            return h('section',{},[h('div',{
                class:'max',
            },item.max),h('div',{
                class:'min',
            },item.min)])
        }
    },
    {
        title:'类别/金额',
        dataIndex:'categoryOrAmount',
        width:250,
        slotKey:'categoryOrAmount'
    },
]

const datas = [
    {
        select:'中国石化',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:200
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:2,
        amount:300
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:2,
        amount:300
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
    {
        select:'招商证券',
        newPrice:20,
        rateDie:'+20%',
        rateZ:'+9.7',
        max: 23.89,
        min:22.17,
        category:1,
        amount:100
    },
]

let tableDatas = reactive(datas)

const change = ()=>{
    tableDatas = datas
    console.log(3333,tableDatas);
    setTimeout(()=>{
        tableDatas = datas.reverse()
        console.log(4444,tableDatas);
    },1000
    )
}


</script>
<style scoped>
.title{
    width: 100%;
}

</style>


```
