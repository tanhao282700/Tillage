<!--
    给排水系统 设备及状态表
    made by 胡永福
    start in 2018-8-6
-->
<template>
  <div class="devicesBox">
    <el-scrollbar style="height:100%">
      <div class="itemBox">
        <div v-for="(item,i) in newDLists" class="item no-select" :style="[i%5!=0? marginL:noMargin,i>4? {marginTop:'0.18rem'}:{marginTop:0}]" :key="i">
          <span @click="showDeviceInfo(item)" class="tip">设备信息卡</span>
          <span :class="[iconCircle,item.realState==1?'color-innormal':'color-normal']"></span>
          <img class="img" :style="{width:deviceImagesSize[0],height:deviceImagesSize[1]}" :src="deviceImages[item.realState==1?'1':'0'].src" alt="">
          <p v-text="item.device_name" :class="['device-name',item.realState==1?'font-color-innormal':'font-color-normal2']"></p>
        </div>
      </div>
    </el-scrollbar>

    <Dialog wid = "9.1rem" hei = "5.36rem" ref = "dialog">
      <div v-text="deviceName+' 设备信息卡'" class="self-dialog-title"></div>
      <div class="dialog-in">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="设备信息" name="first">
            <el-scrollbar style="height:100%">
              <div class="deviceInfoBox">
                <p v-for="(item,i) in deviceInfos" class="row" :key="i"><span v-text="item.name+'：'" class="name"></span><span v-text="item.value" class="value"></span></p>
              </div>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="维保历史" name="second">
            <el-scrollbar style="height:100%">
              <div class="self-step-box" style="min-height: 100%;">
                <el-steps direction="vertical">
                  <el-step v-for="(item,i) in maintenanceHis" icon="self-icon" :key="item.id">
                    <div class="title" slot="title">
                      <span v-text="item.date" class="time"></span>
                      <span class="col-line"></span>
                      <span v-text="item.head_name" class="name"></span>
                    </div>
                    <div v-text="item.maintenance_content" class="content" slot="description"></div>
                  </el-step>
                </el-steps>
              </div>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </div>
    </Dialog>

  </div>
</template>

