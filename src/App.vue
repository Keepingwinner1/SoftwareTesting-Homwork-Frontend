<template>
  <div id="app">
    <el-tabs type="border-card">
      <el-tab-pane>
        <template slot="label">
          <i class="el-icon-s-opportunity"></i>
          判断三角形类型
        </template>
        <triangle></triangle>
      </el-tab-pane>
      <el-tab-pane>
        <template slot="label">
          <i class="el-icon-date"></i>
          万年历问题
        </template>
        <calendar></calendar>
      </el-tab-pane>
      <el-tab-pane>
        <template slot="label">
          <i class="el-icon-shopping-cart-full"></i>
          电脑销售系统
        </template>
        <computer-sale></computer-sale>
      </el-tab-pane>
      <el-tab-pane>
        <template slot="label">
          <i class="el-icon-money"></i>
          电信收费问题系统
        </template>
        <charge></charge>
      </el-tab-pane>
      <el-tab-pane>
        <template slot="label">
          <i class="el-icon-s-finance"></i>
          销售佣金计算系统
        </template>
        <sales-commission></sales-commission>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import triangle from './components/triangle.vue'
import computerSale from './components/computerSale.vue'
import calendar from './components/calendar.vue'
import charge from './components/charge.vue'
import salesCommission from './components/SalesCommission.vue'
export default {
  name: 'App',
  components: { triangle, computerSale, calendar, charge, salesCommission }
}
</script>

<style>
.question
{
  font-family: 微软雅黑 Light,serif;
  color: #409EFF;
}

.el-tabs__item {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  transition: all 0.3s;
}

.el-tabs__item:hover {
  color: #409EFF;
}

.el-tabs__item.is-active {
  color: #409EFF;
  font-weight: bold;
}

.el-tabs__active-bar {
  background-color: #409EFF;
  height: 3px;
}

.el-tabs--border-card {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #DCDFE6;
  border-radius: 4px;
}

.el-tabs--border-card > .el-tabs__header {
  background-color: #f5f7fa;
  border-bottom: 1px solid #DCDFE6;
  margin: 0;
}

.el-tabs__item i {
  margin-right: 5px;
  font-size: 18px;
  vertical-align: middle;
}
</style>
