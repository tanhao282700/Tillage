<!--
    空调系统 远程控制
    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div class="telecontrol">
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label" class="tabItems">冷源站</span>
        <cold-source-station/>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label" class="tabItems">空调末端</span>
        <air-conditioner-end/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>




  import ColdSourceStation from "./telecontrol/coldSourceStation";
  import AirConditionerEnd from "./telecontrol/airConditionerEnd";
  export default {
    components: {
      AirConditionerEnd,
      ColdSourceStation

    },
    name: "telecontrol",
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
//tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);

      },
    },
    created() {
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/tabs.less';
  .telecontrol{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
