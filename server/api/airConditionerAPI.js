// 空调接口文档
var express = require('express');
var router = express.Router();
var requests = require('../requests');
// 默认只转调的接口
let APIattrs = [

  {post:'hvac_pc/pc/index/sys',re:'/index/sys'},        // 首页系统id获取 通过传递的父级系统id
  {post:'hvac_pc/pc/floor',re:'/floor'},        // 获取机房
  {post:'hvac_pc/pc/index',re:'/index'},        // 首页数据请求
  {post:'hvac_pc/pc/index/device',re:'/index/device'},        // 获取设备的控制参数及报表
  {post:'hvac_pc/pc/index/point',re:'/index/point'},        // 获取设备的点位当前值
  {post:'hvac_pc/pc/air/control/title',re:'/air/control/title'},        // 获取空调末端群控点位
  {post:'hvac_pc/pc/air/control/floor',re:'/air/control/floor'},        // 批量控制末端
  {post:'hvac_pc/pc/water/title',re:'/water/title'},        // 冷水机组运行title
  {post:'hvac_pc/pc/water/device',re:'/water/device'},        // 冷水机组运行参数
  {post:'hvac_pc/pc/energy/floor',re:'/energy/floor'},        // 能耗情况cop报表
  {post:'hvac_pc/pc/energy/title',re:'/energy/title'},        // 能耗情况 下半部 title
  {post:'hvac_pc/pc/energy/table_one',re:'/energy/table_one'},        // 能耗情况 下半部 报表1
  {post:'hvac_pc/pc/energy/table_two',re:'/energy/table_two'},        // 能耗情况 下半部 报表2

  {post:'hvac_pc/pc/alarm/title',re:'/alarm/title'},        // 报警管理title
  {post:'hvac_pc/pc/alarm/table',re:'/energy/table_two'},        // 报警管理table
  {post:'hvac_pc/pc/control',re:'/control'},        // 模式控制 新增修改
  {post:'hvac_pc/pc/control/delete',re:'/control/delete'},        // 模式控制 删除
  {post:'hvac_pc/pc/control/record',re:'/control/record'},        // 获取控制日志
  {post:'hvac_pc/pc/control/flase_record',re:'/control/flase_record'},        // 获取控制失败列表

];
let lens =APIattrs.length;
//post
let APIattrs2 = [

  // {post:'power_distribution/power_distribution_loop_state',re:'/loopState'},        //变配电回路状态

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
