<!--
    给排水系统 水泵
    made by 胡永福
    start in 2018-8-6
-->
<template>
    <div class="WaterPump">
      <div class="self-padding">
        <warnInfo
          :warnInfoLists="FwarnInfoLists"
          :stateLists="FstateLists"
        />
        <device-lists3
          :DLists="FdeviceLists"
          :deviceImages="FdeviceImages"
        />
      </div>

    </div>
</template>

<script>

  import utils from "../../../assets/js/utils.js";
  import warnInfo from './warnInfo'
  import DeviceLists3 from "./deviceLists3";



  export default {
    components: {
      DeviceLists3,

      "warnInfo":warnInfo,
    },
    name: "submersibleSewagePump",
    data() {
      return {
        FwarnInfoLists:[


        ],
        FstateLists:[
          {color:'color-normal',state:'开启状态'},
          {color:'color-innormal',state:'异常状态'},
          {color:'color-close',state:'关闭状态'},
        ],
        FdeviceImages:[
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_close.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_normal.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_innormal.png')}
        ],

        FdeviceLists:[

        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getDeviceLists(){
        let data = {'sys_menu_id':9,'floor_id':48,'self_id':1272};
        utils.post('water/deviceLists',data).then(res=>{
          console.log(res,'系统设备列表');
          if(res.code==0){

            this.FdeviceLists = res.data;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      getWarnInfoLists(){
        let data = {'sys_menu_id':9,'floor_id':48,'self_id':1272,'device_id':''};
        utils.post('water/warnInfoLists',data).then(res=>{
          console.log(res,'系统设备报警信息列表')
          if(res.code==0){

            this.FwarnInfoLists = res.data;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
      this.getDeviceLists();
      this.getWarnInfoLists();
      //alert(this.$route.params.test)
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .WaterPump{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: hidden;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
