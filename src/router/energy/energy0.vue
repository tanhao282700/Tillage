<!--
    能源系统 主界面
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="energyBase">
    <SysHead :datas = "sData"/>
    <div class="energyBody">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

import SysHead from '../../components/sysHead';

export default {
    components:{
      "SysHead":SysHead
  },
  name: 'energyBase',
  
  data () {
    return {
      activeName: 'first',
      sData:{
            id:2,
            lists:[
                {id:0,name:'全景查看',route:'/energy/fullLook'},
                {id:0,name:'运行情况',route:'/energy/runMsg'},
                {id:0,name:'监控告警',route:'/energy/alarm'},
            ]
        }
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
@import '../../assets/css/tabs.less';
  .energyBase{
      width:100%;
      height:100%; 
      display: flex;
      flex-direction: column;
      .energyBody{
          flex:1;
      }
  }

</style>
