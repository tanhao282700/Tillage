<template>
  <div class="modeControl">
    <div class="head">
      <span class="title">定时自动控制</span>
      <div class="btnBox">
        <button @click="switchControl(i)" type="button" v-for="(v,i) in btnLists" v-text="v.tit" :key="i" :class="{active:i==btnActive}"></button>
      </div>
    </div>
    <div class="body">
      <div class="tableBox">
        <div class="title">
          <div :style="{width:v.wid}" class="th" v-for="(v,i) in tableThLists" v-text="v.label" :key="i"></div>
        </div>
        <div class="content">
          <div class="tr" v-for="(v,i) in tableTdLists">
            <div class="td">
              <div :style="{width:tableThLists[0].wid}" class="num" v-text="(i+1)<10?('0'+(i+1)):(i+1)"></div>
              <!--<div :style="{width:tableThLists[0].wid}" class="num" v-text="v.id"></div>-->
              <div :style="{width:tableThLists[1].wid}" class="mode">
                <el-input v-model="v.name" placeholder="请输入内容"></el-input>
              </div>
              <div :style="{width:tableThLists[2].wid}" class="startTime">
                <el-time-picker
                  v-model="v.startTime"
                  format="HH:mm"
                  placeholder="任意时间点">
                </el-time-picker>
              </div>
              <div :style="{width:tableThLists[3].wid}" class="endTime">
                <el-time-picker
                  v-model="v.endTime"
                  format="HH:mm"
                  placeholder="任意时间点">
                </el-time-picker>
              </div>
              <div :style="{width:tableThLists[4].wid}" class="loop">
                <el-checkbox-group v-model="v.loop" size="medium">
                  <el-checkbox-button v-for="week in weeks" :label="week" :key="week">{{week}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <div :style="{width:tableThLists[5].wid}" class="room">
                <el-select
                  multiple
                  collapse-tags
                  v-model="v.room"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div :style="{width:tableThLists[6].wid}" class="operate no-select">
                <span @click="toggleSwitch(v.state,i)" class="switch" v-text="v.state"></span>
                <span @click="del(v.id)" class="del">删除</span>
              </div>
            </div>
          </div>
          <div class="addBtns" @click="addMode()">
            <i class="el-icon-circle-plus"></i>
            <span>添加模式</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    name: "modeControl",
    data() {
      return {
        btnActive:0,
        btnLists:[
          {id:1,tit:'开启'},
          {id:2,tit:'关闭'},
        ],
        tableThLists:[
          {id:1,label:'编号',wid:'0.5rem'},
          {id:2,label:'模式名称',wid:'1.2rem'},
          {id:3,label:'开启时间',wid:'1.2rem'},
          {id:4,label:'关闭时间',wid:'1.2rem'},
          {id:5,label:'循环',wid:'6.12rem'},
          {id:6,label:'机房',wid:'1.64rem'},
          {id:7,label:'操作',wid:'1.2rem'},
        ],
        tableTdLists:[
          {id:1,name:'',startTime:'',endTime:'', loop:[],room:[],state:'开启'},
        ],

        weeks:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        options: [
          {
          value: '选项1',
          label: '1号机房'
        }, {
          value: '选项2',
          label: '2号机房'
        }, {
          value: '选项3',
          label: '3号机房'
        }],
      }
    },
    methods: {
      switchControl(val){
        this.btnActive = val;
      },
      addMode(){
        let arr = this.tableTdLists;
        let len = this.tableTdLists.length;



        let obj = {id:len+1,name:'',startTime:'',endTime:'', loop:[],room:[],state:'开启'};
        this.tableTdLists.push(obj);
      },
      toggleSwitch(str,index){
        if (str==='开启') {
          this.tableTdLists[index].state = '关闭';
        }else if (str==='关闭') {
          this.tableTdLists[index].state = '开启';
        }
      },
      del(index){
        let tagList = this.tableTdLists;
        for(var i = 0; i < tagList.length; i++){
          if(tagList[i].id === index){
            tagList.splice(i,1);
          }
        }
      }
    },
    created() {

    },
    mounted() {

    },
    watch:{
      tableTdLists:function (a,b) {
        console.log(a,b)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .modeControl{

    margin: 0 auto;
    width: 13.06rem;
    .vh(580);
    .vhMT(4);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .head{
      width: 100%;
      .vh(50);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      position: relative;
      .title{
        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;

      }
      .btnBox{
        position: absolute;
        right: 0.2rem;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        button{
          &:first-of-type{
            margin-right: 0.1rem;
          }
          width: 0.68rem;
          .vh(32);
          background-color: rgba(59, 137, 249, 0.2);
          border-radius: 4px;
          border:0;
          outline: none;

          font-family: PingFangSC-Medium;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          &.active{
            background-color: #3a84ee;
          }
        }
      }
    }

    .body{
      .tableBox{
        border: solid 1px rgba(181, 215, 255, 0.25);
        .title{
          width: 13.06rem;
          .vh(35);
          display: flex;
          justify-content: flex-start;
          .th{
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            .vhLineH(35);
            letter-spacing: 0px;
            color: #b5d7ff;
            border-right: solid 1px rgba(181, 215, 255, 0.25);
            border-bottom: solid 1px rgba(181, 215, 255, 0.25);
          }
        }
        .content{
          width: 13.06rem;
          .vh(495);
          overflow-y: scroll;
          overflow-x: hidden;
          .tr{
            display: flex;
            justify-content: flex-start;
            .td{
              &>*{
                height: 100%;
                border-right: solid 1px rgba(181, 215, 255, 0.25);
                display: flex;
                align-items: center;
              }
              border-bottom: solid 1px rgba(181, 215, 255, 0.25);
              display: flex;
              justify-content: center;
              align-items: center;

              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #439aff;
              text-align: center;

              .el-input{
                width: 100%!important;
                height: 100%!important;
              }
              .el-input__inner{
                width: 100%!important;
                height: 100%!important;
                font-size: 0.14rem!important;
                border: 0!important;
                padding: 0;
                text-align: center;
              }
              .el-input__prefix{
                display: none;
              }
              .el-checkbox-button--medium .el-checkbox-button__inner{
                width: 0.76rem;
                .vh(25);
                background-color: #4f648b;
                border-radius: 1px;
                padding: 0;
                border:1px solid transparent;

                font-family: PingFangSC-Light;
                font-size: 0.14rem;
                .vhLineH(25);
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .is-checked{
                .el-checkbox-button__inner{
                  background-color: #3a84ee;
                  box-shadow: none;
                }
              }
              .el-checkbox-button{
                margin-right: 0.1rem;
                &:last-of-type{
                  margin-right: 0;
                }
              }
              .num{
                justify-content: center;
              }
              .mode{
                width: 1.20rem;
                .vh(35);
              }
              .loop{
                justify-content: center;
              }
              .room{

              }
              .operate{
                display: flex;
                justify-content: space-around;
                .switch{
                  cursor: pointer;
                  padding: 4px 0;
                  border-bottom: 1px solid transparent;
                  &:hover{
                    border-bottom: 1px solid #3b89f9;
                  }
                }
                .del{
                  cursor: pointer;
                  padding: 4px 0;
                  border-bottom: 1px solid transparent;
                  &:hover{
                    border-bottom: 1px solid #3b89f9;
                  }
                }
              }
            }
          }
          .addBtns{
            width: 100%;
            text-align: center;
            line-height: 0.35rem;
            font-size: 0.16rem;
            background: rgba(58,132,238,0.2);
            border: solid 0.01rem #1989fa;
            cursor: pointer;
            i{
              color:#3a84ee;
            }
            span{
              color:#fff;
            }
          }
        }
      }
    }

  }
</style>
