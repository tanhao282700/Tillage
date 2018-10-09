<!--
    变配电系统 环境情况
    made by 胡永福
    start in 2018-9-4
-->
<template>
  <div class="envirCond">
    <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label" class="tabItems">回路状态</span>
        <loop-state/>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label" class="tabItems">环境状态</span>
        <envir-state/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>



  import LoopState from "./condition/loopState";
  import EnvirState from "./condition/envirState";
  export default {
    components: {
      EnvirState,
      LoopState

    },
    name: "envirCond",
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
  .envirCond{
    width: 100%;
    padding: 0 0.28rem;

    .el-tabs__content{
      overflow: visible;
    }
  }

</style>