<script>

  import utils from "../../../assets/js/utils.js";
  import EchartLine from "./echartLine";
  export default {
    components: {
      EchartLine
    },
    props:['DLists','deviceImages','deviceImagesSize'],
    name: "deviceLists2",
    computed:{
      newDLists:function () {
        let arr = [];
        this.DLists.map((item,i)=>{

          //console.log(eval('('+item.data.daiti+')'))
          let lists = eval('('+item.data.daiti+')').list
          let realState='';
          console.log('lists',lists)
          lists.some((item2,i2,arr)=>{
            //console.log(item2,i2,arr)
            if (item2.type == 0){
              if (item2.min != '' && item2.max != '') {
                if (parseFloat(item2.min) < parseFloat(item2.max)) {
                  if (parseFloat(item.data.value) >= parseFloat(item2.min) && parseFloat(item.data.value) <= parseFloat(item2.max)) {
                    realState = 0;
                    return true;
                  }
                }
              } else {
                if (item2.min == '') {
                  if (parseFloat(item.data.value) <= parseFloat(item2.max)) {
                    realState = 0;
                    return true;
                  }
                } else if (item2.max == ''){
                  if (parseFloat(item.data.value) >= parseFloat(item2.min)) {
                    realState = 0;
                    return true;
                  }
                }
              }
            } else if (item2.type ==1){
              if (item2.min != '' && item2.max != '') {
                if (parseFloat(item2.min) < parseFloat(item2.max)) {
                  if (parseFloat(item.data.value) > parseFloat(item2.min) && parseFloat(item.data.value) < parseFloat(item2.max)) {
                    realState = 1;
                    return true;
                  }
                }
              } else {
                if (item2.min == '') {
                  if (parseFloat(item.data.value) < parseFloat(item2.max)) {
                    realState = 1;
                    return true;
                  }
                } else if (item2.max == ''){
                  if (parseFloat(item.data.value) > parseFloat(item2.min)) {
                    realState = 1;
                    return true;
                  }
                }
              }
            } else if (item2.type ==2){
              if (item2.min != '' && item2.max != '') {
                if (parseFloat(item2.min) < parseFloat(item2.max)) {
                  if (parseFloat(item.data.value) > parseFloat(item2.min) && parseFloat(item.data.value) < parseFloat(item2.max)) {
                    realState = 2;
                    return true;
                  }
                }
              } else {
                if (item2.min == '') {
                  if (parseFloat(item.data.value) < parseFloat(item2.max)) {
                    realState = 2;
                    return true;
                  }
                } else if (item2.max == ''){
                  if (parseFloat(item.data.value) > parseFloat(item2.min)) {
                    realState = 2;
                    return true;
                  }
                }
              }
            }
            //console.log('hahaha')

          })

          console.log('状态',realState)
          item.realState = realState;
          arr.push(item)

        })
        console.log('新数组',arr)
        return arr

      }
    },
    data() {
      return {
        activeName: 'first',
        /*deviceImages:[
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_close.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_normal.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/waterPump_innormal.png')}
          ],*/
        marginL:{marginLeft:'0.16rem'},
        showDiglog:false,
        noMargin:{marginLeft:0},
        iconCircle:'icon-circle',
        /*deviceLists:[
          {device_id:1,device_name:'1号水泵',state:'1',data:{value:''}},

        ],*/
        deviceName:'某某某',
        deviceInfos:[
          {name:'设备名称',value:'-'},
          /*{name:'流量',value:'160立方米/小时'},
          {name:'设备品牌',value:'凯泉'},
          {name:'扬程',value:'32MH2O'},
          {name:'设备编号',value:'SB20141003'},
          {name:'转速',value:'1480R/MIN'},
          {name:'设备位置',value:'负二层制冷站'},
          {name:'设备重量',value:'420KG'},
          {name:'出厂时间',value:'2014年6月23日'},
          {name:'长宽高',value:'1000*500*100'},
          {name:'启用时间',value:'2014年10月18日'},
          {name:'维保电话',value:'028-88888888'},
          {name:'额定电流',value:'65A'},
          {name:'维保商名称',value:'四川某某某某某'},
          {name:'额定电压',value:'380V'},
          {name:'供应商名称',value:'四川某某某某某'},
          {name:'额定功率',value:'30KW'},
          {name:'累计运行时间',value:'120小时30分钟'},*/
        ],
        maintenanceHis:[
          {id:1,date:'-',head_name:'-',maintenance_content:'维保内容'},
        ],
        sendVal:[0,100],
      }
    },
    methods: {
      //获取设备信息列表
      getDeviceInfoLists(id){
        let data = {'device_id':id};
        utils.post('water/deviceInfoLists',data).then(res=>{
          console.log(res,'设备信息列表')
          if(res.code==0){
            //console.log(res.data.length)
            if (res.data.length !==0) {

              //console.log(eval('('+res.data[0][0].content+')'))
              let arr = eval('(' + res.data[0][0].content + ')');
              let tempArr = [];
              arr.map((item, i) => {
                for (var i2 in item) {
                  //console.log(i2,item[i2])
                  let obj = {};
                  obj.name = i2;
                  obj.value = item[i2]
                  tempArr.push(obj)
                }
              });
              this.deviceInfos = tempArr;
            }
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取维保历史
      getProjectInfoLists(sysID,id){
        let data = {'sys_menu_id':sysID,'device_id':id};
        //console.log(data)
        utils.post('water/protectInfoLists',data).then(res=>{
          console.log(res,'系统维保历史列表2')
          if(res.code==0){
            this.maintenanceHis = res.data;

          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      showDeviceInfo(item){
        this.deviceName = item.device_name;
        this.$refs.dialog.show();
        this.getDeviceInfoLists(item.device_id);
        this.getProjectInfoLists(item.sys_menu_id,item.device_id);
      }
    },
    created() {
    },
    mounted() {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped type="text/less">
  @import '../../../assets/css/common.css';
  .self-step-box{
    margin-top: 0.2rem;
    .title{
      display: flex;
      align-items: center;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 24px;
      letter-spacing: 0px;
      color: #b5d7ff;
      .col-line{
        margin: 0 0.1rem;
        display: inline-block;
        width: 1px;
        height: 0.14rem;
        background-image: linear-gradient(180deg,
        #00c1ff 0%,
        #008efe 100%);
        border-radius: 0.14rem;
      }
    }
    .content{
      overflow: hidden;
      padding: 0.1rem;
      width: 100%;
      min-height: 0.34rem;
      background-color: #011f51;
      box-shadow: 0px 0px 2px 0px
      rgba(87, 113, 176, 0.15),
      inset 0px 0px 3px 0px
      rgba(0, 0, 0, 0.33);
      border: solid 0px #000c22;

      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 0.22rem;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }



  .self-dialog-title{
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.5rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 0 0.2rem;

    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .dialog-in{
    width: 100%;
    height: 4.86rem;
    padding: 0.16rem 0.2rem;

  }
  .deviceInfoBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .row{
      display: block;
      width: 50%;
      padding: 0 0.1rem;
      margin-top: 0.3rem;
      font-family: PingFangSC-Light;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #4f648b;
      .name{
        display: inline-block;
        width: 1rem;
      }
      .value{
        color: #fff;
      }
    }
  }

  .devicesBox{
    margin-top: 0.2rem;
    padding: 0.2rem 0.19rem;
    width: 100%;
    height: 5.38rem;
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;

    .itemBox {
      width: 100%;
      min-height: 4.98rem;
      display: flex;
      justify-content: flex-start;
      align-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 2.4rem;
        height: 2.4rem;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          background-color: rgba(43, 93, 158, 0.25);

        }
        &:hover .tip{
          display: flex;
          cursor: pointer;
        }
        .tip{
          display: none;
          position: absolute;
          left: 0.12rem;
          top:0.11rem;
          //display: flex;
          align-items: center;
          justify-content: center;
          width: 0.78rem;
          height: 0.2rem;
          background-color: rgba(0, 0, 0, 0.25);
          border-radius: 1rem;

          font-family: PingFangSC-Regular;
          font-size: 0.1rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #2df0e0;

        }
        .icon-circle{
          position: absolute;
          right: 0.12rem;
          top:0.12rem;
          width: 0.12rem;
          height: 0.12rem;
          border-radius: 50%;
          background-color: #fff;
        }
        .img{
          display: block;
        }
        .device-name{
          position: absolute;
          left: 0;
          bottom: 0.15rem;
          width: 100%;
          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }

</style>
