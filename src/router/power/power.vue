<!--
    变配电系统 首页
    made by 胡永福
    start in 2018-9-4
-->
<template>
  <div class="power">
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
          环境情况
        </el-menu-item>
        <el-menu-item index="2">
          监测情况
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
    name: "power",
    data() {
      return {
        activeIndex2: '1',
        crumbs: [
          '变配电系统'
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch (key){
          case '1':
            this.$router.push('/power/envirCond');this.crumbs = ['变配电系统','环境情况'];
            break;
          case '2':
            this.$router.push('/power/monitorCond');this.crumbs = ['变配电系统','监测情况'];
            break;
          default:
            alert(key)
        }
      },

    },
    created() {
      //this.$router.push('/fireAlarm/floor3D')
      //this.$router.push('/fireAlarm/waterPump')
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .power{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
