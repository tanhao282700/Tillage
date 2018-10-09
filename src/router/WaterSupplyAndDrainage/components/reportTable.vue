
<!--
    给排水系统 报表
    made by 胡永福
    start in 2018-8-7
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="wsadReport">
    <div class="head">
      <span v-text="sysID==8?'给水系统数据报表':'排水系统数据报表'" class="title"></span>

      <button @click="open2(sysID,tableType)" class="export-btn" type="button">
        <span class="icon-export"></span>
        <span>导出</span>
      </button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据统计报表" name="first">
          <Table @changePage="changePage" :table = "table"/>
        </el-tab-pane>
        <el-tab-pane label="故障统计报表" name="second">
          <Table @changePage="changePage2" :table = "table2"/>
        </el-tab-pane>
        <el-tab-pane label="维修记录报表" name="third">
          <Table @changePage="changePage3" :table = "table3"/>
        </el-tab-pane>
        <el-tab-pane label="启停统计报表" name="fourth">
          <Table @changePage="changePage4" :table = "table4"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import utils from '../../../assets/js/utils';
  import SelectBox from '../../../components/form/selectBox';
  import Table from '../../../components/table';

  import showTooltip from './showTooltip';
  import showOperateState from './showOperateState';

  export default {
    components:{
      'SelectBox':SelectBox,
      'Table':Table,
    },
    props:['sysID'],
    data () {
      let wid1=73;
      let  wid2=133;
      let  wid3=82;
      let  wid4=93;
      let  wid5=109;
      return {
        tableType:'1',
        activeName: 'first',
        headTitle:[],

        loading:false,
        table:{
          hei:480, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {time:'-'},
          ],
          th:[
            // {prop:'time',label:'-'},

          ]
        },

        table2:{
          hei:480, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {
            //   title: '-', running_date: '-', zhanwei: '', "alarm": {
            //     "alarm_details": [
            //       {
            //         "content": "-",
            //         "describe": "描述",
            //         "id": "1",
            //         "time": "-"
            //       }
            //     ],
            //     "alarm_num": 0
            //   },
            // },
          ],
          th:[
            {prop:'title',label:'名称',wid:290},
            {prop:'running_date',label:'累计运行时间',wid:309},
            {prop:'alarm',
              label:'告警次数',
              wid:85,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  //warnCount:param.row.warnCount
                };
                //console.log(h,param)
                return h(showTooltip,{
                  props: {btnss:btnss,warnInfo:param.row.alarm.alarm_details,deviceInnormalNum:param.row.alarm.alarm_num},
                  on:{}
                });
              }
            },
            {prop:'zhanwei',label:''},

          ]
        },
        warnInfo:[
          {id:1,date:'-',content:'-',title:''},
        ],
        deviceInnormalNum:10,

        table3:{
          hei:480, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {date: '-',title:'-',show_name:'-',show_content:'-',btns2:22},
          ],
          th:[
            {prop:'date',label:'时间',wid:182},
            {prop:'title',label:'名称',wid:200},
            {prop:'show_name',label:'维修人',wid:147},
            {prop:'show_content',label:'维修记录',},
          ]
        },

        table4:{
          hei:480, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {date: '-',device_name:'-',name:'-',data:'-'},
          ],
          th:[
            {prop:'date',label:'时间',wid:182},
            {prop:'device_name',label:'名称',wid:200},
            {prop:'name',label:'操作人',wid:147},
            {prop:'data',
              label:'操作状态',
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  data:param.row.data
                };
                //console.log(h,param)
                return h(showOperateState,{
                  props: {btnss:btnss},
                  on:{}
                });
              }
            },
          ]
        },
      }
    },
    methods:{
      open2(sysID,type) {
        this.$confirm('此操作将导出Excel表格数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getExportReport(sysID,type);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });
        });
      },
      //分页：切换页面
      changePage(val){
        this.getDataReport(this.sysID,val)
      },
      changePage2(val){
        this.getFaultReport(this.sysID,val)
      },
      changePage3(val){
        this.getRecordReport(this.sysID,val)
      },
      changePage4(val){
        this.getSwitchReport(this.sysID,val)
      },
      //tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);
        switch (tab.index) {
          case '0':
            if (this.sysID == 8){
              this.tableType = '1';
            } else if (this.sysID == 9){
              this.tableType = '5';
            }
            break;
          case '1':
            this.tableType = '2';
            break;
          case '2':
            this.tableType = '3';
            break;
          case '3':
            this.tableType = '4';
            break;
          default:
            alert('未知错误0');
        }
      },
      //数据统计报表
      getDataReport(sysID,num){
        this.loading = true;
        let data = {'sys_menu_id':sysID,'floor_id':'','pagesize':20,'pagenumber':num};
        console.log(data)
        utils.post('water/home/dataReport',data).then(res=>{
          console.log(res,'数据统计报表')
          if(res.code==0){


            let realHeadArr = [];
            res.data[0].points_list.map((item,i)=>{

              this.headTitle.some((item2,i2)=>{
                let obj = {};
                if (item2.self_id == item.self_id) {
                  obj.prop = 'a'+item2.self_id;
                  obj.label = item2.title;
                  realHeadArr.push(obj);
                  return true;
                }
              })
              if (i == 0) {
                let obj3 = {};
                obj3.prop = 'device_name';
                obj3.label = '名称';
                realHeadArr.unshift(obj3);
                this.table.th = realHeadArr;
                let obj2 = {};
                obj2.prop = 'date';
                obj2.label = '时间';
                realHeadArr.unshift(obj2);
              }

            })
            console.log(realHeadArr);

            res.data.map((item3,i3)=>{
              item3.points_list.map((item4,i4)=>{
                item3['a'+item4.self_id] = item4.now_value;
              })
            })

            this.table.data = res.data;
            this.table.len = res.paging.count;
            //console.log(this.table.data)
            this.loading = false;
          //this.table.len = res.data.length;
          }else{
            this.$message(res.message);
            this.loading = false;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //故障统计报表
      getFaultReport(sysID,num){
        this.loading = true;
        let data = {'sys_menu_id':sysID,'pagesize':20,'page_index':num};
        utils.post('water/home/faultReport',data).then(res=>{
          console.log(res,'故障统计报表')
          if(res.code==0){
            this.table2.len = res.paging.count;
            let tempData = res.data;
            let newData = tempData.map((item,i)=>{
              item.zhanwei = '';
              return item
            })
            this.table2.data = newData;
            this.loading = false;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //维修记录统计报表
      getRecordReport(sysID,num){
        this.loading = true;
        let data = {'sys_menu_id':sysID,'pagesize':20,'page_index':num};
        utils.post('water/home/recordReport',data).then(res=>{
          console.log(res,'维修记录统计报表')
          if(res.code==0){
            this.table3.data = res.data;
            this.table3.len = res.paging.count;
            this.loading = false;

          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //启停统计报表
      getSwitchReport(sysID,num){
        this.loading = true;
        let data = {'sys_menu_id':sysID,'pagesize':20,'pagenumber':num};
        utils.post('water/home/switchReport',data).then(res=>{
          console.log(res,'启停统计报表')
          if(res.code==0){
            this.table4.len = res.paging.count;
            let tempData = res.data;
            let newArr= tempData.map((item,i)=>{
              console.log(eval('('+item.data+')'))
              eval('('+item.data+')').value == '1' ? item.data='开启':item.data='关闭';
              return item;
            })

            this.table4.data = newArr;
            this.loading = false;

          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //导出统计报表
      getExportReport(sysID,type){
        let data = {'sys_menu_id':sysID,'type':type};
        console.log('excel',data)
        utils.post('water/home/report/excel',data).then(res=>{
          console.log(res,'导出excel统计报表')
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
      //获取报表表头
      getReportHeader(sysID){
        let data = {'sys_menu_id':sysID};
        utils.post('water/reportHeader',data).then(res=>{
          console.log(res,'获取报表表头')
          if(res.code==0){

            this.headTitle = res.data;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {

      this.getReportHeader(this.sysID)
      console.log('系统id',this.sysID)
      this.getDataReport(this.sysID,1)
      this.getFaultReport(this.sysID,1)
      this.getRecordReport(this.sysID,1)
      this.getSwitchReport(this.sysID,1)

    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/comon';
  .wsadReport{
    display: flex;
    flex-direction: column;
    flex: 1;
    //background-color: yellow;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 0.5rem;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 0 0.2rem;
      .export-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.1rem;
        width: 0.88rem;
        height: 0.32rem;
        background-color: rgba(59, 137, 249, 0.2);
        border-radius: 4px;
        border: 0;
        outline: none;
        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
        cursor: pointer;
        .icon-export{
          margin-right: 0.1rem;
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: url("../../../assets/img/WaterSupplyAndDrainage/icon_export.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
      .title{
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .body{
      padding: 0 0.2rem;
    }
  }
</style>
