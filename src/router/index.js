import Vue from 'vue'
import Router from 'vue-router'

//首页
import home from '@/router/home/home'
import routeTest from '@/router/home/routeTest'
//能源
import energy from '@/router/energy/energy0'         //能源组件
import energyFullLook from '@/router/energy/energy'  //全景查看子组件
import RunMsg from '@/router/energy/runMsg'          //运行情况子组件
import Alarm from '@/router/energy/alarm'

//给排水
import WaterSupplyAndDrainage from '@/router/WaterSupplyAndDrainage/WaterSupplyAndDrainage'
import waterPump from '@/router/WaterSupplyAndDrainage/components/waterPump'
import floor3D from '@/router/WaterSupplyAndDrainage/components/floor3D'
import highWaterTank from '@/router/WaterSupplyAndDrainage/components/highWaterTank'
import cistern from '@/router/WaterSupplyAndDrainage/components/cistern'
import submersibleSewagePump from '@/router/WaterSupplyAndDrainage/components/submersibleSewagePump'
import sewagePond from '@/router/WaterSupplyAndDrainage/components/sewagePond'

//代维系统管理端
import generationMIndex0 from '@/router/generationM/index0';
import generationMIndex from '@/router/generationM/index';
import generationMSchedule from '@/router/generationM/schedule';
import generationMWorkList from '@/router/generationM/workList';
import generationMRouting from '@/router/generationM/routing';
import generationMReport from '@/router/generationM/report';

//消防报警
import fireAlarm from '@/router/fireAlarm/fireAlarm'
import fireMonitor from '@/router/fireAlarm/components/fireMonitor'
import fireHistory from '@/router/fireAlarm/components/fireHistory'

//变配电
import power from '@/router/power/power'
import envirCond from '@/router/power/components/envirCond'
import monitorCond from '@/router/power/components/monitorCond'

//空调
import airConditioner from '@/router/airConditioner/airConditioner'
import telecontrol from '@/router/airConditioner/components/telecontrol'
import sysMonitor from '@/router/airConditioner/components/sysMonitor'
import timerMode from '@/router/airConditioner/components/timerMode'

//电梯
import elevator from '@/router/elevator/index';
import runTimeMonitor from '@/router/elevator/components/runTimeMonitor';
import wbHistory from '@/router/elevator/components/wbHistory';
import breakdownManagement from '@/router/elevator/components/breakdownManagement';
import dataHistory from '@/router/elevator/components/dataHistory';
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      component: home
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/routeTest',
      component: routeTest
    },
    {
      path: '/energy',
      component: energy,
      children:[
          { path: '/energy/fullLook', component: energyFullLook,
              children:[
                { path: '/energy/fullLook/first'},
                { path: '/energy/fullLook/second'},
                { path: '/energy/fullLook/thrid'},
            ]
        },
          { path: '/energy/runMsg', component: RunMsg,
            children:[
              { path: '/energy/runMsg/first'},
              { path: '/energy/runMsg/second'},
              { path: '/energy/runMsg/thrid'},
          ]
        },
        { path: '/energy/alarm', component: Alarm}
      ]

    },
    {
      path: '/WaterSupplyAndDrainage',
      component: WaterSupplyAndDrainage,
      children:[
        {
          path: 'floor3D',
          component:floor3D
        },
        {
          path: 'waterPump',
          name:'waterPump',
          component: waterPump
        },
        {
          path: 'highWaterTank',
          name:'highWaterTank',
          component: highWaterTank
        },
        {
          path: 'cistern',
          name:'cistern',
          component: cistern
        },
        {
          path: 'submersibleSewagePump',
          name:'submersibleSewagePump',
          component: submersibleSewagePump
        },
        {
          path: 'sewagePond',
          name:'sewagePond',
          component: sewagePond
        }
      ]
    },
    {
      path: '/generationM',
      component: generationMIndex0,
      children:[
        {
          path: '/generationM',
          name:'generationMBase',
          component:generationMIndex
        },
        {
          path: '/generationM/schedule',
          component:generationMSchedule,
          children:[
              { path: '/generationM/schedule/first'},
              { path: '/generationM/schedule/second'},
              { path: '/generationM/schedule/thrid'},
          ]
        },
        {
          path: '/generationM/workList',
          component:generationMWorkList
        },
        {
          path: '/generationM/routing',
          component:generationMRouting
        },
        {
          path: '/generationM/report',
          component:generationMReport
        },
      ]
    },
    {
      path: '/fireAlarm',
      component: fireAlarm,
      children:[
        {
          path: 'fireMonitor',
          name:fireMonitor,
          component:fireMonitor
        },
        {
          path: 'fireHistory',
          name:'fireHistory',
          component: fireHistory
        }
      ]
    },
    {
      path: '/power',
      component: power,
      children:[
        {
          path: 'envirCond',
          name:'envirCond',
          component:envirCond
        },
        {
          path: 'monitorCond',
          name:'monitorCond',
          component: monitorCond
        }
      ]
    },
    {
      path: '/airConditioner',
      component: airConditioner,
      children:[
        {
          path: 'telecontrol',
          name:'telecontrol',
          component:telecontrol
        },
        {
          path: 'sysMonitor',
          name:'sysMonitor',
          component: sysMonitor
        },
        {
          path: 'timerMode',
          name:'timerMode',
          component: timerMode
        }
      ]
    },
    {
      path: '/elevator',
      component: elevator,
      children:[
        {
          path: 'runTimeMonitor',
          name:'runTimeMonitor',
          component:runTimeMonitor
        },
        {
          path: 'wbHistory',
          name:'wbHistory',
          component: wbHistory
        },
        {
          path: 'breakdownManagement',
          name:'breakdownManagement',
          component: breakdownManagement
        },{
          path: 'dataHistory',
          name:'dataHistory',
          component: dataHistory
        },
      ]
    },
  ]
})
