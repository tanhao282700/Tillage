<template>
  <div class="energySituation">
    <div class="btnBox">
      <div class="tabHead">
        <button @click="tabClick(i,v.id)" type="button" v-for="(v,i) in devTitLists" v-text="v.tit" :key="i" :class="['btn1',{active:v.id==btnActiveId}]"></button>
      </div>
    </div>
    <div class="row">
      <div class="copEchartBox">
        <div class="title">cop情况</div>
        <div class="content">
          <echarts-l v-if="v.id==btnActiveId" v-for="(v,i) in tabData" :key="i" :datas="v.datas" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="energyEchartBox">
        <div class="title">机房能耗情况</div>
        <div class="btnBox">
          <div class="cascaderBox">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              @change="handleChange">
            </el-cascader>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <echarts-l v-for="(v,i) in tabData2" :key="i" :datas="v.datas" />
          </div>
          <div class="right">
            <echarts-bar v-for="(v,i) in tabData3" :key="i" :datas="v.datas" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EchartsL from "./echartsL";
  import EchartsBar from "./echartsBar";
  import utils from '../../../../assets/js/utils';
  export default {
    name: "energySituation",
    components: {
      EchartsBar,
      EchartsL

    },
    data() {
      return {
        btnActiveId:'',
        devTitLists:[
          {id:1,tit:'一号机房'},
          {id:2,tit:'二号机房'},
        ],
        tabData:[
          /*{
            id:1,
            title:'cop',
            unit:['℃'],
            datas:{
              id:'selfEchart11',
              style:{width:'12.76rem',height:244*100/728+'vh'},
              showMarkL:true,
              colorArr:[
                {color1:'rgba(229,81,80,1)',color3:'rgba(229,81,80,0.5)'},
                {color1:'rgba(45,240,224,1)',color3:'rgba(45,240,224,0.5)'},
              ],
              markLineVal:6.5,
              showLegends:true,
              list:[
                {
                  name:'主机cop',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        4
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        15
                      ]
                    }
                  ],
                },
                {
                  name:'系统cop',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        12
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        8
                      ]
                    }
                  ],
                }
              ]

            }
          },*/
        ],
        tabData2:[
          {
            id:1,
            title:'能耗',
            unit:['℃'],
            datas:{
              id:'selfEchart12',
              style:{width:'6.3rem',height:244*100/728+'vh'},
              showLegends:true,
              legendsC:true,
              colorArr:[
                {color1:'rgba(255,159,6,1)',color3:'rgba(255,159,6,0.5'},
                {color1:'rgba(74,144,226,1)',color3:'rgba(74,144,226,0.5)'},
              ],
              list:[
                {
                  name:'2017',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        4
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        15
                      ]
                    }
                  ],
                },
                {
                  name:'2018',
                  data:[
                    {
                      "value": [
                        "2018-09-25 09:00",
                        12
                      ]
                    },
                    {
                      "value": [
                        "2018-09-25 09:30",
                        8
                      ]
                    }
                  ],
                }
              ]

            }
          },
        ],
        tabData3:[
          {
            id:1,
            title:'能耗对比',
            unit:['℃'],
            datas:{
              id:'selfEchart13',
              style:{width:'6.3rem',height:244*100/728+'vh'},
              showLegends:true,
              legendsC:true,
              colorArr:[
                {color1:'rgba(250,96,116,1)',color2:'#fd99ac',color3:'rgba(250,96,116,0.5'},
                {color1:'rgba(255,159,6,1)',color2:'#ffd12d',color3:'rgba(255,159,6,0.5'},
                {color1:'rgba(74,144,226,1)',color2:'#6dbefd',color3:'rgba(74,144,226,0.5)'},
              ],
              time:['01','02','03','04','05','06','07','08',],
              list:[
                {
                  name:'本月',
                  data:[5,10,1,2,3,4,5,6],
                },
                {
                  name:'上月',
                  data:[7,13,6,5,4,3,2,1],
                },
                {
                  name:'去年本月',
                  data:[7,13,3,2,1,4,5,6],
                }
              ]

            }
          },
        ],
        selectedOptions2:[],
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            },  {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }],
      }
    },
    methods:{
      //获取cop报表
      getCOPData(sysID=19,floor_id=101){
        let obj = {
          sys_menu_id:sysID,
          floor_id:floor_id
        };
        utils.post('airConditioner/energy/floor',obj).then(res=>{
          console.log('能耗情况cop',obj,res);
          if (res.code==0){
            let data = res.data;
            let titArr = [];
            let conArr = [];
            data.map((item,i)=>{
              if (i===0){
                this.btnActiveId = item.id;
              }
              let titObj = {};
              titObj.id = item.id;
              titObj.tit = item.device_title;
              titArr.push(titObj);

              let obj = {};
              obj.id = item.id;
              obj.title = item.point_title;
              obj.unit = [];
              obj.unit.push(item.unit);
              obj.datas = {};
              obj.datas.id = 'selfEchart'+item.id;
              obj.datas.style = {width:'12.76rem',height:244*100/728+'vh'};
              obj.datas.showMarkL = true;
              obj.datas.colorArr = [];
              if (item.point_title.indexOf('系统COP') > -1) {
                obj.datas.colorArr.push({color1:'rgba(45,240,224,1)',color3:'rgba(45,240,224,0.5)'})
              }else {
                obj.datas.colorArr.push({color1:'rgba(229,81,80,1)',color3:'rgba(229,81,80,0.5)'})
              }
              obj.datas.markLineVal = item.standard;
              obj.datas.showLegends = true;
              obj.datas.list = [];
              let obj2 = {};
              obj2.name = item.point_title;
              obj2.data = item.data;
              obj.datas.list.push(obj2);
              conArr.push(obj);
            })

            this.devTitLists = titArr;
            this.tabData = conArr;
          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      //获取能耗筛选tit
      getTitData(floor_id=101){
        let obj = {
          floor_id:floor_id
        };
        utils.post('airConditioner/energy/title',obj).then(res=>{
          console.log('能耗筛选题目',obj,res);
          if (res.code==0){


          } else {

            this.$message(res.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      tabClick(index,id){
        this.btnActiveId= id;
      },
      handleChange(val){

      }
    },
    created(){
      this.getCOPData();
      this.getTitData();
    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .energySituation{
    .el-cascader{
      height: 100%;
      line-height: 1;
    }
    .el-cascader .el-input, .el-cascader .el-input__inner{
      height: 100%;
    }
    .el-cascader__label{
      .vhLineH(32);
      color: #fff;
    }
    margin: 0 auto;
    width: 13.06rem;
    .vh(580);
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    .vhPT(20);
    .vhPB(20);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .btnBox{
      display: flex;
      align-items: center;
      position: relative;
      .tabHead{
        .btn1{
          &:first-of-type{
            margin-left: 0;
          }
          margin-left: 0.12rem;
          .vh(32);
          background-color: rgba(59, 137, 249, 0.2);
          border-radius: 2px;

          padding-left: 0.2rem;
          padding-right: 0.2rem;
          .vhPT(6);
          .vhPB(6);

          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          line-height: 1;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #a5a5a5;

          border: solid 1px transparent;
          outline: none;
          cursor: pointer;
          &.active{
            color: #1989fa;
            background-color: transparent;
            border: solid 1px #3a84ee;
          }
        }
      }

    }
    .row{
      .vhMT(10);
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        .vh(40);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding-left: 0.1rem;
        display: flex;
        align-items: center;

        font-family: PingFangSC-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 16px;
        letter-spacing: 0px;
        color: #008aff;
      }
      .copEchartBox{
        width: 100%;
        .vh(244);
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        border: solid 1px rgba(45, 148, 240, 0.2);
        position: relative;
        .content{

        }

      }
      .energyEchartBox{
        width: 100%;
        .vh(244);
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        border: solid 1px rgba(45, 148, 240, 0.2);
        position: relative;
        .btnBox{
          position: absolute;
          right: 0.1rem;
          .vhTop(4);
          z-index: 100;
          display: flex;
          .cascaderBox{

            width: 0.87rem;
            .vh(32);
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            overflow: hidden;
          }
        }
        .content{
          display: flex;
          justify-content: space-between;
          .left{
            width: 6.30rem;

          }
          .right{
            width: 6.30rem;
          }
        }
      }
    }
  }
</style>
