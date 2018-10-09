// 公共接口
var express = require('express');
var router = express.Router();
var requests = require('./requests');
// const getDates = [
//     {}
// ]

// 测试接口
router.post('/currency/floor', (req, res) => {
    var params = req.body;
    let header = {'Authorization': params.Authorization};
    delete params.Authorization; 
    requests.get('currency/floor',params,header).then(ress =>{
        res.end(ress);
    }).catch(err=>{
        res.end(err);
    });
});
// // 测试接口
// router.post('/test2', (req, res) => {
//     var params = req.body;
//     let data = JSON.stringify([{ "project_id":1, "addtime": 10,"energy_type":0,"cost":1}]);
//     requests.post('energy_pc/pc/plan/set',{data:data}).then(ress=>{
//         console.log(11);
//         res.end(ress);
//     }).catch(err=>{
//         res.end(err);
//     });
// });

module.exports = router