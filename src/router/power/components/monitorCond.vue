<!--
    变配电系统 环境情况
    made by 胡永福
    start in 2018-9-4
-->
<template>
  <div class="monitorCond">
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label" class="tabItems">历史读数</span>
        <his-read/>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label" class="tabItems">报警管理</span>
        <alarm-manage/>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label" class="tabItems">进出情况</span>
        <in-out-situation/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>



  import HisRead from "./monitor/hisRead";
  import AlarmManage from "./monitor/alarmManage";
  import InOutSituation from "./monitor/inOutSituation";
  export default {
    components: {
      InOutSituation,
      AlarmManage,
      HisRead

    },
    name: "monitorCond",
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
  .monitorCond{
    width: 100%;
    padding: 0 0.28rem;
  }

</style>
