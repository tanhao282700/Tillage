// 变配电接口文档
var express = require('express');
var router = express.Router();
var requests = require('../requests');
// 默认只转调的接口
let APIattrs = [

  {post:'power_distribution/power_alarmmanage_excel',re:'/alarmManage/Excel'},        // 报警管理-导出Excel
];
let lens =APIattrs.length;
//post
let APIattrs2 = [

  {post:'power_distribution/power_distribution_loop_state',re:'/loopState'},        //变配电回路状态
  {post:'power_distribution/power_distribution_current_environment',re:'/environment'},        //变配电室环境
  {post:'power_distribution/power_distribution_load_factor',re:'/loadFactor'},        // 变压器负载率变化
  {post:'power_distribution/power_device_points_graph',re:'/temperature'},        // 变压器温度
  {post:'power_distribution/power_distribution_devicelist',re:'/devicelist'},        // 变配电室环境设备
  {post:'power_distribution/power_factor_total',re:'/factorTotal'},        // 变配电负载率统计


  {post:'power_distribution/power_distribution_header',re:'/history/table/header'},        // 历史读数-表头
  {post:'power_distribution/power_distribution_history_read',re:'/history/table'},        // 历史读数报表
  {post:'power_distribution/power_alarmmanage',re:'/alarmManage'},        // 报警管理

  {post:'power_distribution/power_alarmmanage_video',re:'/inOut/video'},        // 进出情况-视频监控
  {post:'power_distribution/power_door_record',re:'/inOutReport'},        // 进出记录报表
];
let lens2 =APIattrs2.length;

//get
for(let i=0;i<lens;i++){
  router.post(APIattrs[i].re, (req, res) => {
    var params = req.body;
    let header = {'Authorization': params.Authorization};
    delete params.Authorization;
    requests.get(APIattrs[i].post,params,header).then(ress =>{
      res.end(ress);
    }).catch(err=>{
      res.end(err);
    });
  });
}
//post
for(let i=0;i<lens2;i++){
  router.post(APIattrs2[i].re, (req, res) => {
    var params = req.body;
    let header = {'Authorization': params.Authorization};
    delete params.Authorization;
    requests.post(APIattrs2[i].post,params,header).then(ress =>{
      res.end(ress);
    }).catch(err=>{
      res.end(err);
    });
  });
}


module.exports =router;
