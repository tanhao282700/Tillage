// 消防报警接口文档
var express = require('express');
var router = express.Router();
var requests = require('../requests');
// 默认只转调的接口
let APIattrs = [
  {post:'firealarm/firealarm_record_excel',re:'/excel'},  //excel报表导出
];
let lens =APIattrs.length;
//post
let APIattrs2 = [
  {post:'firealarm/firealarm_monitoring',re:'/monitor'},        // 消防监测
  {post:'firealarm/firealarm_control',re:'/control'},        // 消防监测控制
  {post:'firealarm/firealarm_record',re:'/record'},        // 消防历史记录
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
