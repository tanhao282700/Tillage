<!--
    空调系统 首页
    made by 胡永福
    start in 2018-9-17
-->
<template>
  <div class="airConditioner">
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
          远程控制
        </el-menu-item>
        <el-menu-item index="2">
          系统监测
        </el-menu-item>
        <el-menu-item index="3">
          定时模式
        </el-menu-item>
      </el-menu>

      <Crumbs :data ='crumbs' :msgD="msg" :isIfD="isIf"/>
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>



  export default {
    components: {

    },
    name: "airConditioner",
    data() {
      return {
        activeIndex2: '1',
        crumbs: [
          '暖通系统'
        ],
        msg:'fff',
        isIf:true,
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch (key){
          case '1':
            this.$router.push('/airConditioner/telecontrol');this.crumbs = ['暖通系统','远程控制'];
            break;
          case '2':
            this.$router.push('/airConditioner/sysMonitor');this.crumbs = ['暖通系统','系统监测'];
            break;
          case '3':
            this.$router.push('/airConditioner/timerMode');this.crumbs = ['暖通系统','定时模式'];
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
  .airConditioner{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
