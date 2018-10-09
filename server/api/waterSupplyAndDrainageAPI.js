// 给排水接口文档
var express = require('express');
var router = express.Router();
var requests = require('../requests');
// 默认只转调的接口
let APIattrs = [
  {post:'drainage/drainage_startstop_excel',re:'/home/report/excel'},// 给排水首页数据统计报表接口
];
let APIattrs2 = [
  {post:'drainage/drainage_home',re:'/home'},// 给排水首页接口
  {post:'drainage/drainage_dtareport',re:'/home/dataReport'},// 给排水数据统计报表接口
  {post:'drainage/drainage_fault',re:'/home/faultReport'},// 给排水首页故障统计报表接口
  {post:'drainage/drainage_maintenance',re:'/home/recordReport'},// 给排水首页维修记录统计报表接口
  {post:'drainage/drainage_startstop',re:'/home/switchReport'},// 给排水首页数据统计报表接口


  {post:'drainage/drainage_device_list',re:'/deviceLists'},// 给排水水泵设备列表接口
  {post:'drainage/drainage_alert',re:'/warnInfoLists'},// 给排水水泵设备报警信息列表接口
  {post:'drainage/drainage_devcieinfo',re:'/deviceInfoLists'},// 给排水设备信息列表接口
  {post:'drainage/drainage_device_protectinfo',re:'/protectInfoLists'},// 给排水维保历史列表接口

  {post:'drainage/drainage_device_detail',re:'/deviceDetail'},// 给排水系统设备详情接口

  {post:'drainage/drainage_dtareport_header',re:'/reportHeader'},// 给排水系统数据报表表头接口

  {post:'drainage/drainage_device_control',re:'/deviceControl'},// 给排水系统设备控制接口
];
let lens =APIattrs.length;
for(let i=0;i<lens;i++){
  router.post(APIattrs[i].re, (req, res) => {
    var params = req.body;
    let header = {'Authorization': params.Authorization};
    delete params.Authorization;
    requests.get(APIattrs[i].post,params,header).then(ress =>{
      // console.log(ress)
      res.end(ress);
    }).catch(err=>{
      // console.log(err)
      res.end(err);
    });
  });
}

let lens2 =APIattrs2.length;
for(let i=0;i<lens2;i++){
  router.post(APIattrs2[i].re, (req, res) => {
    var params = req.body;
    let header = {'Authorization': params.Authorization};
    delete params.Authorization;
    requests.post(APIattrs2[i].post,params,header).then(ress =>{
      // console.log(ress)
      res.end(ress);
    }).catch(err=>{
      // console.log(err)
      res.end(err);
    });
  });
}

// energy_pc/pc/panorama/ system


// 测试接口
router.post('/test2', (req, res) => {
  var params = req.body;
  let header = {'Authorization': params.Authorization};
  delete params.Authorization;
  let data = JSON.stringify([{ "project_id":1, "addtime": 10,"energy_type":0,"cost":1}]);
  requests.post('energy_pc/pc/plan/set',{data:data},header).then(ress=>{
    res.end(ress);
  }).catch(err=>{
    res.end(err);
  });

})


module.exports =router;
