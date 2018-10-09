// 能源接口文档
var express = require('express');
var router = express.Router();
var requests = require('../requests');
// 默认只转调的接口
let APIattrs = [
    
    {post:'energy/system',re:'/system'},  //系统列表
    {post:'energy_pc/pc/panorama/device',re:'/full/getNums'}, // 全景餐位数统计接口
    {post:'energy_pc/pc/panorama/total',re:'/full/total'},    //水电气能耗值
    {post:'energy_pc/pc/panorama/table',re:'/full/table'},    //水电气3年能耗对比
    {post:'energy_pc/pc/panorama/system',re:'/full/system'},  //全景能耗占比
    {post:'energy_pc/pc/situation',re:'/powerMsg'},           //能耗情况
    {post:'energy_pc/pc/plan/select',re:'/plan'},             // 用能预设 查询 
    {post:'energy_pc/pc/realtime/floor',re:'/realtime'},      // 实时读数
    {post:'energy_pc/pc/realtime/system',re:'/realtime2'},
    {post:'energy_pc/pc/realtime/system/device',re:'/realtime/device'}, //获取按系统 的 表器 能耗值  
    {post:'energy_pc/pc/history/system',re:'/history/system'},   //按系统获取对比历史平均值的百分比报表 和 天 月 季度 的百分比
    {post:'energy_pc/pc/history/floor',re:'/history/floor'},  
    {post:'energy_pc/pc/history/floor/pie',re:'/history/pie'},   //区域那些的饼状图
    {post:'energy_pc/pc/history/system/pie',re:'/history/pie2'},  //设备 那些的饼图
    {post:'energy_pc/pc/bill/tenant',re:'/bill/tenant'},         //租户账单
    {post:'energy_pc/pc/bill/property',re:'/bill/property'},     //耗能账单

    {post:'energy_pc/pc/alarm/device',re:'/alarm/device'},     // 警告次数
    {post:'energy_pc/pc/alarm/recod',re:'/alarm/recod'},       //警告记录
    {post:'energy_pc/pc/alarm/rank',re:'/alarm/rank'},        //获取设备的区域的故障排名 及报表
   
    
];
let lens =APIattrs.length;
//post
let APIattrs2 = [
    {post:'energy_pc/pc/plan/set',re:'/plan/set'},        // 用能预设
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