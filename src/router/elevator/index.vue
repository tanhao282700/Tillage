<!--
    电梯系统 首页
    made by 樊得涛
    start in 2018-9-26
-->
<template>
  <div class="elevator">
    <el-scrollbar style="width:100%;height:100%">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          实时监控
        </el-menu-item>
        <el-menu-item index="2">
          数据监控
        </el-menu-item>
        <el-menu-item index="3">
          维保历史
        </el-menu-item>
        <el-menu-item index="4">
          故障管理
        </el-menu-item>
      </el-menu>

      <Crumbs :data ='crumbs'/>
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>



  export default {
    components: {

    },
    name: "elevator",
    data() {
      return {
        activeIndex2: '1',
        crumbs: [
          '电梯系统','实时监控'
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch (key){
          case '1':
            this.$router.push('/elevator/runTimeMonitor');this.crumbs = ['电梯系统','实时监控'];
            break;
            case '2':
            this.$router.push('/elevator/dataHistory');this.crumbs = ['电梯系统','数据监控'];
            break;
          case '3':
            this.$router.push('/elevator/wbHistory');this.crumbs = ['电梯系统','维保历史'];
            break;
          case '4':
            this.$router.push('/elevator/breakdownManagement');this.crumbs = ['电梯系统','故障管理'];
            break;
          default:
            alert(key)
        }
      },

    },
    created() {
    },
    mounted() {
      switch(this.$router.history.current.name){
        case 'runTimeMonitor':
         this.activeIndex2=1;
         break;
         case 'dataHistory':
         this.activeIndex2=2;
         break;
         case 'wbHistory':
         this.activeIndex2=3;
         break;
         case 'breakdownManagement':
         this.activeIndex2=4;
         break;
         default:
         this.activeIndex2=1;
         break;
      }

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .elevator{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
