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
    class="loopState">
    <div class="imgBox">
      <div v-html="loopHtml" class="htmlBox">

      </div>
    </div>
    <!--<div class="topLeft">
      <div class="title">
        <span class="line"></span>
        <span class="text">高压侧</span>
      </div>
      <div class="content">
        <p class="text">P: 00.00 KW</p>
        <p class="text">Q: 00.00 KVar</p>
        <div class="wrap">
          <div class="left">
            <p class="text fontC-y">Ia: 233.00 A</p>
            <p class="text fontC-g">Ib: 232.00 A</p>
            <p class="text fontC-r">Ic: 233.00 A</p>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>
    <div class="bottomLeft">
      <div class="title">
        <span class="line"></span>
        <span class="text">低压侧</span>
      </div>
      <div class="content">
        <p class="text">P: 00.00 KW</p>
        <p class="text">Q: 00.00 KVar</p>
        <p class="text">Cos：0.90</p>
        <div class="wrap">
          <div class="left">
            <p class="text fontC-y">Ua: 233.00 A</p>
            <p class="text fontC-g">Ub: 232.00 A</p>
            <p class="text fontC-r">Uc: 233.00 A</p>
          </div>

          <div class="right">
            <p class="text fontC-y">Ia: 233.00 A</p>
            <p class="text fontC-g">Ib: 232.00 A</p>
            <p class="text fontC-r">Ic: 233.00 A</p>
          </div>
        </div>
      </div>
    </div>
    <div class="topRight">
      <div class="title2">
        <span class="text">图例</span>
        <span class="line"></span>
      </div>
      <div class="content2">
        <div class="row">
          <span class="iconBg">
            <span class="circle-r"></span>
          </span>
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span>开关闭合</span>
        </div>

        <div class="row">
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span>开关断开</span>
        </div>

        <div class="row">
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span>开关异常</span>
        </div>

        <div class="row">
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span>&emsp;断路器</span>
        </div>

        <div class="row">
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span>隔离开关</span>
        </div>

        <div class="row">
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span class="iconBg"></span>
          <span>手动开关</span>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>


  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {

    },
    name: "loopState",
    data() {
      return {
        loading:false,
        loopHtml:''
      }
    },
    methods: {


      //获取回路状态数据
      getLoopData(){
        this.loading = true;
        let objP = {
          'sys_menu_id':'3',
          'floor_id':'3'
        };
        utils.post('power/loopState',objP).then(res=>{
          console.log('回路状态',objP,res)
          if(res.code==0){
            if (res.data.html_str != '') {
              this.loopHtml = res.data.html_str;
            }else {
              console.log('没数据')
              this.loopHtml = '<div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center">没有数据</div>'
            }
            this.loading = false;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })



      }
    },
    created() {
      this.getLoopData();

    },
    mounted() {


    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .fontC-y{
    color: #fff100;
  }
  .fontC-g{
    color: #5cd01e;
  }
  .fontC-r{
    color: #f80518;
  }

  /*实心圆图标*/
  .circle-r{
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #ff3636;
    box-shadow: 0px 0px 2px 0px
    #ff0025;
    border: solid 0px #ff3636;
    border-radius: 50%;
  }


  .loopState{
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .imgBox{
      width: 6.85rem;
      .vh(515);
      position: relative;
      img{
        display: block;
        width: 100%;
        height: auto;
      }
      .htmlBox{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
      }

    }

    .title{
      display: flex;
      align-items: center;
      .line{
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: #008aff;
      }
      .text{
        margin-left: 0.2rem;
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
    }
    .content{
      margin-left: 0.22rem;
      .vhMT(20);

      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
      .text{
        .vhMT(12);
      }
      .wrap{
        display: flex;
        justify-content: space-between;
        .right{
          margin-left: 0.21rem;
        }
      }
    }

    .title2{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .line{
        display: inline-block;
        width: 2px;
        height: 14px;
        background-color: #008aff;
      }
      .text{
        margin-right: 0.2rem;
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;
      }
    }
    .content2{
      margin-right: 0.22rem;
      .vhMT(20);

      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;

      .row{
        display: flex;
        justify-content: flex-end;
        .vhMT(12);
        &>*{
          margin-left: 0.1rem;
        }
        .iconBg{
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #003461;
          box-shadow: 0px 0px 2px 0px
          rgba(0, 0, 0, 0.76);
          border-radius: 1px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

    }


    .topLeft{
      position: absolute;
      left: 0;
      .vhTop(24);
    }
    .bottomLeft{
      position: absolute;
      left: 0;
      .vhBottom(28);
    }
    .topRight{
      position: absolute;
      right: 0;
      .vhTop(24);
    }

  }

</style>
