<!--
    变配电系统 回路状态
    made by 胡永福
    start in 2018-9-45
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="envirState">
    <div class="top">
      <div class="self-box">
        <div class="head">变配电室环境</div>
        <div class="body">
          <div class="nowValBox">
            <div class="wrap" v-for="(v,i) in environmentLists" :key="i">
              <div class="part">
                <p class="name" v-text="'当前'+v.title"></p>
                <p class="val" v-text="v.data.value+v.data.daiti"></p>
              </div>
              <Lines v-if="(i+1)!=environmentLists.length" :hei="70" :top="30"/>
            </div>
          </div>
          <div class="toggleBtnBox">
            <button v-for="(v,i) in btnLists" type="button" :class="['self-btn',{active:btnActID==v.id}]" v-text="'环境'+v.title" :key="i" @click="btnClick(v.id)"></button>
          </div>
          <div class="echartsBox">
            <line-echarts3 :colorIndex="1" :datas="lineEcharts" ref="lineEchart1" :key="'1'" />
          </div>
        </div>
      </div>
      <div class="self-box">
        <div class="head">变压器情况</div>
        <div class="body">
          <div class="box2Wrap">
            <div class="nowValBox2">
              <div class="wrap" v-for="(v,i) in transformerLists" :key="i">
                <div class="part">
                  <p class="name" v-text="(i+1)>-1?'变压器当前温度':'占位'" :style="{opacity:(i+1)<-1?1:0}"></p>
                  <p class="val"><span class="text" v-text="v.title"></span><span v-text="v.data.value+v.data.daiti"></span></p>
                </div>
                <Lines v-if="(i+1)!=transformerLists.length" :hei="70" :top="30"/>
              </div>
              <div class="tit">变压器当前温度</div>
            </div>
            <div class="nowValBox3">
              <div class="part">
                <p class="name">当前负载率</p>
                <p class="val" v-text="nowLoadFactor"></p>
              </div>
            </div>
          </div>
          <div class="toggleBtnBox">
            <button v-for="(v,i) in btnLists2" type="button" :class="['self-btn',{active:btnActID2==v.id}]" v-text="v.name" :key="i" @click="btnClick2(v.id)"></button>
          </div>
          <div class="echartsBox">
            <line-echarts3 v-show="btnActID2==12004" :datas="lineEcharts2" ref="lineEchart2" :key="'2'" />
            <line-echarts3 v-show="btnActID2!=12004" :datas="lineEcharts3" ref="lineEchart3" :key="'3'" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="self-box2">
        <div class="head">变压器负载率统计</div>
        <div class="body">
          <div class="left">
            <self-progress :tit="v.title" :per="v.per" bgC="#3983ed" :time="v.value" v-for="(v,i) in leftLoadLists" :key="i" />
          </div>
          <div class="right">
            <self-progress :tit="v.title" :per="v.per" bgC="#fac376" :time="v.value" v-for="(v,i) in rightLoadLists" :key="i" />
          </div>
        </div>
      </div>
    </div>
    <div class="tRBrnBox">
      <el-select @change="selChange" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

  import utils from "../../../../assets/js/utils.js";
  import LineEcharts3 from "../../../../components/lineEcharts3";
  import SelfProgress from "../../../../components/selfProgress";
  export default {
    components: {
      SelfProgress,
      LineEcharts3


    },
    name: "envirState",
    data() {
      return {
        loading:false,
        //变配电室环境设备列表
        deviceLists:[
          {
            "id": "6",
            "self_id": "1200",
            "title": "配电室_温度"
          },
          {
            "id": "7",
            "self_id": "1200",
            "title": "配电室_湿度"
          },
          {
            "id": "8",
            "self_id": "1200",
            "title": "配电室_分贝"
          },
          {
            "id": "9",
            "self_id": "1200",
            "title": "变配电温度"
          },
          {
            "id": "10",
            "self_id": "1200",
            "title": "配电室_负载率"
          },
          {
            "id": "11",
            "self_id": "1206",
            "title": "高压侧_回路测试"
          },
          {
            "id": "12",
            "self_id": "1207",
            "title": "低压侧_回路测试"
          },
          {
            "id": "16",
            "self_id": "1250",
            "title": "1号视频"
          },
          {
            "id": "17",
            "self_id": "1250",
            "title": "2号视频"
          },
          {
            "id": "18",
            "self_id": "1250",
            "title": "3号视频"
          },
          {
            "id": "19",
            "self_id": "1250",
            "title": "4号视频"
          },
          {
            "id": "4330",
            "self_id": "12004",
            "title": "变压器负载率"
          },
          {
            "id": "4332",
            "self_id": "1204",
            "title": "1号变压器"
          },
          {
            "id": "4333",
            "self_id": "1204",
            "title": "2号变压器"
          }
        ],

        options: [],
        value: '',

        environmentLists:[
          {id:1,title:'-',data:{value:'-',daiti:'-'}}
        ],

        nowLoadFactor:'',
        transformerLists:[
          {id:1,title:'-',data:{value:'-',daiti:'-'}}
        ],

        btnActID:'',
        btnLists:[

        ],
        lineEcharts :{
          id:'Echart1',
          unit:'℃',
          style:{width:'6.43rem',height:175*100/728+'vh'},
          list:[
            {
              name:'',
              data:[],
            },
          ]
        },

        btnActID2:'12004',
        btnLists2:[
          {id:12004,name:'变压器负载率'},
          {id:12027,name:'变压器温度'},
        ],

        //变压器负载率
        lineEcharts2 :{
          id:'Echart2',
          unit:'%',
          showMarkL:true,
          markLineVal:0,
          showLegends:false,
          style:{width:'6.43rem',height:175*100/728+'vh'},
          list:[
            {
              name:'',
              data:[],
            },
          ]
        },
        //变压器温度
        lineEcharts3 :{
          id:'Echart3',
          unit:'℃',
          showMarkL:false,
          markLineVal:0,
          showLegends:true,
          style:{width:'6.43rem',height:175*100/728+'vh'},
          list:[
            {
              name:'',
              data:[],
            },
            {
              name:'',
              data:[],
            },
            {
              name:'',
              data:[],
            },
          ]
        },
        //负载率时间
        leftLoadLists:[
          // {id:1,title:'负载率超过95%',value:0,per:'0'},
        ],
        rightLoadLists:[
          // {id:2,title:'负载率低于50%',value:0,per:'0'},
        ],
      }
    },
    methods: {
      //获取变配电室环境设备列表
      getDeviceLists(){
        let objP = {
          'sys_menu_id':'3',
          'floor_id':'3'
        };
        utils.post('power/devicelist',objP).then(res=>{
          console.log('变配电室环境设备列表',objP,res)
          if(res.code==0){
            let data = res.data;
            this.deviceLists = data;
            let tempArr = [];
            let tempArr2 = [];

            let flag = false;//变压器默认取一个
            data.map((item,i)=>{
              if (item.self_id==1200){//1200是变配电室下面的设备
                if (item.title.indexOf('温度')>0 || item.title.indexOf('湿度')>0 || item.title.indexOf('分贝')>0){
                  let obj = {};
                  obj.id = item.id;
                  obj.title = item.title.substring(item.title.length-2);
                  tempArr.push(obj)
                }
              } else if(item.self_id==1204){//1204是变压器名称列表
                if(!flag){
                  this.value = '4332';//临时写死吧。。。。。。。
                  flag = true;
                }
                let tempObj = {};
                tempObj.value = item.id;
                tempObj.label = item.title;
                tempArr2.push(tempObj);
              }
            })

            this.options = tempArr2;

            this.btnLists = tempArr;
            this.btnActID = tempArr[0].id;
            //变配电室的echarts
            this.getEchartsData(tempArr[0].id)
            //获取变压器下的数据
            this.getTransformerData(this.value);
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取变配电室环境
      getEnvironmentData(){
        this.loading = true;
        let objP = {
          'sys_menu_id':'3',
          'floor_id':'3'
        };
        utils.post('power/environment',objP).then(res=>{
          console.log('变配电室环境',objP,res)
          if(res.code==0){
            this.environmentLists = res.data;
            this.loading = false;
          }else{
            this.$message(res.message);
            this.loading = false;
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })
      },
      //获取变压器情况
      getTransformerData(id){
        this.loading = true;
        let objP = {
          'sys_menu_id':'3',
          'floor_id':'3',
          'device_id':id
        };
        utils.post('power/loadFactor',objP).then(res=>{
          console.log('变压器情况',objP,res)
          if(res.code==0){
            //变压器当前值
            let current = res.data.current;
            let arr1 = [];
            current.map((item,i)=>{
              if (item.self_id == 12003 || item.self_id == 12027 || item.self_id == 12028){
                let tempItem = item;
                tempItem.title = item.title.substr(0,1);
                arr1.push(tempItem);
              } else if (item.self_id == 12004){
                this.nowLoadFactor = item.data.value+item.data.daiti;
              }
            })
            this.transformerLists = arr1;

            //变压器曲线图
            let load_map = res.data.load_map;
            /*load_map = [{
              'point_id': 569,
              'title': '变压器负载率',
              'unit': '',
              'category_id': '206',
              'self_id': '12004',
              'type': '0',
              'commtable': [{
                'value': ['2018-09-10 18:00', 5.0]
              }, {
                'value': ['2018-09-10 18:30', 6.0]
              }, {
                'value': ['2018-09-10 19:00', 4.0]
              }, {
                'value': ['2018-09-10 19:30', 5.0]
              }],
              'standard': '5.5'
            },{
              'point_id': 569,
              'title': 'A变压器温度',
              'unit': '',
              'category_id': '202',
              'self_id': '12003',
              'type': '0',
              'commtable': [{
                'value': ['2018-09-10 18:00', 10.0]
              }, {
                'value': ['2018-09-10 18:30', 12.0]
              }, {
                'value': ['2018-09-10 19:00', 12.0]
              }, {
                'value': ['2018-09-10 19:30', 10.0]
              }],
              'standard': '5.5'
            },{
              'point_id': 569,
              'title': 'B变压器温度',
              'unit': '',
              'category_id': '206',
              'self_id': '12027',
              'type': '0',
              'commtable': [{
                'value': ['2018-09-10 18:00', 5.0]
              }, {
                'value': ['2018-09-10 18:30', 9.0]
              }, {
                'value': ['2018-09-10 19:00', 8.0]
              }, {
                'value': ['2018-09-10 19:30', 6.0]
              }],
              'standard': '5.5'
            },{
              'point_id': 569,
              'title': 'C变压器温度',
              'unit': '',
              'category_id': '206',
              'self_id': '12028',
              'type': '0',
              'commtable': [{
                'value': ['2018-09-10 18:00', 1.0]
              }, {
                'value': ['2018-09-10 18:30', 2.0]
              }, {
                'value': ['2018-09-10 19:00', 3.0]
              }, {
                'value': ['2018-09-10 19:30', 4.0]
              }],
              'standard': '5.5'
            }];*/

            let tempArr22 = [];
            load_map.map((item2,i2)=>{
              if(item2.self_id==12004){
                let arr = [];
                let arr2 = [];
                item2.commtable.map((item3,i3)=>{
                  arr.push(item3.value);
                })

                let obj = {};
                obj.name = item2.title;
                obj.data = arr;

                arr2.push(obj);
                this.lineEcharts2.list = arr2;
                this.lineEcharts2.markLineVal = parseFloat(item2.standard);

              } else if (item2.self_id==12003 || item2.self_id==12027 || item2.self_id==12028) {
                let arr = [];

                item2.commtable.map((item4,i4)=>{
                  arr.push(item4.value);
                })

                let obj = {};
                obj.name = item2.title.substr(0,1)+'相';
                obj.data = arr;

                tempArr22.push(obj);
              }
            })
            this.lineEcharts3.list = tempArr22;

            //变压器负载率累计运行时间
            let load = res.data.load;
            /*load = [
              {
                "id": "4861",
                "self_id": "12025",
                "sys_menu_id": "3",
                "title": "负载率超过95%",
                "value": "30"
              },
              {
                "id": "4857",
                "self_id": "12021",
                "sys_menu_id": "3",
                "title": "负载率低于45%",
                "value": "10"
              },
              {
                "id": "4859",
                "self_id": "12023",
                "sys_menu_id": "3",
                "title": "负载率超过85%",
                "value": "29"
              },
              {
                "id": "4856",
                "self_id": "12020",
                "sys_menu_id": "3",
                "title": "负载率低于40%",
                "value": "24"
              },
              {
                "id": "4858",
                "self_id": "12022",
                "sys_menu_id": "3",
                "title": "负载率低于50%",
                "value": "23"
              },
              {
                "id": "4860",
                "self_id": "12024",
                "sys_menu_id": "3",
                "title": "负载率超过90%",
                "value": "20"
              }
            ];*/

            let load2 = res.data.load;

            /*load2 = [
              {
                "id": "4861",
                "self_id": "12025",
                "sys_menu_id": "3",
                "title": "负载率超过95%",
                "value": "30"
              },
              {
                "id": "4857",
                "self_id": "12021",
                "sys_menu_id": "3",
                "title": "负载率低于45%",
                "value": "10"
              },
              {
                "id": "4859",
                "self_id": "12023",
                "sys_menu_id": "3",
                "title": "负载率超过85%",
                "value": "29"
              },
              {
                "id": "4856",
                "self_id": "12020",
                "sys_menu_id": "3",
                "title": "负载率低于40%",
                "value": "24"
              },
              {
                "id": "4858",
                "self_id": "12022",
                "sys_menu_id": "3",
                "title": "负载率低于50%",
                "value": "23"
              },
              {
                "id": "4860",
                "self_id": "12024",
                "sys_menu_id": "3",
                "title": "负载率超过90%",
                "value": "20"
              }
            ]*/
            //按id数值大小排序
            function sortId(a,b) {
              return b.id-a.id
            }
            load.sort(sortId);

            //按小时排序
            function sortVal(a,b) {
              return b.value-a.value
            }
            load2.sort(sortVal);
            if (load2.length!==0) {//无奈
              let maxVal = load2[0].value;
              let fullVal = maxVal / 0.9;
              let leftLoadArr = [];
              let rightLoadArr = [];
              load.map((item4, i) => {
                if (i < 3) {
                  let obj111 = {};
                  obj111.id = item4.id;
                  obj111.title = item4.title;
                  obj111.value = item4.value;
                  obj111.per = item4.value / fullVal * 100;//百分比
                  leftLoadArr.push(obj111);
                } else {
                  let obj222 = {};
                  obj222.id = item4.id;
                  obj222.title = item4.title;
                  obj222.value = item4.value;
                  obj222.per = item4.value / fullVal * 100;//百分比
                  rightLoadArr.push(obj222);
                }
              })
              this.leftLoadLists = leftLoadArr;
              this.rightLoadLists = rightLoadArr;
            } else {
              this.leftLoadLists = [];
              this.rightLoadLists = [];
            }
            this.loading = false;





          }else{
            this.$message(res.message);
            this.loading = false;
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })
      },
      //获取echarts数据
      getEchartsData(id){
        this.loading = true;
        let objP = {
          'sys_menu_id':'3',
          'device_id':id
        };
        utils.post('power/temperature',objP).then(res=>{
          console.log('echarts数据',objP,res)
          if(res.code==0){


            this.lineEcharts.list = [];
            let data = res.data[0];

            data.commtable.map((item,i)=>{
              this.lineEcharts.id = 'echarts'+item.point_id+'a'+i;
              this.lineEcharts.unit = item.unit;

              let objss = {};
              objss.name = item.title;
              let arr = [];
              item.data.map((item2,i2)=>{
                arr.push(item2.value)
              })
              objss.data = arr;
              this.lineEcharts.list.push(objss);


            })
            this.loading = false;


          }else{
            this.$message(res.message);
            this.loading = false;
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })
      },

      btnClick(id){
        this.btnActID = id;
        this.getEchartsData(id);
      },

      btnClick2(id){
        this.btnActID2 = id;
      },
      //变压器名称选择
      selChange(val){
        this.getTransformerData(val);
      }
    },
    created() {
      this.getDeviceLists();

      this.getEnvironmentData();


    },
    mounted() {
      //this.$refs.lineEchartssss[0].drawLine();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .envirState{
    position: relative;
    .top{
      display: flex;
      justify-content: space-between;
      .self-box{
        width: 6.43rem;
        .vh(404);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(73, 143, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #498fe2;
        border-radius: 4px;
        .body{

          .nowValBox{
            margin-left: auto;
            margin-right: auto;
            .vhMT(23);
            width: 6.11rem;
            .vh(110);
            background-color: rgba(33, 72, 153, 0.8);
            border-radius: 4px;
            border: solid 1px rgba(44, 147, 239, 0.2);

            display: flex;
            justify-content: flex-start;
            .wrap{
              flex: 1;
              display: flex;
              justify-content: center;
            }
            .part{
              width: 100%;
              /*background-color: yellow;
              border-right: 1px solid red;*/
              display: flex;
              align-content: center;
              justify-content: center;
              flex-wrap: wrap;
              .name{
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .val{
                .vhMT(20);
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.35rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
              }
            }
          }

          .box2Wrap{
            display: flex;
          }
          .nowValBox2{
            .tit{
              width: 100%;
              position: absolute;
              left: 0;
              .vhTop(19);

              font-family: PingFangSC-Regular;
              font-size: 0.12rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #ffffff;
              text-align: center;
            }
            position: relative;
            margin-left: 0.16rem;
            .vhMT(23);
            width: 4.54rem;
            .vh(110);
            background-color: rgba(33, 72, 153, 0.8);
            border-radius: 4px;
            border: solid 1px rgba(44, 147, 239, 0.2);

            display: flex;
            justify-content: flex-start;

            .wrap{
              flex: 1;
              display: flex;
              justify-content: center;
            }
            .part{
              width: 100%;
              /*background-color: yellow;
              border-right: 1px solid red;*/
              display: flex;
              align-content: center;
              justify-content: center;
              flex-wrap: wrap;
              .name{
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .val{
                .vhMT(20);
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.35rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                .text{
                  font-size: 0.18rem;
                  margin-right: 0.05rem;
                }
              }
            }
          }

          .nowValBox3{
            margin-left: 0.2rem;
            .vhMT(23);
            width: 1.37rem;
            .vh(110);
            background-color: rgba(33, 72, 153, 0.8);
            border-radius: 4px;
            border: solid 1px rgba(44, 147, 239, 0.2);

            display: flex;
            justify-content: flex-start;
            .part{
              flex: 1;
              /*background-color: yellow;
              border-right: 1px solid red;*/
              display: flex;
              align-content: center;
              justify-content: center;
              flex-wrap: wrap;
              .name{
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .val{
                .vhMT(20);
                width: 100%;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.35rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
              }
            }
          }

          .toggleBtnBox{
            width: 6.11rem;
            margin-left: auto;
            margin-right: auto;
            .vhMT(19);
            .self-btn{
              cursor: pointer;
              &:first-of-type{
                margin-left: 0;
              }
              margin-left: 0.1rem;
              min-width: 0.74rem;
              padding: 0 0.06rem;
              .vh(24);
              background-color: rgba(255, 255, 255, 0.01);
              border-radius: 2px;
              border: solid 1px #1989fa;
              outline: none;

              font-family: PingFangSC-Light;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #b5d7ff;
              &:active{
                background-color: #1575d9;
                color: #fff;
              }
              &.active{
                background-color: #1575d9;
                color: #fff;
              }
            }
          }
          .echartsBox{
            position: relative;
            .vhMT(12);
            width: 100%;
            .vh(178);
          }


        }
      }
    }
    .bottom{
      .vhMT(20);
      .self-box2{
        width: 13.06rem;
        .vh(152);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(73, 143, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #498fe2;
        border-radius: 4px;

        .body{
          width: 100%;
          .vh(113);
          display: flex;
          justify-content: flex-start;

          .left{
            width: 50%;
            height: 100%;
            padding: 0.11rem 0;
          }
          .right{
            width: 50%;
            height: 100%;
            padding: 0.11rem 0;
          }
        }
      }
    }

    .tRBrnBox{
      position: absolute;
      right: 0;
      .vhTop(-32);
      width: 0.88rem;
      .el-input--suffix .el-input__inner{
        .vh(24);
        padding: 0;
        border: 0!important;
        border-bottom: solid 2px #1989fa!important;
      }
    }

    .head{
      display: flex;
      align-items: center;
      padding-left: 0.16rem;
      width: 100%;
      .vh(39);
      background-color: rgba(0, 0, 0, 0.2);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #008aff;
    }
  }


</style>
