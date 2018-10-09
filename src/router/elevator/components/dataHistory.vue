<!--
    电梯系统 数据监控
    made by 樊得涛
    start in 2018-9-28
-->
<template>
<div class="dataHistory">
  <div class="selectBox">
    <div class="oneLevelBox">
      <el-select v-model="louOP.value" placeholder="请选择">
        <el-option
          v-for="item in louOP.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="oneLevelBox">
      <el-select v-model="keti.value" placeholder="请选择">
        <el-option
          v-for="item in keti.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="searchBox">
       <div class="dateBox" @click="toggleTimearraw">
         <el-date-picker
           ref='date'
           v-model="dateVal"
           type="daterange"
           start-placeholder="开始日期"
           end-placeholder="结束日期"
           range-separator="  -  "
           :default-time="['00:00:00', '23:59:59']"
           @blur= "toggleTimearraw(1)"
           >
         </el-date-picker>
         <i class="el-select__caret el-input__icon dataarraw1" 
        :class="{ 'el-icon-arrow-up': dateIcon,'el-icon-arrow-down': !dateIcon}"></i>
         <i class="el-select__caret el-input__icon  dataarraw2"
         :class="{ 'el-icon-arrow-up': dateIcon,'el-icon-arrow-down': !dateIcon}"></i>
         <span class="timeline timelineF"></span>
         <span class="timeline timelineR"></span>
       </div>
      <div class="sltbtn">
        <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </div>
  </div>

  <div class="self-table">
    <div class="jifang">
      <div class="header">机房状态</div>
      <div class="container">
        <div class="left">
         <span class="baseline">基准线</span>
          <lineChart v-if="lineData.jifang.wendu.average!=''" :datas="lineData.jifang.wendu"/>
        </div>
        <div class="line"></div>
        <div class="right">
         <span class="baseline">基准线</span>
          <lineChart v-if="lineData.jifang.shidu.average!=''" :datas="lineData.jifang.shidu"/>
        </div>
      </div>
    </div>
    <div class="dikeng">
      <div class="header">底坑湿度</div>
      <div class="container">
        <span class="baseline">基准线</span>
          <lineChart v-if="lineData.dikeng.shidu.average!=''" :datas="lineData.dikeng.shidu"/>
      </div>
    </div>
    <div class="dianliu">
      <div class="header">电流电压</div>
      <div class="container">
        <lineChart2 :datas="lineData.dianliu.dy"/>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import utils from "../../../assets/js/utils.js";
  import Table from '../../../components/table';
  import lineChart from './lineChart';
  import lineChart2 from './lineChart2';
  export default {
    components:{
      Table,
      lineChart,
      lineChart2
    },
    data () {
      return {
        dateVal:'',
        dateIcon:false,
        //选择楼类型
        louOP:{
          options: [{
             value: '',
             label: '请选择'
           },{
             value: '1',
             label: '1号楼'
           }, {
             value: '2',
             label: '2号楼'
           }, {
             value: '3',
             label: '3号楼'
           }],
           value: '',
        },
          //客梯
        keti:{
          options: [{
            value: '',
            label: '请选择'
          }, {
            value: '1',
            label: '1号客梯'
          }, {
            value: '2',
            label: '2号客梯'
          }],
          value: '',
        },
        lineData:{
          jifang:{
            wendu:{
              title:'机房温度/°C',
              id:'jifangwendu',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[11, 11, 15, 13, 12, 13, 10],
              lineC:'#1b7ffd',
              average:''
            },
            shidu:{
              title:'机房湿度/％CH',
              id:'jifangshidu',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[30, 40, 15, 28, 22, 35, 10],
              lineC:'#1b7ffd',
              average:''
            }
          },
          dikeng:{
            shidu:{
              title:'底坑湿度/％CH',
              id:'dikeng',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[30, 40, 15, 28, 22, 35, 10],
              lineC:'#f56c6c',
              average:''
            }
          },
          dianliu:{
            dy:{
              title:'电流电压',
              id:'dianliu',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[
                 {name:'电流/A',lineC:'#ffa414',
                 data:[30, 40, 15, 28, 22, 35, 10]},
                 {name:'电压/V',lineC:'#2df0e0',
                 data:[120, 130, 120, 120, 180, 120, 120]},
              ],
            }
          }
        }
      }
    },
    methods:{
      average(data,key,subkey){
        let sum = 0;
        data.forEach((v)=>{
          sum +=v;
        });
        sum = (sum/data.length).toFixed(2);
        this.lineData[key][subkey].average = sum;
      },
      toggleTimearraw(flag){
        if(flag == 1){
          this.dateIcon = false;
        }else{
         this.dateIcon = !this.dateIcon;
        }
      },
      //获取历史记录请求
      getHistory(num=1,date='',state='',type='',cont=''){
        this.average(this.lineData.jifang.wendu.y,'jifang','wendu');
        this.average(this.lineData.jifang.shidu.y,'jifang','shidu');
        this.average(this.lineData.dikeng.shidu.y,'dikeng','shidu');
      },

      //选择页码查询
      changePage(val){
        
      },

      //选择查询条件后查询
      search(){
       
      },

      exportExcel(){
        
      },


      getHisExcel(num=1,date='',state='',type='',cont=''){
        
      }



    },
    created() {
      this.getHistory();
    },
    mounted() {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  /*插件的样式*/
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color:#04152c!important;
    &::after{
      border-bottom-color:#04152c!important;
    }
  }
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  @import '../style/dataHistory.less';

</style>
