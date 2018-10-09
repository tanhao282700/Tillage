<template>
  <div class="coldSourceStation">

    <div class="deviceLists">
      <div class="part" v-for="(item,i) in lists1" :key="i">
        <div class="img">
          <img src="../../../../assets/img/airConditioner/device1.png" alt="图片图片">
        </div>
        <div class="progressBox">
          <self-progress2 tit="总" per="100%" :val="item.all" />
          <self-progress2 tit="开" :per="item.on/item.all*100+'%'" :val="item.on" />
          <self-progress2 tit="故" :per="item.break/item.all*100+'%'" :val="item.break" />
          <self-progress2 tit="未" :per="item.off/item.all*100+'%'" :val="item.off" />
        </div>
      </div>
      <div v-if="lists1.length===0" class="emptyText">
        没有数据
      </div>
    </div>
    <div class="deviceDetailBox">
      <div class="deviceSet">
        <self-popover2 :info="[
          {id:1,tit:'设备名称',content:'设备名称'},
          {id:1,tit:'设备类型',content:'空调机房主机'},
          {id:1,tit:'设备品牌',content:'格力'},
          {id:1,tit:'设备型号',content:'xxxxxxxx'},
          {id:1,tit:'厂商',content:'xxxxxxxx'},
          {id:1,tit:'启用时间',content:'xxxxxxxx'},
          {id:1,tit:'维保名称',content:'xxxxxxxx'},
          {id:1,tit:'维保电话',content:'xxxxxxxx'},
        ]" />

        <div class="btnBox">
          <div class="title">冷冻水供水温度设置</div>
          <div class="inputBox">
            <div class="showState">
              <p class="text">
                <input type="text" v-model="tempVal" ref="tempInput" :readonly="!btnActive" oninput="if(value.length > 3)value = value.slice(0, 3)">
                <span>℃</span>
              </p>
              <i :class="['editBtn',{one:!btnActive},{two:btnActive}]" @click="changeEditState"></i>
            </div>
          </div>
          <div class="switchBox">
            <self-switch :togglee="parentToggle" />
          </div>
        </div>
      </div>
      <div class="deviceEchart">
        <div class="selfTabBox">
          <ul class="self-tab-head">
            <li @click="tabToggle(i)" :class="['part',{active:i==tabActive}]" v-for="(v,i) in tabData" v-text="v.unit.length!=0?(v.title+'('+v.unit[0]+')'):v.title" :key="i"></li>
            <li class="extra"></li>
          </ul>
          <div class="self-tab-body">
            <line-echarts4 v-for="(v,i) in tabData" :key="i" v-show="i==tabActive" :datas="v.datas" />
            <div class="emptyText" v-if="tabData.length===0">没有数据</div>
          </div>
        </div>

      </div>
    </div>
    <div class="threeDBox" id="threeDBox">
      <div class="btnBox">
        <div class="cascaderBox">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange">
          </el-cascader>
        </div>
        <div class="btnClickBox">
          <button type="button" @click="oneKeySwitch">一键关闭</button>
        </div>
      </div>

      <div id="c" style="position: absolute;left: 10px;top: 60px;height:auto"></div>
      <div id="crosshair1" style="position: absolute;z-index:-1"><div id="div_target" style="color:red;width:200px;height:100px"><span>设备信息展示</span></div></div>
      <div id="canvas3d"></div>
      <div id="crosshair"></div>
    </div>
    <Dialog wid = "3.64rem" hei = "2.16rem" ref = "dialog">
      <div class="dialog-in">
        <p class="p-text">是否确认{{this.parentToggle?'开启':'关闭'}}？</p>
        <div class="btnWrap">
          <button @click="sureControl" type="button">确定</button>
          <button @click="()=>{this.$refs.dialog.hide();this.$message('取消操作！');}" type="button">取消</button>
        </div>
      </div>
    </Dialog>
    <Dialog wid = "3.64rem" hei = "2.16rem" ref = "dialog2">
      <div class="dialog-in">
        <p class="p-text">是否确认一键启停？</p>
        <div class="btnWrap">
          <button @click="sureControl2" type="button">确定</button>
          <button @click="()=>{this.$refs.dialog2.hide();this.$message('取消操作！');}" type="button">取消</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
    import SelfProgress2 from "../../../../components/selfProgress2";
    import SelfSwitch from "../../../../components/selfSwitch";
    import SelfPopover2 from "./selfPopover2";
    import LineEcharts4 from "../../../../components/lineEcharts4";
    import utils from "../../../../assets/js/utils";
    //引入three.js
    import * as THREE from "three";
    import * as TWEEN from "tween";
    //var THREE = require('three')
    //import OrbitControls from "three/examples/js/controls/OrbitControls";
    var OrbitControls = require('three-orbit-controls')(THREE);

    import * as GLTFLoader from 'three-gltf-loader';

    var FirstPersonControls = require('three-first-person-controls')(THREE);

    import * as html2canvas from 'html2canvas';

    import * as dat from 'dat.gui';
    export default {
      components: {
        LineEcharts4,
        SelfPopover2,
        SelfSwitch,
        SelfProgress2

      },
      name: "coldSourceStation",
      data() {
        return {
          lists1:[
            /*{
              id:1,
              all:99,
              on:66,
              break:10,
              off:4
            },
            {
              id:2,
              all:88,
              on:45,
              break:6,
              off:23
            },
            {
              id:3,
              all:81,
              on:70,
              break:1,
              off:10
            },*/
          ],
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
          selectedOptions2: [],
          btnActive:false,
          tempVal:8,
          parentToggle:false,

          tabData:[
            /*{
              id:1,
              title:'COP',
              unit:[],
              datas:{
                id:'selfEchart1',
                style:{width:'6.43rem',height:146*100/728+'vh'},
                showMarkL:true,
                markLineVal:5,
                list:[
                  {
                    name:'11',
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
                  }
                ]

              }
            },
            {
              id:2,
              title:'能耗',
              unit:['KW/h'],
              datas:{
                id:'selfEchart2',
                style:{width:'6.43rem',height:146*100/728+'vh'},
                showMarkL:true,
                markLineVal:7,
                list:[
                  {
                    name:'11',
                    data:[
                      {
                        "value": [
                          "2018-09-25 09:00",
                          10
                        ]
                      },
                      {
                        "value": [
                          "2018-09-25 09:30",
                          5
                        ]
                      }
                    ],
                  }
                ]

              }
            },
            {
              id:2,
              title:'电流电压',
              unit:['A,V'],
              datas:{
                id:'selfEchart3',
                style:{width:'6.43rem',height:146*100/728+'vh'},
                showMarkL:true,
                markLineVal:7,
                list:[
                  {
                    name:'11',
                    data:[
                      {
                        "value": [
                          "2018-09-25 09:00",
                          10
                        ]
                      },
                      {
                        "value": [
                          "2018-09-25 09:30",
                          5
                        ]
                      }
                    ],
                  },
                  {
                    name:'121',
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
          tabActive:0

        }
      },
      methods: {
        //获取首页三个设备数据
        getThreeDevice(sysID=19,floor_id=101){
          let obj = {
            sys_menu_id:sysID,
            floor_id:floor_id
          };
          utils.post('airConditioner/index',obj).then(res=>{
            console.log('首页三个设备数据',obj,res);
            if (res.code==0){
              let arr = [];
              let data = res.data.data;
              data.map((item, i) => {
                let obj = {};
                obj.id = item.self_id;
                obj.all = item.count;
                obj.on = item.kai;
                obj.break = item.gu;
                obj.off = item.guan;
                arr.push(obj);
              });

              this.lists1 = arr;

            } else {

              this.$message(res.message);
            }
          }).catch(err=>{
            this.$message(err);
          })
        },
        //获取首页三个设备数据
        getEchartsData(object_id=3){
          let obj = {
            object_id:object_id
          };
          utils.post('airConditioner/index/device',obj).then(res=>{
            console.log('获取echarts数据',obj,res);
            if (res.code==0){
              let commtable = res.data.commtable;
              let tempArr1 = [];
              commtable.map((item,i)=>{
                let obj1 = {};
                obj1.id = item.point_id;
                obj1.title = item.title;
                obj1.unit = [];
                obj1.unit.push(item.unit);
                obj1.datas = {};
                obj1.datas.id = 'selfEchart'+item.point_id;
                obj1.datas.style = {width:'6.43rem',height:146*100/728+'vh'};
                obj1.datas.showMarkL = true;
                obj1.datas.markLineVal = item.standard;
                obj1.datas.list = [];
                let obj2 = {};
                obj2.name = item.title;
                obj2.data = item.data;
                obj1.datas.list.push(obj2);
                tempArr1.push(obj1);
              })

              this.tabData = tempArr1;


            } else {

              this.$message(res.message);
            }
          }).catch(err=>{
            this.$message(err);
          })
        },
        handleChange(value) {
          console.log(value);
        },
        tempHandleChange() {
          this.$refs.dialog.show();
        },
        changeEditState(){
          this.btnActive = !this.btnActive;
          if (this.btnActive) {
            this.$refs.tempInput.focus();
          } else {
            this.$refs.tempInput.blur();
          }
        },
        sureControl() {
          console.log(this.parentToggle)
          this.parentToggle = !this.parentToggle;
          this.$refs.dialog.hide();
        },
        sureControl2() {
          this.$refs.dialog2.hide();
        },
        oneKeySwitch(){
          this.$refs.dialog2.show();
        },

        //选项卡切换
        tabToggle(index){
          this.tabActive = index;
        }

      },
      created() {
        this.$parent.$parent.$parent.$parent.$parent.msg = '一号机房当前模式：自动控制模式,预计在9:00开启，23:20关闭';

        this.getThreeDevice();
        this.getEchartsData();

      },
      mounted() {
        //this.$parent.$parent.$parent.$parent.$parent.isIf=true;

        /*///////////////////获取数据库数据/////////////////////////
       /!* var jsonData;
        function mouseClick(bim_uid) {
          var xml = $.parseXML(jsonData[bim_uid]);
          getmessage(xml);
        }

        /!*var getBiminfo = function () {
          $.ajax({
            type: "POST",
            url: "/Handler3D.ashx?action=getbiminfo",
            dataType: "html",
            data: {
            },
            timeout: 20000,
            success: function (data) {
              jsonData = $.parseJSON(data);
            }
          });
        };
        getBiminfo();*!/
        var M_DOT = 1;
        function fn(obj) {
          var dotString = 0;
          for (j = 1; j <= M_DOT; j++) {
            dotString += 1;
          }
          var myObj = obj[0].attributes;
          $("#c").append(dotString)
          $(myObj).each(function (i) {
            var nodeJson = $.parseJSON($(this)[0].nodeValue);
            var arrayObj = new Array();
            if (nodeJson.Name != undefined) {
              arrayObj.push(nodeJson.Name);
            } if (nodeJson.NominalValue != undefined) {
              arrayObj.push(nodeJson.NominalValue);
            }
            if (arrayObj.length == 1) {
              $("#c").append("<u>" + arrayObj.pop() + "</u> ");
            } else {
              $("#c").append("<u>" + arrayObj.shift() + " = " + arrayObj.pop() + "</u> ");
            }
          })
          $("#c").append("<br/>");
          if (obj.length > 0) {
            obj.children().each(function (i) {
              M_DOT++;
              fn($(this));
              M_DOT--;
            })
          } else {
            return false;
          }
        }
        function getmessage(xml) {
          $("#c").empty();
          $(xml).find('*:first').each(function (i) {
            fn($(this));
          });
        }*!/

        ///////////////////////////////////////////////////////////threejs的基本///////////////////////////////////////////////////////////////////

        //场景
        var scene;
        function initScene() {
          scene = new THREE.Scene();
          scene.fog = new THREE.Fog(0x72645b, 10, 1000);
        }
        //渲染器
        var renderer;

        var width = window.innerWidth;
        var height = window.innerHeight;
        function initThree() {

          renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(width, height);
          //document.getElementById("canvas3d").appendChild(renderer.domElement);
          $('body').append(renderer.domElement);
          renderer.setClearColor(0x000000, 1.0);
        }
        //相机
        var camera;
        function initCamera() {
          camera = new THREE.PerspectiveCamera(45, width / height, 1, 200);
          camera.position.set(0, 0, 20);
          camera.up.set(0, 1, 0);
          camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
        //总体浏览控制器
        var controls;
        function initControls() {
          controls = new OrbitControls(camera, renderer.domElement);            //npm引入的轨道控制器
          // 如果使用animate方法时，将此函数删除
          //controls.addEventListener( 'change', render );
          // 使动画循环使用时阻尼或自转 意思是否有惯性
          controls.enableDamping = false;
          //动态阻尼系数 就是鼠标拖拽旋转灵敏度
          controls.dampingFactor = 0.1;
          //是否可以缩放
          controls.enableZoom = true;
          //是否自动旋转
          controls.autoRotate = true;
          //设置相机距离原点的最远距离
          controls.minDistance = 1;
          //设置相机距离原点的最远距离
          controls.maxDistance = 100;
          //是否开启右键拖拽
          controls.enablePan = true;
        }
        //第一人称浏览控制器
        function initControls1() {
          controls = null;
          controls = new FirstPersonControls(camera, renderer.domElement);    //npm安装的FirstPersonControls
          controls.lookSpeed = 0.1; //鼠标移动查看的速度
          controls.movementSpeed = 1; //相机移动速度
          controls.noFly = false;
          controls.constrainVertical = false; //约束垂直
        }
        //灯光
        function initLight() {
          //自然光
          var light = new THREE.AmbientLight(0x0c0c0c);
          scene.add(light);
          //半球光
          var hemiLight = new THREE.HemisphereLight(0xffffff, 0xfcfcfc);
          hemiLight.position.set(0, 15000, 0);
          scene.add(hemiLight);
          //太阳光
          var sunLight = new THREE.SpotLight(0x00bfff, 0.5, 34000);
          sunLight.position.set(14000, 10000, 12000);
          scene.add(sunLight);
        }
        //场景背景
        function getskyBox() {
          scene.background = new THREE.CubeTextureLoader().setPath('./model/').load(["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"]);
        }
        //渲染器刷新
        function render() {
          controls.update();
          renderer.render(scene, camera);
          window.onresize = onWindowResize;
        }
        //动画
        function animate() {
          render();
          requestAnimationFrame(animate);
          //stats.update();
          likeHover();
          TWEEN.update();
          /!*精灵材质动画(暂无使用)*!/
          //var delta = clock.getDelta();
          //v.update(1000 * delta);
        }
        //窗口更新函数
        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
        //加载时运行
        function threeStart() {
          initThree();
          initCamera();
          initScene();
          initLight();
          loadGLTF('./model/', '123');
          //getskyBox();
          //addParticles();
          creatSprite();
          initControls();
          initGui();
          //initStats();
          animate();
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //粒子
        /!*function createCanvas(width, height, colors) {//创建画布并绘制精灵纹理
          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var context = canvas.getContext('2d');
          var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
          colors.forEach(function (color) {
            gradient.addColorStop(color.start, color.rgba);
          })
          context.fillStyle = gradient;
          context.fillRect(0, 0, canvas.width, canvas.height);
          return canvas;
        }
        function createMaterial(width, height, colors) {//使用画布创建材质
          var sprite = createCanvas(width, height, colors);
          return new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(sprite),
            blending: THREE.AdditiveBlending,
            overdraw: false,
            depthWrite: false
          })
        }
        var particles=[];
        function addParticles() {
          for (var i = 0; i < 500; i++) {
            var deepColor = Math.round(Math.random() * 255);
            var lightColor = Math.round(deepColor * 32 / 255);
            var material = createMaterial(32, 32, [
              { start: 0, rgba: 'rgba(255,255,255,1)' },
              { start: 0.2, rgba: 'rgba(0,' + deepColor + ',' + Math.round(Math.random() * 80 + 175) + ',1)' },
              { start: 0.4, rgba: 'rgba(0,' + lightColor + ',64,1)' },
              { start: 1, rgba: 'rgba(0,0,0,1)' }
            ])
            var particle = new THREE.Sprite(material);
            particles.push(particle);
            var delay = i * 5;
            particle = particle ? particle : this;
            initParticle(particle, new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100), Math.random());
            particleLoop(particle, delay)
            scene.add(particle);
          }
        }
        function initParticle(particle, coord, size) {
          var particle = this instanceof THREE.Sprite ? this : particle;
          console.log(particle);
          if (!size && size != 0) {
            size = Math.random() * 32 + 16;
          }
          particle.scale.x = particle.scale.y = size;
          particle.position.set(coord.x, coord.y, coord.z);
        }
        function particleLoop(particle, delay) {
          delay = delay ? delay : 0;
          new TWEEN.Tween(particle)
            .delay(delay)
            .to({}, 20000)
            .onComplete(particleLoop)
            .onStart(function () {
            })
            .start();
          new TWEEN.Tween(particle.position)
            .delay(delay)
            .to({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100, z: Math.random() * 200 - 100 }, 20000)
            .start();

          new TWEEN.Tween(particle.scale)
            .delay(delay)
            .to({ x: 1, y: 1 }, 1000)
            .start();
        }*!/

        //定义objects数组用于存放模型里的Mesh
        var objects = [];
        //加载外部模型
        function loadGLTF(path, fileName) {
          let loader = new GLTFLoader();      //npm引入的gltf加载器
          //console.log(loader)
          loader.load('./model/123.gltf', function (gltf) {
            //let object = gltf.scene;
            console.log(gltf)
            /!*object.rotation.x = THREE.Math.degToRad(-90);
            object.rotation.z = THREE.Math.degToRad(180);
            //模型居中
            var center = new THREE.Box3().expandByObject(object).getCenter(new THREE.Vector3());
            object.position.set(-center.x, -center.y, -center.z);
            //object.children.forEach(function (children) {});
            traverseTree(object)
            scene.add(object);*!/
            /!*var texture = new THREE.TextureLoader().load("test.png")
            var geometry = new THREE.BufferGeometry();
            var vertexPositions = new Float32Array([-1, -1, -1],
                                    [1, -1, -1],
                                    [1, -1, 1],
                                    [-1, -1, 1],
                                    [-1, 1, 1],
                                    [-1, 1, -1],
                                    [1, 1, -1],
                                    [1, 1, 1]);
            var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            /!*for (var i = 0; i < vertexPositions.length; i++) {
                vertices[i * 3 + 0] = vertexPositions[i][0];
                vertices[i * 3 + 1] = vertexPositions[i][1];
                vertices[i * 3 + 2] = vertexPositions[i][2];
            }*!/
            /!*geometry.addAttribute('position', new THREE.BufferAttribute(vertexPositions, 3));
             var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
             var mesh = new THREE.Mesh(geometry, material);*!/

            /!*var geometry = new THREE.BoxGeometry(2, 2, 2);
            var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
            var texture = new THREE.TextureLoader().load("test.png")
            var material = new THREE.MeshBasicMaterial({ map : texture });
            var cube = new THREE.Mesh(bufferGeometry, material);*!/

            /!*var geom = new THREE.BoxGeometry(1, 10, 10);
            var buffgeom = new THREE.BufferGeometry();
            buffgeom.fromGeometry(geom);
            var texture = THREE.ImageUtils.loadTexture("test.png");
            var mat = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
            var mesh = new THREE.Mesh(buffgeom, mat);*!/
            //objects.push(cube);
            //scene.add(cube);
            // scene.add(mesh);
          },function (error) {
            console.log(error);
          });
        }
        //递归将模型里的mesh找出并加到objects数组
        function traverseTree(obj) {
          if (!obj) {
            return;
          }
          traverseNode(obj);
          if (obj.children && obj.children.length > 0) {
            for (var i = 0; i < obj.children.length; i++) {
              traverseTree(obj.children[i]);
            }
          }
        }
        function traverseNode(obj) {
          if (obj.type == "Mesh") {
            objects.push(obj);
          }
        }

        //windows监听事件
        window.addEventListener('click', onMouseClick, false);
        window.addEventListener('mousemove', onMouseMove, false);
        var mouseValue = true;
        window.addEventListener('mousedown', function () {
          mouseValue = false;
        }, false);
        window.addEventListener('mouseup', function () {
          mouseValue = true;
        }, false);

        //声明raycaster和mouse变量
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        var intersects = [];
        var eventMouse = { x: 0, y: 0 };
        function onMouseMove(event) {
          if (mouseValue) {
            event.preventDefault();
            eventMouse = { x: event.clientX, y: event.clientY };
            //$("#div_message").css({ left: event.clientX + 5, top: event.clientY + 5 });
            mouse.x = ((event.clientX) / window.innerWidth) * 2 - 1;
            mouse.y = -((event.clientY) / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            intersects = raycaster.intersectObjects(objects);
          }
        }
        var threeMesh;
        var normalMaterial = new THREE.MeshNormalMaterial();
        function likeHover() {
          var moveMouse = convertTo3DCoordinate(eventMouse.x + canvas.width / 2, eventMouse.y + canvas.height / 2);
          mouseValue==true ? sprite.position.set(moveMouse.x, moveMouse.y, moveMouse.z): null;
          if (intersects.length > 0) {
            document.body.style.cursor = 'pointer';
            if (threeMesh == null || intersects[0].object.name != threeMesh.name) {
              if (threeMesh) {
                //threeMesh.material.color.setHex(threeMesh.currentHex);
                //threeMesh.material.setValues(threeMesh.currentVal);
                threeMesh.material = threeMesh.currentmaterial;
              }
              canvas.width > canvas.height ? sprite.scale.set(canvas.width / canvas.height, 1, 0) : sprite.scale.set(1, canvas.height / canvas.width, 0);
              sprite.material.visible = true;
              threeMesh = intersects[0].object;
              var str = "new THREE." + threeMesh.material.type + "(threeMesh.material)";
              threeMesh.currentmaterial = eval(str);
              threeMesh.material = normalMaterial;
              //threeMesh.currentVal = { transparent: threeMesh.material.transparent, opacity: threeMesh.material.opacity };
              // threeMesh.material.setValues({ transparent: true, opacity: 0.8 });
              //threeMesh.currentHex = threeMesh.material.color.getHex();
              //threeMesh.material.color.setHex(0xffff00);
              $("#div_target").html("<span>12345</span>");
              getCanvas($("#div_target")[0], 2.56);
              //var v3d = getMeshcenter(intersects[0].object);
              //sprite.position.set( 1, 5, 1 );
              texture.needsUpdate = true;
            } else {
              texture.needsUpdate = true;
            }
          } else {
            document.body.style.cursor = 'default';
            if (threeMesh) {
              //threeMesh.material.color.setHex(threeMesh.currentHex);
              //threeMesh.material.setValues(threeMesh.currentVal);
              threeMesh.material = threeMesh.currentmaterial;
            }
            threeMesh = null;
            sprite.material.visible = false;
            texture.needsUpdate = true;
          }
        }
        //创建精灵用于展示设备信息
        var texture;
        var sprite;
        function creatSprite() {
          texture = new THREE.Texture(canvas)
          //动画
          //annie = new TextureAnimator(texture, 10, 1, 10, 75);
          texture.needsUpdate = true;
          let spriteMaterial = new THREE.SpriteMaterial({ map: texture /!*, depthTest:false*!/ });
          sprite = new THREE.Sprite(spriteMaterial);
          //sprite.renderOrder = 99;
          sprite.position.set(5, 5, 0);
          scene.add(sprite);
        }
        //html2canvas将html转为canvas用于贴图
        var canvas = document.createElement("canvas");
        function getCanvas(htmlDom, val) {
          var width = htmlDom.offsetWidth;
          var height = htmlDom.offsetHeight;
          canvas.width = width * val;
          canvas.height = height * val;
          canvas.getContext("2d").scale(val, val);
          var opts = {
            scale: val,
            canvas: canvas,
            width: width,
            height: height,
            useCORS: true
          };

          html2canvas(htmlDom, opts).then(function (canvas) {
            var context = canvas.getContext('2d');
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
          });
        }
        //2维坐标转3维坐标
        function convertTo3DCoordinate(clientX, clientY) {
          var vector3 = new THREE.Vector3(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1,
            0.5);
          return vector3.unproject(camera);
        }
        //3维坐标转2维坐标
        function convertTo2DCoordinate() {
          let position = new THREE.Vector3(10, 10, 10);
          let vector2 = position.project(camera);
          let halfWidth = window.innerWidth / 2;
          let halfHeight = window.innerHeight / 2;
          return new THREE.Vector2(vector2.x * halfWidth + halfWidth, vector2.y * halfHeight + halfHeight);
        }
        function onMouseClick(event) {
          if (intersects.length > 0) {
            //材质信息
            var namearray = new Array();
            namearray = intersects[0].object.material.name.split('-');
            //console.log(namearray[namearray.length - 1]);
            var meshName = intersects[0].object.name;
            var reg = new RegExp("[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}");
            meshName.match(reg) == null ? $("#c").empty() : mouseClick(meshName.match(reg).toString());
            /!*var texture = new THREE.TextureLoader().load("test.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.offset.set(0, 0);
                texture.repeat.set(1, 1)
            });*!/
            //var texture = new THREE.TextureLoader().load("test.jpg");
            //var texture = new THREE.Texture(canvas)
            //texture.needsUpdate = true;
            //texture.minFilter = texture.magFilter = THREE.LinearFilter;
            //texture.mapping = THREE.UVMapping;
            // var Material = new THREE.MeshPhongMaterial({ map: texture });
            //intersects[0].object.material = Material;
            //var textureLoader = new THREE.TextureLoader();
            /!*textureLoader.load("test.jpg", function (texture) {
                textureLoader.load("test.jpg", function (normalTexture) {
                    intersects[0].object.material.map = texture;
                    intersects[0].object.material.normalMap = normalTexture; // 只要将法向贴图赋给材质的normalMap属性即可
                    intersects[0].object.material.needsUpdate = true;
                });
            });*!/
            //intersects[0].object.material.map = texture;
            //intersects[0].object.material.needsUpdate = true;//材质会更新
            //intersects[0].object.material = Material;
            /!* var materialClass = {
                 opacity: meshMaterial.opacity,
                 transparent: meshMaterial.transparent
             }
             var Material = new THREE.MeshBasicMaterial();
             Material = intersects[0].object.material;
             Material.transparent = meshMaterial.transparent;
             Material.opacity = meshMaterial.opacity;
             meshMaterial = new THREE.MeshBasicMaterial(Material);
             intersects[0].object.material = meshMaterial;
             //动画可删除*!/
            //intersects[0].object
            /!*var box = new THREE.Box3();
            //计算点击Mesh的几何中心
            var center = new THREE.Box3().expandByObject(intersects[0].object).getCenter(new THREE.Vector3());
            //intersects[0].object.position.set(center.x, center.y, center.z);
            var newMesh = NewObject3D(center.x, center.y, center.z, intersects[0].object);
            scene.add(newMesh);
            function draw() {
                intersects[0].object.rotation.y = (intersects[0].object.rotation.y + 0.1) % (Math.PI * 2);
            }
            var sss = setInterval(draw, 1);*!/
          }
        }

        ////////////////////////////////////////添加文字信息///////////////////////////////////////
        //创建3D文字，资源消耗较大(加载文字json)
        function initModel(name) {
          var font;
          var loader = new THREE.FontLoader();
          loader.load("obj/FangSong_Regular.json", function (res) {
            font = new THREE.TextBufferGeometry(name, {
              font: res,
              size: 0.1,
              height: 0.01
            });
            font.computeBoundingBox(); // 运行以后设置font的boundingBox属性对象，如果不运行无法获得。
            var material = new THREE.MeshPhongMaterial({ color: 0xffcc00, side: THREE.DoubleSide });
            let fontModel = new THREE.Mesh(font, material);
            //thisobj需要在GLTF加载完成后才能使用
            var thisobj = scene.getObjectByName('product-1eb10804-77e2-4d38-91a8-740eae813669-body');
            var center = new THREE.Box3().expandByObject(thisobj).getCenter(new THREE.Vector3());
            //设置Mesh的name属性方便之后使用查找
            fontModel.name = "1#水泵";
            scene.add(NewObject3D(center.x, center.y, center.z, fontModel));
          });
        }
        //控制3D文字水轨道控制器一起旋转
        function Controls3Dtext() {
          if (scene.getObjectByName("1#水泵") != undefined) {
            scene.getObjectByName("1#水泵").rotation.x = (controls.getPolarAngle() - Math.PI / 2) * Math.abs(Math.cos(controls.getAzimuthalAngle()));
            scene.getObjectByName("1#水泵").rotation.y = controls.getAzimuthalAngle() * Math.abs(Math.cos(controls.getPolarAngle() - Math.PI / 2));
            //scene.getObjectByName("1#水泵").rotation.z = (controls.getPolarAngle() - Math.PI/2) * Math.sin(controls.getAzimuthalAngle())+controls.getAzimuthalAngle()* Math.sin(controls.getPolarAngle() - Math.PI/2);
          }
        }
        //创建2D文字用于显示名称
        function get2Dtext(obj,name,pms) {
          //let spritey = createSpriteText("1#循环水泵");
          let center = new THREE.Box3().expandByObject(obj).getCenter(new THREE.Vector3());
          let spritey = makeTextSprite(name, pms);
          spritey.position.set(center.x, center.y+0.3, center.z);
          scene.add(spritey);
        }

        function createSpriteText(Name) {
          //先用画布将文字画出
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffff00";
          ctx.font = "Bold 100px Arial";
          ctx.lineWidth = 4;
          ctx.fillText(Name, 4, 104);
          let texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          //使用Sprite显示文字
          let material = new THREE.SpriteMaterial({ map: texture });
          let textObj = new THREE.Sprite(material);
          textObj.renderOrder = 0;
          textObj.scale.set(0.5, 0.5, 0);
          return textObj;
        }
        function makeTextSprite(message, parameters) {
          if (parameters === undefined) parameters = {};
          var fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";
          var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 18;
          var borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 4;
          var borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
          var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d');
          context.font =  fontsize * 3 + "px " + fontface;
          var metrics = context.measureText(message);
          var textWidth = metrics.width ;
          context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
          context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
          context.lineWidth = borderThickness;
          roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 3 + borderThickness, 10);
          context.fillStyle = "rgba(0, 0, 0, 1.0)";
          context.fillText(message, borderThickness, fontsize * 2.5 + borderThickness);
          //将生成的canvas作为贴图
          var texture = new THREE.Texture(canvas)
          texture.needsUpdate = true;
          var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
          var sprite = new THREE.Sprite(spriteMaterial);
          sprite.scale.set(1/2, 1/2, 1.0);
          return sprite;
        }
        //添加圆角矩形
        function roundRect(ctx, x, y, w, h, r) {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + w - r, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + r);
          ctx.lineTo(x + w, y + h - r);
          ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
          ctx.lineTo(w / 2 - 25, y + h);
          ctx.lineTo(w / 2, y + h + 35);
          ctx.lineTo(w / 2 + 25, y + h);
          ctx.lineTo(x + r, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - r);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }


        function change() {
          var Go = window.setTimeout(function () {
            if (scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body") != undefined) {
              clearTimeout(Go);
              // updateMesh();
              get2Dtext(scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body"), "1#循环水泵", {});
            } else {
              change();
            }
          }, 1000)
        }
        change();

        /!*function changeRun() {
            scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body").material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        }
        function changeStop() {
            scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body").material = new THREE.MeshBasicMaterial({ color: 0x909090 });
        }
        function changeError() {
            scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body").material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        }
        function changeNormal() {
            scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body").material = new THREE.MeshBasicMaterial({ color: 0x909090 });
        }*!/


        /!*var elem;//= document.getElementById('canvas3d');
        document.addEventListener("mousemove", function (e) {
            var movementX = e.movementX ||
						  e.mozMovementX ||
						  e.webkitMovementX ||
						  0,
			movementY = e.movementY ||
						  e.mozMovementY ||
						  e.webkitMovementY ||
						  0;
            //console.log("movementX=" + movementX, "movementY=" + movementY);
        }, false);

        function fullscreenChange() {
            if (document.webkitFullscreenElement === elem ||
                document.mozFullscreenElement === elem ||
                document.mozFullScreenElement === elem) { // 较旧的 API 大写 'S'.
                // 元素进入全屏模式了，现在我们可以请求指针锁定。
                elem.requestPointerLock = elem.requestPointerLock ||
                                          elem.mozRequestPointerLock ||
                                          elem.webkitRequestPointerLock;
                elem.requestPointerLock();
            }
        }

        document.addEventListener('fullscreenchange', fullscreenChange, false);
        document.addEventListener('mozfullscreenchange', fullscreenChange, false);
        document.addEventListener('webkitfullscreenchange', fullscreenChange, false);

        function pointerLockChange() {
            if (document.mozpointerLockElement === elem ||
				document.webkitpointerLockElement === elem ||
				document.pointerLockElement === elem) {
                controls.dispose();
                initControls();
                document.getElementById("crosshair").style.opacity = 1;
            } else {
                controls.dispose();
                initControls1();
                document.getElementById("crosshair").style.opacity = 0;
            }
        }

        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);

        function pointerLockError() {
            console.log("锁定指针时出错。");
        }

        document.addEventListener('pointerlockerror', pointerLockError, false);
        document.addEventListener('mozpointerlockerror', pointerLockError, false);
        document.addEventListener('webkitpointerlockerror', pointerLockError, false);

        function changePointer() {
            elem = document.getElementById("canvas3d");
            elem.requestFullscreen = elem.requestFullscreen ||
                                     elem.mozRequestFullscreen ||
                                     elem.mozRequestFullScreen || // 较旧的 API 把 ‘S’ 大写
                                     elem.webkitRequestFullscreen;
            //elem.requestFullscreen();
            elem.requestPointerLock();
        }*!/

        function messagedivShow() {
          var divMessage = "<div id='div_message' style='color:red;width:200px;height:100px;position: absolute;z-index:10'><span>设备信息展示</span></div>";
          $("body").append(divMessage);
        }

        function NewObject3D(x, y, z, obj) {
          let New3D = new THREE.Object3D();
          New3D.add(obj).position.set(x,y,z);
          //let New3D = new THREE.Object3D().add(obj).position.set(x, y, z);
          obj.geometry.center();
          obj.rotation.x = THREE.Math.degToRad(90);
          obj.rotation.z = THREE.Math.degToRad(-180);
          return New3D;
        }

        function updateMesh() {
          var obj = scene.getObjectByName("product-1eb10804-77e2-4d38-91a8-740eae813669-body");
          var mpm = new THREE.MeshPhongMaterial({ 'color': '0x0055ff' });
          obj.material = mpm;
          var center = new THREE.Box3().expandByObject(obj).getCenter(new THREE.Vector3());
          var newobj = NewObject3D(center.x, center.y, center.z, obj);
          objects.push(newobj.children[0]);
          scene.add(newobj);
        }

        //辅助坐标
        var clock = new THREE.Clock();
        function initAxis() {
          var axes = new THREE.AxisHelper(10000);
          scene.add(axes);
        }
        //Gui菜单插件
        var meshMaterial = new THREE.MeshBasicMaterial();
        var spGui;
        function initGui() {
          var guidata = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            opacity: meshMaterial.opacity,
            transparent: meshMaterial.transparent,
            overdraw: meshMaterial.overdraw,
            visible: meshMaterial.visible,
            side: "front",
            color: meshMaterial.color.getStyle(),
            wireframe: meshMaterial.wireframe,
            wireframeLinewidth: meshMaterial.wireframeLinewidth,
            wireFrameLineJoin: meshMaterial.wireframeLinejoin,
          };
          let gui = new dat.GUI();
          spGui = gui.addFolder("控制菜单");
          spGui.add(guidata, 'opacity', 0, 1).onChange(function (e) {
            meshMaterial.opacity = e
          });
          spGui.add(guidata, 'transparent').onChange(function (e) {
            meshMaterial.transparent = e
          });
          spGui.add(guidata, 'wireframe').onChange(function (e) {
            meshMaterial.wireframe = e
          });
          spGui.add(guidata, 'wireframeLinewidth', 0, 20).onChange(function (e) {
            console.log(e);
            meshMaterial.wireframeLinewidth = e
          });
          spGui.add(guidata, 'visible').onChange(function (e) {
            meshMaterial.visible = e
          });
          spGui.add(guidata, 'side', ["front", "back", "double"]).onChange(function (e) {
            console.log(e);
            switch (e) {
              case "front":
                meshMaterial.side = THREE.FrontSide;
                break;
              case "back":
                meshMaterial.side = THREE.BackSide;
                break;
              case "double":
                meshMaterial.side = THREE.DoubleSide
                break;
            }
            meshMaterial.needsUpdate = true;
            console.log(meshMaterial);
          });
          spGui.addColor(guidata, 'color').onChange(function (e) {
            meshMaterial.color.setStyle(e)
          });
          //spGui.open();

          var bulbLuminousPowers = {
            /!*"110000 lm (1000W)": 110000,*!/
            "1000W": 110000,
            "300W": 3500,
            "100W": 1700,
            "60W": 800,
            "40W": 400,
            "25W": 180,
            "4W": 20,
            "关灯": 0
          };
          var hemiLuminousIrradiances = {
            "黑夜": 0.001,
            "稀月光": 0.2,
            "满月光": 0.5,
            "暮光": 3.4,
            "起居室": 35,
            "阴天": 45,
            "日落日出": 55,
            "多云": 70,
            "晴朗": 120,
            "阳光直射": 200
          };
          var params = {
            阴影: true,
            exposure: 0.68,
            /!* bulbPower: Object.keys(bulbLuminousPowers)[2],*!/
            灯泡亮度: Object.keys(bulbLuminousPowers)[2],
            环境光: Object.keys(hemiLuminousIrradiances)[4]
            //其实是半球光照
          };
          spGui.add(params, '环境光', Object.keys(hemiLuminousIrradiances));
          spGui.add(params, '灯泡亮度', Object.keys(bulbLuminousPowers));
          spGui.add(params, 'exposure');
          spGui.open();

        }
        //性能插件
        // var stats;
        // function initStats() {
        //   stats = new Stats();
        //   document.body.appendChild(stats.dom);
        // }

        threeStart();*/

      },
    }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .coldSourceStation{
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
    .emptyText{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .deviceLists{
      .vhMT(2);
      width: 100%;
      .vh(100);
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px
      rgba(74, 144, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #4a90e2;
      border-radius: 4px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .part{
        display: flex;
        flex: 1;
        .img{
          width: 1.61rem;
          height:1.35rem;
          /*box-shadow: 0px 2px 0.3rem 0px*/
          /*rgba(0, 0, 0, 0.66);*/
          img{
            display: block;
            width: 100%;
            height: auto;
          }
        }
        .progressBox{
          width: 2.63rem;
          display: flex;
          align-content: center;
          flex-wrap: wrap;
        }
      }

    }
    .deviceDetailBox{
      .vhMT(20);
      display: flex;
      justify-content: space-between;
      .deviceSet{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 6.43rem;
        .vh(180);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        border-radius: 4px;
        .btnBox{
          height: 100%;
          .title{
            .vhMT(20);
            font-family: PingFangSC-Regular;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            .vhLineH(20);
            letter-spacing: 0px;
            color: #f8fbff;
            text-align: center;
          }
          .inputBox{
            display: flex;
            align-items: center;
            .vhMT(8);
            width: 2.92rem;
            .vh(42);
            background-color: #011f51;
            box-shadow: 0px 0px 2px 0px
            rgba(87, 113, 176, 0.15),
            inset 0px 0px 3px 0px
            rgba(0, 0, 0, 0.33);
            border: solid 1px #000c22;
            .showState{
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              .text{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                input{
                  width: 0.45rem;
                  border: 0;
                  outline: none;
                  background-color: transparent;

                  .vhLineH(33);
                  font-family: PingFangSC-Regular;
                  font-size: 0.24rem;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 2px 2px 4px rgba(245, 108, 108, 0.6);
                  text-align: center;
                }
                span{
                  .vhLineH(33);
                  font-family: PingFangSC-Regular;
                  font-size: 0.24rem;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #fa6074;
                  text-shadow: 2px 2px 4px rgba(245, 108, 108, 0.6);
                  text-align: center;
                }
              }
              .editBtn{
                display: inline-block;


                position: absolute;
                right: 0.11rem;
                .vhTop(11);
                width: 0.2rem;
                height: 0.2rem;
                font-size: 0.2rem;
                color: #b5d7ff;
                cursor: pointer;
                &.one{
                  background: url("../../../../assets/img/airConditioner/icon_edit.png") no-repeat center;
                  background-size: 100% 100%;
                }
                &.two{
                  background: url("../../../../assets/img/airConditioner/icon_save.png") no-repeat center;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
      .deviceEchart{
        width: 6.43rem;
        .vh(180);
        background-color: transparent;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        border-radius: 4px;
        .selfTabBox{
          width: 100%;
          height: 100%;
          .self-tab-head{
            width: 100%;
            .vh(34);

            border-radius: 4px;
            display: flex;
            justify-content: flex-start;
            .part{
              display: flex;
              align-items: center;
              font-family: PingFangSC-Medium;
              font-size: 0.14rem;
              line-height: 1;
              background-color: rgba(0, 0, 0, 0.2);
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #818181;
              padding: 0 0.2rem;
              cursor: pointer;
              &.active{
                background-color: transparent;
                color: #fff;
              }
            }
            .extra{
              flex: 1;
              background-color: rgba(0, 0, 0, 0.2);
            }
          }
          .self-tab-body{
            width: 100%;
            .vh(146);
          }
        }

      }
    }
    .threeDBox{
      .vhMT(20);
      width: 100%;
      min-height: 261px;
      /*.vh(459);*/
      max-height: 459px;
      background-color: transparent;
      box-shadow: 0px 4px 10px 0px
      rgba(74, 144, 226, 0.22),
      inset 1px 1px 2px 0px
      rgba(248, 253, 255, 0.15),
      inset 0px -1px 1px 0px
      #4a90e2;
      border-radius: 4px;
      position: relative;
      .btnBox{
        position: absolute;
        right: 0.2rem;
        .vhTop(20);
        display: flex;
        .cascaderBox{

          width: 1.15rem;
          .vh(32);
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        .btnClickBox{
          margin-left: 0.2rem;
          button{
            cursor: pointer;
            width: 1rem;
            .vh(32);
            .gradientR(#4b94f9,#2772e3);
            border-radius: 2px;

            border:0;
            outline: none;
            font-family: PingFangSC-Medium;
            font-size: 0.14rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #ffffff;
          }
        }
      }
    }

    .dialog-in {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      //background-color: yellow;
      .p-text {
        margin-top: 0.62rem;
        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        line-height: 1;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b5d7ff;
        text-align: center;
      }
      .btnWrap{
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        left: 0;
        bottom: 0;
        button{
          display: inline-block;
          width: 50%;

          //border-bottom-left-radius: 8px;
          border: solid 1px #4a90e2;
          outline: none;
          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 0.43rem;
          letter-spacing: 0px;
          color: #ffffff;
          background-color: #051732;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 8px;
          &:first-of-type{
            background-color: #3b85ef;
            box-shadow: 0px 4px 10px 0px
            rgba(74, 144, 226, 0.4),
            inset 1px 1px 2px 0px
            rgba(248, 253, 255, 0.15),
            inset 0px -1px 1px 0px
            #4a90e2;
            border: solid 1px transparent;
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 8px;
          }
        }
      }
    }
  }
</style>
