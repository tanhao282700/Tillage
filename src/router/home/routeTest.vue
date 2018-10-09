<template>
  <div class="textBai">
      <div v-text="msg" class="baiTit"></div>
      <ul>
          <li class="baiLi"
            v-for="(val,i) in bais"
            @click="click(val)"
            >{{val}} {{i}}</li>
      </ul>
      <router-link to="/routeTest">
      点击跳转
      </router-link>
      <MyTest msg="按钮" isShow='isShow'>
      </MyTest>


    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <div id="myChart" class="myChart"></div>


  </div>
</template>

<script>

import MyTest from '../../components/testComponents'

export default {
  name: 'home',
  components:{
      'MyTest':MyTest,
  },
  data () {
    return {
      crumbs:[
        '能源系统2','全景查看2'
      ],
      dialogVisible: false,
      msg: '白测试娃哈哈',
      isShow:false,
      bais:[
        'bai','bai2','bai3'
      ]
    }
  },
  methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      click(val){
          this.msg = val;
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  },
  created() {
      console.log('dom渲染之前，一般用于初始化请求数据')

  },
  mounted() {
    this.drawLine();
       console.log('dom渲染之后，一般用于swper之类的组件BUG')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .textBai{
    flex:1;
    .baiTit{
        height:80px;
        width:200px;
        font-size:20px;
       color:#999999;

    }
    .myChart{
      height:300px;
      width:300px;
    }
  }

</style>
