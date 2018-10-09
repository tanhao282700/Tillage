<!--
    变配电系统 进出情况
    made by 胡永福
    start in 2018-9-6
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="inOutSituation">
    <div class="self-box">
      <div class="head">视频监控情况</div>
      <div class="bodyWrap">
        <el-scrollbar style="height: 100%">
          <div class="body">
            <div v-for="(v,i) in videoLists" class="self-card no-select" :key="v.id">
              <div v-text="v.tit" class="title"></div>
              <div @click="showVideo(v)" class="imgBox">
                <img :src="v.imgUrl" :alt="'图片'+i">
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="self-box">
      <div class="head">进出记录</div>
      <div class="body">
        <div class="head2">
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
        </div>
        <div class="body2">
          <Table @changePage="changePage" :table = "table2"/>
        </div>
      </div>
    </div>
    <Dialog wid = "9.39rem" hei = "6.18rem" tit="视频监控情况" ref = "dialog">
      <div class="dialog-in">
        <div class="left">
          <div class="videoBox">
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
            ></video-player>
          </div>
        </div>
        <div class="right">
          <div class="videoList">
            <el-scrollbar style="height: 100%">
              <div @click="toggleVideo(v)" v-for="(v,i) in videoLists" class="part" :key="v.id">
                <div class="imgBox">
                  <img :src="v.imgUrl" :alt="'图片'+i">
                </div>
                <div :class="['self-shadow',{active:v.id==activeID}]"></div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import utils from "../../../../assets/js/utils.js";
  import Table from "../../../../components/table";
  export default {
    components: {
      Table
    },
    name: "inOutSituation",
    data() {
      return {
        loading:false,

        videoLists:[
          {id:1,tit:'1号探头',imgUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536198298&di=a980cc1553e2bec11ddef063aeba25d9&src=http://pic.58pic.com/58pic/15/33/18/13A58PICi3r_1024.jpg',videoUrl:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
          {id:2,tit:'2号探头',imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg',videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4'},
          {id:3,tit:'3号探头',imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152929&di=ade27baf623be88dc69816daf2925999&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D1aa1a8db73310a55d029d6b7df2c29dc%2Fb219ebc4b74543a96fb1c8e414178a82b901146b.jpg',videoUrl:'http://221.228.226.5/15/t/s/h/v/tshvhsxwkbjlipfohhamjkraxuknsc/sh.yinyuetai.com/88DC015DB03C829C2126EEBBB5A887CB.mp4'},
          {id:4,tit:'4号探头',imgUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536198298&di=a980cc1553e2bec11ddef063aeba25d9&src=http://pic.58pic.com/58pic/15/33/18/13A58PICi3r_1024.jpg',videoUrl:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
          {id:5,tit:'5号探头',imgUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536198298&di=a980cc1553e2bec11ddef063aeba25d9&src=http://pic.58pic.com/58pic/15/33/18/13A58PICi3r_1024.jpg',videoUrl:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'},
        ],

        monthVal:utils.time(new Date()/1000,9),

        num:1,
        table2:{
          hei:420, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:8, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {num:'01',time:'2018/06/02  16:55',action:'进',name:'阿小呆',department:'市场营销'},
          ],
          th:[
            {prop:'number',label:'编号',wid:88},
            {prop:'time',label:'时间',wid:175},
            {prop:'action',label:'动作',wid:118},
            {prop:'name',label:'人员名',wid:132},
            {prop:'department',label:'部门'},
          ]
        },

        //视频部分
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
          }],
          poster: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536198298&di=a980cc1553e2bec11ddef063aeba25d9&src=http://pic.58pic.com/58pic/15/33/18/13A58PICi3r_1024.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },

        activeID:'',

      }
    },
    methods: {
      //获取进出视频监控数据
      getVideoData(){
        let objP = {
          'sys_menu_id':'3',
          'floor_id':'3'
        };
        utils.post('power/inOut/video',objP).then(res=>{
          console.log('进出情况视频监控',objP,res)
          if(res.code==0){
            let data = res.data;
            let dataArr = [];
            data.map((item,i)=>{
              let obj = {};
              obj.id = item.id;
              obj.tit = item.title;
              obj.imgUrl = this.videoLists[i].imgUrl;
              obj.videoUrl = item.nowvalue;
              dataArr.push(obj);
            })
            this.videoLists = dataArr;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //进出记录信息
      getInOutData(time,num=1){
        this.loading = true;
        let objP = {
          'sys_menu_id':3,
          'time':time,
          'pagesize':8,
          'pagenumber':num
        };
        utils.post('power/inOutReport',objP).then(res=>{
          console.log('进出记录数据报表',objP,res)
          if(res.code==0){

            this.table2.len = res.paging.count;//多少条数据

            let data = res.data;
            let dataArr = [];
            data.map((item,i)=>{
              let obj = {};
              let numVal = (i+1)+(this.table2.page-1)*8;
              obj.number = (numVal<10?('0'+numVal):(''+numVal));
              obj.time = item.time;
              obj.action = item.action;
              obj.name = item.user;
              obj.department = item.department;
              dataArr.push(obj);
            })
            this.table2.data = dataArr;
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
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getInOutData(this.monthVal,val)
        //console.log(val)
      },

      search(){
        this.table2.page = 1;
        this.getInOutData(this.monthVal,1)
      },
      //展示视频监控弹框
      showVideo(item){
        this.activeID = item.id;
        this.playerOptions.sources[0].src = item.videoUrl;
        this.playerOptions.poster = item.imgUrl;
        this.$refs.dialog.show();
      },
      //视频弹框中切换
      toggleVideo(item){
        this.activeID = item.id;
        this.playerOptions.sources[0].src = item.videoUrl;
        this.playerOptions.poster = item.imgUrl;
      }
    },
    created() {
      this.getInOutData(this.monthVal,1)
      this.getVideoData();
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .inOutSituation{
    .video-js .vjs-big-play-button{}

    .el-input--suffix .el-input__inner{
      height: 100%!important;
    }
    width: 100%;
    display: flex;
    justify-content: space-between;
    .self-box{
      width: 6.43rem;
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
        .vh(39);
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 0 0.16rem;

        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;

        display: flex;
        align-items: center;
      }
      .bodyWrap{
        width: 100%;
        .vh(539);
        padding-bottom: 0.2rem;
        padding-left: 1px;
      }
      .body{
        width: 100%;
        .vh(539);
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        .self-card{
          width: 2.90rem;
          .vh(241);
          .vhMT(17);
          margin-left: 0.21rem;
          .title{
            font-family: PingFangSC-Medium;
            font-size: 0.12rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #008aff;
          }
          .imgBox{
            .vhMT(12);
            width: 100%;
            .vh(217);
            background-color: #000000;
            box-shadow: 0px 4px 10px 0px
            rgba(73, 143, 226, 0.22);
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }

        .head2{
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
        }
        .body2{
          width: 100%;
          padding: 0 0.2rem;
        }
      }
    }

    .dialog-in{
      display: flex;
      justify-content: space-between;
      .left{
        .videoBox{
          width: 7.20rem;
          height: 5.38rem;
          background-color: #000000;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          0px 2px 4px 0px
          rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          overflow: hidden;

          margin-top: 0.16rem;
          margin-left: 0.2rem;

        }
      }
      .right{
        margin-right: -1px;
        .videoList{
          height: 5.38rem;
          margin-top: 0.16rem;

          .part{
            position: relative;
            &:first-of-type{
              margin-top: 0;
            }
            margin-top: 0.16rem;
            margin-right: 0.2rem;

            cursor: pointer;
            width: 1.63rem;
            height: 1.22rem;
            background-color: #000000;
            box-shadow: 0px 2px 5px 0px
            rgba(73, 143, 226, 0.22);
            border-radius: 2px;
            overflow: hidden;
            .imgBox{
              width: 1.63rem;
              height: 1.22rem;
              img{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .self-shadow{
              position: absolute;
              left: 0;
              top: 0;
              width: 1.63rem;
              height: 1.22rem;
              background-color: rgba(0,0,0,0.5);
              &:hover{
                background-color: transparent;
              }
            }
            .active{
              background-color: transparent;
            }
          }
        }
      }
    }
  }


</style>
