<!--
    电梯系统 实时监测
    made by 樊得涛
    start in 2018-9-26
-->
<template>
  <div class="runtimeMonitor">
    <div class="sltcontainer">
      <div class="jobBoxs">
        <SelectBox
          :options = 'jobs.option'
          :value = "jobs.v"
          placeholder="选择楼栋"
          @change = "changL"
        />
      </div>
      <div class="sltbtn">
        <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </div>
    <div class="tipscontainer">
      <div class="tipsub"><span class="color1">11</span>
       <div class="tiptitle">电梯总数</div>
      </div>
      <div class="tipsub color2"><span class="color2">22</span>
        <div class="tiptitle">电梯正常运行个数</div></div>
      <div class="tipsub color3"><span class="color3">33</span>
        <div class="tiptitle">电梯故障个数</div></div>
    </div>
    <div class="louticontainer">
      <div class="lousub" v-for="(v,k) in dianti">
        <div class="header">
          {{v.title}}
        </div>
        <div class="content">
         <img :src="v.status==1?img.blue:img.red" class="img"/>
        
        <popover :info="[
          {id:1,tit:'设备名称',content:'设备名称'},
          {id:1,tit:'设备类型',content:'空调机房主机'},
          {id:1,tit:'设备品牌',content:'格力'},
          {id:1,tit:'设备型号',content:'xxxxxxxx'},
          {id:1,tit:'厂商',content:'xxxxxxxx'},
          {id:1,tit:'启用时间',content:'xxxxxxxx'},
          {id:1,tit:'维保名称',content:'xxxxxxxx'},
          {id:1,tit:'维保电话',content:'xxxxxxxx'},
        ]"><div class="title">设备信息</div></popover>
          <div class="title">维保历史</div>
          <div class="title" @click="showVideo(v.player)">视频监测</div>
          <div class="title">数据监测</div>
          <div class="title2"  v-bind:class="{ errorC: !(v.status==1)}">
            {{v.status==1 ?'正常':'异常'}}
            <span class="tips">状态</span>
          </div>
          <div class="title2">
            <span class="colorred">{{v.error}}</span>
            <span class="tips">故障次数</span>
          </div>
          <div class="detailcontainer">
           <div class="left">
             <span style="margin-left: .1rem">楼层位置</span>
             <span style="margin-left: .1rem">运行方向</span>
             <span style="margin-left: .1rem">是否有人</span>
             <span style="margin-left: .1rem">电梯状态</span>
           </div>
            <div class="right">
              <span class="dd"><span class="line"></span><span class="title1">{{v.position}}</span><span class="line2"></span></span>
              <span class="dd"><span class="line"></span><span class="title1">{{v.direct==1?'上行':'下行'}}</span><span class="line2"></span></span>
              <span class="dd"><span class="line"></span><span class="title1">{{v.hasp==1?'有人':'无人'}}</span><span class="line2"></span></span>
              <span class="dd"><span class="line"></span><span class="title1" v-bind:class="{ errorC: v.open!==1}">{{v.open==1?'开启':'关闭'}}</span><span class="line2"></span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog wid = "9.39rem" hei = "6.18rem" tit="视频监控情况" ref = "dialog">
      <div class="dialog-in">
          <div class="videoBox">
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
            ></video-player>
          </div>
        </div>
    </Dialog>
  </div>
</template>
<script>
  import SelectBox from '@/components/form/selectBox';
  import popover from "./popover";
  import  redpng from '@/assets/img/elevator/red.png';
  import  bluepng from '@/assets/img/elevator/blue.png';
  import utils from "@/assets/js/utils.js";
  export default {
    components:{
      'SelectBox':SelectBox,
      popover
    },
    data () {
      return {
        jobs:{
          option:[{label:'一号楼',value:1},
            {label:'二号楼',value:2},
            {label:'三号楼',value:3}],
          v:-1
        },
        img:{
          red:redpng,
          blue:bluepng
        },
        dianti:[
          {
            title:'一号楼一号客梯',
            status:'1',
            error:5,
            position:3,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },{
            title:'一号楼二号客梯',
            status:'2',
            error:0,
            position:3,
            direct:0,
            hasp:0,
            open:0,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },{
            title:'一号楼三号客梯',
            status:'1',
            error:15,
            position:3,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          },{
            title:'一号楼四号客梯',
            status:'1',
            error:0,
            position:6,
            direct:1,
            hasp:1,
            open:1,
            player:{
              videoUrl:'http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4',
              imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536210152930&di=a71791e897b3b3cd1b8930eeff469d34&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F47%2F59%2F300001072552129204590160225_950.jpg'

            }
          }
        ],
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
      }
    },
    methods:{
      changL(v){
        this.jobs.v = v;
      },
      searchData(){
        alert(this.jobs.v)
      },
       //展示视频监控弹框
      showVideo(item){
        this.playerOptions.sources[0].src = item.videoUrl;
        this.playerOptions.poster = item.imgUrl;
        this.$refs.dialog.show();
      }
    },
    created() {

    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  @import '../style/runTimeMonitor.less';

</style>
