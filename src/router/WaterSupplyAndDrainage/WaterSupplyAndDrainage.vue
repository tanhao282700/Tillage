<!--
    给排水系统 首页
    made by 胡永福
    start in 2018-8-2
-->
<template>
  <div class="WaterSupplyAndDrainage">
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
        首页
      </el-menu-item>
      <el-menu-item index="2">
        水泵
      </el-menu-item>
      <el-menu-item index="3">
        高位水箱
      </el-menu-item>
      <el-menu-item index="4">
        蓄水池
      </el-menu-item>
      <el-menu-item index="5">
        潜污泵
      </el-menu-item>
      <el-menu-item index="6">
        污水池
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
    name: "WaterSupplyAndDrainage",
    data() {
      return {
        activeIndex2: '1',
        crumbs: [
           '给排水系统'
        ]
      }
    },
    methods: {
      select2(){
        alert('hahah')
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        switch (key){
          case '1':

            this.$router.push('/WaterSupplyAndDrainage/floor3D');this.crumbs = ['给排水系统'];
            break;
          case '2':
            this.$router.push('/WaterSupplyAndDrainage/waterPump');this.crumbs = ['给排水系统','水泵'];
            break;
          case '3':
            this.$router.push('/WaterSupplyAndDrainage/highWaterTank');this.crumbs = ['给排水系统','高位水箱'];
            break;
          case '4':
            this.$router.push('/WaterSupplyAndDrainage/cistern');this.crumbs = ['给排水系统','蓄水池'];
            break;
          case '5':
            this.$router.push('/WaterSupplyAndDrainage/submersibleSewagePump');this.crumbs = ['给排水系统','潜污泵'];
            break;
          case '6':
            this.$router.push('/WaterSupplyAndDrainage/sewagePond');this.crumbs = ['给排水系统','污水池'];
            break;
          default:
            alert(key)
        }
      },

    },
    created() {

      let val = (this.$router.history.current.fullPath).split('/WaterSupplyAndDrainage')[1];
      console.log('val',val);
      /*if(val==''){
        this.activeName = 'first';
      }else{
        console.log( val.split('/')[1])
        this.activeName = val.split('/')[1];
      }*/
      //this.$router.push('/WaterSupplyAndDrainage/floor3D')
      //this.$router.push('/WaterSupplyAndDrainage/waterPump')
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .WaterSupplyAndDrainage{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: scroll;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
