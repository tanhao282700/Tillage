// node 后端服务器
const userApi = require('./api');
const energy = require('./api/energyAPI');
const water = require('./api/waterSupplyAndDrainageAPI');
const fireAlarm = require('./api/fireAlarmAPI');
const power = require('./api/powerAPI');
const airConditioner = require('./api/airConditionerAPI');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
// const logger = require('morgan');
const app = express();

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})
// 后端api路由 --- 公共
app.use('/api', userApi);
// 后端api路由 --- 能源
app.use('/api/energy', energy);
//给排水
app.use('/api/water', water);

//消防报警
app.use('/api/fireAlarm', fireAlarm);

//变配电
app.use('/api/power', power);
//空调
app.use('/api/airConditioner', airConditioner);
// 监听端口
app.listen(8088);
console.log('success listen at port:8088......');
