<template>
  <div class="textBai">
      <router-link to="/routeTest" class="linkA">
        例子页面
      </router-link>
      <router-link to="/energy/fullLook" class="linkA">
        能源
      </router-link>
      <router-link to="/WaterSupplyAndDrainage/floor3D" class="linkA">
        给排水
      </router-link>
      <router-link to="/generationM" class="linkA">
          代维管理端
      </router-link>
    <router-link to="/fireAlarm/fireMonitor" class="linkA">
      消防报警
    </router-link>
    <router-link to="/power/envirCond" class="linkA">
      变配电
    </router-link>
    <router-link to="/airConditioner/telecontrol" class="linkA">
      空调
    </router-link>
    <router-link to="/elevator/runTimeMonitor" class="linkA">
      电梯
    </router-link>
  </div>
</template>

<script>


import utils from "../../assets/js/utils.js";
export default {

  data () {
    return {

    }
  },
  methods:{

  },
  created() {

  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .textBai{
    flex:1;
    .baiTit{
        height:80px;
        width:200px;
        font-size:20px;
       color:#999999;

    }
    .myChart{
      height:300px;
      width:300px;
    }
    .linkA{
      display: inline-block;
      margin: 20px;
      font-size: 0.24rem;
      color:#fff;
    }
  }

</style>
