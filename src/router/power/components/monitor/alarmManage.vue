<!--
    变配电系统 报警管理
    made by 胡永福
    start in 2018-9-5
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="alarmManage">
    <div class="head">
      <div class="monthBox">
        <el-date-picker
          v-model="monthVal"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="searchBtn">
        <el-button @click="search()" type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <button @click="exportReport()" type="button" class="self-button">
        <span class="icon-export"></span>
        <span>导出</span>
      </button>
    </div>
    <div class="body">
      <Table @changePage="changePage" :table = "table"/>
    </div>
  </div>
</template>

<script>

  import Table from "../../../../components/table";
  import showProgress from './showProgress';
  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {
      Table
    },
    name: "alarmManage",
    data() {
      return {
        loading:false,//加载动画开关

        monthVal:utils.time(new Date()/1000,9),

        num:1,//第几页
        table:{
          hei:464, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:9, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            {number11:'-',time:'-',position:'-',event:'-',class:'-',progress:'-',person:'-'}
            /*{num:'01',time:'2018/06/02  16:55',position:'低压侧XX柜 wpm-301回路',event:'开关断开',class:'严重',progress:'未处理',person:'张三三'},
            {num:'02',time:'2018/06/02  16:55',position:'低压侧XX柜 wpm-301回路',event:'开关断开',class:'严重',progress:'已完成',person:'张三三'},
            {num:'03',time:'2018/06/02  16:55',position:'低压侧XX柜 wpm-301回路',event:'开关断开',class:'严重',progress:'处理中',person:'张三三'}*/,
          ],
          th:[
            {prop:'number11',label:'编号',wid:73},
            {prop:'time',label:'时间',wid:261},
            {prop:'position',label:'设备位置',wid:308},
            {prop:'event',label:'报警事件',wid:184},
            {prop:'class',label:'报警等级',wid:184},
            {prop:'progress',
              label:'进度',
              wid:180,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  //data:param.row.type
                };
                //console.log(h,param)
                return h(showProgress,{
                  props: {name:param.row.progress},
                  on:{}
                });
              }
            },
            {prop:'person',label:'责任人'},
          ]
        },
      }
    },
    methods: {
      //获取报警管理数据
      getData(time,num=1){
        this.loading = true;
        let objP = {
          'sys_menu_id':3,
          'time':time,
          'pagesize':9,
          'pagenumber':num
        };
        utils.post('power/alarmManage',objP).then(res=>{
          console.log('报警管理数据报表',objP,res)
          if(res.code==0){

            this.table.len = res.paging.count;//多少条数据

            let data = res.data;
            let dataArr = [];
            data.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.table.page-1)*9;
              obj.number11 = (num<10?('0'+num):(''+num));
              obj.time = item.time;
              obj.position = item.device_location;
              obj.event = item.message;
              obj.class = item.alarm_level==0?'普通':item.alarm_level==1?'重要':item.alarm_level==2?'紧急':'未知';
              obj.progress = item.state==0?'未处理':item.state==1?'处理中':item.state==4?'已完成':'未知';
              obj.person = item.charge;
              dataArr.push(obj);
            })
            this.table.data = dataArr;
            console.log('我得到的',this.table.data)
            this.loading = false;
          }else{
            this.loading = false;
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
        })
      },
      //导出Excel报表
      getExcel(time){
        let objP = {
          'sys_menu_id':'3',
          'time':time,
        };
        utils.post('power/alarmManage/Excel',objP).then(res=>{
          console.log('导出excel统计报表',objP,res)
          if(res.code==0){
            this.$message({
              type: 'success',
              message: res.message
            });

            this.$notify.info({
              title: '消息',
              message: '所导出的excel表文件位置：'+res.data
            });

          }else{
            console.log(res)
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getData(this.monthVal,val);
        // console.log(val)
      },
      //查询按钮事件
      search(){
        this.table.page = 1;
        this.getData(this.monthVal,1);
      },
      //导出数据报表
      exportReport(){
        window.location.href = 'https://tesing.china-tillage.com/power_distribution/power_alarmmanage_excel?project_id=3&sys_menu_id=3&time='+this.monthVal;
        //this.getExcel(this.monthVal)
      },
    },
    created() {

      this.getData(this.monthVal,1);//初始页面请求
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .alarmManage{
    .el-input--suffix .el-input__inner{
      height: 100%!important;
    }
    width: 13.06rem;
    .vh(578);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;

    .head{
      width: 100%;
      .vh(64);
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      .monthBox{
        display: inline-block;
        width: 1.20rem;
        .vh(32);
      }
      .searchBtn{
        margin-left: 0.12rem;
        width: 0.87rem;
        .vh(32);
        .el-button--primary{
          width: 100%;
          height: 100%;
          display: inline-block;
          line-height: 1;
          padding: 0;
        }
      }
      .self-button{
        margin-left: 0.09rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 0.88rem;
        .vh(32);
        background-color: #3a84ed;
        color: #fff;
        border: 0;
        outline: none;
        border-radius: 2px;
        padding: 0;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        .icon-export{
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: url("../../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
          background-size: 100% 100%;
          margin-right: 0.08rem;
        }
      }
    }
    .body{
      width: 100%;
      padding: 0 0.2rem;
    }
  }


</style>
