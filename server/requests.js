var request = require('request');
let urlBase = 'https://tesing.china-tillage.com/';

const requsets = {
    post:(url,data,header)=>{
        var options = {
            url: urlBase+url,
            headers:header
        };
        // let requestData = JSON.stringify(data);
      //console.log(options)
        return new Promise((resolve,reject)=>{
            var r = request.post(options,function(error, response, body){
                if (!error && response.statusCode == 200) {
                    resolve(body)
                }else{
                    reject(body)
                }
            })
            var form = r.form();
            for(key in data){
                form.append(key, data[key]);
            }
        })
    },
    get:(url,data,header)=>{
        let str = '';
        for(key in data){
            let val = requsets.isChinese(data[key])?encodeURI(data[key]):data[key];
            if(str==''){
                str +='?'+key+'='+val;
            }else{
                str +='&'+key+'='+val;
            }
        }
        let urls = urlBase+url+str;
        var options = {
            url: urls,
            headers:header
        };
        //console.log(options)
         return new Promise((resolve,reject)=>{
            request(options, function (error, response, body) {
            //Show the HTML for the baidu homepage.
            // if(url == 'energy_pc/pc/bill/property'){
            //     console.log(urls,body,header)
            // }
            if (!error && response.statusCode == 200) {
                resolve(body)
            }else{
                reject(body)
            }
            })
         })

    },
    isChinese(str){ //判断中文？ 若中文则转义
        if(/^[\u3220-\uFA29]+$/.test(str)){
            return true;
        }else{
            return false;
        }
     }
}
module.exports =requsets;
